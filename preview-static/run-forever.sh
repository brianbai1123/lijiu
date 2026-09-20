#!/usr/bin/env bash
# Keeps the static layout-lab preview server alive on port 43127.
# Runs inside a persistent tmux session so it survives tool-call boundaries.
cd /workspace || exit 1
while true; do
  echo "[$(date -u +%H:%M:%S)] starting static preview server..."
  node /workspace/preview-static/serve.mjs
  echo "[$(date -u +%H:%M:%S)] server exited (code $?), restarting in 1s..."
  sleep 1
done
