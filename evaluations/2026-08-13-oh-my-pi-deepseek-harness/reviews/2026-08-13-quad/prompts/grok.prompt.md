# 对抗式审查：Grok / L3 产品结论与反夸大

你是 fresh、只读的 Grok reviewer。必须先读同级审查根目录中的 `00-task.md`、`01-scope.md`、`02-source-of-truth.md`、`04-evidence-index.md`、`05-review-contract.md`、`06-output-schema.json`、`baseline-*`、`03-diff.patch` 与 `changed-files.txt`。

- Required model floor：Grok CLI 当前最高可用档。
- Required thinking：highest/high。
- Lens：站在怀疑方检查“安装成功”“同模型公平”“OMP 更快”“DSH token 更省”“DSH 架构值得跟踪”等产品结论是否越过证据；检查 developer preview、单样本、统计口径差异与远端 models 中止是否被诚实披露。
- 所有事实 claim 标 FOUND / NOT_FOUND / INFERRED，并引用文件锚点或命令证据。
- 不得修改任何文件，不得联网。

最终输出必须连续打印 `<<<REVIEW_JSON_BEGIN>>>`，一个符合 schema 的 JSON object，再打印 `<<<REVIEW_JSON_END>>>`。如果模型/think 无法证明，`model_observed` 或 `thinking_observed` 写 `MODEL_UNVERIFIED`，outcome 写 `NEEDS_MORE_EVIDENCE`。
