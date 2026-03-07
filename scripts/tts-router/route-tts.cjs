#!/usr/bin/env node
/**
 * Nebula TTS Router (skeleton)
 * Local-first: Qwen3-TTS
 * Fallback: ElevenLabs
 */

const fs = require('node:fs');
const path = require('node:path');

function nowIso() {
  return new Date().toISOString();
}

function parseArgs(argv) {
  const args = { text: '', channel: '', voice_profile: 'default', mode: 'fast', config: '' };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    const b = argv[i + 1];
    if (a === '--text') { args.text = b || ''; i += 1; continue; }
    if (a === '--channel') { args.channel = b || ''; i += 1; continue; }
    if (a === '--voice-profile') { args.voice_profile = b || 'default'; i += 1; continue; }
    if (a === '--mode') { args.mode = b || 'fast'; i += 1; continue; }
    if (a === '--config') { args.config = b || ''; i += 1; continue; }
    if (a === '--help' || a === '-h') {
      console.log('Usage: node route-tts.cjs --text "..." [--channel discord] [--voice-profile default] [--mode fast|quality] [--config path]');
      process.exit(0);
    }
  }
  return args;
}

function resolveConfig(args) {
  const cfgPath = args.config
    ? path.resolve(args.config)
    : path.resolve(__dirname, 'config.template.json');
  const raw = fs.readFileSync(cfgPath, 'utf8');
  return { cfg: JSON.parse(raw), cfgPath };
}

function ensureDirs(pathsCfg, root) {
  for (const key of ['stateDir', 'outDir', 'tmpDir']) {
    const p = path.resolve(root, pathsCfg[key]);
    fs.mkdirSync(p, { recursive: true });
  }
}

function appendJsonl(filePath, obj) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.appendFileSync(filePath, JSON.stringify(obj) + '\n');
}

async function tryQwenLocal({ text, mode }) {
  // TODO: implement provider call
  // expected return:
  // { ok: true, provider: 'qwen-local', audioPath, latencyMs }
  return { ok: false, provider: 'qwen-local', error: 'NOT_IMPLEMENTED', latencyMs: 0, mode };
}

async function tryElevenFallback({ text }) {
  // TODO: implement provider call
  // expected return:
  // { ok: true, provider: 'elevenlabs', audioPath, latencyMs }
  return { ok: false, provider: 'elevenlabs', error: 'NOT_IMPLEMENTED', latencyMs: 0 };
}

function chunkText(text, maxChars = 900, chunkChars = 450) {
  const clean = String(text || '').trim();
  if (!clean) return [];
  if (clean.length <= maxChars) return [clean];
  const out = [];
  let i = 0;
  while (i < clean.length) {
    out.push(clean.slice(i, i + chunkChars));
    i += chunkChars;
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  const projectRoot = path.resolve(__dirname, '..', '..');
  const { cfg } = resolveConfig(args);
  ensureDirs(cfg.paths, projectRoot);

  const metricsPath = path.resolve(projectRoot, cfg.paths.metricsPath);
  const lastStatusPath = path.resolve(projectRoot, cfg.paths.lastStatusPath);

  const chunks = chunkText(args.text, cfg.limits.maxChars, cfg.limits.chunkChars);
  if (!chunks.length) {
    const payload = {
      ts: nowIso(),
      status: 'failure',
      error_code: 'EMPTY_TEXT',
      provider: null,
      fallback_used: false,
      channel: args.channel || null,
      chars: 0
    };
    appendJsonl(metricsPath, payload);
    fs.writeFileSync(lastStatusPath, JSON.stringify(payload, null, 2));
    console.log(JSON.stringify(payload, null, 2));
    process.exit(1);
  }

  const started = Date.now();
  let result = await tryQwenLocal({ text: chunks[0], mode: args.mode || cfg.mode });
  let fallbackUsed = false;

  if (!result.ok) {
    fallbackUsed = true;
    result = await tryElevenFallback({ text: chunks[0] });
  }

  const payload = {
    ts: nowIso(),
    status: result.ok ? 'success' : 'failure',
    provider: result.provider,
    fallback_used: fallbackUsed,
    latency_ms: Date.now() - started,
    chars: chunks[0].length,
    channel: args.channel || null,
    voice_profile: args.voice_profile || 'default',
    mode: args.mode || cfg.mode,
    audio_path: result.audioPath || null,
    error_code: result.error || null
  };

  appendJsonl(metricsPath, payload);
  fs.writeFileSync(lastStatusPath, JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload, null, 2));

  if (!result.ok) process.exit(1);
}

main().catch((err) => {
  const payload = {
    ts: nowIso(),
    status: 'failure',
    provider: null,
    fallback_used: false,
    error_code: 'FATAL',
    message: String(err && err.message ? err.message : err)
  };
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
});
