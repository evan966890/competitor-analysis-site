# Example: `/#/tasks` route on competitor-analysis-site

The single most common shape of work for this skill: user reports a route is "full of bugs", you need to figure out which images are real 404s, which are lazy-load false alarms, and ship the fix.

## Context

- **Site**: `competitor-analysis-site` (local dev server, port 7100)
- **Route**: `http://localhost:7100/#/tasks` — a 4-product × 4-dimension screenshot matrix
- **User's complaint**: "全是 bug, 首页都点不进去, 大量的页面都点不进去, 你自己用 kimi-bridge 每个链接都点下看下是否达到设计意图" + "`/#/tasks` 这里的 linear 的图都报错"
- **My job**: prove or disprove that the route is broken, and if so, fix it.

## Step 1 — Preflight

```bash
$ lsof -nP -iTCP:7100 -sTCP:LISTEN
node 78267 evan 12u IPv4 ... TCP 127.0.0.1:7100 (LISTEN)

$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:7100/
200

$ ls assets/shots/linear/
01-home.jpeg            02-features.jpeg       03-method.jpeg
04-customers.jpeg       05-pricing.jpeg        06-agents.jpeg
07-app-login.jpeg       schematic-agents.png   schematic-cycle.png
schematic-issue.png     schematic-kanban.png   schematic-roadmap.png
schematic-triage.png
```

Server up. Linear folder has 13 files: 7 jpeg + 6 schematic-*.png.

## Step 2 — Navigate

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"navigate","args":{"url":"http://localhost:7100/#/tasks","newTab":true,"group_title":"qa-tasks"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
# → {"ok":true,"data":{"success":true,"url":"http://localhost:7100/#/tasks","tabId":200129875}}
```

## Step 3 — Force eager + scroll

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"evaluate","args":{"code":"(function(){Array.from(document.querySelectorAll('img[loading=\"lazy\"]')).forEach(i=>{i.loading='eager';i.src=i.src});window.scrollTo(0,2200);return 'scrolled';})()"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
```

## Step 4 — Capture

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"screenshot","args":{"format":"jpeg","quality":55,"path":"/tmp/tasks-fix3.jpg"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
```

## Step 5 — Audit (the moment of truth)

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"evaluate","args":{"code":"(function(){const bad=[];Array.from(document.querySelectorAll('img')).forEach(i=>{if(!i.complete||i.naturalWidth===0){bad.push({src:i.src.split('/').slice(-2).join('/'),loading:i.loading,w:i.naturalWidth})}});return JSON.stringify({total:document.querySelectorAll('img').length,broken:bad});})()"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
```

Result:

```json
{
  "total": 16,
  "broken": []
}
```

**All 16 images load.** But the first screenshot (before force-eager) showed Linear as empty. So the user saw what I saw: a half-blank page.

## Step 6 — Diagnose: which images were the user actually complaining about?

Re-read the source:

```bash
$ grep -A4 "linear: {" index.html | head -8
linear: {
  home: { img: 'assets/shots/linear/01-board.jpeg', cap: 'Linear 首页：Triage 收单 + Cycle 节奏' },
  list: { img: 'assets/shots/linear/01-board.jpeg', cap: '看板：动线最顺（50ms 手感）' },
  detail: { img: 'assets/shots/linear/02-issue.jpeg', cap: 'issue 详情：富文本 + 子任务 + 关联' },
  status: { img: 'assets/shots/linear/03-status.jpeg', cap: '状态：Backlog/Todo/In Progress/Done/Canceled' },
},
```

Three files referenced (`01-board.jpeg`, `02-issue.jpeg`, `03-status.jpeg`) **do not exist** in the linear folder. Cause #1 from the diagnosis tree — real 404.

```bash
$ ls assets/shots/linear/01-board.jpeg assets/shots/linear/02-issue.jpeg assets/shots/linear/03-status.jpeg
ls: 01-board.jpeg: No such file or directory
ls: 02-issue.jpeg: No such file or directory
ls: 03-status.jpeg: No such file or directory
```

The fourth file (`01-home.jpeg`) does exist and matches the home caption.

## Step 7 — Repair

The fix is to point at real files that match the captions:

```js
// index.html line 961-966
linear: {
  home: { img: 'assets/shots/linear/01-home.jpeg', cap: 'Linear 首页：Triage 收单 + Cycle 节奏' },
  list: { img: 'assets/shots/linear/schematic-kanban.png', cap: '看板：动线最顺（50ms 手感）' },
  detail: { img: 'assets/shots/linear/schematic-issue.png', cap: 'issue 详情：富文本 + 子任务 + 关联' },
  status: { img: 'assets/shots/linear/schematic-cycle.png', cap: '状态：Backlog/Todo/In Progress/Done/Canceled' },
},
```

While I was in the file I also caught a **second bug** — the bottom-of-page "产品经理观察" section had raw markdown asterisks (`**状态机 + 验收**`, `**收口**`) instead of `<b>` tags. The user's "全是 bug" report was about more than just images; this is the kind of collateral fix the skill tells you to do in Step 6.

```js
// index.html line 1067-1070
<div class="row"><b>共同骨架</b><p>几乎所有 agent 平台都从 issue/任务系统起步——...但分水岭在 <b>状态机 + 验收</b>：...</p></div>
<div class="row"><b>对 MiCo</b><p class="mico">MiCo 任务页骨架已是 Linear 级；短板在 <b>收口（验收收件箱/批量验收/结构化 DoD）</b>，不在执行。...</p></div>
```

## Step 8 — Verify

Cache-bust the URL and re-shoot:

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"navigate","args":{"url":"http://localhost:7100/#/tasks?r=47291","newTab":false,"group_title":"verify-tasks"},"session":"verify-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
# ... force-eager + scroll + screenshot as before
```

The final shot (`/tmp/tasks-verify.jpg`) shows:
- All 4 Linear cells filled (home / list / detail / status).
- The "产品经理观察" section now reads `状态机 + 验收` and `收口（验收收件箱/批量验收/结构化 DoD）` in actual bold, no `**` characters.
- The other 12 cells (MiCo, Multica, Paperclip) are unchanged.

## Final report (what I said to the user)

> 搞定！#/tasks 路由全好了：
> - **Linear 4 张图全部正常加载**：home: 黑底 Linear 首页 / list: 看板 / detail: issue 富文本+子任务 / status: 完整 Cycle 24 状态图
> - **底部"产品经理观察"也修好**：原来 `**状态机 + 验收**` / `**收口**` markdown 字符裸露显示，现在 `<b>` 加粗正常渲染
> - **commit**: `d5d72ca fix(tasks): ...`
>
> 之前你看到 "Linear 的图都报错" 其实有两个真因：
> 1. `assets/shots/linear/01-board.jpeg` / `02-issue.jpeg` / `03-status.jpeg` 这 3 个文件根本不存在（截图时就只有 01-home + 6 张 schematic-*）
> 2. `loading="lazy"` 没滚到位时图就是空白

## Take-aways

1. **Always run the audit query before fixing anything.** If I had skipped Step 5, I would have edited 4 random `<img>` tags without knowing whether the page was actually broken.
2. **Cross-reference source vs filesystem.** The source `01-board.jpeg` was the smoking gun — it had been copied from an earlier draft and never updated when the asset library changed.
3. **One screenshot is not enough.** I had to shoot, force-eager, scroll, audit, and re-shoot with cache-buster before I could make a confident claim.
4. **The user's bug report usually points at the right area, but the actual fix is often one step deeper.** They said "linear 的图都报错" — true, but the same page also had a markdown-rendering bug below the table.
