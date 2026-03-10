#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '../..');
const SERVER_CWD = path.join(ROOT_DIR, 'apps/server');
const WEB_CWD = path.join(ROOT_DIR, 'apps/web');
const SERVER_BIN = path.join(SERVER_CWD, 'node_modules/.bin/tsx');
const WEB_BIN = path.join(WEB_CWD, 'node_modules/.bin/next');
const LOG_FILE = path.join(ROOT_DIR, '.nebula-dev.log');
const LEGACY_PID_FILE = path.join(ROOT_DIR, '.nebula-dev.pid');
const STATE_DIR = path.join(ROOT_DIR, '.openclaw/state/nebula');
const STATE_FILE = path.join(STATE_DIR, 'dev-stack.json');

function parseArgs(argv) {
  const args = [...argv];
  const command = args.shift() || 'start';
  const webArgs = [];
  let webPortCli = '';

  while (args.length > 0) {
    const current = args.shift();
    if (current === '--') continue;
    if (current === '-p' || current === '--port') {
      if (args.length === 0) {
        throw new Error(`Missing value for ${current}`);
      }
      webPortCli = args.shift();
      continue;
    }
    if (current.startsWith('--port=')) {
      webPortCli = current.slice('--port='.length);
      continue;
    }
    webArgs.push(current);
  }

  return { command, webArgs, webPortCli };
}

function resolveConfig(parsed) {
  const watchDir = process.env.WATCH_DIR || ROOT_DIR;
  const universeWatchRoot = process.env.UNIVERSE_WATCH_ROOT || watchDir;
  const universeWsPort = String(process.env.UNIVERSE_WS_PORT || process.env.PORT || '18891');
  const universeApiPort = String(process.env.UNIVERSE_API_PORT || '18892');
  const webPort = parsed.webPortCli || process.env.WEB_PORT || '3000';
  const nextPublicWsPort = process.env.NEXT_PUBLIC_UNIVERSE_WS_PORT || universeWsPort;
  const nextPublicApiPort = process.env.NEXT_PUBLIC_UNIVERSE_API_PORT || universeApiPort;

  return {
    env: {
      ...process.env,
      WATCH_DIR: watchDir,
      MULTI_PROJECT_ROOT: process.env.MULTI_PROJECT_ROOT || '0',
      ENABLE_IMPORT_EDGES: process.env.ENABLE_IMPORT_EDGES || '0',
      UNIVERSE_WATCH_ROOT: universeWatchRoot,
      UNIVERSE_WS_PORT: universeWsPort,
      UNIVERSE_API_PORT: universeApiPort,
      UNIVERSE_REQUIRE_SOURCE: process.env.UNIVERSE_REQUIRE_SOURCE || '1',
      NEXT_PUBLIC_UNIVERSE_WS_PORT: nextPublicWsPort,
      NEXT_PUBLIC_UNIVERSE_API_PORT: nextPublicApiPort,
      WEB_PORT: webPort,
    },
    universeWatchRoot,
    universeWsPort,
    universeApiPort,
    webPort,
    webArgs: parsed.webArgs,
  };
}

function ensureDependencies() {
  if (!commandExists('pnpm')) {
    throw new Error('pnpm not found. Run: corepack enable && corepack prepare pnpm@latest --activate');
  }

  if (!fs.existsSync(SERVER_BIN) || !fs.existsSync(WEB_BIN)) {
    throw new Error('Missing local dev binaries. Run: pnpm install');
  }
}

function commandExists(command) {
  const pathValue = process.env.PATH || '';
  return pathValue
    .split(path.delimiter)
    .filter(Boolean)
    .some((dir) => fs.existsSync(path.join(dir, command)));
}

function serviceQueue(config) {
  return [
    {
      key: 'server',
      label: 'Universe WebSocket server',
      cwd: SERVER_CWD,
      bin: SERVER_BIN,
      args: ['watch', 'src/index.ts'],
      url: `ws://localhost:${config.universeWsPort}`,
    },
    {
      key: 'web',
      label: 'Next.js web app',
      cwd: WEB_CWD,
      bin: WEB_BIN,
      args: ['dev', '--hostname', '0.0.0.0', '--port', config.webPort, ...config.webArgs],
      url: `http://localhost:${config.webPort}`,
    },
  ];
}

function printBanner(config) {
  process.stdout.write('Starting Nebula dev stack\n');
  process.stdout.write(`- watch root: ${config.universeWatchRoot}\n`);
  process.stdout.write(`- websocket: ws://localhost:${config.universeWsPort}\n`);
  process.stdout.write(`- ws (LAN):  ws://<device-ip>:${config.universeWsPort}\n`);
  process.stdout.write(`- import edges: ${config.env.ENABLE_IMPORT_EDGES}\n`);
  process.stdout.write(`- source api: http://localhost:${config.universeApiPort}\n`);
  process.stdout.write(`- web:       http://localhost:${config.webPort}\n`);
  process.stdout.write(`- web (LAN): http://<device-ip>:${config.webPort}\n`);
}

function appendLogHeader(config) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  const header = [
    `# Nebula dev stack started at ${new Date().toISOString()}`,
    `# watch root: ${config.universeWatchRoot}`,
    `# websocket: ws://localhost:${config.universeWsPort}`,
    `# web: http://localhost:${config.webPort}`,
    '',
  ].join('\n');
  fs.appendFileSync(LOG_FILE, header);
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function writeState(state) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function removeState() {
  fs.rmSync(STATE_FILE, { force: true });
}

