/** 第二卡的认知四象限：把握感 × 依据 */

export type KnowingLevel = "high" | "low";

export type KnowingQuadrant = {
  id: "usable" | "hollow" | "mute" | "blank";
  name: string;
  /** 主观确定 */
  grip: KnowingLevel;
  /** 客观依据 */
  evidence: KnowingLevel;
  definition: string;
  logic: string;
  /** 一句画面，让这一格能被认出来 */
  vignette?: string;
  examples: string[];
  problems: string[];
  responses: string[];
  reminder: string;
};

export const knowingAxes = {
  grip: {
    name: "把握感",
    description:
      "你心里有多确定。它即时、免费，不需要任何证据就能产生。",
  },
  evidence: {
    name: "依据",
    description:
      "你能摆上桌、经得起第三方检查的东西：数据、可复现的经验、能被证伪的预测。",
  },
};

export const knowingModelIntro =
  "危险的不是空白，是被填满的空白。\n\n这两条轴要分开，因为它们在人身上经常不同步：把话说死的人未必手里有东西，手里有东西的人未必敢说。";

export const knowingQuadrants: KnowingQuadrant[] = [
  {
    id: "usable",
    name: "可用之知",
    grip: "high",
    evidence: "high",
    definition: "你确定，而且说得出为什么，拿得出证据，挨得住反驳。",
    logic:
      "感觉和依据对齐了。这是唯一可以直接拿去下注、拿去教人的区域。但它有射程：换了场景还当真知用，它会静悄悄滑进空心的确定。",
    examples: [
      "你做过很多次、有反馈、有记录的那件事。",
      "能讲给外行听，并且说得清它什么时候不成立。",
      "预测过、对过账、事后复盘过的判断。",
    ],
    problems: [
      "领域漂移：老经验被搬到新场景，前提早就换了。",
      "把「我验证过」当成永久执照。",
      "教给别人时只讲结论，不讲适用条件。",
    ],
    responses: [
      "定期问：这个结论成立的前提是什么，前提还在吗？",
      "给结论标一个有效期，到期重新对账。",
      "教别人时连边界一起教。",
    ],
    reminder: "真知也会过期，只是它不通知你。",
  },
  {
    id: "hollow",
    name: "空心的确定",
    grip: "high",
    evidence: "low",
    definition:
      "心里很笃定，依据说不清，只能说「我感觉」「一直都是这样」「大家都知道」。",
    logic:
      "大脑补全机制的成品。故事已经完整，所以没有不适感。这是本卡真正要打的那一格：它不会被自己发现，却常常同时配着最大的仓位和最重的语气。",
    vignette:
      "会上你说得最顺的那句话，往往就是这一格——没有卡壳，没有心虚，也没有依据。",
    examples: [
      "对行业趋势的判断。",
      "对某个人动机的判断。",
      "对「用户想要什么」的判断。",
    ],
    problems: [
      "没有不适感，所以自己检测不到。",
      "讲得越顺，被追问得越少。",
      "语气的强度替证据站岗。",
    ],
    responses: [
      "强制外化：写下来，加上数字和日期。",
      "交给一个会反对你的人看。",
      "当场说不清依据的，当场降级成「我不知道」。",
    ],
    reminder: "你讲得最顺的地方，查得最少。",
  },
  {
    id: "mute",
    name: "哑掉的知道",
    grip: "low",
    evidence: "high",
    definition:
      "你其实做得对，证据也站在你这边，但你自己不信，或者说不出来，于是不敢用。",
    logic:
      "隐性知识没有被语言化；或者位置不够高，把正确的判断咽了回去。组织里最贵的一种浪费：信息已经存在，却没能进入决策。",
    vignette:
      "老师傅摸了三十年的设备，说「这机要出事」，讲不出理由，管理层当成情绪。",
    examples: [
      "凭手感断定设备要坏，说不出机理。",
      "年轻人算出了问题，不敢在会上讲。",
      "一线看见异常，逐级上报时被磨平。",
    ],
    problems: [
      "把「说不出理由」误当成「没有理由」。",
      "决策端把「没人反对」当成「没有风险」。",
      "挑战者号那一夜，就卡在这一格。",
    ],
    responses: [
      "逼自己把理由写成三条，粗糙也写。",
      "把手感换算成可检验的预测：什么时候、什么征兆。",
      "建立「说了不受罚」的场合，让别人也出得来。",
    ],
    reminder: "说不出理由，不等于没有理由；但你不说出来，它就等于不存在。",
  },
  {
    id: "blank",
    name: "诚实的空白",
    grip: "low",
    evidence: "low",
    definition: "不知道，并且知道自己不知道。",
    logic:
      "看起来最差，其实是四格里唯一干净的起点。所有学习都从这里开始——前提是你不把它当住处。",
    examples: [
      "进入新领域的第一周。",
      "遇到一件你连问题都问不清楚的事。",
      "别人一句话你听懂了每个字，却复述不出来。",
    ],
    problems: [
      "待太久：空白本身不产生价值。",
      "把「我不知道」当终点站，和自以为懂一样不学习。",
      "用「水太深」替代具体问题。",
    ],
    responses: [
      "把大空白切成具体问题，一次填一个。",
      "每个问题配一个信息源和一个期限。",
      "先问「谁已经知道」，再问「我怎么验证」。",
    ],
    reminder: "空白是入口，不是住处。",
  },
];

export const knowingTransitions = [
  "主路径：空心的确定 → 诚实的空白 → 可用之知。先把空心砸回空白，再一块一块填成真知。",
  "难在第一步，因为它的手感像退步：你必须先变得更不确定，才可能更正确。",
  "次路径：哑掉的知道 → 可用之知。把手感翻译成语言和证据，把咽下去的话讲出来。",
  "要防回流：真知过期而把握还在，一夜之间滑回空心。",
];

export const knowingSummary =
  "让每一分把握，都摁在一块能被别人检查的依据上；摁不住的，先归零。";

export const knowingHaystack = [
  knowingModelIntro,
  knowingSummary,
  ...Object.values(knowingAxes).flatMap((axis) => [axis.name, axis.description]),
  ...knowingTransitions,
  ...knowingQuadrants.flatMap((q) => [
    q.name,
    q.definition,
    q.logic,
    q.vignette ?? "",
    q.reminder,
    ...q.examples,
    ...q.problems,
    ...q.responses,
  ]),
].join(" ");
