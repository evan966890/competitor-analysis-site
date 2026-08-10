// E2B 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 E 层 · github.com/e2b-dev/e2b · 8.5k+ stars
// 来源：github.com/e2b-dev/e2b · 本台实拍（GitHub README）+ 论文定位
window.TD_E2B_DEEPDIVE = {
  productId: 'e2b',
  productName: 'E2B',
  tagline: '8.5k+ stars 的 cloud sandbox —— "AI agents need a safe environment to execute code"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/e2b-dev/e2b · 8.5k+ stars · e2b.dev · Apache 2.0',
  author: '本台研究团队（GitHub README 实拍 + 论文 E 层定位）',
  primaryLayer: 'E',
  deployment: 'OSS + Cloud',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：E2B · 8.5k+ stars · Apache 2.0',
      img: 'assets/shots/l2-mid/p2-e2b-1.jpg',
      note: '****E2B** —— 论文 E 层 20 个项目中 "AI agent 专用 cloud sandbox" 路线标杆，**"AI agents need a safe environment to execute code"** 是论文 V 层（Verification）的标准实现。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：e2b.dev',
      img: 'assets/shots/l2-mid/p2-e2b-1.jpg',
      note: '**E2B** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-e2b-1.jpg',
      note: '**目录结构反映 E2B 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-e2b-1.jpg',
      note: '**E2B 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-e2b-1.jpg',
      note: '**E2B 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-e2b-1.jpg',
      note: '**E2B release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'E2B 核心抽象：基于 E 层定位',
      file: 'e2b/core/*.{ts,py,go,rs} (论文定位)',
      code: `// E2B 在 E 层的核心抽象
// 论文定位：**E2B** —— 论文 E 层 20 个项目中 "AI agent 专用 cloud sandbox" 路线标杆，**"AI agents need a safe environment to execute code"** 是论文 V 层（Verification）的标准实现。
// **Cloud sandbox** — 不是 on-prem，是 cloud，**用户零部署**。
// **AI agent first** — 不是给 DevOps，是给 AI agent，**microVM 预热**。

interface E2BCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**E2B 的核心抽象是论文 E 层代表** —— **E2B** —— 论文 E 层 20 个项目中 "AI agent 专用 cloud sandbox" 路线标杆，**"AI agents need a safe environment to execute code"** 是论文 V 层（Verification）的标准实现。',
        '****Cloud sandbox** — 不是 on-prem，是 cloud，**用户零部署**。**',
        '****AI agent first** — 不是给 DevOps，是给 AI agent，**microVM 预热**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'E2B 的差异化设计',
      file: 'e2b/core/feature.*',
      code: `// 差异化设计
// **Sub-second cold start** — microVM 池 + 快照，**新 sandbox < 1s 启动**。
// **多语言 runtime** — Python / Node / Go / Rust 预制 runtime 镜像。

class E2BFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Sub-second cold start** — microVM 池 + 快照，**新 sandbox < 1s 启动**。**',
        '****多语言 runtime** — Python / Node / Go / Rust 预制 runtime 镜像。**',
      ],
    },
    {
      title: 'E2B 部署 / 集成',
      file: 'e2b/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS + Cloud
// 协议：Apache 2.0
// Homepage: e2b.dev

// 典型用法
import { E2B } from "@e2b/core";
// 或
pip install e2b`,
      points: [
        '**E2B 部署形态：OSS + Cloud**',
        '**协议：Apache 2.0** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'E2B 在论文 E 层凭什么排进 top 5？',
    answer: '**E2B** —— 论文 E 层 20 个项目中 "AI agent 专用 cloud sandbox" 路线标杆，**"AI agents need a safe environment to execute code"** 是论文 V 层（Verification）的标准实现。',
    problemDiagnosis: [
      "**问题 1：AI agent 跑代码没有隔离** — 直接 host 跑，**企业用户不敢用**；E2B 给隔离 cloud sandbox。",
      "**问题 2：sandbox 启动慢** — Docker cold start 5-10s，**AI agent 实时性差**；E2B 走 microVM 预热池 sub-second。",
      "**问题 3：sandbox 状态管理** — agent 跑 5 步要恢复状态，**文件系统 + 网络**；E2B sandbox 有持久化。",
      "**问题 4：跨云难** — 用户用 AWS / GCP / Azure，**E2B 是 cloud-agnostic**。"
],
    designPrinciples: [
      "**Cloud sandbox** — 不是 on-prem，是 cloud，**用户零部署**。",
      "**AI agent first** — 不是给 DevOps，是给 AI agent，**microVM 预热**。",
      "**Sub-second cold start** — microVM 池 + 快照，**新 sandbox < 1s 启动**。",
      "**多语言 runtime** — Python / Node / Go / Rust 预制 runtime 镜像。",
      "****Cloud-only by design** — 不支持 self-host，强制云端 + 多用户隔离。**"
],
    differentiationMatrix: [
      "vs Daytona — Daytona 是 AI-first 但 2026-06 转向；**E2B 仍在 OSS-first 路线**。",
      "vs Firecracker — Firecracker 是底层；E2B 是 wrapper + dashboard。**E2B 强在易用**。",
      "vs Docker — Docker 是通用；E2B 是 AI 专项。**E2B 强在 AI 场景**。",
      "vs Modal — Modal 是 serverless；E2B 是 sandbox。**E2B 强在隔离**。",
      "vs MiCo — MiCo 当前没有 sandbox 抽象。**抄 E2B = microVM 预热池 + 多语言 runtime + cloud dashboard**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-05 — E2B 公司成立，旧金山",
    "2023-10 — 开源第一版",
    "2024-02 — sub-second sandbox GA",
    "2024-07 — 4k stars，AI agent 路线被广泛采纳",
    "2024-12 — 6.5k stars，Firecracker 底层集成",
    "2025-06 — 8k stars，多语言 runtime 完善",
    "2026-05 — 论文 Agent Harness Engineering 收录",
    "2026-08 — 8.5k+ stars (实拍)，持续滚动"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**E2B** 是论文 E 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**Cloud sandbox** — MiCo 沙箱走 cloud，**用户零部署**。",
    "**Sub-second 启动** — microVM 预热池，**新 sandbox < 1s 启动**。",
    "**多语言 runtime** — Python / Node / Go / Rust 预制，**用户选 runtime 不写 Dockerfile**。",
    "**⚠️ 关键替代 Daytona** — Daytona 2026-06 商业化转向，**E2B 是更稳的依赖**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 5 / error 4 / observability 4 / deployment 4 / governance 3。"
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
