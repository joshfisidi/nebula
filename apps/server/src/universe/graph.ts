import path from "node:path";
import { promises as fs } from "node:fs";
import {
  applyCentralGravity,
  applyHierarchyGravity,
  applySemanticSpringConstraints,
  applyChargeRepulsion,
  applyOrnsteinUhlenbeckDrift,
  integrateVerlet,
  type IntegratorConfig,
  type NodePhysicsMeta,
  type SpringConstraint
} from "@nebula/physics";
import { edgeId, nodeId, normalizePath } from "./ids.js";
import { computeLayout } from "./layout.js";
import type { GraphEdge, GraphNode, PatchOp, UniverseSnapshotMessage, Vec3 } from "./types.js";

const SETTLE_STEPS = 8;
const SETTLE_DT = 1 / 30;
const PATCH_EPSILON = 0.01;

interface RuntimeState {
  previous: Vec3;
  drift: Vec3;
}

export class UniverseGraph {
  readonly nodes = new Map<string, GraphNode>();
  readonly edges = new Map<string, GraphEdge>();
  readonly children = new Map<string, Set<string>>();

  private readonly anchors = new Map<string, Vec3>();
  private readonly runtime = new Map<string, RuntimeState>();
  private lastTickMs = Date.now();

  constructor(
    private readonly rootPath: string,
    private readonly physicsConfig: IntegratorConfig
  ) {
    const root = this.makeDirNode(rootPath, undefined);
    root.depth = 0;
    this.nodes.set(root.id, root);
    this.refreshSemanticState();
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
      pos: existing?.pos,
      physics: existing?.physics
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

    ops.push(...this.refreshSemanticState());
    ops.push(...this.settlePhysics(Date.now(), SETTLE_STEPS));
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
      this.anchors.delete(nodeIdToRemove);
      this.runtime.delete(nodeIdToRemove);
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

    ops.push(...this.refreshSemanticState());
    ops.push(...this.settlePhysics(Date.now(), SETTLE_STEPS));
    return dedupeOps(ops);
  }

