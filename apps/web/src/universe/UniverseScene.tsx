"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UniverseLiveProvider } from "./UniverseLiveProvider";
import { ProjectViewerPanel } from "./ProjectViewerPanel";
import { ReactFlowOverlay } from "./ReactFlowOverlay";
import { useUniverseGraphStore, type InteractionMode } from "./graphStore";

function StatusBar({ mobile }: { mobile: boolean }) {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodes = useUniverseGraphStore((s) => s.nodeArray);
  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);
  const drawerOpen = useUniverseGraphStore((s) => s.drawerOpen);
  const interactionMode = useUniverseGraphStore((s) => s.interactionMode);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const layoutEngine = useUniverseGraphStore((s) => s.layoutEngine);
  const setDrawerOpen = useUniverseGraphStore((s) => s.setDrawerOpen);
  const setInteractionMode = useUniverseGraphStore((s) => s.setInteractionMode);
  const setLayoutMode = useUniverseGraphStore((s) => s.setLayoutMode);
  const [flashVisible, setFlashVisible] = useState(true);

  useEffect(() => {
    setFlashVisible(true);
    const timer = window.setTimeout(() => setFlashVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, [connected, layoutEngine, layoutMode]);

  const projectLabel = useMemo(() => {
    if (selectedProjectIds.size === 0) return "no project";

    const projectNames = nodes
      .filter((node) => !node.parentId && selectedProjectIds.has(node.projectId))
      .map((node) => node.name)
      .sort((a, b) => a.localeCompare(b));

    if (projectNames.length === 1) return projectNames[0] ?? "project";
    return `${projectNames.length} projects`;
  }, [nodes, selectedProjectIds]);

  const statusLine = `${projectLabel} • ${connected ? "connected" : "disconnected"} • ${layoutEngine} • ${nodes.length} nodes`;
  const emphasize = !connected || drawerOpen || interactionMode !== "browse" || searchQuery.trim().length > 0 || flashVisible;

  const renderModeButton = (mode: InteractionMode) => (
    <Button
      key={mode}
      type="button"
      variant={interactionMode === mode ? "default" : "ghost"}
      size="sm"
      className="h-7 rounded-full px-2.5 text-[11px]"
      onClick={() => setInteractionMode(mode)}
      aria-pressed={interactionMode === mode}
    >
      {mode}
    </Button>
  );

  return (
    <div
      className={cn(
        "nebula-status-bar absolute left-1/2 top-3 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 flex-wrap items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-2 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100",
        emphasize ? "opacity-100" : "opacity-65",
        mobile && "w-[calc(100vw-1.5rem)] justify-center rounded-3xl px-3 py-3"
      )}
    >
      <Button
        type="button"
        variant={drawerOpen ? "default" : "outline"}
        size="sm"
        className="h-8 rounded-full border-slate-700/80 px-3"
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-controls="project-drawer"
        aria-expanded={drawerOpen}
        aria-label={drawerOpen ? "Collapse project navigator" : "Expand project navigator"}
      >
        navigator
      </Button>

      <div className="min-w-0 flex-1 truncate px-1 text-center text-xs text-slate-300">{statusLine}</div>

      <div className="flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/70 p-1" role="group" aria-label="Layout mode">
        <Button
          type="button"
          variant={layoutMode === "focus" ? "default" : "ghost"}
          size="sm"
          className="h-7 rounded-full px-2.5 text-[11px]"
          onClick={() => setLayoutMode("focus")}
          aria-pressed={layoutMode === "focus"}
        >
          focus
        </Button>
        <Button
          type="button"
          variant={layoutMode === "overview" ? "default" : "ghost"}
          size="sm"
          className="h-7 rounded-full px-2.5 text-[11px]"
          onClick={() => setLayoutMode("overview")}
          aria-pressed={layoutMode === "overview"}
        >
          audit
        </Button>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/70 p-1" role="group" aria-label="Interaction mode">
        {(["browse", "pan", "edit"] as const).map(renderModeButton)}
      </div>
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
      <div style={{ position: "relative", width: "100%", height: "100dvh", background: "#070b14" }}>
        <StatusBar mobile={mobile} />
        <ProjectViewerPanel />
        <ReactFlowOverlay enabled />
      </div>
    </UniverseLiveProvider>
  );
}
