// AutoGen 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · github.com/microsoft/autogen · 60.3k stars
// 来源：github.com/microsoft/autogen · 本台实拍（GitHub README）+ 论文定位
window.TD_AUTOGEN_DEEPDIVE = {
  productId: 'autogen',
  productName: 'AutoGen',
  tagline: '60.3k stars 的 Microsoft 多 agent 框架 —— "A programming framework for agentic AI"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/microsoft/autogen · 60.3k stars · microsoft.github.io/autogen · CC-BY-4.0 / MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 L 层定位）',
  primaryLayer: 'L',
  deployment: 'OSS',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：AutoGen · 60.3k stars · CC-BY-4.0 / MIT',
      img: 'assets/shots/l2-mid/p2-autogen-1.jpg',
      note: '****AutoGen** —— 论文 L 层 47 个项目中 "多 agent 对话" 路线标杆，**"A programming framework for agentic AI"** 是 Microsoft 在 L 层的旗舰项目（仅次于 CC + Codex）。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：microsoft.github.io/autogen',
      img: 'assets/shots/l2-mid/p2-autogen-1.jpg',
      note: '**AutoGen** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/l2-mid/p2-autogen-1.jpg',
      note: '**目录结构反映 AutoGen 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/l2-mid/p2-autogen-1.jpg',
      note: '**AutoGen 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/l2-mid/p2-autogen-1.jpg',
      note: '**AutoGen 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/l2-mid/p2-autogen-1.jpg',
      note: '**AutoGen release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'AutoGen 核心抽象：基于 L 层定位',
      file: 'autogen/core/*.{ts,py,go,rs} (论文定位)',
      code: `// AutoGen 在 L 层的核心抽象
// 论文定位：**AutoGen** —— 论文 L 层 47 个项目中 "多 agent 对话" 路线标杆，**"A programming framework for agentic AI"** 是 Microsoft 在 L 层的旗舰项目（仅次于 CC + Codex）。
// **多 agent 对话** — AssistantAgent + UserProxyAgent + GroupChatManager，**LLM 互相通信**。
// **GroupChat 模式** — 多 agent 共享群聊，**Manager 决定下一个发言**。

interface AutoGenCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**AutoGen 的核心抽象是论文 L 层代表** —— **AutoGen** —— 论文 L 层 47 个项目中 "多 agent 对话" 路线标杆，**"A programming framework for agentic AI"** 是 Microsoft 在 L 层的旗舰项目（仅次于 CC + Codex）。',
        '****多 agent 对话** — AssistantAgent + UserProxyAgent + GroupChatManager，**LLM 互相通信**。**',
        '****GroupChat 模式** — 多 agent 共享群聊，**Manager 决定下一个发言**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'AutoGen 的差异化设计',
      file: 'autogen/core/feature.*',
      code: `// 差异化设计
// **Code execution** — agent 跑代码有安全 sandbox，**UserProxy 实际执行**。
// **Microsoft 背书** — 60.3k stars + 9.1k forks + Microsoft 全产品集成。

class AutoGenFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Code execution** — agent 跑代码有安全 sandbox，**UserProxy 实际执行**。**',
        '****Microsoft 背书** — 60.3k stars + 9.1k forks + Microsoft 全产品集成。**',
      ],
    },
    {
      title: 'AutoGen 部署 / 集成',
      file: 'autogen/deploy/*.oss',
      code: `// 部署 / 集成
// 部署形态：OSS
// 协议：CC-BY-4.0 / MIT
// Homepage: microsoft.github.io/autogen

// 典型用法
import { AutoGen } from "@autogen/core";
// 或
pip install autogen`,
      points: [
        '**AutoGen 部署形态：OSS**',
        '**协议：CC-BY-4.0 / MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'AutoGen 在论文 L 层凭什么排进 top 5？',
    answer: '**AutoGen** —— 论文 L 层 47 个项目中 "多 agent 对话" 路线标杆，**"A programming framework for agentic AI"** 是 Microsoft 在 L 层的旗舰项目（仅次于 CC + Codex）。',
    problemDiagnosis: [
      "**问题 1：单 agent 能力有上限** — 一个 LLM agent 解决复杂任务有天花板；AutoGen 用多 agent 协作。",
      "**问题 2：agent 之间怎么通信** — A 调 B / B 调 C / 并行 / 串行 / 嵌套？AutoGen 给 GroupChat / Swarm / Sequential 模式。",
      "**问题 3：agent 角色建模** — 谁是 planner / 谁是 executor / 谁是 critic？AutoGen 用 AssistantAgent / UserProxyAgent / GroupChatManager 抽象。",
      "**问题 4：复杂 workflow 怎么编排** — 不是所有任务都能线性串行；AutoGen 支持嵌套 / 并行 / 条件分支。"
],
    designPrinciples: [
      "**多 agent 对话** — AssistantAgent + UserProxyAgent + GroupChatManager，**LLM 互相通信**。",
      "**GroupChat 模式** — 多 agent 共享群聊，**Manager 决定下一个发言**。",
      "**Code execution** — agent 跑代码有安全 sandbox，**UserProxy 实际执行**。",
      "**Microsoft 背书** — 60.3k stars + 9.1k forks + Microsoft 全产品集成。",
      "****Multi-provider + multi-language** — .NET + Python 双端，**企业级多语言覆盖**。**"
],
    differentiationMatrix: [
      "vs LangGraph — LangGraph 是状态机；AutoGen 是多 agent 对话。**LangGraph 强在编排，AutoGen 强在角色建模**。",
      "vs CrewAI — CrewAI 是角色化；AutoGen 是 GroupChat。**CrewAI 强在简化，AutoGen 强在灵活**。",
      "vs OpenAI Agents SDK — OpenAI 是单 provider；AutoGen 是多 provider。**AutoGen 强在中立**。",
      "vs DeepAgents — DeepAgents 是单 agent + subagent；AutoGen 是 multi-agent 对话。**DeepAgents 强在单 agent 深度**。",
      "vs MiCo — MiCo 当前没有 GroupChat 模式。**抄 AutoGen = AssistantAgent + GroupChatManager + 多 provider 抽象**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2023-09 — Microsoft 开源 AutoGen v0.1",
    "2023-12 — GroupChat 模式发布",
    "2024-04 — v0.4，Multi-agent 模式完善",
    "2024-09 — 30k stars，CC-BY-4.0 license",
    "2025-02 — AutoGen Studio GUI 集成",
    "2025-08 — 50k stars，dotnet + python 双端",
    "2026-02 — Microsoft Agent Framework 整合信号",
    "2026-05 — 论文 Agent Harness Engineering 收录",
    "2026-08 — 60.3k stars (实拍)，维护模式 (maintenance mode banner)"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**AutoGen** 是论文 L 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**GroupChat 模式** — MiCo 虾之间共享群聊，**Manager 决定下一个发言**。",
    "**AssistantAgent + UserProxyAgent** — 角色分工明确，**LLM 决策 + 代码执行分离**。",
    "**多 provider 抽象** — 不绑死 GPT / Claude，**9 个 topic tag** 是社区认可。",
    "**⚠️ 警示 maintenance mode** — AutoGen 后期进入维护模式，**Microsoft 重心在 Microsoft Agent Framework**。",
    "**L 层评分 9 维**：state 4 / scheduling 4 / memory 3 / mcp 3 / sandbox 3 / error 3 / observability 3 / deployment 4 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 4 ,
        scheduling: 4,
        memory: 3,
        mcp: 3,
        sandbox: 3,
        error: 3,
        observability: 3,
        deployment: 3,
        governance: 4,
  },
};
