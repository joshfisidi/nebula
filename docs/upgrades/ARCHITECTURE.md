# Nebula Target Architecture (Production 3D Mind-Map)

## System Overview
- **Web Client (`@nebula/web`, Next.js App Router):** renders the 3D mind-map with R3F/Three and operator controls.
- **Realtime Backend (`@nebula/server`):** file-system watcher + websocket broadcaster for graph deltas.
- **Shared Packages (`@nebula/protocol`, `@nebula/physics`):** typed graph contracts and simulation/layout primitives.
- **Maintainer (`tools/nebula-maintainer`):** deterministic hourly RALPH loop for evidence → backlog → localized safe patching → hardening.

## Runtime Standards (Next.js + R3F/Three)
1. **Deterministic rendering pipeline**
   - No unbounded per-frame object allocation.
   - Stable keys and memoized geometry/material instances.
   - Controlled post-processing toggles via feature flags.
2. **Performance budget discipline**
   - Prefer instancing/batching for repeated primitives.
   - Avoid CPU-heavy work in render loops; move to cached selectors/workers.
   - Target frame-budgeted updates under heavy node counts.
3. **Production web defaults**
   - `reactStrictMode: true`.
   - `poweredByHeader: false`.
   - Keep `next build` green on every hardening pass.

## Orchestrator Architecture (RALPH)
1. **Retrieve**
   - Pull evidence snapshots from configured URLs into `tools/nebula-maintainer/out`.
   - Hash captured evidence for traceability.
2. **Analyze**
   - Convert evidence + repo state into prioritized backlog entries with:
     - severity
     - impact
     - effort
     - localization targets
3. **Localize**
   - Map each backlog task to exact files before patching.
4. **Patch**
   - Enqueue tasks into persistent queue file.
   - Deterministic dequeue policy: priority then age.
   - Apply at most `NEBULA_MAX_PATCHES_PER_RUN` safe diffs per run.
   - Record rollback notes for every executed patch.
5. **Harden**
   - Workspace-aware checks (lint/test/typecheck/build) with skip reasons.
   - Classify each check as pass/fail/skip and report output.

## State + Locking
- **Run lock:** `.openclaw/locks/nebula-hourly.lock` prevents overlap.
- **Queue lock:** `.openclaw/locks/nebula-queue.lock` ensures lock-safe queue mutations.
- **Queue state:** `.openclaw/state/nebula/queue.json` (pending + dead-letter + attempts).
- **Hardening skip map:** `.openclaw/state/nebula/hardening-skip-map.json`.

## Safety Rules
- No destructive git operations from orchestrator.
- All writes are local repo/state files and atomically persisted.
- Patches are intentionally small, reversible, and documented with rollback steps.
- Hourly output is immutable by hour id and mirrored to `docs/upgrades/LATEST.md`.
