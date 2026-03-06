import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execSync} from 'node:child_process';
import {
  HARDENING_SKIP_MAP_PATH,
  LATEST_PATH,
  LOCK_PATH,
  MAX_PATCHES_PER_RUN,
  NEBULA_ROOT,
  NORTH_STAR_PATH,
  OUT_DIR,
  OUTPUT_DIR,
  QUEUE_LOCK_PATH,
  QUEUE_MAX_ATTEMPTS,
  QUEUE_PATH,
  RETENTION_DAYS,
  SOURCES_PATH,
  STATE_DIR,
  TZ_LABEL,
} from './config.js';

type Evidence = { title: string; url: string; sha256: string; file: string };

type BacklogTask = {
  id: string;
  title: string;
  kind: 'safe.patch' | 'manual.review';
  priority: number;
  severity: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  files: string[];
  patch?: { type: string; missing?: Array<{workspace: string; packageJson: string; script: string}> };
  rollback: string;
  alignment?: string;
};

type NorthStar = { exists: boolean; text: string; summary: string };

type QueueTask = BacklogTask & { attempts: number; created_at: string; last_error: string | null };

type QueueState = { version: number; items: QueueTask[]; dead_letter: Array<QueueTask & {failed_at: string}> };

const mkdirp = (p: string) => fs.mkdirSync(p, {recursive: true});

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function writeJsonAtomic(file: string, value: unknown) {
  mkdirp(path.dirname(file));
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, file);
}

function withLock<T>(lockPath: string, fn: () => T, lockMessage: string): T {
  try {
    mkdirp(path.dirname(lockPath));
    fs.mkdirSync(lockPath);
  } catch {
    console.log(lockMessage);
    process.exit(0);
  }
  try {
    return fn();
  } finally {
    fs.rmSync(lockPath, {recursive: true, force: true});
  }
}

function hourId(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  return `${y}-${m}-${d}_${h}00_${TZ_LABEL}`;
}

