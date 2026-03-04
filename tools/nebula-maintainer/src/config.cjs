const path = require('node:path');

const NEBULA_ROOT = process.env.NEBULA_ROOT || '/Users/josh/.openclaw/workspace/projects/nebula';
const TZ_LABEL = process.env.NEBULA_TZ_LABEL || 'ET';

const OUTPUT_DIR = path.join(NEBULA_ROOT, 'docs/upgrades/hourly');
const LATEST_PATH = path.join(NEBULA_ROOT, 'docs/upgrades/LATEST.md');
const OUT_DIR = path.join(NEBULA_ROOT, 'tools/nebula-maintainer/out');

const LOCK_PATH = path.join(NEBULA_ROOT, '.openclaw/locks/nebula-hourly.lock');
const QUEUE_LOCK_PATH = path.join(NEBULA_ROOT, '.openclaw/locks/nebula-queue.lock');
const STATE_DIR = path.join(NEBULA_ROOT, '.openclaw/state/nebula');
const QUEUE_PATH = path.join(STATE_DIR, 'queue.json');
const HARDENING_SKIP_MAP_PATH = path.join(STATE_DIR, 'hardening-skip-map.json');
const NORTH_STAR_PATH = path.join(NEBULA_ROOT, 'docs/upgrades/NORTH_STAR.md');

const SOURCES_PATH = path.join(NEBULA_ROOT, 'tools/nebula-maintainer/sources/seed_urls.txt');

const RETENTION_DAYS = Number(process.env.NEBULA_RETENTION_DAYS || 14);
const MAX_PATCHES_PER_RUN = Number(process.env.NEBULA_MAX_PATCHES_PER_RUN || 2);
const QUEUE_MAX_ATTEMPTS = Number(process.env.NEBULA_QUEUE_MAX_ATTEMPTS || 3);

module.exports = {
  NEBULA_ROOT,
  TZ_LABEL,
  OUTPUT_DIR,
  LATEST_PATH,
  OUT_DIR,
  LOCK_PATH,
  QUEUE_LOCK_PATH,
  STATE_DIR,
  QUEUE_PATH,
  HARDENING_SKIP_MAP_PATH,
  NORTH_STAR_PATH,
  SOURCES_PATH,
  RETENTION_DAYS,
  MAX_PATCHES_PER_RUN,
  QUEUE_MAX_ATTEMPTS,
};
