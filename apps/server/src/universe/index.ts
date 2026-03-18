import { normalizePath } from "./ids.js";
import { startUniversePatchQueue } from "./patchQueue.js";
import { startUniversePersistQueue } from "./persistQueue.js";
import { resolveUniversePhysicsConfig } from "./physicsConfig.js";
import type { ProjectionStore } from "../storage/projectionStore.js";
import { UniverseGraph } from "./graph.js";
import { startUniverseWatcher } from "./watch.js";
import { startUniverseWsServer } from "./ws.js";

export interface UniverseRuntime {
  readonly sourceId: string;
  readonly rootPath: string;
  readonly projectionStore: ProjectionStore | null;
  close: () => Promise<void>;
}

export function startUniverseRuntime(params: {
  sourceId: string;
  rootPath: string;
  wsPort: number;
  projectionStore?: ProjectionStore | null;
  logger?: (record: Record<string, unknown>) => void;
}): UniverseRuntime {
  const rootPath = normalizePath(params.rootPath);
  const graph = new UniverseGraph(rootPath, resolveUniversePhysicsConfig());
  const tickMs = Number(process.env.NEBULA_PHYSICS_TICK_MS ?? 60);

  const ws = startUniverseWsServer(params.wsPort, () => graph.snapshot());
  const patchQueue = startUniversePatchQueue({
    getSnapshot: () => graph.snapshot(),
    onPatch(ops) {
      ws.broadcastPatch(ops);
    },
    onSnapshot(snapshot) {
      ws.sendSnapshotToAll(snapshot);
    },
    logger: params.logger
  });
  const persistQueue = params.projectionStore
    ? startUniversePersistQueue({
        onFlush(events) {
          params.projectionStore?.applyEvents(events);
        },
        logger: params.logger
      })
    : null;
  const watcher = startUniverseWatcher({
    rootPath,
    sourceId: params.sourceId,
    graph,
    logger: params.logger,
    onOps(ops) {
      patchQueue.enqueue(ops, "fs");
    },
    onProjectionEvents(events) {
      persistQueue?.enqueue(events);
    }
  });
  const timer = setInterval(() => {
    const ops = graph.tick();
    patchQueue.enqueue(ops, "physics");
  }, tickMs);

  params.logger?.({
    scope: "universe",
    event: "runtime_started",
    sourceId: params.sourceId,
    rootPath,
    wsPort: params.wsPort,
    tickMs,
    persistenceEnabled: Boolean(params.projectionStore)
  });

  return {
    sourceId: params.sourceId,
    rootPath,
    projectionStore: params.projectionStore ?? null,
    async close() {
      clearInterval(timer);
      await watcher.close();
      patchQueue.close();
      persistQueue?.close();
      await ws.close();
      params.projectionStore?.close();
      params.logger?.({ scope: "universe", event: "runtime_stopped" });
    }
  };
}
