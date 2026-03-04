# Nebula Audit: View-Only File/Folder Visualization

Date: 2026-03-04

## Goal
Render and visualize files/folders that already exist on disk. The web app is a viewer, not an editor/creator.

## User-Visible Symptoms
- Web console noise: `WebSocket connection to 'ws://localhost:4001/' failed: WebSocket is closed before the connection is established.`
- Viewport can look empty when ingest is incomplete or scan scope is unexpected.

## Grep/Code Findings
- WebSocket lifecycle logic:
  - `apps/web/src/universe/UniverseScene.tsx` has:
    - `socket.onerror -> target?.close()` (forces close during connect failure)
    - cleanup path always `socket.close()` even during `CONNECTING` state
- Watcher ingestion coverage:
  - `apps/server/src/index.ts` listens to `watcher.on("add")` only.
  - No `addDir` handler, so empty folders are never represented.
- Hidden-parent path filter bug:
  - Watch ignore regex applied to full absolute paths (`/(^|[/\\])\../`), which matches hidden ancestors like `.openclaw`.
  - Result: all files under `/.../.openclaw/...` can be skipped.
- Scope defaults:
  - `scripts/dev/start.sh` defaults to `WATCH_DIR` parent projects directory and multi-project mode, which can delay/complicate expected "current project tree" visualization.

## Root Causes
1. WebSocket connect/teardown behavior can produce premature-close warnings during fast refresh or failed handshakes.
2. Folder visualization is derived mostly from file parent chains; empty directories are omitted.
3. Hidden-ancestor regex on absolute paths can block ingestion entirely.
4. Default watch target is broader than "this project", which can produce confusing empty/slow initial visuals.

## Fix Plan
1. Make websocket handling tolerant:
   - Remove forced close in `onerror`.
   - In cleanup, only close when socket is `OPEN`.
2. Add explicit directory ingestion:
   - Add `handleDirectory(absPath)` and subscribe to `watcher.on("addDir")`.
   - Ensure project node and nested folder nodes are created from directory events.
3. Replace absolute-path regex ignore with root-relative ignore function:
   - Ignore dot-directories/files only inside watch root, not hidden parents above root.
4. Add deterministic startup crawl:
   - Recursively scan existing tree on boot and ingest files/folders before live deltas.
5. Align startup defaults with view-only current project behavior:
   - Default `WATCH_DIR` to repo root.
   - Default `MULTI_PROJECT_ROOT=0` (single project unless overridden).
6. Update overlay copy to avoid telling users to create files for visibility.

## Acceptance Criteria
- Initial scene renders existing files and folders (including empty folders) without requiring user-created files.
- No forced-close websocket warning path in app code.
- `pnpm dev` defaults to current repo tree visualization.
- Hidden-parent watch roots (e.g. `.openclaw/...`) ingest correctly.
