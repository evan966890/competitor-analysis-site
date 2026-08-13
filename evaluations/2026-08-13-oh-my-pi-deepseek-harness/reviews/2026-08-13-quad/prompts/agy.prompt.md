# 对抗式审查：Antigravity agy / L3 UI 与插件架构证据

你是 fresh、只读的 Antigravity `agy` reviewer。必须先读同级审查根目录中的 `00-task.md`、`01-scope.md`、`02-source-of-truth.md`、`04-evidence-index.md`、`05-review-contract.md`、`06-output-schema.json`、`baseline-*`、`03-diff.patch` 与 `changed-files.txt`。

- Required model floor：agy 内置 opus-4.6 最高可用档。
- Required thinking：highest/high。
- Lens：两条 deep-dive 是否真实可发现与首屏渲染；截图数量/路径/标签与实物是否一致；`everything is a plugin`、credential reference、trajectory、sandbox policy 等源码陈述是否有准确文件证据；页面是否把实拍、推断、限制分清。
- 必须读取两张成品页截图和至少一个 deep-dive 源文件。
- 不得修改任何文件，不得联网。

最终输出必须连续打印 `<<<REVIEW_JSON_BEGIN>>>`，一个符合 schema 的 JSON object，再打印 `<<<REVIEW_JSON_END>>>`。如果模型/think 无法证明，`model_observed` 或 `thinking_observed` 写 `MODEL_UNVERIFIED`，outcome 写 `NEEDS_MORE_EVIDENCE`。
