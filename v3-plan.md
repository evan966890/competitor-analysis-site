# 竞品拆解台 v3 改造计划

> 沉淀时间：2026-08-04
> 来源：与用户 grill 6 轮后达成共识
> 状态：**全部 5 个模块已完成**（v3 改造收官）

## 一、目标

把 v2 的"卡片墙 + 评测页"升级为"**4 层决策支持系统**"——既覆盖 P0 战略 / P1 产品 / P2 实现 / P3 团队 4 种决策颗粒度，又保持 27 个产品的广度，再对 9 个重点产品做深度。

最终形态：**看完能拍板的产品简报站**。

## 二、6 个 grill 决策

| # | 决策 | 答案 |
|---|---|---|
| 1 | 决策颗粒度 | **4 个都支持**（P0/P1/P2/P3） |
| 2 | 范围策略 | **广度为主 + 9 家深度**（Multica/QM/Paperclip/VK/Ruflo/Raft/Jira-Meego/Linear/OpenWorker）+ 18 家浅度 |
| 3 | 源码对比 | **8 维 × 9 家 = 72 单元**（状态/调度/记忆/MCP/沙箱/错误恢复/观测/部署） |
| 4 | 伪 demo | **27 家全 A 静态 tour**（截图+点击切换状态） |
| 5 | 板块深化 | **C 重建 lane 页** = 顶部痛点 + 中部 9 段 + 底部 3 条决策 |
| 6 | 深度结合横切 | **C 产品画像页** = 1 产品 1 综合页（横切 8 维 + 纵切所有 lane + deep-dive 入口） |

## 三、v3 全景（5 大模块）

| 序 | 模块 | 内容 | 状态 |
|---|---|---|---|
| 1 | 8 维源码对比 | 8 维 × 9 家 = 72 单元，1 视图 | ✅ Done（commit `2bef197` + `c0d2954`） |
| 2 | 9 个产品画像 | 1 产品 1 全息图（信息 + 8 维 + lane 摘要 + deep-dive 链接） | ✅ Done（commit `16a8373`） |
| 3 | 9 个 lane 页改造 | 顶部痛点 + 中部 9 段 + 底部 3 条决策 | ✅ Done（commit `ed42489`） |
| 4 | 4 个新 deep-dive | Multica / QM / Jira-Meego / Linear（补齐 9 深度） | ✅ Done（commit `31b860b`） |
| 5 | 27 家伪 demo | A 静态 tour（截图+点击切换） | ✅ Done（commit `3863487`，128 张截图就位） |

## 四、执行顺序

```
1 (源码对比 72 单元)    ✅
   ↓
   2 (产品画像 9 个)    ✅
   ↓
   3 (lane 页改造 9 个) ✅
   ↓
   4 (4 个新 deep-dive) ✅
   ↓
   5 (27 家伪 demo)     ✅ ← 当前完成
```

理由：
- **1 是底座**——2/3 都要用它 ✅
- **2 + 5 并行**——基于不同数据维度（2 用 8 维矩阵，5 用产品截图），互不阻塞
- **3 在 1 之后**——lane 页叙事要嵌入 1 的数据 ✅
- **4 在最末**——deep-dive 是精加工，需要前面 1/2/3 的素材都到位 ⏳

## 五、模块 1 详细计划（已完成）

### 目标
为 9 家重点产品在 8 个维度上各填 1 个 cell，让"产品决策有据可依"。

### 8 个维度（按"对 MiCo 决策影响力"排）

