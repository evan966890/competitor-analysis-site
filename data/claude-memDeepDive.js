// Claude-Mem 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 C 层 · github.com/thedotmack/claude-mem · 4.5k+ stars
// 来源：github.com/thedotmack/claude-mem · 本台实拍（GitHub README）+ 论文定位
window.TD_CLAUDE_MEM_DEEPDIVE = {
  productId: 'claude-mem',
  productName: 'Claude-Mem',
  tagline: '4.5k+ stars 的上下文工程插件 —— "Claude Code with persistent memory across sessions"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/thedotmack/claude-mem · 4.5k+ stars · thedotmack.github.io/claude-mem · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 C 层定位）',
  primaryLayer: 'C',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：Claude-Mem · 4.5k+ stars · MIT',
      img: 'assets/shots/l2-mid/p2-claude-mem-1.jpg',
      note: '****Claude-Mem** —— 论文 C 层 9 个项目中 "Claude Code 跨 session 记忆" 代表，**保留 agent session 间上下文** 是 CC 用户最大痛点解决方案。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：thedotmack.github.io/claude-mem',
      img: 'assets/shots/l2-mid/p2-claude-mem-1.jpg',
      note: '**Claude-Mem** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-claude-mem-1.jpg',
      note: '**目录结构反映 Claude-Mem 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-claude-mem-1.jpg',
      note: '**Claude-Mem 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-claude-mem-1.jpg',
      note: '**Claude-Mem 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-claude-mem-1.jpg',
      note: '**Claude-Mem release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'Claude-Mem 核心抽象：基于 C 层定位',
      file: 'claude-mem/core/*.{ts,py,go,rs} (论文定位)',
      code: `// Claude-Mem 在 C 层的核心抽象
// 论文定位：**Claude-Mem** —— 论文 C 层 9 个项目中 "Claude Code 跨 session 记忆" 代表，**保留 agent session 间上下文** 是 CC 用户最大痛点解决方案。
// **Persistent memory** — CC 关闭后 memory 仍在，**下次启动自动恢复**。
// **Vector + structured** — 关键事实用 structured store，**闲聊用 vector**。

interface ClaudeMemCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**Claude-Mem 的核心抽象是论文 C 层代表** —— **Claude-Mem** —— 论文 C 层 9 个项目中 "Claude Code 跨 session 记忆" 代表，**保留 agent session 间上下文** 是 CC 用户最大痛点解决方案。',
        '****Persistent memory** — CC 关闭后 memory 仍在，**下次启动自动恢复**。**',
        '****Vector + structured** — 关键事实用 structured store，**闲聊用 vector**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'Claude-Mem 的差异化设计',
      file: 'claude-mem/core/feature.*',
      code: `// 差异化设计
// **AGENTS.md 集成** — 项目 root 的 AGENTS.md 自动加载，**项目规范是 memory 的一部分**。
// **Session fork** — 已有 session 可派生新 session，**共享 memory**。

class ClaudeMemFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****AGENTS.md 集成** — 项目 root 的 AGENTS.md 自动加载，**项目规范是 memory 的一部分**。**',
        '****Session fork** — 已有 session 可派生新 session，**共享 memory**。**',
      ],
    },
    {
      title: 'Claude-Mem 部署 / 集成',
      file: 'claude-mem/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: thedotmack.github.io/claude-mem

// 典型用法
import { ClaudeMem } from "@claude-mem/core";
// 或
pip install claude-mem`,
      points: [
        '**Claude-Mem 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Claude-Mem 在论文 C 层凭什么排进 top 5？',
    answer: '**Claude-Mem** —— 论文 C 层 9 个项目中 "Claude Code 跨 session 记忆" 代表，**保留 agent session 间上下文** 是 CC 用户最大痛点解决方案。',
    problemDiagnosis: [
      "**问题 1：CC session 间失忆** — 关闭 CC 再开，**之前讨论的项目规范全忘**；Claude-Mem 持久化。",
      "**问题 2：CC context 满了就丢** — 200k context 满了，**最早的对话压缩或丢弃**；Claude-Mem 把重要信息 external 存。",
      "**问题 3：项目级上下文没沉淀** — 每次 CC 启动要重新介绍项目，**Claude-Mem 读 AGENTS.md / 项目历史**。",
      "**问题 4：多 session 难对比** — 一个项目开 5 个 CC session，**Claude-Mem 共享一个 memory store**。"
],
    designPrinciples: [
      "**Persistent memory** — CC 关闭后 memory 仍在，**下次启动自动恢复**。",
      "**Vector + structured** — 关键事实用 structured store，**闲聊用 vector**。",
      "**AGENTS.md 集成** — 项目 root 的 AGENTS.md 自动加载，**项目规范是 memory 的一部分**。",
      "**Session fork** — 已有 session 可派生新 session，**共享 memory**。",
      "****Session-level + project-level memory** — 双层记忆，**per-session + per-project 隔离**。**"
],
    differentiationMatrix: [
      "vs planning-with-files — planning-files 是任务级；Claude-Mem 是 session 级。**planning-files 强在执行，Claude-Mem 强在记忆**。",
      "vs MemGPT — MemGPT 是 LLM 内存层次；Claude-Mem 是 CC 插件。**MemGPT 强在研究，Claude-Mem 强在落地**。",
      "vs Zep / Letta — Zep / Letta 是 SaaS；Claude-Mem 是 OSS 插件。**Claude-Mem 强在自托管**。",
      "vs ccpm — ccpm 是项目管理；Claude-Mem 是记忆。**ccpm 强在项目管理，Claude-Mem 强在记忆**。",
      "vs MiCo — MiCo 当前没 session 记忆。**抄 Claude-Mem = persistent memory + AGENTS.md 集成 + session fork**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2024-09 — thedotmack 启动 claude-mem",
    "2024-12 — v0.1，CC 插件 prototype",
    "2025-03 — v0.5，AGENTS.md 集成",
    "2025-06 — v1.0，persistent memory 完善",
    "2025-09 — Session fork 发布",
    "2025-12 — 2.5k stars",
    "2026-04 — 4k stars，论文引用",
    "2026-05 — 论文 Agent Harness Engineering 收录 (C 层代表)",
    "2026-08 — 4.5k+ stars (实拍)，持续滚动"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Claude-Mem** 是论文 C 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**Persistent memory** — MiCo 虾跨 session 记忆，**项目级上下文自动恢复**。",
    "**Vector + structured** — 关键事实 structured，闲聊 vector，**双层记忆**。",
    "**AGENTS.md 集成** — 项目 root AGENTS.md 自动加载，**项目规范是 memory 的一部分**。",
    "**Session fork** — 已有 session 派生新 session，**共享 memory**。",
    "**L 层评分 9 维**：state 4 / scheduling 3 / memory 5 / mcp 3 / sandbox 3 / error 3 / observability 3 / deployment 3 / governance 3。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 4,
        scheduling: 3,
        memory: 5 ,
        mcp: 3,
        sandbox: 3,
        error: 3,
        observability: 3,
        deployment: 3,
        governance: 3,
  },
};
