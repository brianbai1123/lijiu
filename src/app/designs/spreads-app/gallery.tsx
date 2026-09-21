"use client";

import * as React from "react";

export type AppSample = {
  id: string;
  title: string;
  check: string;
  trigger: string;
  essence: string;
  categoryName: string;
  ageYears: number;
  quoteText: string;
  quoteSource: string;
  quoteEra: string;
  tags: string[];
};

type VariantId = "console" | "product" | "workspace";

const VARIANTS: {
  id: VariantId;
  kicker: string;
  name: string;
  ref: string;
  rec: string;
}[] = [
  {
    id: "console",
    kicker: "丁",
    name: "深色控制台",
    ref: "Linear / Vercel",
    rec: "近黑底、低透明度发丝描边、强调色走渐变。元信息用等宽字，右上角挂键盘提示，选中项左侧一道渐变光条。观感偏工具、偏专业，夜里读不刺眼。",
  },
  {
    id: "product",
    kicker: "戊",
    name: "明亮产品页",
    ref: "Stripe / Apple",
    rec: "大字重、紧字距的标题压场，背景一层极淡的网格渐变，卡片用多层柔和投影堆出层次，圆角开到 20px。最像一个正在被推广的产品首页。",
  },
  {
    id: "workspace",
    kicker: "己",
    name: "工作台",
    ref: "Notion / Arc",
    rec: "暖中性底色，侧栏用彩色圆点分领域，正文切成块，悬停才浮出反馈。不喧哗，适合长时间待着，像一个整理得很好的知识库。",
  },
];

