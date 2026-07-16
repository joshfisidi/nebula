"use client";

import { useEffect, useRef, useState } from "react";
import { pickBrowserWorkspaceSnapshot } from "./browserSource";
import { ControlRoomShell } from "./ControlRoomShell";
import { useUniverseGraphStore } from "./graphStore";
import {
  fetchLocalAccessSession,
  fetchSourceCurrent,
  fetchLocalAccessSnapshot,
  requestLocalFolderAccess,
  selectSource,
  selectLocalAccessSource,
  type LocalAccessSession
} from "./sourceApi";
import { UniverseLiveProvider, type UniverseConnectionStatus } from "./UniverseLiveProvider";

type SourceMode = "browser" | "local-access" | "server";

export function UniverseFlowScene({ preview = false }: { preview?: boolean }) {
  const [currentRoot, setCurrentRoot] = useState<string | null>(null);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [sourceSelecting, setSourceSelecting] = useState(false);
  const [wsEnabled, setWsEnabled] = useState(false);
  const [status, setStatus] = useState<UniverseConnectionStatus>({ phase: "idle" });
  const [localAccessSession, setLocalAccessSession] = useState<LocalAccessSession | null>(null);
  const [sourceMode, setSourceMode] = useState<SourceMode | null>(null);
  const autoSelectedRootRef = useRef<string | null>(null);

  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
  const setConnected = useUniverseGraphStore((s) => s.setConnected);
  const selectAllProjects = useUniverseGraphStore((s) => s.selectAllProjects);
  const nodeArray = useUniverseGraphStore((s) => s.nodeArray);
  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);

  const loadLocalAccessSnapshot = async (token: string) => {
    const tree = await fetchLocalAccessSnapshot(token);

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
    applySnapshot({ type: "snapshot", t: Date.now(), graph: { nodes, edges } });
    setConnected(true);
    selectAllProjects();
  };

  useEffect(() => {
    if (currentRoot !== autoSelectedRootRef.current) {
      autoSelectedRootRef.current = null;
    }
  }, [currentRoot]);

  useEffect(() => {
    if (!currentRoot || nodeArray.length === 0 || selectedProjectIds.size > 0) return;
    if (autoSelectedRootRef.current === currentRoot) return;
    selectAllProjects();
    autoSelectedRootRef.current = currentRoot;
  }, [currentRoot, nodeArray.length, selectAllProjects, selectedProjectIds.size]);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        setSourceError(null);
        setSourceLoading(true);

        const detectedSessionPromise = fetchLocalAccessSession().catch(() => null);
        const current = await fetchSourceCurrent().catch(() => null);
        const detectedSession = await detectedSessionPromise;
        if (cancelled) return;

        setLocalAccessSession(detectedSession);

        if (current?.currentRoot) {
          setCurrentRoot(current.currentRoot);
          setSourceMode("server");
          setWsEnabled(true);
          setSourceModalOpen(false);
          return;
        }

        setCurrentRoot(null);
        setSourceMode(null);
        setWsEnabled(false);
        setSourceModalOpen(true);
      } finally {
        if (!cancelled) setSourceLoading(false);
      }
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [applySnapshot, selectAllProjects, setConnected]);

  const handleRequestBrowserAccess = async () => {
    setSourceSelecting(true);
    setSourceError(null);
    try {
      const browserWorkspace = await pickBrowserWorkspaceSnapshot();
      applySnapshot(browserWorkspace.snapshot);
      setConnected(true);
      selectAllProjects();
      setCurrentRoot(browserWorkspace.rootPath);
      setSourceMode("browser");
      setWsEnabled(false);
      setSourceModalOpen(false);
    } catch (err) {
      setSourceError(err instanceof Error ? err.message : String(err));
    } finally {
      setSourceSelecting(false);
    }
  };

  const handleRequestLocalAccess = async () => {
    setSourceSelecting(true);
    setSourceError(null);
    try {
      const detectedSession = await fetchLocalAccessSession();
      if (!detectedSession) {
        throw new Error("Local access agent not found on localhost:8787. Choose a folder in the browser or start the local access agent for background syncing.");
      }
      setLocalAccessSession(detectedSession);
      setWsEnabled(false);
      const granted = await requestLocalFolderAccess(detectedSession.token);
      const nextSourcePath = granted?.sourcePath ?? detectedSession.sourcePath;

      if (nextSourcePath) {
        setCurrentRoot(nextSourcePath);
        await loadLocalAccessSnapshot(detectedSession.token);
        setSourceMode("local-access");
        setSourceModalOpen(false);
      } else {
        setCurrentRoot(null);
        setSourceMode(null);
        setSourceModalOpen(true);
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
      setSourceMode(result.currentRoot ? "server" : null);
      setWsEnabled(Boolean(result.currentRoot));
      setSourceModalOpen(false);
    } catch (err) {
      setSourceError(err instanceof Error ? err.message : String(err));
    } finally {
      setSourceSelecting(false);
    }
  };

  const handleSelectLocalAccessSource = async (path: string) => {
    if (!localAccessSession?.token) {
      setSourceError("Local access agent not connected.");
      return;
    }
    if (!path) {
      setSourceError("Select a folder first.");
      return;
    }

    setSourceSelecting(true);
    setSourceError(null);
    try {
      const result = await selectLocalAccessSource(localAccessSession.token, path);
      setCurrentRoot(result.sourcePath ?? null);
      await loadLocalAccessSnapshot(localAccessSession.token);
      setSourceMode(result.sourcePath ? "local-access" : null);
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
      <ControlRoomShell
        preview={preview}
        currentRoot={currentRoot}
        sourceMode={sourceMode}
        localAccessSession={localAccessSession}
        sourceModalOpen={sourceModalOpen}
        sourceLoading={sourceLoading}
        sourceSelecting={sourceSelecting}
        sourceError={sourceError}
        wsEnabled={wsEnabled}
        status={status}
        onOpenSource={() => setSourceModalOpen(true)}
        onCloseSource={() => setSourceModalOpen(false)}
        onRequestBrowserAccess={handleRequestBrowserAccess}
        onRequestLocalAccess={handleRequestLocalAccess}
        onSelectedServer={handleSelectSource}
        onSelectedLocal={handleSelectLocalAccessSource}
      />
    </UniverseLiveProvider>
  );
}
