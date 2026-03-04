"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import type { UniverseEvent } from "@nebula/protocol";
import { DeepSpaceStarfield } from "./DeepSpaceStarfield";
import { EdgeSystem } from "./EdgeSystem";
import { LabelSystem } from "./LabelSystem";
import { NodeSystem } from "./NodeSystem";
import { OrbitGuideSystem } from "./OrbitGuideSystem";
import { useUniverseStore } from "./store";

interface ViewProfile {
  compact: boolean;
  coarsePointer: boolean;
  portrait: boolean;
}

const DEFAULT_TUNING = {
  springK: 0.002,
  damping: 0.965,
  noise: 0.00035,
  gravity: 0.004
} as const;

function detectViewProfile(): ViewProfile {
  if (typeof window === "undefined") {
    return {
      compact: false,
      coarsePointer: false,
      portrait: false
    };
  }

  const compactByWidth = window.innerWidth <= 940;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(any-pointer: coarse)").matches;
  const portrait = window.innerHeight >= window.innerWidth;

  return {
    compact: compactByWidth || coarsePointer,
    coarsePointer,
    portrait
  };
}

function listenMediaChange(query: MediaQueryList, onChange: () => void): () => void {
  const queryWithLegacy = query as MediaQueryList & {
    addListener?: (listener: () => void) => void;
    removeListener?: (listener: () => void) => void;
  };

  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }

  queryWithLegacy.addListener?.(onChange);
  return () => queryWithLegacy.removeListener?.(onChange);
}

