# Nebula Full Codebase Audit

Date: 2026-03-18
Repo root: `/Users/josh/.openclaw/workspace/projects/nebula`
Audit scope: application code, shared packages, scripts, tests, docs surface, automation, and operational drift

## What this pack is

This folder is a structured audit of the current Nebula codebase. It is intentionally split into 20 focused markdown files instead of one monolith so the repo can be navigated by subsystem and operating concern.

## Audit methods used

- `rg` and `rg --files` for fast symbol, route, and dependency discovery
- `find`, `tree`, and directory manifests for topology mapping
- `wc -l` and file counts for hotspot identification
- targeted `sed` and file inspection for runtime-path tracing
- `fzf`-ready path lists and the existing audit scripts for repo traversal patterns
- review of existing docs under `docs/audits`, `docs/queue`, and `docs/upgrades`
- targeted comparison of product copy, tests, mocks, and automation output

## High-level numbers

- Raw files under `apps`, `packages`, `scripts`, `tests`, and `tools`: about `1369`
- That raw number is dominated by maintainer evidence `.txt` files, not core product code
- Core code and script surface in `ts`, `tsx`, `cjs`, `mjs`, and `sh`: about `69` files
- Largest current files:
- `apps/web/src/universe/ControlRoomShell.tsx` at about `1013` lines
- `apps/web/src/universe/ReactFlowOverlay.tsx` at about `789` lines
- `tools/nebula-maintainer/src/main.ts` at about `764` lines
- `apps/server/src/universe/graph.ts` at about `529` lines
- `apps/server/src/index.ts` at about `510` lines

## Top-level conclusion

Nebula is a local-first developer graph system built around one main product path:

- the web app boots a local access flow
- a local server or local agent selects a repo root
- the server watches that root and maintains a live file-system graph
- patch and snapshot data stream to the browser over WebSocket
- the browser lays out, filters, animates, and interacts with that graph through React Flow

The codebase is coherent around that path, but there are clear signs of drift:

- current runtime protocol is duplicated across the web and server while `@nebula/protocol` lags behind
- `UniverseFlowScene.tsx` is the live route, but `UniverseScene.tsx` remains in tree, in typecheck includes, and in maintainer references
- e2e tests still contain older `Nebula Sync` and `local bridge` wording after the local-access-first product shift
- the maintainer tooling has both TypeScript and CommonJS versions with overlapping logic

## File map

1. `01_INDEX.md`
   This file. Overview, methods, counts, and navigation.
2. `02_REPO_TOPOLOGY.md`
   Repo shape, subsystem ownership, and code-size hotspots.
3. `03_AUDIT_METHODS_AND_TOOLING.md`
   Search, grep, fzf, parse, and audit workflow used for this review.
4. `04_BOOT_AND_RUNTIME_FLOW.md`
   End-to-end product flow from page boot to live graph updates.
5. `05_WEB_APP_ENTRY_AND_SHELL.md`
   Next.js entry, layout, shell, and control-room UI.
6. `06_WEB_GRAPH_RENDER_PIPELINE.md`
   React Flow rendering, visibility, summary nodes, and display model.
7. `07_WEB_STATE_PATCH_AND_ANIMATION.md`
   Zustand store, patch compression, queueing, and client motion.
8. `08_WEB_SOURCE_ACCESS_AND_LOCAL_AGENT.md`
   Local-access-first source selection and local agent integration.
9. `09_SERVER_HTTP_API.md`
   HTTP source routes, root validation, and boot behavior.
10. `10_SERVER_RUNTIME_AND_PATCH_QUEUE.md`
    Runtime orchestration, WebSocket broadcast, and patch queue design.
11. `11_SERVER_GRAPH_MODEL_AND_PHYSICS.md`
    Graph model, physics metadata, anchors, and snapshots.
12. `12_SERVER_WATCHING_IGNORE_AND_IDS.md`
    Watchers, ignore rules, path normalization, and identifiers.
13. `13_SHARED_PACKAGES_PROTOCOL_AND_PHYSICS.md`
    Shared packages, current usage, and drift boundaries.
14. `14_LAYOUTS_VIEWPORT_AND_INTERACTION.md`
    Layout engines, viewport logic, and interaction constraints.
15. `15_SCRIPTS_AUDIT_AND_DEV_STACK.md`
    Audit scripts, dev stack scripts, and operational wrappers.
16. `16_AUTOMATION_QUEUE_AND_MAINTAINER.md`
    Hourly maintainer, queue files, evidence generation, and cron flow.
17. `17_TESTS_MOCKS_AND_QUALITY_GATES.md`
    E2E tests, mocks, quality gates, and test drift.
18. `18_DOCS_EXAMPLES_AND_KNOWLEDGE_SURFACE.md`
    Docs layout, examples, and institutional knowledge surface.
19. `19_DEPENDENCIES_CONFIG_AND_ENV.md`
    Workspace config, package scripts, environment variables, and exposure.
20. `20_RISKS_DRIFT_AND_RECOMMENDATIONS.md`
    Consolidated risk register and recommended next moves.

## Suggested reading order

- Read `04_BOOT_AND_RUNTIME_FLOW.md` first to understand the whole product loop
- Read `05` through `14` to understand the runtime implementation
- Read `16`, `17`, and `20` for operational and maintenance risk

