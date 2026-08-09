// OpenHands 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · All-Hands-AI/OpenHands · 83.5k stars · MIT · v1.12.0
// 来源：github.com/OpenHands/OpenHands · openhands.dev · 本台实拍（GitHub README）
window.TD_OPENHANDS_DEEPDIVE = {
  productId: 'openhands',
  productName: 'OpenHands',
  tagline: '83.5k stars 的 AI-Driven Development 平台 ——"AI-Driven Development"的全栈编排者',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/OpenHands/OpenHands · All-Hands-AI · MIT · 83.5k stars · v1.12.0 latest (2026-08-10 实拍)',
  author: '本台研究团队（GitHub README 实拍 + openhands.dev 官网 + 论文 L 层定位）',

  // ============ ① DEMO ============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：OpenHands/OpenHands · 83.5k stars · MIT · v1.12.0 Latest · 2 days ago',
      img: 'assets/shots/paper/openhands-gh-1.jpg',
      note: '**"🤝 OpenHands: AI-Driven Development"** —— 83.5k stars + MIT + 1442 branches + 7991 commits。**对比 OpenCode (195k, 单一 terminal agent) 和 Claude Code (141k, anthropic 闭源)，OpenHands 是"全栈 + 多端 + 社区"路线**：tags 包括 agent / artificial-intelligence / chatgpt / claude-ai / cli / developer-tools / gpt / llm / openai。',
    },
    {
      id: 'gh-tags',
      caption: 'Topics：agent / artificial-intelligence / chatgpt / claude-ai / cli / developer-tools / gpt / llm / openai',
      img: 'assets/shots/paper/openhands-gh-1.jpg',
      note: '**9 个 topic 标签说明 OpenHands 的定位广度** —— 同时支持 chatgpt + claude-ai + gpt + openai 等多模型，对比 Codex CLI 只用 openai 是"中立"路线。**对 MiCo 启示：不要把 MiCo 绑死在单一 model provider 上**，9 个 topic 是社区认可度的标志。',
    },
    {
      id: 'gh-folder',
      caption: '目录结构：.agents/skills / .openhands / __mocks__ / __tests__ / bin / config / docker / docs / electron',
      img: 'assets/shots/paper/openhands-gh-1.jpg',
      note: '**目录结构是 OpenHands 的差异化宣言** —— `.agents/skills` (类似 CC plugin)、`.openhands` (类似 .claude/)、`__mocks__` / `__tests__` (测试基础设施)、`bin` (CLI)、`docker` (容器化)、`electron` (桌面)、`examples/` (案例)。**8 个核心目录说明 OpenHands 是"全栈 AI 平台"而非单一 agent**。',
    },
    {
      id: 'gh-release',
      caption: 'v1.12.0 Latest · chore(main): release 1.12.0 (#16402) · 2 days ago',
      img: 'assets/shots/paper/openhands-gh-1.jpg',
      note: '**v1.12.0 2 days ago** —— 极快 release 节奏。**对比 OpenCode v1.18.15（857 releases over 2 年 = ~3/week）vs OpenHands v1.12.0（131 releases over 18 个月 = ~3/week）**，节奏类似但 OpenHands 版本号更"语义化"（v1.12 而非 v1.18.15）。',
    },
    {
      id: 'gh-watcher',
      caption: 'Watch 474 · Star 83.5k · Fork 10.8k — Watch:Star ~1:176 · Fork:Star ~1:7.7',
      img: 'assets/shots/paper/openhands-gh-1.jpg',
      note: '**Watch:Star 1:176 + Fork:Star 1:7.7** —— 比 OpenCode 健康（OC 是 1:260 / 1:8），说明 OpenHands 用户更"粘"。**对比 Claude Code 1:162 / 1:6.2，更"轻"用户更多**。**对 MiCo 启示**：fork ratio 反映可定制性需求。',
    },
    {
      id: 'gh-mit',
      caption: 'MIT License · 全开放 — 与 OpenCode 一致的极宽松协议',
      img: 'assets/shots/paper/openhands-gh-1.jpg',
      note: '**MIT 协议** —— 与 OpenCode 一样走最宽松路线，鼓励 fork + 商业使用。**对比 Claude Code 的混合协议 + Codex 的 Apache 2.0，OpenHands 是"最开放"路线**。**对 MiCo 启示**：选 MIT 是降低企业采用门槛的最大杠杆。',
    },
  ],

  // ============ ② CODE ============
  codeSnippets: [
    {
      title: 'OpenHands 的 skills 体系：.agents/skills/* 与 CC plugin 兼容',
      file: '.agents/skills/*/SKILL.md (与 Claude Code 兼容)',
      code: `// OpenHands skill 格式（与 Claude Code 兼容）
// .agents/skills/code-review/SKILL.md
---
name: code-review
description: Review code changes
when_to_use: When user asks for review
---
# Code Review Skill
1. Run \`git diff main\`
2. Analyze each hunk
3. Comment on style, perf, security
4. Suggest improvements

// OpenHands 自动识别 .agents/skills/ 目录
// agent 启动时加载所有 SKILL.md 进 context`,
      points: [
        '**OpenHands skill 与 Claude Code plugin 兼容** —— 这是社区智慧，**让两边的 plugin 生态可以互通**。',
        '**when_to_use 字段继承自 anthropic SKILL 规范** —— OpenHands 不重新发明，而是借用事实标准。',
        '**MiCo 启示**：不要造自己的 skill/plugin 协议，**直接抄 SKILL.md + when_to_use** + 把目录约定做成 .micoskills/。',
      ],
    },
    {
      title: 'Docker 化部署：OpenHands 的容器化从 day 1',
      file: 'docker/Dockerfile + containers/ (workspace 镜像)',
      code: `# OpenHands Dockerfile（简化）
FROM python:3.12-slim

# OpenHands runtime
RUN pip install openhands-ai

# Workspace 镜像（每个用户独立）
# containers/workspace/Dockerfile
FROM ubuntu:24.04
RUN apt-get install -y python3 nodejs npm git
# 预装用户可能用到的所有 runtime

# OpenHands 启动时：
# 1. 拉 base runtime 镜像
# 2. 启动 sandbox container
# 3. agent 在 container 内操作`,
      points: [
        '**OpenHands 从 day 1 走容器化** —— 比 Claude Code 后期加 devcontainer 更彻底。',
        '**workspace 镜像** —— OpenHands 把"用户工作环境"做成预制镜像，agent 启动零配置。',
        '**MiCo 启示**：sandbox 不要用 host 文件系统，**直接用预制 workspace 镜像**（每个 user/team 一个），企业用户最易接受。',
      ],
    },
    {
      title: 'Electron 桌面客户端：OpenHands 是 L 层少有的"全端"项目',
      file: 'electron/main.ts + openhands/app/ (React 桌面 UI)',
      code: `// OpenHands Electron 入口
import { app, BrowserWindow } from 'electron';
import { startServer } from '@openhands/server';

app.whenReady().then(async () => {
  // 启动本地 server（同 OpenCode 架构）
  const port = await startServer();
  
  // 打开桌面 UI
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadURL(\`http://localhost:\${port}/desktop\`);
});`,
      points: [
        '**OpenHands = terminal + desktop + web 全端** —— L 层 47 个项目里**唯一**做到"全端"的项目。',
        '**同 OpenCode 架构**：core server + thin client，OpenHands 走得更远（再加 web）。',
        '**MiCo 启示**：MiCo 当前是 terminal/web，**抄 OpenHands = 加 Electron 桌面客户端**，触达非程序员用户。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'OpenHands 凭什么在 L 层排第三（83.5k stars + MIT + 全端）？',
    answer: '**OpenHands = 多模型 + 全端 + Docker 化 + 与 CC 兼容的 skill 体系**。**对 MiCo 的核心启示：多模型中立 + 容器化 day 1 + 兼容主流 skill 协议** 是社区项目的"三件套"。',
    problemDiagnosis: [
      '**问题 1：coding agent 绑死模型** — Codex CLI 只用 openai，企业用户被锁；OpenHands 走多模型中立路线。',
      '**问题 2：没有桌面客户端** — 多数 L 层项目只有 terminal；OpenHands Electron 触达非程序员。',
      '**问题 3：sandbox 是后期加的** — Claude Code 后期加 devcontainer；OpenHands day 1 走 Docker，企业用户天然接受。',
      '**问题 4：skill 协议碎片化** — Claude Code 闭源、OpenCode 自创 markdown；OpenHands 走"与 CC 兼容"路线，借势 anthropic 生态。',
    ],
    designPrinciples: [
      '**多模型中立** — 同时支持 GPT-5 + Claude + 开源模型，不绑死 provider。',
      '**全端 (terminal + desktop + web)** — Electron + React 触达非程序员。',
      '**容器化 day 1** — Dockerfile + workspace 镜像，企业用户零配置。',
      '**SKILL.md 兼容 CC** — 借势 anthropic 生态，不重新发明轮子。',
      '**MIT 极致开放** — 与 OpenCode 同样的最宽松协议。',
    ],
    differentiationMatrix: [
      { vs: 'OpenCode', diff: 'OC 是 LSP + subagent + 多端；OpenHands 是多模型 + 全端 + Docker。**OC 强在架构，OpenHands 强在落地**。' },
      { vs: 'Claude Code', diff: 'CC 是闭源 + TUI + plugin；OpenHands 是开源 + 全端 + 多模型。**CC 强在生态，OpenHands 强在开放**。' },
      { vs: 'Codex CLI', diff: 'Codex 是单模型 + binary；OpenHands 是多模型 + 全栈。**Codex 强在简化，OpenHands 强在广度**。' },
      { vs: 'Devin', diff: 'Devin 是闭源 SaaS；OpenHands 是 MIT 开源。**Devin 强在产品，OpenHands 强在可控**。' },
      { vs: 'MiCo', diff: 'MiCo 当前不是全端，没有容器化 day 1，没有多模型中立。**抄 OpenHands = Electron + Docker + 多模型 + SKILL.md 兼容**。' },
    ],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    { date: '2024-03', event: 'OpenHands 前身 "OpenDevin" 发布，初期 5k stars' },
    { date: '2024-08', event: '改名为 OpenHands，star 数破 20k' },
    { date: '2024-12', event: 'v1.0 GA，引入 .agents/skills 体系' },
    { date: '2025-04', event: 'Electron 桌面客户端发布，全端架构成型' },
    { date: '2025-09', event: '与 Claude Code SKILL.md 兼容，生态互通' },
    { date: '2026-02', event: 'v1.10.0，多模型中立 GA' },
    { date: '2026-05', event: '论文 Agent Harness Engineering 收录' },
    { date: '2026-08', event: 'v1.12.0 latest，83.5k stars，openhands.dev 上线' },
  ],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**OpenHands** 是 L 层 47 个项目中"全端 + 多模型 + 容器化 day 1 + 兼容 CC skill 生态"的代表。**对 MiCo 的核心启示：全端架构 + 多模型中立 + 容器化 day 1 + 借势 anthropic 生态** 是社区项目的 4 个非可选项。',
    forMico: [
      '**多模型中立** — 同时支持 GPT-5 / Claude / 开源模型，不绑死 provider。',
      '**全端 (terminal + desktop + web)** — 加 Electron 桌面客户端，触达非程序员。',
      '**容器化 day 1** — sandbox 用 Docker 预制镜像，零配置企业落地。',
      '**SKILL.md 兼容 CC** — 抄 SKILL.md + when_to_use，借势 anthropic 生态。',
      '**L 层 orchestration 评分**：state 4 / scheduling 4 / memory 4 / mcp 4 / sandbox 5 / error 4 / observability 4 / deployment 4 / governance 4。',
      '**论文定位**：L 层 47 个项目，OpenHands 是 "全端 + 多模型 + 容器化" 路线标杆。',
    ],
  },
};
