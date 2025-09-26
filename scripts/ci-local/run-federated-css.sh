#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")"/../.. && pwd)
cd "$ROOT_DIR"

echo "[local-ci] Killing known ports before run…"
node federated-css/scripts/kill-all-ports.cjs || true

echo "[local-ci] Snapshot of listening sockets before run:"
ss -ltnp || true

echo "[local-ci] Running federated-css Playwright tests with 9-minute timeout…"
if command -v timeout >/dev/null 2>&1; then
  timeout 9m pnpm --dir federated-css exec playwright test --reporter=list || STATUS=$?
else
  pnpm --dir federated-css exec playwright test --reporter=list || STATUS=$?
fi

echo "[local-ci] Snapshot of listening sockets after run:"
ss -ltnp || true

echo "[local-ci] Killing ports after run…"
node federated-css/scripts/kill-all-ports.cjs || true

exit ${STATUS:-0}

