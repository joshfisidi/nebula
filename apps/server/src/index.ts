import path from "node:path";
import { startUniverseRuntime } from "./universe/index.js";

const PORT = Number(process.env.UNIVERSE_WS_PORT ?? process.env.PORT ?? 18891);
const WATCH_ROOT = path.resolve(process.env.UNIVERSE_WATCH_ROOT ?? process.cwd());

const log = (record: Record<string, unknown>): void => {
  process.stdout.write(`${JSON.stringify({ level: "info", ...record })}\n`);
};

const runtime = startUniverseRuntime({ rootPath: WATCH_ROOT, wsPort: PORT, logger: log });

process.on("SIGINT", () => {
  void runtime.close().finally(() => process.exit(0));
});
process.on("SIGTERM", () => {
  void runtime.close().finally(() => process.exit(0));
});

log({ scope: "server", event: "started", wsUrl: `ws://127.0.0.1:${PORT}`, watchRoot: WATCH_ROOT });
