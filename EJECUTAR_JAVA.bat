@echo off
title Ford SafeTeen Co-Drive - Lanzador Java Movil
echo ========================================================
echo   COMPILANDO Y EJECUTANDO MVP EN JAVA (NATIVO)
echo   Ford SafeTeen Co-Drive - APF3 UTP Arequipa
echo ========================================================
echo.
echo 1. Compilando clases Java con javac...
javac -encoding UTF-8 java_mobile\SafeTeenData.java java_mobile\CanBusSimulator.java java_mobile\SafeTeenMobileApp.java
if %errorlevel% neq 0 (
    echo [ERROR] Hubo un problema al compilar los archivos Java.
    pause
    exit /b %errorlevel%
)
echo    Compilacion exitosa (0 errores).
echo.
echo 2. Iniciando aplicacion movil Java...
start java java_mobile.SafeTeenMobileApp
echo.
echo ========================================================
echo   Aplicacion Java iniciada en pantalla.
echo ========================================================
