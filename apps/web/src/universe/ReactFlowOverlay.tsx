"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
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
  layoutWithMindmap,
  layoutWithRadial,
  type LayoutEngine
} from "./layoutEngines";
import { isNaturallyHiddenNode } from "./visibility";

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
  focusRole: "focus" | "parent" | "context" | "default";
  mindmapMode: boolean;
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

function MindmapFlowNode({ data }: NodeProps<FlowNodeData>) {
  const handleStyle = { width: 3, height: 3, border: 0, background: "rgba(196, 242, 136, 0.8)" };
  return (
    <>
      <Handle id="left-in" type="target" position={Position.Left} style={handleStyle} />
      <Handle id="left-out" type="source" position={Position.Left} style={handleStyle} />
      <span className="block w-full overflow-hidden text-ellipsis">{data.label}</span>
      <Handle id="right-in" type="target" position={Position.Right} style={handleStyle} />
      <Handle id="right-out" type="source" position={Position.Right} style={handleStyle} />
    </>
  );
}

const nodeTypes = { mindmap: MindmapFlowNode };

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

function compareRankedNodes(
  a: { id: string; name: string; kind: "dir" | "file"; path?: string },
  b: { id: string; name: string; kind: "dir" | "file"; path?: string },
  search: string,
  focusId: string | null,
  matchedIds: Set<string>
): number {
  return (
    scoreNode(b, search, focusId, matchedIds) - scoreNode(a, search, focusId, matchedIds) ||
    a.name.localeCompare(b.name) ||
    a.id.localeCompare(b.id)
  );
}

function buildNodeAriaLabel(node: VisibleNode): string {
  if (node.kind === "summary") {
    return `Show ${node.childCount ?? 0} more items`;
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
  const isMindmapNode = node.mindmapMode && !isSummary;
  const isFocusNode = node.focusRole === "focus";
  const isFocusParent = node.focusRole === "parent";
  const isFocusContext = node.focusRole === "context";
  const normalizedName = node.name.toLowerCase();
  const normalizedPath = (node.path ?? "").toLowerCase();
  const isBubbleGroup =
    /(^|\/)(docs|dist|cache|node_modules)(\/|$)/.test(normalizedPath) ||
    ["docs", "dist", "cache", "node_modules"].includes(normalizedName) ||
    isSummary;

  const label = isSummary ? node.name : isDir ? `${node.expanded ? "▾" : "▸"} ${node.name}` : node.name;
  const bubbleSize = isFocusNode ? 118 : isFocusParent ? 90 : isFocusContext ? 78 : 70;
  const widthPx =
    isMindmapNode && isDir
      ? bubbleSize
      : Math.round(
          Math.max(isBubbleGroup ? 64 : 88, Math.min(isBubbleGroup ? 160 : 220, label.length * (isBubbleGroup ? 6.2 : 6.8) + (isBubbleGroup ? 26 : 24)))
        );
  const heightPx = isMindmapNode && isDir ? bubbleSize : isBubbleGroup ? 30 : 34;
  const width = `${(widthPx / 16).toFixed(3)}rem`;
  const height = `${(heightPx / 16).toFixed(3)}rem`;

  return {
    id: node.id,
    type: node.mindmapMode ? "mindmap" : undefined,
    position: node.position,
    width: widthPx,
    height: heightPx,
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
      background: isFocusNode
        ? "linear-gradient(135deg, #d8f8ac, #aadf72)"
        : isFocusParent
          ? "linear-gradient(135deg, #283e2d, #192a23)"
          : isMindmapNode && isDir
            ? "linear-gradient(145deg, #223a2c, #13251e)"
            : isBubbleGroup
              ? "linear-gradient(135deg, #1a2725, #121b1b)"
              : isDir
                ? "linear-gradient(145deg, #1c2b27, #13201e)"
                : "linear-gradient(145deg, #171f21, #11191b)",
      color: isFocusNode ? "#10200b" : "#ecf4ec",
      border: isFocusNode
        ? "1px solid #edffd6"
        : isFocusParent
          ? "1px solid rgba(196,242,136,0.68)"
          : isMindmapNode && isDir
            ? "1px solid rgba(196,242,136,0.55)"
            : isBubbleGroup
              ? "1px solid rgba(196,242,136,0.18)"
              : isDir
                ? "1px solid rgba(175,220,167,0.34)"
                : "1px solid rgba(177,196,187,0.22)",
      borderRadius: isMindmapNode && isDir ? 999 : isBubbleGroup ? 999 : 12,
      boxShadow: isSummary
        ? "none"
        : isFocusNode
          ? "0 0 0 6px rgba(196,242,136,0.1), 0 16px 42px rgba(122,186,83,0.18)"
          : isFocusParent
            ? "0 0 0 4px rgba(196,242,136,0.06), 0 12px 28px rgba(0,0,0,0.22)"
            : isMindmapNode && isDir
              ? "0 12px 30px rgba(0,0,0,0.2)"
              : "0 8px 22px rgba(0,0,0,0.22)",
      fontSize: isFocusNode ? "0.8rem" : isBubbleGroup ? "0.66rem" : "0.7rem",
      fontWeight: isFocusNode || isFocusParent ? 700 : 600,
      lineHeight: 1.2,
      letterSpacing: "0.01em",
      padding: isMindmapNode && isDir ? "0.5rem" : isBubbleGroup ? "0.375rem 0.75rem" : "0.4rem 0.55rem",
      width,
      height,
      minWidth: width,
      maxWidth: width,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: isMindmapNode && isDir ? "normal" : "nowrap",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      opacity: isSummary ? 0.9 : isFocusContext ? 0.94 : Math.max(0.78, 1 - Math.abs(node.z) * 0.02)
    }
  };
}

