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
const upgradeBriefDir = path.join(repoRoot, 'upgrades', 'briefs');
fs.mkdirSync(upgradeBriefDir, { recursive: true });

function writeStatus(status) {
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
}

function runStep(name, cmd, args, extraEnv = {}) {
  const result = spawnSync(cmd, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    shell: false,
    env: { ...process.env, ...extraEnv },
  });

  return {
    name,
    cmd: `${cmd} ${args.join(' ')}`,
    exit_code: result.status ?? 1,
    ok: (result.status ?? 1) === 0,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  };
}

function bestEffortNotify(summary) {
  // If OpenClaw CLI is available, wake the main session with a concise event.
  // This enables channel briefs without spending active chat tokens each hour.
  try {
    spawnSync(
      'openclaw',
      ['system', 'event', '--text', summary, '--mode', 'now'],
      { cwd: repoRoot, encoding: 'utf8', shell: false, env: process.env },
    );
  } catch {
    // best effort only
  }
}

function newestHourlyArtifact() {
  const hourlyDir = path.join(repoRoot, 'docs', 'upgrades', 'hourly');
  try {
    const files = fs
      .readdirSync(hourlyDir)
      .filter((f) => /^UPGRADE_.*\.md$/.test(f))
      .sort();
    if (!files.length) return null;
    return path.join(hourlyDir, files[files.length - 1]);
  } catch {
    return null;
  }
}

function writeOperatorBrief({ status, steps, logPath }) {
  const stamp = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto', hour12: false }).replace(/[,: ]/g, '_');
  const briefPath = path.join(upgradeBriefDir, `BRIEF_${stamp}_ET.md`);
  const artifact = newestHourlyArtifact();
  const lines = [
    '# Nebula Hourly Brief',
    '',
    `- run_id: ${status.run_id}`,
    `- status: ${status.status}`,
    `- started_at: ${status.started_at}`,
    `- finished_at: ${status.finished_at}`,
    `- duration_ms: ${status.duration_ms}`,
    `- artifact: ${artifact ? path.relative(repoRoot, artifact) : '(none)'}`,
    `- log: ${path.relative(repoRoot, logPath)}`,
    '',
    '## Steps',
    ...steps.map((s) => `- ${s.name}: ${s.ok ? 'ok' : 'fail'} (exit ${s.exit_code})`),
    '',
  ];
  fs.writeFileSync(briefPath, lines.join('\n'));
  return briefPath;
}

const startedAt = new Date();
const steps = [];

steps.push(runStep('hourly_upgrade', 'npm', ['run', 'nebula:hourly']));

const upgradeOk = steps[0].ok;
if (upgradeOk) {
  // Keep pushes on main by default for this repo.
  steps.push(
    runStep('github_sync', 'npm', ['run', 'nebula:github:sync'], {
      NEBULA_PUSH_BRANCH: process.env.NEBULA_PUSH_BRANCH || 'main',
    }),
  );
}

const combined = steps
  .map((step) => {
    const lines = [
      `=== ${step.name} ===`,
      `cmd: ${step.cmd}`,
      `ok: ${step.ok}`,
      `exit: ${step.exit_code}`,
    ];
    if (step.stdout) lines.push(step.stdout);
    if (step.stderr) lines.push(step.stderr);
    return lines.join('\n');
  })
  .join('\n\n');

fs.writeFileSync(logPath, combined + '\n');

const finishedAt = new Date();
const ok = steps.every((s) => s.ok);

const status = {
  run_id: runId,
  started_at: startedAt.toISOString(),
  finished_at: finishedAt.toISOString(),
  duration_ms: finishedAt.getTime() - startedAt.getTime(),
  stage: 'hourly-maintainer+github-sync',
  status: ok ? 'success' : 'failure',
  exit_code: ok ? 0 : 1,
  summary: ok
    ? 'nebula:hourly + github sync completed successfully'
    : 'nebula hourly pipeline failed (see steps)',
  log_path: logPath,
  steps: steps.map((s) => ({
    name: s.name,
    ok: s.ok,
    exit_code: s.exit_code,
  })),
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

const briefPath = writeOperatorBrief({ status, steps: status.steps, logPath });
status.brief_path = briefPath;
writeStatus(status);

const brief = ok
  ? `Nebula hourly ✅ upgrade+push finished (${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} ET) | brief: ${path.relative(repoRoot, briefPath)}`
  : `Nebula hourly ❌ failed (${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} ET). Check ${path.relative(repoRoot, logPath)} | brief: ${path.relative(repoRoot, briefPath)}`;
bestEffortNotify(brief);

console.log(JSON.stringify(status, null, 2));
if (!ok) process.exit(1);
