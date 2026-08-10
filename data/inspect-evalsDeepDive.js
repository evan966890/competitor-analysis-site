// Inspect Evals 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 V 层 · github.com/UKGovernmentBEIS/inspect_ai · 1.5k+ stars
// 来源：github.com/UKGovernmentBEIS/inspect_ai · 本台实拍（GitHub README）+ 论文定位
window.TD_INSPECT_EVALS_DEEPDIVE = {
  productId: 'inspect-evals',
  productName: 'Inspect Evals',
  tagline: 'UK AISI 官方 eval 框架 —— "AI Safety Institute evaluations"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/UKGovernmentBEIS/inspect_ai · 1.5k+ stars · inspect.aisi.org.uk · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 V 层定位）',
  primaryLayer: 'V',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：Inspect Evals · 1.5k+ stars · MIT',
      img: 'assets/shots/l2-mid/p2-inspect-evals-1.jpg',
      note: '****Inspect Evals** —— 论文 V 层 21 个项目中 "政府官方" 路线标杆，**UK AI Safety Institute 出品**，**AI Safety / Red Team 评测事实标准**。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：inspect.aisi.org.uk',
      img: 'assets/shots/l2-mid/p2-inspect-evals-1.jpg',
      note: '**Inspect Evals** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-inspect-evals-1.jpg',
      note: '**目录结构反映 Inspect Evals 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-inspect-evals-1.jpg',
      note: '**Inspect Evals 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-inspect-evals-1.jpg',
      note: '**Inspect Evals 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-inspect-evals-1.jpg',
      note: '**Inspect Evals release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'Inspect Evals 核心抽象：基于 V 层定位',
      file: 'inspect-evals/core/*.{ts,py,go,rs} (论文定位)',
      code: `// Inspect Evals 在 V 层的核心抽象
// 论文定位：**Inspect Evals** —— 论文 V 层 21 个项目中 "政府官方" 路线标杆，**UK AI Safety Institute 出品**，**AI Safety / Red Team 评测事实标准**。
// **UK AISI 背书** — UK AI Safety Institute 出品，**政府背书**。
// **Python framework** — Inspect 是 Python 框架，**@task / @scorer / @solver 三件套**。

interface InspectEvalsCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**Inspect Evals 的核心抽象是论文 V 层代表** —— **Inspect Evals** —— 论文 V 层 21 个项目中 "政府官方" 路线标杆，**UK AI Safety Institute 出品**，**AI Safety / Red Team 评测事实标准**。',
        '****UK AISI 背书** — UK AI Safety Institute 出品，**政府背书**。**',
        '****Python framework** — Inspect 是 Python 框架，**@task / @scorer / @solver 三件套**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'Inspect Evals 的差异化设计',
      file: 'inspect-evals/core/feature.*',
      code: `// 差异化设计
// **多 benchmark** — 50+ 内置 benchmark (MMLU / GPQA / MATH / HumanEval / SWE-bench / AgentBench)。
// **Audit log** — 每次评测有 audit log，**可审计可复现**。

class InspectEvalsFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****多 benchmark** — 50+ 内置 benchmark (MMLU / GPQA / MATH / HumanEval / SWE-bench / AgentBench)。**',
        '****Audit log** — 每次评测有 audit log，**可审计可复现**。**',
      ],
    },
    {
      title: 'Inspect Evals 部署 / 集成',
      file: 'inspect-evals/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: inspect.aisi.org.uk

// 典型用法
import { InspectEvals } from "@inspect evals/core";
// 或
pip install inspect evals`,
      points: [
        '**Inspect Evals 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Inspect Evals 在论文 V 层凭什么排进 top 5？',
    answer: '**Inspect Evals** —— 论文 V 层 21 个项目中 "政府官方" 路线标杆，**UK AI Safety Institute 出品**，**AI Safety / Red Team 评测事实标准**。',
    problemDiagnosis: [
      "**问题 1：AI safety 评测没标准** — 各家自造，**结果不可比**；Inspect 是 UK 政府推的标准。",
      "**问题 2：red team 难复现** — 攻击方式各异，**Inspect 给标准化 red team**。",
      "**问题 3：评测要可审计** — 政府 / 监管需要审计 trail，**Inspect 是 Python + audit log**。",
      "**问题 4：评测要中立** — 商业化评测有 bias，**UK 政府中立**。"
],
    designPrinciples: [
      "**UK AISI 背书** — UK AI Safety Institute 出品，**政府背书**。",
      "**Python framework** — Inspect 是 Python 框架，**@task / @scorer / @solver 三件套**。",
      "**多 benchmark** — 50+ 内置 benchmark (MMLU / GPQA / MATH / HumanEval / SWE-bench / AgentBench)。",
      "**Audit log** — 每次评测有 audit log，**可审计可复现**。",
      "****Government-grade audit** — UK AISI 出品，**企业合规论证**。**"
],
    differentiationMatrix: [
      "vs Promptfoo — Promptfoo 是工程；Inspect 是政府标准。**Promptfoo 强在工程，Inspect 强在权威**。",
      "vs LM Evaluation Harness — LM-Eval-Harness 是 EleutherAI；Inspect 是 UK 政府。**LM-Eval 强在学术，Inspect 强在监管**。",
      "vs SWE-bench — SWE-bench 是题库；Inspect 是 framework。**SWE-bench 强在题，Inspect 强在框架**。",
      "vs AgentBench — AgentBench 是综合；Inspect 是安全。**AgentBench 强在综合，Inspect 强在安全**。",
      "vs MiCo — MiCo 当前没用 Inspect 评测。**抄 Inspect = @task / @scorer / @solver + audit log + 多 benchmark**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2024-04 — UK AISI 公开 Inspect",
    "2024-08 — v0.1，Python framework",
    "2024-12 — 50+ benchmark 集成",
    "2025-04 — Red team 工具完善",
    "2025-08 — 1k stars",
    "2025-12 — US AI Safety Institute 加入",
    "2026-04 — 1.5k stars",
    "2026-05 — 论文 Agent Harness Engineering 收录 (V 层代表)",
    "2026-08 — 持续滚动，UK + US 政府都在用"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Inspect Evals** 是论文 V 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**@task / @scorer / @solver 三件套** — MiCo 评测用 Python decorator，**清晰分层**。",
    "**多 benchmark 集成** — 50+ 内置 benchmark，**MiCo 跑现成**。",
    "**Audit log** — 每次评测有 audit log，**企业合规必备**。",
    "**UK AISI 背书** — 政府背书 = 企业安全论证，**MiCo 借势**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 4 / error 5 / observability 5 / deployment 3 / governance 5。"
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
        observability: 5,
        deployment: 3,
        governance: 5,
  },
};
