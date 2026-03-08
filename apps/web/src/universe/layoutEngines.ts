import dagre from "dagre";
import ELK from "elkjs/lib/elk.bundled.js";
import type { Edge, Node } from "reactflow";

export type LayoutEngine = "dagre" | "elk";
export type LayoutMode = "auto" | "overview" | "focus";

const elk = new ELK();

export function chooseLayout(ctx: {
  mode: LayoutMode;
  zoom: number;
  visibleCount: number;
  hasCrossLinks: boolean;
}): LayoutEngine {
  if (ctx.hasCrossLinks) return "elk";
  if (ctx.mode === "overview") return "dagre";
  if (ctx.zoom < 0.45) return "dagre";
  if (ctx.visibleCount > 220) return "elk";
  return "dagre";
}

export function layoutWithDagre(nodes: Node[], edges: Edge[], direction: "TB" | "LR" = "LR") {
  const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, ranksep: 80, nodesep: 30 });

  for (const n of nodes) {
    g.setNode(n.id, {
      width: n.width ?? 180,
      height: n.height ?? 40
    });
  }

  for (const e of edges) {
    g.setEdge(e.source, e.target);
  }

  dagre.layout(g);

  return {
    nodes: nodes.map((n) => {
      const p = g.node(n.id);
      const w = n.width ?? 180;
      const h = n.height ?? 40;
      return {
        ...n,
        position: {
          x: (p?.x ?? 0) - w / 2,
          y: (p?.y ?? 0) - h / 2
        }
      };
    }),
    edges
  };
}

export async function layoutWithElk(nodes: Node[], edges: Edge[], direction?: "RIGHT" | "DOWN") {
  const layoutOptions: Record<string, string> = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": "88",
    "elk.spacing.nodeNode": "36"
  };

  if (direction) layoutOptions["elk.direction"] = direction;

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
