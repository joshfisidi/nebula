import dagre from "dagre";
import ELK from "elkjs/lib/elk.bundled.js";
import type { Edge, Node, XYPosition } from "reactflow";

export type LayoutEngine = "living-lite" | "mindmap" | "radial" | "dagre" | "elk";
export type LayoutMode = "mindmap" | "focus" | "overview";

const elk = new ELK();

export function chooseLayout(ctx: {
  mode: LayoutMode;
  zoom: number;
  visibleCount: number;
  hasCrossLinks: boolean;
  rootCount: number;
}): LayoutEngine {
  if (ctx.mode === "mindmap") return "mindmap";
  if (ctx.mode === "focus") {
    if (ctx.rootCount <= 1 && ctx.visibleCount <= 320) {
      return "radial";
    }
    if (!ctx.hasCrossLinks && ctx.visibleCount <= 220) {
      return "radial";
    }
    return ctx.visibleCount > 420 || ctx.hasCrossLinks ? "elk" : "dagre";
  }

  if (ctx.hasCrossLinks) return "elk";
  if (ctx.mode === "overview" && ctx.visibleCount > 180) return "elk";
  if (ctx.zoom < 0.45) return "dagre";
  if (ctx.visibleCount > 260) return "elk";
  return "dagre";
}

export function layoutWithMindmap(nodes: Node[], edges: Edge[]) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const children = new Map<string, Node[]>();
  const roots: Node[] = [];

  for (const node of nodes) {
    const parentId = (node.data as { parentId?: string } | undefined)?.parentId;
    if (parentId && byId.has(parentId)) {
      const siblings = children.get(parentId) ?? [];
      siblings.push(node);
      children.set(parentId, siblings);
    } else {
      roots.push(node);
    }
  }

  for (const siblings of children.values()) siblings.sort(compareRadialNodes);
  roots.sort(compareRadialNodes);

  const positions = new Map<string, XYPosition>();
  const COLUMN_GAP = 245;
  const ROW_GAP = 82;
  let rootOffset = 0;

  for (const root of roots) {
    const sides: [Node[], Node[]] = [[], []];
    const weights = new Map<string, number>();
    const weight = (node: Node): number => {
      const cached = weights.get(node.id);
      if (cached != null) return cached;
      const total = Math.max(1, (children.get(node.id) ?? []).reduce((sum, child) => sum + weight(child), 0));
      weights.set(node.id, total);
      return total;
    };

    const loads = [0, 0];
    for (const child of children.get(root.id) ?? []) {
      const side = loads[0] <= loads[1] ? 0 : 1;
      sides[side].push(child);
      loads[side] += weight(child);
    }

    const placed = new Set<string>([root.id]);
    const placeSide = (items: Node[], direction: -1 | 1) => {
      let row = 0;
      const place = (node: Node, depth: number): number => {
        if (placed.has(node.id)) return row * ROW_GAP;
        placed.add(node.id);
        const branch = children.get(node.id) ?? [];
        let y: number;
        if (branch.length === 0) {
          y = row * ROW_GAP;
          row += 1;
        } else {
          const childYs = branch.map((child) => place(child, depth + 1));
          y = (childYs[0]! + childYs[childYs.length - 1]!) / 2;
        }
        const width = node.width ?? 180;
        positions.set(node.id, { x: direction > 0 ? depth * COLUMN_GAP : -depth * COLUMN_GAP - width, y });
        return y;
      };
      for (const node of items) place(node, 1);
      return Math.max(1, row);
    };

    const leftRows = placeSide(sides[0], -1);
    const rightRows = placeSide(sides[1], 1);
    const shiftBranch = (items: Node[], offset: number) => {
      const visit = (node: Node) => {
        const position = positions.get(node.id);
        if (position) positions.set(node.id, { x: position.x, y: position.y + offset + rootOffset });
        for (const child of children.get(node.id) ?? []) visit(child);
      };
      for (const node of items) visit(node);
    };
    shiftBranch(sides[0], -((leftRows - 1) * ROW_GAP) / 2);
    shiftBranch(sides[1], -((rightRows - 1) * ROW_GAP) / 2);
    positions.set(root.id, { x: -(root.width ?? 180) / 2, y: rootOffset });
    rootOffset += Math.max(leftRows, rightRows) * ROW_GAP + 150;
  }

  return {
    nodes: nodes.map((node) => ({ ...node, position: positions.get(node.id) ?? node.position })),
    edges: edges.map((edge) => {
      const source = byId.get(edge.source);
      const target = byId.get(edge.target);
      const sourceX = (positions.get(edge.source)?.x ?? 0) + (source?.width ?? 180) / 2;
      const targetX = (positions.get(edge.target)?.x ?? 0) + (target?.width ?? 180) / 2;
      const left = targetX < sourceX;
      return {
        ...edge,
        type: "default",
        sourceHandle: left ? "left-out" : "right-out",
        targetHandle: left ? "right-in" : "left-in",
        style: { ...edge.style, strokeWidth: 1.5 }
      };
    })
  };
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
    nodes: nodes.map((n) => {
      const fallback: XYPosition = {
        x: (n.position as XYPosition | undefined)?.x ?? 0,
        y: (n.position as XYPosition | undefined)?.y ?? 0,
      };
      return { ...n, position: pos.get(n.id) ?? fallback };
    }),
    edges
  };
}

type RadialNodeData = {
  parentId?: string;
};

function compareRadialNodes(a: Node, b: Node): number {
  const aData = a.data as { name?: string; label?: string; path?: string } | undefined;
  const bData = b.data as { name?: string; label?: string; path?: string } | undefined;
  const aKey = `${aData?.name ?? aData?.label ?? aData?.path ?? a.id}`.toLowerCase();
  const bKey = `${bData?.name ?? bData?.label ?? bData?.path ?? b.id}`.toLowerCase();
  return aKey.localeCompare(bKey) || a.id.localeCompare(b.id);
}

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
    siblings.sort(compareRadialNodes);
  }

  roots.sort(compareRadialNodes);

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
