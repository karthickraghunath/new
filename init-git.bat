@echo off
REM Initialize Git repository for HN Enterprises website

cd /d d:\hn

REM Configure git user (global settings)
echo Configuring Git user...
"C:\Program Files\Git\bin\git.exe" config --global user.name "Divya Swathi"
"C:\Program Files\Git\bin\git.exe" config --global user.email "divya@hnenterprises.com"

REM Initialize git repository
echo Initializing Git repository...
"C:\Program Files\Git\bin\git.exe" init

REM Add all files
echo Adding files to staging area...
"C:\Program Files\Git\bin\git.exe" add .

REM Create initial commit
echo Creating initial commit...
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Premium flower export website with dark navy header, gold accents, WCAG accessibility compliance, and responsive design"

REM Display status
echo.
echo Repository initialized successfully!
echo.
"C:\Program Files\Git\bin\git.exe" log --oneline
"C:\Program Files\Git\bin\git.exe" status

pause
