#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

rm -rf "$ROOT/fab-side" "$ROOT/field-issues" "$ROOT/component-knowledge" "$ROOT/promotion-queue" "$ROOT/outputs" "$ROOT/engineering-memory"

mkdir -p "$ROOT/fab-side/raw-logs" "$ROOT/fab-side/local-analysis"
mkdir -p "$ROOT/field-issues/FI-2026-00421"
mkdir -p "$ROOT/component-knowledge/stage-controller" "$ROOT/component-knowledge/vision-alignment"
mkdir -p "$ROOT/promotion-queue" "$ROOT/outputs"

cp "$ROOT/seed/tool-run-0421.log" "$ROOT/fab-side/raw-logs/tool-run-0421.log"
cp "$ROOT/seed/sensor-snapshot.csv" "$ROOT/fab-side/raw-logs/sensor-snapshot.csv"
cp "$ROOT/seed/operator-note.md" "$ROOT/fab-side/raw-logs/operator-note.md"
cp "$ROOT/seed/debug-packet.md" "$ROOT/fab-side/local-analysis/debug-packet.md"

cp "$ROOT/seed/case.md" "$ROOT/field-issues/FI-2026-00421/case.md"
cp "$ROOT/seed/investigation.md" "$ROOT/field-issues/FI-2026-00421/investigation.md"
cp "$ROOT/seed/case-actions.md" "$ROOT/field-issues/FI-2026-00421/actions.md"
cp "$ROOT/seed/evidence.md" "$ROOT/field-issues/FI-2026-00421/evidence.md"
cp "$ROOT/seed/resolution.md" "$ROOT/field-issues/FI-2026-00421/resolution.md"
cp "$ROOT/seed/case-agent-context-bundle.md" "$ROOT/field-issues/FI-2026-00421/agent-context-bundle.md"

cp "$ROOT/seed/stage-known-failure-modes.md" "$ROOT/component-knowledge/stage-controller/known-failure-modes.md"
cp "$ROOT/seed/vision-known-failure-modes.md" "$ROOT/component-knowledge/vision-alignment/known-failure-modes.md"

echo "Demo reset complete: $ROOT"
