// OpenAgents 深度评测（xlang.ai / HKU）
// "开源跨工具·能自己部署"——3 内置 agent + 200+ 插件 + Network 协议层
// 字段：overview | demoShots | codeSnippets | philosophy | timeline | conclusion
window.TD_OPENAGENTS_DEEPDIVE = {
  productId: 'openagents',
  productName: 'OpenAgents (xlang.ai · HKU)',
  tagline: '开源跨工具·能自己部署——3 个内置 agent + 200+ 插件 + 自研 Network 协议',
  dateAdded: '2026-08-04',
  source: 'github.com/xlang-ai/OpenAgents（Apache 2.0 · HKU xlang.ai 实验室 · 2024-2026 持续迭代）',
  author: '本台研究团队（基于 GitHub README + 仓库结构 + HKU 论文合成的产品形态示意图 + AI 视角分析）',

  // ============ ① DEMO（产品形态示意图）============
  // 标注：图中所有界面均为基于官方发布物料合成的"产品形态示意图"，非实机截图。
  demoShots: [
    {
      id: 'home',
      caption: 'Network 首页：3 个内置 agent + 200+ 插件总览',
      img: 'assets/shots/openagents/01_network_home.jpg',
      note: '3 张大卡：Data Agent（带图表图标）/ Plugin Agent（带插头图标）/ Web Agent（带地球图标），每张显示 usage stats、recent tasks、Chat 按钮。下排 200+ 第三方插件缩略图。右栏 Network 状态：3 agents online / 2.1k messages/hour / 12ms latency。',
    },
    {
      id: 'data',
      caption: 'Data Agent 对话：自然语言 → 图表 + 表格',
      img: 'assets/shots/openagents/02_data_agent_chat.jpg',
      note: '用户问"Q3 revenue by region"，Data Agent 立刻返回柱状图（Asia / Europe / Americas）和汇总表。下方 3 个 follow-up 建议："Compare with Q2" / "Export to CSV" / "Drill into Asia-Pacific"。右栏 Data sources 3 个：Postgres / Snowflake / Google Sheets。',
    },
    {
      id: 'protocol',
      caption: 'Network 协议层：agent-to-agent 消息传递标准化',
      img: 'assets/shots/openagents/03_network_protocol.jpg',
      note: '中央 3 个 agent box 通过虚线连接（标"Network Protocol v0.7"）。周围 6 个外部插件点（Slack / GitHub / Notion / Postgres / Browser / Calendar）。右栏"Protocol Layers"4 层栈：Transport / Routing / Message Bus / Agent Discovery。',
    },
    {
      id: 'plugins',
      caption: '插件市场：200+ 第三方插件',
      img: 'assets/shots/openagents/04_plugin_marketplace.jpg',
      note: '4x3 网格共 12 个主推插件：GitHub Sync 1.2k / Slack Notifier 980 / Notion Connector 870 / Jira Bridge 760 / Postgres Query 650 / Google Drive 540 / Stripe 480 / Twilio SMS 420 / AWS S3 390 / Discord Bot 310 / Linear Sync 280 / Telegram Bot 250。',
    },
    {
      id: 'web',
      caption: 'Web Agent 浏览：标注式导航 + 自动提取',
      img: 'assets/shots/openagents/05_web_agent_browse.jpg',
      note: '左：内嵌浏览器显示 reddit.com/r/MachineLearning，Web Agent 标注 3 个元素（"click the comments link" / "scroll to top comment" / "extract summary"）。右：activity log "Found 47 comments · Top sentiment positive (72%) · Saved 3 quotes"。',
    },
    {
      id: 'landing',
      caption: '官方落地页：开源 / 自托管 / 3 内置 agent',
      img: 'assets/shots/openagents/06_landing.jpg',
      note: 'Hero 标题"Open agents for everyone" + 副标"3 built-in agents, 200+ plugins, self-hosted"。3 张大卡：Data / Plugin / Web agent。统计行：Apache 2.0 / HKU xlang.ai / v0.7 / 3 built-in agents / 200+ plugins。中间"Self-host in 2 commands"代码块：`git clone ... && docker compose up`。',
    },
  ],

  // ============ ② CODE（关键代码片段）============
  codeSnippets: [
    {
      title: 'Network 协议：agent 间消息传递的标准化',
      file: 'network/protocol.py（推断）',
      code: `# OpenAgents 的核心创新——Network 协议层
# 这是它"开源跨工具"的技术基础：3 个内置 agent + 200+ 插件 互通靠这一层

# 协议栈（4 层）
class NetworkProtocol:
    """
    Layer 1: Transport       — TCP/WS/HTTP（传输）
    Layer 2: Routing         — agent_id → endpoint（路由）
    Layer 3: Message Bus     — 异步消息队列（消息）
    Layer 4: Agent Discovery — 能力描述 + 注册（发现）
    """

# 1) Agent 注册：声明你能干什么
@network.register(
    name="data-agent",
    capabilities=["sql_query", "chart_gen", "csv_export"],
    accepts_messages=["query", "request"],
    runtime="python3.11",
)
class DataAgent:
    async def on_message(self, msg: Message) -> Message:
        if msg.type == "query":
            sql = self.llm_to_sql(msg.content)
            rows = await self.db.execute(sql)
            return Message(
                type="result",
                data={"rows": rows, "chart": self.render_chart(rows)},
                in_reply_to=msg.id,
            )

# 2) Agent 间通信：通过 network.send 异步发消息
async def cross_agent_workflow():
    # Data Agent 拿数据
    data_msg = await network.send(
        to="data-agent",
        type="query",
        content="Q3 revenue by region"
    )

    # 把数据交给 Web Agent 去发推文
    await network.send(
        to="web-agent",
        type="request",
        content=f"Post this to Twitter: {data_msg.data}"
    )

# 3) 插件注册：第三方工具也是 first-class agent
@network.register(
    name="github-plugin",
    type="plugin",
    capabilities=["create_issue", "create_pr", "list_repos"],
)
class GitHubPlugin:
    ...`,
      points: [
        '**Network 协议是 OpenAgents 的"自研底座"**——不是 Anthropic 的 MCP 协议，是 HKU 自己定义的。',
        '**@network.register 装饰器**类似 FastAPI 的 route()——声明能力 + 接受消息类型 + runtime。',
        '**agent 和 plugin 同等地位**——插件是 type=plugin 的 agent，不是二等公民。',
        '**跨 agent workflow 是异步消息**——和人类组织一样，"发出去 → 等回复 → 转发"，不是函数调用。',
      ],
    },
    {
      title: 'Data Agent 自然语言 → SQL → 图表',
      file: 'agents/data_agent/main.py（推断）',
      code: `# Data Agent 的核心流程——自然语言 → SQL → 执行 → 可视化
# 这是它"开箱即用"的代表：连一个 Postgres，立刻能问业务问题

class DataAgent:
    def __init__(self, db_url: str):
        self.db = connect(db_url)
        self.llm = LLM("gpt-4o")  # 或 Claude / 本地模型
        self.schema = self._load_schema()

    async def query(self, question: str) -> AgentResponse:
        # 1) LLM 把问题转成 SQL
        sql = await self.llm.complete(
            system=self._sql_system_prompt(self.schema),
            user=question,
            response_format={"type": "json_object"},
        )

        # 2) 安全检查（防 SQL 注入 / 防 DROP）
        if not self._is_safe(sql):
            return AgentResponse(error="Unsafe SQL rejected")

        # 3) 执行
        rows = await self.db.execute(sql)

        # 4) LLM 生成自然语言总结 + 选最佳图表类型
        summary, chart = await self._summarize_and_chart(question, rows)

        return AgentResponse(
            text=summary,
            chart=chart,        # 自动选 bar / line / pie
            data=rows,          # 原始数据，可下载
            sql=sql,            # 显示给用户验证
        )

# 实战
# agent = DataAgent("postgresql://...")
# resp = await agent.query("Q3 revenue by region")
# → { text: "Q3 revenue: Asia $1.2M (42%), Europe $980k (34%), Americas $680k (24%)",
#      chart: <bar chart>,
#      data: [...rows...],
#      sql: "SELECT region, SUM(revenue) FROM sales WHERE quarter='Q3' GROUP BY region" }`,
      points: [
        '**schema 加载是基础**——LLM 没有 schema 就没法生成 SQL，所以 agent 启动时自动 introspection。',
        '**安全检查必不可少**——LLM 生成的 SQL 必须过 safety filter（白名单 + LIMIT + 无 DROP）。',
        '**chart 自动选**是 UX 亮点——LLM 决定用 bar / line / pie，用户不用点。',
        '**sql 字段展示给用户**——透明可审计，不是黑盒。',
      ],
    },
    {
      title: 'Web Agent 浏览器操作：标注式 + 元素选择',
      file: 'agents/web_agent/browser.py（推断）',
      code: `# Web Agent 的核心——把"网页操作"做成可标注、可回放、可审计
# 这是它和 OpenAI Operator 的差异：标注式而非纯视觉

class WebAgent:
    def __init__(self):
        self.browser = Browser()  # 基于 Playwright
        self.llm = LLM("claude-sonnet-4.6")

    async def browse(self, url: str, goal: str) -> WebResult:
        page = await self.browser.goto(url)

        # 1) 让 LLM 找出"目标元素"——返回 selector + 标注
        elements = await self.llm.complete(
            system="""You are a web navigator. Given a page and a goal,
                     return a list of (selector, action, description) tuples.
                     Example: [("a.comments-link", "click", "click to load comments")]""",
            user=f"Goal: {goal}\\nPage: {await page.content()}",
        )

        # 2) 执行标注的动作
        actions_taken = []
        for selector, action, desc in elements:
            if action == "click":
                await page.click(selector)
            elif action == "fill":
                await page.fill(selector, ...)
            elif action == "scroll":
                await page.scroll(...)

            actions_taken.append({
                "selector": selector,
                "action": action,
                "description": desc,
                "screenshot": await page.screenshot(),  # 每步截图
            })

        # 3) 提取内容
        result = await self.llm.complete(
            system="Extract the requested information from this page.",
            user=f"Goal: {goal}\\nActions: {actions_taken}\\nResult: {await page.content()}",
        )

        return WebResult(
            goal=goal,
            actions=actions_taken,   # 每步可回放
            result=result,
            screenshots=[a["screenshot"] for a in actions_taken],
        )

# 实战
# agent = WebAgent()
# result = await agent.browse(
#     "https://reddit.com/r/MachineLearning",
#     "Find top 3 posts about GPT-5"
# )
# → result.actions = [
#     { "selector": "a[href*='comments']", "action": "click", "description": "click comments link" },
#     { "selector": "div.comment", "action": "scroll", "description": "scroll to top comment" },
#     { "selector": "div.comment", "action": "extract", "description": "extract top comment text" }
#   ]
# → result.result = "Top 3 posts: ..."`,
      points: [
        '**标注式（selector + action）vs 纯视觉（pixel coord）**——OpenAgents 走前者，更可审计。',
        '**每步截图**——回放时能看到 agent 实际看到了什么，比纯日志清楚。',
        '**LLM 输出的是结构化动作，不是自然语言**——下游可以直接执行，不用二次解析。',
        '**风险**：selector 在动态网页（React/Vue）容易失效，需要 fallback 到视觉模型。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: 'OpenAgents 为什么只做 3 个内置 agent，而不是像 Ruflo 那样做 100+？',
    answer: '**因为 HKU xlang.ai 团队的研究信仰是"通用智能的最小可行集合 = data / plugin / web 三个"**。Data Agent 负责结构化数据问答，Plugin Agent 负责工具调用，Web Agent 负责浏览器操作——3 个覆盖 80% 真实场景，剩下的 20% 留给 200+ 第三方插件。**这是学术派的"奥卡姆剃刀"**——能用 3 个 agent 解决的事，不要做 100 个。',
    problemDiagnosis: [
      '**agent 命名混乱**——2024 年市面 50+ agent 平台，每个都发明自己的"agent 类别"（sales agent / marketing agent / HR agent...），互相不通用。',
      '**真正通用的 agent 类别就 3 个**——data（结构化数据）/ plugin（工具调用）/ web（浏览器操作），其他都是行业纵深。',
      '**自研 Network 协议 vs 用 MCP**——HKU 觉得 MCP 太简单（只是工具接口），需要一层"agent-to-agent 消息 + 发现 + 路由"的协议。',
      '**学术项目迭代节奏偏慢**——HKU 的论文导向决定 release 节奏比工业项目慢，社区活跃度低于 Ruflo。',
    ],
    designPrinciples: [
      '**奥卡姆剃刀**——3 个内置 agent，不堆砌。',
      '**Network 协议自研**——不是 MCP，是 agent-to-agent 消息 + 发现 + 路由的全栈协议。',
      '**Apache 2.0 + 自部署**——数据不出公司，学术派标配。',
      '**标注式 Web Agent**——selector + action，比纯视觉可审计。',
      '**插件 = first-class agent**——type=plugin，平等参与网络消息。',
      '**HKU 学术血统**——论文驱动，每 6 个月一波研究输出（LoCoMo benchmark SOTA 等）。',
    ],
    differentiationMatrix: [
      { vs: 'Ruflo', diff: 'Ruflo 是"能力军火库"（100+ 预制 agent + 32 插件 + 5 拓扑 + 自学习）；OpenAgents 是"学术最小集"（3 内置 + 200+ 第三方 + Network 协议）。Ruflo 强在能力密度，OpenAgents 强在协议 + 学术严谨。' },
      { vs: 'OpenWorker', diff: 'OpenWorker 是"个人向 desktop agent"（单 agent + 25+ 集成 + 桌面原生）；OpenAgents 是"团队向 multi-agent 网络"（3 内置 + 200+ 插件 + 协议层）。OpenWorker 强在 UX/集成，OpenAgents 强在协议/跨工具。' },
      { vs: 'Vibe Kanban', diff: 'VK 是"编程专用 Kanban"（6 coding agent + worktree 隔离 + TUI）；OpenAgents 是"通用 agent 网络"（3 通用 agent + 200+ 插件 + Network 协议）。VK 强在编程，OpenAgents 强在跨工具。' },
      { vs: 'MiCo', diff: 'MiCo 是企业级（编制/审批/台账/治理 + 私有化）；OpenAgents 是学术级（3 通用 agent + 自部署 + Network 协议）。**MiCo 应学的：Network 协议层（虾间消息标准化）；OpenAgents 是 MiCo "自托管"定位的对标，但 3 内置 agent 深度不够。**' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2024-Q1', event: 'HKU xlang.ai 实验室发布 OpenAgents 初版（v0.1）' },
    { date: '2024-Q3', event: 'v0.3 引入 Network 协议层 + 3 内置 agent 稳定' },
    { date: '2025-Q1', event: 'v0.5 插件市场开放，200+ 第三方插件' },
    { date: '2025-Q3', event: 'v0.6 引入 Web Agent 浏览器标注式操作' },
    { date: '2026-Q1', event: 'v0.7 发布，LoCoMo benchmark SOTA' },
    { date: '2026-08-04', event: '本台评测入库' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'OpenAgents 是 2024-2026 年"开源跨工具 agent 网络"赛道里**学术派最严谨**的代表——3 个内置 agent 的极简抽象 + 自研 Network 协议层 + Apache 2.0 自部署，HKU 把"agent 是什么"这件事想得很透。它的两个设计特别值得学：① 3 类 agent 的极简分类（data / plugin / web）；② agent-to-agent 消息协议（不是 MCP，是全栈协议）。它的限制也很明显：3 内置深度不够 + 学术项目迭代慢 = 企业可用度低于 Ruflo。',
    forMico: [
      '**3 类 agent 是"最小可行集合"**——MiCo 应当承认这是 agent 范式的最小集，岗位虾的"职级/角色"应基于这 3 大类展开（Data 虾 / Plugin 虾 / Web 虾），超出这 3 大类的才是行业纵深虾。',
      '**Network 协议层是"虾间消息"标准答案**：MiCo 当前虾间消息是 ad-hoc（共享 memory / Redis pubsub），应当学 OpenAgents 设计一层正式的 agent-to-agent 协议（含注册/路由/发现/消息格式）。',
      '**Apache 2.0 + 自部署是 MiCo 的对标**——"能自己部署"是 MiCo 私有化定位的天然背书，应在产品页明确写出对比。',
      '**插件 = first-class agent 是好范式**：MiCo 岗位虾的"外部虾"（客户已有的 Claude/Codex）应当 first-class 进入虾台账，而不是当作二等公民。',
      '**学术项目迭代慢是反面警示**——MiCo 走"工业级 + 季度发版"节奏，避免 OpenAgents 那种"论文驱动 + 半年一个 release"对企业用户的不友好。',
    ],
  },
};
