#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

rm -rf "$ROOT/memory" "$ROOT/outputs"
mkdir -p "$ROOT/memory/projects" "$ROOT/memory/people" "$ROOT/outputs"

cp "$ROOT/seed/inbox.md" "$ROOT/inbox.md"
cp "$ROOT/seed/mobile-app-migration.md" "$ROOT/memory/projects/mobile-app-migration.md"
cp "$ROOT/seed/priya.md" "$ROOT/memory/people/priya.md"
cp "$ROOT/seed/actions.md" "$ROOT/memory/actions.md"
cp "$ROOT/seed/receipts.md" "$ROOT/memory/receipts.md"
cp "$ROOT/seed/placeholder.md" "$ROOT/outputs/manager-follow-through.md"
cp "$ROOT/seed/placeholder.md" "$ROOT/outputs/daily-brief.md"
cp "$ROOT/seed/placeholder.md" "$ROOT/outputs/stakeholder-draft.md"

echo "Manager collaboration demo reset complete: $ROOT"
