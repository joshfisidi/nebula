# Web Graph Render Pipeline

## Main renderer

`apps/web/src/universe/ReactFlowOverlay.tsx` is the main graph display engine in the browser.

Its responsibilities include:

- converting store state into React Flow nodes and edges
- choosing visible subgraphs
- summarizing collapsed branches
- focusing the viewport
- respecting interaction mode and device constraints
- enforcing interactive-node ceilings

## Visibility model

The renderer does not blindly display the entire graph.

It combines:

- selected projects
- focus state
- expansion state
- search
- hidden-segment rules
- summary-node generation

This is one of the reasons the app can feel manageable even when the underlying graph is larger than the on-screen graph.

## Performance guardrails

The file defines a hard ceiling of about `2500` interactive nodes.

That matters because:

- React Flow interaction cost grows with visible graph size
- layout engine cost grows with graph size
- summary nodes and filtered visibility are doing real safety work, not only UX work

## Related files

- `apps/web/src/universe/visibility.ts`
  Hides naturally low-value path segments such as build output and caches
- `apps/web/src/universe/AnimatedSVGEdge.tsx`
- `apps/web/src/universe/FloatingEdge.tsx`
- `apps/web/src/universe/FloatingConnectionLine.tsx`

## Display pipeline shape

1. store produces canonical browser-side graph state
2. overlay derives the visible working set
3. layout positions are chosen or reused
4. custom edge and node presentation is produced for React Flow
5. viewport control logic reacts to focus or source changes

## Strengths

- visibility is an intentional product system, not an afterthought
- summary-node generation supports dense graphs without immediate collapse into clutter
- the renderer can switch layout behavior depending on scene size and mode

## Risks

- the file is large enough that it likely contains multiple concerns that should eventually split
- bugs in visibility derivation will look like missing data rather than obvious crashes
- viewport logic and layout logic are close enough together to make regressions subtle

## Practical takeaway

Nebula's usability depends heavily on this file. The underlying graph model matters, but operator perception of "smooth live graph intelligence" depends on the overlay deciding what not to show just as much as what to show.

