#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAGE="${1:-}"

case "$STAGE" in
  draft|field-response|reviewed|case|verified-result|resolved|approval-record|approved|reuse) ;;
  *)
    printf 'Usage: %s {draft|field-response|reviewed|case|verified-result|resolved|approval-record|approved|reuse}\n' "$0" >&2
    exit 2
    ;;
esac

SOURCE="$ROOT/golden/$STAGE"
[[ -d "$SOURCE" ]] || {
  printf 'Golden stage not found: %s\n' "$SOURCE" >&2
  exit 1
}

cp -R "$SOURCE/." "$ROOT/"
printf 'Loaded golden stage: %s\n' "$STAGE"
