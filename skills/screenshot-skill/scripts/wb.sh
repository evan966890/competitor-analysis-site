#!/usr/bin/env bash
# wb — one-shot wrapper for kimi-webbridge daemon
# Usage: wb '<json-body>' [session-name]
# Example: wb '{"action":"list_tabs","args":{}}' qa-home-1
#
# Why: shell-quoting inline JSON in `curl -d` fails with
# 400 bad_request from the daemon. This wrapper mktemps the body,
# injects the session, and uses --data-binary.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  cat <<EOF >&2
Usage: wb '<json-body>' [session-name]

  Inject "session" automatically if not present in body.

Examples:
  wb '{"action":"list_tabs","args":{}}' qa-home-1
  wb '{"action":"navigate","args":{"url":"http://localhost:7100/","newTab":true,"group_title":"qa-home"}}' qa-home-1
EOF
  exit 1
fi

BODY="$1"
SESS="${2:-default}"
TMP=$(mktemp /tmp/wb-XXXXXX.json)

# Inject session key if not already present
if ! echo "$BODY" | jq -e 'has("session")' >/dev/null 2>&1; then
  echo "$BODY" | jq --arg s "$SESS" '. + {session: $s}' > "$TMP"
else
  echo "$BODY" > "$TMP"
fi

# Validate JSON before sending
if ! jq -e . "$TMP" >/dev/null 2>&1; then
  echo "wb: invalid JSON body:" >&2
  cat "$TMP" >&2
  rm -f "$TMP"
  exit 1
fi

# Daemon call
curl -s -X POST http://127.0.0.1:10086/command \
  --data-binary @"$TMP"
echo

rm -f "$TMP"
