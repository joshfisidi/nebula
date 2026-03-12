"use client";

import { useEffect, useRef, useState } from "react";
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

export function UniverseFlowScene({ preview = false }: { preview?: boolean }) {
  const [currentRoot, setCurrentRoot] = useState<string | null>(null);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [sourceSelecting, setSourceSelecting] = useState(false);
  const [wsEnabled, setWsEnabled] = useState(false);
  const [status, setStatus] = useState<UniverseConnectionStatus>({ phase: "idle" });
  const [localAccessSession, setLocalAccessSession] = useState<LocalAccessSession | null>(null);
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

        const detectedSession = await fetchLocalAccessSession();
        if (cancelled) return;

        if (detectedSession) {
          setLocalAccessSession(detectedSession);
          setCurrentRoot(detectedSession.sourcePath ?? null);
          setWsEnabled(false);

          if (detectedSession.sourcePath) {
            await loadLocalAccessSnapshot(detectedSession.token);
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
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [applySnapshot, selectAllProjects, setConnected]);

  const handleRequestLocalAccess = async () => {
    setSourceSelecting(true);
    setSourceError(null);
    try {
      const detectedSession = await fetchLocalAccessSession();
      if (!detectedSession) {
        throw new Error("Local access agent not found on localhost:8787. Start Nebula Sync to grant workspace access.");
      }
      setLocalAccessSession(detectedSession);
      setWsEnabled(false);
      const granted = await requestLocalFolderAccess(detectedSession.token);
      const nextSourcePath = granted?.sourcePath ?? detectedSession.sourcePath;

      if (nextSourcePath) {
        setCurrentRoot(nextSourcePath);
        await loadLocalAccessSnapshot(detectedSession.token);
        setSourceModalOpen(false);
      } else {
        setCurrentRoot(null);
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
      setLocalAccessSession(null);
      setCurrentRoot(result.currentRoot ?? null);
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
        localAccessSession={localAccessSession}
        sourceModalOpen={sourceModalOpen}
        sourceLoading={sourceLoading}
        sourceSelecting={sourceSelecting}
        sourceError={sourceError}
        wsEnabled={wsEnabled}
        status={status}
        onOpenSource={() => setSourceModalOpen(true)}
        onCloseSource={() => setSourceModalOpen(false)}
        onRequestLocalAccess={handleRequestLocalAccess}
        onSelectedServer={handleSelectSource}
        onSelectedLocal={handleSelectLocalAccessSource}
      />
    </UniverseLiveProvider>
  );
}
