// OpenWorker 深度评测（产品深度评测模板的第一个实例）
// 任何新产品（OpenWork 之后）都能复用这个 schema：把 ①demo ②code ③philosophy 三栏填齐即可。
// 字段：overview | demoShots | codeSnippets | philosophy | timeline
window.TD_OPENWORKER_DEEPDIVE = {
  productId: 'openworker',
  productName: 'OpenWorker (吴恩达)',
  tagline: '桌面 AI 同事——把"任务"从"对话"变回"工作"',
  dateAdded: '2026-08-04',
  source: 'github.com/andrewyng/openworker（12.4k stars · 1.7k forks · MIT · andrewyng/Rohit Prasad 2026-07-24 首发）',
  author: '本台研究团队（基于 GitHub README + 仓库结构 + 第三方测评合成的产品形态示意图 + AI 视角分析）',

  // ============ ① DEMO（产品形态示意图）============
  // 标注：图中所有界面均为基于官方发布物料合成的"产品形态示意图"，非实机截图。
  demoShots: [
    {
      id: 'home',
      caption: '桌面应用主屏：会话列表 + 主对话区 + 任务输入框',
      img: 'assets/shots/openworker/01_desktop_home.jpg',
      note: '首页是"聊天 + 输入"两栏式，底部输入框 + 顶栏"Approval pending"提示当前任务正在等用户授权。',
    },
    {
      id: 'task',
      caption: '任务执行面板：步骤进度 + 工具调用 + 产物',
      img: 'assets/shots/openworker/02_task_execution.jpg',
      note: 'Plan → 读文件 → 聚合 → 起草 Slack 消息 → 等待审批——五步链条左到右一屏看全。中间展开当前步骤（tool call 卡片 + 输出预览），右侧"Task Status"显示耗时/token/当前步。',
    },
    {
      id: 'approval',
      caption: '审批弹窗：每次外发前确认（默认开启）',
      img: 'assets/shots/openworker/03_approval_prompt.jpg',
      note: '黄边卡片 + 即将外发内容预览 + "Deny / Allow"两按钮。背景是暗化的当前会话——不让用户在弹窗里走神。',
    },
    {
      id: 'connectors',
      caption: '连接器列表：25+ 集成（Slack/GitHub/Jira/Notion/Linear/HubSpot...）',
      img: 'assets/shots/openworker/04_connectors_list.jpg',
      note: '3 列卡片网格 + 状态点（绿色=已连接）。搜索栏 + 计数（"Connected 7 / Available 25+"）让用户一眼看到"还有哪些没接"。',
    },
    {
      id: 'memory',
      caption: '本地记忆：SQLite 按 workspace/session 存',
      img: 'assets/shots/openworker/05_memory_store.jpg',
      note: '记忆以"条目"形态展示（带 chip：user/project/rule/person）。底部"+ New memory"按钮——用户可以显式补记忆。',
    },
    {
      id: 'slack',
      caption: 'Slack 集成：频道里 @OpenWorker 触发 → 桌面端跑 → 回执到原线程',
      img: 'assets/shots/openworker/06_slack_integration.jpg',
      note: 'Slack 既是数据源也是入口。agent 在桌面端跑（凭据/记忆都在本地），完成后回到 Slack 线程回执。',
    },
  ],

  // ============ ② CODE（关键源码/架构）============
  // 来源：GitHub README + 仓库结构 + 第三方测评（智猩猩 AI 等）描述合成。
  // 标注：代码片段为基于官方描述构造的演示代码，非实机 git blame。
  codeSnippets: [
    {
      title: '仓库结构（README 原文）',
      file: 'github.com/andrewyng/openworker (root)',
      code: `coworker/        # Python 后端：agent 引擎、模型 provider、连接器、MCP 客户端、记忆、自动化
surfaces/gui/    # 桌面应用：React UI + Tauri 壳（supervise server）
stt/             # 语音转文字 sidecar（Rust）
packaging/       # 安装包构建（macOS DMG / Windows）、自动更新 manifest、dev bootstrap
docs/            # 设计规范与决策日志
tests/           # 后端测试套件`,
      points: [
        'Python 后端 + React+Tauri 桌面壳是当前"桌面 agent harness"的标准栈（与 Mavis/WorkBuddy 同型）。',
        '`coworker/` 命名直接对应"AI 同事"——把 agent 当"一个角色"而非"一个工具"。',
        '`stt/` 用 Rust 单独进程做语音转文字——语音是个人向 agent 的高频入口，桌面壳与 STT 解耦便于流式响应。',
        '`packaging/` 配 `build_dmg.sh` / `build_windows.ps1`——说明团队目标平台是 macOS+Windows 双端，Linux 暂缓。',
      ],
    },
    {
      title: '从源码启动（README 原文）',
      file: 'github.com/andrewyng/openworker (README → Run from source)',
      code: `# 1. 一次性 bootstrap：创建 Python venv at .venv
bash packaging/setup_dev_env.sh

# 2. 启动本地 agent server（默认 8765 端口）
.venv/bin/openworker-server --cwd ~/some/project --port 8765

# 3. 另开一个终端：启动 UI
cd surfaces/gui
npm install
npm run dev        # 浏览器 UI（Vite 开发端口）
# 或
npm run tauri dev  # Tauri 桌面壳（监督 server）`,
      points: [
        'Python venv + Node 20+ + Rust toolchain——三条技术链同时配，开源贡献者门槛**比 CrewAI/Aisuite 都高**。',
        '`--cwd` 参数指定 agent 工作目录——这是 aisuite 范式（agent 在哪条沙箱里跑）。',
        '`X-OpenWorker-Token` 头做 server 鉴权——token 写在 `<state-dir>/sidecar-8765.token`（用户只读文件），桌面 app 用内存 token 替代，**两次 token 走两套机制**值得注意。',
        '`npm run tauri dev` 直接做桌面壳——和 `npm run dev`（浏览器）并存：开发时可在浏览器调试，最终用户拿桌面 app。',
      ],
    },
    {
      title: '一个 Python tool 示例（基于 coworker/ 目录推断）',
      file: 'coworker/tools/slack_post.py (inferred from coworker/ structure)',
      code: `from aisuite import tool

@tool
def post_slack_message(channel: str, text: str, as_user: str = "evan"):
    """Post a message to a Slack channel. Requires prior OAuth with as_user scope.
    Will trigger approval if 'external_post' is True.
    """
    from coworker.connectors.slack import get_slack_client
    client = get_slack_client(as_user=as_user)
    # 审批门禁：写/外发类操作前必须 await 审批
    if not client.approved_for("external_post"):
        return {
            "status": "awaiting_approval",
            "preview": {"channel": channel, "text": text},
            "cta": "Allow / Deny",
        }
    resp = client.chat_postMessage(channel=channel, text=text)
    return {"status": "ok", "ts": resp["ts"]}`,
      points: [
        '**审批门禁是 tool 内部而非外层框架**——意味着每个 tool 自己决定"需不需要审批"，**统一性靠约定而非强制**。',
        '返回 `awaiting_approval` 而非抛异常——UI 可以呈现"等待中"状态而不是"出错"。',
        '`as_user` 显式参数——OpenWorker 支持多账号 OAuth（每个连接器绑一个用户身份），这是 Claude Tag 的同构物。',
      ],
    },
    {
      title: '本地记忆的存与查（基于 README "local SQLite" 描述）',
      file: 'coworker/memory/store.py (inferred)',
      code: `class MemoryStore:
    """OpenWorker 的本地记忆：SQLite，按 workspace+session 隔离。
    无 server 端、无云端、无公司级共享——这是个人向的硬边界。
    """
    def __init__(self, workspace: str):
        self.db = sqlite3.connect(f"~/.openworker/{workspace}/memory.db")
        self.db.execute("""
            CREATE TABLE IF NOT EXISTS memory (
                id INTEGER PRIMARY KEY,
                scope TEXT,         -- 'user' | 'project' | 'rule' | 'person'
                snippet TEXT,
                created_at REAL
            )""")

    def upsert(self, scope: str, snippet: str) -> int:
        cur = self.db.execute(
            "INSERT INTO memory(scope, snippet, created_at) VALUES (?,?,?)",
            (scope, snippet, time.time()))
        return cur.lastrowid

    def search(self, query: str, k: int = 5) -> list[dict]:
        # 简化版：LIKE 查询；真实版本会用 sqlite-vec 做向量检索
        return self.db.execute(
            "SELECT * FROM memory WHERE snippet LIKE ? ORDER BY created_at DESC LIMIT ?",
            (f"%{query}%", k)).fetchall()`,
      points: [
        '**纯本地 SQLite，无加密说明**——比 QM 的 scope 隔离粗糙，但符合"个人向"定位。',
        '**无离职移交/无公司共享**——硬伤。MiCo Assets 的差异点就在这。',
        '`scope` 字段是 user/project/rule/person——比"无标签"强但比 MiCo 图谱弱（人员 226/概念 184/会议 180/任务 136 那种）。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: '为什么吴恩达要做 OpenWorker？',
    answer: '他在 LinkedIn 的发布原话是："OpenWorker 是一个本地优先的 AI coworker，能在用户的文件和日常工具里跑出真实成果（不只是给一段聊天文本）"。**这是对 2026 年所有 LLM 产品痛点的最直白回击**：智能≠有用。会写三千字调研报告 ≠ 帮你把客户邮件发了、把日历改了、把 Slack 警告处理了。',
    problemDiagnosis: [
      '**AI 在"夹层"里尴尬**——一边惊叹它的聪明，一边每天还在无数软件间复制粘贴改格式。',
      '**"会回答"≠"会做完"**——市面 90% agent 还在"产出待办清单"阶段，OpenWorker 目标是产出"可交付物"。',
      '**安全姿态是"默认信任 + 关键操作审批"**——不学 OpenClaw 的 `--dangerously-skip-permissions`（裸跑），也不学 QM 的 Strict 模式（每步审批）。',
    ],
    designPrinciples: [
      '**本地优先（local-first）**——agent 循环、对话、模型 key、连接器 token 都在本地；唯一上云的是 OAuth 经纪。',
      '**多模型不绑定**——基于 aisuite，5 档商用模型 + Ollama 本地模型零成本切换。',
      '**审批内建而非外挂**——每个写/外发类 tool 内部有审批门禁；不是 framework 强制，是约定。',
      '**桌面原生 ≠ 浏览器降级**——Tauri 壳独立维护，不靠浏览器跑。',
      '**Slack 是入口也是回执通道**——@OpenWorker 触发 → 桌面跑 → 同一线程回复。',
    ],
    differentiationMatrix: [
      { vs: 'OpenClaw', diff: 'OpenClaw 是 350k+ stars 的"个人助理生态"（20+ IM 渠道 + ClawHub 技能 + dreaming 记忆整理）；OpenWorker 是 12.4k stars 的"个人同事工具"（25+ 连接器 + 桌面原生 + 审批内建）。前者是平台，后者是应用。' },
      { vs: 'WorkBuddy', diff: 'WorkBuddy 是腾讯的"小龙虾桌面工作台"（Craft/Plan/Ask 三档自主度 + 远程遥控 + 后台自动化）；OpenWorker 自主度未分档（默认每次弹窗），但**开源** + 基于 **aisuite** + 25+ 集成更广。' },
      { vs: 'Multica', diff: 'Multica 是"任务即一切"（看板/队列/squad/skill + 14 运行时）；OpenWorker 是"会话即一切"（任务 = 会话内步骤链）。' },
      { vs: 'MiCo', diff: 'MiCo 是企业级（编制/审批/台账/治理）；OpenWorker 是个人级（5 天 12.4k stars 印证硬需求）。**MiCo 的护城河就是 OpenWorker 缺的三条**：换人/审批/成本归集。' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2026-07-24', event: '吴恩达在 LinkedIn 宣布 OpenWorker 开源' },
    { date: '2026-07-25', event: 'GitHub 3.7k stars（24h）' },
    { date: '2026-07-29', event: 'GitHub 7.6k stars（5 天）' },
    { date: '2026-08-04', event: '本台评测入库（12.4k stars · 1.7k forks）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'OpenWorker 是 2026 年"个人向 desktop agent harness"赛道里，吴恩达用 aisuite + 25+ 集成 + 审批内建交出的一份**完整的、有立场的、可上手**答卷。它不是 Multica（任务即一切），不是 OpenClaw（生态即一切），不是 WorkBuddy（自主度即一切）——它选择了"桌面原生 + 任务交付"这条路，并在这条路上做到当下最强。',
    forMico: [
      '**Mavis 多 harness 之一**：个人虾形态可对标 OpenWorker，但需补齐"桌面原生"和"25+ 集成"两件事。',
      '**审批弹窗 UX 值得抄**：把"每次外发前确认"搬到 MiCo 审批流（当前是 BPM 审批 + 发版门禁，缺"运行时调用级拦截"）。',
      '**25+ 集成清单是上游**：别重造，直接接（Connector 适配层）。',
      '**本地 SQLite 记忆是反面教材**：证明"无公司治理"的硬伤，MiCo Assets 的图谱（1067 节点）就是差异点。',
    ],
  },
};
