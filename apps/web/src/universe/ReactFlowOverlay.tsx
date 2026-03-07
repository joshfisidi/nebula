"use client";

import { memo, useCallback, useMemo, type MouseEvent } from "react";
import ReactFlow, { Background, Controls, Connection, Edge, Node, OnConnect } from "reactflow";
import "reactflow/dist/style.css";
import { useUniverseGraphStore } from "./graphStore";

const MAX_INTERACTIVE_NODES = 2500;
const MAX_RENDERED_EDGES = 1800;

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
    draggable: true,
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

    const pos = new Map<string, { x: number; y: number }>();
    let cursorY = 0;

    const place = (id: string, depth: number): number => {
      const kids = children.get(id) ?? [];
      if (kids.length === 0) {
        const y = cursorY;
        cursorY += 1;
        pos.set(id, { x: depth * 170, y: y * 38 });
        return y;
      }

      const ys = kids.map((kid) => place(kid, depth + 1));
      const y = ys.reduce((sum, v) => sum + v, 0) / ys.length;
      pos.set(id, { x: depth * 170, y: y * 38 });
      return y;
    };

    for (const rootId of roots) {
      place(rootId, 0);
      cursorY += 1;
    }

    const yValues = [...pos.values()].map((p) => p.y);
    const yCenter = yValues.length ? (Math.min(...yValues) + Math.max(...yValues)) * 0.5 : 0;

    return {
      nodes: nodeArray.map((node) => {
        const p = pos.get(node.id) ?? { x: 0, y: 0 };
        return toFlowNode({
          ...node,
          expanded: state.expandedNodeIds.has(node.id),
          position: { x: p.x, y: p.y - yCenter }
        });
      }),
      edges: state.edgeArray
        .filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to))
        .slice(0, MAX_RENDERED_EDGES)
        .map((edge) => {
          const depth = state.nodes.get(edge.from)?.depth ?? 0;
          return toFlowEdge(edge, depth);
        })
    };
  }, [version, selectedProjectsKey, expandedKey]);

  const nodes = graphSnapshot.nodes;
  const edges = graphSnapshot.edges;

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) => {
      const source = connection.source;
      const target = connection.target;
      if (!source || !target) return;
      addEdgeToGraph({ source, target });
    },
    [addEdgeToGraph]
  );

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
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        defaultViewport={{ x: 80, y: 0, zoom: 0.9 }}
        nodesDraggable={false}
        nodesConnectable={enabled}
        elementsSelectable={enabled}
        zoomOnScroll={enabled}
        panOnDrag={enabled}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(80,120,180,0.12)" gap={22} size={1} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
});
