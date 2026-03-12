"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
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
  Search,
  Sparkles,
  Wifi,
  WifiOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { useUniverseGraphStore, type InteractionMode, type RenderNode } from "./graphStore";
import type { LayoutMode } from "./layoutEngines";
import type { LocalAccessSession, SourceFolder } from "./sourceApi";
import type { UniverseConnectionStatus } from "./UniverseLiveProvider";

type SourceMode = "local-access" | "server";
type SearchMode = "global" | "focus";

type ControlRoomShellProps = {
  preview?: boolean;
  currentRoot: string | null;
  localAccessSession: LocalAccessSession | null;
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
}): { tone: "good" | "warn" | "danger" | "idle"; label: string; detail: string } {
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
      label: "Source setup required",
      detail: "Grant local folder access or choose a server-backed folder to begin."
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
  if (width < 1320) return "tablet";
  return "desktop";
}

function SourceModal({
  open,
  loading,
  error,
  localAccessSession,
  onClose,
  onRequestLocalAccess,
  onSelectedServer,
  onSelectedLocal
}: {
  open: boolean;
  loading: boolean;
  error: string | null;
  localAccessSession: LocalAccessSession | null;
  onClose: () => void;
  onRequestLocalAccess: () => void;
  onSelectedServer: (path: string) => void;
  onSelectedLocal: (path: string) => void;
}) {
  const [roots, setRoots] = useState<string[]>([]);
  const [selectedRoot, setSelectedRoot] = useState("");
  const [folders, setFolders] = useState<SourceFolder[]>([]);
  const [manualPath, setManualPath] = useState("");
  const [selectedFolderPath, setSelectedFolderPath] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

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
  }, [localAccessSession, open]);

  if (!open) return null;

  const effectiveError = error ?? localError;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[rgba(3,8,17,0.74)] p-4 backdrop-blur-xl">
      <div className="nebula-panel w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--line-strong)] shadow-[0_40px_120px_rgba(2,6,23,0.64)]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(145deg,rgba(14,165,233,0.18),rgba(249,115,22,0.08)_60%,rgba(15,23,42,0.08))] p-6 lg:border-b-0 lg:border-r">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-100">
                <Radar size={20} />
              </div>
              <div>
                <div className="text-[0.72rem] uppercase tracking-[0.34em] text-cyan-100/70">Nebula Control Room</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">Choose a live graph source</h2>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-200/78">
              Grant local folder access for the fastest live workspace loop, or fall back to the runtime server when
              you need a manually selected watch root.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.4rem] border border-cyan-300/20 bg-slate-950/38 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Badge className="rounded-full border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-cyan-100">
                    Recommended
                  </Badge>
                  <Sparkles size={18} className="text-cyan-100/80" />
                </div>
                <div className="text-lg font-semibold text-white">Live Local Workspace</div>
                <p className="mt-2 text-sm leading-6 text-slate-300/82">
                  Grant folder access once, then let the local agent stream live graph updates into the control room.
                </p>
                <div className="mt-5">
                  <Button
                    className="h-11 w-full rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                    disabled={loading}
                    onClick={onRequestLocalAccess}
                  >
                    {localAccessSession ? "Local Access Granted" : "Grant Local Folder Access"}
                  </Button>
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-[var(--line)] bg-slate-950/42 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em]">
                    Fallback
                  </Badge>
                  <Network size={18} className="text-slate-200/72" />
                </div>
                <div className="text-lg font-semibold text-white">Runtime server mode</div>
                <p className="mt-2 text-sm leading-6 text-slate-300/82">
                  Use a server-backed watch root when local access is unavailable or when remote access is required.
                </p>
                <div className="mt-5 rounded-2xl border border-[var(--line)] bg-white/[0.02] p-3 text-xs leading-5 text-slate-300/78">
                  Source listing and folder selection remain fully supported here.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(3,8,17,0.92)] p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-[0.72rem] uppercase tracking-[0.3em] text-slate-400">Source path</div>
                <div className="mt-1 text-lg font-semibold text-white">Route the graph stage</div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full" onClick={onClose}>
                close
              </Button>
            </div>

            <label htmlFor="source-root" className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
              Root
            </label>
            <NativeSelect
              id="source-root"
              className="mb-4 h-11 rounded-2xl border-[var(--line)] bg-[var(--surface-strong)]"
              value={selectedRoot}
              onChange={async (event) => {
                const root = event.target.value;
                setSelectedRoot(root);
                try {
                  const sourceApi = await import("./sourceApi");
                  const list = localAccessSession?.token
                    ? await sourceApi.fetchLocalAccessSourceList(localAccessSession.token, root)
                    : await sourceApi.fetchSourceList(root);
                  setFolders(list.folders ?? []);
                } catch (err) {
                  setLocalError(err instanceof Error ? err.message : String(err));
                }
              }}
            >
              {roots.map((root) => (
                <NativeSelectOption key={root} value={root}>
                  {root}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <label htmlFor="source-folder" className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
              Folder
            </label>
            <NativeSelect
              id="source-folder"
              className="mb-4 h-11 rounded-2xl border-[var(--line)] bg-[var(--surface-strong)]"
              value={selectedFolderPath}
              onChange={(event) => {
                setSelectedFolderPath(event.target.value);
                setManualPath(event.target.value);
              }}
            >
              <NativeSelectOption value="">Select folder...</NativeSelectOption>
              {folders.map((folder) => (
                <NativeSelectOption key={folder.path} value={folder.path}>
                  {folder.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <label htmlFor="manual-path" className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
              Manual path
            </label>
            <Input
              id="manual-path"
              className="mb-4 h-11 rounded-2xl border-[var(--line)] bg-[var(--surface-strong)]"
              value={manualPath}
              onChange={(event) => setManualPath(event.target.value)}
              placeholder="/absolute/path"
            />

            {effectiveError ? (
              <div className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {effectiveError}
              </div>
            ) : (
              <div className="mb-4 rounded-2xl border border-[var(--line)] bg-white/[0.02] px-4 py-3 text-sm text-slate-300/82">
                {localAccessSession?.token
                  ? "Local workspace access is available. Folder changes will refresh the graph from the local agent."
                  : "Server mode will continue to use the runtime API and websocket connection."}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" className="rounded-2xl border-[var(--line)]" onClick={onClose}>
                Keep current state
              </Button>
              <Button
                className="rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#0ea5e9)] text-slate-950 hover:opacity-95"
                disabled={loading}
                onClick={() => {
                  const path = manualPath.trim() || selectedFolderPath;
                  if (localAccessSession?.token) onSelectedLocal(path);
                  else onSelectedServer(path);
                }}
              >
                {loading ? "Routing graph..." : "Load into control room"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <CardTitle className="mt-1 text-lg text-white">Project lattice</CardTitle>
          </div>
          <Badge className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em]">
            {projects.length} roots
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/[0.02] p-3">
          <div className="mb-2 flex items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-slate-400">
            <span>Scope</span>
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
              Select at least one project to map the explorer rail.
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

function QuickFilters({ searchMode, onSearchModeChange }: { searchMode: SearchMode; onSearchModeChange: (value: SearchMode) => void }) {
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);
  const setSearchQuery = useUniverseGraphStore((s) => s.setSearchQuery);
  const showHiddenNodes = useUniverseGraphStore((s) => s.showHiddenNodes);
  const setShowHiddenNodes = useUniverseGraphStore((s) => s.setShowHiddenNodes);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const setLayoutMode = useUniverseGraphStore((s) => s.setLayoutMode);

  return (
    <Card className="nebula-panel rounded-[1.8rem]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white">Command filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input
            className="h-11 rounded-2xl border-[var(--line)] bg-[var(--surface-strong)] pl-11"
            placeholder={searchMode === "focus" ? "Search from current focus" : "Search every visible path"}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={searchMode === "global" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => onSearchModeChange("global")}
          >
            Global
          </Button>
          <Button
            variant={searchMode === "focus" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => onSearchModeChange("focus")}
          >
            Focus
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Button
            variant={layoutMode === "overview" ? "default" : "outline"}
            className="justify-start rounded-2xl"
            onClick={() => setLayoutMode("overview")}
          >
            <Layers3 size={16} className="mr-2" />
            Overview map
          </Button>
          <Button
            variant={layoutMode === "focus" ? "default" : "outline"}
            className="justify-start rounded-2xl"
            onClick={() => setLayoutMode("focus")}
          >
            <Radar size={16} className="mr-2" />
            Focus lane
          </Button>
        </div>

        <Button
          variant={showHiddenNodes ? "default" : "outline"}
          className="w-full justify-start rounded-2xl"
          onClick={() => setShowHiddenNodes(!showHiddenNodes)}
        >
          <HardDrive size={16} className="mr-2" />
          {showHiddenNodes ? "Hidden infrastructure visible" : "Reveal hidden infrastructure"}
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
  localAccessSession,
  status,
  onOpenSource
}: {
  tone: "good" | "warn" | "danger" | "idle";
  toneLabel: string;
  toneDetail: string;
  currentRoot: string | null;
  localAccessSession: LocalAccessSession | null;
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
              <CardTitle className="mt-1 text-lg text-white">Focused signal</CardTitle>
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
              Focus a node in the graph stage to inspect its path, structure, and branch context.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="nebula-panel rounded-[1.8rem]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Runtime status</CardTitle>
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
              <span className="font-medium text-white">{localAccessSession ? "local-access" : "server"}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-slate-400">Current root</span>
              <span className="max-w-[12rem] truncate font-medium text-white">{formatRootLabel(currentRoot)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-slate-400">Runtime phase</span>
              <span className="font-medium text-white">{status.phase}</span>
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
            Re-route source
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
  onSelectedLocal
}: ControlRoomShellProps) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeArray = useUniverseGraphStore((s) => s.nodeArray);
  const edgeArray = useUniverseGraphStore((s) => s.edgeArray);
  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);
  const interactionMode = useUniverseGraphStore((s) => s.interactionMode);
  const setInteractionMode = useUniverseGraphStore((s) => s.setInteractionMode);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const layoutEngine = useUniverseGraphStore((s) => s.layoutEngine);
  const drawerOpen = useUniverseGraphStore((s) => s.drawerOpen);
  const setDrawerOpen = useUniverseGraphStore((s) => s.setDrawerOpen);

  const [searchMode, setSearchMode] = useState<SearchMode>("global");
  const [rightRailOpen, setRightRailOpen] = useState(true);
  const shellMode = useShellMode();

  useEffect(() => {
    if (shellMode === "mobile") {
      setDrawerOpen(false);
      setRightRailOpen(false);
      return;
    }

    setDrawerOpen(true);
    setRightRailOpen(true);
  }, [setDrawerOpen, shellMode]);

  const statusTone = deriveStatusTone({ localAccessSession, currentRoot, status, wsEnabled });
  const graphStateText = sourceLoading
    ? "Checking control-room source..."
    : !currentRoot
      ? "No active source. Open source routing to begin."
      : nodeArray.length === 0
        ? "Source connected, waiting for the graph to populate."
        : connected
          ? "Live signal is feeding the graph stage."
          : localAccessSession
            ? "Local workspace snapshot loaded."
            : "Source loaded. Runtime is on standby.";

  const topActions: InteractionMode[] = ["browse", "pan", "edit"];

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div className="nebula-atmosphere" />
      <div className="relative z-10 flex h-full flex-col gap-4 p-3 sm:p-4 lg:p-5">
        <Card className="nebula-panel shrink-0 rounded-[1.8rem]">
          <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.4rem] border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
                <Radar size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-[0.72rem] uppercase tracking-[0.34em] text-cyan-100/70">Nebula Control Room</div>
                  {preview ? (
                    <Badge className="rounded-full border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-fuchsia-100">
                      Preview route
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">File-system operations cockpit</h1>
                  <Badge className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]">
                    {layoutEngine}
                  </Badge>
                </div>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-300/78">
                  {graphStateText}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-[var(--line)]"
                onClick={() => setDrawerOpen(!drawerOpen)}
                aria-pressed={drawerOpen}
              >
                <PanelLeft size={16} className="mr-2" />
                Explorer
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-[var(--line)]"
                onClick={() => setRightRailOpen(!rightRailOpen)}
                aria-pressed={rightRailOpen}
              >
                <PanelRight size={16} className="mr-2" />
                Inspector
              </Button>
              <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100" size="sm" onClick={onOpenSource}>
                <HardDrive size={16} className="mr-2" />
                Source routing
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[22rem_minmax(0,1fr)_22rem]">
          <div className={cn("min-h-0 space-y-4", !drawerOpen && "hidden xl:hidden", drawerOpen && "block")}>
            <QuickFilters searchMode={searchMode} onSearchModeChange={setSearchMode} />
            <ProjectTree />
          </div>

          <div className="nebula-stage relative min-h-0 overflow-hidden rounded-[2rem] border border-[var(--line-strong)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="nebula-stage-banner max-w-xl rounded-[1.2rem] px-4 py-3">
                <div className="text-[0.72rem] uppercase tracking-[0.24em] text-slate-400">Stage feed</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold text-white">{formatRootLabel(currentRoot)}</span>
                  <Badge className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]">
                    {localAccessSession ? "local-access" : "server"}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]">
                    {layoutMode}
                  </Badge>
                </div>
              </div>

              <div className="pointer-events-auto flex flex-wrap gap-2">
                {topActions.map((mode) => (
                  <Button
                    key={mode}
                    size="sm"
                    variant={interactionMode === mode ? "default" : "outline"}
                    className="rounded-full border-[var(--line)]"
                    onClick={() => setInteractionMode(mode)}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>

            <div className="absolute inset-0">
              <ReactFlowOverlay enabled />
            </div>

            {sourceLoading ? (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[rgba(2,6,23,0.36)]">
                <div className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--surface-strong)] px-6 py-5 text-center shadow-2xl">
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-slate-400">Boot sequence</div>
                  <div className="mt-2 text-lg font-semibold text-white">Checking source configuration</div>
                </div>
              </div>
            ) : null}

            {sourceError && !sourceModalOpen ? (
              <div className="absolute bottom-24 left-4 z-20 max-w-md rounded-[1.4rem] border border-rose-400/25 bg-rose-500/10 px-4 py-4 text-sm leading-6 text-rose-100 shadow-lg">
                <div className="font-semibold">Source error</div>
                <div className="mt-1 opacity-90">{sourceError}</div>
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4">
              <div className="nebula-status-strip flex flex-col gap-3 rounded-[1.4rem] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]">
                    {connected ? (
                      <>
                        <Wifi size={13} className="mr-1.5" />
                        live
                      </>
                    ) : (
                      <>
                        <WifiOff size={13} className="mr-1.5" />
                        standby
                      </>
                    )}
                  </Badge>
                  <span className="text-sm text-slate-300/82">{statusTone.detail}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1">
                    <Blocks size={14} className="text-cyan-200" />
                    {nodeArray.length} nodes
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1">
                    <Network size={14} className="text-cyan-200" />
                    {edgeArray.length} edges
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1">
                    <Activity size={14} className="text-cyan-200" />
                    {selectedProjectIds.size || 0} active projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={cn("min-h-0", !rightRailOpen && "hidden xl:hidden", rightRailOpen && "block")}>
            <InspectorRail
              tone={statusTone.tone}
              toneLabel={statusTone.label}
              toneDetail={statusTone.detail}
              currentRoot={currentRoot}
              localAccessSession={localAccessSession}
              status={status}
              onOpenSource={onOpenSource}
            />
          </div>
        </div>
      </div>

      <SourceModal
        open={sourceModalOpen}
        loading={sourceSelecting}
        error={sourceError}
        localAccessSession={localAccessSession}
        onClose={onCloseSource}
        onRequestLocalAccess={onRequestLocalAccess}
        onSelectedServer={onSelectedServer}
        onSelectedLocal={onSelectedLocal}
      />
    </div>
  );
}
