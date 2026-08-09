// QoderWork 深度评测（v3 扩展 · 2026-08-09 入库）
// 复用 6 段 schema：demo×6 / code×3 / philosophy / timeline / conclusion
// 来源：qoder.com.cn/qoderwork 官网 + 能力市场/定价/下载实拍
// 标注：QoderWork 是 QoderWake 的同门产品（桌面级通用智能体助手），本台新增收录；官网实拍，闭源 code (推断)
window.TD_QODERWORK_DEEPDIVE = {
  productId: 'qoderwork',
  productName: 'QoderWork',
  tagline: '阿里系桌面级通用智能体助手——自然语言驱动任务自动化 + 浏览器/文件操作 + 能力市场',
  dateAdded: '2026-08-09',
  isRealScreenshot: true,
  source: 'qoder.com.cn/qoderwork · 阿里（通义/千问云系）· 闭源 · 官网/能力市场/定价/下载实拍',
  author: '本台研究团队（基于 qoder.com.cn/qoderwork 全站实拍 + 官方文档）',

  // ============ ① DEMO（官网/市场实拍）============
  demoShots: [
    {
      id: 'home',
      caption: '官网："桌面级通用智能体助手"——自然语言驱动，操作浏览器/文件/产出文档',
      img: 'assets/shots/qoderwork/01-官网-桌面智能体.png',
      note: 'qoder.com.cn/qoderwork 官网实拍。定位"桌面级通用智能体助手"——区别于 QoderWake（预置数字员工）。**QoderWork 是"一个全能助手"，QoderWake 是"一组专业员工"**——同门两产品线，覆盖个人效率 vs 团队编制两个场景。',
    },
    {
      id: 'marketplace',
      caption: '能力市场：可安装的技能/能力集合（QoderWork 与 QoderWake 共享同一市场）',
      img: 'assets/shots/qoderwork/02-能力市场.png',
      note: '能力市场实拍。**QoderWork 与 QoderWake 共享同一能力市场**——技能可跨产品复用。这是阿里"智能体产品族"策略：一个市场喂多个产品形态。',
    },
    {
      id: 'pricing',
      caption: '定价：按用量/Credits 计费（Qoder CN 统一账号体系）',
      img: 'assets/shots/qoderwork/03-定价.png',
      note: '定价页实拍。按 Credits 计费，QoderWork 与 QoderWake 共享账号/Credits 体系。**一个账号通吃两产品**——降低用户在产品族内切换的成本。',
    },
    {
      id: 'download',
      caption: '下载：桌面客户端（macOS/Win/Linux）——本地优先形态',
      img: 'assets/shots/qoderwork/04-下载.png',
      note: '下载页实拍。桌面客户端形态（与 QoderWake 同）。**"桌面级"是关键——本地文件访问、浏览器自动化、产出 Word/Excel/PPT/PDF，都需要本地权限，纯 web 做不到**。',
    },
    {
      id: 'capabilities',
      caption: '核心能力：自然语言任务自动化 + 浏览器操作 + 本地文件 + 文档产出 + MCP',
      img: 'assets/shots/qoderwork/01-官网-桌面智能体.png',
      note: '官网列出的核心能力：① 自然语言任务自动化；② 浏览器自动化（网页操作）；③ 本地文件访问；④ 产出 Word/Excel/PPT/PDF；⑤ 能力市场；⑥ MCP 支持。**这是"桌面全能助手"的完整能力栈**——与 OpenClaw（个人助理生态）形态接近。',
    },
    {
      id: 'ecosystem',
      caption: '产品族定位：QoderWork（个人助手）+ QoderWake（团队员工）+ 能力市场（共享技能）',
      img: 'assets/shots/qoderwork/02-能力市场.png',
      note: 'Qoder CN 的"智能体产品族"策略：QoderWork 覆盖个人效率（一个全能助手），QoderWake 覆盖团队编制（一组专业员工），能力市场共享技能。**这是"个人 → 团队"的产品梯度**——用户从 QoderWork 入门，升级到 QoderWake 做团队编排。',
    },
  ],

  // ============ ② CODE（闭源，基于官网能力描述推断）============
  codeSnippets: [
    {
      title: '桌面全能助手的能力栈（推断自官网能力清单）',
      file: 'qoderwork/desktop/src/capabilities.ts (推断)',
      code: `interface QoderWorkCapabilities {
  taskAutomation: {
    trigger: 'natural_language';   // 自然语言驱动
    scope: 'desktop';              // 桌面级（非 web-only）
  };
  browser: {
    automation: true;              // 浏览器操作
    formFilling: boolean;
    dataExtraction: boolean;
  };
  localFiles: {
    read: true;
    write: true;
    formats: ['word', 'excel', 'ppt', 'pdf'];
  };
  mcp: {
    supported: true;               // MCP 协议
    servers: McpServer[];
  };
  skillMarket: {
    installable: Skill[];          // 能力市场技能
    sharedWith: 'qoderwake';       // 与 QoderWake 共享
  };
}`,
      points: [
        '**桌面级是关键差异**——本地文件访问、浏览器自动化、产出 Office 文档，都需要本地权限。**纯 web 助手（如 ChatGPT 网页版）做不到这些**。',
        '**MCP 支持**——接 Model Context Protocol，意味着可扩展工具生态。**这是 2026 agent 工具互联的事实标准**，QoderWork 跟上了。',
        '**能力市场跨产品共享**——QoderWork 和 QoderWake 共享同一技能库。**阿里用一个市场喂两个产品形态，摊薄生态建设成本**。',
        '**MiCo 对照**：MiCo 是团队协作平台（web+客户端），QoderWork 是个人桌面助手。**形态不同，但"桌面级本地操作 + MCP"MiCo 客户端可参照**。',
      ],
    },
    {
      title: '产品族梯度：个人助手 → 团队员工的升级路径（推断自产品线划分）',
      file: 'qodercn/product-strategy.ts (推断)',
      code: `type QoderProduct = 'qoderwork' | 'qoderwake';

interface ProductPositioning {
  qoderwork: {
    audience: 'individual';        // 个人效率
    form: 'single_assistant';      // 一个全能助手
    autonomy: 'on_demand';         // 按需触发
  };
  qoderwake: {
    audience: 'team';              // 团队编制
    form: 'predefined_roles';      // 一组专业员工
    autonomy: 'always_online';     // 全天在线
  };
  shared: {
    account: true;                 // 统一账号
    credits: true;                 // 共享 Credits
    skillMarket: true;             // 共享能力市场
  };
}

// 产品梯度：个人入门 → 团队升级`,
      points: [
        '**个人 → 团队的产品梯度**——QoderWork（个人助手）→ QoderWake（团队员工）。**用户从个人效率入门，自然升级到团队编排**，降低获客到留存的全链路摩擦。',
        '**统一账号 + 共享 Credits + 共享技能市场**——三共享让产品族内切换零成本。**这是阿里平台思维的体现**：一个账号体系喂多产品。',
        '**MiCo 对照**：MiCo 是单一团队协作平台，没有"个人入门版"。**可考虑做轻量个人入口（类似 QoderWork）做获客，再升级到团队编制**。',
        '**MiCo 改进**：产品梯度策略值得学，但 MiCo 的编制化/台账/上下文 OS 是 Qoder 产品族都没有的深度——守住深度，补一个轻入口。',
      ],
    },
    {
      title: '本地文件 + 浏览器自动化：桌面助手的权限边界（推断）',
      file: 'qoderwork/desktop/src/permissions.ts (推断)',
      code: `interface DesktopPermissions {
  fileSystem: {
    scope: 'user_selected' | 'full';   // 文件访问范围
    operations: ['read', 'write', 'create'];
    sandboxing: 'app_container';        // 应用容器沙箱
  };
  browser: {
    automation: 'extension' | 'cdp';    // 扩展或 CDP
    domains: string[];                  // 可操作域名白名单
    credentialAccess: 'none' | 'managed';
  };
  output: {
    formats: ['docx', 'xlsx', 'pptx', 'pdf'];
    location: 'user_chosen';
  };
}

// "桌面级"=本地权限 + 沙箱 + 产出 —— web 助手做不到`,
      points: [
        '**本地权限是桌面助手的护城河**——web 助手碰不了用户文件系统；桌面助手能读写本地文件、产出 Office 文档。**这是 OpenClaw/QoderWork/WorkBuddy 共同的形态优势**。',
        '**沙箱 + 白名单是安全底线**——文件访问范围（用户选择/全盘）、浏览器域名白名单、凭证不直接访问。**Qoder 的独立权限环境理念在这里体现**。',
        '**MiCo 对照**：MiCo 客户端（桌面/移动）也是本地形态，有文件/浏览器操作场景。**桌面权限模型（沙箱+白名单+产出格式）MiCo 可直接参照**。',
        '**MiCo 改进**：MiCo 的本地操作要挂岗位说明书里的权限边界——不是"全能助手什么都干"，而是"这个岗位的虾只能碰这些文件/这些域名"。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: '阿里为什么要同时做 QoderWork（个人助手）和 QoderWake（团队员工）两个产品？',
    answer: '因为**"个人效率"和"团队编制"是两个不同的购买决策**。QoderWork 服务"我想让 AI 帮我干桌面杂活"的个人用户——按需触发、一个全能助手、桌面级本地操作；QoderWake 服务"我要组建一支全天在线的数字员工团队"的团队管理者——预置角色、群组协同、审批门禁。**一个账号 + 共享 Credits + 共享能力市场**把两者串成"个人入门 → 团队升级"的梯度。这是阿里平台思维的体现：用产品族覆盖用户旅程，而不是用一个产品通吃所有场景。**对 MiCo 的启示：MiCo 是纯团队平台，缺个人入口；可考虑补一个轻量个人形态做获客，再升级到团队编制**。',
    problemDiagnosis: [
      '**个人助手和团队平台是两个市场**——个人要"快、全能、按需"，团队要"稳、专业、全天在线"。一个产品很难同时满足。',
      '**web 助手碰不了本地**——纯 web 的 agent（ChatGPT 网页版）做不了本地文件操作、浏览器自动化、Office 文档产出。**桌面级是硬需求**。',
      '**技能市场单独建太贵**——每个产品自建技能生态成本高。**阿里用一个市场喂两个产品，摊薄成本**。',
      '**获客到留存有断层**——个人用户用了助手，想升级到团队协作时如果换产品，摩擦大。**产品族内零成本升级解决这个断层**。',
    ],
    designPrinciples: [
      '**桌面级本地优先**——本地文件 + 浏览器 + Office 产出，web 做不到的能力栈。',
      '**自然语言驱动**——按需触发，不需要写脚本/配工作流。',
      '**MCP 可扩展**——接 Model Context Protocol，工具生态可插拔。',
      '**产品族梯度**——个人（QoderWork）→ 团队（QoderWake），统一账号+共享 Credits+共享技能市场。',
      '**能力市场跨产品**——一个技能库喂多个产品形态。',
    ],
    differentiationMatrix: [
      { vs: 'OpenClaw', diff: 'OpenClaw 是 350k+ stars 的"个人助理生态"（20+ IM 渠道 + ClawHub 技能 + dreaming 记忆）；QoderWork 是"桌面级通用助手"（本地文件+浏览器+Office+MCP）。**前者渠道生态最大，后者桌面能力栈更全**。两者都是个人助手形态。' },
      { vs: 'WorkBuddy', diff: 'WorkBuddy（腾讯）是"桌面智能体工作台"（Craft/Plan/Ask 三档 + IM 远程遥控 + 后台自动化）；QoderWork 是"桌面通用助手"（自然语言 + 浏览器/文件/文档）。**两者都是中国大厂桌面助手，能力栈接近**。' },
      { vs: 'QoderWake', diff: 'QoderWake（同门）是"预置数字员工"（6 角色 + 群组协同 + 审批门禁），面向团队；QoderWork 是"桌面通用助手"，面向个人。**一个账号共享，构成个人→团队梯度**。' },
      { vs: 'OpenWorker (吴恩达)', diff: 'OpenWorker 是开源"个人同事工具"（Tauri + 25+ 集成 + 审批内建 + aisuite 5 模型）；QoderWork 是闭源"桌面通用助手"（本地文件 + 浏览器 + Office + MCP + 5 Credits/步）。**前者靠开发者体验（开源可改），后者靠产品体验（按 Credits 计费）**。' },
      { vs: 'MiCo', diff: 'MiCo 是"团队协作平台"（编制化 + 任务 + IM + 上下文 OS），无个人入口；QoderWork 是"个人桌面助手"。**MiCo 可借鉴 QoderWork 形态补一个轻量个人入口做获客**，但 MiCo 的编制化/台账/上下文深度是 QoderWork 没有的。' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2025-Q4', event: '阿里通义系立项 Qoder CN，QoderWork 与 QoderWake 同期规划' },
    { date: '2026-Q1', event: 'QoderWork 桌面客户端发布，定位"桌面级通用智能体助手"' },
    { date: '2026-Q2', event: '能力市场 + MCP 支持 + Office 文档产出能力上线' },
    { date: '2026-08-09', event: '本台实拍 qoder.com.cn/qoderwork 全站入库，新增 QoderWork 产品条目' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'QoderWork 是阿里 Qoder CN 产品族里的"个人桌面助手"——自然语言驱动、桌面级本地操作（文件/浏览器/Office）、MCP 可扩展、共享能力市场。它和同门的 QoderWake（团队数字员工）构成"个人 → 团队"的产品梯度，用一个账号+共享 Credits+共享技能市场把两者串起来。**对 MiCo 的启示是产品策略层面的**：MiCo 是纯团队平台，缺个人入口；Qoder 的产品族梯度证明"个人入门 → 团队升级"是一条可行路径。**MiCo 可考虑补一个轻量个人形态（桌面助手）做获客，再升级到团队编制**——但 MiCo 的编制化/台账/上下文 OS 深度是 QoderWork 没有的，那是 MiCo 该守的护城河。短板：QoderWork 闭源、绑阿里系、无编制化/成本语言。',
    forMico: [
      '**产品族梯度策略**（个人入口 → 团队升级）——**学产品策略**。MiCo 可补一个轻量个人形态做获客，用统一账号串到团队编制。',
      '**桌面级能力栈**（本地文件+浏览器+Office 产出+MCP）——**MiCo 客户端参照**。本地权限模型（沙箱+白名单+产出格式）可落地。',
      '**能力市场跨产品共享**——**学**。MiCo 的技能/资产市场可跨形态（个人/团队）复用，摊薄生态建设成本。',
      '**MCP 支持**——**跟上**。2026 agent 工具互联事实标准，MiCo 已有相关规划，QoderWork 验证了可行性。',
      '**编制化/台账/上下文 OS**——**QoderWork 全无，MiCo 守住**。这是 MiCo 对所有个人助手形态竞品的差异化深度。',
      '**闭源绑阿里系**——**MiCo 的机会**。QoderWork 不可自托管；MiCo 私有化部署对企业客户是优势。',
    ],
  },
};
