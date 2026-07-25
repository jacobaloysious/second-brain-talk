#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CASE_ID="FI-2026-00421"
SOURCE="$ROOT/fab-side/local-analysis/debug-packet.md"
OUT_DIR="$ROOT/fab-side/export/$CASE_ID"
OUT_PACKET="$OUT_DIR/debug-packet.md"
RECEIPT="$OUT_DIR/export-receipt.md"

checksum() {
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | awk '{print $1}'
  else
    sha256sum "$1" | awk '{print $1}'
  fi
}

# A new export attempt revokes any earlier outbox artifact before validation.
# If validation fails, engineering must not be able to ingest a stale packet.
rm -rf "$OUT_DIR"

"$ROOT/scripts/validate-reviewed-packet.sh" "$SOURCE"

mkdir -p "$OUT_DIR"
cp "$SOURCE" "$OUT_PACKET"
PACKET_SHA="$(checksum "$OUT_PACKET")"
PACKET_ID="$(sed -n 's/^packet_id: //p' "$OUT_PACKET")"
[[ -n "$PACKET_ID" ]] || {
  printf 'REJECTED: packet_id is missing\n' >&2
  rm -rf "$OUT_DIR"
  exit 1
}
EXPORT_VERSION="${PACKET_ID}-${PACKET_SHA:0:16}"

{
  printf '# Fab Export Receipt — %s\n\n' "$CASE_ID"
  printf 'Status: exported\n'
  printf 'Packet ID: %s\n' "$PACKET_ID"
  printf 'Export version: %s\n' "$EXPORT_VERSION"
  printf 'Source: fab-side/local-analysis/debug-packet.md\n'
  printf 'Artifact: fab-side/export/%s/debug-packet.md\n' "$CASE_ID"
  printf 'SHA-256: %s\n' "$PACKET_SHA"
  printf 'Boundary validation: passed\n'
  printf 'Human review: approved\n'
  printf 'Permitted payload: reviewed sanitized packet only\n'
} > "$RECEIPT"

printf 'EXPORTED: %s\n' "$OUT_PACKET"
printf 'RECEIPT: %s\n' "$RECEIPT"
