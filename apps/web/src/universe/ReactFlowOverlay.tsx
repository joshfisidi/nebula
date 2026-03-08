"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  type Connection,
  type Edge,
  type Node,
  type OnConnect,
  type ReactFlowInstance,
  type Viewport
} from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "@/lib/utils";
import { useUniverseGraphStore } from "./graphStore";
import {
  chooseLayout,
  layoutWithDagre,
  layoutWithElk,
  layoutWithRadial,
  type LayoutEngine
} from "./layoutEngines";

type VisibleNodeKind = "dir" | "file" | "summary";

type VisibleNode = {
  id: string;
  name: string;
  path?: string;
  kind: VisibleNodeKind;
  parentId?: string;
  depth: number;
  expanded: boolean;
  expandable: boolean;
  childCount?: number;
  salience: number;
  z: number;
  position: { x: number; y: number };
};

type FlowNodeData = {
  label: string;
  name: string;
  path?: string;
  kind: VisibleNodeKind;
  depth: number;
  parentId?: string;
  childCount?: number;
  expandable: boolean;
  expanded: boolean;
};

const MAX_INTERACTIVE_NODES = 2500;

function scoreNode(
  node: { id: string; name: string; kind: "dir" | "file"; path?: string },
  search: string,
  focusId: string | null,
  matchedIds: Set<string>
): number {
  let score = node.kind === "dir" ? 25 : 5;
  const normalizedName = node.name.toLowerCase();
  const normalizedPath = (node.path ?? "").toLowerCase();

  if (["package.json", "readme.md", "tsconfig.json", ".env", "next.config.mjs"].includes(normalizedName)) score += 40;
  if (focusId === node.id) score += 400;
  if (matchedIds.has(node.id)) score += 900;
  if (search && (normalizedName.includes(search) || normalizedPath.includes(search))) score += 500;

  return score;
}

function buildNodeAriaLabel(node: VisibleNode): string {
  if (node.kind === "summary") {
    return `Collapsed branch summary, ${node.childCount ?? 0} hidden items`;
  }

  const kind = node.kind === "dir" ? "Folder" : "File";
  const count = typeof node.childCount === "number" && node.childCount > 0 ? `, ${node.childCount} children` : "";
  const state = node.expandable ? (node.expanded ? ", expanded" : ", collapsed") : "";
  return `${kind} ${node.name}${count}${state}`;
}

function buildEdgeAriaLabel(sourceLabel: string, targetLabel: string): string {
  return `Relationship from ${sourceLabel} to ${targetLabel}`;
}

function toFlowNode(node: VisibleNode): Node<FlowNodeData> {
  const isDir = node.kind === "dir";
  const isSummary = node.kind === "summary";
  const normalizedName = node.name.toLowerCase();
  const normalizedPath = (node.path ?? "").toLowerCase();
  const isBubbleGroup =
    /(^|\/)(docs|dist|cache|node_modules)(\/|$)/.test(normalizedPath) ||
    ["docs", "dist", "cache", "node_modules"].includes(normalizedName) ||
    isSummary;

  const label = isSummary ? node.name : isDir ? `${node.expanded ? "▾" : "▸"} ${node.name}` : node.name;
  const width = Math.round(
    Math.max(isBubbleGroup ? 64 : 88, Math.min(isBubbleGroup ? 160 : 220, label.length * (isBubbleGroup ? 6.2 : 6.8) + (isBubbleGroup ? 26 : 24)))
  );
  const height = isBubbleGroup ? 30 : 34;

  return {
    id: node.id,
    position: node.position,
    width,
    height,
    connectable: node.kind !== "summary",
    focusable: true,
    selectable: true,
    ariaLabel: buildNodeAriaLabel(node),
    data: {
      label,
      name: node.name,
      path: node.path,
      kind: node.kind,
      depth: node.depth,
      parentId: node.parentId,
      childCount: node.childCount,
      expandable: node.expandable,
      expanded: node.expanded
    },
    style: {
      background: isBubbleGroup
        ? "rgba(20,35,70,0.95)"
        : isDir
          ? "rgba(15,27,56,0.95)"
          : "rgba(12,20,40,0.92)",
      color: "#dbeafe",
      border: isBubbleGroup
        ? "1px solid rgba(125,211,252,0.88)"
        : isDir
          ? `1px solid hsla(${(node.depth * 43) % 360} 80% ${68 + Math.min(14, node.salience * 4)}% / 0.78)`
          : `1px solid rgba(148,163,184,${Math.min(0.82, 0.36 + node.salience * 0.08)})`,
      borderRadius: isBubbleGroup ? 999 : 10,
      boxShadow: isSummary ? "none" : `0 0 ${8 + node.salience * 7}px rgba(96,165,250,${Math.min(0.28, node.salience * 0.05)})`,
      fontSize: isBubbleGroup ? 10.5 : 11,
      lineHeight: 1.2,
      padding: isBubbleGroup ? "6px 12px" : "6px 8px",
      width,
      height,
      minWidth: width,
      maxWidth: width,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      opacity: isSummary ? 0.9 : Math.max(0.78, 1 - Math.abs(node.z) * 0.02)
    }
  };
}

