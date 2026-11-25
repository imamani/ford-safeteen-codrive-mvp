@echo off
title Ford SafeTeen Co-Drive - Lanzador Expo Go
color 0B
echo ========================================================
echo   INICIANDO FORD SAFETEEN CO-DRIVE EN EXPO GO
echo   APF3 - Diseno de Productos y Servicios (UTP Arequipa)
echo ========================================================
echo.

:: 1. Verificar que Node.js este instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] No se encontro Node.js instalado en esta PC.
    echo Descargalo desde https://nodejs.org e intenta nuevamente.
    pause
    exit /b 1
)

:: 2. Verificar si el servidor local de Node.js esta activo
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo [1/3] Iniciando Servidor Web local en puerto 3000...
    start /B node server.js
    timeout /t 2 /nobreak >nul
) else (
    echo [1/3] Servidor Web local ya esta activo en puerto 3000.
)

:: 3. Detectar automaticamente la IP LAN real (ignorando VirtualBox / loopback)
set DETECTED_IP=
for /f "delims=" %%i in ('node expo_app\get-lan-ip.js') do set DETECTED_IP=%%i

if not "%DETECTED_IP%"=="" (
    set REACT_NATIVE_PACKAGER_HOSTNAME=%DETECTED_IP%
    echo [2/3] IP Wi-Fi/LAN detectada automaticamente: %DETECTED_IP%
) else (
    echo [2/3] Usando autodeteccion LAN de Expo...
)

:: 4. Instalar dependencias de Expo automaticamente si es la primera vez en esta PC
cd expo_app
if not exist "node_modules\.bin\expo.cmd" (
    echo [3/3] Instalando dependencias de Expo por primera vez...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] No se pudieron instalar las dependencias de Expo.
        pause
        exit /b 1
    )
)

echo.
echo [3/3] Iniciando servidor de Expo para generar Codigo QR...
echo ========================================================
echo   INSTRUCCIONES PARA TU CELULAR (ANDROID O IPHONE):
echo   1. Conecta tu celular a la misma red Wi-Fi de esta PC.
echo   2. Abre la aplicacion EXPO GO en tu telefono.
echo   3. En Android: Toca "Scan QR Code" y escanea el QR abajo.
echo   4. En iPhone: Abre la camara normal y escanea el QR.
if not "%DETECTED_IP%"=="" echo   5. Web directa en el celular: http://%DETECTED_IP%:3000
echo ========================================================
echo.

npx expo start -c --lan

pause
