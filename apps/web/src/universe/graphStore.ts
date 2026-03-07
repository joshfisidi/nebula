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
  expandedNodeIds: Set<string>;
  focusId: string | null;
  version: number;
  setConnected: (connected: boolean) => void;
  applySnapshot: (snapshot: UniverseSnapshotMessage) => void;
  applyPatch: (ops: PatchOp[]) => void;
  addEdge: (params: { source: string; target: string }) => void;
  setProjectSelection: (projectId: string | null) => void;
  clearProjectSelection: () => void;
  selectAllProjects: () => void;
  toggleExpandedNode: (nodeId: string) => void;
  setFocusId: (nodeId: string | null) => void;
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

function applyDeterministicTreeLayout(nodes: Map<string, RenderNode>) {
  const children = new Map<string, RenderNode[]>();
  const roots: RenderNode[] = [];

  for (const node of nodes.values()) {
    if (!node.parentId || !nodes.has(node.parentId)) {
      roots.push(node);
      continue;
    }

    const arr = children.get(node.parentId) ?? [];
    arr.push(node);
    children.set(node.parentId, arr);
  }

  for (const arr of children.values()) arr.sort((a, b) => a.name.localeCompare(b.name));
  roots.sort((a, b) => a.name.localeCompare(b.name));

  const yById = new Map<string, number>();
  let laneCursor = 0;

  const place = (node: RenderNode, depth: number) => {
    const kids = children.get(node.id) ?? [];
    node.depth = depth;

    if (kids.length === 0) {
      yById.set(node.id, laneCursor);
      laneCursor += 1;
      return;
    }

    const start = laneCursor;
    for (const child of kids) place(child, depth + 1);
    const end = Math.max(start, laneCursor - 1);
    yById.set(node.id, (start + end) / 2);
  };

  for (const root of roots) {
    place(root, 0);
    laneCursor += 2;
  }

  const ys = [...yById.values()];
  const minY = ys.length ? Math.min(...ys) : 0;
  const maxY = ys.length ? Math.max(...ys) : 0;
  const centerY = (minY + maxY) * 0.5;

  const X_SPACING = 1.0;
  const Y_SPACING = 0.85;

  for (const node of nodes.values()) {
    const laneY = (yById.get(node.id) ?? 0) - centerY;
    const target: Vec3 = { x: node.depth * X_SPACING, y: laneY * Y_SPACING, z: 0 };
    node.pos = target;
    node.posTarget = { ...target };
    node.posCurrent = { ...target };
  }
}

export const useUniverseGraphStore = create<UniverseGraphState>((set, get) => ({
  connected: false,
  nodes: new Map(),
  edges: new Map(),
  nodeArray: [],
  edgeArray: [],
  selectedProjectIds: new Set<string>(),
  expandedNodeIds: new Set<string>(),
  focusId: null,
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
    applyDeterministicTreeLayout(nodes);

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
    applyDeterministicTreeLayout(nodes);
    set({ nodes, edges, nodeArray: [...nodes.values()], edgeArray: [...edges.values()], version: state.version + 1 });
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

  setProjectSelection(projectId) {
    if (!projectId) {
      set({ selectedProjectIds: new Set<string>(), expandedNodeIds: new Set<string>(), focusId: null });
      return;
    }
    set({ selectedProjectIds: new Set<string>([projectId]), expandedNodeIds: new Set<string>(), focusId: projectId });
  },

  clearProjectSelection() {
    set({ selectedProjectIds: new Set<string>(), expandedNodeIds: new Set<string>(), focusId: null });
  },

  selectAllProjects() {
    set((state) => {
      const all = new Set<string>();
      for (const node of state.nodeArray) {
        if (node.projectId) all.add(node.projectId);
      }
      return { selectedProjectIds: all, expandedNodeIds: new Set<string>(), focusId: null };
    });
  },

  toggleExpandedNode(nodeId) {
    set((state) => {
      const next = new Set(state.expandedNodeIds);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return { expandedNodeIds: next };
    });
  },

  setFocusId(nodeId) {
    set({ focusId: nodeId });
  },

  isNodeVisible(node) {
    const state = get();
    const selected = state.selectedProjectIds;
    if (selected.size === 0 || !selected.has(node.projectId)) return false;

    if (node.id === node.projectId) return true;

    const parentId = node.parentId;
    if (!parentId) return false;

    let cursor: string | undefined = parentId;
    while (cursor) {
      if (cursor === node.projectId) {
        return state.expandedNodeIds.has(cursor);
      }

      if (!state.expandedNodeIds.has(cursor)) return false;
      cursor = state.nodes.get(cursor)?.parentId;
    }

    return false;
  }
}));

export type { RenderNode };
