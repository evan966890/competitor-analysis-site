# curl + JSON template for kimi-webbridge

The single most common reason a kimi-webbridge call fails is shell-quoting of the JSON body. The daemon's parser rejects inline JSON with `400 bad_request: invalid JSON: unexpected EOF` when a quote, backslash, or `$` is mangled by bash.

**Rule: every call writes the JSON body to a fresh temp file, then `curl --data-binary @file`.**

## Minimal navigate call

```bash
cat > /tmp/wb-req.json <<'JSON'
{"action":"navigate","args":{"url":"http://localhost:7100/","newTab":true,"group_title":"qa-home"},"session":"qa-home-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command \
  --data-binary @/tmp/wb-req.json
```

**Why `<<'JSON'` (single-quoted heredoc)**: bash will not perform parameter expansion inside single-quoted heredocs, so `${...}` and `$RANDOM` in your code stay literal. Use `<<JSON` only when you intentionally want bash to expand a value before sending.

**Why a fresh file each time**: if you re-use `/tmp/wb-req.json` for parallel calls, two requests may read partial JSON. The daemon does not retry; you will get a confusing 400.

**Random suffix for parallel calls**:
```bash
REQ_ID=$RANDOM
cat > /tmp/wb-req-$REQ_ID.json <<'JSON'
{"action":"list_tabs","args":{},"session":"qa-home-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command \
  --data-binary @/tmp/wb-req-$REQ_ID.json
rm /tmp/wb-req-$REQ_ID.json
```

## All actions in one place

### navigate

```json
{
  "action": "navigate",
  "args": {
    "url": "http://localhost:7100/#/tasks",
    "newTab": true,
    "group_title": "qa-tasks"
  },
  "session": "qa-tasks-1"
}
```

### evaluate (run JS, async/await supported)

```json
{
  "action": "evaluate",
  "args": {
    "code": "window.scrollTo(0, 1500)"
  },
  "session": "qa-tasks-1"
}
```

Long JS — write to a file, then read it into the JSON:

```bash
cat > /tmp/wb-code.js <<'JS'
(function(){
  const bad = [];
  Array.from(document.querySelectorAll('img')).forEach(i => {
    if (!i.complete || i.naturalWidth === 0) {
      bad.push({
        src: i.src.split('/').slice(-2).join('/'),
        loading: i.loading,
        w: i.naturalWidth
      });
    }
  });
  return JSON.stringify({
    total: document.querySelectorAll('img').length,
    broken: bad
  });
})()
JS

# Use jq to safely embed the code as a JSON string
CODE_JSON=$(cat /tmp/wb-code.js | jq -Rs .)
cat > /tmp/wb-req.json <<JSON
{"action":"evaluate","args":{"code":${CODE_JSON}},"session":"qa-tasks-1"}
JSON
curl -s -X POST http://127.0.0.1:10086/command \
  --data-binary @/tmp/wb-req.json
```

**`jq -Rs .`** reads a file as a string (the `-Rs` flag) and outputs it as a JSON string literal (the `.` filter). This is the safest way to embed multi-line, quote-heavy JS.

### screenshot

```json
{
  "action": "screenshot",
  "args": {
    "format": "jpeg",
    "quality": 60,
    "path": "/tmp/shot.jpg"
  },
  "session": "qa-tasks-1"
}
```

`quality` is 0-100 for jpeg, ignored for png. `path` is required; the daemon will not return base64.

### click / fill

```json
{
  "action": "click",
  "args": { "ref": "@e42" },
  "session": "qa-tasks-1"
}
```

`@e` refs come from the previous `snapshot` action. They are scoped to the snapshot — re-snapshot if the page changed.

### list_tabs / find_tab / close_tab / close_session

```json
{ "action": "list_tabs", "args": {}, "session": "qa-tasks-1" }
{ "action": "find_tab", "args": { "url": "http://localhost:7100/#/tasks" }, "session": "qa-tasks-1" }
{ "action": "close_tab", "args": {}, "session": "qa-tasks-1" }
{ "action": "close_session", "args": {}, "session": "qa-tasks-1" }
```

## Error responses

| Response | Meaning | Fix |
|---|---|---|
| `400 bad_request: invalid JSON: unexpected EOF` | Body was mangled by shell | Use `--data-binary @file`, not inline `-d` |
| `404 page not found` | Hit a non-existent daemon endpoint | Use `/command`, not `/api` or `/sessions` |
| `{"ok":false,"error":{"code":"...","message":"..."}}` | Tool-level failure | Read the message; usually auth/selector/ref mismatch |
| `Command timed out after 120 seconds` | The `evaluate` JS blocked too long, or the daemon is hung | Kill the curl, simplify the JS, retry |

## Helper: one-shot wrapper

For long sessions, put this in your `~/.zshrc` or a local file:

```bash
# Usage: wb '{"action":"list_tabs","args":{}}' [session-name]
wb() {
  local body="$1"
  local sess="${2:-default}"
  local tmp=$(mktemp /tmp/wb-XXXXXX.json)
  # Inject the session into the body
  echo "$body" | jq --arg s "$sess" '. + {session: $s}' > "$tmp"
  curl -s -X POST http://127.0.0.1:10086/command \
    --data-binary @"$tmp"
  rm -f "$tmp"
}

# Examples
wb '{"action":"list_tabs","args":{}}' qa-home-1
wb '{"action":"navigate","args":{"url":"http://localhost:7100/","newTab":true,"group_title":"qa-home"}}' qa-home-1
```

You still need `--data-binary @file`, but the file is now mktemp'd and the JSON is well-formed by `jq`.
