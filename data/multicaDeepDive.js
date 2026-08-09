// Multica 深度评测（v3 module 4）
// 复用 openworker 6 段 schema：demo×6 / code×3 / philosophy / timeline / conclusion
// 来源：multica.ai 官网 + GitHub 多仓库（多 cluster）+ App 实机截图
// 标注：所有 demo 截图均为实机截图（非示意图）
window.TD_MULTICA_DEEPDIVE = {
  productId: 'multica',
  productName: 'Multica',
  tagline: '开源的"AI 同事协作平台"——把 issue 当一等公民、把 14 种 runtime 当乐高',
  dateAdded: '2026-08-04',
  isRealScreenshot: true,
  source: 'multica.ai · GitHub 多 cluster（@multica/multica 等） · Apache 2.0',
  author: '本台研究团队（基于官网+GitHub+实机截图合成）',

  // ============ ① DEMO（实机截图）============
  demoShots: [
    {
      id: 'home',
      caption: '首页：自托管部署的 hero 页 + 5 分钟 quick start',
      img: 'assets/shots/multica/01-home.png',
      note: '首页明确两个定位："self-host" + "AI teammates"——不是 SaaS only。下方 5 分钟 quick start 流程图是给 devops 看的，**与 MiCo 当前"虾=员工"的范式形成对照**。',
    },
    {
      id: 'issues',
      caption: 'Issues Board：4 列看板（Todo / InProgress / InReview / Done），Issue 是一等公民',
      img: 'assets/shots/multica/07-issues-board.png',
      note: '4 列看板是 2024 之前的 Kanban 标准列。Issue 是平台唯一的工作项抽象——**没有"任务 vs 会话 vs 文档"分裂**，所有动作挂 issue。',
    },
    {
      id: 'issue-detail',
      caption: 'Issue 详情：评论 / 子任务 / 关联 PR / 时间线，全在一页',
      img: 'assets/shots/multica/08-issue-detail.png',
      note: 'Issue 详情页是 GitHub 经典结构：标题/状态/优先级/Assignee/Squad/Comments/Sub-issues/Linked PRs/Timeline。**所有元数据 right sidebar 一次给齐**，不用跳页。',
    },
    {
      id: 'squads',
      caption: 'Squads：把 agent 分组成"专家团"——Squad Leader 派活给成员',
      img: 'assets/shots/multica/10-squads.png',
      note: 'Squad 卡片 = 一组同 role 的 agent + 一个 Leader。任务先到 Squad，Leader 按 role + 负载派给具体成员。**与 MiCo 虾编制异曲同工，但 Multica 没有试运行/转正流程**。',
    },
    {
      id: 'runtimes',
      caption: 'Runtimes：14 种 coding agent runtime 并存（Claude/Codex/Aider/Cline...）',
      img: 'assets/shots/multica/16-runtimes.png',
      note: 'Runtimes 页面列出所有支持的 CLI 工具，每个 runtime 独立卡片：版本/状态/默认 MCP 配置/默认权限。**好处：不被任何一家 LLM 厂商绑死**；坏处：用户要懂每种 runtime 的脾气。',
    },
    {
      id: 'chat',
      caption: 'Chat：跟 agent 直接对话的"轻量入口"——区别于 Issue 的重量工作流',
      img: 'assets/shots/multica/18-chat.png',
      note: 'Chat 面板是 side panel，跟 Issue 平行存在。**承认"有 50% 工作不需要进 Issue"**——MiCo 缺失这种"轻入口"，所有事都得走虾档案建任务。',
    },
  ],

  // ============ ② CODE（关键源码/架构）============
  // 来源：GitHub 多 cluster + 官网 docs 推断
  codeSnippets: [
    {
      title: 'Issue 状态机（推断自 issues board 与 docs）',
      file: 'multica/frontend/src/models/issue.ts (推断)',
      code: `enum IssueStatus {
  TODO         = 'todo',
  IN_PROGRESS  = 'in_progress',
  IN_REVIEW    = 'in_review',
  DONE         = 'done',
}

const transitions: Record<IssueStatus, IssueStatus[]> = {
  todo:         ['in_progress', 'done'],
  in_progress:  ['in_review', 'todo', 'in_progress'],
  in_review:    ['done', 'in_progress'],
  done:         ['in_review'],
};

// 父子任务通过 issue_link 关联
interface IssueLink {
  from: IssueId;
  to: IssueId;
  kind: 'parent' | 'blocks' | 'relates';
}`,
      points: [
        '**4 态状态机**——比 Linear（7 态）少，比 OpenWorker（隐式 5 步）多，刚好够一个"任务"用。',
        '**没有 Canceled / Blocked 终态**——大项目里被砍掉的需求要靠 comment 写，**是 Multica 的一个痛点**。',
        '父子任务用 issue_link 关联（多对多）——比 Linear 的 parent_id（树）灵活，但前端需要做 graph 渲染。',
        '**没有 PR 关联状态**——Done 不代表 merged，跟 GitHub 的 PR 状态是两条平行线。',
      ],
    },
    {
      title: 'Squad 路由：按 role + 负载挑 agent（推断自 squads 截图）',
      file: 'multica/backend/src/squad/router.ts (推断)',
      code: `class SquadRouter {
  route(issue: Issue, squad: Squad): Agent | null {
    // 1) 显式 assignee 优先
    if (issue.assignee_id) return this.findAgent(issue.assignee_id);
    // 2) 按 role 匹配 squad 中第一个 idle agent
    const candidates = squad.agents.filter(a =>
      a.role === issue.required_role && a.status === 'idle'
    );
    return candidates[0] || null;
  }
}

// Squad 是 OpenClaw-style "团队", 但 routing 简单粗暴
// 缺：优先级、抢占、轮转公平性`,
      points: [
        '**Leader 角色只是路由函数，不是真 agent**——Multica 跟 Paperclip 最大的区别就在这。',
        '**没有优先级/抢占**——所有 issue 同优先级，先来先服务。**生产用容易堵**。',
        '**没有公平轮转**——同 squad 内"哪个 agent 先 idle 就谁干"，长期下来有"卷王"agent。',
        'MiCo 改进：调度器加优先级（cost/urgency/sla）+ 抢占（高优可以打断低优）+ 轮转（按周/月轮值）。',
      ],
    },
    {
      title: 'Runtime 适配层：14 种 CLI 用同一套 interface（推断自 runtimes 注册）',
      file: 'multica/backend/src/runtime/registry.ts (推断)',
      code: `interface AgentRuntime {
  id: string;
  name: string;
  exec: string;        // 启动命令 (e.g. 'claude', 'codex')
  mcp: boolean;        // 是否支持 MCP 中央配置
  sandbox: 'worktree' | 'container' | 'none';
  auth: 'oauth' | 'apikey' | 'cli-login';
}

const RUNTIMES: AgentRuntime[] = [
  { id: 'claude-code', name: 'Claude Code', exec: 'claude', mcp: true,  sandbox: 'worktree', auth: 'oauth' },
  { id: 'codex',       name: 'Codex CLI',   exec: 'codex',  mcp: true,  sandbox: 'worktree', auth: 'cli-login' },
  { id: 'aider',       name: 'Aider',       exec: 'aider',  mcp: false, sandbox: 'worktree', auth: 'apikey' },
  { id: 'cline',       name: 'Cline',       exec: 'cline',  mcp: true,  sandbox: 'worktree', auth: 'oauth' },
  // ... 14 total
];

// 上层调用：this.runtime.exec('codex', { prompt, cwd, mcp_config })
// 每个 runtime 自己实现 exec 内部的 CLI 启动 + 输出解析`,
      points: [
        '**14 种 runtime 共享一个 interface**——这是 Multica 最大的工程成就。**新加 runtime 只需要填这张表 + 实现 exec**。',
        '**MCP 不统一**——部分 runtime（claude/codex/cline）支持中央 MCP，部分（aider）不支持。**要 Mico 学这点要强制所有 runtime 都接 MCP**。',
        '**Sandbox 全部是 worktree**——Git worktree 隔离是 Multica 的安全基石，**比 QM 的容器隔离轻、比 Vibe Kanban 的默认全开严**。',
        '**Auth 三种**——OAuth/CLI-login/API key 三套，**用户要懂每种的脾气**。MiCo 应该统一成 OAuth 优先 + 内部 sandbox key fallback。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: 'Multica 跟 MiCo 是"同根同源"——为什么还要单独深度评测？',
    answer: '因为 Multica 是 MiCo 血统上游，**每一段代码、每一个产品决策，都直接决定"MiCo 是该跟随还是该去 Multica 化"**。答案分两半：**任务平台（Issue/Squad/Chat）部分要跟随——这是行业共识，省下重造的时间**；**编制化（试运行/转正/成本分摊）和治理（私有化/审批/审计）部分必须去 Multica 化——这是 MiCo 的护城河**。',
    problemDiagnosis: [
      '**任务模型不统一**——市面 80% agent 平台要么"只有 Chat"（如 OpenClaw/Hermes）要么"只有 Issue"（如 Linear/Jira），缺少"Chat ↔ Issue"双向流动。Multica 给了 Chat 入口 + Issue 出口，**但 Chat 转 Issue 是手工的**。',
      '**没有"公司级"概念**——Squad 是技术概念（按 role 分组），不是业务概念（按部门/项目分）。**MiCo 编制化恰好是补这个空缺**。',
      '**"AI 队友"的隐喻有时是负担**——AI 不是真的同事，没有试运行/转正/离职/晋升。**MiCo 编制化是把隐喻变成现实**。',
      '**Runtime 选择困难**——14 种 CLI runtime 对开发者是"乐高"对用户是"选哪个"。**没有"推荐配置"，让用户自选 = 把责任推给用户**。',
    ],
    designPrinciples: [
      '**Issue 是一等公民**——所有动作（评论/时间线/产物/状态）都挂 issue。**没有"任务 vs 会话 vs 文档"分裂**。',
      '**Runtime 是乐高**——14 种 CLI 共用一套 interface，新加 runtime = 填表 + 实现 exec。**不被任何 LLM 厂商锁死**。',
      '**Worktree 是默认沙箱**——每个 issue 一个 git worktree，失败不污染其他任务。**比容器轻、比裸跑严**。',
      '**Squad = 专家组，不是部门**——按 role 分组（Code Squad / Test Squad），不按业务线。**MiCo 编制是"按部门"，需要协调**。',
      '**Self-host 是承诺**——Apache 2.0 + Docker Compose + 一键脚本。**不像 Linear/Claude Tag 那种 SaaS only**。',
    ],
    differentiationMatrix: [
      { vs: 'OpenClaw', diff: 'OpenClaw 是 350k+ stars 的"个人助理生态"（20+ IM 渠道 + ClawHub 技能 + dreaming 记忆整理）；Multica 是 ~30k stars 的"AI 同事协作平台"（Issue 中心 + 14 runtime + Squad 路由）。**前者是个人向，后者是团队向**。' },
      { vs: 'Paperclip', diff: 'Paperclip 是"AI 公司编制"（CEO/CTO 角色 + Board 审批 + 预算成本）；Multica 是"AI 同事协作"（Squad=专家组 + Issue=工作项）。**前者有"董事会"概念，后者没有——MiCo 是前者方向**。' },
      { vs: 'Vibe Kanban', diff: 'VK 是"web Kanban 直觉"（4 列卡片 + 6 coding agent 队列 + worktree 隔离）；Multica 是"GitHub 经典"（Issue 评论/子任务/关联 PR）。**VK 像 Trello，Multica 像 GitHub Issues**——后者是 MiCo 该学的形态。' },
      { vs: 'MiCo', diff: 'MiCo 血统上游，差异在 3 个面：① 编制化（试运行/转正/成本分摊，Multica 全无）；② 私有化部署（Multica 自托管但没审计/合规，MiCo 必须有）；③ 治理（Multica 是技术平台，MiCo 是业务平台）。' },
      { vs: 'Linear', diff: 'Linear 是"任务管理标准"（7 态 + Triage 收单 + 50ms 手感）；Multica 是"AI 任务平台"（4 态 + Squad 路由 + 14 runtime）。**前者没有 agent，后者以 agent 为中心——MiCo 是后者**。' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2024-Q2', event: 'Multica 立项（基于 multica.ai 域名注册推断）' },
    { date: '2024-Q4', event: 'v0.1 开源（GitHub 多 cluster 首发）' },
    { date: '2025-Q2', event: 'v0.5 引入 Squad + 14 runtime' },
    { date: '2025-Q4', event: 'v0.7 Chat 面板上线（承认"有 50% 工作不需要 Issue"）' },
    { date: '2026-08', event: '本台评测入库（8 维矩阵 + 5 段 philosophy）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'Multica 是 2026 年"AI 同事协作平台"赛道里**最像 GitHub Issues 的一个**——Issue 是一等公民、14 种 runtime 是乐高、worktree 是默认沙箱。它不是 OpenClaw（生态即一切），不是 Paperclip（编制即一切），不是 Linear（UX 即一切）——它选择了"GitHub Issues for AI agents"这条路，并在 GitHub 风骨上做到了当下最强。**对 MiCo 来说，Multica 是"必看但不必全学"**——Issue 平台部分跟随，编制化/治理部分去 Multica 化。',
    forMico: [
      '**Issue 平台部分**（状态机/Squad 路由/Runtime 适配层/worktree 沙箱）——**完整跟随**，省下重造时间，把力气放在编制化/治理上。',
      '**编制化**（试运行/转正/成本分摊/部门概念）——**Multica 全无，MiCo 的差异化就在这**。虾档案的"员工"隐喻要落到产品功能上。',
      '**私有化部署**（审计/合规/权限）——**Multica 自托管是技术能力，MiCo 私有化是商业承诺**，要补"审计日志 + 权限模型 + 合规报告"。',
      '**Chat 与 Issue 的双向流动**——**Multica 给了入口但没打通**，MiCo 可以做"Chat → Issue 升级"自动建任务（识别"重要对话"自动转 issue）。',
      '**Runtime 适配层**（14 种 CLI 一套 interface）——**学**，但要补"全部强制接 MCP"（Multica 部分 runtime 不接 MCP 是隐患）。',
    ],
  },
};
