# Load app.js and reader.js
$appJs = Get-Content -Raw -Path "app.js"
$readerJs = Get-Content -Raw -Path "reader.js"

# Extract lesson IDs from reader.js
$matches = [regex]::Matches($readerJs, 'id:\s*"([^"]+)"')
$lessonIds = @()
foreach ($m in $matches) {
    $lessonIds += $m.Groups[1].Value
}
$lessonIds = $lessonIds | Select-Object -Unique

Write-Host "Found $($lessonIds.Count) unique lesson IDs in reader.js. Checking if they exist in app.js search catalog..."
$allOk = $true

foreach ($id in $lessonIds) {
    $pattern = "topic=$id"
    if ($appJs -match $pattern) {
        Write-Host "[OK] $id is registered in app.js search catalog" -ForegroundColor Green
    } else {
        $allOk = $false
        Write-Host "[MISSING] $id is NOT registered in app.js search catalog" -ForegroundColor Red
    }
}

if ($allOk) {
    Write-Host "All registered lessons exist in app.js search catalog!" -ForegroundColor Green
} else {
    Write-Error "Some registered lessons are missing from app.js search catalog"
    exit 1
}
