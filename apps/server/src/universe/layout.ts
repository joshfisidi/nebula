import type { GraphNode, Vec3 } from "./types.js";

const TAU = Math.PI * 2;
const BASE_RADIUS = 10;
const DEPTH_EXPONENT = 1.18;
const MIN_ARC_PADDING = 0.02;
const Z_FILE_LAYER = 3.4;
const Z_DEPTH_STEP = 0.34;

interface ChildIndex {
  byParent: Map<string, GraphNode[]>;
}

function sortedChildren(nodes: Map<string, GraphNode>): ChildIndex {
  const byParent = new Map<string, GraphNode[]>();
  for (const node of nodes.values()) {
    if (!node.parentId) continue;
    const bucket = byParent.get(node.parentId) ?? [];
    bucket.push(node);
    byParent.set(node.parentId, bucket);
  }

  for (const list of byParent.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return { byParent };
}

export function computeLayout(nodes: Map<string, GraphNode>, rootId: string): Map<string, Vec3> {
  const index = sortedChildren(nodes);
  const out = new Map<string, Vec3>();

  const walk = (id: string, thetaStart: number, thetaEnd: number): void => {
    const node = nodes.get(id);
    if (!node) return;

    const theta = (thetaStart + thetaEnd) * 0.5;
    const depthRadius = node.depth === 0 ? 0 : BASE_RADIUS * Math.pow(node.depth, DEPTH_EXPONENT);
    const radialJitter = node.kind === "file" ? 1.4 : 0;
    const r = depthRadius + radialJitter;

    out.set(id, {
      x: Math.cos(theta) * r,
      y: Math.sin(theta) * r,
      z: node.kind === "dir" ? node.depth * Z_DEPTH_STEP : -(Z_FILE_LAYER + node.depth * Z_DEPTH_STEP)
    });

    const kids = index.byParent.get(id) ?? [];
    if (kids.length === 0) return;

    const span = thetaEnd - thetaStart;
    const paddedSpan = Math.max(0, span - MIN_ARC_PADDING * 2);
    const spanOffset = (span - paddedSpan) * 0.5;

    for (let i = 0; i < kids.length; i += 1) {
      const childStart = thetaStart + spanOffset + (paddedSpan * i) / kids.length;
      const childEnd = thetaStart + spanOffset + (paddedSpan * (i + 1)) / kids.length;
      walk(kids[i].id, childStart, childEnd);
    }
  };

  walk(rootId, 0, TAU);
  return out;
}
