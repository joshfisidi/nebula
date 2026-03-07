import { normalizePath } from "./ids.js";
import { resolveUniversePhysicsConfig } from "./physicsConfig.js";
import { UniverseGraph } from "./graph.js";
import { startUniverseWatcher } from "./watch.js";
import { startUniverseWsServer } from "./ws.js";

export interface UniverseRuntime {
  close: () => Promise<void>;
}

export function startUniverseRuntime(params: {
  rootPath: string;
  wsPort: number;
  logger?: (record: Record<string, unknown>) => void;
}): UniverseRuntime {
  const rootPath = normalizePath(params.rootPath);
  const graph = new UniverseGraph(rootPath, resolveUniversePhysicsConfig());
  const tickMs = Number(process.env.NEBULA_PHYSICS_TICK_MS ?? 60);

  const ws = startUniverseWsServer(params.wsPort, () => graph.snapshot());
  const watcher = startUniverseWatcher({
    rootPath,
    graph,
    logger: params.logger,
    onOps(ops) {
      ws.broadcastPatch(ops);
    }
  });
  const timer = setInterval(() => {
    const ops = graph.tick();
    if (ops.length > 0) ws.broadcastPatch(ops);
  }, tickMs);

  params.logger?.({ scope: "universe", event: "runtime_started", rootPath, wsPort: params.wsPort, tickMs });

  return {
    async close() {
      clearInterval(timer);
      await watcher.close();
      await ws.close();
      params.logger?.({ scope: "universe", event: "runtime_stopped" });
    }
  };
}
