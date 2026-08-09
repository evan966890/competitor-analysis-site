// AI 视角：把"让 AI 帮忙分析"做成可执行的工作流。
// 三种模式：①预置分析（已写好）②复制 prompt 出去跑（任何 AI 工具）③现场调用（占位，需要 API key）
window.TD_AILENS = [
  {
    id: 'compaction-3way',
    name: '3 家上下文压缩策略对比',
    icon: '◈',
    mode: 'prebuilt',
    engine: 'Mavis (MiniMax) · 2026-08-04 实测分析',
    products: ['hermes', 'qm', 'openclaw'],
    related: ['compaction'],
    summary: '把"长会话撞墙"这件事拆开：触发时机、压缩粒度、血缘/可回溯、平台治理——三个开源实现走出了三条互不相同的路。',
    sections: [
      {
        h: '一、为什么压缩是 2026 年的新主线',
        p: 'agent 跑长任务时，上下文窗口必然撞墙。但"撞墙后怎么办"各家做法分裂：有的把"压摘要"做成会话生命周期事件（Hermes），有的做平台级硬预算（QM），有的把"压了哪些文件"做进摘要（OpenClaw）。差别在**失忆的颗粒度**——粗压会丢证据，细压要分清"哪些不能丢"。',
      },
      {
        h: '二、三个实现的拆解',
        p: '**Hermes**：把压缩做成"生一个子会话"。每次压缩关闭当前 SQLite 会话行，创建以摘要为种子的子会话，session_id 轮换，父子血缘链。`CompressionCommitFence` 保证提交前可取消，失败不留半截现场。血缘模糊时 fail-closed——宁可报错也不接错链。这条路优雅，**前提是你接受"压缩后所有后续引用都改 ID"**。',
        p: '**QM**：平台内核做。`MAX_CONTEXT_ENTRIES=400`、`MAX_CONTEXT_TOKENS=120_000`、近端保留 60% token——硬预算跟着 scope 走，不跟会话走。后台压缩与前台回合解耦不阻塞用户。**最关键的安全污点标记** `securityTainted` 随摘要传递——被外部数据污染过的历史，压缩后仍然带污点，验收时仍能识别。',
        p: '**OpenClaw**：摘要消息带"读了/改了哪些文件"——`CompactionDetails.readFiles` 和 `modifiedFiles`。在编码 agent 场景里这俩清单是验收的最强证据。增量压缩，从上一个压缩边界开始。CJK 字符单独估算 token，中文团队预算不会系统性跑偏。',
      },
      {
        h: '三、对 MiCo 的启示（3 条）',
        p: '**① 压缩要保"证据"**——`securityTainted`、`readFiles/modifiedFiles` 都是"压缩后不能丢的东西"。验收场景下，丢证据=丢命。MiCo 现在无平台级压缩（继承 Multica，平台层缺位），上下文用量与 token 用量分显（P0-3）是补洞第一步。',
        p: '**② 压缩要是"会话生命周期事件"**——Hermes 的"压缩=生新子会话"是优雅的实现。MiCo 任务卡的"上下文"区将来可以挂 lineage 链，复盘时能跳到任一历史会话。',
        p: '**③ 平台层必须有自己的预算视角**——QM 的 scope 级 120k/400 条硬上限，是平台层独立于 harness 的能力。MiCo 上下文用量要变成"按 scope/按空间/按任务"的多维预算——这是 P0-3 之后的下一步。',
      },
    ],
    promptForReplay: '你是 AI 平台分析师。请对比 Hermes / QM / OpenClaw 三家上下文压缩实现：①触发时机与预算；②摘要策略（粒度/语义/防丢证据）；③血缘/可回溯；④平台级治理。给一段 800 字分析，并指明"对一家做企业级 agent 平台（如 MiCo）的三条启示"。',
  },

  {
    id: 'product-philosophy',
    name: '22 个产品的理念谱系',
    icon: '✦',
    mode: 'prebuilt',
    engine: 'Mavis (MiniMax) · 基于 motto 聚类',
    products: ['mico', 'multica', 'qm', 'openclaw', 'hermes', 'paperclip', 'cabinet', 'opencode', 'linear', 'jira-meego', 'slack', 'feishu', 'workbuddy', 'claude-ma', 'crewai', 'qoderwake', 'chatgpt-desktop', 'mavis', 'feishu-codem', 'claude-tag', 'agent365', 'openworker', 'buzz', 'qoderwork'],
    related: [],
    summary: '把 22 个产品按"主语"重新聚类，会发现 6 个理念家族：执行者、队员、雇员、场所、知识底座、控制平面。每个家族对"agent 是什么"有完全不同的回答。',
    sections: [
      {
        h: '一、按"主语"重排：6 个家族',
        p: '**1. 执行者家族**（"主语=工作项"）——Linear / Jira / Meego / Multica / MiCo。把工作项做成一等公民，agent 是"高级执行者"。这条线最强的是"任务动线"（收单→排期→流动→复盘）。',
        p: '**2. 队员家族**（"主语=agent 队友"）——OpenClaw / Hermes / Mavis / OpenWorker。把 agent 当"队友/同事"，首要问题是"它会啥、能跟谁协作、谁来管它"。',
        p: '**3. 雇员家族**（"主语=AI 员工/编制"）——Paperclip / QoderWake / MiCo / 微软 Agent 365。把 agent 当员工，编制、汇报线、绩效、试用期、离职交接都是核心——这条线最像真实公司。',
        p: '**4. 场所家族**（"主语=对话/频道"）——Slack / 飞书 / Claude Tag。agent 是"驻场的人"，场所决定它的边界、计费、记忆。',
        p: '**5. 知识底座家族**（"主语=知识"）——Cabinet / Multica 部分。agent 是"会读你文件的助手"，文件即记忆，git 即审计。',
        p: '**6. 控制平面家族**（"主语=治理"）——Claude MA / Agent 365。agent 自己不执行，只发现/纳管/计费/审计。',
      },
      {
        h: '二、为什么这种分类有用',
        p: '**它能回答"MiCo 到底是几号家族"**——目前 MiCo 同时跨执行者（任务）、雇员（编制）、场所（IM 频道）三个家族。**这是 MiCo 的护城河，也是它的负担**。护城河：别人只押一个家族，你押三个，能完整闭环。负担：每个家族都有强手，每个家族都不够深。',
        p: '**它能解释市场为何从"应用商店"转向"员工编制"**——微软 Agent 365 把"上架=注册身份领权限"，Claude Tag 把"agent = 组织工牌"。雇员工具的市场叙事正在盖过"技能市场"的叙事。',
      },
      {
        h: '三、对 MiCo 的定位启示',
        p: '**① 不放弃三家族重叠，但要分主次**——MiCo 的主语应是"事（任务）"，编制和场所是支撑。如果三者并重，每个都做不深。',
        p: '**② 雇员家族是 2026-2027 的差异化胜负手**——执行者家族有 Linear/Multica 这种老手，雇员家族是 MiCo 领先一个身位的位置。要把"虾塘"翻译成 FTE 与成本的经营语言。',
        p: '**③ 控制平面家族是商业化外延**——Agent 365 的 $15/$99 验证了"治理订阅先行"。MiCo 虾塘 + 网关组合能直接套这个商业模型。',
      },
    ],
    promptForReplay: '你是产品策略师。下面是 22 个 AI agent 平台的 motto（一句话定位）：[粘贴]. 请把它们按"主语"重排聚成 4-6 个家族，每个家族用一句话命名，对每个家族给出"代表产品 + 核心问题"。最后回答：如果一个新平台同时跨三个家族，是护城河还是负担？为什么？',
  },

  {
    id: 'orchestration-5way',
    name: '5 种多 agent 编排的实现哲学',
    icon: '⌘',
    mode: 'prebuilt',
    engine: 'Mavis (MiniMax) · 基于 sourceLab 数据',
    products: ['crewai', 'qm', 'hermes', 'pi-monitor', 'multica'],
    related: ['orchestration-runtime'],
    summary: 'crewAI 把编排写进 Python 装饰器、QM 坍缩为 scope 配置、Hermes 走 Kanban 状态机、pi-monitor 不做编排只平铺、Multica 走 Squad 路由——五种哲学，分头抢占不同心智。',
    sections: [
      {
        h: '一、crewAI：DSL 派',
        p: '**定义**：用 `@start` / `@listen` / `@router` / `or_(...)` / `and_(...)` 把流程写进 Python 方法。Flow state 持久化、可重启、可回放。\n\n**心智**："先写代码，流程即代码"。\n\n**代价**：业务侧不能在某次任务现场改图——编排改动要发版。',
      },
      {
        h: '二、QM：scope 配置派',
        p: '**定义**：scope = 编排边界。给一个 scope 配 BROWSE 资源（Projects/Chats/Files/Crons/Keychain/Apps/Memory/Skills），scope 内一只 agent 跑核心循环。\n\n**心智**："先把团队边界划好，编排坍缩为资源组合"。\n\n**代价**：没有通用 DAG 编辑器，复杂流程表达力有限。',
      },
      {
        h: '三、Hermes：Kanban 状态机派',
        p: '**定义**：Orchestration: Auto + Nudge dispatcher，状态机 = Triage / Todo / Scheduled / Ready / In Progress。\n\n**心智**："看板就是编排图，列就是状态机，dispatcher 是兜底的人工推手"。\n\n**代价**：业务规则藏在 dispatcher 后面，不点开看不到。',
      },
      {
        h: '四、pi-monitor：平铺派',
        p: '**定义**：不做编排，只把 5 只 agent 的 AgentCard 平铺到画布，Spawn 边/Message 边用连线。\n\n**心智**："我不管你编排得多花哨，我只想知道此刻 5 只 agent 在干嘛、花了多少钱"。\n\n**代价**：不解决"怎么让 agent 协作"——只解决"协作的现场是什么样子"。',
      },
      {
        h: '五、Multica：Squad 路由派',
        p: '**定义**：Squad = 一组 agent，Leader 把任务路由给对的成员。\n\n**心智**："先把人编好队，事来了 Leader 派"。\n\n**代价**：Leader 本身的能力上限 = Squad 协作上限。',
      },
      {
        h: '六、对 MiCo 的启示',
        p: '**① 不要复刻 DSL**——crewAI 已经够强，MiCo 不卷这层。\n\n**② 也不先造通用 DAG 画布**——pi-monitor 已下架证明纯画布价值有限。\n\n**③ 把运行原语（分派/等待/汇合/重试/人工验收）做成平台能力**——CrewAI 的 `@listen`/`@router` 翻译成任务级事件，让业务在"任务+自动化+专家团"里配置。\n\n**④ 保留可回放的事件链**——所有"分派"和"汇合"落事件流，复盘能跳到任一历史。',
      },
    ],
    promptForReplay: '你是 AI 编排框架研究者。crewAI / QM / Hermes / pi-monitor / Multica 五家实现"多 agent 协作"各有何不同？用一段 200 字内的话定义每家的"核心范式"（一句话），然后说明"对企业级 agent 平台（如 MiCo），哪个范式最值得借鉴、为什么"。',
  },

  {
    id: 'personal-vs-enterprise',
    name: '个人级 vs 公司级的分水岭',
    icon: '⚿',
    mode: 'prebuilt',
    engine: 'Mavis (MiniMax) · 基于 OpenWorker 8/4 入库观察',
    products: ['openworker', 'openclaw', 'hermes', 'mico', 'multica', 'qm', 'paperclip'],
    related: ['admin'],
    summary: 'OpenWorker/OpenClaw/Hermes 是"个人向"代表（5 天 12.4k stars 印证硬需求），QM/MiCo/Paperclip 是"公司向"代表。个人向拼"我用着爽"，公司向拼"老板敢不敢放行"——这是两个完全不同的产品战场。',
    sections: [
      {
        h: '一、个人向三个共同点',
        p: '**1. agent 是"我"的延伸，不是"组织"的员工**——账号、记忆、计费都跟着"我"走。离职 = 数据全删。\n\n**2. 工具连接器拼"广度"**——OpenWorker 25+ 集成、OpenClaw 20+ 渠道、Hermes 多模型槽位。第一指标是"接得多"，不是"管得严"。\n\n**3. 信任模型是"人盯人"**——OpenWorker 桌面弹窗每次外发前确认，OpenClaw 默认 `--dangerously-skip-permissions`，Hermes 一只 agent 跑了 50 个任务就失控（YC 案例）。',
      },
      {
        h: '二、公司向三个共同点',
        p: '**1. agent 是"组织资产"**——档案、汇报线、试用期、绩效、离职交接。MiCo 虾档案 + Paperclip CEO/CTO + QoderWake 角色说明书都是这套。\n\n**2. 信任模型是"档位+审计"**——WorkBuddy Craft/Plan/Ask、QM Strict/Auto/Dangerous、MiCo 试运行/转正。\n\n**3. 计费跟着"治理对象"走**——Agent 365 按席位收（治理订阅）、Claude Tag 按场所收、MiCo 按虾台账。',
      },
      {
        h: '三、分水岭的三个真实测试',
        p: '**测试 1：换人**——离开公司/换组，个人向产品记忆全丢，公司向产品记忆跟随组织走。\n\n**测试 2：审批**——5 万块的外发金额谁批？个人向没人批（出事自己担），公司向走 Board/审批流。\n\n**测试 3：成本归集**——5 只 agent 跑了一个月花了 10 万，公司向能说"市场部那 3 只花了多少"，个人向只能给个总数。',
      },
      {
        h: '四、MiCo 的护城河就是这三条',
        p: 'OpenWorker 的 12.4k stars 证明个人向的硬需求——MiCo 也得有"个人虾"形态（Mavis 多 harness 之一）。\n\n但**MiCo 的真正护城河是"换人/审批/成本归集"三条测试**——OpenWorker/OpenClaw 全过不了。\n\n守住这个护城河，**把 OpenWorker 25+ 集成的清单接进来**（不重造），把它的桌面弹窗 UX 搬到 MiCo 审批流（更轻的代码量）——这两件事一做，MiCo 既有个人向体验，也有公司向治理。',
      },
    ],
    promptForReplay: '你是企业 AI 产品经理。请对比"个人向 agent 产品"（OpenWorker/OpenClaw/Hermes）和"公司向 agent 产品"（QM/MiCo/Paperclip）。从信任模型、记忆归属、计费方式、治理对象四个维度，列出 3 条最重要的"分水岭"指标。说明"对一家做企业级 agent 平台（如 MiCo），这三个分水岭意味着什么样的护城河与负担"。',
  },
  {
    id: 'multi-agent-coding-4way',
    name: '多 agent 编程的 4 种解法',
    icon: '◫',
    mode: 'prebuilt',
    engine: 'Mavis (MiniMax) · 2026-08-04 基于 Vibe Kanban / Raft / Ruflo / OpenAgents 4 家产品对比',
    products: ['vibe-kanban', 'raft', 'ruflo', 'openagents'],
    related: ['orchestration', 'task', 'memory'],
    summary: '把"多个 AI 程序员同时开工"这件事拆开：隔离（worktree/IM/protocol/agent 边界）、路由（按 task.kind 映射 / @mentions / 5 拓扑 / capability 注册）、记忆（无 / 私有 SQLite / HNSW+SONA / 外部 RAG）、合并（人工 PR / 外部 git / Queen 自动合码 / 无）。4 家走出了 4 条互不重叠的路。',
    sections: [
      {
        h: '一、4 种"开箱就组队"路线',
        p: '**Vibe Kanban**：Web/TUI 双端 + 6 个 coding agent 预集成 + Git Worktree 物理隔离。最直白，专做"编程"一件事。14.2k stars 印证"多 agent 同时干"是 2025-2026 硬需求。',
        p: '**Raft**：Slack 体感 + 外部 agent 通过 webhook 挂进 channel。不预制 agent，runtime 留给用户。最易上手，5 行命令挂进你已经跑着的 Claude/Codex。',
        p: '**Ruflo**：`npx ruflo init` 一行命令 + Claude Code 自动获得 100+ specialist + 5 swarm 拓扑 + HNSW 记忆 + SONA 自学习。能力最满，但 CLI + 314 工具 = 配置爆炸。',
        p: '**OpenAgents**：自研 Network 协议 + 3 内置 agent (data/plugin/web) + 200+ 第三方插件。HKU 学术派严谨，Apache 2.0 + 自部署。',
      },
      {
        h: '二、隔离机制的本质差别',
        p: '**VK = 物理隔离**（每个 task 一个 worktree，6 个 agent 改同一 repo 不打架）\n\n**Raft = 频道隔离**（不同 thread 跑不同事，channel 级权限）\n\n**Ruflo = 拓扑隔离**（hierarchical/mesh/ring/star/adaptive 5 种 swarm 模式）\n\n**OpenAgents = 协议隔离**（agent-to-agent 消息 + 注册 + 路由）',
        p: '**取舍**：物理隔离 = 最强 + 最浪费资源；频道隔离 = 最自然 + 容易 context 泄漏；拓扑隔离 = 最灵活 + 配置复杂；协议隔离 = 最标准 + 学术味重。',
      },
      {
        h: '三、记忆与合并——4 家做了 4 件事',
        p: '**记忆**：VK 无（fresh start）/ Raft 私有 SQLite（agent 各自记住自己的）/ Ruflo HNSW+SONA（共享 + 自学）/ OpenAgents 无（靠外部 RAG 插件）',
        p: '**合并**：VK 人工 PR（worktree 各自分支）/ Raft 外部 git（thread close 后续靠 git）/ Ruflo Queen 自动合码（hierarchical 拓扑）/ OpenAgents 无内置',
        p: '**结论**：Ruflo 在"记忆+合并"两栏都领先，是 4 家里"工程化最完整"的；其他 3 家各有所长但都把这两件事留给人或外部工具。',
      },
      {
        h: '四、对 MiCo 的 4 条启示',
        p: '**① 隔离 = 必学 VK**：每虾=独立工作目录（worktree 范式），保证多虾并行改同一资产不冲突。这是最便宜的护城河，1 周可落地。',
        p: '**② 路由 = 学 Ruflo 部分**：5 拓扑全做没必要，做 2-3 种（hierarchical + mesh + adaptive）够用。避免配置爆炸。',
        p: '**③ 记忆 = 必须达 Ruflo 水平**：HNSW 索引 + SONA 自学习（成功轨迹→下次直接抄）。这是 2026 最低标准，MiCo Assets（1067 节点图谱）应升级为 HNSW + 自学习回路。',
        p: '**④ 合并 = 必学 Ruflo Queen**：MiCo 应有"Queen 虾"角色——任务派给 Worker 虾，Queen 虾自动收集产出、整合 PR。这是 MiCo 区别于其他 3 家的最大机会。',
      },
    ],
    promptForReplay: '你是 AI 平台分析师。Vibe Kanban / Raft / Ruflo / OpenAgents 都是 2026 年"多 agent 编程平台"。请从以下 5 个维度对比：\n1. 接入门槛（一行命令 / 5 行命令 / wizard / 文档）\n2. 隔离机制（worktree / channel / topology / protocol）\n3. 记忆方式（无 / 私有 / HNSW+自学习 / 外部 RAG）\n4. 合并能力（人工 PR / 外部 git / Queen 自动 / 无）\n5. 用户群体（个人/小团队 / 团队协作 / 技术极客 / 学术）\n\n对每家给出一句话定位 + 一句话护城河 + 一句话弱点。结尾写"对一家做企业级 agent 平台（如 MiCo），3 条最重要的启示"。',
  },
];