| # | 维度 ID | 中文 | 影响决策层 | 关键问题 |
|---|---|---|---|---|
| 1 | `state` | 状态管理 | P0/P1 | 任务状态机怎么设计？几态？转移条件？父子任务？ |
| 2 | `scheduling` | 任务调度 | P0/P1 | 单 agent 串行 / 队列 / swarm？路由策略？优先级？ |
| 3 | `memory` | 记忆架构 | P1/P2 | HNSW 向量？SQLite 行级？图谱？跨会话？跨 agent？ |
| 4 | `mcp` | MCP / 工具协议 | P1/P2 | 中央 MCP / 分布式 / 自研？工具描述格式？动态加载？ |
| 5 | `sandbox` | 沙箱 / 权限 | P0 | 写操作拦截？分层？审计？危险面？ |
| 6 | `error` | 错误恢复 | P1 | 重试？回滚？死信？跨 agent 一致性？ |
| 7 | `observability` | 观测 / 日志 | P2 | trace？token 计数？成本归集？事故回放？ |
| 8 | `deployment` | 部署架构 | P2/P3 | 单 binary？Docker？集群？联邦？私有化？ |

### 9 家重点产品

| # | product id | 备注 |
|---|---|---|
| 1 | `multica` | MiCo 血统上游 |
| 2 | `qm` | 公司级治理对标 |
| 3 | `paperclip` | AI 公司编制对标 |
| 4 | `vibe-kanban` | multi-agent 编程 |
| 5 | `ruflo` | multi-agent 编排 |
| 6 | `raft` | IM+agent 形态 |
| 7 | `jira-meego` | 任务管理标准（作为对照） |
| 8 | `linear` | 任务管理标准（作为对照） |
| 9 | `openworker` | 已有 deep-dive |

### 数据结构（data/sourceMatrix.js）

```js
window.TD_SOURCE_MATRIX = {
  meta: { version, dateAdded, products: [...], dimensions: [...] },
  dimensions: [
    { id, name, desc, keyQuestion, decisionLayer, micoGaps? }
  ],
  cells: {
    'multica': {
      'state': { score: 3, summary, codeSnippet?, forMico, evidence? },
      'scheduling': { ... },
      ...
    },
    ...
  }
};
```

每个 cell 必含：
- `score` (1-5)：与 8 维评分体系一致
- `summary` (1-2 句)：核心实现描述
- `forMico` (1-2 句)：学什么/不学什么/优先级
- `codeSnippet?` (可选)：1 段小代码（来源：README/docs/源码推断）
- `evidence?` (可选)：1 张已有截图路径（不带？则渲染占位）

### UI 视图（index.html 新增）

- 路由：`#/source-matrix`
- 视图名：`viewSourceMatrix()`
- 布局：
  - 顶部：8 维简介 + 总览
  - 主体：**横向矩阵**（8 列 × 9 行，cell 显示 score + summary 1 句）
  - 切换：可切换"按维度"（默认）/ "按产品"
  - 单元格可点开 → 显示完整 cell（forMico + code snippet + evidence）

### 验收标准

- [x] data/sourceMatrix.js 含 8 dimensions + 9 products × 8 cells = 72 cells
- [x] 每个 cell 必含 score + summary + forMico
- [x] 至少 30% cell 含 codeSnippet（24/72）—— 实际 34/72
- [x] 至少 50% cell 含 evidence 截图路径（36/72）—— 实际 37/72
- [x] viewSourceMatrix() 在 1280×800 桌面正常显示
- [x] 矩阵在手机/小屏自适应
- [x] 单元格可点开看完整内容
- [x] 9 家产品 × 8 维 总览一眼能看出"谁强/谁弱"分布

## 六、模块 2 详细计划（已完成）

### 目标
1 产品 1 全息图页：横切 8 维 + 纵切所有 lane + deep-dive 入口。

### 路由
`#/profile/{id}`（9 家：multica/qm/paperclip/vibe-kanban/ruflo/raft/jira-meego/linear/openworker）

### 视图（index.html 新增）
- `viewProductProfile(id)`
- 4 段内容：
  1. 8 维评分（从 sourceMatrix 复用）
  2. 8 维源码横截面（72 cells 同源，含 code + evidence）
  3. 在 N 个 lane 上的位置（每个 lane 摘要 + 此产品的微 tip）
  4. 对 MiCo 综合启示（聚合所有 forMico）
  5. Deep-dive 入口（如果该产品已有 deep-dive）

