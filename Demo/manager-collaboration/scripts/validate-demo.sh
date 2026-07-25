#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:---final}"

fail() {
  echo "VALIDATION FAILED: $1" >&2
  exit 1
}

require_file() {
  [[ -f "$1" ]] || fail "missing file: ${1#"$ROOT/"}"
}

require_text() {
  local file="$1"
  local text="$2"
  grep -Fq "$text" "$file" || fail "${file#"$ROOT/"} is missing: $text"
}

reject_text() {
  local file="$1"
  local text="$2"
  if grep -Fq "$text" "$file"; then
    fail "${file#"$ROOT/"} must not contain: $text"
  fi
}

case "$MODE" in
  --initial|--final)
    ;;
  *)
    fail "usage: ./scripts/validate-demo.sh [--initial|--final]"
    ;;
esac

require_file "$ROOT/inbox.md"
require_file "$ROOT/memory/projects/mobile-app-migration.md"
require_file "$ROOT/memory/people/priya.md"
require_file "$ROOT/memory/actions.md"
require_file "$ROOT/memory/receipts.md"
require_file "$ROOT/outputs/manager-follow-through.md"
require_file "$ROOT/outputs/daily-brief.md"
require_file "$ROOT/outputs/stakeholder-draft.md"

require_text "$ROOT/inbox.md" "Capture ID: MC-2026-07-22-01"
require_text "$ROOT/inbox.md" "Priya seemed off today."

[[ ! -e "$ROOT/outputs/one-on-one-prep-priya.md" ]] ||
  fail "legacy one-on-one output should not exist"
[[ ! -e "$ROOT/outputs/delegation-context.md" ]] ||
  fail "legacy delegation output should not exist"
[[ ! -e "$ROOT/outputs/stakeholder-update.md" ]] ||
  fail "legacy stakeholder output should not exist"

if [[ "$MODE" == "--initial" ]]; then
  require_text "$ROOT/memory/receipts.md" "No captures processed yet."
  require_text "$ROOT/outputs/manager-follow-through.md" "# Not Generated Yet"
  require_text "$ROOT/outputs/daily-brief.md" "# Not Generated Yet"
  require_text "$ROOT/outputs/stakeholder-draft.md" "# Not Generated Yet"
  echo "Initial manager demo state is valid."
  exit 0
fi

for output in \
  "$ROOT/outputs/manager-follow-through.md" \
  "$ROOT/outputs/daily-brief.md" \
  "$ROOT/outputs/stakeholder-draft.md"; do
  require_text "$output" "Status: Draft — human review required"
  require_text "$output" "Source receipt: MC-2026-07-22-01"
  require_text "$output" "Reviewer: Manager"
  require_text "$output" "Access scope:"
  require_text "$output" "Review by: 2026-07-29"
  require_text "$output" "Retention review: 2026-08-22"
done

require_text "$ROOT/outputs/manager-follow-through.md" "Rejected — not retained"
require_text "$ROOT/outputs/manager-follow-through.md" "Priya seemed off today"
require_text "$ROOT/outputs/manager-follow-through.md" "Keep uncertain"

if grep -R -Fq "Priya seemed off" "$ROOT/memory"; then
  fail "speculative people judgment leaked into durable memory"
fi
reject_text "$ROOT/outputs/daily-brief.md" "Priya seemed off"
reject_text "$ROOT/outputs/stakeholder-draft.md" "Priya seemed off"

require_text "$ROOT/memory/projects/mobile-app-migration.md" "Rollout risk: Medium"
require_text "$ROOT/memory/projects/mobile-app-migration.md" "may be able to unblock"
require_text "$ROOT/memory/projects/mobile-app-migration.md" "if"
require_text "$ROOT/memory/people/priya.md" "manager promised Priya a staffing review"
require_text "$ROOT/memory/people/priya.md" "No mood, personality, motivation, or performance inference is retained."
require_text "$ROOT/memory/actions.md" "Needs Clarification"

require_text "$ROOT/memory/receipts.md" "## MC-2026-07-22-01"
require_text "$ROOT/memory/receipts.md" "Rejected a speculative people judgment"
require_text "$ROOT/memory/receipts.md" "No personality, mood, motivation, or performance inference was retained."

echo "Final manager demo state is valid."
