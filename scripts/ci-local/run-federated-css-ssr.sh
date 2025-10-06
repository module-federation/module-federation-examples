#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")"/../.. && pwd)
cd "$ROOT_DIR"

echo "[local-ci] Killing known SSR ports before run…"
node federated-css-react-ssr/scripts/kill-all-ports.cjs || true 2>/dev/null || true

echo "[local-ci] Sockets before run:"
ss -ltnp || true

MAX_SECS=$((7*60))
echo "[local-ci] Running federated-css-react-ssr Playwright tests with ${MAX_SECS}s max timeout…"

run_with_timeout() {
  set +e
  ( pnpm --dir federated-css-react-ssr exec playwright test --reporter=list ) &
  PW_PID=$!
  (
    sleep "$MAX_SECS"
    if kill -0 "$PW_PID" 2>/dev/null; then
      echo "[local-ci] TIMEOUT reached (${MAX_SECS}s). Killing SSR ports and Playwright (pid=$PW_PID)…"
      node federated-css-react-ssr/scripts/kill-all-ports.cjs || true
      kill -TERM "$PW_PID" 2>/dev/null || true
      sleep 2
      kill -KILL "$PW_PID" 2>/dev/null || true
      exit 124
    fi
  ) & WATCHDOG=$!
  wait "$PW_PID"; STATUS=$?
  kill -TERM "$WATCHDOG" 2>/dev/null || true
  wait "$WATCHDOG" 2>/dev/null || true
  set -e
  return $STATUS
}

run_with_timeout || STATUS=$?

echo "[local-ci] Sockets after run:"
ss -ltnp || true

echo "[local-ci] Killing SSR ports after run…"
node federated-css-react-ssr/scripts/kill-all-ports.cjs || true 2>/dev/null || true

exit ${STATUS:-0}