function sh(cmd: string, cwd = NEBULA_ROOT) {
  try {
    return {
      ok: true,
      output: execSync(cmd, {cwd, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8'}).trim(),
      command: cmd,
      cwd,
    };
  } catch (e: any) {
    return {
      ok: false,
      output: String(e?.stdout || e?.stderr || e?.message || 'command failed').trim(),
      command: cmd,
      cwd,
    };
  }
}

function lynxDump(url: string): string {
  return sh(`lynx -dump -nolist ${JSON.stringify(url)}`).output;
}

function hash(s: string) {
  return crypto.createHash('sha256').update(s).digest('hex');
}

function collectEvidence(id: string): Evidence[] {
  mkdirp(OUT_DIR);
  const urls = fs.readFileSync(SOURCES_PATH, 'utf8').split('\n').map((x) => x.trim()).filter(Boolean);
  const evidence: Evidence[] = [];
  for (const url of urls) {
    const text = lynxDump(url);
    const sha = hash(text);
    const slug = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 80);
    const file = path.join(OUT_DIR, `${id}_${slug}.txt`);
    fs.writeFileSync(file, text);
    evidence.push({title: slug, url, sha256: sha, file});
  }
  return evidence;
}

function loadNorthStar(): NorthStar {
  if (!fs.existsSync(NORTH_STAR_PATH)) {
    return {exists: false, text: '', summary: 'Missing docs/upgrades/NORTH_STAR.md'};
  }
  const text = fs.readFileSync(NORTH_STAR_PATH, 'utf8').trim();
  return {
    exists: true,
    text,
    summary: text.split(/\n+/)[0].replace(/^#\s*/, '').trim() || 'Nebula North Star',
  };
}

function alignmentForTask(taskId: string): string {
  const map: Record<string, string> = {
    'hardening.skip-map.refresh': 'Improves reliability + maintainability by making validation outcomes explicit and auditable.',
    'web.next.production-guardrails': 'Improves reliability/performance baseline for production Next.js runtime.',
    'web.r3f.performance-audit': 'Improves performance + usability by targeting render-loop efficiency and graph clarity.',
  };
  return map[taskId] || 'Unmapped alignment rationale';
}

function listWorkspacePackageFiles() {
  const roots = ['apps', 'packages', 'tools'];
  const files: string[] = [];
  for (const root of roots) {
    const absRoot = path.join(NEBULA_ROOT, root);
    if (!fs.existsSync(absRoot)) continue;
    for (const entry of fs.readdirSync(absRoot)) {
      const pkg = path.join(absRoot, entry, 'package.json');
      if (fs.existsSync(pkg)) files.push(pkg);
    }
  }
  return files.sort();
}

function analyzeBacklog(): BacklogTask[] {
  const tasks: BacklogTask[] = [];
  const pkgFiles = listWorkspacePackageFiles();
  const missing: Array<{workspace: string; packageJson: string; script: string}> = [];

  for (const pkgFile of pkgFiles) {
    const pkg = readJson<any>(pkgFile, {});
    const scripts = pkg.scripts || {};
    const rel = path.relative(NEBULA_ROOT, pkgFile);
    if (!scripts.lint) missing.push({workspace: pkg.name || rel, packageJson: rel, script: 'lint'});
    if (!scripts.test) missing.push({workspace: pkg.name || rel, packageJson: rel, script: 'test'});
  }

  if (missing.length > 0) {
    tasks.push({
      id: 'hardening.skip-map.refresh',
      title: 'Refresh hardening skip-map for missing lint/test scripts',
      kind: 'safe.patch',
      priority: 1,
      severity: 'high',
      impact: 'high',
      effort: 'low',
      files: [path.relative(NEBULA_ROOT, HARDENING_SKIP_MAP_PATH)],
      patch: {type: 'hardening-skip-map', missing},
      rollback: `Restore ${path.relative(NEBULA_ROOT, HARDENING_SKIP_MAP_PATH)} from previous JSON snapshot.`,
      alignment: alignmentForTask('hardening.skip-map.refresh'),
    });
  }

  const nextConfigPath = path.join(NEBULA_ROOT, 'apps/web/next.config.mjs');
  if (fs.existsSync(nextConfigPath)) {
    const text = fs.readFileSync(nextConfigPath, 'utf8');
    if (!text.includes('reactStrictMode')) {
      tasks.push({
        id: 'web.next.production-guardrails',
        title: 'Add safe production defaults in Next config',
        kind: 'safe.patch',
        priority: 2,
        severity: 'medium',
        impact: 'medium',
        effort: 'low',
        files: ['apps/web/next.config.mjs'],
        patch: {type: 'next-config-guardrails'},
        rollback: 'Revert added Next.js defaults in apps/web/next.config.mjs.',
        alignment: alignmentForTask('web.next.production-guardrails'),
      });
    }
  }

  tasks.push({
    id: 'web.r3f.performance-audit',
    title: 'Review render-loop allocations and edge rendering strategy',
    kind: 'manual.review',
    priority: 3,
    severity: 'medium',
    impact: 'high',
    effort: 'medium',
    files: ['apps/web/src/universe/ParticleSystem.tsx', 'apps/web/src/universe/EdgeSystem.tsx'],
    rollback: 'Documentation-only backlog task.',
    alignment: alignmentForTask('web.r3f.performance-audit'),
  });

  return tasks;
}

function loadQueue(): QueueState {
  const fallback: QueueState = {version: 1, items: [], dead_letter: []};
  const queue = readJson<QueueState>(QUEUE_PATH, fallback);
  if (!Array.isArray(queue.items)) queue.items = [];
  if (!Array.isArray(queue.dead_letter)) queue.dead_letter = [];
  if (!queue.version) queue.version = 1;
  return queue;
}

function upsertQueueTasks(backlog: BacklogTask[], nowIso: string): QueueState {
  return withLock(QUEUE_LOCK_PATH, () => {
    const queue = loadQueue();
    const seenIds = new Set([...queue.items.map((x) => x.id), ...queue.dead_letter.map((x) => x.id)]);

    for (const task of backlog) {
      if (task.kind !== 'safe.patch') continue;
      if (!task.alignment || task.alignment.startsWith('Unmapped')) continue;
      if (seenIds.has(task.id)) continue;
      queue.items.push({...task, attempts: 0, created_at: nowIso, last_error: null});
      seenIds.add(task.id);
    }

    writeJsonAtomic(QUEUE_PATH, queue);
    return queue;
  }, 'nebula-hourly: queue lock exists, skipping queue mutation');
}

function sortQueueItems(items: QueueTask[]) {
  return [...items].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.created_at !== b.created_at) return String(a.created_at).localeCompare(String(b.created_at));
    return a.id.localeCompare(b.id);
  });
}

