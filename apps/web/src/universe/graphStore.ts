import { create } from "zustand";
import type { GraphEdge, GraphNode, PatchOp, UniverseSnapshotMessage, Vec3 } from "./patch";

interface RenderNode extends GraphNode {
  posCurrent: Vec3;
  posTarget: Vec3;
}

interface UniverseGraphState {
  connected: boolean;
  nodes: Map<string, RenderNode>;
  edges: Map<string, GraphEdge>;
  nodeArray: RenderNode[];
  edgeArray: GraphEdge[];
  version: number;
  setConnected: (connected: boolean) => void;
  applySnapshot: (snapshot: UniverseSnapshotMessage) => void;
  applyPatch: (ops: PatchOp[]) => void;
  tick: (alpha: number) => void;
}

function toVec(value?: Vec3): Vec3 {
  return value ?? { x: 0, y: 0, z: 0 };
}

export const useUniverseGraphStore = create<UniverseGraphState>((set, get) => ({
  connected: false,
  nodes: new Map(),
  edges: new Map(),
  nodeArray: [],
  edgeArray: [],
  version: 0,

  setConnected(connected) {
    set({ connected });
  },

  applySnapshot(snapshot) {
    const nodes = new Map<string, RenderNode>();
    for (const node of snapshot.graph.nodes) {
      const pos = toVec(node.pos);
      nodes.set(node.id, { ...node, posCurrent: { ...pos }, posTarget: { ...pos } });
    }

    const edges = new Map<string, GraphEdge>();
    for (const edge of snapshot.graph.edges) {
      edges.set(edge.id, edge);
    }

    set({ nodes, edges, nodeArray: [...nodes.values()], edgeArray: [...edges.values()], version: get().version + 1 });
  },

  applyPatch(ops) {
    const state = get();
    const nodes = new Map(state.nodes);
    const edges = new Map(state.edges);

    for (const op of ops) {
      switch (op.op) {
        case "upsertNode": {
          const existing = nodes.get(op.node.id);
          const target = toVec(op.node.pos);
          nodes.set(op.node.id, {
            ...op.node,
            posCurrent: existing?.posCurrent ?? { ...target },
            posTarget: target
          });
          break;
        }
        case "removeNode":
          nodes.delete(op.id);
          break;
        case "upsertEdge":
          edges.set(op.edge.id, op.edge);
          break;
        case "removeEdge":
          edges.delete(op.id);
          break;
        case "setPos": {
          const node = nodes.get(op.id);
          if (node) node.posTarget = op.pos;
          break;
        }
      }
    }

    set({ nodes, edges, nodeArray: [...nodes.values()], edgeArray: [...edges.values()], version: state.version + 1 });
  },

  tick(alpha) {
    const state = get();
    for (const node of state.nodes.values()) {
      node.posCurrent.x += (node.posTarget.x - node.posCurrent.x) * alpha;
      node.posCurrent.y += (node.posTarget.y - node.posCurrent.y) * alpha;
      node.posCurrent.z += (node.posTarget.z - node.posCurrent.z) * alpha;
    }
  }
}));

export type { RenderNode };
