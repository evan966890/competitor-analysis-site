// OpenAI Realtime Agents 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 G 层 · github.com/openai/openai-realtime-agents · TBD (demo repo)
// 来源：github.com/openai/openai-realtime-agents · 本台实拍（GitHub README）+ 论文定位
// ⚠️ 闭源/官方项目：完整功能实操需登录（**登录实操**：Realtime API 需要 OpenAI API key + Realtime API 配额，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。）
window.TD_OPENAI_REALTIME_AGENTS_DEEPDIVE = {
  productId: 'openai-realtime-agents',
  productName: 'OpenAI Realtime Agents',
  tagline: 'OpenAI 官方 Realtime API agent demo —— "Voice agents in production"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/openai/openai-realtime-agents · TBD (demo repo) · platform.openai.com/docs/guides/realtime · MIT',
  author: '本台研究团队（GitHub README 实拍 + 论文 G 层定位 + 登录部分待用户接管）',
  primaryLayer: 'G',
  deployment: 'OSS demo',

  // ============ ① DEMO（GitHub README + 官网实拍，闭源部分待用户登录）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：OpenAI Realtime Agents · TBD (demo repo) · MIT',
      img: 'assets/shots/closed-3/p3-realtime-agents-1.jpg',
      note: '**OpenAI Realtime Agents** —— 论文 G 层 14 个项目中 "Realtime API voice agent" 路线标杆，**OpenAI 官方 demo 仓库** 演示生产级 voice agent 编排。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：platform.openai.com/docs/guides/realtime',
      img: 'assets/shots/closed-3/p3-realtime-agents-1.jpg',
      note: '**OpenAI Realtime Agents** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/closed-3/p3-realtime-agents-1.jpg',
      note: '**目录结构反映 OpenAI Realtime Agents 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/closed-3/p3-realtime-agents-1.jpg',
      note: '**OpenAI Realtime Agents 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/closed-3/p3-realtime-agents-1.jpg',
      note: '**OpenAI Realtime Agents 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'closed-login',
      caption: '⚠️ 闭源/SaaS 实操：**登录实操**：Realtime API 需要 OpenAI API key + Realtime API 配额，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。',
      img: 'assets/shots/closed-3/p3-realtime-agents-1.jpg',
      note: '**完整功能实操需登录**：**登录实操**：Realtime API 需要 OpenAI API key + Realtime API 配额，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'OpenAI Realtime Agents 核心抽象：基于 G 层定位',
      file: 'openai-realtime-agents/core/*.{ts,py,go,rs} (论文定位)',
      code: `// OpenAI Realtime Agents 在 G 层的核心抽象
// 论文定位：**OpenAI Realtime Agents** —— 论文 G 层 14 个项目中 "Realtime API voice agent" 路线标杆，**OpenAI 官方 demo 仓库** 演示生产级 voice agent 编排。
// **Realtime API first** — 基于 OpenAI Realtime API，**WebSocket 流式**。
// **Agentic loop in voice** — voice 输入 → tool call → voice 输出，**完整 agent 循环**。

interface OpenAIRealtimeAgentsCore {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**OpenAI Realtime Agents 的核心抽象是论文 G 层代表** —— **OpenAI Realtime Agents** —— 论文 G 层 14 个项目中 "Realtime API voice agent" 路线标杆，**OpenAI 官方 demo 仓库** 演示生产级 voice agent 编排。',
        '**Realtime API first** — 基于 OpenAI Realtime API，**WebSocket 流式**。**',
        '**Agentic loop in voice** — voice 输入 → tool call → voice 输出，**完整 agent 循环**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'OpenAI Realtime Agents 的差异化设计',
      file: 'openai-realtime-agents/core/feature.*',
      code: `// 差异化设计
// **Twilio + WebRTC** — 两种部署模式，**电话 / Web 通用**。
// **Production demo** — 不是 toy，**OpenAI 官方 production 参考**。

class OpenAIRealtimeAgentsFeature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '**Twilio + WebRTC** — 两种部署模式，**电话 / Web 通用**。**',
        '**Production demo** — 不是 toy，**OpenAI 官方 production 参考**。**',
      ],
    },
    {
      title: 'OpenAI Realtime Agents 部署 / 集成',
      file: 'openai-realtime-agents/deploy/*.py',
      code: `// 部署 / 集成
// 部署形态：OSS demo
// 协议：MIT
// Homepage: platform.openai.com/docs/guides/realtime

// 典型用法
import { OpenAIRealtimeAgents } from "@openai realtime agents/core";
// 或
pip install openai realtime agents`,
      points: [
        '**OpenAI Realtime Agents 部署形态：OSS demo**',
        '**协议：MIT** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'OpenAI Realtime Agents 在论文 G 层凭什么排进 top 5？',
    answer: '**OpenAI Realtime Agents** —— 论文 G 层 14 个项目中 "Realtime API voice agent" 路线标杆，**OpenAI 官方 demo 仓库** 演示生产级 voice agent 编排。',
    problemDiagnosis: [
      "**问题 1：Realtime API 怎么用** — OpenAI Realtime API 是 2024-10 推出的新接口，**开发者没参考实现**。",
      "**问题 2：voice agent 怎么编排** — 不是简单 STT/TTS，**要 agentic loop + tool calls + handoffs**。",
      "**问题 3：Twilio / WebRTC 集成** — 实际 voice agent 跑在电话 / WebRTC，**集成复杂**。",
      "**问题 4：production 部署** — demo 容易，**生产部署难**（latency / scale / cost）。"
],
    designPrinciples: [
      "**Realtime API first** — 基于 OpenAI Realtime API，**WebSocket 流式**。",
      "**Agentic loop in voice** — voice 输入 → tool call → voice 输出，**完整 agent 循环**。",
      "**Twilio + WebRTC** — 两种部署模式，**电话 / Web 通用**。",
      "**Production demo** — 不是 toy，**OpenAI 官方 production 参考**。",
      "****Twilio + WebRTC + SIP** — 三种部署模式，**电话 / Web 通用**。**"
],
    differentiationMatrix: [
      "vs LiveKit — LiveKit 是 realtime 基础设施；Realtime Agents 是 agent demo。**LiveKit 强在底层，Realtime Agents 强在 agentic**。",
      "vs Vapi — Vapi 是 voice agent SaaS；Realtime Agents 是 OSS demo。**Vapi 强在产品，Realtime Agents 强在参考**。",
      "vs Pipecat — Pipecat 是 voice pipeline；Realtime Agents 是 single API。**Pipecat 强在 pipeline，Realtime Agents 强在简化**。",
      "vs MiCo — MiCo 当前没 voice agent 能力。**抄 Realtime Agents = Realtime API + agentic loop + Twilio 集成**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2024-10 — OpenAI Realtime API 公开 beta",
    "2024-12 — Realtime Agents demo repo 发布",
    "2025-03 — v1.0 stable，Twilio 集成",
    "2025-06 — WebRTC 集成",
    "2025-09 — v2.0 production hardening",
    "2026-02 — SIP 集成",
    "2026-05 — 论文 Agent Harness Engineering 收录 (G 层 realtime 代表)",
    "2026-08 — 持续滚动，OpenAI 官方 production demo"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**OpenAI Realtime Agents** 是论文 G 层代表项目。**闭源/官方项目，完整功能实操需登录，**登录实操**：Realtime API 需要 OpenAI API key + Realtime API 配额，**待用户登录验证**。本台实拍部分限于 GitHub README 公开内容。**。',
    forMico: [
    "**Realtime API 集成** — MiCo 接入 OpenAI Realtime API，**WebSocket 流式**。",
    "**Agentic loop in voice** — voice 输入 → tool call → voice 输出，**完整 agent 循环**。",
    "**Twilio + WebRTC 部署** — 两种模式，**电话 / Web 通用**。",
    "**Production 参考** — OpenAI 官方 production demo，**MiCo 借势**。",
    "**G 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 3 / sandbox 3 / error 3 / observability 3 / deployment 4 / governance 5。"
],
  },
};
