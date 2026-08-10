# screenshot-skill

> Capture a complete, design-intent-verified screenshot of a local web app via kimi-webbridge. From "open the URL" to "I have proof every image rendered, every route works, every bug has a fix".

This is a self-contained skill package — a SKILL.md (load this first), four references (cheatsheet / template / diagnosis tree / naming), four ready-to-run shell scripts, and one worked example. Drop it into any project that needs visual QA on a real browser.

## What it solves

A user says "screenshot the page and tell me if it actually works". You open the page, see what looks like a broken image, fix the wrong file, and ship a "verified" claim that was actually a lazy-load false alarm. Half a day later they come back: it really was broken.

This skill forces a closed loop:

```
preflight → navigate → force-eager+scroll → capture → audit → repair → verify → report
```

Each step has a clear, executable check. The audit step distinguishes a real 404 from a `loading="lazy"` image that never scrolled in — the difference between "fix the source code" and "do nothing".

## What it produces

For a single-route audit:

- One `/tmp/route-<view>.jpg` showing the route working.
- A machine-checkable verdict: `total: 16, broken: 0` (or a list of real broken images with their source paths).
- For each broken image: which file is referenced, which file actually exists, and a recommended fix.

For a multi-route walk (using `scripts/route-walk.sh`):

- One shot per route in the input list.
- A summary on stdout.

## Quick start

```bash
# 1. Make sure the kimi-webbridge daemon is up
lsof -nP -iTCP:10086 -sTCP:LISTEN
# If not, start Kimi (the desktop app brings the daemon up)

# 2. Make sure your dev server is up
lsof -nP -iTCP:7100 -sTCP:LISTEN
# (or whatever port your app uses)

# 3. Walk your routes
./scripts/route-walk.sh qa-batch-1 /tmp/qa-shots/ examples/route-walk-input.txt

# 4. Open the shots
open /tmp/qa-shots/
```

For a one-off single-route capture:

```bash
./scripts/shoot.sh "http://localhost:7100/#/tasks" /tmp/route-tasks.jpg qa-tasks-1 2200
```

For a one-off audit (no screenshot, just the broken-list):

```bash
./scripts/audit-images.sh "http://localhost:7100/#/tasks" qa-tasks-1 2200
```

## Repository layout

```
screenshot-skill/
├── README.md                          ← this file
├── SKILL.md                           ← load this when the user asks for screenshots
├── references/
│   ├── curl-json-template.md          ← the ONE place to learn how to call the daemon
│   ├── broken-vs-lazy.md              ← the 5-cause diagnosis tree
│   ├── shot-naming-conventions.md     ← /tmp/<prefix>-<project>-<context>.<ext>
│   └── kimi-webbridge-cheatsheet.md   ← condensed tool reference
├── scripts/
│   ├── wb.sh                          ← one-shot curl wrapper (handles session + JSON)
│   ├── shoot.sh                       ← navigate + force-eager + scroll + screenshot
│   ├── audit-images.sh                ← navigate + force-eager + scroll + audit (no shot)
│   └── route-walk.sh                  ← batch: walk a route list, shot + audit each
└── examples/
    ├── competitor-site-tasks-linear.md ← full worked example: the #/tasks linear bug
    └── route-walk-input.txt           ← sample input file for route-walk.sh
```

## When to load this skill

Load `SKILL.md` (or have the agent load it) when **any** of the user requests match:

- "截个图 / screenshot / 截屏 / 看看效果"
- "verify routes / QA 一下 / 每个页面都打开看一遍"
- "linear 的图都报错 / 首页都点不进去 / 大量的页面都点不进去"
- "把每个链接都点下看是否达到设计意图"
- "看下这个 UI / 帮我检查 UI"

If the user just wants one screenshot with no verification, this skill is overkill — use the `browser` tool or `kimi-webbridge` directly.

## When **not** to use this skill

- The deliverable is a single static image with no verification needed → `image_synthesize`.
- The user wants CSS / DOM extraction only → `web_fetch` or `browser.snapshot`.
- The user is on a cloud-browser service (Browserless, BrowserCat) → different toolchain.
- The user is on a very wide screen and the embedded `browser` tool works fine → don't drag in kimi-webbridge for nothing.

## Related skills

- **`kimi-webbridge`** — the underlying browser-automation daemon. **Load that first** if you have not used kimi-webbridge in this session; this skill assumes it.
- **`control-in-app-browser`** — the embedded FilePanel browser. Use only when the user explicitly says "use the in-app browser".
- **`web-search` / `web_fetch`** — for URL metadata, not for real-browser interaction.

## Provenance

This skill was extracted from the in-the-trenches audit work on the **competitor-analysis-site** project — the project it ships with. The full audit chain is preserved in that project's git history (work on the `/#/tasks` route that surfaced the linear image bug, the markdown `**` bug, and the fix commit).
