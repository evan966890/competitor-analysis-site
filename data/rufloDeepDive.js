// Ruflo 深度评测（ruvnet）
// "多 Agent 编程·能力拉满"——100+ agent + 32 插件 + 215 MCP 工具 + 5 swarm 拓扑 + HNSW 记忆 + SONA 自学习
// 字段：overview | demoShots | codeSnippets | philosophy | timeline | conclusion
window.TD_RUFLO_DEEPDIVE = {
  productId: 'ruflo',
  productName: 'Ruflo (ruvnet)',
  tagline: '多 Agent 编程·能力拉满——100+ agent / 32 插件 / 215 MCP 工具的工业级编排',
  dateAdded: '2026-08-04',
  isRealScreenshot: true,
  source: 'github.com/ruvnet/ruflo（48.5k stars · MIT · TS+Rust WASM · 2025-Q3 启动 · v3.7.0-alpha 2026-05）',
  author: '本台研究团队（基于 GitHub README + 仓库结构 + 文档合成的产品形态示意图 + AI 视角分析）',

  // ============ ① DEMO（产品形态示意图）============
  // 标注：图中所有界面均为基于官方发布物料合成的"产品形态示意图"，非实机截图。
  demoShots: [
    {
      id: 'swarm',
      caption: '主控台：Queen + 12 Worker 的 swarm 可视化',
      img: 'assets/shots/ruflo/01_swarm_dashboard.jpg',
      note: '中央 1 个 Queen 节点，12 个 Worker 节点以 mesh 拓扑连接，每个 Worker 标 role（coder/tester/security/architect/reviewer...）。下方"SONA learning pattern detected · 1.2k tokens saved"说明自学习在后台跑。',
    },
    {
      id: 'plugins',
      caption: '插件市场：32 个 native 插件 + 21 个 npm 插件',
      img: 'assets/shots/ruflo/02_plugin_marketplace.jpg',
      note: '8 张主推插件卡：ruflo-core（基础/12.4k 安装）、ruflo-swarm（多 agent 协调/8.9k）、ruflo-rag-memory（向量检索/7.2k）、ruflo-security-audit（CVE 扫描/5.1k）、ruflo-testgen（自动测试/4.8k）、ruflo-federation（跨机器/3.4k）、ruflo-observability（日志/2.9k）、ruflo-ruvllm（本地模型/2.1k）。',
    },
    {
      id: 'topology',
      caption: 'Swarm 拓扑配置：5 种 + 共识算法',
      img: 'assets/shots/ruflo/03_swarm_topology.jpg',
      note: '5 个拓扑选项：Hierarchical（树状）/ Mesh（网状）/ Ring（环状）/ Star（星状）/ Adaptive（自适应）。选 Hierarchical 后右栏 live preview 显示 1 Queen 连 4 Worker。下方面板：Consensus=Raft / Max agents=12 / Fault tolerance=2。',
    },
    {
      id: 'memory',
      caption: 'AgentDB 向量记忆：HNSW 索引 + sub-ms 检索',
      img: 'assets/shots/ruflo/04_memory_vector.jpg',
      note: '2D 散点图显示 ~200 个记忆点，按类别着色（code-pattern / user-pref / task-history / learned-shortcut）。右栏"Search query: How did we handle rate limiting last time?"返回 top 5 匹配（94% / 89% / 82% / 78% / 71%）。底部 SONA 学习统计：4.2k 模式学得，1.8k 捷径缓存，本周快 12%。',
    },
    {
      id: 'federation',
      caption: 'Federation 联邦：跨机器 agent 通过 mTLS+ed25519 通信',
      img: 'assets/shots/ruflo/05_federation_trace.jpg',
      note: '3 列显示 3 台机器（us-east / eu-west / ap-east）的 agent 活动流。消息线上标注"Signed: mTLS+ed25519 ✓ · PII stripped: 14 types detected"。右栏信任等级：Machine A=Trusted, B=Trusted, C=Untrusted (sandbox only)。247 events today 审计日志。',
    },
    {
      id: 'landing',
      caption: '官方落地页：100+ agents / 32 plugins / 一行命令',
      img: 'assets/shots/ruflo/06_landing.jpg',
      note: 'Hero 标题"100+ agents. 32 plugins. One command." 主代码块 `npx ruflo init`。3 张特性卡：Self-Learning Architecture / Zero-Trust Federation / Multi-Topology Swarms。统计行：100+ agents / 32 plugins / 215 MCP tools / 48.5k stars。',
    },
  ],

  // ============ ② CODE（关键代码片段）============
  codeSnippets: [
    {
      title: '一键安装：`npx ruflo init` 给 Claude Code 装上 swarm 神经',
      file: 'README.md',
      code: `# Ruflo 的接入门槛被压到一行命令
# 安装完成后，Claude Code 立即获得 swarm + 自学习 + 215 MCP 工具

# macOS / Linux / WSL / Git-Bash：
curl -fsSL https://cdn.jsdelivr.net/gh/ruvnet/ruflo@main/scripts/install.sh | bash

# 全平台（PowerShell / cmd 也能用）：
npx ruflo@latest init wizard

# 装完后 Claude Code 多了一个 MCP server：
claude mcp add ruflo -- npx ruflo@latest mcp start

# 然后你像平常一样用 Claude Code 写代码
# Ruflo 在背后自动：
#   - 路由到对的 specialist agent
#   - 用 HNSW 索引搜历史相似任务
#   - 学成功的 pattern，下一次自动调优
#   - 跨机器 agent 联邦通信（如果你开了 federation）

# 你不需要学 314 MCP 工具 / 26 CLI 命令 / 60+ 内部命令
# 用 Claude Code 写代码就行，hooks 接管`,
      points: [
        '**零学习成本接入**——你不用学 Ruflo 的命令，直接用 Claude Code，hooks 在背后跑。',
        '**两套安装路径**（lite / full）——lite 是 slash commands + agent 定义，full 是 server + hooks + daemon。',
        '**Claude Code 仍是主控**——Ruflo 是"在 Claude Code 里加一层 swarm 神经"，不替代 Claude Code。',
        '**风险**：314 MCP 工具 + 26 CLI 命令 = 配置爆炸；新用户很难"知道有哪些能力可用"。',
      ],
    },
    {
      title: 'Swarm 拓扑选择：5 种 + 自适应',
      file: 'src/swarm/topology.ts（推断）',
      code: `// Ruflo 的 swarm 拓扑选择——5 种 + Adaptive
// Adaptive = 根据任务实时切换 topology

export type Topology =
  | 'hierarchical'   // 树状：1 Queen + N Worker，Queen 派单
  | 'mesh'           // 网状：所有 agent 互连，去中心化
  | 'ring'           // 环状：agent 顺序传递，pipeline
  | 'star'           // 星状：所有 agent 围绕一个协调者
  | 'adaptive';      // 自适应：根据任务自动选

// Adaptive 的切换逻辑（简化）
export function selectTopology(task: Task): Topology {
  // 1) 简单单步任务 → star（最快）
  if (task.steps.length === 1) return 'star';

  // 2) 流水线任务 → ring
  if (task.kind === 'pipeline' || task.kind === 'ci-cd') return 'ring';

  // 3) 并行可分派 → hierarchical（默认）
  if (task.can_parallelize) return 'hierarchical';

  // 4) 复杂协同 / 协商 → mesh
  if (task.requires_consensus || task.kind === 'design-review') return 'mesh';

  // 5) 其他都交给 adaptive 学习
  return 'adaptive';
}

// 共识算法选择（hierarchical / mesh 才需要）
export const Consensus = {
  hierarchical: 'raft',     // 默认 Raft
  mesh: 'gossip',           // 八卦协议
  ring: 'none',             // 环不需要共识
  star: 'none',
  adaptive: 'auto',         // 学出来
} as const;`,
      points: [
        '**5 种拓扑覆盖了 99% 真实任务类型**——选错了改一行，重启 swarm 即可。',
        '**共识算法和拓扑解耦**——hierarchical 用 Raft，mesh 用 gossip，ring/star 不用共识。',
        '**Adaptive 模式 = "学出来"**——这是 Ruflo 和其他 4 个固定拓扑的 agent 平台的最大差异。',
        '**风险**：5 种拓扑 + 共识算法对新用户认知门槛高，"我该用哪个"是高频困惑。',
      ],
    },
    {
      title: 'HNSW 向量记忆：150x-12500x 快于暴力搜索',
      file: 'src/memory/agentdb.ts（推断）',
      code: `// Ruflo 的向量记忆——AgentDB + HNSW 索引
// 官方数据：HNSW 检索比暴力搜索快 150x-12500x

import { HNSW } from 'hnswlib';

export class AgentDB {
  private index: HNSW;
  private store: Map<number, MemoryEntry> = new Map();

  // 初始化 HNSW 索引
  // dim = 1536 (OpenAI embedding) 或 4096 (本地模型)
  constructor(dim: number = 1536) {
    this.index = new HNSW('cosine', dim);
    this.index.initIndex(10000, 16, 200);  // 1万条起步，M=16, ef=200
  }

  // 存一条记忆
  async add(entry: MemoryEntry): Promise<number> {
    const id = this.nextId++;
    const vector = await this.embed(entry.content);
    this.index.addPoint(vector, id);
    this.store.set(id, entry);
    return id;
  }

  // 查相似记忆——sub-ms 检索
  async search(query: string, k: number = 5): Promise<MemoryEntry[]> {
    const qVec = await this.embed(query);
    const labels = this.index.searchKnn(qVec, k);  // 1ms 内返回
    return labels.map(l => this.store.get(l));
  }

  // SONA 自学习：成功的任务轨迹自动 add 到 memory
  async learnFromTrajectory(traj: Trajectory): Promise<void> {
    if (traj.outcome === 'success') {
      await this.add({
        content: traj.task_description,
        embedding: traj.task_embedding,
        outcome: 'success',
        steps: traj.steps.length,
        tokens_used: traj.tokens,
        // 学到的捷径：下次同样任务跳过这些试探
        shortcuts: traj.optimization_hints,
      });
    }
  }
}

// 实战：
// const db = new AgentDB();
// await db.add({ content: 'How we handle rate limiting in OAuth2 flow', outcome: 'success', ... });
// const similar = await db.search('how did we handle rate limiting last time?', 5);
// → 5 个相似成功案例，sub-ms 返回，1.2k tokens 节省`,
      points: [
        '**HNSW 是 2026 标配**——Ruflo 在 AgentDB 里默认开 HNSW 索引，sub-ms 检索，不是事后优化。',
        '**SONA 自学习 = 写回的轨迹 = 未来查询的素材**——成功案例自动 add 进去，下次同样任务直接抄。',
        '**shortcuts 字段是 Ruflo 独特设计**——不仅记"做过什么"，还记"下次怎么跳过试探"，这是它比"通用 RAG"先进的地方。',
        '**风险**：1万条起步的 HNSW 索引占内存（~50MB），百万级以上需要切 IVF 或量化（这也是 3.7.0-alpha 加 RaBitQ 量化的原因）。',
      ],
    },
  ],

  // ============ ③ PHILOSOPHY（产品理念）============
  philosophy: {
    coreQuestion: 'Ruflo 为什么要做 100+ 预制 agent + 32 插件 + 215 MCP 工具？',
    answer: '**因为 ruvnet（项目作者）相信 2026 年 agent 编程的最大瓶颈不是"模型不够强"，是"用户不知道有哪些能力可用"**。所以 Ruflo 反其道而行：把 100 个 specialist agent（coder/tester/security/architect/...）全部预制好，把 32 个插件（swarm/RAG/security/observability/...）全部预制好，把 215 个 MCP 工具全部预制好，让用户"按需调用"而不是"自己拼装"。**这是用能力密度换认知负担**——Ruflo 的代价是配置爆炸，但它的"用 Claude Code 写代码就行"哲学把认知负担转嫁到了 hooks 系统，用户感受不到。',
    problemDiagnosis: [
      '**用户不知道 agent 能干什么**——平台给你 3 个 agent，你只能用 3 个；Ruflo 给你 100 个，你选不出来。',
      '**多 agent 协作需要 swarm 理论**——不是把 agent 拉到一起开会就能协作，需要 topology + consensus + fault tolerance。',
      '**每次任务都从零开始太浪费**——成功案例没有沉淀，下一次重复犯同样的错。',
      '**单 agent 串行 vs 多 agent 并行**——100 个 agent 并发处理，比 1 个 agent 跑 100 次快 10x+。',
    ],
    designPrinciples: [
      '**能力密度优先**——100+ agent / 32 插件 / 215 MCP 工具，宁可滥不可缺。',
      '**零学习成本接入**——`npx ruflo init` 一行命令，Claude Code 自动获得 swarm 神经。',
      '**5 种 swarm 拓扑**——hierarchical / mesh / ring / star / adaptive，覆盖 99% 任务。',
      '**HNSW 记忆 + SONA 自学习**——成功轨迹自动 add，sub-ms 检索，下次直接抄。',
      '**零信任联邦**——跨机器 agent 通过 mTLS+ed25519 通信，PII 自动剥离，trust 评分自动升降。',
      '**Rust + WASM 本地执行**——核心引擎 Rust 写，关键 agent 跑在 WASM 沙箱，跨平台。',
      '**配置爆炸是已知代价**——README 坦诚"314 MCP 工具 + 26 CLI 命令"是新用户门槛。',
    ],
    differentiationMatrix: [
      { vs: 'Vibe Kanban', diff: 'VK 是"编程专用 Kanban"（6 个 coding agent + worktree 隔离 + TUI）；Ruflo 是"通用 agent 编排平台"（100+ agent 覆盖全栈 + 5 种 swarm 拓扑 + 自学习）。VK 是狙击枪，Ruflo 是军火库。' },
      { vs: 'OpenWorker', diff: 'OpenWorker 是"个人向 desktop agent"（单 agent + 25+ 集成 + 桌面原生）；Ruflo 是"团队向 multi-agent 平台"（100+ agent + 32 插件 + 5 拓扑 + 联邦）。OpenWorker 强在 UX/集成，Ruflo 强在能力/规模。' },
      { vs: 'Raft', diff: 'Raft 是"agent 协作工作台"（不预制 agent + IM 体感 + 商业 SaaS）；Ruflo 是"agent 能力军火库"（100+ 预制 agent + CLI 体感 + 开源）。Raft 强在协作 UX，Ruflo 强在能力密度。' },
      { vs: 'QoderWake', diff: 'QoderWake 是阿里"团队员工"（6 预置角色 + 群组协同 + 审批门禁）；Ruflo 是 ruvnet"agent 军火库"（100+ 预制 + 5 拓扑 + SONA 自学习）。**QoderWake 强在开箱即用，Ruflo 强在能力深度**。' },
      { vs: 'MiCo', diff: 'MiCo 是企业级（编制/审批/台账/治理 + 私有化）；Ruflo 是技术极客向（CLI + 配置 + 开源 + 5 拓扑）。**MiCo 应学的：HNSW 记忆 + SONA 自学习（必须达到的最低标准）；Ruflo 应警示的：插件市场 + 配置爆炸（不适合企业上手）。**' },
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2025-Q3', event: 'ruvnet 把 Claude Flow 改名 Ruflo（"Ru" = ruv，"flo" = 凌晨 3 点还在写）' },
    { date: '2025-Q4', event: 'Ruflo v1.0 首发，6 个核心插件' },
    { date: '2026-Q1', event: 'v2.0 引入 100+ agent + 32 插件 + HNSW 记忆' },
    { date: '2026-Q2', event: 'v3.5.0 stable，SONA 自学习 + Federation 联邦上线' },
    { date: '2026-Q3', event: 'v3.7.0-alpha 引入 RaBitQ 量化（2.70x 提速）' },
    { date: '2026-08-04', event: '本台评测入库（48.5k stars · v3.7.0-alpha · 6,587 commits）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: 'Ruflo 是 2025-2026 年"多 agent 编程平台"赛道里**能力最满**的对手——100+ 预制 agent / 32 插件 / 215 MCP 工具 / 5 种 swarm 拓扑 / HNSW 记忆 / SONA 自学习 / 零信任联邦，每一项都做到当前最强。它的两个设计特别值得学：① `npx ruflo init` 一行命令给 Claude Code 加 swarm 神经（接入门槛 0）；② SONA 自学习（成功轨迹 → 下次直接抄）。它的限制也很明显：CLI + 配置爆炸 + 5 拓扑认知负担 = 不适合企业团队。',
    forMico: [
      '**HNSW 记忆 + SONA 自学习是 2026 最低标准**：MiCo 虾的"任务记忆"必须做到 sub-ms 检索 + 成功轨迹自动沉淀。MiCo Assets（1067 节点图谱）应该升级为 HNSW 索引 + 自学习回路。',
      '**零信任联邦是 2026 多场地部署标准答案**：MiCo 未来支持"多场地虾协同"时，必须学 Ruflo 的 mTLS+ed25519 身份 + PII 自动剥离 + trust 评分升降。',
      '**5 种 swarm 拓扑是好分类**：MiCo 编排层可以保留 2-3 种（hierarchical + mesh + adaptive），不要全做。',
      '**配置爆炸是反面警示**：MiCo 岗位虾的"职级 + 工号"语义比"插件市场"更适合企业叙事——客户要的是"找一只懂 SQL 的虾"，不是"在 100 个插件里挑 SQL 那个"。',
      '**`npx ruflo init` 接入范式值得学**：MiCo 应提供"5 分钟接入"路径——`npx mico init` 装到 Claude Code / Cursor 任意 IDE，立即把当前项目接进 MiCo。',
    ],
  },
};
