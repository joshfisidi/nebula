#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PID_FILE="$ROOT_DIR/.nebula-dev.pid"
LOG_FILE="$ROOT_DIR/.nebula-dev.log"

if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Nebula dev stack already running (pid $(cat "$PID_FILE"))"
  exit 0
fi

cd "$ROOT_DIR"
nohup "$ROOT_DIR/scripts/dev/start.sh" "$@" >"$LOG_FILE" 2>&1 &
PID=$!
echo "$PID" > "$PID_FILE"

echo "Nebula dev stack started in background"
echo "- pid: $PID"
echo "- log: $LOG_FILE"