function takeNextQueueItem(): QueueTask | null {
  return withLock(QUEUE_LOCK_PATH, () => {
    const queue = loadQueue();
    const sorted = sortQueueItems(queue.items);
    const next = sorted[0] || null;
    if (!next) return null;

    const idx = queue.items.findIndex((x) => x.id === next.id);
    if (idx >= 0) queue.items.splice(idx, 1);
    writeJsonAtomic(QUEUE_PATH, queue);
    return next;
  }, 'nebula-hourly: queue lock exists, cannot dequeue');
}

function settleQueueItem(task: QueueTask, ok: boolean, errorMessage?: string) {
  return withLock(QUEUE_LOCK_PATH, () => {
    const queue = loadQueue();
    if (ok) {
      writeJsonAtomic(QUEUE_PATH, queue);
      return;
    }

    const updated: QueueTask = {
      ...task,
      attempts: (task.attempts || 0) + 1,
      last_error: errorMessage || 'unknown error',
    };

    if (updated.attempts >= QUEUE_MAX_ATTEMPTS) {
      queue.dead_letter.push({...updated, failed_at: new Date().toISOString()});
    } else {
      queue.items.push(updated);
    }
    writeJsonAtomic(QUEUE_PATH, queue);
  }, 'nebula-hourly: queue lock exists, cannot settle queue item');
}

function applyPatch(task: QueueTask) {
  if (task.patch?.type === 'hardening-skip-map') {
    const payload = {
      generated_at: new Date().toISOString(),
      policy: 'skip-if-script-missing',
      checks: task.patch.missing || [],
    };
    writeJsonAtomic(HARDENING_SKIP_MAP_PATH, payload);
    return {
      ok: true,
      summary: `Updated ${path.relative(NEBULA_ROOT, HARDENING_SKIP_MAP_PATH)} with ${(task.patch.missing || []).length} skip entries`,
      files: [path.relative(NEBULA_ROOT, HARDENING_SKIP_MAP_PATH)],
    };
  }

  if (task.patch?.type === 'next-config-guardrails') {
    const file = path.join(NEBULA_ROOT, 'apps/web/next.config.mjs');
    if (!fs.existsSync(file)) return {ok: false, error: 'missing apps/web/next.config.mjs'};
    const current = fs.readFileSync(file, 'utf8');
    if (current.includes('reactStrictMode')) {
      return {ok: true, summary: 'Next config guardrails already present', files: ['apps/web/next.config.mjs']};
    }
    const target = 'const nextConfig = {';
    if (!current.includes(target)) return {ok: false, error: 'unsupported next.config.mjs format'};

    const updated = current.replace(
      target,
      `${target}\n  reactStrictMode: true,\n  poweredByHeader: false,\n  compress: true,`,
    );
    fs.writeFileSync(file, updated);

    return {
      ok: true,
      summary: 'Added reactStrictMode/poweredByHeader/compress defaults in Next config',
      files: ['apps/web/next.config.mjs'],
    };
  }

  return {ok: false, error: `unknown patch type for task ${task.id}`};
}

