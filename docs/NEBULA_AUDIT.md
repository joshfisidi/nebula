# Nebula Audit (Lattice Pivot)

Date: 2026-03-04
Scope: `apps/server`, `apps/web`, `packages/protocol`, startup scripts.

## Current State

## 1) Ingestion Pipeline (Good Foundation)
- `apps/server/src/index.ts` emits websocket events for:
  - `node.create`
  - `edge.create` (PARENT + IMPORT)
- Multi-project support exists through `WATCH_DIR` + `MULTI_PROJECT_ROOT=1`.
- Existing model (`packages/protocol/src/types.ts`) is sufficient for lattice graph rendering.

## 2) Rendering Pipeline (Needs UX Realignment)
- `apps/web/src/universe/store.ts` currently biases toward orbital/cosmic dynamics.
- Great visual motion, but lower information density for file-tree reading.
- Existing project visibility exists (`selectedProjectIds`) but not full tree intelligence controls.

## 3) Interaction Gaps vs Requested Product
Requested target: 2D lattice-first modern project viewer, optional 3D presentation.
Missing or partial:
- deterministic lattice layout as default
- explicit collapse/expand behavior at folder/project level
- search-driven visibility pipeline
- explicit type filtering (project/folder/file)
- robust selection + inspector workflow
- mode toggle between lattice 2D and presentation 3D

## 4) Runtime/Dev Observations
- Startup scripts are now unified and mostly stable.
- Previous update-depth crash source identified in unstable Zustand selector usage.
- No backend blocker for lattice pivot; this is primarily frontend store/render/control work.

## Design Decision
- Keep websocket event model unchanged.
- Reuse existing node/edge runtime maps.
- Introduce lattice-first deterministic placement and UI filters in store.
- Keep 3D as presentation layer toggle (camera/depth/styling), not separate data architecture.
