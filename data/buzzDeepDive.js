// Buzz 深度评测（v3 扩展 · 2026-08-09 入库）
// 复用 6 段 schema：demo×6 / code×3 / philosophy / timeline / conclusion
// 来源：github.com/block/buzz（Apache 2.0）+ 本机实跑 relay（Postgres/Redis/MinIO 全通）+ 源码精读
// 标注：landing/login/health/metrics 为本机实跑截图；频道内 Agent 视图需 Nostr 身份入应用（本台 relay 实跑但 web 入口需 Keycloak，此批未深入），以源码补证
window.TD_BUZZ_DEEPDIVE = {
  productId: 'buzz',
  productName: 'Buzz',
  tagline: 'Block 出品的 Nostr 协作工作空间——人与 Agent 是同事，不是 bot；一切动作都是一条签名事件',
  dateAdded: '2026-08-09',
  isRealScreenshot: true,
  source: 'github.com/block/buzz · Block（Jack Dorsey）· Apache 2.0 · 本机实跑 relay（localhost:3000）+ crates/ 源码精读',
  author: '本台研究团队（基于本机实跑 + GitHub 源码 + VISION/ARCHITECTURE/NOSTR 三份设计文档）',

  // ============ ① DEMO（本机实跑截图 + 源码补证）============
  demoShots: [
    {
      id: 'landing',
      caption: '官网/落地页："人类与 AI Agent 的团队协作"——把 Agent 当正式成员',
      img: 'assets/shots/buzz/01-landing-人机协作工作空间.png',
      note: '本机 relay（localhost:3000）实跑的 web 入口，标题 "Multica — Project Management for Human + Agent Teams"（Buzz 复用 Multica 的 web 前端骨架）。**核心卖点一句话："humans and agents are just colleagues"**——不是 bot，是同事。',
    },
    {
      id: 'login',
      caption: '登录页：Nostr 身份 = secp256k1 密钥对（邮箱走 Keycloak OAuth，底层身份是 Nostr 公钥）',
      img: 'assets/shots/buzz/02-login-Nostr身份.png',
      note: '登录走 Keycloak（本地 OAuth 测试用 admin/admin），但**底层身份模型是 Nostr 密钥对**——人用 NIP-42、Agent 用 NIP-98 签名认证。**这是 Buzz 与所有 bot 式集成的根本区别**：身份不是 token，是不可伪造的签名。',
    },
    {
      id: 'relay-health',
      caption: '本机 relay 实跑：Postgres/Redis/MinIO/Git 对象存储/NIP-PL push 全通',
      img: 'assets/shots/buzz/03-relay运行-health.png',
      note: '本台在本机跑通了完整 relay 栈（`just setup` + `cargo build -p buzz-relay`）。启动日志确认：Postgres 连接 ✓、Redis pub/sub ✓、MinIO 媒体存储 ✓、Git 对象存储 A3 一致性探针通过 ✓、NIP-PL push 投递 ✓、NIP-ER 提醒调度 ✓。**这是一台真正能跑的 Nostr relay，不是 demo 页**。',
    },
    {
      id: 'metrics',
      caption: 'Prometheus 指标：relay 实时追踪 human/agent 用户、git 仓库数、社区成员角色',
      img: 'assets/shots/buzz/04-relay-metrics-实跑.png',
      note: '`buzz_total_users{type="agent"}`、`buzz_total_users{type="human"}`、`buzz_total_git_repos`、`buzz_community_relay_members{community=...,role=owner/admin}`——**指标维度本身就揭示了 Buzz 的世界观：人和 agent 用同一个计数器，只分 type；权限按 community+role 隔离**。',
    },
    {
      id: 'channels-source',
      caption: '频道即访问边界：open/private 可见性 + NIP-29 group id（源码：buzz-db/src/channel.rs）',
      img: 'assets/shots/buzz/01b-landing-hero.png',
      note: '频道是权限的最小单元：`open` 可搜索可加入，`private` 隐藏且邀请制；`nip29_group_id` 让外部 Nostr 客户端能直接接入。**成员通过 (community_id, channel_id, pubkey) 三元组定位，role 枚举 owner/admin/member/guest/bot**——bot 是"指定"而非"权限等级"，刻意不进线性层级。见下方 code 段。',
    },
    {
      id: 'git-source',
      caption: 'Git 即事件：NIP-34 把 patch/PR/issue/status 全部建模成签名事件（源码：buzz-core/src/kind.rs）',
      img: 'assets/shots/buzz/03-relay运行-health.png',
      note: 'Buzz 把整个 Git 协作流压进 Nostr：仓库公告(kind:30617)、仓库状态(30618)、补丁(1617)、PR(1618)、Issue(1621)、状态 Open/Merged/Closed/Draft(1630-1633)。**这意味着代码审查、合并决策和聊天消息走同一条可审计的签名事件流**——这是对 GitHub 式"代码与讨论分离"的根本性重写。',
    },
  ],

  // ============ ② CODE（关键源码，本机 checkout 精读）============
  // 来源：/Users/evan/code/buzz/crates/ 下源码逐行精读，路径真实可复查
  codeSnippets: [
    {
      title: '一切动作都是一条签名事件：insert_event（单一事件表 + 原始签名持久化）',
      file: 'crates/buzz-db/src/event.rs (L265-321)',
      code: `pub async fn insert_event(
    pool: &PgPool,
    community_id: CommunityId,
    event: &Event,
    channel_id: Option<Uuid>,
) -> Result<(StoredEvent, bool)> {
    let kind_u32 = u32::from(event.kind.as_u16());
    if kind_u32 == KIND_AUTH { return Err(DbError::AuthEventRejected); }
    if is_ephemeral(kind_u32) { return Err(DbError::EphemeralEventRejected(...)); }
    let id_bytes = event.id.as_bytes();
    let pubkey_bytes = event.pubkey.to_bytes();
    let sig_bytes = event.sig.serialize();  // Schnorr 签名原样落库
    let tags_json = serde_json::to_value(&event.tags)?;
    // 单一 events 表：community_id / id / pubkey / kind / tags / content / sig / channel_id
    sqlx::query(r#"INSERT INTO events (...) VALUES (...) ON CONFLICT DO NOTHING"#)
}`,
      points: [
        '**一张 events 表装下一切**——消息、反应、profile 更新、Git patch 全是同一张表的一行，`kind` 整数是唯一分发开关（ARCHITECTURE.md:116）。',
        '**Schnorr 签名原样持久化**（`sig.serialize()`），不是重算——任何一行都可独立验证真伪，**这是"可审计"的物理基础**。',
        '**AUTH(kind:22242) 与瞬态(20000-29999) 事件不入库**——前者只带 bearer token，后者只走 Redis pub/sub。设计边界清晰。',
        '**MiCo 对照**：MiCo 的任务/会话/产物是三套表三套模型；Buzz 是一套事件流。前者好查询，后者好审计。**MiCo 要抄的是"关键动作落签名事件"的审计层，不是把三张表并成一张**。',
      ],
    },
    {
      title: 'Agent 是成员不是 bot：MemberRole 枚举 + agent_owner_pubkey（人机同表）',
      file: 'crates/buzz-core/src/channel.rs (L102-119) · crates/buzz-db/src/user.rs (L291-306)',
      code: `// channel.rs —— 角色枚举：Bot 是"指定"，刻意不进线性层级
pub enum MemberRole {
    Owner,   // 全控：管成员、删频道
    Admin,   // 管成员、改设置
    Member,  // 标准参与者
    Guest,   // 只读外部参与者
    Bot,     // 自动化 agent/集成 —— 不在角色层级里
}

// user.rs —— agent 和人共用 users 表，agent 有 owner
pub async fn set_agent_owner(pool, community_id, agent_pubkey, owner_pubkey) {
    // 条件 UPDATE：仅当 owner 为 NULL 时设置 —— "先占先得"原子化
    sqlx::query(r#"UPDATE users SET agent_owner_pubkey = $1
                   WHERE community_id = $2 AND pubkey = $3
                   AND agent_owner_pubkey IS NULL"#)
}`,
      points: [
        '**Bot 是 designation，不是 permission level**——一个 Bot 角色的 agent 仍要靠自己的 pubkey 签名才能发事件，权限按 channel 成员身份走，不是"bot API token"。',
        '**agent 和人共用 users + channel_members 表**——agent 只多一个 `agent_owner_pubkey`（谁拥有这个 agent）。**"先占先得"的原子 UPDATE 杜绝并发抢注**。',
        '**测试钉死**：`test_agent_owner_can_remove_bot` 验证一个普通 Member 能移除自己拥有的 agent（即便他不拥有该频道）——agent 的归属链是清晰的。',
        '**MiCo 对照**：MiCo 的虾是"岗位说明书 + 编制"，Buzz 的 agent 是"密钥 + 频道成员身份"。**前者偏组织治理，后者偏密码学身份**。两者可融合：虾的"上岗"= 颁发 agent 密钥 + 加入频道。',
      ],
    },
    {
      title: 'Git 协作压进 Nostr：NIP-34 kind 注册表 + require_patch 推送保护',
      file: 'crates/buzz-core/src/kind.rs (L604-623) · crates/buzz-core/src/git_perms.rs (L277-283)',
      code: `// kind.rs —— Git 对象 = Nostr 事件类型（NIP-34）
pub const KIND_GIT_REPO_ANNOUNCEMENT: u32 = 30617;  // 仓库公告
pub const KIND_GIT_REPO_STATE: u32       = 30618;  // 分支/tag refs
pub const KIND_GIT_PATCH: u32            = 1617;   // 补丁
pub const KIND_GIT_PULL_REQUEST: u32     = 1618;   // PR
pub const KIND_GIT_ISSUE: u32            = 1621;   // Issue
pub const KIND_GIT_STATUS_OPEN: u32      = 1630;   // 状态-Open
pub const KIND_GIT_STATUS_MERGED: u32    = 1631;   // 状态-Merged
pub const KIND_GIT_STATUS_CLOSED: u32    = 1632;   // 状态-Closed

// git_perms.rs —— 推送保护：require_patch 时禁止直推
pub direct_push_denied: bool,
pub require_patch: bool,
// "direct push denied: require-patch is set, submit a NIP-34 patch"`,
      points: [
        '**整个 Git 工作流是一条签名事件流**——补丁、PR、Issue、状态变更全是签名事件，跟聊天消息同源同表同审计。**代码审查不再是一个独立系统，是协作流的自然部分**。',
        '**require_patch 推送保护**：仓库公告(kind:30617)上的 `buzz-protect` 标签可强制"必须走 NIP-34 补丁流程"，直推被拒。**这是把"分支保护"产品化成事件标签**。',
        '**relay 无状态**：git 读写按请求从对象存储 hydrate 出临时 bare repo，写串行化靠对象存储的指针 CAS——**所以 relay 能多副本水平扩展，不需要 ReadWriteMany 卷**（git_repo.rs:1-9 注释明说）。',
        '**MiCo 对照**：MiCo 的代码协作绑飞书项目/CodeM；Buzz 把 Git 原生压进事件流。**MiCo 不必照搬，但"把关键研发动作（提交/合并/审查）落成可审计事件"值得学**——尤其是安全合规场景。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念，基于 VISION/ARCHITECTURE/NOSTR 三文档）============
  philosophy: {
    coreQuestion: 'Block（Jack Dorsey 的公司）为什么要做一个"人和 Agent 当同事"的 Nostr 协作平台？跟 Slack/飞书的 bot 集成有什么本质区别？',
    answer: '因为 **bot 集成是"外挂"，Buzz 要的是"原生"**。Slack/飞书里 agent 是个 token 驱动的 bot，消息是"系统代发"；Buzz 里 agent 持有自己的 secp256k1 密钥，发的每条消息、每次代码审查、每个合并决策都是它自己签名的 Nostr 事件，跟人类的消息在同一张表、同一条审计链。**区别不是 UI，是信任模型**：bot 能被冒充、能被吊销 token；签名事件不可伪造、可独立验证、可永久追溯。Block 选 Nostr 是因为它是**唯一一个"身份=公钥、动作=签名"的开放协议**——这让"Agent 是正式成员"在密码学上成立，而不只是产品话术。',
    problemDiagnosis: [
      '**bot 集成的信任黑洞**——Slack/飞书的 agent 是"代发消息的 bot"，token 泄露=身份被盗，平台无法区分"agent 干的"还是"拿 token 的人干的"。**企业不敢让 agent 碰敏感动作（审批/合并/打款）**。',
      '**代码协作与聊天两张皮**——GitHub 式代码审查是一个独立系统，聊天是另一个；审查决策无法和讨论、任务、产物串成一条可审计的链。',
      '**"工作流软件"的反面是"看一个团队工作"**——VISION 里原话：希望"像看一个团队工作，不像工作流软件"。工作流软件让人填表；事件流让人看到"谁、在何时、用什么签名、做了什么"。',
      '**厂商锁定的疲劳**——每家 SaaS 都造一个"agent 平台"，身份/数据/审计各管一摊。Nostr 是开放协议，Buzz 的 relay 可自托管、可互联，身份可移植。',
    ],
    designPrinciples: [
      '**一条签名事件流**——消息、反应、profile 更新、工作流步骤、Git patch 全是 `kind` 分发的签名事件（VISION "The Protocol"）。**这是审计的物理基础**。',
      '**Agent 即成员**——secp256k1 密钥对 + 频道成员身份；人用 NIP-42、Agent 用 NIP-98（VISION "Identity"）。**Bot 角色是 designation，不进权限层级**。',
      '**relay 是唯一真相源**——ARCHITECTURE 明确"single source of truth"。所有客户端（桌面/web/mobile/外部 Nostr 客户端）都连同一个 relay，状态不会分叉。',
      '**community 即租户边界**——relay URL/domain = community（NOSTR.md）。一个 agent 的同一把密钥可参与多个 community，但成员身份/任务/DM/在线状态都是 community-local。',
      '**Git 原生进事件流**——NIP-34 把 patch/PR/issue/status 建模成事件，代码审查和聊天同源同审计。require_patch 把"分支保护"变成事件标签。',
      '**可验证审计链**——buzz-audit crate 把每个落库事件镜像成 audit_log 的一条，SHA-256 链式 hash，per-community 独立链，verify_chain 重算所有 hash 做篡改检测。',
    ],
    differentiationMatrix: [
      { vs: 'Slack/飞书', diff: 'Slack/飞书的 agent 是"代发消息的 bot"，token 驱动，消息是系统代发，无独立签名身份；Buzz 的 agent 持自己的 secp256k1 密钥，每条动作是它自己签名的事件。**前者是"外挂机器人"，后者是"正式成员"——信任模型根本不同**。Buzz 抄不了 Slack 的渗透率，但 Slack 抄不了 Buzz 的可审计性。' },
      { vs: 'Paperclip', diff: 'Paperclip 是"AI 公司编制"（CEO/CTO 角色 + Board 审批 + 预算成本中心）；Buzz 是"签名事件流工作空间"（Agent=成员 + Git 进 Nostr + 审计链）。**前者偏组织/财务，后者偏密码学/协议**。MiCo 的编制化叙事更接近 Paperclip，但"可审计"该学 Buzz。' },
      { vs: 'Cabinet', diff: 'Cabinet 是"AI-first 知识底座"（markdown on disk + git 历史 + 房间=知识库+AI 团队）；Buzz 是"协作事件流"（Nostr 签名事件 + 频道=权限边界 + Git 进事件流）。**两者都用 git 思想，但 Cabinet 把 git 当存储，Buzz 把 git 当事件**。' },
      { vs: 'QM', diff: 'QM（YC）是"公司级作用域"（按人/房间 scope 记忆/文件/钥匙串/cron/权限）；Buzz 是"community 即租户 + 签名事件"。**QM 的 scoped 隔离是 2026 公司级答案，Buzz 的 community + Nostr 是开放协议答案**。MiCo 该同时学两套隔离模型。' },
      { vs: 'MiCo', diff: 'MiCo 是"任务协作前台 + 岗位虾编制后台 + IM + 上下文 OS"；Buzz 是"Nostr 协议工作空间 + Agent 即成员 + Git 进事件流 + 签名审计链"。**MiCo 的编制化/台账/成本语言是 Buzz 完全没有的护城河；Buzz 的"签名事件可审计"是 MiCo 治理层最该补的一块**。两者可融合：虾的"上岗/在岗/离岗"用 Nostr 签名事件记录，成本/审批挂事件标签。' },
    ],
  },

  // ============ 时间线（基于公开信息 + 本机 checkout）============
  timeline: [
    { date: '2025-Q3', event: 'Block 内部立项（基于 Nostr 协议做"人机协作工作空间"，Jack Dorsey 主导）' },
    { date: '2026-07-22', event: '开源发布（github.com/block/buzz），Rust + Tauri + React 栈，约 1.9 万+ Star' },
    { date: '2026-08', event: 'NIP-34 Git 协作流成型（patch/PR/issue/status 全事件化）；buzz-audit 哈希链审计落地' },
    { date: '2026-08-09', event: '本台在本机跑通完整 relay 栈（Postgres/Redis/MinIO/Git 对象存储/NIP-PL/NIP-ER 全通），源码精读入库' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'Buzz 是 2026 年"人机协作"赛道里**协议层想得最深的一个**。它不跟 Slack 卷消息回路，不跟 Linear 卷任务手感，不跟 OpenClaw 卷个人助理生态——它选了一条"把人和 Agent 都建模成持密钥的签名主体，把所有协作动作（含 Git）压进一条可审计的 Nostr 事件流"的路。Block 的背书 + Apache 2.0 + Rust 工程质量 + Nostr 开放协议，让它成为**"Agent 是正式成员"这个范式的参考实现**。短板同样明确：编制化/台账/成本语言为零（不是它的目标）；企业治理（私有化权限模型/合规报告）薄；web 入口需 Keycloak OAuth，桌面端是 Tauri（非纯 web，headless 截图受限）。**对 MiCo：不要抄它的产品形态，要抄它的"信任原语"——让虾的关键动作（上岗/审批/合并/打款）落成可独立验证的签名事件**。',
    forMico: [
      '**签名事件审计层**（buzz-audit 哈希链）——**学**。虾的关键动作（上岗/转正/审批/合并/成本入账）落成 community-local 的 SHA-256 链，verify_chain 做篡改检测。**这是安全合规团队准入评估里最缺的一块**。',
      '**Agent 身份=密钥**（NIP-42 人 / NIP-98 agent，Bot 是 designation 不进权限层级）——**学理念**。虾的"上岗"可以=颁发 agent 密钥 + 加入频道，"离岗"=吊销成员身份，比"停用账号"在密码学上更硬。',
      '**Git 关键动作进事件流**（NIP-34 patch/PR/status）——**安全合规场景学**。MiCo 不必把整个 Git 压进 Nostr，但"提交/合并/审查"这些研发关键动作落成可审计事件，对高保密团队是刚需。',
      '**community 即租户**（relay URL=community，成员身份 community-local）——**对照 MiCo 的空间隔离**。MiCo 已有空间/部门概念，Buzz 的 community 是更协议化的版本，可参考其"同一身份跨 community 但状态隔离"的模型。',
      '**编制化/台账/成本**——**Buzz 全无，MiCo 的差异化在这**。不要被 Buzz 的协议优雅带偏去重造事件流底层；MiCo 的护城河是"虾=员工"的组织治理语言，Buzz 永远不会有。',
      '**本机部署验证**——本台已证明 Buzz 可在一台 macOS 上完整跑起来（colima + hermit + just setup + cargo build）。**这是"开源可自托管"承诺的实证**，与 Multica/QM 同级，优于任何 SaaS-only 竞品。',
    ],
  },
};
