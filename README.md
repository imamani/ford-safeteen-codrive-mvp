# Ford SafeTeen Co-Drive: Ecosistema Telemático y de Aprendizaje Familiar

### Avance de Proyecto Final 3 (APF3) - Semana 12
**Curso:** Diseño de Productos y Servicios  
**Docente:** Fernández Bernedo Alberto Edu  
**Institución:** Universidad Tecnológica del Perú (Sede Arequipa - 2026)  
**Integrantes del Equipo:**
- Anderson Roque Zevallos – U22321650
- Jack Jhonatan Ramos Quispe – U25225261
- Cesar Del Carpio Achahui – U23254280
- Ivan Benjamin Mamani Villanueva – U23304519

---

## 📌 Descripción del Proyecto y Alcance del MVP

**Ford SafeTeen Co-Drive** es una solución de software telemático vehicular que transforma la dinámica de uso de automóviles compartidos (específicamente la SUV **Ford Territory Titanium 1.5L EcoBoost**). Erradica la vigilancia satelital continua de corte invasivo (tipo *Life360*) y los bloqueos mecánicos punitivos de fábrica (*Ford MyKey*), reemplazándolos por:

1. **Captura Fidedigna del Bus CAN vehicular (500 kbps):** Medición directa de presión hidráulica de freno (0-180 bar), ángulo de dirección, acelerómetros y marchas de transmisión.
2. **Contextualización Inteligente vía Co-Pilot360:** Discriminación entre maniobras de riesgo y frenadas defensivas legítimas (frente a obstáculos o baches en avenidas como la Variante de Uchumayo y Av. Ejército en Arequipa).
3. **Paz Mental Parental Desatendida:** Sustitución del rastreo de rutas por la confirmación automática de llegada segura a geocercas pactadas al engranar Park (P) y monitoreo pasivo de batería del smartphone del joven.
4. **Accesibilidad Sensorial Universal (Norma ISO 9241-171 y WCAG 2.2):** Sustitución integral de pitidos acústicos agresivos por retroalimentación lumínica ambiental en la consola táctil SYNC 4 de 12'', pulsos hápticos en volante y detección inteligente de frecuencias de sirenas de emergencia para conductores con hipoacusia.
5. **Acuerdos de Autonomía Objetivos:** Módulo de Contrato Digital Familiar para autorizar el préstamo de fin de semana con base en méritos y Score objetivo (>= 88 pts).

---

## 🏗️ Matriz de Requerimientos Funcionales (IEEE 830 / MoSCoW) Implementados

| Código | Nombre del Requerimiento | Prioridad | Módulo / Pantalla Asociada |
| :--- | :--- | :--- | :--- |
| **RF-01** | Captura de Telemetría CAN (Freno, Aceleración, Marcha) | Must Have | `js/canBusSimulator.js` y `W-08 (SYNC 4)` |
| **RF-02** | Índice de Conducción Segura (Score 0-100 normalizado) | Must Have | `W-01 (Dashboard Tomás Morales)` |
| **RF-03** | Contextualización Vial Co-Pilot360 (Freno defensivo) | Must Have | `Consola de Simulación` / `canBusSimulator.js` |
| **RF-04** | Arribo Automático por Geocerca (Campus UTP / Park P) | Must Have | `W-02 (Peace of Mind Card - Ricardo)` |
| **RF-05** | Monitoreo Pasivo de Batería Móvil (84% y 0 llamadas) | Must Have | `W-02 (Tutor Familiar)` |
| **RF-06** | Gamificación, Rachas (14 días) e Insignias de Logro | Must Have | `W-01 (Conductor Joven)` |
| **RF-07** | Resumen Semanal Agregado (Sin espionaje de mapa GPS) | Must Have | `W-02 (Tutor Familiar)` |
| **RF-08** | Coaching Silencioso SYNC 4 (Resplandor cian/ámbar) | Should Have | `W-08 (Consola SYNC 4 de 12'')` |
| **RF-09** | Diagnóstico de Salud Mecánica (Pastillas freno 75%) | Should Have | `W-02 (Tutor Familiar)` |
| **RF-10** | Contrato de Negociación Digital Familiar (Slider 88 pts) | Should Have | `W-04 (Contrato Digital)` |
| **RF-11** | Modo Privacidad Temporal (Parada Rápida 15 min) | Could Have | `W-01 / W-07 / Consola CAN` |
| **RF-12** | Alerta Crítica e-Call de Impacto (>3.0G / Airbags) | Must Have | `Consola CAN / Toast Prioritario` |
| **RF-13** | Accesibilidad Sensorial Universal (Pulsos hápticos/luces) | Must Have | `W-03 (Mateo Huarca) y W-08 (Cabina)` |
| **RF-14** | Certificación Telemática Conducción Inclusiva | Should Have | `W-03 (Modal Descargable con Score 95/100)` |