function toFlowEdge(edge: { id: string; from: string; to: string }, depth: number, sourceLabel: string, targetLabel: string): Edge {
  const hue = (depth * 47) % 360;
  return {
    id: edge.id,
    source: edge.from,
    target: edge.to,
    type: "smoothstep",
    focusable: false,
    ariaLabel: buildEdgeAriaLabel(sourceLabel, targetLabel),
    style: { stroke: `hsla(${hue} 82% 64% / 0.34)`, strokeWidth: 1 }
  };
}

export const ReactFlowOverlay = memo(function ReactFlowOverlay({ enabled }: { enabled: boolean }) {
  const version = useUniverseGraphStore((s) => s.version);
  const connected = useUniverseGraphStore((s) => s.connected);
  const selectedProjectsKey = useUniverseGraphStore((s) => [...s.selectedProjectIds].sort().join("|"));
  const expandedKey = useUniverseGraphStore((s) => [...s.expandedNodeIds].sort().join("|"));
  const focusId = useUniverseGraphStore((s) => s.focusId);
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);
  const interactionMode = useUniverseGraphStore((s) => s.interactionMode);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
  const revealNode = useUniverseGraphStore((s) => s.revealNode);
  const setLayoutEngine = useUniverseGraphStore((s) => s.setLayoutEngine);
  const addEdgeToGraph = useUniverseGraphStore((s) => s.addEdge);

  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const [zoom, setZoom] = useState(0.9);
  const [rf, setRf] = useState<ReactFlowInstance | null>(null);
  const [layoutEngine, setLocalLayoutEngine] = useState<LayoutEngine>("radial");
  const [laidOut, setLaidOut] = useState<{ nodes: Node<FlowNodeData>[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const focusLockRef = useRef(false);
  const focusNodeRef = useRef<string | null>(null);
  const focusUnlockTimerRef = useRef<number | null>(null);
  const viewportCommandTimerRef = useRef<number | null>(null);
  const userNavigatedViewportRef = useRef(false);
  const viewportIntentKeyRef = useRef<string | null>(null);
  const viewportCommandActiveRef = useRef(false);

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = viewport.width < 900;

  const graphSnapshot = useMemo(() => {
    const state = useUniverseGraphStore.getState();
    const search = state.searchQuery.trim().toLowerCase();
    const selectedNodes = state.nodeArray
      .filter((node) => state.selectedProjectIds.size > 0 && state.selectedProjectIds.has(node.projectId))
      .slice(0, MAX_INTERACTIVE_NODES);

    const byId = new Map(selectedNodes.map((node) => [node.id, node]));
    const children = new Map<string, typeof selectedNodes>();
    const roots: typeof selectedNodes = [];

    for (const node of selectedNodes) {
      if (node.parentId && byId.has(node.parentId)) {
        const siblings = children.get(node.parentId) ?? [];
        siblings.push(node);
        children.set(node.parentId, siblings);
      } else {
        roots.push(node);
      }
    }

    for (const siblings of children.values()) {
      siblings.sort((a, b) => a.name.localeCompare(b.name));
    }

    roots.sort((a, b) => a.name.localeCompare(b.name));

    const focus = focusId && byId.has(focusId) ? focusId : roots[0]?.id ?? null;
    const focusTrail = new Set<string>();

    if (focus) {
      let cursor: string | undefined | null = focus;
      while (cursor) {
        focusTrail.add(cursor);
        cursor = byId.get(cursor)?.parentId;
      }
    }

    let primaryRootId = focus;
    while (primaryRootId) {
      const parentId = byId.get(primaryRootId)?.parentId;
      if (!parentId || !byId.has(parentId)) break;
      primaryRootId = parentId;
    }

    const matchedIds = new Set<string>();
    const matchedBranchIds = new Set<string>();

    if (search) {
      for (const node of selectedNodes) {
        if (`${node.name} ${node.path}`.toLowerCase().includes(search)) {
          matchedIds.add(node.id);
          let cursor: string | undefined | null = node.id;
          while (cursor) {
            matchedBranchIds.add(cursor);
            cursor = byId.get(cursor)?.parentId;
          }
        }
      }
    }

    const visible = new Set<string>();
    const queued = new Set<string>();
    const queue: string[] = [];
    const summaryNodes: VisibleNode[] = [];
    const summaryEdges: Array<{ id: string; from: string; to: string; depth: number }> = [];
    const maxVisible = search ? 420 : zoom < 0.38 ? 120 : zoom < 0.65 ? 200 : 320;
    const childBudget = search ? 28 : zoom < 0.5 ? 8 : 18;

    const includeAncestors = (nodeId: string | null) => {
      let cursor = nodeId;
      while (cursor) {
        visible.add(cursor);
        cursor = byId.get(cursor)?.parentId ?? null;
      }
    };

    const addSummaryNode = (parentId: string, parentDepth: number, hiddenCount: number) => {
      if (hiddenCount <= 0 || visible.size >= maxVisible) return;

      const summaryId = `summary:${parentId}`;
      visible.add(summaryId);
      summaryNodes.push({
        id: summaryId,
        name: `+${hiddenCount} hidden`,
        kind: "summary",
        parentId,
        depth: parentDepth + 1,
        expanded: false,
        expandable: false,
        childCount: hiddenCount,
        salience: 0.8,
        z: 0,
        position: { x: 0, y: 0 }
      });
      summaryEdges.push({ id: `edge:${parentId}:${summaryId}`, from: parentId, to: summaryId, depth: parentDepth });
    };

    if (layoutMode === "overview") {
      for (const root of roots) {
        visible.add(root.id);
        if (!queued.has(root.id)) {
          queue.push(root.id);
          queued.add(root.id);
        }
      }
    } else if (primaryRootId) {
      visible.add(primaryRootId);
      queue.push(primaryRootId);
      queued.add(primaryRootId);
    }

    if (search) {
      includeAncestors(focus);

      for (const matchedId of matchedIds) {
        includeAncestors(matchedId);
      }
    }

    const drillDownMode = layoutMode !== "overview" && !search;

    if (drillDownMode) {
      const currentId = focus ?? primaryRootId;
      const currentNode = currentId ? byId.get(currentId) : null;

      if (currentNode) {
        visible.add(currentNode.id);

        if (currentNode.kind === "dir") {
          const allChildren = children.get(currentNode.id) ?? [];
          const ranked = allChildren
            .slice()
            .sort((a, b) => scoreNode(b, search, focus, matchedIds) - scoreNode(a, search, focus, matchedIds));
          const budget = currentNode.id === primaryRootId ? Math.max(childBudget, 14) : childBudget;
          const kept = ranked.slice(0, budget);

          for (const child of kept) {
            if (visible.size >= maxVisible) break;
            visible.add(child.id);
          }

          addSummaryNode(currentNode.id, currentNode.depth ?? 0, Math.max(0, allChildren.length - kept.length));
        }
      }
    } else {
      while (queue.length > 0 && visible.size < maxVisible) {
        const id = queue.shift()!;
        const node = byId.get(id);
        if (!node || node.kind !== "dir") continue;

        const allChildren = children.get(id) ?? [];
        const branchFocused = focusTrail.has(id);
        const branchMatched = matchedBranchIds.has(id);
        const showFiles = branchMatched || state.expandedNodeIds.has(id) || id === focus;

        const ranked = allChildren
          .filter((child) => child.kind === "dir" || showFiles || matchedIds.has(child.id) || child.id === focus)
          .sort((a, b) => scoreNode(b, search, focus, matchedIds) - scoreNode(a, search, focus, matchedIds));

        const budget = id === primaryRootId ? Math.max(childBudget, 14) : childBudget;
        const kept = ranked.slice(0, budget);
        const hiddenCount = Math.max(0, allChildren.length - kept.length);

        for (const child of kept) {
          if (visible.size >= maxVisible) break;
          visible.add(child.id);

          const shouldExploreChild =
            child.kind === "dir" &&
            (state.expandedNodeIds.has(child.id) ||
              focusTrail.has(child.id) ||
              branchFocused ||
              branchMatched ||
              matchedBranchIds.has(child.id) ||
              id === primaryRootId ||
              layoutMode === "overview");

          if (shouldExploreChild && !queued.has(child.id)) {
            queue.push(child.id);
            queued.add(child.id);
          }
        }

        addSummaryNode(id, node.depth ?? 0, hiddenCount);
      }
    }

    const visibleRealNodes = [...visible].filter((id) => !id.startsWith("summary:") && byId.has(id));
    const livePositions = visibleRealNodes.map((id) => byId.get(id)?.posCurrent ?? { x: 0, y: 0, z: 0 });
    const xs = livePositions.map((position) => position.x);
    const ys = livePositions.map((position) => position.y);
    const centerX = xs.length ? (Math.min(...xs) + Math.max(...xs)) * 0.5 : 0;
    const centerY = ys.length ? (Math.min(...ys) + Math.max(...ys)) * 0.5 : 0;
    const fieldScale = isMobile ? 34 : 42;

    const flowNodes: VisibleNode[] = visibleRealNodes.map((id) => {
      const node = byId.get(id)!;
      const live = node.posCurrent ?? node.posTarget ?? node.pos ?? { x: 0, y: 0, z: 0 };
      const childCount = children.get(node.id)?.length ?? 0;

      return {
        id: node.id,
        name: node.name,
        path: node.path,
        kind: node.kind,
        parentId: node.parentId,
        depth: node.depth,
        expanded: state.expandedNodeIds.has(node.id),
        expandable: node.kind === "dir" && childCount > 0,
        childCount,
        salience: node.physics?.salience ?? 1,
        z: live.z,
        position: {
          x: (live.x - centerX) * fieldScale,
          y: (live.y - centerY) * fieldScale
        }
      };
    });

    const parentPositionById = new Map(flowNodes.map((node) => [node.id, node.position]));
    for (const summary of summaryNodes) {
      const parentPosition = parentPositionById.get(summary.parentId ?? "");
      if (parentPosition) {
        summary.position = { x: parentPosition.x + 140, y: parentPosition.y + 26 };
      }
      flowNodes.push(summary);
    }

    const visibleEdgeIds = new Set(flowNodes.map((node) => node.id));
    const depthById = new Map(flowNodes.map((node) => [node.id, node.depth]));
    const labelById = new Map(flowNodes.map((node) => [node.id, node.name]));

    const flowEdges = state.edgeArray
      .filter((edge) => visibleEdgeIds.has(edge.from) && visibleEdgeIds.has(edge.to))
      .map((edge) => toFlowEdge(edge, depthById.get(edge.from) ?? 0, labelById.get(edge.from) ?? edge.from, labelById.get(edge.to) ?? edge.to));

    for (const edge of summaryEdges) {
      flowEdges.push(
        toFlowEdge(edge, edge.depth, labelById.get(edge.from) ?? edge.from, labelById.get(edge.to) ?? edge.to)
      );
    }

    return {
      nodes: flowNodes.map(toFlowNode),
      edges: flowEdges,
      focus,
      primaryRootId: primaryRootId ?? null,
      rootCount: roots.length
    };
  }, [version, selectedProjectsKey, expandedKey, focusId, isMobile, layoutMode, searchQuery, zoom]);

  useEffect(() => {
    let cancelled = false;

    const hasCrossLinks = graphSnapshot.edges.some((edge) => {
      const source = graphSnapshot.nodes.find((node) => node.id === edge.source);
      const target = graphSnapshot.nodes.find((node) => node.id === edge.target);
      if (!source || !target) return false;
      const sourceDepth = Number(source.data.depth ?? 0);
      const targetDepth = Number(target.data.depth ?? 0);
      return Math.abs(sourceDepth - targetDepth) > 1;
    });

    const engine = chooseLayout({
      mode: layoutMode,
      zoom,
      visibleCount: graphSnapshot.nodes.length,
      hasCrossLinks,
      rootCount: graphSnapshot.rootCount
    });

    setLocalLayoutEngine(engine);
    setLayoutEngine(engine);

    const run = async () => {
      if (engine === "radial") {
        const out = layoutWithRadial(graphSnapshot.nodes, graphSnapshot.edges, graphSnapshot.primaryRootId ?? undefined);
        if (!cancelled) setLaidOut(out);
        return;
      }

      if (engine === "dagre") {
        const out = layoutWithDagre(graphSnapshot.nodes, graphSnapshot.edges, "LR");
        if (!cancelled) setLaidOut(out);
        return;
      }

      const out = await layoutWithElk(graphSnapshot.nodes, graphSnapshot.edges, isMobile ? "DOWN" : "RIGHT");
      if (!cancelled) setLaidOut(out);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [graphSnapshot.edges, graphSnapshot.nodes, graphSnapshot.primaryRootId, graphSnapshot.rootCount, isMobile, layoutMode, setLayoutEngine, zoom]);

  const focusNode = useCallback(
    (nodeId: string, options?: { duration?: number; padding?: number; maxZoom?: number }) => {
      if (!nodeId) return;

      focusNodeRef.current = nodeId;
      focusLockRef.current = true;

      if (focusUnlockTimerRef.current) {
        window.clearTimeout(focusUnlockTimerRef.current);
      }

      if (rf) {
        viewportCommandActiveRef.current = true;
        rf.fitView({
          nodes: [{ id: nodeId }],
          duration: options?.duration ?? 240,
          padding: options?.padding ?? (isMobile ? 0.46 : 0.34),
          includeHiddenNodes: false,
          maxZoom: options?.maxZoom ?? (isMobile ? 0.9 : 1.1)
        });

        if (viewportCommandTimerRef.current) {
          window.clearTimeout(viewportCommandTimerRef.current);
        }

        viewportCommandTimerRef.current = window.setTimeout(() => {
          viewportCommandActiveRef.current = false;
        }, (options?.duration ?? 240) + 120);
      }

      focusUnlockTimerRef.current = window.setTimeout(() => {
        focusLockRef.current = false;
      }, 280);
    },
    [isMobile, rf]
  );

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) => {
      if (interactionMode !== "edit") return;

      const source = connection.source;
      const target = connection.target;
      if (!source || !target || source.startsWith("summary:") || target.startsWith("summary:")) return;
      addEdgeToGraph({ source, target });
    },
    [addEdgeToGraph, interactionMode]
  );

  const onNodeClick = useCallback(
    (_: MouseEvent, node: Node<FlowNodeData>) => {
      if (node.id.startsWith("summary:")) {
        const parentId = node.data.parentId;
        if (parentId) {
          revealNode(parentId);
          toggleExpandedNode(parentId);
          focusNode(parentId, { duration: 260, padding: isMobile ? 0.44 : 0.32, maxZoom: isMobile ? 0.9 : 1.1 });
        }
        return;
      }

      const runtime = useUniverseGraphStore.getState().nodes.get(node.id);
      if (!runtime) return;

      revealNode(node.id);
      focusNode(node.id, { duration: 260, padding: isMobile ? 0.44 : 0.32, maxZoom: isMobile ? 0.9 : 1.1 });
    },
    [focusNode, isMobile, revealNode, toggleExpandedNode]
  );

  const viewportIntentKey = `${selectedProjectsKey}|${focusId ?? ""}|${layoutMode}|${searchQuery.trim()}|${enabled ? 1 : 0}`;

  useEffect(() => {
    if (!rf || !enabled || graphSnapshot.nodes.length === 0) return;
    if (focusLockRef.current) return;

    const previousIntentKey = viewportIntentKeyRef.current;
    const intentChanged = previousIntentKey !== viewportIntentKey;
    viewportIntentKeyRef.current = viewportIntentKey;

    if (!intentChanged && userNavigatedViewportRef.current) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      viewportCommandActiveRef.current = true;

      const focused = focusNodeRef.current;
      if (focused && laidOut.nodes.some((node) => node.id === focused)) {
        rf.fitView({
          nodes: [{ id: focused }],
          duration: 180,
          padding: isMobile ? 0.46 : 0.3,
          includeHiddenNodes: false,
          maxZoom: isMobile ? 0.9 : 1.1
        });
      } else {
        rf.fitView({
          duration: 240,
          padding: isMobile ? 0.34 : 0.2,
          includeHiddenNodes: false,
          minZoom: 0.22,
          maxZoom: isMobile ? 0.9 : 1.15
        });
      }

      if (viewportCommandTimerRef.current) {
        window.clearTimeout(viewportCommandTimerRef.current);
      }

      viewportCommandTimerRef.current = window.setTimeout(() => {
        viewportCommandActiveRef.current = false;
      }, 360);
    });

    return () => cancelAnimationFrame(frame);
  }, [enabled, graphSnapshot.nodes.length, isMobile, laidOut.nodes, layoutEngine, rf, searchQuery, selectedProjectsKey, viewportIntentKey, focusId, layoutMode]);

  const onMoveEnd = useCallback((_: unknown, view: Viewport) => {
    if (!viewportCommandActiveRef.current) {
      userNavigatedViewportRef.current = true;
    }
    setZoom(view.zoom);
  }, []);

  useEffect(() => {
    return () => {
      if (focusUnlockTimerRef.current) {
        window.clearTimeout(focusUnlockTimerRef.current);
      }
      if (viewportCommandTimerRef.current) {
        window.clearTimeout(viewportCommandTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn("nebula-flow", interactionMode === "pan" && "is-pan-mode", interactionMode === "edit" && "edit-mode")}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 7,
        opacity: enabled ? 1 : 0,
        pointerEvents: enabled ? "auto" : "none"
      }}
    >
      <div className="sr-only" role="status">
        {connected
          ? `Connected. ${graphSnapshot.nodes.length} nodes and ${graphSnapshot.edges.length} edges loaded in ${layoutEngine} layout.`
          : "Disconnected from live project graph."}
      </div>

      <ReactFlow
        nodes={laidOut.nodes.length ? laidOut.nodes : graphSnapshot.nodes}
        edges={laidOut.edges.length ? laidOut.edges : graphSnapshot.edges}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        onInit={setRf}
        onMoveEnd={onMoveEnd}
        defaultViewport={isMobile ? { x: 20, y: 0, zoom: 0.78 } : { x: 80, y: 0, zoom: 0.9 }}
        nodesDraggable={interactionMode === "edit"}
        nodesConnectable={interactionMode === "edit" && enabled}
        elementsSelectable
        selectionOnDrag={false}
        selectNodesOnDrag={false}
        panOnDrag={interactionMode !== "edit"}
        nodesFocusable
        edgesFocusable={false}
        zoomOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(80,120,180,0.12)" gap={isMobile ? 18 : 22} size={1} />
        <Controls showInteractive={false} position={isMobile ? "top-right" : "bottom-right"} />
      </ReactFlow>
    </div>
  );
});
