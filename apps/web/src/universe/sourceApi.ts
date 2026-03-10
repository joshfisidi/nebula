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

function resolveApiBase(): string {
  const protocol = window.location.protocol;
  const host = window.location.hostname || "127.0.0.1";
  const port = process.env.NEXT_PUBLIC_UNIVERSE_API_PORT ?? "18892";
  return `${protocol}//${host}:${port}`;
}

async function readJson<T>(response: Response, fallbackLabel: string): Promise<T> {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : `${fallbackLabel} failed (${response.status})`;
    throw new Error(message);
  }

  return payload as T;
}

export async function fetchSourceCurrent(): Promise<SourceCurrent> {
  const response = await fetch(`${resolveApiBase()}/source/current`);
  return readJson<SourceCurrent>(response, "source/current");
}

export async function fetchSourceList(root?: string): Promise<{ base: string; folders: SourceFolder[] }> {
  const url = new URL(`${resolveApiBase()}/source/list`);
  if (root) url.searchParams.set("root", root);
  const response = await fetch(url.toString());
  return readJson<{ base: string; folders: SourceFolder[] }>(response, "source/list");
}

export async function selectSource(path: string): Promise<{ ok: boolean; currentRoot: string | null }> {
  const response = await fetch(`${resolveApiBase()}/source/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path })
  });
  return readJson<{ ok: boolean; currentRoot: string | null }>(response, "source/select");
}
