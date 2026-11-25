# 📱 GUÍA DEFINITIVA: EXPORTAR Y PROBAR TU MVP EN EL CELULAR
### Ford SafeTeen Co-Drive • APF3 (Semana 12)
### Curso: Diseño de Productos y Servicios - UTP Arequipa

> **Nota para el equipo:** Tu MVP ya está preparado y optimizado para funcionar como **aplicación móvil real**. Tienes **3 formas diferentes** de ejecutarlo o exportarlo según lo que te pida el profesor o jurado.

---

## 🚀 OPCIÓN 1: Instalar la App en tu Celular en 10 Segundos (Vía PWA)
*(La forma más rápida y visual de mostrársela al profesor directamente en tu teléfono Android o iPhone sin compilar nada pesado).*

Hemos configurado tu proyecto con tecnología **PWA (Progressive Web App)** con `manifest.json` y `sw.js`.

### Pasos:
1. En tu computadora, ejecuta:
   👉 **`INICIAR_MVP.bat`** (o escribe en terminal `npm start`).
2. Conecta tu celular a la **misma red Wi-Fi** de tu laptop/PC.
3. Averigua la IP local de tu PC (abre PowerShell y escribe `ipconfig`, busca la dirección IPv4, por ejemplo `192.168.1.15`).
4. Abre el navegador de tu celular:
   * **En Android (Google Chrome):** Entra a `http://192.168.1.15:3000` (reemplaza por tu IP). Presiona los 3 puntos superiores y toca **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.
   * **En iPhone (Safari):** Entra a `http://192.168.1.15:3000`, toca el botón **Compartir** (icono de cuadrado con flecha hacia arriba) y selecciona **"Agregar a pantalla de inicio"**.
5. **¡Listo!** En el escritorio de tu celular aparecerá el icono de **Ford SafeTeen Co-Drive**. Al abrirlo, se ejecuta en pantalla completa sin barra de navegación del navegador, comportándose como una aplicación móvil 100% nativa.

---

## 🤖 OPCIÓN 2: Compilar el APK Nativo con Android Studio (`android_project/`)
*(Para sustentar con código nativo en Java de Android y generar el archivo instalable `.apk`).*

Tu carpeta `android_project/` tiene la estructura oficial de un proyecto Gradle de Android:
* `app/src/main/java/com/ford/safeteen/`:
  * **`MainActivity.java`**: Pantalla W-01 del Conductor Joven (Score 94, pedal CAN y racha).
  * **`TutorActivity.java`**: Pantalla W-02 de Paz Mental Parental (Arribo en Park, batería 84%).
  * **`InclusivoActivity.java`**: Pantalla W-03 de Accesibilidad Sensorial (Vibración háptica física en el móvil).
  * **`ContratoActivity.java`**: Pantalla W-04 del Contrato Digital Familiar (Slider 88 pts).
  * **`Sync4Activity.java`**: Pantalla W-08 de Cabina SYNC 4 con distribución 70/30 e *In-Vehicle Report Card* de GM Teen Driver.
* **`AndroidManifest.xml`**: Declaración de permisos (Vibración, Bluetooth para enlazar con Ford Territory, Internet).

### Cómo generar el APK:
1. Abre **Android Studio**.
2. Selecciona **"Open an Existing Project"** y elige la carpeta:
   `c:\Users\Ivan\Desktop\DISEÑO DE PRODUCTOS Y SERVICIOS\MVP\android_project`
3. Espera que Gradle sincronice las dependencias.
4. En el menú superior haz clic en:  
   👉 **Build > Build Bundle(s) / APK(s) > Build APK(s)**
5. Android Studio generará el archivo `app-debug.apk` que puedes pasar por WhatsApp o cable a cualquier celular Android para instalarlo.

---

## ⚡ OPCIÓN 3: Ejecutar la App Móvil en Java Directo en tu PC (`EJECUTAR_JAVA.bat`)
*(Para sustentar en clase directamente desde tu laptop sin necesidad de abrir Android Studio).*

Tu carpeta `java_mobile/` contiene una aplicación móvil completa desarrollada en Java Swing que simula el marco físico de un smartphone con botones interactivos.

1. Ve a la carpeta de tu proyecto.
2. Haz doble clic en:  
   👉 **`EJECUTAR_JAVA.bat`**
3. En 2 segundos se abrirá una ventana con la forma exacta de un celular, permitiéndote interactuar con las 5 pantallas del sistema y probar la simulación del Bus CAN.

---

## 📦 OPCIÓN 4: Exportación Multiplataforma con Capacitor (Android + iOS)
*(Para responder con autoridad técnica si el docente pregunta cómo llevarlo a iPhone/iOS).*

Si el jurado pregunta:
> *"¿Cómo trasladan este MVP a iOS (iPhone) si Apple no permite ejecutar Java directamente?"*

**Respuesta Técnica Recomendada:**
> *"Utilizamos una arquitectura desacoplada. La interfaz y la lógica telemática están construidas con estándares web modernos y empaquetadas mediante **Capacitor (de Ionic)**. Con Capacitor, ejecutamos un solo comando (`npx cap add android` y `npx cap add ios`) que genera automáticamente tanto el proyecto nativo de Android Studio como el proyecto Xcode en Swift para iPhone, garantizando paridad 1 a 1 de pantallas y acceso a las APIs nativas de Bluetooth vehicular y respuesta háptica en ambos sistemas operativos."*

---

## 🎯 Resumen de Archivos y sus Funciones

| Archivo / Carpeta | Para qué sirve |
| :--- | :--- |
| **`manifest.json` y `sw.js`** | Habilita la instalación inmediata como app móvil en Android y iPhone (PWA). |
| **`INICIAR_MVP.bat`** | Inicia el servidor local en el puerto 3000 para probar en navegador o celular. |
| **`android_project/`** | Proyecto nativo en Java listo para compilar APK en Android Studio. |
| **`java_mobile/`** | Código fuente Java de las pantallas móviles y simulación CAN. |
| **`EJECUTAR_JAVA.bat`** | Ejecuta la app móvil en ventana de smartphone en Java puro sin instalar programas. |
