#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKET="${1:-}"

fail() {
  printf 'REJECTED: %s\n' "$1" >&2
  exit 1
}

[[ -n "$PACKET" ]] || fail "packet path is required"
[[ -f "$PACKET" ]] || fail "packet does not exist: $PACKET"

require_line() {
  local pattern="$1"
  local description="$2"
  grep -Eq "$pattern" "$PACKET" || fail "missing $description"
}

require_heading() {
  local heading="$1"
  grep -Fqx "$heading" "$PACKET" || fail "missing required section: $heading"
}

for key in \
  packet_id \
  case_id \
  review_status \
  reviewed_by \
  reviewed_at \
  transfer_approved \
  classification
do
  [[ "$(grep -Ec "^${key}:" "$PACKET")" -eq 1 ]] ||
    fail "metadata key must appear exactly once: $key"
done

require_line '^review_status: approved$' 'approved review status'
require_line '^reviewed_by: "Onsite Field Engineer"$' 'onsite human reviewer'
require_line '^reviewed_at: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"$' 'review timestamp'
require_line '^transfer_approved: true$' 'transfer approval'
require_line '^classification: sanitized$' 'sanitized classification'
require_line '^case_id: FI-2026-00421$' 'expected case id'

for heading in \
  '## Sanitized Summary' \
  '## Relative Event Timeline' \
  '## Observed Patterns' \
  '## Subsystem Hypotheses' \
  '## Confidence' \
  '## Missing Evidence' \
  '## Redactions Applied' \
  '## Field Clarification' \
  '## Review Record'
do
  require_heading "$heading"
done

restricted_patterns=(
  'LOT='
  'WAFER='
  'FAB='
  'TOOL='
  'tool-run-0421\.log'
  'sensor-snapshot\.csv'
  'operator-note\.md'
  '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z (INFO|WARN|ERROR)'
  'target=[0-9]'
  'settle_time_ms='
  'stage_temp_c'
  'x_axis_vibration_mm_s'
  'alignment_delta_um'
  'recipe=ALIGN_FINE'
)

for pattern in "${restricted_patterns[@]}"; do
  if grep -Eqi "$pattern" "$PACKET"; then
    fail "restricted or raw evidence pattern detected: $pattern"
  fi
done

while IFS= read -r raw_line; do
  [[ ${#raw_line} -ge 32 ]] || continue
  if grep -Fqx -- "$raw_line" "$PACKET"; then
    fail "exact raw evidence line detected"
  fi
done < <(
  find "$ROOT/fab-side/raw-logs" -maxdepth 1 -type f -print0 |
    xargs -0 -n 1 sed -e '/^[[:space:]]*$/d'
)

printf 'APPROVED: reviewed sanitized packet passed boundary validation\n'
