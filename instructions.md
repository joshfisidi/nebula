# Nebula Automation Instructions (for Codex)

## Objective
Implement a pragmatic, production-oriented automation flow for Nebula using OpenClaw as the orchestrator.

## Core Rules
1. Keep OpenClaw/Gateway persistent.
2. Run Nebula maintenance/build via OpenClaw cron (no long-lived Nebula PID required).
3. Add a cron health check that alerts if build/deploy fails.
4. Only use a process supervisor for Nebula when a true 24/7 dev server is required.

---

## Implementation Plan

### 1) Keep OpenClaw/Gateway Persistent
- Ensure OpenClaw Gateway is installed and managed as a service where possible.
- Confirm it is reachable and stable.
- Treat Gateway uptime as the control-plane prerequisite for all automation.

Validation:
- `openclaw status`
- `openclaw gateway status`

Success criteria:
- Gateway is reachable consistently.
- Cron jobs can execute on schedule.

---

### 2) Nebula via OpenClaw Cron (No Long-Lived PID)
Create cron tasks that perform:
- Repo sync/update
- Dependency install (as needed)
- Lint/test/build pipeline
- Optional deploy step (if branch/environment rules pass)

Design requirement:
- Each run must be self-contained and idempotent.
- No assumption of a previously running Nebula process.

Each run must produce:
- Exit code
- Timestamp
- Structured log output
- Clear success/failure summary

---

### 3) Health Check + Alerting Cron
Add a separate scheduled health-check cron that verifies:
- Last build status
- Last deploy status
- Last successful run timestamp
- Staleness threshold (e.g., alert if no success within expected interval)

On failure/staleness:
- Send alert to configured channel (Discord/Telegram).
- Include actionable error context:
  - failing stage
  - command
  - relevant log snippet
  - timestamp

---

### 4) Optional 24/7 Dev Server Path
Only if explicitly needed, run a persistent dev server under a supervisor (LaunchAgent/PM2/systemd).

Requirements for persistent mode:
- Auto-restart on crash
- Auto-start on reboot/login
- Separate logs from cron build logs
- Health probe endpoint/port checks

Do not conflate this with cron build automation.

---

## Observability Requirements
Track and persist these fields per run:
- `run_id`
- `started_at`
- `finished_at`
- `duration_ms`
- `stage` (sync/install/test/build/deploy/healthcheck)
- `status` (success|failure)
- `exit_code`
- `summary`
- `log_path`

Additionally maintain:
- `last_successful_build_at`
- `last_successful_deploy_at`

Preferred storage:
- `workspace/state/nebula/` (JSON + logs)

---

## Acceptance Criteria
Implementation is complete when:
- OpenClaw/Gateway remains persistent and operational.
- Nebula build/maintenance runs from cron without relying on a fixed PID.
- Health-check cron sends alerts on failure or stale success windows.
- Team can inspect latest result + last success timestamp quickly.
- Optional persistent dev mode is isolated and only enabled when requested.

---

## Anti-Pattern to Avoid
- Do **not** optimize for “one PID must always be running” for cron workflows.
- Optimize for:
  - reliable scheduled execution
  - deterministic outcomes
  - visible logs
  - fast failure detection
  - recoverable reruns
