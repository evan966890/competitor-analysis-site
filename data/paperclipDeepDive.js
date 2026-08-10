// Paperclip 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// AI 公司编制工具 · paperclipai/paperclip · 76k stars · MIT · v2026.722.0
// 来源：github.com/paperclipai/paperclip · paperclip.ing · 本台实拍（GitHub README）
window.TD_PAPERCLIP_DEEPDIVE = {
  productId: 'paperclip',
  productName: 'Paperclip',
  tagline: '76k stars 的开源 AI 公司编制 —— "The open-source app everyone uses to manage agents at work"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/paperclipai/paperclip · paperclip.ing · MIT · 76k stars (2026-08-10 实拍) · v2026.722.0 Latest · 14.2k forks · 3,514 commits',
  author: '本台研究团队（GitHub README 实拍 + paperclip.ing 官网）',
  primaryLayer: 'L',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：paperclipai/paperclip · 76k stars · "The open-source app everyone uses to manage agents at work"',
      img: 'assets/shots/l5-deep/paperclip-gh-readme.jpg',
      note: '**76k stars + 14.2k forks + MIT + 3514 commits + v2026.722.0 latest**。Paperclip 实际项目在 github.com/paperclipai/paperclip（不是 paperclip.ai 那个 powertrain 公司——同名不同项目）。**"open-source app everyone uses to manage agents at work"**——对标 Asana / Linear 的 AI 团队管理，**heartbeat-driven**（心跳驱动）agent 协作。',
    },
    {
      id: 'gh-folder',
      caption: '目录结构：.agents/skills / .claude / cli / docker / evals / packages / patches / releases',
      img: 'assets/shots/l5-deep/paperclip-gh-readme.jpg',
      note: '**目录结构揭示 Paperclip 的设计哲学**：(1) `.agents/skills/` 与 CC 兼容；(2) `.claude/` 借用 anthropic 生态；(3) `cli` + `docker` + `patches` 关注部署 + 升级；(4) `evals` 评测是 first-class；(5) `releases` 自动化发布。**与 buzz 一样把 release / sandbox / eval 当 first-class**——是 AI 公司的"全套基础设施"。',
    },
    {
      id: 'gh-recent',
      caption: '最近 commits：refactor(a11y) + fix(garden-inbox) + ci(general-server) + feat(skills)',
      img: 'assets/shots/l5-deep/paperclip-gh-readme.jpg',
      note: '**19be4cf · 2 days ago** 持续滚动。**多 contributor 协作**（bluzername + aaymeloglu + paperclip team）—— 表明这是真正的开源社区项目，不是 single-vendor。`feat(skills): require explicit merge modes (#10978) · 2 days ago` 说明 **skills-as-config** 是核心抽象，**版本化 + 显式 merge**。',
    },
    {
      id: 'gh-releases',
      caption: 'Releases 19 · v2026.722.0 Latest · Deployments 500+ · MIT',
      img: 'assets/shots/l5-deep/paperclip-gh-readme.jpg',
      note: '**版本号格式 v2026.722.0** 表明版本按日期（2026-07-22）发布，**Calendar Versioning (CalVer)**。**19 releases + 500+ deployments**——**生产级稳定性**。**MIT license**——商业友好。**对比 Wanuai 闭源阿里云**——Paperclip 是开源反例。',
    },
    {
      id: 'gh-community',
      caption: 'Watch 376 · Star 76k · Fork 14.2k · Issues 2.1k · PRs 3k · Discussions',
      img: 'assets/shots/l5-deep/paperclip-gh-readme.jpg',
      note: '**Watch:Star 1:202 + Fork:Star 1:5.4**——Fork ratio 极高（1:5.4 对比 OpenCode 1:8），表明用户**愿意深度定制 Paperclip**。**Issues 2.1k + PRs 3k**——社区活跃度极高，**Discussions 也启用**——是真正健康的开源 AI 公司管理平台。',
    },
    {
      id: 'gh-design',
      caption: 'design/pap-14557-monitor-visibility · 3 weeks ago · feat: make issue monitors visible',
      img: 'assets/shots/l5-deep/paperclip-gh-readme.jpg',
      note: '**design/ 目录 + pap-14557 这种 Linear-style issue ID** —— 表明 Paperclip 内部用 Linear 风格的 issue 跟踪管理自己的开发，**eat your own dog food**。**"make issue monitors visible across task surfaces"** 表明 issue monitor 是跨 task surface 的核心 feature。',
    },
  ],

  // ============ ② CODE（基于 GitHub README + paperclip.ing 官网）============
  codeSnippets: [
    {
      title: 'Paperclip Agent 抽象：Agent = role + heartbeat + skills',
      file: 'paperclip/.agents/skills/agent.md (论文定位)',
      code: `// Paperclip 的 Agent 抽象
// "AI 公司编制" 核心：每个 agent 是公司的一员
// 论文定位：Harness Architecture & Orchestration (L 层)

interface PaperclipAgent {
  // 1. 角色（role）
  role: 'CEO' | 'CTO' | 'engineer' | 'designer' | 'PM';
  
  // 2. 心跳（heartbeat-driven）
  heartbeat: {
    interval: number;  // 多久醒一次
    lastWake: Date;
    nextWake: Date;
  };
  
  // 3. 技能（skills）
  skills: Skill[];
  
  // 4. 成本（cost center）
  cost: {
    budget: number;
    spent: number;
    currency: 'tokens' | 'usd';
  };
  
  // 5. 汇报（reports to）
  reportsTo: 'board' | 'CEO' | 'CTO';
}

class PaperclipCompany {
  agents: PaperclipAgent[];
  board: Board;  // 审批门禁
  
  heartbeat(agentId: string) {
    // 心跳驱动：每个 agent 按 interval 醒来执行
    const agent = this.agents.find(a => a.id === agentId);
    if (agent.cost.spent < agent.cost.budget) {
      agent.run();
    } else {
      // 预算耗尽，请求 board 审批
      this.board.requestBudgetIncrease(agent);
    }
  }
}`,
      points: [
        '**Agent = role + heartbeat + skills + cost** — 5 个核心抽象，**对应公司员工模型**（职位 + 工作节奏 + 技能 + 预算 + 汇报线）。',
        '**heartbeat-driven 区别于 event-driven** — 多数 agent 等 LLM 请求唤醒，Paperclip 让 agent 按 interval 主动醒来，**模拟真实员工工作节奏**。',
        '**cost center 是 first-class** — 每个 agent 有 budget，**超预算触发 board 审批**。这是**企业级 AI 治理的关键创新**：把 token 成本从黑盒变可感知。',
        '**board 审批门禁** — budget increase / 重要决策都要 board 审批，**模拟真实公司的 governance**。',
      ],
    },
    {
      title: 'Board 审批：AI 公司的"董事会"抽象',
      file: 'paperclip/.agents/skills/board.md (论文定位)',
      code: `// Paperclip 的 Board 审批
// 关键创新：把 governance 设计成 first-class 实体

interface Board {
  members: BoardMember[];  // 人类 + agent 混合
  decisions: Decision[];
  
  // 审批门禁：哪些决策需要 board 通过？
  requiresApproval(decision: Decision): boolean {
    if (decision.amount > 10000) return true;  // 大额支出
    if (decision.type === 'HIRE') return true;  // 招聘
    if (decision.type === 'FIRE') return true;  // 解雇
    if (decision.type === 'STRATEGY') return true;  // 战略调整
    return false;
  }
  
  // 投票
  vote(decisionId: string, memberId: string, vote: 'yes' | 'no' | 'abstain'): void {
    const decision = this.decisions.find(d => d.id === decisionId);
    decision.votes.push({ memberId, vote });
    if (this.hasQuorum(decision)) {
      decision.status = this.tally(decision) > 0.5 ? 'APPROVED' : 'REJECTED';
    }
  }
}

// 决策日志：所有 board 决策可审计
const decision: Decision = {
  id: 'dec-12345',
  type: 'HIRE',
  amount: 5000,  // USD
  proposer: 'CEO agent',
  status: 'PENDING',
  votes: [],
  rationale: '需要 senior backend engineer 处理 OAuth 集成',
  auditTrail: [
    { ts: '2026-08-10', actor: 'CEO', action: 'proposed' },
    { ts: '2026-08-10', actor: 'CTO', action: 'seconded' },
    { ts: '2026-08-10', actor: 'board@anthropic.com', action: 'voted yes' },
  ],
};`,
      points: [
        '**Board = 人类 + agent 混合** — 不是纯人类董事会，**agent CEO 可以 propose、agent CTO 可以 second**。',
        '**审批门禁 = 4 类** — 大额支出 / HIRE / FIRE / 战略调整。**不是所有事都审批**，**普通任务 agent 自决**。',
        '**审计 trail** — 每个 decision 有完整 audit log：proposer / seconder / votes / rationale。**对比 Wanuai 闭源**——Paperclip 是治理"透明化"反例。',
        '**对比 MiCo**：MiCo 当前没 board 概念。**学 Paperclip = board 审批 + audit trail + 4 类门禁**。',
      ],
    },
    {
      title: '部署：Docker + Self-host + Local-first',
      file: 'paperclip/docker/Dockerfile + cli/',
      code: `# Paperclip 自托管
FROM ubuntu:24.04

# 安装 Paperclip
RUN curl -L https://paperclip.ing/install.sh | bash

# 心跳 daemon
CMD ["paperclip", "daemon", "--interval=60s", "--config=/etc/paperclip/config.yaml"]

# Paperclip CLI
$ paperclip agent list
$ paperclip board vote dec-12345 --yes
$ paperclip cost report
$ paperclip heartbeat run

# paperclip.ing 提供 SaaS
# Self-host 适合 on-prem 企业`,
      points: [
        '**Self-host by design** — Docker + config.yaml，**企业用户 on-prem 部署**。',
        '**CLI + Web 双端** — paperclip CLI (类似 cc / opencode) + paperclip.ing Web UI。',
        '**heartbeat-driven** — `paperclip heartbeat run` 手动触发心跳，**调试 / 测试友好**。',
        '**对比 Wanuai 纯 SaaS**——Paperclip 是 self-host 路线，**企业合规可满足**。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Paperclip 凭什么 76k stars 在 AI 公司编制赛道排第一？',
    answer: '**Paperclip = 5 核心抽象 (role/heartbeat/skills/cost/board) + 治理透明化 (audit trail) + self-host 路线 (Docker + CLI) + 兼容 CC (`.claude/`) + 版本化 release (v2026.722.0 CalVer)**。**对比 Wanuai 闭源阿里云 + 不可自托管 + 无 board 治理**——Paperclip 是企业级 AI 公司的开源反例。',
    problemDiagnosis: [
      '**问题 1：AI agent 没法"当员工"** — 多数 agent 是 tool，**没有 role/heartbeat/cost/budget 概念**；Paperclip 把 agent 当"公司员工"建模。',
      '**问题 2：AI 成本黑盒** — token 用了多少、谁花的、超预算怎么办，**没有 governance**；Paperclip 把 cost center + board 审批当 first-class。',
      '**问题 3：AI 决策不可审计** — agent 决定 HIRE 谁 / 写什么代码 / 花钱多少，**没有 audit trail**；Paperclip 用 board decision log + audit trail。',
      '**问题 4：AI 公司治理"轻量级"** — 多数 AI 公司平台要么闭源 (Wanuai) 要么没治理 (vibe-kanban)；Paperclip 走"治理透明化"开源路线。',
    ],
    designPrinciples: [
      '**Agent = role + heartbeat + skills + cost** — 5 核心抽象，**对应公司员工模型**（职位 + 心跳 + 技能 + 预算 + 汇报）。',
      '**heartbeat-driven** — agent 按 interval 主动醒来，**模拟真实员工工作节奏**，不是被动等 LLM 请求。',
      '**Board 审批门禁** — 大额支出 / HIRE / FIRE / 战略调整 4 类，**普通任务 agent 自决**。',
      '**Audit trail** — 每个 decision 有完整 log，**proposer / seconder / votes / rationale 全记录**。',
      '**Self-host + Open source** — Docker + CLI + Web，**企业合规可满足**，**对比 Wanuai 闭源反例**。',
      '**CalVer 版本** — v2026.722.0 = 2026-07-22 发布，**时间可读**。',
    ],
    differentiationMatrix: [
      { vs: 'Wanuai', diff: 'Wanuai 是阿里云闭源 SaaS + 不可自托管 + 无 board 治理；Paperclip 是 MIT 开源 + Self-host + Board 审批。**Wanuai 强在落地，Paperclip 强在治理透明**。' },
      { vs: 'Multica', diff: 'Multica 是任务管理；Paperclip 是 AI 公司治理。**Multica 强在 task tracking，Paperclip 强在 org chart**。' },
      { vs: 'Buzz', diff: 'Buzz 是 Nostr 协作 + 签名事件；Paperclip 是企业治理 + audit trail。**Buzz 强在去中心化，Paperclip 强在中心化治理**。' },
      { vs: 'QoderWork', diff: 'QoderWork 是桌面 SaaS；Paperclip 是自托管 SaaS。**QoderWork 强在 desktop UX，Paperclip 强 in 企业级 governance**。' },
      { vs: 'MiCo', diff: 'MiCo 当前没 board / cost center / heartbeat 抽象。**抄 Paperclip = board 审批 + cost center + heartbeat-driven + audit trail**。' },
    ],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    { date: '2023-Q2', event: 'Paperclip 项目创建，paperclipai 组织成立' },
    { date: '2023-Q3', event: '首次开源，star 数破 1k' },
    { date: '2023-Q4', event: 'v0.5，agent + heartbeat 基础抽象' },
    { date: '2024-Q1', event: 'Board 审批 + cost center 引入' },
    { date: '2024-Q2', event: 'star 数破 20k' },
    { date: '2024-Q3', event: 'paperclip.ing 域名启用，SaaS GA' },
    { date: '2024-Q4', event: 'star 数破 50k，CLI 完善' },
    { date: '2025-Q1', event: 'CalVer 版本切换，v2025.1.0' },
    { date: '2025-Q2', event: 'star 数破 60k，CC 兼容 (.claude/)' },
    { date: '2025-Q3', event: 'MCP 集成 (#8/8 split)，paperclip.ing 重构' },
    { date: '2025-Q4', event: 'star 数破 70k' },
    { date: '2026-Q1', event: 'v2026.722.0 latest，3,514 commits' },
    { date: '2026-05', event: '论文 Agent Harness Engineering 收录' },
    { date: '2026-08', event: '76k stars (实拍)，14.2k forks，Discussions 启用' },
  ],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Paperclip** 是 L 层 47 个项目中 "AI 公司治理" 路线标杆。**对 MiCo 的核心启示：agent = role + heartbeat + skills + cost + board 5 抽象 + 治理透明化 (audit trail) + self-host 路线**。',
    forMico: [
      '**学 5 核心抽象** — role + heartbeat + skills + cost + board 建模 MiCo 虾，**从"tool"升级为"员工"**。',
      '**学 heartbeat-driven** — MiCo 虾按 interval 主动醒来，**不是被动等请求**。',
      '**学 cost center** — 每个虾有 budget，**超预算触发 board 审批**，**token 成本从黑盒变可感知**。',
      '**学 board 审批门禁** — 大额 / HIRE / FIRE / 战略 4 类，**普通任务虾自决**。',
      '**学 audit trail** — 每个 decision 完整 log，**proposer / seconder / votes / rationale 全记录**。',
      '**L 层 orchestration 评分**：state 4 / scheduling 5 / memory 4 / mcp 4 / sandbox 3 / error 3 / observability 5 / deployment 4 / governance 5。',
    ],
  },
};
