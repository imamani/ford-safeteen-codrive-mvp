# 📱 GUÍA RÁPIDA: CÓMO PROBAR TU MVP CON EXPO GO (SDK 58)
### Ford SafeTeen Co-Drive • APF3 (Semana 12)
### Curso: Diseño de Productos y Servicios - UTP Arequipa

> **¡Tu proyecto ya está 100% actualizado y compilado para Expo SDK 58!**  
> Totalmente compatible con la versión más reciente de **Expo Go** que tienes en tu teléfono.

---

## ⚡ Paso a Paso para Probar en tu Teléfono (Android o iPhone)

### 1. Requisito en tu Teléfono y PC:
* Instala **Node.js** en la PC (si estás en una computadora nueva).
* Abre tu aplicación **Expo Go** en tu celular.
* **Importante:** Tu celular debe estar conectado a la **misma red Wi-Fi** que tu PC o laptop (el lanzador `INICIAR_EXPO_GO.bat` detecta automáticamente la IP de tu PC e instala las dependencias de `expo_app/` la primera vez).

---

### 2. Iniciar el Servidor de Expo en tu PC:
Ve a la carpeta del proyecto y haz doble clic en:
👉 **`INICIAR_EXPO_GO.bat`**

O si prefieres abrirlo desde la terminal:
```powershell
cd expo_app
npx expo start -c
```

En la pantalla de tu terminal aparecerá el **Código QR grande de Expo**.

---

### 3. Escanear el Código QR desde tu Teléfono:

#### En Android:
1. Abre la app **Expo Go**.
2. Toca el botón: **"Scan QR Code"**.
3. Apunta la cámara al código QR de la terminal de tu PC.
4. ¡Listo! La app cargará el bundle directamente sin ningún error de versión.

#### En iPhone (iOS):
1. Abre la **Cámara normal de tu iPhone**.
2. Apunta al código QR de la pantalla.
3. Toca la notificación amarilla que dice: **"Abrir en Expo Go"**.
4. ¡Listo! La aplicación se ejecutará en pantalla completa.

---

### 4. ¿Qué podrás probar en tu celular?
* **W-01 (Tomás Morales):** Dial interactivo de Score 94, pedal de freno CAN y consejos de coaching de MOTOsafety.
* **W-02 (Ricardo Morales):** Tarjeta de paz mental parental, llegada confirmada a Campus UTP y nivel de batería al 84%.
* **W-03 (Mateo Huarca):** Modo Inclusivo con alerta de ambulancia y certificado telemático.
* **W-04 (Contrato Digital):** Slider interactivo para negociar los 88 puntos.
* **W-08 (Cabina SYNC 4):** La pantalla de 12.3'' de la Ford Territory con navegación 70/30 en marcha (`D`) y el botón para aparcar en Park (`P`) que despliega el *In-Vehicle Report Card* de GM Teen Driver.

---

### 5. Alternativa Directa sin Expo Go (PWA 100% Nativa):
Si en algún momento no quieres abrir Expo Go, también puedes abrir el navegador de tu celular (Google Chrome o Safari):
1. En tu celular, entra a **`http://<IP-DE-TU-PC>:3000`** (la IP exacta aparece al ejecutar `INICIAR_EXPO_GO.bat`).
2. Toca los tres puntos de Chrome y selecciona **"Instalar aplicación"** / **"Agregar a pantalla principal"**.
3. Se instalará el ícono de **Ford SafeTeen** como una app nativa en tu móvil.
