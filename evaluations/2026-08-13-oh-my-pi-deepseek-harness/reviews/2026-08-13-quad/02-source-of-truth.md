# 真相源与 baseline

动态 baseline 文件：

- `baseline-head.txt`
- `baseline-status.txt`
- `baseline-stat.txt`
- `03-diff.patch`
- `changed-files.txt`
- `concurrent-agents.txt`

任务真相源：

- 用户要求：安装 Oh My Pi 与 DeepSeek Harness，复用 Mify/MiMo key，在竞品拆解台做评测。
- 安装与评测结论：`../../README.md`、`../../eval-results.json`
- 固定题与原始基线：`../../prompt.md`、`../../fixture/`
- 共同最终补丁与重放：`../../expected-fix.patch`、`../../verify-result.sh`
- OMP 原始会话：`../../artifacts/omp-session.jsonl`、`../../artifacts/omp-session.html`
- DSH 原始会话：`../../artifacts/dsh-session.jsonl.zstd`
- 产品页数据：仓库根的 `data/oh-my-piDeepDive.js` 与 `data/deepseek-harnessDeepDive.js`

审查 baseline 是 `baseline-head.txt` 所列 HEAD 加 `baseline-status.txt` 所列 scoped working-tree 变更。本轮未提交；不要把审查期间其他进程产生的变更归因给 writer。
