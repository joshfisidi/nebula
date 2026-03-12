export interface SourceFolder {
  name: string;
  path: string;
}

export interface SourceCurrent {
  currentRoot: string | null;
  requireSource?: boolean;
  allowedRoots?: string[];
  autoSelectDefaultRoot?: boolean;
}

export interface LocalAccessSession {
  ok: boolean;
  agent: string;
  token: string;
  sourcePath: string | null;
  endpoints: {
    health: string;
    permissionStatus: string;
    requestFolderAccess: string;
    sourceCurrent: string;
    sourceSelect: string;
    sourceList: string;
    graphSnapshot: string;
  };
}

const API_TIMEOUT_MS = 9000;
export const NEBULA_SYNC_BASE = "http://127.0.0.1:8787";

function resolveApiBase(): string {
  const protocol = window.location.protocol;
  const host = window.location.hostname || "127.0.0.1";
  const port = process.env.NEXT_PUBLIC_UNIVERSE_API_PORT ?? "18892";
  return `${protocol}//${host}:${port}`;
}

async function safeJsonParse(raw: string): Promise<unknown> {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

async function readJson<T>(response: Response, fallbackLabel: string): Promise<T> {
  const text = await response.text();
  const payload = await safeJsonParse(text);

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
          ? payload.error
          : `${fallbackLabel} failed (${response.status})`;
    throw new Error(message);
  }

  if (payload == null || typeof payload !== "object") {
    throw new Error(`${fallbackLabel} returned invalid JSON payload.`);
  }

  return payload as T;
}

async function withTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Request timed out after ${API_TIMEOUT_MS / 1000}s.`);
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

type RequestAttemptResult =
  | { kind: "response"; response: Response; label: string }
  | { kind: "error"; error: unknown; label: string };

async function tryEndpoint(
  pathname: string,
  init?: RequestInit
): Promise<Extract<RequestAttemptResult, { kind: "response" }>> {
  const response = await withTimeout(`${NEBULA_SYNC_BASE}${pathname}`, init);
  return { kind: "response", response, label: pathname };
}

async function requestFirstAvailable(pathnames: string[], init?: RequestInit): Promise<RequestAttemptResult> {
  let lastError: RequestAttemptResult | null = null;

  for (const pathname of pathnames) {
    try {
      const result = await tryEndpoint(pathname, init);
      if (result.response.status === 404) {
        lastError = result;
        continue;
      }
      return result;
    } catch (error) {
      lastError = { kind: "error", error, label: pathname };
    }
  }

  return (
    lastError ?? {
      kind: "error",
      error: new Error("No endpoint candidates configured."),
      label: pathnames[0] ?? "unknown-endpoint"
    }
  );
}

function normalizeLocalAccessSession(value: unknown): LocalAccessSession {
  if (!value || typeof value !== "object") {
    throw new Error("local-access/status returned invalid JSON payload.");
  }

  const payload = value as {
    ok?: boolean;
    agent?: string;
    bridge?: string;
    token?: string;
    sourcePath?: string | null;
    endpoints?: Partial<LocalAccessSession["endpoints"]>;
  };

  if (typeof payload.token !== "string" || payload.token.trim() === "") {
    throw new Error("local-access/status returned no auth token.");
  }

  return {
    ok: payload.ok ?? true,
    agent:
      (typeof payload.agent === "string" && payload.agent) ||
      (typeof payload.bridge === "string" && payload.bridge) ||
      "nebula-sync",
    token: payload.token,
    sourcePath: typeof payload.sourcePath === "string" ? payload.sourcePath : null,
    endpoints: {
      health: payload.endpoints?.health ?? `${NEBULA_SYNC_BASE}/health`,
      permissionStatus: payload.endpoints?.permissionStatus ?? `${NEBULA_SYNC_BASE}/permissions/status`,
      requestFolderAccess: payload.endpoints?.requestFolderAccess ?? `${NEBULA_SYNC_BASE}/permissions/request-folder`,
      sourceCurrent: payload.endpoints?.sourceCurrent ?? `${NEBULA_SYNC_BASE}/source/current`,
      sourceSelect: payload.endpoints?.sourceSelect ?? `${NEBULA_SYNC_BASE}/source/select`,
      sourceList: payload.endpoints?.sourceList ?? `${NEBULA_SYNC_BASE}/source/list`,
      graphSnapshot: payload.endpoints?.graphSnapshot ?? `${NEBULA_SYNC_BASE}/graph/snapshot`
    }
  };
}

export async function fetchSourceCurrent(): Promise<SourceCurrent> {
  const response = await withTimeout(`${resolveApiBase()}/source/current`);
  return readJson<SourceCurrent>(response, "source/current");
}

export async function fetchSourceList(root?: string): Promise<{ base: string; folders: SourceFolder[] }> {
  const url = new URL(`${resolveApiBase()}/source/list`);
  if (root) url.searchParams.set("root", root);
  const response = await withTimeout(url.toString());
  return readJson<{ base: string; folders: SourceFolder[] }>(response, "source/list");
}

export async function selectSource(path: string): Promise<{ ok: boolean; currentRoot: string | null }> {
  const response = await withTimeout(`${resolveApiBase()}/source/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path })
  });
  return readJson<{ ok: boolean; currentRoot: string | null }>(response, "source/select");
}

export async function fetchLocalAccessSession(): Promise<LocalAccessSession | null> {
  const result = await requestFirstAvailable(["/permissions/status", "/local-access/status", "/bridge/handshake"]);
  if (result.kind === "error") {
    return null;
  }

  try {
    const payload = await readJson<unknown>(result.response, result.label);
    return normalizeLocalAccessSession(payload);
  } catch {
    return null;
  }
}

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function fetchLocalAccessSourceList(token: string, root?: string): Promise<{ base: string; folders: SourceFolder[] }> {
  const url = new URL(`${NEBULA_SYNC_BASE}/source/list`);
  if (root) url.searchParams.set("root", root);
  const response = await withTimeout(url.toString(), { headers: authHeaders(token) });
  return readJson<{ base: string; folders: SourceFolder[] }>(response, "local-access/source/list");
}

export async function selectLocalAccessSource(token: string, path: string): Promise<{ sourcePath: string | null }> {
  const response = await withTimeout(`${NEBULA_SYNC_BASE}/source/select`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ path })
  });
  return readJson<{ sourcePath: string | null }>(response, "local-access/source/select");
}

export async function requestLocalFolderAccess(token: string): Promise<{ sourcePath: string | null } | null> {
  const result = await requestFirstAvailable(["/permissions/request-folder", "/local-access/request-folder"], {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({})
  });

  if (result.kind === "error") return null;
  if (result.response.status === 404) return null;

  return readJson<{ sourcePath: string | null }>(result.response, result.label);
}

export async function fetchLocalAccessSnapshot(token: string): Promise<unknown> {
  const response = await withTimeout(`${NEBULA_SYNC_BASE}/graph/snapshot`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return readJson<unknown>(response, "local-access/graph/snapshot");
}
