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
    check: "这件事，我是在解决，还是在空转？",
  },
  "know-what-you-dont-know": {
    trigger: "觉得懂了时",
    check: "我讲不清的地方，是不是其实还不懂？",
  },
  "listen-to-both-sides": {
    trigger: "要拍板时",
    check: "我听到的，是真相，还是回声？",
  },
  invert: {
    trigger: "定目标时",
    check: "怎样一定会失败？我避开了吗？",
  },
  "occams-razor": {
    trigger: "解释变复杂时",
    check: "更无聊的那个解释，为什么不行？",
  },
  incentives: {
    trigger: "看人做事时",
    check: "他靠什么吃饭？别听他靠什么信仰。",
  },
  "golden-rule": {
    trigger: "要对别人动手时",
    check: "换我挨这一下，我还觉得公平吗？",
  },
  "know-thyself": {
    trigger: "又在评判别人时",
    check: "我最看不惯的，是不是我自己？",
  },
  "integrity-alone": {
    trigger: "没人看见时",
    check: "没人看见时，我还是同一个人吗？",
  },
  "virtue-is-habit": {
    trigger: "立志却做不到时",
    check: "我想成为的那种人，今天重复了哪个动作？",
  },
  "humility-gains": {
    trigger: "刚赢了一把时",
    check: "这次赢，有多少是我厉害，有多少是运气？",
  },
  "know-when-enough": {
    trigger: "还想再多一点时",
    check: "「够了」长什么样？我写下来了吗？",
  },
  reciprocity: {
    trigger: "关系变冷时",
    check: "这段关系，还在流动吗？还是只剩单向？",
  },
  "reputation-compounds": {
    trigger: "想走捷径时",
    check: "这件事，我敢署自己的名吗？",
  },
  "seek-first-to-understand": {
    trigger: "争执起来时",
    check: "我是在听懂他，还是在等着反驳？",
  },
  "hanlons-razor": {
    trigger: "感到被冒犯时",
    check: "一定是针对我吗？会不会只是疏忽？",
  },
  "choose-company": {
    trigger: "耗完社交后",
    check: "靠近我的人，把我拉高了，还是拉低了？",
  },
  compounding: {
    trigger: "想放弃坚持时",
    check: "再熬三年，是开花，还是认错方向？",
  },
  "now-is-all-you-have": {
    trigger: "又在刷手机时",
    check: "这一小时，是我过的，还是溜走的？",
  },
  "start-small": {
    trigger: "拖延启动时",
    check: "五分钟能开始的那一步，我迈了吗？",
  },
  "vital-few": {
    trigger: "清单太长时",
    check: "真正能动结果的，是不是只有那一两件？",
  },
  "do-hard-things": {
    trigger: "想躲困难时",
    check: "我躲开的，是困难，还是成长本身？",
  },
  "survive-first": {
    trigger: "想加杠杆时",
    check: "最坏的情况，我还有下一局吗？",
  },
  diversify: {
    trigger: "押注过重时",
    check: "我以为散了的风险，是不是其实捆在一起？",
  },
  "prepare-in-peace": {
    trigger: "一切顺利时",
    check: "雨天的伞，我是晴天备的，还是淋着再找？",
  },
  "irreversible-first": {
    trigger: "纠结决策时",
    check: "这扇门，走出去还能回来吗？",
  },
  "sunk-cost": {
    trigger: "不甘心放弃时",
    check: "如果从今天才开始，我还会选这条路吗？",
  },
  impermanence: {
    trigger: "情绪很满时",
    check: "我是不是把「暂时」说成了「永远」？",
  },
  "judgment-not-events": {
    trigger: "被情绪带着跑时",
    check: "伤我的，是这件事，还是我对它的说法？",
  },
  "blessing-in-disguise": {
    trigger: "刚接到坏消息时",
    check: "盖章太早了吗？结局真的已经写死了？",
  },
  "meaning-in-suffering": {
    trigger: "处境改不了时",
    check: "疼改不了，我还能决定怎么扛吗？",
  },
  "memento-mori": {
    trigger: "为小事内耗时",
    check: "临终时，这件事还值得我今晚内耗吗？",
  },
  "relationships-are-the-answer": {
    trigger: "又在加班换成就时",
    check: "真正能托底的人，我有几个？",
  },
  "golden-mean": {
    trigger: "把优点加码时",
    check: "我的优点，再加一档，会不会变成缺陷？",
  },
  "give-more": {
    trigger: "只想着交换时",
    check: "我是在给予，还是在暗中记账？",
  },
};
