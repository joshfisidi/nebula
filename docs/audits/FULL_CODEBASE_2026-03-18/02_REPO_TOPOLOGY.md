# Repo Topology

## Main shape

The repo is organized around a single product family rather than multiple unrelated apps.

- `apps/web`
  Next.js frontend and the main operator experience
- `apps/server`
  Local HTTP and WebSocket runtime that watches a selected repo root
- `packages/physics`
  Shared graph physics implementation
- `packages/protocol`
  Shared protocol package, currently narrower than the active runtime protocol
- `tests/e2e`
  Playwright end-to-end coverage and helpers
- `scripts`
  Audit, automation, and local dev wrappers
- `tools/nebula-maintainer`
  Hourly repo maintenance, queueing, evidence capture, and upgrade docs
- `docs`
  Historical audits, queue docs, upgrades, examples, and project notes

## Observed file distribution

- `apps/web/src` contains about `21` source files
- `apps/server/src` contains about `11` source files
- `tools/nebula-maintainer/src` contains about `4` source files, but they are large
- `packages/protocol/src` contains `2` files
- `packages/physics/src` contains `2` files

The raw repo count is inflated by generated or retained evidence files under `tools/nebula-maintainer/out` and `docs/audits/lynx`.

## Current architectural center

The center of gravity is the `universe` subsystem.

- browser rendering lives in `apps/web/src/universe/*`
- server runtime and graph logic live in `apps/server/src/universe/*`
- physics helpers live in `packages/physics/src/*`

This is not a generic monorepo. It is effectively a graph-runtime product with supporting automation around it.

## Complexity hotspots

- `apps/web/src/universe/ControlRoomShell.tsx`
  The main control-room shell, status chrome, source modal, and panel logic
- `apps/web/src/universe/ReactFlowOverlay.tsx`
  Core graph rendering, visibility, summary-node creation, and viewport control
- `apps/server/src/universe/graph.ts`
  Canonical graph model and snapshot production
- `apps/server/src/index.ts`
  Source selection API and runtime bootstrap
- `tools/nebula-maintainer/src/main.ts`
  Queueing, evidence, patch generation, and maintenance orchestration

## Architectural boundaries that are clear

- the server owns file-system watching and canonical graph state
- the browser owns layout selection, filtering, interaction, and animation
- the local agent or localhost bridge owns local-access handoff
- scripts and tools own automation and audit generation

## Architectural boundaries that are blurred

- `UniverseScene.tsx` remains in tree even though `apps/web/app/page.tsx` boots `UniverseFlowScene.tsx`
- `@nebula/protocol` does not fully describe the active web/server snapshot and patch exchange
- the maintainer tool references some historical paths and keeps both TypeScript and CommonJS versions alive

## Practical takeaway

Nebula has a strong mainline architecture, but it also has a visible history of rapid iteration. The audit should be read with that in mind: some code is current runtime infrastructure, and some code is retained compatibility or migration residue.

