// DeepSeek Harness 完整深度评测（真实安装 + MiMo 同题实测 · 2026-08-13）
window.TD_DEEPSEEK_HARNESS_DEEPDIVE = {
  productId: 'deepseek-harness',
  productName: 'DeepSeek Harness',
  tagline: 'everything is a plugin：用 Cordis 组合 agent、模型、session、sandbox 与 Web trajectory',
  dateAdded: '2026-08-13',
  isRealScreenshot: true,
  source: 'github.com/deepseek-ai/deepseek-harness @ 47f94385 · dsh 0.1.0-rc.6 · 本台 MiMo 实测',
  author: '本台研究团队（源码 + 本机真实运行 + 固定题对照）',
  primaryLayer: 'L / G',
  deployment: 'OSS / local web',

  demoShots: [
    {
      id: 'live-home',
      caption: '原生 Web UI：首页绑定 Mify / MiMo V2.5 Pro',
      img: 'assets/shots/deepseek-harness/01-live-home-mify.jpg',
      note: '真实运行在 `127.0.0.1:3080` 的 DSH Web UI。workspace、模型与 reasoning 档位均可见，不是静态仿图。',
    },
    {
      id: 'eval-result',
      caption: '固定题完成页：代码修改、测试命令与 2/2 结果',
      img: 'assets/shots/deepseek-harness/02-live-mimo-eval-result.jpg',
      note: 'DSH 在隔离临时仓库中完成与 OMP 相同的补丁，最终 `npm test` 2/2；页面同时显示 39 秒、TTFT、token/s 与 cache hit。',
    },
    {
      id: 'trajectory',
      caption: 'Trajectory：逐步展开模型响应、read/edit/bash 与耗时',
      img: 'assets/shots/deepseek-harness/03-live-trajectory.jpg',
      note: '**最强差异点**：trajectory 不是附加日志页，而是 conversation view plugin。工具调用、顺序、持续时间与模型步骤可以直接在浏览器内复核。',
    },
    {
      id: 'model-settings',
      caption: 'Models：原生 DeepSeek route 与 MiMo via Mify 自定义 route 并存',
      img: 'assets/shots/deepseek-harness/04-live-model-settings.jpg',
      note: '通过 `llm-pi-ai` 插件注册 Mify route；设置页只展示 provider 与模型，不泄露密钥。模型路由可热更新。',
    },
  ],

  codeSnippets: [
    {
      title: 'Everything is a plugin：base bundle 用 Cordis patch 装配服务',
      file: 'packages/bundle/base/cordis.patch.yml @ 47f94385',
      code: `- insert:
    - id: llm
      name: '@deepseek-ai/dsh-llm'
    - id: session
      name: '@deepseek-ai/dsh-session'
    - id: agent
      name: '@deepseek-ai/dsh-agent'
    - id: llm-pi-ai
      name: '@deepseek-ai/dsh-llm-pi-ai'
    - id: sandbox-policy
      name: '@deepseek-ai/dsh-sandbox-policy'`,
      points: [
        '核心不是一个大 Agent 类，而是由服务与插件组合出的 profile。',
        '模式差异通过后续 patch 覆盖；用户 profile 仍可在最后一层定制。',
        '对 MiCo：平台能力可以拆成可替换 provider/session/policy 插件，而不是写死在 worker。',
      ],
    },
    {
      title: '自定义模型 route：credential reference 按请求解析，失败时 fail loud',
      file: 'packages/llm/llm-pi-ai/src/index.ts @ 47f94385',
      code: `const ref = profile.apiKeyEnv
if (ref === undefined) return undefined
const hit = credentials !== undefined
  ? (await credentials.resolve(ref))?.value
  : launchEnvironmentOf(ctx).get(ref)?.value
if (hit !== undefined && hit.length > 0) return assertUsableApiKey(hit, 'llm-pi-ai', ref)
throw new LlmError('no credential for provider route', 'MISSING_CREDENTIAL')`,
      points: [
        'route 只保存环境变量引用，不需要把 key 写进 profile。',
        '缺凭据明确失败，避免意外拾取另一个 provider 的 ambient key。',
        '本次 Mify/MiMo route 即通过这一插件接入并完成真实请求。',
      ],
    },
    {
      title: 'Trajectory 本身也是 conversation view plugin',
      file: 'packages/client/ui-trajectory/src/client/index.ts @ 47f94385',
      code: `registerTrajectoryMessageDefinitions(ctx)
registerTrajectoryRequestHeaderDefinition(ctx)
registerTrajectoryAssistantDefinition(ctx)
registerTrajectoryToolDefinition(ctx)
registerTrajectoryCompactionDefinitions(ctx)
registerTrajectoryConversationView(ctx)
ctx.slots.inject('conversation.view', () => ctx.slots.register({
  id: 'trajectory',
  order: 10,
}, TrajectoryView))`,
      points: [
        '轨迹由 session event 投影生成，和聊天视图共享同一事实源。',
        '工具、模型响应、compaction 都有独立 definition，便于细粒度观察。',
        '本次 8 个模型步骤、9 次工具调用均可在原生 UI 中逐项复核。',
      ],
    },
  ],

  philosophy: {
    coreQuestion: '能否把 agent harness 做成可热替换、可组合、可观察的插件运行时？',
    answer: 'DSH 的答案是 **Cordis + everything-is-a-plugin**：模型 adapter、session persistence、sandbox policy、工具、Web UI 乃至 trajectory 都通过插件和 profile patch 装配。',
    problemDiagnosis: [
      '传统 harness 把 provider、工具、session 与 UI 绑成一体，难以替换与局部演进。',
      '配置热更新若不是原子替换，失败 route 会拖垮已有可用 route。',
      '只保留聊天转录不足以解释 agent 行为，需要 event 级 trajectory。',
      '安全策略必须由一个 policy service 统一解析，避免 bash/file/terminal 各自漂移。',
    ],
    designPrinciples: [
      '**Everything is a plugin**：能力与 UI 都由 Cordis 插件注册。',
      '**Atomic replace**：route 更新失败时保留上一份可服务配置。',
      '**Credential by reference**：配置面保存引用，按请求解析 secret。',
      '**Event-sourced observability**：trajectory 是 session 事件的结构化投影。',
      '**Policy as a service**：read-only / workspace-write / danger-full-access 由共享策略统一决定。',
    ],
    differentiationMatrix: [
      { vs: 'Oh My Pi', diff: 'DSH 更像可组合的 harness 操作系统，浏览器 trajectory 明显更强；本次 token 更省，但步骤更多、用时更长。' },
      { vs: 'LangGraph / Agents SDK', diff: 'DSH 不只描述 agent graph，还把本地执行、session persistence、权限、Web UI 与模型配置放在同一插件运行时。' },
      { vs: 'MiCo', diff: 'DSH 的 profile patch 与 service boundary 适合做 MiCo worker runtime；但它仍是 developer preview，不能直接当稳定生产底座。' },
    ],
  },

  timeline: [
    { date: '2026-08-13', event: '全局安装 @deepseek-ai/dsh 0.1.0-rc.6；源码冻结到 47f94385。' },
    { date: '2026-08-13', event: '通过 llm-pi-ai 配置 Mify / MiMo V2.5 Pro route，原生 Web UI 验证成功。' },
    { date: '2026-08-13', event: '固定题从 0/2 修到 2/2，保存压缩 session、四张实拍与 trajectory。' },
  ],

  conclusion: {
    summary: '**结论：架构值得重点跟踪，生产采用需设版本门。** DSH 已在本机真实安装并用 Mify/MiMo 完成固定题；它的插件边界、credential reference、统一 sandbox policy 与 Web trajectory 都比一般 CLI harness 更系统。但官方明确标记 developer preview 与破坏性变更风险。',
    forMico: [
      '优先借鉴 Cordis profile patch：把模型、工具、session、权限和 UI 组合从代码分支变成装配层。',
      '复用“secret 只保存引用、按请求解析、缺失时 fail loud”的租户安全边界。',
      '把 trajectory 做成任务验收的一等视图，而不只是排障日志。',
      '若引入生产，冻结 npm 版本 + 源码 SHA，并建立兼容性回归 Gate；不要跟随 latest 自动升级。',
    ],
  },
};
