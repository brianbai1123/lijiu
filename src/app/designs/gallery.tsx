"use client";

import * as React from "react";

import { principleById } from "@/data/principles";

const SAMPLE_IDS = [
  "dichotomy-of-control",
  "occams-razor",
  "incentives",
] as const;

const QUAD: Record<(typeof SAMPLE_IDS)[number], [string, string][]> = {
  "dichotomy-of-control": [
    ["担当区", "在乎 × 能影响"],
    ["焦虑区", "在乎 × 影响不了"],
    ["失职区", "不在乎 × 能影响"],
    ["放下区", "不在乎 × 影响不了"],
  ],
  "occams-razor": [
    ["真简单", "会输 × 假设少"],
    ["真复杂", "会输 × 假设多"],
    ["假简单", "不会输 × 假设少"],
    ["假复杂", "不会输 × 假设多"],
  ],
  incentives: [
    ["画饼", "对着正事 × 只在纸上"],
    ["同一口锅", "对着正事 × 真落到人"],
    ["墙皮", "对着替身 × 只在纸上"],
    ["喂歪", "对着替身 × 真落到人"],
  ],
};

type Proposal = "xuan" | "stele" | "edit" | "dopamine";
type Scheme = "light" | "dark";
type Width = "wide" | "narrow";

const PROPOSALS: {
  id: Proposal;
  kicker: string;
  name: string;
  lede: string;
  fonts: string;
  sizes: string;
  color: string;
  lishu: string;
  swatches: { hex: string; label: string }[];
}[] = [
  {
    id: "xuan",
    kicker: "甲 · 推荐",
    name: "宣纸朱印",
    lede: "把现站已经想做、但没做干净的「读本」做完。卡片主句仍用教育部隶书，导语和正文改成宋体，朱砂只作一处强调。适合这条站的内容气质，阅读负担最低。",
    fonts: "卡片主句：教育部隶书。大标题与引文：Noto Serif SC。界面与正文：Noto Sans SC。",
    sizes: "站名 22px 隶书。主标题 38–58px 宋体。卡片主句 20–21px 隶书 / 行高 1.62 / 字距 0.07em。正文 16px / 行高 1.85。",
    color: "宣纸底 #F3EBD8，墨 #241C14，朱砂 #9C2B1A。深色是油灯下的同一套纸，不是把浅色反相。",
    lishu: "隶书留在它最能发挥作用的位置：站名，以及卡片上那一句检视问题。长文不用隶书。",
    swatches: [
      { hex: "#F3EBD8", label: "宣纸" },
      { hex: "#FBF6EB", label: "卡片" },
      { hex: "#241C14", label: "墨" },
      { hex: "#9C2B1A", label: "朱砂" },
    ],
  },
  {
    id: "stele",
    kicker: "乙",
    name: "青灯碑刻",
    lede: "夜间读碑。界面几乎去掉圆角，强调竖向阅读和金石气。隶书收成站名方印，卡片主句改宋体——长句在碑额体上会散，在宋体上才站得住。",
    fonts: "站名方印：教育部隶书。其余阅读面：Noto Serif SC。标签与导航：Noto Sans SC，略加字距。",
    sizes: "站名 18px 隶书方印。主标题 34–48px 宋体。卡片主句 18px 宋体 / 行高 1.78。正文 16.5px / 行高 1.92。",
    color: "浅色是冷灰石面 #E7E5DE，强调色青铜 #8A6A3C。深色是主推荐：青石底 #101318，铜锈金 #C9A66B。",
    lishu: "隶书只作两字方印，不再承担长句。这是三款里最「博物馆」的一档。",
    swatches: [
      { hex: "#101318", label: "青石" },
      { hex: "#181C24", label: "碑面" },
      { hex: "#E8E3D6", label: "拓墨" },
      { hex: "#C9A66B", label: "青铜" },
    ],
  },
  {
    id: "edit",
    kicker: "丙",
    name: "朱栏编辑室",
    lede: "当代中文杂志的排法。主标题极大、卡片改成条目而不是瓷砖，朱栏红只出现在序号和一条引线。信息密度下降，气质更「出版」而不是「工具」。",
    fonts: "主标题与卡片主句：Noto Serif SC。导航与正文：Noto Sans SC。隶书不再进入卡片。",
    sizes: "站名 15px 黑体加字距。主标题 44–70px 宋体，字距微收。卡片主句 19px 宋体 / 行高 1.5。正文 16px / 行高 1.7。",
    color: "纸白 #F7F6F3 上纯白卡片，墨近纯黑 #141414，强调 #B42318。深色是印刷车间的黑，不是蓝黑。",
    lishu: "这款把隶书从阅读面拿掉。若你觉得现站「一张卡片像一幅字」，会觉得它冷；若你觉得现站难读，会觉得它对。",
    swatches: [
      { hex: "#F7F6F3", label: "纸" },
      { hex: "#FFFFFF", label: "卡片" },
      { hex: "#141414", label: "墨" },
      { hex: "#B42318", label: "朱栏" },
    ],
  },
  {
    id: "dopamine",
    kicker: "丁 · 新试",
    name: "多巴胺",
    lede: "高饱和、多色块、圆角和硬投影。柠檬黄底、品红强调、薄荷标签、天空蓝描边，字仍用可长读的宋体与黑体——颜色在闹，句子还要能读完。",
    fonts: "站名：黑体圆角胶囊。主标题与卡片主句：Noto Serif SC。正文与导航：Noto Sans SC。隶书不进阅读面，避免和糖果色抢戏。",
    sizes: "站名 16px。主标题 36–56px 宋体。卡片主句 19px 宋体 / 行高 1.55。正文 16px / 行高 1.7。卡片圆角 22px。",
    color: "浅色：柠檬黄 #FFF3B0，品红 #FF3D7F，薄荷 #19D4B2，天空蓝 #4D8DFF，字色靛紫 #1B1149。深色：紫夜 #16082B 上的霓虹粉，不是把浅色反相。",
    lishu: "这款把隶书拿掉。多巴胺靠色块建立情绪，再叠碑额体容易又花又糊。",
    swatches: [
      { hex: "#FFF3B0", label: "柠檬" },
      { hex: "#FF3D7F", label: "品红" },
      { hex: "#19D4B2", label: "薄荷" },
      { hex: "#4D8DFF", label: "天空" },
      { hex: "#1B1149", label: "靛紫" },
    ],
  },
];

