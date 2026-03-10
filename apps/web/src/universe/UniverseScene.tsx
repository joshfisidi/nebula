"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UniverseLiveProvider } from "./UniverseLiveProvider";
import { ProjectViewerPanel } from "./ProjectViewerPanel";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { fetchSourceCurrent, fetchSourceList, selectSource, type SourceFolder } from "./sourceApi";
import { useUniverseGraphStore, type InteractionMode } from "./graphStore";

type SourceSelectMode = "server" | "local";

function SourceModal({
  open,
  onClose,
  onSelected,
  onLocalPick
}: {
  open: boolean;
  onClose: () => void;
  onSelected: (path: string, mode: SourceSelectMode) => void;
  onLocalPick: (files: FileList) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allowedRoots, setAllowedRoots] = useState<string[]>([]);
  const [selectedRoot, setSelectedRoot] = useState<string>("");
  const [folders, setFolders] = useState<SourceFolder[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [manualPath, setManualPath] = useState("");
  const localInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (localInputRef.current) {
      localInputRef.current.setAttribute("webkitdirectory", "");
      localInputRef.current.setAttribute("directory", "");
      localInputRef.current.setAttribute("multiple", "");
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const current = await fetchSourceCurrent();
        if (cancelled) return;
        const roots = current.allowedRoots ?? [];
        setAllowedRoots(roots);
        const root = roots[0] ?? "";
        setSelectedRoot(root);

        if (current.currentRoot) {
          setSelectedPath(current.currentRoot);
          setManualPath(current.currentRoot);
        }

        if (root) {
          const listing = await fetchSourceList(root);
          if (cancelled) return;
          setFolders(listing.folders ?? []);
        }
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  const refreshList = useMemo(
    () =>
      async (base: string) => {
        try {
          setError(null);
          const listing = await fetchSourceList(base);
          setFolders(listing.folders ?? []);
        } catch (e) {
          setError(String(e));
        }
      },
    []
  );

  const submit = async () => {
    const path = manualPath.trim() || selectedPath;
    if (!path) {
      setError("Select a folder or paste a path");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await selectSource(path);
      if (res.currentRoot) {
        onSelected(res.currentRoot, "server");
      }
      onClose();
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700/80 bg-slate-950 p-4 text-slate-100 shadow-2xl">
        <div className="mb-3 text-lg font-semibold">Select folder source</div>
        <div className="mb-2 text-sm text-slate-400">Pick any allowed root folder to spawn the project mind map.</div>

        <label className="mb-2 block text-xs text-slate-400">Root</label>
        <select
          className="mb-3 h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm"
          value={selectedRoot}
          onChange={(e) => {
            const next = e.target.value;
            setSelectedRoot(next);
            void refreshList(next);
          }}
        >
          {allowedRoots.map((root) => (
            <option key={root} value={root}>
              {root}
            </option>
          ))}
        </select>

        <label className="mb-2 block text-xs text-slate-400">Folder</label>
        <select
          className="mb-3 h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm"
          value={selectedPath}
          onChange={(e) => {
            setSelectedPath(e.target.value);
            setManualPath(e.target.value);
          }}
        >
          <option value="">Select folder…</option>
          {folders.map((folder) => (
            <option key={folder.path} value={folder.path}>
              {folder.name}
            </option>
          ))}
        </select>

        <label className="mb-2 block text-xs text-slate-400">Or paste path</label>
        <input
          className="mb-3 h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm"
          value={manualPath}
          onChange={(e) => setManualPath(e.target.value)}
          placeholder="/absolute/path"
        />

        {error && <div className="mb-3 text-xs text-rose-300">{error}</div>}

        <input
          ref={localInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              onLocalPick(files);
              onSelected("local", "local");
              onClose();
            }
          }}
        />

        <div className="mb-3 flex justify-start">
          <Button
            variant="outline"
            onClick={() => localInputRef.current?.click()}
            className="border-slate-700"
          >
            pick local folder (browser)
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? "selecting..." : "use folder"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ mobile, onOpenSource }: { mobile: boolean; onOpenSource: () => void }) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodes = useUniverseGraphStore((s) => s.nodeArray);
  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);
  const drawerOpen = useUniverseGraphStore((s) => s.drawerOpen);
  const interactionMode = useUniverseGraphStore((s) => s.interactionMode);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const layoutEngine = useUniverseGraphStore((s) => s.layoutEngine);
  const showHiddenNodes = useUniverseGraphStore((s) => s.showHiddenNodes);
  const setDrawerOpen = useUniverseGraphStore((s) => s.setDrawerOpen);
  const setInteractionMode = useUniverseGraphStore((s) => s.setInteractionMode);
  const setLayoutMode = useUniverseGraphStore((s) => s.setLayoutMode);
  const setShowHiddenNodes = useUniverseGraphStore((s) => s.setShowHiddenNodes);
  const [flashVisible, setFlashVisible] = useState(true);

  useEffect(() => {
    setFlashVisible(true);
    const timer = window.setTimeout(() => setFlashVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, [connected, layoutEngine, layoutMode]);

  const projectLabel = useMemo(() => {
    if (selectedProjectIds.size === 0) return "no project";

    const projectNames = nodes
      .filter((node) => !node.parentId && selectedProjectIds.has(node.projectId))
      .map((node) => node.name)
      .sort((a, b) => a.localeCompare(b));

    if (projectNames.length === 1) return projectNames[0] ?? "project";
    return `${projectNames.length} projects`;
  }, [nodes, selectedProjectIds]);

  const statusLine = `${projectLabel} • ${connected ? "connected" : "disconnected"} • ${layoutEngine} • ${nodes.length} nodes`;
  const emphasize = !connected || drawerOpen || interactionMode !== "browse" || searchQuery.trim().length > 0 || flashVisible;

  const renderModeButton = (mode: InteractionMode) => (
    <Button
      key={mode}
      type="button"
      variant={interactionMode === mode ? "default" : "ghost"}
      size="sm"
      className="h-7 rounded-full px-2.5 text-[11px]"
      onClick={() => setInteractionMode(mode)}
      aria-pressed={interactionMode === mode}
    >
      {mode}
    </Button>
  );

  return (
    <div
      className={cn(
        "nebula-status-bar absolute left-1/2 top-3 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 flex-wrap items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-2 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100",
        emphasize ? "opacity-100" : "opacity-65",
        mobile && "w-[calc(100vw-1.5rem)] justify-center rounded-3xl px-3 py-3"
      )}
    >
      <Button
        type="button"
        variant={drawerOpen ? "default" : "outline"}
        size="sm"
        className="h-8 rounded-full border-slate-700/80 px-3"
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-controls="project-drawer"
        aria-expanded={drawerOpen}
        aria-label={drawerOpen ? "Collapse project navigator" : "Expand project navigator"}
      >
        navigator
      </Button>

      <Button type="button" variant="ghost" size="sm" className="h-8 rounded-full px-3" onClick={onOpenSource}>
        source
      </Button>

      <div className="min-w-0 flex-1 truncate px-1 text-center text-xs text-slate-300">{statusLine}</div>

      <div className="flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/70 p-1" role="group" aria-label="Layout mode">
        <Button
          type="button"
          variant={layoutMode === "focus" ? "default" : "ghost"}
          size="sm"
          className="h-7 rounded-full px-2.5 text-[11px]"
          onClick={() => setLayoutMode("focus")}
          aria-pressed={layoutMode === "focus"}
        >
          focus
        </Button>
        <Button
          type="button"
          variant={layoutMode === "overview" ? "default" : "ghost"}
          size="sm"
          className="h-7 rounded-full px-2.5 text-[11px]"
          onClick={() => setLayoutMode("overview")}
          aria-pressed={layoutMode === "overview"}
        >
          audit
        </Button>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/70 p-1" role="group" aria-label="Interaction mode">
        {(["browse", "pan", "edit"] as const).map(renderModeButton)}
      </div>

      <Button
        type="button"
        variant={showHiddenNodes ? "default" : "ghost"}
        size="sm"
        className="h-7 rounded-full px-2.5 text-[11px]"
        onClick={() => setShowHiddenNodes(!showHiddenNodes)}
        aria-pressed={showHiddenNodes}
      >
        hidden
      </Button>
    </div>
  );
}

function buildLocalSnapshot(files: FileList) {
  type NodeRecord = {
    id: string;
    path: string;
    name: string;
    kind: "dir" | "file";
    parentId: string | null;
    depth: number;
    children: string[];
    pos: { x: number; y: number; z: number };
  };

  const nodes = new Map<string, NodeRecord>();
  const rootLabel = (files[0]?.webkitRelativePath?.split("/")[0] || "local").trim() || "local";
  const rootId = `local:${rootLabel}`;

  nodes.set(rootId, {
    id: rootId,
    path: rootLabel,
    name: rootLabel,
    kind: "dir",
    parentId: null,
    depth: 0,
    children: [],
    pos: { x: 0, y: 0, z: 0 }
  });

  for (const file of Array.from(files)) {
    const rel = (file.webkitRelativePath || file.name).replace(/\\/g, "/");
    const parts = rel.split("/").filter(Boolean);
    if (parts.length === 0) continue;

    let parent = rootId;
    let depth = 1;
    for (let i = 1; i < parts.length; i += 1) {
      const name = parts[i] as string;
      const isLeaf = i === parts.length - 1;
      const id = `${rootId}/${parts.slice(1, i + 1).join("/")}`;
      if (!nodes.has(id)) {
        nodes.set(id, {
          id,
          path: `${rootLabel}/${parts.slice(1, i + 1).join("/")}`,
          name,
          kind: isLeaf ? "file" : "dir",
          parentId: parent,
          depth,
          children: [],
          pos: { x: depth * 1.2, y: 0, z: 0 }
        });
      }
      const parentNode = nodes.get(parent);
      if (parentNode && !parentNode.children.includes(id)) parentNode.children.push(id);
      parent = id;
      depth += 1;
    }
  }

  const edgeOut: Array<{ id: string; from: string; to: string; kind: "contains" | "imports" | "references" }> = [];
  for (const n of nodes.values()) {
    if (n.parentId) {
      edgeOut.push({ id: `edge:${n.parentId}:${n.id}`, from: n.parentId, to: n.id, kind: "contains" });
    }
  }

  return {
    type: "snapshot" as const,
    graph: {
      nodes: Array.from(nodes.values()),
      edges: edgeOut
    }
  };
}

export function UniverseScene() {
  const [mobile, setMobile] = useState(false);
  const [sourceModalOpen, setSourceModalOpen] = useState(true);
  const [wsEnabled, setWsEnabled] = useState(true);
  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
  const setConnected = useUniverseGraphStore((s) => s.setConnected);

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const current = await fetchSourceCurrent();
        if (cancelled) return;
        setWsEnabled(Boolean(current.currentRoot));
        setSourceModalOpen(Boolean(current.requireSource && !current.currentRoot));
      } catch {
        if (!cancelled) setSourceModalOpen(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <UniverseLiveProvider enabled={wsEnabled}>
      <div style={{ position: "relative", width: "100%", height: "100dvh", background: "#070b14" }}>
        <StatusBar mobile={mobile} onOpenSource={() => setSourceModalOpen(true)} />
        <ProjectViewerPanel />
        <ReactFlowOverlay enabled />
        <SourceModal
          open={sourceModalOpen}
          onClose={() => setSourceModalOpen(false)}
          onSelected={(_, mode) => {
            setWsEnabled(mode === "server");
            if (mode === "local") setConnected(true);
            setSourceModalOpen(false);
          }}
          onLocalPick={(files) => {
            setWsEnabled(false);
            applySnapshot(buildLocalSnapshot(files) as any);
            setConnected(true);
          }}
        />
      </div>
    </UniverseLiveProvider>
  );
}
