export type NodeType = "PROJECT" | "FOLDER" | "FILE";
export type DbNodeKind = "file" | "dir";

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

export interface UniverseDbStatus {
  active: boolean;
  sourceId: string;
  rootPath: string;
  dbPath: string;
  nodeCount: number;
  edgeCount: number;
  eventCount: number;
  lastEventSeq: number;
  lastCrawlAt: number | null;
  updatedAt: number;
}

export interface UniverseDbNode {
  id: string;
  sourceId: string;
  absPath: string;
  relPath: string;
  name: string;
  parentId: string | null;
  kind: DbNodeKind;
  ext: string | null;
  sizeBytes: number | null;
  mtimeMs: number | null;
  ctimeMs: number | null;
  exists: boolean;
  updatedAt: number;
}

export interface UniverseDbSearchResult {
  id: string;
  absPath: string;
  relPath: string;
  name: string;
  kind: DbNodeKind;
  parentId: string | null;
  ext: string | null;
  sizeBytes: number | null;
  mtimeMs: number | null;
}

export interface UniverseDbStatusResponse {
  ok: boolean;
  status: UniverseDbStatus | null;
}

export interface UniverseDbNodeResponse {
  ok: boolean;
  node: UniverseDbNode | null;
}

export interface UniverseDbSearchResponse {
  ok: boolean;
  query: string;
  results: UniverseDbSearchResult[];
}
