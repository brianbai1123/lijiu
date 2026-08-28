import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 本机 `npm run dev` 继续走 Turbopack；Docker 里用 `dev:docker`（--webpack）
  turbopack: {},
  // Docker Desktop 下 inotify 经常收不到宿主机改动，轮询才能热更新
  webpack: (config, { dev }) => {
    if (dev && process.env.WATCHPACK_POLLING === "true") {
      const interval = Number(process.env.WATCHPACK_POLL_INTERVAL) || 1000;
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        poll: interval,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
