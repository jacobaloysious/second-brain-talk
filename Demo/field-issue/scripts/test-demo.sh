#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PASS_COUNT=0

pass() {
  PASS_COUNT=$((PASS_COUNT + 1))
  printf 'PASS %02d — %s\n' "$PASS_COUNT" "$1"
}

expect_fail() {
  local description="$1"
  shift
  if "$@" >/dev/null 2>&1; then
    printf 'FAIL — expected rejection: %s\n' "$description" >&2
    exit 1
  fi
  pass "$description"
}

cleanup() {
  "$ROOT/scripts/reset-demo.sh" >/dev/null
}
trap cleanup EXIT

"$ROOT/scripts/reset-demo.sh" >/dev/null
cmp -s "$ROOT/seed/debug-packet.md" "$ROOT/fab-side/local-analysis/debug-packet.md"
cmp -s "$ROOT/seed/stage-known-failure-modes.md" \
  "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
cmp -s "$ROOT/seed/software-change.md" \
  "$ROOT/engineering-side/field-issues/FI-2026-00421/software-change.md"
[[ ! -e "$ROOT/engineering-side/verified-input/FI-2026-00421/verified-resolution.md" ]]
pass "reset restores the deterministic baseline"

"$ROOT/scripts/load-golden-stage.sh" draft >/dev/null
expect_fail "unreviewed packet cannot be exported" \
  "$ROOT/scripts/export-reviewed-packet.sh"

"$ROOT/scripts/load-golden-stage.sh" reviewed >/dev/null
"$ROOT/scripts/validate-reviewed-packet.sh" \
  "$ROOT/fab-side/local-analysis/debug-packet.md" >/dev/null
pass "reviewed sanitized packet passes validation"

"$ROOT/scripts/export-reviewed-packet.sh" >/dev/null
"$ROOT/scripts/ingest-reviewed-packet.sh" >/dev/null
cmp -s \
  "$ROOT/fab-side/export/FI-2026-00421/debug-packet.md" \
  "$ROOT/engineering-side/inbox/FI-2026-00421/debug-packet.md"
pass "reviewed packet exports and ingests without raw evidence access"

EXPORT_RECEIPT="$ROOT/fab-side/export/FI-2026-00421/export-receipt.md"
INGEST_RECEIPT="$ROOT/engineering-side/inbox/FI-2026-00421/ingestion-receipt.md"
EXPORT_VERSION="$(sed -n 's/^Export version: //p' "$EXPORT_RECEIPT")"
[[ -n "$EXPORT_VERSION" ]]
grep -Fqx "Export version: $EXPORT_VERSION" "$INGEST_RECEIPT"
grep -Fqx 'Packet ID: FI-2026-00421-packet-v1' "$EXPORT_RECEIPT"
grep -Fqx 'Packet ID: FI-2026-00421-packet-v1' "$INGEST_RECEIPT"
pass "export and ingestion receipts bind packet id, version, and checksum"

expect_fail "engineering side refuses arbitrary fab-side source paths" \
  "$ROOT/scripts/ingest-reviewed-packet.sh" \
  "$ROOT/fab-side/local-analysis/debug-packet.md"

"$ROOT/scripts/load-golden-stage.sh" draft >/dev/null
expect_fail "rejected re-export revokes the previous outbox" \
  "$ROOT/scripts/export-reviewed-packet.sh"
[[ ! -e "$ROOT/fab-side/export/FI-2026-00421/debug-packet.md" ]]
[[ ! -e "$ROOT/fab-side/export/FI-2026-00421/export-receipt.md" ]]
expect_fail "revoked stale outbox cannot be ingested" \
  "$ROOT/scripts/ingest-reviewed-packet.sh"

"$ROOT/scripts/load-golden-stage.sh" reviewed >/dev/null
"$ROOT/scripts/export-reviewed-packet.sh" >/dev/null
sed 's/^Export version: .*/Export version: stale-version/' \
  "$ROOT/fab-side/export/FI-2026-00421/export-receipt.md" \
  > "$ROOT/fab-side/export/FI-2026-00421/export-receipt.tmp"
mv \
  "$ROOT/fab-side/export/FI-2026-00421/export-receipt.tmp" \
  "$ROOT/fab-side/export/FI-2026-00421/export-receipt.md"
