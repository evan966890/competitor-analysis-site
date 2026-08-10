# Broken image vs lazy-load: the full diagnosis tree

A blank square in a screenshot is **never** proof of a broken image. It is the symptom of one of five different causes, and four of them are not bugs.

## The five causes

| # | Cause | What it looks like | Verify with |
|---|---|---|---|
| 1 | Real 404 / path typo | Persistent broken-icon square | `curl -I <src>` returns 404, `i.naturalWidth === 0` even after scroll |
| 2 | Real 200 but wrong file (e.g., text file renamed `.png`) | Square shows, looks corrupted | `file <path>` says ASCII, or `head -c 8` is not a PNG/JPEG magic |
| 3 | `loading="lazy"` + below the fold | Blank until you scroll into view | After scroll, `i.complete === true && i.naturalWidth > 0` |
| 4 | `loading="lazy"` + IntersectionObserver not yet triggered | Blank even when scrolled near | `i.src` is empty / data-uri, not the real URL |
| 5 | Aggressive cache (server or daemon) | Image worked in earlier session, broken now | Hard-reload with `?r=$RANDOM` |

## The decision tree

```
Seen a blank square?
│
├─ Run the audit query (Step 5 in SKILL.md)
│
├─ broken list is empty after scroll + re-shoot?
│   └─ Cause #3 (lazy). NOT a bug. Mark "OK after scroll".
│
├─ broken list has entries, scroll did not help?
│   │
│   ├─ curl -I <src> returns 200?
│   │   ├─ file <path> is real PNG/JPEG?
│   │   │   └─ Cause #5. Hard-reload with ?r=$RANDOM.
│   │   └─ file <path> is wrong type?
│   │       └─ Cause #2. Re-export or replace the file.
│   │
│   └─ curl -I <src> returns 404?
│       │
│       ├─ The file exists in the source dir with a different name?
│       │   └─ Cause #1. Update the src in source code.
│       │
│       └─ No file with similar name exists?
│           └─ Cause #1. Either: (a) generate the missing asset, (b) point at a schematic, (c) accept the placeholder.
```

## The audit query (use every time)

```js
(function(){
  const bad = [];
  Array.from(document.querySelectorAll('img')).forEach(i => {
    if (!i.complete || i.naturalWidth === 0) {
      bad.push({
        src: i.src.split('/').slice(-2).join('/'),
        loading: i.loading,
        complete: i.complete,
        w: i.naturalWidth
      });
    }
  });
  return JSON.stringify({
    total: document.querySelectorAll('img').length,
    broken: bad
  });
})()
```

**Read the result carefully.** If `bad.length > 0` but every entry has `loading: "lazy"`, the page is **fine** — those are not-yet-scrolled-in images.

**Read `src` carefully too.** If `src` is empty or `data:image/svg+xml,...`, the `<img>` has no real source — that is a code bug, not a lazy-load.

## Three real cases from the competitor-site audit

### Case 1: `01-board.jpeg` (genuine 404)

```js
// Audit output
broken: [
  { src: "linear/01-board.jpeg", loading: "lazy", complete: false, w: 0 }
]
```

```bash
$ ls assets/shots/linear/01-board.jpeg
ls: assets/shots/linear/01-board.jpeg: No such file or directory
```

Source code said `01-board.jpeg`. File was never created. **Cause #1.** Fix: update the src in `data/linearDeepDive.js` to `01-home.jpeg` (the real home screenshot).

### Case 2: lazy load masquerading as broken (false alarm)

```js
// Audit output (before scroll)
broken: [
  { src: "linear/schematic-cycle.png", loading: "lazy", complete: false, w: 0 }
]
```

```bash
$ curl -I http://localhost:7100/assets/shots/linear/schematic-cycle.png
HTTP/1.1 200 OK
Content-Length: 2107458
```

File exists and serves. Image just hadn't scrolled in yet. **Cause #3.** Fix: re-shoot after scrolling; the audit query will then return `broken: []`.

### Case 3: src rewrite through framework (real bug)

```js
// Audit output
broken: [
  { src: "data:image/svg+xml;base64,...", loading: "lazy", complete: true, w: 0 }
]
```

`<img src>` was rewritten to a placeholder by the framework before lazy-load resolved. **Cause #4** (code bug). Fix: in the audit query, look for `i.dataset.src` and force `i.src = i.dataset.src` before counting.

## Lazy-load force-eager pattern

For every route you screenshot:

```js
(function(){
  Array.from(document.querySelectorAll('img[loading="lazy"]')).forEach(i => {
    i.loading = 'eager';
    if (i.dataset.src) i.src = i.dataset.src;   // some frameworks stash here
  });
  // Trigger layout so the IntersectionObserver fires
  window.scrollTo(0, document.body.scrollHeight);
  window.scrollTo(0, 0);
  return 'forced ' + document.querySelectorAll('img[loading]').length;
})()
```

After running this, re-run the audit query. If `bad` is still non-empty, those are real bugs.

## When to give up

Sometimes an image is genuinely missing and you cannot generate it (closed-source product behind login, internal screenshot, etc.). In that case:

- Mark the route as "blocked: requires login" in your report.
- Do **not** show a screenshot that contains the broken square as evidence of a working route.
- Either show a different (working) shot of the route, or do not show one.
