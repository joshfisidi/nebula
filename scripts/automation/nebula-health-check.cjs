#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..', '..');
const statusPath = path.join(repoRoot, '.openclaw', 'state', 'nebula', 'status.json');
const latestDocPath = path.join(repoRoot, 'docs', 'upgrades', 'LATEST.md');

const maxStaleMinutes = Number(process.env.NEBULA_MAX_STALE_MINUTES || '130');
const maxStaleMs = maxStaleMinutes * 60 * 1000;
const now = Date.now();

function fail(reason, extra = {}) {
  const payload = {
    status: 'failure',
    reason,
    checked_at: new Date().toISOString(),
    ...extra,
  };
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
}

if (!fs.existsSync(statusPath)) {
  fail('missing_status_file', { statusPath });
}

let status;
try {
  status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
} catch (error) {
  fail('invalid_status_file', { statusPath, error: String(error) });
}

if (status.status !== 'success') {
  fail('last_run_not_successful', { status });
}

if (!status.last_successful_run_at) {
  fail('missing_last_successful_run_at', { status });
}

const lastSuccessMs = Date.parse(status.last_successful_run_at);
if (!Number.isFinite(lastSuccessMs)) {
  fail('invalid_last_successful_run_at', { value: status.last_successful_run_at });
}

const staleMs = now - lastSuccessMs;
if (staleMs > maxStaleMs) {
  fail('stale_last_successful_run', {
    stale_minutes: Math.floor(staleMs / 60000),
    max_stale_minutes: maxStaleMinutes,
    last_successful_run_at: status.last_successful_run_at,
  });
}

if (!fs.existsSync(latestDocPath)) {
  fail('missing_latest_upgrade_doc', { latestDocPath });
}

const latestStat = fs.statSync(latestDocPath);
const latestAgeMs = now - latestStat.mtimeMs;
if (latestAgeMs > maxStaleMs) {
  fail('latest_doc_too_old', {
    latestDocPath,
    latest_doc_age_minutes: Math.floor(latestAgeMs / 60000),
    max_stale_minutes: maxStaleMinutes,
  });
}

console.log(
  JSON.stringify(
    {
      status: 'ok',
      checked_at: new Date().toISOString(),
      max_stale_minutes: maxStaleMinutes,
      last_successful_run_at: status.last_successful_run_at,
      latest_doc_mtime: new Date(latestStat.mtimeMs).toISOString(),
    },
    null,
    2,
  ),
);