expect_fail "receipt version mismatch is rejected at ingestion" \
  "$ROOT/scripts/ingest-reviewed-packet.sh"

"$ROOT/scripts/export-reviewed-packet.sh" >/dev/null
printf '\nTampered after export.\n' >> \
  "$ROOT/fab-side/export/FI-2026-00421/debug-packet.md"
expect_fail "checksum tampering is rejected at ingestion" \
  "$ROOT/scripts/ingest-reviewed-packet.sh"

"$ROOT/scripts/load-golden-stage.sh" reviewed >/dev/null
printf '\nLOT=SECRET-LOT\n' >> "$ROOT/fab-side/local-analysis/debug-packet.md"
expect_fail "restricted identifier pattern is rejected at export" \
  "$ROOT/scripts/export-reviewed-packet.sh"

"$ROOT/scripts/reset-demo.sh" >/dev/null
"$ROOT/scripts/load-golden-stage.sh" case >/dev/null
cmp -s "$ROOT/seed/stage-known-failure-modes.md" \
  "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
pass "case creation leaves shared component knowledge unchanged"

"$ROOT/scripts/load-golden-stage.sh" verified-result >/dev/null
cmp -s "$ROOT/seed/verified-resolution.md" \
  "$ROOT/engineering-side/verified-input/FI-2026-00421/verified-resolution.md"
pass "verified result appears only at the explicit time jump"

"$ROOT/scripts/load-golden-stage.sh" resolved >/dev/null
[[ -f "$ROOT/engineering-side/promotion-queue/FI-2026-00421.md" ]]
SOFTWARE_CHANGE="$ROOT/engineering-side/field-issues/FI-2026-00421/software-change.md"
grep -Fqx 'Pull request: `#1847`' "$SOFTWARE_CHANGE"
grep -Fq 'src/motion/stage-settle-gate.ts' "$SOFTWARE_CHANGE"
grep -Fq 'test/motion/stage-settle-gate.test.ts' "$SOFTWARE_CHANGE"
grep -Fq '`positionStable` and `velocityStable`' "$SOFTWARE_CHANGE"
grep -Fq '`requiredStableSamples` consecutive stable samples' "$SOFTWARE_CHANGE"
grep -Fq 'mock PR `#1847`' \
  "$ROOT/engineering-side/promotion-queue/FI-2026-00421.md"
grep -Fq 'position and velocity' \
  "$ROOT/engineering-side/promotion-queue/FI-2026-00421.md"
cmp -s "$ROOT/seed/stage-known-failure-modes.md" \
  "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
pass "resolution records the two-file guardrail and proposes it without auto-promotion"

expect_fail "promotion is refused without a human approval record" \
  "$ROOT/scripts/promote-approved-knowledge.sh"
"$ROOT/scripts/load-golden-stage.sh" approval-record >/dev/null
"$ROOT/scripts/promote-approved-knowledge.sh" >/dev/null
grep -Fq 'Source case: `FI-2026-00421`' \
  "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
grep -Fq 'mock PR `#1847`' \
  "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
grep -Fq 'position and velocity' \
  "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
grep -Fq 'stage_not_stable' \
  "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
pass "human-approved guardrail promotion is enforced and traceable"

"$ROOT/scripts/load-golden-stage.sh" reuse >/dev/null
REUSE_BRIEF="$ROOT/engineering-side/future-cases/FI-2027-00987/agent-brief.md"
grep -Fq 'FI-2026-00421' "$REUSE_BRIEF"
grep -Fq 'approved component knowledge' "$REUSE_BRIEF"
grep -Fq 'mock PR `#1847`' "$REUSE_BRIEF"
grep -Fq 'stable position and velocity' "$REUSE_BRIEF"
grep -Fq 'stage-settling diagnostic' "$REUSE_BRIEF"
if grep -REqi \
  'LOT=|WAFER=|FAB=|TOOL=|tool-run-0421\.log|sensor-snapshot\.csv|recipe=ALIGN_FINE|settle_time_ms=|target=[0-9]' \
  "$ROOT/engineering-side"; then
  printf 'FAIL — engineering-side contains restricted or raw evidence\n' >&2
  exit 1
fi
pass "six-month-later brief and engineering memory contain no raw evidence"

printf '\nAll %d field-demo checks passed.\n' "$PASS_COUNT"
