<#
.SYNOPSIS
  Automated verification script for GDG Kolkata project.
.DESCRIPTION
  Checks linting and compilation for both frontend and backend directories.
#>

$repoRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
if (-not (Test-Path "$repoRoot\frontend")) {
  $repoRoot = Get-Location
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " GDG Kolkata Verification Runner" -ForegroundColor Cyan
Write-Host " Target Root: $repoRoot" -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan

$frontendPath = Join-Path $repoRoot "frontend"
$backendPath = Join-Path $repoRoot "backend"

$allPassed = $true

# 1. Frontend Lint & Build Check
if (Test-Path $frontendPath) {
  Write-Host "`n[1/2] Verifying Frontend (Next.js)..." -ForegroundColor Yellow
  Push-Location $frontendPath
  try {
    Write-Host "Running: npm run lint" -ForegroundColor DarkGray
    & npm run lint
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Frontend Lint FAILED" -ForegroundColor Red
      $allPassed = $false
    } else {
      Write-Host "Frontend Lint PASSED" -ForegroundColor Green
    }

    Write-Host "Running: npm run build" -ForegroundColor DarkGray
    & npm run build
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Frontend Build FAILED" -ForegroundColor Red
      $allPassed = $false
    } else {
      Write-Host "Frontend Build PASSED" -ForegroundColor Green
    }
  } finally {
    Pop-Location
  }
} else {
  Write-Host "Frontend folder not found at $frontendPath" -ForegroundColor Red
  $allPassed = $false
}

# 2. Backend TypeScript Build Check
if (Test-Path $backendPath) {
  Write-Host "`n[2/2] Verifying Backend (Express/TS)..." -ForegroundColor Yellow
  Push-Location $backendPath
  try {
    Write-Host "Running: npm run build" -ForegroundColor DarkGray
    & npm run build
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Backend Build FAILED" -ForegroundColor Red
      $allPassed = $false
    } else {
      Write-Host "Backend Build PASSED" -ForegroundColor Green
    }
  } finally {
    Pop-Location
  }
} else {
  Write-Host "Backend folder not found at $backendPath" -ForegroundColor Red
  $allPassed = $false
}

Write-Host "`n==========================================" -ForegroundColor Cyan
if ($allPassed) {
  Write-Host " ALL CHECKS PASSED!" -ForegroundColor Green
  exit 0
} else {
  Write-Host " CHECKS FAILED - Inspect errors above." -ForegroundColor Red
  exit 1
}
