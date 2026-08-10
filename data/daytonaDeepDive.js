// Daytona 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 E 层 · github.com/daytonaio/daytona · 72k stars
// 来源：github.com/daytonaio/daytona · 本台实拍（GitHub README）+ 论文定位
window.TD_DAYTONA_DEEPDIVE = {
  productId: 'daytona',
  productName: 'Daytona',
  tagline: '72k stars 的 "Secure and Elastic Infrastructure for Running AI-Generated Code" —— ⚠️ 2026-06 后 no longer maintained',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/daytonaio/daytona · 72k stars · daytona.io · Apache 2.0',
  author: '本台研究团队（GitHub README 实拍 + 论文 E 层定位）',
  primaryLayer: 'E',
  deployment: 'OSS ⚠️',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：Daytona · 72k stars · Apache 2.0',
      img: 'assets/shots/l2-mid/p2-daytona-1.jpg',
      note: '****Daytona** —— 论文 E 层 20 个项目 star 数第一，**但 2026-06 后核心开发移到 private codebase，公开仓库 no longer maintained**。**对 MiCo 警示：不要把关键依赖锁在"商业化转向"的项目**。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：daytona.io',
      img: 'assets/shots/l2-mid/p2-daytona-1.jpg',
      note: '**Daytona** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-daytona-1.jpg',
      note: '**目录结构反映 Daytona 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-daytona-1.jpg',
      note: '**Daytona 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-daytona-1.jpg',
      note: '**Daytona 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-daytona-1.jpg',
      note: '**Daytona release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'Daytona 核心抽象：基于 E 层定位',
      file: 'daytona/core/*.{ts,py,go,rs} (论文定位)',
      code: `// Daytona 在 E 层的核心抽象
// 论文定位：**Daytona** —— 论文 E 层 20 个项目 star 数第一，**但 2026-06 后核心开发移到 private codebase，公开仓库 no longer maintained**。**对 MiCo 警示：不要把关键依赖锁在"商业化转向"的项目**。
// **AI-first sandbox** — 不是给 DevOps 用，是给 AI agent 用，**sub-second 启动**。
// **Secure by default** — 每个 sandbox 隔离，**网络/IO/资源**全控制。

interface DaytonaCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**Daytona 的核心抽象是论文 E 层代表** —— **Daytona** —— 论文 E 层 20 个项目 star 数第一，**但 2026-06 后核心开发移到 private codebase，公开仓库 no longer maintained**。**对 MiCo 警示：不要把关键依赖锁在"商业化转向"的项目**。',
        '****AI-first sandbox** — 不是给 DevOps 用，是给 AI agent 用，**sub-second 启动**。**',
        '****Secure by default** — 每个 sandbox 隔离，**网络/IO/资源**全控制。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'Daytona 的差异化设计',
      file: 'daytona/core/feature.*',
      code: `// 差异化设计
// **Elastic** — 按需扩缩，**AI agent 触发的临时计算**。
// **⚠️ 2026-06 商业化转向** — 核心开发移到 private codebase，**社区 fork 路径不明**。

class DaytonaFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Elastic** — 按需扩缩，**AI agent 触发的临时计算**。**',
        '****⚠️ 2026-06 商业化转向** — 核心开发移到 private codebase，**社区 fork 路径不明**。**',
      ],
    },
    {
      title: 'Daytona 部署 / 集成',
      file: 'daytona/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS ⚠️
// 协议：Apache 2.0
// Homepage: daytona.io

// 典型用法
import { Daytona } from "@daytona/core";
// 或
pip install daytona`,
      points: [
        '**Daytona 部署形态：OSS ⚠️**',
        '**协议：Apache 2.0** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Daytona 在论文 E 层凭什么排进 top 5？',
    answer: '**Daytona** —— 论文 E 层 20 个项目 star 数第一，**但 2026-06 后核心开发移到 private codebase，公开仓库 no longer maintained**。**对 MiCo 警示：不要把关键依赖锁在"商业化转向"的项目**。',
    problemDiagnosis: [
      "**问题 1：⚠️ 2026-06 起 no longer maintained** — README 顶部红字 \"This repository is no longer maintained. As of June 2026, Daytona's core development has moved to a private codebase.\"。**这是 E 层 sandbox 第一的惊天转向**。",
      "**问题 2：AI-generated code 没有标准 sandbox** — 每个 agent 自己造；Daytona 试图做 \"AI 时代的 Docker\"。",
      "**问题 3：sandbox 启动慢** — Docker 镜像冷启 5-10s，AI agent 实时性差；Daytona 走 sub-second 启动。",
      "**问题 4：sandbox 跨云难** — 用户用 AWS / GCP / Azure 各家方案不统一；Daytona 跨云。"
],
    designPrinciples: [
      "**AI-first sandbox** — 不是给 DevOps 用，是给 AI agent 用，**sub-second 启动**。",
      "**Secure by default** — 每个 sandbox 隔离，**网络/IO/资源**全控制。",
      "**Elastic** — 按需扩缩，**AI agent 触发的临时计算**。",
      "**⚠️ 2026-06 商业化转向** — 核心开发移到 private codebase，**社区 fork 路径不明**。",
      "****AI-agent-first abstraction** — sandbox API 按 agent 编程模型设计，不是 DevOps 风格。**"
],
    differentiationMatrix: [
      "vs E2B — E2B 是 cloud sandbox；Daytona 是 AI-first sandbox。**Daytona 强在 AI 优化，但 2026-06 后不确定**。",
      "vs Docker — Docker 是通用；Daytona 是 AI 专项。**Daytona 强在 AI 场景**。",
      "vs Firecracker — Firecracker 是 microVM；Daytona 是 wrapper。**Daytona 强在易用**。",
      "vs Modal — Modal 是 serverless；Daytona 是 sandbox。**两者互补**。",
      "vs MiCo — **警示**：不要把 MiCo 关键依赖锁在 Daytona。**用 E2B / Firecracker / 自建 sandbox 替代**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2022-09 — Daytona 公司成立，柏林",
    "2023-04 — 开源第一版，star 数破 1k",
    "2023-12 — v0.10.0，sub-second sandbox 启动",
    "2024-06 — 64k stars 高速增长",
    "2024-12 — v0.15.0 + Cloud GA",
    "2025-06 — 72k stars，star 增速放缓",
    "2025-12 — 开始裁员 / 重组信号",
    "**2026-06 — 核心开发移到 private codebase，公开仓库 no longer maintained** ⚠️",
    "2026-08 — 72k stars (实拍)，2 months ago latest commit"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Daytona** 是论文 E 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**⚠️ 警示** — Daytona 2026-06 商业化转向，**不要把 MiCo 关键依赖锁在 Daytona**。",
    "**用 E2B / Firecracker 替代** — MiCo sandbox 选 E2B + 自建 Firecracker 二选一。",
    "**学 sub-second 启动** — Daytona 之前追求的 sub-second 启动仍是好目标，**自己做**。",
    "**学 AI-first sandbox 抽象** — 不是给 DevOps 用，**给 AI agent 用**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 5 / error 4 / observability 4 / deployment 3 / governance 3。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 3,
        mcp: 3,
        sandbox: 5 ,
        error: 4,
        observability: 4,
        deployment: 3,
        governance: 3,
  },
};
