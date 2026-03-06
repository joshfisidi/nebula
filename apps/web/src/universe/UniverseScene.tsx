"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { UniverseLiveProvider } from "./UniverseLiveProvider";
import { EdgeSystem } from "./EdgeSystem";
import { LabelSystem } from "./LabelSystem";
import { NodeSystem } from "./NodeSystem";
import { ParticleSystem } from "./ParticleSystem";
import { Starfield } from "./Starfield";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { ProjectViewerPanel } from "./ProjectViewerPanel";
import { useUniverseGraphStore } from "./graphStore";

function StatusHud({ flowEnabled }: { flowEnabled: boolean }) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);

  return (
    <div
      style={{
        position: "fixed",
        top: "0.75rem",
        right: "0.75rem",
        zIndex: 5,
        fontSize: "0.75rem",
        lineHeight: 1.35,
        color: "#d6e7ff",
        background: "rgba(7,12,23,0.65)",
        border: "1px solid rgba(105,159,255,0.32)",
        borderRadius: "0.625rem",
        padding: "0.5rem 0.625rem",
        minWidth: "7.5rem"
      }}
    >
      <div>ws: {connected ? "connected" : "disconnected"}</div>
      <div>nodes: {nodeCount}</div>
      <div>edges: {edgeCount}</div>
      <div>flow: {flowEnabled ? "enabled" : "disabled"} (press "f")</div>
    </div>
  );
}

export function UniverseScene() {
  const camera = useMemo(() => ({ position: [0, 0, 120] as [number, number, number], fov: 42 }), []);
  const [flowEnabled, setFlowEnabled] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "f") {
        setFlowEnabled((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <UniverseLiveProvider>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <StatusHud flowEnabled={flowEnabled} />
        <ProjectViewerPanel />
        <Canvas camera={camera} dpr={[1, 1.75]}>
          <color attach="background" args={["#050910"]} />
          <ambientLight intensity={0.65} />
          <hemisphereLight args={["#95bdff", "#060a12", 0.42]} />
          <directionalLight position={[15, 20, 14]} intensity={0.9} />

          <Starfield />
          <ParticleSystem />
          <EdgeSystem />
          <NodeSystem />
          <LabelSystem />

          <EffectComposer>
            <Bloom intensity={0.34} luminanceThreshold={0.2} luminanceSmoothing={0.7} mipmapBlur />
          </EffectComposer>

          <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={10} maxDistance={500} />
        </Canvas>

        <ReactFlowOverlay enabled={flowEnabled} />
      </div>
    </UniverseLiveProvider>
  );
}
