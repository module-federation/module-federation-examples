#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")"/../.. && pwd)
cd "$ROOT_DIR"

echo "[local-ci] Killing known SSR ports before run…"
node federated-css-react-ssr/scripts/kill-all-ports.cjs || true 2>/dev/null || true

echo "[local-ci] Sockets before run:"
ss -ltnp || true

echo "[local-ci] Running federated-css-react-ssr Playwright tests with 12-minute timeout…"
if command -v timeout >/dev/null 2>&1; then
  timeout 12m pnpm --dir federated-css-react-ssr exec playwright test --reporter=list || STATUS=$?
else
  pnpm --dir federated-css-react-ssr exec playwright test --reporter=list || STATUS=$?
fi

echo "[local-ci] Sockets after run:"
ss -ltnp || true

echo "[local-ci] Killing SSR ports after run…"
node federated-css-react-ssr/scripts/kill-all-ports.cjs || true 2>/dev/null || true

exit ${STATUS:-0}

