# Screenshot naming conventions

Filenames encode the **why** of a shot. When you re-open the directory two weeks later, you should be able to tell from the name alone whether a shot is a baseline, a bug, a fix-verification, or a paper-intake — without opening the file.

## Pattern

```
/tmp/<prefix>-<project>-<context>[-<n>].<ext>
```

| Field | Convention | Example |
|---|---|---|
| `prefix` | One of the table below | `bug`, `verify`, `route`, `paper` |
| `project` | Short kebab-case identifier | `linear`, `claudecode`, `wanuai` |
| `context` | One or two words for the page/state | `tasks-1`, `home`, `bug-mc` |
| `n` | Optional sequence number for the same project+context | `1`, `2` |
| `ext` | `jpg` (default), `png` (only for pixel-perfect) | `.jpg` |

## Prefixes

| Prefix | When | Re-shoot? | Notes |
|---|---|---|---|
| `route-<view>` | First-time audit of a single route | Yes, on re-test | `/tmp/route-home.jpg`, `/tmp/route-tasks.jpg` |
| `bug-<short>` | Bug captured while auditing | No (this IS the bug) | `/tmp/bug-home-1.jpg`, `/tmp/bug-sm3.jpg` |
| `verify-<fix>` | After applying a fix, re-shot | Yes, after next change | `/tmp/verify-home-2.jpg` |
| `paper-<proj>-<n>` | Paper / doc-intake from external site | No | `/tmp/paper-opencode-1.jpg` |
| `tasks-<proj>` | Per-project task verification | Yes | `/tmp/tasks-verify.jpg` |
| `intake-<n>` | First screen of a brand-new project | No | `/tmp/intake-1.jpg` |

## Real-world example

From the competitor-site audit on 2026-08-10:

```
/tmp/route-home.jpg            # first audit of home view
/tmp/route-bench.jpg           # first audit of /bench
/tmp/route-buzz.jpg            # first audit of /product/buzz
/tmp/route-sm.jpg              # first audit of /source-matrix
/tmp/tasks-1.jpg               # first /tasks audit (linear broken)
/tmp/tasks-2.jpg               # scroll 600px
/tmp/tasks-3.jpg               # scroll 1500px
/tmp/tasks-fix-1.jpg           # after fix attempt 1
/tmp/tasks-fix-2.jpg           # after fix, scroll 600
/tmp/tasks-fix-3.jpg           # after fix, scroll 1500
/tmp/tasks-fix-4.jpg           # after fix, scroll 2200
/tmp/tasks-verify.jpg          # final re-verification
/tmp/bug-home-1.jpg            # bug screenshot
/tmp/bug-home2.jpg             # second bug shot
/tmp/bug-mc.jpg                # bug after multica
/tmp/bug-sm.jpg, bug-sm2.jpg, bug-sm3.jpg  # source-matrix bugs
```

Reading the names, you can reconstruct the audit arc without reading a single file.

## When to use .png vs .jpg

- **Default: jpg, quality 60.** Small files (200-400KB), readable text, fast to embed in chat.
- **Use png when**: the bug depends on a 1-2px border, a font weight difference, or a specific color value.
- **Use png when**: the image is a diagram / schematic that has been lossily compressed to mush.
- **Use jpg when**: the image is a real photo / product UI shot.

## The "one shot per ask" rule

If the user asked for "a screenshot of the home page", deliver **one** shot — the best one. If you took 6 to get there, only show the final one. Keep the rest in `/tmp/` in case the user asks "what did it look like before the fix?".

Exception: if the user asked "verify the page", show 2-3 shots covering the full route (top, middle, bottom).

## Storage and cleanup

- `/tmp/` is fine for transient work — the OS reclaims it on reboot.
- For shots that the user wants to keep (e.g., as deliverable evidence), copy them into the project's `assets/shots/<project>/` directory and commit them.
- Never write screenshots to `~/Desktop` or `~/Downloads` unless the user explicitly asked. Use the workspace or `/tmp/`.
