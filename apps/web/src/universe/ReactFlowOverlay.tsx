"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  OnConnect,
  type ReactFlowInstance,
  type Viewport
} from "reactflow";
import "reactflow/dist/style.css";
import { useUniverseGraphStore } from "./graphStore";
import {
  chooseLayout,
  layoutWithDagre,
  layoutWithElk,
  layoutWithRadial,
  type LayoutEngine,
  type LayoutMode
} from "./layoutEngines";

type VisibleNode = {
  id: string;
  name: string;
  path?: string;
  kind: "dir" | "file" | "summary";
  depth: number;
  expanded: boolean;
  position: { x: number; y: number };
};

const MAX_INTERACTIVE_NODES = 2500;

function scoreNode(name: string, kind: "dir" | "file", search: string): number {
  let score = kind === "dir" ? 25 : 5;
  const n = name.toLowerCase();
  if (["package.json", "readme.md", "tsconfig.json", ".env", "next.config.mjs"].includes(n)) score += 40;
  if (search && n.includes(search)) score += 1000;
  return score;
}

function toFlowNode(node: VisibleNode): Node {
  const isDir = node.kind === "dir";
  const isSummary = node.kind === "summary";
  const normalizedName = node.name.toLowerCase();
  const normalizedPath = (node.path ?? "").toLowerCase();
  const isBubbleGroup =
    /(^|\/)(docs|dist|cache|node_modules)(\/|$)/.test(normalizedPath) ||
    ["docs", "dist", "cache", "node_modules"].includes(normalizedName) ||
    isSummary;

  const label = isSummary ? node.name : isDir ? `${node.expanded ? "▾" : "▸"} ${node.name}` : node.name;

  return {
    id: node.id,
    position: node.position,
    data: { label, depth: node.depth },
    draggable: false,
    selectable: true,
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
          ? `1px solid hsla(${(node.depth * 43) % 360} 80% 70% / 0.7)`
          : "1px solid rgba(148,163,184,0.45)",
      borderRadius: isBubbleGroup ? 999 : 10,
      boxShadow: "none",
      fontSize: isBubbleGroup ? 10.5 : 11,
      lineHeight: 1.2,
      padding: isBubbleGroup ? "6px 12px" : "6px 8px",
      minWidth: isBubbleGroup ? 64 : 80,
      maxWidth: isBubbleGroup ? 160 : 220,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      opacity: isSummary ? 0.9 : 1
    }
  };
}

function toFlowEdge(edge: { id: string; from: string; to: string }, depth: number): Edge {
  const hue = (depth * 47) % 360;
  return {
    id: edge.id,
    source: edge.from,
    target: edge.to,
    type: "smoothstep",
    style: { stroke: `hsla(${hue} 82% 64% / 0.34)`, strokeWidth: 1 }
  };
}

