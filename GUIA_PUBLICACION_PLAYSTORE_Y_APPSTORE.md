# 🚀 GUÍA OFICIAL PARA SUBIR A GOOGLE PLAY STORE Y APPLE APP STORE
### Ford SafeTeen Co-Drive • APF3 (Semana 12)
### Curso: Diseño de Productos y Servicios - UTP Arequipa

> **Estado del Proyecto:** Tu MVP ya cuenta con los archivos de configuración, certificados de firma digital, proyecto nativo para Android Studio, proyecto nativo para Xcode (iOS) y la Política de Privacidad oficial requerida por las tiendas.

---

## 🤖 PARTE 1: GOOGLE PLAY STORE (ANDROID)

### 1. Requisitos Técnicos Oficiales (Ya Configurados en tu Proyecto)
* **Formato Obligatorio:** Google Play exige el formato **`.aab` (Android App Bundle)**, ya no acepta APKs sueltos.
* **ID de la Aplicación:** `com.ford.safeteen.codrive` (declarado en `capacitor.config.json` y `android_project/app/build.gradle`).
* **Target SDK:** Android 14 (API 34) — cumple con el estándar más reciente de Google.
* **Clave de Firma de Producción:** Ya generamos tu archivo criptográfico:
  `safeteen-release-key.jks` (guardado y configurado en `android_project/app/safeteen-release-key.jks`).
  * **Alias:** `safeteen`
  * **Contraseña:** `safeteen123`
* **Política de Privacidad:** Archivo `privacy.html` creado y listo para alojarse.

### 2. Cómo Generar el archivo `.aab` para Google Play:
1. Abre **Android Studio**.
2. Selecciona **Open** y abre la carpeta:  
   `c:\Users\Ivan\Desktop\DISEÑO DE PRODUCTOS Y SERVICIOS\MVP\android_project`
3. En la barra superior de Android Studio, ve a:  
   👉 **Build > Generate Signed Bundle / APK...**
4. Selecciona **Android App Bundle (.aab)** y presiona *Next*.
5. En *Key store path*, busca:  
   `android_project/app/safeteen-release-key.jks`
   * *Key store password:* `safeteen123`
   * *Key alias:* `safeteen`
   * *Key password:* `safeteen123`
6. Selecciona la variante **Release** y presiona **Finish**.
7. Se generará tu archivo `app-release.aab` en la carpeta `android_project/app/release/`. **Este es el archivo que se sube a Google Play.**

### 3. Ficha Técnica para Copiar y Pegar en Google Play Console:
* **Título de la App (máx 30 caracteres):**  
  `Ford SafeTeen Co-Drive`
* **Descripción Corta (máx 80 caracteres):**  
  `Ecosistema telemático y coaching de manejo familiar para Ford Territory.`
* **Descripción Completa (Lista para la tienda):**  
  ```text
  Ford SafeTeen Co-Drive transforma la experiencia de uso de automóviles compartidos entre padres e hijos adolescentes, comenzando con la SUV Ford Territory Titanium 1.5L EcoBoost.

  A diferencia de las aplicaciones de rastreo continuo invasivo, SafeTeen erradica el espionaje de rutas en mapa y lo reemplaza por la Paz Mental Parental:
  
  1. TELEMETRÍA CAN VEHICULAR DIRECTA: Mide presión hidráulica de frenos, aceleración y marchas sin drenar la batería del smartphone.
  2. CONTEXTUALIZACIÓN CON FORD CO-PILOT360: Reconoce frenadas defensivas ante obstáculos en calzada, protegiendo el Score del joven sin penalizaciones injustas.
  3. PAZ MENTAL POR GEOCERCA: Confirmación automática de llegada segura al aparcar en Park (P) en geocercas pactadas (Campus universitario o colegio).
  4. ACCESIBILIDAD UNIVERSAL (ISO 9241-171): Detección acústica de sirenas de emergencia y alertas visuales/hápticas para conductores con hipoacusia.
  5. CONTRATO DIGITAL FAMILIAR: Acuerdos de autonomía transparentes con base en méritos y Score objetivo (>= 88 pts).
  ```
* **Categoría:** Automóviles y vehículos / Educación.
* **Clasificación de contenido:** Para todos (PEGI 3).
* **URL de Política de Privacidad:** Sube el archivo `privacy.html` a cualquier hosting (o GitHub Pages) y pega su enlace.

---

## 🍏 PARTE 2: APPLE APP STORE (iOS / iPHONE)

### 1. El Requisito Exclusivo de Apple:
Apple exige por normativa que las aplicaciones para iPhone se compilen mediante **Xcode en un sistema operativo macOS (Mac)** y con una cuenta del **Apple Developer Program** ($99 USD/año).

### 2. Lo que ya dejamos listo para iOS en tu carpeta:
Generamos el proyecto nativo oficial de Xcode en la carpeta:  
👉 **`ios/App/App.xcodeproj`** (sincronizado con Capacitor).

### 3. Las 2 Formas de Subir a la App Store:

#### Opción A (Si tú o alguien del equipo tiene una Mac):
1. Copia la carpeta de tu proyecto a una Mac.
2. Abre la terminal en esa carpeta y escribe:
   ```bash
   npx cap open ios
   ```
3. Se abrirá **Xcode**.
4. En *Signing & Capabilities*, selecciona tu equipo de desarrollador de Apple.
5. Ve al menú superior: **Product > Archive**.
6. En la ventana del organizador, haz clic en **Distribute App > App Store Connect > Upload**.

#### Opción B (Compilación Gratuita en la Nube sin tener Mac - CI/CD):
Creamos el archivo `.github/workflows/build-ios.yml` en tu proyecto:
1. Sube este proyecto a un repositorio de **GitHub**.
2. Cada vez que hagas un cambio, GitHub ejecutará automáticamente una **máquina virtual Mac gratuita (macos-latest)** en sus servidores.
3. La máquina virtual compilará el proyecto de Xcode y generará el archivo `.ipa` listo para descargar desde la pestaña **Actions** de GitHub, sin que tengas que comprar una Mac.

### 4. Declaración de Privacidad de Datos en App Store Connect (Nutrition Labels):
Cuando Apple te pregunte qué datos usa la app, marca:
* **Ubicación:** Solo ubicación gruesa/geocerca (no rastreo continuo).
* **Diagnósticos:** Datos de desempeño y fallas mecánicas de frenos del vehículo.
* **Datos vinculados al usuario:** Ninguno con fines publicitarios.

---

## 📋 CHECKLIST RÁPIDO PARA EL EQUIPO

| Elemento Requerido | Estado en el Proyecto | Ubicación del Archivo |
| :--- | :--- | :--- |
| **Clave de Firma Keystore** | ✅ Creada y Verificada | `android_project/app/safeteen-release-key.jks` |
| **Configuración Gradle Release** | ✅ Pre-configurada con firma | `android_project/app/build.gradle` |
| **Proyecto Nativo iOS (Xcode)** | ✅ Generado y Sincronizado | `ios/App/App.xcodeproj` |
| **Flujo en la Nube para Mac (CI/CD)** | ✅ Creado en GitHub Actions | `.github/workflows/build-ios.yml` |
| **Política de Privacidad Oficial** | ✅ Redactada y Validada | `privacy.html` |
| **Configuración Capacitor** | ✅ Vinculada a `com.ford.safeteen.codrive` | `capacitor.config.json` |
