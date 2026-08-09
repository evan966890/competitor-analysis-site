// 万有无界 深度评测（v3 扩展 · 2026-08-10 入库）
// 复用 6 段 schema：demo×6 / code×3 / philosophy / timeline / conclusion
// 来源：work.wanuai.cn 实机登录（用户阿里云账号 SSO）+ 9 张 dashboard 截图 + accessibility tree
// 标注：9 张截图均为本机实拍（用户 Chrome 自动登录 dashboard），全部一手证据
window.TD_WANUAI_DEEPDIVE = {
  productId: 'wanuai',
  productName: '万有无界',
  tagline: '阿里云内测的 B 端人 + Agent 协作平台——多 Agent 协同完成行业项目交付，钉钉 CEO 陈宇森负责',
  dateAdded: '2026-08-10',
  isRealScreenshot: true,
  source: 'work.wanuai.cn · 阿里云（通义/钉钉系，钉钉 CEO 陈宇森负责，ICP 浙ICP备2023034206号-81）· 闭源 · 用户 Chrome 实机登录 + 9 张 dashboard 实拍',
  author: '本台研究团队（基于用户阿里云账号 SSO 登录 + accessibility tree 完整抓取 + 行业模板源码摘录）',

  // ============ ① DEMO（用户实机 9 张 dashboard 截图）============
  demoShots: [
    {
      id: 'home-quickstart',
      caption: '工作空间主页：创业引路 合同起草 合同审查专家 团队——多 Agent 协同 hero',
      img: 'assets/shots/wanuai/01-home-创业引路.jpg',
      note: '**核心叙事**："开张创业专家团，陪你理清创业第一步，走稳开张每一步。多个专业 Agent 协同工作，把创业初期最容易遗漏、踩坑的事项，整理成可执行的事项与可落地的文件"。4 个 emoji 标识（创业引路 🟢/合同起草 🟠/合同审查专家 🔵/团队 🔷）对应不同 agent 入口。**这是 2026 阿里 AI 办公矩阵的"行业模板"叙事——与 QoderWake 通用 6 角色同构但反向**。',
    },
    {
      id: 'agent-list',
      caption: 'Agent 侧栏：4 专家 + 1 个人助理，单聊/群聊 tab',
      img: 'assets/shots/wanuai/02-agent-4专家1助理.jpg',
      note: '**4 个预置专家**：A股投资分析专家（解读财报，看懂 A 股）/ 竞品调研专家（竞品调研，决策有据）/ 法律顾问专家（法律咨询与风险把控）/ 镜导（从创意到成片）。**1 个个人助理**：小万。**单聊/群聊** tab 区分"派活给单 agent"和"群组协同"。**"个人助理"和"Agent"是两个层级**——个人助理跟随用户，Agent 是按角色召唤的专家。',
    },
    {
      id: 'project-template',
      caption: '项目空间：AI 影视短剧创作项目（5 阶段流程 + 队长仅调度）',
      img: 'assets/shots/wanuai/03-project-影视短剧模板.jpg',
      note: '**"行业项目模板"是万有无界最独特的抽象**——5 阶段走完一部片子：剧本创作 → 资产设计与生成 → 视频素材生成 → 后期制作 → 发行与宣传播出。**"队长小有仅做任务调度与派发，不承担具体生产任务"**——这是一个**纯调度岗 agent**（PM 类）抽象。适合 1-6 人小团队用 AI 做竖屏短剧、动态漫、动画短片。**与 QoderWake "6 预置角色开箱"同构但反向**：万有无界走**行业模板**（短剧/创业/法律等具体场景包），QoderWake 走**通用角色**。',
    },
    {
      id: 'assets-quota',
      caption: '资产库：协作资产/个人知识库，2GB 免费配额',
      img: 'assets/shots/wanuai/04-assets-2GB配额.jpg',
      note: '**Freemium 商业模型的硬证据**——2GB 资产配额免费。**协作资产 vs 个人知识库** 双重 tab，区分团队共享 vs 个人沉淀。**会话资产 vs 项目资产** 子 tab 区分"agent 产生的中间产物"vs"项目最终产物"。**存储用量 0B / 2GB** 显式提示。**比 Multica/QM/Paperclip 等开源竞品多了"freemium 配额"维度**——2GB 足够个人/小团队做几部短剧试水。',
    },
    {
      id: 'skills-market',
      caption: '技能市场：10105 技能 + 公开技能有 36-164 安装数',
      img: 'assets/shots/wanuai/05-market-10105技能.jpg',
      note: '**"全部技能 · 10105"——1 万+ 技能**！这是行业最大规模的技能市场之一（对比 Multica/QM/Paperclip 都是几十个）。**公开 12+ 技能** 看到：① 小红书每日爆款笔记追踪（79 安装）② 全网热搜查询（54）③ 全网聚合热点榜单 top10（34）④ SOP 文档创作（21）⑤ SOP 模版生成（9）⑥ 内容预览（58）⑦ Contract 合同起草（48）⑧ 资助金查找器（25）⑨ 中国政府网（83）⑩ 创业启动助手（**164 安装 — 最高**）⑪ **wanyou-ui-ux-pro-max**（36）⑫ **ppt-delivery-adapter**（内部交付适配器）。**前 3 个安装数（21-164）= 万有的爆款方向**：内容创作 + 创业服务 + 政策查询。',
    },
    {
      id: 'todo-notification',
      caption: '我的待办：消息通知弹窗空态——"暂时没有待办，去逛逛吧"',
      img: 'assets/shots/wanuai/06-todo-通知空态.jpg',
      note: '**"我的待办" = 消息通知聚合**（不是任务卡）。新用户空态——"暂时没有待办，去逛逛吧"。**这个抽象与 MiCo 岗位虾的任务列表不同**——万有无界是 IM 消息聚合，MiCo 是任务卡。**说明万有无界没把"agent 接活 = 任务"做强**，仍是 chat-first 范式。',
    },
    {
      id: 'credits-dashboard',
      caption: '积分看板：4 类积分（订阅/订购/活动/总余额）+ 消耗表（按 Agent × 时间范围）',
      img: 'assets/shots/wanuai/07-points-4类积分+消耗表.jpg',
      note: '**这是全站最关键的产品决策页面——freemium 模型 + token 成本对账的硬证据**。4 类积分：① 订阅积分（包月）② 订购积分（一次性买）③ 活动积分（签到/试用）④ 总余额。**消耗看板**：按 Agent/项目空间 × 今天/近 7 天/近 30 天/近 1 年 × 单聊/群聊/项目空间 4 维度表格。**兑换 + 充值** 双入口。**对比 MiCo**：MiCo 的"成本分摊"是公司内部概念，万有无界把"成本"显化为"积分"= 用户可感知的 token 配额。**MiCo 该学的最关键一点——把"台账/成本"做成"积分看板"**。',
    },
    {
      id: 'account-dropdown',
      caption: '账户菜单（dropdown）',
      img: 'assets/shots/wanuai/08-account-dropdown.jpg',
      note: '**账户菜单是 dropdown 不是路由页面**——点击展开后应该是账号设置/订阅/退出等。**这是 SPA 通用模式**——账户操作不进路由，留在主区切换。',
    },
    {
      id: 'workspace-home',
      caption: '工作空间 = dashboard 主页（URL /）',
      img: 'assets/shots/wanuai/09-workspace-主页.jpg',
      note: '**"工作空间"不是新页面——就是 dashboard 主页**。8 个 nav 中 @e1 工作空间 = / 路径，等于"home"。**这与 QoderWake "主页面就是工作台"模式一致**，跟 Multica "工作台独立 Tab" 模式不同。',
    },
  ],

  // ============ ② CODE（闭源，基于 accessibility tree + 行为推断）============
  codeSnippets: [
    {
      title: '行业项目模板：5 阶段流程 + 队长仅调度不生产',
      file: 'wanuai/project-template/short-drama.ts (推断)',
      code: `// 万有无界"AI 影视短剧创作项目"行业模板
// 5 阶段流程 + 队长小有仅做任务调度与派发
interface ProjectTemplate {
  name: 'AI 影视短剧创作项目';
  teamSize: '1-6 人';
  owner: string;  // 真实用户
  captain: {
    role: '小有';  // 队长 agent
    responsibility: '任务调度与派发';
    production: false;  // 不承担具体生产任务
  };
  stages: [
    { name: '剧本创作', lead: '?', deliverables: ['剧本', '大纲'] },
    { name: '资产设计与生成', lead: '镜导', deliverables: ['角色', '场景'] },
    { name: '视频素材生成', lead: '?', deliverables: ['分镜视频'] },
    { name: '后期制作', lead: '?', deliverables: ['配乐', '剪辑'] },
    { name: '发行与宣传播出', lead: '?', deliverables: ['投放物料'] },
  ];
  agents: ['小有 (队长)', '镜导 (创意→成片)'];  // 推测 5 阶段由不同 agent 接力
  collaboration: 'sequential/parallel/handoff';  // 类 QoderWake 群组协同
}

// 核心抽象：队长 = 纯调度岗，不生产
// → 真实公司里 PM 角色`,
      points: [
        '**行业模板 = 5 阶段流程预置**——剧本→资产→视频→后期→发行，每阶段有 lead 和 deliverable。**这跟 QoderWake "6 预置角色" 抽象相同但更精细**——QoderWake 是 6 个静态角色，万有无界是 5 阶段流程 + 队长调度。',
        '**"队长小有仅做任务调度与派发，不承担具体生产任务"**——这是**纯调度岗 agent**（PM 类）的明确产品化。**真实公司里 PM 角色**。**对比 MiCo 岗位虾**："试运行 → 转正"是生命周期，"队长仅调度"是职责定位。**两者可融合**：虾的角色定位 = 队长（PM/调度）或执行（生产）。',
        '**"1-6 人小团队"**——明确定位是**小团队**，不是大型组织。**对比 QoderWake "6 预置角色"** 没明说团队规模，QoderWake 偏个人向，万有无界偏小团队。',
        '**5 阶段是"接力"还是"并行"**——snapshot 没明说。从交付物看应是 sequential（剧本先于视频），但每阶段内可能 parallel。**MiCo 改进**：专家团编排的"串行/并行/交接"3 模式跟万有无界 5 阶段流程同构，**可直接学**。',
      ],
    },
    {
      title: '积分看板：4 类积分 + 消耗表 4 维度（Agent × 单聊/群聊/项目空间 × 时间）',
      file: 'wanuai/billing/credits.ts (推断)',
      code: `// 万有无界积分看板——freemium 模型 + token 成本对账
interface CreditBalance {
  total: number;          // 积分余额（总）
  subscription: number;   // 订阅积分（月度配额）
  purchase: number;       // 订购积分（一次性买）
  campaign: number;        // 活动积分（签到/试用/邀请）
}

interface CreditOperations {
  exchange: () => void;    // 兑换（活动/任务奖励）
  recharge: () => void;    // 充值（购买）
  manage: () => void;      // 管理订购积分
}

// 消耗看板 4 维度
interface UsageTable {
  rows: AgentUsageRow[];
  filters: {
    scope: 'Agent' | '项目空间';  // 维度
    range: '今天' | '近7天' | '近30天' | '近1年';  // 时间
  };
  columns: ['Agent名称', '积分↓', '单聊↓', '群聊↓', '项目空间↓'];
  // 单聊/群聊 = 会话维度；项目空间 = 项目维度
}

interface AgentUsageRow {
  agent: '小万' | 'A股投资分析专家' | '竞品调研专家' | '法律顾问专家' | '镜导' | '...';
  credits: number;
  singleChat: number;
  groupChat: number;
  projectSpace: number;
}

// 核心抽象：积分 = token，配额 = 订阅，对账 = 消耗表
// → 商业模型硬证据：freemium + 透明计费`,
      points: [
        '**4 类积分**——订阅（月度）+ 订购（一次性买）+ 活动（签到/试用）+ 总余额。**这是 freemium 模型的精细化**——避免"包月用不完浪费/包月不够超额贵"的痛点，让用户能混合使用。**对比 MiCo**：MiCo 是 to B 内部成本分摊，万有无界是 to C 显式积分。',
        '**消耗看板 4 维度**——Agent/项目空间 × 单聊/群聊/项目空间 × 时间。**这是 token 成本对账的完整维度**。**MiCo 最该学的**——把虾的消耗按这 4 维度做对账，"这个月 PM 虾花了 30% 的 token，主要在项目 A 群聊里"，这种**透明可对账**的能力。',
        '**"管理"订购积分**——单独的订购积分管理入口，说明订购是**预付费**，不是后付。**对比 Paperclip** 的"预算成本中心"是公司级，万有无界是个人级。',
        '**MiCo 对照**：MiCo 现在的"成本分摊"是公司内部组织行为，**没有可视化积分看板**。**学这个**：给每个虾/每个用户做"积分余额 + 消耗表"，让用户能感知 token 成本。**特别对企业客户**——"这个月 IT 部的虾花了多少钱？哪个虾最贵？"这种问题能秒答。',
      ],
    },
    {
      title: '技能市场：10105 技能 + 内部 wanyou-* 技能（推测基于 MCP 协议）',
      file: 'wanuai/marketplace/skill-schema.ts (推断)',
      code: `// 万有无界技能市场——10105 技能 + 标准化元数据
interface Skill {
  id: string;            // 'xiaohongshu-daily-hot' / 'wanyou-ui-ux-pro-max' 等
  name: string;           // 显示名
  description: string;    // 完整描述
  isFree: true;           // 当前全部免费（内测期）
  installCount: number;   // 安装数 (21-164 公开)
  triggers?: string[];    // 触发词列表（从 wanyou-ui-ux-pro-max 推断）
  fileTriggers?: string[];// 文件触发：['*.html', '*.htm']
  chineseTriggers?: string[]; // 中文触发：UI设计、界面设计、UX 等
  categories: string[];   // 标签：[内容洞察, 热点追踪, 小红书运营]
  upstream?: string;      // 内部 fork 来源（github.com/nextlevelbuilder/...）
  localOnly?: boolean;    // 本地-only（sop-template-author 明确写 "Local-only"）
  backendAccess?: boolean;// 是否需要后端（sop-template-author: "no backend access"）
}

// 公开技能举例：
// 1. 小红书每日爆款笔记追踪 (79 安装) - 内容洞察/热点追踪/小红书运营
// 2. 全网热搜查询 (54) - 7 平台聚合（抖音/微博/B站/快手/知乎/头条/百度）
// 3. 全网聚合热点榜单 top10 (34) - 7 大平台小时级
// 4. SOP 文档创作 (21) - "Guide users from scratch to author an SOP source document"
// 5. SOP 模版生成 (9) - "Create, revise, validate, preview, and export PLATFORM SOP template definitions locally"
// 6. ppt-delivery-adapter - "PPT 工作流的唯一内部终点适配器"
// 7. 内容预览 (58) - 公众号/抖音/微博/小红书等排版效果预览
// 8. Contract (48) - 律师/自由职业者合同起草
// 9. 资助金查找器 (25) - 政府补贴/基金会资助/企业CSR
// 10. 中国政府网 (83) - 官方政策/政务服务
// 11. 创业启动助手 (164) - 公司注册/ICP/商标/银行/税务/社保
// 12. wanyou-ui-ux-pro-max (36) - "UI/UX design intelligence for web and mobile"
//
// 核心抽象：技能 = 标准化的元数据 + 安装数 + 触发词 + 分类
// → 行业最大规模技能市场之一（vs Multica/QM/Paperclip 几十个）`,
      points: [
        '**10105 技能**——这是行业最大规模的技能市场之一（对比 Multica/QM/Paperclip 都是几十个）。**万有 + 千问办公 + Qoder 系列合并后的技能池**。',
        '**"wanyou-*" 内部命名**——`wanyou-ui-ux-pro-max` 是官方 UI 技能（fork 自 `nextlevelbuilder/ui-ux-pro-max-skill`），`ppt-delivery-adapter` 是内部 PPT 工作流终点适配器。**说明万有 fork 了开源 skill 生态** + 自建内部专用 skill。',
        '**SOP 文档创作 + SOP 模版生成** 配套——前者引导创作，后者本地生成模板。**Local-only document authoring; no backend access** 明确写出来——**这是"不依赖 SaaS" 的关键设计**，跟 MiCo 的"上下文 OS"本地化方向一致。',
        '**触发词 + 文件触发 + 中文触发** 三套触发体系——从 wanyou-ui-ux-pro-max 的 `UI设计/界面设计/UX/落地页/配色/字体/无障碍/组件库/HTML页面/网页生成` 看，**触发词是中文丰富的同义词集**，不是简单的关键词。**MiCo 改进**：技能市场的触发词该是"用户自然语言说法 → 技能匹配"，不是固定命令。',
        '**核心抽象**：`Skill = { id, description, isFree, installCount, triggers, categories, upstream, localOnly, backendAccess }`——**元数据完整**让"该装哪个"决策快速。**MiCo 该学**：技能/资产市场暴露这些元数据，不只暴露"名字 + 描述"。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念，基于 dashboard + 行业报道）============
  philosophy: {
    coreQuestion: '阿里 2026-08 才内测的"万有无界"，跟 QoderWake（阿里 2026 Q2 发的 6 角色数字员工）是什么关系？是同一产品两条线，还是两个新方向？',
    answer: '**是同一条"阿里 AI 办公矩阵"线上的两个不同入口策略**。8/3 报道显示阿里 AI 办公布局：① QoderWork（个人桌面助手，整合悟空/MuleRun）→ ② 千问办公（日常流程/文档）→ ③ **万有无界（复杂项目多 Agent 协同）**。三者同属钉钉 CEO 陈宇森负责，底层都是通义/Qwen。**抽象相同（agent = 角色 + 工具 + 记忆）但入口策略不同**：QoderWork 走"个人 + 自然语言 + 桌面"，千问办公走"日常办公 + Office"，**万有无界走"行业项目模板 + 多 Agent 协同 + 队长调度"**。**不是替代关系，是覆盖"个人 → 团队 → 项目"三个不同场景的 3 条产品线**。',
    problemDiagnosis: [
      '**bot 集成是"外挂"**——Slack/飞书里的 agent 是 token 代发，不是同事。万有无界跟 Buzz 一样认为"agent 应是正式成员"，但走的是不同路线：**Buzz 是密码学签名事件**（信任原语），**万有无界是行业项目模板 + 队长调度**（产品化形态）。',
      '**"通用 6 角色" 上手门槛高**——QoderWake 的 6 角色（PM/RD/QA）需要用户懂岗位分工。**万有无界用"行业模板"降低门槛**——5 阶段短剧流程 + 队长调度，用户不需要懂"哪个角色干啥"，模板已经把协作关系定好。',
      '**纯聊天界面不承载"项目"语义**——chat-first 范式（QoderWork、OpenWorker）让用户不知道"这个任务在项目的哪个阶段"。**万有无界用"项目空间 + 5 阶段流程"显式化项目阶段**，用户能看清进度。',
      '**"成本不可见" 是企业级 agent 平台的硬伤**——agent 跑了多少 token 用户不知道。**万有无界用"积分看板"做透明对账**——4 类积分 + 消耗表 4 维度。**这是 MiCo 该学的关键**：把 token 成本从"公司内部黑盒"变成"用户可感知的积分"。',
      '**单一 agent 做不到"行业项目"**——影视短剧要剧本/分镜/视频/音乐多 agent 接力，单 agent 工具做不了。**多 Agent 协同 + 队长调度**是 2026 行业项目交付的标配。',
    ],
    designPrinciples: [
      '**行业项目模板 > 通用角色**——5 阶段短剧流程预置，队长仅调度，1-6 人小团队可直接用。**降低冷启动门槛**是核心。',
      '**4 类积分 + 消耗表 4 维度**——订阅/订购/活动/总余额 × Agent/项目空间 × 单聊/群聊/项目空间 × 时间。**透明可对账**让用户感知 token 成本。',
      '**个人助理 vs 专家 agent 分层**——小万（个人助理，跟随用户）vs A股/竞品/法律/镜导（专家，按需召唤）。**前者是"陪伴"，后者是"召唤"**。',
      '**单聊 vs 群聊**——派活给单 agent（单聊）vs 群组协同多 agent（群聊）。**这两种是不同交互范式**，跟 QoderWake "单 agent vs 群组"同构。',
      '**行业规模技能市场**（10105 技能）+ 标准化元数据（触发词/安装数/分类/upstream）——**降低"该装哪个"决策成本**。',
      '**2GB freemium 资产配额**——足够个人/小团队做几部短剧试水，**但 to B 客户会想要更多**，这是后续付费转化点。',
    ],
    differentiationMatrix: [
      { vs: 'QoderWake（阿里同门）', diff: 'QoderWake 是 6 预置角色（PM/RD/QA 通用）开箱 + 群组协同 + 审批门禁；**万有无界是行业项目模板（短剧/创业/法律等具体场景）+ 队长仅调度 + 4 类积分看板**。**抽象相同，入口策略相反**：QoderWake 通用，万有无界场景化。**对 MiCo 的启示**：岗位虾的"通用岗位 + 行业模板"双层是值得抄的。' },
      { vs: 'QoderWork（阿里同门）', diff: 'QoderWork 是个人桌面助手（自然语言 + 浏览器/文件/Office + MCP）；**万有无界是 B 端团队项目交付平台**（多 Agent 协同 + 行业模板 + 积分对账）。**前者 to C 助手，后者 to B 团队**。' },
      { vs: 'Buzz（Block）', diff: 'Buzz 是 Nostr 协作工作空间（密码学签名事件 + Agent 即成员 + buzz-audit 哈希链）；**万有无界是阿里云 SaaS（行业项目模板 + 队长调度 + 积分对账）**。**两者都认为"agent 是正式成员"但路线不同**：Buzz 走密码学信任原语（去中心化），万有无界走行业产品化（中心化 SaaS）。' },
      { vs: 'Paperclip', diff: 'Paperclip 是 AI 公司编制（CEO/CTO + Board 审批 + 预算成本中心 + 心跳驱动）；**万有无界是项目模板 + 队长调度 + 积分**。**前者有"董事会"和"预算"，后者只有"项目模板"和"积分"**。**编制化深度 Paperclip 更重**。' },
      { vs: 'QM（YC）', diff: 'QM 是公司级作用域（按人/房间 scope 记忆/文件/钥匙串/cron/权限）；**万有无界是行业项目模板 + 队长调度**。**QM 的 scoped 隔离是 2026 公司级答案，万有无界的模板化是行业场景化答案**。' },
      { vs: 'MiCo（自家）', diff: 'MiCo 是团队协作平台（岗位虾编制 + 任务 + IM + 上下文 OS）+ 按业务线定制；**万有无界是阿里云 SaaS（行业项目模板 + 多 Agent 协同 + 积分）**。**MiCo 的编制化/台账/上下文 OS 深度是万有无界没有的；万有无界的"行业模板 + 积分看板"是 MiCo 该补的冷启动形态**。**两者同构，入口策略相反**：MiCo 偏定制，万有无界偏标准化。' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2025-Q4', event: '阿里通义/钉钉系立项 Qoder CN（qoder.com.cn，含 QoderWork + QoderWake 两产品线）' },
    { date: '2026-Q1', event: 'QoderWake 桌面客户端发布（macOS 13+/Win 10+/Linux），6 预置角色上线' },
    { date: '2026-Q2', event: '能力市场（100+ 岗位技能）+ 群组协同功能上线' },
    { date: '2026-08-03', event: '读佳/腾讯网报道：阿里云内测「万有无界」B 端人+Agent 协作平台，钉钉 CEO 陈宇森负责，区别于"千问办公"（日常办公），聚焦"复杂项目多智能体协同交付"' },
    { date: '2026-08-09', event: '本台在 work.wanuai.cn 完成 Buzz/QoderWork/QoderWake 扩容入库（v3-extension），sourceMatrix.js v3.1 = 12 家 × 8 维 = 96 cells' },
    { date: '2026-08-10', event: '本台研究员在用户 Chrome 上 SSO 登录 work.wanuai.cn，9 张 dashboard 实拍 + accessibility tree 完整抓取入库（v3.2 扩容）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: '**万有无界是 2026 阿里 AI 办公矩阵的"行业项目模板"路线**——B 端人 + Agent 协作平台，5 阶段流程预置（以 AI 影视短剧为代表）+ 队长仅调度不生产 + 4 专家 + 1 个人助理 + 10105 技能市场 + 4 类积分看板。**与 QoderWake 通用 6 角色同构但入口策略相反**——QoderWake 通用，万有无界场景化。**核心抽象**：行业项目模板（降低冷启动）+ 队长调度岗（PM 角色）+ 多 Agent 协同（sequential/parallel/handoff）+ 积分对账（4 维消耗表）。**对 MiCo 价值是双重的**：① 证明"行业项目模板 + 队长调度"是行业共识方向；② 它的"4 类积分 + 消耗表"是 MiCo 该补的"成本对账"形态。**短板**：纯阿里生态绑定、闭源、内测期功能未稳定、per-action 拦截无可见 UI。',
    forMico: [
      '**行业项目模板 + 队长调度**——**学冷启动**。MiCo 岗位虾的"按业务线定制"是深度，但"冷启动摩擦大"。**学万有无界**：预置 5-10 个行业项目模板（短剧/创业/法律/数据/营销等），每个模板有阶段流程 + 角色分配 + 队长虾。**新部门先用模板跑起来，再按业务线定制**。',
      '**"队长仅调度不生产"**——**学抽象**。这是纯 PM 角色 agent。**MiCo 现有岗位虾**没明确区分"调度岗"vs"执行岗"。**学**：给每个虾加 `responsibility: "调度" | "生产" | "混合"` 字段，让队长虾可识别，可建"调度+生产"协同模式。',
      '**4 类积分 + 消耗表 4 维度**——**学成本对账**。MiCo 现在"成本分摊"是公司内部组织行为，**没有可视化积分看板**。**学**：给每个用户/每个虾做"积分余额 + 消耗表"，按 Agent/项目 × 单聊/群聊/项目空间 × 时间。**对企业客户**："IT 部门这个月花了多少？哪个虾最贵？"秒答。',
      '**10105 技能市场 + 标准化元数据**——**学规模化**。MiCo 技能市场目前规模小，**学万有无界**：技能暴露触发词（中文丰富同义词集）+ 安装数 + 分类 + upstream（来源）+ localOnly/backendAccess 标记。**让"该装哪个"决策更快**。',
      '**freemium 2GB + 订阅/订购/活动积分**——**学 to C 形态**。MiCo 是 to B 内部，**to C 入口缺失**。**学**：补轻量个人入口（参考 QoderWork）+ 2GB freemium 试用 + 3 类积分。**让"个人"先体验，再升级到"团队编制"**。',
      '**闭源绑阿里生态**——**MiCo 的机会**。万有无界不可自托管、SSO 绑阿里云。**MiCo 私有化 + 不绑单一厂商**对企业客户是优势。',
    ],
  },
};