export const ReactFlowOverlay = memo(function ReactFlowOverlay({ enabled }: { enabled: boolean }) {
  const version = useUniverseGraphStore((s) => s.version);
  const selectedProjectsKey = useUniverseGraphStore((s) => [...s.selectedProjectIds].sort().join("|"));
  const expandedKey = useUniverseGraphStore((s) => [...s.expandedNodeIds].sort().join("|"));
  const focusId = useUniverseGraphStore((s) => s.focusId);
  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
  const setFocusId = useUniverseGraphStore((s) => s.setFocusId);
  const addEdgeToGraph = useUniverseGraphStore((s) => s.addEdge);

  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const [zoom, setZoom] = useState(0.9);
  const [mode, setMode] = useState<LayoutMode>("auto");
  const [rf, setRf] = useState<ReactFlowInstance | null>(null);
  const [layoutEngine, setLayoutEngine] = useState<LayoutEngine>("dagre");
  const [laidOut, setLaidOut] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const focusLockRef = useRef(false);
  const focusNodeRef = useRef<string | null>(null);

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = viewport.width < 900;

  const graphSnapshot = useMemo(() => {
    const state = useUniverseGraphStore.getState();
    const selectedNodes = state.nodeArray
      .filter((node) => state.selectedProjectIds.size > 0 && state.selectedProjectIds.has(node.projectId))
      .slice(0, MAX_INTERACTIVE_NODES);

    const byId = new Map(selectedNodes.map((n) => [n.id, n]));
    const children = new Map<string, string[]>();
    const roots: string[] = [];

    for (const node of selectedNodes) {
      if (node.parentId && byId.has(node.parentId)) {
        const arr = children.get(node.parentId) ?? [];
        arr.push(node.id);
        children.set(node.parentId, arr);
      } else {
        roots.push(node.id);
      }
    }

    for (const arr of children.values()) {
      arr.sort((a, b) => (byId.get(a)?.name ?? "").localeCompare(byId.get(b)?.name ?? ""));
    }

    const focus = focusId && byId.has(focusId) ? focusId : roots[0] ?? null;
    const search = "";
    const maxVisible = zoom < 0.38 ? 90 : zoom < 0.65 ? 170 : 280;
    const childBudget = zoom < 0.5 ? 8 : 24;

    const visible = new Set<string>();
    const summaryEdges: Array<{ id: string; from: string; to: string; depth: number }> = [];
    const summaryNodes: VisibleNode[] = [];

    if (focus) {
      let c: string | undefined | null = focus;
      while (c) {
        visible.add(c);
        c = byId.get(c)?.parentId;
      }

      const queue: string[] = [focus];
      while (queue.length > 0 && visible.size < maxVisible) {
        const id = queue.shift()!;
        const node = byId.get(id);
        if (!node || node.kind !== "dir") continue;

        const ranked = (children.get(id) ?? [])
          .map((cid) => byId.get(cid))
          .filter((n): n is NonNullable<typeof n> => Boolean(n))
          .sort((a, b) => scoreNode(b.name, b.kind, search) - scoreNode(a.name, a.kind, search));

        const kept = ranked.slice(0, childBudget);
        const overflow = ranked.slice(childBudget);

        for (const child of kept) {
          if (visible.size >= maxVisible) break;
          visible.add(child.id);
          if (child.kind === "dir" && (state.expandedNodeIds.has(child.id) || child.id === focus)) {
            queue.push(child.id);
          }
        }

        if (overflow.length > 0 && visible.size < maxVisible) {
          const sid = `summary:${id}`;
          visible.add(sid);
          summaryNodes.push({
            id: sid,
            name: `+${overflow.length} more`,
            kind: "summary",
            depth: (node.depth ?? 0) + 1,
            expanded: false,
            position: { x: 0, y: 0 }
          });
          summaryEdges.push({ id: `edge:${id}:${sid}`, from: id, to: sid, depth: node.depth ?? 0 });
        }
      }
    }

    const visibleRealNodes = [...visible].filter((id) => !id.startsWith("summary:") && byId.has(id));
    const visibleSet = new Set(visibleRealNodes);

    const visChildren = new Map<string, string[]>();
    const visRoots: string[] = [];
    for (const id of visibleRealNodes) {
      const node = byId.get(id)!;
      if (node.parentId && visibleSet.has(node.parentId)) {
        const arr = visChildren.get(node.parentId) ?? [];
        arr.push(id);
        visChildren.set(node.parentId, arr);
      } else {
        visRoots.push(id);
      }
    }

    for (const arr of visChildren.values()) {
      arr.sort((a, b) => (byId.get(a)?.name ?? "").localeCompare(byId.get(b)?.name ?? ""));
    }
    visRoots.sort((a, b) => (byId.get(a)?.name ?? "").localeCompare(byId.get(b)?.name ?? ""));

    const pos = new Map<string, { depth: number; lane: number }>();
    let cursor = 0;

    const place = (id: string, depth: number): number => {
      const kids = visChildren.get(id) ?? [];

      if (kids.length === 0) {
        const lane = cursor;
        cursor += 1;
        pos.set(id, { depth, lane });
        return lane;
      }

      const lanes = kids.map((kid) => place(kid, depth + 1));
      const lane = lanes.reduce((sum, v) => sum + v, 0) / lanes.length;
      pos.set(id, { depth, lane });
      return lane;
    };

    for (const rootId of visRoots) {
      place(rootId, 0);
      cursor += 1;
    }

    const laneValues = [...pos.values()].map((p) => p.lane);
    const laneCenter = laneValues.length ? (Math.min(...laneValues) + Math.max(...laneValues)) * 0.5 : 0;

    const depthSpacing = isMobile ? 124 : 170;
    const laneSpacing = isMobile ? 72 : 38;

    const flowNodes: VisibleNode[] = visibleRealNodes.map((id) => {
      const node = byId.get(id)!;
      const p = pos.get(id) ?? { depth: 0, lane: 0 };
      const lane = (p.lane - laneCenter) * laneSpacing;
      const depth = p.depth * depthSpacing;

      const position = { x: depth, y: lane };

      return {
        id: node.id,
        name: node.name,
        path: node.path,
        kind: node.kind,
        depth: node.depth,
        expanded: state.expandedNodeIds.has(node.id),
        position
      };
    });

    const depthById = new Map(flowNodes.map((n) => [n.id, n.depth]));
    for (const s of summaryNodes) {
      const parentPos = flowNodes.find((n) => n.id === s.id.replace("summary:", ""))?.position;
      if (parentPos) {
        s.position = { x: parentPos.x + 140, y: parentPos.y + 26 };
      }
      flowNodes.push(s);
      depthById.set(s.id, s.depth);
    }

    const visibleEdgeIds = new Set(flowNodes.map((n) => n.id));
    const flowEdges = state.edgeArray
      .filter((edge) => visibleEdgeIds.has(edge.from) && visibleEdgeIds.has(edge.to))
      .map((edge) => toFlowEdge(edge, depthById.get(edge.from) ?? 0));

    for (const se of summaryEdges) {
      flowEdges.push(toFlowEdge({ id: se.id, from: se.from, to: se.to }, se.depth));
    }

    return {
      nodes: flowNodes.map(toFlowNode),
      edges: flowEdges,
      focus
    };
  }, [version, selectedProjectsKey, expandedKey, focusId, isMobile, zoom]);

  useEffect(() => {
    let cancelled = false;

    const hasCrossLinks = graphSnapshot.edges.some((e) => {
      const s = graphSnapshot.nodes.find((n) => n.id === e.source);
      const t = graphSnapshot.nodes.find((n) => n.id === e.target);
      if (!s || !t) return false;
      const sd = Number((s.data as any)?.depth ?? 0);
      const td = Number((t.data as any)?.depth ?? 0);
      return Math.abs(sd - td) > 1;
    });

    const autoEngine = chooseLayout({
      mode,
      zoom,
      visibleCount: graphSnapshot.nodes.length,
      hasGroups: false,
      hasCrossLinks
    });

    const engine = isMobile ? "elk" : autoEngine;

    setLayoutEngine(engine);

    const run = async () => {
      if (engine === "radial") {
        const out = layoutWithRadial(graphSnapshot.nodes, graphSnapshot.edges);
        if (!cancelled) setLaidOut(out);
        return;
      }

      if (engine === "dagre") {
        const out = layoutWithDagre(graphSnapshot.nodes, graphSnapshot.edges, "LR");
        if (!cancelled) setLaidOut(out);
        return;
      }

      const out = await layoutWithElk(graphSnapshot.nodes, graphSnapshot.edges, isMobile ? undefined : "RIGHT");
      if (!cancelled) setLaidOut(out);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [graphSnapshot.nodes, graphSnapshot.edges, isMobile, mode, zoom]);

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) => {
      const source = connection.source;
      const target = connection.target;
      if (!source || !target || source.startsWith("summary:") || target.startsWith("summary:")) return;
      addEdgeToGraph({ source, target });
    },
    [addEdgeToGraph]
  );

  const onNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      if (node.id.startsWith("summary:")) return;
      setFocusId(node.id);
      focusNodeRef.current = node.id;
      focusLockRef.current = true;

      const runtime = useUniverseGraphStore.getState().nodes.get(node.id);
      if (runtime?.kind === "dir") {
        toggleExpandedNode(node.id);
      }

      if (rf) {
        rf.fitView({
          nodes: [{ id: node.id }],
          duration: 260,
          padding: isMobile ? 0.44 : 0.32,
          includeHiddenNodes: false,
          maxZoom: isMobile ? 0.9 : 1.1
        });
      }

      window.setTimeout(() => {
        focusLockRef.current = false;
      }, 320);
    },
    [isMobile, rf, setFocusId, toggleExpandedNode]
  );

  useEffect(() => {
    if (!rf || !enabled || graphSnapshot.nodes.length === 0) return;

    if (focusLockRef.current) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const focused = focusNodeRef.current;
      if (focused && laidOut.nodes.some((n) => n.id === focused)) {
        rf.fitView({
          nodes: [{ id: focused }],
          duration: 180,
          padding: isMobile ? 0.46 : 0.3,
          includeHiddenNodes: false,
          maxZoom: isMobile ? 0.9 : 1.1
        });
        return;
      }

      rf.fitView({
        duration: 240,
        padding: isMobile ? 0.34 : 0.2,
        includeHiddenNodes: false,
        minZoom: 0.22,
        maxZoom: isMobile ? 0.9 : 1.15
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [rf, enabled, laidOut.nodes, graphSnapshot.nodes.length, expandedKey, selectedProjectsKey, isMobile, layoutEngine]);

  const onMoveEnd = useCallback((_: unknown, view: Viewport) => {
    setZoom(view.zoom);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 7,
        opacity: enabled ? 1 : 0,
        pointerEvents: enabled ? "auto" : "none"
      }}
    >
      <div style={{ position: "absolute", right: 84, top: isMobile ? 12 : 12, zIndex: 9, display: "flex", gap: 6 }}>
        {(["auto", "overview", "focus"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              fontSize: 11,
              borderRadius: 8,
              padding: "4px 8px",
              border: "1px solid rgba(120,160,255,0.35)",
              background: mode === m ? "rgba(37,99,235,0.35)" : "rgba(10,16,30,0.75)",
              color: "#dbeafe"
            }}
          >
            {m}
          </button>
        ))}
        <span style={{ fontSize: 10, color: "#9fb5d7", alignSelf: "center" }}>{layoutEngine}</span>
      </div>

      <ReactFlow
        nodes={laidOut.nodes.length ? laidOut.nodes : graphSnapshot.nodes}
        edges={laidOut.edges.length ? laidOut.edges : graphSnapshot.edges}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        onInit={setRf}
        onMoveEnd={onMoveEnd}
        defaultViewport={isMobile ? { x: 20, y: 0, zoom: 0.78 } : { x: 80, y: 0, zoom: 0.9 }}
        nodesDraggable={false}
        nodesConnectable={enabled}
        elementsSelectable={enabled}
        zoomOnScroll
        panOnDrag
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(80,120,180,0.12)" gap={isMobile ? 18 : 22} size={1} />
        <Controls showInteractive={false} position={isMobile ? "top-right" : "bottom-right"} />
      </ReactFlow>
    </div>
  );
});
