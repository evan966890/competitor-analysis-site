# 竞品证据修复与编排链路补全：Closeout

日期：2026-08-02。目标是承接中断的竞品拆解，而不是以演示数据掩盖证据缺口。

## 变更

- `data/lanes.js`：撤下全部 Linear 应用内图片引用；在「编排」新增 six 张有出处的 crewAI 卡片：Flow 总览、`@start → @listen`、`or_`、`and_`、`@router`、Enterprise Studio。
- `data/sourceLab.js`：新增「编排运行时」源码专题，引用 crewAI 的 `_start.py`、`_listen.py`、`_router.py` 与 Flow 文档。
- `index.html`：证据表述改为「实机截图、源码与官方资料综合评估」，并将证据图计数更新为 211。
- `README.md` 与竞品档案 README：明确材料类型、来源和 non-claims；Linear 的空态/404 留在待补队列，不进入能力结论。

## 证据判定

| 状态 | 对象 | 判定 |
|---|---|---|
| 已撤下 | Linear `10-app-inbox.jpeg`、`11-my-issues.jpeg`、`13-agents.jpeg` | 分别为空 Linear Agent、无受让 issue、404；不能证明功能能力。 |
| 已接纳 | crewAI Flow 图 01–05 | checkout 内官方文档原图；哈希与站点副本一致。 |
| 已接纳但限缩 | crewAI Enterprise Studio | 官方企业资料，且为空态；仅作信息架构证据。 |
| 待补 | Linear 应用内证据 | 需在已登录真实工作区重拍 issue、cycle/project、view、详情与 agent 等有真实数据页面，并逐张复核。 |

## 验证

- `node --check data/lanes.js data/sourceLab.js data/products.js server.mjs`：通过。
- 在 VM 中加载数据：22 产品、10 栏目、3 源码专题、70 条栏目图片引用、6 张 crewAI 卡、0 条 Linear 图片引用、0 个断链；`assets/shots` 共 211 文件。
- `curl -6 --fail --head http://[::1]:7100/`：HTTP 200。现有服务由先前会话启动，仅监听 IPv6 回环；未停止或替换该服务。
- 浏览器实际渲染：未形成新的可靠截图。已登录 Chrome 页面可见，但浏览器控制会话超时/重置，故不把视觉验收或 Linear 实拍写为通过。

## 四条对抗式审查 lane

| Lane | 结果 | Binding | 证据 |
|---|---|---:|---|
| Codex 初审 | `BLOCKED`，P1：把 `crewai-flow-4` 错称为 Router/AND | 是；已修 | `reviews/replies/codex.transcript.txt` |
| Codex P1 复审 | `PASS`，未发现 P0/P1 | 是 | `reviews/replies/codex-p1-fix.transcript.txt` |
| Grok P1 复审 | `PASS_WITH_MINOR`；重新回显 verdict 可见，完整 JSON 受 TTY 换行截断 | 否，审计辅助 | `reviews/replies/grok-p1-fix.transcript.txt` |
| Claude P1 复审 | 5 分 28 秒仍未输出 sentinel JSON，已终止 | 否，`TIMEOUT_NO_SENTINEL` | `reviews/replies/claude-p1-timeout.transcript.txt` |
| Antigravity P1 复审 | 实际模型为 Gemini 3.6 Flash high，非预期档位；未输出最终 JSON | 否，`MODEL_UNVERIFIED` | `reviews/replies/agy-p1-model-unverified.transcript.txt` |

## Non-claims

- 未证明 Linear 真实业务数据、Linear Agent 能力、Linear 全量页面覆盖或网站的浏览器视觉验收。
- 未运行带模型密钥的真实 crewAI，也未把 Enterprise Studio 空态当作生产运行或用户数据。
- 未证明 MiCo/MultiCa 的任何新增功能；本轮仅修复竞品研究网站的证据边界。

## PRD Map Summary

本轮把「编排」从一张概念图扩成可比较的六层证据：声明入口/监听、OR、AND、事件路由、状态/代码与治理面。产品结论是 MiCo 应优先建设运行时协作原语、人工闸门和执行证据，而非重造 Python DSL 或通用 DAG 画布。下一步应在浏览器能力恢复后，按「登录态 → 有数据页面 → 单图验收 → 入站」提示词补齐 Linear。

## 可复用提示词

> 对每张候选竞品图逐张判定：它是否为已登录、有真实工作对象、非空态、非错误页且足以支撑卡片 caption？不满足任一项则撤下；官方文档图须标出来源和非实拍边界，且需以原文件哈希核验。
