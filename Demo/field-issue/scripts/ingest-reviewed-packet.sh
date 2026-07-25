#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CASE_ID="FI-2026-00421"
EXPECTED_SOURCE="$ROOT/fab-side/export/$CASE_ID/debug-packet.md"
SOURCE="${1:-$EXPECTED_SOURCE}"
EXPORT_RECEIPT="$ROOT/fab-side/export/$CASE_ID/export-receipt.md"
INBOX_DIR="$ROOT/engineering-side/inbox/$CASE_ID"
INBOX_PACKET="$INBOX_DIR/debug-packet.md"
INGEST_RECEIPT="$INBOX_DIR/ingestion-receipt.md"

checksum() {
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | awk '{print $1}'
  else
    sha256sum "$1" | awk '{print $1}'
  fi
}

fail() {
  printf 'INGESTION REFUSED: %s\n' "$1" >&2
  exit 1
}

[[ -f "$SOURCE" ]] || fail "packet does not exist: $SOURCE"
[[ -f "$EXPORT_RECEIPT" ]] || fail "fab export receipt is missing"

SOURCE_DIR="$(cd "$(dirname "$SOURCE")" && pwd -P)"
SOURCE_REAL="$SOURCE_DIR/$(basename "$SOURCE")"
EXPECTED_DIR="$(cd "$(dirname "$EXPECTED_SOURCE")" && pwd -P)"
EXPECTED_REAL="$EXPECTED_DIR/$(basename "$EXPECTED_SOURCE")"
[[ "$SOURCE_REAL" == "$EXPECTED_REAL" ]] ||
  fail "only the reviewed fab export artifact may be ingested"

"$ROOT/scripts/validate-reviewed-packet.sh" "$SOURCE"

EXPECTED_SHA="$(sed -n 's/^SHA-256: //p' "$EXPORT_RECEIPT")"
EXPECTED_PACKET_ID="$(sed -n 's/^Packet ID: //p' "$EXPORT_RECEIPT")"
EXPECTED_EXPORT_VERSION="$(sed -n 's/^Export version: //p' "$EXPORT_RECEIPT")"
ACTUAL_SHA="$(checksum "$SOURCE")"
ACTUAL_PACKET_ID="$(sed -n 's/^packet_id: //p' "$SOURCE")"
ACTUAL_EXPORT_VERSION="${ACTUAL_PACKET_ID}-${ACTUAL_SHA:0:16}"
[[ -n "$EXPECTED_SHA" ]] || fail "export receipt has no checksum"
[[ -n "$EXPECTED_PACKET_ID" ]] || fail "export receipt has no packet id"
[[ -n "$EXPECTED_EXPORT_VERSION" ]] || fail "export receipt has no version"
[[ "$ACTUAL_SHA" == "$EXPECTED_SHA" ]] ||
  fail "packet checksum does not match the fab export receipt"
[[ "$ACTUAL_PACKET_ID" == "$EXPECTED_PACKET_ID" ]] ||
  fail "packet id does not match the fab export receipt"
[[ "$ACTUAL_EXPORT_VERSION" == "$EXPECTED_EXPORT_VERSION" ]] ||
  fail "packet version does not match the fab export receipt"

mkdir -p "$INBOX_DIR"
cp "$SOURCE" "$INBOX_PACKET"

{
  printf '# Engineering Ingestion Receipt — %s\n\n' "$CASE_ID"
  printf 'Status: accepted\n'
  printf 'Packet ID: %s\n' "$ACTUAL_PACKET_ID"
  printf 'Export version: %s\n' "$ACTUAL_EXPORT_VERSION"
  printf 'Source: reviewed fab export only\n'
  printf 'Artifact: engineering-side/inbox/%s/debug-packet.md\n' "$CASE_ID"
  printf 'SHA-256: %s\n' "$ACTUAL_SHA"
  printf 'Independent boundary validation: passed\n'
  printf 'Human review metadata: verified\n'
  printf 'Raw evidence access: none\n'
} > "$INGEST_RECEIPT"

printf 'INGESTED: %s\n' "$INBOX_PACKET"
printf 'RECEIPT: %s\n' "$INGEST_RECEIPT"
