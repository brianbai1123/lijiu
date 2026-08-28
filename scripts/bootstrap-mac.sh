#!/bin/bash
# 在本机 Mac 终端执行本脚本，将「历久」部署到 /Users/cc/docker/lijiu 并用 Docker 启动。
# 用法（任选其一）：
#   bash scripts/bootstrap-mac.sh
#   curl / 下载后： bash /path/to/bootstrap-mac.sh
set -euo pipefail

TARGET="${LIJIU_DIR:-/Users/cc/docker/lijiu}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v docker >/dev/null 2>&1; then
  echo "未找到 docker 命令。请先安装并打开 Docker Desktop。"
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Docker 引擎未运行。请打开 Docker Desktop，等左下角显示 Engine running 后再试。"
  exit 1
fi

echo "==> 目标目录: $TARGET"
mkdir -p "$(dirname "$TARGET")"

# 若当前就在仓库里跑，直接同步到目标目录；否则要求目标目录已有代码
if [ -f "$REPO_ROOT/docker-compose.yml" ] && [ -f "$REPO_ROOT/package.json" ]; then
  echo "==> 从仓库同步文件到 $TARGET"
  mkdir -p "$TARGET"
  # 用 rsync 若可用，否则用 tar 管道，始终排除 node_modules / .next / .git
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete \
      --exclude node_modules \
      --exclude .next \
      --exclude .git \
      --exclude '*.tsbuildinfo' \
      "$REPO_ROOT/" "$TARGET/"
  else
    mkdir -p "$TARGET"
    (cd "$REPO_ROOT" && tar cf - \
      --exclude=node_modules \
      --exclude=.next \
      --exclude=.git \
      --exclude='*.tsbuildinfo' \
      .) | (cd "$TARGET" && tar xf -)
  fi
elif [ ! -f "$TARGET/docker-compose.yml" ]; then
  echo "错误：找不到项目代码。"
  echo "请先把本仓库放到某处，再在仓库根目录执行: bash scripts/bootstrap-mac.sh"
  exit 1
fi

chmod +x "$TARGET/docker-entrypoint.sh" 2>/dev/null || true

echo "==> 在 $TARGET 启动 Docker Compose（容器名 lijiu）"
cd "$TARGET"
docker compose up -d --build

echo ""
echo "完成。"
echo "  Docker Desktop → Containers 应看到项目 lijiu / 容器 lijiu"
echo "  浏览器打开: http://127.0.0.1:43127"
echo ""
echo "启停："
echo "  cd $TARGET && docker compose stop     # 停止"
echo "  cd $TARGET && docker compose start    # 启动"
echo "  cd $TARGET && docker compose logs -f  # 日志"
