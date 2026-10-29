@echo off
chcp 65001 >nul
title 梯子避坑社 - 预览打包版 (Preview)
cls
echo ======================================================================
echo    正在启动 生产包预览服务 (Preview) [http://localhost:5173/]...
echo ======================================================================
echo.
echo 本地访问地址: http://localhost:5173/
echo 服务启动就绪后会自动唤起浏览器打开...
echo.
echo (按 Ctrl+C 可停止预览服务)
echo ----------------------------------------------------------------------
echo.

start "" powershell -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:5173/'"
cmd.exe /c "npm run preview"
pause

