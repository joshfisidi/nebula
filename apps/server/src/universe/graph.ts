import path from "node:path";
import { promises as fs } from "node:fs";
import { edgeId, nodeId, normalizePath } from "./ids.js";
import { computeLayout } from "./layout.js";
import type { GraphEdge, GraphNode, PatchOp, UniverseSnapshotMessage } from "./types.js";

export class UniverseGraph {
  readonly nodes = new Map<string, GraphNode>();
  readonly edges = new Map<string, GraphEdge>();
  readonly children = new Map<string, Set<string>>();

  constructor(private readonly rootPath: string) {
    const root = this.makeDirNode(rootPath, undefined);
    root.depth = 0;
    this.nodes.set(root.id, root);
  }

  rootId(): string {
    return nodeId(this.rootPath);
  }

  snapshot(): UniverseSnapshotMessage {
    return {
      type: "snapshot",
      t: Date.now(),
      graph: { nodes: [...this.nodes.values()], edges: [...this.edges.values()] }
    };
  }

  async upsertPath(absPathInput: string, kind: "file" | "dir"): Promise<PatchOp[]> {
    const absPath = normalizePath(absPathInput);
    const ops: PatchOp[] = [];

    const parentId = this.ensureParentChain(absPath, ops);

    const st = await fs.stat(absPath).catch(() => null);
    if (!st) return ops;

    const id = nodeId(absPath);
    const existing = this.nodes.get(id);
    const isRoot = id === this.rootId();
    const node: GraphNode = {
      id,
      kind,
      name: path.basename(absPath) || absPath,
      path: absPath,
      depth: this.depth(absPath),
      parentId: isRoot ? undefined : parentId,
      sizeBytes: kind === "file" ? st.size : undefined,
      mtimeMs: st.mtimeMs,
      pos: existing?.pos
    };

    this.nodes.set(id, node);
    ops.push({ op: "upsertNode", node });

    if (!isRoot) {
      this.linkChild(parentId, id);
      const edge: GraphEdge = {
        id: edgeId("contains", parentId, id),
        kind: "contains",
        from: parentId,
        to: id
      };
      this.edges.set(edge.id, edge);
      ops.push({ op: "upsertEdge", edge });
    }

    ops.push(...this.recomputeLayoutForProjectRoot());
    return dedupeOps(ops);
  }

  removePath(absPathInput: string): PatchOp[] {
    const absPath = normalizePath(absPathInput);
    const id = nodeId(absPath);
    if (!this.nodes.has(id) || id === this.rootId()) return [];

    const ops: PatchOp[] = [];
    const toRemove: string[] = [id];

    for (let i = 0; i < toRemove.length; i += 1) {
      const current = toRemove[i];
      const kids = this.children.get(current);
      if (!kids) continue;
      for (const kid of kids) toRemove.push(kid);
    }

    for (const nodeIdToRemove of toRemove.reverse()) {
      this.children.delete(nodeIdToRemove);
      const node = this.nodes.get(nodeIdToRemove);
      if (!node) continue;

      if (node.parentId) {
        this.children.get(node.parentId)?.delete(nodeIdToRemove);
      }

      this.nodes.delete(nodeIdToRemove);
      ops.push({ op: "removeNode", id: nodeIdToRemove });

      for (const edge of [...this.edges.values()]) {
        if (edge.from === nodeIdToRemove || edge.to === nodeIdToRemove) {
          this.edges.delete(edge.id);
          ops.push({ op: "removeEdge", id: edge.id });
        }
      }
    }

    ops.push(...this.recomputeLayoutForProjectRoot());
    return ops;
  }

  private ensureParentChain(absPath: string, ops: PatchOp[]): string {
    const root = normalizePath(this.rootPath);
    let cursor = path.dirname(absPath);
    const chain: string[] = [];

    while (normalizePath(cursor).startsWith(root) && normalizePath(cursor) !== root) {
      chain.push(normalizePath(cursor));
      cursor = path.dirname(cursor);
    }

    let parentId = this.rootId();
    for (const dirPath of chain.reverse()) {
      const id = nodeId(dirPath);
      if (!this.nodes.has(id)) {
        const dirNode = this.makeDirNode(dirPath, parentId);
        this.nodes.set(id, dirNode);
        this.linkChild(parentId, id);
        ops.push({ op: "upsertNode", node: dirNode });

        const edge: GraphEdge = {
          id: edgeId("contains", parentId, id),
          kind: "contains",
          from: parentId,
          to: id
        };
        this.edges.set(edge.id, edge);
        ops.push({ op: "upsertEdge", edge });
      }
      parentId = id;
    }

    return parentId;
  }

  private recomputeLayoutForProjectRoot(): PatchOp[] {
    const positions = computeLayout(this.nodes, this.rootId());
    const ops: PatchOp[] = [];

    for (const [id, pos] of positions.entries()) {
      const node = this.nodes.get(id);
      if (!node) continue;
      const prev = node.pos;
      if (!prev || prev.x !== pos.x || prev.y !== pos.y || prev.z !== pos.z) {
        node.pos = pos;
        ops.push({ op: "setPos", id, pos });
      }
    }

    return ops;
  }

  private depth(absPath: string): number {
    const rel = normalizePath(path.relative(this.rootPath, absPath));
    if (rel === ".") return 0;
    return rel.split("/").filter(Boolean).length;
  }

  private makeDirNode(absPath: string, parentId?: string): GraphNode {
    return {
      id: nodeId(absPath),
      kind: "dir",
      name: path.basename(absPath) || normalizePath(absPath),
      path: normalizePath(absPath),
      depth: this.depth(absPath),
      parentId
    };
  }

  private linkChild(parentId: string, childId: string): void {
    const set = this.children.get(parentId) ?? new Set<string>();
    set.add(childId);
    this.children.set(parentId, set);
  }
}

function dedupeOps(ops: PatchOp[]): PatchOp[] {
  const removeNodes = new Set<string>();
  const removeEdges = new Set<string>();
  for (const op of ops) {
    if (op.op === "removeNode") removeNodes.add(op.id);
    if (op.op === "removeEdge") removeEdges.add(op.id);
  }

  return ops.filter((op) => {
    if (op.op === "upsertNode") return !removeNodes.has(op.node.id);
    if (op.op === "upsertEdge") return !removeEdges.has(op.edge.id);
    return true;
  });
}
