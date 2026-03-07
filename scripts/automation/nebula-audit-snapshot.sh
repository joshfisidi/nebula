#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
AUDIT_DIR="$ROOT/docs/audits"
LYNX_DIR="$AUDIT_DIR/lynx"
mkdir -p "$AUDIT_DIR" "$LYNX_DIR"

# Retention: keep only last 3 days
find "$AUDIT_DIR" -type f -mtime +3 -delete || true

STAMP_LOCAL="$(TZ=America/Toronto date +%Y-%m-%d_%H%M_ET)"
STAMP_ISO="$(TZ=America/Toronto date +%Y-%m-%dT%H:%M:%S%z)"
OUT="$AUDIT_DIR/AUDIT_${STAMP_LOCAL}.md"

cd "$ROOT"

# Lynx evidence (best effort)
lynx_fetch() {
  local url="$1"
  local out="$2"
  if command -v lynx >/dev/null 2>&1; then
    lynx -dump -nolist "$url" > "$out" 2>/dev/null || true
  else
    echo "lynx unavailable" > "$out"
  fi
}

LYNX_RF_PERF="$LYNX_DIR/${STAMP_LOCAL}_reactflow_performance.txt"
LYNX_RF_LAYOUT="$LYNX_DIR/${STAMP_LOCAL}_reactflow_layouting.txt"
LYNX_CHOKIDAR="$LYNX_DIR/${STAMP_LOCAL}_chokidar.txt"

lynx_fetch "https://reactflow.dev/learn/advanced-use/performance" "$LYNX_RF_PERF"
lynx_fetch "https://reactflow.dev/learn/layouting/layouting" "$LYNX_RF_LAYOUT"
lynx_fetch "https://github.com/paulmillr/chokidar" "$LYNX_CHOKIDAR"

{
  echo "# Nebula Audit Snapshot"
  echo
  echo "- generated_at_et: $STAMP_ISO"
  echo "- repo_root: $ROOT"
  echo "- retention: delete audit artifacts older than 3 days"
  echo

  echo "## Git"
  echo '```text'
  git rev-parse --abbrev-ref HEAD
  git status --short
  echo
  git log --oneline -n 15
  echo '```'
  echo

  echo "## Core Tree (excluded: node_modules .next dist build cache docs artifacts)"
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

  echo "## Code Surface (rg symbol map)"
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
    "(export\\s+function|export\\s+const|class\\s+|ReactFlow|WebSocket|chokidar|layoutWithElk|layoutWithDagre|chooseLayout|setFocusId|toggleExpandedNode|onNodeClick|onConnect|focusNode)" \
    apps packages scripts tools || true
  echo '```'
  echo

  echo "## Open TODO/FIXME markers"
  echo '```text'
  rg -n "TODO|FIXME|HACK|XXX" apps packages scripts tools --glob '!**/node_modules/**' || true
  echo '```'
  echo

  echo "## Package manifests"
  for f in package.json apps/web/package.json apps/server/package.json tools/nebula-maintainer/package.json; do
    [[ -f "$f" ]] || continue
    echo
    echo "### $f"
    echo '```json'
    cat "$f"
    echo '```'
  done
  echo

  echo "## Lynx Research Evidence"
  echo "- reactflow performance: ${LYNX_RF_PERF#$ROOT/}"
  echo "- reactflow layouting: ${LYNX_RF_LAYOUT#$ROOT/}"
  echo "- chokidar reference: ${LYNX_CHOKIDAR#$ROOT/}"
  echo
  echo "### Snippet: React Flow performance"
  echo '```text'
  sed -n '1,80p' "$LYNX_RF_PERF"
  echo '```'
  echo
  echo "### Snippet: React Flow layouting"
  echo '```text'
  sed -n '1,80p' "$LYNX_RF_LAYOUT"
  echo '```'
} > "$OUT"

echo "$OUT"
