# 竞品拆解台（competitor-analysis-site）

> 以可追溯截图、源码片段和产品经理注解横向比较 Agent 平台的本地静态站点。
> 169 条 Agent 产品记录（168 个唯一 id；OpenCode 有 1 条历史重复）/ 38 个完整深度评测 / 9 维 × 149 家源码对比矩阵 / 产品视觉导览 / 10 个 lane 纵切。
> 对标论文 Agent Harness Engineering（ETCLOVG 7 层），独立 git repo，可单独打磨。

## 一句话定位

把每一个竞品拆成 4 层证据：**实机截图 → 官方文档图 → 源码精读 → 产品经理注解**。每一条断言都标证据路径，可复查、可反查、可重做。

## 当前规模（v3.4 · 2026-08-13）

| 维度 | 数量 | 说明 |
|---|---|---|
| **产品记录** | 169 | `data/products.js` 运行时数组长度；168 个唯一 id，OpenCode 历史重复 1 条 |
| **完整深度评测** | 38 | 新增 Oh My Pi / DeepSeek Harness 真实安装与同模型实测 |
| **深度评测骨架** | 122 | Oh My Pi 已从论文骨架升级为完整实测 |
| **源码对比矩阵** | 9 维 × 153 cell 条目 = 1377 单元 | `data/sourceMatrix.js`（含 149 总览 + 4 paper-only） |
| **截图库** | 103M / 307 个文件 | `assets/shots/<project>/`（当前工作树实数） |
| **纵切 lane** | 10 | `data/lanes.js`（编排 / 任务 / 会话 / 编制 / 定时 / 记忆 / 技能 / 安全 / 治理 / 市场） |
| **工作流剧本** | 3 | `data/playbooks.js` |
| **横切视图** | 4 | 总览 / 对比报告 / 任务面板 / 工作流剧本 |
| **视觉导览** | 169 条产品记录 | `data/productDemos.js` + deepDive `demoShots`；不等同于 169 个唯一产品 |

## 目录结构

```
competitor-analysis-site/
├── README.md                    ← 你在这里
├── v3-plan.md                   ← 站点 v3 演进计划（含 v3-extension 扩容记录）
├── .gitignore
├── package.json
├── server.mjs                   ← 静态文件服务器
├── index.html                   ← 单页应用（169 条产品记录 / 9 维评分 / 9 维矩阵 / 169 视觉导览）
│
├── data/                        ← 数据层
│   ├── products.js              ← 169 条产品记录 + 9 维度评分
│   ├── <x>DeepDive.js           ← 38 完整 deepDive（含 demo shots / code / philosophy / timeline / conclusion）
│   ├── sourceMatrix.js          ← 9 维 × 153 cell 条目 = 1377 单元
│   ├── lanes.js                 ← 10 个纵切 lane（每 lane 多 cell × 多产品）
│   ├── playbooks.js             ← 3 个工作流剧本（多 step × 多 cell）
│   ├── productDemos.js          ← 历史产品多状态视觉导览
│   ├── oh-my-piDeepDive.js      ← OMP 17.3.0 + Mify/MiMo 真实评测
│   ├── deepseek-harnessDeepDive.js ← DSH 0.1.0-rc.6 + Mify/MiMo 真实评测
│   ├── paperclipDeepDive.js     ← Paperclip 标杆深度（5 抽象：role/heartbeat/skills/cost/board）
│   ├── wanuaiDeepDive.js        ← 万有无界深度评测
│   └── ... (共 166 个 .js)
│
├── assets/
│   └── shots/                   ← 截图库（307 个文件，103 MB）
│       ├── mico/                ← 自家产品 15 张
│       ├── multica/  linear/  paperclip/  buzz/  ... (主评测 ~32 个项目)
│       ├── wanuai/  qm/  ruflo/  vibe-kanban/  raft/  jira-meego/  openworker/
│       ├── l5-deep/             ← 5 L 层项目 GitHub README 截图 (opencode/claudecode/codex/openhands/deepagents)
│       ├── l2-mid/              ← 15 次重要项目 GitHub README 截图 (langfuse/litellm/daytona/...)
│       ├── closed-3/            ← 3 闭源/官方 (github-copilot-cli/openai-agents-sdk/openai-realtime-agents)
│       ├── oh-my-pi/            ← OMP 真实 session export 实拍
│       ├── deepseek-harness/     ← DSH 首页 / 结果 / trajectory / 模型设置实拍
│       ├── workbuddy/  workbuddy-ent/  chatgpt-desktop/  claude-tag/  ... (其它收录产品)
│       └── ... (共 36 个项目目录)
│
├── evaluations/
│   └── 2026-08-13-oh-my-pi-deepseek-harness/ ← 固定题、prompt、机器结果与原始 session 工件
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
| `#/` | 总览（169 条产品记录文字+评分） | `data/products.js` |
| `#/demos/<filter>` | 169 条产品记录视觉导览 | `data/productDemos.js` + deepDive |
| `#/report` | 对比报告（雷达图 + 矩阵） | `data/products.js`（旧路由 `#/bench` 兼容跳转） |
| `#/tasks` | 任务面板横向对比（4 维 × 4 产品） | `index.html` 内 `TASK_SHOTS` |
| `#/playbook/<id>` | 工作流剧本（3 套） | `data/playbooks.js` |
| `#/lane/<id>` | 纵切 lane（10 个） | `data/lanes.js` |
| `#/lab/<id>` | 源码解制 | `data/sourceLab.js` |
| `#/source-matrix` | 9 维 × 153 cell 条目矩阵 | `data/sourceMatrix.js` |
| `#/profile/<pid>` | 单产品画像 | `data/<pid>DeepDive.js` |
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