function runPatches(maxPatches: number) {
  const executed: Array<{id: string; title: string; files: string[]; summary: string; rollback: string; alignment: string}> = [];
  const failed: Array<{id: string; title: string; error: string}> = [];

  for (let i = 0; i < maxPatches; i += 1) {
    const task = takeNextQueueItem();
    if (!task) break;

    const result = applyPatch(task);
    if (result.ok) {
      settleQueueItem(task, true);
      executed.push({
        id: task.id,
        title: task.title,
        files: (result as any).files || task.files || [],
        summary: (result as any).summary,
        rollback: task.rollback,
        alignment: task.alignment || 'Unspecified',
      });
    } else {
      settleQueueItem(task, false, (result as any).error || 'patch failed');
      failed.push({id: task.id, title: task.title, error: (result as any).error || 'patch failed'});
    }
  }

  return {executed, failed};
}

function runWorkspaceScriptCheck(workspaceDir: string, workspaceName: string, script: string) {
  const pkg = readJson<any>(path.join(workspaceDir, 'package.json'), {});
  const hasScript = Boolean(pkg?.scripts?.[script]);
  const command = `npm run ${script}`;

  if (!hasScript) {
    return {
      check: `${workspaceName}:${script}`,
      status: 'skip',
      classification: 'missing_script',
      command,
      cwd: workspaceDir,
      output: `Skipped: ${workspaceName} has no "${script}" script`,
    };
  }

  const result = sh(command, workspaceDir);
  return {
    check: `${workspaceName}:${script}`,
    status: result.ok ? 'pass' : 'fail',
    classification: result.ok ? 'success' : 'command_failed',
    command,
    cwd: workspaceDir,
    output: result.output,
  };
}

function runInvariantCheck(
  check: string,
  predicate: () => boolean,
  passMessage: string,
  failMessage: string,
): {check: string; status: string; classification: string; command: string; cwd: string; output: string} {
  const ok = (() => {
    try {
      return predicate();
    } catch {
      return false;
    }
  })();

  return {
    check,
    status: ok ? 'pass' : 'fail',
    classification: ok ? 'success' : 'invariant_failed',
    command: 'internal invariant check',
    cwd: NEBULA_ROOT,
    output: ok ? passMessage : failMessage,
  };
}

