import fs from "node:fs/promises";
import path from "node:path";
import chokidar from "chokidar";
import { createIgnoreMatcher } from "./ignore.js";
import { nodeId, normalizePath, relativePathFrom } from "./ids.js";
import type { FsProjectionEvent, FsProjectionOp } from "./projectionTypes.js";
import type { PatchOp } from "./types.js";
import { UniverseGraph } from "./graph.js";

export interface UniverseWatcher {
  close: () => Promise<void>;
}

export function startUniverseWatcher(params: {
  rootPath: string;
  sourceId: string;
  graph: UniverseGraph;
  onOps: (ops: PatchOp[]) => void;
  onProjectionEvents?: (events: FsProjectionEvent[]) => void;
  logger?: (record: Record<string, unknown>) => void;
}): UniverseWatcher {
  const rootPath = normalizePath(params.rootPath);
  const isIgnored = createIgnoreMatcher(rootPath);

  const log = (event: string, extra: Record<string, unknown> = {}) =>
    params.logger?.({ scope: "universe", event, rootPath, ...extra });

  const watcher = chokidar.watch(rootPath, {
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 120, pollInterval: 20 },
    ignored(candidate) {
      return isIgnored(String(candidate));
    }
  });

  const onUpsert = async (rawPath: string, kind: "file" | "dir", op: Extract<FsProjectionOp, "add" | "change" | "addDir">): Promise<void> => {
    const absPath = normalizePath(path.resolve(rawPath));
    if (isIgnored(absPath)) return;

    const stat = await fs.stat(absPath).catch(() => null);
    if (!stat) return;

    params.onProjectionEvents?.([
      {
        op,
        sourceId: params.sourceId,
        rootPath,
        tsMs: Date.now(),
        nodeId: nodeId(absPath),
        absPath,
        relPath: relativePathFrom(rootPath, absPath),
        parentId: absPath === rootPath ? null : nodeId(path.dirname(absPath)),
        kind,
        ext: kind === "file" ? path.extname(absPath).toLowerCase() || null : null,
        sizeBytes: kind === "file" ? stat.size : null,
        mtimeMs: stat.mtimeMs,
        ctimeMs: stat.ctimeMs
      }
    ]);

    const ops = await params.graph.upsertPath(absPath, kind);
    if (ops.length > 0) {
      log(kind === "file" ? "fs_upsert_file" : "fs_upsert_dir", { path: absPath, ops: ops.length });
      params.onOps(ops);
    }
  };

  const onRemove = (rawPath: string, kind: "file" | "dir", op: Extract<FsProjectionOp, "unlink" | "unlinkDir">): void => {
    const absPath = normalizePath(path.resolve(rawPath));
    if (isIgnored(absPath)) return;

    params.onProjectionEvents?.([
      {
        op,
        sourceId: params.sourceId,
        rootPath,
        tsMs: Date.now(),
        nodeId: nodeId(absPath),
        absPath,
        relPath: relativePathFrom(rootPath, absPath),
        parentId: absPath === rootPath ? null : nodeId(path.dirname(absPath)),
        kind,
        ext: kind === "file" ? path.extname(absPath).toLowerCase() || null : null
      }
    ]);

    const ops = params.graph.removePath(absPath);
    if (ops.length > 0) {
      log("fs_remove", { path: absPath, ops: ops.length });
      params.onOps(ops);
    }
  };

  watcher.on("add", (p) => void onUpsert(p, "file", "add"));
  watcher.on("change", (p) => void onUpsert(p, "file", "change"));
  watcher.on("addDir", (p) => void onUpsert(p, "dir", "addDir"));
  watcher.on("unlink", (p) => onRemove(p, "file", "unlink"));
  watcher.on("unlinkDir", (p) => onRemove(p, "dir", "unlinkDir"));
  watcher.on("error", (error) => log("watch_error", { error: String(error) }));
  watcher.on("ready", () => log("watch_ready"));

  return {
    async close() {
      await watcher.close();
    }
  };
}
