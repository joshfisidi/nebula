import dagre from "dagre";
import ELK from "elkjs/lib/elk.bundled.js";
import { Position, type Edge, type Node } from "reactflow";

export type LayoutEngine = "field" | "radial" | "dagre" | "elk";
export type LayoutMode = "auto" | "overview" | "focus";

const elk = new ELK();
const NODE_COLLISION_PADDING = 18;
const EDGE_LANE_SPACING = 28;
const EDGE_DETOUR_SPACING = 22;

export type RoutedEdgeData = {
  laneY: number;
  laneX?: number;
  route: "forward" | "detour";
};

type Point = { x: number; y: number };

export function chooseLayout(ctx: {
  mode: LayoutMode;
  zoom: number;
  visibleCount: number;
  hasGroups: boolean;
  hasCrossLinks: boolean;
  hasRuntimePositions: boolean;
}): LayoutEngine {
  if (ctx.hasRuntimePositions && ctx.mode !== "overview") return "field";
  if (ctx.mode === "overview" || ctx.zoom < 0.35) return "radial";
  if (ctx.hasCrossLinks || ctx.hasGroups) return "elk";
  if (ctx.visibleCount <= 250) return "dagre";
  return "elk";
}

function nodeSize(node: Node): { width: number; height: number } {
  return {
    width: Math.max(1, node.width ?? 180),
    height: Math.max(1, node.height ?? 40)
  };
}

function nodeCenter(node: Node): Point {
  const size = nodeSize(node);
  return {
    x: node.position.x + size.width / 2,
    y: node.position.y + size.height / 2
  };
}

function nodeVerticalBounds(node: Node) {
  const size = nodeSize(node);
  return {
    top: node.position.y - NODE_COLLISION_PADDING / 2,
    bottom: node.position.y + size.height + NODE_COLLISION_PADDING / 2
  };
}

function addSourceTargetPositions(nodes: Node[]): Node[] {
  return nodes.map((node) => ({
    ...node,
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  }));
}

function relaxVerticalLane(
  items: Array<{ id: string; desired: number; top: number; bottom: number }>,
  spacing: number
): Map<string, number> {
  if (items.length === 0) return new Map<string, number>();

  const sorted = [...items].sort((a, b) => a.desired - b.desired);
  const centers = sorted.map((item) => item.desired);

  for (let pass = 0; pass < 6; pass += 1) {
    for (let index = 1; index < sorted.length; index += 1) {
      const prev = sorted[index - 1];
      const current = sorted[index];
      const minCenter = centers[index - 1] + (prev.bottom - prev.top) / 2 + (current.bottom - current.top) / 2 + spacing;
      if (centers[index] < minCenter) {
        centers[index] = minCenter;
      }
    }

    for (let index = sorted.length - 2; index >= 0; index -= 1) {
      const current = sorted[index];
      const next = sorted[index + 1];
      const maxCenter = centers[index + 1] - (current.bottom - current.top) / 2 - (next.bottom - next.top) / 2 - spacing;
      if (centers[index] > maxCenter) {
        centers[index] = maxCenter;
      }
    }

    for (let index = 0; index < sorted.length; index += 1) {
      centers[index] = (centers[index] * 2 + sorted[index].desired) / 3;
    }
  }

  return new Map(sorted.map((item, index) => [item.id, centers[index]]));
}

function resolveNodeOverlaps(nodes: Node[]): Node[] {
  const withHandles = addSourceTargetPositions(nodes);
  const resolved = withHandles.map((node) => ({ ...node, position: { ...node.position } }));
  const byDepth = new Map<number, Node[]>();

  for (const node of resolved) {
    const depth = Number((node.data as { depth?: number } | undefined)?.depth ?? 0);
    const bucket = byDepth.get(depth) ?? [];
    bucket.push(node);
    byDepth.set(depth, bucket);
  }

  for (const bucket of byDepth.values()) {
    const laneInputs = bucket.map((node) => {
      const center = nodeCenter(node);
      const bounds = nodeVerticalBounds(node);
      return {
        id: node.id,
        desired: center.y,
        top: bounds.top,
        bottom: bounds.bottom
      };
    });

    const centers = relaxVerticalLane(laneInputs, NODE_COLLISION_PADDING);
    for (const node of bucket) {
      const nextCenterY = centers.get(node.id);
      if (typeof nextCenterY !== "number") continue;
      const { height } = nodeSize(node);
      node.position.y = nextCenterY - height / 2;
    }
  }

  for (let iteration = 0; iteration < 12; iteration += 1) {
    let moved = false;

    for (let i = 0; i < resolved.length; i += 1) {
      const a = resolved[i];
      const aSize = nodeSize(a);
      const aCenter = nodeCenter(a);

      for (let j = i + 1; j < resolved.length; j += 1) {
        const b = resolved[j];
        const bSize = nodeSize(b);
        const bCenter = nodeCenter(b);

        const minDx = (aSize.width + bSize.width) / 2 + NODE_COLLISION_PADDING;
        const minDy = (aSize.height + bSize.height) / 2 + NODE_COLLISION_PADDING;
        const dx = bCenter.x - aCenter.x;
        const dy = bCenter.y - aCenter.y;
        const overlapX = minDx - Math.abs(dx);
        const overlapY = minDy - Math.abs(dy);

        if (overlapX <= 0 || overlapY <= 0) continue;

        const sameDepth =
          Number((a.data as { depth?: number } | undefined)?.depth ?? 0) ===
          Number((b.data as { depth?: number } | undefined)?.depth ?? 0);

        if (sameDepth || overlapY <= overlapX * 0.85) {
          const push = overlapY / 2 + 0.5;
          const direction = dy === 0 ? (i % 2 === 0 ? -1 : 1) : Math.sign(dy);
          a.position.y -= push * direction;
          b.position.y += push * direction;
        } else {
          const push = overlapX / 2 + 0.5;
          const direction = dx === 0 ? (i % 2 === 0 ? -1 : 1) : Math.sign(dx);
          a.position.x -= push * direction;
          b.position.x += push * direction;
        }

        moved = true;
      }
    }

    if (!moved) {
      break;
    }
  }

  return resolved;
}

