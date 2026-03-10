import { normalizePath } from "./ids.js";

function split(absPath: string): string[] {
  return normalizePath(absPath).split("/").filter(Boolean);
}

export function shouldIgnore(absPath: string): boolean {
  const segments = split(absPath);
  if (segments.length === 0) return false;

  const blockedDirs = new Set([
    "node_modules",
    ".pnpm-store",
    ".git",
    ".next",
    "dist",
    "build",
    ".cache",
    ".turbo",
    ".parcel-cache",
    "coverage"
  ]);

  if (segments.some((segment) => blockedDirs.has(segment))) {
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
