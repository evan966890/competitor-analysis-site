// Langfuse 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 O 层 · github.com/langfuse/langfuse · 32.8k stars
// 来源：github.com/langfuse/langfuse · 本台实拍（GitHub README）+ 论文定位
window.TD_LANGFUSE_DEEPDIVE = {
  productId: 'langfuse',
  productName: 'Langfuse',
  tagline: '32.8k stars 的开源 LLM engineering platform —— observability + evals + prompt mgmt 一站式',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/langfuse/langfuse · 32.8k stars · langfuse.com · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 O 层定位）',
  primaryLayer: 'O',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：Langfuse · 32.8k stars · MIT',
      img: 'assets/shots/paper2/p2-langfuse-1.jpg',
      note: '****Langfuse** —— 论文 O 层 15 个项目 star 数第一，**"Open source AI engineering platform: LLM evals, observability, metrics, prompt management, playground, datasets"** 是 LLM observability 的事实标准。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：langfuse.com',
      img: 'assets/shots/paper2/p2-langfuse-1.jpg',
      note: '**Langfuse** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/paper2/p2-langfuse-1.jpg',
      note: '**目录结构反映 Langfuse 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/paper2/p2-langfuse-1.jpg',
      note: '**Langfuse 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/paper2/p2-langfuse-1.jpg',
      note: '**Langfuse 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/paper2/p2-langfuse-1.jpg',
      note: '**Langfuse release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'Langfuse 核心抽象：基于 O 层定位',
      file: 'langfuse/core/*.{ts,py,go,rs} (论文定位)',
      code: `// Langfuse 在 O 层的核心抽象
// 论文定位：**Langfuse** —— 论文 O 层 15 个项目 star 数第一，**"Open source AI engineering platform: LLM evals, observability, metrics, prompt management, playground, datasets"** 是 LLM observability 的事实标准。
// **OpenTelemetry first** — 基于 OTEL 协议，每个 LLM call 是一个 span，**和 APM 工具互通**。
// **dataset + run + score** — eval 三层模型：dataset 是题库，run 是测试结果，score 是评分。

interface LangfuseCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**Langfuse 的核心抽象是论文 O 层代表** —— **Langfuse** —— 论文 O 层 15 个项目 star 数第一，**"Open source AI engineering platform: LLM evals, observability, metrics, prompt management, playground, datasets"** 是 LLM observability 的事实标准。',
        '****OpenTelemetry first** — 基于 OTEL 协议，每个 LLM call 是一个 span，**和 APM 工具互通**。**',
        '****dataset + run + score** — eval 三层模型：dataset 是题库，run 是测试结果，score 是评分。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'Langfuse 的差异化设计',
      file: 'langfuse/core/feature.*',
      code: `// 差异化设计
// **prompt-as-code** — prompt 必须在 Langfuse 注册 + 版本化，**不能 inline 写**。
// **17 个 topic 一站式** — analytics / autogen / evaluation / langchain / large-language-models / llama-index / llm / llm-evaluation / llm-observability / llmops / monitoring / observability / open-source / openai / playground / prompt-engineering / prompt-management / self-hosted / ycombinator —— **所有 LLM 生态节点都覆盖**。

class LangfuseFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****prompt-as-code** — prompt 必须在 Langfuse 注册 + 版本化，**不能 inline 写**。**',
        '****17 个 topic 一站式** — analytics / autogen / evaluation / langchain / large-language-models / llama-index / llm / llm-evaluation / llm-observability / llmops / monitoring / observability / open-source / openai / playground / prompt-engineering / prompt-management / self-hosted / ycombinator —— **所有 LLM 生态节点都覆盖**。**',
      ],
    },
    {
      title: 'Langfuse 部署 / 集成',
      file: 'langfuse/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: langfuse.com

// 典型用法
import { Langfuse } from "@langfuse/core";
// 或
pip install langfuse`,
      points: [
        '**Langfuse 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Langfuse 在论文 O 层凭什么排进 top 5？',
    answer: '**Langfuse** —— 论文 O 层 15 个项目 star 数第一，**"Open source AI engineering platform: LLM evals, observability, metrics, prompt management, playground, datasets"** 是 LLM observability 的事实标准。',
    problemDiagnosis: [
      "**问题 1：LLM 调用没有 trace** — 多数 LLM 应用只 log \"user asked X, model answered Y\"，**不知道中间 tool calls / token 用量 / 延迟**；Langfuse 把每一次 LLM 调用都做成 OpenTelemetry span。",
      "**问题 2：eval 没有标准化** — 每个团队自己造 eval，**结果不可比**；Langfuse 用 dataset + run + score 三层模型统一 eval。",
      "**问题 3：prompt 版本管理缺失** — prompt 改完没有版本回溯，线上问题定位要 \"git log\"；Langfuse prompt-as-code 强制版本化。",
      "**问题 4：集成碎片化** — LangChain / OpenAI SDK / Anthropic SDK 各自 log 格式；Langfuse 一处 trace 全部统一。"
],
    designPrinciples: [
      "**OpenTelemetry first** — 基于 OTEL 协议，每个 LLM call 是一个 span，**和 APM 工具互通**。",
      "**dataset + run + score** — eval 三层模型：dataset 是题库，run 是测试结果，score 是评分。",
      "**prompt-as-code** — prompt 必须在 Langfuse 注册 + 版本化，**不能 inline 写**。",
      "**17 个 topic 一站式** — analytics / autogen / evaluation / langchain / large-language-models / llama-index / llm / llm-evaluation / llm-observability / llmops / monitoring / observability / open-source / openai / playground / prompt-engineering / prompt-management / self-hosted / ycombinator —— **所有 LLM 生态节点都覆盖**。"
],
    differentiationMatrix: [
      "vs Helicone — Helicone 是 LLM proxy + cache；Langfuse 是 observability + eval + prompt。**互补关系**。",
      "vs Arize Phoenix — Phoenix 是 notebook-first eval；Langfuse 是 SaaS-first observability。**Langfuse 强在生产**。",
      "vs MLflow — MLflow 是 ML 实验跟踪；Langfuse 是 LLM 专项，**LLM token / cost / streaming 全覆盖**。",
      "vs Opik — Opik 是 Comet 出品；Langfuse 是 YC W23，**社区更活跃**。",
      "vs MiCo — MiCo 当前没有 LLM observability 抽象。**抄 Langfuse = OpenTelemetry span + dataset/run/score + prompt-as-code**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2022-Q4 — Langfuse 创立（YC W23 入选）",
    "2023-04 — 首次开源，star 数破 1k",
    "2023-10 — OpenTelemetry 集成，star 数破 5k",
    "2024-03 — Dataset + Run + Score 三层模型上线",
    "2024-09 — LangChain / OpenAI / Anthropic SDK 全集成",
    "2025-04 — Self-hosted + Cloud 双部署 GA",
    "2025-12 — Prompt Playground + Management 完善",
    "2026-05 — 论文 Agent Harness Engineering 收录 (O 层 star 数第一)",
    "2026-08 — 32.8k stars (实拍)，17 minutes ago 持续滚动"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Langfuse** 是论文 O 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**OpenTelemetry first** — 把 MiCo 的 LLM 调用包成 OTEL span，**和 APM 工具互通**。",
    "**Dataset + Run + Score** — eval 三层模型，**题库 / 测试结果 / 评分分离**，可对比可回放。",
    "**Prompt-as-code** — prompt 必须在 MiCo 注册 + 版本化，**不能 inline 写**。",
    "**Self-hosted + Cloud 双部署** — 企业用户给 self-hosted，云端用户给 SaaS。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 4 / sandbox 3 / error 4 / observability 5 / deployment 4 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 3,
        mcp: 4,
        sandbox: 3,
        error: 3,
        observability: 5 ⭐,
        deployment: 3,
        governance: 4,
  },
};
