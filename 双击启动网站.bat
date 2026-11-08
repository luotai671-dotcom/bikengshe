@echo off
chcp 65001 >nul
title 梯子避坑社 - Astro 本地开发服务器启动器 [4321]
cd /d "%~dp0"
cls
echo ======================================================================
echo    正在启动 梯子避坑社 (EscapeTrap) [Astro 本地开发服务]...
echo ======================================================================
echo.
echo 本地访问地址: http://127.0.0.1:4321/ 或 http://localhost:4321/
echo 服务端口就绪后将自动唤起浏览器打开...
echo.
echo (按 Ctrl+C 可停止本地服务)
echo ----------------------------------------------------------------------
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command "for ($i=0; $i -lt 35; $i++) { try { $c = New-Object Net.Sockets.TcpClient('127.0.0.1', 4321); $c.Close(); Start-Process 'http://127.0.0.1:4321/'; break } catch { Start-Sleep -Milliseconds 600 } }"
call npm run dev
pause