function toFlowEdge(edge: { id: string; from: string; to: string }, depth: number, sourceLabel: string, targetLabel: string): Edge {
  return {
    id: edge.id,
    source: edge.from,
    target: edge.to,
    type: "smoothstep",
    focusable: false,
    ariaLabel: buildEdgeAriaLabel(sourceLabel, targetLabel),
    style: { stroke: `rgba(178, 221, 167, ${Math.max(0.16, 0.34 - depth * 0.025)})`, strokeWidth: 1.1 }
  };
}

export const ReactFlowOverlay = memo(function ReactFlowOverlay({ enabled }: { enabled: boolean }) {
  const version = useUniverseGraphStore((s) => s.version);
  const connected = useUniverseGraphStore((s) => s.connected);
  const selectedProjectsKey = useUniverseGraphStore((s) => [...s.selectedProjectIds].sort().join("|"));
  const expandedKey = useUniverseGraphStore((s) => [...s.expandedNodeIds].sort().join("|"));
  const revealedOverflowKey = useUniverseGraphStore((s) => [...s.revealedOverflowIds].sort().join("|"));
  const focusId = useUniverseGraphStore((s) => s.focusId);
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);
  const showHiddenNodes = useUniverseGraphStore((s) => s.showHiddenNodes);
  const interactionMode = useUniverseGraphStore((s) => s.interactionMode);
  const layoutMode = useUniverseGraphStore((s) => s.layoutMode);
  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
  const showAllChildren = useUniverseGraphStore((s) => s.showAllChildren);
  const setFocusId = useUniverseGraphStore((s) => s.setFocusId);
  const revealNode = useUniverseGraphStore((s) => s.revealNode);
  const setLayoutEngine = useUniverseGraphStore((s) => s.setLayoutEngine);
  const addEdgeToGraph = useUniverseGraphStore((s) => s.addEdge);

  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const [zoom, setZoom] = useState(0.9);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [rf, setRf] = useState<ReactFlowInstance | null>(null);
  const [layoutEngine, setLocalLayoutEngine] = useState<LayoutEngine>("living-lite");
  const [laidOut, setLaidOut] = useState<{ key: string; nodes: Node<FlowNodeData>[]; edges: Edge[] }>({ key: "", nodes: [], edges: [] });
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

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const isMobile = viewport.width < 900;

  const graphSnapshot = useMemo(() => {
    const state = useUniverseGraphStore.getState();
    const search = state.searchQuery.trim().toLowerCase();
    const selectedNodes = state.nodeArray
      .filter((node) => state.selectedProjectIds.size > 0 && state.selectedProjectIds.has(node.projectId))
      .filter((node) => state.showHiddenNodes || !isNaturallyHiddenNode(node))
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
    const focusParentId = focus ? byId.get(focus)?.parentId ?? null : null;

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
    const maxVisible = layoutMode === "mindmap" ? 520 : search ? 420 : zoom < 0.38 ? 120 : zoom < 0.65 ? 200 : 320;
    const childBudget = layoutMode === "mindmap" ? 36 : search ? 28 : zoom < 0.5 ? 8 : 18;

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
        name: `+${hiddenCount} more`,
        kind: "summary",
        parentId,
        depth: parentDepth + 1,
        expanded: false,
        expandable: false,
        childCount: hiddenCount,
        salience: 0.8,
        focusRole: "default",
        mindmapMode: layoutMode === "mindmap",
        z: 0,
        position: { x: 0, y: 0 }
      });
      summaryEdges.push({ id: `edge:${parentId}:${summaryId}`, from: parentId, to: summaryId, depth: parentDepth });
    };

    if (layoutMode === "overview" || layoutMode === "mindmap") {
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

    const drillDownMode = layoutMode === "focus" && !search;

    if (drillDownMode) {
      const currentId = focus ?? primaryRootId;
      const currentNode = currentId ? byId.get(currentId) : null;

      if (currentNode) {
        visible.add(currentNode.id);

        if (currentNode.kind === "dir") {
          const allChildren = children.get(currentNode.id) ?? [];
          const isExpanded = state.expandedNodeIds.has(currentNode.id);

          if (isExpanded) {
            const ranked = allChildren
              .slice()
              .sort((a, b) => compareRankedNodes(a, b, search, focus, matchedIds));
            const budget = state.revealedOverflowIds.has(currentNode.id) ? allChildren.length : currentNode.id === primaryRootId ? Math.max(childBudget, 14) : childBudget;
            const kept = ranked.slice(0, budget);

            let shownCount = 0;
            for (const child of kept) {
              if (visible.size >= maxVisible) break;
              visible.add(child.id);
              shownCount += 1;
            }

            addSummaryNode(currentNode.id, currentNode.depth ?? 0, Math.max(0, allChildren.length - shownCount));
          } else {
            addSummaryNode(currentNode.id, currentNode.depth ?? 0, allChildren.length);
          }
        }
      }
    } else {
      while (queue.length > 0 && visible.size < maxVisible) {
        const id = queue.shift()!;
        const node = byId.get(id);
        if (!node || node.kind !== "dir") continue;
        if (layoutMode === "mindmap" && node.parentId && !state.expandedNodeIds.has(id) && !search) continue;

        const allChildren = children.get(id) ?? [];
        const branchFocused = focusTrail.has(id);
        const branchMatched = matchedBranchIds.has(id);
        const showFiles = layoutMode === "mindmap" || branchMatched || state.expandedNodeIds.has(id) || id === focus;

        const ranked = allChildren
          .filter((child) => child.kind === "dir" || showFiles || matchedIds.has(child.id) || child.id === focus)
          .sort((a, b) => compareRankedNodes(a, b, search, focus, matchedIds));

        const budget = state.revealedOverflowIds.has(id) ? allChildren.length : id === primaryRootId ? Math.max(childBudget, 14) : childBudget;
        const kept = ranked.slice(0, budget);
        let shownCount = 0;

        for (const child of kept) {
          if (visible.size >= maxVisible) break;
          visible.add(child.id);
          shownCount += 1;

          const shouldExploreChild =
            child.kind === "dir" &&
            (state.expandedNodeIds.has(child.id) ||
              focusTrail.has(child.id) ||
              branchFocused ||
              branchMatched ||
              matchedBranchIds.has(child.id) ||
              id === primaryRootId ||
              layoutMode === "overview" || layoutMode === "mindmap");

          if (shouldExploreChild && !queued.has(child.id)) {
            queue.push(child.id);
            queued.add(child.id);
          }
        }

        addSummaryNode(id, node.depth ?? 0, Math.max(0, allChildren.length - shownCount));
      }
    }

    const visibleRealNodes = [...visible].filter((id) => !id.startsWith("summary:") && byId.has(id));
    const livePositions = visibleRealNodes.map((id) => byId.get(id)?.posCurrent ?? { x: 0, y: 0, z: 0 });
    const xs = livePositions.map((position) => position.x);
    const ys = livePositions.map((position) => position.y);
    const centerX = xs.length ? (Math.min(...xs) + Math.max(...xs)) * 0.5 : 0;
    const centerY = ys.length ? (Math.min(...ys) + Math.max(...ys)) * 0.5 : 0;
    const fieldScale = isMobile ? 34 : 42;
    const mindmapMode = layoutMode === "focus" && !search;

    const flowNodes: VisibleNode[] = visibleRealNodes.map((id) => {
      const node = byId.get(id)!;
      const live = node.posCurrent ?? node.posTarget ?? node.pos ?? { x: 0, y: 0, z: 0 };
      const childCount = children.get(node.id)?.length ?? 0;
      const focusRole =
        node.id === focus
          ? "focus"
          : node.id === focusParentId
            ? "parent"
            : mindmapMode && focusTrail.has(node.id)
              ? "context"
              : "default";

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
        salience: ((node as { physics?: { salience?: number } }).physics?.salience) ?? 1,
        focusRole,
        mindmapMode,
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
      rootCount: roots.length,
      layoutKey: `${[...visibleEdgeIds].sort().join("|")}::${flowEdges.map((edge) => edge.id).sort().join("|")}`
    };
  }, [version, selectedProjectsKey, expandedKey, revealedOverflowKey, focusId, isMobile, layoutMode, searchQuery, showHiddenNodes, zoom]);

  const layoutZoom = layoutMode === "mindmap" ? 1 : zoom;
  useEffect(() => {
    let cancelled = false;

    const depthById = new Map(graphSnapshot.nodes.map((node) => [node.id, Number(node.data.depth ?? 0)]));
    const hasCrossLinks = graphSnapshot.edges.some((edge) => {
      const sourceDepth = depthById.get(edge.source);
      const targetDepth = depthById.get(edge.target);
      if (sourceDepth == null || targetDepth == null) return false;
      return Math.abs(sourceDepth - targetDepth) > 1;
    });

    const engine = chooseLayout({
      mode: layoutMode,
      zoom: layoutZoom,
      visibleCount: graphSnapshot.nodes.length,
      hasCrossLinks,
      rootCount: graphSnapshot.rootCount
    });
    const resultKey = `${engine}|${graphSnapshot.layoutKey}|${graphSnapshot.primaryRootId ?? ""}|${layoutMode === "mindmap" ? focusId ?? "" : ""}`;

    setLocalLayoutEngine(engine);
    setLayoutEngine(engine);

    const run = async () => {
      if (engine === "living-lite") {
        if (!cancelled) setLaidOut({ key: resultKey, nodes: [], edges: [] });
        return;
      }

      if (engine === "mindmap") {
        const out = layoutWithMindmap(graphSnapshot.nodes, graphSnapshot.edges);
        if (!cancelled) setLaidOut({ key: resultKey, ...out });
        return;
      }

      if (engine === "radial") {
        const out = layoutWithRadial(graphSnapshot.nodes, graphSnapshot.edges, graphSnapshot.primaryRootId ?? undefined);
        if (!cancelled) setLaidOut({ key: resultKey, ...out });
        return;
      }

      if (engine === "dagre") {
        const out = layoutWithDagre(graphSnapshot.nodes, graphSnapshot.edges, "LR");
        if (!cancelled) setLaidOut({ key: resultKey, ...out });
        return;
      }

      const out = await layoutWithElk(graphSnapshot.nodes, graphSnapshot.edges, isMobile ? "DOWN" : "RIGHT");
      if (!cancelled) setLaidOut({ key: resultKey, ...out });
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [focusId, graphSnapshot.layoutKey, graphSnapshot.primaryRootId, graphSnapshot.rootCount, isMobile, layoutMode, layoutZoom, setLayoutEngine]);

  const layoutReady = laidOut.key === `${layoutEngine}|${graphSnapshot.layoutKey}|${graphSnapshot.primaryRootId ?? ""}|${layoutMode === "mindmap" ? focusId ?? "" : ""}`;
  const renderedNodes = layoutEngine === "living-lite" || !layoutReady ? graphSnapshot.nodes : laidOut.nodes;
  const renderedEdges = layoutEngine === "living-lite" || !layoutReady ? graphSnapshot.edges : laidOut.edges;

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
        const duration = reducedMotion ? 0 : (options?.duration ?? 240);
        const maxZoom = options?.maxZoom ?? (isMobile ? 0.9 : 1.1);
        const currentZoom = rf.getZoom?.() ?? maxZoom;
        const nextZoom = Math.min(maxZoom, Math.max(currentZoom, isMobile ? 0.72 : 0.82));

        const node = rf.getNode?.(nodeId);
        if (node) {
          const x = node.position.x + ((node.width ?? 180) / 2);
          const y = node.position.y + ((node.height ?? 40) / 2);
          rf.setCenter(x, y, { zoom: nextZoom, duration });
        } else {
          rf.fitView({
            nodes: [{ id: nodeId }],
            duration,
            padding: options?.padding ?? (isMobile ? 0.46 : 0.34),
            includeHiddenNodes: false,
            maxZoom
          });
        }

        if (viewportCommandTimerRef.current) {
          window.clearTimeout(viewportCommandTimerRef.current);
        }

        viewportCommandTimerRef.current = window.setTimeout(() => {
          viewportCommandActiveRef.current = false;
        }, duration + 120);
      }

      focusUnlockTimerRef.current = window.setTimeout(() => {
        focusLockRef.current = false;
      }, 280);
    },
    [isMobile, reducedMotion, rf]
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
          showAllChildren(parentId);
          if (layoutMode !== "mindmap") focusNode(parentId, { duration: 260, padding: isMobile ? 0.44 : 0.32, maxZoom: isMobile ? 0.9 : 1.1 });
        }
        return;
      }

      const runtime = useUniverseGraphStore.getState().nodes.get(node.id);
      if (!runtime) return;

      if (layoutMode === "mindmap") {
        setFocusId(node.id);
        if (node.data.kind === "dir") toggleExpandedNode(node.id);
        return;
      }

      if (node.data.kind === "dir" && node.id === useUniverseGraphStore.getState().focusId) {
        toggleExpandedNode(node.id);
        focusNode(node.id, { duration: 260, padding: isMobile ? 0.44 : 0.32, maxZoom: isMobile ? 0.9 : 1.1 });
        return;
      }

      revealNode(node.id);
      focusNode(node.id, { duration: 260, padding: isMobile ? 0.44 : 0.32, maxZoom: isMobile ? 0.9 : 1.1 });
    },
    [focusNode, isMobile, layoutMode, revealNode, setFocusId, showAllChildren, toggleExpandedNode]
  );

  const viewportIntentKey = `${selectedProjectsKey}|${layoutMode === "mindmap" ? expandedKey : focusId ?? ""}|${layoutMode}|${searchQuery.trim()}|${enabled ? 1 : 0}`;

  useEffect(() => {
    if (!rf || !enabled || renderedNodes.length === 0) return;
    if (!layoutReady && layoutEngine !== "living-lite") return;
    if (focusLockRef.current) return;

    const previousIntentKey = viewportIntentKeyRef.current;
    const intentChanged = previousIntentKey !== viewportIntentKey;
    viewportIntentKeyRef.current = viewportIntentKey;

    if (layoutMode === "mindmap" && !intentChanged) return;

    if (!intentChanged && userNavigatedViewportRef.current) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      viewportCommandActiveRef.current = true;

      const focused = focusNodeRef.current;
      if (layoutMode !== "mindmap" && focused && renderedNodes.some((node) => node.id === focused)) {
        const node = rf.getNode?.(focused);
        if (node) {
          const x = node.position.x + ((node.width ?? 180) / 2);
          const y = node.position.y + ((node.height ?? 40) / 2);
          rf.setCenter(x, y, {
            zoom: Math.min(isMobile ? 0.9 : 1.1, Math.max(rf.getZoom?.() ?? 0.85, isMobile ? 0.72 : 0.82)),
            duration: reducedMotion ? 0 : 180
          });
        } else {
          rf.fitView({
            nodes: [{ id: focused }],
            duration: reducedMotion ? 0 : 180,
            padding: isMobile ? 0.46 : 0.3,
            includeHiddenNodes: false,
            maxZoom: isMobile ? 0.9 : 1.1
          });
        }
      } else {
        rf.fitView({
          duration: reducedMotion ? 0 : 240,
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
  }, [enabled, graphSnapshot.layoutKey, renderedNodes.length, isMobile, layoutEngine, layoutReady, reducedMotion, rf, searchQuery, selectedProjectsKey, viewportIntentKey, focusId, layoutMode]);

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
        {graphSnapshot.nodes.length > 0
          ? `${graphSnapshot.nodes.length} nodes and ${graphSnapshot.edges.length} links loaded in ${layoutEngine} layout.`
          : connected ? "Connected. Waiting for project graph." : "No project graph loaded."}
      </div>

      <ReactFlow
        nodes={renderedNodes}
        edges={renderedEdges}
        nodeTypes={nodeTypes}
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
        <Background color="rgba(190,224,186,0.06)" gap={isMobile ? 20 : 24} size={1} />
        {graphSnapshot.nodes.length > 0 ? <Controls showInteractive={false} position="top-right" /> : null}
      </ReactFlow>
    </div>
  );
});