function cleanupLegacyPid() {
  fs.rmSync(LEGACY_PID_FILE, { force: true });
}

function isRunning(pid) {
  if (!pid || typeof pid !== 'number') return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function summarizeState(state) {
  if (!state || !state.services) {
    return { running: [], stopped: [] };
  }

  const running = [];
  const stopped = [];
  for (const service of Object.values(state.services)) {
    if (isRunning(service.pid)) running.push(service);
    else stopped.push(service);
  }
  return { running, stopped };
}

function terminateService(service, signal) {
  if (!service || !service.pid) return;

  const candidates = [service.pgid, -Math.abs(service.pid), service.pid].filter(Boolean);
  for (const candidate of candidates) {
    try {
      process.kill(candidate, signal);
      return;
    } catch {
      // Keep trying fallback targets.
    }
  }
}

async function waitForShutdown(services, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (services.every((service) => !isRunning(service.pid))) return;
    await sleep(150);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function stopExisting(state) {
  if (!state || !state.services) {
    cleanupLegacyPid();
    removeState();
    return;
  }

  const services = Object.values(state.services);
  for (const service of services) {
    terminateService(service, 'SIGTERM');
  }

  await waitForShutdown(services, 2500);

  for (const service of services.filter((entry) => isRunning(entry.pid))) {
    terminateService(service, 'SIGKILL');
  }

  cleanupLegacyPid();
  removeState();
}

async function startBackground(config) {
  const existing = readState();
  const existingSummary = summarizeState(existing);
  if (existingSummary.running.length === 2) {
    process.stdout.write('Nebula dev stack already running\n');
    process.stdout.write(`- log: ${existing.logFile || LOG_FILE}\n`);
    return;
  }

  if (existing) {
    await stopExisting(existing);
  }

  cleanupLegacyPid();
  appendLogHeader(config);
  printBanner(config);

  const logFd = fs.openSync(LOG_FILE, 'a');
  const state = {
    version: 1,
    startedAt: new Date().toISOString(),
    rootDir: ROOT_DIR,
    logFile: LOG_FILE,
    watchRoot: config.universeWatchRoot,
    universeWsPort: Number(config.universeWsPort),
    webPort: Number(config.webPort),
    services: {},
  };

  for (const service of serviceQueue(config)) {
    const child = spawn(service.bin, service.args, {
      cwd: service.cwd,
      env: config.env,
      detached: true,
      stdio: ['ignore', logFd, logFd],
    });
    child.unref();
    state.services[service.key] = {
      key: service.key,
      label: service.label,
      pid: child.pid,
      pgid: child.pid,
      cwd: service.cwd,
      command: [service.bin, ...service.args],
      url: service.url,
    };
  }

  fs.closeSync(logFd);
  writeState(state);

  process.stdout.write('Nebula dev stack started in background\n');
  process.stdout.write(`- state: ${STATE_FILE}\n`);
  process.stdout.write(`- log: ${LOG_FILE}\n`);
}

async function showStatus() {
  cleanupLegacyPid();
  const state = readState();
  const summary = summarizeState(state);

  if (!state || summary.running.length === 0) {
    if (state && summary.stopped.length > 0) removeState();
    process.stdout.write('stopped\n');
    return;
  }

  const status = summary.stopped.length === 0 ? 'running' : 'degraded';
  process.stdout.write(`${status}\n`);
  for (const service of Object.values(state.services)) {
    const serviceStatus = isRunning(service.pid) ? 'running' : 'stopped';
    process.stdout.write(`- ${service.key}: ${serviceStatus} (pid ${service.pid}) ${service.url}\n`);
  }
  process.stdout.write(`- log: ${state.logFile || LOG_FILE}\n`);
}

async function stopBackground() {
  const state = readState();
  await stopExisting(state);
  process.stdout.write('Nebula dev stack stopped.\n');
}

function startForeground(config) {
  printBanner(config);

  const children = [];
  let exiting = false;
  let exitCode = 0;

  const maybeExit = () => {
    if (!exiting) return;
    if (children.every((child) => child.exitCode !== null || child.signalCode !== null)) {
      process.exit(exitCode);
    }
  };

  const shutdown = (code) => {
    if (exiting) return;
    exiting = true;
    exitCode = code;
    process.stdout.write('\nStopping Nebula dev stack...\n');
    for (const child of children) {
      if (child.exitCode === null && child.signalCode === null) {
        child.kill('SIGTERM');
      }
    }
    setTimeout(() => {
      for (const child of children) {
        if (child.exitCode === null && child.signalCode === null) {
          child.kill('SIGKILL');
        }
      }
    }, 1500).unref();
    maybeExit();
  };

  for (const service of serviceQueue(config)) {
    const child = spawn(service.bin, service.args, {
      cwd: service.cwd,
      env: config.env,
      stdio: 'inherit',
    });
    children.push(child);
    child.on('exit', (code, signal) => {
      if (!exiting && (code !== 0 || signal)) {
        shutdown(code || 1);
        return;
      }
      if (!exiting && code === 0) {
        shutdown(0);
        return;
      }
      maybeExit();
    });
  }

  process.on('SIGINT', () => shutdown(0));
  process.on('SIGTERM', () => shutdown(0));
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  const config = resolveConfig(parsed);
  ensureDependencies();

  switch (parsed.command) {
    case 'start':
      startForeground(config);
      break;
    case 'start-bg':
      await startBackground(config);
      break;
    case 'status':
      await showStatus();
      break;
    case 'stop':
      await stopBackground();
      break;
    default:
      throw new Error(`Unknown command: ${parsed.command}`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
