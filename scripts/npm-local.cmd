@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
set "REPO_ROOT=%SCRIPT_DIR%.."
set "NODE_ROOT=%REPO_ROOT%\.tools\node-v24.14.0-win-x64"
set "NPM_PATH=%NODE_ROOT%\npm.cmd"

if not exist "%NPM_PATH%" (
  echo No se encontro npm en "%NPM_PATH%"
  exit /b 1
)

set "PATH=%NODE_ROOT%;%PATH%"
call "%NPM_PATH%" %*
exit /b %ERRORLEVEL%
