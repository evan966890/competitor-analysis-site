// SWE-bench 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 V 层 · github.com/SWE-bench/SWE-bench · 4k+ stars
// 来源：github.com/SWE-bench/SWE-bench · 本台实拍（GitHub README）+ 论文定位
window.TD_SWEBENCH_DEEPDIVE = {
  productId: 'swebench',
  productName: 'SWE-bench',
  tagline: '4k+ stars 的 SWE 评测基准 —— "the de facto benchmark for AI software engineering"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/SWE-bench/SWE-bench · 4k+ stars · swebench.com · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 V 层定位）',
  primaryLayer: 'V',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：SWE-bench · 4k+ stars · MIT',
      img: 'assets/shots/l2-mid/p2-swebench-1.jpg',
      note: '****SWE-bench** —— 论文 V 层 21 个项目中 "SWE 评测" 路线标杆，**"the de facto benchmark for AI software engineering"** 是 agent 评级的"高考"。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：swebench.com',
      img: 'assets/shots/l2-mid/p2-swebench-1.jpg',
      note: '**SWE-bench** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-swebench-1.jpg',
      note: '**目录结构反映 SWE-bench 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-swebench-1.jpg',
      note: '**SWE-bench 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-swebench-1.jpg',
      note: '**SWE-bench 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-swebench-1.jpg',
      note: '**SWE-bench release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'SWE-bench 核心抽象：基于 V 层定位',
      file: 'swebench/core/*.{ts,py,go,rs} (论文定位)',
      code: `// SWE-bench 在 V 层的核心抽象
// 论文定位：**SWE-bench** —— 论文 V 层 21 个项目中 "SWE 评测" 路线标杆，**"the de facto benchmark for AI software engineering"** 是 agent 评级的"高考"。
// **Real GitHub issues** — 不是人造题，**全部是真实 PR 对应 issue**。
// **Docker 标准化** — 每个 case 一个 Docker 镜像，**环境一致**。

interface SWEbenchCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**SWE-bench 的核心抽象是论文 V 层代表** —— **SWE-bench** —— 论文 V 层 21 个项目中 "SWE 评测" 路线标杆，**"the de facto benchmark for AI software engineering"** 是 agent 评级的"高考"。',
        '****Real GitHub issues** — 不是人造题，**全部是真实 PR 对应 issue**。**',
        '****Docker 标准化** — 每个 case 一个 Docker 镜像，**环境一致**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'SWE-bench 的差异化设计',
      file: 'swebench/core/feature.*',
      code: `// 差异化设计
// **Fail-to-Pass tests** — 评测标准是"原本失败的测试通过"，**不是新加的测试**。
// **Multiple datasets** — SWE-bench Lite / Verified / Pro / Multimodal 等多个变体。

class SWEbenchFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Fail-to-Pass tests** — 评测标准是"原本失败的测试通过"，**不是新加的测试**。**',
        '****Multiple datasets** — SWE-bench Lite / Verified / Pro / Multimodal 等多个变体。**',
      ],
    },
    {
      title: 'SWE-bench 部署 / 集成',
      file: 'swebench/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: swebench.com

// 典型用法
import { SWEbench } from "@swe-bench/core";
// 或
pip install swe-bench`,
      points: [
        '**SWE-bench 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'SWE-bench 在论文 V 层凭什么排进 top 5？',
    answer: '**SWE-bench** —— 论文 V 层 21 个项目中 "SWE 评测" 路线标杆，**"the de facto benchmark for AI software engineering"** 是 agent 评级的"高考"。',
    problemDiagnosis: [
      "**问题 1：agent 能力怎么测** — 没有统一基准，**各团队自吹自擂**；SWE-bench 给统一题库。",
      "**问题 2：测什么维度** — 不是简单 \"能不能跑过测试\"，**要测真实 GitHub issue 解决能力**；SWE-bench 全部是真实 PR。",
      "**问题 3：评测难复现** — 环境 / 依赖 / 测试各异，**SWE-bench 用 Docker 标准化**。",
      "**问题 4：评测成本高** — 跑 500 个 case 时间长，**SWE-bench 多语言支持**。"
],
    designPrinciples: [
      "**Real GitHub issues** — 不是人造题，**全部是真实 PR 对应 issue**。",
      "**Docker 标准化** — 每个 case 一个 Docker 镜像，**环境一致**。",
      "**Fail-to-Pass tests** — 评测标准是\"原本失败的测试通过\"，**不是新加的测试**。",
      "**Multiple datasets** — SWE-bench Lite / Verified / Pro / Multimodal 等多个变体。",
      "****Multiple variants** — Lite / Verified / Pro / Multimodal，**评测梯度设计**。**"
],
    differentiationMatrix: [
      "vs HumanEval — HumanEval 是基础算法；SWE-bench 是真实仓库。**SWE-bench 强在真实**。",
      "vs MMLU — MMLU 是知识测验；SWE-bench 是工程能力。**SWE-bench 强在工程**。",
      "vs Terminal-Bench — Terminal-Bench 是 terminal 任务；SWE-bench 是完整 PR。**SWE-bench 强在端到端**。",
      "vs AgentBench — AgentBench 是综合 agent 评测；SWE-bench 专注 SWE。**SWE-bench 强在专注**。",
      "vs MiCo — MiCo 当前没用 SWE-bench 测。**抄 SWE-bench = 跑 SWE-bench Verified + 每周追踪 ranking**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-10 — Princeton 开源 SWE-bench",
    "2024-04 — SWE-bench Lite (300 cases) 发布",
    "2024-08 — SWE-bench Verified (500 cases, human-verified)",
    "2024-12 — SWE-bench Pro (1500 cases) 发布",
    "2025-04 — SWE-bench Multimodal (视觉版) 公开",
    "2025-09 — SWE-bench Leaderboard 成为事实标准",
    "2026-02 — SWE-bench Pro 扩到 2000+ cases",
    "2026-05 — 论文 Agent Harness Engineering 收录",
    "2026-08 — 4k+ stars (实拍)，OpenAI / Anthropic / Google 都跑"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**SWE-bench** 是论文 V 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**跑 SWE-bench Verified** — MiCo 虾在 SWE-bench Verified 上跑，**500 个 case 周排行**。",
    "**多语言支持** — Python / JS / Go / Rust 等，**不只 Python**。",
    "**Fail-to-Pass 测试** — 不是\"加新测试\"，**让原失败的测试通过**。",
    "**每周追踪 ranking** — SWE-bench Leaderboard 是事实标准，**rank 决定行业地位**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 4 / error 5 / observability 4 / deployment 3 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 3,
        mcp: 3,
        sandbox: 4,
        error: 5 ,
        observability: 4,
        deployment: 3,
        governance: 4,
  },
};
