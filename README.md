# Nebula

Real-time 3D file-system universe visualizer.

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
- **Lattice mode (default):** deterministic tree-like layout for readability.
- **3D mode:** presentation pass with depth and space aesthetics.
- **Controls panel:** project toggles, search, type filters, collapse/expand tree, node inspector.

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
