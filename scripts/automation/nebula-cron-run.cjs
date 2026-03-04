#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..', '..');
const stateDir = path.join(repoRoot, '.openclaw', 'state', 'nebula');
const runsDir = path.join(stateDir, 'runs');
fs.mkdirSync(runsDir, { recursive: true });

const runId = new Date().toISOString().replace(/[:.]/g, '-');
const logPath = path.join(runsDir, `${runId}.log`);
const statusPath = path.join(stateDir, 'status.json');

function writeStatus(status) {
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
}

const startedAt = new Date();
const cmd = 'npm';
const args = ['run', 'nebula:hourly'];
const result = spawnSync(cmd, args, {
  cwd: repoRoot,
  encoding: 'utf8',
  shell: false,
  env: process.env,
});

const combined = [result.stdout || '', result.stderr || ''].join('\n').trim();
fs.writeFileSync(logPath, combined + '\n');

const finishedAt = new Date();
const ok = (result.status ?? 1) === 0;

const status = {
  run_id: runId,
  started_at: startedAt.toISOString(),
  finished_at: finishedAt.toISOString(),
  duration_ms: finishedAt.getTime() - startedAt.getTime(),
  stage: 'hourly-maintainer',
  status: ok ? 'success' : 'failure',
  exit_code: result.status ?? 1,
  summary: ok ? 'nebula:hourly completed successfully' : 'nebula:hourly failed',
  log_path: logPath,
  last_successful_run_at: ok
    ? finishedAt.toISOString()
    : (() => {
        try {
          const prev = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
          return prev.last_successful_run_at || null;
        } catch {
          return null;
        }
      })(),
};

writeStatus(status);

console.log(JSON.stringify(status, null, 2));
if (!ok) process.exit(result.status ?? 1);
