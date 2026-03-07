"use client";

import { memo, useCallback, useEffect, useMemo, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  OnConnect,
  useEdgesState,
  useNodesState
} from "reactflow";
import { AnimatedSVGEdge } from "./AnimatedSVGEdge";
import "reactflow/dist/style.css";
import { useUniverseGraphStore } from "./graphStore";

const MAX_INTERACTIVE_NODES = 2500;
const MAX_ANIMATED_EDGE_NODES = 1200;

function toFlowNode(node: { id: string; name: string; posCurrent: { x: number; y: number } }): Node {
  return {
    id: node.id,
    position: { x: node.posCurrent.x, y: node.posCurrent.y },
    data: { label: node.name },
    draggable: true,
    selectable: true,
    style: {
      opacity: 0.01,
      background: "transparent",
      border: "none",
      boxShadow: "none",
      width: 14,
      height: 14,
      padding: 0
    }
  };
}

function toFlowEdge(edge: { id: string; from: string; to: string }, animated: boolean): Edge {
  return {
    id: edge.id,
    source: edge.from,
    target: edge.to,
    type: animated ? "animatedSvg" : undefined,
    style: { opacity: animated ? 0.18 : 0.08 }
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
    const useAnimatedEdges = enabled && nodeArray.length <= MAX_ANIMATED_EDGE_NODES;

    return {
      nodes: nodeArray.map(toFlowNode),
      edges: state.edgeArray
        .filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to))
        .map((edge) => toFlowEdge(edge, useAnimatedEdges)),
      useAnimatedEdges
    };
  }, [version, selectedProjectsKey, enabled]);

  const [nodes, setNodes, onNodesChange] = useNodesState(graphSnapshot.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graphSnapshot.edges);
  const edgeTypes = useMemo(() => ({ animatedSvg: AnimatedSVGEdge }), []);

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
      addEdgeToGraph({ source, target });
    },
    [addEdgeToGraph]
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
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={handleNodeDragStop}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={enabled}
        nodesConnectable={enabled}
        elementsSelectable={enabled}
        zoomOnScroll={enabled}
        panOnDrag={enabled}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(80,120,180,0.12)" gap={28} size={1} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
});
