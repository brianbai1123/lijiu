/** 检视问题：原则在现场被「认出」的入口，不是抽象命题 */

export type CheckFields = {
  /** 何时想起：情境开关，3–6 字 */
  trigger: string;
  /** 第一人称检视问题——大脑真正调用的主表达 */
  check: string;
};

export const checks: Record<string, CheckFields> = {
  "dichotomy-of-control": {
    trigger: "焦虑时",
    check: "我现在焦虑的这件事，如果我什么都不做，它会自己消失吗？我真正能改的下一步是什么？",
  },
  "know-what-you-dont-know": {
    trigger: "觉得懂了时",
    check: "如果现在就得向一个外行讲清楚，我卡壳的地方在哪？那是不是我其实还不懂？",
  },
  "listen-to-both-sides": {
    trigger: "要拍板时",
    check: "反对意见里，最强的那一条我听进去了吗？还是只听到了附和我的声音？",
  },
  invert: {
    trigger: "定目标时",
    check: "一年后这件事彻底搞砸了，讣告会怎么写？我现在能先避开哪几条死路？",
  },
  "occams-razor": {
    trigger: "解释变复杂时",
    check: "有没有一个更无聊、更简单的解释，也能说通眼前这件事？",
  },
  incentives: {
    trigger: "看人做事时",
    check: "这件事做成了，他拿什么？搞砸了，他赔什么？别听他说信什么。",
  },
  "golden-rule": {
    trigger: "要对别人动手时",
    check: "如果这段话、这个决定原样落在我头上，我还愿意接受吗？",
  },
  "know-thyself": {
    trigger: "又在评判别人时",
    check: "我反复严厉评判别人的那个点，会不会正是我自己的盲区？",
  },
  "integrity-alone": {
    trigger: "没人看见时",
    check: "如果这件事永远不会被发现，我现在的选择还会一样吗？",
  },
  "virtue-is-habit": {
    trigger: "立志却做不到时",
    check: "我想成为的那种人，今天能重复的一个小动作是什么？还是仍在空等感觉对了再开始？",
  },
  "humility-gains": {
    trigger: "刚赢了一把时",
    check: "这次成功里，有多少是方法，有多少是运气？我有没有因此把赌注悄悄加大？",
  },
  "know-when-enough": {
    trigger: "还想再多一点时",
    check: "「够了」的具体样子我写下来了吗？还是目标会永远往上挪？",
  },
  reciprocity: {
    trigger: "关系变冷时",
    check: "这段关系里，最近一次来回流动是什么时候？是我只进不出，还是只出不进？",
  },
  "reputation-compounds": {
    trigger: "想走捷径时",
    check: "如果这件事明天上了头条，我还愿意署名吗？这五分钟省下的，会不会烧掉二十年？",
  },
  "seek-first-to-understand": {
    trigger: "争执起来时",
    check: "我能用对方的话复述他的意思，直到他点头说「对，就是这样」吗？还是我在等着反驳？",
  },
  "hanlons-razor": {
    trigger: "感到被冒犯时",
    check: "除了「他针对我」，我还能写出三个更无心的解释吗？我问过他了吗？",
  },
  "choose-company": {
    trigger: "耗完社交后",
    check: "花时间最多的五个人，他们的默认作息、待人方式和底线，是我想要的正常吗？",
  },
  compounding: {
    trigger: "想放弃坚持时",
    check: "这件事如果再做三年，曲线会不会才刚拐弯？我是在低估时间，还是方向根本错了？",
  },
  "now-is-all-you-have": {
    trigger: "又在刷手机时",
    check: "过去一小时，是我选的，还是它自己溜走的？此刻最值得做的一件事是什么？",
  },
  "start-small": {
    trigger: "拖延启动时",
    check: "五分钟内能开始的最小一步是什么？我是在准备，还是在用思考掩饰害怕？",
  },
  "vital-few": {
    trigger: "清单太长时",
    check: "这周真正能改变结果的，是哪一到两件事？其余的，我能否接受做不完？",
  },
  "do-hard-things": {
    trigger: "想躲困难时",
    check: "我今天最想躲开的那件事是什么？难在体力、不确定，还是怕丢脸？",
  },
  "survive-first": {
    trigger: "想加杠杆时",
    check: "最坏情况会不会让我没有下一局？期望再高，归零了还剩什么？",
  },
  diversify: {
    trigger: "押注过重时",
    check: "我以为分散了的东西，是不是其实绑在同一个风险上——同一行业、同一身份、同一收入来源？",
  },
  "prepare-in-peace": {
    trigger: "一切顺利时",
    check: "如果明天失去主要收入，我的前三步是什么？缓冲是在顺境里备的，还是等出事再找？",
  },
  "irreversible-first": {
    trigger: "纠结决策时",
    check: "这扇门走过去还能回来吗？可逆的事我是不是拖太久，不可逆的事是不是又太快？",
  },
  "sunk-cost": {
    trigger: "不甘心放弃时",
    check: "假如我今天才第一次面对这件事，我还会继续投入吗？不甘心，是不是在为过去买单？",
  },
  impermanence: {
    trigger: "情绪很满时",
    check: "我是不是把一个暂时状态，说成了「永远都会这样」？三个月后，这个判断还站得住吗？",
  },
  "judgment-not-events": {
    trigger: "被情绪带着跑时",
    check: "监控录像能拍到的「发生了什么」，和我脑子里的「这意味着什么」，我分得开吗？",
  },
  "blessing-in-disguise": {
    trigger: "刚接到坏消息时",
    check: "我是不是急着给这件事盖章「完了」或「太好了」？能不能把定性推迟一段时间？",
  },
  "meaning-in-suffering": {
    trigger: "处境改不了时",
    check: "「为什么是我」之外，这个处境现在要求我做什么？有没有一件比我更大的事可以抓住？",
  },
  "memento-mori": {
    trigger: "为小事内耗时",
    check: "一年后、十年后我还会在意这件事吗？我有没有把该说的话、该做的事无限期推迟？",
  },
  "relationships-are-the-answer": {
    trigger: "又在加班换成就时",
    check: "我真正能依靠的人有几个？维护他们的时间，有没有像健身一样被固定下来？",
  },
  "golden-mean": {
    trigger: "把优点加码时",
    check: "我最自豪的那个优点，过度之后会变成什么？在这个具体情境里，多少才算合适？",
  },
  "give-more": {
    trigger: "只想着交换时",
    check: "这周有没有一件对别人明显有用、且不记账的事？我是在给予，还是在暗中索取？",
  },
};
