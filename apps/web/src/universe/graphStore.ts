import { create } from "zustand";
import type { GraphEdge, GraphNode, PatchOp, UniverseSnapshotMessage, Vec3 } from "./patch";

interface RenderNode extends GraphNode {
  projectId: string;
  posCurrent: Vec3;
  posTarget: Vec3;
}

interface UniverseGraphState {
  connected: boolean;
  nodes: Map<string, RenderNode>;
  edges: Map<string, GraphEdge>;
  nodeArray: RenderNode[];
  edgeArray: GraphEdge[];
  selectedProjectIds: Set<string>;
  version: number;
  setConnected: (connected: boolean) => void;
  applySnapshot: (snapshot: UniverseSnapshotMessage) => void;
  applyPatch: (ops: PatchOp[]) => void;
  tick: (alpha: number) => void;
  setNodePosition: (id: string, pos: Vec3) => void;
  addEdge: (params: { source: string; target: string }) => void;
  toggleProjectSelection: (projectId: string) => void;
  setProjectSelection: (projectId: string | null) => void;
  clearProjectSelection: () => void;
  selectAllProjects: () => void;
  isNodeVisible: (node: RenderNode) => boolean;
}

function toVec(value?: Vec3): Vec3 {
  return value ?? { x: 0, y: 0, z: 0 };
}

function assignProjectIds(nodes: Map<string, RenderNode>) {
  const memo = new Map<string, string>();

  const resolve = (id: string): string => {
    const cached = memo.get(id);
    if (cached) return cached;

    const node = nodes.get(id);
    if (!node) return id;

    if (!node.parentId) {
      memo.set(id, id);
      return id;
    }

    const rootId = resolve(node.parentId);
    memo.set(id, rootId);
    return rootId;
  };

  for (const node of nodes.values()) {
    node.projectId = resolve(node.id);
  }
}

export const useUniverseGraphStore = create<UniverseGraphState>((set, get) => ({
  connected: false,
  nodes: new Map(),
  edges: new Map(),
  nodeArray: [],
  edgeArray: [],
  selectedProjectIds: new Set<string>(),
  version: 0,

  setConnected(connected) {
    set({ connected });
  },

  applySnapshot(snapshot) {
    const nodes = new Map<string, RenderNode>();
    for (const node of snapshot.graph.nodes) {
      const pos = toVec(node.pos);
      nodes.set(node.id, { ...node, projectId: node.id, posCurrent: { ...pos }, posTarget: { ...pos } });
    }

    assignProjectIds(nodes);

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
            projectId: existing?.projectId ?? op.node.id,
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
          if (node) {
            node.posTarget = op.pos;
            node.posCurrent = { ...op.pos };
          }
          break;
        }
      }
    }

    assignProjectIds(nodes);
    set({ nodes, edges, nodeArray: [...nodes.values()], edgeArray: [...edges.values()], version: state.version + 1 });
  },

  tick(alpha) {
    const state = get();
    for (const node of state.nodes.values()) {
      node.posCurrent.x += (node.posTarget.x - node.posCurrent.x) * alpha;
      node.posCurrent.y += (node.posTarget.y - node.posCurrent.y) * alpha;
      node.posCurrent.z += (node.posTarget.z - node.posCurrent.z) * alpha;
    }
  },

  setNodePosition(id, pos) {
    const state = get();
    const nodes = new Map(state.nodes);
    const node = nodes.get(id);
    if (!node) return;

    node.posTarget = { ...pos };
    node.posCurrent = { ...pos };
    node.pos = { ...pos };

    set({ nodes, nodeArray: [...nodes.values()], version: state.version + 1 });
  },

  addEdge({ source, target }) {
    const state = get();
    if (!state.nodes.has(source) || !state.nodes.has(target) || source === target) {
      return;
    }

    const id = `rf_${source}_${target}`;
    if (state.edges.has(id)) return;

    const edges = new Map(state.edges);
    edges.set(id, {
      id,
      from: source,
      to: target,
      kind: "contains"
    });

    set({ edges, edgeArray: [...edges.values()], version: state.version + 1 });
  },

  toggleProjectSelection(projectId) {
    set((state) => {
      const next = new Set(state.selectedProjectIds);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return { selectedProjectIds: next };
    });
  },

  setProjectSelection(projectId) {
    if (!projectId) {
      set({ selectedProjectIds: new Set<string>() });
      return;
    }
    set({ selectedProjectIds: new Set<string>([projectId]) });
  },

  clearProjectSelection() {
    set({ selectedProjectIds: new Set<string>() });
  },

  selectAllProjects() {
    set((state) => {
      const all = new Set<string>();
      for (const node of state.nodeArray) {
        if (node.projectId) all.add(node.projectId);
      }
      return { selectedProjectIds: all };
    });
  },

  isNodeVisible(node) {
    const selected = get().selectedProjectIds;
    return selected.size > 0 && selected.has(node.projectId);
  }
}));

export type { RenderNode };
