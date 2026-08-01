#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

rm -rf \
  "$ROOT/fab-side" \
  "$ROOT/engineering-side"

mkdir -p \
  "$ROOT/fab-side/raw-logs" \
  "$ROOT/fab-side/local-analysis" \
  "$ROOT/fab-side/field-input" \
  "$ROOT/fab-side/export" \
  "$ROOT/engineering-side/inbox" \
  "$ROOT/engineering-side/verified-input/FI-2026-00421" \
  "$ROOT/engineering-side/field-issues/FI-2026-00421" \
  "$ROOT/engineering-side/component-knowledge/stage-controller" \
  "$ROOT/engineering-side/component-knowledge/vision-alignment" \
  "$ROOT/engineering-side/promotion-queue" \
  "$ROOT/engineering-side/promotion-approvals" \
  "$ROOT/engineering-side/future-cases/FI-2027-00987"

cp "$ROOT/seed/tool-run-0421.log" "$ROOT/fab-side/raw-logs/tool-run-0421.log"
cp "$ROOT/seed/sensor-snapshot.csv" "$ROOT/fab-side/raw-logs/sensor-snapshot.csv"
cp "$ROOT/seed/operator-note.md" "$ROOT/fab-side/raw-logs/operator-note.md"
cp "$ROOT/seed/onsite-evidence-board.md" "$ROOT/fab-side/ONSITE-EVIDENCE-BOARD.md"
cp "$ROOT/seed/debug-packet.md" "$ROOT/fab-side/local-analysis/debug-packet.md"
cp "$ROOT/seed/clarification-request.md" "$ROOT/fab-side/local-analysis/clarification-request.md"
cp "$ROOT/seed/clarification-response.md" "$ROOT/fab-side/field-input/clarification-response.md"

cp "$ROOT/seed/case.md" "$ROOT/engineering-side/field-issues/FI-2026-00421/case.md"
cp "$ROOT/seed/investigation.md" "$ROOT/engineering-side/field-issues/FI-2026-00421/investigation.md"
cp "$ROOT/seed/case-actions.md" "$ROOT/engineering-side/field-issues/FI-2026-00421/actions.md"
cp "$ROOT/seed/evidence.md" "$ROOT/engineering-side/field-issues/FI-2026-00421/evidence.md"
cp "$ROOT/seed/resolution.md" "$ROOT/engineering-side/field-issues/FI-2026-00421/resolution.md"
cp "$ROOT/seed/case-agent-context-bundle.md" "$ROOT/engineering-side/field-issues/FI-2026-00421/agent-context-bundle.md"
cp "$ROOT/seed/software-change.md" "$ROOT/engineering-side/field-issues/FI-2026-00421/software-change.md"

cp "$ROOT/seed/stage-known-failure-modes.md" "$ROOT/engineering-side/component-knowledge/stage-controller/known-failure-modes.md"
cp "$ROOT/seed/vision-known-failure-modes.md" "$ROOT/engineering-side/component-knowledge/vision-alignment/known-failure-modes.md"
cp "$ROOT/seed/future-case-sanitized-symptom.md" \
  "$ROOT/engineering-side/future-cases/FI-2027-00987/sanitized-symptom.md"

printf 'Demo reset complete: %s\n' "$ROOT"
