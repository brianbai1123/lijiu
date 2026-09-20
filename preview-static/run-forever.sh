#!/usr/bin/env bash
# Keeps the static layout-lab preview server alive on port 43127.
# Runs inside a persistent tmux session so it survives tool-call boundaries.
cd /workspace || exit 1
export PREVIEW_PORT="${1:-${PREVIEW_PORT:-43127}}"
while true; do
  echo "[$(date -u +%H:%M:%S)] starting static preview server on ${PREVIEW_PORT}..."
  node /workspace/preview-static/serve.mjs
  echo "[$(date -u +%H:%M:%S)] server exited (code $?), restarting in 1s..."
  sleep 1
done
