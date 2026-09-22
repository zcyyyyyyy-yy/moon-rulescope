$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot
try {
  moon check --target js --deny-warn
  moon test --target js
  moon build --target js --release
  Copy-Item -LiteralPath '_build/js/release/build/web/core/core.js' -Destination 'dist/rulescope-core.js' -Force
  if (Test-Path '_build/js/release/build/web/core/core.js.map') {
    Copy-Item -LiteralPath '_build/js/release/build/web/core/core.js.map' -Destination 'dist/rulescope-core.js.map' -Force
  }
  Write-Host 'RuleScope browser core rebuilt successfully.'
} finally {
  Pop-Location
}

