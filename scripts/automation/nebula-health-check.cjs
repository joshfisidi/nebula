#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..', '..');
const statusPath = path.join(repoRoot, '.openclaw', 'state', 'nebula', 'status.json');
const latestDocPath = path.join(repoRoot, 'docs', 'upgrades', 'LATEST.md');
const briefPath = path.join(repoRoot, 'upgrades', 'briefs');

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

const candidateArtifacts = [];

if (fs.existsSync(latestDocPath)) {
  const stat = fs.statSync(latestDocPath);
  candidateArtifacts.push({
    kind: 'latest_doc',
    path: latestDocPath,
    mtimeMs: stat.mtimeMs,
  });
}

if (typeof status.brief_path === 'string' && status.brief_path && fs.existsSync(status.brief_path)) {
  const stat = fs.statSync(status.brief_path);
  candidateArtifacts.push({
    kind: 'brief',
    path: status.brief_path,
    mtimeMs: stat.mtimeMs,
  });
}

if (fs.existsSync(briefPath)) {
  const briefFiles = fs
    .readdirSync(briefPath)
    .filter((name) => /^BRIEF_.*\.md$/.test(name))
    .sort();
  if (briefFiles.length) {
    const newestBrief = path.join(briefPath, briefFiles[briefFiles.length - 1]);
    const stat = fs.statSync(newestBrief);
    candidateArtifacts.push({
      kind: 'latest_brief',
      path: newestBrief,
      mtimeMs: stat.mtimeMs,
    });
  }
}

if (!candidateArtifacts.length) {
  fail('missing_upgrade_artifact', { latestDocPath, briefPath, brief_from_status: status.brief_path || null });
}

candidateArtifacts.sort((a, b) => b.mtimeMs - a.mtimeMs);
const freshestArtifact = candidateArtifacts[0];
const artifactAgeMs = now - freshestArtifact.mtimeMs;
if (artifactAgeMs > maxStaleMs) {
  fail('upgrade_artifact_too_old', {
    artifact_kind: freshestArtifact.kind,
    artifact_path: freshestArtifact.path,
    artifact_age_minutes: Math.floor(artifactAgeMs / 60000),
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
      freshest_artifact_kind: freshestArtifact.kind,
      freshest_artifact_path: freshestArtifact.path,
      freshest_artifact_mtime: new Date(freshestArtifact.mtimeMs).toISOString(),
    },
    null,
    2,
  ),
);
