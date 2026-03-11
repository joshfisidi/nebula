#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
AUDIT_DIR="$ROOT/docs/audits"
mkdir -p "$AUDIT_DIR"

STAMP_LOCAL="$(TZ=America/Toronto date +%Y-%m-%d_%H%M_ET)"
OUT="$AUDIT_DIR/PREUPGRADE_${STAMP_LOCAL}.md"

cd "$ROOT"

# Guardrail: avoid mixing unrelated local changes into hourly upgrade commits.
if [[ -n "$(git status --porcelain)" ]]; then
  echo "[PREUPGRADE_AUDIT] FAIL: working tree is dirty; commit/stash first" >&2
  git status --short >&2
  exit 1
fi

{
  echo "# Pre-upgrade Audit"
  echo
  echo "- generated_at_et: $(TZ=America/Toronto date +%Y-%m-%dT%H:%M:%S%z)"
  echo "- branch: $(git branch --show-current)"
  echo "- head: $(git rev-parse --short HEAD)"
  echo

  echo "## Baseline tree (core only)"
  echo '```text'
  if command -v tree >/dev/null 2>&1; then
    tree -a --dirsfirst -I "node_modules|.next|dist|build|.cache|.turbo|.parcel-cache|coverage|docs|.git|.openclaw" apps packages scripts tools
  else
    find apps packages scripts tools \
      \( -name node_modules -o -name .next -o -name dist -o -name build -o -name .cache -o -name .turbo -o -name .parcel-cache -o -name coverage -o -name docs -o -name .git -o -name .openclaw \) -prune \
      -o -print | sed 's#^./##' | sort
  fi
  echo '```'
  echo

  echo "## ripgrep architecture map"
  echo '```text'
  rg -n --hidden \
    --glob '!**/node_modules/**' \
    --glob '!**/.next/**' \
    --glob '!**/dist/**' \
    --glob '!**/build/**' \
    --glob '!**/.cache/**' \
    --glob '!**/.turbo/**' \
    --glob '!**/.parcel-cache/**' \
    --glob '!**/coverage/**' \
    --glob '!**/docs/**' \
    --glob '!**/.git/**' \
    --glob '!**/.openclaw/**' \
    "(export\\s+function|export\\s+const|class\\s+|ReactFlow|WebSocket|chokidar|layoutWithElk|layoutWithDagre|chooseLayout|focusNode|setFocusId|toggleExpandedNode|onNodeClick|onConnect)" \
    apps packages scripts tools || true
  echo '```'
  echo

  echo "## Recent code changes context"
  echo '```text'
  git log --oneline -n 20
  echo '```'
} > "$OUT"

echo "$OUT"