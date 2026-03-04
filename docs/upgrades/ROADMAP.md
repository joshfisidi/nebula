# Nebula Production Roadmap (Flat Deterministic Visualization)

## Phase 0 — Stabilize Orchestrator (now)
- Deterministic RALPH hourly loop with lock + idempotent hour artifact.
- Persistent queue (`.openclaw/state/nebula/queue.json`) with priority/age ordering.
- Safe patch cap per run (`NEBULA_MAX_PATCHES_PER_RUN`) and rollback notes.
- Hardening checks shift from brittle global commands to workspace-aware validation.

## Phase 1 — Core Quality Gates
- Add lint/test infrastructure package-by-package (starting with `@nebula/web` and `@nebula/server`).
- Keep `@nebula/web` production build green on every hourly run.
- Introduce deterministic smoke tests for graph ingestion and websocket sync.
- Track validation reliability trends in upgrade artifacts.

## Phase 2 — Flat Runtime Performance + Legibility
- Enforce deterministic 2D layout rules with zero-jitter patch application.
- Add performance budget checks (node count, edge count, frame time, interaction latency).
- Add progressive detail strategy (labels/details by zoom threshold).
- Add controlled feature flags for expensive visual effects.

## Phase 3 — Product Hardening
- Add crash-safe state persistence for viewport, filters, and graph expansion.
- Add controlled import-edge indexing with bounded worker concurrency.
- Add replayable event logs for graph updates (debug + audit).
- Add release checklist and versioned upgrade protocol.

## Phase 4 — Operator-Grade Operations
- Queue categories: reliability, performance, UX, debt, security.
- Dead-letter triage workflow and auto-suggested remediation tasks.
- Artifact compaction and historical trend dashboards.
- Scheduled canary checks and rollback playbooks for all high-impact patches.

## Definition of Done for “Production-Grade Baseline”
- Hourly maintainer runs without overlap, remains idempotent, and never uses destructive git ops.
- Queue reliably processes safe diffs with bounded retries and dead-letter capture.
- Hardening outputs are signalful (pass/fail/skip with reasons).
- Architecture and roadmap docs remain aligned with implemented checks.
