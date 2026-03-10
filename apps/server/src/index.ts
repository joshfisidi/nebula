import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { startUniverseRuntime, type UniverseRuntime } from "./universe/index.js";

const WS_PORT = Number(process.env.UNIVERSE_WS_PORT ?? process.env.PORT ?? 18891);
const API_PORT = Number(process.env.UNIVERSE_API_PORT ?? 18892);
const DEFAULT_ROOT = process.env.UNIVERSE_WATCH_ROOT ? path.resolve(process.env.UNIVERSE_WATCH_ROOT) : null;
const REQUIRE_SOURCE = (process.env.UNIVERSE_REQUIRE_SOURCE ?? "1") !== "0";
const ALLOWED_ROOTS = (process.env.UNIVERSE_ALLOWED_ROOTS ?? path.resolve(process.cwd(), ".."))
  .split(",")
  .map((p) => path.resolve(p.trim()))
  .filter(Boolean);

const log = (record: Record<string, unknown>): void => {
  process.stdout.write(`${JSON.stringify({ level: "info", ...record })}\n`);
};

let runtime: UniverseRuntime | null = null;
let currentRoot: string | null = null;

async function startRoot(rootPath: string): Promise<void> {
  const nextRoot = path.resolve(rootPath);
  if (!isAllowedPath(nextRoot)) {
    throw new Error(`Path not allowed: ${nextRoot}`);
  }
  if (!fs.existsSync(nextRoot) || !fs.statSync(nextRoot).isDirectory()) {
    throw new Error(`Directory does not exist: ${nextRoot}`);
  }

  if (runtime) {
    await runtime.close();
    runtime = null;
  }

  runtime = startUniverseRuntime({ rootPath: nextRoot, wsPort: WS_PORT, logger: log });
  currentRoot = nextRoot;
  log({ scope: "server", event: "source_selected", rootPath: currentRoot });
}

function isAllowedPath(candidate: string): boolean {
  const normalized = path.resolve(candidate);
  return ALLOWED_ROOTS.some((root) => normalized === root || normalized.startsWith(`${root}${path.sep}`));
}

function listFolders(basePath: string): Array<{ name: string; path: string }> {
  if (!fs.existsSync(basePath) || !fs.statSync(basePath).isDirectory()) return [];
  return fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ name: entry.name, path: path.join(basePath, entry.name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function json(res: http.ServerResponse, code: number, payload: unknown): void {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(payload));
}

const api = http.createServer((req, res) => {
  if (!req.url || !req.method) return json(res, 400, { error: "bad_request" });
  if (req.method === "OPTIONS") return json(res, 200, { ok: true });

  const url = new URL(req.url, `http://127.0.0.1:${API_PORT}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, { ok: true, wsPort: WS_PORT, apiPort: API_PORT });
  }

  if (req.method === "GET" && url.pathname === "/source/current") {
    return json(res, 200, {
      currentRoot,
      requireSource: REQUIRE_SOURCE,
      allowedRoots: ALLOWED_ROOTS
    });
  }

  if (req.method === "GET" && url.pathname === "/source/list") {
    const rootQuery = url.searchParams.get("root");
    const base = rootQuery ? path.resolve(rootQuery) : ALLOWED_ROOTS[0];
    if (!isAllowedPath(base)) return json(res, 403, { error: "forbidden_root" });

    return json(res, 200, {
      base,
      folders: listFolders(base)
    });
  }

  if (req.method === "POST" && url.pathname === "/source/select") {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk.toString("utf8");
      if (raw.length > 1024 * 128) {
        req.destroy();
      }
    });
    req.on("end", async () => {
      try {
        const body = raw ? (JSON.parse(raw) as { path?: string }) : {};
        const next = body.path ? path.resolve(body.path) : null;
        if (!next) return json(res, 400, { error: "missing_path" });

        await startRoot(next);
        return json(res, 200, { ok: true, currentRoot });
      } catch (error) {
        return json(res, 400, { error: "select_failed", detail: String(error) });
      }
    });
    return;
  }

  return json(res, 404, { error: "not_found" });
});

api.listen(API_PORT, "0.0.0.0", () => {
  log({ scope: "server", event: "api_started", apiUrl: `http://0.0.0.0:${API_PORT}`, allowedRoots: ALLOWED_ROOTS });
});

if (DEFAULT_ROOT && !REQUIRE_SOURCE) {
  void startRoot(DEFAULT_ROOT);
} else {
  log({ scope: "server", event: "waiting_for_source_selection", wsPort: WS_PORT, requireSource: REQUIRE_SOURCE });
}

async function shutdown() {
  if (runtime) {
    await runtime.close();
    runtime = null;
  }
  await new Promise<void>((resolve) => api.close(() => resolve()));
}

process.on("SIGINT", () => {
  void shutdown().finally(() => process.exit(0));
});
process.on("SIGTERM", () => {
  void shutdown().finally(() => process.exit(0));
});
