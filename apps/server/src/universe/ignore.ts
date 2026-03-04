import { normalizePath } from "./ids.js";

function split(absPath: string): string[] {
  return normalizePath(absPath).split("/").filter(Boolean);
}

export function shouldIgnore(absPath: string): boolean {
  const segments = split(absPath);
  if (segments.length === 0) return false;

  if (segments.includes("node_modules") || segments.includes(".pnpm-store") || segments.includes(".git")) {
    return true;
  }

  const p = `/${segments.join("/")}`;
  if (p.includes("/.openclaw/locks/") || p.endsWith("/.openclaw/locks")) return true;
  if (p.includes("/.openclaw/logs/") || p.endsWith("/.openclaw/logs")) return true;
  if (/\/\.openclaw\/state\/[^/]+\/runs(\/|$)/.test(p)) return true;
  if (/\/\.openclaw\/workspace\/queue\/[^/]+\/results(\/|$)/.test(p)) return true;
  if (p.endsWith(".tsbuildinfo")) return true;

  return false;
}
