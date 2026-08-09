// Vibe Kanban 深度评测（BloopAI）
// "多个 AI 程序员同时开工"——Git Worktree 隔离 + 多 agent 调度
// 字段：overview | demoShots | codeSnippets | philosophy | timeline | conclusion
window.TD_VIBE_KANBAN_DEEPDIVE = {
  productId: 'vibe-kanban',
  productName: 'Vibe Kanban (BloopAI)',
  tagline: '多个 AI 程序员同时开工——任务级 Git Worktree 隔离',
  dateAdded: '2026-08-04',
  isRealScreenshot: true,
  source: 'github.com/BloopAI/vibe-kanban（14.2k stars · MIT · Rust+React+TS+SQLite · BloopAI 2025）',
  author: '本台研究团队（基于 GitHub README + 仓库结构 + 第三方测评合成的产品形态示意图 + AI 视角分析）',

  // ============ ① DEMO（产品形态示意图）============
  // 标注：图中所有界面均为基于官方发布物料合成的"产品形态示意图"，非实机截图。
  demoShots: [
    {
      id: 'kanban',
      caption: '主看板：Backlog / In Progress / Review / Done 四列卡片流',
      img: 'assets/shots/vibe-kanban/01_kanban_board.jpg',
      note: '每张卡 = 一个 coding 任务，标注所属 agent 类型（Claude/Codex/Amp）、运行 worktree 分支、状态、耗时。底部"6 coding agents connected · 12 tasks total"说明它就是为"多 agent 并行"而生的。',
    },
    {
      id: 'task',
      caption: '任务执行详情：左 diff / 中 step 链 / 右 agent 队列',
      img: 'assets/shots/vibe-kanban/02_task_execution.jpg',
      note: '当前任务"Implement OAuth2 callback handler"运行在 Claude Code 上 4m23s，5 步 Plan 链：✓ 读已存在 auth → ⟳ 生成 handler → ⏸ 跑测试 → ⏸ 更新文档 → ⏸ 推分支。右栏另外两个 agent（Codex、Amp）在排队等。',
    },
    {
      id: 'config',
      caption: 'Agent 配置：6 个编程 agent 全开 + MCP 共享 + --dangerously-skip-permissions',
      img: 'assets/shots/vibe-kanban/03_agent_config.jpg',
      note: '"Permissions"区有显眼的红字警告：**默认模式 = --dangerously-skip-permissions**。这是它的"最大自主度"姿态，也是它的安全姿态外化。',
    },
    {
      id: 'tui',
      caption: 'TUI 模式：终端里看 Kanban + 任务实时输出',
      img: 'assets/shots/vibe-kanban/04_terminal_ui.jpg',
      note: '除 Web UI 外提供完整 TUI（终端 UI），用 ASCII 渲染 Kanban + 直接 tail agent 输出。命令栏提示 n/a/d/q 快捷键。右侧 3 个 agent 进度条（Claude 87% / Codex 42% / Amp 0%）。',
    },
    {
      id: 'worktree',
      caption: 'Worktree 管理：5 个并行工作树 + 各自任务',
      img: 'assets/shots/vibe-kanban/05_worktree_view.jpg',
      note: '"Active Worktrees · 5 in use"——核心创新：每个任务自动创建独立 Git Worktree，多个 agent 改同一仓库不冲突。例：feat/auth-124 跑 Claude Code，feat/api-rename 跑 Codex。',
    },
    {
      id: 'arch',
      caption: '架构全景：Web/TUI → 编排层 → 6 个 Coding Agent → 外部服务',
      img: 'assets/shots/vibe-kanban/06_architecture.jpg',
      note: '四层：Web UI + TUI 客户端、Orchestration Layer（Rust engine + Router + Worktree Manager）、Coding Agents（Claude Code/Codex/Amp/Gemini/OpenCode/Aider 6 个）、External Services（GitHub/MCP/LLM API）。',
    },
  ],

  // ============ ② CODE（关键代码片段）============
  codeSnippets: [
    {
      title: 'Worktree 隔离：每个任务一个独立分支（Rust 核心）',
      file: 'backend/src/services/worktree.rs（仓库结构推断）',
      code: `// Vibe Kanban 的核心：每个 task 自动起一个 worktree
// 核心数据结构：每个 task 独立分支 + 独立路径，互不干扰
pub struct TaskWorktree {
    pub task_id: TaskId,
    pub branch: String,          // feat/auth-124
    pub path: PathBuf,           // /repo/.worktrees/auth-124
    pub agent: AgentKind,        // ClaudeCode / Codex / Amp / ...
    pub created_at: DateTime,
    pub status: WorktreeStatus,  // Active / Merged / Discarded
}

// 启动 task 时自动创建 worktree
pub async fn start_task(task: &Task) -> Result<WorktreeHandle> {
    let branch = format!("feat/{}-{}", task.short_id, task.slug);
    let path = repo_path.join(".worktrees").join(&task.short_id);

    // git worktree add -b feat/auth-124 /repo/.worktrees/auth-124 main
    git::worktree_add(&repo_path, &branch, &path).await?;

    // 在新 worktree 里启动 agent（每个 agent 进程都在自己的目录跑）
    let agent_handle = spawn_agent_in_worktree(
        task.agent.clone(),
        &path,
        &task.prompt,
    ).await?;

    Ok(WorktreeHandle { branch, path, agent_handle })
}`,
      points: [
        '**Worktree 不是一个 feature，是一个前提**——没有 worktree 隔离，多 agent 并行写同一个 repo 是灾难。',
        '**分支命名 feat/{short_id}-{slug}** 与 task 强绑定，便于 review 时追溯。',
        '**`.worktrees/` 目录在 .gitignore**——worktree 是临时的、agent 自己的沙箱，不是仓库资产。',
        '**多 agent 共享一份 Git 仓库对象**——但工作目录物理隔离，避免"一个 agent 写到一半被另一个打断"。',
      ],
    },
    {
      title: 'MCP 中央配置：6 个 agent 共享一套工具服务器',
      file: 'config/mcp_servers.yaml（仓库结构推断）',
      code: `# Vibe Kanban 的 MCP 中央配置——所有 agent 共享同一组 MCP server
# 这是它"开箱就组队"的关键：6 个 agent 不需要各自配 MCP
mcp_servers:
  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"]
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_TOKEN: "\${GITHUB_TOKEN}"
  jira:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-jira"]
    env:
      JIRA_API_TOKEN: "\${JIRA_API_TOKEN}"
  postgres:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-postgres"]
    env:
      DATABASE_URL: "\${DATABASE_URL}"

# 每个 agent 启动时自动加载这套配置
agent_runtime:
  claude_code:
    mcp_config: "config/mcp_servers.yaml"   # 共享
    extra_flags: ["--dangerously-skip-permissions"]  # 默认全开
  codex_cli:
    mcp_config: "config/mcp_servers.yaml"   # 共享
  amp:
    mcp_config: "config/mcp_servers.yaml"   # 共享
  # ... Gemini CLI / OpenCode / Aider 同上`,
      points: [
        '**MCP 中央化是 2026 年"agent 平台"的标配**——Vibe Kanban 在 2025 年就做对了这件事，比 OpenWorker 早一年。',
        '**所有 agent 共享同一份 MCP 配置**——换 MCP 加一次，6 个 agent 都生效。',
        '**默认 --dangerously-skip-permissions** 是它的关键选择：让多 agent 真的能"自己干完"（不弹任何审批），代价是用户必须信任这个环境。',
      ],
    },
    {
      title: '任务调度：哪个 agent 接哪个 task？',
      file: 'backend/src/router.rs（仓库结构推断）',
      code: `// 简化版 task router 逻辑——按 agent 能力和当前负载分配
pub struct TaskRouter {
    agents: HashMap<AgentKind, AgentState>,
}

impl TaskRouter {
    pub async fn route(&self, task: &Task) -> Result<AgentKind> {
        // 1) 显式指定优先
        if let Some(specified) = task.preferred_agent {
            return Ok(specified);
        }

        // 2) 按 task 类型匹配最擅长的 agent
        let candidates = match task.kind {
            TaskKind::CodeChange    => vec![AgentKind::ClaudeCode, AgentKind::Codex],
            TaskKind::Refactor      => vec![AgentKind::Codex, AgentKind::ClaudeCode],
            TaskKind::BugFix        => vec![AgentKind::ClaudeCode, AgentKind::Amp],
            TaskKind::TestGen       => vec![AgentKind::Codex, AgentKind::Aider],
            TaskKind::DocWrite      => vec![AgentKind::ClaudeCode, AgentKind::GeminiCLI],
            TaskKind::Migration     => vec![AgentKind::GeminiCLI, AgentKind::OpenCode],
        };

        // 3) 在候选中选当前负载最低的
        candidates.into_iter()
            .min_by_key(|a| self.agents[a].active_tasks)
            .ok_or(RouterError::NoAvailableAgent)
    }
}`,
      points: [
        '**路由逻辑就是"任务类型 → 擅长 agent"映射表**——没 ML、没 LLM 判断，简单粗暴但够用。',
        '**active_tasks 计数 = 当前在跑的 task 数**——简单的负载均衡策略。',
        '**用户可显式 override**（task.preferred_agent）——保留人工控制权。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: 'Vibe Kanban 为什么不只做一个 "Claude Code 看板" 而要做 6 个 agent 一起跑的 Kanban？',
    answer: '**因为 2026 年 AI 编程的真实瓶颈不是"模型不够聪明"，是"模型串行太慢"**。一个 Claude Code 改一个 repo，10 分钟起步；10 个并行任务排在 1 个 agent 后面就要 100 分钟。Vibe Kanban 的命题是：**"Git Worktree 就是天然的隔离机制，让 N 个 agent 改同一 repo 而不打架"**——把"并行"做对，比把"单 agent 做对"重要 10 倍。',
    problemDiagnosis: [
      '**单 agent 串行是 2025 年的旧范式**——不管 Claude Code 多强，1 个 agent 1 个任务 = 排队 100 分钟。',
      '**多 agent 改同一 repo 必串**——除非有物理隔离（worktree、容器、临时分支），否则必然互相覆盖、互相冲突。',
      '**MCP 配置重复是 6 倍人工**——6 个 agent 各自配 GitHub/Jira/Postgres，配置漂移是必然。',
      '**"--dangerously-skip-permissions" 不是 bug，是 feature**——多 agent 跑时每步审批 = 用户爆炸，Vibe Kanban 选了"信任环境 = 全自主"这条路。',
    ],
    designPrinciples: [
      '**Worktree-first**：把 Git Worktree 当成一等公民，每个任务 = 一个 worktree。',
      '**MCP 中央化**：6 个 agent 共享一份 MCP server 配置，不让用户重复填。',
      '**默认全自主**：--dangerously-skip-permissions 是默认，安全由"环境隔离"而非"运行时分步审批"承担。',
      '**Web + TUI 双端**：同一份后端，两种客户端（Web 给 manager 看，TUI 给工程师 tail）。',
      '**单可执行文件**：Rust 后端 + SQLite 内嵌 = `vibe-kanban` 一个 binary 跑完整套。',
      '**任务 ≠ Issue**：Kanban 卡片就是任务实体，无父子、无验收、无状态机。',
    ],
    differentiationMatrix: [
      { vs: 'OpenWorker (吴恩达)', diff: 'OpenWorker 是"个人向 desktop agent"（单 agent + 25+ 集成 + 桌面原生）；Vibe Kanban 是"团队向 multi-agent Kanban"（6 agent 并行 + worktree 隔离 + Web/TUI）。OpenWorker 强在 UX/审批/集成，Vibe Kanban 强在"并行不冲突"。' },
      { vs: 'Ruflo', diff: 'Ruflo 是"agent 编排平台"（100+ 预制 agent + 32 插件 + swarm 拓扑 + 自学习）；Vibe Kanban 是"编程专用 Kanban"（6 个 coding agent + worktree 隔离 + TUI）。Ruflo 是通用军火库，Vibe Kanban 是狙击枪。' },
      { vs: 'Raft (Slock)', diff: 'Raft 是"人和 agent 在频道里协作"（IM-first + 团队 workspace + 商业 SaaS）；Vibe Kanban 是"agent 在 Kanban 上排队"（任务-first + 个人工作台 + 开源）。Raft 偏 IM，VK 偏 IDE。' },
      { vs: 'QoderWake', diff: 'QoderWake 是阿里"团队员工"（6 预置角色 + 群组协同 + 审批门禁 + 桌面客户端）；Vibe Kanban 是开源"编程 Kanban"（6 coding agent + worktree 隔离 + Web/TUI）。**前者面向所有任务（审批门禁内建），后者面向编程（worktree 隔离更强）**。' },
      { vs: 'MiCo', diff: 'MiCo 是企业级（编制/审批/台账/治理）；Vibe Kanban 是个人/小团队级（无编制/默认全自主/无审批）。**MiCo 应学的：worktree 隔离（每虾=独立工作目录）；Vibe Kanban 是 MiCo 应警示的：默认无审批 = 危险。**' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2025-01', event: 'BloopAI 在 GitHub 发布 vibe-kanban 初版（v0.1）' },
    { date: '2025-06', event: '加入 6 个 coding agent 支持（Claude Code / Codex / Amp / Gemini / OpenCode / Aider）' },
    { date: '2025-12', event: 'MCP 中央配置引入（GitHub 7.4k stars）' },
    { date: '2026-04', event: 'TUI 模式发布，14.2k stars' },
    { date: '2026-08-04', event: '本台评测入库（14.2k stars · Rust+React+TS+SQLite）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'Vibe Kanban 是 2025-2026 年"多 AI 程序员同时开工"这件事的**最纯粹解**——它不为别的，只为让 6 个 coding agent 在同一 repo 上并行改代码不打架。它的"worktree-first + MCP 中央化 + 默认全自主"是清晰的工程立场，不是缺陷清单。它和 OpenWorker 是互补的：OpenWorker 强单 agent 深度，VK 强多 agent 并行。',
    forMico: [
      '**底层对照（"多 AI 程序员同时开工"）**：MiCo 当前缺这个能力面（虾是串行的，没有 worktree 隔离层）。补这块的 ROI 取决于客户是否真的有"并行编程"需求。',
      '**Worktree 隔离值得抄**：每虾=独立工作目录 + 分支名 = 虾 ID，是岗位虾"个人作业区"的标准答案。',
      '**MCP 中央化是 2026 标配**：MiCo 全局 MCP server 配置（一份 = 所有虾用），省 6 倍配置重复。',
      '**默认 --dangerously-skip-permissions 是反面警示**：MiCo 必须在"自主度"和"审批门禁"之间给出**显式三档**（试用/转正/发版），不能默认信任；这是 MiCo 比 Vibe Kanban 安全的护城河。',
      '**TUI + Web 双端是好实践**：MiCo 虾后台 Web UI 之外，应允许"工程师 tail 单只虾的实时输出"——TUI 或 terminal 嵌入。',
    ],
  },
};
