# Ecosistema de Wireframes en Balsamiq: Ford SafeTeen Co-Drive

### Proyecto Final 3 (APF3) - Semana 12
**Curso:** Diseño de Productos y Servicios  
**Docente:** Fernández Bernedo Alberto Edu  
**Institución:** Universidad Tecnológica del Perú (Sede Arequipa - 2026)  
**Equipo de Proyecto:**
- Anderson Roque Zevallos – U22321650
- Jack Jhonatan Ramos Quispe – U25225261
- Cesar Del Carpio Achahui – U23254280
- Ivan Benjamin Mamani Villanueva – U23304519

---

## 📁 Contenido de esta Carpeta (`pantallas en balsamiq`)

Esta carpeta contiene el ecosistema completo de maquetación en **baja y media fidelidad estilo Balsamiq Mockups** para el proyecto **Ford SafeTeen Co-Drive**, alineado con la **Tabla 13** y las **Figuras 7 a 14** del documento de informe oficial:

| Código | Archivo Base | Figura e Informe | Actor / Rol | Requerimientos |
| :--- | :--- | :--- | :--- | :--- |
| **W-01** | `W01_Dashboard_Conductor_Joven` | **Figura 7 (Pág. 43)** | Tomás Morales (20) | RF-01, RF-02, RF-06 |
| **W-02** | `W02_Tutor_Familiar_PeaceOfMind` | **Figura 8 (Pág. 44)** | Ricardo Morales (52) | RF-04, RF-05, RF-07, RF-09 |
| **W-03** | `W03_Modo_Inclusivo_Accesibilidad`| **Figura 9 (Pág. 45)** | Mateo Huarca (21) | RF-13, RF-14, ISO 9241-171 |
| **W-04** | `W04_Contrato_Digital_Familiar` | **Figura 10 (Pág. 46)**| Tutor y Conductor Joven | RF-10 |
| **W-05** | `W05_Manual_Uso_Onboarding` | **Figura 11 (Pág. 48)**| Nuevas Familias | Inducción y Adopción |
| **W-06** | `W06_Centro_Ayuda_FAQ` | **Figura 12 (Pág. 50)**| Familia / Soporte Ford | Transparencia y FAQ 24/7 |
| **W-07** | `W07_Configuracion_General` | **Figura 13 (Pág. 52)**| Tutor Administrador | VIN, Módem y Privacidad |
| **W-08** | `W08_Cabina_SYNC4_HMI` | **Figura 14 (Pág. 53)**| Conductor en Marcha | RF-01, RF-08, RF-13 |

---

## 🛠️ Formatos Incluidos y Cómo Usarlos

### 1. Documento PDF Compilado Oficial (10 Páginas)
- **Archivo:** `Ford_SafeTeen_CoDrive_Wireframes_Balsamiq.pdf`
- **Uso:** Documento PDF ejecutivo de 10 páginas listo para imprimir, enviar al docente o adjuntar al informe final. Contiene la portada formal corporativa, tabla de contenido, fichas técnicas completas con requerimientos IEEE 830 / MoSCoW / BDD y las 8 pantallas vectoriales a página completa.

### 2. Archivo de Proyecto Oficial (`.bmpr`)
- **Archivo:** `Ford_SafeTeen_CoDrive_MVP.bmpr`
- **Uso:** Es el formato nativo SQLite utilizado por **Balsamiq Wireframes Desktop** y **Balsamiq Cloud**. Puedes abrirlo con doble clic o importarlo desde el menú *Project -> Import...*. Contiene los 8 wireframes organizados con su metadata.

### 3. Archivos Individuales XML (`.bmml`)
- **Archivos:** `W01_Dashboard_Conductor_Joven.bmml` al `W08_Cabina_SYNC4_HMI.bmml`
- **Uso:** Formato clásico XML de Balsamiq Mockups 3. Puedes arrastrar cualquier archivo `.bmml` a tu lienzo de Balsamiq para editar los componentes, textos o posiciones.

### 4. Imágenes Vectoriales Alta Resolución (`.svg`)
- **Archivos:** `W01_Dashboard_Conductor_Joven.svg` al `W08_Cabina_SYNC4_HMI.svg`
- **Uso:** Renderizan el boceto exacto de Balsamiq (con fuentes manuscritas, trazos orgánicos, sombras, botones y notas adhesivas amarillas). Se pueden arrastrar e insertar directamente en **Microsoft Word, PowerPoint, Google Docs o presentaciones ejecutivas** sin ninguna pérdida de calidad o pixelado.

### 5. Visor Web Interactivo (`index.html`)
- **Archivo:** `index.html` dentro de esta carpeta.
- **Uso:** Ábrelo con cualquier navegador (Chrome, Edge) para explorar interactivamente todas las pantallas, cambiar de pestañas, leer la ficha técnica de cada wireframe y descargar los archivos individualmente con un solo clic.

---

## 🌟 Principales Decisiones de Diseño Reflejadas

1. **Desacoplamiento de Certeza y Espionaje (W-01 y W-02):** Se suprime por completo el mapa satelital continuo en tiempo real (evitando el síndrome de *padre policía* tipo Life360). En su lugar, el tutor recibe la *Peace of Mind Card* al engranar Park (P) y el estado de batería del joven (84%).
2. **Inclusión Sensorial Universal (W-03 y W-08):** Adaptación completa para **Mateo Huarca** (conductor novel con hipoacusia de 65 dB). Se sustituyen los pitidos agudos de cabina por pulsos hápticos en el volante y un detector visual inteligente de sirenas de emergencia en la pantalla SYNC 4 de 12''.
3. **Contrato de Negociación por Méritos (W-04):** Control deslizante único de Score (88 pts) y geocercas pactadas que aprueban automáticamente el préstamo de fin de semana, eliminando las disputas verbales subjetivas en la familia.