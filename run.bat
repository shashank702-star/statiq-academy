@echo off
title StatIQ Data Academy Server
echo ====================================================
echo  Starting StatIQ Data Academy Local Web Server...
echo ====================================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
