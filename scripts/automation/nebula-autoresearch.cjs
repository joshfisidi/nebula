#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repoRoot = path.resolve(__dirname, '..', '..');
const tz = 'America/Toronto';

const stateDir = path.join(repoRoot, '.openclaw', 'state', 'nebula');
const outDir = path.join(repoRoot, 'docs', 'research', 'autoresearch');
const hourlyDir = path.join(repoRoot, 'docs', 'upgrades', 'hourly');
const auditDir = path.join(repoRoot, 'docs', 'audits');
const northStarPath = path.join(repoRoot, 'docs', 'upgrades', 'NORTH_STAR.md');
const knowledgeDir = path.join(repoRoot, 'docs', 'knowledge');
const examplesDir = path.join(repoRoot, 'docs', 'examples');
const skipMapPath = path.join(stateDir, 'hardening-skip-map.json');
const statusPath = path.join(stateDir, 'status.json');

fs.mkdirSync(stateDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

function run(cmd, args, cwd = repoRoot) {
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', shell: false, env: process.env });
  return {
    ok: (r.status ?? 1) === 0,
    code: r.status ?? 1,
    stdout: (r.stdout || '').trim(),
    stderr: (r.stderr || '').trim(),
  };
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function readText(file, fallback = '') {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return fallback;
  }
}

function newestFile(dir, regex) {
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => regex.test(f))
      .map((f) => path.join(dir, f));
    if (!files.length) return null;
    let latest = files[0];
    let latestMtime = fs.statSync(latest).mtimeMs;
    for (const file of files.slice(1)) {
      const m = fs.statSync(file).mtimeMs;
      if (m > latestMtime) {
        latest = file;
        latestMtime = m;
      }
    }
    return latest;
  } catch {
    return null;
  }
}

function listFilesRecursive(dir, exts = ['.md', '.txt']) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const abs = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
      } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
        out.push(abs);
      }
    }
  };
  walk(dir);
  return out.sort();
}

function latestUpgradeMtimeMs() {
  const latest = newestFile(hourlyDir, /^UPGRADE_.*\.md$/);
  if (!latest) return null;
  return fs.statSync(latest).mtimeMs;
}

function summarizeOutdatedPackages() {
  const result = run('npm', ['outdated', '--json']);
  const jsonText = result.stdout || '{}';
  let parsed = {};
  try {
    parsed = JSON.parse(jsonText || '{}');
  } catch {
    parsed = {};
  }

  const rows = Object.entries(parsed).map(([name, value]) => ({
    name,
    current: value.current,
    wanted: value.wanted,
    latest: value.latest,
    location: value.location || '.',
  }));

  return {
    count: rows.length,
    rows: rows.slice(0, 50),
    rawExitCode: result.code,
  };
}

function nowStamp() {
  const iso = new Date().toISOString();
  const compact = iso.replace(/[:.]/g, '-');
  return { iso, compact };
}

function hoursSince(ms) {
  if (!ms) return null;
  return (Date.now() - ms) / (1000 * 60 * 60);
}

function score({ impact, effort, confidence }) {
  return Number((impact * 0.5 + confidence * 0.4 - effort * 0.3).toFixed(2));
}