### 跑 9 维评分 lint 校验

```bash
node scripts/lint-md-wrapping.js
# → 扫所有 ${X} 文本引用是否走 md()/md60()/mdCut()/esc() 包装
# → 退出码 0 = 通过, 1 = 有违规
```

## 证据准入（v3.3 规则）

- ✅ **实机截图**：可看见已登录身份或本地运行实例，并包含有意义的真实/明确标注的演示数据。
- ✅ **官方文档图**：从本机 checkout 保留的原始文档材料；可说明产品结构，不宣称为本地运行实拍。
- ✅ **源码证据**：必须标明 checkout 内的精确路径；只描述可由该路径支撑的实现。
- ❌ **待补**：登录页、空态、404、失效页面或来源不明素材；不进入横向能力卡片。

闭源产品（buzz/qoderwake/qoderwork/wanuai 等）deep-dive 内标"⚠️ 登录实操待用户登录"，本台实拍限于 GitHub README 公开内容。

## Fork 提示

- `_archive/` 和 `_bmad-output/` 是本台开发期草稿（**不**进 git）。Fork 后这两个目录是空的，正常——本台独立 git repo 已拆分。
- 完整截图库（`assets/shots/`）较大（当前 103 MB · 307 个文件），clone 完即可直接用，无需额外下载。
- 没有 `node_modules`——所有 `.js` 数据文件是 vanilla JS 直接 `<script src="data/...">` 加载。
- 改完数据后浏览器可能要硬刷新（Cmd+Shift+R）才能看到新内容（无 HMR）。

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
- **v3.0** (2026-08-04)：9 维源码对比矩阵 + 9 家产品 = 72 单元 + 9 个产品画像页 + 9 个 lane + 4 个新 deepDive。
- **v3.1** (2026-08-04)：+ 3 评测（Buzz/QoderWake/QoderWork）= 12 家 × 9 维 = 96 cells。
- **v3.2** (2026-08-10)：+ 万有无界 = 13 家 × 9 维 = 104 cells。
- **v3.3** (2026-08-10)：全面对标论文 7 层 = 9 维 × 153 cell 条目 = 1377 单元 + 36 完整 deepDive + 5 L 层 + 15 次重要 + 3 闭源 + Paperclip 标杆 + screenshot-skill。
- **v3.4** (2026-08-13)：安装 Oh My Pi 17.3.0 与 DeepSeek Harness 0.1.0-rc.6；用同一 Mify/MiMo 模型跑固定题；保存原始 session、6 张真实截图与受限结论；新增/升级 2 个完整 deepDive。

详细见 [v3-plan.md](v3-plan.md)。

## License

MIT.
