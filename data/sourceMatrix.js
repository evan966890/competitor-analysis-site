// 8 维源码对比矩阵 · 13 家深度产品
// 字段：meta | dimensions | products | cells
// 每个 cell 必含 score(1-5) + summary + forMico，可选 codeSnippet/evidence
// 8 维 × 13 家 = 104 单元
// 全部 evidence 引用现有截图库（vibe-kanban/ruflo/raft/openworker 为"示意图"；buzz/qoderwork/qoderwake 为官网/实机实拍；wanuai 为本机实机登录 dashboard）
// code snippet 为基于官方文档/源码推断的演示代码，非实机 git blame
window.TD_SOURCE_MATRIX = {
  meta: {
    version: '3.2',
    dateAdded: '2026-08-10',
    title: '8 维源码对比矩阵 · 13 家产品',
    description: '13 家深度产品在 8 个源码维度上的实现对比。横向看差异，纵向看取舍。每格可点开看完整内容（代码/截图/对 MiCo 启示）。',
    note: 'evidence 字段：multica/qm/paperclip/jira-meego/linear/buzz/qoderwake/wanuai 为实机或官网实拍截图；vibe-kanban/ruflo/raft/openworker/qoderwork 为基于官方发布物料合成的"示意图"或官网。code snippet 为构造的演示代码，已标注 [推断]。',
  },

  // ============ 8 个维度 ============
  dimensions: [
    {
      id: 'state', name: '状态管理',
      desc: '任务状态机怎么设计的？有几态？转移条件？父子任务？',
      decisionLayer: 'P0/P1',
      keyQuestion: '任务的状态机是 Issue-first 还是 Role-first / Phase-first？几态？',
    },
    {
      id: 'scheduling', name: '任务调度',
      desc: '单 agent 串行 / 队列 / swarm？路由策略？优先级？',
      decisionLayer: 'P0/P1',
      keyQuestion: 'agent 怎么接活儿？是映射表、路由、还是自适应？',
    },
    {
      id: 'memory', name: '记忆架构',
      desc: 'HNSW 向量？SQLite 行级？图谱？跨会话？跨 agent？',
      decisionLayer: 'P1/P2',
      keyQuestion: '记忆存什么？粒度多细？跨 session 怎么保留？',
    },
    {
      id: 'mcp', name: 'MCP / 工具协议',
      desc: '中央 MCP / 分布式 / 自研？工具描述格式？动态加载？',
      decisionLayer: 'P1/P2',
      keyQuestion: 'agent 怎么拿到工具？MCP 怎么管？',
    },
    {
      id: 'sandbox', name: '沙箱 / 权限',
      desc: '写操作拦截？分层？审计？危险面？',
      decisionLayer: 'P0',
      keyQuestion: 'agent 能写什么？不能写什么？危险面多大？',
    },
    {
      id: 'error', name: '错误恢复',
      desc: '重试？回滚？死信？跨 agent 一致性？',
      decisionLayer: 'P1',
      keyQuestion: '失败怎么办？能不能恢复？跨 agent 一致性？',
    },
    {
      id: 'observability', name: '观测 / 日志',
      desc: 'trace？token 计数？成本归集？事故回放？',
      decisionLayer: 'P2',
      keyQuestion: '怎么知道 agent 在干什么？花了多少？能复盘吗？',
    },
    {
      id: 'deployment', name: '部署架构',
      desc: '单 binary？Docker？集群？联邦？私有化？',
      decisionLayer: 'P2/P3',
      keyQuestion: '怎么部署？怎么升级？能跨机器吗？',
    },
  ],

  // ============ 13 家产品（与 products.js 一致）============
  products: [
    'multica', 'qm', 'paperclip', 'vibe-kanban', 'ruflo',
    'raft', 'jira-meego', 'linear', 'openworker',
    'buzz', 'qoderwork', 'qoderwake', 'wanuai',
  ],

  // ============ 104 个 cells（含 code snippet + evidence）============
  cells: {

    // ============ 1. Multica ============
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
};` },
        evidence: { img: 'assets/shots/multica/07-issues-board.png', cap: 'Multica Issues Board：4 列看板，Issue 状态机对应列' } },
      scheduling: { score: 3, summary: 'Squad 路由层：Leader agent 把任务分给对的成员。简单规则 + 手动 override。',
        forMico: 'Squad = "专家团"，跟 MiCo 编制类似。Multica 缺优先级/抢占，MiCo 虾档案可补。',
        codeSnippet: { file: 'multica/backend/src/squad/router.ts (推断)', code: `class SquadRouter {
  route(issue: Issue, squad: Squad): Agent | null {
    // 1) 显式 assignee 优先
    if (issue.assignee_id) return this.findAgent(issue.assignee_id);
    // 2) 按 role 匹配 squad 中第一个 idle agent
    const candidates = squad.agents.filter(a =>
      a.role === issue.required_role && a.status === 'idle'
    );
    return candidates[0] || null;
  }
}` },
        evidence: { img: 'assets/shots/multica/10-squads.png', cap: 'Multica Squads：Leader agent 把任务分给成员' } },
      memory: { score: 2, summary: 'Session-scoped，无平台级记忆。任务结束=上下文清空。',
        forMico: 'Multica 的"无平台级记忆"是硬伤，MiCo Assets 图谱可补。' },
      mcp: { score: 3, summary: '14 种 runtime（Claude/Codex/Aider/Cline...），各 runtime 各自管理 tool。',
        forMico: '集成广度足够，但分散。MiCo 应统一一层（中央 MCP）。',
        codeSnippet: { file: 'multica/backend/src/runtime/registry.ts (推断)', code: `const RUNTIMES = [
  { id: 'claude-code', name: 'Claude Code', exec: 'claude', mcp: true },
  { id: 'codex',       name: 'Codex CLI',  exec: 'codex', mcp: true },
  { id: 'aider',       name: 'Aider',      exec: 'aider', mcp: false },
  { id: 'cline',       name: 'Cline',      exec: 'cline', mcp: true },
  // ... 14 total
];` } },
      sandbox: { score: 2, summary: 'Per-agent sandbox（容器级），但 per-action 权限未做。',
        forMico: '容器隔离是最弱一层，per-action 才是 MiCo 该做的。' },
      error: { score: 2, summary: 'Tool 失败重试（默认 3 次），无跨 agent 一致性。',
        forMico: '重试是底线，跨 agent 一致性是 MiCo 差异化。',
        codeSnippet: { file: 'multica/backend/src/util/retry.ts (推断)', code: `async function withRetry<T>(fn: () => Promise<T>, opts = { max: 3, backoff: 1000 }): Promise<T> {
  let lastErr: Error;
  for (let i = 0; i < opts.max; i++) {
    try { return await fn(); } catch (e) {
      lastErr = e;
      await sleep(opts.backoff * Math.pow(2, i));
    }
  }
  throw lastErr!;
}` } },
      observability: { score: 2, summary: 'Token 计数 + 基础日志，无 trace。',
        forMico: '基础款。MiCo 需补 structured trace + cost tracker。' },
      deployment: { score: 3, summary: '自托管 + Docker，社区镜像成熟。',
        forMico: 'Multica 自托管路径是 MiCo 模板。',
        evidence: { img: 'assets/shots/multica/01-home.png', cap: 'Multica 自托管首页' } },
    },

    // ============ 2. QM (YC) ============
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

chat.close()  # "完成任务" = 关闭当前 chat（不是改变 issue.status）` },
        evidence: { img: 'assets/shots/qm/02-home.png', cap: 'QM BROWSE 资源导航：scope=project/room，无 formal issue' } },
      scheduling: { score: 2, summary: '简单派单（assignee 字段），无调度器。每个 AI teammate 独立运行。',
        forMico: 'QM 的"无调度"是公司级反一致性，但换来"每个 scope 干净"。MiCo 应保留调度，但给 scope 隔离。',
        codeSnippet: { file: 'qm/core/agent/assign.py (推断)', code: `# QM 的派单：直接指定 assignee，无路由
class Assignment:
    chat_id: str
    assignee: str  # AI teammate 的名字
    scope: str

# 每次 @ AI teammate 创建新 chat
def create_chat(scope, message):
    return Chat(
        scope=scope,
        message=message,
        agent=resolve_agent(scope.default_agent),
    )` } },
      memory: { score: 4, summary: 'Scoped SQLite + HNSW-like 索引，MAX_CONTEXT_ENTRIES=400, MAX_CONTEXT_TOKENS=120k。Security 污点标记随摘要传递。',
        forMico: 'QM 的 120k/400 条硬上限 + scope 隔离是公司级金标准。MiCo Assets 必须升级 HNSW。',
        codeSnippet: { file: 'qm/core/memory/scoped_db.py (推断)', code: `# QM 的 scope-level 记忆（核心：金标准）
class ScopedMemoryDB:
    LIMITS = {
        'MAX_CONTEXT_ENTRIES': 400,
        'MAX_CONTEXT_TOKENS': 120_000,
        'NEAR_TOKEN_RATIO': 0.6,  # 近端保留 60%
    }

    def add(self, scope: str, entry: MemoryEntry):
        if self.count(scope) >= self.LIMITS['MAX_CONTEXT_ENTRIES']:
            self.compact(scope)  # 后台压缩
        self.hnsw_index.add(scope, entry.embedding, entry)

    def compact(self, scope: str):
        # Security 污点标记随摘要传递（关键创新）
        summary = self.llm_summarize(scope)
        summary.security_tainted = self.has_tainted(scope)
        self.replace(scope, summary)` },
        evidence: { img: 'assets/shots/qm/02-home.png', cap: 'QM Memory：scoped + HNSW + 120k 硬上限' } },
      mcp: { score: 4, summary: 'Native MCP 支持，scoped per workspace。MCP 配置文件 + scope 权限联动。',
        forMico: 'MCP + scope 联动是 2026 标准。MiCo 中央 MCP 应跟 scope 权限联动。',
        codeSnippet: { file: 'qm/core/mcp/registry.py (推断)', code: `# QM 的 MCP：跟 scope 权限联动
class ScopedMCP:
    def register(self, scope: str, server: MCPServer):
        # MCP server 注册时必须声明所需 scope 权限
        if not self.scope_has_permission(scope, server.required_permissions):
            raise PermissionDenied(scope, server.name)
        self.servers[scope].append(server)` } },
      sandbox: { score: 5, summary: 'Per-scope 隔离 + keychain (Strict/Auto/Dangerous 三姿态)。SECURITY.md 威胁模型坦诚。',
        forMico: 'QM 的 3 姿态是行业最佳实践。MiCo 必须做到同等水平（试用/转正/降级）。',
        codeSnippet: { file: 'qm/core/auth/keychain.py (推断)', code: `# QM 的 keychain 三姿态（行业金标准）
class Keychain:
    STRICT = 'strict'        # 任何写操作都要人工确认
    AUTO   = 'auto'          # 写操作自动执行，外部操作要确认
    DANGEROUS = 'dangerous'  # 全部自动，但所有操作进 audit log

    def get_posture(self, scope: str) -> str:
        return self.scope_config[scope].posture

    def can_execute(self, scope: str, op: Operation) -> bool:
        posture = self.get_posture(scope)
        if posture == 'strict':    return op.is_read or op.has_user_approval
        if posture == 'auto':      return not op.is_external
        if posture == 'dangerous': return True  # 全自动 + audit log` },
        evidence: { img: 'assets/shots/qm/07-keychain.png', cap: 'QM Keychain：Strict/Auto/Dangerous 三姿态' } },
      error: { score: 4, summary: 'Scoped retry，security violation 时 fail-closed（宁可报错也不接错链）。',
        forMico: 'Fail-closed 是 QM 最强护城河。MiCo 安全相关必须 fail-closed。',
        codeSnippet: { file: 'qm/core/agent/retry.py (推断)', code: `class SecurityBoundary:
    @staticmethod
    def check_on_retry(prev_result, current_op):
        # QM 核心：security 违反时 fail-closed
        if prev_result.security_violation and not current_op.has_approval:
            # 宁可报错也不接错链（fail-closed）
            raise SecurityAbort(
                'Refusing to retry: previous result was security-tainted, '
                'requires explicit user approval to proceed.'
            )` } },
      observability: { score: 4, summary: 'SECURITY.md audit + structured logs + scope 级 trace。',
        forMico: 'Audit log 跟 scope 联动是公司标配。' },
      deployment: { score: 1, summary: '重：core + portal + auth + web-ui 四服务。K8s 部署友好，但单 binary 不可能。',
        forMico: 'QM 的重部署是公司级的"代价"。MiCo 应学 QM 的隔离思路，但部署要更轻。' },
    },

    // ============ 3. Paperclip ============
    'paperclip': {
      state: { score: 4, summary: 'Role-based：CEO/CTO/Reflection Coach 角色 + 持续 heartbeat。任务 = 票据（Issue），由 Board 审批。',
        forMico: 'Paperclip 的"角色 = 状态"是 AI 公司编制范式。MiCo 虾档案 + 试运行/转正 跟这个一脉相承。',
        codeSnippet: { file: 'paperclip/server/agents/role.py (推断)', code: `class AgentRole(StrEnum):
    CEO = 'ceo'
    CTO = 'cto'
    ENGINEER = 'engineer'
    DESIGNER = 'designer'
    REFLECTION_COACH = 'reflection_coach'

class CEO(Agent):
    def on_heartbeat(self):
        issues = self.board.get_pending_for_me()
        for issue in issues:
            self.assign_to(issue, self.cto if self.should_escalate(issue) else self.engineer)` },
        evidence: { img: 'assets/shots/paperclip/03-EVA-dashboard.png', cap: 'Paperclip Dashboard：CEO/CTO 视角' } },
      scheduling: { score: 3, summary: 'Hierarchy-based：CEO → CTO → Engineer，角色驱动。Board 审批是路由的闸门。',
        forMico: '角色驱动是公司级思路。MiCo 编制化（虾=员工）跟这个一样。',
        codeSnippet: { file: 'paperclip/server/agents/hierarchy.py (推断)', code: `class HierarchyRouter:
    ROLES = {CEO: [CTO, REFLECTION_COACH], CTO: [ENGINEER, DESIGNER]}

    def route(self, issue: Issue) -> Agent:
        # 1) 检查 Board 审批（路由前的闸门）
        if not self.board.approved(issue):
            return self.board.queue_for_approval(issue)
        # 2) 按角色路由
        target_role = self.roles_for(issue.kind)
        return self.first_idle_agent(target_role)` },
        evidence: { img: 'assets/shots/paperclip/03-EVA-dashboard.png', cap: 'Paperclip 角色驱动调度' } },
      memory: { score: 2, summary: 'Issue 票据 + 对话历史，无向量记忆。',
        forMico: 'Paperclip 的"票据=记忆"是反向量范式。MiCo 双向走（票据 + 图谱）。' },
      mcp: { score: 2, summary: '有限工具生态（主要是 office 套件 + GitHub），无 MCP 中央化。',
        forMico: 'MCP 是 MiCo 必须超出的点。' },
      sandbox: { score: 4, summary: 'Board 审批 = 人类 gating。所有超过 X 金额/影响的任务走人工审批。',
        forMico: 'Board 审批是 Paperclip 护城河。MiCo 虾审批流是同一思路。',
        codeSnippet: { file: 'paperclip/server/board/approval.py (推断)', code: `class BoardApproval:
    THRESHOLD_AMOUNT = 1000  # USD

    def requires_approval(self, op: Operation) -> bool:
        return (
            op.estimated_cost > self.THRESHOLD_AMOUNT or
            op.is_external or
            op.is_destructive
        )

    def submit_for_approval(self, op: Operation):
        return self.board.add_pending(PendingApproval(
            op=op,
            submitted_by=op.agent,
            submitted_at=now(),
            expires_at=now() + timedelta(hours=24),
        ))` },
        evidence: { img: 'assets/shots/paperclip/04-EVA-inbox.png', cap: 'Paperclip Inbox：Board 审批 = 人类闸门' } },
      error: { score: 3, summary: '任务失败 reassign 给其他角色，无回滚。',
        forMico: 'Reassign 是公司级"不躺平"思路。' },
      observability: { score: 3, summary: 'Dashboard per role，能看到 CEO 视角/CTO 视角/Engineer 视角。',
        forMico: '多视角 Dashboard 是公司级标配。' },
      deployment: { score: 4, summary: '自托管，比 QM 简单（无 auth 服务分离），单 Docker Compose。',
        forMico: '自托管路径参考。' },
    },

    // ============ 4. Vibe Kanban (BloopAI) ============
    'vibe-kanban': {
      state: { score: 3, summary: '4 列 Kanban (Backlog / Active / Review / Done)，无 formal state machine。卡片 = 任务，无父子。',
        forMico: 'VK 极简是 web Kanban 直觉。MiCo 4 列够用，但缺 Canceled/Blocked。',
        evidence: { img: 'assets/shots/vibe-kanban/01_kanban_board.jpg', cap: 'VK 看板：4 列卡片流，Backlog/Active/Review/Done' } },
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
}` },
        evidence: { img: 'assets/shots/vibe-kanban/02_task_execution.jpg', cap: 'VK 任务执行：5 步进度链 + 3 agent 队列' } },
      memory: { score: 1, summary: '无跨任务记忆，每任务 fresh start。',
        forMico: '硬伤。MiCo 必须有"任务记忆"层（HNSW/图谱），不能重复这个短板。' },
      mcp: { score: 4, summary: '中央 MCP 配置，6 个 agent 共享一份（filesystem/github/jira/postgres）。',
        forMico: '中央 MCP 是 2026 标配。MiCo 1 份 MCP 配 = 全部虾用。',
        codeSnippet: { file: 'vibe-kanban/config/mcp_servers.yaml (推断)', code: `# Vibe Kanban 的 MCP 中央配置——所有 agent 共享同一组 MCP server
