# Audit Methods And Tooling

## Goal

The user asked for a deep grep, parse, and advanced audit rather than a shallow walkthrough. This review used fast repo-indexing tools first, then narrowed to source-level tracing.

## Tools confirmed available

- `rg`
- `fzf`
- `tree`
- `lynx`

## Core audit workflow

1. Build a topology map with `find`, `tree`, and `rg --files`
2. Count file types and identify hotspots with `wc -l`
3. Use `rg -n` to trace entry points, route handlers, and subsystem names
4. Inspect the highest-leverage files directly
5. Compare product copy to tests and mocks to detect drift
6. Review existing audit and automation scripts to understand the repo's own observability patterns

## Grep and parse patterns used

- entry point tracing
  Search for exported scene components, route handlers, and runtime constructors
- API tracing
  Search for route paths like `/source`, `/health`, `/bridge`, and permission endpoints
- state tracing
  Search for snapshot, patch, queue, and WebSocket event flow
- layout tracing
  Search for `dagre`, `elk`, `radial`, and overlay visibility logic
- ops tracing
  Search for audit scripts, queue files, cron jobs, and maintainer artifacts

## Why `fzf` matters here

`fzf` is not the source of truth, but it is useful for audit navigation when the repo contains many similarly named docs and evidence outputs. The existing scripts already produce path lists that are effectively `fzf`-ready. That suggests the repo's audit practice is optimized for fast operator browsing, not only for static reports.

## Existing repo audit machinery

The codebase already contains scripts that perform partial audit work:

- `scripts/audit_core.sh`
- `scripts/audit_full.sh`
- `scripts/automation/nebula-audit-snapshot.sh`

Those scripts use many of the same primitives:

- tree snapshots
- file manifests
- grep captures
- `lynx` text dumps of upstream docs

## Limits of this audit

- This audit is source-based and topology-based, not a full runtime trace with live app interaction
- It does not claim that every retained file is active in production
- Where code or naming suggests drift, the wording uses `current`, `legacy`, or `appears` deliberately

## Practical result

The combination of `rg`, directory manifests, hotspot counts, runtime path tracing, and test-copy comparison was sufficient to build a full codebase picture without brute-force reading every file line by line.

