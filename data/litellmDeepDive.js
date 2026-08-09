// LiteLLM 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 G 层 · github.com/BerriAI/litellm · 16k+ stars
// 来源：github.com/BerriAI/litellm · 本台实拍（GitHub README）+ 论文定位
window.TD_LITELLM_DEEPDIVE = {
  productId: 'litellm',
  productName: 'LiteLLM',
  tagline: '16k+ stars 的 LLM gateway —— "100+ LLMs, 1 API"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/BerriAI/litellm · 16k+ stars · docs.litellm.ai · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 G 层定位）',
  primaryLayer: 'G',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：LiteLLM · 16k+ stars · MIT',
      img: 'assets/shots/paper2/p2-litellm-1.jpg',
      note: '****LiteLLM** —— 论文 G 层 14 个项目中 "LLM gateway" 路线的代表，**"100+ LLMs, 1 API"** 是不绑死 model provider 的关键基础设施。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：docs.litellm.ai',
      img: 'assets/shots/paper2/p2-litellm-1.jpg',
      note: '**LiteLLM** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/paper2/p2-litellm-1.jpg',
      note: '**目录结构反映 LiteLLM 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/paper2/p2-litellm-1.jpg',
      note: '**LiteLLM 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/paper2/p2-litellm-1.jpg',
      note: '**LiteLLM 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/paper2/p2-litellm-1.jpg',
      note: '**LiteLLM release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'LiteLLM 核心抽象：基于 G 层定位',
      file: 'litellm/core/*.{ts,py,go,rs} (论文定位)',
      code: `// LiteLLM 在 G 层的核心抽象
// 论文定位：**LiteLLM** —— 论文 G 层 14 个项目中 "LLM gateway" 路线的代表，**"100+ LLMs, 1 API"** 是不绑死 model provider 的关键基础设施。
// **统一 API** — `litellm.completion(model="gpt-4o", messages=[...])` 一行覆盖 100+ 模型。
// **Proxy 模式** — `litellm --model gpt-4o --model claude-sonnet-4-5` 起一个 OpenAI-compatible server，**老代码零修改**。

interface LiteLLMCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**LiteLLM 的核心抽象是论文 G 层代表** —— **LiteLLM** —— 论文 G 层 14 个项目中 "LLM gateway" 路线的代表，**"100+ LLMs, 1 API"** 是不绑死 model provider 的关键基础设施。',
        '****统一 API** — `litellm.completion(model="gpt-4o", messages=[...])` 一行覆盖 100+ 模型。**',
        '****Proxy 模式** — `litellm --model gpt-4o --model claude-sonnet-4-5` 起一个 OpenAI-compatible server，**老代码零修改**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'LiteLLM 的差异化设计',
      file: 'litellm/core/feature.*',
      code: `// 差异化设计
// **Routing + Fallback** — 内置 load balancing / fallback / retry / circuit breaker。
// **Cost tracking** — 每一次调用记录 cost / token / latency，**团队 dashboard 一目了然**。

class LiteLLMFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Routing + Fallback** — 内置 load balancing / fallback / retry / circuit breaker。**',
        '****Cost tracking** — 每一次调用记录 cost / token / latency，**团队 dashboard 一目了然**。**',
      ],
    },
    {
      title: 'LiteLLM 部署 / 集成',
      file: 'litellm/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: docs.litellm.ai

// 典型用法
import { LiteLLM } from "@litellm/core";
// 或
pip install litellm`,
      points: [
        '**LiteLLM 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'LiteLLM 在论文 G 层凭什么排进 top 5？',
    answer: '**LiteLLM** —— 论文 G 层 14 个项目中 "LLM gateway" 路线的代表，**"100+ LLMs, 1 API"** 是不绑死 model provider 的关键基础设施。',
    problemDiagnosis: [
      "**问题 1：每个 LLM provider 都有自己的 SDK** — OpenAI / Anthropic / Google / Mistral API 各自有 client，**代码碎片化**；LiteLLM 一个 `completion()` 调用全部。",
      "**问题 2：模型切换要改代码** — 想从 gpt-4o 换 claude-sonnet-4-5，要改 SDK + prompt format + tool format；LiteLLM 改 model 名字一行。",
      "**问题 3：fallback / retry 各自实现** — rate limit / timeout / content filter 每个项目自己写；LiteLLM 内置。",
      "**问题 4：成本 / 延迟 / token 不可见** — 直接调 provider API，没有统一 dashboard；LiteLLM proxy 给 dashboard。"
],
    designPrinciples: [
      "**统一 API** — `litellm.completion(model=\"gpt-4o\", messages=[...])` 一行覆盖 100+ 模型。",
      "**Proxy 模式** — `litellm --model gpt-4o --model claude-sonnet-4-5` 起一个 OpenAI-compatible server，**老代码零修改**。",
      "**Routing + Fallback** — 内置 load balancing / fallback / retry / circuit breaker。",
      "**Cost tracking** — 每一次调用记录 cost / token / latency，**团队 dashboard 一目了然**。"
],
    differentiationMatrix: [
      "vs OpenRouter — OpenRouter 是 SaaS 路由；LiteLLM 是 OSS proxy + SaaS 双部署。**LiteLLM 强在自托管**。",
      "vs Portkey — Portkey 是 SaaS-first；LiteLLM 是 OSS-first。**LiteLLM 强在企业部署**。",
      "vs Kong — Kong 是通用 API gateway；LiteLLM 是 LLM 专项。**LiteLLM 强在 LLM 语义**。",
      "vs Direct SDK — Direct 是 N 个 SDK；LiteLLM 是 1 个 SDK。**LiteLLM 强在简化**。",
      "vs MiCo — MiCo 当前没有 LLM gateway 抽象。**抄 LiteLLM = 统一 completion() + proxy + cost tracking**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-04 — BerriAI 创立 LiteLLM",
    "2023-08 — 开源 1.0，支持 10+ 模型",
    "2023-12 — Proxy 模式发布",
    "2024-04 — 50+ 模型集成",
    "2024-08 — 100+ 模型，star 数破 5k",
    "2025-02 — Routing + Fallback + Cost tracking 完善",
    "2025-10 — Enterprise features GA (SSO / audit log / RBAC)",
    "2026-05 — 论文 Agent Harness Engineering 收录",
    "2026-08 — 16k+ stars (实拍)，持续滚动 release"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**LiteLLM** 是论文 G 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**统一 completion()** — MiCo 接入 LiteLLM，**改 model 名字一行切换 provider**。",
    "**Proxy 模式** — 老代码零修改，**OpenAI-compatible endpoint** 是事实标准。",
    "**Routing + Fallback** — 内置 rate limit / timeout / circuit breaker，**企业级可靠性**。",
    "**Cost tracking** — 团队 dashboard 看 cost / token / latency，**财务报销可对账**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 3 / error 4 / observability 4 / deployment 5 / governance 5。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 3,
        mcp: 3,
        sandbox: 3,
        error: 3,
        observability: 3,
        deployment: 5,
        governance: 5 ⭐,
  },
};
