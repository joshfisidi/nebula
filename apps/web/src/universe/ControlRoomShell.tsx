"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Blocks,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  HardDrive,
  Layers3,
  Network,
  PanelLeft,
  PanelRight,
  Radar,
  Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { useUniverseGraphStore, type InteractionMode, type RenderNode } from "./graphStore";
import type { LocalAccessSession, SourceFolder } from "./sourceApi";
import type { UniverseConnectionStatus } from "./UniverseLiveProvider";

type ControlRoomShellProps = {
  preview?: boolean;
  currentRoot: string | null;
  localAccessSession: LocalAccessSession | null;
  sourceMode: "server" | "local-access" | "browser";
  serverAvailable: boolean;
  sourceModalOpen: boolean;
  sourceLoading: boolean;
  sourceSelecting: boolean;
  sourceError: string | null;
  wsEnabled: boolean;
  status: UniverseConnectionStatus;
  onOpenSource: () => void;
  onCloseSource: () => void;
  onRequestLocalAccess: () => void;
  onSelectedServer: (path: string) => void;
  onSelectedLocal: (path: string) => void;
  onSelectedBrowser: (files: FileList) => void;
};

function formatRootLabel(root: string | null): string {
  if (!root) return "No source selected";
  const parts = root.split("/").filter(Boolean);
  return parts.slice(-2).join("/") || root;
}

function formatKind(node: RenderNode): string {
  return node.kind === "dir" ? "Directory" : "File";
}

function deriveStatusTone(params: {
  localAccessSession: LocalAccessSession | null;
  currentRoot: string | null;
  status: UniverseConnectionStatus;
  wsEnabled: boolean;
  sourceMode: ControlRoomShellProps["sourceMode"];
}): { tone: "good" | "warn" | "danger" | "idle"; label: string; detail: string } {
  if (params.sourceMode === "browser" && params.currentRoot) {
    return {
      tone: "good",
      label: "Folder ready",
      detail: "Choose the folder again to refresh the map."
    };
  }
  if (params.localAccessSession && params.currentRoot) {
    return {
      tone: "good",
      label: "Local workspace active",
      detail: "The local-access agent is feeding the graph stage."
    };
  }

  if (params.status.phase === "error") {
    return {
      tone: "danger",
      label: "Attention required",
      detail: params.status.message ?? "Live runtime connection failed."
    };
  }

  if (params.status.phase === "retrying") {
    return {
      tone: "warn",
      label: "Reconnecting runtime",
      detail: params.status.message ?? "WebSocket retry is in progress."
    };
  }

  if (params.wsEnabled && params.status.phase === "connected") {
    return {
      tone: "good",
      label: "Runtime connected",
      detail: "Server mode is streaming live snapshot and patch updates."
    };
  }

  if (!params.currentRoot) {
    return {
      tone: "idle",
      label: "No folder open",
      detail: "Open a folder to map your files."
    };
  }

  return {
    tone: "warn",
    label: "Standby",
    detail: "A source exists, but live updates are not active yet."
  };
}

function useShellMode(): "mobile" | "tablet" | "desktop" {
  const [width, setWidth] = useState(1440);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (width < 900) return "mobile";
  if (width < 1280) return "tablet";
  return "desktop";
}

