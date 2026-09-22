#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

moon check --target js --deny-warn
moon test --target js
moon build --target js --release
cp _build/js/release/build/web/core/core.js dist/rulescope-core.js
if [[ -f _build/js/release/build/web/core/core.js.map ]]; then
  cp _build/js/release/build/web/core/core.js.map dist/rulescope-core.js.map
fi
echo 'RuleScope browser core rebuilt successfully.'

