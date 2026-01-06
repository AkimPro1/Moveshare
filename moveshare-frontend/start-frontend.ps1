#!/usr/bin/env pwsh
# Start Vite dev server from this script's folder
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir
Write-Host "Starting Vite dev server in: $scriptDir"

if (-not (Test-Path node_modules)) {
  Write-Host "Installing npm dependencies (first-run)..."
  npm install
}

npm run dev
