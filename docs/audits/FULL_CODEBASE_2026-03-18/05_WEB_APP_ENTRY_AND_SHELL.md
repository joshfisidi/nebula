# Web App Entry And Shell

## Entry points

- `apps/web/app/page.tsx`
  Loads `UniverseFlowScene` dynamically with SSR disabled
- `apps/web/app/layout.tsx`
  Declares metadata, imports global CSS, and sets a dark color scheme
- `apps/web/app/preview/control-room/page.tsx`
  Preview route used for design capture and control-room presentation work

## Primary UI shell

`apps/web/src/universe/ControlRoomShell.tsx` is the main application shell.

It is responsible for:

- source selection modal
- runtime status presentation
- explorer and inspector rails
- graph toolbar actions
- responsive rail behavior for smaller screens
- local-access-first messaging

At about `1013` lines, it is the largest app file and a current complexity hotspot.

## Product-language state

The shell has already been shifted toward the new product framing:

- primary path is "local access" or "live local workspace"
- the local agent is treated as an implementation detail
- runtime server mode remains the fallback path

This matches the intended demotion of the older "connect the bridge" idea.

## Shell strengths

- centralizes high-value control-room behavior in one place
- aligns runtime state with operator-visible status
- supports multiple interaction surfaces without fragmenting the app

## Shell risks

- large surface area raises regression risk for copy changes and control-state changes
- status, source workflow, mobile rails, and graph controls are tightly coupled
- changes to onboarding copy can easily drift from tests if not updated together

## Notable supporting components

- `apps/web/src/universe/ProjectViewerPanel.tsx`
  Alternative tree-oriented view of the graph
- `apps/web/src/components/ui/*`
  Reusable UI primitives such as buttons, cards, badges, and inputs

## Practical takeaway

The shell is effective, but it is carrying product onboarding, runtime diagnostics, and navigation chrome all at once. It is a natural candidate for future split-by-concern refactoring after current product direction stabilizes.

