// QoderWake 深度评测（v3 扩展 · 2026-08-09 入库）
// 复用 6 段 schema：demo×6 / code×3 / philosophy / timeline / conclusion
// 来源：qoder.com.cn/qoderwake 官网 + 桌面客户端实机截图（codewaker/）+ 能力市场/定价页实拍
// 标注：6 张桌面端为真实客户端截图，4 张官网/市场/定价/下载为登录态实拍；闭源，code 段为 (推断)
window.TD_QODERWAKE_DEEPDIVE = {
  productId: 'qoderwake',
  productName: 'QoderWake',
  tagline: '阿里系预置数字员工工作台——Waker=角色说明书+审批门禁+环境，群组协同做项目',
  dateAdded: '2026-08-09',
  isRealScreenshot: true,
  source: 'qoder.com.cn/qoderwake · 阿里（通义/千问云系，ICP 浙ICP备2023034206号-81）· 闭源 · 桌面客户端实机截图 + 官网/能力市场实拍',
  author: '本台研究团队（基于桌面客户端实机截图 + qoder.com.cn 全站实拍 + 官方文档）',

  // ============ ① DEMO（桌面客户端 + 官网实拍）============
  demoShots: [
    {
      id: 'roles',
      caption: '官网：6+ 预置岗位 + 100+ 岗位技能——"各司其职、全天在线的数字员工"',
      img: 'assets/shots/qoderwake/07-官网-6岗位.png',
      note: 'qoder.com.cn/qoderwake 官网实拍。核心叙事："各司其职、全天在线的数字员工"。**6+ 预置岗位开箱即用**——这是 QoderWake 与 MiCo 岗位虾最直接的同构对照：预置角色 = 岗位说明书 + 独立权限环境 + 沉淀记忆。',
    },
    {
      id: 'management',
      caption: '管理后台：数字员工列表——每个 Waker 有岗位/状态/记忆/工作记录',
      img: 'assets/shots/codewaker/01-management.png',
      note: '桌面客户端管理后台。每个 Waker（数字员工）一行：岗位身份、运行状态、沉淀的记忆、工作记录。**这是"编制化管理后台"的阿里实现**——与 MiCo 岗位虾后台（828 只虾列表）是同一抽象，命名不同（Waker vs 虾）。',
    },
    {
      id: 'group',
      caption: '群组协同：多个 Waker 编组做项目（任务进行中 12/13）',
      img: 'assets/shots/codewaker/02-我的群组.png',
      note: '"我的群组"——把多个 Waker 编进一个项目组，任务在组内流转。**截图显示"任务进行中 12/13"——真实在跑的群组任务**。这是 QoderWake 区别于单 agent 工具的地方：群组 = MiCo 的专家团/项目空间。',
    },
    {
      id: 'waker-detail',
      caption: 'Waker 详情：产品经理角色——岗位说明书 + 技能 + 记忆 + 工作记录',
      img: 'assets/shots/codewaker/04-产品经理详情.png',
      note: '单个 Waker（产品经理）详情页。**角色=岗位说明书（职责/边界）+ 技能集 + 沉淀记忆 + 历史工作**。这是"角色即岗位"的产品化——与 MiCo 岗位说明书（职级/职责/汇报关系）是同构物，只是 QoderWake 偏"预置 6 角色"，MiCo 偏"按业务线定制"。',
    },
    {
      id: 'task-dialog',
      caption: '创建对话任务：派活给 Waker 的轻量入口',
      img: 'assets/shots/codewaker/05-创建对话任务.png',
      note: '创建"对话任务"——区别于"自动任务"（见下一张）。**对话任务=人在环里的协作，自动任务=后台无人值守**。这种"对话 vs 自动"的二分，与 MiCo 的"会话任务 vs 定时任务"一致。',
    },
    {
      id: 'task-auto',
      caption: '创建自动任务：无人值守的后台任务 + 审批门禁',
      img: 'assets/shots/codewaker/06-创建自动任务.png',
      note: '创建"自动任务"——后台无人值守执行。**关键：自动任务挂审批门禁**（高风险动作要人确认）。这是 QoderWake 把"自主度分档"产品化的证据——与 WorkBuddy 的 Craft/Plan/Ask 三档、MiCo 的自主度档位是同一类设计。',
    },
  ],

  // ============ ② CODE（闭源，基于界面行为 + 官网推断）============
  codeSnippets: [
    {
      title: 'Waker 角色模型：岗位说明书 + 环境 + 记忆（推断自详情页）',
      file: 'qoderwake/desktop/src/models/waker.ts (推断)',
      code: `interface Waker {
  id: string;
  role: PredefinedRole;          // 6 预置岗位之一：PM/RD/QA/...
  jobDescription: JobSpec;       // 岗位说明书：职责/边界/产出
  environment: 'local' | 'cloud'; // 独立权限环境（本机/云端）
  skills: Skill[];               // 100+ 岗位技能子集
  memory: {
    facts: MemoryEntry[];        // 沉淀的事实/判断
    viewable: boolean;           // 用户可查看
    correctable: boolean;        // 可纠正
    forgettable: boolean;        // 可遗忘
  };
  workRecords: WorkRecord[];
  status: 'online' | 'offline';
}

// "角色=岗位说明书+环境+记忆" —— 三件套锁定一个数字员工`,
      points: [
        '**6 预置角色是产品决策，不是技术约束**——QoderWake 选择"开箱即用"而非"深度定制"，**降低上手门槛但牺牲灵活度**。MiCo 走的是相反路（按业务线定制岗位说明书）。',
        '**environment 本机/云端二分**——独立权限环境意味着 Waker 在沙箱里操作，不碰用户主系统。**与 QM 的容器隔离、Multica 的 worktree 同属"安全沙箱"思路**。',
        '**记忆可查看/可纠正/可遗忘**——官网原话："查看、纠正、遗忘任何一条记忆"。**这是对"黑盒 agent"的反向**，MiCo 的上下文 OS 也强调记忆可控。',
        '**MiCo 改进**：预置角色库（开箱）+ 定制岗位说明书（深度）双形态——前者解决冷启动，后者解决深度。',
      ],
    },
    {
      title: '任务二分：对话任务（人在环）vs 自动任务（无人值守 + 门禁）（推断自创建流）',
      file: 'qoderwake/desktop/src/models/task.ts (推断)',
      code: `type TaskType = 'dialog' | 'auto';

interface Task {
  type: TaskType;
  assignee: Waker | WakerGroup;   // 派给单个 Waker 或群组
  approvalGate?: {                // 自动任务可有审批门禁
    trigger: 'high_risk' | 'always' | 'never';
    approver: UserId;
  };
  autonomy: 'supervised' | 'autonomous';  // 自主度档
}

// dialog: 人机协作，实时交互
// auto:   后台执行，高风险挂门禁`,
      points: [
        '**对话 vs 自动二分干净**——对话任务=IM 式协作，自动任务=cron 式后台。**MiCo 也有这二分（会话任务/定时任务），但 QoderWake 把"审批门禁"挂在自动任务上更显性**。',
        '**自主度档（supervised/autonomous）**——与 WorkBuddy 的三档、OpenClaw 的档位同类。**MiCo 的 P1-5 自主度可参照**。',
        '**审批门禁是"编制化"的轻量版**——QoderWake 的门禁是单 approver 确认；Paperclip 的门禁是"董事会"多角色。**MiCo 岗位虾的审批是"上岗评审/转正答辩"，更重**。',
        '**MiCo 改进**：任务类型 + 自主度档 + 审批门禁三维度正交，QoderWake 已验证可落地，MiCo 直接参照。',
      ],
    },
    {
      title: '群组协同：多 Waker 编组做项目（推断自"我的群组"）',
      file: 'qoderwake/desktop/src/models/group.ts (推断)',
      code: `interface WakerGroup {
  id: string;
  project: ProjectId;
  members: Waker[];          // 多角色 Waker（PM+RD+QA...）
  tasks: Task[];             // 组内任务流转
  coordination: 'sequential' | 'parallel' | 'handoff';
}

// "一个人同时调度多位数字员工。全天在线、分工明确、协同交付"（官网原文）
// 群组 = 跨角色协作的最小单元`,
      points: [
        '**群组=跨角色项目组**——PM/RD/QA 多 Waker 在一个组里做项目，任务在角色间流转。**这是 QoderWake 区别于单 agent 工具的核心**，与 MiCo 专家团、Multica Squad、Paperclip 公司编制同构。',
        '**协同模式 sequential/parallel/handoff**——串行/并行/交接三式。**MiCo 专家团编排（防七嘴八舌）正是 handoff 式**，QoderWake 给了产品化的命名。',
        '**"全天在线、分工明确"是卖点**——对应 MiCo "数字员工自己上班"的叙事。**两者讲的是同一件事：把 agent 组织成不会下班的团队**。',
        '**MiCo 改进**：群组的协同模式要做成显性配置（不是隐式），让用户能选"串行评审/并行调研/接力交付"。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念，基于官网叙事 + 实机行为）============
  philosophy: {
    coreQuestion: '阿里为什么要把数字员工做成"6 个预置角色开箱即用"？跟 MiCo"按业务线定制岗位虾"是同一条路吗？',
    answer: '是同一条路，**但选了相反的入口策略**。QoderWake 选"预置 6 角色 + 100 技能开箱"——**降低上手门槛，用预置角色覆盖 80% 通用场景，让用户 5 分钟上手**；MiCo 选"按业务线定制岗位说明书"——**深度适配，每个虾贴一个真实岗位，但要共建周期**。两者抽象相同（角色=岗位说明书+环境+记忆+审批），但 QoderWake 是"标准化产品"，MiCo 是"定制化服务"。**对小米这种大组织，MiCo 的定制化是护城河；但 QoderWake 的预置角色库值得抄来做"冷启动"——新部门先用预置角色跑起来，再逐步定制**。',
    problemDiagnosis: [
      '**冷启动摩擦**——MiCo 的岗位虾要共建（访谈/写说明书/试运行/转正），新部门上手慢。**QoderWake 的预置角色解决"先跑起来再说"**。',
      '**角色不清的 agent 是灾难**——一个"什么都干"的 agent 会越界、会失控。**预置角色 = 预设边界**，即便是预置的，也比无边界强。',
      '**单 agent 做不了项目**——真实项目要 PM/RD/QA 多角色协作。**QoderWake 的群组协同承认了这一点**——单 agent 是玩具，群组才是生产力。',
      '**黑盒记忆不可信**——agent 沉淀的记忆如果用户看不到、改不了，企业不敢用。**QoderWake 把"可查看/可纠正/可遗忘"做成卖点**。',
    ],
    designPrinciples: [
      '**预置角色开箱**——6+ 岗位 + 100+ 技能，5 分钟上手。**降低门槛优先于深度定制**。',
      '**角色=岗位说明书+环境+记忆**——三件套锁定一个数字员工，边界清晰。',
      '**群组=跨角色项目组**——多 Waker 编组做项目，任务在角色间流转。',
      '**任务二分（对话/自动）+ 审批门禁**——自动任务挂门禁，高风险要人确认。',
      '**记忆可控**——查看/纠正/遗忘任何一条记忆，反黑盒。',
      '**独立权限环境**——本机/云端沙箱，Waker 不碰用户主系统。',
    ],
    differentiationMatrix: [
      { vs: 'Paperclip', diff: 'Paperclip 是"AI 公司编制"（CEO/CTO + Board 审批 + 预算成本中心），面向创业者；QoderWake 是"预置数字员工工作台"（6 角色 + 群组协同），面向企业研发。**前者有"董事会"和"预算"，后者只有"审批门禁"——编制化叙事 Paperclip 更重**。' },
      { vs: 'WorkBuddy', diff: 'WorkBuddy（腾讯）是"桌面智能体工作台"（Craft/Plan/Ask 三档 + IM 远程遥控）；QoderWake 是"预置数字员工"（6 角色 + 群组）。**前者偏单 agent 自主度，后者偏多角色编排**。两者都是中国大厂的 agent 工作台，可对照 MiCo。' },
      { vs: 'Multica', diff: 'Multica 是"AI 同事协作"（Issue 中心 + 14 runtime + Squad）；QoderWake 是"预置数字员工"（角色中心 + 群组 + 审批）。**前者开源可自托管，后者闭源 SaaS——但 QoderWake 的预置角色库 Multica 没有**。' },
      { vs: 'MiCo', diff: 'MiCo 是"岗位虾编制后台 + 任务协作前台"（按业务线定制 + 试运行/转正/成本分摊）；QoderWake 是"预置数字员工"（6 角色开箱 + 群组协同 + 审批门禁）。**MiCo 的定制化深度和台账/成本语言是 QoderWake 没有的；QoderWake 的预置角色库和低门槛上手是 MiCo 该补的冷启动形态**。两者是同构物，入口策略相反。' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2025-Q4', event: '阿里通义系立项 Qoder CN（qoder.com.cn，含 QoderWork + QoderWake 两产品线）' },
    { date: '2026-Q1', event: 'QoderWake 桌面客户端发布（macOS 13+/Win 10+/Linux），6 预置角色上线' },
    { date: '2026-Q2', event: '能力市场（100+ 岗位技能）+ 群组协同功能上线' },
    { date: '2026-08-09', event: '本台实拍官网/能力市场/定价/下载 + 桌面客户端 6 张实机截图入库' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'QoderWake 是 2026 年"预置数字员工"赛道里**最像 MiCo 岗位虾的产品**——角色=岗位说明书+环境+记忆，群组=跨角色项目组，任务二分（对话/自动）+审批门禁。它和 MiCo 是同构物，区别在入口策略：QoderWake 选"6 预置角色开箱"降低门槛，MiCo 选"按业务线定制"做深度。**对 MiCo 的价值是双重的：① 证明"数字员工=岗位说明书"这个抽象是行业共识（阿里也这么想）；② 它的预置角色库是 MiCo 该补的冷启动形态**。短板：预置角色不可深定制、生态绑定阿里系、台账/成本语言缺失（官网强调自主+记忆，不强调成本）。**MiCo 与 QoderWake 不是替代关系，是"定制 vs 标准"的互补——MiCo 该抄它的预置角色库做冷启动，守好自己的定制化+编制化护城河**。',
    forMico: [
      '**预置角色库**（6+ 角色 + 100+ 技能开箱）——**学，做冷启动**。新部门先用预置角色跑起来，再逐步定制岗位说明书。解决 MiCo"共建周期长、上手慢"的痛点。',
      '**角色=岗位说明书+环境+记忆 三件套**——**验证 MiCo 岗位虾抽象**。阿里独立得出同一抽象，说明"角色=说明书+环境+记忆"是行业共识，MiCo 方向正确。',
      '**群组协同的显性协同模式**（串行/并行/交接）——**学**。MiCo 专家团编排可参照，把协同模式做成用户可选配置。',
      '**记忆可控（查看/纠正/遗忘）**——**强化**。MiCo 上下文 OS 也强调记忆可控，可把"任何一条记忆可查看/纠正/遗忘"做成显性产品功能。',
      '**台账/成本语言**——**QoderWake 缺，MiCo 守住**。这是 MiCo 对 QoderWake 的差异化，不要被它的"预置角色"叙事带偏丢了成本/编制叙事。',
      '**闭源 SaaS 绑定阿里系**——**MiCo 的机会**。QoderWake 不可自托管、绑阿里生态；MiCo 私有化部署 + 不绑单一厂商，对企业客户是优势。',
    ],
  },
};
