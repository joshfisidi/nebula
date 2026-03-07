import path from 'node:path';

export const NEBULA_ROOT = process.env.NEBULA_ROOT || '/Users/josh/.openclaw/workspace/projects/nebula';
export const TZ_LABEL = process.env.NEBULA_TZ_LABEL || 'ET';

export const OUTPUT_DIR = path.join(NEBULA_ROOT, 'docs/upgrades/hourly');
export const LATEST_PATH = path.join(NEBULA_ROOT, 'docs/upgrades/LATEST.md');
export const OUT_DIR = path.join(NEBULA_ROOT, 'tools/nebula-maintainer/out');

export const LOCK_PATH = path.join(NEBULA_ROOT, '.openclaw/locks/nebula-hourly.lock');
export const QUEUE_LOCK_PATH = path.join(NEBULA_ROOT, '.openclaw/locks/nebula-queue.lock');
export const STATE_DIR = path.join(NEBULA_ROOT, '.openclaw/state/nebula');
export const QUEUE_PATH = path.join(STATE_DIR, 'queue.json');
export const HARDENING_SKIP_MAP_PATH = path.join(STATE_DIR, 'hardening-skip-map.json');
export const NORTH_STAR_PATH = path.join(NEBULA_ROOT, 'docs/upgrades/NORTH_STAR.md');

export const SOURCES_PATH = path.join(NEBULA_ROOT, 'tools/nebula-maintainer/sources/seed_urls.txt');
export const EXAMPLES_DIR = path.join(NEBULA_ROOT, 'docs/examples');

export const RETENTION_DAYS = Number(process.env.NEBULA_RETENTION_DAYS || 14);
export const MAX_PATCHES_PER_RUN = Number(process.env.NEBULA_MAX_PATCHES_PER_RUN || 2);
export const QUEUE_MAX_ATTEMPTS = Number(process.env.NEBULA_QUEUE_MAX_ATTEMPTS || 3);
