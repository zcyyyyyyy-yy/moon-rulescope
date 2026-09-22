$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$extensions = @('.mbt', '.js', '.css', '.html')
$excludedNames = @('rulescope-core.js')
$files = Get-ChildItem -LiteralPath $projectRoot -Recurse -File |
  Where-Object {
    $_.FullName -notlike '*\_build\*' -and
    $_.FullName -notlike '*\.sites-runtime\*' -and
    $extensions -contains $_.Extension -and
    $excludedNames -notcontains $_.Name
  }

$rows = foreach ($file in $files) {
  [PSCustomObject]@{
    File = $file.FullName.Substring($projectRoot.Length + 1)
    Lines = (Get-Content -LiteralPath $file.FullName | Measure-Object -Line).Lines
  }
}

$rows | Sort-Object File | Format-Table -AutoSize
$total = ($rows | Measure-Object -Property Lines -Sum).Sum
Write-Host "Authored source lines: $total"
if ($total -lt 5000) {
  throw "Source line requirement not met: $total < 5000"
}

