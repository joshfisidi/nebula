# Qwen3-TTS Local-First Integration — Implementation Plan (Queue-Ready)

Date: 2026-03-07
Scope: Nebula + OpenClaw local runtime
Inputs used:
- `full_audit.md`
- `full_audit_core.md`
- `docs/NEBULA_AUDIT.md`
- OpenClaw host structure audit (`~/.openclaw/*`)

---

## 0) Audit Summary (what this plan is anchored to)

### A. Runtime facts confirmed
- OpenClaw gateway and cron exist in host-level `~/.openclaw`.
- Nebula repo already has automation structure:
  - `scripts/automation/nebula-cron-run.cjs`
  - `scripts/automation/nebula-health-check.cjs`
- This means adding a TTS router should follow the same pattern: script-first, cron-triggerable, stateful logs.

### B. Integration boundaries from audits
- `docs/NEBULA_AUDIT.md` recommends reusing existing runtime/event architecture and adding new control layers without replacing core architecture.
- We will keep current messaging and cron orchestration intact and insert TTS as a pluggable routing layer.

### C. Host structure constraints
- Persisted config belongs in `~/.openclaw/openclaw.json` (global runtime config).
- Project-specific operational state should live under project-local `.openclaw/state/...`.

---

## 1) Target Architecture (Local-first + Fallback)

Primary path:
1. Text input arrives from agent workflow.
2. `scripts/tts-router/route-tts.cjs` selects provider:
   - Primary: Qwen3-TTS local
   - Fallback: ElevenLabs API
3. Audio file produced into local outbox.
4. Message layer sends audio to destination channel.
5. Metrics and run status recorded.

Key principle:
- API fallback exists, but default preference is local execution.

---

## 2) Files to Add/Use

### New
- `scripts/tts-router/route-tts.cjs`
- `scripts/tts-router/providers/qwen-local.cjs`
- `scripts/tts-router/providers/eleven-fallback.cjs`
- `scripts/tts-router/config.template.json`
- `scripts/tts-router/README.md`

### State/logs
- `.openclaw/state/tts/metrics.jsonl`
- `.openclaw/state/tts/last-status.json`
- `.openclaw/state/tts/out/` (generated audio)
- `.openclaw/state/tts/tmp/` (temporary files)

---

## 3) Provider Routing Policy

### Default routing
- `provider = qwen-local`
- timeout: 12s
- retries: 1
- on error/timeout => fallback to ElevenLabs

### Hard safety policy
- max chars per utterance: 900
- reject empty/whitespace-only text
- split long messages into chunks
- no voice-clone-of-others mode enabled by default

### Output policy
- return metadata object:
  - `provider`
  - `latency_ms`
  - `audio_path`
  - `fallback_used`
  - `error_code` (if any)

---

## 4) Queue Execution Phases

Use these phases with queue-engine in order.

### Phase A — Scaffolding
- [ ] Create `scripts/tts-router/` structure
- [ ] Add config template + README
- [ ] Add state directory bootstrap logic
- [ ] Add npm script aliases

Done criteria:
- `node scripts/tts-router/route-tts.cjs --help` works

### Phase B — Local Qwen provider
- [ ] Implement `qwen-local.cjs`
- [ ] Support model mode switch (`fast`/`quality`)
- [ ] Write output audio + metadata

Done criteria:
- local prompt generates playable audio file

### Phase C — Eleven fallback provider
- [ ] Implement `eleven-fallback.cjs`
- [ ] Trigger on Qwen timeout/failure
- [ ] Preserve same return schema as local provider

Done criteria:
- forced local failure produces Eleven output cleanly

### Phase D — Router + Metrics
- [ ] Finalize routing logic in `route-tts.cjs`
- [ ] Append metrics to `metrics.jsonl`
- [ ] Update `last-status.json`

Done criteria:
- 10 test runs produce structured metrics with mixed provider outcomes

### Phase E — OpenClaw wiring
- [ ] Add/adjust cron/system-event hook to call router
- [ ] Route resulting audio through message send flow
- [ ] Keep failures silent or channel-scoped per policy

Done criteria:
- end-to-end auto voice response succeeds from cron/system-event

### Phase F — Hardening
- [ ] Add cleanup job for stale temp/out files
- [ ] Add rate limits/backoff
- [ ] Add failure budget and circuit-breaker (avoid retry storms)

Done criteria:
- stable behavior under repeated failures and long uptime

---

## 5) Queue Task Template (copy into queue payload)

```json
{
  "project": "nebula",
  "workflow": "qwen_tts_local_first",
  "phases": [
    "A_scaffolding",
    "B_qwen_local",
    "C_eleven_fallback",
    "D_router_metrics",
    "E_openclaw_wiring",
    "F_hardening"
  ],
  "stopOnFailure": true,
  "acceptance": {
    "local_generation": true,
    "fallback_generation": true,
    "metrics_written": true,
    "cron_path_verified": true
  }
}
```

---

## 6) Acceptance Checklist (final gate)

- [ ] Local Qwen path works with fast mode
- [ ] Optional quality mode works
- [ ] Eleven fallback works automatically
- [ ] Metrics are persisted and readable
- [ ] Output cleanup job prevents storage drift
- [ ] Cron-triggered flow sends voice payload correctly

---

## 7) Notes for Execution Discipline

- Keep implementation scriptable/idempotent.
- Do not block existing Nebula automation loops.
- Prefer additive changes over replacing known-good workflow.
- If ambiguity appears, freeze and log decision in `IMPLEMENTATION.md` before proceeding.
