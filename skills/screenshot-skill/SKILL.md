---
name: screenshot-skill
description: Capture a complete, design-intent-verified screenshot of a local web app via kimi-webbridge. Use when the user asks to "screenshot the page", "verify the page renders correctly", "test all the routes", "show me the UI", "QA the frontend", or any task that needs a real-browser screenshot of localhost (or any URL) and a verdict on whether it actually rendered what was designed. Built for systems-style verification: open the URL in a real browser, walk the routes, force lazy-loaded images to render, distinguish real broken images from lazy-load not-yet-triggered, and surface route-level failures back to the caller. Trigger whenever the deliverable is a screenshot, a route audit, or a visual regression check. Not for static-image editing, single-screenshot capture without verification, or remote cloud-browser services.
---

# Screenshot Skill

Take a screenshot of a local web app the way a human QA would: open the real browser, walk every route the user cares about, force lazy-loaded assets to actually render, distinguish "image is broken" from "image is just below the fold", and report what you saw in terms the user can act on.

## When this skill applies

Use this skill when **any** of these are true:

- The user says "screenshot", "截个图", "看下这个页面", "看看效果", "QA 一遍", "verify routes", "把每个页面都打开看一遍", "点不进去的都点下".
- The deliverable is a screenshot, a route audit, or a "does it actually work" check.
- The target is a local dev server (or any URL where a real browser is required because of login state, OAuth, or 2FA).
- The work touches a competitor / product / dashboard / SaaS / web app whose visual output matters.
- The user is on a non-Wide-screen machine and the embedded browser is too narrow.

Do **not** use this skill for:

- Static image editing, resizing, or format conversion (use `image_synthesize` or shell tools).
- Single-shot capture without any verification intent.
- Cloud-browser services (Browserless, BrowserCat) — this skill is local-only.
- Pure DOM/CSS extraction with no visual evidence needed (use the regular `browser` tool or `web_fetch`).

## The 8-step closed loop

Every screenshot session follows this exact loop. Skip a step and the verification claim becomes untrustworthy.

```
┌─────────────┐   ┌──────────────┐   ┌────────────┐   ┌────────────┐
│ 1. Preflight │ → │ 2. Navigate  │ → │ 3. Eager   │ → │ 4. Capture │
│  (server ok?)│   │  (real tab)  │   │  + scroll  │   │  (shoot)   │
└─────────────┘   └──────────────┘   └────────────┘   └────────────┘
       ↓                                                  ↓
┌─────────────┐   ┌──────────────┐   ┌────────────┐   ┌────────────┐
│ 8. Report   │ ← │ 7. Verify    │ ← │ 6. Repair  │ ← │ 5. Audit   │
│  (action)   │   │  (re-shoot)  │   │  (fix bug) │   │  (broken?) │
└─────────────┘   └──────────────┘   └────────────┘   └────────────┘
```

### Step 1 — Preflight

Before opening any browser tab, confirm the dev server is actually serving the route you intend to screenshot.

```bash
# Confirm server is up
lsof -nP -iTCP:7100 -sTCP:LISTEN

# Confirm the route returns 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:7100/

# Confirm an asset you'll need is also reachable
curl -s -o /dev/null -w "%{http_code} %{size_download}\n" \
  http://localhost:7100/assets/shots/linear/schematic-issue.png
```

If the server is down, restart it (or tell the user to). If a static asset returns 404, **stop here** — your screenshot will be a broken-image square and you will mis-diagnose the page as broken. Fix the missing file first.

### Step 2 — Navigate (real browser, not the in-app one)

Use **kimi-webbridge**, not the embedded browser. The embedded browser is narrow on most machines and may not share login state. kimi-webbridge drives the user's real Chrome with their real sessions.

Every request must be POSTed to `http://127.0.0.1:10086/command` and **must** be sent from a temp file, never inline:

```bash
# Good: JSON body from a temp file (curl quoting stays sane)
cat > /tmp/wb-req.json <<'JSON'
{"action":"navigate","args":{"url":"http://localhost:7100/#/tasks","newTab":true,"group_title":"qa-tasks"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command \
  --data-binary @/tmp/wb-req.json
```

