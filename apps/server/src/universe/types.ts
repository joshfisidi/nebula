export type NodeKind = "dir" | "file";
export type EdgeKind = "contains";

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
  graph: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
}

export interface UniversePatchMessage {
  type: "patch";
  t: number;
  ops: PatchOp[];
}

export type UniverseMessage = UniverseSnapshotMessage | UniversePatchMessage;
