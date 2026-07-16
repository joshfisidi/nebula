import fs from "node:fs";
import path from "node:path";
import { edgeId, nodeId, normalizePath } from "../universe/ids.js";
import type { FsProjectionEvent, FsProjectionUpsertEvent } from "../universe/projectionTypes.js";
import type { ProjectDatabase } from "./db.js";
import { readProjectionNodeById, readProjectionStatus, searchProjectionNodes } from "./queries.js";

export interface ProjectionStore {
  readonly sourceId: string;
  readonly rootPath: string;
  readonly dbPath: string;
  ensureSourceRoot: () => void;
  applyEvents: (events: FsProjectionEvent[]) => { applied: number; lastEventSeq: number };
  getStatus: () => ReturnType<typeof readProjectionStatus>;
  getNodeById: (id: string) => ReturnType<typeof readProjectionNodeById>;
  search: (query: string, limit?: number) => ReturnType<typeof searchProjectionNodes>;
  close: () => void;
}

function nowMs(): number {
  return Date.now();
}

function chunked<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    out.push(items.slice(index, index + size));
  }
  return out;
}

export function createProjectionStore(projectDb: ProjectDatabase): ProjectionStore {
  const { db, sourceId, rootPath, filePath } = projectDb;

  const ensureSourceRoot = () => {
    const timestamp = nowMs();
    const rootStats = fs.statSync(rootPath);
    const rootId = nodeId(rootPath);
    const rootName = path.basename(rootPath) || rootPath;

    db.exec("BEGIN IMMEDIATE");
    try {
      db
        .prepare(`
          INSERT INTO sources (id, root_path, db_path, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            root_path = excluded.root_path,
            db_path = excluded.db_path,
            updated_at = excluded.updated_at
        `)
        .run(sourceId, rootPath, filePath, timestamp, timestamp);

      db
        .prepare(`
          INSERT INTO fs_nodes (
            id, source_id, abs_path, rel_path, name, parent_id, kind, ext, size_bytes, mtime_ms, ctime_ms, content_hash, exists_flag, metadata_json, updated_at
          )
          VALUES (?, ?, ?, ?, ?, NULL, 'dir', NULL, NULL, ?, ?, NULL, 1, NULL, ?)
          ON CONFLICT(id) DO UPDATE SET
            source_id = excluded.source_id,
            abs_path = excluded.abs_path,
            rel_path = excluded.rel_path,
            name = excluded.name,
            parent_id = NULL,
            kind = excluded.kind,
            ext = NULL,
            size_bytes = NULL,
            mtime_ms = excluded.mtime_ms,
            ctime_ms = excluded.ctime_ms,
            exists_flag = 1,
            updated_at = excluded.updated_at
        `)
        .run(rootId, sourceId, rootPath, ".", rootName, rootStats.mtimeMs, rootStats.ctimeMs, timestamp);

      db
        .prepare(`
          INSERT INTO checkpoints (source_id, last_event_seq, last_crawl_at, updated_at)
          VALUES (?, 0, ?, ?)
          ON CONFLICT(source_id) DO UPDATE SET updated_at = excluded.updated_at
        `)
        .run(sourceId, timestamp, timestamp);

      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  };

  const upsertNode = (event: FsProjectionUpsertEvent, timestamp: number) => {
    db
      .prepare(`
        INSERT INTO fs_nodes (
          id, source_id, abs_path, rel_path, name, parent_id, kind, ext, size_bytes, mtime_ms, ctime_ms, content_hash, exists_flag, metadata_json, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, 1, NULL, ?)
        ON CONFLICT(id) DO UPDATE SET
          source_id = excluded.source_id,
          abs_path = excluded.abs_path,
          rel_path = excluded.rel_path,
          name = excluded.name,
          parent_id = excluded.parent_id,
          kind = excluded.kind,
          ext = excluded.ext,
          size_bytes = excluded.size_bytes,
          mtime_ms = excluded.mtime_ms,
          ctime_ms = excluded.ctime_ms,
          exists_flag = 1,
          updated_at = excluded.updated_at
      `)
      .run(
        event.nodeId,
        sourceId,
        event.absPath,
        event.relPath,
        path.basename(event.absPath) || event.absPath,
        event.parentId,
        event.kind,
        event.ext,
        event.sizeBytes,
        event.mtimeMs,
        event.ctimeMs,
        timestamp
      );

    if (event.parentId) {
      db
        .prepare(`
          INSERT INTO fs_edges (id, source_id, from_id, to_id, kind, updated_at)
          VALUES (?, ?, ?, ?, 'contains', ?)
          ON CONFLICT(id) DO UPDATE SET
            source_id = excluded.source_id,
            from_id = excluded.from_id,
            to_id = excluded.to_id,
            kind = excluded.kind,
            updated_at = excluded.updated_at
        `)
        .run(edgeId("contains", event.parentId, event.nodeId), sourceId, event.parentId, event.nodeId, timestamp);
    }
  };

  const markRemovedPath = (absPath: string, timestamp: number) => {
    const affected = db
      .prepare(`
        SELECT id
        FROM fs_nodes
        WHERE source_id = ? AND (abs_path = ? OR abs_path LIKE ?)
      `)
      .all(sourceId, absPath, `${absPath}/%`) as Array<{ id: string }>;

    const affectedIds = affected.map((row) => row.id);
    if (affectedIds.length === 0) return;

    for (const ids of chunked(affectedIds, 200)) {
      const placeholders = ids.map(() => "?").join(", ");

      db
        .prepare(`
          DELETE FROM fs_edges
          WHERE source_id = ?
            AND (
              from_id IN (${placeholders})
              OR to_id IN (${placeholders})
            )
        `)
        .run(sourceId, ...ids, ...ids);

      db
        .prepare(`
          UPDATE fs_nodes
          SET exists_flag = 0, updated_at = ?
          WHERE source_id = ? AND id IN (${placeholders})
        `)
        .run(timestamp, sourceId, ...ids);
    }
  };

  const appendEvent = (event: FsProjectionEvent): number => {
    const payload =
      event.op === "add" || event.op === "change" || event.op === "addDir"
        ? JSON.stringify({
            relPath: event.relPath,
            parentId: event.parentId,
            kind: event.kind,
            ext: event.ext,
            sizeBytes: event.sizeBytes,
            mtimeMs: event.mtimeMs,
            ctimeMs: event.ctimeMs
          })
        : JSON.stringify({
            relPath: event.relPath,
            parentId: event.parentId,
            kind: event.kind,
            ext: event.ext
          });

    const result = db
      .prepare(`
        INSERT INTO fs_events (source_id, op, node_id, abs_path, ts_ms, payload_json)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .run(sourceId, event.op, event.nodeId, event.absPath, event.tsMs, payload);

    return Number(result.lastInsertRowid ?? 0);
  };

  return {
    sourceId,
    rootPath,
    dbPath: filePath,
    ensureSourceRoot,
    applyEvents(events) {
      if (events.length === 0) {
        return { applied: 0, lastEventSeq: 0 };
      }

      const timestamp = nowMs();
      let lastEventSeq = 0;

      db.exec("BEGIN IMMEDIATE");
      try {
        for (const event of events) {
          if (event.op === "add" || event.op === "change" || event.op === "addDir") {
            upsertNode(event, timestamp);
          } else {
            markRemovedPath(normalizePath(event.absPath), timestamp);
          }
          lastEventSeq = appendEvent(event);
        }

        db
          .prepare(`
            UPDATE sources
            SET updated_at = ?
            WHERE id = ?
          `)
          .run(timestamp, sourceId);

        db
          .prepare(`
            INSERT INTO checkpoints (source_id, last_event_seq, last_crawl_at, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(source_id) DO UPDATE SET
              last_event_seq = excluded.last_event_seq,
              last_crawl_at = excluded.last_crawl_at,
              updated_at = excluded.updated_at
          `)
          .run(sourceId, lastEventSeq, timestamp, timestamp);

        db.exec("COMMIT");
      } catch (error) {
        db.exec("ROLLBACK");
        throw error;
      }

      return { applied: events.length, lastEventSeq };
    },
    getStatus() {
      return readProjectionStatus(db, { sourceId, rootPath, dbPath: filePath });
    },
    getNodeById(id: string) {
      return readProjectionNodeById(db, { sourceId, id });
    },
    search(query: string, limit = 25) {
      const boundedLimit = Math.max(1, Math.min(100, Math.trunc(limit)));
      return searchProjectionNodes(db, { sourceId, query, limit: boundedLimit });
    },
    close() {
      projectDb.close();
    }
  };
}
