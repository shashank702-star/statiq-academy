# Load index.html and reader.js
$indexHtml = Get-Content -Raw -Path "index.html"
$readerJs = Get-Content -Raw -Path "reader.js"

# Extract lesson IDs from reader.js
$matches = [regex]::Matches($readerJs, 'id:\s*"([^"]+)"')
$lessonIds = @()
foreach ($m in $matches) {
    $lessonIds += $m.Groups[1].Value
}
$lessonIds = $lessonIds | Select-Object -Unique

Write-Host "Found $($lessonIds.Count) unique lesson IDs in reader.js. Checking if they are linked in index.html..."
$allOk = $true

foreach ($id in $lessonIds) {
    # Escape the entire string including the actual question mark
    $pattern = [regex]::Escape("reader.html?topic=$id")
    if ($indexHtml -match $pattern) {
        Write-Host "[OK] $id is linked in index.html" -ForegroundColor Green
    } else {
        $allOk = $false
        Write-Host "[MISSING] $id is NOT linked in index.html" -ForegroundColor Red
    }
}

if ($allOk) {
    Write-Host "All registered lessons are linked in index.html!" -ForegroundColor Green
} else {
    Write-Error "Some registered lessons are missing from index.html"
    exit 1
}
