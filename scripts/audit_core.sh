#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/full_audit_core.md"
cd "$ROOT"

TARGETS=(apps/web apps/server packages scripts)

now() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

{
  echo "# Core Audit"
  echo
  echo "- Generated: $(now)"
  echo "- Root: $ROOT"
  echo "- Targets: ${TARGETS[*]}"
  echo

  for t in "${TARGETS[@]}"; do
    [[ -d "$t" ]] || continue
    echo "## Tree: $t"
    echo
    echo '```text'
    if command -v tree >/dev/null 2>&1; then
      tree "$t" -a -I "node_modules|.next|dist|build|.cache|.turbo|.parcel-cache|coverage|docs|.git|.openclaw" --dirsfirst
    else
      find "$t" -type f | sed 's#^./##' | sort
    fi
    echo '```'
    echo
  done

  echo "## Symbol map"
  echo
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
    "(export\\s+function|export\\s+const|class\\s+|ReactFlow|WebSocket|layoutWithElk|layoutWithDagre|chooseLayout|setFocusId|toggleExpandedNode|onNodeClick|onConnect)" \
    apps/web apps/server packages scripts || true
  echo '```'
} > "$OUT"

echo "Wrote $OUT"