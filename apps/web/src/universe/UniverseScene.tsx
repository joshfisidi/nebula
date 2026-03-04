"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { UniverseLiveProvider } from "./UniverseLiveProvider";
import { EdgeSystem } from "./EdgeSystem";
import { LabelSystem } from "./LabelSystem";
import { NodeSystem } from "./NodeSystem";
import { useUniverseGraphStore } from "./graphStore";

function StatusHud() {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);

  return (
    <div style={{ position: "fixed", top: 12, left: 12, zIndex: 5, fontSize: 12, color: "#d6e7ff", background: "rgba(7,12,23,0.65)", border: "1px solid rgba(105,159,255,0.32)", borderRadius: 10, padding: "8px 10px" }}>
      <div>ws: {connected ? "connected" : "disconnected"}</div>
      <div>nodes: {nodeCount}</div>
      <div>edges: {edgeCount}</div>
    </div>
  );
}

export function UniverseScene() {
  const camera = useMemo(() => ({ position: [0, 0, 120] as [number, number, number], fov: 42 }), []);

  return (
    <UniverseLiveProvider>
      <StatusHud />
      <Canvas camera={camera} dpr={[1, 1.75]}>
        <color attach="background" args={["#050910"]} />
        <ambientLight intensity={0.65} />
        <hemisphereLight args={["#95bdff", "#060a12", 0.42]} />
        <directionalLight position={[15, 20, 14]} intensity={0.9} />

        <EdgeSystem />
        <NodeSystem />
        <LabelSystem />

        <EffectComposer>
          <Bloom intensity={0.34} luminanceThreshold={0.2} luminanceSmoothing={0.7} mipmapBlur />
        </EffectComposer>

        <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={10} maxDistance={500} />
      </Canvas>
    </UniverseLiveProvider>
  );
}
