# Nebula Queue Implementation Plan

Date: 2026-03-04
Session: `session-20260304-080636`

## Objective
Implement a lattice-first interactive file/project viewer with optional 3D presentation mode.

## Phase 1 — Stable Lattice + Pan/Zoom + Selection
- Add deterministic lattice coordinates per node:
  - x: sibling lane
  - y: depth lane
  - z: low-amplitude depth/type offset (for 3D readability)
- Keep OrbitControls for pan/zoom/orbit camera movement.
- Add selected node state + basic selection behavior.

## Phase 2 — Collapse/Expand + Search + Type Filters
- Add UI + state:
  - `collapsedNodeIds`
  - `searchQuery`
  - `visibleTypes`
- Compute `isNodeVisible` using:
  - selected project
  - type filters
  - search match on basename/path
  - ancestor collapse checks
- Apply visibility logic to nodes, edges, labels.

## Phase 3 — Inspector + File Actions + Polish
- Add inspector panel bound to selected node:
  - id, type, project, path, createdAt
- Actions:
  - copy path
  - copy relative name (lightweight)
- Add compact styling and clear hover/selection colors.

## Phase 4 — 2D/3D Presentation Toggle
- Add `viewMode: "lattice" | "presentation3d"`
- Lattice mode:
  - reduced z-depth, flatter camera, higher readability
- Presentation mode:
  - larger depth spacing, richer lighting/FX
- Both modes consume same graph state/events.

## Verification
- Typecheck web + server
- Manual check:
  - multi-project selection
  - search/filter/collapse behavior
  - inspector + selection
  - mode toggle
