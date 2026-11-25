# 🚗 GUÍA FÁCIL: CÓMO USAR Y PRESENTAR TU MVP
### Proyecto: Ford SafeTeen Co-Drive (APF3 - Semana 12)
### Curso: Diseño de Productos y Servicios - UTP Arequipa

> **Nota para el equipo:** Esta guía está hecha paso a paso, en lenguaje 100% sencillo y sin tecnicismos raros, para que cualquiera pueda ejecutarlo y exponerlo con éxito.

---

## ⚡ ¿Cómo abrir la aplicación? (Elige la opción que prefieras)

### Opción 1 (La más fácil de todas - 1 solo clic):
1. En la carpeta del proyecto, haz **doble clic** sobre el archivo:  
   👉 **`INICIAR_MVP.bat`**
2. Se abrirá automáticamente tu navegador (Chrome o Edge) con la aplicación funcionando. ¡Listo!

### Opción 2 (Sin servidor, directo al navegador):
1. En la carpeta del proyecto, haz **doble clic** sobre:  
   👉 **`index.html`**
2. Se abrirá directamente como cualquier página web.

### Opción 3 (Si el profesor te pide ejecutarlo por consola / terminal):
1. Abre la terminal en esta carpeta.
2. Escribe:
   ```bash
   npm start
   ```
3. Abre en tu navegador la dirección: **`http://localhost:3000`**

---

## 📱 ¿Qué incluye este MVP? (Las 8 Maquetaciones del Informe)

En la parte superior de la pantalla verás una barra de botones para cambiar de pantalla al instante:

1. **W-01: Conductor Joven (Tomás Morales - 20 años)**
   - Muestra el **Score Global de 94/100** ("Nivel Excelente") en un dial grande.
   - Desglose del Bus CAN: Frenado Suave (96%), Control de Carril (92%) y Velocidad (94%).
   - Racha de 14 días y las medallas de gamificación: *Guardián del Freno*, *Eco-Driver*, *Nocturno*, *Carril Pro*.
   - Botón para compartir el score con su papá (Ricardo).
   - Botón de "Parada Rápida" (15 min de privacidad para compras).

2. **W-02: Tutor Familiar (Ing. Ricardo Morales - 52 años)**
   - Tarjeta **"Peace of Mind Card"** con sello verde `[OK]` que confirma que Tomás llegó al Campus UTP a las 19:45 hrs con el auto apagado y cerrado.
   - Nivel de batería del celular de Tomás (84%) y confirmación de **0 llamadas al volante** (para quitar la angustia de los padres).
   - Semáforo mecánico del Bus CAN: Pastillas de freno al 75% de vida y rendimiento de 42 km/galón.
   - Resumen semanal con gráfico de barras (sin mapas espía satelitales).
   - Botón verde: **"Aprobar Préstamo Fin de Semana"**.

3. **W-03: Modo Inclusivo (Mateo Huarca - 21 años / Hipoacusia)**
   - Interruptores para apagar los pitidos molestos y activar **luces visuales en pantalla** y **vibración háptica en el volante**.
   - Detector inteligente de sirenas de ambulancias por micrófonos.
   - Botón **"Probar Háptico"** que hace vibrar la interfaz.
   - Botón para ver y descargar el **Certificado Telemático Inclusivo (RF-14)** para aseguradoras.

4. **W-04: Contrato Digital Familiar**
   - Barra deslizable (Slider) para negociar la meta de Score (ej. 88 puntos).
   - Lista de destinos pactados (Campus UTP, Hogar Cerro Colorado, Gimnasio) con botón para añadir más.
   - Botón formal: **"Confirmar y Firmar Contrato Digital"**.

5. **W-05: Manual de Uso (Onboarding)**
   - Los 4 pasos ilustrados para vincular la Ford Territory con SYNC 4 y pactar las reglas familiares.

6. **W-06: Centro de Ayuda y FAQ**
   - Buscador y acordeones desplegables que explican cómo se calcula el score (40/30/30), por qué no se espía la ruta y qué pasa si el celular se apaga.
   - Botón de Soporte Oficial Ford 24/7.

7. **W-07: Configuración General**
   - Datos del chasis (VIN), módem 4G LTE MQTT, gestión de perfiles familiares y switches de privacidad.

8. **W-08: Interfaz de Cabina Ford SYNC 4 de 12 Pulgadas**
   - La pantalla táctil del auto con **resplandor cian relajante**.
   - Ruta simple a Campus UTP y telemetría de frenos y carril en vivo.
   - Clúster digital perimétrico frente al volante (sugerencia de los compañeros del Grupo B).
   - Franja roja de aviso ante sirenas de emergencia para conductores con discapacidad.

---

## 🎮 La Consola de Pruebas (Abajo en la pantalla)

En la franja inferior tienes botones para interactuar y demostrar los 14 requerimientos funcionales en vivo:

- 🟢 **Marcha (Drive):** Pone el auto en marcha a 48 km/h por Av. Ejército.
- 🛑 **Freno Defensivo (Co-Pilot360):** Simula que se cruzó un perro en la Variante de Uchumayo. El sistema detecta el obstáculo y **NO le baja puntos a Tomás**.
- 🟡 **Desvío Carril:** El volante vibra y la pantalla se ilumina en ámbar suave sin emitir pitidos estridentes.
- 🚨 **Sirena Externa:** Los micrófonos detectan una ambulancia y proyectan un aviso visual de emergencia para Mateo.
- 🅿️ **Arribo Park (P):** Simula la llegada a Campus UTP y envía la notificación automática al tutor Ricardo con la batería al 84%.
- 💥 **e-Call Impacto:** Simula un impacto fuerte enviando auxilio médico en menos de 3 segundos.
- ⏱️ **Parada Rápida:** Pausa temporal de 15 minutos en farmacia sin alarmas falsas.
- 📄 **Certificado:** Abre el diploma oficial de aptitud inclusiva con Score 95/100.

---

## 🎤 Guión de 2 Minutos para Exponerlo ante el Docente

1. *"Profesor, nuestro proyecto es Ford SafeTeen Co-Drive. Para este MVP desarrollamos una solución telemática basada en el bus CAN de la Ford Territory que elimina el espionaje satelital invasivo y lo reemplaza por confianza objetiva y accesibilidad sensorial."*
2. *(Muestras la pestaña W-01 Tomás)*: *"Aquí el conductor joven ve su Score de 94 puntos y sus medallas ganadas con telemetría real."*
3. *(Muestras la pestaña W-02 Ricardo)*: *"El padre de familia no necesita espiar el mapa de calles; solo recibe esta 'Peace of Mind Card' que confirma que su hijo llegó al Campus UTP en Park (P), con 84% de batería y 0 llamadas al volante."*
4. *(Muestras la pestaña W-03 Mateo)*: *"Para nuestro usuario inclusivo Mateo Huarca, sustituimos todos los pitidos inaudibles por resplandores en pantalla y pulsos hápticos en el volante, además de emitir un certificado de manejo seguro para aseguradoras."*
5. *(Presionas el botón 'Freno Defensivo' en la consola)*: *"Si Tomás frena de golpe porque se cruzó un animal en Uchumayo, las cámaras Co-Pilot360 validan que fue defensivo y no le bajan puntos."*
6. *(Haces clic en 'Modo Wireframe Balsamiq' arriba)*: *"Además, el sistema permite alternar entre el diseño de alta fidelidad y las maquetaciones en formato wireframe Balsamiq que documentamos en el informe."*
