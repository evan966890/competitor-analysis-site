# 审查范围

允许读取：

- `README.md`
- `index.html`
- `data/products.js`
- `data/oh-my-piDeepDive.js`
- `data/deepseek-harnessDeepDive.js`
- `evaluations/2026-08-13-oh-my-pi-deepseek-harness/**`
- `assets/shots/oh-my-pi/**`
- `assets/shots/deepseek-harness/**`

允许运行的只读/局部验证：

- `git status --short`、`git diff`、`rg`、`sed`、`node --check`
- `node scripts/lint-md-wrapping.js`
- `evaluations/2026-08-13-oh-my-pi-deepseek-harness/verify-result.sh`（只在 `mktemp` 临时副本写入并自动删除）
- `zstdcat` 读取 DSH 压缩 session

禁止：

- 修改任何源码、数据、截图、评测或配置文件
- 读取或输出 `~/.config/mimocode/credentials/mify-api-key` 的内容
- 运行 provider 请求、生产写入、提交、推送、签名、daemon 管理或流量操作
- 把 live working tree 的审查期间变化擅自算进 baseline

联网：不需要，不得依赖联网才能给结论。
