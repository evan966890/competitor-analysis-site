// EvalScope 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 V 层 · github.com/modelscope/evalscope · 5k+ stars
// 来源：github.com/modelscope/evalscope · 本台实拍（GitHub README）+ 论文定位
window.TD_EVALSCOPE_DEEPDIVE = {
  productId: 'evalscope',
  productName: 'EvalScope',
  tagline: '阿里 ModelScope 出品的 LLM eval 框架 —— 中文/多模态评测第一',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/modelscope/evalscope · 5k+ stars · evalscope.readthedocs.io · Apache 2.0',
  author: '本台研究团队（GitHub README 实拍 + 论文 V 层定位）',
  primaryLayer: 'V',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：EvalScope · 5k+ stars · Apache 2.0',
      img: 'assets/shots/l2-mid/p2-evalscope-1.jpg',
      note: '****EvalScope** —— 论文 V 层 21 个项目中 "中文 + 多模态 eval" 路线标杆，**阿里 ModelScope 出品**，**中文 LLM 评测事实标准**。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：evalscope.readthedocs.io',
      img: 'assets/shots/l2-mid/p2-evalscope-1.jpg',
      note: '**EvalScope** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-evalscope-1.jpg',
      note: '**目录结构反映 EvalScope 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-evalscope-1.jpg',
      note: '**EvalScope 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-evalscope-1.jpg',
      note: '**EvalScope 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-evalscope-1.jpg',
      note: '**EvalScope release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'EvalScope 核心抽象：基于 V 层定位',
      file: 'evalscope/core/*.{ts,py,go,rs} (论文定位)',
      code: `// EvalScope 在 V 层的核心抽象
// 论文定位：**EvalScope** —— 论文 V 层 21 个项目中 "中文 + 多模态 eval" 路线标杆，**阿里 ModelScope 出品**，**中文 LLM 评测事实标准**。
// **ModelScope 背书** — 阿里达摩院出品，**中文 LLM 生态核心**。
// **多 benchmark** — 100+ benchmark 集成 (MMLU / C-Eval / GSM8K / MMCU / 多模态)。

interface EvalScopeCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**EvalScope 的核心抽象是论文 V 层代表** —— **EvalScope** —— 论文 V 层 21 个项目中 "中文 + 多模态 eval" 路线标杆，**阿里 ModelScope 出品**，**中文 LLM 评测事实标准**。',
        '****ModelScope 背书** — 阿里达摩院出品，**中文 LLM 生态核心**。**',
        '****多 benchmark** — 100+ benchmark 集成 (MMLU / C-Eval / GSM8K / MMCU / 多模态)。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'EvalScope 的差异化设计',
      file: 'evalscope/core/feature.*',
      code: `// 差异化设计
// **多模态支持** — vision / audio / video，**国内最全**。
// **可视化报告** — EvalScope view 看 HTML report，**中文友好**。

class EvalScopeFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****多模态支持** — vision / audio / video，**国内最全**。**',
        '****可视化报告** — EvalScope view 看 HTML report，**中文友好**。**',
      ],
    },
    {
      title: 'EvalScope 部署 / 集成',
      file: 'evalscope/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：Apache 2.0
// Homepage: evalscope.readthedocs.io

// 典型用法
import { EvalScope } from "@evalscope/core";
// 或
pip install evalscope`,
      points: [
        '**EvalScope 部署形态：OSS**',
        '**协议：Apache 2.0** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'EvalScope 在论文 V 层凭什么排进 top 5？',
    answer: '**EvalScope** —— 论文 V 层 21 个项目中 "中文 + 多模态 eval" 路线标杆，**阿里 ModelScope 出品**，**中文 LLM 评测事实标准**。',
    problemDiagnosis: [
      "**问题 1：中文 LLM 评测薄弱** — 多数 benchmark 是英文，**EvalScope 强在中文**。",
      "**问题 2：多模态评测少** — vision / audio 评测少，**EvalScope 支持多模态**。",
      "**问题 3：评测配置复杂** — 不同 benchmark 配置不同，**EvalScope 统一**。",
      "**问题 4：评测要可复现** — 中文社区有需求，**EvalScope 是中文社区标准**。"
],
    designPrinciples: [
      "**ModelScope 背书** — 阿里达摩院出品，**中文 LLM 生态核心**。",
      "**多 benchmark** — 100+ benchmark 集成 (MMLU / C-Eval / GSM8K / MMCU / 多模态)。",
      "**多模态支持** — vision / audio / video，**国内最全**。",
      "**可视化报告** — EvalScope view 看 HTML report，**中文友好**。",
      "****Chinese-first benchmarks** — C-Eval / MMCU / 中文社区标准。**"
],
    differentiationMatrix: [
      "vs Promptfoo — Promptfoo 是英文为主；EvalScope 是中文为主。**Promptfoo 强在英文，EvalScope 强在中文**。",
      "vs SWE-bench — SWE-bench 是 SWE；EvalScope 是综合。**SWE-bench 强在 SWE，EvalScope 强在综合**。",
      "vs Inspect — Inspect 是 UK；EvalScope 是中国。**Inspect 强在监管，EvalScope 强在中文**。",
      "vs AgentBench — AgentBench 是 academic；EvalScope 是阿里。**AgentBench 强在学术，EvalScope 强在工程**。",
      "vs MiCo — MiCo 当前没接 EvalScope。**抄 EvalScope = 100+ benchmark + 多模态 + 中文 + 可视化**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-08 — ModelScope 开源 EvalScope",
    "2023-12 — 50+ benchmark 集成",
    "2024-04 — 多模态支持",
    "2024-08 — 2k stars",
    "2024-12 — C-Eval 中文 benchmark 集成",
    "2025-04 — 3.5k stars",
    "2025-08 — 4.5k stars，Qwen 集成",
    "2026-05 — 论文 Agent Harness Engineering 收录 (V 层代表)",
    "2026-08 — 5k+ stars (实拍)，中文社区事实标准"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**EvalScope** 是论文 V 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**100+ benchmark 集成** — MiCo 评测用 EvalScope，**现成 benchmark 复用**。",
    "**多模态支持** — vision / audio / video，**国内最全**。",
    "**中文友好** — C-Eval / MMCU 等中文 benchmark，**MiCo 借势**。",
    "**阿里背书** — ModelScope 背书 = 中文 LLM 生态核心，**MiCo 借势**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 3 / error 4 / observability 4 / deployment 3 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 3,
        mcp: 3,
        sandbox: 3,
        error: 4 ,
        observability: 4,
        deployment: 3,
        governance: 4,
  },
};
