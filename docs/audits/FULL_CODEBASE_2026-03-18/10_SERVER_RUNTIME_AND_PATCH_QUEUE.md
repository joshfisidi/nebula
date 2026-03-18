# Server Runtime And Patch Queue

## Core files

- `apps/server/src/universe/index.ts`
- `apps/server/src/universe/ws.ts`
- `apps/server/src/universe/patchQueue.ts`

## Runtime orchestration

`apps/server/src/universe/index.ts` assembles the live runtime:

- create the graph
- start the WebSocket server
- start file watching
- run physics ticks
- enqueue patch operations for broadcast

This is the server-side heart of the product.

## Patch queue role

`patchQueue.ts` exists to prevent the runtime from broadcasting every raw mutation as an immediate client event.

It does three important things:

- batch operations over a short flush window
- compress or coalesce event bursts
- fall back to full snapshot broadcast when a patch burst becomes too large

That is exactly the kind of queue system a live graph product needs.

## WebSocket behavior

`ws.ts` exposes the live event stream to browsers.

Observed behavior:

- new connections get a snapshot
- ongoing changes are broadcast as patch messages
- the transport is simple and local-runtime oriented

## Physics cadence

`index.ts` uses a physics tick interval from `NEBULA_PHYSICS_TICK_MS`, defaulting to about `60ms`. This makes physics predictable and configurable without hard-coding motion rate into the browser.

## Runtime strengths

- canonical graph state stays on the server
- queueing absorbs watcher burst noise
- snapshot fallback gives the runtime a practical reset valve

## Runtime risks

- queue thresholds are tuning-sensitive and should be documented with measured behavior
- debugging cross-layer update issues now requires reasoning about watcher events, graph ops, queue compression, and client flush behavior
- WebSocket and HTTP are closely tied to one local runtime instance

## Practical takeaway

Nebula is no longer just "watch files and blast updates." It now has a real server-side streaming discipline. That moves it closer to a durable live-runtime architecture instead of a prototype event pump.

