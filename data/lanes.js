// 板块对比：9 条能力栏目。每条 = 栏目讲解（idea/logic/verdict/mico）+ 产品实卡（截图+图注+可选气泡热点）
// hotspots: 相对坐标(%) 的气泡标注——像产品经理指着屏幕讲
window.TD_LANES = [
  {
    "id": "orch",
    "name": "编排 Orchestration",
    "icon": "⌘",
    "idea": "四种编排哲学：DSL（先用代码声明流程）、配置式（先把队伍编好再跑）、原语式（运行时动态起队伍）、画布式（不管编排只管看得见）。",
    "logic": "crewAI 把入口、监听、分支、状态写进部署代码，稳定却改动慢；专家团/编制先配置再跑；运行时原语让 agent 自己 spawn/派单/汇合，灵活却难管；pi-monitor 回避编排本身，只回答\"我手上一堆 agent 现在都在干嘛\"。",
    "verdict": "趋势不是把 DAG 画得更花，而是把流程定义、运行状态、人工闸门与执行证据连成可观测闭环。QM 用 scope+核心循环把编排坍缩为配置；crewAI 证明 DSL 的表达力；真正稀缺的是全过程可见、可恢复、可治理。",
    "mico": "MiCo 专家团是配置式；缺原语（P2-8 运行时协作原语）和画布（P1-11 在手负荷可见）。编排框架别卷，把\"看得见\"补上。",
    "items": [
      {
        "p": "qm",
        "img": "assets/shots/qm/02-home.png",
        "caption": "QM：不做编排框架，一个核心循环 + scope 隔离，编排坍缩为配置",
        "hot": [
          {
            "x": 18,
            "y": 16,
            "t": "BROWSE 导航",
            "d": "Projects/Chats/Files/Crons/Keychain/Apps/Memory/Skills——QM 的\"编排\"就是这些 scope 资源的组合，没有 DAG 编辑器。"
          },
          {
            "x": 62,
            "y": 55,
            "t": "AI teammate 自我介绍",
            "d": "\"I run tasks on a computer of my own and work across your connected tools\"——每个员工一只 scoped agent，而不是一张编排图。"
          }
        ]
      },
      {
        "p": "hermes",
        "img": "assets/shots/hermes/nav-Kanban.png",
        "caption": "Hermes：Kanban 编排（Orchestration: Auto + Nudge dispatcher）",
        "hot": [
          {
            "x": 16,
            "y": 13,
            "t": "Orchestration: Auto",
            "d": "编排是一个可切换的模式档，而不是一套图。Triage→Todo→Scheduled→Ready→In Progress 就是它的状态机。"
          },
          {
            "x": 78,
            "y": 19,
            "t": "Nudge dispatcher",
            "d": "人工推一下调度器——编排的最终兜底仍然是人。"
          }
        ]
      },
      {
        "p": "paperclip",
        "img": "assets/shots/paperclip/03-EVA-dashboard.png",
        "caption": "Paperclip：编制即编排——CEO/CTO/Reflection Coach 常驻心跳",
        "hot": [
          {
            "x": 25,
            "y": 22,
            "t": "Agents 卡",
            "d": "EVA-3 评审任务挂在 CEO/CTO 名下——组织图就是编排图。"
          },
          {
            "x": 50,
            "y": 82,
            "t": "Recent Tasks",
            "d": "\"Hire your first engineer and create a hiring plan\"——编排从一份岗位说明书开始。"
          }
        ]
      },
      {
        "p": "pi-monitor",
        "img": "assets/shots/pi-monitor/image1.png",
        "caption": "pi-monitor：画布式——不编排，只平铺所有 agent 的状态",
        "hot": [
          {
            "x": 20,
            "y": 22,
            "t": "AgentCard",
            "d": "项目+角色+分支+当前工具调用，一屏看全 5 只 agent。Spawn 边/Message 边用连线表达协作。"
          },
          {
            "x": 84,
            "y": 28,
            "t": "成本面板",
            "d": "$7.01 / 14.5M tokens 实时滚动——画布的核心价值是\"在手负荷可见\"。"
          }
        ]
      },
      {
        "p": "mico",
        "img": "assets/shots/mico/N09b-岗位虾后台-列表.jpeg",
        "caption": "MiCo/岗位虾：编制化配置式——上岗审批 + 试运行 + 发版门禁",
        "hot": [
          {
            "x": 30,
            "y": 22,
            "t": "All 25 只虾",
            "d": "试运行/Terminated/AI 质检未通过——编排单位是有工号的\"员工\"，不是节点。"
          }
        ]
      },
      {
        "p": "multica",
        "img": "assets/shots/multica/10-squads.png",
        "caption": "Multica：Squad 路由层——Leader 把任务分给对的成员",
        "hot": []
      },
      {
        "p": "qoderwake",
        "img": "assets/shots/codewaker/02-我的群组.png",
        "caption": "QoderWake 群组：多 Waker 编组做项目（任务进行中 12/13）",
        "hot": []
      },
      {
        "p": "mavis",
        "img": "assets/shots/mavis/01-home.jpeg",
        "caption": "Mavis：Agent Teams——角色分工并行，工程化防跑散",
        "hot": []
      },
      {
        "p": "crewai",
        "evidence": "官方文档图",
        "img": "assets/shots/crewai/01-flow-overview.png",
        "caption": "crewAI Flows：代码、Crew 与共享 state 的总体关系——框架把编排定义放在部署代码里",
        "hot": [
          {
            "x": 18,
            "y": 86,
            "t": "共享 State",
            "d": "流程状态是框架的一等对象；每次运行持有自己的 state，方法通过 state 而非 IM/看板卡片传递现场。"
          },
          {
            "x": 51,
            "y": 59,
            "t": "Crew / Code 并列",
            "d": "一个 Flow 可组合普通代码和 Crew；它不是“只能多 agent”的图形编排器。"
          }
        ]
      },
      {
        "p": "crewai",
        "evidence": "官方文档图",
        "img": "assets/shots/crewai/02-start-listen-flow.png",
        "caption": "crewAI：@start → @listen 的最小执行图，入口输出触发下游方法",
        "hot": [
          {
            "x": 50,
            "y": 17,
            "t": "Start Method",
            "d": "入口通过装饰器声明。满足的多个 start 可以并行执行，编排语义随代码评审和发布走。"
          },
          {
            "x": 50,
            "y": 60,
            "t": "Listener",
            "d": "监听上游输出后再运行，依赖关系由方法引用表达；好处是确定，代价是运行中改动需要重新发版。"
          }
        ]
      },
      {
        "p": "crewai",
        "evidence": "官方文档图",
        "img": "assets/shots/crewai/03-branch-router-flow.png",
        "caption": "crewAI：or_（OR Trigger）——任一上游方法完成，即可触发 Logger",
        "hot": [
          {
            "x": 50,
            "y": 16,
            "t": "Start / Second Method",
            "d": "入口先触发 second_method；这两个上游各自都能向下游发出事件。图只是代码定义的可视化，不是现场可编辑的控制台。"
          },
          {
            "x": 42,
            "y": 52,
            "t": "OR Trigger",
            "d": "官方示例用 or_(start_method, second_method)：任一上游有输出就触发 Logger；不是 AND，也不是 Router。"
          }
        ]
      },
      {
        "p": "crewai",
        "evidence": "官方文档图",
        "img": "assets/shots/crewai/04-and-trigger-flow.png",
        "caption": "crewAI：and_（AND Trigger）——所有上游条件完成后，才允许下游 Logger 运行",
        "hot": [
          {
            "x": 50,
            "y": 16,
            "t": "Start / Second Method",
            "d": "两个上游都会写入自己的结果；下游不因第一个事件抵达而立即执行。"
          },
          {
            "x": 42,
            "y": 52,
            "t": "AND Trigger",
            "d": "官方示例用 and_(start_method, second_method)：只有全部指定方法都有输出，Logger 才被触发。"
          }
        ]
      },
      {
        "p": "crewai",
        "evidence": "官方文档图",
        "img": "assets/shots/crewai/05-router-flow.png",
        "caption": "crewAI：@router——方法的返回事件决定后续走向（success / failed）",
        "hot": [
          {
            "x": 50,
            "y": 16,
            "t": "Router Method",
            "d": "带 @router() 的方法依据运行结果返回事件标签；路由决策仍写在部署代码中。"
          },
          {
            "x": 42,
            "y": 52,
            "t": "两条后续路径",
            "d": "下游分别监听 success 或 failed；这才是官方示例中的条件路由，不是上一张 OR Trigger 图。"
          }
        ]
      },
      {
        "p": "crewai",
        "evidence": "官方企业资料",
        "img": "assets/shots/crewai/04-enterprise-studio.png",
        "caption": "crewAI Enterprise Studio（官方文档截图）：将 DSL 包进 Crew Studio/Trace/Usage 管理面",
        "hot": [
          {
            "x": 10,
            "y": 52,
            "t": "管理面",
            "d": "Crews、Templates、Integrations、环境变量、LLM、Tools、Trace、Usage 分开管理——产品化后，治理面自然从 DSL 里长出来。"
          },
          {
            "x": 63,
            "y": 35,
            "t": "Configure your Crew",
            "d": "Studio 是对 DSL 的上层配置入口，但这张官方空态截图不能证明真实生产运行量；本网站仅将它作为信息架构证据。"
          }
        ]
      }
    ],
    "decisions": [
      {
        "verdict": "学 QM (配置式)",
        "why": "QM 用 scope+核心循环把\"编排\"坍缩为配置（没有 DAG 编辑器），最适合公司级稳定运营。配置改动无需发版，跟 MiCo 编制化思路一致。"
      },
      {
        "verdict": "不学 crewAI (DSL)",
        "why": "DSL 流程定义在部署代码里，运行时改动需要重新发版——MiCo 编制场景需要快速迭代 agent 团队配置，DSL 慢。"
      },
      {
        "verdict": "补\"画布式\"缺口",
        "why": "Pi-monitor 走画布式只看\"在手负荷\"，MiCo 缺这块（P1-11）。把\"看得见\"补上是 MiCo 跟所有对手拉开差异的护城河。"
      }
    ]
  },
  {
    "id": "task",
    "name": "任务管理 Issues/任务",
    "icon": "☰",
    "idea": "任务是\"工作\"的最小记账单位。谁把任务做成一等公民，谁就能回答\"办成了没有\"。",
    "logic": "Linear 把任务做成流动（Triage→Cycle→Done）；Multica/MiCo 继承同一骨架并把受让人换成 agent；飞书项目把任务做成流程合规；Paperclip 把任务做成公司票据（approval 驱动）；QM/Slack 基本没有任务模型——只有消息。",
    "verdict": "任务模型的分水岭不在\"有没有看板\"，在有没有**验收**：状态机人人有，acceptor+rubric+证据只有 MiCo 在认真做（红→绿证据已上卡）。",
    "mico": "MiCo 看板骨架已是 Linear 级；短板在收口（验收收件箱/批量验收/结构化 DoD），不在执行。",
    "items": [
      {
        "p": "mico",
        "img": "assets/shots/mico/N01-任务页-新版.jpeg",
        "caption": "MiCo 看板：Backlog/Todo/In Progress/In Review + 类型/领域徽标 + EPIC 树",
        "hot": [
          {
            "x": 33,
            "y": 9,
            "t": "Board/List/Board(stats)",
            "d": "完成率第一次上墙（筛选口径 10%）——能看见，才有得治。"
          },
          {
            "x": 47,
            "y": 33,
            "t": "类型：修复 / 领域徽标",
            "d": "任务类型字段落地（顶层设计 §11.1 的缺口补上），受控 label 成为治理抓手。"
          },
          {
            "x": 88,
            "y": 17,
            "t": "In Review 13",
            "d": "验收列是 MiCo 独特的第四态——但压单也全在这里：真人任务 41.7% 压待验收。"
          }
        ]
      },
      {
        "p": "multica",
        "img": "assets/shots/multica/07-issues-board.png",
        "caption": "Multica 看板：MiCo 的上游原版——同一副骨架",
        "hot": [
          {
            "x": 50,
            "y": 40,
            "t": "拖拽分配",
            "d": "把卡拖到 agent 的栏目即派单——\"agent 像同事一样出现在看板里\"的原始形态。"
          }
        ]
      },
      {
        "p": "multica",
        "img": "assets/shots/multica/08-issue-detail.png",
        "caption": "Multica issue 详情：讨论/状态/子任务",
        "hot": []
      },
      {
        "p": "jira-meego",
        "img": "assets/shots/jira-meego/04-meego-工作台.jpeg",
        "caption": "Meego（飞书项目）：工作台——全部待办 58，我的工作/任务/本周到期",
        "hot": [
          {
            "x": 20,
            "y": 28,
            "t": "我的工作",
            "d": "流程视角的任务：合规、可追溯、到期提醒——审计证据的生产机器。"
          }
        ]
      },
      {
        "p": "paperclip",
        "img": "assets/shots/paperclip/05-EVA-issues.png",
        "caption": "Paperclip issues：公司票据——每张票挂审批与成本",
        "hot": []
      },
      {
        "p": "hermes",
        "img": "assets/shots/hermes/nav-Kanban.png",
        "caption": "Hermes Kanban：Triage→Ready 泳道 + 依赖满足才派单",
        "hot": []
      }
    ],
    "decisions": [
      {
        "verdict": "学 Multica (Issue 一等公民)",
        "why": "任务=实体是所有任务平台的基础。Multica 4 态 + Issue_link 关联是简单可用的基线，MiCo 任务卡应明确态 (Todo/InProgress/InReview/Done/Canceled)。"
      },
      {
        "verdict": "学 Linear (Cycle + 50ms 手感)",
        "why": "Linear 的 50ms 手感是 2024 标杆。MiCo 任务动线要朝这方向：拖拽/状态切换/SSE 实时 sync 必须 <100ms。"
      },
      {
        "verdict": "不学 OpenWorker (会话=任务)",
        "why": "会话即任务是个人向够用，公司级必补：① 父子任务 ② 验收态 ③ 跨任务记忆 ④ Issue 实体持久化。"
      }
    ]
  },
  {
    "id": "im",
    "name": "会话入口 IM",
    "icon": "◱",
    "idea": "消息是最高频的被动入口。谁占住\"有人找我\"，谁就占住工作台的门厅。",
    "logic": "Slack/飞书把动作吸附进对话（bot 回帖/挂载物）；MiCo Channels 把频道变成任务的房间（任务/频道/成员三 Tab）；QM 让同一只 agent 同时住在 Slack 与 Web；OpenClaw 反过来——把 20+ IM 都变成自己家的前厅。",
    "verdict": "IM 的终局不是\"更好的聊天\"，是**对话即收单**：@ 一句落成卡，卡片回执流回会话。这条动线谁都还没有做完——MiCo 离得最近（mico_im 已通，缺三态立卡）。",
    "mico": "MiCo 的 IM 定位=任务的前厅。不追飞书的人际聊天体验，守住 agent 是正式会话参与者这个差异。",
    "items": [
      {
        "p": "mico",
        "img": "assets/shots/mico/N02-Channels频道.jpeg",
        "caption": "MiCo Channels：频道跨工作区 + 任务/频道/成员三 Tab + 会议demo 频道",
        "hot": [
          {
            "x": 10,
            "y": 30,
            "t": "跨空间频道",
            "d": "mico-team / Agent项目 / MITCoreTea / 云原生层——频道第一次越过 workspace 边界。"
          },
          {
            "x": 36,
            "y": 8,
            "t": "三 Tab",
            "d": "任务/频道/成员——房间即任务容器，这就是\"IM 是任务的前厅\"的产品形态。"
          }
        ]
      },
      {
        "p": "slack",
        "img": "assets/shots/slack/04-app-client.jpeg",
        "caption": "Slack 客户端：Home/DMs/Activity/Files + 频道列表",
        "hot": [
          {
            "x": 8,
            "y": 15,
            "t": "Home/DMs/Activity",
            "d": "被动打开率的三根支柱：有人@我、有动作、有文件。通知即回访。"
          }
        ]
      },
      {
        "p": "feishu",
        "img": "assets/shots/feishu/01-messenger.jpeg",
        "caption": "飞书消息（小米办公 Pro）：54 未读 + 知识问答/会议/云文档/邮箱/任务全挂载",
        "hot": [
          {
            "x": 8,
            "y": 12,
            "t": "左侧挂载栏",
            "d": "消息是入口，文档/会议/审批/任务都是挂载物——挂载物再反向生成消息。"
          }
        ]
      },
      {
        "p": "qm",
        "img": "assets/shots/qm/02-home.png",
        "caption": "QM Chat：Slack 与 Web 同一只 agent、同一身份",
        "hot": []
      },
      {
        "p": "openclaw",
        "img": "assets/shots/openclaw/01-home.png",
        "caption": "OpenClaw Chat：把 20+ IM 收编成自己的前厅",
        "hot": [
          {
            "x": 55,
            "y": 42,
            "t": "你能做什么？",
            "d": "\"总结我最近的会话 / 帮我配置一个频道 / 检查系统健康状况\"——引导语即能力广告。"
          }
        ]
      },
      {
        "p": "cabinet",
        "img": "assets/shots/cabinet/23-general-channel.png",
        "caption": "Cabinet #general：房间内的团队频道，@agent 得到真回复",
        "hot": []
      },
      {
        "p": "feishu-codem",
        "img": "assets/shots/feishu-codem/01-home.jpeg",
        "caption": "飞书 CodeM：Bot/群聊发起研发任务，进度卡片回写",
        "hot": []
      }
    ],
    "decisions": [
      {
        "verdict": "学 Raft (频道混编)",
        "why": "频道混编（人 + agent 在同一 channel）是 2026 标配。MiCo 虾应支持飞书/Slack/企微双向，IM 既是入口也是上下文容器。"
      },
      {
        "verdict": "学 OpenWorker (双向触发)",
        "why": "OpenWorker 的\"@OpenWorker 触发 → 跑完回复\"是最低成本 IM 接入范式。MiCo 虾应支持\"@虾名\"自动接单。"
      },
      {
        "verdict": "自己做 IM-as-frontend",
        "why": "IM 是虾的\"前厅\"——不抢 runtime，但必须是虾的 UI 入口。MiCo 应让 IM 消息成为任务自动派单的源头。"
      }
    ]
  },
  {
    "id": "roster",
    "name": "编制与档案 Agent Roster",
    "icon": "⚿",
    "idea": "把 agent 当员工管：工号、职责、汇报线、试用期、绩效、退役——编制化是 MiCo 最硬的差异化。",
    "logic": "岗位虾后台是全公司唯一把 agent 当员工建档的地方（PS 工号/MID/汇报上级/BPM 审批）；Paperclip 用 CEO/CTO/Board 演了一家完整公司；Multica/Hermes/OpenClaw 只有\"配置\"，没有\"人事\"；QM 用 scope 做隔离但没有人事语言。",
    "verdict": "市场正在从\"应用商店\"转向\"员工编制\"（微软 Agent 365：上架=注册身份领权限）。编制化方向正确，要保持的是把编制翻译成 FTE 与成本的经营语言。",
    "mico": "守住编制化。缺口在离职交接（P1-14）、个人虾管理面、换内核不换档案（双开日落）。",
    "items": [
      {
        "p": "mico",
        "img": "assets/shots/mico/03-档案.png",
        "caption": "岗位虾档案：工号/汇报人/成本分摊/Harness 类型/容器规格/版本门禁",
        "hot": [
          {
            "x": 34,
            "y": 45,
            "t": "人事档案卡",
            "d": "Employee ID、汇报上级、Owning department、Billing rules 100%——agent 第一次有了人事档案。"
          },
          {
            "x": 12,
            "y": 40,
            "t": "能力配置菜单",
            "d": "Skill/容器/策略/版本——档案的每一项都可管、可审、可回滚。"
          }
        ]
      },
      {
        "p": "paperclip",
        "img": "assets/shots/paperclip/03-EVA-dashboard.png",
        "caption": "Paperclip：AI 公司编制——CEO/CTO 常驻 + Board 审批 + 预算",
        "hot": []
      },
      {
        "p": "multica",
        "img": "assets/shots/multica/09-agents.png",
        "caption": "Multica agents：只有\"创建\"，没有编制（本地/云运行时二选）",
        "hot": []
      },
      {
        "p": "hermes",
        "img": "assets/shots/hermes/nav-Profiles.png",
        "caption": "Hermes Profiles：多配置人格/工具面——配置不是编制",
        "hot": []
      },
      {
        "p": "openclaw",
        "img": "assets/shots/openclaw/12-agents.png",
        "caption": "OpenClaw agents：个人助理的多开与分工",
        "hot": []
      },
      {
        "p": "mico",
        "img": "assets/shots/mico/09-容器规格.png",
        "caption": "算力分档：4 核 8G/16G/32G——档案与算力分离的雏形",
        "hot": []
      }
    ],
    "decisions": [
      {
        "verdict": "学 Paperclip (角色+heartbeat)",
        "why": "Paperclip 的\"角色=状态机 + 持续 heartbeat\"是 AI 公司编制最纯的实现。MiCo 虾档案的\"工号+职级+试运行/转正\"跟这范式同源。"
      },
      {
        "verdict": "学 Multica (Squad 专家团)",
        "why": "Squad = 专家团，是\"任务路由+编制配置\"的标准解。MiCo 编制化（虾=员工 + 专家团=小组）应吸收这思路。"
      },
      {
        "verdict": "不学 OpenClaw (无编制)",
        "why": "OpenClaw 是\"我的助理\"个人向，无公司级编制。MiCo 必须有：工号/职级/试用期/转正/降级 完整生命周期。"
      }
    ]
  },
  {
    "id": "cron",
    "name": "定时与自动化 Cron",
    "icon": "◔",
    "idea": "数字员工价值最实的部分，是\"周期性但没人愿意干\"的活：日报、巡检、对账、监控。",
    "logic": "cron 是 agent 从\"被动接活\"到\"主动上班\"的第一步。MiCo Automation 已被 HR 系空间用成日常（每天 09:00 日报）；QM 把 cron 收进 scope（谁的定时任务谁负责）；OpenClaw/Hermes 的 cron 是个人助理标配；岗位虾档案新增 Cron Management 收口容器内 cron。",
    "verdict": "cron 人人有，**事件触发（webhook）与\"触发后收口\"**才是分水岭：定时 → 事件 → 建单 → 派单 → 产物归集，这条链目前没有人做全。",
    "mico": "第二幕核心项。cron 已起量，欠 webhook 事件触发与产物归集收口；虾容器内 cron 的平台级备份要收口。",
    "items": [
      {
        "p": "mico",
        "img": "assets/shots/mico/N04-Automation自动化.jpeg",
        "caption": "MiCo Automation：模板市场 + HR 系空间每天 09:00 准时跑日报",
        "hot": [
          {
            "x": 12,
            "y": 35,
            "t": "日报 ×5 空间",
            "d": "人力成本预/岗位基建/基础人事研/清河大学/【人力】人才——定时任务从玩具变成业务日常。"
          },
          {
            "x": 42,
            "y": 28,
            "t": "模板货架",
            "d": "每日新闻摘要/PR review 提醒/Bug 分诊/依赖审计/文档检查——模板化降低起配门槛。"
          }
        ]
      },
      {
        "p": "qm",
        "img": "assets/shots/qm/06-crons.png",
        "caption": "QM Crons：scope 持有的后台任务——谁的 cron 谁负责",
        "hot": []
      },
      {
        "p": "openclaw",
        "img": "assets/shots/openclaw/10-cron.png",
        "caption": "OpenClaw Cron：个人助理的定时任务",
        "hot": []
      },
      {
        "p": "hermes",
        "img": "assets/shots/hermes/nav-Cron.png",
        "caption": "Hermes Cron：定时自动化 + 失败归因",
        "hot": []
      },
      {
        "p": "paperclip",
        "img": "assets/shots/paperclip/06-EVA-routines.png",
        "caption": "Paperclip Routines：公司级周期事务",
        "hot": []
      },
      {
        "p": "chatgpt-desktop",
        "img": "assets/shots/chatgpt-desktop/01-app.png",
        "caption": "ChatGPT 桌面端：已安排（scheduled tasks）成一级入口",
        "hot": []
      },
      {
        "p": "cabinet",
        "img": "assets/shots/cabinet/20-room-main.png",
        "caption": "Cabinet Next-up runs：Editor 心跳日程（in 2d/3d/4d…）",
        "hot": [
          {
            "x": 82,
            "y": 42,
            "t": "Next-up runs",
            "d": "心跳即排班——数字员工的\"作息表\"第一次可见。"
          }
        ]
      }
    ],
    "decisions": [
      {
        "verdict": "学 Hermes (Cron + L1/L2/L3 归因)",
        "why": "Hermes 的\"失败归因 L1/L2/L3 三级\"是关键——agent 跑定时任务失败时，必须告诉用户\"是网络/工具/逻辑哪一层失败\"。"
      },
      {
        "verdict": "学 OpenWorker (本地 cron)",
        "why": "OpenWorker 的\"自动化\"作为桌面设置项，是个人向够用。MiCo 虾级 cron 应支持个人+公司双 scope。"
      },
      {
        "verdict": "不学 Multica (无 cron)",
        "why": "Multica 平台层 cron 缺位是硬伤。MiCo 虾必须从上线起就有 cron：日/周/月 + 失败归因 + 重试策略。"
      }
    ]
  },
  {
    "id": "memory",
    "name": "记忆与上下文 Memory",
    "icon": "◈",
    "idea": "没有知识底座的 agent 只会不断失忆和重复劳动。记忆的分层：工作记录 vs 可迁移经验。",
    "logic": "Cabinet 把记忆做成 markdown 文件（git 可审计）；QM 把记忆 scope 化（隔离先于共享）；OpenClaw 用 dreaming 自动整理；Hermes 用压缩血缘保住长会话；MiCo Assets 页把公司知识蒸馏成图谱（1067 节点）。",
    "verdict": "记忆的下一场仗不是\"记住\"，是**治理**：隔离（串店）、脱敏移交（离职）、蒸馏（badcase→铁律）——MiCo 记忆治理三件套的方向全对，要快。",
    "mico": "Assets 页上线是半步；任务卡内装配（引用资料/权限边界）与记忆治理（隔离/移交/蒸馏）是另半步。",
    "items": [
      {
        "p": "mico",
        "img": "assets/shots/mico/N03-Assets资产.jpeg",
        "caption": "MiCo Assets：蒸馏 481 份 + 知识图谱 1067 节点 806 边 + 实体更新流",
        "hot": [
          {
            "x": 35,
            "y": 12,
            "t": "蒸馏三态",
            "d": "成功 481 / 中 34 / 失败 7——知识生产第一次有流水线与良率。"
          },
          {
            "x": 60,
            "y": 45,
            "t": "知识图谱",
            "d": "人员 226/概念 184/会议决议 180/任务 136——公司知识从文档变成图。"
          }
        ]
      },
      {
        "p": "qm",
        "img": "assets/shots/qm/nav-memory.png",
        "caption": "QM Memory：scoped 记忆——你能看的与同事能看的完全隔离",
        "hot": []
      },
      {
        "p": "openclaw",
        "img": "assets/shots/openclaw/16-dreaming.png",
        "caption": "OpenClaw Dreaming：记忆自动整理/反思——蒸馏的消费级形态",
        "hot": []
      },
      {
        "p": "cabinet",
        "img": "assets/shots/cabinet/20-room-main.png",
        "caption": "Cabinet：知识库=markdown 文件夹，git 历史即可移植可审计",
        "hot": []
      },
      {
        "p": "hermes",
        "img": "assets/shots/hermes/01-home.png",
        "caption": "Hermes Sessions：会话即基础设施（压缩血缘的载体）",
        "hot": []
      },
      {
        "p": "claude-ma",
        "img": "assets/shots/claude-managed-agents/05-engineering-blog.jpeg",
        "caption": "Managed Agents：脑/手/记忆三层解耦——append-only session log",
        "hot": []
      }
    ],
    "decisions": [
      {
        "verdict": "学 Ruflo (HNSW + SONA 自学习)",
        "why": "HNSW 向量 + SONA 自学习是 2026 最低标准。MiCo Assets 必须升级：成功轨迹→自动 add 记忆→下次直接抄。"
      },
      {
        "verdict": "学 QM (scoped + security 污点)",
        "why": "QM 的\"scoped 隔离 + security 污点随摘要传递\"是公司级金标准。MiCo 多虾场景必须：scope 隔离 + 跨虾污点传递。"
      },
      {
        "verdict": "不学 OpenClaw (无公司级)",
        "why": "OpenClaw dreaming 是个人向记忆优化。公司级必须：① 跨虾共享 ② 可审计 ③ 可删除（GDPR）——OpenClaw 这套直接不能要。"
      }
    ]
  },
  {
    "id": "skills",
    "name": "技能生态 Skills",
    "icon": "✦",
    "idea": "Skills 是结构化能力包，不是 prompt——平台真正可积累的资产，也是 agent 的\"资本积累\"。",
    "logic": "OpenClaw 用 ClawHub 攒出最大社区生态；Multica/MiCo 把 skill 做成可复用单元但缺消费侧数据；QM 把 skill 收进 scope 并做管理员晋升；Hermes 的技能=过程性记忆（自我改进）。",
    "verdict": "技能系统的胜负手不在\"市场多大\"，在**供给侧自动补货**：轨迹→萃取→技能。HiAgent/QoderWork 都在做，MiCo 有人工确认版收件箱的最优路线。",
    "mico": "技能中心方向正确；缺使用率追踪（P0-6）与萃取管道（P2-14 人工确认版先行）。",
    "items": [
      {
        "p": "openclaw",
        "img": "assets/shots/openclaw/14-skills-workshop.png",
        "caption": "OpenClaw Skills Workshop：技能的创建/调试工作台",
        "hot": []
      },
      {
        "p": "multica",
        "img": "assets/shots/multica/11-skills.png",
        "caption": "Multica Skills：新建/URL 导入/从运行时复制——朴素但正典",
        "hot": []
      },
      {
        "p": "hermes",
        "img": "assets/shots/hermes/nav-Skills.png",
        "caption": "Hermes Skills：过程性记忆——技能是\"长出来\"的",
        "hot": []
      },
      {
        "p": "qm",
        "img": "assets/shots/qm/nav-skills.png",
        "caption": "QM Skills：scope 持有 + 授予共享 + 管理员晋升全组织",
        "hot": []
      },
      {
        "p": "workbuddy",
        "img": "assets/shots/workbuddy/02-docs-overview.jpeg",
        "caption": "WorkBuddy：内置 20+ Skills 包 + MCP，兼容 OpenClaw 技能",
        "hot": []
      },
      {
        "p": "mavis",
        "img": "assets/shots/mavis/02-skills.jpeg",
        "caption": "Mavis 技能市场：浏览和发现 AI 智能体技能",
        "hot": []
      },
      {
        "p": "mico",
        "img": "assets/shots/mico/N05-Featured精选.jpeg",
        "caption": "MiCo 精选：专家/技能/连接器——零件铺待升级成整机店",
        "hot": []
      }
    ],
    "decisions": [
      {
        "verdict": "学 Ruflo (215 MCP 工具)",
        "why": "Ruflo 的\"能力密度\"是行业标杆。MiCo 中央 MCP 应至少有 50+ 高频工具，覆盖文件系统/GitHub/Jira/Notion/Slack/数据库。"
      },
      {
        "verdict": "学 OpenWorker (25+ 集成)",
        "why": "OpenWorker 的 25+ 集成清单是上游。MiCo 别重造，参考其连接器目录按\"虾需要什么\"维度复制。"
      },
      {
        "verdict": "不学 OpenClaw (ClawHub 封闭)",
        "why": "ClawHub 是 OpenClaw 自家生态，第三方贡献门槛高。MiCo 技能市场必须：开放协议（基于 MCP）+ 第三方可发布 + 内置评审。"
      }
    ]
  },
  {
    "id": "gov",
    "name": "安全与治理 Security",
    "icon": "⚠",
    "idea": "agent 越多，治理越难——配置分散、权限易失控、执行难审计、问题难追溯。治理是规模化的入场券。",
    "logic": "QM 把威胁模型写成 SECURITY.md（三姿态+已知局限）；Paperclip 用 Board 审批做人工闸门；WorkBuddy 用 Craft/Plan/Ask 分自主度；岗位虾用 BPM 审批+发版门禁+质检做上岗闸；Claude MA 把凭据收进平台（vendor 托管）。",
    "verdict": "安全姿态的正确形态是**档位**而非开关：试用=每步审批，转正=全自动——上岗门禁第一次有了运行时对应物。统一网关（凭据托管+调用级拦截）是 MiCo 的一号工程，越早做改造面越小。",
    "mico": "146 个 MCP 约 60 个疑似鉴权有问题——网关是\"调用发生那一刻\"唯一能拦截的位置。",
    "items": [
      {
        "p": "qm",
        "img": "assets/shots/qm/07-keychain.png",
        "caption": "QM Keychain + 三姿态：Strict（逐调用审批）/Auto（默认，分类筛选）/Dangerous",
        "hot": [
          {
            "x": 50,
            "y": 40,
            "t": "Keychain 视图",
            "d": "凭据按 scope 隔离展示——财务部能用什么钥匙，工程部完全看不见。"
          }
        ]
      },
      {
        "p": "paperclip",
        "img": "assets/shots/paperclip/04-EVA-inbox.png",
        "caption": "Paperclip Inbox：Board 审批——人工闸门的产品化",
        "hot": []
      },
      {
        "p": "workbuddy",
        "img": "assets/shots/workbuddy/03-docs-claw.jpeg",
        "caption": "WorkBuddy：Craft/Plan/Ask 三档自主度",
        "hot": []
      },
      {
        "p": "mico",
        "img": "assets/shots/mico/06-技能管理.png",
        "caption": "岗位虾技能管理：批量安装/卸载 + 发版审批 + 回滚",
        "hot": []
      },
      {
        "p": "claude-ma",
        "img": "assets/shots/claude-managed-agents/04-docs-environments.jpeg",
        "caption": "Managed Agents Environments：凭据与执行环境平台托管",
        "hot": []
      },
      {
        "p": "cabinet",
        "img": "assets/shots/cabinet/14-app-launched.png",
        "caption": "Cabinet 明示风险：agents 以 --dangerously-skip-permissions 全权限运行",
        "hot": []
      }
    ],
    "decisions": [
      {
        "verdict": "学 QM (Strict/Auto/Dangerous 三姿态)",
        "why": "QM 的 3 姿态是行业金标准：默认 Strict（每步审批）→ Auto（写操作自动）→ Dangerous（全自动+审计）。MiCo 虾必须有同等粒度。"
      },
      {
        "verdict": "学 Paperclip (Board 审批)",
        "why": "人类 gating = 终极安全兜底。MiCo 虾审批流：超过 X 金额/影响的任务自动走 Board/审批流。"
      },
      {
        "verdict": "不学 Vibe Kanban (默认全开)",
        "why": "VK 默认 `--dangerously-skip-permissions` = 危险。MiCo 绝不能默认信任——必须显式三档（试用/转正/降级），每档对应不同自主度。"
      }
    ]
  },
  {
    "id": "admin",
    "name": "管理后台与企业治理 Admin",
    "icon": "⚙",
    "idea": "前台决定 agent 能不能干活，后台决定公司敢不敢让 agent 干活。管理后台的及格线是身份+席位+用量，优秀线是档案+审批+台账+成本中心。",
    "logic": "岗位虾后台是全公司唯一把 agent 当员工建档的地方（工号/汇报线/审批/版本/容器/成本分摊）；Agent365 走另一条路——不建不跑，只做注册表与影子发现，把身份（Entra Agent ID）和安全栈（Defender/Purview）叠上去；Claude Tag 的 Agent Identity 给 agent 一张\"组织工牌\"，计费随场所；WorkBuddy 企业版停在认证源+席位的及格线；QoderWake 用预置角色把\"岗位说明书+审批门禁\"做成开箱体验。",
    "verdict": "后台的分水岭是\"治理对象\"：管应用（席位/用量）→ 管员工（档案/审批/绩效）→ 管身份（注册表/影子发现/独立工牌）。微软的\"上架=注册身份领权限\"与 MiCo 的编制化同向——市场正在从应用商店转向员工编制，MiCo 领先一个身位，别把优势耗在补齐别人已验证的及格线上。",
    "mico": "虾塘（档案+审批+版本+容器+成本分摊）已超优秀线；缺口在个人虾管理面、离职交接、影子 agent 纳管（各部门散落自建）。对外商业化：治理订阅先行（E7 已验证）。",
    "items": [
      {
        "p": "mico",
        "img": "assets/shots/mico/N09b-岗位虾后台-列表.jpeg",
        "caption": "岗位虾后台：Position Shrimp List——工号/MID/汇报上级/状态/Harness 筛选",
        "hot": [
          {
            "x": 30,
            "y": 22,
            "t": "All 25",
            "d": "试运行/Terminated/AI 质检未通过——生命周期状态机写在列表上。"
          },
          {
            "x": 68,
            "y": 34,
            "t": "筛选器族",
            "d": "Status/Use/Employee/MID/Department/Harness——按人事与内核双维度检索员工。"
          }
        ]
      },
      {
        "p": "qoderwake",
        "img": "assets/shots/codewaker/01-management.png",
        "caption": "QoderWake 管理台：我的 Wakers——角色说明书 + 本机/云端环境 + 审批门禁",
        "hot": [
          {
            "x": 22,
            "y": 30,
            "t": "爆炸头产品经理",
            "d": "\"面向软件产品的 AI 原生产品管理角色…PRD 生成、用户反馈分析、竞品研究、发布沟通，并对共享工具写入设置明确审批门禁\"——角色=岗位说明书+审批门禁。"
          },
          {
            "x": 60,
            "y": 12,
            "t": "环境筛选",
            "d": "跨云端、本地与其他设备管理 Waker——算力位置是角色的一个选项，与 MiCo 四档算力同构。"
          }
        ]
      },
      {
        "p": "agent365",
        "img": "assets/shots/agent365/01-e7-blog.jpeg",
        "caption": "Agent365+E7 官方治理成熟度热力图：注册表/影子发现/风险信号分层",
        "hot": [
          {
            "x": 50,
            "y": 40,
            "t": "热力图",
            "d": "E3 只有注册表与 kill-switch；风险 CA、行为检测、DLP、DSPM for AI 要叠满 Defender/Purview/Entra Suite——治理是分层付费的。"
          }
        ]
      },
      {
        "p": "claude-tag",
        "img": "assets/shots/claude-tag/01-解析HTML.jpeg",
        "caption": "本地调研《Claude Managed Agents 完整解析》：四原语/八步搭建/$0.08 会话小时",
        "hot": [
          {
            "x": 50,
            "y": 30,
            "t": "四原语",
            "d": "Agent/Environment/Session/Events + Outcome——托管运行时的行业定义。"
          },
          {
            "x": 22,
            "y": 82,
            "t": "97% / 3-6月→数天",
            "d": "Rakuten 关键错误下降 97%、上线周期从月压缩到天——托管价值的量化话术模板。"
          }
        ]
      },
      {
        "p": "workbuddy",
        "img": "assets/shots/workbuddy-ent/02-飞书集成.jpeg",
        "caption": "WorkBuddy 企业版：认证源（飞书/企微）+ 席位——及格线形态",
        "hot": []
      },
      {
        "p": "claude-ma",
        "img": "assets/shots/claude-managed-agents/02-docs-agent-setup.jpeg",
        "caption": "Claude Managed Agents 文档：Agent 定义（模型/指令/工具/skills 可复用配置）",
        "hot": []
      }
    ],
    "decisions": []
  },
  {
    "id": "market",
    "name": "市场与生态 Market",
    "icon": "⊞",
    "idea": "市场的本质是供给侧：零件铺（skill/connector 平铺）→ 整机店（岗位套件）→ 编制市场（雇佣数字员工）。",
    "logic": "MiCo 精选目前是零件铺；Automation 模板市场是第一次\"场景套件\"尝试；OpenClaw ClawHub 是社区生态；QM skill 晋升是组织内分发；WorkBuddy 插件市场+远程遥控是消费入口。",
    "verdict": "市场的下一站是**编制化**：微软 Agent 365 的\"上架=注册身份领权限\"与 MiCo 的\"专家=上架认证的智能体\"同向——货架上摆的将不是应用，是可雇佣的员工。",
    "mico": "套件化（P0-7）+ 岗位原型库（7 原型）是市场的正确形态；专家详情页公示评测成绩与有效任务率，回答\"几个差不多的专家该用哪个\"。",
    "items": [
      {
        "p": "mico",
        "img": "assets/shots/mico/N05-Featured精选.jpeg",
        "caption": "MiCo 精选：6 个专家卡片平铺——缺套件、缺评测公示、缺上手引导",
        "hot": [
          {
            "x": 20,
            "y": 28,
            "t": "专家卡",
            "d": "前端研发/数据分析/代码评审/测试工程/稳定性/PPT——\"雇一个人把活交给他\"的身份隐喻是对的，但没有信号告诉新人从哪只开始。"
          }
        ]
      },
      {
        "p": "mico",
        "img": "assets/shots/mico/N04-Automation自动化.jpeg",
        "caption": "Automation 模板市场：场景套件的雏形",
        "hot": []
      },
      {
        "p": "openclaw",
        "img": "assets/shots/openclaw/13-skills.png",
        "caption": "OpenClaw ClawHub：最大社区技能生态",
        "hot": []
      },
      {
        "p": "hermes",
        "img": "assets/shots/hermes/nav-Plugins.png",
        "caption": "Hermes Plugins：插件生态与注册表",
        "hot": []
      },
      {
        "p": "workbuddy",
        "img": "assets/shots/workbuddy/01-home.jpeg",
        "caption": "WorkBuddy 官网：下载+插件市场+IM 遥控的消费入口",
        "hot": []
      }
    ],
    "decisions": [
      {
        "verdict": "学 Agent 365 (订阅式治理)",
        "why": "Agent 365 的\"治理订阅\"商业模式被验证（席位+影子 agent 发现）。MiCo 商业化可参考。"
      },
      {
        "verdict": "学 OpenClaw (ClawHub 生态)",
        "why": "OpenClaw 的技能市场是个人向最大生态（350k stars 的护城河之一）。MiCo 应建公司级技能市场。"
      },
      {
        "verdict": "不学 WorkBuddy (BPM 审批链)",
        "why": "WorkBuddy 把审批当\"功能\"，MiCo 应把审批当\"基础设施\"——per-scope 强制 + 自动 fail-closed。"
      }
    ]
  }
];
