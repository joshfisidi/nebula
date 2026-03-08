# PROJECT: FILE UNIVERSE V1

## Real-Time 3D Codebase Topology Engine

### Objective
Build a fully working real-time 3D file-system universe visualizer with isolated project spaces, folder clusters, file orbits, elastic import webs, live WebSocket ingestion, and GPU-forward rendering.

### Stack
- Next.js 14 (App Router)
- TypeScript strict mode
- three / @react-three/fiber / drei
- zustand
- leva
- postprocessing
- Node 22 server
- chokidar + ws
- Custom Verlet physics and spring constraints

### Deliverables
- Monorepo workspace (`apps/*`, `packages/*`)
- Protocol types package
- Physics package
- WebSocket file watcher server
- Next.js web app with:
  - Instanced node rendering
  - Tube-based elastic connectors
  - Edge particle flow
  - Orbital soft physics
  - Live event ingestion

### Run
1. `cd apps/server && pnpm build && pnpm start`
2. `cd apps/web && pnpm dev`
3. Open `http://localhost:3000`

### Acceptance
- New file creation emits node/edge events and spawns live geometry
- Parent link behaves elastically
- Node settles into stable orbit
- Edge particles flow continuously
- Projects stay spatially separated
- Baseline remains smooth near 1000 nodes
