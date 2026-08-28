# 历久 · 经时间检验的人生原则

一个可检索、可对照阅读的原则库。收录 32 条被不同文明或不同学科**各自独立**得出、并且在此后数百上千年里没有被推翻的人生原则。

它不是一份鸡汤语录。每一条都包含：

- **原典**：可考的出处、篇目与年代
- **它为什么没有被时间淘汰**：机制层面的解释，而不是「古人诚不我欺」
- **独立来源的印证**：另一个文明、另一个学科给出的同一结论
- **可以今天就开始做的**：具体动作，不是态度
- **常见误读**：这条原则最经常被曲解成什么
- **它在什么时候失效**：真理也有适用范围
- **与它互相制衡的原则**：可点击跳转，因为任何一条推到极致都会变成自己的反面

## 为什么要写失效边界和互相制衡

「知足不辱」和「复利」拉向相反的方向，「先活下来」和「做难而正确的事」也是。把它们并列展示、而不是各自单独供着，是这个项目和一般格言集最大的区别。能用一条原则解决的人生，还没开始。

## 收录标准

1. 有可考的原始出处（引文尽量注明篇目；转述与流传语标明「归于」「常引作」）
2. 在互不相通的文明或学科中被独立提出过
3. 到今天仍能被证伪，也仍未被证伪

## 用 Docker Desktop 启停（推荐）

前提：本机已安装并启动 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。

在项目根目录执行：

```bash
# 首次或依赖变更后：构建并后台启动
docker compose up -d --build

# 或用 npm 脚本
npm run docker:up
```

浏览器打开 [http://127.0.0.1:43127](http://127.0.0.1:43127)。

| 你想做的事 | 命令 | 也可用 Docker Desktop |
|---|---|---|
| 启动 | `docker compose up -d --build` 或 `npm run docker:up` | Containers 里点 Start |
| 停止 | `docker compose stop` 或 `npm run docker:down` | 点 Stop |
| 看日志 | `docker compose logs -f` 或 `npm run docker:logs` | 点容器看 Logs |
| 重启 | `docker compose restart` 或 `npm run docker:restart` | Stop 再 Start |
| 彻底删除容器（保留镜像） | `docker compose down` | Delete container |

容器名是 `lijiu`，在 Docker Desktop 的 Containers 列表里一眼能找到。

### Cursor 里改代码，浏览器自动更新

`docker-compose.yml` 把当前项目目录挂进容器，并开启文件轮询（`WATCHPACK_POLLING`）。因此：

1. 在 Cursor 里改 `src/`、样式、数据等
2. 保存后，容器内的 Next.js 会检测到变化并热更新
3. 浏览器刷新或自动 HMR 即可看到结果

无需重建镜像。只有改了 `package.json` / `package-lock.json`（加依赖）时，容器启动入口会自动 `npm ci`；若已在跑，执行一次 `docker compose restart` 即可。

改了 `Dockerfile` 或 `docker-compose.yml` 本身时，才需要：

```bash
docker compose up -d --build
```

## 不用 Docker、直接本机跑

```bash
npm install
npm run dev
```

同样监听 [http://127.0.0.1:43127](http://127.0.0.1:43127)。不要和 Docker 容器同时占用同一端口。

其他命令：

```bash
npm run build    # 生产构建
npm start        # 运行生产构建
npm run lint     # ESLint
npx tsc --noEmit # 类型检查
```

## 技术栈

- Next.js 16（App Router）+ React 19 + TypeScript
- Tailwind CSS v4，配色是为长篇中文阅读调过的宣纸／墨色两套主题
- shadcn/ui（Radix 底座）+ lucide 图标
- next-themes 负责浅色／深色切换
- Docker Compose 开发容器（源码挂载 + 热更新）

无后端、无数据库、无需任何密钥，全部内容是静态数据。

## 目录结构

```
Dockerfile               开发镜像
docker-compose.yml       启停、端口、卷挂载、热更新环境变量
docker-entrypoint.sh     依赖变更时自动 npm ci
.dockerignore
src/
  app/
    layout.tsx           根布局、主题 Provider、元信息
    page.tsx             首页：Hero、今日一则入口、页脚说明
    globals.css          主题变量与中文排版调整
  components/
    explorer.tsx         搜索、分类筛选、随机抽取、详情弹窗
    principle-card.tsx   列表卡片
    principle-detail.tsx 详情内容（原典／印证／实践／误读／边界／制衡）
    theme-provider.tsx   next-themes 封装
    theme-toggle.tsx     主题切换按钮
    ui/                  shadcn/ui 组件
  data/
    principles.ts        全部原则数据与类型定义（内容都在这里）
```

## 增改内容

所有文字集中在 `src/data/principles.ts`。新增一条原则就是往 `principles` 数组里加一个对象，`Principle` 类型会强制你把出处、误读和失效边界都写全——这是刻意的。

`tensions` 字段填其他原则的 `id`，详情页会自动渲染成可点击的跳转，无需额外配置。
