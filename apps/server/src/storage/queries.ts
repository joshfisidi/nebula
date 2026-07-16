import type { DatabaseSync } from "node:sqlite";
import type { UniverseDbNode, UniverseDbSearchResult, UniverseDbStatus } from "@nebula/protocol";

type StatusRow = {
  nodeCount: number;
  edgeCount: number;
  eventCount: number;
  lastEventSeq: number;
  lastCrawlAt: number | null;
  updatedAt: number;
};

type NodeRow = {
  id: string;
  sourceId: string;
  absPath: string;
  relPath: string;
  name: string;
  parentId: string | null;
  kind: "file" | "dir";
  ext: string | null;
  sizeBytes: number | null;
  mtimeMs: number | null;
  ctimeMs: number | null;
  existsFlag: number;
  updatedAt: number;
};

type SearchRow = {
  id: string;
  absPath: string;
  relPath: string;
  name: string;
  kind: "file" | "dir";
  parentId: string | null;
  ext: string | null;
  sizeBytes: number | null;
  mtimeMs: number | null;
};

export function readProjectionStatus(db: DatabaseSync, params: {
  sourceId: string;
  rootPath: string;
  dbPath: string;
}): UniverseDbStatus {
  const row = db
    .prepare(`
      SELECT
        (SELECT COUNT(*) FROM fs_nodes WHERE source_id = ? AND exists_flag = 1) AS nodeCount,
        (SELECT COUNT(*) FROM fs_edges WHERE source_id = ?) AS edgeCount,
        (SELECT COUNT(*) FROM fs_events WHERE source_id = ?) AS eventCount,
        (SELECT COALESCE(MAX(seq), 0) FROM fs_events WHERE source_id = ?) AS lastEventSeq,
        (SELECT last_crawl_at FROM checkpoints WHERE source_id = ?) AS lastCrawlAt,
        (SELECT updated_at FROM sources WHERE id = ?) AS updatedAt
    `)
    .get(
      params.sourceId,
      params.sourceId,
      params.sourceId,
      params.sourceId,
      params.sourceId,
      params.sourceId
    ) as StatusRow;

  return {
    active: true,
    sourceId: params.sourceId,
    rootPath: params.rootPath,
    dbPath: params.dbPath,
    nodeCount: Number(row.nodeCount ?? 0),
    edgeCount: Number(row.edgeCount ?? 0),
    eventCount: Number(row.eventCount ?? 0),
    lastEventSeq: Number(row.lastEventSeq ?? 0),
    lastCrawlAt: row.lastCrawlAt == null ? null : Number(row.lastCrawlAt),
    updatedAt: Number(row.updatedAt ?? Date.now())
  };
}

export function readProjectionNodeById(db: DatabaseSync, params: {
  sourceId: string;
  id: string;
}): UniverseDbNode | null {
  const row = db
    .prepare(`
      SELECT
        id,
        source_id AS sourceId,
        abs_path AS absPath,
        rel_path AS relPath,
        name,
        parent_id AS parentId,
        kind,
        ext,
        size_bytes AS sizeBytes,
        mtime_ms AS mtimeMs,
        ctime_ms AS ctimeMs,
        exists_flag AS existsFlag,
        updated_at AS updatedAt
      FROM fs_nodes
      WHERE source_id = ? AND id = ?
      LIMIT 1
    `)
    .get(params.sourceId, params.id) as NodeRow | undefined;

  if (!row) return null;

  return {
    id: row.id,
    sourceId: row.sourceId,
    absPath: row.absPath,
    relPath: row.relPath,
    name: row.name,
    parentId: row.parentId,
    kind: row.kind,
    ext: row.ext,
    sizeBytes: row.sizeBytes == null ? null : Number(row.sizeBytes),
    mtimeMs: row.mtimeMs == null ? null : Number(row.mtimeMs),
    ctimeMs: row.ctimeMs == null ? null : Number(row.ctimeMs),
    exists: row.existsFlag === 1,
    updatedAt: Number(row.updatedAt)
  };
}

export function searchProjectionNodes(db: DatabaseSync, params: {
  sourceId: string;
  query: string;
  limit: number;
}): UniverseDbSearchResult[] {
  const query = params.query.trim().toLowerCase();
  if (!query) return [];

  const rows = db
    .prepare(`
      SELECT
        id,
        abs_path AS absPath,
        rel_path AS relPath,
        name,
        kind,
        parent_id AS parentId,
        ext,
        size_bytes AS sizeBytes,
        mtime_ms AS mtimeMs
      FROM fs_nodes
      WHERE source_id = ?
        AND exists_flag = 1
        AND (
          lower(name) LIKE '%' || ? || '%'
          OR lower(rel_path) LIKE '%' || ? || '%'
        )
      ORDER BY
        CASE
          WHEN lower(name) = ? THEN 0
          WHEN lower(name) LIKE ? || '%' THEN 1
          WHEN lower(rel_path) LIKE ? || '%' THEN 2
          ELSE 3
        END,
        kind DESC,
        rel_path ASC
      LIMIT ?
    `)
    .all(params.sourceId, query, query, query, query, query, params.limit) as SearchRow[];

  return rows.map((row) => ({
    id: row.id,
    absPath: row.absPath,
    relPath: row.relPath,
    name: row.name,
    kind: row.kind,
    parentId: row.parentId,
    ext: row.ext,
    sizeBytes: row.sizeBytes == null ? null : Number(row.sizeBytes),
    mtimeMs: row.mtimeMs == null ? null : Number(row.mtimeMs)
  }));
}
