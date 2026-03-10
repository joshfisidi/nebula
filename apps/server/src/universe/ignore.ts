import fs from "node:fs";
import path from "node:path";
import ignore from "ignore";
import { normalizePath } from "./ids.js";

function split(absPath: string): string[] {
  return normalizePath(absPath).split("/").filter(Boolean);
}

const blockedDirs = new Set([
  "node_modules",
  ".pnpm-store",
  ".git",
  "dist",
  "build",
  ".next",
  ".cache",
  ".turbo",
  ".parcel-cache",
  "coverage"
]);

function baseIgnore(absPath: string): boolean {
  const segments = split(absPath);
  if (segments.length === 0) return false;

<<<<<<< HEAD
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

=======
>>>>>>> agent
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

function loadIgnoreLines(rootPath: string): string[] {
  const files = [".gitignore", ".ignore", ".nebulaignore"];
  const out: string[] = [];

  for (const file of files) {
    const full = path.join(rootPath, file);
    if (!fs.existsSync(full)) continue;

    const text = fs.readFileSync(full, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      out.push(trimmed);
    }
  }

  return out;
}

export type IgnoreMatcher = (absPath: string) => boolean;

export function createIgnoreMatcher(rootPath: string): IgnoreMatcher {
  const root = normalizePath(path.resolve(rootPath));
  const ig = ignore();
  ig.add(loadIgnoreLines(root));

  return (candidateAbsPath: string): boolean => {
    const absPath = normalizePath(path.resolve(candidateAbsPath));
    if (baseIgnore(absPath)) return true;

    if (absPath === root) return false;
    if (!absPath.startsWith(`${root}/`)) return true;

    const rel = absPath.slice(root.length + 1);
    if (!rel) return false;

    return ig.ignores(rel);
  };
}

export function shouldIgnore(absPath: string): boolean {
  return baseIgnore(absPath);
}
