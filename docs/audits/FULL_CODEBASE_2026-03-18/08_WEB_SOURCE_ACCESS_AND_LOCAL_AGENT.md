# Web Source Access And Local Agent

## Main file

`apps/web/src/universe/sourceApi.ts` is the browser-side access layer for both the local agent path and the localhost server path.

## Current product direction

The code now reflects a local-access-first model.

- permission-oriented method names are present
- local folder access is the primary user-facing concept
- the older bridge naming remains only as compatibility fallback

## Key browser APIs exposed

- `fetchSourceCurrent`
- `fetchSourceList`
- `selectSource`
- `fetchLocalAccessSession`
- `fetchLocalAccessSourceList`
- `selectLocalAccessSource`
- `requestLocalFolderAccess`
- `fetchLocalAccessSnapshot`

## Compatibility behavior

The browser prefers newer permission-style endpoints first, then falls back to older bridge-style endpoints where needed. This is a sensible migration strategy because it avoids breaking the existing local agent while the Swift side catches up.

## `UniverseFlowScene.tsx`

`apps/web/src/universe/UniverseFlowScene.tsx` is the main orchestration layer for:

- bootstrapping local access
- deciding whether to use local access or runtime server mode
- converting local snapshots into runtime graph state
- handling error copy and fallback logic

## Important product observation

The local agent remains necessary for the best local-first experience, but it is now framed correctly:

- the user thinks in terms of granting folder access
- the implementation thinks in terms of a localhost capability provider

That is the right separation.

## Risks and drift

- the browser still carries compatibility with old bridge endpoints, so the migration is not yet complete
- stale tests still reference the old naming
- future semantic expansion will need clear endpoint contracts, not only copy updates

## Practical takeaway

This subsystem is already the clearest sign that Nebula is moving from "connect a helper app" to "grant local workspace access." The remaining work is to finish the endpoint migration on the agent side and remove compatibility debt once the new contract is stable.

