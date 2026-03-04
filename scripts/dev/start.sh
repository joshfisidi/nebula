#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found. Run: corepack enable && corepack prepare pnpm@latest --activate"
  exit 1
fi

SERVER_BIN="$ROOT_DIR/apps/server/node_modules/.bin/tsx"
WEB_BIN="$ROOT_DIR/apps/web/node_modules/.bin/next"

if [[ ! -x "$SERVER_BIN" || ! -x "$WEB_BIN" ]]; then
  echo "Missing local dev binaries. Run: pnpm install"
  exit 1
fi

# Parse web CLI args so `pnpm dev -- -p 3003` overrides WEB_PORT.
WEB_CLI_ARGS=()
WEB_PORT_CLI=""
while (($#)); do
  case "$1" in
    --)
      shift
      ;;
    -p|--port)
      if (($# < 2)); then
        echo "Missing value for $1"
        exit 1
      fi
      WEB_PORT_CLI="$2"
      shift 2
      ;;
    --port=*)
      WEB_PORT_CLI="${1#*=}"
      shift
      ;;
    *)
      WEB_CLI_ARGS+=("$1")
      shift
      ;;
  esac
done

export WATCH_DIR="${WATCH_DIR:-$ROOT_DIR}"
export MULTI_PROJECT_ROOT="${MULTI_PROJECT_ROOT:-0}"
export ENABLE_IMPORT_EDGES="${ENABLE_IMPORT_EDGES:-0}"
export PORT="${PORT:-4001}"
if [[ -n "$WEB_PORT_CLI" ]]; then
  export WEB_PORT="$WEB_PORT_CLI"
else
  export WEB_PORT="${WEB_PORT:-3000}"
fi

echo "Starting Nebula dev stack"
echo "- watch root: $WATCH_DIR"
echo "- websocket: ws://localhost:$PORT"
echo "- ws (LAN):  ws://<device-ip>:$PORT"
echo "- import edges: $ENABLE_IMPORT_EDGES"
echo "- web:       http://localhost:$WEB_PORT"
echo "- web (LAN): http://<device-ip>:$WEB_PORT"

(
  cd "$ROOT_DIR/apps/server"
  "$SERVER_BIN" watch src/index.ts
) &
SERVER_PID=$!

(
  cd "$ROOT_DIR/apps/web"
  "$WEB_BIN" dev --hostname 0.0.0.0 --port "$WEB_PORT" "${WEB_CLI_ARGS[@]}"
) &
WEB_PID=$!

cleanup() {
  echo "\nStopping Nebula dev stack..."
  kill "$SERVER_PID" "$WEB_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT
wait
