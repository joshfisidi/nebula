"use client";

import { useEffect, useRef, useState } from "react";
import { ControlRoomShell } from "./ControlRoomShell";
import { useUniverseGraphStore } from "./graphStore";
import {
  detectNebulaSyncBridge,
  fetchSourceCurrent,
  nebulaSyncSelectSource,
  nebulaSyncSnapshot,
  selectSource,
  type NebulaSyncHandshake
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
  const [bridge, setBridge] = useState<NebulaSyncHandshake | null>(null);
  const autoSelectedRootRef = useRef<string | null>(null);

  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
  const setConnected = useUniverseGraphStore((s) => s.setConnected);
  const selectAllProjects = useUniverseGraphStore((s) => s.selectAllProjects);
  const nodeArray = useUniverseGraphStore((s) => s.nodeArray);
  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);

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
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [applySnapshot, selectAllProjects, setConnected]);

  const handleConnectBridge = async () => {
    setSourceSelecting(true);
    setSourceError(null);
    try {
      const detected = await detectNebulaSyncBridge();
      if (!detected) {
        throw new Error("Nebula Sync bridge not found on localhost:8787. Start Nebula Sync first.");
      }
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
      setBridge(null);
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
      <ControlRoomShell
        preview={preview}
        currentRoot={currentRoot}
        bridge={bridge}
        sourceModalOpen={sourceModalOpen}
        sourceLoading={sourceLoading}
        sourceSelecting={sourceSelecting}
        sourceError={sourceError}
        wsEnabled={wsEnabled}
        status={status}
        onOpenSource={() => setSourceModalOpen(true)}
        onCloseSource={() => setSourceModalOpen(false)}
        onConnectBridge={handleConnectBridge}
        onSelectedServer={handleSelectSource}
        onSelectedLocal={handleSelectLocalSync}
      />
    </UniverseLiveProvider>
  );
}
