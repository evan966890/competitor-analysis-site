# 对抗式审查：竞品证据修复与 CrewAI 编排链

你是独立 reviewer。请做对抗式审查，重点找真实 P0/P1：错误证据仍展示、把官方材料说成本机实拍、错误/危险的源码解释、JavaScript 语法或 XSS/渲染回归、静态资源断链、范围越界。不要泛泛赞美；没有证据不要臆造 finding。

## 审查范围

- `/Users/evan/code/Agent OS/competitor-analysis-site/index.html`
- `/Users/evan/code/Agent OS/competitor-analysis-site/data/lanes.js`
- `/Users/evan/code/Agent OS/competitor-analysis-site/data/sourceLab.js`
- `/Users/evan/code/Agent OS/competitor-analysis-site/README.md`
- `/Users/evan/All Agents/competitor-teardown/crewai/README.md`
- `/Users/evan/All Agents/competitor-teardown/README.md`

## 事实边界

- 本项目目录是父仓库的未追踪交付物，不能依靠 git diff；直接逐文件审查。
- Linear 新截图已被目检确认为包含空态和 404，因此 `lanes.js` 不应继续引用任何 `assets/shots/linear/`。
- CrewAI 是框架。其六张新增卡来自本机 checkout 内的官方材料，准确来源见 `crewai/README.md`；不得称为本机运行实拍或生产数据。三张控制流图分别只对应 OR、AND、Router，不得互相替代。
- CrewAI Flow 的代码事实只应以本机 checkout 的 `_start.py`、`_listen.py`、`_router.py` 和 `flows.mdx` 支撑。
- 网站应保持静态、离线可浏览；不得引入外网依赖或追踪。

## 已做验证（请独立检查，勿照单全收）

- `node --check data/lanes.js data/sourceLab.js data/products.js server.mjs`
- `vm.Script` 解析 `index.html` 内联脚本
- 所有 `lanes.js` 图片引用存在；CrewAI 编排卡 6 张；Linear 栏目引用为 0
- `http://localhost:7100/` 返回 HTTP 200

## 输出契约

审查结束时只输出一份 JSON object，字段必须为：

- `reviewer`、`model_observed`、`scope`
- `findings`（数组；每项有 `severity`、`file`、`evidence`、`impact`、`recommended_fix`）
- `verdict`（只能为 `PASS`、`PASS_WITH_MINOR`、`FAIL` 或 `BLOCKED`）
- `non_claims`（数组）

最终 JSON 必须被单独的 `<<<REVIEW_JSON_BEGIN>>>` 和 `<<<REVIEW_JSON_END>>>` 两行包住。不要在这两个 sentinel 外重复 JSON，也不要把本提示词的 JSON 结构回显到 sentinel 区间。
