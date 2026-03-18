# Boot And Runtime Flow

## End-to-end flow

Nebula's main product loop is straightforward once reduced to runtime stages.

1. The Next.js app loads `apps/web/app/page.tsx`
2. That page dynamically imports `apps/web/src/universe/UniverseFlowScene.tsx`
3. `UniverseFlowScene.tsx` tries to establish local-access context through `apps/web/src/universe/sourceApi.ts`
4. If local access is available, the app selects a local source and requests a snapshot
5. If not, the app can fall back to the local Node server source list and source selection APIs
6. The server starts or reuses the universe runtime for the selected root
7. `apps/server/src/universe/watch.ts` watches the file tree
8. `apps/server/src/universe/graph.ts` mutates the canonical graph
9. `apps/server/src/universe/patchQueue.ts` batches changes
10. `apps/server/src/universe/ws.ts` broadcasts snapshots or patch messages
11. `apps/web/src/universe/UniverseLiveProvider.tsx` receives those messages
12. `apps/web/src/universe/graphStore.ts` applies state updates
13. `apps/web/src/universe/ReactFlowOverlay.tsx` renders and animates the visible graph

## Browser responsibilities

- choose and present the source-access path
- keep UI and control-room state
- compress and schedule incoming patch application
- choose a layout engine
- filter visibility based on focus, project selection, search, and expansion
- animate toward new positions

## Server responsibilities

- validate allowed roots
- own the selected source root
- watch the file system
- maintain canonical nodes and edges
- run physics ticks and anchor logic
- batch and broadcast updates

## What the current graph represents

The active server graph is primarily a file-system containment graph.

- nodes are directories or files
- edges are mainly `contains` relationships
- physics metadata affects motion and grouping
- richer semantic edges like imports are not the main active server model today

## Why the runtime feels live

The "live graph" behavior is created by multiple layers working together:

- file watching detects structural changes
- the server canonicalizes and coalesces those changes
- the patch queue reduces message churn
- the client compresses patch ops and applies them on a frame loop
- layout and motion interpolation smooth visible transitions

## Important observation

The product story is "hyper-aware local graph," but the implementation is still rooted in a disciplined file-system graph pipeline. That is a strength, because the core loop is understandable and performant, but it also means future semantic richness must be added deliberately instead of assumed.

