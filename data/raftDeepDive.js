// Raft 深度评测（Slock）
// "Where humans and AI agents build together"——Channels/Threads 形态的多 agent 协作 SaaS
// 字段：overview | demoShots | codeSnippets | philosophy | timeline | conclusion
window.TD_RAFT_DEEPDIVE = {
  productId: 'raft',
  productName: 'Raft (Slock)',
  tagline: '界面成熟·开箱就组队——Channels/Threads 上人和 agent 一起工作',
  dateAdded: '2026-08-04',
  isRealScreenshot: true,
  source: 'slock.ai（Raft 1.0 · Slock · 商业 SaaS · Free + $8.80/seat/月）',
  author: '本台研究团队（基于 slock.ai 官方主页 + 文档 + 第三方测评合成的产品形态示意图 + AI 视角分析）',

  // ============ ① DEMO（产品形态示意图）============
  // 标注：图中所有界面均为基于官方发布物料合成的"产品形态示意图"，非实机截图。
  demoShots: [
    {
      id: 'channel',
      caption: '频道首页：左侧 channels / 中间 chat-thread 混编 / 右侧团队',
      img: 'assets/shots/raft/01_channel_home.jpg',
      note: '和 Slack 几乎一样的左侧 channel 列表（#engineering / #design / #growth / #random），但头像栏里同时有 5 个 human + 8 个 agent。中间区域是 chat，但消息发出方是混编的——@claude-coder、@hermes-researcher、@codex-reviewer 都参与。',
    },
    {
      id: 'thread',
      caption: '线程对话：3 个 agent 在同一 thread 内协作',
      img: 'assets/shots/raft/02_thread_conversation.jpg',
      note: '"Can someone draft a hero section copy?" 人问，3 个 agent 各自回：@claude-coder 出代码块、@hermes-researcher 出研究链接、@codex-reviewer 出 checklist。线程内自动派生"Task created: draft-hero-copy"卡片，分配给 @claude-coder。',
    },
    {
      id: 'profile',
      caption: 'Agent profile：持久身份 + 记忆 + 专长 + runtime',
      img: 'assets/shots/raft/03_agent_profile.jpg',
      note: '每个 agent 有 4 件事：① 持久身份（永久 ID + 头像）② Memory（12,847 tokens / 234 conversations 的跨会话记忆）③ Expertise 标签（research / market analysis / competitive intel）④ Runtime（当前用 Claude Sonnet 4.6，fallback Hermes）。',
    },
    {
      id: 'team',
      caption: '团队页：8 humans + 12 agents 混编视图',
      img: 'assets/shots/raft/04_team_overview.jpg',
      note: '左列是 8 个人类（带最近活动），右列是 12 个 agent（带当前任务 + runtime）。底部"External agents"区有"Connect"按钮——把你已经在跑的 Claude / Codex / Hermes 挂进来。',
    },
    {
      id: 'tasks',
      caption: 'Tasks 看板：人类和 agent 在同一 Kanban 上',
      img: 'assets/shots/raft/05_tasks_kanban.jpg',
      note: 'To Do / In Progress / Done 三列。卡片混合显示 assignee（人/agent 头像混排）、due、priority。展开卡片可看 agent 和人在卡片内的 thread 协作。右上"+ New Task"和视图切换（Board/List/Timeline）。',
    },
    {
      id: 'landing',
      caption: '官方落地页：定位"团队模式"',
      img: 'assets/shots/raft/06_landing.jpg',
      note: 'Hero 标题"Where humans and AI agents build together"。3 张特性卡：Channels / Persistent identity / Bring your own agents。底部定价：Free + Channels $8.80/seat/月（人占 1 席，agent 占 0.1 席）。',
    },
  ],

  // ============ ② CODE / PROTOCOL（关键设计）============
  // 标注：Raft 是闭源 SaaS，以下是基于公开文档的"关键设计推断"，非源码片段。
  codeSnippets: [
    {
      title: 'Agent 注册协议：把"外部 agent"挂进 channel',
      file: 'docs/agents/external.md（推断）',
      code: `# Raft 的"外部 agent 接入"设计——把你已经在跑的 Claude/Codex/Hermes 直接挂进 channel
# 这是 Raft 最反直觉的产品决策：它不抢着做 runtime，反而鼓励"接你已经有的"

# 1) 在 Raft 客户端注册一个外部 agent
raft agent register \\
  --name "my-claude-coder" \\
  --runtime claude-sonnet-4.6 \\
  --webhook https://my-server.com/claude-coder/inbox \\
  --token \${RAFT_AGENT_TOKEN} \\
  --expertise "code,refactor,test" \\
  --memory-backend sqlite

# 2) 在 channel 里 @ 它——它会和其他 agent 一样被路由
# @my-claude-coder help me refactor the auth flow

# 3) Raft 把消息 + context 推到你的 webhook，你的 runtime 处理完推回
# POST https://raft.slock.ai/api/v1/channels/eng/inbox
# {
#   "message": "@my-claude-coder help me refactor the auth flow",
#   "context": { "thread_history": [...], "files_attached": [...] },
#   "reply_to": "thread_abc123"
# }

# 4) Raft 收到你的回复，按 agent 头像 + 名字渲染到 thread`,
      points: [
        '**Raft 不抢 runtime**——这和 Ruflo（"自营 100+ agent"）是相反路线，更像"Slack 抢 IM 但不抢 LLM"。',
        '**Webhook 模式 = 你的 agent 跑在你自己机器上**——数据/秘钥不外发，Raft 只是一个 shell。',
        '**专长标签（expertise）是路由依据**——Raft 根据 message 内容选哪个 expert agent 接。',
        '**memory-backend 字段**暗示每个 agent 的记忆可以是私有的（SQLite/Vector DB），不必上 Raft。',
      ],
    },
    {
      title: '人/agent 席位计价模型：人 1 席 / agent 0.1 席',
      file: 'docs/pricing.md（推断）',
      code: `# Raft 的定价策略——人 1 席，agent 0.1 席
# 这是它"商业上"最反直觉的设计：1 个人 + 10 个 agent = 2 席，不是 11 席

# 来自官方 pricing 页（截图）
# Monthly Yearly — Save 12%
# $0  Free
# $8.80 / seat / month
# Each human uses 1 seat; each agent uses 0.1 seat.

# 计算示例
# 团队 = 5 humans + 20 agents
# seats = 5 * 1.0 + 20 * 0.1 = 5 + 2 = 7 seats
# 月费 = 7 * $8.80 = $61.60/月

# 隐含的产品立场：
# - 鼓励"多 agent"（不按 agent 数量收费）
# - 不鼓励"大量人类席位"（按人头收）
# - 目标客户 = 小团队 + 多 agent 编排`,
      points: [
        '**席位定价是 SaaS 常见模型，但 agent 0.1 席是新发明**——Raft 给 SaaS 行业立了"agent 计价"的先例。',
        '**实际是按"用户活跃度"定价的变体**——agent 0.1 席假设"agent 不算完整用户"，但带来的是"agent 可以被滥用"的可能（一个席位可以挂 100 个 agent）。',
        '**隐含价值主张**：开 20 个 agent 干活的成本 ≈ 多雇 2 个人，agent 是"零头成本"——心理上鼓励"凡事派个 agent"。',
      ],
    },
    {
      title: 'Channels / Threads / Tasks 三层数据模型',
      file: 'docs/concepts/model.md（推断）',
      code: `# Raft 的核心数据模型——三层结构
# 这是它"和 Slack 体感一致"的产品根源

# Channel（频道）
#   - 长期存在的协作空间
#   - 成员：人 + agent 混编
#   - 例：#engineering / #design / #growth

# Thread（线程）
#   - 在 channel 内的某个话题
#   - 可以挂 inline task
#   - 例：thread "draft hero section copy" → task #424

# Task（任务）
#   - 从 thread 派生，或独立创建
#   - assignee 必填（人 或 agent）
#   - 状态：To Do / In Progress / Done
#   - 完成后回到 thread 里"close"

# 关键设计：Thread 即上下文
# - 任务执行 = 在 thread 内进行（agent 在 thread 内回消息）
# - 任务完成 = 在 thread 内 close，task 状态变 Done
# - 没有"独立 task 详情页"——context 永远在 thread 里

# 这和 MiCo 的差别：
# MiCo: task 是实体，comment 是 task 的附属
# Raft: thread 是实体，task 是 thread 的派生物`,
      points: [
        '**Thread 是上下文容器，Task 是其中的一等公民**——这是 Raft 和 Multica/MiCo 的根本范式分歧。',
        '**没有"独立 task 详情页"**——所有沟通留在 thread，task 详情只展示"当前状态/产物链接"。',
        '**优点**：context 不会丢（不切到详情页就断上下文）。',
        '**缺点**：task list 视图失去信息密度，复杂项目（>50 任务）看不清。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: '为什么 Raft 的产品页面就一句话："Where humans and AI agents build together"？',
    answer: '**因为 2026 年所有 agent 平台都在抢"谁是最好的 agent runtime"，只有 Raft 退了半步说："我不抢 runtime，我只做人和 agent 一起办公的工作台"**。它不预制 100 个 agent（不像 Ruflo），不做 Kanban+worktree（不像 Vibe Kanban），只把 Slack 这个"人和人协作"最成熟的形态，原封不动地搬过来，然后把参与者从"人"扩到"人 + agent"。**这是用最成熟的协作模型（IM）装最前沿的协作内容（agent）**。',
    problemDiagnosis: [
      '**所有 agent 平台都在抢 runtime**——Claude Code、Codex、Gemini、Cursor 已经把 runtime 卷到极致，新平台再做 runtime 没有胜算。',
      '**人/agent 协作缺乏成熟范式**——一个群里有人、有 Claude、有 Codex、有 Hermes，谁先说话、谁负责什么、context 怎么留，2026 年还没有标准答案。',
      '**Slack 体感是"开箱就能用"**——IM 是人类最熟的工作形态，搬到 agent 协作上认知成本最低。',
      '**agent 0.1 席位定价 = 商业上"鼓励多 agent"**——这比"按调用次数计费"更稳定，比"按 token 计费"更友好。',
    ],
    designPrinciples: [
      '**人/agent 混编**：左列 avatar 栏里人和 agent 不区分颜色，但 agent 有 lightning-bolt 徽标。',
      '**Channels = 团队空间，Threads = 工作流，Tasks = 派单**——三层模型沿用 Slack 肌肉记忆。',
      '**不抢 runtime**——只做 shell，runtime 留给用户/外部 agent。',
      '**持久身份 + 跨会话记忆**——每个 agent 有 ID、有专长、跨 session 保留记忆。',
      '**外部 agent 友好**：webhook 模式接入你已经跑着的 Claude/Codex/Hermes，5 行命令挂进来。',
      '**"商业化"路径明确**——Free + $8.8/seat，不开源、不私有化、不自托管。',
    ],
    differentiationMatrix: [
      { vs: 'OpenWorker', diff: 'OpenWorker 是"个人向 desktop agent"（本地 + 25+ 集成 + 审批内建）；Raft 是"团队向 IM 工作台"（云端 + Slack 体感 + 外部 agent 接入）。OpenWorker 强在个人生产率，Raft 强在团队协作。' },
      { vs: 'Slack', diff: 'Slack 是"人 ↔ 人 IM + 集成第三方 agent"（agent 是外挂）；Raft 是"人 + agent 混编 IM"（agent 是内建成员，持久身份/记忆/专长）。Slack 改了 1 年 Copilot 才到半步，Raft 第一天就是这个。' },
      { vs: 'Ruflo', diff: 'Ruflo 是"agent 编排平台"（100+ 自营 agent + 32 插件 + 自学习）；Raft 是"agent 协作工作台"（不预制 agent + IM 体感 + 商业 SaaS）。Ruflo 强在能力，Raft 强在协作 UX。' },
      { vs: 'Buzz (Block)', diff: 'Buzz 是 Nostr 协议工作空间（密码学签名事件 + Agent 即成员 + buzz-audit 哈希链 + Apache 2.0）；Raft 是 IM 体感工作台（thread + Slack 体感 + 商业 SaaS）。**两者都让 agent 当正式成员**，但 Buzz 走密码学/去中心化，Raft 走中心化 SaaS。' },
      { vs: 'MiCo', diff: 'MiCo 是企业级（编制/审批/台账/治理 + 私有化）；Raft 是团队级（IM 体感 + 商业 SaaS + 外部 agent 接入）。**MiCo 应学的：thread 即上下文（context 不切走）；Raft 应警示的：SaaS-only + 不开源 = 长期被锁。**' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2025', event: 'Slock 团队组建，启动 Raft 内部原型' },
    { date: '2026-Q1', event: 'Raft Beta 上线，外部 agent 接入协议公开' },
    { date: '2026-Q2', event: 'Raft 1.0 正式发布，定价 Free + $8.8/seat/月' },
    { date: '2026-Q3', event: '推出 Federation（多 Raft 站点互信）' },
    { date: '2026-08-04', event: '本台评测入库' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'Raft 是 2026 年"多 agent 团队协作"赛道里**产品力最强**的对手——它不卷 runtime、不卷编排、不卷自学习，只把 Slack 那个"人和人协作最成熟的形态"原封不动搬过来，然后扩到"人 + agent 一起工作"。它的两个设计特别值得学：① 外部 agent 接入（5 行命令挂进 channel）；② thread 即上下文（context 不切走）。它的限制也很明显：SaaS-only + 不开源 = 长期被锁 + 不可定制。',
    forMico: [
      '**Channel/Thread 形态值得借鉴**：MiCo 当前 task 是实体，comment 是附属。可以考虑在 task 详情页内嵌 thread（agent 在 thread 内回消息），让"任务执行"和"任务沟通"不再切走。',
      '**外部 agent 接入是好范式**：MiCo 应当允许"编制允许外部注册"——客户已经跑着的 Claude/Codex/Hermes 可以挂进 MiCo 当一只外部虾，而不是被迫切到 MiCo 自家 runtime。',
      '**Agent 持久身份 + 跨会话记忆**是 2026 标配：MiCo 虾的"工号 + 职级 + 记忆图谱"是同一范式，比 Raft 的 SQLite 更适合企业。',
      '**SaaS-only 是反面警示**：MiCo 的"私有化 + 本地优先"是 Raft 永远给不了的护城河。MiCo 应在产品页明确写出"self-hostable / on-prem"作为对比 Raft 的核心差异。',
      '**"agent 0.1 席"是商业创新**：MiCo 定价可以学——按"工号/人"计费，agent/虾的额外使用算增量，避免被客户觉得"多养一只虾太贵"。',
    ],
  },
};
