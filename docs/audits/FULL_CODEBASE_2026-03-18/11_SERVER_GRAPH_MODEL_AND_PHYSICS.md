# Server Graph Model And Physics

## Core files

- `apps/server/src/universe/graph.ts`
- `apps/server/src/universe/layout.ts`
- `apps/server/src/universe/physicsConfig.ts`

## Graph model

`graph.ts` is the canonical model of the observed workspace.

It maintains:

- nodes
- edges
- child relationships
- anchors
- runtime layout state
- physics metadata

## Current semantic level

The active graph is primarily structural.

- directories and files are first-class graph nodes
- edges mainly encode containment
- node metadata drives layout and motion behavior

The model is useful and live, but it is not yet a fully semantic code-intelligence graph.

## Important graph operations

- `upsertPath`
  Add or update file-system paths into the graph
- `removePath`
  Remove paths and their relationships
- `snapshot`
  Produce the transfer form sent to the browser
- `tick`
  Advance motion and settle the runtime state

## Layout anchors

`layout.ts` provides deterministic anchor placement. The design appears radial and depth-aware rather than arbitrary. That gives the graph a stable spine before client-side layout and animation do their work.

## Physics tuning

`physicsConfig.ts` reads environment-driven constants so the server can adjust spring, drift, or charge-like behavior without rewriting the core model.

## Strengths

- canonical graph logic is centralized in one file
- structural graphing is easy to reason about
- deterministic anchors reduce layout chaos

## Risks

- `graph.ts` is large enough that new semantic responsibilities could overload it quickly
- semantic edge growth will require explicit ownership boundaries
- current graph richness may be overestimated by product language if readers assume import or symbol-level intelligence is already active everywhere

## Practical takeaway

The graph model is solid for a file-system-first live mind map. It provides a stable base for future semantic layers, but those layers are not free and should be added as clear modules rather than by accreting more logic into `graph.ts`.

