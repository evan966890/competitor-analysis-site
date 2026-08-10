#!/usr/bin/env bash
# audit-images — open a URL in kimi-webbridge, force eager, scroll, audit broken images
# Usage: audit-images <url> <session-name> [<scroll-y>]
# Example: audit-images "http://localhost:7100/#/tasks" qa-tasks 2200
#
# Prints: {total: N, broken: [...]}  (after lazy-load forced)
# Side effects: opens a tab in the session, scrolls, leaves the page loaded

set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: audit-images <url> <session-name> [<scroll-y>]" >&2
  exit 1
fi

URL="$1"
SESS="$2"
SCROLL="${3:-0}"

# 1. Navigate
wb "{\"action\":\"navigate\",\"args\":{\"url\":\"${URL}\",\"newTab\":true,\"group_title\":\"${SESS}\"}}" "$SESS" >/dev/null
sleep 1

# 2. Force eager + scroll
SCROLL_JS="(function(){Array.from(document.querySelectorAll('img[loading=\"lazy\"]')).forEach(i=>{i.loading='eager';if(i.dataset.src)i.src=i.dataset.src});window.scrollTo(0, ${SCROLL});return 'ok';})()"
wb "{\"action\":\"evaluate\",\"args\":{\"code\":\"${SCROLL_JS}\"}}" "$SESS" >/dev/null
sleep 2

# 3. Audit
AUDIT_JS="(function(){const bad=[];Array.from(document.querySelectorAll('img')).forEach(i=>{if(!i.complete||i.naturalWidth===0){bad.push({src:i.src.split('/').slice(-2).join('/'),loading:i.loading,complete:i.complete,w:i.naturalWidth})}});return JSON.stringify({total:document.querySelectorAll('img').length,broken:bad});})()"
RESULT=$(wb "{\"action\":\"evaluate\",\"args\":{\"code\":\"${AUDIT_JS}\"}}" "$SESS")
echo "$RESULT" | jq -r '.data.value | fromjson' 2>/dev/null || echo "$RESULT"
