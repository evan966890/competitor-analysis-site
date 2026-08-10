# Kimi-webbridge cheatsheet

Load the `kimi-webbridge` skill first if you have not used it in this session. This is a condensed reference, not a substitute.

## Daemon

- URL: `http://127.0.0.1:10086`
- All calls: `POST /command` with body `{"action":"<tool>","args":{...},"session":"<name>"}`
- Status check: `curl -s http://127.0.0.1:10086/` — 404 means up but no root handler. Don't bother.
- Process check: `lsof -nP -iTCP:10086 -sTCP:LISTEN`

## Sessions

A session is a **group of tabs** owned by one task. Use one session per logical task (route audit, paper intake, etc.) so `list_tabs` and `find_tab` stay coherent.

| Lifecycle event | Action |
|---|---|
| First navigate in a task | `navigate` with `newTab:true, group_title:"<task>"` |
| Come back to an earlier tab | `find_tab` with the full URL you got from `list_tabs` |
| Borrow a tab the user is reading | `find_tab` with `active:true` |
| Done with the whole task | `close_session` — closes every tab in this session |
| Just done with one tab | `close_tab` — closes only the current tab |

## Tabs

- A **tab** is a single browser tab inside a session.
- The **current tab** is the one most recently opened / `find_tab`-selected.
- `snapshot`, `click`, `fill`, `screenshot` all act on the current tab.

## Per-tool notes

### `navigate`

```json
{ "action": "navigate",
  "args": { "url": "http://localhost:7100/#/x",
            "newTab": true,
            "group_title": "qa-x" } }
```

- `newTab:false` reuses the current tab. Useful for SPA hash navigation.
- `newTab:true` always opens a new tab.
- `group_title` shows up in the user's tab strip — make it human-readable.

### `evaluate`

- Supports async/await.
- The return value is serialized to JSON. Return a string of JSON if you have nested data.
- 120s hard timeout. If your code can run longer, break it up.
- DOM is available as `document`. You do not need a `Page` wrapper.

```js
// Useful idioms
window.scrollTo(0, 1500)                               // scroll
window.scrollTo(0, document.body.scrollHeight)          // scroll to bottom
document.querySelectorAll('img[loading="lazy"]')        // find lazy
Array.from(...).map(i => i.src)                         // bulk read
new Promise(r => setTimeout(r, 1500))                   // wait without returning
```

### `screenshot`

- `format`: `jpeg` (default) or `png`.
- `quality`: 0-100 for jpeg. 60 is a good default. 90+ for archive.
- `path`: required, absolute path. Returns the file path; never base64.
- `selector` (optional): a `@e` ref or CSS selector to capture just one element.

### `click` and `fill`

- Take a `ref` (`@eN`) from the latest `snapshot`, OR a CSS selector.
- CSS selectors must be standard CSS — no `:has-text()`, no `text=`, no XPath.
- `fill` works on `<input>`, `<textarea>`, AND `[contenteditable]`. For ProseMirror / Lexical / Slate, `fill` will dispatch the right events automatically.

### `find_tab`

- Pass the **full URL** of the tab you want, not the bare domain. `kimi.com` may miss `www.kimi.com`.
- By default only searches this session's tabs. Use `active:true` to borrow a user tab.
- If `find_tab` errors with "no tab matching … in this session", the page isn't in this session — open it with `navigate newTab:true`.

### `cdp` (escape hatch)

When `evaluate` cannot reach what you need (e.g., auth headers, network interception, secure-context-only APIs), use `cdp` to send raw Chrome DevTools Protocol commands.

```json
{ "action": "cdp",
  "args": { "method": "Network.getCookies",
            "params": { "urls": ["https://example.com"] } } }
```

## When to load vs reuse

- **First use in this session**: load the `kimi-webbridge` skill (it has the full call format and tool args).
- **Subsequent uses**: this cheatsheet is enough. Re-load only if a tool's behavior surprises you.

## Common gotchas

1. **Inline JSON in `curl -d`**: shell quotes the body, daemon 400s. Always `--data-binary @file.json`.
2. **`window.scrollBy`**: not in kimi-webbridge. Use `evaluate` with `window.scrollTo`.
3. **`scroll` action**: not a kimi-webbridge tool. Always use `evaluate`.
4. **Daemon cache**: re-shoot of the same URL may return the stale image. Add `?r=$RANDOM` to force a fresh load.
5. **`@e` refs go stale**: any DOM change invalidates them. Re-`snapshot` first.
6. **Same-session find_tab misses**: if you opened the tab in a different session, `find_tab` will not find it. Re-navigate.
7. **Multi-tab confusion**: if you mix tasks in one session, `list_tabs` shows everyone's tabs. Keep one task per session.
