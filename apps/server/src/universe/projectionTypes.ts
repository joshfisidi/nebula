import type { NodeKind } from "./types.js";

export type FsProjectionOp = "add" | "change" | "addDir" | "unlink" | "unlinkDir";

interface FsProjectionBase {
  op: FsProjectionOp;
  sourceId: string;
  rootPath: string;
  tsMs: number;
  nodeId: string;
  absPath: string;
  relPath: string;
  parentId: string | null;
  kind: NodeKind;
  ext: string | null;
}

export interface FsProjectionUpsertEvent extends FsProjectionBase {
  op: "add" | "change" | "addDir";
  sizeBytes: number | null;
  mtimeMs: number | null;
  ctimeMs: number | null;
}

export interface FsProjectionRemoveEvent extends FsProjectionBase {
  op: "unlink" | "unlinkDir";
}

export type FsProjectionEvent = FsProjectionUpsertEvent | FsProjectionRemoveEvent;
