import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { nodeId, normalizePath } from "../universe/ids.js";
import { runMigrations } from "./migrations.js";

export interface ProjectDatabase {
  sourceId: string;
  rootPath: string;
  filePath: string;
  db: DatabaseSync;
  close: () => void;
}

function findWorkspaceRoot(startPath: string): string {
  let current = normalizePath(startPath);
  const { root } = path.parse(current);

  while (true) {
    if (fs.existsSync(path.join(current, ".git")) || fs.existsSync(path.join(current, ".openclaw"))) {
      return current;
    }

    const parent = normalizePath(path.dirname(current));
    if (parent === current || current === root) {
      return normalizePath(startPath);
    }
    current = parent;
  }
}

export function deriveSourceId(rootPath: string): string {
  return nodeId(rootPath);
}

export function resolveProjectDbPath(rootPath: string, sourceId = deriveSourceId(rootPath)): string {
  const workspaceRoot = findWorkspaceRoot(rootPath);
  return path.join(workspaceRoot, ".openclaw", "state", "nebula", `${sourceId}.sqlite`);
}

export function openProjectDb(rootPath: string): ProjectDatabase {
  const normalizedRoot = normalizePath(rootPath);
  const sourceId = deriveSourceId(normalizedRoot);
  const filePath = resolveProjectDbPath(normalizedRoot, sourceId);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const db = new DatabaseSync(filePath);
  runMigrations(db);

  return {
    sourceId,
    rootPath: normalizedRoot,
    filePath,
    db,
    close() {
      if (db.isOpen) {
        db.close();
      }
    }
  };
}
