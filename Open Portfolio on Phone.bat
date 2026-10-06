@echo off
REM ============================================================
REM  Shows the portfolio on your PHONE, straight from this PC.
REM
REM  Use this to check a change before pushing it to GitHub.
REM  Whatever is in this folder right now is what the phone sees.
REM
REM  1. Double-click this file.
REM  2. If Windows asks about the firewall, click "Allow access"
REM     (leave the "Private networks" box ticked).
REM  3. Type the address it prints into your phone's browser.
REM
REM  Your phone must be on the same wifi as this PC.
REM  Leave this window open while you browse. Close it to stop.
REM ============================================================

cd /d "%~dp0"

python serve.py --phone

echo.
echo Server stopped.
pause
