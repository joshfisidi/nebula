"use client";

import { useEffect, useMemo, useState } from "react";
import { UniverseLiveProvider, type UniverseConnectionStatus } from "./UniverseLiveProvider";
import { ProjectViewerPanel } from "./ProjectViewerPanel";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { fetchSourceCurrent, fetchSourceList, selectSource, type SourceFolder } from "./sourceApi";
import { useUniverseGraphStore } from "./graphStore";

function SourceModal({
  open,
  loading,
  error,
  onClose,
  onSelected
}: {
  open: boolean;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onSelected: (path: string) => void;
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

    (async () => {
      try {
        setLocalError(null);
        const current = await fetchSourceCurrent();
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
          const list = await fetchSourceList(root);
          if (!cancelled) setFolders(list.folders ?? []);
        }
      } catch (err) {
        if (!cancelled) setLocalError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!open) return null;

  const effectiveError = error ?? localError;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700/80 bg-slate-950 p-4 text-slate-100 shadow-2xl">
        <div className="mb-2 text-lg font-semibold">Select source folder</div>
        <div className="mb-3 text-xs text-slate-400">No preload by default. Pick a source folder to start the runtime.</div>

        <label className="mb-1 block text-xs text-slate-400">Allowed root</label>
        <select
          className="mb-3 h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm"
          value={selectedRoot}
          onChange={(event) => {
            const root = event.target.value;
            setSelectedRoot(root);
            void fetchSourceList(root)
              .then((list) => setFolders(list.folders ?? []))
              .catch((err) => setLocalError(err instanceof Error ? err.message : String(err)));
          }}
        >
          {roots.map((root) => (
            <option key={root} value={root}>
              {root}
            </option>
          ))}
        </select>

        <label className="mb-1 block text-xs text-slate-400">Folder</label>
        <select
          className="mb-3 h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm"
          value={selectedFolderPath}
          onChange={(event) => {
            setSelectedFolderPath(event.target.value);
            setManualPath(event.target.value);
          }}
        >
          <option value="">Select folder…</option>
          {folders.map((folder) => (
            <option key={folder.path} value={folder.path}>
              {folder.name}
            </option>
          ))}
        </select>

        <label className="mb-1 block text-xs text-slate-400">Or paste absolute path</label>
        <input
          className="mb-3 h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm"
          value={manualPath}
          onChange={(event) => setManualPath(event.target.value)}
          placeholder="/absolute/path"
        />

        {effectiveError ? <div className="mb-3 text-xs text-rose-300">{effectiveError}</div> : null}

        <div className="flex justify-end gap-2">
          <button className="rounded-md px-3 py-2 text-xs text-slate-300 hover:bg-slate-800" onClick={onClose}>
            close
          </button>
          <button
            className="rounded-md bg-blue-600 px-3 py-2 text-xs text-white hover:bg-blue-500 disabled:opacity-60"
            disabled={loading}
            onClick={() => onSelected(manualPath.trim() || selectedFolderPath)}
          >
            {loading ? "loading…" : "use folder"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusHud({
  status,
  currentRoot,
  onOpenSource
}: {
  status: UniverseConnectionStatus;
  currentRoot: string | null;
  onOpenSource: () => void;
}) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);
  const selectedProjectCount = useUniverseGraphStore((s) => s.selectedProjectIds.size);

  return (
    <div className="absolute right-3 top-3 z-20 min-w-[10rem] rounded-md border border-blue-300/30 bg-slate-950/75 px-2.5 py-2 text-xs leading-5 text-blue-100 backdrop-blur-sm">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span>mode: react-flow</span>
        <button className="text-[11px] text-blue-200 underline-offset-2 hover:underline" onClick={onOpenSource}>
          source
        </button>
      </div>
      <div>ws: {connected ? "connected" : "disconnected"}</div>
      <div>status: {status.phase}{status.message ? ` · ${status.message}` : ""}</div>
      <div title={currentRoot ?? "No source selected"}>root: {currentRoot ? currentRoot.split("/").slice(-2).join("/") : "none"}</div>
      <div>nodes: {nodeCount}</div>
      <div>edges: {edgeCount}</div>
      <div>projects: {selectedProjectCount}</div>
    </div>
  );
}

export function UniverseFlowScene() {
  const [currentRoot, setCurrentRoot] = useState<string | null>(null);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [sourceSelecting, setSourceSelecting] = useState(false);
  const [wsEnabled, setWsEnabled] = useState(false);
  const [status, setStatus] = useState<UniverseConnectionStatus>({ phase: "idle" });

  const shouldShowLoading = useMemo(() => sourceLoading || (wsEnabled && status.phase === "connecting"), [sourceLoading, status.phase, wsEnabled]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setSourceError(null);
        setSourceLoading(true);
        const current = await fetchSourceCurrent();
        if (cancelled) return;
        setCurrentRoot(current.currentRoot ?? null);
        setWsEnabled(Boolean(current.currentRoot));
        setSourceModalOpen(!current.currentRoot);
      } catch (err) {
        if (cancelled) return;
        setSourceError(err instanceof Error ? err.message : String(err));
        setSourceModalOpen(true);
        setWsEnabled(false);
      } finally {
        if (!cancelled) setSourceLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectSource = async (path: string) => {
    if (!path) {
      setSourceError("Select a folder or paste an absolute path.");
      return;
    }

    setSourceSelecting(true);
    setSourceError(null);
    try {
      const result = await selectSource(path);
      setCurrentRoot(result.currentRoot ?? null);
      setWsEnabled(Boolean(result.currentRoot));
      setSourceModalOpen(false);
    } catch (err) {
      setSourceError(err instanceof Error ? err.message : String(err));
    } finally {
      setSourceSelecting(false);
    }
  };

  return (
    <UniverseLiveProvider enabled={wsEnabled} onStatus={setStatus}>
      <div className="relative h-[100dvh] w-full overflow-hidden">
        <StatusHud status={status} currentRoot={currentRoot} onOpenSource={() => setSourceModalOpen(true)} />
        <ProjectViewerPanel />
        <ReactFlowOverlay enabled />

        {shouldShowLoading ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-slate-950/30 text-sm text-slate-200">
            {sourceLoading ? "Checking source configuration…" : "Connecting to runtime…"}
          </div>
        ) : null}

        <SourceModal
          open={sourceModalOpen}
          loading={sourceSelecting}
          error={sourceError}
          onClose={() => setSourceModalOpen(false)}
          onSelected={handleSelectSource}
        />
      </div>
    </UniverseLiveProvider>
  );
}
