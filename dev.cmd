@echo off
setlocal
cd /d "%~dp0"

where corepack.cmd >nul 2>nul
if errorlevel 1 (
  echo [ERRO] O Corepack nao foi encontrado neste computador.
  echo Reinstale o Node.js 22 ou superior e execute este arquivo novamente.
  exit /b 1
)

set "COREPACK_NPM_REGISTRY=https://registry.npmmirror.com"

node.exe scripts\dependency-state.cjs check
if errorlevel 1 (
  echo Dependencias ausentes ou desatualizadas. Executando pnpm install...
  call corepack.cmd pnpm install --frozen-lockfile --prefer-offline --registry=https://registry.npmmirror.com
  if errorlevel 1 (
    echo [ERRO] Nao foi possivel instalar as dependencias.
    exit /b 1
  )

  node.exe scripts\dependency-state.cjs write
  if errorlevel 1 exit /b 1
)

call corepack.cmd pnpm run dev -- %*
exit /b %errorlevel%