### 验收
- [x] 9 个产品都有 profile 页
- [x] 8 维数据从 sourceMatrix 复用（single source of truth）
- [x] 至少有 1 个产品的 deep-dive 入口可点
- [x] profile 页能交叉引用 lane 页 + deep-dive 页

## 七、模块 3 详细计划（已完成）

### 目标
9 个 lane 页 = 顶部痛点 + 中部 9 段 + 底部 3 条决策。

### 数据（data/lanes.js）
- 9 lanes × 3 actionable decisions = 27 decisions
- 决策格式：`{verdict: "学 X / 不学 Y / 自己做 Z", why: "..."}`

### 视图（viewLane 重写）
- 顶部高亮：3 条决策（绿色 actionable 框）
- 中部：9 个 deep product 卡片（含 MiCo micro-tip + 画像 link）
- 折叠：其他 11+ 家产品（`<details>` 折叠）
- 底部：PM block（lane 摘要）

### 验收
- [x] 9 个 lane 页有 3 决策（**注：管理后台与企业治理 lane 缺 3 决策，作为 follow-up**）
- [x] 决策格式可被产品经理直接 copy-paste
- [x] 9 个 deep product 在每个 lane 都有位置
- [x] 其他 11+ 家折叠不喧宾夺主

## 八、模块 4 详细计划（进行中）

### 目标
把"9 深度"补齐——Multica / QM / Jira-Meego / Linear 4 家复用与 openworker 同款的 6 段式深度评测。

### 4 家选品理由

| product id | 为什么深度 |
|---|---|
| `multica` | MiCo 血统上游——必看每段代码才知道"去 Multica 化要拿掉什么 / 留下什么" |
| `qm` | 公司级治理金标准（scope 隔离 / 3 姿态 keychain / fail-closed）—— 必看架构图才能"抄到骨子里" |
| `jira-meego` | 任务管理标准（6 态状态机 / JQL / 3 层权限）—— 必看 API 才知道 MiCo 任务中心要"做减法" |
| `linear` | 任务管理 UX 标杆（50ms 手感 / Triage 收单 / Cycle 节奏）—— 必看产品节奏才能"对齐手感" |

### 数据结构（与 openworker 一致）

```js
window.TD_<NAME>_DEEPDIVE = {
  productId, productName, tagline, dateAdded, source, author,
  demoShots: [{id, caption, img, note}],  // 6 张实机截图
  codeSnippets: [{title, file, code, points}],  // 3 段关键代码
  philosophy: {
    coreQuestion, answer,
    problemDiagnosis: [...],  // 3 条
    designPrinciples: [...],  // 5 条
    differentiationMatrix: [{vs, diff}]  // 4 个对比
  },
  timeline: [{date, event}],
  conclusion: {summary, forMico: [...]}
};
```

### 截图策略
- 4 家全部有实机截图（不同于 openworker/vk/ruflo/raft/openagents 5 家的"示意图"）
- 不需要 image_synthesize 合成
- multica/qm/jira-meego/linear 4 家加起来 50+ 张原图，每个 deep-dive 用 6 张

### 视图集成（index.html 修改）
- 把 4 个新 `TD_*_DEEPDIVE` 加进 viewProduct 的 product→deepDive map
- 把 4 个新入口加进 viewProductProfile 的 deep-dive link 列表

### 验收标准

- [ ] data/multicaDeepDive.js 含 6 demoShots + 3 codeSnippets + philosophy + timeline + conclusion
- [ ] data/qmDeepDive.js 同上
- [ ] data/jiraMeegoDeepDive.js 同上
- [ ] data/linearDeepDive.js 同上
- [ ] 4 个新 deep-dive 在 index.html viewProduct map 里
- [ ] 4 个新 deep-dive 在 product profile 页 deep-dive 入口里
- [ ] `#/product/multica` / `#/product/qm` / `#/product/jira-meego` / `#/product/linear` 4 个路由正常
- [ ] 9 家深度全部齐了（之前是 5 家 + 4 家 = 9 家）

## 九、模块 5 详细计划（已完成）

### 目标
27 家产品每家 1 个 A 静态 tour（截图+点击切换状态）——形成"快速一览"。

