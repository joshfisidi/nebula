import fs from "node:fs";
import http, { type IncomingMessage, type ServerResponse } from "node:http";
import path from "node:path";
import { startUniverseRuntime, type UniverseRuntime } from "./universe/index.js";

const JSON_BODY_LIMIT_BYTES = 128 * 1024;
const HOST = "0.0.0.0";

class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: string;

  constructor(statusCode: number, code: string, message: string, details?: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

function log(level: "info" | "warn" | "error", record: Record<string, unknown>): void {
  const stream = level === "error" ? process.stderr : process.stdout;
  stream.write(`${JSON.stringify({ ts: new Date().toISOString(), level, ...record })}\n`);
}

function logInfo(record: Record<string, unknown>): void {
  log("info", record);
}

function logWarn(record: Record<string, unknown>): void {
  log("warn", record);
}

function logError(record: Record<string, unknown>): void {
  log("error", record);
}

function parseBooleanEnv(name: string, defaultValue: boolean): boolean {
  const raw = process.env[name];
  if (raw == null || raw.trim() === "") return defaultValue;

  const normalized = raw.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;

  logWarn({ scope: "server", event: "invalid_env_boolean", env: name, value: raw, fallback: defaultValue });
  return defaultValue;
}

function parsePortEnv(names: string[], defaultValue: number): number {
  for (const name of names) {
    const raw = process.env[name];
    if (raw == null || raw.trim() === "") continue;

    const value = Number(raw);
    if (Number.isInteger(value) && value >= 1 && value <= 65535) {
      return value;
    }

    logWarn({ scope: "server", event: "invalid_env_port", env: name, value: raw, fallback: defaultValue });
  }

  return defaultValue;
}

function parseOptionalResolvedPathEnv(name: string): string | null {
  const raw = process.env[name];
  if (raw == null || raw.trim() === "") return null;
  return path.resolve(raw.trim());
}

function parseAllowedRootsEnv(): string[] {
  const fallbackRoot = path.resolve(process.cwd(), "..");
  const raw = process.env.UNIVERSE_ALLOWED_ROOTS;
  const roots = (raw ?? fallbackRoot)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => path.resolve(value));

  if (roots.length > 0) return roots;

  logWarn({
    scope: "server",
    event: "empty_allowed_roots",
    env: "UNIVERSE_ALLOWED_ROOTS",
    fallback: fallbackRoot
  });
  return [fallbackRoot];
}

const WS_PORT = parsePortEnv(["UNIVERSE_WS_PORT", "PORT"], 18891);
<<<<<<< HEAD
const API_PORT = parsePortEnv(["UNIVERSE_API_PORT"], 18892);
=======
const API_PORT = parsePortEnv(["UNIVERSE_API_PORT", "API_PORT"], 18892);
>>>>>>> agent
const DEFAULT_ROOT = parseOptionalResolvedPathEnv("UNIVERSE_WATCH_ROOT");
const REQUIRE_SOURCE = parseBooleanEnv("UNIVERSE_REQUIRE_SOURCE", true);
const AUTOSELECT_DEFAULT_ROOT = parseBooleanEnv("UNIVERSE_AUTOSELECT_DEFAULT_ROOT", false);
const ALLOWED_ROOTS = parseAllowedRootsEnv();

let runtime: UniverseRuntime | null = null;
let currentRoot: string | null = null;
let shuttingDown = false;
let shutdownPromise: Promise<void> | null = null;

function isAllowedPath(candidate: string): boolean {
  const normalized = path.resolve(candidate);
  return ALLOWED_ROOTS.some((root) => normalized === root || normalized.startsWith(`${root}${path.sep}`));
}

function ensureDirectory(rootPath: string): void {
  let stats: fs.Stats;
  try {
    stats = fs.statSync(rootPath);
  } catch {
    throw new ApiError(404, "directory_not_found", "Directory does not exist.", rootPath);
  }

  if (!stats.isDirectory()) {
    throw new ApiError(400, "invalid_directory", "The selected path is not a directory.", rootPath);
  }
}

async function startRoot(rootPath: string): Promise<void> {
  const nextRoot = path.resolve(rootPath);

  if (!isAllowedPath(nextRoot)) {
    throw new ApiError(403, "forbidden_root", "The selected path is outside the allowed roots.", nextRoot);
  }

  ensureDirectory(nextRoot);

  const previousRuntime = runtime;
  runtime = null;
  currentRoot = null;

  if (previousRuntime) {
    await previousRuntime.close();
  }

  runtime = startUniverseRuntime({ rootPath: nextRoot, wsPort: WS_PORT, logger: logInfo });
  currentRoot = nextRoot;
  logInfo({ scope: "server", event: "source_selected", rootPath: currentRoot });
}

