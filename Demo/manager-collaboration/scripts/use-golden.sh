#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROCESS="$ROOT/golden/after-process/memory"
SURFACE="$ROOT/golden/after-surface/outputs"

if [[ ! -d "$PROCESS" || ! -d "$SURFACE" ]]; then
  echo "Golden snapshots are incomplete." >&2
  exit 1
fi

rm -rf "$ROOT/memory" "$ROOT/outputs"
mkdir -p "$ROOT/memory" "$ROOT/outputs"

cp -R "$PROCESS/." "$ROOT/memory/"
cp -R "$SURFACE/." "$ROOT/outputs/"

echo "Golden manager demo state restored: $ROOT"