function heading(text) {
  const line = String(text || '')
    .split('\n')
    .map((x) => x.trim())
    .find((x) => x.startsWith('#'));
  return line ? line.replace(/^#+\s*/, '').trim() : 'Missing heading';
}

function extractAuditSignals(auditText) {
  const txt = String(auditText || '');
  const todoCount = (txt.match(/\b(TODO|FIXME|HACK|XXX)\b/g) || []).length;
  const reactFlowMentions = (txt.match(/ReactFlow|reactflow/g) || []).length;
  const websocketMentions = (txt.match(/WebSocket|ws:/g) || []).length;
  const chokidarMentions = (txt.match(/chokidar/g) || []).length;

  return {
    todoCount,
    reactFlowMentions,
    websocketMentions,
    chokidarMentions,
  };
}

function extractKnowledgeSignals() {
  const files = fs.existsSync(knowledgeDir) ? listFilesRecursive(knowledgeDir) : listFilesRecursive(examplesDir);
  let textSize = 0;
  let mentionsLayout = 0;
  let mentionsPerformance = 0;
  let mentionsA11y = 0;

  for (const file of files.slice(0, 200)) {
    const txt = readText(file, '');
    textSize += txt.length;
    mentionsLayout += (txt.match(/layout|dagre|elk|position/gi) || []).length;
    mentionsPerformance += (txt.match(/performance|fps|render|optimi/gi) || []).length;
    mentionsA11y += (txt.match(/a11y|accessibility|keyboard|screen reader/gi) || []).length;
  }

  return {
    source: fs.existsSync(knowledgeDir) ? 'docs/knowledge' : 'docs/examples (fallback)',
    fileCount: files.length,
    textSize,
    mentionsLayout,
    mentionsPerformance,
    mentionsA11y,
    sampleFiles: files.slice(0, 12).map((f) => path.relative(repoRoot, f)),
  };
}

const status = readJson(statusPath, null);
const skipMap = readJson(skipMapPath, { checks: [] });
const outdated = summarizeOutdatedPackages();
const latestUpgradeAgeH = hoursSince(latestUpgradeMtimeMs());

const northStarText = readText(northStarPath, '');
const northStarExists = fs.existsSync(northStarPath);
const northStarHeading = heading(northStarText);

const latestAuditPath = newestFile(auditDir, /^AUDIT_.*\.md$/);
const latestAuditText = latestAuditPath ? readText(latestAuditPath, '') : '';
const auditSignals = extractAuditSignals(latestAuditText);

const knowledgeSignals = extractKnowledgeSignals();

const hypotheses = [];

if (!northStarExists) {
  hypotheses.push({
    id: 'north-star-missing-hard-stop',
    lane: 'governance',
    signal: 'north_star=missing',
    proposal: 'Block upgrade execution until NORTH_STAR.md exists with explicit priorities and constraints.',
    action: 'Create docs/upgrades/NORTH_STAR.md with measurable goals + anti-goals before running upgrade lane.',
    impact: 10,
    effort: 2,
    confidence: 10,
  });
}

if ((skipMap.checks || []).length > 0) {
  hypotheses.push({
    id: 'replace-skip-map-with-real-checks',
    lane: 'reliability',
    signal: `skip_map_entries=${skipMap.checks.length}`,
    proposal:
      'Autogenerate minimal lint/test scripts for missing workspaces and gradually replace skip-map exemptions with runnable checks.',
    action:
      'Generate scripts in workspace package.json, run npm run -ws typecheck/build, keep only green diffs.',
    impact: 9,
    effort: 4,
    confidence: 8,
  });
}

if (outdated.count > 0) {
  hypotheses.push({
    id: 'dependency-upgrade-lane',
    lane: 'security+performance',
    signal: `outdated_packages=${outdated.count}`,
    proposal:
      'Create a rolling dependency upgrade lane (small batches, lockfile+build+typecheck gates) to avoid stagnation and drift.',
    action:
      'Batch by risk: patch/minor first, run workspace checks, publish accepted batch to agent branch.',
    impact: 8,
    effort: 5,
    confidence: 8,
  });
}

if (auditSignals.todoCount > 0) {
  hypotheses.push({
    id: 'todo-fixme-burn-down',
    lane: 'maintainability',
    signal: `audit_todo_fixme_markers=${auditSignals.todoCount}`,
    proposal: 'Convert high-signal TODO/FIXME markers into executable backlog items with acceptance tests.',
    action: 'Take top 5 TODO/FIXME markers by file criticality, implement smallest safe fixes, gate on build/typecheck.',
    impact: 7,
    effort: 4,
    confidence: 7,
  });
}

if (status && status.status === 'failure') {
  hypotheses.push({
    id: 'failure-driven-fix-first',
    lane: 'stability',
    signal: `last_pipeline_status=failure`,
    proposal: 'Prioritize autonomous experiments against the first failing pipeline step before new feature upgrades.',
    action: 'Extract failing step from status/log, generate 3 fix hypotheses, validate each against same gate.',
    impact: 9,
    effort: 3,
    confidence: 9,
  });
}

if (latestUpgradeAgeH !== null && latestUpgradeAgeH > 24) {
  hypotheses.push({
    id: 'stale-upgrade-pulse',
    lane: 'ops',
    signal: `hours_since_last_upgrade=${latestUpgradeAgeH.toFixed(1)}`,
    proposal: 'Upgrade cadence is stale. Trigger forced autoresearch pulse to refill executable backlog.',
    action: 'Run maintainer + autoresearch + queue refresh immediately and report top 3 safe patches.',
    impact: 7,
    effort: 2,
    confidence: 8,
  });
}

if (knowledgeSignals.fileCount > 0) {
  hypotheses.push({
    id: 'knowledge-driven-graph-ux-lane',
    lane: 'product-quality',
    signal: `${knowledgeSignals.source}:files=${knowledgeSignals.fileCount},perf_mentions=${knowledgeSignals.mentionsPerformance},layout_mentions=${knowledgeSignals.mentionsLayout}`,
    proposal: 'Use internal knowledge corpus to prioritize graph readability/performance upgrades tied to existing examples and prior notes.',
    action:
      'Generate upgrade candidates only when there is codebase locality + knowledge evidence + measurable UI objective (overlap, FPS, interaction latency).',
    impact: 8,
    effort: 4,
    confidence: 8,
  });
}

const ranked = hypotheses
  .map((h) => ({ ...h, score: score(h) }))
  .sort((a, b) => b.score - a.score);

const top = ranked.slice(0, 5);
const stamp = nowStamp();

const payload = {
  generated_at: stamp.iso,
  timezone: tz,
  repo: 'nebula',
  context: {
    north_star_exists: northStarExists,
    north_star_heading: northStarHeading,
    latest_audit: latestAuditPath ? path.relative(repoRoot, latestAuditPath) : null,
    audit_signals: auditSignals,
    knowledge_source: knowledgeSignals.source,
    latest_upgrade_age_hours: latestUpgradeAgeH,
    skip_map_entries: (skipMap.checks || []).length,
    outdated_packages: outdated.count,
    last_pipeline_status: status?.status || 'unknown',
  },
  top_hypotheses: top,
  knowledge_sample_files: knowledgeSignals.sampleFiles,
  outdated_sample: outdated.rows.slice(0, 15),
};

const jsonPath = path.join(outDir, `AUTORESEARCH_${stamp.compact}.json`);
const mdPath = path.join(outDir, `AUTORESEARCH_${stamp.compact}.md`);
const latestPath = path.join(outDir, 'LATEST.md');

fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2));