export function AppSpreadLab({ samples }: { samples: AppSample[] }) {
  const [variant, setVariant] = React.useState<VariantId>("console");
  const [openId, setOpenId] = React.useState(samples[0]?.id ?? "");
  const open = samples.find((item) => item.id === openId) ?? samples[0];
  const spec = VARIANTS.find((item) => item.id === variant)!;
  const index = Math.max(
    0,
    samples.findIndex((item) => item.id === open.id),
  );

  const grouped = React.useMemo(() => {
    const map = new Map<string, AppSample[]>();
    for (const item of samples) {
      const list = map.get(item.categoryName) ?? [];
      list.push(item);
      map.set(item.categoryName, list);
    }
    return [...map.entries()];
  }, [samples]);

  if (!open) return null;

  const paneProps = { grouped, open, onOpen: setOpenId, index, total: samples.length, samples };

  return (
    <div className={`app-lab al-${variant}`}>
      <header className="al-bar">
        <div className="al-bar-inner">
          <div>
            <h1>历久 · 开本三版（互联网风）</h1>
            <p>
              同一个开本结构，参考头部互联网产品的设计语言。现站未改。
              <a href="../spreads/">← 看前三版（留白 / 装帧 / 档案）</a>
            </p>
          </div>
          <div className="al-picks">
            {VARIANTS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={variant === item.id}
                onClick={() => setVariant(item.id)}
              >
                <span className="k">{item.kicker}</span>
                <span className="n">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <p className="al-spec">
        <strong>
          {spec.kicker} {spec.name}
        </strong>
        <span className="al-ref">参考 {spec.ref}</span>
        {spec.rec}
      </p>

      <div className="al-stage">
        {variant === "console" ? <Console {...paneProps} /> : null}
        {variant === "product" ? <Product {...paneProps} /> : null}
        {variant === "workspace" ? <Workspace {...paneProps} /> : null}
      </div>
    </div>
  );
}

type PaneProps = {
  grouped: [string, AppSample[]][];
  open: AppSample;
  onOpen: (id: string) => void;
  index: number;
  total: number;
  samples: AppSample[];
};

/* ═══════════ 丁 · 深色控制台 ═══════════ */
function Console({ grouped, open, onOpen, index, total, samples }: PaneProps) {
  return (
    <div className="console">
      <aside className="con-side">
        <div className="con-side-head">
          <span className="con-dot" aria-hidden="true" />
          <span>原则库</span>
          <span className="con-count">{total}</span>
        </div>
        <nav aria-label="领域目录">
          {grouped.map(([name, items]) => (
            <div key={name} className="con-group">
              <p className="con-cat">{name}</p>
              {items.map((item) => {
                const n = samples.findIndex((s) => s.id === item.id) + 1;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={open.id === item.id}
                    onClick={() => onOpen(item.id)}
                  >
                    <span className="con-n">
                      {String(n).padStart(2, "0")}
                    </span>
                    <span className="con-t">{item.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      <article className="con-main">
        <header className="con-top">
          <span className="con-crumb">
            {open.categoryName}
            <span className="con-slash">/</span>
            {open.title}
          </span>
          <span className="con-kbd">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            切换
          </span>
        </header>

        <div className="con-body">
          <span className="con-badge">{open.trigger}</span>
          <h2>{open.check}</h2>
          <p className="con-essence">{open.essence}</p>

          <div className="con-quote">
            <p>{open.quoteText}</p>
            <footer>
              {open.quoteSource}
              <span className="con-sep">·</span>
              {open.quoteEra}
            </footer>
          </div>
        </div>

        <footer className="con-foot">
          <span>流传约 {open.ageYears} 年</span>
          <span className="con-prog">
            {String(index + 1).padStart(2, "0")}
            <span className="con-slash">/</span>
            {String(total).padStart(2, "0")}
          </span>
        </footer>
      </article>
    </div>
  );
}

/* ═══════════ 戊 · 明亮产品页 ═══════════ */
function Product({ grouped, open, onOpen, index, total }: PaneProps) {
  return (
    <div className="product">
      <aside className="pro-side">
        {grouped.map(([name, items]) => (
          <div key={name} className="pro-group">
            <p className="pro-cat">{name}</p>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={open.id === item.id}
                onClick={() => onOpen(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <article className="pro-main">
        <p className="pro-eyebrow">
          <span className="pro-gdot" aria-hidden="true" />
          {open.trigger}
        </p>

        <h2>{open.check}</h2>
        <p className="pro-essence">{open.essence}</p>

        <div className="pro-card">
          <p className="pro-quote">{open.quoteText}</p>
          <p className="pro-src">
            {open.quoteSource}
            <span className="pro-sep">·</span>
            {open.quoteEra}
          </p>
        </div>

        <div className="pro-stats">
          <div>
            <p className="pro-k">流传</p>
            <p className="pro-v">
              {open.ageYears}
              <span className="pro-u">年</span>
            </p>
          </div>
          <div>
            <p className="pro-k">领域</p>
            <p className="pro-v sm">{open.categoryName}</p>
          </div>
          <div>
            <p className="pro-k">序号</p>
            <p className="pro-v sm">
              {String(index + 1).padStart(2, "0")} / {total}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ═══════════ 己 · 工作台 ═══════════ */
const DOTS = ["#ff3d7f", "#4d8dff", "#19d4b2", "#f5a524"];

function Workspace({ grouped, open, onOpen, samples }: PaneProps) {
  return (
    <div className="workspace">
      <aside className="ws-side">
        <div className="ws-side-head">历久</div>
        {grouped.map(([name, items], gi) => (
          <div key={name} className="ws-group">
            <p className="ws-cat">{name}</p>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={open.id === item.id}
                onClick={() => onOpen(item.id)}
              >
                <span
                  className="ws-dot"
                  style={{ background: DOTS[gi % DOTS.length] }}
                  aria-hidden="true"
                />
                <span className="ws-t">{item.title}</span>
              </button>
            ))}
          </div>
        ))}
        <p className="ws-side-foot">{samples.length} 条原则</p>
      </aside>

      <article className="ws-main">
        <div className="ws-chips">
          <span className="ws-chip">{open.categoryName}</span>
          <span className="ws-chip ghost">{open.trigger}</span>
          <span className="ws-chip ghost">约 {open.ageYears} 年</span>
        </div>

        <h2>{open.check}</h2>

        <div className="ws-block">
          <p className="ws-label">释义</p>
          <p className="ws-body">{open.essence}</p>
        </div>

        <div className="ws-block">
          <p className="ws-label">原典</p>
          <div className="ws-callout">
            <p className="ws-quote">{open.quoteText}</p>
            <p className="ws-src">
              {open.quoteSource} · {open.quoteEra}
            </p>
          </div>
        </div>

        <div className="ws-tags">
          {open.tags.map((tag) => (
            <span key={tag}># {tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
