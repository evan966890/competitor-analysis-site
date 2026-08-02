# 竞品证据修复与编排链路补全

## Owner 指令

承接 Kimi 因额度耗尽中断的竞品拆解任务：修复 Linear 登录态截图不可信、空数据不可比的问题；将 crewAI 纳入对比；把“编排”从单张卡片扩展为能看清产品设计逻辑的多页证据链；逐张验证后才进入网站。

## 本轮范围

1. 审计现有 Linear 截图，不把登录页、空态或 404 当作产品能力证据。
2. 将已验证失效的 Linear 应用内截图从当前横向栏目撤下，并记录待补条件。
3. 使用本机 crewAI checkout 中有路径可追溯的官方 Flow/Studio/Trace 材料，补齐“声明流程—运行编排—可观测性”链路。
4. 更新静态竞品网站数据和档案索引；验证每条网站引用的截图都存在，且 JavaScript 可解析。

## 非目标

- 不虚构 Linear 的登录态、真实 issue 或 agent 运行记录。
- 不修改 Linear 云端数据；浏览器控制恢复前不做第三方网站写操作。
- 不宣称已完成所有竞品、所有页面的 100% 覆盖；本轮仅建立可复用的证据准入门。
- 不更改 MiCo、Multica 或其他用户正在进行的工作区文件。

## 成功条件

- 网站不再引用已确认错误的 Linear 应用页面。
- 编排栏目新增至少三张 crewAI、来源不同且各自代表不同产品层的可验证证据。
- 竞品档案明确区分“源码/官方文档素材”“登录态实拍”“待补”。
- 引用文件检查、JavaScript 语法检查、HTTP 可访问检查全部留有证据。

## 证据来源

- `/Users/evan/All Agents/competitor-teardown/linear/shots/10-app-inbox.jpeg`
- `/Users/evan/All Agents/competitor-teardown/linear/shots/11-my-issues.jpeg`
- `/Users/evan/All Agents/competitor-teardown/linear/shots/13-agents.jpeg`
- `/Users/evan/All Agents/competitor-teardown/crewai/repo/docs/images/flows.png`
- `/Users/evan/All Agents/competitor-teardown/crewai/repo/docs/images/crewai-flow-1.png`
- `/Users/evan/All Agents/competitor-teardown/crewai/repo/docs/images/enterprise/crew-studio-interface.png`
- `/Users/evan/All Agents/competitor-teardown/crewai/repo/docs/v1.13.0/en/concepts/flows.mdx`