const lines = [
  '# Nebula AutoResearch Pulse',
  '',
  `- generated_at: ${stamp.iso}`,
  `- timezone: ${tz}`,
  `- north_star: ${northStarExists ? 'present' : 'missing'} (${northStarHeading})`,
  `- latest_audit: ${latestAuditPath ? path.relative(repoRoot, latestAuditPath) : 'none'}`,
  `- knowledge_source: ${knowledgeSignals.source}`,
  `- knowledge_files: ${knowledgeSignals.fileCount}`,
  `- latest_upgrade_age_hours: ${latestUpgradeAgeH === null ? 'unknown' : latestUpgradeAgeH.toFixed(1)}`,
  `- skip_map_entries: ${(skipMap.checks || []).length}`,
  `- outdated_packages: ${outdated.count}`,
  `- last_pipeline_status: ${status?.status || 'unknown'}`,
  '',
  '## Audit-derived signals',
  `- TODO/FIXME/HACK/XXX markers: ${auditSignals.todoCount}`,
  `- ReactFlow mentions: ${auditSignals.reactFlowMentions}`,
  `- WebSocket mentions: ${auditSignals.websocketMentions}`,
  `- chokidar mentions: ${auditSignals.chokidarMentions}`,
  '',
  '## Ranked hypotheses (top 5)',
  ...top.flatMap((h, i) => [
    `### ${i + 1}) ${h.id} (score ${h.score})`,
    `- lane: ${h.lane}`,
    `- signal: ${h.signal}`,
    `- proposal: ${h.proposal}`,
    `- action: ${h.action}`,
    `- impact/effort/confidence: ${h.impact}/${h.effort}/${h.confidence}`,
    '',
  ]),
  '## Why this mirrors autoresearch',
  '- Continuous loop instead of one-off tasks.',
  '- Hypothesis queue with explicit scoring.',
  '- Uses preaudit + north-star + internal knowledge as context before proposing upgrades.',
  '- Accept/reject remains objective via build/typecheck/tests in the upgrade pipeline.',
  '',
  `JSON artifact: ${path.relative(repoRoot, jsonPath)}`,
];

fs.writeFileSync(mdPath, lines.join('\n'));
fs.copyFileSync(mdPath, latestPath);

console.log(
  JSON.stringify(
    {
      ok: true,
      summary: `nebula-autoresearch: wrote ${path.relative(repoRoot, mdPath)}`,
      context: {
        north_star_exists: northStarExists,
        latest_audit: latestAuditPath ? path.relative(repoRoot, latestAuditPath) : null,
        knowledge_source: knowledgeSignals.source,
      },
      top_hypotheses: top.map((x) => ({ id: x.id, score: x.score })),
    },
    null,
    2,
  ),
);
