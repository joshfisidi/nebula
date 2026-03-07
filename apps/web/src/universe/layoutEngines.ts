import dagre from "dagre";
import ELK from "elkjs/lib/elk.bundled.js";
import type { Edge, Node } from "reactflow";

export type LayoutEngine = "radial" | "dagre" | "elk";
export type LayoutMode = "auto" | "overview" | "focus";

const elk = new ELK();

export function chooseLayout(ctx: {
  mode: LayoutMode;
  zoom: number;
  visibleCount: number;
  hasGroups: boolean;
  hasCrossLinks: boolean;
}): LayoutEngine {
  if (ctx.mode === "overview" || ctx.zoom < 0.35) return "radial";
  if (ctx.hasCrossLinks || ctx.hasGroups) return "elk";
  if (ctx.visibleCount <= 250) return "dagre";
  return "elk";
}

export function layoutWithRadial(nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
  const byDepth = new Map<number, Node[]>();
  for (const n of nodes) {
    const depth = Number((n.data as any)?.depth ?? 0);
    const arr = byDepth.get(depth) ?? [];
    arr.push(n);
    byDepth.set(depth, arr);
  }

  const out: Node[] = [];
  for (const [depth, arr] of [...byDepth.entries()].sort((a, b) => a[0] - b[0])) {
    const radius = Math.max(60, depth * 180);
    const count = Math.max(1, arr.length);
    arr.forEach((n, i) => {
      const t = (Math.PI * 2 * i) / count;
      out.push({ ...n, position: { x: Math.cos(t) * radius, y: Math.sin(t) * radius } });
    });
  }

  return { nodes: out, edges };
}

export function layoutWithDagre(nodes: Node[], edges: Edge[], direction: "TB" | "LR" = "LR"): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, ranksep: 80, nodesep: 36 });

  nodes.forEach((n) => {
    g.setNode(n.id, {
      width: n.width ?? 180,
      height: n.height ?? 40
    });
  });

  edges.forEach((e) => g.setEdge(e.source, e.target));
  dagre.layout(g);

  return {
    nodes: nodes.map((n) => {
      const p = g.node(n.id);
      return { ...n, position: { x: (p?.x ?? 0) - ((n.width ?? 180) / 2), y: (p?.y ?? 0) - ((n.height ?? 40) / 2) } };
    }),
    edges
  };
}

export async function layoutWithElk(
  nodes: Node[],
  edges: Edge[],
  direction?: "RIGHT" | "DOWN"
): Promise<{ nodes: Node[]; edges: Edge[] }> {
  const layoutOptions: Record<string, string> = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": "96",
    "elk.spacing.nodeNode": "40"
  };

  if (direction) {
    layoutOptions["elk.direction"] = direction;
  }

  const graph = {
    id: "root",
    layoutOptions,
    children: nodes.map((n) => ({
      id: n.id,
      width: n.width ?? 180,
      height: n.height ?? 40
    })),
    edges: edges.map((e) => ({ id: e.id, sources: [e.source], targets: [e.target] }))
  };

  const out = await elk.layout(graph as any);
  const pos = new Map((out.children ?? []).map((c: any) => [c.id, { x: c.x ?? 0, y: c.y ?? 0 }]));

  return {
    nodes: nodes.map((n) => ({ ...n, position: pos.get(n.id) ?? n.position })),
    edges
  };
}
