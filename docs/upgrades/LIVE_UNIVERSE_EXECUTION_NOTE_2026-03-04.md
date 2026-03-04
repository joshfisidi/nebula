# Live Universe Execution Note — 2026-03-04

Reference spec: `/Users/josh/.openclaw/media/inbound/a7797f63-7bc8-4af7-91f6-ea6abcb74fb2.txt`

Implemented a deterministic live filesystem universe pipeline with server-canonical layout/patch state and passive client rendering:

- **Server boundaries** under `apps/server/src/universe/*`:
  - typed protocol (`types.ts`)
  - stable ids/path normalization (`ids.ts`)
  - Nebula ignore policy (`ignore.ts`)
  - deterministic concentric radial layout (`layout.ts`)
  - canonical graph + snapshot/patch ops (`graph.ts`)
  - chokidar watcher with structured logging (`watch.ts`)
  - websocket snapshot+patch broadcaster (`ws.ts`)
  - runtime wiring (`index.ts`)
- **Web boundaries** under `apps/web/src/universe/*`:
  - ws reconnect client (`wsClient.ts`)
  - typed patch guards (`patch.ts`)
  - canonical graph store + patch applier (`graphStore.ts`)
  - live provider bridge (`UniverseLiveProvider.tsx`)
  - scene/systems switched to store-fed instanced nodes + batched edge geometry.

North star alignment:
- **Reliability:** typed contract, snapshot+patch protocol, structured logs, deterministic IDs.
- **Performance:** instanced node meshes, single batched edge geometry, passive render loop.
- **Usability:** stable, non-jittering symmetry-first layout, live updates from FS events.
- **Maintainability:** isolated modules with typed boundaries and low coupling.

Visual reference alignment:
- clear radial clusters, semantic dir/file styling, restrained bloom/contrast.
- avoids style-heavy effects that would break interaction/performance budgets.