function harden() {
  const pkgFiles = listWorkspacePackageFiles();
  const checks: Array<{check: string; status: string; classification: string; command: string; cwd: string; output: string}> = [];

  for (const pkgFile of pkgFiles) {
    const pkg = readJson<any>(pkgFile, {});
    const workspaceDir = path.dirname(pkgFile);
    const workspaceName = pkg.name || path.relative(NEBULA_ROOT, workspaceDir);

    checks.push(runWorkspaceScriptCheck(workspaceDir, workspaceName, 'lint'));
    checks.push(runWorkspaceScriptCheck(workspaceDir, workspaceName, 'test'));

    if (pkg?.scripts?.typecheck) {
      const result = sh('npm run typecheck', workspaceDir);
      checks.push({
        check: `${workspaceName}:typecheck`,
        status: result.ok ? 'pass' : 'fail',
        classification: result.ok ? 'success' : 'command_failed',
        command: 'npm run typecheck',
        cwd: workspaceDir,
        output: result.output,
      });
    }

    if (pkg?.scripts?.build) {
      const result = sh('npm run build', workspaceDir);
      checks.push({
        check: `${workspaceName}:build`,
        status: result.ok ? 'pass' : 'fail',
        classification: result.ok ? 'success' : 'command_failed',
        command: 'npm run build',
        cwd: workspaceDir,
        output: result.output,
      });
    }
  }

  const webBuild = sh('npm run -w @nebula/web build');
  checks.push({
    check: '@nebula/web:build:production',
    status: webBuild.ok ? 'pass' : 'fail',
    classification: webBuild.ok ? 'success' : 'command_failed',
    command: 'npm run -w @nebula/web build',
    cwd: NEBULA_ROOT,
    output: webBuild.output,
  });

  checks.push(
    runInvariantCheck(
      'dev.ws_url:remote-safe-default',
      () => {
        const file = path.join(NEBULA_ROOT, 'scripts/dev/start.sh');
        if (!fs.existsSync(file)) return false;
        const text = fs.readFileSync(file, 'utf8');
        return !text.includes('NEXT_PUBLIC_UNIVERSE_WS="${NEXT_PUBLIC_UNIVERSE_WS:-ws://localhost:');
      },
      'NEXT_PUBLIC_UNIVERSE_WS does not default to localhost (remote clients safe).',
      'Regression: NEXT_PUBLIC_UNIVERSE_WS localhost default detected in scripts/dev/start.sh',
    ),
  );

  checks.push(
    runInvariantCheck(
      'server.ws_bind:0.0.0.0',
      () => {
        const file = path.join(NEBULA_ROOT, 'apps/server/src/universe/ws.ts');
        if (!fs.existsSync(file)) return false;
        const text = fs.readFileSync(file, 'utf8');
        return text.includes('host: "0.0.0.0"');
      },
      'WebSocket server bind host is 0.0.0.0 (LAN/Tailscale reachable).',
      'Regression: WebSocket server is not explicitly bound to 0.0.0.0',
    ),
  );

  checks.push(
    runInvariantCheck(
      'ui.project_viewer:present',
      () => fs.existsSync(path.join(NEBULA_ROOT, 'apps/web/src/universe/ProjectViewerPanel.tsx')),
      'ProjectViewerPanel exists.',
      'Regression: apps/web/src/universe/ProjectViewerPanel.tsx missing',
    ),
  );

  checks.push(
    runInvariantCheck(
      'ui.reactflow_overlay:present',
      () => fs.existsSync(path.join(NEBULA_ROOT, 'apps/web/src/universe/ReactFlowOverlay.tsx')),
      'ReactFlowOverlay exists.',
      'Regression: apps/web/src/universe/ReactFlowOverlay.tsx missing',
    ),
  );

  const summary = {
    pass: checks.filter((x) => x.status === 'pass').length,
    fail: checks.filter((x) => x.status === 'fail').length,
    skip: checks.filter((x) => x.status === 'skip').length,
  };

  return {checks, summary};
}

