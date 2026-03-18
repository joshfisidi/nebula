# Server HTTP API

## Main file

`apps/server/src/index.ts` is the local server's entry point and primary HTTP surface.

## Core responsibilities

- read environment configuration
- derive allowed roots
- validate source selections
- expose health and source routes
- start and stop the universe runtime for the selected root

## Observed routes

- `GET /health`
  Health check endpoint
- `GET /source/current`
  Returns the currently selected root state
- `GET /source/list`
  Lists available roots
- `POST /source/select`
  Selects a root and starts the runtime

## Security and safety model

The server enforces allowed-root logic before accepting a source selection.

That matters because the app is explicitly local-first, and source selection is effectively a file-system trust decision. The server validates directory existence and root membership before booting the runtime.

## Exposure model

The server binds on `0.0.0.0`. That is convenient for LAN-device testing and local dev flexibility, but it means operational safety depends on host environment and allowed-root validation rather than loopback-only isolation.

## Runtime ownership

The HTTP process is also the runtime owner.

- it does not only serve metadata
- it controls the canonical active source
- it creates the graph runtime used by the WebSocket layer

## Practical strengths

- route surface is small and easy to reason about
- source selection is explicit rather than implicit
- allowed-root enforcement is a real boundary

## Practical risks

- `0.0.0.0` exposure deserves explicit documentation and local-network awareness
- source-selection logic and runtime bootstrap are coupled in one file
- richer future APIs could make this file too central if not split by concern

