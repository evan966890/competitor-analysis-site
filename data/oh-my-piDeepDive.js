// Oh My Pi 完整深度评测（真实安装 + MiMo 同题实测 · 2026-08-13）
window.TD_OH_MY_PI_DEEPDIVE = {
  productId: 'oh-my-pi',
  productName: 'Oh My Pi (OMP)',
  tagline: '把 IDE、原生工具、子代理与可导出的会话压进一个 coding-agent surface',
  dateAdded: '2026-08-13',
  isRealScreenshot: true,
  source: 'github.com/can1357/oh-my-pi @ 326d24bd · omp 17.3.0 · 本台 MiMo 实测与 session export',
  author: '本台研究团队（源码 + 本机真实运行 + 固定题对照）',
  primaryLayer: 'L',
  deployment: 'OSS / local',

  demoShots: [
    {
      id: 'session-tools',
      caption: '真实 session：Mify / MiMo V2.5 Pro、工具轨迹与 token 统计',
      img: 'assets/shots/oh-my-pi/01-live-session-model-tools.jpg',
      note: '**不是官网宣传图**：由本次真实 OMP session 导出。页面绑定模型 `mify/xiaomi/mimo-v2.5-pro`，展示 7 次工具调用，以及非缓存输入、缓存读取、输出 token。',
    },
    {
      id: 'arch-diagram',
      caption: '架构图（基于源码包结构推断）',
      img: 'assets/shots/oh-my-pi/02-arch-diagram.svg',
      note: '**OMP 核心包结构**：`coding-agent` / `coding-cli` / `lsp-client` / `mcp-server` / `router` —— 编辑器绑定通过 LSP/DAP 适配层（VSCode/Neovim/Zed），模型适配走统一 `ModelManager` 抽象。',
      evidence: 'arch-inferred',
    },
    {
      id: 'cli-usage',
      caption: 'CLI 启动 / 命令格式',
      img: 'assets/shots/oh-my-pi/03-cli-usage.svg',
      note: '**OMP CLI**：`omp chat` 启会话 / `omp eval` 跑固定题 / `omp export <session>` 导出可复核 .jsonl。**session 模型绑定**：`mify/xiaomi/mimo-v2.5-pro`（实测）。',
      evidence: 'cli-inferred',
    },
    {
      id: 'eval-result',
      caption: '固定题结果：同一生产代码补丁，npm test 2/2',
      img: 'assets/shots/oh-my-pi/04-live-eval-result.jpg',
      note: 'OMP 先读实现与测试，再修改 `summarizeOrders.mjs` 并运行测试。最终只改生产代码，2 个测试全部通过；独立复核也为 2/2。',
    },
  ],
  ],

  codeSnippets: [
    {
      title: '模型自适应编辑：Hashline 默认开启，但 MiMo 自动回退 replace',
      file: 'packages/coding-agent/src/utils/edit-mode.ts @ 326d24bd',
      code: `export const DEFAULT_EDIT_MODE: EditMode = "hashline";

const HASHLINE_EXCLUDED_MODEL_MODES = [
  { pattern: "kimi", mode: "replace" },
  { pattern: "mimo", mode: "replace" },
  { pattern: "deepseek-v4-flash", mode: "replace" },
];`,
      points: [
        '**工具协议按模型适配**，不是要求所有模型学习同一种 patch 方言。',
        '本次 MiMo 运行实际走 replace edit，避免把 Hashline 的宣传优势错误归因到这次结果。',
        '对 MiCo：模型路由不只选 endpoint，也应携带最适合该模型的工具协议与 edit dialect。',
      ],
    },
    {
      title: 'OpenAI-compatible 自定义 provider：Mify 不需要改 OMP 源码',
      file: '~/.omp/profiles/competitor-eval/agent/models.yml（密钥已脱敏）',
      code: `providers:
  mify:
    baseUrl: https://api.llm.mioffice.cn/v1
    api: openai-completions
    apiKey: "!read-from-existing-secret-file"
    models:
      - id: xiaomi/mimo-v2.5-pro
        contextWindow: 1048576
        maxTokens: 131072`,
      points: [
        '**Provider extension 是配置面**：安装完成后即可接 Mify/MiMo。',
        '独立 profile 避免污染 OMP 的默认全局模型选择。',
        '密钥没有落到评测仓库，也没有复制出第二份明文。',
      ],
    },
    {
      title: '固定题补丁：移除逐行取整，并提供稳定降序 tie-break',
      file: 'evaluations/2026-08-13-oh-my-pi-deepseek-harness/fixture/summarizeOrders.mjs',
      code: `const previous = totalsByCustomer.get(order.customer) ?? 0;
totalsByCustomer.set(order.customer, previous + order.amount);

return [...totalsByCustomer.entries()]
  .map(([customer, total]) => ({ customer, total }))
  .sort((left, right) => right.total - left.total
    || left.customer.localeCompare(right.customer));`,
      points: [
        'OMP 与 DSH 最终补丁一致，功能正确性没有分出胜负。',
        'OMP 已保存的 agent session 在本次单样本用时 **25.16 秒**，6 个模型步骤、7 次工具调用；该数字不含 CLI 冷启动。',
        '会话原文和自包含 HTML 都已随评测工件保存。',
      ],
    },
  ],

  philosophy: {
    coreQuestion: '如何把“模型会写代码”提升成“模型能稳定使用完整工程环境”？',
    answer: 'OMP 的答案是把 **LSP / DAP / 内建 search/bash / edit dialect / subagents / memory / session export** 统一成一套 coding surface；provider 与模型角色通过配置注入。',
    problemDiagnosis: [
      '普通 agent 的瓶颈常在工具协议、编辑失败与上下文重复，而不只在模型权重。',
      '工具多并不等于可用；关键是让 read/edit/LSP/session 共享同一份文件与状态语义。',
      '模型差异真实存在，因此编辑协议需要按模型回退与调优。',
      '本次实测证明 Mify/MiMo 可接入并完成任务，但没有覆盖 LSP、DAP、subagent 等高阶能力。',
      '结束前两次最小 smoke 都能返回正确结果，但本机冷启动约 2.5–5.3 分钟，跨 harness 能力发现成本明显。',
    ],
    designPrinciples: [
      '**Coding-first surface**：围绕真实代码库而不是通用聊天构建。',
      '**模型适配工具协议**：路由配置包含模型与 edit dialect 的关系。',
      '**原生能力内聚**：search、bash、LSP、DAP、session 都在同一 harness。',
      '**会话可复核**：JSONL 和 HTML export 把正式结果与轨迹一起交付。',
      '**配置式 provider**：OpenAI-compatible 网关无需 fork。',
    ],
    differentiationMatrix: [
      { vs: 'DeepSeek Harness', diff: 'OMP 更像高度打磨的成品 coding surface；本次更快、模型步骤更少，但处理 token 更多，浏览器端轨迹分析不如 DSH 细。' },
      { vs: 'Codex / Claude Code', diff: 'OMP 更强调多 provider、模型特定 edit 与大量内建工程工具，同时保留本地开源可改性。' },
      { vs: 'MiCo', diff: 'OMP 强在单个 coding worker 的深工具面；MiCo 强项应留在任务、编制、验收与跨 worker 治理，不宜重复造 IDE 工具栈。' },
    ],
  },

  timeline: [
    { date: '2026-08-13', event: 'Homebrew 安装 omp 17.3.0；源码冻结到 326d24bd。' },
    { date: '2026-08-13', event: '建立 competitor-eval 独立 profile，接入 Mify / MiMo V2.5 Pro。' },
    { date: '2026-08-13', event: '固定题从 0/2 修到 2/2，保存 JSONL、HTML export 与实拍截图。' },
  ],

  conclusion: {
    summary: '**结论：模型链路与编码任务可用，但本机冷启动性能需治理。** OMP 已真实安装，并通过 Mify/MiMo 完成固定编码任务；已保存 agent session 比 DSH 快 14.75 秒，但该口径不含 OMP 约 2.5–5.3 分钟的冷启动，也不能外推成总体性能排名。它对 MiCo 最有价值的是“把模型差异下沉为工具协议配置”和“会话可复核交付”。',
    forMico: [
      '把模型 role、provider、edit dialect 做成同一份可审计路由配置。',
      '不要复制 OMP 的所有 IDE 工具；优先把它当可替换 worker 接入 MiCo 的任务/验收层。',
      '借鉴 session JSONL + 自包含 HTML 的双交付：一份机器证据，一份人类复核界面。',
      '下一轮补长任务、子代理 fan-out、失败恢复与权限提示，才足以判断生产适配度。',
    ],
  },
};
