"use client";

import * as React from "react";

export type SpreadSample = {
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

type SpreadId = "air" | "bound" | "archive";

const SPREADS: {
  id: SpreadId;
  kicker: string;
  name: string;
  rec: string;
}[] = [
  {
    id: "air",
    kicker: "甲",
    name: "留白",
    rec: "编辑设计的路子。把多巴胺收成一条细线和一个点，其余全部让给空白。目录退成浅灰的小字，正文字号拉开层级，靠留白和字重分主次，不靠色块。像设计年鉴，安静但不寡淡。",
  },
  {
    id: "bound",
    kicker: "乙",
    name: "装帧",
    rec: "把它当一本真书来做。中间留出内沟的阴影，页眉有书名和领域，页脚有页码，释义首字下沉。纸色偏暖，通篇宋体。翻的感觉比看的感觉更重。",
  },
  {
    id: "archive",
    kicker: "丙",
    name: "档案",
    rec: "瑞士网格的路子。直角、发丝线、等宽字体标注年代与编号，目录是一张带序号的索引表。颜色只留一个品红作定位。信息密度最高，也最像一套可以长期查阅的资料。",
  },
];

export function SpreadLab({ samples }: { samples: SpreadSample[] }) {
  const [variant, setVariant] = React.useState<SpreadId>("air");
  const [openId, setOpenId] = React.useState(samples[0]?.id ?? "");
  const open = samples.find((item) => item.id === openId) ?? samples[0];
  const spec = SPREADS.find((item) => item.id === variant)!;
  const index = Math.max(
    0,
    samples.findIndex((item) => item.id === open.id),
  );

  const grouped = React.useMemo(() => {
    const map = new Map<string, SpreadSample[]>();
    for (const item of samples) {
      const list = map.get(item.categoryName) ?? [];
      list.push(item);
      map.set(item.categoryName, list);
    }
    return [...map.entries()];
  }, [samples]);

  if (!open) return null;

  return (
    <div className={`spread-lab sl-${variant}`}>
      <header className="sl-bar">
        <div className="sl-bar-inner">
          <div>
            <h1>历久 · 开本三版</h1>
            <p>
              都是开本：左目录、右一次摊开一条。三版只在质感上分岔。现站未改。
              <a className="sl-link" href="../spreads-app/">
                看互联网风三版 →
              </a>
            </p>
          </div>
          <div className="sl-picks">
            {SPREADS.map((item) => (
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

      <p className="sl-spec">
        <strong>
          {spec.kicker} {spec.name}。
        </strong>{" "}
        {spec.rec}
      </p>

      <div className="sl-stage">
        {variant === "air" ? (
          <Air
            grouped={grouped}
            open={open}
            onOpen={setOpenId}
            index={index}
            total={samples.length}
          />
        ) : null}
        {variant === "bound" ? (
          <Bound
            grouped={grouped}
            open={open}
            onOpen={setOpenId}
            index={index}
            total={samples.length}
          />
        ) : null}
        {variant === "archive" ? (
          <Archive
            grouped={grouped}
            open={open}
            onOpen={setOpenId}
            index={index}
            total={samples.length}
            samples={samples}
          />
        ) : null}
      </div>
    </div>
  );
}

type PaneProps = {
  grouped: [string, SpreadSample[]][];
  open: SpreadSample;
  onOpen: (id: string) => void;
  index: number;
  total: number;
};

/* ───────────────── 甲 · 留白 ───────────────── */
function Air({ grouped, open, onOpen, index, total }: PaneProps) {
  return (
    <div className="air">
      <nav className="air-nav" aria-label="领域目录">
        {grouped.map(([name, items]) => (
          <div key={name} className="air-group">
            <p className="air-cat">{name}</p>
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
      </nav>

      <article className="air-page">
        <p className="air-eyebrow">
          <span className="dot" aria-hidden="true" />
          {open.trigger}
        </p>
        <h2>{open.check}</h2>
        <p className="air-essence">{open.essence}</p>
        <figure className="air-quote">
          <blockquote>{open.quoteText}</blockquote>
          <figcaption>
            {open.quoteSource}
            <span className="sep">·</span>
            {open.quoteEra}
          </figcaption>
        </figure>
        <footer className="air-foot">
          <span>{open.title}</span>
          <span className="num">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </footer>
      </article>
    </div>
  );
}

/* ───────────────── 乙 · 装帧 ───────────────── */
function Bound({ grouped, open, onOpen, index, total }: PaneProps) {
  const first = open.essence.slice(0, 1);
  const rest = open.essence.slice(1);

  return (
    <div className="bound">
      <div className="bound-book">
        <section className="bound-verso">
          <p className="bound-head">历久 · 目次</p>
          <nav aria-label="领域目录">
            {grouped.map(([name, items]) => (
              <div key={name} className="bound-group">
                <p className="bound-cat">{name}</p>
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={open.id === item.id}
                    onClick={() => onOpen(item.id)}
                  >
                    <span className="t">{item.title}</span>
                    <span className="leader" aria-hidden="true" />
                    <span className="p">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <p className="bound-folio">{String(index * 2 + 2).padStart(3, "0")}</p>
        </section>

        <div className="bound-gutter" aria-hidden="true" />

        <article className="bound-recto">
          <p className="bound-head">
            <span>{open.categoryName}</span>
            <span>{open.trigger}</span>
          </p>
          <h2>{open.check}</h2>
          <p className="bound-essence">
            <span className="drop">{first}</span>
            {rest}
          </p>
          <figure className="bound-quote">
            <blockquote>{open.quoteText}</blockquote>
            <figcaption>
              {open.quoteSource}
              <br />
              {open.quoteEra}
            </figcaption>
          </figure>
          <p className="bound-rule" aria-hidden="true" />
          <p className="bound-title">{open.title}</p>
          <p className="bound-folio">{String(index * 2 + 3).padStart(3, "0")}</p>
        </article>
      </div>
    </div>
  );
}

/* ───────────────── 丙 · 档案 ───────────────── */
function Archive({
  grouped,
  open,
  onOpen,
  index,
  total,
  samples,
}: PaneProps & { samples: SpreadSample[] }) {
  return (
    <div className="archive">
      <nav className="arc-index" aria-label="索引">
        <p className="arc-index-head">
          <span>索引</span>
          <span>{String(total).padStart(2, "0")} 条</span>
        </p>
        {grouped.map(([name, items]) => (
          <div key={name} className="arc-group">
            <p className="arc-cat">{name}</p>
            {items.map((item) => {
              const n = samples.findIndex((s) => s.id === item.id) + 1;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={open.id === item.id}
                  onClick={() => onOpen(item.id)}
                >
                  <span className="n">{String(n).padStart(2, "0")}</span>
                  <span className="t">{item.title}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <article className="arc-page">
        <header className="arc-meta">
          <span className="arc-no">
            NO.{String(index + 1).padStart(2, "0")}
          </span>
          <span>{open.categoryName}</span>
          <span>流传约 {open.ageYears} 年</span>
          <span className="arc-trig">{open.trigger}</span>
        </header>

        <h2>{open.check}</h2>

        <div className="arc-cols">
          <div className="arc-col">
            <p className="arc-label">释义</p>
            <p className="arc-body">{open.essence}</p>
          </div>
          <div className="arc-col">
            <p className="arc-label">原典</p>
            <blockquote className="arc-quote">{open.quoteText}</blockquote>
            <p className="arc-src">
              {open.quoteSource}
              <br />
              {open.quoteEra}
            </p>
          </div>
        </div>

        <footer className="arc-foot">
          <span className="arc-title">{open.title}</span>
          <span className="arc-tags">
            {open.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </footer>
      </article>
    </div>
  );
}