function SourceModal({
  open,
  loading,
  error,
  localAccessSession,
  serverAvailable,
  onClose,
  onRequestLocalAccess,
  onSelectedServer,
  onSelectedLocal,
  onSelectedBrowser
}: {
  open: boolean;
  loading: boolean;
  error: string | null;
  localAccessSession: LocalAccessSession | null;
  serverAvailable: boolean;
  onClose: () => void;
  onRequestLocalAccess: () => void;
  onSelectedServer: (path: string) => void;
  onSelectedLocal: (path: string) => void;
  onSelectedBrowser: (files: FileList) => void;
}) {
  const [roots, setRoots] = useState<string[]>([]);
  const [selectedRoot, setSelectedRoot] = useState("");
  const [folders, setFolders] = useState<SourceFolder[]>([]);
  const [manualPath, setManualPath] = useState("");
  const [selectedFolderPath, setSelectedFolderPath] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const browserFolderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    browserFolderRef.current?.setAttribute("webkitdirectory", "");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    const load = async () => {
      try {
        setLocalError(null);
        const sourceApi = await import("./sourceApi");

        if (localAccessSession?.token) {
          const base = localAccessSession.sourcePath ?? "/Users";
          setRoots([base]);
          setSelectedRoot(base);
          const list = await sourceApi.fetchLocalAccessSourceList(localAccessSession.token, base);
          if (cancelled) return;
          setFolders(list.folders ?? []);
          if (localAccessSession.sourcePath) {
            setSelectedFolderPath(localAccessSession.sourcePath);
            setManualPath(localAccessSession.sourcePath);
          }
          return;
        }

        if (!serverAvailable) return;

        const current = await sourceApi.fetchSourceCurrent();
        if (cancelled) return;

        const allowedRoots = current.allowedRoots ?? [];
        setRoots(allowedRoots);
        const root = allowedRoots[0] ?? "";
        setSelectedRoot(root);

        if (current.currentRoot) {
          setSelectedFolderPath(current.currentRoot);
          setManualPath(current.currentRoot);
        }

        if (root) {
          const list = await sourceApi.fetchSourceList(root);
          if (!cancelled) setFolders(list.folders ?? []);
        }
      } catch (err) {
        if (!cancelled) setLocalError(err instanceof Error ? err.message : String(err));
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [localAccessSession, open, serverAvailable]);

  if (!open) return null;

  const effectiveError = error ?? localError;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="source-dialog-title"
      aria-describedby="source-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="source-dialog max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.3rem] border border-[var(--line-strong)] p-0 text-[var(--fg)]"
      style={{ width: "min(31rem, calc(100vw - 2rem))" }}
    >
      <div className="nebula-source-modal p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="nebula-eyebrow"><span className="nebula-eyebrow-line" /> Workspace source</span>
          <button type="button" className="nebula-header-action h-9 w-9 p-0" aria-label="Close source options" onClick={onClose}>×</button>
        </div>
        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-[var(--surface-soft)] text-[var(--accent)]"><FolderOpen size={21} /></div>
        <h2 id="source-dialog-title" className="mt-5 text-[1.8rem] font-medium leading-tight tracking-[-0.055em] text-white">Choose a source</h2>
        <p id="source-dialog-description" className="mt-2 text-sm leading-6 text-[var(--muted)]">Start with a folder on this device. Nebula maps its structure right here in your browser.</p>

        <input
          ref={browserFolderRef}
          type="file"
          className="sr-only"
          multiple
          aria-label="Choose folder in browser"
          onChange={(event) => {
            if (event.target.files?.length) onSelectedBrowser(event.target.files);
            event.target.value = "";
          }}
        />
        <button type="button" className="nebula-primary mt-6 w-full justify-between px-4 py-3" disabled={loading} onClick={() => browserFolderRef.current?.click()}><span className="flex items-center gap-2"><FolderOpen size={18} />Open a folder</span><ArrowUpRight size={16} /></button>

        <div className="nebula-source-divider my-6"><span>OR</span></div>
        <button type="button" className="nebula-source-option w-full" disabled={loading} onClick={onRequestLocalAccess}>
          <span className="nebula-source-option-icon"><Network size={18} /></span>
          <span className="min-w-0 flex-1 text-left"><strong>Connect live workspace</strong><small>{localAccessSession ? "Local agent connected" : "Use Nebula Sync for live updates"}</small></span>
          <ArrowUpRight size={16} className="text-[var(--subtle)]" />
        </button>

        {(serverAvailable || localAccessSession) ? (
          <details className="nebula-source-details mt-3">
            <summary>Choose a server folder <ChevronDown size={15} /></summary>
            <div className="space-y-3 p-4 pt-0">
              {roots.length > 0 ? <><label htmlFor="source-root" className="nebula-field-label">Root</label><NativeSelect id="source-root" value={selectedRoot} onChange={async (event) => {
                const root = event.target.value;
                setSelectedRoot(root);
                try {
                  const sourceApi = await import("./sourceApi");
                  const list = localAccessSession?.token ? await sourceApi.fetchLocalAccessSourceList(localAccessSession.token, root) : await sourceApi.fetchSourceList(root);
                  setFolders(list.folders ?? []);
                } catch (err) { setLocalError(err instanceof Error ? err.message : String(err)); }
              }}>{roots.map((root) => <NativeSelectOption key={root} value={root}>{root}</NativeSelectOption>)}</NativeSelect></> : null}
              <label htmlFor="source-folder" className="nebula-field-label">Folder</label>
              <NativeSelect id="source-folder" value={selectedFolderPath} onChange={(event) => { setSelectedFolderPath(event.target.value); setManualPath(event.target.value); }}>
                <NativeSelectOption value="">Select folder...</NativeSelectOption>
                {folders.map((folder) => <NativeSelectOption key={folder.path} value={folder.path}>{folder.name}</NativeSelectOption>)}
              </NativeSelect>
              <label htmlFor="manual-path" className="nebula-field-label">Or enter a path</label>
              <Input id="manual-path" value={manualPath} onChange={(event) => setManualPath(event.target.value)} placeholder="/absolute/path" />
              <button type="button" className="nebula-primary w-full" disabled={loading} onClick={() => { const path = manualPath.trim() || selectedFolderPath; if (localAccessSession?.token) onSelectedLocal(path); else onSelectedServer(path); }}>{loading ? "Loading..." : "Load folder"}</button>
            </div>
          </details>
        ) : null}

        {effectiveError ? <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{effectiveError}</div> : null}
        <p className="mt-6 text-center text-xs leading-5 text-[var(--subtle)]">File contents stay on your device.</p>
      </div>
    </dialog>
  );
}

