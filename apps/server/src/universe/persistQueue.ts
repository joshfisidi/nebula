import type { FsProjectionEvent } from "./projectionTypes.js";

const DEFAULT_FLUSH_MS = 120;
const DEFAULT_BATCH_THRESHOLD = 256;

type PendingState = {
  order: number;
  event: FsProjectionEvent;
};

function readPositiveIntEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

export function compressProjectionEvents(events: FsProjectionEvent[]): FsProjectionEvent[] {
  const state = new Map<string, PendingState>();
  let sequence = 0;

  for (const event of events) {
    const current = state.get(event.nodeId) ?? { order: sequence++, event };

    if (event.op === "unlink" || event.op === "unlinkDir") {
      current.event = event;
      state.set(event.nodeId, current);
      continue;
    }

    current.event = event;
    state.set(event.nodeId, current);
  }

  return [...state.values()].sort((a, b) => a.order - b.order).map((entry) => entry.event);
}

export interface UniversePersistQueue {
  enqueue: (events: FsProjectionEvent[]) => void;
  flush: (reason?: string) => void;
  close: () => void;
}

export function startUniversePersistQueue(params: {
  onFlush: (events: FsProjectionEvent[]) => void;
  logger?: (record: Record<string, unknown>) => void;
}): UniversePersistQueue {
  const flushMs = readPositiveIntEnv("NEBULA_PERSIST_QUEUE_FLUSH_MS", DEFAULT_FLUSH_MS);
  const batchThreshold = readPositiveIntEnv("NEBULA_PERSIST_QUEUE_BATCH_THRESHOLD", DEFAULT_BATCH_THRESHOLD);

  let pending: FsProjectionEvent[] = [];
  let timer: NodeJS.Timeout | null = null;
  let queuedAtMs = 0;
  let closed = false;

  const clearTimer = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
  };

  const flush = (reason = "manual") => {
    clearTimer();
    if (closed || pending.length === 0) return;

    const rawEvents = pending.length;
    const ageMs = queuedAtMs > 0 ? Date.now() - queuedAtMs : 0;
    const batch = compressProjectionEvents(pending);
    pending = [];
    queuedAtMs = 0;

    params.logger?.({
      scope: "universe",
      event: "persist_queue_flush",
      reason,
      rawEvents,
      compressedEvents: batch.length,
      ageMs
    });
    params.onFlush(batch);
  };

  const schedule = () => {
    if (timer || closed) return;
    timer = setTimeout(() => {
      timer = null;
      flush("timer");
    }, flushMs);
  };

  return {
    enqueue(events) {
      if (closed || events.length === 0) return;
      if (pending.length === 0) queuedAtMs = Date.now();
      pending.push(...events);

      params.logger?.({
        scope: "universe",
        event: "persist_queue_enqueue",
        events: events.length,
        pending: pending.length
      });

      if (pending.length >= batchThreshold) {
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
