#!/usr/bin/env bash
# shoot — capture a screenshot of a URL after force-loading and scrolling
# Usage: shoot <url> <out-path> <session-name> [<scroll-y>]
# Example: shoot "http://localhost:7100/#/tasks" /tmp/route-tasks.jpg qa-tasks 2200
#
# Pipeline: navigate -> wait -> force eager + scroll -> wait -> screenshot
# The output file is what you'll see. Read it back to confirm.

set -euo pipefail

if [[ $# -lt 3 ]]; then
  echo "Usage: shoot <url> <out-path> <session-name> [<scroll-y>]" >&2
  exit 1
fi

URL="$1"
OUT="$2"
SESS="$3"
SCROLL="${4:-0}"

# Cache-buster
RAND=$RANDOM
URL_CB="${URL}${URL:+$([[ "$URL" == *\?* ]] && echo '&' || echo '?')r=$RAND}"

# 1. Navigate
wb "{\"action\":\"navigate\",\"args\":{\"url\":\"${URL_CB}\",\"newTab\":true,\"group_title\":\"${SESS}\"}}" "$SESS" >/dev/null
sleep 2

# 2. Force eager + scroll
SCROLL_JS="(function(){Array.from(document.querySelectorAll('img[loading=\"lazy\"]')).forEach(i=>{i.loading='eager';if(i.dataset.src)i.src=i.dataset.src});window.scrollTo(0, ${SCROLL});return 'ok';})()"
wb "{\"action\":\"evaluate\",\"args\":{\"code\":\"${SCROLL_JS}\"}}" "$SESS" >/dev/null
sleep 2

# 3. Screenshot
RESULT=$(wb "{\"action\":\"screenshot\",\"args\":{\"format\":\"jpeg\",\"quality\":60,\"path\":\"${OUT}\"}}" "$SESS")
echo "$RESULT" | jq -r '.data.path // .data' 2>/dev/null

# 4. Confirm file exists and is non-empty
if [[ -s "$OUT" ]]; then
  echo "saved: $OUT ($(stat -f%z "$OUT" 2>/dev/null || stat -c%s "$OUT" 2>/dev/null) bytes)"
else
  echo "ERROR: $OUT not created or empty" >&2
  echo "$RESULT" >&2
  exit 1
fi
