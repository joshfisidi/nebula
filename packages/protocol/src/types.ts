export type NodeType = "PROJECT" | "FOLDER" | "FILE";

export interface UniverseNode {
  id: string;
  type: NodeType;
  parentId?: string;
  projectId: string;
  path: string;
  createdAt: number;
}

export interface UniverseEdge {
  id: string;
  from: string;
  to: string;
  type: "PARENT" | "IMPORT";
}

export type UniverseEvent =
  | { type: "node.create"; node: UniverseNode }
  | { type: "node.update"; node: UniverseNode }
  | { type: "edge.create"; edge: UniverseEdge };
