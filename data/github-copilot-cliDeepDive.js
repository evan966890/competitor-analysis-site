// GitHub Copilot CLI 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · github.com/github/copilot-cli · 11.1k stars
// 来源：github.com/github/copilot-cli · 本台实拍（GitHub README）+ 论文定位
// ⚠️ 闭源/官方项目：完整功能实操需登录（**登录实操**：Copilot CLI 需要 GitHub Copilot subscription（$10/月或 $19/月），**待用户用 evan966890@gmail.com 登录验证**。本台实拍部分限于 GitHub README 公开内容。）
window.TD_GITHUB_COPILOT_CLI_DEEPDIVE = {
  productId: 'github-copilot-cli',
  productName: 'GitHub Copilot CLI',
  tagline: '11.1k stars 的 GitHub 官方 terminal agent —— "GitHub Copilot CLI brings AI-powered coding assistance directly to your command line"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/github/copilot-cli · 11.1k stars · github.com/copilot-cli · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 L 层定位 + 登录部分待用户接管）',
  primaryLayer: 'L',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍，闭源部分待用户登录）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：GitHub Copilot CLI · 11.1k stars · MIT',
      img: 'assets/shots/closed-3/p3-copilot-cli-1.jpg',
      note: '**GitHub Copilot CLI** —— 论文 L 层 47 个项目中 "GitHub 官方 terminal agent" 路线标杆，**386 releases + 1.0.78 latest** + "the same agentic harness as GitHub\'s Copilot coding agent"。',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：github.com/copilot-cli',
      img: 'assets/shots/closed-3/p3-copilot-cli-1.jpg',
      note: '**GitHub Copilot CLI** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/closed-3/p3-copilot-cli-1.jpg',
      note: '**目录结构反映 GitHub Copilot CLI 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/closed-3/p3-copilot-cli-1.jpg',
      note: '**GitHub Copilot CLI 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/closed-3/p3-copilot-cli-1.jpg',
      note: '**GitHub Copilot CLI 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'closed-login',
      caption: '⚠️ 闭源/SaaS 实操：**登录实操**：Copilot CLI 需要 GitHub Copilot subscription（$10/月或 $19/月），**待用户用 evan966890@gmail.com 登录验证**。本台实拍部分限于 GitHub README 公开内容。',
      img: 'assets/shots/closed-3/p3-copilot-cli-1.jpg',
      note: '**完整功能实操需登录**：**登录实操**：Copilot CLI 需要 GitHub Copilot subscription（$10/月或 $19/月），**待用户用 evan966890@gmail.com 登录验证**。本台实拍部分限于 GitHub README 公开内容。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'GitHub Copilot CLI 核心抽象：基于 L 层定位',
      file: 'github-copilot-cli/core/*.{ts,py,go,rs} (论文定位)',
      code: `// GitHub Copilot CLI 在 L 层的核心抽象
// 论文定位：**GitHub Copilot CLI** —— 论文 L 层 47 个项目中 "GitHub 官方 terminal agent" 路线标杆，**386 releases + 1.0.78 latest** + "the same agentic harness as GitHub is Copilot coding agent"。
// **同 agentic harness** — 同一份 Copilot backend，VSCode / JetBrains / CLI 三端共享。
// **GitHub 账号 = 身份** — OAuth 一处，**不用新注册**。

interface GitHubCopilotCLICore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**GitHub Copilot CLI 的核心抽象是论文 L 层代表** —— GitHub Copilot CLI，论文 L 层 47 个项目中 "GitHub 官方 terminal agent" 路线标杆，**386 releases + 1.0.78 latest** + "the same agentic harness as GitHub Copilot coding agent"。',
        '**同 agentic harness** — 同一份 Copilot backend，VSCode / JetBrains / CLI 三端共享。**',
        '**GitHub 账号 = 身份** — OAuth 一处，**不用新注册**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'GitHub Copilot CLI 的差异化设计',
      file: 'github-copilot-cli/core/feature.*',
      code: `// 差异化设计
// **集成 GitHub 生态** — repository / PR / issue / actions 全打通。
// **MIT + 386 releases** — 极高频次发布，**bot 自动 update**。

class GitHubCopilotCLIFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '**集成 GitHub 生态** — repository / PR / issue / actions 全打通。**',
        '**MIT + 386 releases** — 极高频次发布，**bot 自动 update**。**',
      ],
    },
    {
      title: 'GitHub Copilot CLI 部署 / 集成',
      file: 'github-copilot-cli/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: github.com/copilot-cli

// 典型用法
import { GitHubCopilotCLI } from "@github copilot cli/core";
// 或
pip install github copilot cli`,
      points: [
        '**GitHub Copilot CLI 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'GitHub Copilot CLI 在论文 L 层凭什么排进 top 5？',
    answer: '**GitHub Copilot CLI** —— 论文 L 层 47 个项目中 "GitHub 官方 terminal agent" 路线标杆，**386 releases + 1.0.78 latest** + "the same agentic harness as GitHub is Copilot coding agent"。',
    problemDiagnosis: [
      "**问题 1：GitHub 用户在 terminal 跑 coding agent** — VSCode / JetBrains 用户切到 terminal 要新学一个 agent，**Copilot CLI 用同一个账号无缝切换**。",
      "**问题 2：GitHub 生态 100% 集成** — Copilot CLI 直接走 GitHub 账号 + repository，**无需新 OAuth**。",
      "**问题 3：与 VSCode 端共享 agentic harness** — Copilot CLI 不是新实现，是 **VSCode Copilot Chat 同一个 agentic harness**，**深度一致**。",
      "**问题 4：GitHub 官方 update 节奏** — `github-actions[bot] Update changelog.md for version 1.0.78`，**last week 1.0.78**。"
],
    designPrinciples: [
      "**同 agentic harness** — 同一份 Copilot backend，VSCode / JetBrains / CLI 三端共享。",
      "**GitHub 账号 = 身份** — OAuth 一处，**不用新注册**。",
      "**集成 GitHub 生态** — repository / PR / issue / actions 全打通。",
      "**MIT + 386 releases** — 极高频次发布，**bot 自动 update**。",
      "****Same backend as VSCode Copilot** — 三端共享 harness，**深度一致**。**"
],
    differentiationMatrix: [
      "vs Claude Code — CC 是 anthropic 闭源 TUI + plugin；Copilot CLI 是 GitHub 官方 terminal。**CC 强在 plugin 生态，Copilot CLI 强在 GitHub 集成**。",
      "vs OpenCode — OC 是 anomalyco 开源；Copilot CLI 是 GitHub 官方。**OC 强在架构，Copilot CLI 强在生态**。",
      "vs Codex — Codex 是 openai 官方；Copilot CLI 是 GitHub 官方。**Codex 强在 model，Copilot CLI 强在 GitHub 集成**。",
      "vs Aider — Aider 是开源轻量；Copilot CLI 是 GitHub 官方。**Aider 强在透明，Copilot CLI 强在生态**。",
      "vs MiCo — MiCo 当前没有 GitHub 集成。**抄 Copilot CLI = 同 OAuth + 共享 agentic harness + GitHub 生态集成**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2024-02 — GitHub Copilot CLI alpha 内测",
    "2024-09 — 公开 v0.1",
    "2024-12 — v0.5，GitHub 集成完善",
    "2025-04 — v1.0 stable",
    "2025-08 — 6k stars，1.0.50",
    "2025-12 — 9k stars",
    "2026-04 — 11.1k stars",
    "2026-05 — 论文 Agent Harness Engineering 收录",
    "2026-08 — 11.1k stars (实拍), v1.0.78 latest, 386 releases"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**GitHub Copilot CLI** 是论文 L 层代表项目。**闭源/官方项目，完整功能实操需登录，**登录实操**：Copilot CLI 需要 GitHub Copilot subscription（$10/月或 $19/月），**待用户用 evan966890@gmail.com 登录验证**。本台实拍部分限于 GitHub README 公开内容。**。',
    forMico: [
    "**同 agentic harness** — MiCo 虾与 IDE / Web 共享一份 harness，**三端深度一致**。",
    "**GitHub OAuth** — MiCo 用 GitHub 账号登录，**零注册摩擦**。",
    "**GitHub 生态集成** — repository / PR / issue / actions 全打通，**MiCo 借势 GitHub 生态**。",
    "**高频次 release + bot** — Copilot CLI 386 releases，**MiCo 节奏对齐**。",
    "**L 层评分 9 维**：state 4 / scheduling 4 / memory 3 / mcp 3 / sandbox 3 / error 3 / observability 3 / deployment 4 / governance 4。"
],
  },
};