function listFolders(basePath: string): Array<{ name: string; path: string }> {
  try {
    ensureDirectory(basePath);
    return fs
      .readdirSync(basePath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({ name: entry.name, path: path.join(basePath, entry.name) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.code === "directory_not_found") return [];
      throw error;
    }
    throw error;
  }
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown): void {
  if (res.writableEnded) return;

  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(payload));
}

function sendError(res: ServerResponse, error: ApiError): void {
  sendJson(res, error.statusCode, {
    error: error.code,
    message: error.message,
    details: error.details
  });
}

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) return error.stack ?? `${error.name}: ${error.message}`;
  return String(error);
}

function parseError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  return new ApiError(500, "internal_error", "Unexpected server error.");
}

async function readJsonBody<T extends Record<string, unknown>>(req: IncomingMessage): Promise<T> {
  const contentType = req.headers["content-type"]?.split(";")[0]?.trim().toLowerCase();
  if (contentType && contentType !== "application/json") {
    throw new ApiError(415, "unsupported_media_type", "Expected application/json request body.");
  }

  const contentLength = req.headers["content-length"];
  if (contentLength) {
    const size = Number(contentLength);
    if (Number.isFinite(size) && size > JSON_BODY_LIMIT_BYTES) {
      throw new ApiError(413, "payload_too_large", "Request body is too large.");
    }
  }

  return await new Promise<T>((resolve, reject) => {
    let raw = "";
    let settled = false;

    const fail = (error: ApiError) => {
      if (settled) return;
      settled = true;
      req.off("data", onData);
      req.off("end", onEnd);
      req.off("aborted", onAborted);
      req.off("error", onError);
      reject(error);
    };

    const finish = (value: T) => {
      if (settled) return;
      settled = true;
      req.off("data", onData);
      req.off("end", onEnd);
      req.off("aborted", onAborted);
      req.off("error", onError);
      resolve(value);
    };

    const onData = (chunk: string | Buffer) => {
      raw += chunk.toString("utf8");
      if (raw.length > JSON_BODY_LIMIT_BYTES) {
        fail(new ApiError(413, "payload_too_large", "Request body is too large."));
      }
    };

    const onEnd = () => {
      if (raw.trim() === "") {
        finish({} as T);
        return;
      }

      try {
        const parsed = JSON.parse(raw) as unknown;
        if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
          fail(new ApiError(400, "invalid_json_body", "JSON body must be an object."));
          return;
        }
        finish(parsed as T);
      } catch {
        fail(new ApiError(400, "invalid_json", "Request body is not valid JSON."));
      }
    };

    const onAborted = () => fail(new ApiError(400, "request_aborted", "Request body was interrupted."));
    const onError = () => fail(new ApiError(400, "request_stream_error", "Request body could not be read."));

    req.setEncoding("utf8");
    req.on("data", onData);
    req.on("end", onEnd);
    req.on("aborted", onAborted);
    req.on("error", onError);
  });
}

async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (!req.url || !req.method) {
    throw new ApiError(400, "bad_request", "Missing HTTP method or URL.");
  }

  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }

  const url = new URL(req.url, `http://127.0.0.1:${API_PORT}`);

  if (req.method === "GET" && url.pathname === "/health") {
    sendJson(res, 200, {
      ok: true,
      shuttingDown,
      wsPort: WS_PORT,
      apiPort: API_PORT,
      currentRoot
    });
    return;
  }

  if (shuttingDown) {
    throw new ApiError(503, "server_shutting_down", "Server is shutting down.");
  }

  if (req.method === "GET" && url.pathname === "/source/current") {
    sendJson(res, 200, {
      currentRoot,
      requireSource: REQUIRE_SOURCE,
      allowedRoots: ALLOWED_ROOTS,
      autoSelectDefaultRoot: AUTOSELECT_DEFAULT_ROOT
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/source/list") {
    const rootQuery = url.searchParams.get("root");
    const base = rootQuery ? path.resolve(rootQuery) : ALLOWED_ROOTS[0];

    if (!base) {
      throw new ApiError(500, "missing_allowed_root", "No allowed roots are configured.");
    }

    if (!isAllowedPath(base)) {
      throw new ApiError(403, "forbidden_root", "Requested root is outside the allowed roots.", base);
    }

    sendJson(res, 200, {
      base,
      folders: listFolders(base)
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/source/select") {
    const body = await readJsonBody<{ path?: string }>(req);
    const nextPath = typeof body.path === "string" ? body.path.trim() : "";

    if (!nextPath) {
      throw new ApiError(400, "missing_path", "Provide a folder path to select.");
    }

    await startRoot(nextPath);
    sendJson(res, 200, { ok: true, currentRoot });
    return;
  }

  throw new ApiError(404, "not_found", "Route not found.");
}

const api = http.createServer((req, res) => {
  void handleRequest(req, res).catch((error) => {
    const apiError = parseError(error);
    logError({
      scope: "server",
      event: "request_failed",
      method: req.method,
      url: req.url,
      statusCode: apiError.statusCode,
      error: apiError.code,
      details: apiError.details,
      cause: error instanceof ApiError ? undefined : formatUnknownError(error)
    });
    sendError(res, apiError);
  });
});

api.on("clientError", (error, socket) => {
  logWarn({
    scope: "server",
    event: "client_error",
    message: error.message
  });

  if (socket.writable) {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  }
});

function listen(server: http.Server, port: number, host: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      server.off("error", reject);
      resolve();
    });
  });
}

