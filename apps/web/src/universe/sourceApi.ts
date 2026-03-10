export interface SourceFolder {
  name: string;
  path: string;
}

export interface SourceCurrent {
  currentRoot: string | null;
  requireSource: boolean;
  allowedRoots: string[];
}

function resolveApiBase(): string {
  const protocol = window.location.protocol;
  const host = window.location.hostname || "127.0.0.1";
  const port = process.env.NEXT_PUBLIC_UNIVERSE_API_PORT ?? "18892";
  return `${protocol}//${host}:${port}`;
}

export async function fetchSourceCurrent(): Promise<SourceCurrent> {
  const response = await fetch(`${resolveApiBase()}/source/current`);
  if (!response.ok) throw new Error(`source/current failed (${response.status})`);
  return response.json();
}

export async function fetchSourceList(root?: string): Promise<{ base: string; folders: SourceFolder[] }> {
  const url = new URL(`${resolveApiBase()}/source/list`);
  if (root) url.searchParams.set("root", root);
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`source/list failed (${response.status})`);
  return response.json();
}

export async function selectSource(path: string): Promise<{ ok: boolean; currentRoot: string | null }> {
  const response = await fetch(`${resolveApiBase()}/source/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path })
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`source/select failed (${response.status}) ${text}`);
  }
  return response.json();
}
