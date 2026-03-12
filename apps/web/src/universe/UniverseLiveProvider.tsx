"use client";

import { useEffect, useRef } from "react";
import { useUniverseGraphStore } from "./graphStore";
import { compressPatchOps, type PatchOp, type UniverseSnapshotMessage } from "./patch";
import { connectUniverseWs } from "./wsClient";

export type UniverseConnectionStatus = {
  phase: "idle" | "connecting" | "connected" | "retrying" | "error";
  message?: string;
  attempts?: number;
};

function resolveWsUrl(): string {
  if (process.env.NEXT_PUBLIC_UNIVERSE_WS) return process.env.NEXT_PUBLIC_UNIVERSE_WS;
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const host = window.location.hostname || "127.0.0.1";
  const port = process.env.NEXT_PUBLIC_UNIVERSE_WS_PORT ?? "18891";
  return `${protocol}://${host}:${port}`;
}

export function UniverseLiveProvider({
  children,
  enabled = true,
  onStatus
}: {
  children: React.ReactNode;
  enabled?: boolean;
  onStatus?: (status: UniverseConnectionStatus) => void;
}) {
  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
  const applyPatch = useUniverseGraphStore((s) => s.applyPatch);
  const setConnected = useUniverseGraphStore((s) => s.setConnected);
  const stepMotion = useUniverseGraphStore((s) => s.stepMotion);
  const pendingSnapshotRef = useRef<UniverseSnapshotMessage | null>(null);
  const pendingOpsRef = useRef<PatchOp[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastFrameMsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setConnected(false);
      pendingSnapshotRef.current = null;
      pendingOpsRef.current = [];
      lastFrameMsRef.current = null;
      onStatus?.({ phase: "idle" });
      return;
    }

    onStatus?.({ phase: "connecting", message: "Connecting to live graph…" });

    const stepFrame = (now: number) => {
      const previous = lastFrameMsRef.current ?? now - 16;
      const dtMs = now - previous;
      lastFrameMsRef.current = now;

      if (pendingSnapshotRef.current) {
        const snapshot = pendingSnapshotRef.current;
        pendingSnapshotRef.current = null;
        pendingOpsRef.current = [];
        applySnapshot(snapshot);
      } else if (pendingOpsRef.current.length > 0) {
        const queued = compressPatchOps(pendingOpsRef.current);
        pendingOpsRef.current = [];
        applyPatch(queued);
      }

      stepMotion(dtMs);
      frameRef.current = window.requestAnimationFrame(stepFrame);
    };

    frameRef.current = window.requestAnimationFrame(stepFrame);

    const disconnect = connectUniverseWs({
      url: resolveWsUrl(),
      onConnected(connected) {
        setConnected(connected);
        if (connected) onStatus?.({ phase: "connected", message: "Connected." });
      },
      onRetry(attempt, delayMs) {
        onStatus?.({ phase: "retrying", attempts: attempt, message: `Retrying in ${Math.ceil(delayMs / 1000)}s…` });
      },
      onError(message) {
        onStatus?.({ phase: "error", message });
      },
      onMessage(message) {
        if (message.type === "snapshot") {
          pendingSnapshotRef.current = message;
          pendingOpsRef.current = [];
          return;
        }

        pendingOpsRef.current.push(...message.ops);
      }
    });

    return () => {
      disconnect();
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastFrameMsRef.current = null;
      pendingSnapshotRef.current = null;
      pendingOpsRef.current = [];
    };
  }, [applyPatch, applySnapshot, enabled, onStatus, setConnected, stepMotion]);

  return <>{children}</>;
}
