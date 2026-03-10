"use client";

import { useEffect } from "react";
import { useUniverseGraphStore } from "./graphStore";
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

<<<<<<< HEAD
export function UniverseLiveProvider({ children, enabled = true }: { children: React.ReactNode; enabled?: boolean }) {
=======
export function UniverseLiveProvider({
  children,
  enabled = true,
  onStatus
}: {
  children: React.ReactNode;
  enabled?: boolean;
  onStatus?: (status: UniverseConnectionStatus) => void;
}) {
>>>>>>> agent
  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
  const applyPatch = useUniverseGraphStore((s) => s.applyPatch);
  const setConnected = useUniverseGraphStore((s) => s.setConnected);

  useEffect(() => {
    if (!enabled) {
      setConnected(false);
<<<<<<< HEAD
      return;
    }

=======
      onStatus?.({ phase: "idle" });
      return;
    }

    onStatus?.({ phase: "connecting", message: "Connecting to live graph…" });

>>>>>>> agent
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
        if (message.type === "snapshot") applySnapshot(message);
        else applyPatch(message.ops);
      }
    });

    return () => disconnect();
<<<<<<< HEAD
  }, [enabled, applyPatch, applySnapshot, setConnected]);
=======
  }, [applyPatch, applySnapshot, enabled, onStatus, setConnected]);
>>>>>>> agent

  return <>{children}</>;
}
