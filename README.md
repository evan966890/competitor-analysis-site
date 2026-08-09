# 竞品拆解台

本地静态竞品分析网站：以可追溯截图、源码片段和产品经理注解横向比较 Agent 平台。

## 证据准入

- `实机截图`：可看见已登录身份或本地运行实例，并包含有意义的真实/明确标注的演示数据。
- `官方文档图`：从本机 checkout 保留的原始文档材料；可说明产品结构，不宣称为本地运行实拍。
- `源码证据`：必须标明 checkout 内的精确路径；只描述可由该路径支撑的实现。
- `待补`：登录页、空态、404、失效页面或来源不明素材；不进入横向能力卡片。

## 本轮修复

- Linear 应用内图片经逐张目检出现空态与 404，已从栏目卡片撤下，等待含真实工作项的重拍。
- crewAI 新增 Flow 总图、顺序触发、OR、AND、Router 与 Studio 信息架构六条材料链，并新增运行时源码解剖专题。

## 2026-08-09 扩容（+3 深度评测：Buzz / QoderWake / QoderWork）

产品总数 27 → **29**，深度评测 9 → **12**。

- **Buzz**（Block 开源，`github.com/block/buzz`）：本机完整跑通 relay 栈（Postgres/Redis/MinIO/Git 对象存储/NIP-PL/NIP-ER 全通，Prometheus 指标可见 `buzz_total_users{type=agent}`）。证据=落地页/登录页/health/metrics 实跑截图 + `crates/` 源码精读（NIP-34 Git 事件、Agent 即成员的 MemberRole、buzz-audit SHA-256 审计链）。源码路径均标注真实行号可复查。
- **QoderWake**（阿里系闭源）：从"无截图占位"升级为实机证据——桌面客户端 6 张（codewaker/）+ 官网/能力市场/定价/下载实拍。code 段为 `(推断)` 并明示。
- **QoderWork**（阿里系闭源，QoderWake 同门，本台新增收录）：官网/能力市场/定价/下载实拍，产品族梯度（个人助手 → 团队员工）专项分析。

`index.html` 接线：新增 3 个 `<script>`、3 个 nav 按钮、DEEP9/DEEP_DIVE_IDS/3 个 map/matrix overlay 全部同步；统计数 27→29 / 9→12。

### 待补

- QoderWake/QoderWork 的 `/account/*` 页面（profile/usage/integration/publish）需阿里云 OAuth 登录态；本轮 cookie/profile 副本均被会话校验重定向，待重登录后补 profile + usage（成本/台账证据，可验证 products.js 里 QoderWake "台账/成本语言缺"的判定）。

## 运行

在本目录运行 `npm run dev -- --host 127.0.0.1 --port 7100`，打开 `http://127.0.0.1:7100/`。现有进程若以 `localhost` 启动，macOS 可能只绑定到 IPv6 的 `::1`；重启时用此命令可避免 IPv4/IPv6 解析差异。

## 设计来源

本网站采用“研究台”式的中性信息密度：参考 Linear 的克制层级、OpenCode 的代码可读性和 Sentry 的高对比状态提示；只采用结构原则，不复制品牌资产或界面。
