/** 檢視問題：原則在現場被「認出」的入口，不是抽象命題 */

export type CheckFields = {
  /** 何時想起：情境開關，3–6 字 */
  trigger: string;
  /** 彈窗主文案：一句、口語、帶刺，過目難忘 */
  check: string;
};

export const checks: Record<string, CheckFields> = {
  "dichotomy-of-control": {
    trigger: "焦慮時",
    check:
      "命運負責發牌，人只負責出牌；爛牌不是亂打的理由，好牌也不保證必贏。",
  },
  "know-what-you-dont-know": {
    trigger: "覺得懂了時",
    check: "不知道，只是房間還空著；自以為知道，才會把求知的門焊死。",
  },
  "listen-to-both-sides": {
    trigger: "要拍板時",
    check: "會議室裡一旦只剩回聲，坐得最高的人往往最先失明。",
  },
  invert: {
    trigger: "定目標時",
    check: "造橋前先找它會從哪裡塌；成功沒有配方，災難通常有清單。",
  },
  "occams-razor": {
    trigger: "解釋變複雜時",
    check:
      "給理論裝太多後門，事實永遠抓不住它；不會輸的解釋，也贏不了真相。",
  },
  incentives: {
    trigger: "看人做事時",
    check: "公司文化寫在牆上，真實文化寫在獎金裡。",
  },
  "golden-rule": {
    trigger: "想還手時",
    check: "規則是一隻迴旋鏢：飛回來時不敢接，扔出去時就不配叫公平。",
  },
  "know-thyself": {
    trigger: "看不慣誰時",
    check: "自我是用來丈量世界的尺，也是唯一看不見自己刻度的尺。",
  },
  "integrity-alone": {
    trigger: "沒人看見時",
    check: "聚光燈下的人品可能只是戲服；散場以後不脫，才算長在身上。",
  },
  "virtue-is-habit": {
    trigger: "又立志時",
    check: "每個重複的動作都是一張選票，日子最後會把票數統計成人格。",
  },
  "humility-gains": {
    trigger: "剛贏了一把時",
    check:
      "勝利先拔掉警報器，再把油門做大；許多敗局，都從一路順風開始。",
  },
  "know-when-enough": {
    trigger: "還想再多點時",
    check: "慾望是一條會後退的終點線；不先畫停止線，贏家也會跑下懸崖。",
  },
  reciprocity: {
    trigger: "關係變冷時",
    check: "關係像呼吸：只吸不呼會窒息，每一口都計價也活不了。",
  },
  "reputation-compounds": {
    trigger: "想走捷徑時",
    check:
      "信譽，是別人為你省下的防備；毀掉它以後，每一扇門都會重新上鎖。",
  },
  "seek-first-to-understand": {
    trigger: "爭執起來時",
    check:
      "觀點進不去上鎖的心；理解是先把門打開，不是把自己的立場交出去。",
  },
  "hanlons-razor": {
    trigger: "感到被冒犯時",
    check:
      "別因別人踩了一腳，就把路人判成刺客；同一把刀出現三次，也別再叫意外。",
  },
  "choose-company": {
    trigger: "耗完社交後",
    check: "圈子是一支無聲的溫度計；待得夠久，就會把它的溫度叫作常溫。",
  },
  compounding: {
    trigger: "想放棄堅持時",
    check:
      "複利是最無聊的魔法：很久像騙局，突然像奇蹟；方向錯了，則像詛咒。",
  },
  "now-is-all-you-have": {
    trigger: "又在刷手機時",
    check: "昨天是錄像，明天是預告；只有今天，手裡還有操作按鈕。",
  },
  "start-small": {
    trigger: "拖延啟動時",
    check:
      "腦內地圖畫得再精美，也沒有真實路況；邁出一小步，才是在向世界問路。",
  },
  "vital-few": {
    trigger: "清單太長時",
    check:
      "待辦清單是最體面的藏身處：只要一直做小事，就不用決定什麼最重要。",
  },
  "do-hard-things": {
    trigger: "想躲困難時",
    check:
      "汗水沒有貨幣屬性，世界不按痛苦程度結賬；難只篩人，正確才值錢。",
  },
  "survive-first": {
    trigger: "想加槓桿時",
    check: "複利唯一修不好的傷叫歸零；先保住賬號，再討論收益率。",
  },
  diversify: {
    trigger: "押注過重時",
    check:
      "五隻股票共用一場暴雨，不叫五把傘；風險要分籃子，功夫別分方向。",
  },
  "prepare-in-peace": {
    trigger: "一切順利時",
    check: "救生艇在晴天總嫌佔地方；船沉以後，那塊地方叫餘生。",
  },
  "irreversible-first": {
    trigger: "糾結決策時",
    check:
      "雙向門別排長隊，單向門別往裡衝；能回頭就快試，回不了頭就慢想。",
  },
  "sunk-cost": {
    trigger: "不甘心放棄時",
    check:
      "繼續給錯誤投錢，只是在給自尊修紀念碑，卻讓未來支付工程款。",
  },
  impermanence: {
    trigger: "情緒很滿時",
    check:
      "別因為花會謝就拒絕花開，也別因為花正開就假裝沒有秋天。",
  },
  "judgment-not-events": {
    trigger: "越想越氣時",
    check:
      "事情只是原片，解釋負責剪輯；別把一次壞鏡頭，剪成整個人生的片名。",
  },
  "blessing-in-disguise": {
    trigger: "壞消息來時",
    check: "命運只寫下一個逗號，人卻總搶著把它讀成句號。",
  },
  "meaning-in-suffering": {
    trigger: "處境改不了時",
    check:
      "苦難只是傷口，不是勳章；意義不是把傷口畫成花，而是決定帶著它往哪走。",
  },
  "memento-mori": {
    trigger: "為小事內耗時",
    check:
      "死亡給生命裝上截止日期；不是催人揮霍，而是禁止把重要的事永遠存成草稿。",
  },
  "relationships-are-the-answer": {
    trigger: "深夜加班時",
    check:
      "履歷能把人送上舞臺，關係決定謝幕後誰還在；人生最後需要的不是掌聲，是接住。",
  },
  "golden-mean": {
    trigger: "把優點加碼時",
    check:
      "勇敢多一勺變魯莽，節儉多一勺變吝嗇；人生最難的菜譜，只寫著“適量”。",
  },
  "give-more": {
    trigger: "算得太清時",
    check:
      "讓價值流出去，機會才會逆流而來；但沒有河岸的善良，不叫江海，叫洪水。",
  },
};
