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

function toFlowNode(node: { id: string; name: string; kind: string; posCurrent: { x: number; y: number } }): Node {
  const isDir = node.kind === "dir";
  return {
    id: node.id,
    position: { x: node.posCurrent.x * 18, y: node.posCurrent.y * 18 },
    data: { label: node.name },
    draggable: true,
    selectable: true,
    style: {
      background: isDir ? "rgba(22,40,84,0.95)" : "rgba(16,24,44,0.92)",
      color: "#dbeafe",
      border: isDir ? "1px solid rgba(125,211,252,0.55)" : "1px solid rgba(148,163,184,0.45)",
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

function toFlowEdge(edge: { id: string; from: string; to: string }): Edge {
  return {
    id: edge.id,
    source: edge.from,
    target: edge.to,
    type: "smoothstep",
    style: { stroke: "rgba(125, 178, 255, 0.32)", strokeWidth: 1 }
  };
}

export const ReactFlowOverlay = memo(function ReactFlowOverlay({ enabled }: { enabled: boolean }) {
  const version = useUniverseGraphStore((s) => s.version);
  const selectedProjectsKey = useUniverseGraphStore((s) => [...s.selectedProjectIds].sort().join("|"));
  const setNodePosition = useUniverseGraphStore((s) => s.setNodePosition);
  const addEdgeToGraph = useUniverseGraphStore((s) => s.addEdge);

  const graphSnapshot = useMemo(() => {
    const state = useUniverseGraphStore.getState();
    const nodeArray = state.nodeArray.filter((node) => state.isNodeVisible(node)).slice(0, MAX_INTERACTIVE_NODES);
    const visibleNodeIds = new Set(nodeArray.map((node) => node.id));
    return {
      nodes: nodeArray.map(toFlowNode),
      edges: state.edgeArray
        .filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to))
        .map((edge) => toFlowEdge(edge))
    };
  }, [version, selectedProjectsKey, enabled]);

  const [nodes, setNodes, onNodesChange] = useNodesState(graphSnapshot.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graphSnapshot.edges);

  useEffect(() => {
    setNodes(graphSnapshot.nodes);
    setEdges(graphSnapshot.edges);
  }, [graphSnapshot, setNodes, setEdges]);

  const handleNodeDragStop = useCallback(
    (_: MouseEvent, node: Node) => {
      setNodePosition(node.id, { x: node.position.x, y: node.position.y, z: 0 });
    },
    [setNodePosition]
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
