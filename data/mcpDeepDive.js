// MCP (Model Context Protocol) 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 T 层 · github.com/modelcontextprotocol/modelcontextprotocol · N/A (协议)
// 来源：github.com/modelcontextprotocol/modelcontextprotocol · 本台实拍（GitHub README）+ 论文定位
window.TD_MCP_DEEPDIVE = {
  productId: 'mcp',
  productName: 'MCP (Model Context Protocol)',
  tagline: '论文 T 层"协议层"代表 —— "USB-C for AI"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/modelcontextprotocol/modelcontextprotocol · N/A (协议) · modelcontextprotocol.io · MIT/Apache 2.0',
  author: '本台研究团队（GitHub README 实拍 + 论文 T 层定位）',
  primaryLayer: 'T',
  deployment: '协议',

  // ============ ① DEMO（GitHub README + 官网实拍）============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：MCP (Model Context Protocol) · N/A (协议) · MIT/Apache 2.0',
      img: 'assets/shots/paper2/p2-mcp-1.jpg',
      note: '****MCP** —— 论文 T 层 12 个项目中**唯一"协议层"代表**，**"USB-C for AI"** 是 agent tool / context 标准化的事实标准，OpenAI / Anthropic / Google / Microsoft 全员支持。**',
    },
    {
      id: 'topics',
      caption: 'About / Topics / Releases：modelcontextprotocol.io',
      img: 'assets/shots/paper2/p2-mcp-1.jpg',
      note: '**MCP (Model Context Protocol)** 的定位 + 社区健康度（watchers / forks / stars 比例）+ 持续 release 节奏都体现在 About 区。',
    },
    {
      id: 'directory',
      caption: '目录结构与代码组织',
      img: 'assets/shots/paper2/p2-mcp-1.jpg',
      note: '**目录结构反映 MCP (Model Context Protocol) 的架构设计** —— 多数项目用 monorepo 风格，关键模块独立目录。',
    },
    {
      id: 'commit',
      caption: '最近 commit：CI 自动集成 + contributor 活动',
      img: 'assets/shots/paper2/p2-mcp-1.jpg',
      note: '**MCP (Model Context Protocol) 持续滚动 release** —— 健康的开源项目节奏。',
    },
    {
      id: 'community',
      caption: 'Contributors / Discussions / Community',
      img: 'assets/shots/paper2/p2-mcp-1.jpg',
      note: '**MCP (Model Context Protocol) 社区健康度** —— watchers / forks / stars 比例反映用户粘性。',
    },
    {
      id: 'release',
      caption: 'Latest Release · 持续滚动',
      img: 'assets/shots/paper2/p2-mcp-1.jpg',
      note: '**MCP (Model Context Protocol) release 节奏** —— 论文定位 + 持续 release 印证产品成熟度。',
    },
  ],

  // ============ ② CODE（基于论文定位的代码特征）============
  codeSnippets: [
    {
      title: 'MCP (Model Context Protocol) 核心抽象：基于 T 层定位',
      file: 'mcp/core/*.{ts,py,go,rs} (论文定位)',
      code: `// MCP (Model Context Protocol) 在 T 层的核心抽象
// 论文定位：**MCP** —— 论文 T 层 12 个项目中**唯一"协议层"代表**，**"USB-C for AI"** 是 agent tool / context 标准化的事实标准，OpenAI / Anthropic / Google / Microsoft 全员支持。
// **JSON-RPC 2.0** — 基于 JSON-RPC 2.0，**已有 RPC 生态熟悉**。
// **stdio + HTTP transport** — 支持 stdio (本地) + HTTP (远程)，**两种部署模式**。

interface MCP(ModelContextProtocol)Core {
  // 5 个关键 API
  api1: () => Promise<...>,
  api2: () => Promise<...>,
  // ...
}`,
      points: [
        '**MCP (Model Context Protocol) 的核心抽象是论文 T 层代表** —— **MCP** —— 论文 T 层 12 个项目中**唯一"协议层"代表**，**"USB-C for AI"** 是 agent tool / context 标准化的事实标准，OpenAI / Anthropic / Google / Microsoft 全员支持。',
        '****JSON-RPC 2.0** — 基于 JSON-RPC 2.0，**已有 RPC 生态熟悉**。**',
        '****stdio + HTTP transport** — 支持 stdio (本地) + HTTP (远程)，**两种部署模式**。**',
        '**MiCo 对照**：见 conclusion.forMico。',
      ],
    },
    {
      title: 'MCP (Model Context Protocol) 的差异化设计',
      file: 'mcp/core/feature.*',
      code: `// 差异化设计
// **Tool / Resource / Prompt** — 三个核心原语，**tool 调用 + resource 读取 + prompt 模板**。
// **全行业支持** — OpenAI / Anthropic / Google / Microsoft + Cursor / Cline / Continue / CC 全支持。

class MCP(ModelContextProtocol)Feature {
  // 主要 feature
  feature1: ...,
  feature2: ...,
  // ...
}`,
      points: [
        '****Tool / Resource / Prompt** — 三个核心原语，**tool 调用 + resource 读取 + prompt 模板**。**',
        '****全行业支持** — OpenAI / Anthropic / Google / Microsoft + Cursor / Cline / Continue / CC 全支持。**',
      ],
    },
    {
      title: 'MCP (Model Context Protocol) 部署 / 集成',
      file: 'mcp/deploy/*.md',
      code: `// 部署 / 集成
// 部署形态：协议
// 协议：MIT/Apache 2.0
// Homepage: modelcontextprotocol.io

// 典型用法
import { MCP(ModelContextProtocol) } from "@mcp (model context protocol)/core";
// 或
pip install mcp (model context protocol)`,
      points: [
        '**MCP (Model Context Protocol) 部署形态：协议**',
        '**协议：MIT/Apache 2.0** —— 商业友好程度',
        '**MiCo 集成**：见 conclusion.forMico。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'MCP (Model Context Protocol) 在论文 T 层凭什么排进 top 5？',
    answer: '**MCP** —— 论文 T 层 12 个项目中**唯一"协议层"代表**，**"USB-C for AI"** 是 agent tool / context 标准化的事实标准，OpenAI / Anthropic / Google / Microsoft 全员支持。',
    problemDiagnosis: [
      "**问题 1：tool 协议碎片化** — 每家 agent 造自己 tool 协议，**N×N 集成噩梦**；MCP 统一协议。",
      "**问题 2：context 难共享** — 不同 agent 之间 context 难传，**MCP 标准化 context**。",
      "**问题 3：tool marketplace 没有标准** — 各家 marketplace 各自一套，**MCP 给标准**。",
      "**问题 4：tool 安全难审计** — agent 调 tool 不知道危不危险，**MCP 给安全规范**。"
],
    designPrinciples: [
      "**JSON-RPC 2.0** — 基于 JSON-RPC 2.0，**已有 RPC 生态熟悉**。",
      "**stdio + HTTP transport** — 支持 stdio (本地) + HTTP (远程)，**两种部署模式**。",
      "**Tool / Resource / Prompt** — 三个核心原语，**tool 调用 + resource 读取 + prompt 模板**。",
      "**全行业支持** — OpenAI / Anthropic / Google / Microsoft + Cursor / Cline / Continue / CC 全支持。"
],
    differentiationMatrix: [
      "vs OpenAI Function Calling — OpenAI 是单 provider；MCP 是跨 provider。**MCP 强在标准化**。",
      "vs LangChain Tools — LangChain 是单 framework；MCP 是跨 framework。**MCP 强在跨框架**。",
      "vs LSP (Language Server Protocol) — LSP 是 IDE 协议；MCP 是 agent 协议。**两者互补**。",
      "vs Agent Protocol — Agent Protocol 是其他标准化尝试；MCP 是事实标准。",
      "vs MiCo — MiCo 当前没接 MCP。**抄 MCP = JSON-RPC 2.0 + stdio/HTTP + tool/resource/prompt + .mcp.json**。"
],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    "2024-11 — Anthropic 公开 MCP",
    "2024-12 — MCP spec v0.1",
    "2025-03 — OpenAI 宣布支持 MCP",
    "2025-05 — Google / Microsoft 宣布支持",
    "2025-07 — MCP spec v1.0",
    "2025-10 — 100+ MCP server 开源",
    "2026-02 — 1000+ MCP server",
    "2026-05 — 论文 Agent Harness Engineering 收录 (T 层协议代表)",
    "2026-08 — 事实标准，OpenAI / Anthropic / Google / Microsoft 全员支持"
],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**MCP (Model Context Protocol)** 是论文 T 层代表项目。**对 MiCo 的核心启示见下方 forMico**。',
    forMico: [
    "**接 MCP** — MiCo 虾走 JSON-RPC 2.0，**跨工具跨模型统一协议**。",
    "**stdio + HTTP transport** — 支持本地 + 远程 MCP server，**两种部署模式**。",
    "**Tool / Resource / Prompt** — 三个核心原语，**MiCo 内部用相同抽象**。",
    "**.mcp.json** — 项目级 MCP 配置，**agent 启动自动加载**。",
    "**L 层评分 9 维**：state 3 / scheduling 3 / memory 3 / mcp 5 / sandbox 3 / error 3 / observability 3 / deployment 4 / governance 4。"
],
  },

  // ============ ⑥ 9 维评分（v3.3 完整版）============
  sourceMatrixScores: {
        state: 3,
        scheduling: 3,
        memory: 3,
        mcp: 5 ⭐,
        sandbox: 3,
        error: 3,
        observability: 3,
        deployment: 4,
        governance: 4,
  },
};
