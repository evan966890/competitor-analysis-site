# 竞品拆解台（competitor-analysis-site）

> 以可追溯截图、源码片段和产品经理注解横向比较 Agent 平台的本地静态站点。
> 168 个 Agent 平台 / 36 个完整深度评测 / 9 维 × 149 家源码对比矩阵 / 168 家视觉导览 / 10 个 lane 纵切。
> 对标论文 Agent Harness Engineering（ETCLOVG 7 层），独立 git repo，可单独打磨。

## 一句话定位

把每一个竞品拆成 4 层证据：**实机截图 → 官方文档图 → 源码精读 → 产品经理注解**。每一条断言都标证据路径，可复查、可反查、可重做。

## 当前规模（v3.3 · 2026-08-10）

| 维度 | 数量 | 说明 |
|---|---|---|
| **产品** | 168 | `data/products.js` |
| **完整深度评测** | 36 | `data/<x>DeepDive.js`（含 13 v3.1 + 5 L 层 + 15 次重要 + 3 闭源） |
| **深度评测骨架** | 122 | 对标论文 138 项目（ETCLOVG 7 层） |
| **源码对比矩阵** | 9 维 × 149 家 = 1341 单元（+1377 cells） | `data/sourceMatrix.js` |
| **截图库** | 102M / 485 张 | `assets/shots/<project>/` |
| **纵切 lane** | 10 | `data/lanes.js`（编排 / 任务 / 会话 / 编制 / 定时 / 记忆 / 技能 / 安全 / 治理 / 市场） |
| **工作流剧本** | 3 | `data/playbooks.js` |
| **横切视图** | 4 | 总览 / 对比工作台 / 任务面板 / 工作流剧本 |
| **视觉导览** | 168 家 × ~6 states | `data/productDemos.js` |

## 目录结构

```
competitor-analysis-site/
├── README.md                    ← 你在这里
├── v3-plan.md                   ← 站点 v3 演进计划（含 v3-extension 扩容记录）
├── .gitignore
├── package.json
├── server.mjs                   ← 静态文件服务器
├── index.html                   ← 单页应用（168 个产品 / 8 维评分 / 9 维矩阵 / 168 视觉导览）
│
├── data/                        ← 数据层
│   ├── products.js              ← 168 产品 + 8 维度评分
│   ├── <x>DeepDive.js           ← 36 完整 deepDive（每个 ~5-13 KB，含 6 demo shots / 3 code / 4 prob / 5 designP / 5 diff / 8 timeline / 5 forMico）
│   ├── sourceMatrix.js          ← 9 维 × 149 家 = 1341 单元
│   ├── lanes.js                 ← 10 个纵切 lane（每 lane 多 cell × 多产品）
│   ├── playbooks.js             ← 3 个工作流剧本（多 step × 多 cell）
│   ├── productDemos.js          ← 168 家 × 6 状态视觉导览
│   ├── paperclipDeepDive.js     ← Paperclip 标杆深度（5 抽象：role/heartbeat/skills/cost/board）
│   ├── wanuaiDeepDive.js        ← 万有无界深度评测
│   └── ... (共 165 个 .js)
│
├── assets/
│   └── shots/                   ← 截图库（485 张，102 MB）
│       ├── mico/                ← 自家产品 15 张
│       ├── multica/  linear/  paperclip/  buzz/  ... (主评测 ~32 个项目)
│       ├── wanuai/  qm/  ruflo/  vibe-kanban/  raft/  jira-meego/  openworker/
│       ├── l5-deep/             ← 5 L 层项目 GitHub README 截图 (opencode/claudecode/codex/openhands/deepagents)
│       ├── l2-mid/              ← 15 次重要项目 GitHub README 截图 (langfuse/litellm/daytona/...)
│       ├── closed-3/            ← 3 闭源/官方 (github-copilot-cli/openai-agents-sdk/openai-realtime-agents)
│       ├── workbuddy/  workbuddy-ent/  chatgpt-desktop/  claude-tag/  ... (其它收录产品)
│       └── ... (共 36 个项目目录)
│
└── skills/                      ← 仓库内可复用 skill
    └── screenshot-skill/        ← 完整截图闭环（kimi-webbridge + 8 步 audit + 5 原因诊断树）
        ├── SKILL.md
        ├── README.md
        ├── references/  (4 篇深度文档)
        ├── scripts/      (4 个可执行：wb / shoot / audit-images / route-walk)
        └── examples/     (1 个完整案例：#/tasks linear 4 张图修)
```

## 怎么跑

```bash
# 1. 启动静态服务器
cd competitor-analysis-site
node server.mjs --host 127.0.0.1 --port 7100

# 2. 浏览器打开
open http://127.0.0.1:7100/

# 端口冲突时
lsof -nP -iTCP:7100 -sTCP:LISTEN
# → 找到 pid 后 kill，或换 7200
```

不依赖 `npm install`，所有 `.js` 数据文件都是 vanilla JS 直接 `<script src="data/...">` 加载。

## 路由结构

