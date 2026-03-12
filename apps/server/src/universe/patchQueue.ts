import type { PatchOp, UniverseSnapshotMessage } from "./types.js";

const DEFAULT_FLUSH_MS = 72;
const DEFAULT_SNAPSHOT_THRESHOLD = 900;

type PendingNodeState = {
  order: number;
  upsertNode?: Extract<PatchOp, { op: "upsertNode" }>["node"];
  setPos?: Extract<PatchOp, { op: "setPos" }>["pos"];
  removed?: boolean;
};

type PendingEdgeState = {
  order: number;
  upsertEdge?: Extract<PatchOp, { op: "upsertEdge" }>["edge"];
  removed?: boolean;
};

function readPositiveIntEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

export function compressPatchOps(ops: PatchOp[]): PatchOp[] {
  const nodeState = new Map<string, PendingNodeState>();
  const edgeState = new Map<string, PendingEdgeState>();
  let sequence = 0;

  for (const op of ops) {
    switch (op.op) {
      case "upsertNode": {
        const current = nodeState.get(op.node.id) ?? { order: sequence++ };
        current.removed = false;
        current.upsertNode = current.setPos ? { ...op.node, pos: { ...current.setPos } } : op.node;
        nodeState.set(op.node.id, current);
        break;
      }
      case "setPos": {
        const current = nodeState.get(op.id) ?? { order: sequence++ };
        current.removed = false;
        current.setPos = op.pos;
        if (current.upsertNode) {
          current.upsertNode = { ...current.upsertNode, pos: { ...op.pos } };
        }
        nodeState.set(op.id, current);
        break;
      }
      case "removeNode": {
        const current = nodeState.get(op.id) ?? { order: sequence++ };
        current.removed = true;
        current.upsertNode = undefined;
        current.setPos = undefined;
        nodeState.set(op.id, current);
        break;
      }
      case "upsertEdge": {
        const current = edgeState.get(op.edge.id) ?? { order: sequence++ };
        current.removed = false;
        current.upsertEdge = op.edge;
        edgeState.set(op.edge.id, current);
        break;
      }
      case "removeEdge": {
        const current = edgeState.get(op.id) ?? { order: sequence++ };
        current.removed = true;
        current.upsertEdge = undefined;
        edgeState.set(op.id, current);
        break;
      }
    }
  }

  const out: Array<{ order: number; op: PatchOp }> = [];

  for (const [id, state] of nodeState) {
    if (state.removed) {
      out.push({ order: state.order, op: { op: "removeNode", id } });
      continue;
    }
    if (state.upsertNode) {
      out.push({ order: state.order, op: { op: "upsertNode", node: state.upsertNode } });
      continue;
    }
    if (state.setPos) {
      out.push({ order: state.order, op: { op: "setPos", id, pos: state.setPos } });
    }
  }

  for (const [id, state] of edgeState) {
    if (state.removed) {
      out.push({ order: state.order, op: { op: "removeEdge", id } });
      continue;
    }
    if (state.upsertEdge) {
      out.push({ order: state.order, op: { op: "upsertEdge", edge: state.upsertEdge } });
    }
  }

  return out.sort((a, b) => a.order - b.order).map((entry) => entry.op);
}

export interface UniversePatchQueue {
  enqueue: (ops: PatchOp[], source: "fs" | "physics") => void;
  flush: (reason?: string) => void;
  close: () => void;
}

export function startUniversePatchQueue(params: {
  getSnapshot: () => UniverseSnapshotMessage;
  onPatch: (ops: PatchOp[]) => void;
  onSnapshot: (snapshot: UniverseSnapshotMessage) => void;
  logger?: (record: Record<string, unknown>) => void;
}): UniversePatchQueue {
  const flushMs = readPositiveIntEnv("NEBULA_PATCH_QUEUE_FLUSH_MS", DEFAULT_FLUSH_MS);
  const snapshotThreshold = readPositiveIntEnv("NEBULA_PATCH_QUEUE_SNAPSHOT_THRESHOLD", DEFAULT_SNAPSHOT_THRESHOLD);

  let pending: PatchOp[] = [];
  let timer: NodeJS.Timeout | null = null;
  let queuedAtMs = 0;
  let closed = false;

  const clearTimer = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
  };

  const schedule = () => {
    if (timer || closed) return;
    timer = setTimeout(() => {
      timer = null;
      flush("timer");
    }, flushMs);
  };

  const flush = (reason = "manual") => {
    clearTimer();
    if (closed || pending.length === 0) return;

    const rawCount = pending.length;
    const ageMs = queuedAtMs > 0 ? Date.now() - queuedAtMs : 0;
    const ops = compressPatchOps(pending);
    pending = [];
    queuedAtMs = 0;

    if (ops.length >= snapshotThreshold) {
      params.logger?.({
        scope: "universe",
        event: "patch_queue_flush_snapshot",
        reason,
        rawOps: rawCount,
        compressedOps: ops.length,
        ageMs
      });
      params.onSnapshot(params.getSnapshot());
      return;
    }

    params.logger?.({
      scope: "universe",
      event: "patch_queue_flush_patch",
      reason,
      rawOps: rawCount,
      compressedOps: ops.length,
      ageMs
    });
    params.onPatch(ops);
  };

  return {
    enqueue(ops, source) {
      if (closed || ops.length === 0) return;

      if (pending.length === 0) {
        queuedAtMs = Date.now();
      }

      pending.push(...ops);
      params.logger?.({
        scope: "universe",
        event: "patch_queue_enqueue",
        source,
        ops: ops.length,
        pending: pending.length
      });

      if (pending.length >= snapshotThreshold) {
        flush("threshold");
        return;
      }

      schedule();
    },
    flush,
    close() {
      if (closed) return;
      flush("close");
      clearTimer();
      closed = true;
    }
  };
}
