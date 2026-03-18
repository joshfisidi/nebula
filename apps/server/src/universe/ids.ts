import crypto from "node:crypto";
import path from "node:path";

export function normalizePath(absPath: string): string {
  const resolved = path.resolve(absPath).replace(/\\/g, "/");
  return resolved.length > 1 ? resolved.replace(/\/+$/, "") : resolved;
}

export function normalizeRelativePath(relPath: string): string {
  const normalized = relPath.replace(/\\/g, "/").replace(/\/+$/, "");
  if (normalized === "" || normalized === ".") return ".";
  return normalized.replace(/^\.\//, "");
}

export function relativePathFrom(rootPath: string, absPath: string): string {
  return normalizeRelativePath(path.relative(normalizePath(rootPath), normalizePath(absPath)));
}

function sha1(input: string): string {
  return crypto.createHash("sha1").update(input).digest("hex");
}

export function nodeId(absPath: string): string {
  return sha1(normalizePath(absPath));
}

export function edgeId(kind: string, from: string, to: string): string {
  return sha1(`${kind}:${from}->${to}`);
}
