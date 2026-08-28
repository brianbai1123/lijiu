import type { NextConfig } from "next";

/** 与 GitHub 仓库名一致 → https://brianbai1123.github.io/lijiu/ */
const repo = "lijiu";
const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // 静态导出，可部署到 GitHub Pages（与周易读书卡同一种访问方式）
  output: "export",
  images: { unoptimized: true },
  // 子路径站点需要尾斜杠，否则刷新深层路径会 404
  trailingSlash: true,
  basePath: isGhPages ? `/${repo}` : "",
  assetPrefix: isGhPages ? `/${repo}/` : undefined,
  turbopack: {},
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
