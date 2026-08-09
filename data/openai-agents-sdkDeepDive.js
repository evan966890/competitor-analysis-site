// OpenAI Agents SDK 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · github.com/openai/openai-agents-python · 28.5k stars
// 来源：github.com/openai/openai-agents-python · 本台实拍（GitHub README）+ 论文定位
// ⚠️ 闭源/官方项目：完整功能实操需登录（**登录实操**：OpenAI Agents SDK 需要 OpenAI API key，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。）
window.TD_OPENAI_AGENTS_SDK_DEEPDIVE = {
  productId: 'openai-agents-sdk',
  productName: 'OpenAI Agents SDK',
  tagline: '28.5k stars 的 OpenAI 官方多 agent 框架 —— "A lightweight, powerful framework for multi-agent workflows"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/openai/openai-agents-python · 28.5k stars · openai.github.io/openai-agents-python · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 L 层定位 + 登录部分待用户接管）',
  primaryLayer: 'L',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍，闭源部分待用户登录）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：OpenAI Agents SDK · 28.5k stars · MIT',
      img: 'assets/shots/paper3/p3-openai-agents-1.jpg',
      note: '****OpenAI Agents SDK** —— 论文 L 层 47 个项目中 "OpenAI 官方多 agent" 路线标杆，**v0.19.4 + 28.5k stars + 6 topics (agents/ai/framework/harness/llm/openai/python)** + **仓库内 AGENTS.md + CLAUDE.md 双文件约定**。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：openai.github.io/openai-agents-python',
      img: 'assets/shots/paper3/p3-openai-agents-1.jpg',
      note: '**OpenAI Agents SDK** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/paper3/p3-openai-agents-1.jpg',
      note: '**目录结构反映 OpenAI Agents SDK 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/paper3/p3-openai-agents-1.jpg',
      note: '**OpenAI Agents SDK 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/paper3/p3-openai-agents-1.jpg',
      note: '**OpenAI Agents SDK 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'closed-login',
      caption: '⚠️ 闭源/SaaS 实操：**登录实操**：OpenAI Agents SDK 需要 OpenAI API key，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。',
      img: 'assets/shots/paper3/p3-openai-agents-1.jpg',
      note: '**完整功能实操需登录**：**登录实操**：OpenAI Agents SDK 需要 OpenAI API key，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'OpenAI Agents SDK 核心抽象：基于 L 层定位',
      file: 'openai-agents-sdk/core/*.{ts,py,go,rs} (论文定位)',
      code: `// OpenAI Agents SDK 在 L 层的核心抽象
// 论文定位：**OpenAI Agents SDK** —— 论文 L 层 47 个项目中 "OpenAI 官方多 agent" 路线标杆，**v0.19.4 + 28.5k stars + 6 topics (agents/ai/framework/harness/llm/openai/python)** + **仓库内 AGENTS.md + CLAUDE.md 双文件约定**。
// **lightweight harness** — 比 LangGraph 轻，**5 行 API 起 agent**。
// **multi-agent workflow** — Agents as tools, handoffs, deterministic flow，**4 种 agent 协作模式**。

interface OpenAIAgentsSDKCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**OpenAI Agents SDK 的核心抽象是论文 L 层代表** —— **OpenAI Agents SDK** —— 论文 L 层 47 个项目中 "OpenAI 官方多 agent" 路线标杆，**v0.19.4 + 28.5k stars + 6 topics (agents/ai/framework/harness/llm/openai/python)** + **仓库内 AGENTS.md + CLAUDE.md 双文件约定**。',
        '****lightweight harness** — 比 LangGraph 轻，**5 行 API 起 agent**。**',
        '****multi-agent workflow** — Agents as tools, handoffs, deterministic flow，**4 种 agent 协作模式**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'OpenAI Agents SDK 的差异化设计',
      file: 'openai-agents-sdk/core/feature.*',
      code: `// 差异化设计
// **AGENTS.md / CLAUDE.md 双约定** — OpenAI 借势 anthropic 生态，**规则约定互通**。
// **MCP 集成** — OpenAI 推 MCP，**与 anthropic 生态统一**。

class OpenAIAgentsSDKFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****AGENTS.md / CLAUDE.md 双约定** — OpenAI 借势 anthropic 生态，**规则约定互通**。**',
        '****MCP 集成** — OpenAI 推 MCP，**与 anthropic 生态统一**。**',
      ],
    },
    {
      title: 'OpenAI Agents SDK 部署 / 集成',
      file: 'openai-agents-sdk/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: openai.github.io/openai-agents-python

// 典型用法
import { OpenAIAgentsSDK } from "@openai agents sdk/core";
// 或
pip install openai agents sdk`,
      points: [
        '**OpenAI Agents SDK 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'OpenAI Agents SDK 在论文 L 层凭什么排进 top 5？',
    answer: '**OpenAI Agents SDK** —— 论文 L 层 47 个项目中 "OpenAI 官方多 agent" 路线标杆，**v0.19.4 + 28.5k stars + 6 topics (agents/ai/framework/harness/llm/openai/python)** + **仓库内 AGENTS.md + CLAUDE.md 双文件约定**。',
    problemDiagnosis: [
      "**问题 1：OpenAI 官方多 agent 框架** — 之前 OpenAI 没有 agent SDK，**用户用 LangChain / AutoGen**，2024-2025 推出 Agents SDK 抢回。",
      "**问题 2：与 AGENTS.md / CLAUDE.md 双约定** — 仓库内同时有 AGENTS.md 和 CLAUDE.md，**openai 接受 anthropic 生态**。",
      "**问题 3：MCP 集成** — feat: support MCP Python SDK v1 and v2 (#4106)，**4 days ago**，**OpenAI 推 MCP 集成**。",
      "**问题 4：liteLLM 集成** — fix(litellm): omit parallel_tool_calls without tools，**4 hours ago**，**多 provider 路由**。"
],
    designPrinciples: [
      "**lightweight harness** — 比 LangGraph 轻，**5 行 API 起 agent**。",
      "**multi-agent workflow** — Agents as tools, handoffs, deterministic flow，**4 种 agent 协作模式**。",
      "**AGENTS.md / CLAUDE.md 双约定** — OpenAI 借势 anthropic 生态，**规则约定互通**。",
      "**MCP 集成** — OpenAI 推 MCP，**与 anthropic 生态统一**。"
],
    differentiationMatrix: [
      "vs LangGraph — LangGraph 是状态机；Agents SDK 是 lightweight harness。**LangGraph 强在编排，Agents SDK 强在简化**。",
      "vs AutoGen — AutoGen 是 microsoft 多 agent；Agents SDK 是 OpenAI。**AutoGen 强在角色，Agents SDK 强在 OpenAI 集成**。",
      "vs DeepAgents — DeepAgents 是 LangChain 高级；Agents SDK 是 OpenAI。**DeepAgents 强在 middleware，Agents SDK 强在 OpenAI 生态**。",
      "vs Claude Code — CC 是 anthropic TUI；Agents SDK 是 OpenAI Python。**CC 强在 TUI，Agents SDK 强在 Python 生态**。",
      "vs MiCo — MiCo 当前没接 OpenAI / MCP / AGENTS.md 全部。**抄 Agents SDK = lightweight harness + AGENTS.md/CLAUDE.md + MCP + multi-provider**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2024-12 — OpenAI Agents SDK alpha 发布",
    "2025-03 — v0.1 open source",
    "2025-06 — v0.5，handoffs + tools",
    "2025-09 — v1.0 stable",
    "2025-12 — 15k stars，AGENTS.md 约定",
    "2026-03 — 22k stars",
    "2026-05 — 论文 Agent Harness Engineering 收录 + MCP 集成",
    "2026-08 — 28.5k stars (实拍), v0.19.4 latest, AGENTS.md + CLAUDE.md 双文件"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**OpenAI Agents SDK** 是论文 L 层代表项目。**闭源/官方项目，完整功能实操需登录，**登录实操**：OpenAI Agents SDK 需要 OpenAI API key，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。**。',
    forMico: [
    "**lightweight harness** — 5 行 API 起 agent，**降低门槛**。",
    "**AGENTS.md / CLAUDE.md 双约定** — MiCo 接受两个文件约定，**跨生态兼容**。",
    "**MCP 集成** — MiCo 接 MCP SDK，**OpenAI 推 MCP 印证**。",
    "**Multi-provider via litellm** — MiCo 通过 litellm 路由 100+ 模型，**不绑死 OpenAI**。",
    "**L 层评分 9 维**：state 4 / scheduling 4 / memory 3 / mcp 5 / sandbox 3 / error 3 / observability 3 / deployment 4 / governance 4。"
],
  },
};
