# 开发镜像：跑 Next.js 热更新，源码由 compose 挂载进来
FROM node:22-bookworm-slim

WORKDIR /app

# 先只拷依赖清单，利用层缓存；源码在运行时挂载，不打进镜像
COPY package.json package-lock.json ./

RUN npm ci

# 入口脚本：依赖变更时自动 npm ci，再启动 dev server
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 43127

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev:docker"]
