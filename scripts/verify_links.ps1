# Load reader.js contents
$readerJs = Get-Content -Raw -Path "reader.js"

# Extract lesson files using regex
$matches = [regex]::Matches($readerJs, 'file:\s*"([^"]+)"')
$files = @()
foreach ($m in $matches) {
    $files += $m.Groups[1].Value
}

# Unique files
$files = $files | Select-Object -Unique

Write-Host "Found $($files.Count) unique lesson files referenced in reader.js:"
$allOk = $true

foreach ($file in $files) {
    # Test local file existence
    $localPath = Join-Path (Get-Location) $file
    $localExists = Test-Path $localPath
    
    # Test local web server response using GET method
    $url = "http://localhost:8080/$file"
    $webStatus = "UNKNOWN"
    try {
        $response = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing -TimeoutSec 2
        $webStatus = $response.StatusCode
    } catch {
        $webStatus = "ERROR: $_"
    }

    if ($localExists -and $webStatus -eq 200) {
        Write-Host "[OK] $file (Web Status: $webStatus)" -ForegroundColor Green
    } else {
        $allOk = $false
        Write-Host "[FAIL] $file (Local Exists: $localExists, Web Status: $webStatus)" -ForegroundColor Red
    }
}

if ($allOk) {
    Write-Host "All files successfully verified!" -ForegroundColor Green
} else {
    Write-Error "Verification failed! Some files are missing or could not be served."
    exit 1
}
