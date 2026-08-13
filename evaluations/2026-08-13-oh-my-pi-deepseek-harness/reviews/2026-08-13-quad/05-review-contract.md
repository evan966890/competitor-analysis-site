# 审查合约

每条 lane 必须 fresh PTY 会话、只读、包含字面量“对抗式审查”，并用最高可用模型/推理档。模型或推理档无法由 TUI/配置/启动参数证明时，写 `MODEL_UNVERIFIED` 并将 outcome 设为 `NEEDS_MORE_EVIDENCE`，不能自称 binding PASS。

严重性：

- P0：凭据泄露、伪造 evidence、破坏性或越权行为。
- P1：页面不可达/脚本崩溃、关键数字与原始 session 不一致、把失败/未知写成 PASS、可重放验证不成立。
- P2：明显误导、可发现性/渲染/方法边界缺陷、审计链不完整。
- P3：文案、格式、轻微可维护性建议。

输出必须是一个 JSON object，字段遵循 `06-output-schema.json`。最终连续输出 begin sentinel、JSON、end sentinel；不要在 sentinel 外重复 verdict JSON。
