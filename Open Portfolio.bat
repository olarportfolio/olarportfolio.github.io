@echo off
REM ============================================================
REM  Opens the portfolio the correct way.
REM
REM  Double-click this file instead of index.html.
REM
REM  It starts the little local web server and then opens the
REM  site in your default browser at http://localhost:8778
REM
REM  A black console window will appear - that IS the server.
REM  Leave it open while you browse. Close it when you are done.
REM ============================================================

cd /d "%~dp0"

REM start the server in its own window
start "Portfolio server (close this window to stop)" cmd /c python serve.py

REM give it a moment to come up, then open the browser
timeout /t 2 /nobreak >nul
start "" "http://localhost:8778"
