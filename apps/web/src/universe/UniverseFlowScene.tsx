"use client";

import { useEffect, useMemo, useState } from "react";
import { UniverseLiveProvider, type UniverseConnectionStatus } from "./UniverseLiveProvider";
import { ProjectViewerPanel } from "./ProjectViewerPanel";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import {
  detectNebulaSyncBridge,
  fetchSourceCurrent,
  fetchSourceList,
  nebulaSyncSelectSource,
  nebulaSyncSnapshot,
  nebulaSyncSourceList,
  selectSource,
  type NebulaSyncHandshake,
  type SourceFolder
} from "./sourceApi";
import { useUniverseGraphStore } from "./graphStore";

type SourceMode = "local-sync" | "server";

function SourceModal({
  open,
  loading,
  error,
  bridge,
  onClose,
  onConnectBridge,
  onSelectedServer,
  onSelectedLocal
}: {
  open: boolean;
  loading: boolean;
  error: string | null;
  bridge: NebulaSyncHandshake | null;
  onClose: () => void;
  onConnectBridge: () => void;
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

    (async () => {
      try {
        setLocalError(null);
        if (bridge?.token) {
          const base = bridge.sourcePath ?? "/Users";
          setRoots([base]);
          setSelectedRoot(base);
          const list = await nebulaSyncSourceList(bridge.token, base);
          if (cancelled) return;
          setFolders(list.folders ?? []);
          if (bridge.sourcePath) {
            setSelectedFolderPath(bridge.sourcePath);
            setManualPath(bridge.sourcePath);
          }
          return;
        }

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
  }, [open, bridge]);

  if (!open) return null;

  const effectiveError = error ?? localError;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700/80 bg-slate-950 p-4 text-slate-100 shadow-2xl">
        <div className="mb-2 text-lg font-semibold">Select source</div>

        <div className="mb-4 rounded-lg border border-cyan-700/40 bg-cyan-950/20 p-3">
          <div className="mb-1 text-sm font-medium">1) Local via Nebula Sync (recommended)</div>
          <div className="mb-2 text-xs text-slate-300">One-click bridge connect. No token/path entry required.</div>
          <button
            className="rounded-md bg-cyan-600 px-3 py-2 text-xs text-white hover:bg-cyan-500 disabled:opacity-60"
            disabled={loading}
            onClick={onConnectBridge}
          >
            {bridge ? "Connected to Nebula Sync" : "Connect Nebula Sync"}
          </button>
        </div>

        <div className="mb-3 text-xs font-semibold text-slate-300">2) Server mode fallback</div>

        <label className="mb-1 block text-xs text-slate-400">Root</label>
        <select
          className="mb-3 h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm"
          value={selectedRoot}
          onChange={async (event) => {
            const root = event.target.value;
            setSelectedRoot(root);
            try {
              const list = bridge?.token ? await nebulaSyncSourceList(bridge.token, root) : await fetchSourceList(root);
              setFolders(list.folders ?? []);
            } catch (err) {
              setLocalError(err instanceof Error ? err.message : String(err));
            }
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
            onClick={() => {
              const path = manualPath.trim() || selectedFolderPath;
              if (bridge?.token) onSelectedLocal(path);
              else onSelectedServer(path);
            }}
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
  localBridge,
  onOpenSource
}: {
  status: UniverseConnectionStatus;
  currentRoot: string | null;
  localBridge: boolean;
  onOpenSource: () => void;
}) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);

  return (
    <div className="absolute right-3 top-3 z-20 min-w-[10rem] rounded-md border border-blue-300/30 bg-slate-950/75 px-2.5 py-2 text-xs leading-5 text-blue-100 backdrop-blur-sm">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span>mode: {localBridge ? "local-sync" : "server"}</span>
        <button className="text-[11px] text-blue-200 underline-offset-2 hover:underline" onClick={onOpenSource}>source</button>
      </div>
      <div>ws: {connected ? "connected" : "disconnected"}</div>
      <div>status: {status.phase}{status.message ? ` · ${status.message}` : ""}</div>
      <div title={currentRoot ?? "No source selected"}>root: {currentRoot ? currentRoot.split("/").slice(-2).join("/") : "none"}</div>
      <div>nodes: {nodeCount}</div>
      <div>edges: {edgeCount}</div>
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
  const [bridge, setBridge] = useState<NebulaSyncHandshake | null>(null);

  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
  const setConnected = useUniverseGraphStore((s) => s.setConnected);

  const shouldShowLoading = useMemo(() => sourceLoading || (wsEnabled && status.phase === "connecting"), [sourceLoading, status.phase, wsEnabled]);

  const loadBridgeSnapshot = async (token: string) => {
    const tree = await nebulaSyncSnapshot(token);

    const nodes: Array<any> = [];
    const edges: Array<any> = [];

    const walk = (node: any, parentId: string | null, depth: number) => {
      const id = node.path;
      nodes.push({
        id,
        path: node.path,
        name: node.name,
        kind: node.isDirectory ? "dir" : "file",
        parentId,
        depth
      });
      if (parentId) {
        edges.push({ id: `edge:${parentId}:${id}`, from: parentId, to: id, kind: "contains" });
      }
      for (const child of node.children ?? []) walk(child, id, depth + 1);
    };

    walk(tree, null, 0);
    applySnapshot({ type: "snapshot", graph: { nodes, edges } } as any);
    setConnected(true);
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setSourceError(null);
        setSourceLoading(true);

        const detectedBridge = await detectNebulaSyncBridge();
        if (cancelled) return;

        if (detectedBridge) {
          setBridge(detectedBridge);
          setCurrentRoot(detectedBridge.sourcePath ?? null);
          setWsEnabled(false);
          if (detectedBridge.sourcePath) {
            await loadBridgeSnapshot(detectedBridge.token);
            if (!cancelled) setSourceModalOpen(false);
          } else {
            setSourceModalOpen(true);
          }
          return;
        }

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

  const handleConnectBridge = async () => {
    setSourceSelecting(true);
    setSourceError(null);
    try {
      const detected = await detectNebulaSyncBridge();
      if (!detected) throw new Error("Nebula Sync bridge not found on localhost:8787. Start Nebula Sync app first.");
      setBridge(detected);
      setWsEnabled(false);
      if (detected.sourcePath) {
        setCurrentRoot(detected.sourcePath);
        await loadBridgeSnapshot(detected.token);
        setSourceModalOpen(false);
      }
    } catch (err) {
      setSourceError(err instanceof Error ? err.message : String(err));
    } finally {
      setSourceSelecting(false);
    }
  };

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

  const handleSelectLocalSync = async (path: string) => {
    if (!bridge?.token) {
      setSourceError("Nebula Sync bridge not connected.");
      return;
    }
    if (!path) {
      setSourceError("Select a folder first.");
      return;
    }

    setSourceSelecting(true);
    setSourceError(null);
    try {
      const result = await nebulaSyncSelectSource(bridge.token, path);
      setCurrentRoot(result.sourcePath ?? null);
      await loadBridgeSnapshot(bridge.token);
      setWsEnabled(false);
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
        <StatusHud status={status} currentRoot={currentRoot} localBridge={Boolean(bridge)} onOpenSource={() => setSourceModalOpen(true)} />
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
          bridge={bridge}
          onClose={() => setSourceModalOpen(false)}
          onConnectBridge={handleConnectBridge}
          onSelectedServer={handleSelectSource}
          onSelectedLocal={handleSelectLocalSync}
        />
      </div>
    </UniverseLiveProvider>
  );
}
