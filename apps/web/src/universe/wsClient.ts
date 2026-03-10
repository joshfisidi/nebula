import { isUniverseMessage, type UniverseMessage } from "./patch";

export function connectUniverseWs(params: {
  url: string;
  onMessage: (message: UniverseMessage) => void;
  onConnected?: (connected: boolean) => void;
  onRetry?: (attempt: number, delayMs: number) => void;
  onError?: (message: string) => void;
}): () => void {
  let disposed = false;
  let socket: WebSocket | null = null;
  let retryMs = 300;
  let timer: number | undefined;
  let attempt = 0;

  const connect = () => {
    if (disposed) return;
    attempt += 1;
    socket = new WebSocket(params.url);

    socket.onopen = () => {
      retryMs = 300;
      attempt = 0;
      params.onConnected?.(true);
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as unknown;
        if (isUniverseMessage(payload)) {
          params.onMessage(payload);
        }
      } catch {
        // ignore malformed payloads
      }
    };

    socket.onerror = () => {
      params.onConnected?.(false);
      params.onError?.("WebSocket connection failed.");
    };

    socket.onclose = () => {
      params.onConnected?.(false);
      if (disposed) return;
      params.onRetry?.(attempt, retryMs);
      timer = window.setTimeout(connect, retryMs);
      retryMs = Math.min(5000, Math.round(retryMs * 1.8));
    };
  };

  connect();

  return () => {
    disposed = true;
    if (timer) window.clearTimeout(timer);
    if (socket) socket.close();
  };
}
