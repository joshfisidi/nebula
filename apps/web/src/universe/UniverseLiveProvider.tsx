"use client";

import { useEffect } from "react";
import { useUniverseGraphStore } from "./graphStore";
import { connectUniverseWs } from "./wsClient";

function resolveWsUrl(): string {
  if (process.env.NEXT_PUBLIC_UNIVERSE_WS) return process.env.NEXT_PUBLIC_UNIVERSE_WS;
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const host = window.location.hostname || "127.0.0.1";
  const port = process.env.NEXT_PUBLIC_UNIVERSE_WS_PORT ?? "18891";
  return `${protocol}://${host}:${port}`;
}

export function UniverseLiveProvider({ children, enabled = true }: { children: React.ReactNode; enabled?: boolean }) {
  const applySnapshot = useUniverseGraphStore((s) => s.applySnapshot);
  const applyPatch = useUniverseGraphStore((s) => s.applyPatch);
  const setConnected = useUniverseGraphStore((s) => s.setConnected);

  useEffect(() => {
    if (!enabled) {
      setConnected(false);
      return;
    }

    const disconnect = connectUniverseWs({
      url: resolveWsUrl(),
      onConnected: setConnected,
      onMessage(message) {
        if (message.type === "snapshot") applySnapshot(message);
        else applyPatch(message.ops);
      }
    });

    return () => disconnect();
  }, [enabled, applyPatch, applySnapshot, setConnected]);

  return <>{children}</>;
}
