// 源码解剖：从源代码逐行对照实现差异 + 评测。所有片段摘自 repo/ 实际文件（2026-08-02 快照）
window.TD_SOURCELAB = [
  {
    id: 'orchestration-runtime', name: '编排运行时 Orchestration',
    intro: '同样叫“多 Agent 编排”，底层的控制权差异极大：crewAI 把图定义成 Python 装饰器；QM 把团队约束收进 scope；Hermes 用看板状态机驱动派单。先看这三种实现，才能决定 MiCo 是该补运行原语，还是另造一个图形编辑器。',
    rubric: {
      dims: ['流程定义', '状态传递', '分支与并行', '运行可观测', '业务人员可配'],
      products: [
        { p: 'crewai', scores: [5, 4, 5, 2, 1], note: 'DSL 表达力高；运行时面和业务配置弱' },
        { p: 'qm', scores: [3, 4, 3, 4, 4], note: 'scope 是编排边界；没有通用 DAG 编辑器' },
        { p: 'hermes', scores: [3, 3, 3, 4, 3], note: '看板状态机和 dispatcher 可见，语义较弱' },
        { p: 'mico', scores: [3, 3, 2, 3, 4], note: '专家/任务配置可用；运行时协作原语和统一执行链待补' },
      ],
    },
    verdict: 'MiCo 不该复刻 crewAI 的 Python DSL，也不该先造通用 DAG 画布。更好的分工是：把可复用的运行原语（分派、等待、汇合、重试、人工验收）做成平台能力；让业务人员在任务、自动化与专家团里配置它们；同时保留可回放的事件链和证据卡。',
    implementations: [
      {
        p: 'crewai', title: 'crewAI：@start 把入口编译成 FlowDefinition',
        file: 'repo/lib/crewai/src/crewai/flow/dsl/_start.py',
        code: `def start(condition: FlowTrigger | None = None):
    def decorator(func):
        wrapper = StartMethod(func)
        _merge_flow_method_definition(
            wrapper,
            FlowMethodDefinition(
                do=_method_action(func),
                start=_to_definition_condition(condition)
                      if condition is not None else True,
            ),
        )
        return wrapper
    return decorator`,
        points: [
          '入口不是运行时点击出来的节点，而是 Python 方法的元数据；流程定义随源码、测试、部署一起版本化。',
          '条件可引用前置方法、路由标签或 AND/OR 条件；当多个 start 同时满足时文档说明可并行执行。',
          '优点是确定性与可评审性；代价是业务侧不能在某个任务现场临时改图。',
        ],
      },
      {
        p: 'crewai', title: 'crewAI：@listen 将上游输出变成显式依赖',
        file: 'repo/lib/crewai/src/crewai/flow/dsl/_listen.py',
        code: `def listen(condition: FlowTrigger):
    def decorator(func):
        wrapper = ListenMethod(func)
        _merge_flow_method_definition(
            wrapper,
            FlowMethodDefinition(
                do=_method_action(func),
                listen=_to_definition_condition(condition),
            ),
        )
        return wrapper
    return decorator`,
        points: [
          '“等待上游、再执行下游”是语言级契约，不需要一个任务看板来猜依赖。',
          'Flow state 有运行 UUID；官方文档还支持基于 SQLite 的持久化和重启恢复。',
          'MiCo 可以借用这套语义，但应把等待与恢复露出为任务级事件，而不是藏在 harness 内部。',
        ],
      },
      {
        p: 'crewai', title: 'crewAI：@router 以返回事件选择后续路径',
        file: 'repo/lib/crewai/src/crewai/flow/dsl/_router.py',
        code: `def router(condition=None, *, emit=None):
    def decorator(func):
        wrapper = RouterMethod(func)
        if emit is not None:
            router_events = _normalize_router_emit(emit)
        else:
            router_events = _get_router_return_events(func) or []
        method_definition_kwargs = {
            "do": _method_action(func),
            "router": True,
            "emit": router_events or None,
        }
        _merge_flow_method_definition(
            wrapper, FlowMethodDefinition(**method_definition_kwargs)
        )
        return wrapper
    return decorator`,
        points: [
          '路由的输出事件可以显式标注，也可从 Literal/Enum 返回类型推断；因此可视化器能先于运行知道可能分支。',
          '这也暴露 DSL 的边界：业务规则藏在函数体里，非开发者看到图也难判断真实判断条件。',
          '对 MiCo：把分支条件翻译成可读的“规则卡+审计事件”，避免让用户面对抽象 Python 图。',
        ],
      },
    ],
  },
  {
    id: 'compaction', name: '上下文压缩 Compaction',
    intro: '长会话必然撞上上下文窗口。压缩 = 把旧历史蒸馏成摘要，保住近端现场。四个开源实现 + 一个平台层缺位，恰好构成一幅完整光谱：谁剪工具输出、谁保文件操作、谁守会话血缘、谁做平台级预算。',
    rubric: {
      dims: ['触发与预算', '摘要策略', '工具输出处理', '血缘/可回溯', '平台级治理'],
      products: [
        { p: 'hermes', scores: [5, 5, 4, 5, 2], note: '血缘链最优雅；平台治理无（个人定位）' },
        { p: 'qm', scores: [5, 4, 3, 4, 5], note: '唯一平台级（scope 预算+后台压缩+安全污点标记）' },
        { p: 'openclaw', scores: [4, 5, 4, 4, 1], note: '文件操作感知（读了/改了哪些文件随摘要走）' },
        { p: 'opencode', scores: [4, 4, 5, 3, 1], note: '工具输出修剪最精细（受保护工具/尾部回合）' },
        { p: 'multica', scores: [1, 1, 1, 2, 2], note: '平台层缺位——压缩完全交给底层 CLI harness' },
      ],
    },
    verdict: '对 MiCo 的三点启示：① 压缩要保"证据"（QM 的 securityTainted、OpenClaw 的文件操作清单），验收场景丢证据=丢命；② 压缩要是"会话生命周期事件"（Hermes 的父子血缘），否则任务来源链断；③ 平台层必须有自己的预算视角（QM 的 scope 级 120k token/400 条上限），不能全交给内核——这正是 MiCo "上下文用量与 token 用量分显"（P0-3）之后该走的下一步。',
    implementations: [
      {
        p: 'qm', title: 'QM：平台级压缩（orchestrator/compaction.ts, 277 行）',
        file: 'repo/src/core/orchestrator/compaction.ts',
        code: `const MAX_CONTEXT_ENTRIES = 400;
const MAX_CONTEXT_TOKENS = 120_000;
const KEEP_RECENT_TOKEN_FRACTION = 0.6;

interface Summarized {
  text: string;
  summaryLabel: ScopeId;
  throughSeq: number;
  securityTainted: boolean;   // 外部数据污染标记随摘要走
}

// 摘要钉在头部 + 近端按预算保留
const boundRecent = (entries, maxContextTokens) => {
  const summary = entries.find((e) => contextSummaryPayload(e));
  const rest = summary ? entries.filter((e) => e !== summary) : entries;
  const kept = rest.slice(rest.length - recentEntryCountWithinBudget(rest, ...));
  return summary ? [summary, ...kept] : kept;
};`,
        points: [
          'scope 级硬预算：400 条 / 120k token 封顶，近端保留 60%——预算跟着"谁"走，不跟着会话走',
          'securityTainted 随摘要传递：被外部数据污染过的历史，压缩后仍然带着污点标记——安全信号不被蒸馏吃掉',
          'scheduleBackgroundCompaction：后台压缩与前台回合解耦，不阻塞用户回合',
          '软/硬两档分数（COMPACT_SOFT/HARD_FRACTION）：先软压，再硬压',
        ],
      },
      {
        p: 'hermes', title: 'Hermes：压缩血缘（conversation_compression.py, 2839 行）',
        file: 'repo/agent/conversation_compression.py',
        code: `class CompressionCommitFence:
    """压缩提交栅栏：提交前可取消——
    cancel_before_commit / begin_commit / finish_commit"""

def _session_was_rotated_by_compression(session_db, session_id):
    """压缩 = 会话生命周期事件：
    关闭当前 SQLite 会话行，创建以摘要为种子的子会话，
    轮换 session_id，记录父子血缘"""

def _adopt_live_compression_child(...):
    """收养压缩子会话：血缘模糊时 fail-closed，
    绝不在不确定时接到错误的会话链上"""`,
        points: [
          '压缩不是裁剪，是"生一个子会话"：旧会话完整封存，新会话从摘要出发——历史不丢，只是退场',
          '父子血缘链：多次压缩形成 lineage chain 而非反复改写的 transcript',
          'CompressionCommitFence：提交前可取消，压缩失败不留半截现场',
          '血缘模糊时 fail-closed——宁可报错也不接错链（企业场景的正确默认值）',
        ],
      },
      {
        p: 'openclaw', title: 'OpenClaw：文件操作感知压缩（agent-core/harness/compaction/compaction.ts, 1002 行）',
        file: 'repo/packages/agent-core/src/harness/compaction/compaction.ts',
        code: `export interface CompactionDetails {
  /** Files read in the compacted history. */
  readFiles: string[];
  /** Files modified in the compacted history. */
  modifiedFiles: string[];
}

// 摘要消息两种：分支摘要 + 压缩摘要
createBranchSummaryMessage(...)
createCompactionSummaryMessage(...)

// CJK 感知的长度估算（中文不按 4 字符≈1 token 粗算）
import { CHARS_PER_TOKEN_ESTIMATE } from "@openclaw/normalization-core/cjk-chars";`,
        points: [
          '压缩摘要随身携带"这段历史读了/改了哪些文件"——编码 agent 的场景里，文件清单就是最重要的证据',
          '以上一个压缩边界为起点增量压缩，不全量重来',
          'CJK 字符单独估算——中文团队的 token 预算不会系统性跑偏',
          '摘要区分"分支"与"压缩"两种语义，session tree 上可回溯',
        ],
      },
      {
        p: 'opencode', title: 'OpenCode：工具输出修剪族（session/compaction.ts）',
        file: 'repo/packages/opencode/src/session/compaction.ts',
        code: `export const PRUNE_MINIMUM = 20_000    // 低于 2 万 token 不动剪刀
export const PRUNE_PROTECT = 40_000    // 近 4 万 token 保护区
const TOOL_OUTPUT_MAX_CHARS = 2_000    // 单条工具输出最多留 2000 字符
const PRUNE_PROTECTED_TOOLS = ["skill"] // skill 工具的输出不剪
const DEFAULT_TAIL_TURNS = 2           // 尾部 2 个回合完整保留
const MIN_PRESERVE_RECENT_TOKENS = 2_000
const MAX_PRESERVE_RECENT_TOKENS = 8_000`,
        points: [
          '先剪工具输出（最大噪音源），再考虑摘要——很多系统顺序反了',
          '受保护工具名单：skill 输出不剪（知道什么不能丢比知道什么能剪更重要）',
          '尾部回合完整保留 + 近端 token 保护带（2k-8k）',
          'isOverflow/usable 独立模块：溢出判定与可用量计算可测试',
        ],
      },
      {
        p: 'multica', title: 'Multica：平台层缺位（无实现）',
        file: 'repo/server/（grep 全仓无 compression 实现）',
        code: `// server/internal 全仓搜索 compact/compress/summarize：零命中
// Multica 的会话压缩完全委托给底层 CLI harness
// （Claude Code / Codex / OpenClaw 各自的内建压缩）

// 架构后果：平台不知道"哪段历史被压掉了什么"，
// 验收与审计只能看到压缩后的现场`,
        points: [
          '委托策略本身没错——harness 更懂自己的上下文格式',
          '但平台失去"什么被丢了"的可见性：验收、归因、审计都只能在压缩后的现场工作',
          'MiCo 继承了同一缺口：上下文用量与 token 用量分显（P0-3）是补洞的第一步',
        ],
      },
    ],
  },
  {
    id: 'cron', name: '定时任务调度 Cron',
    intro: 'cron 是 agent 主动上班的起点。对照四个实现：调度器放哪（内核/平台/档案）、任务归谁（scope/个人/编制）、失败怎么办。',
    rubric: {
      dims: ['调度位置', '归属与隔离', '失败处理', '产物收口'],
      products: [
        { p: 'qm', scores: [5, 5, 3, 3], note: '平台内核调度 + scope 归属' },
        { p: 'mico', scores: [4, 4, 3, 2], note: '平台调度+模板市场；产物归集未通' },
        { p: 'hermes', scores: [4, 3, 4, 2], note: '失败归因做得好' },
        { p: 'openclaw', scores: [4, 3, 3, 2], note: '个人助理标配完整' },
      ],
    },
    verdict: 'MiCo 的差距不在调度（autopilot 已有），在"触发后收口"：cron → 建单 → 派单 → 产物归集 → 复盘卡，这条链的第二幕必须通；虾容器内 cron（~/.openclaw/cron/jobs.json，容器重建即丢）的平台级备份是先行债。',
    implementations: [
      {
        p: 'qm', title: 'QM：核心调度 + scope 归属',
        file: 'repo/src/（core scheduler + Crons 页面）',
        code: `// 每个 scope 拥有自己的 crons：
// 会计的日报、法务的合同巡检、工程的 CI 监视——
// 谁的定时任务谁负责，权限/预算/密钥跟着 scope 走`,
        points: ['cron 是 scope 资源而非全局资源', '与 keychain/预算同域：定时任务花的钱记在该 scope 账上'],
      },
      {
        p: 'mico', title: 'MiCo：autopilot 五张表 + 模板市场 + 虾档案 Cron Management',
        file: '（线上实拍 N04 / jb）',
        code: `// Automation 列表：状态="成功·已创建任务"
// ——定时任务已经在"建单"，缺的只是把产物归集回任务卡
// 虾档案新增 Cron Management：容器内 cron 开始收编`,
        points: ['HR 系空间每天 09:00 日报——需求已被生产验证', '产物归集与复盘卡未通', '虾 cron 平台级备份（R6）进行中'],
      },
      {
        p: 'hermes', title: 'Hermes：cron + 失败归因',
        file: 'repo/（hermes cron 命令族）',
        code: `// hermes cron：调度 + 执行 + 失败归因
// 失败不是"没跑成"，而是带 L1 域→L2 模式→L3 根因的归因`,
        points: ['失败归因三级——定时任务可运维的前提'],
      },
      {
        p: 'openclaw', title: 'OpenClaw：cron schema（gateway-protocol）',
        file: 'repo/packages/gateway-protocol/src/schema/cron.ts',
        code: `// cron 作为网关协议的一等 schema：
// 渠道消息可以触发 cron，cron 产出可以回投渠道——
// "在地铁上发一句话，到公司时报告已生成发到邮箱"`,
        points: ['cron 与 IM 通道同层——远程遥控的基础件'],
      },
    ],
  },
];
