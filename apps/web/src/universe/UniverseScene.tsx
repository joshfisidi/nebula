"use client";

import { useEffect, useState } from "react";
import { UniverseLiveProvider } from "./UniverseLiveProvider";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { ProjectViewerPanel } from "./ProjectViewerPanel";
import { useUniverseGraphStore } from "./graphStore";

function StatusHud({ mobile }: { mobile: boolean }) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);

  return (
    <div
      style={{
        position: "fixed",
        top: mobile ? "auto" : "0.75rem",
        bottom: mobile ? "0.75rem" : "auto",
        right: "0.75rem",
        zIndex: 30,
        fontSize: "0.75rem",
        lineHeight: 1.35,
        color: "#d6e7ff",
        background: "rgba(7,12,23,0.72)",
        border: "1px solid rgba(105,159,255,0.32)",
        borderRadius: "0.625rem",
        padding: "0.5rem 0.625rem",
        minWidth: "7.5rem"
      }}
    >
      <div>ws: {connected ? "connected" : "disconnected"}</div>
      <div>nodes: {nodeCount}</div>
      <div>edges: {edgeCount}</div>
      <div>mode: react-flow semantic-field</div>
    </div>
  );
}

export function UniverseScene() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <UniverseLiveProvider>
      <div style={{ position: "relative", width: "100%", height: "100vh", background: "#070b14" }}>
        <StatusHud mobile={mobile} />
        <ProjectViewerPanel />
        <ReactFlowOverlay enabled />
      </div>
    </UniverseLiveProvider>
  );
}
