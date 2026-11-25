@echo off
title Ford SafeTeen Co-Drive - Lanzador Expo Go
color 0B
echo ========================================================
echo   INICIANDO FORD SAFETEEN CO-DRIVE EN EXPO GO
echo   APF3 - Diseno de Productos y Servicios (UTP Arequipa)
echo ========================================================
echo.

:: 1. Verificar si el servidor local de Node.js esta activo
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo [1/2] Iniciando Servidor Web local en puerto 3000...
    start /B node server.js
    timeout /t 2 /nobreak >nul
) else (
    echo [1/2] Servidor Web local ya esta activo en puerto 3000.
)

echo.
echo [2/2] Iniciando servidor de Expo para generar Codigo QR...
echo.
echo ========================================================
echo   INSTRUCCIONES PARA TU CELULAR (ANDROID O IPHONE):
echo   1. Conecta tu celular a la misma red Wi-Fi de tu PC.
echo   2. Abre la aplicacion EXPO GO en tu telefono.
echo   3. En Android: Toca "Scan QR Code" y escanea el QR abajo.
echo   4. En iPhone: Abre la camara normal y escanea el QR.
echo ========================================================
echo.

:: Forzar la IP de la interfaz Wi-Fi activa (ignora adaptadores virtuales de VirtualBox)
set REACT_NATIVE_PACKAGER_HOSTNAME=10.95.97.137

cd expo_app
npx expo start -c --lan

pause
