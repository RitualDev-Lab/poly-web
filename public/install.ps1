# ⚡ Poly Universal Installer for Windows
# Hosted at https://poly.ritualdev.in/install.ps1
# Usage: irm https://poly.ritualdev.in/install.ps1 | iex

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Write-PolyBanner {
    Write-Host @"

   ___       __      
  / _ \___  / /_ __  
 / ___/ _ \/ / // /  
/_/   \___/_/\_, /   
            /___/    

⚡ The Universal Polyglot CLI Package & Dependency Orchestrator

"@ -ForegroundColor Cyan
}

Write-PolyBanner

# Check Architecture
if (-not [Environment]::Is64BitOperatingSystem) {
    Write-Error "Poly standalone binary currently requires a 64-bit Windows operating system."
    exit 1
}

# Resolve Latest Release Tag
$latestTag = "v0.5.1"
try {
    $releaseInfo = Invoke-RestMethod -Uri "https://api.github.com/repos/RitualDev-Lab/poly/releases/latest" -UseBasicParsing -TimeoutSec 10
    if ($releaseInfo -and $releaseInfo.tag_name) {
        $latestTag = $releaseInfo.tag_name
    }
} catch {
    # Fallback to hardcoded current release
}

Write-Host "==> Resolving Release: $latestTag" -ForegroundColor Cyan

$assetName = "poly-windows-x64.zip"
$downloadUrl = "https://github.com/RitualDev-Lab/poly/releases/download/$latestTag/$assetName"
$checksumUrl = "https://github.com/RitualDev-Lab/poly/releases/download/$latestTag/checksums.txt"

# Temporary Download Directory
$tempDir = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $tempDir | Out-Null

try {
    $zipPath = Join-Path $tempDir $assetName
    $checksumPath = Join-Path $tempDir "checksums.txt"

    Write-Host "==> Downloading $assetName..." -ForegroundColor Cyan
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath -UseBasicParsing

    try {
        Invoke-WebRequest -Uri $checksumUrl -OutFile $checksumPath -UseBasicParsing
    } catch {
        # Checksum file optional download
    }

    # Verify SHA-256 Checksum if available
    if (Test-Path $checksumPath) {
        Write-Host "==> Verifying SHA-256 integrity..." -ForegroundColor Cyan
        $checksumContent = Get-Content $checksumPath
        $expectedLine = $checksumContent | Where-Object { $_ -match $assetName } | Select-Object -First 1
        if ($expectedLine) {
            $expectedHash = ($expectedLine -split "\s+")[0].Trim().ToLower()
            $actualHash = (Get-FileHash -Path $zipPath -Algorithm SHA256).Hash.ToLower()

            if ($expectedHash -ne $actualHash) {
                Write-Error "Checksum verification failed!`nExpected: $expectedHash`nActual:   $actualHash"
                exit 1
            }
            Write-Host "✔ Checksum verified successfully." -ForegroundColor Green
        }
    }

    # Destination Directory
    $installDir = Join-Path $env:LOCALAPPDATA "Programs\poly"
    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    }

    Write-Host "==> Installing poly into $installDir..." -ForegroundColor Cyan
    Expand-Archive -Path $zipPath -DestinationPath $installDir -Force

    $polyExe = Join-Path $installDir "poly.exe"
    if (-not (Test-Path $polyExe)) {
        Write-Error "Installation failed: poly.exe was not found in extracted archive."
        exit 1
    }

    # Configure User PATH
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($userPath -split ";" -notcontains $installDir) {
        Write-Host "==> Adding $installDir to User PATH..." -ForegroundColor Cyan
        $newPath = if ([string]::IsNullOrEmpty($userPath)) { $installDir } else { "$userPath;$installDir" }
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        $env:Path = "$env:Path;$installDir"
        Write-Host "✔ Added to User PATH environment variable." -ForegroundColor Green
    }

    Write-Host "`n✔ Successfully installed Poly ($latestTag)!`n" -ForegroundColor Green

    # Verify execution
    try {
        & $polyExe --version
    } catch {
        # Executable ran
    }

    Write-Host @"

🚀 Get started:
   poly doctor           Diagnose toolchains & compilers
   poly add npm:zod      Add polyglot dependencies
   poly --help           Explore full command suite

Documentation: https://poly.ritualdev.in
"@ -ForegroundColor Gray

} finally {
    if (Test-Path $tempDir) {
        Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue
    }
}
