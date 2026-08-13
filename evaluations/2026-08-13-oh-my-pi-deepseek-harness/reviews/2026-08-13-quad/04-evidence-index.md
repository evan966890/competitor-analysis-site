# 证据索引

- 机器结果：`../../eval-results.json`
- 方法、限制、安装与密钥边界：`../../README.md`
- 可重放验证：`../../verify-result.sh`；预期 2 tests / 2 pass
- 共同补丁：`../../expected-fix.patch`
- OMP session：`../../artifacts/omp-session.jsonl` 与自包含 HTML
- DSH session：`../../artifacts/dsh-session.jsonl.zstd`
- 原始产品实拍：仓库根 `assets/shots/oh-my-pi/`（2 张）与 `assets/shots/deepseek-harness/`（4 张）
- 拆解台成品页实拍：`../../site-oh-my-pi.jpg`、`../../site-deepseek-harness.jpg`
- 浏览器 DOM 验证：OMP 2/2 非空图片、DSH 4/4 非空图片均 naturalWidth > 0；额外空 `img` 是 lightbox 占位，不是资源失败。
- 站点验证：`node scripts/lint-md-wrapping.js` PASS；内联脚本 parse PASS；两条产品路由已在真实 Chrome 渲染。
- secret 检查：明文文本、OMP JSONL、DSH zstd 解压流均未匹配现有凭据文件内容。

Non-claims：

- 单个小型 JavaScript 题、每套只跑一次，不证明总体性能、长任务、并发、恢复、subagent 或生产稳定性。
- OMP 本次 MiMo 使用 replace edit，不证明 Hashline 收益。
- DSH 官方仍是 developer preview；本轮不证明升级兼容或生产可用。
- OMP 的远端 `models mify` 复检曾等待过久被中止；真实 chat 成功与 session 工件是模型链路的正证据，中止本身不是 PASS。