export function DesignGallery() {
  const [proposal, setProposal] = React.useState<Proposal>("dopamine");
  const [scheme, setScheme] = React.useState<Scheme>("light");
  const [width, setWidth] = React.useState<Width>("wide");
  const [openId, setOpenId] = React.useState<(typeof SAMPLE_IDS)[number]>(
    "dichotomy-of-control",
  );

  const spec = PROPOSALS.find((item) => item.id === proposal)!;
  const samples = SAMPLE_IDS.map((id) => principleById.get(id)!);
  const open = principleById.get(openId)!;
  const daily = principleById.get("dichotomy-of-control")!;

  return (
    <div className="design-page">
      <header className="design-chrome">
        <div className="design-chrome-inner">
          <div>
            <h1>历久 · 视觉提案</h1>
            <p>
              现站未改。甲乙丙之外加了丁「多巴胺」。用真实文案渲染，选定后再改现站。
            </p>
          </div>
          <div className="design-picks">
            {PROPOSALS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={proposal === item.id}
                onClick={() => setProposal(item.id)}
              >
                <span className="pick-kicker">{item.kicker}</span>
                <span className="pick-name">{item.name}</span>
              </button>
            ))}
          </div>
          <div className="design-toggles">
            <button
              type="button"
              aria-pressed={scheme === "light"}
              onClick={() => setScheme("light")}
            >
              浅色
            </button>
            <button
              type="button"
              aria-pressed={scheme === "dark"}
              onClick={() => setScheme("dark")}
            >
              深色
            </button>
            <button
              type="button"
              aria-pressed={width === "wide"}
              onClick={() => setWidth("wide")}
            >
              桌面
            </button>
            <button
              type="button"
              aria-pressed={width === "narrow"}
              onClick={() => setWidth("narrow")}
            >
              手机
            </button>
          </div>
        </div>
      </header>

      <div className="design-body">
        <aside className="design-spec">
          <h2>
            {spec.kicker} {spec.name}
          </h2>
          <p className="lede">{spec.lede}</p>
          <dl>
            <dt>字体</dt>
            <dd>{spec.fonts}</dd>
            <dt>字号</dt>
            <dd>{spec.sizes}</dd>
            <dt>配色</dt>
            <dd>{spec.color}</dd>
            <dt>隶书怎么用</dt>
            <dd>{spec.lishu}</dd>
          </dl>
          <div className="design-swatches">
            {spec.swatches.map((swatch) => (
              <span key={swatch.hex}>
                <i style={{ background: swatch.hex }} />
                {swatch.label}
              </span>
            ))}
          </div>
        </aside>

        <div className="design-frame-wrap">
          <div
            className="design-frame"
            data-proposal={proposal}
            data-scheme={scheme}
            data-width={width}
          >
            <header className="d-header">
              <div className="d-brand">
                <strong>历久</strong>
                <span>经时间检验的人生原则</span>
              </div>
              <div className="d-nav">全部 35 条</div>
            </header>

            <section className="d-hero">
              <p className="d-kicker">35 PRINCIPLES · 7 DOMAINS · 2400+ YEARS</p>
              <h2>
                哪些道理，
                <br />
                真的扛住了时间
              </h2>
              <p>
                这里收录的每一条，都满足同一个标准：它被至少两个互不相通的文明或学科各自独立地得出过，并且在此后数百上千年里没有被推翻。
              </p>
              <dl className="d-stats">
                <div>
                  <dt>收录原则</dt>
                  <dd>35 条</dd>
                </div>
                <div>
                  <dt>覆盖领域</dt>
                  <dd>7 个</dd>
                </div>
                <div>
                  <dt>最早可追溯</dt>
                  <dd>2400 年前</dd>
                </div>
                <div>
                  <dt>标注失效边界</dt>
                  <dd>100%</dd>
                </div>
              </dl>
            </section>

            <section className="d-daily">
              <p className="d-kicker">今日一则 · {daily.trigger}</p>
              <div className="d-daily-card">
                <h3>{daily.check}</h3>
                <p>
                  {daily.title} · {daily.essence}
                </p>
                <p className="d-quote">
                  {daily.quotes[0].text}
                  <br />
                  <span style={{ color: "var(--d-muted)", fontSize: "0.75rem" }}>
                    {daily.quotes[0].source} · {daily.quotes[0].era}
                  </span>
                </p>
              </div>
            </section>

            <section className="d-list">
              <p className="d-kicker">原则卡片</p>
              <div className="d-cards">
                {samples.map((principle, index) => (
                  <button
                    key={principle.id}
                    type="button"
                    className="d-card"
                    aria-pressed={openId === principle.id}
                    onClick={() =>
                      setOpenId(principle.id as (typeof SAMPLE_IDS)[number])
                    }
                  >
                    <div className="d-card-top">
                      <span className="d-idx">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="d-chip">{principle.trigger}</span>
                    </div>
                    <h3>{principle.check}</h3>
                    <div className="d-card-foot">
                      <span>{principle.title}</span>
                      <span>认知与判断</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="d-detail">
              <p className="d-kicker">
                {open.trigger} · {open.title}
              </p>
              <h3>{open.check}</h3>
              <p className="d-body">{open.essence}</p>
              <p className="d-quote">{open.quotes[0].text}</p>
              <div className="d-quad">
                {QUAD[open.id as (typeof SAMPLE_IDS)[number]].map(([name, axis]) => (
                  <b key={name}>
                    {name}
                    <small>{axis}</small>
                  </b>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
