# Initialize Git repository for HN Enterprises website

Set-Location d:\hn

Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

Write-Host "Configuring Git user..." -ForegroundColor Green
git config user.name "HN Enterprises"
git config user.email "admin@hnenterprises.com"

Write-Host "Adding files to staging area..." -ForegroundColor Green
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: Premium flower export website with dark navy header, gold accents, WCAG accessibility compliance, and responsive design"

Write-Host "`nRepository initialized successfully!`n" -ForegroundColor Green
git log --oneline
Write-Host "`nStatus:`n" -ForegroundColor Green
git status
