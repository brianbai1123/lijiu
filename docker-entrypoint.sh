#!/bin/sh
set -eu

# 宿主机源码挂载会盖掉镜像里的 node_modules；用命名卷承载依赖。
# package-lock.json 变动时自动重装，避免 Cursor 里加包后容器仍用旧依赖。
MARKER=/app/node_modules/.deps-lock-hash
CURRENT="$(cksum package-lock.json | awk '{print $1" "$2}')"

if [ ! -d node_modules ] || [ ! -f "$MARKER" ] || [ "$(cat "$MARKER")" != "$CURRENT" ]; then
  echo "[docker] installing dependencies…"
  npm ci
  mkdir -p node_modules
  echo "$CURRENT" > "$MARKER"
  echo "[docker] dependencies ready"
fi

exec "$@"
