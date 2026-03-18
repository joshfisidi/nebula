# Shared Packages, Protocol, And Physics

## Packages reviewed

- `packages/protocol/src/types.ts`
- `packages/physics/src/verlet.ts`

## `@nebula/physics`

The physics package contains the heavier simulation logic used by the graph runtime.

`verlet.ts` includes:

- spring constraints
- charge-like repulsion
- collision solving
- gravity or drift terms
- anchor constraints
- hybrid graph-field integration behavior

This package is one of the most specialized technical assets in the repo.

## `@nebula/protocol`

The protocol package defines `UniverseNode`, `UniverseEdge`, and `UniverseEvent` types. It is useful, but it does not appear to fully own the current browser/server snapshot and patch protocol used under `apps/web/src/universe/*` and `apps/server/src/universe/*`.

## Main shared-package finding

There is protocol drift.

- shared package exists
- active runtime protocol also exists locally in app code
- the two are related, but not clearly identical

That raises the maintenance cost of every future event-shape or node-shape change.

## Strengths

- physics code is cleanly packaged rather than hidden inside app files
- the repo has an explicit place for shared protocol definitions

## Risks

- duplicated protocol concepts across package and app code
- future migrations may touch three places instead of one
- consumers may assume `@nebula/protocol` is authoritative when it is only partially authoritative today

## Practical takeaway

The shared-package story is half-complete. Physics is properly extracted. Protocol is only partially extracted. The next clean architecture move would be to make the active snapshot and patch protocol fully shared or explicitly document why it remains app-local.

