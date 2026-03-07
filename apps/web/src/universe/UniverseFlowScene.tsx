"use client";

import { UniverseLiveProvider } from "./UniverseLiveProvider";
import { ProjectViewerPanel } from "./ProjectViewerPanel";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { useUniverseGraphStore } from "./graphStore";

function StatusHud() {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);
  const selectedProjectCount = useUniverseGraphStore((s) => s.selectedProjectIds.size);

  return (
    <div className="absolute right-3 top-3 z-20 min-w-[8.25rem] rounded-md border border-blue-300/30 bg-slate-950/70 px-2.5 py-2 text-xs leading-5 text-blue-100 backdrop-blur-sm">
      <div>mode: react-flow</div>
      <div>ws: {connected ? "connected" : "disconnected"}</div>
      <div>nodes: {nodeCount}</div>
      <div>edges: {edgeCount}</div>
      <div>projects: {selectedProjectCount}</div>
    </div>
  );
}

export function UniverseFlowScene() {
  return (
    <UniverseLiveProvider>
      <div className="relative h-screen w-full overflow-hidden">
        <StatusHud />
        <ProjectViewerPanel />
        <ReactFlowOverlay enabled />
      </div>
    </UniverseLiveProvider>
  );
}
