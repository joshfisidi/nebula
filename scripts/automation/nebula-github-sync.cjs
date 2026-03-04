#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..', '..');
const DEFAULT_BRANCH = process.env.NEBULA_PUSH_BRANCH || 'agent';
const REMOTE_NAME = process.env.NEBULA_REMOTE_NAME || 'nebula';
const VISIBILITY = process.env.NEBULA_REPO_VISIBILITY || 'private'; // private|public

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    shell: false,
    env: process.env,
    ...opts,
  });
  return res;
}

function runOk(cmd, args, opts = {}) {
  const res = run(cmd, args, opts);
  if ((res.status ?? 1) !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} failed: ${res.stderr || res.stdout || res.status}`);
  }
  return (res.stdout || '').trim();
}

function hasChanges() {
  const res = run('git', ['status', '--porcelain']);
  if ((res.status ?? 1) !== 0) return false;
  return Boolean((res.stdout || '').trim());
}

function ensureCleanSafetyBoundaries() {
  const forbidden = [
    /^\.openclaw\//,
    /^\.env(\.|$)/,
    /\.pem$/,
    /\.key$/,
    /credentials/i,
  ];
  const tracked = runOk('git', ['ls-files']).split('\n').filter(Boolean);
  const bad = tracked.filter((f) => forbidden.some((rx) => rx.test(f)));
  if (bad.length) {
    throw new Error(`Refusing to push: forbidden tracked files detected -> ${bad.join(', ')}`);
  }
}

function ensureRemote(owner, repo) {
  const repoId = `${owner}/${repo}`;
  const view = run('gh', ['repo', 'view', repoId, '--json', 'nameWithOwner']);
  const exists = (view.status ?? 1) === 0;

  if (!exists) {
    const createArgs = ['repo', 'create', repoId, `--${VISIBILITY}`, '--source', '.', '--remote', REMOTE_NAME];
    const created = run('gh', createArgs);
    if ((created.status ?? 1) !== 0) {
      throw new Error(`Failed to create repo ${repoId}: ${created.stderr || created.stdout}`);
    }
  } else {
    const urlSsh = `git@github.com:${repoId}.git`;
    const remotes = runOk('git', ['remote']).split('\n').filter(Boolean);
    if (!remotes.includes(REMOTE_NAME)) {
      runOk('git', ['remote', 'add', REMOTE_NAME, urlSsh]);
    } else {
      runOk('git', ['remote', 'set-url', REMOTE_NAME, urlSsh]);
    }
  }

  return repoId;
}

function main() {
  const inside = run('git', ['rev-parse', '--is-inside-work-tree']);
  if ((inside.status ?? 1) !== 0 || !(inside.stdout || '').includes('true')) {
    throw new Error('Not inside a git repository');
  }

  const owner = (process.env.NEBULA_GH_OWNER || runOk('gh', ['api', 'user', '--jq', '.login'])).trim();
  const repo = (process.env.NEBULA_GH_REPO || path.basename(repoRoot)).trim();
  const branch = DEFAULT_BRANCH;

  ensureCleanSafetyBoundaries();
  const repoId = ensureRemote(owner, repo);

  if (!hasChanges()) {
    const out = {
      status: 'noop',
      reason: 'no_changes',
      repo: repoId,
      remote: REMOTE_NAME,
      branch,
      timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(out, null, 2));
    return;
  }

  runOk('git', ['add', '-A']);

  const cached = run('git', ['diff', '--cached', '--quiet']);
  if ((cached.status ?? 1) === 0) {
    const out = {
      status: 'noop',
      reason: 'nothing_staged',
      repo: repoId,
      remote: REMOTE_NAME,
      branch,
      timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(out, null, 2));
    return;
  }

  const stamp = new Date().toISOString().replace('T', ' ').replace('Z', ' UTC');
  const msg = `chore(nebula): hourly maintainer sync ${stamp}`;
  runOk('git', ['commit', '-m', msg]);

  const push = run('git', ['push', '-u', REMOTE_NAME, `HEAD:${branch}`]);
  if ((push.status ?? 1) !== 0) {
    throw new Error(`Push failed: ${push.stderr || push.stdout}`);
  }

  const out = {
    status: 'pushed',
    repo: repoId,
    remote: REMOTE_NAME,
    branch,
    timestamp: new Date().toISOString(),
  };
  console.log(JSON.stringify(out, null, 2));
}

try {
  main();
} catch (err) {
  console.error(JSON.stringify({ status: 'error', error: String(err.message || err) }, null, 2));
  process.exit(1);
}
