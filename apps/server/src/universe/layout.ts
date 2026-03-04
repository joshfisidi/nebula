import type { GraphNode, Vec3 } from "./types.js";

const TAU = Math.PI * 2;
const R = 8;
const Z_FILE_LAYER = 2;

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
    const r = node.depth * R;
    out.set(id, {
      x: Math.cos(theta) * r,
      y: Math.sin(theta) * r,
      z: node.kind === "dir" ? 0 : -Z_FILE_LAYER
    });

    const kids = index.byParent.get(id) ?? [];
    if (kids.length === 0) return;

    const span = thetaEnd - thetaStart;
    for (let i = 0; i < kids.length; i += 1) {
      const childStart = thetaStart + (span * i) / kids.length;
      const childEnd = thetaStart + (span * (i + 1)) / kids.length;
      walk(kids[i].id, childStart, childEnd);
    }
  };

  walk(rootId, 0, TAU);
  return out;
}
