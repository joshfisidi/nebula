#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

fail() {
  echo "[NORTH_STAR_GATE] FAIL: $1" >&2
  exit 1
}

pass() {
  echo "[NORTH_STAR_GATE] PASS: $1"
}

[[ -f docs/upgrades/NORTH_STAR.md ]] || fail "Missing docs/upgrades/NORTH_STAR.md"
pass "north star file exists"

# 1) No legacy 3D stack imports in web source
if rg -n "@react-three|from 'three'|from \"three\"|postprocessing" apps/web/src -g '!**/node_modules/**' >/dev/null; then
  fail "Legacy 3D stack imports detected in apps/web/src"
fi
pass "no legacy 3D imports"

# 2) No removed legacy files
for f in \
  apps/web/src/universe/RoutedEdge.tsx \
  apps/web/src/universe/NodeSystem.tsx \
  apps/web/src/universe/EdgeSystem.tsx \
  apps/web/src/universe/ParticleSystem.tsx \
  apps/web/src/universe/store.ts
  do
  [[ ! -f "$f" ]] || fail "Legacy file still present: $f"
done
pass "legacy files absent"

# 3) Deterministic focus path must exist
rg -n "const focusNode = useCallback\(" apps/web/src/universe/ReactFlowOverlay.tsx >/dev/null || fail "focusNode callback missing"
pass "focusNode callback present"

# 4) Layout selector must be wired
rg -n "chooseLayout\(" apps/web/src/universe/ReactFlowOverlay.tsx >/dev/null || fail "chooseLayout() not wired"
rg -n "layoutWithDagre\(" apps/web/src/universe/ReactFlowOverlay.tsx >/dev/null || fail "layoutWithDagre() not wired"
rg -n "layoutWithElk\(" apps/web/src/universe/ReactFlowOverlay.tsx >/dev/null || fail "layoutWithElk() not wired"
pass "layout selector wiring present"

# 5) Hard render ceiling for visible nodes
MAX_NODES=$(rg "MAX_INTERACTIVE_NODES\s*=\s*([0-9]+)" apps/web/src/universe/ReactFlowOverlay.tsx -or '$1' | head -n1 || true)
[[ -n "$MAX_NODES" ]] || fail "MAX_INTERACTIVE_NODES not found"
if [[ "$MAX_NODES" =~ ^[0-9]+$ ]]; then
  if (( MAX_NODES > 3000 )); then
    fail "MAX_INTERACTIVE_NODES too high ($MAX_NODES > 3000)"
  fi
else
  fail "MAX_INTERACTIVE_NODES parse failed ($MAX_NODES)"
fi
pass "node ceiling bounded ($MAX_NODES)"

# 6) Build safety check
npm run -w @nebula/web typecheck >/dev/null
pass "web typecheck passes"

echo "[NORTH_STAR_GATE] OK"