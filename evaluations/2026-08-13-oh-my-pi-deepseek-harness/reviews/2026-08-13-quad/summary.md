# 四条对抗式审查归约

最终状态：`NEEDS_MORE_EVIDENCE`。四条 lane 都真实尝试并落盘，但没有一条形成 parser-valid binding verdict；因此本报告不声称“四审通过”。

| Lane | 真实状态 | 关键证据 |
| --- | --- | --- |
| Claude Code | `SKIPPED_TIMEOUT` | `replies/claude.metadata.json`、transcript、heartbeat |
| Codex | 两次 interactive prompt 未可靠提交；一次 headless advisory 又遇到 strict schema + 证书/网络失败 | `replies/codex-attempt*.metadata.json`、`replies/codex-advisory.transcript.txt` |
| Grok | `STARTUP_TIMEOUT`，账户设置/bootstrap 阶段超时 | `replies/grok.metadata.json`、transcript |
| Antigravity `agy` | `CURRENT_TTY_AUTH_MISSING`，停在 OAuth 选择 | `replies/agy.metadata.json`、transcript |

没有 reviewer 在基础设施失败前给出 P0/P1。不能由此推导 PASS。

本地主证据已另外机械复核：`verify-result.sh` 重放共同补丁后 2/2；`verify-evidence.mjs` 从原始 session 重算 OMP/DSH 步骤、工具、token、模型/provider 与测试结果，并检查站点路由和截图；secret 内容匹配检查无命中。机械复核不替代独立 reviewer。

本轮已自行发现并修复：错误转述题目字段、deep-dive 动态脚本竞态、两条新产品路由漏接 deep-dive 映射、截图数量硬编码、`169 家` 的唯一产品误导，以及 Codex strict output schema 约束缺失。

初次四 lane 尝试后的本地收口又补做了真实浏览器路由验收与 OMP 重复 smoke：两条产品页分别显示 2/4 张实机图且无 broken image；OMP 两次均返回预期文本，但冷启动约 2.5–5.3 分钟，已作为产品限制写回评测报告。上述是本地主证据，不改变独立审查仍为 `NEEDS_MORE_EVIDENCE` 的状态。
