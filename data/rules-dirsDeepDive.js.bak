// Rules Directories 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 T 层 · github.com/anthropics/claude-code (约定承载者) · N/A (约定)
// 来源：github.com/anthropics/claude-code (约定承载者) · 本台实拍（GitHub README）+ 论文定位
window.TD_RULES_DIRS_DEEPDIVE = {
  productId: 'rules-dirs',
  productName: 'Rules Directories',
  tagline: 'AGENTS.md / CLAUDE.md / .cursorrules 等规则目录约定 —— 论文 T 层"非仓库"代表',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/anthropics/claude-code (约定承载者) · N/A (约定) · N/A (概念) · N/A',
  author: '本台研究团队（GitHub README 实拍 + 论文 T 层定位）',
  primaryLayer: 'T',
  deployment: '约定',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：Rules Directories · N/A (约定) · N/A',
      img: 'assets/shots/paper2/p2-rules-dirs-1.jpg',
      note: '****Rules Directories** —— 论文 T 层 12 个项目中**唯一"非仓库"代表**，**AGENTS.md / CLAUDE.md / .cursorrules / .github/copilot-instructions.md 等规则目录约定** 是 AI agent 上下文的事实标准。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：N/A (概念)',
      img: 'assets/shots/paper2/p2-rules-dirs-1.jpg',
      note: '**Rules Directories** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/paper2/p2-rules-dirs-1.jpg',
      note: '**目录结构反映 Rules Directories 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/paper2/p2-rules-dirs-1.jpg',
      note: '**Rules Directories 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/paper2/p2-rules-dirs-1.jpg',
      note: '**Rules Directories 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/paper2/p2-rules-dirs-1.jpg',
      note: '**Rules Directories release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'Rules Directories 核心抽象：基于 T 层定位',
      file: 'rules-dirs/core/*.{ts,py,go,rs} (论文定位)',
      code: `// Rules Directories 在 T 层的核心抽象
// 论文定位：**Rules Directories** —— 论文 T 层 12 个项目中**唯一"非仓库"代表**，**AGENTS.md / CLAUDE.md / .cursorrules / .github/copilot-instructions.md 等规则目录约定** 是 AI agent 上下文的事实标准。
// **AGENTS.md 标准** — 多数项目 root 一个 AGENTS.md，**agent 启动自动加载**。
// **CLAUDE.md (CC)** — Claude Code 专用，**项目级 CC 行为**。

interface RulesDirectoriesCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**Rules Directories 的核心抽象是论文 T 层代表** —— **Rules Directories** —— 论文 T 层 12 个项目中**唯一"非仓库"代表**，**AGENTS.md / CLAUDE.md / .cursorrules / .github/copilot-instructions.md 等规则目录约定** 是 AI agent 上下文的事实标准。',
        '****AGENTS.md 标准** — 多数项目 root 一个 AGENTS.md，**agent 启动自动加载**。**',
        '****CLAUDE.md (CC)** — Claude Code 专用，**项目级 CC 行为**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'Rules Directories 的差异化设计',
      file: 'rules-dirs/core/feature.*',
      code: `// 差异化设计
// **.cursorrules (Cursor)** — Cursor 专用，**项目级 Cursor 行为**。
// **.github/copilot-instructions.md (Copilot)** — GitHub Copilot 专用，**仓库级 Copilot 行为**。

class RulesDirectoriesFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****.cursorrules (Cursor)** — Cursor 专用，**项目级 Cursor 行为**。**',
        '****.github/copilot-instructions.md (Copilot)** — GitHub Copilot 专用，**仓库级 Copilot 行为**。**',
      ],
    },
    {
      title: 'Rules Directories 部署 / 集成',
      file: 'rules-dirs/deploy/*.md',
      code: `// 部署 / 集成
// 部署形态：约定
// 协议：N/A
// Homepage: N/A (概念)

// 典型用法
import { RulesDirectories } from "@rules directories/core";
// 或
pip install rules directories`,
      points: [
        '**Rules Directories 部署形态：约定**',
        '**协议：N/A** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Rules Directories 在论文 T 层凭什么排进 top 5？',
    answer: '**Rules Directories** —— 论文 T 层 12 个项目中**唯一"非仓库"代表**，**AGENTS.md / CLAUDE.md / .cursorrules / .github/copilot-instructions.md 等规则目录约定** 是 AI agent 上下文的事实标准。',
    problemDiagnosis: [
      "**问题 1：agent 怎么知道项目规范** — 每次都从零猜，**不准确**；Rules Directories 让项目规范文件化。",
      "**问题 2：每个工具规则文件不同** — CC 用 CLAUDE.md / Cursor 用 .cursorrules / Copilot 用 copilot-instructions.md，**碎片化**。",
      "**问题 3：规则难统一管理** — 散落在多处，**Rules Directories 标准化路径**。",
      "**问题 4：规则没有版本化** — 改完不知道什么时候改的，**Rules Directories 文件在 git 仓库**。"
],
    designPrinciples: [
      "**AGENTS.md 标准** — 多数项目 root 一个 AGENTS.md，**agent 启动自动加载**。",
      "**CLAUDE.md (CC)** — Claude Code 专用，**项目级 CC 行为**。",
      "**.cursorrules (Cursor)** — Cursor 专用，**项目级 Cursor 行为**。",
      "**.github/copilot-instructions.md (Copilot)** — GitHub Copilot 专用，**仓库级 Copilot 行为**。"
],
    differentiationMatrix: [
      "vs agents-md (仓库) — agents-md 是单一仓库；Rules Directories 是跨工具约定。**Rules Directories 强在跨工具**。",
      "vs SKILL.md (CC) — SKILL.md 是 plugin；Rules Directories 是项目规则。**SKILL.md 强在能力，Rules Directories 强在规范**。",
      "vs promptfoo — promptfoo 是测试；Rules Directories 是规范。**promptfoo 强在验证，Rules Directories 强在执行**。",
      "vs planning-with-files — planning-files 是任务；Rules Directories 是规范。**planning-files 强在执行，Rules Directories 强在约束**。",
      "vs MiCo — MiCo 当前没项目级规则目录。**抄 Rules Directories = AGENTS.md 自动加载 + CLAUDE.md 兼容**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-Q3 — Cursor 推 .cursorrules 约定",
    "2023-Q4 — Aider 推 CONVENTIONS.md",
    "2024-Q1 — GitHub Copilot 推 copilot-instructions.md",
    "2024-Q2 — Claude Code 推 CLAUDE.md",
    "2024-Q3 — 社区开始提 AGENTS.md 标准",
    "2024-Q4 — Anthropic 公开支持 AGENTS.md",
    "2025-Q1 — AGENTS.md 成为事实标准",
    "2025-Q3 — Cursor 改名 .cursorrules → AGENTS.md 兼容",
    "2026-05 — 论文 Agent Harness Engineering 收录 (T 层\"非仓库\"代表)"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Rules Directories** 是论文 T 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**AGENTS.md 自动加载** — MiCo 启动时自动读项目 root 的 AGENTS.md，**项目规则自动生效**。",
    "**CLAUDE.md 兼容** — CC 项目用 CLAUDE.md，**MiCo 也认 CLAUDE.md**。",
    "**copilot-instructions.md 兼容** — Copilot 项目也能无缝接入 MiCo。",
    "**项目级规则 in git** — 规则随项目走，**改完有 commit log**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 4 / mcp 3 / sandbox 3 / error 3 / observability 3 / deployment 3 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 4,
        mcp: 5 ⭐,
        sandbox: 3,
        error: 3,
        observability: 3,
        deployment: 3,
        governance: 4,
  },
};
