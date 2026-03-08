import dagre from "dagre";
import ELK from "elkjs/lib/elk.bundled.js";
import type { Edge, Node } from "reactflow";

export type LayoutEngine = "radial" | "dagre" | "elk";
export type LayoutMode = "focus" | "overview";

const elk = new ELK();

export function chooseLayout(ctx: {
  mode: LayoutMode;
  zoom: number;
  visibleCount: number;
  hasCrossLinks: boolean;
  rootCount: number;
}): LayoutEngine {
  if (ctx.mode === "focus" && ctx.rootCount === 1 && !ctx.hasCrossLinks && ctx.visibleCount <= 260) {
    return "radial";
  }

  if (ctx.hasCrossLinks) return "elk";
  if (ctx.mode === "overview" && ctx.visibleCount > 180) return "elk";
  if (ctx.zoom < 0.45) return "dagre";
  if (ctx.visibleCount > 260) return "elk";
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

type RadialNodeData = {
  parentId?: string;
};

export function layoutWithRadial(nodes: Node[], edges: Edge[], rootId?: string) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const children = new Map<string, Node[]>();
  const roots: Node[] = [];

  for (const node of nodes) {
    const parentId = (node.data as RadialNodeData | undefined)?.parentId;
    if (parentId && byId.has(parentId)) {
      const siblings = children.get(parentId) ?? [];
      siblings.push(node);
      children.set(parentId, siblings);
      continue;
    }

    roots.push(node);
  }

  for (const siblings of children.values()) {
    siblings.sort((a, b) => a.id.localeCompare(b.id));
  }

  const primaryRoot = (rootId && byId.get(rootId)) ?? roots[0] ?? nodes[0];
  if (!primaryRoot) {
    return { nodes, edges };
  }

  const weights = new Map<string, number>();
  const measure = (nodeId: string): number => {
    const branch = children.get(nodeId) ?? [];
    if (branch.length === 0) {
      weights.set(nodeId, 1);
      return 1;
    }

    const size = branch.reduce((sum, child) => sum + measure(child.id), 0);
    weights.set(nodeId, Math.max(1, size));
    return Math.max(1, size);
  };

  measure(primaryRoot.id);

  const positions = new Map<string, { x: number; y: number }>();
  const radialStep = 190;

  const place = (nodeId: string, startAngle: number, endAngle: number, depth: number) => {
    const angle = (startAngle + endAngle) * 0.5;
    const radius = depth * radialStep;
    positions.set(nodeId, {
      x: depth === 0 ? 0 : Math.cos(angle) * radius,
      y: depth === 0 ? 0 : Math.sin(angle) * radius
    });

    const branch = children.get(nodeId) ?? [];
    if (branch.length === 0) return;

    const span = endAngle - startAngle;
    const totalWeight = branch.reduce((sum, child) => sum + (weights.get(child.id) ?? 1), 0);
    let cursor = startAngle;

    for (const child of branch) {
      const childWeight = weights.get(child.id) ?? 1;
      const childSpan = totalWeight > 0 ? span * (childWeight / totalWeight) : span / branch.length;
      place(child.id, cursor, cursor + childSpan, depth + 1);
      cursor += childSpan;
    }
  };

  place(primaryRoot.id, -Math.PI, Math.PI, 0);

  return {
    nodes: nodes.map((node) => {
      const position = positions.get(node.id);
      if (!position) {
        return node;
      }

      const width = node.width ?? 180;
      const height = node.height ?? 40;

      return {
        ...node,
        position: {
          x: position.x - width / 2,
          y: position.y - height / 2
        }
      };
    }),
    edges
  };
}
