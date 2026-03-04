import crypto from "node:crypto";
import path from "node:path";

export function normalizePath(absPath: string): string {
  const resolved = path.resolve(absPath).replace(/\\/g, "/");
  return resolved.length > 1 ? resolved.replace(/\/+$/, "") : resolved;
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
