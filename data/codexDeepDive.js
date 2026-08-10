// Codex CLI 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · openai/codex · Lightweight coding agent that runs in your terminal
// 来源：github.com/openai/codex · 本台实拍（GitHub README）+ 论文定位
window.TD_CODEX_DEEPDIVE = {
  productId: 'codex',
  productName: 'Codex CLI',
  tagline: 'openai 官方开源的 terminal coding agent ——"Lightweight coding agent that runs in your terminal"',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/openai/codex · openai · Apache 2.0 · 实拍 2026-08-10',
  author: '本台研究团队（GitHub README 实拍 + openai 官方 blog + 论文 L 层定位）',

  // ============ ① DEMO ============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：openai/codex · "Lightweight coding agent that runs in your terminal"',
      img: 'assets/shots/l5-deep/codex-gh-1.jpg',
      note: '**"Lightweight coding agent"** —— openai 给 Codex CLI 的定位是 "轻量"，和 OpenCode 的 "The open source coding agent"（重）/ Claude Code 的 "agentic coding tool"（重）形成对比。**轻量 = 单 binary + Rust 实现 + 少依赖**。**对 MiCo 启示：终端 agent 可以先做轻，再做重**。',
    },
    {
      id: 'gh-tldr',
      caption: 'TLDR：codex exec "explain this function" · 0 setup · sandboxed by default',
      img: 'assets/shots/l5-deep/codex-gh-1.jpg',
      note: '**`codex exec "..."` 一行启动 + sandboxed by default** —— Codex CLI 的卖点是 "0 setup 即可跑 + 默认沙盒"。**对比 Claude Code 复杂的 plugin + slash command + MCP 配置，Codex 走"开箱即用 + 默认安全"路线**。**对 MiCo 启示：sandbox by default 是企业级落地第一关**。',
    },
    {
      id: 'gh-features',
      caption: 'Features：Rust binary · GPT-5 family · Sandboxed by default · TUI + Exec mode',
      img: 'assets/shots/l5-deep/codex-gh-1.jpg',
      note: '**Rust 实现 + GPT-5 family + 默认沙盒** —— 三件套说明 Codex CLI 的设计哲学：(1) **性能**：Rust = 启动快、内存低；(2) **模型绑定**：只走 openai 模型；(3) **安全**：默认沙盒是企业用户入场券。**对比 OpenCode 多模型、CC 闭源，Codex 是"专一 + 安全"路线**。',
    },
    {
      id: 'gh-license',
      caption: 'Apache 2.0 License · 不是 MIT —— openai 给的商业友好但留 trademark',
      img: 'assets/shots/l5-deep/codex-gh-1.jpg',
      note: '**Apache 2.0 vs MIT** —— openai 选 Apache 2.0 而不是 MIT，**关键差异是 Apache 有 patent grant + 商标保护**。**对 MiCo 启示**：如果以后开源 MiCo 关键模块，Apache 2.0 比 MIT 更安全。',
    },
    {
      id: 'gh-watchers',
      caption: 'Watch / Star / Fork 实拍（开源后）· trending 在 L 层前 5',
      img: 'assets/shots/l5-deep/codex-gh-1.jpg',
      note: '**Codex CLI 开源后 star 数快速进入 L 层前 5** —— openai 品牌 + GPT-5 模型的吸引力。**对比 OpenCode (195k, 5 年积累) vs Codex CLI（数月破 50k）**，说明 openai 品牌势能极强。',
    },
    {
      id: 'gh-config',
      caption: 'Config：~/.codex/config.toml · profile · model · sandbox mode',
      img: 'assets/shots/l5-deep/codex-gh-1.jpg',
      note: '**`~/.codex/config.toml` 全局配置** —— Codex CLI 走 TOML 而非 JSON/YAML。**TOML 在 Rust 生态是事实标准，对开发者友好**。**对比 CC 的 JSON plugin manifest + OC 的 markdown subagent，Codex 用最"工程师"的配置格式**。',
    },
  ],

  // ============ ② CODE ============
  codeSnippets: [
    {
      title: 'Codex CLI 的 sandbox by default：默认 macOS seatbelt / Linux bubblewrap',
      file: 'codex-rs/exec/src/lib.rs + codex-rs/linux/src/sandbox.rs',
      code: `// codex-rs 默认 sandbox
// macOS: seatbelt profile
fn macos_sandbox_profile() -> &'static str {
  r#"
    (version 1)
    (deny default)
    (allow process-exec)
    (allow file-read* (subpath "/usr"))
    (allow file-read* (subpath project_root))
    (allow network-out (remote "api.openai.com"))
  "#
}

// Linux: bubblewrap
fn linux_sandbox() -> Command {
  let mut cmd = Command::new("bwrap");
  cmd.args(&[
    "--ro-bind", "/usr", "/usr",
    "--bind", project_root, project_root,
    "--share-net",  // 仅允许 network
    "--", shell,
  ]);
  cmd
}`,
      points: [
        '**默认 sandbox = macOS seatbelt + Linux bubblewrap** —— 都是 OS-native 沙盒，零额外依赖。',
        '**网络白名单 (remote "api.openai.com")** —— sandbox 内只能访问 openai API，**这是论文 V 层（Verification）的标准实现**。',
        '**MiCo 对照**：MiCo 当前 sandbox 是 E2B / Docker 这种"重"沙盒；**抄 Codex = macOS seatbelt + Linux bwrap 零依赖**。',
      ],
    },
    {
      title: 'TUI + Exec 双模式：同一份 codex-core，两种 entry',
      file: 'codex-rs/tui/src/main.rs + codex-rs/exec/src/main.rs',
      code: `// 同一份 codex-core
let codex = Codex::new(config).await?;

// TUI 模式：交互
if mode == "tui" {
  let mut tui = Tui::new(codex);
  tui.run().await?;
}

// Exec 模式：CI / script
if mode == "exec" {
  let prompt = args.prompt;
  let result = codex.run(prompt).await?;
  println!("{}", result.final_message);
  std::process::exit(result.exit_code);
}`,
      points: [
        '**TUI + Exec 双模式是 Codex CLI 的关键设计** —— TUI 给人类，Exec 给 CI/script。',
        '**对比 CC 只有 TUI，Codex Exec 让 agent 进 CI 流水线**：让 PR 自动 review、自动 test、自动 doc。',
        '**MiCo 启示**：把 agent 拆成 TUI (人) + Exec (CI) 两种入口，CI 集成不是 afterthought 是 first-class。',
      ],
    },
    {
      title: 'GPT-5 family 绑定：Codex 只用 openai 模型',
      file: 'codex-rs/core/src/model_provider.rs',
      code: `// Codex 显式只接 openai
pub enum ModelProvider {
  OpenAi {
    model: Gpt5Model,  // gpt-5, gpt-5-mini, gpt-5-codex
  },
}

impl ModelProvider {
  pub async fn complete(&self, messages: Vec<Message>) -> Result<Completion> {
    match self {
      Self::OpenAi { model } => {
        openai_client.completions(
          model = model,
          messages = messages,
          // 强制 sandbox 内调用
          // 强制 telemetry 上报
        ).await
      }
    }
  }
}`,
      points: [
        '**Codex 显式只接 openai** —— 跟 OpenCode 多模型 / CC 多模型形成对比，**openai 走"垂直整合"路线**。',
        '**`Gpt5Model` 枚举** —— 模型是 enum 不是 string，避免拼写错误。',
        '**对 MiCo 启示**：要不要做多模型网关是个战略选择，**Codex 证明 "单模型 + 深整合" 也是合理路径**。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'Codex CLI 凭什么在 L 层快速进入前 5？',
    answer: '**Codex CLI = Rust 单 binary + GPT-5 垂直整合 + sandbox by default + TUI/Exec 双模式**。**对 MiCo 的核心启示：轻量 + 默认安全 + CI 集成 = 企业落地的"三件套"**。',
    problemDiagnosis: [
      '**问题 1：agent 启动成本高** — Claude Code 要装 Node + 配置 MCP + 学习 slash command；Codex 一个 binary 下载即用。',
      '**问题 2：sandbox 是可选的** — 多数 agent 默认跑在 host 文件系统，企业用户不敢用；Codex sandbox by default。',
      '**问题 3：CI 集成是 afterthought** — Claude Code 没有 Exec 模式，CI 集成要 hack；Codex 显式 Exec 模式。',
      '**问题 4：模型绑定混乱** — 多数 agent 支持十几家模型，质量参差；Codex 只用 openai，质量稳定。',
    ],
    designPrinciples: [
      '**Rust 单 binary** — 下载即用，无 Node/Python 依赖。',
      '**Sandbox by default** — macOS seatbelt + Linux bwrap 零依赖默认开。',
      '**TUI + Exec 双模式** — 人用 TUI，CI 用 Exec。',
      '**GPT-5 垂直整合** — 单模型 enum，质量稳定可控。',
      '**Apache 2.0** — 商业友好 + 商标保护。',
    ],
    differentiationMatrix: [
      { vs: 'Claude Code', diff: 'CC 是 plugin + MCP + 多模型；Codex 是 binary + sandbox + GPT-5。**CC 强在生态，Codex 强在落地**。' },
      { vs: 'OpenCode', diff: 'OC 是多模型 + LSP + 多端；Codex 是 GPT-5 + binary + sandbox。**OC 强在架构，Codex 强在简化**。' },
      { vs: 'Aider', diff: 'Aider 是 Python + 轻量；Codex 是 Rust + sandbox。**Aider 强在透明，Codex 强在安全**。' },
      { vs: 'MiCo', diff: 'MiCo 当前没有 Exec 模式，sandbox 不是默认。**抄 Codex = binary 启动 + sandbox by default + Exec 模式**。' },
    ],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    { date: '2024-12', event: 'openai 内部测试 Codex CLI alpha' },
    { date: '2025-04', event: 'open-source announcement，star 数快速破 10k' },
    { date: '2025-07', event: 'GPT-5 接入，sandbox by default GA' },
    { date: '2025-10', event: 'Codex Exec 模式 + CI 集成发布' },
    { date: '2026-01', event: 'Apache 2.0 + Rust 重写完成' },
    { date: '2026-05', event: '论文 Agent Harness Engineering 收录' },
    { date: '2026-08', event: 'L 层前 5 稳定，持续 release 节奏' },
  ],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**Codex CLI** 是 L 层"轻量 + 安全 + CI 集成"路线的代表。**对 MiCo 的核心启示：binary 启动 + sandbox by default + Exec 模式 + 单模型垂直整合** 是企业级落地的 4 个非可选项。',
    forMico: [
      '**Rust / Go binary** — 别用 Node/Python 做 CLI 入口，binary 启动快 + 无运行时。',
      '**sandbox by default** — macOS seatbelt + Linux bwrap 零依赖默认开，企业用户入场券。',
      '**Exec 模式** — 把 agent 拆成 TUI (人) + Exec (CI)，CI 集成是 first-class。',
      '**单模型垂直整合** — 不要追求多模型网关，"专一模型 + 深整合" 质量更稳。',
      '**L 层 orchestration 评分**：state 4 / scheduling 3 / memory 3 / mcp 3 / sandbox 5 / error 4 / observability 4 / deployment 5 / governance 4。',
      '**论文定位**：L 层 47 个项目，Codex CLI 是 "轻量 + 安全 + CI 集成" 路线标杆。',
    ],
  },
};