  tick(nowMs = Date.now()): PatchOp[] {
    const dt = clamp((nowMs - this.lastTickMs) / 1000, 1 / 120, 1 / 15);
    this.lastTickMs = nowMs;
    return this.stepPhysics(dt, nowMs / 1000, PATCH_EPSILON);
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

  private refreshSemanticState(): PatchOp[] {
    const anchors = computeLayout(this.nodes, this.rootId());
    this.anchors.clear();
    const subtreeMass = new Map<string, number>();
    const nowMs = Date.now();

    const computeSubtreeMass = (id: string): number => {
      const node = this.nodes.get(id);
      if (!node) return 0;

      const ownWeight =
        node.kind === "dir"
          ? 1.6 + Math.min(2.4, (this.children.get(id)?.size ?? 0) * 0.22)
          : 0.8 + Math.min(2.2, Math.log10((node.sizeBytes ?? 0) + 32) * 0.35);

      let total = ownWeight;
      for (const childId of this.children.get(id) ?? []) {
        total += 0.84 * computeSubtreeMass(childId);
      }

      subtreeMass.set(id, total);
      return total;
    };

    computeSubtreeMass(this.rootId());

    const ops: PatchOp[] = [];
    for (const node of this.nodes.values()) {
      const anchor = anchors.get(node.id) ?? { x: 0, y: 0, z: 0 };
      this.anchors.set(node.id, anchor);
      this.ensureRuntimeState(node, anchor);

      const nextPhysics = buildNodePhysicsMeta(node, subtreeMass.get(node.id) ?? 1, nowMs);
      if (!samePhysics(node.physics, nextPhysics)) {
        node.physics = nextPhysics;
        ops.push({ op: "upsertNode", node: { ...node } });
      }
    }

    return ops;
  }

  private settlePhysics(nowMs: number, steps: number): PatchOp[] {
    this.lastTickMs = nowMs;
    let ops: PatchOp[] = [];
    for (let i = 0; i < steps; i += 1) {
      ops = this.stepPhysics(SETTLE_DT, nowMs / 1000 + i * SETTLE_DT, i === steps - 1 ? PATCH_EPSILON : Number.POSITIVE_INFINITY);
    }
    return ops;
  }

  private stepPhysics(dt: number, time: number, emitThreshold: number): PatchOp[] {
    if (this.nodes.size === 0) return [];

    const ids = [...this.nodes.keys()].sort((a, b) => a.localeCompare(b));
    const indexById = new Map(ids.map((id, index) => [id, index]));
    const positions = new Float32Array(ids.length * 3);
    const previousPositions = new Float32Array(ids.length * 3);
    const accelerations = new Float32Array(ids.length * 3);
    const centers = new Float32Array(ids.length * 3);
    const masses = new Float32Array(ids.length);
    const charges = new Float32Array(ids.length);
    const volatility = new Float32Array(ids.length);
    const salience = new Float32Array(ids.length);
    const subtreeMass = new Float32Array(ids.length);
    const depths = new Float32Array(ids.length);
    const ouVelocity = new Float32Array(ids.length * 3);

    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      const node = this.nodes.get(id)!;
      const anchor = this.anchors.get(id) ?? { x: 0, y: 0, z: 0 };
      const runtime = this.runtime.get(id)!;
      const position = node.pos ?? anchor;
      const physics = node.physics ?? buildNodePhysicsMeta(node, 1, Date.now());
      const o = i * 3;

      positions[o] = position.x;
      positions[o + 1] = position.y;
      positions[o + 2] = position.z;

      previousPositions[o] = runtime.previous.x;
      previousPositions[o + 1] = runtime.previous.y;
      previousPositions[o + 2] = runtime.previous.z;

      centers[o] = anchor.x;
      centers[o + 1] = anchor.y;
      centers[o + 2] = anchor.z;

      masses[i] = physics.mass;
      charges[i] = physics.charge;
      volatility[i] = physics.volatility;
      salience[i] = physics.salience;
      subtreeMass[i] = physics.subtreeMass;
      depths[i] = physics.depth;

      ouVelocity[o] = runtime.drift.x;
      ouVelocity[o + 1] = runtime.drift.y;
      ouVelocity[o + 2] = runtime.drift.z;
    }

    const constraints: SpringConstraint[] = [];
    for (const edge of this.edges.values()) {
      if (edge.kind !== "contains") continue;
      const from = this.nodes.get(edge.from);
      const to = this.nodes.get(edge.to);
      const a = indexById.get(edge.from);
      const b = indexById.get(edge.to);
      if (!from || !to || a === undefined || b === undefined) continue;
      constraints.push(buildConstraint(a, b, from, to));
    }

    const ctx = {
      nodeCount: ids.length,
      positions,
      previousPositions,
      accelerations,
      constraints,
      centers,
      dt,
      config: this.physicsConfig,
      masses,
      charges,
      volatility,
      salience,
      subtreeMass,
      depths,
      ouVelocity
    };

    applySemanticSpringConstraints(ctx);
    applyChargeRepulsion(ctx);
    applyCentralGravity(ctx);
    applyHierarchyGravity(ctx);
    applyOrnsteinUhlenbeckDrift(ctx, time);
    integrateVerlet(ctx);

    const ops: PatchOp[] = [];
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      const node = this.nodes.get(id)!;
      const runtime = this.runtime.get(id)!;
      const o = i * 3;
      const nextPos = { x: positions[o], y: positions[o + 1], z: positions[o + 2] };
      const prevPos = node.pos ?? nextPos;

      runtime.previous = { x: previousPositions[o], y: previousPositions[o + 1], z: previousPositions[o + 2] };
      runtime.drift = { x: ouVelocity[o], y: ouVelocity[o + 1], z: ouVelocity[o + 2] };
      node.pos = nextPos;

      if (Math.abs(prevPos.x - nextPos.x) > emitThreshold || Math.abs(prevPos.y - nextPos.y) > emitThreshold || Math.abs(prevPos.z - nextPos.z) > emitThreshold) {
        ops.push({ op: "setPos", id, pos: nextPos });
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

  private ensureRuntimeState(node: GraphNode, anchor: Vec3): void {
    const existing = this.runtime.get(node.id);
    if (existing) {
      if (!node.pos) node.pos = jitteredAnchor(anchor, node.id, node.depth);
      return;
    }

    const initial = node.pos ?? jitteredAnchor(anchor, node.id, node.depth);
    node.pos = initial;
    this.runtime.set(node.id, {
      previous: { ...initial },
      drift: { x: 0, y: 0, z: 0 }
    });
  }
}

function buildConstraint(a: number, b: number, from: GraphNode, to: GraphNode): SpringConstraint {
  const parentPhysics = from.physics ?? defaultPhysics(from.depth);
  const childPhysics = to.physics ?? defaultPhysics(to.depth);
  const dirDir = from.kind === "dir" && to.kind === "dir";
  const dirFile = from.kind === "dir" && to.kind === "file";
  const baseRest = dirDir ? 8.8 : dirFile ? 6.4 : 5.1;
  const baseStiffness = dirDir ? 0.026 : dirFile ? 0.019 : 0.015;
  const scaleRest = (parentPhysics.restLengthScale + childPhysics.restLengthScale) * 0.5;
  const scaleStiffness = (parentPhysics.stiffnessScale + childPhysics.stiffnessScale) * 0.5;

  return {
    a,
    b,
    restLength: baseRest * scaleRest * (1 + to.depth * 0.07),
    stiffness: baseStiffness * scaleStiffness
  };
}

function buildNodePhysicsMeta(node: GraphNode, subtreeMass: number, nowMs: number): NodePhysicsMeta {
  const ageHours = node.mtimeMs ? Math.max(0, (nowMs - node.mtimeMs) / 3_600_000) : 999;
  const recency = node.mtimeMs ? 1 / (1 + ageHours / 18) : 0;
  const importantNameBoost =
    ["package.json", "readme.md", "tsconfig.json", "next.config.mjs", ".env"].includes(node.name.toLowerCase()) ? 0.45 : 0;
  const salience = clamp(0.95 + subtreeMass * 0.11 + recency * 1.15 + importantNameBoost, 0.9, 4.4);
  const mass = clamp((node.kind === "dir" ? 1.5 : 0.92) + subtreeMass * 0.14 + salience * 0.08, 0.85, 8.5);
  const charge = clamp((node.kind === "dir" ? 1.1 : 0.75) + subtreeMass * 0.16 + node.depth * 0.05, 0.7, 7.2);
  const restLengthScale = clamp((node.kind === "dir" ? 1.14 : 0.92) + node.depth * 0.03, 0.85, 1.8);
  const stiffnessScale = clamp((node.kind === "dir" ? 1.12 : 0.88) + recency * 0.14, 0.7, 1.5);
  const volatility = clamp((node.kind === "file" ? 0.5 : 0.26) + recency * 0.22, 0.16, 1.05);

  return {
    mass,
    charge,
    restLengthScale,
    stiffnessScale,
    volatility,
    salience,
    subtreeMass,
    depth: node.depth
  };
}

function samePhysics(a: NodePhysicsMeta | undefined, b: NodePhysicsMeta): boolean {
  if (!a) return false;
  return (
    almostEqual(a.mass, b.mass) &&
    almostEqual(a.charge, b.charge) &&
    almostEqual(a.restLengthScale, b.restLengthScale) &&
    almostEqual(a.stiffnessScale, b.stiffnessScale) &&
    almostEqual(a.volatility, b.volatility) &&
    almostEqual(a.salience, b.salience) &&
    almostEqual(a.subtreeMass, b.subtreeMass) &&
    almostEqual(a.depth, b.depth)
  );
}

function almostEqual(a: number, b: number, epsilon = 0.0001): boolean {
  return Math.abs(a - b) <= epsilon;
}

function jitteredAnchor(anchor: Vec3, seed: string, depth: number): Vec3 {
  const wobble = 0.35 + depth * 0.08;
  return {
    x: anchor.x + seeded(seed, 1) * wobble,
    y: anchor.y + seeded(seed, 2) * wobble,
    z: anchor.z + seeded(seed, 3) * wobble * 0.45
  };
}

function seeded(seed: string, salt: number): number {
  let hash = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) / 0xffffffff) * 2 - 1;
}

