import path from "node:path";
import chokidar from "chokidar";
import { shouldIgnore } from "./ignore.js";
import { normalizePath } from "./ids.js";
import type { PatchOp } from "./types.js";
import { UniverseGraph } from "./graph.js";

export interface UniverseWatcher {
  close: () => Promise<void>;
}

export function startUniverseWatcher(params: {
  rootPath: string;
  graph: UniverseGraph;
  onOps: (ops: PatchOp[]) => void;
  logger?: (record: Record<string, unknown>) => void;
}): UniverseWatcher {
  const rootPath = normalizePath(params.rootPath);

  const log = (event: string, extra: Record<string, unknown> = {}) =>
    params.logger?.({ scope: "universe", event, rootPath, ...extra });

  const watcher = chokidar.watch(rootPath, {
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 120, pollInterval: 20 },
    ignored(candidate) {
      return shouldIgnore(String(candidate));
    }
  });

  const onUpsert = async (rawPath: string, kind: "file" | "dir"): Promise<void> => {
    const absPath = normalizePath(path.resolve(rawPath));
    if (shouldIgnore(absPath)) return;

    const ops = await params.graph.upsertPath(absPath, kind);
    if (ops.length > 0) {
      log(kind === "file" ? "fs_upsert_file" : "fs_upsert_dir", { path: absPath, ops: ops.length });
      params.onOps(ops);
    }
  };

  const onRemove = (rawPath: string): void => {
    const absPath = normalizePath(path.resolve(rawPath));
    if (shouldIgnore(absPath)) return;
    const ops = params.graph.removePath(absPath);
    if (ops.length > 0) {
      log("fs_remove", { path: absPath, ops: ops.length });
      params.onOps(ops);
    }
  };

  watcher.on("add", (p) => void onUpsert(p, "file"));
  watcher.on("change", (p) => void onUpsert(p, "file"));
  watcher.on("addDir", (p) => void onUpsert(p, "dir"));
  watcher.on("unlink", onRemove);
  watcher.on("unlinkDir", onRemove);
  watcher.on("error", (error) => log("watch_error", { error: String(error) }));
  watcher.on("ready", () => log("watch_ready"));

  return {
    async close() {
      await watcher.close();
    }
  };
}
