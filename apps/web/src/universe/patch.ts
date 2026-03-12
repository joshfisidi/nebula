export type NodeKind = "dir" | "file";
export type EdgeKind = "contains";

export interface NodePhysicsMeta {
  mass: number;
  charge: number;
  restLengthScale: number;
  stiffnessScale: number;
  volatility: number;
  salience: number;
  subtreeMass: number;
  depth: number;
  collisionRadius: number;
  anchorRadius: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface GraphNode {
  id: string;
  kind: NodeKind;
  name: string;
  path: string;
  depth: number;
  parentId?: string;
  sizeBytes?: number;
  mtimeMs?: number;
  pos?: Vec3;
  physics?: NodePhysicsMeta;
}

export interface GraphEdge {
  id: string;
  kind: EdgeKind;
  from: string;
  to: string;
}

export type PatchOp =
  | { op: "upsertNode"; node: GraphNode }
  | { op: "removeNode"; id: string }
  | { op: "upsertEdge"; edge: GraphEdge }
  | { op: "removeEdge"; id: string }
  | { op: "setPos"; id: string; pos: Vec3 };

export interface UniverseSnapshotMessage {
  type: "snapshot";
  t: number;
  graph: { nodes: GraphNode[]; edges: GraphEdge[] };
}

export interface UniversePatchMessage {
  type: "patch";
  t: number;
  ops: PatchOp[];
}

export type UniverseMessage = UniverseSnapshotMessage | UniversePatchMessage;

export function isUniverseMessage(value: unknown): value is UniverseMessage {
  if (!value || typeof value !== "object") return false;
  const maybe = value as Partial<UniverseMessage>;
  if (maybe.type === "snapshot") {
    return Boolean(maybe.graph && Array.isArray(maybe.graph.nodes) && Array.isArray(maybe.graph.edges));
  }
  if (maybe.type === "patch") {
    return Array.isArray(maybe.ops);
  }
  return false;
}

type PendingNodeState = {
  order: number;
  upsertNode?: Extract<PatchOp, { op: "upsertNode" }>["node"];
  setPos?: Extract<PatchOp, { op: "setPos" }>["pos"];
  removed?: boolean;
};

type PendingEdgeState = {
  order: number;
  upsertEdge?: Extract<PatchOp, { op: "upsertEdge" }>["edge"];
  removed?: boolean;
};

export function compressPatchOps(ops: PatchOp[]): PatchOp[] {
  const nodeState = new Map<string, PendingNodeState>();
  const edgeState = new Map<string, PendingEdgeState>();
  let sequence = 0;

  for (const op of ops) {
    switch (op.op) {
      case "upsertNode": {
        const current = nodeState.get(op.node.id) ?? { order: sequence++ };
        current.removed = false;
        current.upsertNode = current.setPos ? { ...op.node, pos: { ...current.setPos } } : op.node;
        nodeState.set(op.node.id, current);
        break;
      }
      case "setPos": {
        const current = nodeState.get(op.id) ?? { order: sequence++ };
        current.removed = false;
        current.setPos = op.pos;
        if (current.upsertNode) {
          current.upsertNode = { ...current.upsertNode, pos: { ...op.pos } };
        }
        nodeState.set(op.id, current);
        break;
      }
      case "removeNode": {
        const current = nodeState.get(op.id) ?? { order: sequence++ };
        current.removed = true;
        current.upsertNode = undefined;
        current.setPos = undefined;
        nodeState.set(op.id, current);
        break;
      }
      case "upsertEdge": {
        const current = edgeState.get(op.edge.id) ?? { order: sequence++ };
        current.removed = false;
        current.upsertEdge = op.edge;
        edgeState.set(op.edge.id, current);
        break;
      }
      case "removeEdge": {
        const current = edgeState.get(op.id) ?? { order: sequence++ };
        current.removed = true;
        current.upsertEdge = undefined;
        edgeState.set(op.id, current);
        break;
      }
    }
  }

  const out: Array<{ order: number; op: PatchOp }> = [];

  for (const [id, state] of nodeState) {
    if (state.removed) {
      out.push({ order: state.order, op: { op: "removeNode", id } });
      continue;
    }
    if (state.upsertNode) {
      out.push({ order: state.order, op: { op: "upsertNode", node: state.upsertNode } });
      continue;
    }
    if (state.setPos) {
      out.push({ order: state.order, op: { op: "setPos", id, pos: state.setPos } });
    }
  }

  for (const [id, state] of edgeState) {
    if (state.removed) {
      out.push({ order: state.order, op: { op: "removeEdge", id } });
      continue;
    }
    if (state.upsertEdge) {
      out.push({ order: state.order, op: { op: "upsertEdge", edge: state.upsertEdge } });
    }
  }

  return out.sort((a, b) => a.order - b.order).map((entry) => entry.op);
}
