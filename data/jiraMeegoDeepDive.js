// Jira / Meego（飞书项目）深度评测（v3 module 4）
// 复用 openworker 6 段 schema：demo×6 / code×3 / philosophy / timeline / conclusion
// 来源：Jira 官方 docs（atlassian.com）+ Meego（飞书项目）官网 + 实机截图
// 标注：所有 demo 截图均为实机截图（非示意图）
window.TD_JIRA_MEEGO_DEEPDIVE = {
  productId: 'jira-meego',
  productName: 'Jira / Meego（飞书项目）',
  tagline: '20 年沉淀的"流程合法化"标准——把组织意志编码进工作流',
  dateAdded: '2026-08-04',
  isRealScreenshot: true,
  source: 'atlassian.com/software/jira + meego.feishu.cn · 闭源 · 20 年迭代',
  author: '本台研究团队（基于官方 docs+实机截图合成）',

  // ============ ① DEMO（实机截图）============
  demoShots: [
    {
      id: 'jira-home',
      caption: 'Jira 首页：你的工作 + 项目 + 团队（典型企业 dashboard）',
      img: 'assets/shots/jira-meego/01-jira-home.jpeg',
      note: 'Jira 首页 3 段式：①"你的工作"（个人 InProgress 任务）②"项目"（你参与的项目卡片）③"团队"（同事在做什么）。**这是"组织意志入口"——不是个人向**。',
    },
    {
      id: 'jira-features',
      caption: 'Jira Features：Scrum / Kanban / Bug Tracking 全模式支持',
      img: 'assets/shots/jira-meego/02-jira-features.jpeg',
      note: 'Jira 三大工作流模式：Scrum（带 Sprint）/ Kanban（4 列看板）/ Bug Tracking（自定义状态）。**"一个平台支持 3 种模式"是 Jira 的产品哲学——不做选择**。',
    },
    {
      id: 'meego',
      caption: 'Meego（飞书项目）首页：Jira 思路 + 飞书生态融合',
      img: 'assets/shots/jira-meego/03-meego.jpeg',
      note: 'Meego 是 Jira 思路的中国版落地（小米内部也用）。**结合飞书 IM 优势**：Issue 评论自动同步到飞书群、Issue 状态变化触发飞书通知。**是国内最像 Jira 的产品**。',
    },
    {
      id: 'meego-workbench',
      caption: 'Meego 工作台：6 态工作流可视化',
      img: 'assets/shots/jira-meego/04-meego-工作台.jpeg',
      note: '6 态工作流：To Do / In Progress / In Review / Done / Blocked / Canceled。**比 Multica 4 态、Linear 7 态少一个"待分配"——Meego 把 Triage 并入 To Do**。',
    },
    {
      id: 'meego-space',
      caption: 'Meego 空间：Sprint 自动派单 + Backlog 排期',
      img: 'assets/shots/jira-meego/05-meego-空间.jpeg',
      note: '"空间"=Project + Sprint。Meego 空间视图把 Sprint 当作"时间盒"：所有未完成的任务自动滚到下个 Sprint。**这是 Scrum 范式的极致执行**。',
    },
    {
      id: 'meego-team',
      caption: 'Meego 团队：3 层权限（项目角色 / 团队成员 / 个人权限）',
      img: 'assets/shots/jira-meego/07-meego-团队.jpeg',
      note: '3 层权限：① 全局（admin/user/anonymous）② 项目角色（admin/developer/viewer）③ Issue Security Level（public/internal/restricted）。**这是 20 年沉淀的权限模型**。',
    },
  ],

  // ============ ② CODE（关键源码/架构）============
  // 来源：Jira 公开 REST API 文档 + Meego 公开 docs + 截图推断
  codeSnippets: [
    {
      title: 'Issue 状态机：6 态 + Workflow Transition（行业标准）',
      file: 'jira-meego/server/workflow/states.ts (推断)',
      code: `// Jira/Meego 状态机：6 态 + workflow transition
const ISSUE_STATES = ['To Do', 'In Progress', 'In Review', 'Done', 'Blocked', 'Canceled'];

const TRANSITIONS: Record<string, string[]> = {
  'To Do':        ['In Progress', 'Canceled'],
  'In Progress':  ['In Review', 'To Do', 'Blocked'],
  'In Review':    ['Done', 'In Progress'],
  'Done':         ['In Review'],
  'Blocked':      ['In Progress', 'To Do'],
  'Canceled':     [],
};

// 每条 transition 可挂 condition + validator + post-function
// 例：'In Progress' → 'In Review' 时必须有关联 PR`,
      points: [
        '**6 态状态机**——比 Multica 4 态多 2 个（Blocked/Canceled），**正好够企业用**。Blocked=卡住，Canceled=取消，是企业项目里最常见的两个状态。',
        '**每条 transition 可挂 condition/validator/post-function**——**这是 20 年沉淀的灵活性**。"PR 没合不能 Done"、"金额超 $1000 不能 Cancel" 都能在 workflow 层做。',
        '**Done 不是终态**——Done → In Review 是允许的，**这意味着"已完成也可能被退回"**，跟 Multica 的"Done 不可逆"形成对比。',
        '**Canceled 是终态**——避免"取消的事又活了"的混乱。**这是 20 年教训**。',
        'MiCo 改进：抄 6 态 + transition 带 condition 的范式。**至少 6 态是 2026 必做**，condition 机制可以简化但不能省。',
      ],
    },
    {
      title: 'JQL（Jira Query Language）：20 年沉淀的复杂过滤',
      file: 'jira-meego/server/jql/filter.ts (推断)',
      code: `// Jira Query Language (JQL)：复杂过滤
class JQLFilter {
  parse(query: string): Filter {
    // 例: project = "ENG" AND assignee = currentUser() AND status != Done
    // 解析为 AST → 索引查询
    const ast = this.parser.parse(query);
    return this.ast_to_filter(ast);
  }

  execute(filter: Filter): Issue[] {
    return this.index.scan(filter);
  }
}

// JQL 支持：field/operator/value + AND/OR/NOT + 函数(currentUser/now/membersOf)
// 强大但学习成本高`,
      points: [
        '**JQL 是 Jira 20 年沉淀的最大资产**——"项目=ENG AND 负责人=当前用户 AND 状态≠Done AND 标签 in (紧急, P0)" 这种查询是产品经理的日常。',
        '**JQL 不是 SQL**——有自己的 parser 和 AST。**好处：用户不用懂 SQL 也能写**；坏处：学 JQL 比学 SQL 还费劲。',
        '**没有 GraphQL/JSON API 直接用**——Jira 主要走 REST + JQL，**生态兼容性差**（不像 Linear 的 GraphQL 那么现代）。',
        'MiCo 改进：抄 JQL 思路但要**降学习成本**——加"自然语言生成 JQL"（AI 帮用户写查询）+ 简化版 Filter Builder。',
      ],
    },
    {
      title: '3 层权限模型：Global + Project + Issue Security Level',
      file: 'jira-meego/server/auth/permissions.ts (推断)',
      code: `// Jira 3 层权限
class PermissionScheme {
  // Level 1: Global permission (admin, user, anonymous)
  // Level 2: Project role (admin, developer, viewer)
  // Level 3: Issue Security Level (public, internal, restricted)
  check(user: User, action: Action, issue: Issue): boolean {
    if (!this.global_perm[user.role].has(action)) return false;
    if (!this.project_role[issue.project][user.role].has(action)) return false;
    if (!this.security_level[issue.security_level].allows(user)) return false;
    return true;
  }
}`,
      points: [
        '**3 层权限**是 20 年企业级沉淀的"标准答案"——Global（公司级）→ Project（项目级）→ Issue（任务级）。',
        '**Issue Security Level** 是 Jira 独有的"任务级权限"——同样是"技术债"任务，对外只能给 internal 可见，对核心组可以 restricted。',
        '**Project Role** 跟"部门"不完全一致——一个用户在不同 Project 有不同 Role。**这是"矩阵管理"的产品化**。',
        'MiCo 改进：照搬 3 层 + 加"虾编制级别"（Role 而不只是 Project Role）。虾=员工，虾档案=个人权限，编制级别=Role 等级。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: 'Jira 为什么 20 年不被取代？',
    answer: '因为 Jira 解决的不是"任务管理"问题，是**"组织意志编码"问题**——把"什么算完成"、"谁能改什么"、"出了事谁负责"这些**治理问题**编码进工作流。**当一家公司从 10 人长到 1000 人，最痛的不是"任务做不完"而是"谁有权做什么不清楚"**。Jira 用 3 层权限 + 6 态状态机 + JQL 复杂过滤 + Audit log + Activity stream，**20 年把这套治理做成了标准答案**。Meego（飞书项目）在中国市场把 Jira 思路 + 飞书生态融合，**是国内最像 Jira 的产品**。',
    problemDiagnosis: [
      '**任务管理≠项目管理**——前者是个人向工具（Things/Todoist），后者是组织向工具（Jira/Linear）。Jira 押注后者。',
      '**"完成"的定义因公司而异**——同样是"开发完成"，有的公司要"代码合并 + 测试通过 + 文档更新"，有的只要"PR 合"。Jira 用 workflow condition 把"完成"产品化。',
      '**"权限"是组织管理最痛的点**——1000 人的公司不能靠"约定"，必须有"系统级强制"。Jira 的 3 层权限是 20 年沉淀的标准。',
      '**AI 时代 Jira 的核心问题：issue 还是给人执行的**——Jira workflow 假定"人按下按钮"，AI agent 不能自然地参与 transition。**Meego（飞书项目）的 AI 嵌入更激进**，把 AI 当成"团队成员"参与 issue 流转。',
    ],
    designPrinciples: [
      '**Workflow = 治理**——状态机不只是"卡片流转"，是"组织意志的编码"。每条 transition 可以挂 condition/validator/post-function。',
      '**3 层权限**——Global（公司）+ Project（项目）+ Issue Security Level（任务）。**没有"个人级权限"——因为"任务级权限"才是真痛点**。',
      '**JQL 复杂过滤**——20 年沉淀的"产品经理查询语言"，支持 field/operator/function 的完整组合。',
      '**Audit log + Activity stream**——所有操作可追溯，所有事件可查询。**20 年教训：不审计 = 治理失效**。',
      '**多模式**（Scrum/Kanban/Bug）——不做选择，让用户选。**"一个平台解决 3 种工作流"是 Jira 的护城河**。',
    ],
    differentiationMatrix: [
      { vs: 'Multica', diff: 'Multica 是"AI 同事协作"（Issue 中心 + 14 runtime + Squad 路由）；Jira/Meego 是"组织治理"（6 态工作流 + 3 层权限 + Audit log）。**前者关心 agent，后者关心人**。' },
      { vs: 'Linear', diff: 'Linear 是"任务管理 UX 标杆"（7 态 + Triage 收单 + 50ms 手感）；Jira/Meego 是"组织治理标准"（6 态 + 3 层权限 + JQL 复杂过滤）。**前者像 Things/Notion（个人），后者像 SAP/Oracle（企业）**。' },
      { vs: 'Paperclip', diff: 'Paperclip 是"AI 公司编制"（CEO/CTO 角色 + Board 审批 + 预算成本）；Jira/Meego 是"传统公司治理"（项目角色 + 任务权限 + 工作流审批）。**前者是"AI 时代公司"，后者是"传统公司"——MiCo 是前者方向**。' },
      { vs: 'QM', diff: 'QM 是"公司级多 agent 平台"（scope 隔离 + posture 三档 + SECURITY.md 威胁模型）；Jira/Meego 是"传统项目管理"（6 态 + 3 层权限 + JQL）。**前者是 agent-first，后者是人-first——MiCo 是 agent-first**。' },
      { vs: 'MiCo', diff: 'Jira 20 年沉淀的"组织治理"是 MiCo 必学——但 MiCo 必须在"传统公司"基础上加"AI 时代"概念：① 虾编制（AI 员工）② 试运行/转正（信任等级）③ 自主度三档（per-scope posture）。**Jira 是 MiCo 的"人侧基础"，AI 编制是 MiCo 的"agent 侧增量"**。' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2002', event: 'Jira 1.0 发行（Atlassian 成立同年）' },
    { date: '2005', event: 'Jira 引入 Workflow 概念（状态机+condition）' },
    { date: '2010', event: 'Jira 引入 Issue Security Level（3 层权限成型）' },
    { date: '2015', event: 'Jira Cloud（SaaS）正式发布' },
    { date: '2020', event: 'Meego（飞书项目）立项（飞书内部使用）' },
    { date: '2022', event: 'Meego 商业化 + 飞书生态融合' },
    { date: '2024', event: 'Meego 进入小米内部采购清单（飞书项目深度集成）' },
    { date: '2026-08', event: '本台评测入库（8 维矩阵 + 5 段 philosophy）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'Jira / Meego 是 2026 年"组织治理"赛道里**20 年沉淀的硬标准**——6 态工作流 + 3 层权限 + JQL 复杂过滤 + Audit log + Activity stream，每一项都是企业级"必答题"。它不是 Multica（agent 中心），不是 Linear（UX 标杆），不是 Paperclip（AI 编制）——它选择了"组织意志编码"这条路，并在企业级这条路上做到 20 年不被取代。**对 MiCo 来说，Jira 是"必学的人侧基础"**——6 态 + 3 层权限 + Audit log 是入场券，Meego 是国内最像 Jira 的产品（小米实例），但 MiCo 必须在此基础上加"AI 时代"的 agent 编制化能力。',
    forMico: [
      '**6 态工作流**（To Do / In Progress / In Review / Done / Blocked / Canceled）——**完整跟随**，是企业级任务中心的"入场券"。',
      '**3 层权限**（Global + Project + Issue Security Level）——**完整跟随**，虾档案+编制级别+任务权限=企业治理的"标准答案"。',
      '**Workflow condition/validator/post-function**——**完整跟随**，是"完成的产品化"的关键（PR 没合不能 Done、金额超 $1000 不能 Cancel）。',
      '**Audit log + Activity stream**——**完整跟随**，所有操作可追溯。MiCo 必须达到同等水平，否则企业客户不会买单。',
      '**JQL 复杂过滤**——**抄思路但降学习成本**——加"自然语言生成 JQL"（AI 帮用户写查询）+ 简化版 Filter Builder。',
      '**多模式支持**（Scrum/Kanban/Bug）——**简化**，MiCo 不必全做，专注 Sprint 排期 + 4 列看板两种足够，复杂留给配置项。',
      '**Meego 的飞书融合**（Issue 评论自动同步到飞书群）——**学**，MiCo 必须有"IM 同步"，否则在国内场景下落后于 Meego。',
    ],
  },
};
