#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir"

bundled_root="/Users/jacobaloysious/.cache/codex-runtimes/codex-primary-runtime/dependencies"

if command -v npm >/dev/null 2>&1; then
  package_manager="npm"
elif [[ -x "$bundled_root/bin/fallback/pnpm" && -x "$bundled_root/node/bin/node" ]]; then
  export PATH="$bundled_root/node/bin:$bundled_root/bin/fallback:$PATH"
  package_manager="pnpm"
else
  echo "Node.js 22 or newer is required to run the presenter app." >&2
  echo "Install Node.js, then run this script again." >&2
  exit 1
fi

if [[ ! -d node_modules ]]; then
  "$package_manager" install
fi

"$package_manager" run dev
