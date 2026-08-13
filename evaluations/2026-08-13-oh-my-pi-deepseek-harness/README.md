# Oh My Pi × DeepSeek Harness：MiMo 同题受控评测

日期：2026-08-13

## 结论

在同一份失败基线、同一条 prompt、同一个 `xiaomi/mimo-v2.5-pro`（low reasoning）下，两套 harness 都只修改生产代码，并将测试从 0/2 修到 2/2；最终补丁一致。

本次单样本里，Oh My Pi 的已保存任务 session 用时 25.16 秒、6 个模型步骤、7 次工具调用；DeepSeek Harness 用时 39.91 秒、8 个模型步骤、9 次工具调用。DeepSeek Harness 的总处理 token 较少，并在 Web UI 中提供了更完整的 trajectory、工具时序和缓存命中率。这里只能说明这道小题上的 agent 执行观测，不能外推为总体性能排名，也不包含 CLI 冷启动成本。

## 固定条件

- 题目：修复订单汇总的“逐行取整误差”和“排序不稳定”两个缺陷。
- 约束：只改生产代码；不改测试；不加依赖；必须运行 `npm test`。
- 基线：两个隔离临时 Git 仓库，均为 0/2。
- 模型：Mify 路由的 `xiaomi/mimo-v2.5-pro`，reasoning=`low`。
- 凭据：复用本机现有密钥文件；没有把 key 复制进安装配置、日志或本仓库。

## 结果

| Harness | 安装版本 | 源码提交 | 用时 | 模型步骤 | 工具调用 | token（非缓存/缓存读/输出） | 测试 |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| Oh My Pi | 17.3.0 | `326d24b` | 25.16s | 6 | 7 | 31,829 / 154,880 / 616 | 2/2 |
| DeepSeek Harness | 0.1.0-rc.6 | `47f9438` | 39.91s | 8 | 9 | 10,532 / 112,448 / 1,002 | 2/2 |

两个 harness 生成了同一个修复：按客户累计原始 `order.amount`，不再逐行 `Math.round`；排序改为 `total` 降序，金额相同再按 `customer` 字母序。

## 证据

- `eval-results.json`：机器可读的固定条件与结果。
- `fixture/` + `prompt.md`：可重跑题目与原始失败测试（基线应为 0/2）。
- `expected-fix.patch`：两套 harness 共同生成的最终补丁。
- `verify-result.sh`：在临时副本应用共同补丁并复核 2/2，不改动基线 fixture。
- `verify-evidence.mjs`：从两份原始 session 重新计算模型步骤、工具调用、token、模型/provider 与测试结果，并检查站点路由和截图文件。
- `artifacts/omp-session.jsonl`：Oh My Pi 原始 session。
- `artifacts/omp-session.html`：Oh My Pi 自包含可视化导出。
- `artifacts/dsh-session.jsonl.zstd`：DeepSeek Harness 原始压缩 session。
- `assets/shots/oh-my-pi/`：Oh My Pi 真实 session 和 2/2 结果截图。
- `assets/shots/deepseek-harness/`：DeepSeek Harness 首页、结果、trajectory、模型配置实拍。

## 安装与密钥边界

- Oh My Pi 通过 Homebrew 安装，并使用独立 profile `competitor-eval`。
- DeepSeek Harness 全局安装 `@deepseek-ai/dsh@0.1.0-rc.6`，本地 Web UI 监听 `127.0.0.1:3080`。
- OMP 配置通过命令引用密钥文件；DSH 配置只保存环境变量名，由 `dsh-mify` 启动器在进程内读取密钥。
- 本轮发现 MimoCode JSONC 中的 `{file:...}` 是引用语法而不是实际密钥。`not_generalizable`：具体路径与 Mify 网关属于本机专用配置，不写入跨项目铁律；通用的“先解析凭据引用再验证 `/models` 与 chat”已在本报告中作为复现检查记录。

## 限制

- 只有一个小型确定性 JavaScript 任务、每套只跑一次，没有方差、长任务、并发任务或失败恢复数据。
- OMP 与 DSH 的系统提示、工具协议、统计口径不同；“模型步骤”和 token 只能帮助理解轨迹，不能直接当同口径能力分。
- OMP 结束前两次最小 smoke 都成功返回（`OMP_FINAL_OK` / `OMP_MINIMAL_OK`），证明 Mify/MiMo 链路仍可用；但在这台安装了多套 harness/skill 的机器上，冷启动分别约 2.5 分钟和 5.3 分钟，阶段日志显示主要耗在跨 harness settings/skills/rules/MCP 发现。上表 25.16 秒是已保存 agent session 的任务耗时，不包含这笔启动开销；重复冷启动性能仍需单独治理。
- Oh My Pi 的 UI 证据来自其 session HTML export；DeepSeek Harness 是正在运行的原生 Web UI。
- DeepSeek Harness 官方明确标注 developer preview，后续可能有破坏兼容性的变更。
- 四条独立 TUI 审查 lane 均已尝试但未形成 binding verdict；真实状态与 transcript 见 `reviews/2026-08-13-quad/summary.md`。这是一笔明确的 review debt，不得写成“四审通过”。
