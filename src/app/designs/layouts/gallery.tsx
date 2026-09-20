"use client";

import * as React from "react";

export type LayoutSample = {
  id: string;
  title: string;
  check: string;
  trigger: string;
  essence: string;
  categoryName: string;
  quoteText: string;
  quoteSource: string;
};

type LayoutId = "scroll" | "spread" | "film";

const LAYOUTS: { id: LayoutId; kicker: string; name: string; rec: string }[] = [
  {
    id: "scroll",
    kicker: "A · 推荐",
    name: "长卷",
    rec: "去掉盒子。序号、检视句、何时想起排成一条通栏，像杂志目录或碑阴题名。35 条仍然扫得完，「焦虑时」也找得到。现有卡片的问题是每张都长得一样，句子反而被框吃掉。",
  },
  {
    id: "spread",
    kicker: "B",
    name: "开本",
    rec: "左边是领域目录，右边一次摊开一条。适合读，不适合逛。原则从「商品货架」变成「一本书翻开的那一页」。",
  },
  {
    id: "film",
    kicker: "C",
    name: "一条",
    rec: "一次只给一句，字开到接近海报。最不像工具站，也最吃阅读耐心。当展览成立，当手册就慢。",
  },
];

export function LayoutLab({ samples }: { samples: LayoutSample[] }) {
  const [layout, setLayout] = React.useState<LayoutId>("scroll");
  const [openId, setOpenId] = React.useState(samples[0]?.id ?? "");
  const open = samples.find((item) => item.id === openId) ?? samples[0];
  const spec = LAYOUTS.find((item) => item.id === layout)!;
  const filmIndex = Math.max(
    0,
    samples.findIndex((item) => item.id === open.id),
  );

  const goFilm = (delta: number) => {
    const next = samples[(filmIndex + delta + samples.length) % samples.length];
    setOpenId(next.id);
  };

  if (!open) return null;

  return (
    <div className="layout-lab">
      <header className="layout-bar">
        <div className="layout-bar-inner">
          <div>
            <h1>历久 · 排版实验室</h1>
            <p>
              配色沿用丁款。这里只换排版：不用卡片格子。现站未改。选定 A / B / C
              后再落地。
            </p>
          </div>
          <div className="layout-picks">
            {LAYOUTS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={layout === item.id}
                onClick={() => setLayout(item.id)}
              >
                <span className="k">{item.kicker}</span>
                <span className="n">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <p className="layout-spec">
        <strong>
          {spec.kicker} {spec.name}。
        </strong>{" "}
        {spec.rec}
      </p>

      <div className="layout-stage">
        {layout === "scroll" ? (
          <div className="scroll-list">
            {samples.map((principle, index) => (
              <button
                key={principle.id}
                type="button"
                className="scroll-row"
                aria-pressed={openId === principle.id}
                onClick={() => setOpenId(principle.id)}
              >
                <span className="no">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{principle.check}</h2>
                  <p className="meta">
                    {principle.title} · {principle.categoryName}
                  </p>
                </div>
                <span className="trig">{principle.trigger}</span>
              </button>
            ))}
          </div>
        ) : null}

        {layout === "spread" ? (
          <Spread samples={samples} open={open} onOpen={setOpenId} />
        ) : null}

        {layout === "film" ? (
          <div className="film">
            <p className="trig">{open.trigger}</p>
            <h2>{open.check}</h2>
            <p className="essence">{open.essence}</p>
            <div className="film-nav">
              <button type="button" onClick={() => goFilm(-1)}>
                上一条
              </button>
              <span className="count">
                {String(filmIndex + 1).padStart(2, "0")} / {samples.length}
              </span>
              <button type="button" onClick={() => goFilm(1)}>
                下一条
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Spread({
  samples,
  open,
  onOpen,
}: {
  samples: LayoutSample[];
  open: LayoutSample;
  onOpen: (id: string) => void;
}) {
  const grouped = React.useMemo(() => {
    const map = new Map<string, LayoutSample[]>();
    for (const item of samples) {
      const list = map.get(item.categoryName) ?? [];
      list.push(item);
      map.set(item.categoryName, list);
    }
    return [...map.entries()];
  }, [samples]);

  return (
    <div className="spread">
      <nav className="spread-nav" aria-label="领域目录">
        {grouped.map(([name, items]) => (
          <React.Fragment key={name}>
            <p
              style={{
                margin: "0.7rem 0 0.2rem",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                color: "#ff3d7f",
              }}
            >
              {name}
            </p>
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
          </React.Fragment>
        ))}
      </nav>
      <article className="spread-page">
        <span className="trig">{open.trigger}</span>
        <h2>{open.check}</h2>
        <p className="essence">{open.essence}</p>
        <p className="quote">
          {open.quoteText}
          <br />
          <span style={{ color: "#5a4d8a", fontSize: "0.8rem" }}>
            {open.quoteSource}
          </span>
        </p>
        <p className="foot">{open.title}</p>
      </article>
    </div>
  );
}
