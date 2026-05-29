@echo off
echo ==================================================
echo Starting StatIQ Academy Desktop Compiler
echo ==================================================
powershell -ExecutionPolicy Bypass -File "%~dp0build_desktop.ps1"
echo.
echo Press any key to exit...
pause > nul
