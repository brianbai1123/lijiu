/** 检视问题：原则在现场被「认出」的入口，不是抽象命题 */

export type CheckFields = {
  /** 何时想起：情境开关，3–6 字 */
  trigger: string;
  /** 弹窗主文案：一句、口语、带刺，过目难忘 */
  check: string;
};

export const checks: Record<string, CheckFields> = {
  "dichotomy-of-control": {
    trigger: "焦虑时",
    check: "我在解决它，还是只是陪它焦虑？",
  },
  "know-what-you-dont-know": {
    trigger: "觉得懂了时",
    check: "这话是我想明白的，还是我背下来的？",
  },
  "listen-to-both-sides": {
    trigger: "要拍板时",
    check: "谁在我面前不敢说真话？",
  },
  invert: {
    trigger: "定目标时",
    check: "想搞砸这件事，最快的办法是什么？",
  },
  "occams-razor": {
    trigger: "解释变复杂时",
    check: "我加了多少假设，才圆得上这个故事？",
  },
  incentives: {
    trigger: "看人做事时",
    check: "他的钱从哪来，他的话就往哪去。",
  },
  "golden-rule": {
    trigger: "想反击时",
    check: "这一下落在我身上，我还说公平吗？",
  },
  "know-thyself": {
    trigger: "看不惯谁时",
    check: "我讨厌他这一点，是不是太眼熟了？",
  },
  "integrity-alone": {
    trigger: "没人看见时",
    check: "如果这一幕正在直播，我会改吗？",
  },
  "virtue-is-habit": {
    trigger: "又立flag时",
    check: "我是那种人，还是只想当那种人？",
  },
  "humility-gains": {
    trigger: "刚赢了一把时",
    check: "风停了，我还飞得起来吗？",
  },
  "know-when-enough": {
    trigger: "还想再多点时",
    check: "多少算够？答不上来，就永远不够。",
  },
  reciprocity: {
    trigger: "关系变冷时",
    check: "上一次是我先伸手，是什么时候？",
  },
  "reputation-compounds": {
    trigger: "想走捷径时",
    check: "攒了十年的名声，值这一次省事吗？",
  },
  "seek-first-to-understand": {
    trigger: "争执起来时",
    check: "我在听他说，还是在装子弹？",
  },
  "hanlons-razor": {
    trigger: "感到被冒犯时",
    check: "他是在针对我，还是压根没想起我？",
  },
  "choose-company": {
    trigger: "耗完社交后",
    check: "刚才那一小时，把我抬高了，还是磨钝了？",
  },
  compounding: {
    trigger: "想放弃坚持时",
    check: "今天断这一次，三年后还接得上吗？",
  },
  "now-is-all-you-have": {
    trigger: "又在刷手机时",
    check: "这一小时，我是活过了，还是被划走了？",
  },
  "start-small": {
    trigger: "拖延启动时",
    check: "这件事的五分钟版本，长什么样？",
  },
  "vital-few": {
    trigger: "清单太长时",
    check: "只许做一件，我做哪件？",
  },
  "do-hard-things": {
    trigger: "想躲困难时",
    check: "这道坎绕过去，要绕多少年？",
  },
  "survive-first": {
    trigger: "想加杠杆时",
    check: "这一把输光，我还能上牌桌吗？",
  },
  diversify: {
    trigger: "押注过重时",
    check: "我这几个篮子，是不是放在同一辆车上？",
  },
  "prepare-in-peace": {
    trigger: "一切顺利时",
    check: "现在是晴天，我的伞在哪？",
  },
  "irreversible-first": {
    trigger: "纠结决策时",
    check: "这扇门关上，还推得开吗？",
  },
  "sunk-cost": {
    trigger: "不甘心放弃时",
    check: "我是在救这件事，还是在救自己的面子？",
  },
  impermanence: {
    trigger: "情绪很满时",
    check: "这一阵，我是不是当成了一辈子？",
  },
  "judgment-not-events": {
    trigger: "越想越气时",
    check: "扎我的是这件事，还是我给它配的旁白？",
  },
  "blessing-in-disguise": {
    trigger: "坏消息来时",
    check: "故事才刚开头，我急着写结局？",
  },
  "meaning-in-suffering": {
    trigger: "处境改不了时",
    check: "这份苦，就让它白疼吗？",
  },
  "memento-mori": {
    trigger: "为小事内耗时",
    check: "这件事，配写进我的墓志铭吗？",
  },
  "relationships-are-the-answer": {
    trigger: "深夜加班时",
    check: "凌晨三点，我能打给谁？",
  },
  "golden-mean": {
    trigger: "把优点加码时",
    check: "这份优点，再拧一格会不会就断了？",
  },
  "give-more": {
    trigger: "算得太清时",
    check: "我是在给，还是在记账？",
  },
};
