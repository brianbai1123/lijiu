# 历久 · 经时间检验的人生原则

在线访问（与 [周易读书卡](https://brianbai1123.github.io/zhouyi-reading-cards/) 相同的 GitHub Pages 方式）：

**https://brianbai1123.github.io/lijiu/**

收录 35 条被不同文明或不同学科**各自独立**得出、并且在此后数百上千年里没有被推翻的人生原则。

每一条都包含：原典出处、**背后逻辑**（第一性原理推导）、**历史故事**（正反各 2–3 例）、为何没被时间淘汰、跨来源印证、可执行的实践、常见误读、失效边界，以及与之互相制衡的原则。

## 本地预览

```bash
npm install
npm run dev
```

打开 http://127.0.0.1:43127 。

本地模拟 GitHub Pages 子路径构建：

```bash
npm run build:gh
npx serve out
```

## 部署说明

推送到 `main` 后，GitHub Actions 会静态导出并发布到 Pages。

仓库设置里 Pages 源应为 **GitHub Actions**（首次推送后若未自动启用，在 Settings → Pages 中选中即可）。

畫面卡片使用教育部隸書，其餘界面為思源宋體繁體（Noto Serif TC）。字型說明見 `src/fonts/NOTICE.md`。

## 技术栈

Next.js 16（`output: 'export'`）+ React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui。无后端、无数据库。

## 增改内容

全部文字在 `src/data/principles.ts`。新增一条原则就是加一个对象；`tensions` 填其他原则的 `id` 即可互相关联。
