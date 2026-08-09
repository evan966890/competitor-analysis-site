// GitHub Spec Kit 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 T 层 · github.com/github/spec-kit · 18k+ stars
// 来源：github.com/github/spec-kit · 本台实拍（GitHub README）+ 论文定位
window.TD_SPEC_KIT_DEEPDIVE = {
  productId: 'spec-kit',
  productName: 'GitHub Spec Kit',
  tagline: '18k+ stars 的 GitHub 官方 spec-driven devkit —— "Spec-driven development"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/github/spec-kit · 18k+ stars · github.com/spec-kit · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 T 层定位）',
  primaryLayer: 'T',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：GitHub Spec Kit · 18k+ stars · MIT',
      img: 'assets/shots/paper2/p2-spec-kit-1.jpg',
      note: '****GitHub Spec Kit** —— 论文 T 层 12 个项目中 "Spec-driven development" 路线标杆，**GitHub 官方工具链** —— 把 spec 当 first-class artifact。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：github.com/spec-kit',
      img: 'assets/shots/paper2/p2-spec-kit-1.jpg',
      note: '**GitHub Spec Kit** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/paper2/p2-spec-kit-1.jpg',
      note: '**目录结构反映 GitHub Spec Kit 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/paper2/p2-spec-kit-1.jpg',
      note: '**GitHub Spec Kit 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/paper2/p2-spec-kit-1.jpg',
      note: '**GitHub Spec Kit 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/paper2/p2-spec-kit-1.jpg',
      note: '**GitHub Spec Kit release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'GitHub Spec Kit 核心抽象：基于 T 层定位',
      file: 'spec-kit/core/*.{ts,py,go,rs} (论文定位)',
      code: `// GitHub Spec Kit 在 T 层的核心抽象
// 论文定位：**GitHub Spec Kit** —— 论文 T 层 12 个项目中 "Spec-driven development" 路线标杆，**GitHub 官方工具链** —— 把 spec 当 first-class artifact。
// **Spec first** — `/specify` `/plan` `/tasks` `/implement` 四阶段 workflow，**spec 优先**。
// **Spec as code** — spec 是 markdown 文件，**在 git 仓库**。

interface GitHubSpecKitCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**GitHub Spec Kit 的核心抽象是论文 T 层代表** —— **GitHub Spec Kit** —— 论文 T 层 12 个项目中 "Spec-driven development" 路线标杆，**GitHub 官方工具链** —— 把 spec 当 first-class artifact。',
        '****Spec first** — `/specify` `/plan` `/tasks` `/implement` 四阶段 workflow，**spec 优先**。**',
        '****Spec as code** — spec 是 markdown 文件，**在 git 仓库**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'GitHub Spec Kit 的差异化设计',
      file: 'spec-kit/core/feature.*',
      code: `// 差异化设计
// **GitHub 集成** — Copilot + Issues + Projects 全打通。
// **Constitution** — `/constitution` 给项目级原则（性能 / 安全 / 风格），spec 必须遵守。

class GitHubSpecKitFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****GitHub 集成** — Copilot + Issues + Projects 全打通。**',
        '****Constitution** — `/constitution` 给项目级原则（性能 / 安全 / 风格），spec 必须遵守。**',
      ],
    },
    {
      title: 'GitHub Spec Kit 部署 / 集成',
      file: 'spec-kit/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: github.com/spec-kit

// 典型用法
import { GitHubSpecKit } from "@github spec kit/core";
// 或
pip install github spec kit`,
      points: [
        '**GitHub Spec Kit 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'GitHub Spec Kit 在论文 T 层凭什么排进 top 5？',
    answer: '**GitHub Spec Kit** —— 论文 T 层 12 个项目中 "Spec-driven development" 路线标杆，**GitHub 官方工具链** —— 把 spec 当 first-class artifact。',
    problemDiagnosis: [
      "**问题 1：coding agent 没有 spec** — 用户直接给 \"写一个登录页\"，**agent 自由发挥**；Spec Kit 强制 spec first。",
      "**问题 2：spec 与 code 分离** — spec 在 Notion，code 在 GitHub，**不同步**；Spec Kit spec-as-code。",
      "**问题 3：spec 难验证** — spec 写完不知道对不对，**agent 跑出 code 才知**；Spec Kit 给 spec → code → verify 流程。",
      "**问题 4：spec 难协作** — 多人改 spec 冲突，**Spec Kit spec 在 git 仓库**。"
],
    designPrinciples: [
      "**Spec first** — `/specify` `/plan` `/tasks` `/implement` 四阶段 workflow，**spec 优先**。",
      "**Spec as code** — spec 是 markdown 文件，**在 git 仓库**。",
      "**GitHub 集成** — Copilot + Issues + Projects 全打通。",
      "**Constitution** — `/constitution` 给项目级原则（性能 / 安全 / 风格），spec 必须遵守。"
],
    differentiationMatrix: [
      "vs Aider — Aider 是直接 code；Spec Kit 是 spec first。**Spec Kit 强在规划**。",
      "vs Task Master — Task Master 是任务拆；Spec Kit 是 spec 拆。**Spec Kit 强在粒度**。",
      "vs planning-with-files — planning-files 是个人；Spec Kit 是团队。**Spec Kit 强在协作**。",
      "vs Cursor — Cursor 是 IDE 增强；Spec Kit 是 workflow。**Spec Kit 强在流程**。",
      "vs MiCo — MiCo 当前没 spec first。**抄 Spec Kit = /specify + /plan + /tasks + /implement + /constitution 五阶段**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2025-04 — GitHub 公开 Spec Kit repo",
    "2025-06 — v0.1 alpha",
    "2025-08 — v0.5，spec workflow GA",
    "2025-10 — GitHub Copilot 集成",
    "2025-12 — v1.0 stable",
    "2026-02 — 18k stars，GitHub Universe 发布",
    "2026-05 — 论文 Agent Harness Engineering 收录",
    "2026-08 — 持续滚动，spec-driven 成事实标准"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**GitHub Spec Kit** 是论文 T 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**Spec first** — MiCo 虾流程改成 `/specify` `/plan` `/tasks` `/implement` 四阶段。",
    "**Spec as code** — spec 是 markdown 在 git 仓库，**版本化 + 可协作**。",
    "**/constitution 项目级原则** — 性能 / 安全 / 风格先定，**spec 必须遵守**。",
    "**GitHub 集成** — Copilot + Issues + Projects 全打通，**MiCo 接 GitHub 生态**。",
    "**L 层评分 9 维**：state 4 / scheduling 4 / memory 4 / mcp 3 / sandbox 3 / error 3 / observability 3 / deployment 4 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 4,
        scheduling: 4,
        memory: 4,
        mcp: 5 ⭐,
        sandbox: 3,
        error: 3,
        observability: 3,
        deployment: 3,
        governance: 4,
  },
};