function ProjectTree() {
  const nodes = useUniverseGraphStore((s) => s.nodeArray);
  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);
  const setProjectSelection = useUniverseGraphStore((s) => s.setProjectSelection);
  const selectAllProjects = useUniverseGraphStore((s) => s.selectAllProjects);
  const clearProjectSelection = useUniverseGraphStore((s) => s.clearProjectSelection);
  const expandedNodeIds = useUniverseGraphStore((s) => s.expandedNodeIds);
  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
  const revealNode = useUniverseGraphStore((s) => s.revealNode);
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);

  const byParent = useMemo(() => {
    const map = new Map<string, RenderNode[]>();
    for (const node of nodes) {
      const key = node.parentId ?? "__root__";
      const bucket = map.get(key) ?? [];
      bucket.push(node);
      map.set(key, bucket);
    }
    for (const bucket of map.values()) {
      bucket.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "dir" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    }
    return map;
  }, [nodes]);

  const rootNodes = useMemo(() => byParent.get("__root__") ?? [], [byParent]);

  const projects = useMemo(
    () =>
      rootNodes.map((node) => ({
        id: node.id,
        projectId: node.projectId,
        name: node.name
      })),
    [rootNodes]
  );

  const selectedProjectValue = useMemo(() => {
    if (selectedProjectIds.size !== 1) return "";
    return [...selectedProjectIds][0] ?? "";
  }, [selectedProjectIds]);

  const visibleRoots = useMemo(() => {
    if (selectedProjectIds.size === 0) return [];
    return rootNodes.filter((node) => selectedProjectIds.has(node.projectId));
  }, [rootNodes, selectedProjectIds]);

  const visibleMatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return null;

    const byId = new Map(nodes.map((node) => [node.id, node]));
    const matched = new Set<string>();

    for (const node of nodes) {
      if (`${node.name} ${node.path}`.toLowerCase().includes(query)) {
        matched.add(node.id);
        let cursor = node.parentId;
        while (cursor) {
          matched.add(cursor);
          cursor = byId.get(cursor)?.parentId;
        }
      }
    }

    return matched;
  }, [nodes, searchQuery]);

  const renderNode = (node: RenderNode) => {
    if (visibleMatches && !visibleMatches.has(node.id)) return null;

    const children = byParent.get(node.id) ?? [];
    const showChildren = expandedNodeIds.has(node.id);
    const canExpand = node.kind === "dir" && children.length > 0;

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex w-full items-center gap-2 rounded-2xl px-3 py-2 transition hover:bg-white/[0.04]",
            selectedProjectIds.has(node.projectId) && node.id === node.projectId && "bg-white/[0.04]"
          )}
          style={{ paddingLeft: `${node.depth * 12 + 12}px` }}
        >
          {canExpand ? (
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.03]"
              aria-label={showChildren ? `Collapse ${node.name}` : `Expand ${node.name}`}
              onClick={(event) => {
                event.stopPropagation();
                toggleExpandedNode(node.id);
              }}
            >
              {showChildren ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-transparent" />
          )}

          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-2 text-left"
            aria-label={`Focus ${node.name}`}
            onClick={() => {
              revealNode(node.id);
            }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-[var(--line)] bg-white/[0.04]">
              {node.kind === "dir" ? (
                showChildren ? <FolderOpen size={15} className="text-cyan-100" /> : <Folder size={15} className="text-cyan-100" />
              ) : (
                <Blocks size={15} className="text-slate-300" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">{node.name}</span>
              <span className="block truncate text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
                {node.kind === "dir" ? "directory" : "file"}
              </span>
            </span>
          </button>
        </div>

        {showChildren ? children.map(renderNode) : null}
      </div>
    );
  };

  return (
    <Card className="nebula-panel rounded-[1.8rem]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[0.72rem] uppercase tracking-[0.26em] text-slate-400">Explorer</div>
            <CardTitle className="mt-1 text-lg text-white">Files</CardTitle>
          </div>
          <Badge className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em]">
            {projects.length} roots
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/[0.02] p-3">
          <div className="mb-2 flex items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-slate-400">
            <span>Projects</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="rounded-full px-3" onClick={selectAllProjects}>
                all
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full px-3" onClick={clearProjectSelection}>
                none
              </Button>
            </div>
          </div>
          <NativeSelect
            aria-label="Project scope"
            value={selectedProjectValue}
            className="h-11 rounded-2xl border-[var(--line)] bg-[var(--surface-strong)]"
            onChange={(event) => setProjectSelection(event.target.value || null)}
          >
            <NativeSelectOption value="">Select project</NativeSelectOption>
            {projects.map((project) => (
              <NativeSelectOption key={project.id} value={project.projectId}>
                {project.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        <div className="max-h-[min(55vh,42rem)] overflow-auto rounded-[1.4rem] border border-[var(--line)] bg-white/[0.02] p-2">
          {selectedProjectIds.size === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-slate-400">
              Choose a project to browse its files.
            </div>
          ) : visibleRoots.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-slate-400">Waiting for graph data...</div>
          ) : (
            visibleRoots.map(renderNode)
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickFilters() {
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);
  const setSearchQuery = useUniverseGraphStore((s) => s.setSearchQuery);
  const showHiddenNodes = useUniverseGraphStore((s) => s.showHiddenNodes);
  const setShowHiddenNodes = useUniverseGraphStore((s) => s.setShowHiddenNodes);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const setLayoutMode = useUniverseGraphStore((s) => s.setLayoutMode);

  return (
    <Card className="nebula-panel rounded-[1.8rem]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white">View options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input
            aria-label="Search graph paths"
            className="h-11 rounded-2xl border-[var(--line)] bg-[var(--surface-strong)] pl-11"
            placeholder="Search files and folders"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Button
            variant={layoutMode === "overview" ? "default" : "outline"}
            className="justify-start rounded-2xl"
            aria-pressed={layoutMode === "overview"}
            onClick={() => setLayoutMode("overview")}
          >
            <Layers3 size={16} className="mr-2" />
            Overview
          </Button>
          <Button
            variant={layoutMode === "focus" ? "default" : "outline"}
            className="justify-start rounded-2xl"
            aria-pressed={layoutMode === "focus"}
            onClick={() => setLayoutMode("focus")}
          >
            <Radar size={16} className="mr-2" />
            Focused
          </Button>
        </div>

        <Button
          variant={showHiddenNodes ? "default" : "outline"}
          className="w-full justify-start rounded-2xl"
          aria-pressed={showHiddenNodes}
          onClick={() => setShowHiddenNodes(!showHiddenNodes)}
        >
          <HardDrive size={16} className="mr-2" />
          {showHiddenNodes ? "Hidden files visible" : "Show hidden files"}
        </Button>
      </CardContent>
    </Card>
  );
}

function InspectorRail({
  tone,
  toneLabel,
  toneDetail,
  currentRoot,
  sourceMode,
  status,
  onOpenSource
}: {
  tone: "good" | "warn" | "danger" | "idle";
  toneLabel: string;
  toneDetail: string;
  currentRoot: string | null;
  sourceMode: ControlRoomShellProps["sourceMode"];
  status: UniverseConnectionStatus;
  onOpenSource: () => void;
}) {
  const focusId = useUniverseGraphStore((s) => s.focusId);
  const nodes = useUniverseGraphStore((s) => s.nodes);
  const nodeArray = useUniverseGraphStore((s) => s.nodeArray);
  const edgeArray = useUniverseGraphStore((s) => s.edgeArray);
  const selectedNode = focusId ? nodes.get(focusId) ?? null : null;

  const childCount = useMemo(() => {
    if (!selectedNode) return 0;
    let count = 0;
    for (const node of nodeArray) {
      if (node.parentId === selectedNode.id) count += 1;
    }
    return count;
  }, [nodeArray, selectedNode]);

  const toneClass =
    tone === "good"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
      : tone === "warn"
        ? "border-amber-400/20 bg-amber-500/10 text-amber-100"
        : tone === "danger"
          ? "border-rose-400/20 bg-rose-500/10 text-rose-100"
          : "border-slate-400/20 bg-slate-500/10 text-slate-100";

  return (
    <div className="space-y-4">
      <Card className="nebula-panel rounded-[1.8rem]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[0.72rem] uppercase tracking-[0.26em] text-slate-400">Inspector</div>
              <CardTitle className="mt-1 text-lg text-white">Selection</CardTitle>
            </div>
            <Badge className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em]">
              {selectedNode ? formatKind(selectedNode) : "Idle"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {selectedNode ? (
            <div className="space-y-4">
              <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/[0.03] p-4">
                <div className="text-[0.72rem] uppercase tracking-[0.2em] text-slate-400">Selection</div>
                <div className="mt-2 text-lg font-semibold text-white">{selectedNode.name}</div>
                <div className="mt-2 text-sm leading-6 text-slate-300/80">{selectedNode.path}</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.2rem] border border-[var(--line)] bg-white/[0.02] p-3">
                  <div className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">Depth</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{selectedNode.depth}</div>
                </div>
                <div className="rounded-[1.2rem] border border-[var(--line)] bg-white/[0.02] p-3">
                  <div className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">Children</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{childCount}</div>
                </div>
              </div>
              <div className="rounded-[1.2rem] border border-[var(--line)] bg-white/[0.02] p-3 text-sm leading-6 text-slate-300/82">
                {selectedNode.kind === "dir"
                  ? "Directory nodes act as navigation anchors for the focus lane and the explorer rail."
                  : "File nodes inherit their visible context from the selected project branch and search state."}
              </div>
            </div>
          ) : (
            <div className="rounded-[1.35rem] border border-dashed border-[var(--line)] bg-white/[0.02] px-4 py-10 text-center text-sm leading-6 text-slate-400">
              Select a node in the map to see its details.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="nebula-panel rounded-[1.8rem]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={cn("rounded-[1.3rem] border px-4 py-4", toneClass)}>
            <div className="text-[0.72rem] uppercase tracking-[0.22em] opacity-80">Signal</div>
            <div className="mt-2 text-lg font-semibold">{toneLabel}</div>
            <div className="mt-2 text-sm leading-6 opacity-88">{toneDetail}</div>
          </div>

          <div className="rounded-[1.2rem] border border-[var(--line)] bg-white/[0.02] p-4 text-sm leading-6 text-slate-300/82">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Source mode</span>
              <span className="font-medium text-white">{sourceMode}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-slate-400">Current root</span>
              <span className="max-w-[12rem] truncate font-medium text-white">{formatRootLabel(currentRoot)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-slate-400">Runtime phase</span>
              <span className="font-medium text-white">{sourceMode === "browser" ? "snapshot" : status.phase}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-white/[0.02] p-3">
              <div className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">Nodes</div>
              <div className="mt-2 text-2xl font-semibold text-white">{nodeArray.length}</div>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-white/[0.02] p-3">
              <div className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">Edges</div>
              <div className="mt-2 text-2xl font-semibold text-white">{edgeArray.length}</div>
            </div>
          </div>

          <Button variant="outline" className="w-full rounded-2xl border-[var(--line)]" onClick={onOpenSource}>
            <ArrowUpRight size={16} className="mr-2" />
            Change source
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function ControlRoomShell({
  preview,
  currentRoot,
  localAccessSession,
  sourceMode,
  serverAvailable,
  sourceModalOpen,
  sourceLoading,
  sourceSelecting,
  sourceError,
  wsEnabled,
  status,
  onOpenSource,
  onCloseSource,
  onRequestLocalAccess,
  onSelectedServer,
  onSelectedLocal,
  onSelectedBrowser
}: ControlRoomShellProps) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeArray = useUniverseGraphStore((s) => s.nodeArray);
  const edgeArray = useUniverseGraphStore((s) => s.edgeArray);
  const interactionMode = useUniverseGraphStore((s) => s.interactionMode);
  const setInteractionMode = useUniverseGraphStore((s) => s.setInteractionMode);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const layoutEngine = useUniverseGraphStore((s) => s.layoutEngine);
  const drawerOpen = useUniverseGraphStore((s) => s.drawerOpen);
  const setDrawerOpen = useUniverseGraphStore((s) => s.setDrawerOpen);

  const [rightRailOpen, setRightRailOpen] = useState(false);
  const sourceTriggerRef = useRef<HTMLButtonElement>(null);
  const browserFolderRef = useRef<HTMLInputElement>(null);
  const wasSourceModalOpenRef = useRef(sourceModalOpen);
  const shellMode = useShellMode();

  useEffect(() => {
    browserFolderRef.current?.setAttribute("webkitdirectory", "");
  }, []);

  useEffect(() => {
    if (wasSourceModalOpenRef.current && !sourceModalOpen) {
      const frame = requestAnimationFrame(() => sourceTriggerRef.current?.focus());
      wasSourceModalOpenRef.current = sourceModalOpen;
      return () => cancelAnimationFrame(frame);
    }
    wasSourceModalOpenRef.current = sourceModalOpen;
  }, [sourceModalOpen]);

  useEffect(() => {
    if (shellMode !== "desktop") {
      setDrawerOpen(false);
      setRightRailOpen(false);
    }
  }, [setDrawerOpen, shellMode]);

  useEffect(() => {
    if (shellMode === "desktop" || (!drawerOpen && !rightRailOpen)) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setRightRailOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, rightRailOpen, setDrawerOpen, shellMode]);

  const statusTone = deriveStatusTone({ localAccessSession, currentRoot, status, wsEnabled, sourceMode });
  const hasGraph = nodeArray.length > 0;
  const openFolder = () => browserFolderRef.current?.click();

  const topActions: InteractionMode[] = ["browse", "pan", "edit"];
  const closeResponsiveRails = () => {
    setDrawerOpen(false);
    setRightRailOpen(false);
  };

  return (
    <div className="nebula-app relative h-[100dvh] w-full overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div className="nebula-atmosphere" />
      <input
        ref={browserFolderRef}
        type="file"
        className="sr-only"
        tabIndex={-1}
        multiple
        aria-label="Open folder"
        onChange={(event) => {
          if (event.target.files?.length) onSelectedBrowser(event.target.files);
          event.target.value = "";
        }}
      />
      <div className="relative z-10 flex h-full flex-col gap-3 p-3 sm:p-4 lg:p-5">
        <header className="nebula-header flex shrink-0 items-center justify-between gap-4 px-2 py-2 sm:px-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="nebula-mark" aria-hidden="true"><span /></div>
            <div className="min-w-0">
              <h1 className="text-[1.16rem] font-semibold leading-none tracking-[-0.06em] text-white sm:text-[1.35rem]">nebula<span className="text-[var(--accent)]">.</span></h1>
              <p className="mt-1 hidden text-[0.64rem] font-medium uppercase tracking-[0.18em] text-[var(--muted)] sm:block">Your workspace, mapped</p>
            </div>
            {preview ? <span className="nebula-mini-tag ml-2">Preview</span> : null}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {hasGraph ? (
              <>
                <span role="status" className="nebula-connection hidden sm:inline-flex">
                  <span className={cn("nebula-connection-dot", sourceMode !== "browser" && connected && "is-live")} />
                  {sourceMode === "browser" ? "Local snapshot" : connected ? "Live" : "Standby"}
                </span>
                <button type="button" className={cn("nebula-header-action", drawerOpen && "is-active")} aria-label="Toggle explorer" aria-expanded={drawerOpen} aria-controls="nebula-explorer" onClick={() => { setDrawerOpen(!drawerOpen); if (shellMode !== "desktop") setRightRailOpen(false); }}><PanelLeft size={17} /><span className="hidden md:inline">Explorer</span></button>
                <button type="button" className={cn("nebula-header-action", rightRailOpen && "is-active")} aria-label="Toggle details" aria-expanded={rightRailOpen} aria-controls="nebula-inspector" onClick={() => { setRightRailOpen(!rightRailOpen); if (shellMode !== "desktop") setDrawerOpen(false); }}><PanelRight size={17} /><span className="hidden md:inline">Details</span></button>
              </>
            ) : null}
            {sourceMode === "browser" && shellMode !== "mobile" ? (
              <button type="button" className="nebula-header-action" ref={sourceTriggerRef} onClick={onOpenSource}>Other sources</button>
            ) : null}
            <button type="button" className="nebula-primary nebula-header-primary" onClick={sourceMode === "browser" ? openFolder : onOpenSource}>
              <FolderOpen size={16} />
              <span>{hasGraph ? "Change folder" : "Open folder"}</span>
              <ArrowUpRight size={15} className="hidden sm:block" />
            </button>
          </div>
        </header>

        <div className={cn(
          "relative grid min-h-0 flex-1 gap-3",
          drawerOpen && rightRailOpen && "xl:grid-cols-[18rem_minmax(0,1fr)_18rem]",
          drawerOpen && !rightRailOpen && "xl:grid-cols-[18rem_minmax(0,1fr)]",
          !drawerOpen && rightRailOpen && "xl:grid-cols-[minmax(0,1fr)_18rem]"
        )}>
          {(drawerOpen || rightRailOpen) && shellMode !== "desktop" ? (
            <button
              type="button"
              className="absolute inset-0 z-20 bg-slate-950/60 xl:hidden"
              aria-label="Close side panel"
              onClick={closeResponsiveRails}
            />
          ) : null}
          <aside
            id="nebula-explorer"
            aria-label="Explorer"
            className={cn(
              "nebula-rail absolute inset-y-0 left-0 z-30 w-[min(20rem,calc(100vw-1.5rem))] space-y-3 overflow-y-auto rounded-[1.2rem] bg-[var(--surface-elevated)] p-2 shadow-2xl xl:static xl:w-auto xl:bg-transparent xl:p-0 xl:shadow-none",
              !drawerOpen && "hidden"
            )}
          >
            <QuickFilters />
            <ProjectTree />
          </aside>

          <div id="nebula-graph" className="nebula-stage relative min-h-0 overflow-hidden rounded-[1.2rem] border border-[var(--line-strong)]">
            {hasGraph ? (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-start justify-between gap-3 p-3 sm:p-5">
                <div className="nebula-stage-banner max-w-[calc(100%-8rem)] rounded-xl px-3 py-2 sm:px-4 sm:py-3">
                  <div className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">Workspace / {sourceMode === "browser" ? "Snapshot" : "Live"}</div>
                  <div className="mt-1 truncate text-sm font-medium text-white sm:text-base">{formatRootLabel(currentRoot)}</div>
                </div>
                <div className="pointer-events-auto flex gap-1 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] p-1">
                  {topActions.map((mode) => (
                    <button key={mode} type="button" className={cn("nebula-mode", interactionMode === mode && "is-active")} aria-pressed={interactionMode === mode} onClick={() => setInteractionMode(mode)}>{mode}</button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="absolute inset-0">
              <ReactFlowOverlay enabled />
            </div>

            {!sourceLoading && !hasGraph ? (
              <div className="nebula-empty absolute inset-0 z-10 flex items-center">
                <div className="nebula-empty-content relative z-10 px-7 py-12 sm:px-12 lg:px-[clamp(4rem,9vw,10rem)]">
                  <div className="nebula-eyebrow"><span className="nebula-eyebrow-line" /> A clearer view of everything</div>
                  <h2 className="mt-4 max-w-[13ch] text-[clamp(3rem,5.3vw,5.4rem)] font-medium leading-[0.99] tracking-[-0.075em] text-white">See the shape<br /><span>of your work.</span></h2>
                  <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-[var(--muted)] sm:text-[1.08rem]">Turn any folder into a beautiful, explorable map of your files.</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <button type="button" className="nebula-primary nebula-empty-primary" onClick={openFolder}><FolderOpen size={18} />Open a folder<ArrowUpRight size={17} /></button>
                    <button type="button" className="nebula-text-action" onClick={onOpenSource}>Connect a live workspace <ArrowUpRight size={15} /></button>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-[var(--subtle)]">Private by design. File contents stay on your device.</p>
                </div>
                <div className="nebula-orbit" aria-hidden="true"><i /><i /><i /><span className="nebula-orbit-core" /><span className="nebula-orbit-point point-one" /><span className="nebula-orbit-point point-two" /><span className="nebula-orbit-point point-three" /><span className="nebula-orbit-point point-four" /></div>
              </div>
            ) : null}

            {sourceLoading ? (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm text-[var(--muted)]">
                Preparing workspace...
              </div>
            ) : null}

            {sourceError && !sourceModalOpen ? (
              <div className="absolute bottom-24 left-4 z-20 max-w-md rounded-[1.4rem] border border-rose-400/25 bg-rose-500/10 px-4 py-4 text-sm leading-6 text-rose-100 shadow-lg">
                <div className="font-semibold">Source error</div>
                <div className="mt-1 opacity-90">{sourceError}</div>
              </div>
            ) : null}

            {hasGraph ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 sm:p-5">
                <div className="nebula-status-strip flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs sm:px-4">
                  <div className="flex items-center gap-2 text-[var(--muted)]"><span className={cn("nebula-connection-dot", sourceMode !== "browser" && connected && "is-live")} />{sourceMode === "browser" ? "Local snapshot" : connected ? "Live connection" : "Standby"}</div>
                  <div className="flex items-center gap-4 text-[var(--muted)]"><span><strong className="font-medium text-white">{nodeArray.length}</strong> items</span><span><strong className="font-medium text-white">{edgeArray.length}</strong> links</span><span className="hidden sm:inline">{layoutEngine} / {layoutMode}</span></div>
                </div>
              </div>
            ) : null}
          </div>

          <aside
            id="nebula-inspector"
            aria-label="Inspector"
            className={cn(
              "nebula-rail absolute inset-y-0 right-0 z-30 w-[min(20rem,calc(100vw-1.5rem))] overflow-y-auto rounded-[1.2rem] bg-[var(--surface-elevated)] p-2 shadow-2xl xl:static xl:w-auto xl:bg-transparent xl:p-0 xl:shadow-none",
              !rightRailOpen && "hidden"
            )}
          >
            <InspectorRail
              tone={statusTone.tone}
              toneLabel={statusTone.label}
              toneDetail={statusTone.detail}
              currentRoot={currentRoot}
              sourceMode={sourceMode}
              status={status}
              onOpenSource={onOpenSource}
            />
          </aside>
        </div>
      </div>

      <SourceModal
        open={sourceModalOpen}
        loading={sourceSelecting}
        error={sourceError}
        localAccessSession={localAccessSession}
        serverAvailable={serverAvailable}
        onClose={onCloseSource}
        onRequestLocalAccess={onRequestLocalAccess}
        onSelectedServer={onSelectedServer}
        onSelectedLocal={onSelectedLocal}
        onSelectedBrowser={onSelectedBrowser}
      />
    </div>
  );
}