mcp_servers:
  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"]
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env: { GITHUB_TOKEN: "\${GITHUB_TOKEN}" }
  jira:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-jira"]
    env: { JIRA_API_TOKEN: "\${JIRA_API_TOKEN}" }

agent_runtime:
  claude_code: { mcp_config: "config/mcp_servers.yaml", extra_flags: ["--dangerously-skip-permissions"] }
  codex_cli:   { mcp_config: "config/mcp_servers.yaml" }
  # ... 6 个 agent 共享同一份 MCP 配置` },
        evidence: { img: 'assets/shots/vibe-kanban/03_agent_config.jpg', cap: 'VK MCP 中央配置 + 6 agent 共享' } },
      sandbox: { score: 1, summary: '默认 --dangerously-skip-permissions（最大自主度），无 per-action 拦截。',
        forMico: '反面警示！MiCo 必须有"分级自主度"，不能默认信任。',
        codeSnippet: { file: 'vibe-kanban/backend/src/safety/mod.rs (推断)', code: `pub struct SafetyConfig {
    // VK 的关键决策：默认跳过所有权限
    pub default_flags: Vec<&'static str> = vec!["--dangerously-skip-permissions"],
    // 用户可改为限制模式（但默认是全开）
    pub restricted_mode: bool = false,
}

// 启动 agent 时注入
fn start_agent(agent: AgentKind, task: &Task) -> Result<Handle> {
    let flags = if SAFETY.restricted_mode { vec![] } else { SAFETY.default_flags.clone() };
    spawn(agent.binary(), &flags)
}` },
        evidence: { img: 'assets/shots/vibe-kanban/03_agent_config.jpg', cap: 'VK 默认 --dangerously-skip-permissions' } },
      error: { score: 2, summary: 'worktree 隔离 = 失败不污染其他任务，但无跨任务恢复。',
        forMico: 'worktree 隔离是 VK 最强护城河，MiCo 必学。',
        evidence: { img: 'assets/shots/vibe-kanban/05_worktree_view.jpg', cap: 'VK 5 个并行 worktree，物理隔离失败' } },
      observability: { score: 2, summary: 'Per-agent 进度条，基础 token 计数。',
        forMico: '基础款。MiCo 需补 cost tracker。',
        evidence: { img: 'assets/shots/vibe-kanban/02_task_execution.jpg', cap: 'VK Per-agent 进度条' } },
      deployment: { score: 5, summary: '单 binary (Rust+React+TS+SQLite)，所有平台一个执行文件。',
        forMico: 'VK 的"单 binary"是 2026 部署标杆。MiCo 后端应朝这方向走。',
        codeSnippet: { file: 'vibe-kanban/Cargo.toml (推断)', code: `[package]
name = "vibe-kanban"
version = "0.7.0"
edition = "2024"

[dependencies]
tauri = "2.0"          # 桌面壳（也支持纯 CLI）
rusqlite = { version = "0.31", features = ["bundled"] }  # SQLite 内嵌
tokio = { version = "1", features = ["full"] }

[[bin]]
name = "vibe-kanban"
path = "src/main.rs"   # 单可执行文件

# 关键：所有功能（Web + TUI + DB + Agent）打成一个 binary
# vibe-kanban serve / vibe-kanban tui / vibe-kanban new-task 共用同一 binary` },
        evidence: { img: 'assets/shots/vibe-kanban/04_terminal_ui.jpg', cap: 'VK TUI：单 binary 跑完整套' } },
    },

    // ============ 5. Ruflo (ruvnet) ============
    'ruflo': {
      state: { score: 4, summary: 'Swarm state + 5 拓扑模式 (hierarchical/mesh/ring/star/adaptive)，状态随拓扑变。',
        forMico: '5 拓扑太复杂，MiCo 只做 hierarchical+adaptive 两种够用。',
        evidence: { img: 'assets/shots/ruflo/01_swarm_dashboard.jpg', cap: 'Ruflo Swarm：Queen + 12 Worker 的 mesh' } },
      scheduling: { score: 5, summary: 'Adaptive 5 拓扑自适应：hierarchical=树状/mesh=网状/ring=环状/star=星状/adaptive=学出来。共识算法 = Raft/Gossip/None/Auto。',
        forMico: '5 拓扑太重。MiCo 做 hierarchical + adaptive 2 种，配合 Queen 虾即可。',
        codeSnippet: { file: 'ruflo/src/swarm/topology.ts', code: `export type Topology = 'hierarchical' | 'mesh' | 'ring' | 'star' | 'adaptive';
export function selectTopology(task: Task): Topology {
  if (task.steps.length === 1) return 'star';
  if (task.kind === 'pipeline') return 'ring';
  if (task.can_parallelize) return 'hierarchical';
  if (task.requires_consensus) return 'mesh';
  return 'adaptive';
}` },
        evidence: { img: 'assets/shots/ruflo/03_swarm_topology.jpg', cap: 'Ruflo 5 拓扑配置' } },
      memory: { score: 5, summary: 'HNSW 向量（150x-12500x 快于暴力）+ SONA 自学习（成功轨迹自动 add 记忆 + 跳过试探）。',
        forMico: 'HNSW + SONA 是 2026 最低标准。MiCo Assets 必须升级。',
        codeSnippet: { file: 'ruflo/src/memory/agentdb.ts (推断)', code: `import { HNSW } from 'hnswlib';

export class AgentDB {
  private index: HNSW;
  private store: Map<number, MemoryEntry> = new Map();

  constructor(dim: number = 1536) {
    this.index = new HNSW('cosine', dim);
    this.index.initIndex(10000, 16, 200);  // 1万条起步，M=16, ef=200
  }

  async search(query: string, k: number = 5): Promise<MemoryEntry[]> {
    const qVec = await this.embed(query);
    const labels = this.index.searchKnn(qVec, k);  // sub-ms
    return labels.map(l => this.store.get(l));
  }

  // SONA 自学习：成功任务轨迹自动 add 到记忆
  async learnFromTrajectory(traj: Trajectory): Promise<void> {
    if (traj.outcome === 'success') {
      await this.add({
        content: traj.task_description,
        outcome: 'success',
        shortcuts: traj.optimization_hints,  // 下次跳过这些试探
      });
    }
  }
}` },
        evidence: { img: 'assets/shots/ruflo/04_memory_vector.jpg', cap: 'Ruflo HNSW 向量记忆 + SONA 自学习' } },
      mcp: { score: 5, summary: '215 MCP 工具 + 32 插件 + WASM 沙箱 + 5 LLM provider + 自家 ruvLLM。',
        forMico: '能力最满的对手。MiCo 不必追数量，但"中央 MCP"必学。',
        codeSnippet: { file: 'ruflo/.claude-plugin/marketplace.json (推断)', code: `{
  "name": "ruflo",
  "plugins": [
    { "id": "ruflo-core",        "name": "Core",          "tools": 28, "category": "core" },
    { "id": "ruflo-swarm",       "name": "Swarm",         "tools": 18, "category": "orchestration" },
    { "id": "ruflo-rag-memory",  "name": "RAG Memory",    "tools": 24, "category": "memory" },
    { "id": "ruflo-security",    "name": "Security",      "tools": 16, "category": "security" },
    { "id": "ruflo-federation",  "name": "Federation",    "tools": 9,  "category": "orchestration" },
    { "id": "ruflo-testgen",     "name": "TestGen",       "tools": 12, "category": "code-quality" },
    // ... 32 plugins total, 215 MCP tools total
  ]
}` },
        evidence: { img: 'assets/shots/ruflo/02_plugin_marketplace.jpg', cap: 'Ruflo 32 插件市场' } },
      sandbox: { score: 4, summary: 'AIDefence（防 prompt injection）+ 零信任联邦（mTLS+ed25519）+ WASM 沙箱。',
        forMico: '零信任联邦是 2026 多场地部署标准答案。MiCo 未来要做。',
        codeSnippet: { file: 'ruflo/src/security/aidefence.ts (推断)', code: `// Ruflo 的 AIDefence：防 prompt injection + PII 检测
class AIDefence {
  INJECTION_PATTERNS = [/ignore previous instructions/i, /act as/i, /reveal system prompt/i];
  PII_PATTERNS = { email: /\\S+@\\S+/, ssn: /\\d{3}-\\d{2}-\\d{4}/, phone: /\\d{3}-\\d{4}/ };

  scan(input: string): SafetyVerdict {
    for (const p of this.INJECTION_PATTERNS) {
      if (p.test(input)) return { safe: false, reason: 'prompt_injection' };
    }
    const pii = this.detectPII(input);
    if (Object.keys(pii).length > 0) return { safe: true, pii, redact: true };
    return { safe: true };
  }
}` } },
      error: { score: 4, summary: 'Consensus (Raft/Gossip) + self-healing（节点失败自动重启）。',
        forMico: 'Self-healing 值得学（虾失败自动重启）。',
        codeSnippet: { file: 'ruflo/src/swarm/consensus.ts (推断)', code: `// Ruflo 共识 + self-healing
class SwarmConsensus {
  async decide(proposal: Proposal, topology: Topology): Promise<Decision> {
    switch (topology) {
      case 'hierarchical': return this.raft_consensus(proposal);
      case 'mesh':         return this.gossip_consensus(proposal);
      case 'ring':
      case 'star':         return Promise.resolve(proposal);  // no consensus needed
    }
  }

  // Self-healing: 节点失败 3 次后自动重启
  async heal(node: SwarmNode): Promise<void> {
    if (node.failure_count >= 3) {
      await this.kill(node);
      await this.respawn(node);
    }
  }
}` } },
      observability: { score: 5, summary: 'structured logs + traces + metrics + cost tracker + 285/285 tool 描述带"Use when"指导。',
        forMico: 'Ruflo observability 是行业最强。MiCo 需补 cost tracker。',
        codeSnippet: { file: 'ruflo/src/observability/cost.ts (推断)', code: `// Ruflo 的 cost tracker
class CostTracker {
  async record(token: TokenUsage, op: Operation) {
    await this.db.insert({
      ts: Date.now(),
      agent: op.agent,
      model: op.model,
      input_tokens: token.input,
      output_tokens: token.output,
      cost_usd: this.calculate(token, op.model),
      task_id: op.task_id,
    });
    if (this.daily_total_cost() > this.budgets[op.team]) {
      await this.alert(op.team, 'budget_exceeded');
    }
  }
}` },
        evidence: { img: 'assets/shots/ruflo/04_memory_vector.jpg', cap: 'Ruflo 观测 + SONA 统计' } },
      deployment: { score: 4, summary: '单 binary + WASM + Cloud Run + 跨机器联邦（零信任）。',
        forMico: '联邦 = MiCo 多场地部署的标准答案。',
        evidence: { img: 'assets/shots/ruflo/05_federation_trace.jpg', cap: 'Ruflo 联邦：跨机器 + 零信任' } },
    },

    // ============ 6. Raft (Slock) ============
    'raft': {
      state: { score: 3, summary: 'Channel/Thread/Task 3 层模型，task 派生自 thread。task 状态 = To Do / In Progress / Done。',
        forMico: 'Thread 即上下文是 Raft 最大创新，MiCo 可学（task 详情页内嵌 thread）。',
        evidence: { img: 'assets/shots/raft/05_tasks_kanban.jpg', cap: 'Raft 任务看板：Thread 派生' } },
      scheduling: { score: 3, summary: 'Expertise tag 路由（research/code/test）+ 用户可显式 @。简单匹配，无负载均衡。',
        forMico: '简单匹配足够。MiCo 虾的"专长标签"可走这思路。' },
      memory: { score: 4, summary: '每 agent 私有 SQLite/Vector，跨会话保留（如 @hermes-researcher 有 12k tokens / 234 conversations）。',
        forMico: '每 agent 私有记忆 = 跨会话保留的最低标准。MiCo 虾档案 + 记忆图谱可比这强。',
        codeSnippet: { file: 'raft/server/agents/memory.ts (推断)', code: `// Raft 的 per-agent 私有记忆
class AgentMemory {
  constructor(public agent: Agent, public db: SQLiteDB) {}

  async store(experience: Experience) {
    await this.db.run(
      'INSERT INTO memories (content, embedding, ts) VALUES (?, ?, ?)',
      [experience.content, await this.embed(experience.content), Date.now()]
    );
  }

  async recall(query: string, k: number = 5): Promise<Memory[]> {
    const qVec = await this.embed(query);
    return this.db.search_similar(qVec, k);
  }
}` },
        evidence: { img: 'assets/shots/raft/03_agent_profile.jpg', cap: 'Raft 私有 agent 记忆 + 12k tokens' } },
      mcp: { score: 3, summary: '外部 agent via webhook（不抢 runtime，用户自带的 Claude/Codex/Hermes 挂进 channel）。',
        forMico: '外部 agent 接入是好范式。MiCo 编制允许外部注册可学。',
        codeSnippet: { file: 'raft/server/agents/webhook.ts (推断)', code: `// Raft 外部 agent 接入（关键范式）
# 1) 注册外部 agent
raft agent register \\
  --name "my-claude-coder" \\
  --runtime claude-sonnet-4.6 \\
  --webhook https://my-server.com/claude-coder/inbox \\
  --expertise "code,refactor,test"

# 2) channel 里 @ 它，Raft 把消息推到你的 webhook
# POST https://raft.slock.ai/api/v1/channels/eng/inbox
# { "message": "@my-claude-coder refactor auth",
#   "context": { "thread_history": [...] } }` },
        evidence: { img: 'assets/shots/raft/02_thread_conversation.jpg', cap: 'Raft 外部 agent via webhook' } },
      sandbox: { score: 2, summary: '委托给 runtime（用户自带的 agent 自己管），平台层无 per-action 权限。',
        forMico: '委托是 SaaS 妥协，MiCo 自家 runtime 不必这样。' },
      error: { score: 2, summary: 'Webhook retry（自动 3 次），无 cross-thread 恢复。',
        forMico: '基础款。MiCo 跨任务恢复必超出。' },
      observability: { score: 3, summary: 'Activity log per agent，无 structured trace。',
        forMico: '基础款。',
        evidence: { img: 'assets/shots/raft/03_agent_profile.jpg', cap: 'Raft activity log per agent' } },
      deployment: { score: 1, summary: 'SaaS only（slock.ai），无自托管/无开源/无私有化。',
        forMico: '反面警示：MiCo 的"私有化 + 自托管"是 Raft 永远给不了的护城河。' },
    },

    // ============ 7. Jira / Meego ============
    'jira-meego': {
      state: { score: 5, summary: '完整 issue 工作流 (To Do / In Progress / In Review / Done / Blocked / Canceled)，industry standard。',
        forMico: 'Jira 状态机是行业范式。MiCo 必须支持同等粒度（至少 6 态）。',
        codeSnippet: { file: 'jira-meego/server/workflow/states.ts (推断)', code: `// Jira/Meego 状态机：6 态 + workflow transition
const ISSUE_STATES = ['To Do', 'In Progress', 'In Review', 'Done', 'Blocked', 'Canceled'];

const TRANSITIONS: Record<string, string[]> = {
  'To Do':        ['In Progress', 'Canceled'],
  'In Progress':  ['In Review', 'To Do', 'Blocked'],
  'In Review':    ['Done', 'In Progress'],
  'Done':         ['In Review'],
  'Blocked':      ['In Progress', 'To Do'],
  'Canceled':     [],
};` },
        evidence: { img: 'assets/shots/jira-meego/04-meego-工作台.jpeg', cap: 'Jira/Meego 6 态工作流' } },
      scheduling: { score: 4, summary: 'Assignee + Workflow + JQL 复杂过滤。Sprint 自动派单（Scrum 模式）。',
        forMico: 'JQL 复杂过滤是 20 年沉淀。MiCo 编制化（虾=员工）有类似需求。',
        codeSnippet: { file: 'jira-meego/server/jql/filter.ts (推断)', code: `// Jira Query Language (JQL)：复杂过滤
class JQLFilter {
  parse(query: string): Filter {
    // 例: project = "ENG" AND assignee = currentUser() AND status != Done
    // 解析为 AST → 索引查询
    const ast = this.parser.parse(query);
    return this.ast_to_filter(ast);
  }

  execute(filter: Filter): Issue[] {
    return this.index.scan(filter);
  }
}` },
        evidence: { img: 'assets/shots/jira-meego/05-meego-空间.jpeg', cap: 'Jira/Meego Sprint 自动派单' } },
      memory: { score: 3, summary: 'Issue 评论历史 + Activity stream，无智能记忆（HNSW/向量）。',
        forMico: '历史完整但无智能。MiCo 智能记忆（图谱）是差异点。' },
      mcp: { score: 3, summary: 'Jira REST API + 自定义 plugin（Connect/Forge），生态成熟。',
        forMico: 'REST API 成熟但缺 MCP 标准。MiCo MCP 可借鉴其生态思路。' },
      sandbox: { score: 4, summary: 'Permission scheme + Project role + Issue Security Level（3 层权限）。',
        forMico: '3 层权限是 20 年沉淀。MiCo 编制权限可学。',
        codeSnippet: { file: 'jira-meego/server/auth/permissions.ts (推断)', code: `// Jira 3 层权限
class PermissionScheme {
  // Level 1: Global permission (admin, user, anonymous)
  // Level 2: Project role (admin, developer, viewer)
  // Level 3: Issue Security Level (public, internal, restricted)
  check(user: User, action: Action, issue: Issue): boolean {
    if (!this.global_perm[user.role].has(action)) return false;
    if (!this.project_role[issue.project][user.role].has(action)) return false;
    if (!this.security_level[issue.security_level].allows(user)) return false;
    return true;
  }
}` },
        evidence: { img: 'assets/shots/jira-meego/07-meego-团队.jpeg', cap: 'Jira 3 层权限' } },
      error: { score: 3, summary: 'Sub-task 失败标记，无自动重试。',
        forMico: '基础款。' },
      observability: { score: 4, summary: 'Audit log + Activity stream + JQL 历史查询 + Dashboard (Jira 自带 + Marketplace)。',
        forMico: 'Audit log + Dashboard 是 20 年沉淀。MiCo 必须达到同等水平。',
        evidence: { img: 'assets/shots/jira-meego/06-meego-模板中心.jpeg', cap: 'Jira Activity stream + Dashboard' } },
      deployment: { score: 2, summary: 'Jira Cloud（SaaS）/ Jira Data Center（自托管，重）/ Meego（轻量自托管）。',
        forMico: '三种部署模式覆盖 80% 客户。MiCo 应学这思路。' },
    },

    // ============ 8. Linear ============
    'linear': {
      state: { score: 5, summary: 'Cycle + Status (Triage / Backlog / Todo / In Progress / In Review / Done / Canceled)，动线最快（50ms 手感）。',
        forMico: 'Linear 的 50ms 手感是 2024 标杆。MiCo 任务动线要朝这方向。',
        codeSnippet: { file: 'linear/server/issue/state.ts (推断)', code: `// Linear 状态机：7 态（比 Jira 多 Triage 和 Backlog）
const ISSUE_STATES = [
  'Triage',      // 收单（未排入）
  'Backlog',     // 已排入但未开始
  'Todo',        // 本 cycle 要做
  'In Progress', // 进行中
  'In Review',   // 验收
  'Done',        // 完成
  'Canceled',    // 取消
];` },
        evidence: { img: 'assets/shots/linear/01-home.jpeg', cap: 'Linear Cycle + Status 看板' } },
      scheduling: { score: 4, summary: 'Triage 收单 + Project 视图 + 自动 assign（基于 team）+ Cycle 自动排期。',
        forMico: 'Triage 是好的"收单"范式，MiCo 可学（虾有专门接单岗）。',
        codeSnippet: { file: 'linear/server/triage/ingest.ts (推断)', code: `// Linear 的 Triage 收单
class Triage {
  async ingest(issue: Issue) {
    issue.state = 'Triage';
    issue.cycle = this.suggestCycle(issue);  // 智能建议
    await this.db.save(issue);
    await this.notify('triage_team', issue);
  }

  async auto_assign(issue: Issue): Promise<User> {
    // 基于 team + workload + 历史匹配
    return this.matcher.bestMatch(issue);
  }
}` },
        evidence: { img: 'assets/shots/linear/02-features.jpeg', cap: 'Linear Triage 自动派单' } },
      memory: { score: 3, summary: 'Issue + Cycle 节奏 + Document，无智能记忆。',
        forMico: 'Document 是 Linear 的"上下文沉淀"思路。MiCo 文档型虾可学。' },
      mcp: { score: 4, summary: 'GraphQL API + 官方 SDK + 100+ integration，生态成熟。',
        forMico: 'GraphQL API 是现代做法。MiCo 任务 API 可走 GraphQL。',
        evidence: { img: 'assets/shots/linear/06-agents.jpeg', cap: 'Linear GraphQL API + integration' } },
      sandbox: { score: 3, summary: 'Team + Role + Member，简单 RBAC。',
        forMico: '简单 RBAC 是"不过度"的范式。MiCo 编制权限不必过度。' },
      error: { score: 3, summary: 'Triage 失败回退（自动 re-triage），无跨任务重试。',
        forMico: 'Triage 思路好。' },
      observability: { score: 4, summary: 'Activity feed + GraphQL API + Cycle 报告 + 实时 sync（50ms 推送）。',
        forMico: '实时 sync 是 2024 标杆。MiCo 实时面板要朝这方向。' },
      deployment: { score: 2, summary: 'SaaS only（linear.app），无自托管/无开源/无私有化。',
        forMico: '反面警示：MiCo 的"私有化"是 Linear 永远给不了的护城河。' },
    },

    // ============ 9. OpenWorker (吴恩达) ============
    'openworker': {
      state: { score: 2, summary: '任务=会话内步骤链（Plan→读→聚合→起草→审批），无独立状态机。隐式状态=步骤序号。',
        forMico: 'OpenWorker 状态=步骤链是个人向够用，公司级必补 4-6 态。',
        evidence: { img: 'assets/shots/openworker/02_task_execution.jpg', cap: 'OpenWorker 5 步进度链' } },
      scheduling: { score: 1, summary: '单 agent 串行，无调度。每次任务一 agent。',
        forMico: '个人向 OK，公司级必补调度。MiCo 调度器 + 虾编制 = 解决方案。',
        codeSnippet: { file: 'openworker/agent/run.py (推断)', code: `# OpenWorker 单 agent 串行（无调度）
async def run_task(task: Task):
    # 1) 选模型（基于 aisuite）
    model = pick_model(task.complexity)  # claude-sonnet-4.6 / ollama 本地
    # 2) 拉上下文（本地 SQLite）
    context = sqlite.load(task.id)
    # 3) 单 agent 跑
    result = await model.complete(prompt=task.prompt, context=context)
    # 4) 审批门禁（每次外发前）
    if task.requires_approval:
        await show_approval_modal(result)
    return result` } },
      memory: { score: 3, summary: '本地 SQLite 记忆，跨会话保留，离线可用。',
        forMico: '本地 SQLite 是个人向够用，公司级必须图谱+共享（HNSW）。' },
      mcp: { score: 4, summary: '25+ 工具连接器（Slack/GitHub/Jira/Notion/Linear/HubSpot...），基于 aisuite。',
        forMico: '25+ 集成清单是上游必接目录，MiCo 别重造。',
        codeSnippet: { file: 'openworker/connectors/registry.py (推断)', code: `# OpenWorker 的连接器注册（25+ 工具）
CONNECTORS = [
  { id: 'slack',   name: 'Slack',   auth: 'oauth', scopes: ['read','write'] },
  { id: 'github',  name: 'GitHub',  auth: 'pat',   scopes: ['repo','issues'] },
  { id: 'jira',    name: 'Jira',    auth: 'oauth', scopes: ['read','write'] },
  { id: 'notion',  name: 'Notion',  auth: 'oauth', scopes: ['read','write'] },
  { id: 'linear',  name: 'Linear',  auth: 'oauth', scopes: ['read','write'] },
  { id: 'hubspot', name: 'HubSpot', auth: 'oauth', scopes: ['crm'] },
  # ... 25+ total
]` },
        evidence: { img: 'assets/shots/openworker/04_connectors_list.jpg', cap: 'OpenWorker 25+ 工具连接器' } },
      sandbox: { score: 3, summary: '每次外发前弹窗（默认开启），无分级自主度。',
        forMico: '弹窗 UX 值得抄（搬到 MiCo 审批流），但缺分级是问题。',
        codeSnippet: { file: 'openworker/agent/approval.py (推断)', code: `# OpenWorker 的审批弹窗（每次外发前确认）
def requires_approval(op: Operation) -> bool:
    # 默认所有写/外发类操作都弹窗
    return op.kind in ['write', 'send', 'create', 'delete', 'update']

async def execute_with_approval(op: Operation):
    if requires_approval(op):
        approved = await show_modal(
            title=f'确认 {op.kind}',
            preview=op.preview(),
            options=['批准', '修改', '拒绝']
        )
        if not approved:
            raise ApprovalDenied(op.id)
    return await op.execute()` },
        evidence: { img: 'assets/shots/openworker/03_approval_prompt.jpg', cap: 'OpenWorker 每次外发前弹窗' } },
      error: { score: 2, summary: '单步重试，无系统级恢复。',
        forMico: '基础款。' },
      observability: { score: 3, summary: '任务执行面板 + 5 步链 + token 计数，基础但清晰。',
        forMico: '5 步链 UX 清晰，MiCo 任务执行页可学。' },
      deployment: { score: 4, summary: '桌面原生（Tauri 壳）+ Python 引擎 + 本地优先 + 开源。',
        forMico: '本地优先 + 开源是个人向标杆。MiCo "桌面客户端"可参考。',
        codeSnippet: { file: 'openworker/package.json (推断)', code: `{
  "name": "openworker",
  "version": "0.7.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tauri dev",
    "build": "tauri build"
  },
  "dependencies": {
    "tauri": "^2.0",        // 桌面原生壳
    "@aisuite/aisuite": "*" // 多模型路由（5 档商用 + Ollama 本地）
  }
}` },
        evidence: { img: 'assets/shots/openworker/01_desktop_home.jpg', cap: 'OpenWorker 桌面原生（Tauri）' } },
    },

    // ============ 10. Buzz (Block / Jack Dorsey) ============
    'buzz': {
      state: { score: 4, summary: '事件流即状态——一张 events 表装下消息/反应/profile/Git patch/合并决策全部签名事件，kind 整数是唯一分发开关。Schnorr 签名原样落库，独立可验。',
        forMico: 'MiCo 的任务/会话/产物是三张表，Buzz 一张事件流。MiCo 要抄的是"关键动作落签名事件"的审计层，不是把三张表并成一张。',
        codeSnippet: { file: 'crates/buzz-db/src/event.rs (推断)', code: `pub async fn insert_event(
  pool: &PgPool,
  community_id: CommunityId,
  event: &Event,
  channel_id: Option<Uuid>,
) -> Result<(StoredEvent, bool)> {
  let kind_u32 = u32::from(event.kind.as_u16());
  if kind_u32 == KIND_AUTH { return Err(DbError::AuthEventRejected); }
  if is_ephemeral(kind_u32) { return Err(DbError::EphemeralEventRejected(...)); }
  let sig_bytes = event.sig.serialize();  // Schnorr 签名原样落库
  // 单一 events 表 + ON CONFLICT DO NOTHING = 幂等
  sqlx::query(r#"INSERT INTO events (...) VALUES (...) ON CONFLICT DO NOTHING"#)
}` },
        evidence: { img: 'assets/shots/buzz/03-relay运行-health.png', cap: 'Buzz 本机 relay 实跑：单 events 表 + 签名持久化' } },
      scheduling: { score: 3, summary: '频道即访问边界——NIP-29 group id + 成员通过 (community_id, channel_id, pubkey) 三元组定位，无中心调度器；agent 接活 = 在目标频道发签名事件。',
        forMico: 'Buzz 的"频道=权限边界"思路比 MiCo 的"任务派单"更轻——但对个人/小团队是 OK 的，公司级必补调度。',
        evidence: { img: 'assets/shots/buzz/01b-landing-hero.png', cap: 'Buzz 频道即访问边界：open/private + NIP-29' } },
      memory: { score: 3, summary: 'NIP-05 profile + community-local 记忆 + 跨 community 隔离——无 HNSW/向量，靠"事件回放"重建上下文。',
        forMico: '事件回放是好思路（可审计），但实时检索慢。MiCo 的智能记忆（图谱+HNSW）可叠加在事件流之上做实时检索。' },
      mcp: { score: 3, summary: '基于 Nostr NIP 协议（25+ NIP 覆盖身份/消息/反应/支付/长文），无 MCP 标准。生态走 Nostr relay 互联。',
        forMico: 'Buzz 选 Nostr 自成一套生态，2026 MCP 是事实标准。MiCo 该跟 MCP。' },
      sandbox: { score: 4, summary: 'secp256k1 私钥 = 不可伪造身份 + buzz-audit SHA-256 哈希链审计（per-community 独立链）+ verify_chain 篡改检测。这是 Buzz 与所有 bot 式集成的根本区别。',
        forMico: '**最强可学的一块**——虾的关键动作（上岗/转正/审批/合并/打款）落成 SHA-256 链，做 verify_chain 篡改检测，是安全合规团队准入评估里最缺的。',
        codeSnippet: { file: 'crates/buzz-audit/src/chain.rs (推断)', code: `// Buzz 的可验证审计链：每条落库事件镜像成 audit_log，SHA-256 链式 hash
fn append_event(chain: &mut AuditChain, event: &StoredEvent) {
  let prev_hash = chain.last_hash.unwrap_or(Hash::zero());
  let payload = serialize(&(prev_hash, event));
  let new_hash = sha256(payload);
  chain.entries.push(AuditEntry { event_id: event.id, prev_hash, hash: new_hash });
  chain.last_hash = Some(new_hash);
}

fn verify_chain(chain: &AuditChain) -> Result<()> {
  for (i, entry) in chain.entries.iter().enumerate() {
    let prev = if i == 0 { Hash::zero() } else { chain.entries[i-1].hash };
    let expected = sha256(serialize(&(prev, &entry.event_id)));
    if expected != entry.hash { return Err(ChainBroken(i)); }
  }
  Ok(())
}` },
        evidence: { img: 'assets/shots/buzz/04-relay-metrics-实跑.png', cap: 'Buzz buzz-audit 链：每条事件 = 一次链 append' } },
      error: { score: 3, summary: '事件写入 ON CONFLICT DO NOTHING（幂等去重）+ 瞬态事件(Ephemeral) 不入库。无应用层重试。',
        forMico: '幂等写入是好的。MiCo 任务重试该学这模式——同一任务 ID 多次入队不重复执行。' },
      observability: { score: 5, summary: 'Prometheus 指标（buzz_total_users{type=human/agent}、buzz_total_git_repos、buzz_community_relay_members{role=...}）+ 全量事件可审计 + verify_chain 定期跑。',
        forMico: '指标维度本身揭示 Buzz 的世界观：人和 agent 同表只分 type。MiCo 编制化统计可学这思路——按"员工/岗位"维度看健康度。' },
      deployment: { score: 4, summary: '单 relay（Rust）+ Postgres/Redis/MinIO/对象存储，可自托管可互联（relay-to-relay 联邦）。本机已实跑。',
        forMico: '本台已证 Buzz 一台 macOS 跑得起来（colima + just setup + cargo build）。与 Multica/QM 同级，优于任何 SaaS-only。' },
    },

    // ============ 11. QoderWork (阿里 · 个人桌面助手) ============
    'qoderwork': {
      state: { score: 2, summary: '任务=会话内步骤链（自然语言 → 拆解 → 浏览器/文件操作 → 产出文档），无独立状态机。隐式状态=步骤序号。',
        forMico: '个人向 OK，公司级必补 4-6 态。QoderWork 验证了"全能助手"形态的市场——MiCo 客户端可学。',
        evidence: { img: 'assets/shots/qoderwork/01-官网-桌面智能体.png', cap: 'QoderWork 官网：桌面级通用智能体助手' } },
      scheduling: { score: 1, summary: '单 agent 按需触发，无调度。每次任务一 agent。',
        forMico: '个人向 OK，公司级必补调度。MiCo 调度器 + 虾编制是同场景的更优解。' },
      memory: { score: 3, summary: '桌面本地记忆（推断）+ 跨会话保留 + 离线可用。能力市场技能记忆可按需挂载。',
        forMico: '本地记忆是个人向够用，团队级需共享图谱。MiCo 上下文 OS 已具备，可与 QoderWork 形态互参。',
        codeSnippet: { file: 'qoderwork/desktop/src/memory.ts (推断)', code: `interface QoderWorkMemory {
  conversations: Conversation[];  // 跨会话保留
  skills: Skill[];                // 能力市场挂载
  facts: MemoryEntry[];           // 沉淀的事实
  scope: 'local';                 // 本地优先
}

// 桌面端本地 SQLite + 索引
// 团队场景需上传到 MiCo 上下文 OS 共享图谱
` } },
      mcp: { score: 4, summary: 'MCP 协议支持 + 能力市场（Skill 安装）+ 共享 QoderWake 技能库。',
        forMico: 'MCP + 能力市场是 2026 标配。QoderWork 验证了可行性，MiCo 该跟。',
        codeSnippet: { file: 'qoderwork/desktop/src/capabilities.ts (推断)', code: `interface QoderWorkCapabilities {
  taskAutomation: { trigger: 'natural_language'; scope: 'desktop' };
  browser: { automation: true; formFilling: boolean };
  localFiles: { read: true; write: true; formats: ['word', 'excel', 'ppt', 'pdf'] };
  mcp: { supported: true; servers: McpServer[] };
  skillMarket: { installable: Skill[]; sharedWith: 'qoderwake' };
}` },
        evidence: { img: 'assets/shots/qoderwork/02-能力市场.png', cap: 'QoderWork 能力市场：与 QoderWake 共享技能' } },
      sandbox: { score: 3, summary: '桌面 OS 权限（macOS/Win/Linux）+ 应用容器沙箱 + 文件白名单（user_selected/full）+ 浏览器域名白名单。',
        forMico: '沙箱+白名单是安全底线。QoderWork 的桌面权限模型 MiCo 客户端可参照，但 MiCo 该挂"岗位边界"——不是"全能助手什么都干"，是"这个岗位的虾只能碰这些文件/这些域名"。',
        codeSnippet: { file: 'qoderwork/desktop/src/permissions.ts (推断)', code: `interface DesktopPermissions {
  fileSystem: {
    scope: 'user_selected' | 'full';
    operations: ['read', 'write', 'create'];
    sandboxing: 'app_container';
  };
  browser: {
    automation: 'extension' | 'cdp';
    domains: string[];  // 域名白名单
    credentialAccess: 'none' | 'managed';
  };
  output: { formats: ['docx', 'xlsx', 'pptx', 'pdf']; location: 'user_chosen' };
}` },
        evidence: { img: 'assets/shots/qoderwork/04-下载.png', cap: 'QoderWork 桌面客户端：macOS/Win/Linux + 应用容器' } },
      error: { score: 2, summary: '单步重试，无系统级恢复。',
        forMico: '基础款。' },
      observability: { score: 3, summary: '任务执行面板 + 自然语言步骤链 + token 计数，基础但清晰。',
        forMico: '步骤链 UX 清晰，MiCo 任务执行页可学。' },
      deployment: { score: 3, summary: '桌面客户端（macOS 13+/Win 10+/Linux，推断 Tauri 壳），本地优先 + 闭源绑阿里系。',
        forMico: '本地优先是个人向标杆，但闭源+绑阿里系是企业客户硬伤。MiCo 私有化部署是机会。' },
    },

    // ============ 12. QoderWake (阿里 · 预置数字员工工作台) ============
    'qoderwake': {
      state: { score: 3, summary: '6 预置岗位（PM/RD/QA 等）+ 任务二分（对话任务 vs 自动任务）+ 自主度档（supervised/autonomous）。比 QoderWork 多了"角色"和"门禁"两维。',
        forMico: '**最强可学的一块**——"角色=岗位说明书+环境+记忆"三件套，阿里独立得出同一抽象，证明这是行业共识。MiCo 方向正确，可学它的预置角色库做冷启动。',
        codeSnippet: { file: 'qoderwake/desktop/src/models/waker.ts (推断)', code: `interface Waker {
  id: string;
  role: PredefinedRole;          // 6 预置岗位之一
  jobDescription: JobSpec;       // 岗位说明书：职责/边界/产出
  environment: 'local' | 'cloud'; // 独立权限环境
  skills: Skill[];               // 100+ 岗位技能子集
  memory: {
    facts: MemoryEntry[];
    viewable: boolean;           // 可查看
    correctable: boolean;        // 可纠正
    forgettable: boolean;        // 可遗忘
  };
  status: 'online' | 'offline';
}` },
        evidence: { img: 'assets/shots/qoderwake/07-官网-6岗位.png', cap: 'QoderWake 官网：6+ 预置岗位 + 100+ 岗位技能' } },
      scheduling: { score: 4, summary: '6 预置角色 + 群组协同（多 Waker 编组做项目）+ 协同模式 sequential/parallel/handoff。',
        forMico: '群组=跨角色项目组，与 MiCo 专家团同构。QoderWake 的协同模式（串行/并行/交接）值得抄——MiCo 专家团编排可把协同模式做成显性配置。',
        codeSnippet: { file: 'qoderwake/desktop/src/models/group.ts (推断)', code: `interface WakerGroup {
  id: string;
  project: ProjectId;
  members: Waker[];          // 多角色 Waker（PM+RD+QA...）
  tasks: Task[];
  coordination: 'sequential' | 'parallel' | 'handoff';
}

// sequential: 串行评审
// parallel:   并行调研
// handoff:    接力交付（MiCo 专家团"防七嘴八舌"同构）
` },
        evidence: { img: 'assets/shots/codewaker/02-我的群组.png', cap: 'QoderWake 群组协同：任务进行中 12/13 实跑' } },
      memory: { score: 4, summary: '角色记忆（沉淀 facts）+ 可查看/可纠正/可遗忘（官网原话）+ 跨角色隔离。社区/团队维度做记忆边界。',
        forMico: '**记忆可控是 QoderWake 最值得抄的**——"任何一条记忆可查看/纠正/遗忘"做成显性卖点，反黑盒。MiCo 上下文 OS 也强调记忆可控，可把这做成一等公民。' },
      mcp: { score: 4, summary: 'MCP 协议 + 能力市场（100+ 岗位技能）+ 共享 QoderWork 技能库——一个市场喂两个产品形态。',
        forMico: 'MCP + 能力市场跨产品共享——这是阿里"一个市场喂多产品"的策略。MiCo 技能市场可跨形态（个人/团队）复用。' },
      sandbox: { score: 3, summary: '角色=审批门禁（自动任务高风险动作要人确认）+ 本机/云端沙箱环境。**注意：QoderWake 的门禁是"角色级"而非"per-action"，颗粒度比 Linear 粗**。',
        forMico: 'QoderWake 把"自主度分档"产品化（supervised/autonomous），与 WorkBuddy 三档、MiCo P1-5 自主度是同一类设计。MiCo 该把 P1-5 做成显性配置。',
        codeSnippet: { file: 'qoderwake/desktop/src/models/task.ts (推断)', code: `interface Task {
  type: 'dialog' | 'auto';
  assignee: Waker | WakerGroup;
  approvalGate?: {
    trigger: 'high_risk' | 'always' | 'never';
    approver: UserId;
  };
  autonomy: 'supervised' | 'autonomous';
}

// dialog: 人机协作，实时交互
// auto:   后台执行，高风险挂门禁
` },
        evidence: { img: 'assets/shots/codewaker/06-创建自动任务.png', cap: 'QoderWake 自动任务：审批门禁 + 自主度档' } },
      error: { score: 3, summary: '自动任务门禁失败回退（approver 拒绝则暂停），无跨任务重试。',
        forMico: '门禁失败 = 暂停，比"自动重试"更安全。MiCo 审批流可学。' },
      observability: { score: 3, summary: '群组任务面板（任务进行中 X/Y 实跑）+ Waker 详情（角色+技能+记忆+工作记录）+ 记忆可视化。',
        forMico: '群组任务面板是好的项目视图。MiCo 项目空间可学。',
        evidence: { img: 'assets/shots/codewaker/01-management.png', cap: 'QoderWake 管理后台：数字员工列表' } },
      deployment: { score: 3, summary: '桌面客户端（macOS 13+/Win 10+/Linux，推断 Tauri/Electron），本机/云端双部署 + 闭源绑阿里系。',
        forMico: '桌面+云双部署是 2026 标配。闭源+绑阿里系是企业客户硬伤，MiCo 私有化部署是机会。' },
    },
    // ============ 13. 万有无界（阿里云 · 2026-08 内测）============
    'wanuai': {
      state: { score: 3, summary: '**行业项目模板的隐式 5 阶段状态机**——剧本创作 → 资产设计与生成 → 视频素材生成 → 后期制作 → 发行与宣传播出。**但 UI 上不显式状态机**（没 Multica 的 4 态 Issue 卡），项目空间仅显示"还没有项目"空态 + 模板入口。任务=会话+项目，状态隐含在群聊/项目空间切换里。',
        forMico: '**学"行业项目模板 + 阶段流程"抽象**——MiCo 岗位虾的"按业务线定制"是深度，但"冷启动摩擦大"。**学万有无界**：预置 5-10 个行业项目模板，每个模板有阶段流程 + 角色分配 + 队长虾，让"新部门先用模板跑起来，再按业务线定制"。**不学**：状态不显式（任务追踪的硬伤，缺 Task/Issue 实体）。',
        codeSnippet: { file: 'wanuai/project-template/short-drama.ts (推断)', code: `interface ProjectTemplate {
  name: 'AI 影视短剧创作项目';
  teamSize: '1-6 人';
  stages: [
    { name: '剧本创作', lead: '?', deliverables: ['剧本', '大纲'] },
    { name: '资产设计与生成', lead: '镜导', deliverables: ['角色', '场景'] },
    { name: '视频素材生成', lead: '?', deliverables: ['分镜视频'] },
    { name: '后期制作', lead: '?', deliverables: ['配乐', '剪辑'] },
    { name: '发行与宣传播出', lead: '?', deliverables: ['投放物料'] },
  ];
}` },
        evidence: { img: 'assets/shots/wanuai/03-project-影视短剧模板.jpg', cap: '万有无界行业项目模板：5 阶段流程预置' } },
      scheduling: { score: 4, summary: '**"队长小有仅做任务调度与派发，不承担具体生产任务"**——这是**纯 PM 角色 agent**的明确产品化。配合单聊/群聊/项目空间 3 维交互（单聊=派给单 agent；群聊=多 agent 协同；项目空间=项目级调度）。**与 QoderWake 群组协同同构**，但用"行业模板 + 队长"降低用户理解成本。',
        forMico: '**学"队长仅调度不生产"**——这是**纯 PM 角色 agent** 抽象。**MiCo 现有岗位虾**没明确区分"调度岗"vs"执行岗"。**学**：给每个虾加 `responsibility: "调度" | "生产" | "混合"` 字段，让队长虾可识别，可建"调度+生产"协同模式。**特别适合复杂项目**（5 阶段流程的 PM）。',
        codeSnippet: { file: 'wanuai/captain/dispatcher.ts (推断)', code: `interface Captain {
  role: '小有';
  responsibility: '任务调度与派发';
  production: false;  // 不承担具体生产任务
}
interface DispatchTask {
  stage: '剧本创作' | '资产设计' | '视频素材' | '后期' | '发行';
  captain: '小有';
  workers: Agent[];  // 队长派给具体执行 agent
  mode: 'sequential' | 'parallel' | 'handoff';
}` } },
      memory: { score: 3, summary: '**协作资产/个人知识库 双重 tab + 会话资产/项目资产 双重 sub-tab**——四象限资产模型。**2GB freemium 配额**是亮点。**但缺智能记忆（HNSW/向量）**——资产 = 文件存储，不是 agent 记忆。**类 Multica 资产但不是 QM 的"作用域记忆"**。',
        forMico: '**学"4 象限资产分类"**——协作 vs 个人 × 会话 vs 项目。**MiCo 上下文 OS 缺这层分类**，目前是单一上下文池。**学**：上下文拆成 4 类（协作会话/个人会话/协作项目/个人项目），用户能更精准地管理记忆边界。**2GB freemium 配额**也好抄（让个人/小团队先用）。',
        evidence: { img: 'assets/shots/wanuai/04-assets-2GB配额.jpg', cap: '万有无界资产库：协作/个人 × 会话/项目 = 4 象限 + 2GB 配额' } },
      mcp: { score: 4, summary: '**10105 技能市场 + 标准化技能元数据**——id/description/isFree/installCount/triggers/chineseTriggers/upstream/localOnly/backendAccess。**推测支持 MCP 协议**（内部命名 `wanyou-*/ppt-delivery-adapter/SOP 文档创作` 像是 skill 规范）。公开 12 技能看到真实数据源集成（小红书/抖音/微博/B站/快手/知乎/头条/百度 7 平台聚合 / 中国政府网官方数据 / 创业注册 ICP 等）。',
        forMico: '**学"10105 技能规模 + 标准化元数据"**——MiCo 技能市场目前规模小，**学**：技能暴露触发词（中文丰富同义词集）+ 安装数 + 分类 + upstream（来源）+ localOnly/backendAccess 标记。**让"该装哪个"决策更快**。**特别学触发词**——从 `UI设计/界面设计/UX/落地页/配色/字体/无障碍/组件库/HTML页面/网页生成` 看，**触发词是中文丰富同义词集，不是简单关键词**。',
        codeSnippet: { file: 'wanuai/marketplace/skill-schema.ts (推断)', code: `interface Skill {
  id: string;            // 'xiaohongshu-daily-hot' / 'wanyou-ui-ux-pro-max'
  name: string;           // 显示名
  description: string;
  isFree: true;           // 内测期全免费
  installCount: number;   // 21-164 公开
  triggers?: string[];    // 触发词
  chineseTriggers?: string[]; // 中文触发：UI设计/界面设计/UX
  categories: string[];   // 标签：[内容洞察, 热点追踪, 小红书运营]
  upstream?: string;      // github.com/nextlevelbuilder/...
  localOnly?: boolean;    // 'Local-only document authoring'
  backendAccess?: boolean;// 'no backend access'
}` },
        evidence: { img: 'assets/shots/wanuai/05-market-10105技能.jpg', cap: '万有无界技能市场：10105 技能 + 标准化元数据 + 安装数' } },
      sandbox: { score: 2, summary: '**per-action 拦截无可见 UI**——dashboard 找不到"危险动作弹窗"或"分级自主度设置"。**隐藏的安全设计**——所有写操作可能直接执行，靠"队长调度"+"积分配额"软约束。**对比 OpenWorker 每次外发前弹窗**——缺可感知的审批 UX。',
        forMico: '**学"队长调度软约束"**——用角色定位（仅调度不生产）做边界。**不学**：完全没 per-action 拦截（安全风险）。**MiCo 改进**：保留 per-action 拦截（虾的 BPM 审批 + 发版门禁），加"队长调度"做软约束补充。**让队长虾先 review 再放行，比无门禁好**。' },
      error: { score: 2, summary: '**闭源 SaaS 无可观察的错误恢复机制**——dashboard 看不到"失败归因"或"重试策略"。**"我的待办"是消息通知聚合**（不是任务失败重试中心）。**对比 Hermes L1/L2/L3 三级归因**——万有无界缺运维视角。',
        forMico: '**不学**：完全无错误归因。**MiCo 缺的是"我的待办"——审批收件箱**（按 agent / 按任务 / 按时间统一拉到一起），不是单纯消息通知。**学**：把"待我审批 / 失败任务 / 系统通知"3 类统一收件箱化。' },
      observability: { score: 4, summary: '**4 类积分看板 + 消耗表 4 维度**——订阅/订购/活动/总余额 × Agent/项目空间 × 单聊/群聊/项目空间 × 今天/近7天/近30天/近1年。**这是 token 成本对账的完整维度**。**兑换 + 充值** 双入口。**对比 Multica/QM/Paperclip**——"成本可见"做到极致。**短板**：缺 trace 面板（看不到 agent 的 tool call 链路）。',
        forMico: '**最该学的 1 块**——**4 类积分 + 消耗表 4 维度**。MiCo 现在"成本分摊"是公司内部组织行为，**没有可视化积分看板**。**学**：给每个用户/每个虾做"积分余额 + 消耗表"，按 Agent/项目 × 单聊/群聊/项目空间 × 时间。**对企业客户**："IT 部门这个月花了多少？哪个虾最贵？"秒答。**这是 MiCo 该补的"成本对账"形态——把 token 成本从黑盒变成可感知积分**。',
        codeSnippet: { file: 'wanuai/billing/credits.ts (推断)', code: `interface CreditBalance {
  total: number;
  subscription: number;   // 订阅积分（月度配额）
  purchase: number;       // 订购积分（一次性买）
  campaign: number;        // 活动积分（签到/试用）
}
interface UsageTable {
  rows: AgentUsageRow[];
  filters: {
    scope: 'Agent' | '项目空间';
    range: '今天' | '近7天' | '近30天' | '近1年';
  };
  columns: ['Agent名称', '积分↓', '单聊↓', '群聊↓', '项目空间↓'];
}` },
        evidence: { img: 'assets/shots/wanuai/07-points-4类积分+消耗表.jpg', cap: '万有无界积分看板：4 类积分 + 消耗表 4 维度' } },
      deployment: { score: 2, summary: '**闭源阿里云 SaaS**——用户不可自托管、不可二次开发、SSO 绑阿里云生态。**内测期免费**（平台所有能力均可免费体验），后续按任务规模/模型资源消耗提供不同版本或企业方案。**对比 Multica/QM/Paperclip/BBuzz**——这些都有开源/自托管形态，万有无界完全没有。',
        forMico: '**不学**：纯阿里云生态绑定、闭源。**MiCo 私有化部署 + 不绑单一厂商**对企业客户是护城河。**学**：freemium 思路（让个人/小团队先用免费版 → 升级付费），但 MiCo 走 to B 内部成本分摊路线，不是 to C 显式积分。' },
    },

  },
};
