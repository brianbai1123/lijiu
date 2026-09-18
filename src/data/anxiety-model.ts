export type AxisLevel = "high" | "low";

export type AnxietyQuadrant = {
  id: "responsibility" | "anxiety" | "neglect" | "release";
  name: string;
  concern: AxisLevel;
  influence: AxisLevel;
  definition: string;
  logic: string;
  problems: string[];
  responses: string[];
  reminder: string;
};

export const anxietyAxes = {
  concern: {
    name: "在乎程度",
    description: "结果对价值、责任或生活的重要性，不只是情绪强度。",
  },
  influence: {
    name: "影响程度",
    description: "行动能否实质改变结果或概率，不等于完全控制。",
  },
};

export const anxietyModelIntro =
  "焦虑的结构几乎总是一样的：在乎的程度，远超能影响的程度。";

export const anxietyQuadrants: AnxietyQuadrant[] = [
  {
    id: "responsibility",
    name: "担当区",
    concern: "high",
    influence: "high",
    definition: "事情重要，而且行动能够改变结果或显著改变概率。",
    logic:
      "在乎提供动力，影响提供杠杆。两者重合时，情绪最好的出口不是继续思考，而是采取行动。这里追求的不是保证成功，而是找到最能提高成功概率的动作。",
    problems: [
      "用焦虑代替行动，看似投入，实际没有推动结果。",
      "同时做太多事，力量没有落到关键杠杆上。",
      "把“能够影响”误认为“必须保证”，失败后把所有责任都归给自己。",
    ],
    responses: [
      "把结果目标改写成今天可以完成的具体动作。",
      "找到影响最大的一个变量，先把力量压上去。",
      "用行动质量给自己评分，不用最终结果给自己定罪。",
    ],
    reminder: "既然在乎，也确实能改变，就别只在心里用力。",
  },
  {
    id: "anxiety",
    name: "焦虑区",
    concern: "high",
    influence: "low",
    definition: "结果非常重要，但个人能够施加的影响很小。",
    logic:
      "大脑容易把“非常在乎”误认成“应该能够控制”，于是用反复预测、监控和担忧制造仍在处理问题的错觉。焦虑不是因为事情重要，而是情绪投入远大于现实杠杆。",
    problems: [
      "反复预演最坏结果，持续刷新消息和反馈。",
      "试图控制别人的想法、选择以及对自己的评价。",
      "因为不能控制全部，连原本能够影响的部分也一并放弃。",
    ],
    responses: [
      "承认它确实重要，不必假装自己不在乎。",
      "找出仍能影响的最小部分，完成准备后停止追加无效动作。",
      "为下一次检查设定时间，把剩余的不确定性交还给世界。",
    ],
    reminder: "把能做的做到极致，把不能做的还给世界。",
  },
  {
    id: "neglect",
    name: "失职区",
    concern: "low",
    influence: "high",
    definition: "行动足以改变结果，但事情没有得到与影响力相称的重视。",
    logic:
      "影响力不会因为没有意识到就消失。一个人可以不在乎后果，后果仍会发生；尤其在权力、健康、安全和亲密关系中，冷漠本身就是决定。",
    problems: [
      "把“目前没出事”误认为“不需要处理”，让小问题变得不可逆。",
      "忽视自己的权力和行为正在由别人承担代价。",
      "为不可控的事情焦虑，却放任真正能够改变的事情。",
    ],
    responses: [
      "盘点自己手中的权力、资源和真实影响范围。",
      "追问“不行动的代价，最后会由谁承担”。",
      "为重要但不紧急的责任建立固定维护机制；不愿负责就明确转交。",
    ],
    reminder: "最危险的不是无能为力，而是有力却没用在该用的地方。",
  },
  {
    id: "release",
    name: "放下区",
    concern: "low",
    influence: "low",
    definition: "事情对核心生活并不重要，行动也几乎无法改变它。",
    logic:
      "这里既没有足够的价值，也没有足够的杠杆。继续投入注意力，不是在解决问题，而是在给噪音交房租。最理性的动作通常不是处理，而是删除。",
    problems: [
      "因为信息显眼、重复出现，就误以为事情重要。",
      "在陌生人的评价、网络争吵和无关输赢上消耗生命。",
      "忙了一整天，却没有推动任何真正重要的事情。",
    ],
    responses: [
      "不回应、不解释、不证明，减少消息源和重复曝光。",
      "用“一年后还会在意吗”检验它是否值得进入注意力。",
      "把腾出的时间和心力交还给担当区。",
    ],
    reminder: "既不值得，也改变不了，就别让它占用生命。",
  },
];

export const anxietyDispositionSummary =
  "重要且能改变的，尽力；重要却改变不了的，接纳；能改变却未重视的，负责；既不重要也改变不了的，放下。";
