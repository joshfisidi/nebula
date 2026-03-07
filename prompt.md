# Nebula Refactor Target Prompt

## Product goal
Rebuild Nebula’s web runtime as a clean, production-oriented 2D graph experience using **Next.js + React Flow + shadcn + Tailwind CSS**, while preserving the existing live websocket snapshot/patch data pipeline.

The active app route must no longer depend on React Three Fiber or Three.js scene rendering.

## Architecture constraints
1. **No active 3D runtime path**
   - `app/page.tsx` and all active UI code paths must not import or render R3F/Three components.
   - Existing 3D files can remain temporarily only if fully deactivated (no imports from active route).
2. **Rendering standardization**
   - Graph rendering must be React Flow-first.
   - Control surfaces (selection/search/filter/panels) must use existing shadcn-style UI primitives and Tailwind utility classes.
3. **Data flow preservation**
   - Keep `UniverseLiveProvider` websocket behavior intact.
   - Preserve snapshot/patch application via `graphStore` (`applySnapshot`, `applyPatch`).
4. **Practical project operations**
   - Project selection, search, and filtering must remain available and usable for large trees.
5. **Determinism and safety**
   - Keep changes deterministic and production-friendly.
   - Avoid destructive git operations.

## Acceptance criteria
- The home route renders a React Flow graph UI without any `@react-three/*` or `three` active imports.
- Live websocket connect state and graph updates still function through existing store/provider logic.
- Project Viewer panel remains functional for:
  - project selection (single/all/none),
  - search over file/folder names/paths,
  - tree navigation and collapse/expand.
- Build and typecheck pass.
- README reflects the current React Flow-first runtime (no stale “3D mode” startup claims).

## Migration steps
1. Audit and inventory all R3F/Three dependencies and files.
2. Replace active route renderer:
   - move from `UniverseScene` (Canvas + 3D systems) to a 2D React Flow scene component.
3. Create a dedicated React Flow scene wrapper that composes:
   - `UniverseLiveProvider`
   - status HUD
   - `ProjectViewerPanel`
   - `ReactFlowOverlay` (always enabled)
4. Update `app/page.tsx` to load the new 2D runtime component.
5. Remove R3F/Three packages from `apps/web/package.json` and refresh lockfile.
6. Keep 3D implementation files deprecated/inert (or removed if low risk), ensuring zero active imports.
7. Update README with React Flow-first description and startup behavior.
8. Run validation (`pnpm --filter @nebula/web typecheck`, `pnpm --filter @nebula/web build`) and fix any errors.

## Done definition
The refactor is done when:
- Active runtime is 2D-only and React Flow-based.
- 3D dependencies are removed from the web package dependency graph.
- websocket snapshot/patch graph updates remain live.
- project selection/search/filter UX remains practical.
- README documentation aligns with implemented behavior.
- build + typecheck pass.
- Changes are committed and pushed to branch `agent` (not `main`).
