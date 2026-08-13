# 对抗式审查任务

- 任务：审查 Oh My Pi 与 DeepSeek Harness 的安装证据、Mify/MiMo 同题评测、竞品拆解台接入与结论边界。
- 类型：quality + product research。
- Writer：Codex 当前主会话。
- Reviewer 要判断：页面是否可执行且可发现；结果数字能否由原始 session / 机器结果 / 可重放测试支撑；是否泄露凭据；是否存在把单样本外推为通用排名、把 developer preview 写成生产就绪等误导。
- 非任务：不改 OMP/DSH 上游源码；不评价 MiMo 模型本身的总体能力；不发布、提交、推送或切流量。

所有 reviewer 必须只读。缺证据应判 `NEEDS_MORE_EVIDENCE`，不能猜成 PASS。
