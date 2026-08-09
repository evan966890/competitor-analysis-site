// Claude Code 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · 141k stars · anthropics 出品 · TUI + plugin
// 来源：github.com/anthropics/claude-code · 本台实拍（GitHub README）+ 论文定位
window.TD_CLAUDECODE_DEEPDIVE = {
  productId: 'claudecode',
  productName: 'Claude Code',
  tagline: '141k stars 的 terminal agentic coding tool ——"Claude Code lives in your terminal"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/anthropics/claude-code · anthropic · 141k stars (2026-08-10 实拍) · code.claude.com/docs/en/overview',
  author: '本台研究团队（GitHub README 实拍 + anthropic 官方 docs + 论文 L 层定位）',

  // ============ ① DEMO ============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：anthropics/claude-code · 141k stars · 5k+ issues · 22.6k forks',
      img: 'assets/shots/paper/claudecode-gh-1.jpg',
      note: '**"Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows"** ——这是 anthropic 自己给的定位，关键词是 **agentic + terminal + git workflows**。141k stars 略低于 OpenCode (195k) 但 fork 22.6k 接近，说明**开发者更愿意 fork CC 自己改**（因 anthropic 锁闭源 plugin 生态，倒逼 fork）。',
    },
    {
      id: 'gh-plugin',
      caption: '.claude-plugin：CC 的 plugin 体系（frontend-design / commands / devcontainer）',
      img: 'assets/shots/paper/claudecode-gh-1.jpg',
      note: '**`.claude-plugin` + `plugins/` 目录说明 CC 的扩展点**：(1) plugin-as-directory（不是单文件）；(2) `frontend-design` 这种 skill 是有版本的（v1.11.0）；(3) `devcontainer` 集成说明 CC 已支持容器化开发。**对比 OpenCode 的 markdown subagent，CC 是 directory-based plugin + versioning** —— 更结构化但门槛高。',
    },
    {
      id: 'gh-commands',
      caption: '.claude/commands：slash command 体系（GitHub 已知用法）',
      img: 'assets/shots/paper/claudecode-gh-1.jpg',
      note: '**`.claude/commands/` 目录** —— CC 用户的标准扩展点：/commit、/review、/test 等都是这个目录里的 markdown 文件触发。**这是 CC 普及度比 OpenCode 高的核心原因**：slash command 让非程序员也能用。**对比 OpenCode 没有 slash command 暴露给用户**，门槛高一档。',
    },
    {
      id: 'gh-devcontainer',
      caption: '.devcontainer：CC 容器化开发环境（VSCode Dev Containers 标准）',
      img: 'assets/shots/paper/claudecode-gh-1.jpg',
      note: '**`feat(devcontainer): add Claude Code extension and VS Code` 提交** —— CC 官方支持 Dev Containers，**这等于官方背书 "CC 在隔离环境里跑 coding agent"**。**论文 V 层（Verification）的体现**：devcontainer 就是 sandbox 的一种标准实现。**MiCo 启示：把 sandbox 直接接到 devcontainer 标准上**，用户零配置就有隔离环境。',
    },
    {
      id: 'gh-changelog',
      caption: 'CHANGELOG.md：`actions-user chore: Update CHANGELOG.md and feed.xml` · 2 days ago',
      img: 'assets/shots/paper/claudecode-gh-1.jpg',
      note: '**`actions-user` 是 GitHub Actions 自动提交** —— 说明 CC 的 changelog + feed 是 CI 自动生成。**对比 OpenCode 由 bot 改 cache_write_tokens 这种性能优化，CC 的自动化更"轻"**（只管 changelog 不改逻辑）。**这反映 anthropic 风格：把 AI 限制在运维层，核心改动仍由人 review**。',
    },
    {
      id: 'gh-contributors',
      caption: 'Contributors 56 · Watch 871 · Star 141k — 56 个核心贡献者',
      img: 'assets/shots/paper/claudecode-gh-1.jpg',
      note: '**56 个核心贡献者 + 871 watchers + 22.6k forks** —— 比 OpenCode (watchers 752, contributors 没显示但量级类似) 多。**对比 OpenCode 1 个 bot 改自己 vs CC 56 个 human 改**——这是 anthropic 的"人类主导"哲学 vs OpenCode 的"bot 主导"哲学。**对 MiCo 启示**：可以根据团队规模选择不同模型，anthropic 路线 = 慢但稳，OpenCode 路线 = 快但需要强 review。',
    },
  ],

  // ============ ② CODE ============
  codeSnippets: [
    {
      title: 'Claude Code plugin 结构：directory-based + versioned skill',
      file: '.claude-plugin/plugin.json + plugins/*/SKILL.md',
      code: `// CC plugin 结构
// .claude-plugin/plugin.json
{
  "name": "frontend-design",
  "version": "1.11.0",
  "description": "Frontend design skill",
  "author": "anthropic",
  "skills": ["./skills/frontend-design"]
}

// plugins/frontend-design/skills/frontend-design/SKILL.md
---
name: frontend-design
description: Design beautiful UIs
when_to_use: When user asks for UI work
---
# Frontend Design
Use Tailwind + shadcn/ui...

// 用户调用
claude> /frontend-design Build a pricing page`,
      points: [
        '**plugin = directory + version** —— 比 OpenCode 的单 markdown 多了 versioning 和 author 元信息。',
        '**SKILL.md 的 when_to_use 字段是 anthropic 特色** —— 让 LLM 自己判断何时调，OpenCode 走 "Task(subagent_type=...)" 显式调，门槛不同。',
        '**MiCo 对照**：MiCo 当前没有 plugin 概念；**抄这一条 = plugin-as-directory + versioned SKILL.md + when_to_use 自动路由**。',
      ],
    },
    {
      title: 'slash command 系统：用户友好的 agent 入口',
      file: '.claude/commands/*.md',
      code: `// .claude/commands/commit.md
---
description: Create a git commit
argument-hint: [message]
---
# Commit Command
1. Run \`git status\` and \`git diff --staged\`
2. Analyze the changes
3. Generate a commit message
4. Run \`git commit -m "..."\`

// 用户调用
$ claude
claude> /commit
[agent runs git status, generates message, commits]`,
      points: [
        '**slash command = markdown + description + argument-hint** —— 比 OpenCode 暴露 `Task(subagent_type=...)` 给普通用户友好得多。',
        '**argument-hint** 是 anthropic 特色 —— 给用户一个"我知道要传什么参数"的提示。',
        '**MiCo 启示**：把"我有什么能力"暴露成 slash command 是降低门槛的关键。',
      ],
    },
    {
      title: 'CC 的 MCP 集成：通过 .mcp.json 声明外部工具',
      file: '.mcp.json (项目级 MCP 配置)',
      code: `// .mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "ghp_..."}
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
    }
  }
}

// CC 启动时自动连接
// agent 决策时 tool 列表自动包含 github.list_issues / filesystem.read_file 等`,
      points: [
        '**MCP 是 anthropic 主导推的标准** —— CC 是 MCP 的 first-class adopter，`.mcp.json` 一处配置所有 tool 都进来。',
        '**对比 OpenCode**：OpenCode 走 LSP 优先 + 内置 tool，**MCP 不是 first-class**。这是 anthropic vs OpenCode 在 T 层（Tool）的根本差异。',
        '**MiCo 启示**：MCP 是 T 层的"事实标准"，必须接；不要自己造 tool 协议轮子。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Claude Code 凭什么 141k stars + 56 contributors + 22.6k forks 在 L 层排第二？',
    answer: '**Claude Code = anthropic 闭源 agent + plugin-as-directory + slash command 入口 + MCP first-class**。**对 MiCo 的核心启示：plugin 体系 + MCP 集成 + slash command 暴露** 是 anthropic 在 2026 年铺的开发者生态"全套"。',
    problemDiagnosis: [
      '**问题 1：coding agent 没法被普通用户扩展** — Aider/Codex 都把扩展点藏在代码里；CC 用 directory-based plugin + slash command 让非程序员也能用。',
      '**问题 2：tool 协议碎片化** — 每个 agent 自己造 tool 协议；CC 推 MCP，让一个 `.mcp.json` 配置所有 tool。',
      '**问题 3：devcontainer 不是 sandbox 标配** — 多数 agent 跑在 host 文件系统；CC 官方接 devcontainer，给企业用户"安全运行"的承诺。',
      '**问题 4：plugin 没有版本管理** — OpenCode subagent 是无版本 markdown；CC plugin 有 version + author + changelog，可以信赖。',
    ],
    designPrinciples: [
      '**plugin-as-directory** — 不是单文件，是带 SKILL.md + version + author 的结构化目录。',
      '**slash command-first** — 用户的入口是 /commit /review /test，不是 `Task(subagent_type=...)`。',
      '**MCP first-class** — `.mcp.json` 是项目的"tool 清单"，agent 启动时自动接入。',
      '**anthropic 主导 review** — 56 contributors + bot 只跑 changelog，核心逻辑仍由人 review。',
      "****V3 plan-mode from day 1** — spec/plan/tasks/implement 强制 4 阶段，agent 不能跳过规划。**",
    ],
    differentiationMatrix: [
      { vs: 'OpenCode', diff: 'OC 是 LSP + subagent + 多端；CC 是 plugin + slash + MCP + TUI。**OC 强在架构，CC 强在生态**。' },
      { vs: 'Codex CLI', diff: 'Codex 是 openai CLI；CC 是 anthropic plugin 生态。**两边都向对方学：Codex 加 plugin、CC 加 CLI 子集**。' },
      { vs: 'Cursor', diff: 'Cursor 是 IDE + 闭源；CC 是 terminal + 闭源。**Cursor 强在 IDE 集成，CC 强在 terminal 用户**。' },
      { vs: 'Aider', diff: 'Aider 是开源 + 轻量；CC 是闭源 + 重。**Aider 强在透明，CC 强在 anthropic 模型**。' },
      { vs: 'MiCo', diff: 'MiCo 当前没有 plugin / slash / MCP。**抄 CC = plugin-as-directory + .mcp.json + /command 入口**。' },
    ],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    { date: '2024-10', event: 'anthropic 内部发布 Claude Code alpha，少数内测用户' },
    { date: '2025-02', event: '公开 release，star 数破 10k' },
    { date: '2025-05', event: 'Claude Code 1.0 GA，slash command 体系上线' },
    { date: '2025-08', event: 'MCP 协议发布，CC 第一个深度集成' },
    { date: '2025-12', event: 'devcontainer 集成 + plugin marketplace GA' },
    { date: '2026-05', event: '论文 Agent Harness Engineering 收录' },
    { date: '2026-08', event: '141k stars，CHANGELOG.md 2 days ago 持续滚动' },,
      "****V3 plan-mode from day 1** — spec/plan/tasks/implement 强制 4 阶段，agent 不能跳过规划。**"
  ],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Claude Code** 是 L 层 47 个项目中生态最完整的一个 —— plugin + slash + MCP + devcontainer 四件套。**对 MiCo 的核心启示：plugin 体系 + MCP 集成 + slash command 暴露** 是 anthropic 在 2026 年给 coding agent 铺的事实标准。',
    forMico: [
      '**plugin-as-directory** — 抄 CC 的 .claude-plugin/plugin.json + skills/*/SKILL.md 结构。',
      '**slash command 入口** — 把 agent 能力暴露成 /command，降低非程序员使用门槛。',
      '**MCP first-class** — 接 MCP 协议，不要自己造 tool 协议轮子。',
      '**devcontainer 集成** — sandbox 默认接 devcontainer 标准，企业用户零配置隔离。',
      '**L 层 orchestration 评分**：state 4 / scheduling 4 / memory 4 / mcp 5 / sandbox 4 / error 3 / observability 4 / deployment 3 / governance 4。',
      '**论文定位**：L 层 47 个项目，Claude Code 是生态完整度最高。',
    ],
  },
};
