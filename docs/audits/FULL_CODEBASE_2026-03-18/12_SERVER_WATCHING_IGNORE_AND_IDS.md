# Server Watching, Ignore Rules, And IDs

## Core files

- `apps/server/src/universe/watch.ts`
- `apps/server/src/universe/ignore.ts`
- `apps/server/src/universe/ids.ts`

## Watching model

`watch.ts` uses `chokidar` to subscribe to file-system events for the selected root.

Observed event classes:

- add
- change
- addDir
- unlink
- unlinkDir

The watcher uses `awaitWriteFinish`, which is an important choice for avoiding noisy partial-write churn.

## Ignore model

`ignore.ts` blocks common low-value or dangerous paths, including:

- `node_modules`
- `.git`
- `.next`
- cache directories
- `.tsbuildinfo`
- `.openclaw` operational paths such as locks, logs, runs, and queue results

It also loads project-level ignore files:

- `.gitignore`
- `.ignore`
- `.nebulaignore`

That means Nebula can inherit repo-local intent instead of imposing only hard-coded rules.

## Identifier model

`ids.ts` normalizes paths and derives node and edge IDs through hashing. This gives the graph a stable identifier scheme without exposing raw path strings as the primary identity system.

## Strengths

- watcher events are constrained by meaningful ignore policy
- local project ignore files are respected
- stable IDs make patching and diffing feasible

## Risks

- ignore policy is always a product choice, not only a technical choice, and it should remain visible to operators
- if hashed identity and normalized-path logic drift across layers, patch correctness can break in subtle ways
- a more semantic graph will eventually need identity rules beyond simple path-derived hashing

## Practical takeaway

This subsystem is easy to underestimate. In practice, good watching, ignore policy, and stable IDs are what make the rest of the graph pipeline trustworthy.

