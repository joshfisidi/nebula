"use client";

import { memo, useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  OnConnect,
  type ReactFlowInstance
} from "reactflow";
import "reactflow/dist/style.css";
import { useUniverseGraphStore } from "./graphStore";

const MAX_INTERACTIVE_NODES = 2500;

function toFlowNode(node: {
  id: string;
  name: string;
  kind: string;
  depth: number;
  expanded: boolean;
  position: { x: number; y: number };
}): Node {
  const isDir = node.kind === "dir";
  const label = isDir ? `${node.expanded ? "▾" : "▸"} ${node.name}` : node.name;
  return {
    id: node.id,
    position: node.position,
    data: { label },
    draggable: false,
    selectable: true,
    style: {
      background: isDir ? "rgba(15,27,56,0.95)" : "rgba(12,20,40,0.92)",
      color: "#dbeafe",
      border: isDir ? `1px solid hsla(${(node.depth * 43) % 360} 80% 70% / 0.7)` : "1px solid rgba(148,163,184,0.45)",
      borderRadius: 10,
      boxShadow: "none",
      fontSize: 11,
      lineHeight: 1.2,
      padding: "6px 8px",
      minWidth: 80,
      maxWidth: 220,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
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
  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
  const addEdgeToGraph = useUniverseGraphStore((s) => s.addEdge);

  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const [rf, setRf] = useState<ReactFlowInstance | null>(null);

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = viewport.width < 900;
  const isPortrait = viewport.height > viewport.width;

  const graphSnapshot = useMemo(() => {
    const state = useUniverseGraphStore.getState();
    const nodeArray = state.nodeArray.filter((node) => state.isNodeVisible(node)).slice(0, MAX_INTERACTIVE_NODES);
    const visibleNodeIds = new Set(nodeArray.map((node) => node.id));

    const byId = new Map(nodeArray.map((node) => [node.id, node]));
    const children = new Map<string, string[]>();
    const roots: string[] = [];

    for (const node of nodeArray) {
      if (node.parentId && visibleNodeIds.has(node.parentId)) {
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
    roots.sort((a, b) => (byId.get(a)?.name ?? "").localeCompare(byId.get(b)?.name ?? ""));

    const pos = new Map<string, { depth: number; lane: number }>();
    let cursor = 0;

    const place = (id: string, depth: number): number => {
      const kids = children.get(id) ?? [];
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

    for (const rootId of roots) {
      place(rootId, 0);
      cursor += 1;
    }

    const laneValues = [...pos.values()].map((p) => p.lane);
    const laneCenter = laneValues.length ? (Math.min(...laneValues) + Math.max(...laneValues)) * 0.5 : 0;

    const depthSpacing = isMobile ? (isPortrait ? 120 : 135) : 170;
    const laneSpacing = isMobile ? (isPortrait ? 88 : 62) : 38;
    const maxEdges = isMobile ? 900 : 1800;

    return {
      nodes: nodeArray.map((node) => {
        const p = pos.get(node.id) ?? { depth: 0, lane: 0 };
        const lane = (p.lane - laneCenter) * laneSpacing;
        const depth = p.depth * depthSpacing;

        const position = isMobile && isPortrait ? { x: lane, y: depth } : { x: depth, y: lane };

        return toFlowNode({
          ...node,
          expanded: state.expandedNodeIds.has(node.id),
          position
        });
      }),
      edges: state.edgeArray
        .filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to))
        .slice(0, maxEdges)
        .map((edge) => {
          const depth = state.nodes.get(edge.from)?.depth ?? 0;
          return toFlowEdge(edge, depth);
        })
    };
  }, [version, selectedProjectsKey, expandedKey, isMobile, isPortrait]);

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) => {
      const source = connection.source;
      const target = connection.target;
      if (!source || !target) return;
      addEdgeToGraph({ source, target });
    },
    [addEdgeToGraph]
  );

  useEffect(() => {
    if (!rf || !enabled || graphSnapshot.nodes.length === 0) return;

    const frame = requestAnimationFrame(() => {
      rf.fitView({
        duration: 260,
        padding: isMobile ? 0.34 : 0.2,
        includeHiddenNodes: false,
        minZoom: 0.22,
        maxZoom: isMobile ? 0.9 : 1.15
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [rf, enabled, graphSnapshot.nodes.length, graphSnapshot.edges.length, expandedKey, selectedProjectsKey, isMobile]);

  const onNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      const runtime = useUniverseGraphStore.getState().nodes.get(node.id);
      if (runtime?.kind === "dir") {
        toggleExpandedNode(node.id);
      }
    },
    [toggleExpandedNode]
  );

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
      <ReactFlow
        nodes={graphSnapshot.nodes}
        edges={graphSnapshot.edges}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        onInit={setRf}
        defaultViewport={isMobile && isPortrait ? { x: 0, y: 32, zoom: 0.75 } : { x: 80, y: 0, zoom: 0.9 }}
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
