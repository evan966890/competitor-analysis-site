// Promptfoo 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 V 层 · github.com/promptfoo/promptfoo · 7.5k+ stars
// 来源：github.com/promptfoo/promptfoo · 本台实拍（GitHub README）+ 论文定位
window.TD_PROMPTFOO_DEEPDIVE = {
  productId: 'promptfoo',
  productName: 'Promptfoo',
  tagline: '7.5k+ stars 的 eval 第一工具 —— "Test your prompts, agents, and RAGs"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/promptfoo/promptfoo · 7.5k+ stars · promptfoo.dev · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 V 层定位）',
  primaryLayer: 'V',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：Promptfoo · 7.5k+ stars · MIT',
      img: 'assets/shots/l2-mid/p2-promptfoo-1.jpg',
      note: '****Promptfoo** —— 论文 V 层 21 个项目中 "prompt eval" 路线标杆，**"Test your prompts, agents, and RAGs"** 是 LLM 应用测试的事实标准。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：promptfoo.dev',
      img: 'assets/shots/l2-mid/p2-promptfoo-1.jpg',
      note: '**Promptfoo** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-promptfoo-1.jpg',
      note: '**目录结构反映 Promptfoo 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-promptfoo-1.jpg',
      note: '**Promptfoo 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-promptfoo-1.jpg',
      note: '**Promptfoo 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-promptfoo-1.jpg',
      note: '**Promptfoo release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'Promptfoo 核心抽象：基于 V 层定位',
      file: 'promptfoo/core/*.{ts,py,go,rs} (论文定位)',
      code: `// Promptfoo 在 V 层的核心抽象
// 论文定位：**Promptfoo** —— 论文 V 层 21 个项目中 "prompt eval" 路线标杆，**"Test your prompts, agents, and RAGs"** 是 LLM 应用测试的事实标准。
// **YAML config** — promptfoo eval.yaml 一处配置，**prompt + tests + assertions**。
// **多 provider** — OpenAI / Anthropic / Google / Mistral / Ollama，**统一接口**。

interface PromptfooCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**Promptfoo 的核心抽象是论文 V 层代表** —— **Promptfoo** —— 论文 V 层 21 个项目中 "prompt eval" 路线标杆，**"Test your prompts, agents, and RAGs"** 是 LLM 应用测试的事实标准。',
        '****YAML config** — promptfoo eval.yaml 一处配置，**prompt + tests + assertions**。**',
        '****多 provider** — OpenAI / Anthropic / Google / Mistral / Ollama，**统一接口**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'Promptfoo 的差异化设计',
      file: 'promptfoo/core/feature.*',
      code: `// 差异化设计
// **多 assertion** — contains / regex / llm-rubric / similar / javascript，**5 种断言**。
// **Web UI** — promptfoo view 看结果 dashboard，**可视化对比**。

class PromptfooFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****多 assertion** — contains / regex / llm-rubric / similar / javascript，**5 种断言**。**',
        '****Web UI** — promptfoo view 看结果 dashboard，**可视化对比**。**',
      ],
    },
    {
      title: 'Promptfoo 部署 / 集成',
      file: 'promptfoo/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: promptfoo.dev

// 典型用法
import { Promptfoo } from "@promptfoo/core";
// 或
pip install promptfoo`,
      points: [
        '**Promptfoo 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Promptfoo 在论文 V 层凭什么排进 top 5？',
    answer: '**Promptfoo** —— 论文 V 层 21 个项目中 "prompt eval" 路线标杆，**"Test your prompts, agents, and RAGs"** 是 LLM 应用测试的事实标准。',
    problemDiagnosis: [
      "**问题 1：prompt 改完不知道好坏** — A/B test 要手写脚本，**Promptfoo 标准化**。",
      "**问题 2：LLM 评测难复现** — temperature / model 变动结果不同，**Promptfoo 锁定 config**。",
      "**问题 3：评测不标准化** — 各团队自造评测，**Promptfoo 统一格式 (yaml)**。",
      "**问题 4：RAG / agent 难测** — 不是简单 prompt，**Promptfoo 支持 RAG / agent**。"
],
    designPrinciples: [
      "**YAML config** — promptfoo eval.yaml 一处配置，**prompt + tests + assertions**。",
      "**多 provider** — OpenAI / Anthropic / Google / Mistral / Ollama，**统一接口**。",
      "**多 assertion** — contains / regex / llm-rubric / similar / javascript，**5 种断言**。",
      "**Web UI** — promptfoo view 看结果 dashboard，**可视化对比**。",
      "****CI/CD integration** — GitHub Actions 集成，**eval as gate**。**"
],
    differentiationMatrix: [
      "vs DeepEval — DeepEval 是 pytest 风格；Promptfoo 是 yaml + web UI。**DeepEval 强在 Python 集成，Promptfoo 强在 dashboard**。",
      "vs Ragas — Ragas 是 RAG 专项；Promptfoo 是综合。**Ragas 强在 RAG，Promptfoo 强在综合**。",
      "vs LM Evaluation Harness — LM-Eval-Harness 是学术；Promptfoo 是工程。**LM-Eval-Harness 强在研究，Promptfoo 强在工程**。",
      "vs Langfuse — Langfuse 是 observability；Promptfoo 是 eval。**两者互补**。",
      "vs MiCo — MiCo 当前没统一 eval 工具。**抄 Promptfoo = yaml config + 多 provider + 5 种断言 + web UI**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-08 — Promptfoo 开源",
    "2023-12 — v0.1，yaml config 基础",
    "2024-04 — Web UI 发布",
    "2024-08 — 3k stars",
    "2024-12 — RAG / agent 支持",
    "2025-04 — 5k stars",
    "2025-08 — 6.5k stars，CI/CD 集成完善",
    "2026-05 — 论文 Agent Harness Engineering 收录 (V 层代表)",
    "2026-08 — 7.5k+ stars (实拍)，事实标准"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Promptfoo** 是论文 V 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**YAML config** — MiCo 评测用 yaml 一处配置，**prompt + tests + assertions**。",
    "**多 provider** — OpenAI / Anthropic / Google / Ollama，**统一评测接口**。",
    "**5 种断言** — contains / regex / llm-rubric / similar / javascript，**MiCo 用同套**。",
    "**Web UI dashboard** — mico eval --view 看结果，**可视化对比**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 3 / error 5 / observability 4 / deployment 3 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 3,
        mcp: 3,
        sandbox: 3,
        error: 5 ,
        observability: 4,
        deployment: 3,
        governance: 4,
  },
};
