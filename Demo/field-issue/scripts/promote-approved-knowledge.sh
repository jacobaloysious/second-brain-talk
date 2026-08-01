#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CASE_ID="FI-2026-00421"
PROPOSAL="$ROOT/engineering-side/promotion-queue/$CASE_ID.md"
APPROVAL="$ROOT/engineering-side/promotion-approvals/$CASE_ID.md"
SOFTWARE_CHANGE="$ROOT/engineering-side/field-issues/$CASE_ID/software-change.md"
GOLDEN="$ROOT/golden/approved/engineering-side"

fail() {
  printf 'PROMOTION REFUSED: %s\n' "$1" >&2
  exit 1
}

[[ -f "$PROPOSAL" ]] || fail "promotion proposal is missing"
[[ -f "$APPROVAL" ]] || fail "human approval record is missing"
[[ -f "$SOFTWARE_CHANGE" ]] || fail "case-scoped software change record is missing"
grep -Fq 'mock PR `#1847`' "$PROPOSAL" ||
  fail "promotion proposal is missing reviewed code provenance"
grep -Fq 'position and velocity' "$PROPOSAL" ||
  fail "promotion proposal is missing the settle-gate guardrail"
grep -Fqx 'Status: reviewed, merged, deployed, and verified' "$SOFTWARE_CHANGE" ||
  fail "software change is not verified"
grep -Fq 'test/motion/stage-settle-gate.test.ts' "$SOFTWARE_CHANGE" ||
  fail "software change is missing regression-test evidence"
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
