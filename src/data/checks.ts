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
    check:
      "命运负责发牌，人只负责出牌；烂牌不是乱打的理由，好牌也不保证必赢。",
  },
  "know-what-you-dont-know": {
    trigger: "觉得懂了时",
    check: "不知道，只是房间还空着；自以为知道，才会把求知的门焊死。",
  },
  "listen-to-both-sides": {
    trigger: "要拍板时",
    check: "会议室里一旦只剩回声，坐得最高的人往往最先失明。",
  },
  invert: {
    trigger: "定目标时",
    check: "造桥前先找它会从哪里塌；成功没有配方，灾难通常有清单。",
  },
  "occams-razor": {
    trigger: "解释变复杂时",
    check:
      "给理论装太多后门，事实永远抓不住它；不会输的解释，也赢不了真相。",
  },
  incentives: {
    trigger: "看人做事时",
    check: "公司文化写在墙上，真实文化写在奖金里。",
  },
  "golden-rule": {
    trigger: "想还手时",
    check: "规则是一只回旋镖：飞回来时不敢接，扔出去时就不配叫公平。",
  },
  "know-thyself": {
    trigger: "看不惯谁时",
    check: "自我是用来丈量世界的尺，也是唯一看不见自己刻度的尺。",
  },
  "integrity-alone": {
    trigger: "没人看见时",
    check: "聚光灯下的人品可能只是戏服；散场以后不脱，才算长在身上。",
  },
  "virtue-is-habit": {
    trigger: "又立志时",
    check: "每个重复的动作都是一张选票，日子最后会把票数统计成人格。",
  },
  "humility-gains": {
    trigger: "刚赢了一把时",
    check:
      "胜利先拔掉警报器，再把油门做大；许多败局，都从一路顺风开始。",
  },
  "know-when-enough": {
    trigger: "还想再多点时",
    check: "欲望是一条会后退的终点线；不先画停止线，赢家也会跑下悬崖。",
  },
  reciprocity: {
    trigger: "关系变冷时",
    check: "关系像呼吸：只吸不呼会窒息，每一口都计价也活不了。",
  },
  "reputation-compounds": {
    trigger: "想走捷径时",
    check:
      "信誉，是别人为你省下的防备；毁掉它以后，每一扇门都会重新上锁。",
  },
  "seek-first-to-understand": {
    trigger: "争执起来时",
    check:
      "观点进不去上锁的心；理解是先把门打开，不是把自己的立场交出去。",
  },
  "hanlons-razor": {
    trigger: "感到被冒犯时",
    check:
      "别因别人踩了一脚，就把路人判成刺客；同一把刀出现三次，也别再叫意外。",
  },
  "choose-company": {
    trigger: "耗完社交后",
    check: "圈子是一支无声的温度计；待得够久，就会把它的温度叫作常温。",
  },
  compounding: {
    trigger: "想放弃坚持时",
    check:
      "复利是最无聊的魔法：很久像骗局，突然像奇迹；方向错了，则像诅咒。",
  },
  "now-is-all-you-have": {
    trigger: "又在刷手机时",
    check: "昨天是录像，明天是预告；只有今天，手里还有操作按钮。",
  },
  "start-small": {
    trigger: "拖延启动时",
    check:
      "脑内地图画得再精美，也没有真实路况；迈出一小步，才是在向世界问路。",
  },
  "vital-few": {
    trigger: "清单太长时",
    check:
      "待办清单是最体面的藏身处：只要一直做小事，就不用决定什么最重要。",
  },
  "do-hard-things": {
    trigger: "想躲困难时",
    check:
      "汗水没有货币属性，世界不按痛苦程度结账；难只筛人，正确才值钱。",
  },
  "survive-first": {
    trigger: "想加杠杆时",
    check: "复利唯一修不好的伤叫归零；先保住账号，再讨论收益率。",
  },
  diversify: {
    trigger: "押注过重时",
    check:
      "五只股票共用一场暴雨，不叫五把伞；风险要分篮子，功夫别分方向。",
  },
  "prepare-in-peace": {
    trigger: "一切顺利时",
    check: "救生艇在晴天总嫌占地方；船沉以后，那块地方叫余生。",
  },
  "irreversible-first": {
    trigger: "纠结决策时",
    check:
      "双向门别排长队，单向门别往里冲；能回头就快试，回不了头就慢想。",
  },
  "sunk-cost": {
    trigger: "不甘心放弃时",
    check:
      "继续给错误投钱，只是在给自尊修纪念碑，却让未来支付工程款。",
  },
  impermanence: {
    trigger: "情绪很满时",
    check:
      "别因为花会谢就拒绝花开，也别因为花正开就假装没有秋天。",
  },
  "judgment-not-events": {
    trigger: "越想越气时",
    check:
      "事情只是原片，解释负责剪辑；别把一次坏镜头，剪成整个人生的片名。",
  },
  "blessing-in-disguise": {
    trigger: "坏消息来时",
    check: "命运只写下一个逗号，人却总抢着把它读成句号。",
  },
  "meaning-in-suffering": {
    trigger: "处境改不了时",
    check:
      "苦难只是伤口，不是勋章；意义不是把伤口画成花，而是决定带着它往哪走。",
  },
  "memento-mori": {
    trigger: "为小事内耗时",
    check:
      "死亡给生命装上截止日期；不是催人挥霍，而是禁止把重要的事永远存成草稿。",
  },
  "relationships-are-the-answer": {
    trigger: "深夜加班时",
    check:
      "履历能把人送上舞台，关系决定谢幕后谁还在；人生最后需要的不是掌声，是接住。",
  },
  "golden-mean": {
    trigger: "把优点加码时",
    check:
      "勇敢多一勺变鲁莽，节俭多一勺变吝啬；人生最难的菜谱，只写着“适量”。",
  },
  "give-more": {
    trigger: "算得太清时",
    check:
      "让价值流出去，机会才会逆流而来；但没有河岸的善良，不叫江海，叫洪水。",
  },
};
