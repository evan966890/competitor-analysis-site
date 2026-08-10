#!/usr/bin/env bash
# route-walk — open a list of routes in sequence, audit each, save one shot per route
# Usage: route-walk <session-name> <out-dir> <route-file>
# Where route-file is one URL per line (comments with # allowed)
#
# Outputs: <out-dir>/<route-slug>.jpg  and a summary on stdout
# Each route is opened with cache-buster, force-eager, and a full scroll to bottom
# before the screenshot.

set -euo pipefail

if [[ $# -lt 3 ]]; then
  echo "Usage: route-walk <session-name> <out-dir> <route-file>" >&2
  exit 1
fi

SESS="$1"
OUT_DIR="$2"
ROUTES="$3"

mkdir -p "$OUT_DIR"

# Use single-quoted JS (no shell expansion), then inject into JSON via jq --arg
SCROLL_JS='(function(){const h=document.body.scrollHeight;const y=Math.floor(h/3);Array.from(document.querySelectorAll("img[loading=\"lazy\"]")).forEach(i=>{i.loading="eager";if(i.dataset.src)i.src=i.dataset.src});window.scrollTo(0,y);return y;})()'
AUDIT_JS='(function(){const bad=[];Array.from(document.querySelectorAll("img")).forEach(i=>{if(!i.complete||i.naturalWidth===0){bad.push({src:i.src.split("/").slice(-2).join("/"),w:i.naturalWidth})}});return JSON.stringify({total:document.querySelectorAll("img").length,broken:bad});})()'

# Build body JSON safely using jq
SCROLL_BODY=$(jq -n --arg code "$SCROLL_JS" --arg s "$SESS" '{action:"evaluate", args:{code:$code}, session:$s}')
AUDIT_BODY=$(jq -n --arg code "$AUDIT_JS" --arg s "$SESS" '{action:"evaluate", args:{code:$code}, session:$s}')

while IFS= read -r line; do
  # skip blank / comment
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  URL=$(echo "$line" | xargs)
  SLUG=$(echo "$URL" | sed -E 's|https?://||;s|[^a-zA-Z0-9]+|-|g;s|^-+||;s|-+$||')
  OUT="$OUT_DIR/${SLUG}.jpg"

  echo "→ $URL"
  RAND=$RANDOM
  URL_CB="${URL}${URL:+$([[ "$URL" == *\?* ]] && echo '&' || echo '?')r=$RAND}"

  # Build navigate body
  NAV_BODY=$(jq -n --arg url "$URL_CB" --arg gt "$SESS" --arg s "$SESS" \
    '{action:"navigate", args:{url:$url, newTab:true, group_title:$gt}, session:$s}')
  echo "$NAV_BODY" > /tmp/wb-tmp.json
  wb /tmp/wb-tmp.json >/dev/null
  sleep 2

  # Force eager + scroll
  echo "$SCROLL_BODY" > /tmp/wb-tmp.json
  wb /tmp/wb-tmp.json >/dev/null
  sleep 2

  # Audit
  echo "$AUDIT_BODY" > /tmp/wb-tmp.json
  AUDIT_RESULT=$(wb /tmp/wb-tmp.json)
  echo "  audit: $(echo "$AUDIT_RESULT" | jq -c '.data.value | fromjson' 2>/dev/null || echo "$AUDIT_RESULT")"

  # Screenshot
  SHOT_BODY=$(jq -n --arg path "$OUT" --arg s "$SESS" \
    '{action:"screenshot", args:{format:"jpeg", quality:60, path:$path}, session:$s}')
  echo "$SHOT_BODY" > /tmp/wb-tmp.json
  wb /tmp/wb-tmp.json >/dev/null

  if [[ -s "$OUT" ]]; then
    echo "  saved: $OUT"
  else
    echo "  ERROR: $OUT not created"
  fi
done < "$ROUTES"

rm -f /tmp/wb-tmp.json

echo
echo "Done. Shots in: $OUT_DIR"
