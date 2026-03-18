# Web State Patch And Animation

## Core files

- `apps/web/src/universe/graphStore.ts`
- `apps/web/src/universe/patch.ts`
- `apps/web/src/universe/UniverseLiveProvider.tsx`
- `apps/web/src/universe/wsClient.ts`

## State model

`graphStore.ts` is the canonical browser-side state layer.

It tracks:

- node and edge maps
- array views for rendering
- selection and focus
- expansion state
- project ownership
- connection status
- layout mode and engine
- client motion state

## Patch handling

The browser no longer treats every message as an immediate full re-render instruction.

Instead it uses:

- patch compression
- frame-based flush scheduling
- motion stepping toward target positions

This is the correct direction for a live graph product. It protects the UI from file-system burstiness and server patch chatter.

## WebSocket lifecycle

`wsClient.ts` manages connection and reconnection behavior. `UniverseLiveProvider.tsx` wraps that transport and coordinates:

- incoming event buffering
- connection-state updates
- flush cadence
- motion stepping

## Snapshot versus patch

The browser supports both:

- full snapshot replacement for initial state or heavy reset cases
- incremental patch operations for steady-state updates

This matches the server-side patch queue design and gives the runtime a practical escape hatch when incremental updates become too noisy.

## Current strengths

- queue-aware client behavior now exists on both sides of the wire
- motion is modeled as interpolation rather than raw snapping
- state concerns are centralized in a real store instead of ad hoc component state

## Current risks

- the browser-side protocol is implemented locally rather than fully through `@nebula/protocol`
- patch correctness bugs can manifest as silent graph skew
- motion state can add debugging complexity because visual position and logical position are not identical at all times

## Practical takeaway

The client state pipeline is already aligned with a "hyper-aware, smooth, live graph" goal. The remaining challenge is consistency and protocol discipline, not the absence of a real streaming model.

