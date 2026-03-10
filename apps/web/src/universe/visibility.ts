import type { GraphNode } from "./patch";

const NATURALLY_HIDDEN_SEGMENTS = new Set([
  "docs",
  "dist",
  "build",
  "node_modules",
  ".pnpm-store",
  ".next",
  ".cache",
  ".turbo",
  ".parcel-cache",
  "coverage"
]);

function pathSegments(node: Pick<GraphNode, "path">): string[] {
  return node.path
    .split("/")
    .map((segment) => segment.trim().toLowerCase())
    .filter(Boolean);
}

export function isNaturallyHiddenNode(node: Pick<GraphNode, "path" | "parentId">): boolean {
  if (!node.parentId) return false;

  return pathSegments(node).some((segment) => {
    if (NATURALLY_HIDDEN_SEGMENTS.has(segment)) return true;
    return segment === "cache" || segment.endsWith("-cache") || segment.endsWith("_cache");
  });
}
