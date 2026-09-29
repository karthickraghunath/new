# Banner Image Setup Script
# This script verifies banner images are in the correct location

Write-Host "=== HN Enterprises Banner Setup Verification ===" -ForegroundColor Cyan
Write-Host ""

$logoPath = "d:\hn\logo"
$desktopBanner = "$logoPath\HN_Banner_Export.jpg"
$mobileBanner = "$logoPath\HN_Banner_Mobile.jpg"
$requiredBanner = "$logoPath\BannerImage_HN.png"

Write-Host "Checking required files..." -ForegroundColor Yellow
Write-Host ""

# Check logo directory
if (Test-Path $logoPath) {
    Write-Host "✓ Logo directory exists: $logoPath" -ForegroundColor Green
} else {
    Write-Host "✗ Logo directory NOT found: $logoPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "--- Banner Files Status ---" -ForegroundColor Yellow
Write-Host ""

# Check desktop banner (new)
if (Test-Path $desktopBanner) {
    $size = (Get-Item $desktopBanner).Length / 1MB
    Write-Host "✓ Desktop banner found: HN_Banner_Export.jpg ($([math]::Round($size, 2)) MB)" -ForegroundColor Green
} else {
    Write-Host "✗ Desktop banner NOT found: HN_Banner_Export.jpg" -ForegroundColor Red
    Write-Host "  Expected path: $desktopBanner" -ForegroundColor Yellow
}

# Check mobile banner (new)
if (Test-Path $mobileBanner) {
    $size = (Get-Item $mobileBanner).Length / 1MB
    Write-Host "✓ Mobile banner found: HN_Banner_Mobile.jpg ($([math]::Round($size, 2)) MB)" -ForegroundColor Green
} else {
    Write-Host "⚠ Mobile banner NOT found: HN_Banner_Mobile.jpg (optional)" -ForegroundColor Yellow
    Write-Host "  Desktop version will be used for mobile screens" -ForegroundColor Gray
}

# Check old banner
if (Test-Path $requiredBanner) {
    Write-Host "ℹ Old banner still exists: BannerImage_HN.png (not used)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""

if (!(Test-Path $desktopBanner)) {
    Write-Host "1. Save your new banner image to: $desktopBanner" -ForegroundColor Yellow
    Write-Host "   - Right-click the banner image"
    Write-Host "   - Select 'Save image as...'"
    Write-Host "   - Name: HN_Banner_Export.jpg"
    Write-Host "   - Folder: d:\hn\logo\"
    Write-Host ""
    Write-Host "2. (Optional) Create mobile version:"
    Write-Host "   - Crop or resize banner for mobile (768x500px)"
    Write-Host "   - Save as: HN_Banner_Mobile.jpg"
    Write-Host "   - Folder: d:\hn\logo\"
    Write-Host ""
    Write-Host "3. Verify in browser:"
    Write-Host "   - Visit http://localhost:8000"
    Write-Host "   - Banner should appear full-width"
    Write-Host "   - No grey margins on sides"
    Write-Host ""
} else {
    Write-Host "✓ Banner files are ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Verify in browser:" -ForegroundColor Yellow
    Write-Host "  - Visit http://localhost:8000"
    Write-Host "  - Banner should appear full-width below navbar"
    Write-Host "  - No grey margins on sides"
    Write-Host "  - Test on mobile viewport (DevTools)"
}

Write-Host ""
Write-Host "=== File Listing ===" -ForegroundColor Cyan
Write-Host ""
Get-ChildItem -Path $logoPath -Filter "*.jpg" -o "*.png" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB, 2)}}

Write-Host ""
