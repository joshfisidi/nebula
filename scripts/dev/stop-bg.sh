#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PID_FILE="$ROOT_DIR/.nebula-dev.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo "Nebula dev stack is not running (no pid file)."
  exit 0
fi

PID="$(cat "$PID_FILE")"
if kill -0 "$PID" 2>/dev/null; then
  kill "$PID" || true
  sleep 1
fi

rm -f "$PID_FILE"
echo "Nebula dev stack stopped."
