# Scripts, Audit, And Dev Stack

## Scripts reviewed

- `scripts/audit_core.sh`
- `scripts/audit_full.sh`
- `scripts/dev/stack.cjs`
- `scripts/automation/nebula-audit-snapshot.sh`
- `scripts/automation/nebula-pre-upgrade-audit.sh`
- `scripts/automation/nebula-health-check.cjs`
- `scripts/automation/nebula-north-star-gate.sh`
- `scripts/automation/nebula-github-sync.cjs`
- `scripts/automation/nebula-cron-run.cjs`

## Audit scripts

The repo already knows how to audit itself.

The audit scripts gather:

- directory trees
- manifests
- grep captures
- docs evidence
- upstream text snapshots via `lynx`

This audit pack is therefore extending an existing repo habit, not introducing a new one.

## Dev stack

`scripts/dev/stack.cjs` is the local multiprocess wrapper for starting and stopping the Nebula stack. It writes state and logs and treats the server as the "Universe WebSocket server," which matches the current runtime architecture.

## Pre-upgrade behavior

`nebula-pre-upgrade-audit.sh` can auto-create a baseline commit when the worktree is dirty and strict mode is not enabled. That is operationally useful, but it also means automation may mutate git state unless explicitly constrained.

## North-star gate

`nebula-north-star-gate.sh` acts like a policy gate. It checks for:

- no legacy 3D artifacts
- expected focus and layout wiring
- node-ceiling constraints
- web typecheck success

That suggests the repo has already lived through at least one major rendering transition and is enforcing the new direction by script.

## Health and cron

The health and cron scripts coordinate audit freshness, maintainer runs, and background upkeep. This is more operational infrastructure than many small repos maintain.

## Practical takeaway

Nebula is not just an app repo. It is an app repo with an internal maintenance and audit discipline. That is a strength, but it also means script review matters almost as much as app review.

