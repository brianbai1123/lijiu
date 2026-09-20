export type StemSymbol = {
  symbol: string;
  meaning: string;
};

export type StemMappingRow = {
  card: string;
  model: string;
};

export type StemBlock = {
  id: "math" | "epictetus" | "physics" | "chemistry";
  field: string;
  title: string;
  formula: string;
  symbols?: StemSymbol[];
  body: string;
  mapping?: StemMappingRow[];
  close?: string;
};

export const dichotomyStemHeading = "STEM模型：你只能努力改变自变量";

export const dichotomyStemIntro =
  "结果是函数，你只能努力改变自变量。这条原则不是劝你少在乎结果，而是：只优化你能选的动作，停止假装自己能改世界的扰动。";

export const dichotomyStemBlocks: StemBlock[] = [
  {
    id: "math",
    field: "数学",
    title: "你不选结果，只选动作",
    formula: "Y = f(A, W)",
    symbols: [
      { symbol: "Y", meaning: "结果：签不签得下、病不病、裁不裁员。" },
      { symbol: "A", meaning: "你能选的动作。" },
      { symbol: "W", meaning: "世界的扰动：别人、运气、历史、身体里你动不了的部分。" },
    ],
    body: "四象限里的「影响」，就是 |∂Y/∂A|——你的手往下按，结果会不会动。它不是开关，是连续的灵敏度。还能推动 30%，就是还有梯度；把这件事划进不可控，等于把梯度扔掉。\n\n口子不是鸡汤。它是：找到梯度最大、且你真能改的那个坐标，把全部力气压上去。只走这一步：argmax_A E[Y | A]。",
  },
  {
    id: "epictetus",
    field: "控制论",
    title: "爱比克泰德不选状态，只选策略",
    formula: "P(Sₜ₊₁ | Sₜ, Aₜ)",
    body: "随机控制里这叫马尔可夫决策：你选动作 Aₜ，世界按概率转移到下一状态，你拿奖励。你永远不选状态本身。锁链、主人、身体是 S；判断、态度、言行是 A。他和算法说的是同一句话。",
    mapping: [
      { card: "能决定的", model: "决策变量 A" },
      {
        card: "能影响的（中间那栏）",
        model: "A 能推动转移概率，但 Y 仍随机",
      },
      { card: "不能影响的", model: "过程噪声 W，再算也变不了分布" },
      { card: "把手伸进口子", model: "只在可控方向走一步：argmax_A E[Y | A]" },
      { card: "焦虑空转", model: "在脑子里反复采样 W，不更新 A" },
      { card: "失职", model: "A 能改概率，你却把 A 留在默认值" },
      {
        card: "烂牌不是乱打的理由",
        model: "坏状态也有最优策略；策略差和牌差是两件事",
      },
    ],
    close: "牌是发来的状态。人负责的是策略。",
  },
  {
    id: "physics",
    field: "物理",
    title: "力存在，不等于做功",
    formula: "功 = F⃗ · ds⃗",
    body: "位移为 0，功率就是 0。焦虑是用力按一堵推不动的墙：代谢在烧，世界的状态不变。失职则相反——有位移方向，力却是 0。",
  },
  {
    id: "chemistry",
    field: "化学",
    title: "你改不了平衡，你改路径",
    formula: "K 常常不归你；k、Ea 才归你",
    body: "平衡常数 K 决定最终能走到哪，你常常动不了。你能改的是路径和速率：活化能、催化剂。口子就是把活化能降低的那一步。假装能改 K，是炼金；找到催化剂，是化学。",
  },
];

export const dichotomyStemClose =
  "在乎可以很大。力只用在 |∂Y/∂A| 不为零的地方。";

export const dichotomyStemHaystack = [
  dichotomyStemHeading,
  dichotomyStemIntro,
  dichotomyStemClose,
  ...dichotomyStemBlocks.flatMap((block) => [
    block.field,
    block.title,
    block.formula,
    block.body,
    block.close ?? "",
    ...(block.symbols ?? []).flatMap((item) => [item.symbol, item.meaning]),
    ...(block.mapping ?? []).flatMap((row) => [row.card, row.model]),
  ]),
].join(" ");