// ================= 复制 prompt 模板 =================
// 用法：用户选产品+维度 → 生成可复制的 prompt 块。
// 这里的模板是生成器：运行时把 {products} {dim} 替换为选中内容。
window.TD_AILENS_PROMPTS = [
  {
    id: 'compaction-replay',
    name: '上下文压缩策略对比',
    dim: '上下文压缩',
    template: '你是 AI 平台分析师。下面是 {products} 的上下文压缩实现概述（来源：源码或官方文档）：\n\n{context}\n\n请从四个维度对比：\n1. 触发时机与预算（什么时候压、按什么预算压）\n2. 摘要策略（粒度/语义/防丢证据）\n3. 血缘/可回溯（压缩后能不能找回原始会话）\n4. 平台级治理（有没有 scope/组织级预算、安全污点是否随摘要走）\n\n输出一段 800 字分析 + "对一家做企业级 agent 平台（如 MiCo）的三条启示"。',
    buildContext(products) {
      const ctx = products.map(id => {
        const p = window.P?.[id] || { name: id, oneLiner: '' };
        return `- ${p.name}（${p.oneLiner || '参见 sourceLab/compaction 专题'}）`;
      }).join('\n');
      return ctx;
    },
  },
  {
    id: 'task-flow-replay',
    name: '任务流转效率对比',
    dim: '任务管理',
    template: '你是产品分析师。请对比 {products} 在"任务流转"上的设计与效率：\n1. 任务创建门槛（几步到一条任务？）\n2. 状态机清晰度（有几个状态？状态间迁移的条件是什么？）\n3. 验收机制（任务如何被"完成"？人工验收 vs 自动验收？）\n4. 父子/依赖（任务能嵌套吗？依赖怎么表达？）\n5. 回溯与复盘（历史任务能搜吗？完成率怎么算？）\n\n请按上述五点给一张对比表 + 200 字总结"对一家做企业级任务系统的启示"。',
  },
  {
    id: 'gov-model-replay',
    name: '安全治理模型对比',
    dim: '安全治理',
    template: '你是企业安全架构师。请对比 {products} 的安全治理模型：\n1. 凭据管理（存哪？谁能看到？）\n2. 自主度档位（有几档？每档的边界是什么？）\n3. 审批门禁（哪些操作需审批？谁批？）\n4. 审计与回溯（所有调用有日志吗？能回放吗？）\n5. 威胁模型（README/SECURITY.md 是否坦诚？）\n\n给一张对比表 + 200 字总结"对企业级 agent 平台的治理启示"。',
  },
  {
    id: 'product-philosophy-replay',
    name: '产品理念谱系分析',
    dim: '产品理念',
    template: '你是产品策略师。下面是 {products} 的 motto（一句话定位）：\n\n{context}\n\n请按"主语"重排聚成 4-6 个家族，每个家族用一句话命名。对每个家族给出：代表产品 + 核心问题 + 心智模型。\n\n最后回答：如果一个新平台同时跨三个家族，是护城河还是负担？为什么？',
    buildContext(products) {
      const ctx = products.map(id => {
        const p = window.P?.[id];
        return p ? `- ${p.name}：主语=${p.motto} · ${p.oneLiner}` : `- ${id}`;
      }).join('\n');
      return ctx;
    },
  },
  {
    id: 'phishing-replay',
    name: '多 agent 编排的 5 种实现哲学',
    dim: '多 agent 编排',
    template: '你是 AI 编排框架研究者。{products} 五家实现"多 agent 协作"各有何不同？\n\n用一段 200 字内的话定义每家的"核心范式"（一句话），然后说明"对企业级 agent 平台（如 MiCo），哪个范式最值得借鉴、为什么"。',
  },
];
