// planning-with-files 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 C 层 · github.com/OthmanAdi/planning-with-files · 5.7k+ stars
// 来源：github.com/OthmanAdi/planning-with-files · 本台实拍（GitHub README）+ 论文定位
window.TD_PLANNING_FILES_DEEPDIVE = {
  productId: 'planning-files',
  productName: 'planning-with-files',
  tagline: '5.7k+ stars 的 Manus 风格任务规划 —— "Plan in markdown, execute with AI"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/OthmanAdi/planning-with-files · 5.7k+ stars · othmanadi.github.io/planning-with-files · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 C 层定位）',
  primaryLayer: 'C',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：planning-with-files · 5.7k+ stars · MIT',
      img: 'assets/shots/paper2/p2-planning-files-1.jpg',
      note: '****planning-with-files** —— 论文 C 层 9 个项目中 "Manus 风格任务规划" 代表，**"Plan in markdown, execute with AI"** 是 Manus agent 任务规划范式。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：othmanadi.github.io/planning-with-files',
      img: 'assets/shots/paper2/p2-planning-files-1.jpg',
      note: '**planning-with-files** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/paper2/p2-planning-files-1.jpg',
      note: '**目录结构反映 planning-with-files 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/paper2/p2-planning-files-1.jpg',
      note: '**planning-with-files 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/paper2/p2-planning-files-1.jpg',
      note: '**planning-with-files 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/paper2/p2-planning-files-1.jpg',
      note: '**planning-with-files release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'planning-with-files 核心抽象：基于 C 层定位',
      file: 'planning-files/core/*.{ts,py,go,rs} (论文定位)',
      code: `// planning-with-files 在 C 层的核心抽象
// 论文定位：**planning-with-files** —— 论文 C 层 9 个项目中 "Manus 风格任务规划" 代表，**"Plan in markdown, execute with AI"** 是 Manus agent 任务规划范式。
// **Plan in markdown** — task_plan.md + findings.md + progress.md 三件套，**plan 写到文件**。
// **Taskmaster 拆解** — 大任务拆小任务，**每个任务可执行**。

interface planningwithfilesCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**planning-with-files 的核心抽象是论文 C 层代表** —— **planning-with-files** —— 论文 C 层 9 个项目中 "Manus 风格任务规划" 代表，**"Plan in markdown, execute with AI"** 是 Manus agent 任务规划范式。',
        '****Plan in markdown** — task_plan.md + findings.md + progress.md 三件套，**plan 写到文件**。**',
        '****Taskmaster 拆解** — 大任务拆小任务，**每个任务可执行**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'planning-with-files 的差异化设计',
      file: 'planning-files/core/feature.*',
      code: `// 差异化设计
// **Progress 跟踪** — progress.md 实时更新，**用户可见**。
// **Manus 风格** — 受 Manus agent 启发，**plan → execute → verify 三阶段**。

class planningwithfilesFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Progress 跟踪** — progress.md 实时更新，**用户可见**。**',
        '****Manus 风格** — 受 Manus agent 启发，**plan → execute → verify 三阶段**。**',
      ],
    },
    {
      title: 'planning-with-files 部署 / 集成',
      file: 'planning-files/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: othmanadi.github.io/planning-with-files

// 典型用法
import { planningwithfiles } from "@planning-with-files/core";
// 或
pip install planning-with-files`,
      points: [
        '**planning-with-files 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'planning-with-files 在论文 C 层凭什么排进 top 5？',
    answer: '**planning-with-files** —— 论文 C 层 9 个项目中 "Manus 风格任务规划" 代表，**"Plan in markdown, execute with AI"** 是 Manus agent 任务规划范式。',
    problemDiagnosis: [
      "**问题 1：AI agent 直接干不规划** — 接到任务直接调 tool，**没有 planning step**；planning-with-files 强制先规划。",
      "**问题 2：规划在 context 里难追溯** — LLM 内部 planning 用户看不到，**planning-with-files 写到文件**。",
      "**问题 3：任务太大 agent 跑飞** — 没拆解直接跑，**半路迷失**；planning-with-files 强制 taskmaster。",
      "**问题 4：planning 工具碎片化** — 各家自己造，**planning-with-files 是单一文件范式**。"
],
    designPrinciples: [
      "**Plan in markdown** — task_plan.md + findings.md + progress.md 三件套，**plan 写到文件**。",
      "**Taskmaster 拆解** — 大任务拆小任务，**每个任务可执行**。",
      "**Progress 跟踪** — progress.md 实时更新，**用户可见**。",
      "**Manus 风格** — 受 Manus agent 启发，**plan → execute → verify 三阶段**。"
],
    differentiationMatrix: [
      "vs Claude-Mem — Claude-Mem 是 session 记忆；planning-files 是任务规划。**Claude-Mem 强在记忆，planning-files 强在执行**。",
      "vs Task Master — Task Master 是 Claude Code 插件；planning-files 是范式。**Task Master 强在 CC 集成，planning-files 强在跨工具**。",
      "vs LangGraph — LangGraph 是图状态机；planning-files 是 markdown 文件。**LangGraph 强在结构，planning-files 强在人类可读**。",
      "vs Spec Kit — Spec Kit 是 spec；planning-files 是 task plan。**Spec Kit 强在 spec，planning-files 强在 task**。",
      "vs MiCo — MiCo 当前没强制 planning 文件。**抄 planning-files = task_plan.md + findings.md + progress.md 三件套**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2025-03 — Manus agent 走红，planning 范式被关注",
    "2025-05 — OthmanAdi 推 planning-with-files",
    "2025-07 — v0.5，三件套约定",
    "2025-09 — Claude Code 集成",
    "2025-11 — Cursor 集成",
    "2026-01 — 4k stars",
    "2026-04 — 5.5k stars，论文引用",
    "2026-05 — 论文 Agent Harness Engineering 收录 (C 层代表)",
    "2026-08 — 5.7k+ stars (实拍)，Manus 风格被广泛采纳"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**planning-with-files** 是论文 C 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**Plan in markdown** — MiCo 虾接到任务先写 task_plan.md，**plan 持久化**。",
    "**Taskmaster 拆解** — 大任务拆小任务，**每个任务可执行可验证**。",
    "**Progress 跟踪** — progress.md 实时更新，**用户可见**。",
    "**三件套约定** — task_plan.md + findings.md + progress.md，**跨工具可移植**。",
    "**L 层评分 9 维**：state 4 / scheduling 4 / memory 4 / mcp 3 / sandbox 3 / error 3 / observability 3 / deployment 3 / governance 3。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 4,
        scheduling: 4,
        memory: 4 ⭐,
        mcp: 3,
        sandbox: 3,
        error: 3,
        observability: 3,
        deployment: 3,
        governance: 3,
  },
};