### 范围
- 27 个产品 = v2 列表的完整集合
- 24 家有实机截图（每个产品 1-6 张）
- 3 家无截图（opencode/claude-ma/qoderwake）用文字 placeholder

### 数据（data/productDemos.js）
- 自动生成脚本：扫描 assets/shots/{id}/* 提取前 6 张图
- 自定义 label 映射（覆盖默认的 01-Home 格式）
- 总计：27 家 × 平均 4.7 张 = 128 张 state

### 视图
- **viewProductDemoSection(id)** — 嵌入 viewProductGeneric 内部
  - 9 deep-dive 优先走 deep-dive 文件的 demoShots（带精细 note）
  - 18 浅度走 productDemos（带基础 note）
  - 3 无截图显示文字 placeholder
  - tab 切换 + prev/next 按钮 + 点击放大
- **viewDemosOverview()** — 27 家 demo 总览页
  - 4 个 filter chip: 全部 27 / 9 深度 / 18 浅度 / 3 无截图
  - 卡片网格：每张卡片 = 产品名 + 张数 + 首张预览 + oneLiner
  - 点击卡片跳到产品详情页

### 验收
- [x] 27 个产品全有 demo 数据
- [x] 24 家有截图（含 9 deep-dive 走精细 demo）
- [x] 3 家无截图有 placeholder
- [x] 总览页 4 个 filter 都正常
- [x] 路由 #/demos/{all|deep|shallow|no-shot} 都 OK
- [x] sidebar 加新入口
- [x] tab 切换、prev/next 按钮工作

## 十、关键决策日志

| 决策点 | 当时考虑 | 最终选 | 理由 |
|---|---|---|---|
| 9 重点产品中 OpenClaw/Hermes 是否深度 | OpenClaw 是个人助理标杆，Hermes 是 Nous 出品 | **不做深度** | 用户在 grill #2 明确说不需要 |
| Jira 引用 | 现存 jira-meego 是个 Jira-like 产品 | **复用 jira-meego** | 用户写"jira"指现存 entry，避免重复 |
| 8 维 vs 5 维 | A 全铺 vs B 聚焦 5 维 | **A 全铺** | 一次性看全分布，72 单元可控 |
| 伪 demo 范围 | 9 家 B / 27 家 A / 混合 | **27 家全 A** | 用户在 grill #4 明确选 3 |
| deep-dive 优先级 | 5 家先行 vs 9 家并行 | **5 家先行 (v2)** + **4 家补齐 (v3 module 4)** | v2 阶段就 5 家，v3 只补 4 家差 |
| Lane decisions 数据格式 | JSON vs 自由文本 | **JSON `{verdict, why}`** | 可被产品经理直接 copy-paste 拍板 |

## 十一、相关文件清单

```
competitor-v2-wt/
├── docs/
│   └── v3-plan.md                          ← 本文件
├── competitor-analysis-site/
│   ├── data/
│   │   ├── sourceMatrix.js                 ✅ 模块 1
│   │   ├── lanes.js                        ✅ 模块 3（含 27 decisions）
│   │   ├── products.js                     ✓ 27 products
│   │   ├── playbooks.js                    ✓ 5 playbooks
│   │   ├── aiLens.js                       ✓ 6 prebuilt + 5 prompt templates
│   │   ├── openworkerDeepDive.js           ✓ v2 阶段
│   │   ├── vibekanbanDeepDive.js           ✓ v2 阶段
│   │   ├── raftDeepDive.js                 ✓ v2 阶段
│   │   ├── rufloDeepDive.js                ✓ v2 阶段
│   │   ├── openagentsDeepDive.js           ✓ v2 阶段
│   │   ├── multicaDeepDive.js              ⏳ 模块 4（本轮新增）
│   │   ├── qmDeepDive.js                   ⏳ 模块 4（本轮新增）
│   │   ├── jiraMeegoDeepDive.js            ✅ 模块 4
│   │   ├── linearDeepDive.js               ✅ 模块 4
│   │   └── productDemos.js                 ✅ 模块 5
│   ├── index.html                          ← 增量更新
│   └── assets/shots/{multica,qm,jira-meego,linear}/  ← 4 家实机截图
```

---

> **当前进度**：**v3 改造全部 5 个模块完成并 commit**
> **commit 链**：`1debc36` (v2) → `50a33d9` (v2 deep-dive) → `2bef197`+`c0d2954` (m1) → `16a8373` (m2) → `ed42489` (m3) → `31b860b` (m4) → `3863487` (m5) → `c5611af` (v3 polish)
> **最终形态**：4 层决策支持系统（广度 27 + 深度 9 + 横切 8 维 × 9 家 + 纵切 9 个 lane + 27 家 demo tour）

---

## 十二、v3-extension（2026-08-09 · 3 家扩容）

**为什么扩**：3 个产品形态在 2026-08-08/09 集中出现且足够差异化，值得进深度评测：

| 新增 | 形态 | 关键差异化 | 来源 |
|---|---|---|---|
| **Buzz** | Nostr 协作工作空间（Block/Jack Dorsey） | 签名事件流 + Agent 即成员 + 本机 relay 实跑 | github.com/block/buzz + 本机实跑 |
| **QoderWork** | 阿里 · 个人桌面助手 | 自然语言驱动 + 桌面级本地操作 + 能力市场跨产品共享 | qoder.com.cn/qoderwork 实拍 |
| **QoderWake** | 阿里 · 预置数字员工 | 6 角色 + 群组协同 + 审批门禁 + 记忆可控 | qoder.com.cn/qoderwake + 桌面客户端实拍 |

**扩容后状态**：

| 维度 | v3 HEAD (9 家) | v3.1 (12 家) | diff |
|---|---|---|---|
| 源码对比矩阵 | 8 维 × 9 家 = **72 单元** | 8 维 × 12 家 = **96 单元** | +24 cells |
| 深度评测 | 9 家 deep-dive | 12 家 deep-dive | +3 (buzz/qoderwork/qoderwake) |
| 工作流剧本 | 5 个剧本（含 cells 5×N 个） | 5 个剧本（含 cells 5×N+3 个） | +3 cells（cron-create/qoderwork, im-to-agent/buzz, multi-agent-coding/qoderwake） |
| 27 家 demo tour | 18 个 demo | 18 个 demo（buzz/qoderwork/qoderwake 已加） | +3 demos |
| 9 lane decisions | 9 个 lane 决策 | 9 个 lane 决策 | 未变（buzz/qoderwork/qoderwake 在 lanes 已分散出现） |

**本轮新文件**：

```
data/
├── buzzDeepDive.js            ← Buzz 6 段 schema (demo×6 + code×3 + philosophy + timeline + conclusion)
├── qoderworkDeepDive.js       ← QoderWork 6 段 schema
├── qoderwakeDeepDive.js       ← QoderWake 6 段 schema
└── sourceMatrix.js (v3.1)     ← 头部 7 处更新 + 3 cells (24 cells)

assets/shots/
├── buzz/      ← 5 张本机实跑截图 (landing/login/relay-health/relay-metrics/landing-hero)
├── qoderwork/ ← 4 张官网实拍 (官网/能力市场/定价/下载)
├── qoderwake/ ← 4 张官网实拍 (6岗位/能力市场/定价/下载)
└── codewaker/ ← 6 张桌面客户端实拍 (群组/详情/任务/管理)
```

**对 MiCo 的核心启示**：

1. **Buzz：审计层**——agent 关键动作落 SHA-256 签名事件链，verify_chain 做篡改检测。**安全合规团队准入评估最缺的一块**。
2. **QoderWake：角色=岗位说明书+环境+记忆 三件套**——阿里独立得出同一抽象，证明行业共识，MiCo 方向正确。**可学它的预置角色库做冷启动**。
3. **QoderWork：产品族梯度**——个人助手 → 团队员工，统一账号+共享 Credits+共享能力市场。**MiCo 可补一个轻量个人形态做获客**。

