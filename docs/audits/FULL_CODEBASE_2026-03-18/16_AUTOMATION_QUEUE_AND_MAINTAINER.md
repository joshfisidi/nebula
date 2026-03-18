# Automation Queue And Maintainer

## Core area

`tools/nebula-maintainer` is a substantial subsystem, not a tiny helper.

Key files:

- `tools/nebula-maintainer/src/main.ts`
- `tools/nebula-maintainer/src/main.cjs`
- `tools/nebula-maintainer/src/config.ts`

## What it does

The maintainer runs hourly-oriented repo upkeep and evidence generation.

Observed responsibilities include:

- queue state management
- safe patch generation and application limits
- evidence collection
- upgrade doc output
- dead-letter handling
- lock-file coordination

## Queue system

The maintainer stores queue state under `.openclaw/state/nebula/queue.json` and related operational paths. This is one of the places where the repo already implements persistent state rather than only ephemeral CLI behavior.

## Duplication finding

There are both TypeScript and CommonJS maintainer entrypoints with overlapping logic.

That raises several risks:

- duplicated fixes
- drift between operational paths
- unclear source of truth for future maintainer changes

## Historical residue

The maintainer still references historical files such as `UniverseScene.tsx` and other older visualization files in some of its signal or task logic. That does not prove breakage, but it does show that the maintainer's mental model is broader than the current primary route.

## Evidence-first operations

The use of `lynx`, audit snapshots, queue state, and upgrade docs shows that the maintainer is trying to create an inspectable maintenance loop rather than silent mutation. That is a strong pattern.

## Practical takeaway

This toolchain is valuable, but it is also one of the repo's larger sources of operational complexity. If Nebula continues to evolve quickly, the maintainer should probably converge on one implementation path instead of carrying both TS and CJS versions.