**Why the temp file**: shell quoting corrupts the JSON, the daemon rejects it with `400 bad_request: invalid JSON: unexpected EOF`, and you waste a turn debugging escaping. See [references/curl-json-template.md](references/curl-json-template.md) for the full template.

**Always pass `session`** (a stable string per task) so `list_tabs` / `find_tab` can re-select the tab you opened. **Always pass `newTab:true` for the first navigate** so you do not steal a tab the user is reading. Use `group_title` so the user can see the group in their tab UI.

### Step 3 — Force eager + scroll

The page may be huge, may have hundreds of `loading="lazy"` images, and the screenshot tool only renders the viewport. You must force-eager every lazy image AND scroll the page to the target region before capturing.

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"evaluate","args":{"code":"(function(){Array.from(document.querySelectorAll('img[loading=\"lazy\"]')).forEach(i=>{i.loading='eager';i.src=i.src});window.scrollTo(0, TARGET_Y);return 'scrolled to '+TARGET_Y;})()"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
```

**Why both**: setting `loading='eager'` is necessary but not sufficient — many sites only set `src` on the image once it scrolls into the IntersectionObserver's root, so re-asserting `i.src=i.src` re-triggers the load. `window.scrollTo` then actually moves the viewport to the region you want to capture.

### Step 4 — Capture

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"screenshot","args":{"format":"jpeg","quality":60,"path":"/tmp/shot-name.jpg"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
```

**Naming convention** (use it, you'll thank yourself later):
- `/tmp/route-<view>.jpg` — single-route audit
- `/tmp/bug-<short-name>.jpg` — bug found while auditing
- `/tmp/paper-<project-name>-<n>.jpg` — paper / doc-screenshot intake
- `/tmp/verify-<fix>.jpg` — re-shot after a repair

**Quality 60 jpeg** is the sweet spot: readable text, small enough to read in this conversation. Use `png` only when you need pixel-perfect fidelity (e.g., for a bug that depends on a 1px border).

### Step 5 — Audit (broken or lazy?)

Open the image. If you see a square box or a broken-image icon, **do not assume the page is broken**. Run the audit query first:

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"evaluate","args":{"code":"(function(){const bad=[];Array.from(document.querySelectorAll('img')).forEach(i=>{if(!i.complete||i.naturalWidth===0){bad.push({src:i.src.split('/').slice(-2).join('/'),loading:i.loading,complete:i.complete,w:i.naturalWidth})}});return JSON.stringify({total:document.querySelectorAll('img').length,broken:bad});})()"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
```

Then cross-reference the `bad` list against:
1. The file system (`ls assets/shots/<project>/`).
2. The `img src` attribute as written in the source (`grep -n "src" data/<x>DeepDive.js`).
3. The HTTP server (the `curl` preflight from Step 1).

You will discover that **most "broken images" are actually `loading="lazy"` images that never scrolled into view**. Real broken images are 404s, path typos, or wrong extensions. See [references/broken-vs-lazy.md](references/broken-vs-lazy.md) for the full diagnosis tree.

### Step 6 — Repair

When a real broken image is confirmed, choose the right fix in this priority order:

1. **The file exists with a different name** → update the source `src` to point at the real file.
2. **The file is missing but a similar file exists** → use the similar file + update the caption.
3. **The file is missing and there is no substitute** → replace with a schematic / placeholder.
4. **The file is referenced via a hardcoded array** → use a Python/Node script to patch the array in bulk, not a manual Edit.

Always **re-run the audit query** after the fix. A successful page reload + 200 from the asset is necessary but not sufficient — naturalWidth must be > 0.

### Step 7 — Verify (re-shoot)

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"navigate","args":{"url":"http://localhost:7100/#/tasks?r=$RANDOM","newTab":false,"group_title":"qa-tasks"},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command --data-binary @/tmp/wb-req.json
```

**`?r=$RANDOM` is mandatory**. The daemon aggressively caches, and a re-shoot of the same URL can return the same broken image even after the source was fixed. The cache-buster query string forces a fresh load.

Then re-do Steps 3-5, then capture a new `/tmp/verify-<fix>.jpg` and visually compare.

### Step 8 — Report

Report must include:

1. **Verdict per route** — "OK" / "OK after fix" / "still broken" / "N/A (lazy only)".
2. **List of fixes** — file path + diff hunk + before/after src.
3. **Any open questions** — files missing with no substitute, routes that fail to load at all, etc.
4. **Screenshots delivered** — paths to the final shots so the user can re-open them.

Never report "all looks good" without showing one of the actual `/tmp/shot-*.jpg` files via `<media />` in the response.

## Hard rules

1. **Never inline JSON in curl `-d`.** Always `--data-binary @file.json`. The daemon's parser does not tolerate shell quoting.
2. **Never claim "broken" before running the audit query** in Step 5. A 404 square on screen can be a lazy image.
3. **Never trust a single screenshot.** Lazy + scroll + re-shoot before any verdict.
4. **Never close the session before the report** — if you need to look at a different tab you opened, `find_tab` it back. Closing early wipes evidence.
5. **Never run `evaluate` with a multi-line string that contains unescaped `${...}`.** Bash will substitute. Use the temp-file pattern always.
6. **Cache-bust on re-shoot** with `?r=$RANDOM` or a timestamp.
7. **Use `newTab:true` for first navigate.** The user may be reading another tab in the same window.
8. **One session per task.** Don't mix QA tasks in the same session — `list_tabs` will return unrelated tabs and you will mis-target.

## Common anti-patterns (do not do these)

- `curl -d '{"action":...}'` — inline JSON, will fail with 400.
- `window.scrollBy(0, 500)` — no such tool in kimi-webbridge. Use `evaluate` with `window.scrollTo`.
- Reading the screenshot path from the response and assuming success — read the file to confirm.
- Reporting "all routes work" after only opening `/` — that is one route. Open every route in scope.
- Treating `image.complete === false` as proof of broken — it is also false for `loading="lazy"` images that have not scrolled in yet.
- Using `<media />` to embed a screenshot you wrote but never re-read.

## Tool reference (kimi-webbridge essentials)

| Action | When | Args |
|---|---|---|
| `navigate` | Open a URL in this session's tab group | `url`, `newTab`, `group_title` |
| `find_tab` | Re-select a tab you opened earlier in this session | `url` (exact), `active` (for user tabs) |
| `list_tabs` | See all tabs in this session | none |
| `snapshot` | Read the page's accessibility tree (text + @e refs) | none |
| `click` | Click a button/link by @e ref or CSS | `ref` or `selector` |
| `fill` | Type into input/textarea/contenteditable | `ref`/`selector`, `value` |
| `evaluate` | Run arbitrary JS (use for scroll, audit, state read) | `code` (async/await OK) |
| `cdp` | Raw Chrome DevTools Protocol (escape hatch) | `method`, `params` |
| `screenshot` | Capture viewport or element to file | `format`, `quality`, `path`, optional `selector` |
| `save_as_pdf` | Capture the full page as PDF | `paper_format`, `landscape`, `scale`, `path` |
| `upload` | Upload files to a `<input type="file">` | `selector`, `files[]` |
| `close_tab` | Close the current tab | none |
| `close_session` | Close every tab in this session | none |

Full reference, JSON templates, and diagnostic trees live in [references/](references/).

## Related skills

- `kimi-webbridge` — the underlying browser-automation daemon. Load that skill first if you have not used kimi-webbridge in this session.
- `control-in-app-browser` — the embedded FilePanel browser. Use only when the user explicitly says "use the in-app browser".

## Provenance

This skill was extracted from the in-the-trenches audit work on the competitor-analysis-site itself (the project it ships with). The most representative real case is in [examples/competitor-site-tasks-linear.md](examples/competitor-site-tasks-linear.md).
