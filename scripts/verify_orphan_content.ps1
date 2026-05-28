# Load reader.js
$readerJs = Get-Content -Raw -Path "reader.js"

# Extract lesson files using regex
$matches = [regex]::Matches($readerJs, 'file:\s*"content/([^"]+)"')
$registeredFiles = @()
foreach ($m in $matches) {
    $registeredFiles += $m.Groups[1].Value
}
$registeredFiles = $registeredFiles | Select-Object -Unique

# Find all HTML files in content folder
$contentHtmlFiles = Get-ChildItem -Path "content" -Filter "*.html" | Select-Object -ExpandProperty Name

Write-Host "Found $($contentHtmlFiles.Count) HTML files in content/ directory."
$allOk = $true

foreach ($file in $contentHtmlFiles) {
    if ($registeredFiles -contains $file) {
        # File is registered
    } else {
        $allOk = $false
        Write-Host "[ORPHAN] content/$file exists but is NOT registered in reader.js" -ForegroundColor Yellow
    }
}

if ($allOk) {
    Write-Host "No orphan HTML files in content/ folder!" -ForegroundColor Green
} else {
    Write-Warning "There are some unregistered content HTML files."
    # We do not crash the CI build for orphan files because they are just unreferenced files, 
    # but we print a warning.
}