function closeServer(server: http.Server): Promise<void> {
  if (!server.listening) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

async function shutdown(reason: string): Promise<void> {
  if (shutdownPromise) return shutdownPromise;

  shuttingDown = true;
  logInfo({ scope: "server", event: "shutdown_started", reason });

  shutdownPromise = (async () => {
    if (runtime) {
      const activeRuntime = runtime;
      runtime = null;
      currentRoot = null;
      await activeRuntime.close();
    }

    api.closeIdleConnections?.();
    await closeServer(api);
    logInfo({ scope: "server", event: "shutdown_completed", reason });
  })().catch((error) => {
    logError({
      scope: "server",
      event: "shutdown_failed",
      reason,
      cause: formatUnknownError(error)
    });
    throw error;
  });

  return shutdownPromise;
}

async function bootstrap(): Promise<void> {
  logInfo({
    scope: "server",
    event: "startup",
    apiPort: API_PORT,
    wsPort: WS_PORT,
    requireSource: REQUIRE_SOURCE,
    autoSelectDefaultRoot: AUTOSELECT_DEFAULT_ROOT,
    allowedRoots: ALLOWED_ROOTS
  });

  if (DEFAULT_ROOT) {
    if (AUTOSELECT_DEFAULT_ROOT) {
<<<<<<< HEAD
      await startRoot(DEFAULT_ROOT);
=======
      try {
        await startRoot(DEFAULT_ROOT);
      } catch (error) {
        const parsed = parseError(error);
        logWarn({
          scope: "server",
          event: "default_root_autoselect_failed",
          rootPath: DEFAULT_ROOT,
          error: parsed.code,
          details: parsed.details,
          message: parsed.message
        });
      }
>>>>>>> agent
    } else {
      logInfo({
        scope: "server",
        event: "default_root_available",
        rootPath: DEFAULT_ROOT,
        autoSelected: false
      });
    }
  }

  await listen(api, API_PORT, HOST);
  logInfo({ scope: "server", event: "api_started", apiUrl: `http://${HOST}:${API_PORT}` });

  if (!currentRoot) {
    logInfo({
      scope: "server",
      event: "waiting_for_source_selection",
      wsPort: WS_PORT,
      requireSource: REQUIRE_SOURCE,
      autoSelectDefaultRoot: AUTOSELECT_DEFAULT_ROOT
    });
  }
}

function installSignal(signal: NodeJS.Signals): void {
  process.once(signal, () => {
    void shutdown(signal)
      .catch(() => {
        process.exitCode = 1;
      })
      .finally(() => {
        process.exit(process.exitCode ?? 0);
      });
  });
}

installSignal("SIGINT");
installSignal("SIGTERM");

process.on("unhandledRejection", (reason) => {
  logError({
    scope: "server",
    event: "unhandled_rejection",
    cause: formatUnknownError(reason)
  });
  process.exitCode = 1;
  void shutdown("unhandled_rejection").finally(() => process.exit(1));
});

process.on("uncaughtException", (error) => {
  logError({
    scope: "server",
    event: "uncaught_exception",
    cause: formatUnknownError(error)
  });
  process.exitCode = 1;
  void shutdown("uncaught_exception").finally(() => process.exit(1));
});

void bootstrap().catch((error) => {
  logError({
    scope: "server",
    event: "startup_failed",
    cause: formatUnknownError(error)
  });
  process.exitCode = 1;
  void shutdown("startup_failed").finally(() => process.exit(1));
});
