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

## 本地运行

```bash
npm install
npm run dev
```

默认监听 <http://localhost:43127>（端口在 `package.json` 的 `dev` 脚本里指定，避开常见端口冲突）。

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

无后端、无数据库、无需任何密钥，全部内容是静态数据。

## 目录结构

```
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
