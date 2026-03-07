#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/full_audit.md"
cd "$ROOT"

EXCLUDES=(
  node_modules
  .next
  dist
  build
  .cache
  .turbo
  .parcel-cache
  coverage
  docs
  .git
  .openclaw
)

PRUNE_EXPR=()
for d in "${EXCLUDES[@]}"; do
  PRUNE_EXPR+=( -name "$d" -o )
done
unset 'PRUNE_EXPR[${#PRUNE_EXPR[@]}-1]'

now() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

{
  echo "# Full Codebase Audit"
  echo
  echo "- Generated: $(now)"
  echo "- Root: $ROOT"
  echo "- Excluded: ${EXCLUDES[*]}"
  echo

  echo "## 1) Core File Tree"
  echo
  echo '```text'
  if command -v tree >/dev/null 2>&1; then
    tree -a \
      -I "node_modules|.next|dist|build|.cache|.turbo|.parcel-cache|coverage|docs|.git|.openclaw" \
      --dirsfirst
  else
    find . \( "${PRUNE_EXPR[@]}" \) -prune -o -print | sed 's#^./##' | sort
  fi
  echo '```'
  echo

  echo "## 2) Core Source Files (index)"
  echo
  echo '```text'
  find . \
    \( -name node_modules -o -name .next -o -name dist -o -name build -o -name .cache -o -name .turbo -o -name .parcel-cache -o -name coverage -o -name docs -o -name .git -o -name .openclaw \) -prune \
    -o -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" -o -name "*.cjs" -o -name "*.json" -o -name "*.md" -o -name "*.css" -o -name "*.yaml" -o -name "*.yml" -o -name "*.sh" \) -print \
    | sed 's#^./##' | sort
  echo '```'
  echo

  echo "## 3) ripgrep symbol map (top-level patterns)"
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
    --glob '!**/docs/**' \
    --glob '!**/.git/**' \
    --glob '!**/.openclaw/**' \
    "(export\\s+function|export\\s+const|class\\s+|create\\(|use[A-Z][A-Za-z0-9_]+\\(|ReactFlow|WebSocket|chokidar|layoutWithElk|layoutWithDagre|chooseLayout|setFocusId|toggleExpandedNode)" \
    apps packages scripts tools || true
  echo '```'
  echo

  echo "## 4) fzf-ready path list"
  echo
  echo '```text'
  find . \
    \( -name node_modules -o -name .next -o -name dist -o -name build -o -name .cache -o -name .turbo -o -name .parcel-cache -o -name coverage -o -name docs -o -name .git -o -name .openclaw \) -prune \
    -o -type f -print | sed 's#^./##' | sort
  echo '```'
  echo

  echo "## 5) Key package manifests"
  echo
  for f in package.json apps/web/package.json apps/server/package.json pnpm-workspace.yaml; do
    if [[ -f "$f" ]]; then
      echo "### $f"
      echo
      echo '```json'
      cat "$f"
      echo '```'
      echo
    fi
  done

  echo "## 6) Directory stats"
  echo
  echo '```text'
  find . \
    \( -name node_modules -o -name .next -o -name dist -o -name build -o -name .cache -o -name .turbo -o -name .parcel-cache -o -name coverage -o -name docs -o -name .git -o -name .openclaw \) -prune \
    -o -type f -print \
    | awk -F/ 'NF>1 {print $2}' | sort | uniq -c | sort -nr
  echo '```'
} > "$OUT"

echo "Wrote $OUT"
