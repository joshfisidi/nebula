import type { DatabaseSync } from "node:sqlite";

export function runMigrations(db: DatabaseSync): void {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA foreign_keys = OFF;
    PRAGMA busy_timeout = 5000;

    CREATE TABLE IF NOT EXISTS sources (
      id TEXT PRIMARY KEY,
      root_path TEXT NOT NULL UNIQUE,
      db_path TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fs_nodes (
      id TEXT PRIMARY KEY,
      source_id TEXT NOT NULL,
      abs_path TEXT NOT NULL,
      rel_path TEXT NOT NULL,
      name TEXT NOT NULL,
      parent_id TEXT,
      kind TEXT NOT NULL,
      ext TEXT,
      size_bytes INTEGER,
      mtime_ms REAL,
      ctime_ms REAL,
      content_hash TEXT,
      exists_flag INTEGER NOT NULL DEFAULT 1,
      metadata_json TEXT,
      updated_at INTEGER NOT NULL,
      UNIQUE(source_id, abs_path)
    );

    CREATE TABLE IF NOT EXISTS fs_edges (
      id TEXT PRIMARY KEY,
      source_id TEXT NOT NULL,
      from_id TEXT NOT NULL,
      to_id TEXT NOT NULL,
      kind TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      UNIQUE(source_id, from_id, to_id, kind)
    );

    CREATE TABLE IF NOT EXISTS fs_events (
      seq INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id TEXT NOT NULL,
      op TEXT NOT NULL,
      node_id TEXT,
      abs_path TEXT NOT NULL,
      ts_ms INTEGER NOT NULL,
      payload_json TEXT
    );

    CREATE TABLE IF NOT EXISTS records (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS record_bindings (
      record_id TEXT NOT NULL,
      node_id TEXT NOT NULL,
      binding_kind TEXT NOT NULL,
      metadata_json TEXT,
      PRIMARY KEY (record_id, node_id, binding_kind)
    );

    CREATE TABLE IF NOT EXISTS checkpoints (
      source_id TEXT PRIMARY KEY,
      last_event_seq INTEGER NOT NULL DEFAULT 0,
      last_crawl_at INTEGER,
      updated_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_fs_nodes_source_exists_rel_path ON fs_nodes (source_id, exists_flag, rel_path);
    CREATE INDEX IF NOT EXISTS idx_fs_nodes_source_exists_name ON fs_nodes (source_id, exists_flag, name);
    CREATE INDEX IF NOT EXISTS idx_fs_edges_source ON fs_edges (source_id);
    CREATE INDEX IF NOT EXISTS idx_fs_events_source_seq ON fs_events (source_id, seq);
    CREATE INDEX IF NOT EXISTS idx_record_bindings_node ON record_bindings (node_id);
  `);
}
