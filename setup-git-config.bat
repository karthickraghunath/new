@echo off
REM Configure Git user identity

echo Configuring Git user...
"C:\Program Files\Git\bin\git.exe" config --global user.name "Divya Swathi"
"C:\Program Files\Git\bin\git.exe" config --global user.email "divya@hnenterprises.com"

echo.
echo Git configuration complete!
echo.
"C:\Program Files\Git\bin\git.exe" config --global --list | findstr user.

pause