function useViewProfile(): ViewProfile {
  const [profile, setProfile] = useState<ViewProfile>(() => detectViewProfile());

  useEffect(() => {
    const update = () => setProfile(detectViewProfile());

    update();

    const coarse = window.matchMedia("(pointer: coarse)");
    const anyCoarse = window.matchMedia("(any-pointer: coarse)");

    const unlistenCoarse = listenMediaChange(coarse, update);
    const unlistenAnyCoarse = listenMediaChange(anyCoarse, update);

    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update);

    return () => {
      unlistenCoarse();
      unlistenAnyCoarse();
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return profile;
}

function SimulationLoop() {
  useFrame((state, delta) => {
    useUniverseStore.getState().tick(delta, state.clock.elapsedTime);
  });

  return null;
}

interface ControlPanelProps {
  compact: boolean;
  showLabels: boolean;
  labelLimit: number;
  setShowLabels: (next: boolean) => void;
  setLabelLimit: (next: number) => void;
}

function ControlPanel({ compact, showLabels, labelLimit, setShowLabels, setLabelLimit }: ControlPanelProps) {
  const nodeCount = useUniverseStore((s) => s.nodeCount);
  const edgeCount = useUniverseStore((s) => s.edgeCount);
  const connected = useUniverseStore((s) => s.connected);
  const nodeVersion = useUniverseStore((s) => s.nodeVersion);
  const selectedProjectIds = useUniverseStore((s) => s.selectedProjectIds);
  const toggleProjectSelection = useUniverseStore((s) => s.toggleProjectSelection);
  const selectAllProjects = useUniverseStore((s) => s.selectAllProjects);
  const selectedNodeId = useUniverseStore((s) => s.selectedNodeId);
  const setSelectedNodeId = useUniverseStore((s) => s.setSelectedNodeId);
  const collapsedNodeIds = useUniverseStore((s) => s.collapsedNodeIds);
  const toggleCollapsedNode = useUniverseStore((s) => s.toggleCollapsedNode);
  const searchQuery = useUniverseStore((s) => s.searchQuery);
  const setSearchQuery = useUniverseStore((s) => s.setSearchQuery);
  const visibleTypes = useUniverseStore((s) => s.visibleTypes);
  const toggleVisibleType = useUniverseStore((s) => s.toggleVisibleType);
  const viewMode = useUniverseStore((s) => s.viewMode);
  const setViewMode = useUniverseStore((s) => s.setViewMode);
  const [collapsed, setCollapsed] = useState(false);

  const projects = useMemo(
    () =>
      Array.from(useUniverseStore.getState().projects.entries()).sort((a, b) =>
        a[1].name.localeCompare(b[1].name)
      ),
    [nodeVersion]
  );

  const treeNodes = useMemo(() => {
    const store = useUniverseStore.getState();
    return Array.from(store.nodes.values())
      .filter((runtime) => store.selectedProjectIds.has(runtime.node.projectId))
      .sort((a, b) => a.depth - b.depth || a.node.path.localeCompare(b.node.path))
      .slice(0, 500)
      .map((runtime) => ({ runtime, visible: store.isNodeVisible(runtime.node.id) }));
  }, [nodeVersion, selectedProjectIds, searchQuery, visibleTypes, collapsedNodeIds]);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return useUniverseStore.getState().nodes.get(selectedNodeId)?.node ?? null;
  }, [selectedNodeId, nodeVersion]);

  return (
    <div
      style={{
        position: "fixed",
        right: compact ? "max(8px, env(safe-area-inset-right))" : 12,
        left: compact ? "max(8px, env(safe-area-inset-left))" : "auto",
        top: compact ? "auto" : 12,
        bottom: compact ? "max(8px, env(safe-area-inset-bottom))" : "auto",
        zIndex: 6,
        width: compact ? "auto" : 338,
        maxHeight: compact ? "36dvh" : "52vh",
        overflow: "auto",
        padding: compact ? "8px 10px" : "10px 12px",
        fontSize: compact ? 11 : 12,
        border: "1px solid rgba(77, 255, 194, 0.28)",
        background: "rgba(6, 10, 24, 0.76)",
        backdropFilter: "blur(6px)",
        borderRadius: 10
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <strong style={{ color: "#b7d7ff", letterSpacing: 0.2 }}>Projects</strong>
          <div style={{ marginTop: 3, color: "#d7e8ff", opacity: 0.9 }}>
            nodes: {nodeCount} | edges: {edgeCount} | ws: {connected ? "connected" : "disconnected"}
          </div>
        </div>
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          style={{
            fontSize: compact ? 12 : 11,
            minHeight: compact ? 32 : 24,
            minWidth: compact ? 52 : 44,
            padding: compact ? "0 10px" : "0 8px",
            borderRadius: 8,
            border: "1px solid rgba(137, 168, 255, 0.42)",
            background: "rgba(25, 35, 64, 0.7)",
            color: "#d5e4ff",
            cursor: "pointer"
          }}
        >
          {collapsed ? "open" : "hide"}
        </button>
      </div>

      {!collapsed && (
        <>
          <div
            style={{
              display: "grid",
              gap: 7,
              marginTop: 10,
              marginBottom: 10,
              paddingTop: 9,
              borderTop: "1px solid rgba(126, 175, 255, 0.22)"
            }}
          >
            <label style={{ display: "flex", gap: 8, alignItems: "center", color: "#d9eeff" }}>
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(event) => setShowLabels(event.target.checked)}
                style={{ width: compact ? 17 : 14, height: compact ? 17 : 14 }}
              />
              <span>show labels</span>
            </label>

            <label style={{ display: "grid", gap: 4, color: "#d9eeff" }}>
              <span>label limit: {labelLimit}</span>
              <input
                type="range"
                min={20}
                max={700}
                step={10}
                value={labelLimit}
                onChange={(event) => setLabelLimit(Number(event.target.value))}
              />
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
            <strong style={{ color: "#b7d7ff" }}>View</strong>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setViewMode("lattice")}
                style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, cursor: "pointer", opacity: viewMode === "lattice" ? 1 : 0.65 }}
              >
                lattice
              </button>
              <button
                onClick={() => setViewMode("presentation3d")}
                style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, cursor: "pointer", opacity: viewMode === "presentation3d" ? 1 : 0.65 }}
              >
                3d
              </button>
            </div>
          </div>

          <label style={{ display: "grid", gap: 4, color: "#d9eeff", marginBottom: 10 }}>
            <span>search</span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="filter by file/folder path"
              style={{ borderRadius: 8, border: "1px solid rgba(137,168,255,0.35)", background: "rgba(10,14,26,0.65)", color: "#d9eeff", padding: "6px 8px" }}
            />
          </label>

          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {(["PROJECT", "FOLDER", "FILE"] as const).map((type) => (
              <label key={type} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input type="checkbox" checked={visibleTypes.has(type)} onChange={() => toggleVisibleType(type)} />
                <span style={{ color: "#d9eeff", fontSize: 11 }}>{type.toLowerCase()}</span>
              </label>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
            <strong style={{ color: "#b7d7ff" }}>Visible Projects</strong>
            <button
              onClick={selectAllProjects}
              style={{
                fontSize: compact ? 12 : 11,
                minHeight: compact ? 32 : 24,
                padding: compact ? "0 10px" : "0 8px",
                borderRadius: 8,
                border: "1px solid rgba(137, 168, 255, 0.42)",
                background: "rgba(25, 35, 64, 0.7)",
                color: "#d5e4ff",
                cursor: "pointer"
              }}
            >
              select all
            </button>
          </div>

          {projects.map(([projectId, project]) => {
            const checked = selectedProjectIds.has(projectId);
            return (
              <label key={projectId} style={{ display: "flex", gap: 9, alignItems: "center", minHeight: compact ? 28 : 22, marginBottom: 6, color: "#d9eeff" }}>
                <input type="checkbox" checked={checked} onChange={() => toggleProjectSelection(projectId)} style={{ width: compact ? 17 : 14, height: compact ? 17 : 14 }} />
                <span style={{ lineHeight: 1.3 }}>{project.name}</span>
              </label>
            );
          })}

          <div style={{ marginTop: 10, borderTop: "1px solid rgba(126, 175, 255, 0.22)", paddingTop: 8 }}>
            <strong style={{ color: "#b7d7ff" }}>Tree</strong>
            <div style={{ color: "#9fb7d8", fontSize: 10, marginTop: 4 }}>showing first 500 nodes for performance</div>
            <div style={{ maxHeight: 180, overflow: "auto", marginTop: 6 }}>
              {treeNodes.map(({ runtime, visible }) => {
                const isCollapsed = collapsedNodeIds.has(runtime.node.id);
                const canCollapse = runtime.node.type !== "FILE";
                const isSelected = selectedNodeId === runtime.node.id;
                return (
                  <div key={runtime.node.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, opacity: visible ? 1 : 0.45 }}>
                    <button onClick={() => setSelectedNodeId(runtime.node.id)} style={{ cursor: "pointer", borderRadius: 6, border: "1px solid rgba(137,168,255,0.28)", background: isSelected ? "rgba(95,130,255,0.35)" : "rgba(18,24,44,0.6)", color: "#d9eeff", padding: "2px 6px", marginLeft: runtime.depth * 10 }}>
                      {runtime.node.type === "PROJECT" ? "P" : runtime.node.type === "FOLDER" ? "D" : "F"}
                    </button>
                    {canCollapse && (
                      <button onClick={() => toggleCollapsedNode(runtime.node.id)} style={{ cursor: "pointer", borderRadius: 6 }}>
                        {isCollapsed ? "+" : "-"}
                      </button>
                    )}
                    <span style={{ color: "#d9eeff", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {runtime.node.path.split(/[\\/]/).filter(Boolean).pop()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedNode && (
            <div style={{ marginTop: 10, borderTop: "1px solid rgba(126, 175, 255, 0.22)", paddingTop: 8 }}>
              <strong style={{ color: "#b7d7ff" }}>Inspector</strong>
              <div style={{ color: "#d9eeff", fontSize: 11, marginTop: 6 }}>type: {selectedNode.type}</div>
              <div style={{ color: "#d9eeff", fontSize: 11 }}>path: {selectedNode.path}</div>
              <div style={{ marginTop: 6 }}>
                <button
                  onClick={() => navigator.clipboard?.writeText(selectedNode.path)}
                  style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, cursor: "pointer" }}
                >
                  copy path
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function resolveWsUrl(): string {
  if (process.env.NEXT_PUBLIC_NEBULA_WS_URL) {
    return process.env.NEXT_PUBLIC_NEBULA_WS_URL;
  }

  const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
  const configuredPort = process.env.NEXT_PUBLIC_NEBULA_WS_PORT ?? "4001";

  let hostname = window.location.hostname;
  if (hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]" || hostname === "") {
    hostname = "localhost";
  }

  return `${wsProtocol}://${hostname}:${configuredPort}`;
}

export function UniverseScene() {
  const setConnectionStatus = useUniverseStore((s) => s.setConnectionStatus);
  const ingestEvent = useUniverseStore((s) => s.ingestEvent);
  const setTuning = useUniverseStore((s) => s.setTuning);
  const connected = useUniverseStore((s) => s.connected);
  const nodeCount = useUniverseStore((s) => s.nodeCount);
  const viewMode = useUniverseStore((s) => s.viewMode);
  const viewProfile = useViewProfile();
  const [wsUrl, setWsUrl] = useState("");
  const [showLabels, setShowLabels] = useState(false);
  const [labelLimit, setLabelLimit] = useState(180);

  const camera = useMemo(() => {
    if (viewMode === "presentation3d") {
      return viewProfile.compact
        ? {
            position: [0, viewProfile.portrait ? 18 : 16, viewProfile.portrait ? 92 : 82] as [number, number, number],
            fov: viewProfile.portrait ? 58 : 54
          }
        : { position: [0, 24, 68] as [number, number, number], fov: 48 };
    }

    return viewProfile.compact
      ? { position: [0, 6, 110] as [number, number, number], fov: 44 }
      : { position: [0, 4, 96] as [number, number, number], fov: 38 };
  }, [viewMode, viewProfile.compact, viewProfile.portrait]);

  const dpr = useMemo<[number, number]>(() => (viewProfile.compact ? [1, 1.35] : [1, 1.75]), [viewProfile.compact]);

  useEffect(() => {
    setTuning(DEFAULT_TUNING);
  }, [setTuning]);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let retryTimer: number | null = null;
    let disposed = false;

    const resolvedWsUrl = resolveWsUrl();
    setWsUrl(resolvedWsUrl);

    const connect = () => {
      if (disposed) return;
      socket = new WebSocket(resolvedWsUrl);

      socket.onopen = () => {
        if (disposed) return;
        setConnectionStatus(true);
      };

      socket.onclose = () => {
        if (disposed) return;
        setConnectionStatus(false);
        retryTimer = window.setTimeout(connect, 900);
      };

      socket.onerror = () => {
        if (disposed) return;
        setConnectionStatus(false);
      };

      socket.onmessage = (message) => {
        if (disposed) return;
        try {
          const event = JSON.parse(message.data) as UniverseEvent;
          ingestEvent(event);
        } catch {
          // ignore malformed messages
        }
      };
    };

    connect();

    return () => {
      disposed = true;
      if (retryTimer !== null) {
        window.clearTimeout(retryTimer);
      }
      if (socket) {
        socket.onopen = null;
        socket.onclose = null;
        socket.onerror = null;
        socket.onmessage = null;
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      }
      setConnectionStatus(false);
    };
  }, [ingestEvent, setConnectionStatus]);

  return (
    <>
      <ControlPanel
        compact={viewProfile.compact}
        showLabels={showLabels}
        labelLimit={labelLimit}
        setShowLabels={setShowLabels}
        setLabelLimit={setLabelLimit}
      />
      {viewProfile.coarsePointer && (
        <div
          style={{
            position: "fixed",
            right: "max(8px, env(safe-area-inset-right))",
            top: "max(62px, calc(env(safe-area-inset-top) + 56px))",
            zIndex: 6,
            padding: "6px 9px",
            fontSize: 10,
            border: "1px solid rgba(136, 198, 255, 0.34)",
            borderRadius: 8,
            background: "rgba(5, 10, 20, 0.6)",
            color: "#cfe8ff",
            pointerEvents: "none"
          }}
        >
          1-finger: orbit | 2-finger: zoom + pan
        </div>
      )}
      {!connected && (
        <div
          style={{
            position: "fixed",
            left: "max(8px, env(safe-area-inset-left))",
            right: "max(8px, env(safe-area-inset-right))",
            bottom: "max(8px, env(safe-area-inset-bottom))",
            zIndex: 6,
            maxWidth: viewProfile.compact ? "none" : 540,
            padding: "10px 12px",
            fontSize: viewProfile.compact ? 11 : 12,
            letterSpacing: 0.3,
            border: "1px solid rgba(255, 173, 96, 0.35)",
            background: "rgba(20, 10, 3, 0.72)",
            backdropFilter: "blur(6px)",
            borderRadius: 10,
            color: "#ffd8ad"
          }}
        >
          <div style={{ marginBottom: 4 }}>Nebula is waiting for data stream.</div>
          <div style={{ opacity: 0.9 }}>WebSocket: {wsUrl || "resolving..."}</div>
          <div style={{ opacity: 0.82 }}>
            Start stack: <code>pnpm dev</code>. If opened on <code>0.0.0.0</code>, use <code>localhost</code> or device IP.
          </div>
        </div>
      )}
      {connected && nodeCount === 0 && (
        <div
          style={{
            position: "fixed",
            left: "max(8px, env(safe-area-inset-left))",
            right: "max(8px, env(safe-area-inset-right))",
            bottom: "max(8px, env(safe-area-inset-bottom))",
            zIndex: 6,
            maxWidth: viewProfile.compact ? "none" : 540,
            padding: "10px 12px",
            fontSize: viewProfile.compact ? 11 : 12,
            letterSpacing: 0.3,
            border: "1px solid rgba(160, 224, 255, 0.3)",
            background: "rgba(4, 8, 18, 0.72)",
            backdropFilter: "blur(6px)",
            borderRadius: 10,
            color: "#d7f0ff"
          }}
        >
          <div style={{ marginBottom: 4 }}>Connected, but no files were ingested yet.</div>
          <div style={{ opacity: 0.82 }}>
            Nebula only visualizes existing files and folders under the watch root. Initial scan may still be in progress.
          </div>
        </div>
      )}
      <Canvas
        className="nebula-canvas"
        camera={camera}
        dpr={dpr}
        gl={{ antialias: !viewProfile.compact, powerPreference: viewProfile.compact ? "low-power" : "high-performance" }}
      >
        <color attach="background" args={viewMode === "presentation3d" ? ["#02040b"] : ["#070b14"]} />
        <fogExp2 attach="fog" args={viewMode === "presentation3d" ? ["#02040b", 0.0065] : ["#070b14", 0.0038]} />
        <ambientLight intensity={viewMode === "presentation3d" ? 0.33 : 0.58} />
        <hemisphereLight args={["#89a8ff", "#050912", viewMode === "presentation3d" ? 0.52 : 0.3]} />
        <directionalLight position={[22, 24, 18]} intensity={viewMode === "presentation3d" ? 1.05 : 0.82} color="#ffeaca" />

        {viewMode === "presentation3d" && <DeepSpaceStarfield />}
        {viewMode === "presentation3d" && <OrbitGuideSystem />}
        <NodeSystem />
        <EdgeSystem />
        {showLabels && <LabelSystem limit={labelLimit} />}

        <EffectComposer>
          <Bloom intensity={0.45} luminanceThreshold={0.18} luminanceSmoothing={0.62} mipmapBlur />
        </EffectComposer>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={viewProfile.compact ? 0.12 : 0.08}
          minDistance={viewMode === "presentation3d" ? (viewProfile.compact ? 30 : 24) : 18}
          maxDistance={viewMode === "presentation3d" ? (viewProfile.compact ? 320 : 260) : 240}
          rotateSpeed={viewProfile.compact ? 0.84 : 0.64}
          zoomSpeed={viewProfile.compact ? 0.95 : 1}
          panSpeed={viewProfile.compact ? 0.7 : 0.86}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
        />

        <SimulationLoop />
        <PerformanceMonitor />
      </Canvas>
    </>
  );
}
