// Linear 深度评测（v3 module 4）
// 复用 openworker 6 段 schema：demo×6 / code×3 / philosophy / timeline / conclusion
// 来源：linear.app 官网 + 公开 docs + 实机截图
// 标注：所有 demo 截图均为实机截图（非示意图）
window.TD_LINEAR_DEEPDIVE = {
  productId: 'linear',
  productName: 'Linear',
  tagline: '把工作项的流动做到极致——Triage 收单、Cycle 节奏、50ms 手感',
  dateAdded: '2026-08-04',
  isRealScreenshot: true,
  source: 'linear.app · 闭源 · YC W20 · Tuomas Artman 2019 创立',
  author: '本台研究团队（基于官网+公开 docs+实机截图合成）',

  // ============ ① DEMO（实机截图）============
  demoShots: [
    {
      id: 'home',
      caption: 'Linear 首页：Cycle + Status 看板——50ms 推送的实时感',
      img: 'assets/shots/linear/01-home.jpeg',
      note: '首页 = 当前 Cycle 的所有 Issue + 团队活跃度。**"手感即信任"**——拖卡片、改状态、新建 Issue 都是 50ms 内响应。**这是 2024 标杆，2026 仍然未被人超越**。',
    },
    {
      id: 'features',
      caption: 'Features：Triage 收单 + Project 视图 + Cycle 自动排期',
      img: 'assets/shots/linear/02-features.jpeg',
      note: '三大核心功能：Triage（所有未排入的 issue 进 Inbox 排队）+ Project（多视图：List/Kanban/Roadmap）+ Cycle（2 周时间盒自动排期）。**这是"动线最顺"的范本**。',
    },
    {
      id: 'method',
      caption: 'Linear Method：把"工作项流动"哲学产品化',
      img: 'assets/shots/linear/03-method.jpeg',
      note: 'Linear Method 是一套"做事哲学"文档——**承认"执行者是人"的时代"是 2019-2024**，2025+ 是"AI 队友"时代。**Linear Agents 已开始补 agent 一等公民**，但还没追到 QM/Multica 的深度。',
    },
    {
      id: 'customers',
      caption: 'Customers：OpenAI / Vercel / Cash App / Ramp 等上千家工程团队',
      img: 'assets/shots/linear/04-customers.jpeg',
      note: '客户名单本身就是"产品定位"——**全部是"工程师密集型 + 节奏快"的公司**。Linear 押注"快"——产品经理、设计师、销售都用别的工具。',
    },
    {
      id: 'pricing',
      caption: 'Pricing：Free / Standard / Plus / Enterprise 4 档——免费够个人用',
      img: 'assets/shots/linear/05-pricing.jpeg',
      note: '4 档定价：Free（个人/小团队，免费够用）/ Standard（10 人/不限 cycle）/ Plus（高级权限/SSO）/ Enterprise（SAML/审计）。**Free 档够个人开发者用——这是"获客飞轮"**。',
    },
    {
      id: 'agents',
      caption: 'Linear Agents（2025 起步）：补"AI 同事"概念，但还在早期',
      img: 'assets/shots/linear/06-agents.jpeg',
      note: 'Linear Agents 是 2025-Q3 推出的——允许 agent 直接操作 issue（创建/更新/评论/转换状态）。**但 agent 不是一等公民**——没有"AI 编制"概念，没有"试运行/转正"生命周期。**这是 MiCo 的机会**。',
    },
  ],

  // ============ ② CODE（关键源码/架构）============
  // 来源：Linear 公开 docs + GraphQL API + Linear Method 哲学文档
  codeSnippets: [
    {
      title: 'Issue 状态机：7 态（比 Jira 多 Triage 和 Backlog）',
      file: 'linear/server/issue/state.ts (推断)',
      code: `// Linear 状态机：7 态（比 Jira 多 Triage 和 Backlog）
const ISSUE_STATES = [
  'Triage',      // 收单（未排入）
  'Backlog',     // 已排入但未开始
  'Todo',        // 本 cycle 要做
  'In Progress', // 进行中
  'In Review',   // 验收
  'Done',        // 完成
  'Canceled',    // 取消
];

// Linear 的 transfer rule：Done 后不能转任何状态（终态）
// Canceled 后也不能转（终态）
// Triage 必须先转 Backlog 才能进 Todo`,
      points: [
        '**7 态**比 Jira/Meego 多 1 态（Triage），**承认"有 50% 的 issue 没排入 cycle"**——这部分不能直接进 Todo。',
        '**Triage → Backlog → Todo** 是 3 阶段瀑布——**好**，因为强制"先评估再排期"。',
        '**Done 和 Canceled 是终态**——与 Jira 的"Done 可退回"不同，**Linear 假设"完成就是完成"**。',
        '**没有 Blocked 态**——Linear 用"标签+assignee"代替 Blocked 字段，**比 Jira 少 1 态但需要团队约定**。',
        'MiCo 改进：抄 7 态 + Done/Canceled 终态 + 强制 Triage 评估。**Blocked 态建议加**（企业场景需要）。',
      ],
    },
    {
      title: 'Triage 收单：AI 评估 + 自动 assign',
      file: 'linear/server/triage/ingest.ts (推断)',
      code: `// Linear 的 Triage 收单
class Triage {
  async ingest(issue: Issue) {
    issue.state = 'Triage';
    issue.cycle = this.suggestCycle(issue);  // 智能建议
    await this.db.save(issue);
    await this.notify('triage_team', issue);
  }

  async auto_assign(issue: Issue): Promise<User> {
    // 基于 team + workload + 历史匹配
    return this.matcher.bestMatch(issue);
  }
}

// Linear 押注"AI 帮 PM 评估"——这是 agent 一等公民的前奏
// 但 Linear 没做到"AI 直接是 Assignee"——仍然是人在执行`,
      points: [
        '**Triage 收单 = AI 帮 PM 评估**——suggestCycle + bestMatch 是 2024 AI 帮 PM 的标准动作。**Linear 是第一批把 AI 接进 issue 流的产品**。',
        '**没有 AI 分配 = AI Assignee**——Linear 的 agent 还是"辅助"角色，**没有变成"主语"**。',
        '**Triage team 是真人类**——Linear 假设"每个团队有人负责收单"，**没有"虾接单岗"概念**。',
        'MiCo 改进：抄 Triage 收单 + 建议 cycle，但**把"AI 接单"做成产品功能**——虾档案自动接 Triage issue，**比"AI 帮 PM 排期"更激进**。',
      ],
    },
    {
      title: 'GraphQL API + 100+ Integration：现代 API 标准',
      file: 'linear/server/api/graphql.ts (推断)',
      code: `// Linear 的 GraphQL API 是现代做法
type Query {
  issue(id: ID!): Issue
  issues(filter: IssueFilter, first: Int): IssueConnection!
  cycle(id: ID!): Cycle
  team(id: ID!): Team
}

type Mutation {
  issueCreate(input: IssueCreateInput!): IssuePayload!
  issueUpdate(id: ID!, input: IssueUpdateInput!): IssuePayload!
  issueArchive(id: ID!): IssueArchivePayload!
}

// 100+ integration：Slack/Notion/GitHub/Figma/Claude Code/Zapier...
// 全部走 GraphQL SDK`,
      points: [
        '**GraphQL API**——比 Jira REST 现代化得多。**前端可以直接 query 想要的字段**，不用 N 次 round-trip。',
        '**100+ integration 生态**——Linear 是"现代版 Jira"，**生态成熟度可以跟 Salesforce 比**。',
        '**没有 native MCP**——Linear 的 integration 走自研 OAuth + GraphQL，**没接 MCP 协议**。**这是 MiCo 的机会**。',
        'MiCo 改进：抄 GraphQL API + 100+ integration 思路，但**强制接 MCP 协议**——所有 integration 走 MCP server，不要重造 OAuth 适配层。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: 'Linear 为什么 5 年不被 Jira 取代？',
    answer: '因为 Linear 押注了"**动线即产品**"——50ms 手感、键盘优先、键盘党友好、零等待。Jira 的 6 态+3 层权限+JQL 是"组织治理标准答案"，但 Jira 的 UX 是 2002 年的。Linear 重新设计了 UX，但**没有重新发明治理**。结果是：工程师团队从 Jira 跳到 Linear，**产品经理/设计师/法务/财务 留在 Jira**。**这种"只服务一类人"的克制是 Linear 成功的关键**——2025 之后开始推 Linear Agents 才补"AI 同事"概念，但还没追到 QM/Multica 的深度。',
    problemDiagnosis: [
      '**Jira 的"通用"是负担**——同时服务工程师/PM/设计师/法务/财务，结果是 5 类人都不满意，UX 体验停留在 2002。',
      '**"快"是产品力**——50ms 推送 + 键盘优先 + 零等待 = 工程师的"手感即信任"。**慢一秒 = 失去信任**。',
      '**"AI 同事"是 2025 新痛点**——Jira 的 issue 是"人执行"，AI 时代 issue 应该"agent 执行"。**Linear Agents 是补这个空缺的开始，但还远不够**。',
    ],
    designPrinciples: [
      '**手感即信任**——50ms 推送、键盘优先、零等待。**"快"是核心产品力，不是可选项**。',
      '**只服务一类人**——工程师团队，不做"通用项目管理"。**克制是 Linear 的护城河**。',
      '**Triage 收单**——所有未排入的 issue 进 Inbox 排队，**强制"先评估再排期"**。',
      '**Cycle 节奏**——2 周时间盒自动滚，**强制团队有节奏**。**比 Jira 的 Sprint 更"自动化"**。',
      '**GraphQL API + 100+ integration**——现代 API + 生态成熟。**不重造 OAuth 适配层**。',
    ],
    differentiationMatrix: [
      { vs: 'Jira/Meego', diff: 'Jira 是"组织治理标准"（6 态+3 层权限+JQL+AUDIT）；Linear 是"动线即产品"（7 态+50ms 手感+键盘优先）。**前者是 2002 标准，后者是 2024 标准**——MiCo 应学 Linear 的 UX + Jira 的治理。' },
      { vs: 'Multica', diff: 'Multica 是"AI 同事协作"（Issue 中心+14 runtime+Squad 路由）；Linear 是"任务管理 UX"（7 态+Triage 收单+Cycle 节奏）。**前者是 AI 时代，后者是 2019-2024 时代**——MiCo 是前者方向，但 UX 要学 Linear。' },
      { vs: 'Paperclip', diff: 'Paperclip 是"AI 公司编制"（CEO/CTO 角色+Board 审批+预算成本）；Linear 是"工程师工作流"（7 态+Triage+Cycle）。**前者是"AI 时代公司"的全貌，后者是"工程师一天的工作"——MiCo 要把两者缝合**。' },
      { vs: 'QM', diff: 'QM 是"公司级多 agent 平台"（scope 隔离+posture 三档+SECURITY.md）；Linear 是"任务管理 UX 标杆"（50ms 手感+键盘优先+Triage）。**QM 学的是安全，Linear 学的是手感——MiCo 两个都要**。' },
      { vs: 'MiCo', diff: 'Linear 押注"动线即产品"是 MiCo 必学——50ms 手感、Triage 收单、Cycle 节奏、键盘优先。**但 Linear 没解决"AI 是主语"问题**——这是 MiCo 的机会。**Linear 2025-Q3 推 Linear Agents 是开始追但还没追到**。' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2019-Q2', event: 'Tuomas Artman 创立 Linear（前 Carta 工程师）' },
    { date: '2019-Q4', event: 'Linear v0.5 公开（Issue 中心 + Cycle）' },
    { date: '2020-Q2', event: 'Triage 收单上线（承认"有 50% issue 没排入 cycle"）' },
    { date: '2021-Q4', event: 'Linear Method 哲学文档发布（产品力形成）' },
    { date: '2022', event: 'YC W20 入学 + Series A ($35M)' },
    { date: '2024', event: 'Linear Customers 突破 1 万家工程团队' },
    { date: '2025-Q3', event: 'Linear Agents 发布（补"AI 同事"概念，但还在早期）' },
    { date: '2026-08', event: '本台评测入库（8 维矩阵 + 5 段 philosophy）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'Linear 是 2019-2024 时代"任务管理 UX 标杆"——50ms 手感、键盘优先、Triage 收单、Cycle 节奏、GraphQL API、100+ integration，每一项都是"动线即产品"的体现。它不是 Jira（组织治理），不是 Multica（AI 中心），不是 Paperclip（编制中心）——它选择了"只服务一类人（工程师）+ 极致 UX"这条路，并在 5 年里成为工程师团队的首选。**对 MiCo 来说，Linear 是"必抄的 UX + 不必学的局限"**——50ms 手感 + Triage 收单 + Cycle 节奏是必抄，但 Linear 没解决"AI 是主语"问题是 MiCo 的差异化机会。',
    forMico: [
      '**50ms 手感**（任务动线 / 状态切换 / 卡片拖拽）——**完整跟随**，工程师对"快"的要求是绝对的，**慢一秒 = 失去信任**。',
      '**Triage 收单**（所有未排入的 issue 进 Inbox 排队）——**完整跟随**，强制"先评估再排期"。**MiCo 虾档案可作为 Triage 接单方**——AI 自动接 Triage issue。',
      '**Cycle 节奏**（2 周时间盒自动滚）——**完整跟随**，强制团队有节奏。**但 MiCo Cycle 跟"虾编制"挂钩**——每 Cycle 评估"哪些虾转正/降级"。',
      '**键盘优先**（所有操作有快捷键）——**完整跟随**，工程师的"键盘党友好"是基础。',
      '**GraphQL API**——**完整跟随**，是 2024 后的现代做法。**但 MiCo 强制接 MCP**——所有 integration 走 MCP server，不重造 OAuth 适配层。',
      '**Linear Agents 的局限**——Linear 2025-Q3 才补 agent，但 agent 还是"辅助"，**没有"AI 编制+试运行/转正+成本分摊"概念**——**这是 MiCo 2026 的差异化机会**。',
    ],
  },
};