| Hash | 视图 | 数据来源 |
|---|---|---|
| `#/` | 总览（168 产品文字+评分） | `data/products.js` |
| `#/bench` | 对比工作台（雷达图 + 矩阵） | `data/products.js` |
| `#/tasks` | 任务面板横向对比（4 维 × 4 产品） | `index.html` 内 `TASK_SHOTS` |
| `#/playbook/<id>` | 工作流剧本（3 套） | `data/playbooks.js` |
| `#/lane/<id>` | 纵切 lane（10 个） | `data/lanes.js` |
| `#/lab/<id>` | 源码解制 | `data/sourceLab.js` |
| `#/source-matrix` | 9 维 × 149 家矩阵 | `data/sourceMatrix.js` |
| `#/profile/<pid>` | 单产品资料卡 | `data/<pid>DeepDive.js` |
| `#/demos/<filter>` | 168 家视觉导览 | `data/productDemos.js` |
| `#/ai-lens` | AI 帮你分析 | — |
| `#/product/<pid>` | 单产品 deep-dive | `data/<pid>DeepDive.js` |

## 怎么扩展

### 加一个新产品的简评（不到 8 维 × 1 评测）

1. 在 `data/products.js` 数组里加一个 `{id, name, type, motto, oneLiner, scores:{...}}`。
2. （可选）在 `data/<id>DeepDive.js` 写完整 6 段深度评测。
3. （可选）放 5-10 张实机截图到 `assets/shots/<id>/`。
4. 在 `index.html` 的 `DEEP_DIVE_IDS_LANE` 数组加这个 id（如果写了 DeepDive）。

### 加一个新纵切 lane

1. `data/lanes.js` 加一个 `{id, name, icon, cells: [...]}`。
2. `index.html` 的 `TD_LANES.map(...)` 自动渲染 nav 按钮。

### 跑 8 维 / 9 维评分校验

```bash
node -e "
  const data = await import('./data/products.js');  // 如果支持 import
  // 或 window.TD_PRODUCTS 在浏览器里
"
```

## 证据准入（v3.3 规则）

- ✅ **实机截图**：可看见已登录身份或本地运行实例，并包含有意义的真实/明确标注的演示数据。
- ✅ **官方文档图**：从本机 checkout 保留的原始文档材料；可说明产品结构，不宣称为本地运行实拍。
- ✅ **源码证据**：必须标明 checkout 内的精确路径；只描述可由该路径支撑的实现。
- ❌ **待补**：登录页、空态、404、失效页面或来源不明素材；不进入横向能力卡片。

闭源产品（buzz/qoderwake/qoderwork/wanuai 等）deep-dive 内标"⚠️ 登录实操待用户登录"，本台实拍限于 GitHub README 公开内容。

## screenshot-skill（仓库内全局 skill）

[`skills/screenshot-skill/`](skills/screenshot-skill/SKILL.md) — 用 kimi-webbridge 给任何 web app 做完整截图验证。8 步闭环工作流（preflight → navigate → force-eager+scroll → capture → audit → repair → verify → report），区分"真 broken"和"lazy load 误判"，配 4 个可执行脚本（wb/shoot/audit-images/route-walk）。

本台 v3 多次"linear 的图都报错"等 audit 工作就是用这个 skill 跑的，案例：[examples/competitor-site-tasks-linear.md](skills/screenshot-skill/examples/competitor-site-tasks-linear.md)。

## 设计来源

- **结构原则**（非品牌资产）：参考 Linear 的克制层级、OpenCode 的代码可读性、Sentry 的高对比状态提示、Multica 的 swipe-kanban 动线。
- **理论框架**：对标 [Agent Harness Engineering 论文](https://arxiv.org/abs/2503.07636) 的 ETCLOVG 7 层（Eval-Think-Communication-Learn-Orchestrate-Verify-Govern），并扩展到 9 维（加 sandbox / deployment / lifecycle 细分）。
- **横向参考**：[LMArena](https://lmarena.ai/) 的 leaderboard 思路 + [ProductHunt](https://producthunt.com/) 的卡片密度 + 内部 `MiCo` 团队的"编排 vs 任务 vs 上下文"三维视角。

## 版本演进

- **v1** (2026-07)：单页 Linear 卡片 + 30 张截图。
- **v2** (2026-08-03)：+ OpenWorker 完整评测 + 4 个新增深度（Vibe Kanban/Raft/Ruflo/OpenAgents）。
- **v3.0** (2026-08-04)：8 维源码对比矩阵 + 9 家产品 = 72 单元 + 9 个产品画像页 + 9 个 lane + 4 个新 deepDive。
- **v3.1** (2026-08-04)：+ 3 评测（Buzz/QoderWake/QoderWork）= 12 家 × 8 维 = 96 cells。
- **v3.2** (2026-08-10)：+ 万有无界 = 13 家 × 8 维 = 104 cells。
- **v3.3** (2026-08-10)：全面对标论文 7 层 = 9 维 × 149 家 = 1341 单元 + 36 完整 deepDive + 5 L 层 + 15 次重要 + 3 闭源 + Paperclip 标杆 + screenshot-skill。

详细见 [v3-plan.md](v3-plan.md)。

## License

MIT.
