#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

"$ROOT/scripts/reset-demo.sh"
"$ROOT/scripts/validate-demo.sh" --initial
"$ROOT/scripts/use-golden.sh"
"$ROOT/scripts/validate-demo.sh" --final
"$ROOT/scripts/reset-demo.sh"
"$ROOT/scripts/validate-demo.sh" --initial

echo "Manager demo reset, fallback, and validation tests passed."
