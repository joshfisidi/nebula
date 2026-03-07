# Nebula

Real-time file-system graph visualizer (React Flow-first).

## Requirements
- Node.js 22+
- pnpm

## Install
```bash
pnpm install
```

## Run (single command)
```bash
pnpm dev
```

This starts both apps with hot reload:
- Universe WebSocket server on `:18891`
- Next.js web app on `:3000` (bound to `0.0.0.0`)
- Default watch root: current `nebula/` repository
- Layout: deterministic concentric/radial symmetry (server canonical)

Open:
- Local: `http://localhost:3000`
- Tailscale/LAN: `http://<device-ip>:3000` (example: `http://100.88.154.26:3000`)

UI highlights:
- **React Flow runtime (default):** deterministic 2D graph rendering with pan/zoom.
- **Live data pipeline:** websocket snapshot/patch updates flow into the graph store in real time.
- **Controls panel:** project selection (single/all/none), search, and collapse/expand tree browsing.

## Run in background (persistent)
```bash
pnpm dev:bg      # start detached
pnpm dev:status  # check status
pnpm dev:stop    # stop
```

Logs are written to `.nebula-dev.log` in repo root.

## WebSocket URL (remote access)
Web app auto-connects to:
- `NEXT_PUBLIC_UNIVERSE_WS` when set, otherwise
- `ws://<current-browser-host>:18891`

Optional split config:
- `NEXT_PUBLIC_UNIVERSE_WS_PORT=18891`

## Watch Target
By default, `pnpm dev` watches the current Nebula repository (`./`) and streams live graph patches.
Set `UNIVERSE_WATCH_ROOT` to watch a different path:

```bash
UNIVERSE_WATCH_ROOT=/absolute/path/to/repos node dist/index.js
```

Set websocket port if needed:

```bash
UNIVERSE_WS_PORT=18891 node dist/index.js
```
