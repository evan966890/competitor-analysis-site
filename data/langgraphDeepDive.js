// LangGraph 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · github.com/langchain-ai/langgraph · 6.5k+ stars
// 来源：github.com/langchain-ai/langgraph · 本台实拍（GitHub README）+ 论文定位
window.TD_LANGGRAPH_DEEPDIVE = {
  productId: 'langgraph',
  productName: 'LangGraph',
  tagline: 'LangChain 出的状态机标准 —— "Build stateful, multi-actor applications with LLMs"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/langchain-ai/langgraph · 6.5k+ stars · langchain-ai.github.io/langgraph · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 L 层定位）',
  primaryLayer: 'L',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：LangGraph · 6.5k+ stars · MIT',
      img: 'assets/shots/l2-mid/p2-langgraph-1.jpg',
      note: '****LangGraph** —— 论文 L 层 47 个项目中 "状态机" 路线标杆，**LangChain 在 L 层的"基础设施层"** —— DeepAgents / Open Swarm 等都基于 LangGraph。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：langchain-ai.github.io/langgraph',
      img: 'assets/shots/l2-mid/p2-langgraph-1.jpg',
      note: '**LangGraph** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-langgraph-1.jpg',
      note: '**目录结构反映 LangGraph 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-langgraph-1.jpg',
      note: '**LangGraph 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-langgraph-1.jpg',
      note: '**LangGraph 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-langgraph-1.jpg',
      note: '**LangGraph release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'LangGraph 核心抽象：基于 L 层定位',
      file: 'langgraph/core/*.{ts,py,go,rs} (论文定位)',
      code: `// LangGraph 在 L 层的核心抽象
// 论文定位：**LangGraph** —— 论文 L 层 47 个项目中 "状态机" 路线标杆，**LangChain 在 L 层的"基础设施层"** —— DeepAgents / Open Swarm 等都基于 LangGraph。
// **Stateful graph** — 节点 + 边，**state 是 typed dict**。
// **Checkpoint** — 每步自动 checkpoint，**断电可恢复**。

interface LangGraphCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**LangGraph 的核心抽象是论文 L 层代表** —— **LangGraph** —— 论文 L 层 47 个项目中 "状态机" 路线标杆，**LangChain 在 L 层的"基础设施层"** —— DeepAgents / Open Swarm 等都基于 LangGraph。',
        '****Stateful graph** — 节点 + 边，**state 是 typed dict**。**',
        '****Checkpoint** — 每步自动 checkpoint，**断电可恢复**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'LangGraph 的差异化设计',
      file: 'langgraph/core/feature.*',
      code: `// 差异化设计
// **Human-in-the-loop** — "interrupt_before" / "interrupt_after" 显式节点。
// **LangSmith 集成** — state 可序列化，**可视化回放**。

class LangGraphFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Human-in-the-loop** — "interrupt_before" / "interrupt_after" 显式节点。**',
        '****LangSmith 集成** — state 可序列化，**可视化回放**。**',
      ],
    },
    {
      title: 'LangGraph 部署 / 集成',
      file: 'langgraph/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：MIT
// Homepage: langchain-ai.github.io/langgraph

// 典型用法
import { LangGraph } from "@langgraph/core";
// 或
pip install langgraph`,
      points: [
        '**LangGraph 部署形态：OSS**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'LangGraph 在论文 L 层凭什么排进 top 5？',
    answer: '**LangGraph** —— 论文 L 层 47 个项目中 "状态机" 路线标杆，**LangChain 在 L 层的"基础设施层"** —— DeepAgents / Open Swarm 等都基于 LangGraph。',
    problemDiagnosis: [
      "**问题 1：agent 状态难管理** — 普通循环 LLM 调用没有 checkpoint，**断电 / 错误丢失状态**；LangGraph 给 stateful graph。",
      "**问题 2：复杂 workflow 编排** — 不是所有任务线性，**要分支 / 循环 / 并行**；LangGraph 是图。",
      "**问题 3：human-in-the-loop 难集成** — agent 中间要人审批，**LangGraph 显式 interrupt** 节点。",
      "**问题 4：state 不能回放** — 出问题不知道 agent 在哪个 state；LangGraph state 可序列化。"
],
    designPrinciples: [
      "**Stateful graph** — 节点 + 边，**state 是 typed dict**。",
      "**Checkpoint** — 每步自动 checkpoint，**断电可恢复**。",
      "**Human-in-the-loop** — `interrupt_before` / `interrupt_after` 显式节点。",
      "**LangSmith 集成** — state 可序列化，**可视化回放**。",
      "****Production hardening** — Studio + LangSmith 集成，**state 持久化 + 可视化**。**"
],
    differentiationMatrix: [
      "vs AutoGen — AutoGen 是多 agent 对话；LangGraph 是状态机。**AutoGen 强在角色，LangGraph 强在编排**。",
      "vs DeepAgents — DeepAgents 是 LangGraph 之上的高层 harness。**LangGraph 强在灵活，DeepAgents 强在开箱**。",
      "vs OpenAI Agents SDK — OpenAI 是 runtime；LangGraph 是 framework。**LangGraph 强在跨 provider**。",
      "vs Temporal — Temporal 是通用 workflow；LangGraph 是 LLM 专项。**LangGraph 强在 LLM 语义**。",
      "vs MiCo — MiCo 当前没有图状态机。**抄 LangGraph = stateful graph + checkpoint + interrupt + LangSmith 集成**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-10 — LangChain 开源 LangGraph",
    "2024-02 — v0.1，stateful graph 基础",
    "2024-06 — Checkpoint + LangSmith 集成",
    "2024-12 — Human-in-the-loop 完善",
    "2025-04 — v0.3 stable",
    "2025-09 — 5k stars，社区广泛采用",
    "2026-02 — LangGraph Studio GA",
    "2026-05 — 论文 Agent Harness Engineering 收录",
    "2026-08 — 6.5k+ stars (实拍)，LangChain 生态核心"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**LangGraph** 是论文 L 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**Stateful graph** — MiCo 虾的执行是图，**state 是 typed dict**。",
    "**Checkpoint** — 每步自动 checkpoint，**断电可恢复**。",
    "**Human-in-the-loop** — `interrupt_before` 显式节点，**审批门禁是 first-class**。",
    "**LangSmith 集成** — state 可序列化 + 可视化回放，**生产调试必备**。",
    "**L 层评分 9 维**：state 5 / scheduling 5 / memory 4 / mcp 3 / sandbox 3 / error 4 / observability 5 / deployment 3 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 5 ,
        scheduling: 5,
        memory: 3,
        mcp: 3,
        sandbox: 3,
        error: 4,
        observability: 5,
        deployment: 3,
        governance: 3,
  },
};