function writeUpgrade(
  id: string,
  northStar: NorthStar,
  evidence: Evidence[],
  backlog: BacklogTask[],
  queueBefore: QueueState,
  patchResults: ReturnType<typeof runPatches>,
  hardening: ReturnType<typeof harden>,
) {
  mkdirp(OUTPUT_DIR);
  const file = path.join(OUTPUT_DIR, `UPGRADE_${id}.md`);
  const queueAfter = loadQueue();

  const frontmatter = [
    '---',
    `upgrade_id: "${id}"`,
    'repo: "nebula"',
    `nebula_root: "${NEBULA_ROOT}"`,
    'protocol_version: 2',
    `max_patches_per_run: ${MAX_PATCHES_PER_RUN}`,
    `queue_max_attempts: ${QUEUE_MAX_ATTEMPTS}`,
    'evidence:',
    ...evidence.map((e) => `  - title: "${e.title}"\n    url: "${e.url}"\n    sha256: "${e.sha256}"`),
    '---',
  ].join('\n');

  const backlogSection = backlog
    .map((t) => {
      const files = (t.files || []).map((f) => `  - ${f}`).join('\n') || '  - (none)';
      return `- **${t.id}** (${t.kind})\n  - priority: ${t.priority}\n  - severity: ${t.severity}\n  - impact: ${t.impact}\n  - effort: ${t.effort}\n  - north-star alignment: ${t.alignment || 'Unmapped'}\n  - localized files:\n${files}`;
    })
    .join('\n');

  const executedPatches = patchResults.executed.length
    ? patchResults.executed
        .map((p) => `- **${p.id}**\n  - files: ${(p.files || []).join(', ') || '(none)'}\n  - summary: ${p.summary}\n  - north-star alignment: ${p.alignment || 'Unspecified'}\n  - rollback: ${p.rollback}`)
        .join('\n')
    : '- None (queue empty or patch cap reached).';

  const failedPatches = patchResults.failed.length
    ? patchResults.failed.map((p) => `- **${p.id}**: ${p.error}`).join('\n')
    : '- None.';

  const hardeningDetails = hardening.checks
    .map(
      (c) => `### ${c.check}\n- status: ${c.status}\n- classification: ${c.classification}\n- command: \`${c.command}\`\n- cwd: \`${path.relative(NEBULA_ROOT, c.cwd) || '.'}\`\n\n\`\`\`\n${c.output}\n\`\`\``,
    )
    .join('\n\n');

  const riskLevel = hardening.summary.fail > 0 ? 'medium' : 'low';

  const body = `
# Nebula Hourly Upgrade ${id}

## RALPH Summary
- Retrieve: ${evidence.length} evidence snapshots captured.
- Analyze: ${backlog.length} prioritized backlog tasks produced.
- Localize: all tasks mapped to explicit repo/state files.
- Patch: executed ${patchResults.executed.length} safe diffs (max ${MAX_PATCHES_PER_RUN}).
- Harden: pass=${hardening.summary.pass}, fail=${hardening.summary.fail}, skip=${hardening.summary.skip}.

## North Star Gate
- source: docs/upgrades/NORTH_STAR.md
- status: ${northStar.exists ? 'loaded' : 'missing'}
- heading: ${northStar.summary}
- policy: safe patches are queued only when an explicit north-star alignment rationale exists.

## Prioritized Backlog
${backlogSection}

## Queue Snapshot
- before: pending=${queueBefore.items.length}, dead-letter=${queueBefore.dead_letter.length}
- after: pending=${queueAfter.items.length}, dead-letter=${queueAfter.dead_letter.length}
- policy: deterministic dequeue by priority then age

## Executed Patches
${executedPatches}

## Patch Failures
${failedPatches}

## Risk + Rollback
- run risk: **${riskLevel}**
- rollback strategy: each patch includes file-level rollback note; no destructive git operations were used.

## Validation Summary
- pass: ${hardening.summary.pass}
- fail: ${hardening.summary.fail}
- skip: ${hardening.summary.skip}

## Harden Output
${hardeningDetails}

## Next Actions
- Burn down queued safe patches until pending=0 while honoring patch cap.
- Replace skip-map entries with real lint/test scripts incrementally.
- Add perf-budget checks for R3F draw calls/frame timing in hardening stage.
`;

  fs.writeFileSync(file, `${frontmatter}\n${body}`);
  fs.copyFileSync(file, LATEST_PATH);
  return file;
}

function pruneOld() {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  if (!fs.existsSync(OUTPUT_DIR)) return;
  for (const f of fs.readdirSync(OUTPUT_DIR)) {
    const p = path.join(OUTPUT_DIR, f);
    const st = fs.statSync(p);
    if (st.isFile() && st.mtimeMs < cutoff) fs.rmSync(p, {force: true});
  }
}

withLock(
  LOCK_PATH,
  () => {
    mkdirp(OUTPUT_DIR);
    mkdirp(path.dirname(LATEST_PATH));
    mkdirp(STATE_DIR);

    const id = hourId();
    const northStar = loadNorthStar();
    const evidence = collectEvidence(id);
    const backlog = analyzeBacklog();
    const queueBefore = upsertQueueTasks(backlog, new Date().toISOString());
    const patchResults = runPatches(Math.max(0, MAX_PATCHES_PER_RUN));
    const hardening = harden();

    const out = writeUpgrade(id, northStar, evidence, backlog, queueBefore, patchResults, hardening);
    pruneOld();
    console.log(`nebula-hourly: wrote ${out}`);
  },
  'nebula-hourly: lock exists, skipping overlap',
);