function defaultPhysics(depth: number): NodePhysicsMeta {
  return {
    mass: 1,
    charge: 1,
    restLengthScale: 1,
    stiffnessScale: 1,
    volatility: 0.25,
    salience: 1,
    subtreeMass: 1,
    depth
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function dedupeOps(ops: PatchOp[]): PatchOp[] {
  const removeNodes = new Set<string>();
  const removeEdges = new Set<string>();
  const seenSetPos = new Set<string>();
  const seenUpsertNodes = new Set<string>();
  const seenUpsertEdges = new Set<string>();
  const out: PatchOp[] = [];

  for (const op of ops) {
    if (op.op === "removeNode") removeNodes.add(op.id);
    if (op.op === "removeEdge") removeEdges.add(op.id);
  }

  for (let i = ops.length - 1; i >= 0; i -= 1) {
    const op = ops[i];
    if (op.op === "upsertNode") {
      if (removeNodes.has(op.node.id) || seenUpsertNodes.has(op.node.id)) continue;
      seenUpsertNodes.add(op.node.id);
    }
    if (op.op === "upsertEdge") {
      if (removeEdges.has(op.edge.id) || seenUpsertEdges.has(op.edge.id)) continue;
      seenUpsertEdges.add(op.edge.id);
    }
    if (op.op === "setPos") {
      if (removeNodes.has(op.id) || seenSetPos.has(op.id)) continue;
      seenSetPos.add(op.id);
    }
    out.push(op);
  }

  return out.reverse();
}
