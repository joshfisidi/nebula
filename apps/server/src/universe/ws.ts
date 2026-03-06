import { WebSocket, WebSocketServer } from "ws";
import type { UniverseMessage, UniversePatchMessage, UniverseSnapshotMessage } from "./types.js";

export interface UniverseWs {
  broadcastPatch: (ops: UniversePatchMessage["ops"]) => void;
  sendSnapshotToAll: (snapshot: UniverseSnapshotMessage) => void;
  close: () => Promise<void>;
}

export function startUniverseWsServer(port: number, getSnapshot: () => UniverseSnapshotMessage): UniverseWs {
  const wss = new WebSocketServer({ port, host: "0.0.0.0" });
  const clients = new Set<WebSocket>();

  wss.on("connection", (socket) => {
    clients.add(socket);
    send(socket, getSnapshot());
    socket.on("close", () => clients.delete(socket));
  });

  return {
    broadcastPatch(ops) {
      if (ops.length === 0) return;
      const msg: UniverseMessage = { type: "patch", t: Date.now(), ops };
      for (const client of clients) send(client, msg);
    },
    sendSnapshotToAll(snapshot) {
      for (const client of clients) send(client, snapshot);
    },
    async close() {
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) client.close();
      }
      await new Promise<void>((resolve) => wss.close(() => resolve()));
    }
  };
}

function send(socket: WebSocket, msg: UniverseMessage): void {
  if (socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify(msg));
}
