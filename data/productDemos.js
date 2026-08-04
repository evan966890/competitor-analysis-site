// 产品 demo 总览（v3 module 5）
// 自动生成 + 手动精修的 27 家产品 demo 数据
// 9 家 deep-dive 优先走 deep-dive 文件的 demoShots（更精细），这里只作为兜底
// 数据结构：{ productId, productName, isSchematic, states: [{id, label, img, note}] }
window.TD_PRODUCT_DEMOS = {
  meta: { version: 1, dateAdded: "2026-08-04", totalProducts: 27 },
  demos: {
    'mico': {
      productId: 'mico',
      productName: 'mico',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "列表", img: "assets/shots/mico/01-列表.png", note: "点击放大查看原图。mico 产品的\"列表\"界面。" },
        { id: "s2", label: "档案", img: "assets/shots/mico/03-档案.png", note: "点击放大查看原图。mico 产品的\"档案\"界面。" },
        { id: "s3", label: "技能管理", img: "assets/shots/mico/06-技能管理.png", note: "点击放大查看原图。mico 产品的\"技能管理\"界面。" },
        { id: "s4", label: "容器规格", img: "assets/shots/mico/09-容器规格.png", note: "点击放大查看原图。mico 产品的\"容器规格\"界面。" },
        { id: "s5", label: "N01 任务页 新版", img: "assets/shots/mico/N01-任务页-新版.jpeg", note: "点击放大查看原图。mico 产品的\"N01 任务页 新版\"界面。" },
        { id: "s6", label: "N02 Channels频道", img: "assets/shots/mico/N02-Channels频道.jpeg", note: "点击放大查看原图。mico 产品的\"N02 Channels频道\"界面。" }
      ]
    },
    'multica': {
      productId: 'multica',
      productName: 'multica',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（完整）", img: "assets/shots/multica/01-home-full.png", note: "点击放大查看原图。" },
        { id: "s2", label: "首页", img: "assets/shots/multica/01-home.png", note: "点击放大查看原图。" },
        { id: "s3", label: "用例", img: "assets/shots/multica/02-usecases.png", note: "点击放大查看原图。" },
        { id: "s4", label: "文档", img: "assets/shots/multica/03-docs.png", note: "点击放大查看原图。" },
        { id: "s5", label: "更新日志", img: "assets/shots/multica/04-changelog.png", note: "点击放大查看原图。" },
        { id: "s6", label: "登录", img: "assets/shots/multica/05-login.png", note: "点击放大查看原图。" }
      ]
    },
    'qm': {
      productId: 'qm',
      productName: 'qm',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "登录", img: "assets/shots/qm/01-signin.png", note: "点击放大查看原图。" },
        { id: "s2", label: "App 首页", img: "assets/shots/qm/02-app-home.png", note: "点击放大查看原图。" },
        { id: "s3", label: "首页", img: "assets/shots/qm/02-home.png", note: "点击放大查看原图。" },
        { id: "s4", label: "Projects", img: "assets/shots/qm/03-projects.png", note: "点击放大查看原图。" },
        { id: "s5", label: "Chats", img: "assets/shots/qm/04-chats.png", note: "点击放大查看原图。" },
        { id: "s6", label: "Files", img: "assets/shots/qm/05-files.png", note: "点击放大查看原图。" }
      ]
    },
    'openclaw': {
      productId: 'openclaw',
      productName: 'openclaw',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页", img: "assets/shots/openclaw/01-home.png", note: "点击放大查看原图。openclaw 产品的\"首页\"界面。" },
        { id: "s2", label: "更多", img: "assets/shots/openclaw/02-更多.png", note: "点击放大查看原图。openclaw 产品的\"更多\"界面。" },
        { id: "s3", label: "自定义侧边栏", img: "assets/shots/openclaw/03-自定义侧边栏.png", note: "点击放大查看原图。openclaw 产品的\"自定义侧边栏\"界面。" },
        { id: "s4", label: "新会话", img: "assets/shots/openclaw/04-新会话.png", note: "点击放大查看原图。openclaw 产品的\"新会话\"界面。" },
        { id: "s5", label: "概览", img: "assets/shots/openclaw/05-overview.png", note: "点击放大查看原图。openclaw 产品的\"概览\"界面。" },
        { id: "s6", label: "活动", img: "assets/shots/openclaw/06-activity.png", note: "点击放大查看原图。openclaw 产品的\"活动\"界面。" }
      ]
    },
    'hermes': {
      productId: 'hermes',
      productName: 'hermes',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页", img: "assets/shots/hermes/01-home.png", note: "点击放大查看原图。hermes 产品的\"首页\"界面。" },
        { id: "s2", label: "Chat", img: "assets/shots/hermes/02-chat.png", note: "点击放大查看原图。hermes 产品的\"Chat\"界面。" },
        { id: "s3", label: "Sessions", img: "assets/shots/hermes/03-sessions.png", note: "点击放大查看原图。hermes 产品的\"Sessions\"界面。" },
        { id: "s4", label: "Files", img: "assets/shots/hermes/04-files.png", note: "点击放大查看原图。hermes 产品的\"Files\"界面。" },
        { id: "s5", label: "Models", img: "assets/shots/hermes/05-models.png", note: "点击放大查看原图。hermes 产品的\"Models\"界面。" },
        { id: "s6", label: "Logs", img: "assets/shots/hermes/06-logs.png", note: "点击放大查看原图。hermes 产品的\"Logs\"界面。" }
      ]
    },
    'paperclip': {
      productId: 'paperclip',
      productName: 'paperclip',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（完整）", img: "assets/shots/paperclip/01-home-full.png", note: "点击放大查看原图。paperclip 产品的\"首页（完整）\"界面。" },
        { id: "s2", label: "首页", img: "assets/shots/paperclip/01-home.png", note: "点击放大查看原图。paperclip 产品的\"首页\"界面。" },
        { id: "s3", label: "EVA 搜索", img: "assets/shots/paperclip/02-EVA-search.png", note: "点击放大查看原图。paperclip 产品的\"EVA 搜索\"界面。" },
        { id: "s4", label: "EVA Dashboard", img: "assets/shots/paperclip/03-EVA-dashboard.png", note: "点击放大查看原图。paperclip 产品的\"EVA Dashboard\"界面。" },
        { id: "s5", label: "EVA Inbox", img: "assets/shots/paperclip/04-EVA-inbox.png", note: "点击放大查看原图。paperclip 产品的\"EVA Inbox\"界面。" },
        { id: "s6", label: "EVA Issues", img: "assets/shots/paperclip/05-EVA-issues.png", note: "点击放大查看原图。paperclip 产品的\"EVA Issues\"界面。" }
      ]
    },
    'cabinet': {
      productId: 'cabinet',
      productName: 'cabinet',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（完整）", img: "assets/shots/cabinet/01-home-full.png", note: "点击放大查看原图。cabinet 产品的\"首页（完整）\"界面。" },
        { id: "s2", label: "首页", img: "assets/shots/cabinet/01-home.png", note: "点击放大查看原图。cabinet 产品的\"首页\"界面。" },
        { id: "s3", label: "Setup 后", img: "assets/shots/cabinet/02-after-setup.png", note: "点击放大查看原图。cabinet 产品的\"Setup 后\"界面。" },
        { id: "s4", label: "View", img: "assets/shots/cabinet/12-view.png", note: "点击放大查看原图。cabinet 产品的\"View\"界面。" },
        { id: "s5", label: "View 2", img: "assets/shots/cabinet/13-view.png", note: "点击放大查看原图。cabinet 产品的\"View 2\"界面。" },
        { id: "s6", label: "App Launch", img: "assets/shots/cabinet/14-app-launched.png", note: "点击放大查看原图。cabinet 产品的\"App Launch\"界面。" }
      ]
    },
    'opencode': {
      productId: 'opencode',
      productName: 'opencode',  // 由 view 端用 P[id].name 覆盖
      isSchematic: true,
      states: [
        { id: "txt", label: "无截图", img: null, note: "该产品暂无实机截图，研究主要基于官网+公开 docs。详见产品详情页。"}
      ]
    },
    'linear': {
      productId: 'linear',
      productName: 'linear',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（Cycle+Status）", img: "assets/shots/linear/01-home.jpeg", note: "点击放大查看原图。" },
        { id: "s2", label: "Features", img: "assets/shots/linear/02-features.jpeg", note: "点击放大查看原图。" },
        { id: "s3", label: "Linear Method", img: "assets/shots/linear/03-method.jpeg", note: "点击放大查看原图。" },
        { id: "s4", label: "客户", img: "assets/shots/linear/04-customers.jpeg", note: "点击放大查看原图。" },
        { id: "s5", label: "定价", img: "assets/shots/linear/05-pricing.jpeg", note: "点击放大查看原图。" },
        { id: "s6", label: "Linear Agents", img: "assets/shots/linear/06-agents.jpeg", note: "点击放大查看原图。" }
      ]
    },
    'jira-meego': {
      productId: 'jira-meego',
      productName: 'jira-meego',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "Jira 首页", img: "assets/shots/jira-meego/01-jira-home.jpeg", note: "点击放大查看原图。" },
        { id: "s2", label: "Jira Features", img: "assets/shots/jira-meego/02-jira-features.jpeg", note: "点击放大查看原图。" },
        { id: "s3", label: "Meego 首页", img: "assets/shots/jira-meego/03-meego.jpeg", note: "点击放大查看原图。" },
        { id: "s4", label: "Meego 工作台", img: "assets/shots/jira-meego/04-meego-工作台.jpeg", note: "点击放大查看原图。" },
        { id: "s5", label: "Meego 空间（Sprint）", img: "assets/shots/jira-meego/05-meego-空间.jpeg", note: "点击放大查看原图。" },
        { id: "s6", label: "Meego 模板中心", img: "assets/shots/jira-meego/06-meego-模板中心.jpeg", note: "点击放大查看原图。" }
      ]
    },
    'slack': {
      productId: 'slack',
      productName: 'slack',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（Cycle+Status）", img: "assets/shots/slack/01-home.jpeg", note: "点击放大查看原图。slack 产品的\"首页（Cycle+Status）\"界面。" },
        { id: "s2", label: "Features", img: "assets/shots/slack/02-features.jpeg", note: "点击放大查看原图。slack 产品的\"Features\"界面。" },
        { id: "s3", label: "Project Mgmt", img: "assets/shots/slack/03-project-mgmt.jpeg", note: "点击放大查看原图。slack 产品的\"Project Mgmt\"界面。" },
        { id: "s4", label: "App Client", img: "assets/shots/slack/04-app-client.jpeg", note: "点击放大查看原图。slack 产品的\"App Client\"界面。" },
        { id: "s5", label: "App", img: "assets/shots/slack/04-app.jpeg", note: "点击放大查看原图。slack 产品的\"App\"界面。" },
        { id: "s6", label: "DMs", img: "assets/shots/slack/05-app-dms.jpeg", note: "点击放大查看原图。slack 产品的\"DMs\"界面。" }
      ]
    },
    'feishu': {
      productId: 'feishu',
      productName: 'feishu',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "消息", img: "assets/shots/feishu/01-messenger.jpeg", note: "点击放大查看原图。feishu 产品的\"消息\"界面。" },
        { id: "s2", label: "云文档", img: "assets/shots/feishu/02-drive云文档.jpeg", note: "点击放大查看原图。feishu 产品的\"云文档\"界面。" },
        { id: "s3", label: "会议", img: "assets/shots/feishu/03-meeting会议.jpeg", note: "点击放大查看原图。feishu 产品的\"会议\"界面。" },
        { id: "s4", label: "任务", img: "assets/shots/feishu/04-task任务.jpeg", note: "点击放大查看原图。feishu 产品的\"任务\"界面。" },
        { id: "s5", label: "Aily 知识问答", img: "assets/shots/feishu/05-aily知识问答.jpeg", note: "点击放大查看原图。feishu 产品的\"Aily 知识问答\"界面。" }
      ]
    },
    'workbuddy': {
      productId: 'workbuddy',
      productName: 'workbuddy',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（Cycle+Status）", img: "assets/shots/workbuddy/01-home.jpeg", note: "点击放大查看原图。workbuddy 产品的\"首页（Cycle+Status）\"界面。" },
        { id: "s2", label: "docs overview", img: "assets/shots/workbuddy/02-docs-overview.jpeg", note: "点击放大查看原图。workbuddy 产品的\"docs overview\"界面。" },
        { id: "s3", label: "docs claw", img: "assets/shots/workbuddy/03-docs-claw.jpeg", note: "点击放大查看原图。workbuddy 产品的\"docs claw\"界面。" }
      ]
    },
    'claude-ma': {
      productId: 'claude-ma',
      productName: 'claude-ma',  // 由 view 端用 P[id].name 覆盖
      isSchematic: true,
      states: [
        { id: "txt", label: "无截图", img: null, note: "该产品暂无实机截图，研究主要基于官网+公开 docs。详见产品详情页。"}
      ]
    },
    'crewai': {
      productId: 'crewai',
      productName: 'crewai',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "Flow 概览", img: "assets/shots/crewai/01-flow-overview.png", note: "点击放大查看原图。crewai 产品的\"Flow 概览\"界面。" },
        { id: "s2", label: "Start/Listen Flow", img: "assets/shots/crewai/02-start-listen-flow.png", note: "点击放大查看原图。crewai 产品的\"Start/Listen Flow\"界面。" },
        { id: "s3", label: "Branch Router", img: "assets/shots/crewai/03-branch-router-flow.png", note: "点击放大查看原图。crewai 产品的\"Branch Router\"界面。" },
        { id: "s4", label: "And Trigger", img: "assets/shots/crewai/04-and-trigger-flow.png", note: "点击放大查看原图。crewai 产品的\"And Trigger\"界面。" },
        { id: "s5", label: "Enterprise Studio", img: "assets/shots/crewai/04-enterprise-studio.png", note: "点击放大查看原图。crewai 产品的\"Enterprise Studio\"界面。" },
        { id: "s6", label: "Router Flow", img: "assets/shots/crewai/05-router-flow.png", note: "点击放大查看原图。crewai 产品的\"Router Flow\"界面。" }
      ]
    },
    'qoderwake': {
      productId: 'qoderwake',
      productName: 'qoderwake',  // 由 view 端用 P[id].name 覆盖
      isSchematic: true,
      states: [
        { id: "txt", label: "无截图", img: null, note: "该产品暂无实机截图，研究主要基于官网+公开 docs。详见产品详情页。"}
      ]
    },
    'chatgpt-desktop': {
      productId: 'chatgpt-desktop',
      productName: 'chatgpt-desktop',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "app", img: "assets/shots/chatgpt-desktop/01-app.png", note: "点击放大查看原图。chatgpt-desktop 产品的\"app\"界面。" }
      ]
    },
    'mavis': {
      productId: 'mavis',
      productName: 'mavis',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（Cycle+Status）", img: "assets/shots/mavis/01-home.jpeg", note: "点击放大查看原图。mavis 产品的\"首页（Cycle+Status）\"界面。" },
        { id: "s2", label: "Skills", img: "assets/shots/mavis/02-skills.jpeg", note: "点击放大查看原图。mavis 产品的\"Skills\"界面。" },
        { id: "s3", label: "定时任务", img: "assets/shots/mavis/03-定时任务.jpeg", note: "点击放大查看原图。mavis 产品的\"定时任务\"界面。" },
        { id: "s4", label: "资产", img: "assets/shots/mavis/04-资产.jpeg", note: "点击放大查看原图。mavis 产品的\"资产\"界面。" },
        { id: "s5", label: "MaxHermes", img: "assets/shots/mavis/05-maxhermes.jpeg", note: "点击放大查看原图。mavis 产品的\"MaxHermes\"界面。" }
      ]
    },
    'feishu-codem': {
      productId: 'feishu-codem',
      productName: 'feishu-codem',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "首页（Cycle+Status）", img: "assets/shots/feishu-codem/01-home.jpeg", note: "点击放大查看原图。feishu-codem 产品的\"首页（Cycle+Status）\"界面。" },
        { id: "s2", label: "product", img: "assets/shots/feishu-codem/01-product.jpeg", note: "点击放大查看原图。feishu-codem 产品的\"product\"界面。" },
        { id: "s3", label: "docs", img: "assets/shots/feishu-codem/02-docs.jpeg", note: "点击放大查看原图。feishu-codem 产品的\"docs\"界面。" }
      ]
    },
    'claude-tag': {
      productId: 'claude-tag',
      productName: 'claude-tag',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "解析HTML", img: "assets/shots/claude-tag/01-解析HTML.jpeg", note: "点击放大查看原图。claude-tag 产品的\"解析HTML\"界面。" }
      ]
    },
    'agent365': {
      productId: 'agent365',
      productName: 'agent365',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "e7 blog", img: "assets/shots/agent365/01-e7-blog.jpeg", note: "点击放大查看原图。agent365 产品的\"e7 blog\"界面。" },
        { id: "s2", label: "首页（Cycle+Status）", img: "assets/shots/agent365/01-home.jpeg", note: "点击放大查看原图。agent365 产品的\"首页（Cycle+Status）\"界面。" },
        { id: "s3", label: "learn home", img: "assets/shots/agent365/01-learn-home.jpeg", note: "点击放大查看原图。agent365 产品的\"learn home\"界面。" },
        { id: "s4", label: "enterprise page", img: "assets/shots/agent365/02-enterprise-page.jpeg", note: "点击放大查看原图。agent365 产品的\"enterprise page\"界面。" },
        { id: "s5", label: "product", img: "assets/shots/agent365/02-product.jpeg", note: "点击放大查看原图。agent365 产品的\"product\"界面。" }
      ]
    },
    'pi-monitor': {
      productId: 'pi-monitor',
      productName: 'pi-monitor',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "image1", img: "assets/shots/pi-monitor/image1.png", note: "点击放大查看原图。pi-monitor 产品的\"image1\"界面。" },
        { id: "s2", label: "image10", img: "assets/shots/pi-monitor/image10.png", note: "点击放大查看原图。pi-monitor 产品的\"image10\"界面。" },
        { id: "s3", label: "image11", img: "assets/shots/pi-monitor/image11.png", note: "点击放大查看原图。pi-monitor 产品的\"image11\"界面。" },
        { id: "s4", label: "image12", img: "assets/shots/pi-monitor/image12.png", note: "点击放大查看原图。pi-monitor 产品的\"image12\"界面。" },
        { id: "s5", label: "image13", img: "assets/shots/pi-monitor/image13.png", note: "点击放大查看原图。pi-monitor 产品的\"image13\"界面。" },
        { id: "s6", label: "image14", img: "assets/shots/pi-monitor/image14.png", note: "点击放大查看原图。pi-monitor 产品的\"image14\"界面。" }
      ]
    },
    'openworker': {
      productId: 'openworker',
      productName: 'openworker',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "桌面主屏", img: "assets/shots/openworker/01_desktop_home.jpg", note: "点击放大查看原图。" },
        { id: "s2", label: "任务执行", img: "assets/shots/openworker/02_task_execution.jpg", note: "点击放大查看原图。" },
        { id: "s3", label: "审批弹窗", img: "assets/shots/openworker/03_approval_prompt.jpg", note: "点击放大查看原图。" },
        { id: "s4", label: "连接器", img: "assets/shots/openworker/04_connectors_list.jpg", note: "点击放大查看原图。" },
        { id: "s5", label: "本地记忆", img: "assets/shots/openworker/05_memory_store.jpg", note: "点击放大查看原图。" },
        { id: "s6", label: "Slack 集成", img: "assets/shots/openworker/06_slack_integration.jpg", note: "点击放大查看原图。" }
      ]
    },
    'vibe-kanban': {
      productId: 'vibe-kanban',
      productName: 'vibe-kanban',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "Kanban 看板", img: "assets/shots/vibe-kanban/01_kanban_board.jpg", note: "点击放大查看原图。" },
        { id: "s2", label: "任务执行", img: "assets/shots/vibe-kanban/02_task_execution.jpg", note: "点击放大查看原图。" },
        { id: "s3", label: "Agent 配置", img: "assets/shots/vibe-kanban/03_agent_config.jpg", note: "点击放大查看原图。" },
        { id: "s4", label: "Terminal UI", img: "assets/shots/vibe-kanban/04_terminal_ui.jpg", note: "点击放大查看原图。" },
        { id: "s5", label: "Worktree 视图", img: "assets/shots/vibe-kanban/05_worktree_view.jpg", note: "点击放大查看原图。" },
        { id: "s6", label: "architecture", img: "assets/shots/vibe-kanban/06_architecture.jpg", note: "点击放大查看原图。" }
      ]
    },
    'raft': {
      productId: 'raft',
      productName: 'raft',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "channel home", img: "assets/shots/raft/01_channel_home.jpg", note: "点击放大查看原图。" },
        { id: "s2", label: "thread conversation", img: "assets/shots/raft/02_thread_conversation.jpg", note: "点击放大查看原图。" },
        { id: "s3", label: "agent profile", img: "assets/shots/raft/03_agent_profile.jpg", note: "点击放大查看原图。" },
        { id: "s4", label: "team overview", img: "assets/shots/raft/04_team_overview.jpg", note: "点击放大查看原图。" },
        { id: "s5", label: "tasks kanban", img: "assets/shots/raft/05_tasks_kanban.jpg", note: "点击放大查看原图。" },
        { id: "s6", label: "landing", img: "assets/shots/raft/06_landing.jpg", note: "点击放大查看原图。" }
      ]
    },
    'ruflo': {
      productId: 'ruflo',
      productName: 'ruflo',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "swarm dashboard", img: "assets/shots/ruflo/01_swarm_dashboard.jpg", note: "点击放大查看原图。" },
        { id: "s2", label: "plugin marketplace", img: "assets/shots/ruflo/02_plugin_marketplace.jpg", note: "点击放大查看原图。" },
        { id: "s3", label: "swarm topology", img: "assets/shots/ruflo/03_swarm_topology.jpg", note: "点击放大查看原图。" },
        { id: "s4", label: "memory vector", img: "assets/shots/ruflo/04_memory_vector.jpg", note: "点击放大查看原图。" },
        { id: "s5", label: "federation trace", img: "assets/shots/ruflo/05_federation_trace.jpg", note: "点击放大查看原图。" },
        { id: "s6", label: "landing", img: "assets/shots/ruflo/06_landing.jpg", note: "点击放大查看原图。" }
      ]
    },
    'openagents': {
      productId: 'openagents',
      productName: 'openagents',  // 由 view 端用 P[id].name 覆盖
      isSchematic: false,
      states: [
        { id: "s1", label: "network home", img: "assets/shots/openagents/01_network_home.jpg", note: "点击放大查看原图。" },
        { id: "s2", label: "data agent chat", img: "assets/shots/openagents/02_data_agent_chat.jpg", note: "点击放大查看原图。" },
        { id: "s3", label: "network protocol", img: "assets/shots/openagents/03_network_protocol.jpg", note: "点击放大查看原图。" },
        { id: "s4", label: "plugin marketplace", img: "assets/shots/openagents/04_plugin_marketplace.jpg", note: "点击放大查看原图。" },
        { id: "s5", label: "web agent browse", img: "assets/shots/openagents/05_web_agent_browse.jpg", note: "点击放大查看原图。" },
        { id: "s6", label: "landing", img: "assets/shots/openagents/06_landing.jpg", note: "点击放大查看原图。" }
      ]
    },
  }
};