---

## 📐 Distribución de Pantallas Maquetadas (Tabla 13 del Informe)

- **`W-01` Modo Conductor Joven (Figura 7):** Dashboard de Tomás Morales con dial circular de Score (94/100), desglose telemático de 3 factores (40% freno, 30% carril, 30% velocidad), racha de 14 días seguros y 4 insignias.
- **`W-02` Modo Tutor Familiar (Figura 8):** Dashboard de Ricardo Morales centrado en la paz mental: *Peace of Mind Card* [OK], arribo a UTP a las 19:45 hrs, batería al 84%, 0 llamadas al volante, salud de frenos (75%) y botón de aprobación de préstamo.
- **`W-03` Modo Inclusivo (Figura 9):** Módulo de accesibilidad universal para Mateo Huarca (hipoacusia neurosensorial bilateral con pérdida de 65 dB). Toggles para supresión de pitidos, pulsos hápticos en volante, detector de sirenas, botón de prueba y generación de certificado telemático.
- **`W-04` Contrato Digital Familiar (Figura 10):** Negociación objetiva entre Tomás y Ricardo con control deslizante único de Score (88 pts), lista de geocercas activadas y compromiso de autonomía.
- **`W-05` Manual de Uso y Onboarding (Figura 11):** Guía interactiva paso a paso (Pasos 1 al 4) para vincular el vehículo con FordPass y fijar metas de manejo.
- **`W-06` Centro de Ayuda y FAQ (Figura 12):** Buscador inteligente y acordeones con aclaraciones sobre el algoritmo de scoring, privacidad y asistencia Ford 24/7.
- **`W-07` Configuración General (Figura 13):** Administración de chasis VIN, módem 4G MQTT, miembros del hogar y políticas de privacidad telemática.
- **`W-08` Interfaz Vehicular HMI en Cabina (Figura 14):** Experiencia de conducción en la pantalla táctil de 12'' con resplandor cian ambiental, telemetría de frenos y carril, clúster digital perimétrico y franja roja de detección de ambulancia.

---

## 👥 Integración de Aportes del Grupo B (Co-Evaluación Inter-Grupal)

Conforme a la **Tabla 12** del documento, este MVP integra activamente las recomendaciones del Grupo B (*SmartFleet UTP*):
1. **Luces cromáticas perimétricas en el Clúster Digital Frontal:** Permiten al conductor novel percibir alertas por visión periférica sin apartar los ojos del camino.
2. **Control deslizante único de confianza:** Simplificación del contrato familiar a un único slider de Score (88 pts) para no sobrecargar cognitivamente al tutor Ricardo.
3. **Detector acústico de sirenas de emergencia:** Uso de micrófonos de cabina para avisar visualmente la presencia de ambulancias o patrulleros a conductores con hipoacusia.

---

## 🚀 Instrucciones de Ejecución Rápida

### Opción A (1 solo clic - Recomendado):
Ejecuta el archivo:
```bat
INICIAR_MVP.bat
```

### Opción B (Con servidor Node.js nativo sin descargas):
```bash
npm start
```
Abrir: `http://localhost:3000`

### Opción C (Directo en navegador sin terminal):
Abre `index.html` con Google Chrome o Microsoft Edge.
