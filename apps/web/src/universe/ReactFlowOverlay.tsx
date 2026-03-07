"use client";

import { memo, useCallback, useEffect, useMemo, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState
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
    draggable: true,
    selectable: true,
    style: {
      background: isDir ? "rgba(15,27,56,0.95)" : "rgba(12,20,40,0.92)",
      color: "#dbeafe",
      border: isDir ? `1px solid hsla(${(node.depth * 43) % 360} 80% 70% / 0.7)` : "1px solid rgba(148,163,184,0.45)",
      borderRadius: 10,
      boxShadow: "0 6px 18px rgba(2, 6, 23, 0.35)",
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
    style: { stroke: `hsla(${hue} 85% 66% / 0.44)`, strokeWidth: 1.4 }
  };
}

export const ReactFlowOverlay = memo(function ReactFlowOverlay({ enabled }: { enabled: boolean }) {
  const version = useUniverseGraphStore((s) => s.version);
  const selectedProjectsKey = useUniverseGraphStore((s) => [...s.selectedProjectIds].sort().join("|"));
  const expandedKey = useUniverseGraphStore((s) => [...s.expandedNodeIds].sort().join("|"));
  const setNodePosition = useUniverseGraphStore((s) => s.setNodePosition);
  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
  const addEdgeToGraph = useUniverseGraphStore((s) => s.addEdge);

  const graphSnapshot = useMemo(() => {
    const state = useUniverseGraphStore.getState();
    const nodeArray = state.nodeArray.filter((node) => state.isNodeVisible(node)).slice(0, MAX_INTERACTIVE_NODES);
    const visibleNodeIds = new Set(nodeArray.map((node) => node.id));

    const xs = nodeArray.map((n) => n.posCurrent.x);
    const ys = nodeArray.map((n) => n.posCurrent.y);
    const minX = xs.length ? Math.min(...xs) : 0;
    const maxX = xs.length ? Math.max(...xs) : 0;
    const minY = ys.length ? Math.min(...ys) : 0;
    const maxY = ys.length ? Math.max(...ys) : 0;
    const cx = (minX + maxX) * 0.5;
    const cy = (minY + maxY) * 0.5;
    const rangeX = Math.max(1, maxX - minX);
    const rangeY = Math.max(1, maxY - minY);
    const targetW = 1200;
    const targetH = 700;
    const scale = Math.max(6, Math.min(46, Math.min(targetW / rangeX, targetH / rangeY)));

    return {
      nodes: nodeArray.map((node) =>
        toFlowNode({
          ...node,
          expanded: state.expandedNodeIds.has(node.id),
          position: {
            x: (node.posCurrent.x - cx) * scale,
            y: (node.posCurrent.y - cy) * scale
          }
        })
      ),
      edges: state.edgeArray
        .filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to))
        .map((edge) => {
          const depth = state.nodes.get(edge.from)?.depth ?? 0;
          return toFlowEdge(edge, depth);
        }),
      transform: { cx, cy, scale }
    };
  }, [version, selectedProjectsKey, expandedKey]);

  const [nodes, setNodes, onNodesChange] = useNodesState(graphSnapshot.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graphSnapshot.edges);

  useEffect(() => {
    setNodes(graphSnapshot.nodes);
    setEdges(graphSnapshot.edges);
  }, [graphSnapshot, setNodes, setEdges]);

  const handleNodeDragStop = useCallback(
    (_: MouseEvent, node: Node) => {
      const { cx, cy, scale } = graphSnapshot.transform;
      setNodePosition(node.id, {
        x: node.position.x / scale + cx,
        y: node.position.y / scale + cy,
        z: 0
      });
    },
    [graphSnapshot.transform, setNodePosition]
  );

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) => {
      const source = connection.source;
      const target = connection.target;
      if (!source || !target) return;

      setEdges((eds) => addEdge({ ...connection, type: "smoothstep" }, eds));
      addEdgeToGraph({ source, target });
    },
    [addEdgeToGraph, setEdges]
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={handleNodeDragStop}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        nodesDraggable={enabled}
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
