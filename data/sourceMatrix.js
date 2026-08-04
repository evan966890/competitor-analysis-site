// 8 维源码对比矩阵 · 9 家深度产品
// 字段：meta | dimensions | products | cells
// 每个 cell 必含 score(1-5) + summary + forMico，可选 codeSnippet/evidence
// 8 维 × 9 家 = 72 单元
window.TD_SOURCE_MATRIX = {
  meta: {
    version: '3.0',
    dateAdded: '2026-08-04',
    title: '8 维源码对比矩阵 · 9 家产品',
    description: '9 家深度产品在 8 个源码维度上的实现对比。横向看差异，纵向看取舍。每格可点开看完整内容（代码/截图/对 MiCo 启示）。',
    note: '部分内容基于官方文档/源码/第三方测评推断，已标注 [推断]。代码片段为构造的演示代码，非实机 git blame。',
  },

  // ============ 8 个维度 ============
  dimensions: [
    {
      id: 'state',
      name: '状态管理',
      desc: '任务状态机怎么设计的？有几态？转移条件？父子任务？',
      decisionLayer: 'P0/P1',
      keyQuestion: '任务的状态机是 Issue-first 还是 Role-first / Phase-first？几态？',
    },
    {
      id: 'scheduling',
      name: '任务调度',
      desc: '单 agent 串行 / 队列 / swarm？路由策略？优先级？',
      decisionLayer: 'P0/P1',
      keyQuestion: 'agent 怎么接活儿？是映射表、路由、还是自适应？',
    },
    {
      id: 'memory',
      name: '记忆架构',
      desc: 'HNSW 向量？SQLite 行级？图谱？跨会话？跨 agent？',
      decisionLayer: 'P1/P2',
      keyQuestion: '记忆存什么？粒度多细？跨 session 怎么保留？',
    },
    {
      id: 'mcp',
      name: 'MCP / 工具协议',
      desc: '中央 MCP / 分布式 / 自研？工具描述格式？动态加载？',
      decisionLayer: 'P1/P2',
      keyQuestion: 'agent 怎么拿到工具？MCP 怎么管？',
    },
    {
      id: 'sandbox',
      name: '沙箱 / 权限',
      desc: '写操作拦截？分层？审计？危险面？',
      decisionLayer: 'P0',
      keyQuestion: 'agent 能写什么？不能写什么？危险面多大？',
    },
    {
      id: 'error',
      name: '错误恢复',
      desc: '重试？回滚？死信？跨 agent 一致性？',
      decisionLayer: 'P1',
      keyQuestion: '失败怎么办？能不能恢复？跨 agent 一致性？',
    },
    {
      id: 'observability',
      name: '观测 / 日志',
      desc: 'trace？token 计数？成本归集？事故回放？',
      decisionLayer: 'P2',
      keyQuestion: '怎么知道 agent 在干什么？花了多少？能复盘吗？',
    },
    {
      id: 'deployment',
      name: '部署架构',
      desc: '单 binary？Docker？集群？联邦？私有化？',
      decisionLayer: 'P2/P3',
      keyQuestion: '怎么部署？怎么升级？能跨机器吗？',
    },
  ],

  // ============ 9 家产品（与 products.js 一致）============
  products: [
    'multica', 'qm', 'paperclip', 'vibe-kanban', 'ruflo',
    'raft', 'jira-meego', 'linear', 'openworker',
  ],

  // ============ 72 个 cells ============
  cells: {

    // ============ 1. 状态管理 ============
    'multica': {
      state: { score: 3, summary: '4 态 Issue 状态机 (Todo / InProgress / InReview / Done)，Issue 一等公民。子任务/父子通过 issue_link 关联。',
        forMico: '状态机是所有任务平台的基础。MiCo 应明确"任务态"（含 InReview 验收态）——Multica 的 4 态少了 Canceled，可补。',
        codeSnippet: { file: 'multica/frontend/src/models/issue.ts (推断)', code: `enum IssueStatus {
  TODO         = 'todo',
  IN_PROGRESS  = 'in_progress',
  IN_REVIEW    = 'in_review',
  DONE         = 'done',
}

const transitions: Record<IssueStatus, IssueStatus[]> = {
  todo:         ['in_progress', 'done'],
  in_progress:  ['in_review', 'todo', 'in_progress'],
  in_review:    ['done', 'in_progress'],
  done:         ['in_review'],
};` } },
      scheduling: { score: 3, summary: 'Squad 路由层：Leader agent 把任务分给对的成员。简单规则 + 手动 override。',
        forMico: 'Squad = "专家团"，跟 MiCo 编制类似。Multica 缺优先级/抢占，MiCo 虾档案可补。' },
      memory: { score: 2, summary: 'Session-scoped，无平台级记忆。任务结束=上下文清空。',
        forMico: 'Multica 的"无平台级记忆"是硬伤，MiCo Assets 图谱可补。' },
      mcp: { score: 3, summary: '14 种 runtime（Claude/Codex/Aider/Cline...），各 runtime 各自管理 tool。',
        forMico: '集成广度足够，但分散。MiCo 应统一一层（中央 MCP）。' },
      sandbox: { score: 2, summary: 'Per-agent sandbox（容器级），但 per-action 权限未做。',
        forMico: '容器隔离是最弱一层，per-action 才是 MiCo 该做的。' },
      error: { score: 2, summary: 'Tool 失败重试（默认 3 次），无跨 agent 一致性。',
        forMico: '重试是底线，跨 agent 一致性是 MiCo 差异化。' },
      observability: { score: 2, summary: 'Token 计数 + 基础日志，无 trace。',
        forMico: '基础款。MiCo 需补 structured trace + cost tracker。' },
      deployment: { score: 3, summary: '自托管 + Docker，社区镜像成熟。',
        forMico: 'Multica 自托管路径是 MiCo 模板。' },
    },

    'qm': {
      state: { score: 2, summary: '无 formal issue 状态机。状态=resource 组合（BROWSE → Projects/Chats/Files/Crons...），scope=project/room。',
        forMico: 'QM 的"scope=状态"是反范式，跟 MiCo 任务中心化思路不同。学它的 scope 隔离，状态机不必学。',
        codeSnippet: { file: 'qm/core/agent/scope.py (推断)', code: `# QM 的 scope-based 状态：任务没有 status 字段
# "状态" = 资源在哪个 scope + 当前对话 ID
class Scope:
    name: str           # 'engineering' / 'design'
    resources: List[Resource]  # 包含 chats/files/crons/keychain
    def has(self, kind: str) -> bool:
        return any(r.kind == kind for r in self.resources)

# "完成任务" = 关闭当前 chat + 资源保留在 scope
# 不是改变 issue.status
chat.close()  # 不需要 todo/in_progress/done 状态字段` } },
      scheduling: { score: 2, summary: '简单派单（assignee 字段），无调度器。每个 AI teammate 独立运行。',
        forMico: 'QM 的"无调度"是公司级反一致性，但换来"每个 scope 干净"。MiCo 应保留调度，但给 scope 隔离。' },
      memory: { score: 4, summary: 'Scoped SQLite + HNSW-like 索引，MAX_CONTEXT_ENTRIES=400, MAX_CONTEXT_TOKENS=120k。Security 污点标记随摘要传递。',
        forMico: 'QM 的 120k/400 条硬上限 + scope 隔离是公司级金标准。MiCo Assets 必须升级 HNSW。' },
      mcp: { score: 4, summary: 'Native MCP 支持，scoped per workspace。MCP 配置文件 + scope 权限联动。',
        forMico: 'MCP + scope 联动是 2026 标准。MiCo 中央 MCP 应跟 scope 权限联动。' },
      sandbox: { score: 5, summary: 'Per-scope 隔离 + keychain (Strict/Auto/Dangerous 三姿态)。SECURITY.md 威胁模型坦诚。',
        forMico: 'QM 的 3 姿态是行业最佳实践。MiCo 必须做到同等水平（试用/转正/降级）。' },
      error: { score: 4, summary: 'Scoped retry，security violation 时 fail-closed（宁可报错也不接错链）。',
        forMico: 'Fail-closed 是 QM 最强护城河。MiCo 安全相关必须 fail-closed。' },
      observability: { score: 4, summary: 'SECURITY.md audit + structured logs + scope 级 trace。',
        forMico: 'Audit log 跟 scope 联动是公司标配。' },
      deployment: { score: 1, summary: '重：core + portal + auth + web-ui 四服务。K8s 部署友好，但单 binary 不可能。',
        forMico: 'QM 的重部署是公司级的"代价"。MiCo 应学 QM 的隔离思路，但部署要更轻。' },
    },

    'paperclip': {
      state: { score: 4, summary: 'Role-based：CEO/CTO/Reflection Coach 角色 + 持续 heartbeat。任务 = 票据（Issue），由 Board 审批。',
        forMico: 'Paperclip 的"角色 = 状态"是 AI 公司编制范式。MiCo 虾档案 + 试运行/转正 跟这个一脉相承。',
        codeSnippet: { file: 'paperclip/server/agents/role.py (推断)', code: `# Paperclip 的角色=状态机
# 不是 issue.status 字段，而是 agent 角色
class AgentRole(StrEnum):
    CEO = 'ceo'
    CTO = 'cto'
    ENGINEER = 'engineer'
    DESIGNER = 'designer'
    REFLECTION_COACH = 'reflection_coach'

# 任务从 CEO 视角分派
class CEO(Agent):
    def on_heartbeat(self):
        issues = self.board.get_pending_for_me()
        for issue in issues:
            self.assign_to(issue, self.cto if self.should_escalate(issue) else self.engineer)` } },
      scheduling: { score: 3, summary: 'Hierarchy-based：CEO → CTO → Engineer，角色驱动。Board 审批是路由的闸门。',
        forMico: '角色驱动是公司级思路。MiCo 编制化（虾=员工）跟这个一样。' },
      memory: { score: 2, summary: 'Issue 票据 + 对话历史，无向量记忆。',
        forMico: 'Paperclip 的"票据=记忆"是反向量范式。MiCo 双向走（票据 + 图谱）。' },
      mcp: { score: 2, summary: '有限工具生态（主要是 office 套件 + GitHub），无 MCP 中央化。',
        forMico: 'MCP 是 MiCo 必须超出的点。' },
      sandbox: { score: 4, summary: 'Board 审批 = 人类 gating。所有超过 X 金额/影响的任务走人工审批。',
        forMico: 'Board 审批是 Paperclip 护城河。MiCo 虾审批流是同一思路。' },
      error: { score: 3, summary: '任务失败 reassign 给其他角色，无回滚。',
        forMico: 'Reassign 是公司级"不躺平"思路。' },
      observability: { score: 3, summary: 'Dashboard per role，能看到 CEO 视角/CTO 视角/Engineer 视角。',
        forMico: '多视角 Dashboard 是公司级标配。' },
      deployment: { score: 4, summary: '自托管，比 QM 简单（无 auth 服务分离），单 Docker Compose。',
        forMico: '自托管路径参考。' },
    },

    'vibe-kanban': {
      state: { score: 3, summary: '4 列 Kanban (Backlog / Active / Review / Done)，无 formal state machine。卡片 = 任务，无父子。',
        forMico: 'VK 极简是 web Kanban 直觉。MiCo 4 列够用，但缺 Canceled/Blocked。' },
      scheduling: { score: 4, summary: 'Type→agent 映射表 + 负载最低：CodeChange→Claude/Codex, TestGen→Codex/Aider, ... 6 个 coding agent 调度。',
        forMico: '映射表+负载是工业级够用。MiCo 调度器可学这思路（按虾工号 + 任务类型路由）。',
        codeSnippet: { file: 'vibe-kanban/backend/src/router.rs (推断)', code: `pub fn route(task: &Task) -> AgentKind {
    // 1) 显式指定优先
    if let Some(s) = task.preferred_agent { return s; }
    // 2) 按 task.kind 匹配最擅长 agent
    let candidates = match task.kind {
        TaskKind::CodeChange  => vec![ClaudeCode, Codex],
        TaskKind::TestGen     => vec![Codex, Aider],
        TaskKind::DocWrite    => vec![ClaudeCode, GeminiCLI],
        _ => vec![ClaudeCode],
    };
    // 3) 在候选中选当前负载最低的
    candidates.into_iter()
        .min_by_key(|a| ACTIVE_LOAD[*a])
        .unwrap()
}` } },
      memory: { score: 1, summary: '无跨任务记忆，每任务 fresh start。',
        forMico: '硬伤。MiCo 必须有"任务记忆"层（HNSW/图谱），不能重复这个短板。' },
      mcp: { score: 4, summary: '中央 MCP 配置，6 个 agent 共享一份（filesystem/github/jira/postgres）。',
        forMico: '中央 MCP 是 2026 标配。MiCo 1 份 MCP 配 = 全部虾用。' },
      sandbox: { score: 1, summary: '默认 --dangerously-skip-permissions（最大自主度），无 per-action 拦截。',
        forMico: '反面警示！MiCo 必须有"分级自主度"，不能默认信任。' },
      error: { score: 2, summary: 'worktree 隔离 = 失败不污染其他任务，但无跨任务恢复。',
        forMico: 'worktree 隔离是 VK 最强护城河，MiCo 必学。' },
      observability: { score: 2, summary: 'Per-agent 进度条，基础 token 计数。',
        forMico: '基础款。MiCo 需补 cost tracker。' },
      deployment: { score: 5, summary: '单 binary (Rust+React+TS+SQLite)，所有平台一个执行文件。',
        forMico: 'VK 的"单 binary"是 2026 部署标杆。MiCo 后端应朝这方向走。' },
    },

    'ruflo': {
      state: { score: 4, summary: 'Swarm state + 5 拓扑模式 (hierarchical/mesh/ring/star/adaptive)，状态随拓扑变。',
        forMico: '5 拓扑太复杂，MiCo 只做 hierarchical+adaptive 两种够用。' },
      scheduling: { score: 5, summary: 'Adaptive 5 拓扑自适应：hierarchical=树状/mesh=网状/ring=环状/star=星状/adaptive=学出来。共识算法 = Raft/Gossip/None/Auto。',
        forMico: '5 拓扑太重。MiCo 做 hierarchical + adaptive 2 种，配合 Queen 虾即可。',
        codeSnippet: { file: 'ruflo/src/swarm/topology.ts', code: `export type Topology = 'hierarchical' | 'mesh' | 'ring' | 'star' | 'adaptive';
export function selectTopology(task: Task): Topology {
  if (task.steps.length === 1) return 'star';
  if (task.kind === 'pipeline') return 'ring';
  if (task.can_parallelize) return 'hierarchical';
  if (task.requires_consensus) return 'mesh';
  return 'adaptive';
}` } },
      memory: { score: 5, summary: 'HNSW 向量（150x-12500x 快于暴力）+ SONA 自学习（成功轨迹自动 add 记忆 + 跳过试探）。',
        forMico: 'HNSW + SONA 是 2026 最低标准。MiCo Assets 必须升级。' },
      mcp: { score: 5, summary: '215 MCP 工具 + 32 插件 + WASM 沙箱 + 5 LLM provider + 自家 ruvLLM。',
        forMico: '能力最满的对手。MiCo 不必追数量，但"中央 MCP"必学。' },
      sandbox: { score: 4, summary: 'AIDefence（防 prompt injection）+ 零信任联邦（mTLS+ed25519）+ WASM 沙箱。',
        forMico: '零信任联邦是 2026 多场地部署标准答案。MiCo 未来要做。' },
      error: { score: 4, summary: 'Consensus (Raft/Gossip) + self-healing（节点失败自动重启）。',
        forMico: 'Self-healing 值得学（虾失败自动重启）。' },
      observability: { score: 5, summary: 'structured logs + traces + metrics + cost tracker + 285/285 tool 描述带"Use when"指导。',
        forMico: 'Ruflo observability 是行业最强。MiCo 需补 cost tracker。' },
      deployment: { score: 4, summary: '单 binary + WASM + Cloud Run + 跨机器联邦（零信任）。',
        forMico: '联邦 = MiCo 多场地部署的标准答案。' },
    },

    'raft': {
      state: { score: 3, summary: 'Channel/Thread/Task 3 层模型，task 派生自 thread。task 状态 = To Do / In Progress / Done。',
        forMico: 'Thread 即上下文是 Raft 最大创新，MiCo 可学（task 详情页内嵌 thread）。' },
      scheduling: { score: 3, summary: 'Expertise tag 路由（research/code/test）+ 用户可显式 @。简单匹配，无负载均衡。',
        forMico: '简单匹配足够。MiCo 虾的"专长标签"可走这思路。' },
      memory: { score: 4, summary: '每 agent 私有 SQLite/Vector，跨会话保留（如 @hermes-researcher 有 12k tokens / 234 conversations）。',
        forMico: '每 agent 私有记忆 = 跨会话保留的最低标准。MiCo 虾档案 + 记忆图谱可比这强。' },
      mcp: { score: 3, summary: '外部 agent via webhook（不抢 runtime，用户自带的 Claude/Codex/Hermes 挂进 channel）。',
        forMico: '外部 agent 接入是好范式。MiCo 编制允许外部注册可学。' },
      sandbox: { score: 2, summary: '委托给 runtime（用户自带的 agent 自己管），平台层无 per-action 权限。',
        forMico: '委托是 SaaS 妥协，MiCo 自家 runtime 不必这样。' },
      error: { score: 2, summary: 'Webhook retry（自动 3 次），无 cross-thread 恢复。',
        forMico: '基础款。MiCo 跨任务恢复必超出。' },
      observability: { score: 3, summary: 'Activity log per agent，无 structured trace。',
        forMico: '基础款。' },
      deployment: { score: 1, summary: 'SaaS only（slock.ai），无自托管/无开源/无私有化。',
        forMico: '反面警示：MiCo 的"私有化 + 自托管"是 Raft 永远给不了的护城河。' },
    },

    'jira-meego': {
      state: { score: 5, summary: '完整 issue 工作流 (To Do / In Progress / In Review / Done / Blocked / Canceled)，industry standard。',
        forMico: 'Jira 状态机是行业范式。MiCo 必须支持同等粒度（至少 6 态）。' },
      scheduling: { score: 4, summary: 'Assignee + Workflow + JQL 复杂过滤。Sprint 自动派单（Scrum 模式）。',
        forMico: 'JQL 复杂过滤是 20 年沉淀。MiCo 编制化（虾=员工）有类似需求。' },
      memory: { score: 3, summary: 'Issue 评论历史 + Activity stream，无智能记忆（HNSW/向量）。',
        forMico: '历史完整但无智能。MiCo 智能记忆（图谱）是差异点。' },
      mcp: { score: 3, summary: 'Jira REST API + 自定义 plugin（Connect/Forge），生态成熟。',
        forMico: 'REST API 成熟但缺 MCP 标准。MiCo MCP 可借鉴其生态思路。' },
      sandbox: { score: 4, summary: 'Permission scheme + Project role + Issue Security Level（3 层权限）。',
        forMico: '3 层权限是 20 年沉淀。MiCo 编制权限可学。' },
      error: { score: 3, summary: 'Sub-task 失败标记，无自动重试。',
        forMico: '基础款。' },
      observability: { score: 4, summary: 'Audit log + Activity stream + JQL 历史查询 + Dashboard (Jira 自带 + Marketplace)。',
        forMico: 'Audit log + Dashboard 是 20 年沉淀。MiCo 必须达到同等水平。' },
      deployment: { score: 2, summary: 'Jira Cloud（SaaS）/ Jira Data Center（自托管，重）/ Meego（轻量自托管）。',
        forMico: '三种部署模式覆盖 80% 客户。MiCo 应学这思路。' },
    },

    'linear': {
      state: { score: 5, summary: 'Cycle + Status (Triage / Backlog / Todo / In Progress / In Review / Done / Canceled)，动线最快（50ms 手感）。',
        forMico: 'Linear 的 50ms 手感是 2024 标杆。MiCo 任务动线要朝这方向。' },
      scheduling: { score: 4, summary: 'Triage 收单 + Project 视图 + 自动 assign（基于 team）+ Cycle 自动排期。',
        forMico: 'Triage 是好的"收单"范式，MiCo 可学（虾有专门接单岗）。' },
      memory: { score: 3, summary: 'Issue + Cycle 节奏 + Document，无智能记忆。',
        forMico: 'Document 是 Linear 的"上下文沉淀"思路。MiCo 文档型虾可学。' },
      mcp: { score: 4, summary: 'GraphQL API + 官方 SDK + 100+ integration，生态成熟。',
        forMico: 'GraphQL API 是现代做法。MiCo 任务 API 可走 GraphQL。' },
      sandbox: { score: 3, summary: 'Team + Role + Member，简单 RBAC。',
        forMico: '简单 RBAC 是"不过度"的范式。MiCo 编制权限不必过度。' },
      error: { score: 3, summary: 'Triage 失败回退（自动 re-triage），无跨任务重试。',
        forMico: 'Triage 思路好。' },
      observability: { score: 4, summary: 'Activity feed + GraphQL API + Cycle 报告 + 实时 sync（50ms 推送）。',
        forMico: '实时 sync 是 2024 标杆。MiCo 实时面板要朝这方向。' },
      deployment: { score: 2, summary: 'SaaS only（linear.app），无自托管/无开源/无私有化。',
        forMico: '反面警示：MiCo 的"私有化"是 Linear 永远给不了的护城河。' },
    },

    'openworker': {
      state: { score: 2, summary: '任务=会话内步骤链（Plan→读→聚合→起草→审批），无独立状态机。隐式状态=步骤序号。',
        forMico: 'OpenWorker 状态=步骤链是个人向够用，公司级必补 4-6 态。' },
      scheduling: { score: 1, summary: '单 agent 串行，无调度。每次任务一 agent。',
        forMico: '个人向 OK，公司级必补调度。MiCo 调度器 + 虾编制 = 解决方案。' },
      memory: { score: 3, summary: '本地 SQLite 记忆，跨会话保留，离线可用。',
        forMico: '本地 SQLite 是个人向够用，公司级必须图谱+共享（HNSW）。' },
      mcp: { score: 4, summary: '25+ 工具连接器（Slack/GitHub/Jira/Notion/Linear/HubSpot...），基于 aisuite。',
        forMico: '25+ 集成清单是上游必接目录，MiCo 别重造。' },
      sandbox: { score: 3, summary: '每次外发前弹窗（默认开启），无分级自主度。',
        forMico: '弹窗 UX 值得抄（搬到 MiCo 审批流），但缺分级是问题。' },
      error: { score: 2, summary: '单步重试，无系统级恢复。',
        forMico: '基础款。' },
      observability: { score: 3, summary: '任务执行面板 + 5 步链 + token 计数，基础但清晰。',
        forMico: '5 步链 UX 清晰，MiCo 任务执行页可学。' },
      deployment: { score: 4, summary: '桌面原生（Tauri 壳）+ Python 引擎 + 本地优先 + 开源。',
        forMico: '本地优先 + 开源是个人向标杆。MiCo "桌面客户端"可参考。' },
    },

  },
};
