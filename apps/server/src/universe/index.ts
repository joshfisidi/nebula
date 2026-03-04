import { normalizePath } from "./ids.js";
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
  const graph = new UniverseGraph(rootPath);

  const ws = startUniverseWsServer(params.wsPort, () => graph.snapshot());
  const watcher = startUniverseWatcher({
    rootPath,
    graph,
    logger: params.logger,
    onOps(ops) {
      ws.broadcastPatch(ops);
    }
  });

  params.logger?.({ scope: "universe", event: "runtime_started", rootPath, wsPort: params.wsPort });

  return {
    async close() {
      await watcher.close();
      await ws.close();
      params.logger?.({ scope: "universe", event: "runtime_stopped" });
    }
  };
}
