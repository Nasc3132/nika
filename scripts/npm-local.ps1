$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptDir '..')
$nodeRoot = Join-Path $repoRoot '.tools\node-v24.14.0-win-x64'
$npmPath = Join-Path $nodeRoot 'npm.cmd'

if (-not (Test-Path $npmPath)) {
  Write-Error "No se encontro npm en $npmPath"
  exit 1
}

$env:PATH = "$nodeRoot;$env:PATH"
& $npmPath @args
exit $LASTEXITCODE
