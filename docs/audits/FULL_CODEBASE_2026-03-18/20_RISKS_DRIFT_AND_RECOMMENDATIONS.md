# Risks, Drift, And Recommendations

## Highest-confidence findings

### 1. Protocol drift exists

`packages/protocol/src/types.ts` does not appear to fully own the active snapshot and patch protocol that the browser and server are using today. That means the repo has a shared protocol package and an app-local runtime protocol at the same time.

Recommendation:

- make `@nebula/protocol` authoritative for the active snapshot and patch shapes
- or explicitly document why the runtime protocol remains app-local

### 2. Product-copy drift exists in tests

The app has moved toward a local-access-first product story, but `tests/e2e/nebula-ui.spec.ts` still references older strings such as `Connect Nebula Sync`, `Local bridge is feeding the graph stage.`, and `Nebula Sync active`.

Recommendation:

- update E2E assertions and mocks to the current local-access vocabulary
- add a small contract test around local-access endpoint naming during the migration window

### 3. Legacy or parallel scene residue remains

`apps/web/app/page.tsx` boots `UniverseFlowScene.tsx`, but `UniverseScene.tsx` still remains in tree, in typecheck includes, and in maintainer references. This may be harmless, but it is a real source of confusion.

Recommendation:

- decide whether `UniverseScene.tsx` is still strategic, compatibility-only, or removable
- update maintainer references accordingly

### 4. Large UI files are current complexity hotspots

`ControlRoomShell.tsx` and `ReactFlowOverlay.tsx` each carry a lot of product and runtime behavior. They are valid implementations, but they are also the most likely future regression hotspots.

Recommendation:

- split by concern only after current product direction stabilizes
- keep copy-only changes and runtime-state changes covered by the same tests

### 5. Maintainer duplication exists

`tools/nebula-maintainer/src/main.ts` and `main.cjs` overlap materially. Carrying two operationally important entrypoints raises maintenance cost and drift risk.

Recommendation:

- pick one authoritative implementation path
- reduce the other to a thin compatibility wrapper or remove it

### 6. Local-runtime exposure should remain explicit

The server and WebSocket infrastructure bind in a LAN-friendly way, and the product is intentionally local-first. That is workable, but it should stay explicit in docs and diagnostics.

Recommendation:

- document the intended trust model and exposure assumptions
- keep allowed-root enforcement visible in operator-facing diagnostics

## What is working well

- the repo has a coherent end-to-end graph pipeline
- the server owns canonical state
- the browser owns layout and interaction
- queueing now exists on both server and client
- automation and audit practices are stronger than average for a repo of this size

## Recommended next actions

1. Finish the local-access endpoint migration in the local agent and remove old bridge fallback once stable
2. Update tests and mocks to the new product language
3. Unify the active runtime protocol into `@nebula/protocol` or document the intentional split
4. Decide the fate of `UniverseScene.tsx` and remove ambiguity
5. Consolidate maintainer implementation paths
6. Add one operator-facing doc that explains the local trust and exposure model in plain terms

## Final summary

Nebula is already a credible live local graph system for developers. The main work left is not inventing the core runtime. It is reducing drift so the code, tests, automation, and product language all describe the same system.

