# StatIQ Academy Orchestrator Build & Deploy Script
# Runs all verification scripts, and if successful, pushes updates to GitHub.

$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Green
Write-Host " Running StatIQ Academy Auto-Update" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# 1. Check if git is available
try {
    $null = git --version
} catch {
    Write-Error "Git is not installed or not in PATH. Please install Git to automate deployments."
    exit 1
}

# 2. Run Verification Scripts
Write-Host "`n[1/4] Running Lesson Link Verification..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File scripts/verify_links.ps1

Write-Host "`n[2/4] Running Homepage Link Consistency..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File scripts/verify_homepage_links.ps1

Write-Host "`n[3/4] Running Search Catalog Index Check..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File scripts/verify_app_links.ps1

Write-Host "`n[4/4] Auditing Orphan Content Files..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File scripts/verify_orphan_content.ps1

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " All Verification Checks Passed!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# 3. Prompt for Commit Message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$defaultMsg = "Update content and learning resources - $timestamp"
Write-Host "`nEnter commit message (Press Enter for default: '$defaultMsg'):" -ForegroundColor Yellow
$commitMsg = Read-Host
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = $defaultMsg
}

# 4. Git Deployment
Write-Host "`nDeploying changes to GitHub..." -ForegroundColor Cyan
try {
    git add .
    git commit -m $commitMsg
    git push origin main
    Write-Host "`n=========================================" -ForegroundColor Green
    Write-Host " Successfully deployed to GitHub!" -ForegroundColor Green
    Write-Host " If GitHub Pages CI/CD is active, your public site will update shortly." -ForegroundColor Green
    Write-Host "=========================================" -ForegroundColor Green
} catch {
    Write-Host "`nGit Deployment Failed or No Changes to Commit: $_" -ForegroundColor Yellow
}
