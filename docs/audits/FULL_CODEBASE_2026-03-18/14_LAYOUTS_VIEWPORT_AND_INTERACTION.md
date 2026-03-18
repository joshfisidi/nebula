# Layouts, Viewport, And Interaction

## Core files

- `apps/web/src/universe/layoutEngines.ts`
- `apps/web/src/universe/ReactFlowOverlay.tsx`
- `apps/web/src/universe/visibility.ts`

## Layout choices

The browser supports multiple layout strategies rather than one fixed layout.

Observed engines include:

- `living-lite`
- `radial`
- `dagre`
- `elk`

`layoutEngines.ts` selects between them based on graph shape and runtime needs.

## Why multiple layouts matter

Nebula is trying to feel like a living mind map, but not every graph state benefits from the same solver.

- radial structure helps with hierarchy
- dagre helps with layered readability
- ELK helps with denser graph organization
- living-lite preserves animated, dynamic behavior

## Viewport logic

The renderer manages viewport movement as part of the experience:

- fit on initial load
- focus on selected areas
- preserve context during interaction changes where possible

This is not only visual polish. It controls how understandable the graph feels.

## Interaction surface

The product supports:

- project selection
- focus state
- node expansion and collapse
- search
- mobile-responsive rails and controls

The visible graph is therefore a function of state and intent, not just raw data.

## Hidden-segment policy

`visibility.ts` filters naturally low-value path segments like generated output and large dependency trees. That reduces clutter and protects layout budgets.

## Practical takeaway

Nebula's layout system is intentionally hybrid. It is not trying to solve the entire graph with one universal answer. That is a good fit for a live developer-graph tool, but it depends on disciplined state and layout ownership to stay predictable.

