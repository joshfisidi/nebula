export interface SourceFolder {
  name: string;
  path: string;
}

export interface SourceCurrent {
  currentRoot: string | null;
  requireSource: boolean;
  allowedRoots: string[];
  autoSelectDefaultRoot?: boolean;
}

<<<<<<< HEAD
=======
const API_TIMEOUT_MS = 9000;

>>>>>>> agent
function resolveApiBase(): string {
  const protocol = window.location.protocol;
  const host = window.location.hostname || "127.0.0.1";
  const port = process.env.NEXT_PUBLIC_UNIVERSE_API_PORT ?? "18892";
  return `${protocol}//${host}:${port}`;
}

<<<<<<< HEAD
async function readJson<T>(response: Response, fallbackLabel: string): Promise<T> {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
=======
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
>>>>>>> agent

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : `${fallbackLabel} failed (${response.status})`;
    throw new Error(message);
  }

<<<<<<< HEAD
  return payload as T;
}

export async function fetchSourceCurrent(): Promise<SourceCurrent> {
  const response = await fetch(`${resolveApiBase()}/source/current`);
=======
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

export async function fetchSourceCurrent(): Promise<SourceCurrent> {
  const response = await withTimeout(`${resolveApiBase()}/source/current`);
>>>>>>> agent
  return readJson<SourceCurrent>(response, "source/current");
}

export async function fetchSourceList(root?: string): Promise<{ base: string; folders: SourceFolder[] }> {
  const url = new URL(`${resolveApiBase()}/source/list`);
  if (root) url.searchParams.set("root", root);
<<<<<<< HEAD
  const response = await fetch(url.toString());
=======
  const response = await withTimeout(url.toString());
>>>>>>> agent
  return readJson<{ base: string; folders: SourceFolder[] }>(response, "source/list");
}

export async function selectSource(path: string): Promise<{ ok: boolean; currentRoot: string | null }> {
<<<<<<< HEAD
  const response = await fetch(`${resolveApiBase()}/source/select`, {
=======
  const response = await withTimeout(`${resolveApiBase()}/source/select`, {
>>>>>>> agent
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path })
  });
  return readJson<{ ok: boolean; currentRoot: string | null }>(response, "source/select");
}
