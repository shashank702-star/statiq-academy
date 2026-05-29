# StatIQ Academy Desktop Executable Compiler Script
# Automates checking/installing Python, installing libraries, and building a standalone .exe

$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Green
Write-Host "  StatIQ Academy Desktop Build Compiler  " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# 1. Check if Python is installed
$pythonAvailable = $false
try {
    # Check if python execution returns a valid code
    $null = python --version
    $pythonAvailable = $true
} catch {
    # Try py command
    try {
        $null = py --version
        $pythonAvailable = $true
    } catch {}
}

if (-not $pythonAvailable) {
    Write-Host "Python was not found on your system PATH." -ForegroundColor Yellow
    Write-Host "Would you like to install Python 3 automatically using winget? (Y/N)" -ForegroundColor Yellow
    $ans = Read-Host
    if ($ans -eq "Y" -or $ans -eq "y") {
        Write-Host "Installing Python 3 via winget..." -ForegroundColor Cyan
        winget install --id Python.Python.3 --accept-source-agreements --accept-package-agreements
        Write-Host "`nPython installation triggered! Windows environment PATH updates might require" -ForegroundColor Green
        Write-Host "restarting your shell/IDE or logging out and back in before python becomes available." -ForegroundColor Green
        Write-Host "Once Python is installed, please run this script again." -ForegroundColor Green
        exit 0
    } else {
        Write-Host "Aborted. Python is required to compile the desktop application." -ForegroundColor Red
        exit 1
    }
}

# 2. Check and install dependencies
Write-Host "`nInstalling/Updating required python packages (pywebview, pyinstaller)..." -ForegroundColor Cyan
try {
    # Try using python -m pip
    python -m pip install --upgrade pip
    python -m pip install pywebview pyinstaller
} catch {
    # Fallback to pip directly
    pip install --upgrade pip
    pip install pywebview pyinstaller
}

# 3. Compile the executable
Write-Host "`nCompiling standalone executable..." -ForegroundColor Cyan
Write-Host "Bundling all web assets, content guides, and datasets..." -ForegroundColor Cyan

# Run PyInstaller with all resources bundled inside
# Semicolon (;) is used as the path separator on Windows
pyinstaller --onefile --noconsole --name "StatIQ_Academy" `
  --add-data "index.html;." `
  --add-data "style.css;." `
  --add-data "app.js;." `
  --add-data "reader.html;." `
  --add-data "reader.js;." `
  --add-data "content;content" `
  --add-data "projects;projects" `
  desktop_app.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=========================================" -ForegroundColor Green
    Write-Host " Standalone Executable Compiled Successfully!" -ForegroundColor Green
    Write-Host " Location of Executable: dist/StatIQ_Academy.exe" -ForegroundColor Cyan
    Write-Host " You can now copy/paste this file anywhere (like your Desktop)" -ForegroundColor Green
    Write-Host " and double-click to run it!" -ForegroundColor Green
    Write-Host "=========================================" -ForegroundColor Green
} else {
    Write-Host "Compilation failed. Check the error output above." -ForegroundColor Red
}
