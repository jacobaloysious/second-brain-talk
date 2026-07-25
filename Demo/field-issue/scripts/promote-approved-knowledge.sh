#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CASE_ID="FI-2026-00421"
PROPOSAL="$ROOT/engineering-side/promotion-queue/$CASE_ID.md"
APPROVAL="$ROOT/engineering-side/promotion-approvals/$CASE_ID.md"
GOLDEN="$ROOT/golden/approved/engineering-side"

fail() {
  printf 'PROMOTION REFUSED: %s\n' "$1" >&2
  exit 1
}

[[ -f "$PROPOSAL" ]] || fail "promotion proposal is missing"
[[ -f "$APPROVAL" ]] || fail "human approval record is missing"
grep -Fqx 'decision: approved' "$APPROVAL" ||
  fail "human decision is not approved"
grep -Eq '^approved_by: "[^"]+"$' "$APPROVAL" ||
  fail "named human approver is missing"
grep -Eq '^approved_at: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"$' "$APPROVAL" ||
  fail "approval timestamp is missing"
grep -Fqx 'proposal: FI-2026-00421' "$APPROVAL" ||
  fail "approval does not reference the expected proposal"

cp -R "$GOLDEN/." "$ROOT/engineering-side/"
printf 'PROMOTED: reviewed reusable guidance for %s\n' "$CASE_ID"
