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
- WebSocket server on `:4001`
- Next.js web app on `:3000` (bound to `0.0.0.0`)
- Default watch root: current `nebula/` repository (single-project mode)
- Default graph mode: parent tree edges (import edges disabled by default)

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
- `NEXT_PUBLIC_NEBULA_WS_URL` when set, otherwise
- `ws://<current-browser-host>:4001`

So opening the web app over Tailscale uses your Tailscale IP automatically.

## Watch Target
By default, `pnpm dev` watches the current Nebula repository (`./`) and visualizes existing files/folders as a view-only graph.
Set `WATCH_DIR` to watch a different path:

```bash
WATCH_DIR=/absolute/path/to/repos node dist/index.js
```

Enable separate universes per first-level subdirectory:

```bash
WATCH_DIR=/absolute/path/to/repos MULTI_PROJECT_ROOT=1 node dist/index.js
```

Enable import dependency edges:

```bash
WATCH_DIR=/absolute/path ENABLE_IMPORT_EDGES=1 node dist/index.js
```