function routeEdges(nodes: Node[], edges: Edge[]): Edge[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const groups = new Map<
    string,
    Array<{
      edge: Edge;
      sourceAnchor: Point;
      targetAnchor: Point;
      desiredLaneY: number;
    }>
  >();

  for (const edge of edges) {
    const source = byId.get(edge.source);
    const target = byId.get(edge.target);
    if (!source || !target) continue;

    const sourceSize = nodeSize(source);
    const targetSize = nodeSize(target);
    const sourceAnchor = {
      x: source.position.x + sourceSize.width,
      y: source.position.y + sourceSize.height / 2
    };
    const targetAnchor = {
      x: target.position.x,
      y: target.position.y + targetSize.height / 2
    };

    const sourceDepth = Number((source.data as { depth?: number } | undefined)?.depth ?? 0);
    const targetDepth = Number((target.data as { depth?: number } | undefined)?.depth ?? 0);
    const forward = targetAnchor.x - sourceAnchor.x >= 56;
    const corridor = Math.round(((sourceAnchor.x + targetAnchor.x) / 2) / 260);
    const key = `${forward ? "f" : "d"}:${Math.min(sourceDepth, targetDepth)}:${Math.max(sourceDepth, targetDepth)}:${corridor}`;
    const bucket = groups.get(key) ?? [];

    bucket.push({
      edge,
      sourceAnchor,
      targetAnchor,
      desiredLaneY: (sourceAnchor.y + targetAnchor.y) / 2
    });
    groups.set(key, bucket);
  }

  const routed = new Map<string, RoutedEdgeData>();

  for (const [key, bucket] of groups) {
    const isForward = key.startsWith("f:");

    if (isForward) {
      const lanes = relaxVerticalLane(
        bucket.map((entry) => ({
          id: entry.edge.id,
          desired: entry.desiredLaneY,
          top: entry.desiredLaneY - EDGE_LANE_SPACING / 2,
          bottom: entry.desiredLaneY + EDGE_LANE_SPACING / 2
        })),
        EDGE_LANE_SPACING
      );

      for (const entry of bucket) {
        routed.set(entry.edge.id, {
          laneY: lanes.get(entry.edge.id) ?? entry.desiredLaneY,
          route: "forward"
        });
      }

      continue;
    }

    const sorted = [...bucket].sort((a, b) => a.desiredLaneY - b.desiredLaneY);
    const maxX = Math.max(...sorted.map((entry) => Math.max(entry.sourceAnchor.x, entry.targetAnchor.x)));

    for (const [index, entry] of sorted.entries()) {
      routed.set(entry.edge.id, {
        laneY: entry.desiredLaneY + (index - (sorted.length - 1) / 2) * EDGE_LANE_SPACING,
        laneX: maxX + 72 + index * EDGE_DETOUR_SPACING,
        route: "detour"
      });
    }
  }

  return edges.map((edge) => ({
    ...edge,
    type: "routed",
    data: routed.get(edge.id),
    interactionWidth: 16
  }));
}

export function finalizeLayout(nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
  const resolvedNodes = resolveNodeOverlaps(nodes);
  const resolvedEdges = routeEdges(resolvedNodes, edges);
  return { nodes: resolvedNodes, edges: resolvedEdges };
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

  return finalizeLayout(out, edges);
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

  return finalizeLayout(
    nodes.map((n) => {
      const p = g.node(n.id);
      return { ...n, position: { x: (p?.x ?? 0) - ((n.width ?? 180) / 2), y: (p?.y ?? 0) - ((n.height ?? 40) / 2) } };
    }),
    edges
  );
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

  return finalizeLayout(
    nodes.map((n) => ({ ...n, position: pos.get(n.id) ?? n.position })),
    edges
  );
}
