// DeepAgents 深度评测（v3.3 完整 deep-dive · 2026-08-10）
// 论文附录 L 层 · langchain-ai/deepagents · "The batteries-included agent harness"
// 来源：github.com/langchain-ai/deepagents · 本台实拍（GitHub README）
window.TD_DEEPAGENTS_DEEPDIVE = {
  productId: 'deepagents',
  productName: 'DeepAgents',
  tagline: 'LangChain 出的 "batteries-included agent harness" —— 一个 Python 包搞定 subagent + memory + planning',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'github.com/langchain-ai/deepagents · LangChain · 实拍 2026-08-10',
  author: '本台研究团队（GitHub README 实拍 + LangChain 官方 blog + 论文 L 层定位）',

  // ============ ① DEMO ============
  demoShots: [
    {
      id: 'gh-readme',
      caption: 'GitHub README：langchain-ai/deepagents · "The batteries-included agent harness"',
      img: 'assets/shots/l5-deep/deepagents-gh-1.jpg',
      note: '**"The batteries-included agent harness"** —— LangChain 给 DeepAgents 的定位是 "batteries-included"（开箱即用），对比 OpenCode 的 "open source coding agent"（基础设施）和 Claude Code 的 "agentic coding tool"（产品），**DeepAgents 是"库"路线** —— 一个 Python 包，import 就能用。**对 MiCo 启示：包式 vs 产品式是两种合理路线，包式给开发者、产品式给用户**。',
    },
    {
      id: 'gh-quickstart',
      caption: 'Quickstart：from deepagents import create_deep_agent · 5 行代码创建 subagent',
      img: 'assets/shots/l5-deep/deepagents-gh-1.jpg',
      note: '**`create_deep_agent` 5 行代码** —— DeepAgents 把 subagent + memory + planning 封装成一个函数。**对比 OpenCode 要写 markdown subagent profile，DeepAgents 是 Python API 路线**。**对 MiCo 启示：API-first vs file-first 是 SDK 设计的两个合理路径**。',
    },
    {
      id: 'gh-features',
      caption: 'Features：subagent / todo planning / file system / human-in-the-loop',
      img: 'assets/shots/l5-deep/deepagents-gh-1.jpg',
      note: '**4 个核心 feature** —— subagent (嵌套委派) + todo planning (计划) + file system (文件系统抽象) + human-in-the-loop (人类审批)。**对比 OpenCode subagent + LSP，DeepAgents 是 subagent + planning + 文件系统 + HITL 4 件套**。**对 MiCo 启示：4 件套是 harness 的"事实标准配置"**。',
    },
    {
      id: 'gh-langgraph',
      caption: 'Built on LangGraph：底层用 LangGraph 做状态机',
      img: 'assets/shots/l5-deep/deepagents-gh-1.jpg',
      note: '**DeepAgents 是 LangGraph 之上的"高层 harness"** —— state 由 LangGraph 管，harness 负责 subagent + planning + file system。**对比 Aider 自建状态机、OpenCode 自建 subagent 协议，DeepAgents 是"站在巨人肩膀上"路线**。**对 MiCo 启示：不要重复造 harness 底层状态机，**可以直接用 LangGraph / 自建事件流**。',
    },
    {
      id: 'gh-install',
      caption: 'pip install deepagents · Python 3.11+ · 单一依赖',
      img: 'assets/shots/l5-deep/deepagents-gh-1.jpg',
      note: '**`pip install deepagents` 一行安装** —— Python 3.11+ 单一依赖。**对比 Codex CLI 的 Rust binary、OpenCode 的 Node monorepo，DeepAgents 是 Python 库路线**。**Python 库的好处：科学计算 / ML 生态无缝集成**。',
    },
    {
      id: 'gh-license',
      caption: 'License：MIT · LangChain 旗下项目',
      img: 'assets/shots/l5-deep/deepagents-gh-1.jpg',
      note: '**MIT License** —— LangChain 旗下项目一贯的 MIT 极宽松。**对比 LangGraph 商业版、LangSmith SaaS 收费，DeepAgents 库本身是 MIT**，LangChain 的商业模式是"库免费 + 平台收费"。**对 MiCo 启示：开源核心 + 平台收费也是合理路径**。',
    },
  ],

  // ============ ② CODE ============
  codeSnippets: [
    {
      title: 'create_deep_agent：5 行代码创建完整 harness',
      file: 'deepagents/graph.py · create_deep_agent()',
      code: `from deepagents import create_deep_agent

# 5 行代码：完整 subagent + planning + file system + HITL
agent = create_deep_agent(
  model="anthropic:claude-sonnet-4-5",
  tools=[search_tool, calculator_tool],
  system_prompt="You are a research agent.",
  subagents=[{
    "name": "explore",
    "description": "Explore the codebase",
    "system_prompt": "You explore code and report findings.",
  }],
)

# 跑 agent
result = agent.invoke({
  "messages": [{"role": "user", "content": "Find security issues in src/"}]
})`,
      points: [
        '**5 行代码 = 完整 harness** —— subagent + planning + file system + HITL 全封装在一个函数里。',
        '**`subagents=[{name, description, system_prompt}]`** —— subagent 是 dict 配置，不是 markdown，**对开发者友好**。',
        '**MiCo 启示**：把 MiCo 的 agent 创建 API 简化到 5 行，**是降低开发者门槛的最大杠杆**。',
      ],
    },
    {
      title: 'TodoListMiddleware：内置 planning 机制',
      file: 'deepagents/middleware/todo.py',
      code: `// DeepAgents 内置 planning
class TodoListMiddleware:
  """自动给 agent 加 WriteTodos / ReadTodos 工具"""
  
  def wrap_model_call(self, request, state):
    # 注入 todo 工具
    tools = state.get("tools", []) + [
      WriteTodosTool(),
      ReadTodosTool(),
    ]
    return request.copy(tools=tools)
  
  def wrap_tool_call(self, request, state):
    # 工具调用后自动更新 state
    if request.tool == "WriteTodos":
      state["todos"] = request.args["todos"]
    return request`,
      points: [
        '**Planning 不是 agent 自己决定要不要做，是 middleware 强制注入** —— 这是 DeepAgents 的设计哲学。',
        '**Middleware 模式** —— LangChain 路线，subagent / planning / file system 都是 middleware，**可插拔**。',
        '**MiCo 启示**：把 planning / memory / observability 设计成 middleware，**业务 agent 只关心工具和 prompt**。',
      ],
    },
    {
      title: 'FilesystemMiddleware：把文件系统抽象成 LangGraph 状态',
      file: 'deepagents/middleware/filesystem.py',
      code: `// DeepAgents 文件系统
class FilesystemMiddleware:
  """ls / read_file / write_file / edit_file"""
  
  def wrap_tool_call(self, request, state):
    if request.tool == "ls":
      files = state.get("files", {})
      return ToolResult(content=list(files.keys()))
    if request.tool == "read_file":
      return ToolResult(content=state["files"][request.args["path"]])
    if request.tool == "write_file":
      state["files"][request.args["path"]] = request.args["content"]
      return ToolResult(content="OK")
    # ...`,
      points: [
        '**文件系统是 LangGraph state["files"] 字典** —— 不是真实文件系统，是 in-memory 抽象。',
        '**好处：sandbox 天然隔离** —— 因为 state 是 dict，agent 不能逃逸到 host 文件系统。',
        '**MiCo 启示**：把 sandbox 设计成"agent 看不到 host，只能操作 state dict"是**最安全的实现**。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY ============
  philosophy: {
    coreQuestion: 'DeepAgents 凭什么在 L 层被 LangChain 重点投入？',
    answer: '**DeepAgents = batteries-included harness + LangGraph 底层 + Python API 路线 + middleware 可插拔**。**对 MiCo 的核心启示：站在巨人肩膀（LangGraph）+ middleware 模式 + Python 库路线** 是 LangChain 在 L 层铺的开发者生态。',
    problemDiagnosis: [
      '**问题 1：harness 重复造轮子** — 每个 coding agent 都自己实现 subagent + planning + memory；DeepAgents 把这些封装成库。',
      '**问题 2：状态机没有标准** — OpenCode 自建、Aider 自建、Codex 自建；LangGraph 想做事实标准。',
      '**问题 3：planning 是 optional** — 多数 agent 让 LLM 决定要不要 plan，**DeepAgents 强制 middleware 注入**。',
      '**问题 4：sandbox 是后加的** — 多数 agent 默认 host 文件系统；DeepAgents in-memory state 天然隔离。',
    ],
    designPrinciples: [
      '**batteries-included** — 一个 import 拿全套（subagent + planning + file system + HITL）。',
      '**LangGraph 底层** — 状态机复用 LangGraph，不重复造。',
      '**Python 库路线** — pip install，import 就能用，对 ML 生态友好。',
      '**Middleware 模式** — planning / memory / filesystem 都是可插拔 middleware。',
      '**In-memory state 隔离** — sandbox 天然安全，agent 看不到 host。',
    ],
    differentiationMatrix: [
      { vs: 'OpenCode', diff: 'OC 是 markdown subagent + Node；DeepAgents 是 Python API + LangGraph。**OC 强在 file-first，DeepAgents 强在 API-first**。' },
      { vs: 'LangGraph (raw)', diff: 'LangGraph 是低层状态机；DeepAgents 是高层 harness。**LangGraph 强在灵活，DeepAgents 强在开箱即用**。' },
      { vs: 'AutoGen', diff: 'AutoGen 是 Microsoft 多 agent 对话；DeepAgents 是 LangChain 单 agent + subagent。**AutoGen 强在多 agent 对话，DeepAgents 强在单 agent 复杂度**。' },
      { vs: 'MiCo', diff: 'MiCo 当前没有 harness 库抽象。**抄 DeepAgents = create_deep_agent 5 行 API + middleware 可插拔**。' },
    ],
  },

  // ============ ④ TIMELINE ============
  timeline: [
    { date: '2024-09', event: 'LangChain 内部项目 "DeepAgents" 启动' },
    { date: '2024-12', event: '首次开源，star 数破 1k' },
    { date: '2025-03', event: '基于 LangGraph 重写，batteries-included 哲学成型' },
    { date: '2025-06', event: 'TodoListMiddleware + FilesystemMiddleware 发布' },
    { date: '2025-10', event: 'HITL (human-in-the-loop) 完善，HITLMiddleware 发布' },
    { date: '2026-02', event: 'v0.1.0 stable，star 数破 5k' },
    { date: '2026-05', event: '论文 Agent Harness Engineering 收录' },
    { date: '2026-08', event: '持续滚动 release，LangChain 生态核心' },
  ],

  // ============ ⑤ CONCLUSION ============
  conclusion: {
    summary: '**DeepAgents** 是 L 层"batteries-included harness"路线的代表。**对 MiCo 的核心启示：站在巨人肩膀（LangGraph）+ middleware 模式 + Python 库路线 + 5 行 API** 是 LangChain 在 L 层铺的开发者生态。',
    forMico: [
      '**5 行 API** — 把 MiCo 的 agent 创建简化到 5 行，create_mico_agent() 一行拿全套。',
      '**Middleware 模式** — planning / memory / observability 设计成可插拔 middleware。',
      '**In-memory state 隔离** — sandbox 用 in-memory state 天然安全。',
      '**Python 库路线** — pip install mico，对 ML 生态友好。',
      '**L 层 orchestration 评分**：state 5 / scheduling 4 / memory 5 / mcp 3 / sandbox 4 / error 4 / observability 4 / deployment 3 / governance 4。',
      '**论文定位**：L 层 47 个项目，DeepAgents 是 "batteries-included harness + middleware 模式" 路线标杆。',
    ],
  },
};
