/**
 * Script para compilar todas las pantallas de Balsamiq en un documento PDF profesional
 * Ford SafeTeen Co-Drive - APF3
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = path.join(__dirname, 'pantallas en balsamiq');

const pantallas = [
    {
        codigo: 'W-01',
        archivoId: 'W01_Dashboard_Conductor_Joven',
        titulo: 'Modo Conductor Joven (Dashboard Post-Viaje y Gamificación)',
        figura: 'Figura 7 (Pág. 43 del Informe APF3)',
        actor: 'Tomás Morales (20 años) - Conductor Novel',
        reqs: 'RF-01, RF-02, RF-06',
        proposito: 'Visualización post-viaje del Score global normalizado (94/100, Nivel Excelente), desglosado en las sub-métricas canónicas del bus CAN: Frenado Suave (96%), Mantenimiento de Carril (92%) y Velocidad Reglamentaria (94%). Erradica el espionaje de rutas e integra dinámicas de refuerzo positivo mediante racha de 14 días y medallas de logro.'
    },
    {
        codigo: 'W-02',
        archivoId: 'W02_Tutor_Familiar_PeaceOfMind',
        titulo: 'Modo Tutor Familiar (Peace of Mind Dashboard, Arribo y Batería)',
        figura: 'Figura 8 (Pág. 44 del Informe APF3)',
        actor: 'Ing. Ricardo Morales (52 años) - Tutor Parental y Propietario',
        reqs: 'RF-04, RF-05, RF-07, RF-09',
        proposito: 'Consola ejecutiva centrada en la paz mental parental: Tarjeta destacada [OK] con arribo confirmado a geocerca (Campus UTP a las 19:45 hrs con palanca en Park), estado pasivo de batería del smartphone del hijo (84%), reporte de cero llamadas en ruta y semáforo preventivo de desgaste mecánico (pastillas de freno al 75%).'
    },
    {
        codigo: 'W-03',
        archivoId: 'W03_Modo_Inclusivo_Accesibilidad',
        titulo: 'Modo Inclusivo & Accesibilidad Sensorial Universal',
        figura: 'Figura 9 (Pág. 45 del Informe APF3)',
        actor: 'Mateo Huarca (21 años) - Conductor con Hipoacusia Neurosensorial (-65 dB)',
        reqs: 'RF-13, RF-14 • Normas ISO 9241-171 y WCAG 2.2 AA',
        proposito: 'Eliminación total de barreras acústicas: Sustituye pitidos agudos estridentes por iluminación perimetral en pantalla central y pulsos hápticos vibratorios en volante y asiento. Incorpora detector de frecuencias de sirenas externas de emergencias y emisión del Certificado Telemático Inclusivo (Score 95/100).'
    },
    {
        codigo: 'W-04',
        archivoId: 'W04_Contrato_Digital_Familiar',
        titulo: 'Contrato Digital Familiar y Gestión de Geocercas Pactadas',
        figura: 'Figura 10 (Pág. 46 del Informe APF3)',
        actor: 'Tutor Ricardo Morales ⇄ Conductor Novel Tomás Morales',
        reqs: 'RF-10 (Negociación Objetiva y Formalización Digital)',
        proposito: 'Herramienta de concertación intergeneracional previa: Control deslizante único de meta de Score (88 pts recomendado) y selección de geocercas autorizadas con auto check-in (UTP, Hogar, Gimnasio). El cumplimiento de la meta genera la autorización digital automática del auto sin discusiones.'
    },
    {
        codigo: 'W-05',
        archivoId: 'W05_Manual_Uso_Onboarding',
        titulo: 'Manual de Uso y Onboarding Familiar Paso a Paso',
        figura: 'Figura 11 (Pág. 48 del Informe APF3)',
        actor: 'Nuevos Usuarios y Miembros del Hogar',
        reqs: 'Inducción de Usuario y Adopción sin Fricción Tecnológica',
        proposito: 'Guía didáctica estructurada en 4 pasos secuenciales para acelerar la curva de aprendizaje familiar: 1) Sincronización telemática CAN vía VIN de la Territory, 2) Pacto del Contrato Digital, 3) Conducción en modo silencioso no punitivo, y 4) Confirmación automática de llegada segura y Score.'
    },
    {
        codigo: 'W-06',
        archivoId: 'W06_Centro_Ayuda_FAQ',
        titulo: 'Centro de Ayuda, Soporte Técnico y Preguntas Frecuentes (FAQ)',
        figura: 'Figura 12 (Pág. 50 del Informe APF3)',
        actor: 'Núcleo Familiar / Mesa de Ayuda Ford 24/7',
        reqs: 'Transparencia de Datos y Asistencia Continua',
        proposito: 'Módulo de resolución de desconfianzas y dudas operativas: Buscador contextual y tarjetas desplegables que explican el algoritmo de cálculo del Score (40% freno, 30% carril, 30% velocidad), la política de cero mapas espías y las contingencias por batería descargada.'
    },
    {
        codigo: 'W-07',
        archivoId: 'W07_Configuracion_General',
        titulo: 'Configuración General del Ecosistema y Privacidad Familiar',
        figura: 'Figura 13 (Pág. 52 del Informe APF3)',
        actor: 'Tutor Administrador del Ecosistema',
        reqs: 'Seguridad, Gestión de Identidades y Cifrado MQTT',
        proposito: 'Panel administrativo centralizado: Vinculación del chasis VIN y módem 4G LTE, administración de perfiles familiares (Tomás, Ricardo, Mateo) y activación de políticas de privacidad para ocultar mapas de recorrido y habilitar tolerancia de paradas de conveniencia (15 min).'
    },
    {
        codigo: 'W-08',
        archivoId: 'W08_Cabina_SYNC4_HMI',
        titulo: 'Interfaz Vehicular HMI en Cabina (Ford SYNC 4 de 12 Pulgadas)',
        figura: 'Figura 14 (Pág. 53 del Informe APF3)',
        actor: 'Conductor al Volante en Marcha (Experiencia en Cabina)',
        reqs: 'RF-01, RF-08, RF-13 (Ergonomía HMI y Accesibilidad)',
        proposito: 'Experiencia física a bordo: Consola táctil de 12 pulgadas con marco de luz ambiental cian perimetral (coaching silencioso sin velocímetros acusatorios), panel dividido con navegación sobria hacia geocerca y telemetría CAN en vivo, complementado con banner rojo accesible ante sirenas de ambulancias.'
    }
];

// Leer contenido de los 8 SVGs
const svgContents = {};
pantallas.forEach(p => {
    const svgPath = path.join(baseDir, `${p.archivoId}.svg`);
    if (fs.existsSync(svgPath)) {
        // Remover el header XML <?xml...?> para inyectar directo en HTML
        let svg = fs.readFileSync(svgPath, 'utf8');
        svg = svg.replace(/<\?xml[\s\S]*?\?>/i, '').trim();
        svgContents[p.archivoId] = svg;
    }
});

console.log('Construyendo documento HTML para impresión PDF...');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ford SafeTeen Co-Drive - Wireframes Balsamiq MVP (APF3)</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

        @page {
            size: A4 portrait;
            margin: 12mm 14mm 14mm 14mm;
        }

        @page :first {
            margin: 0;
        }

        * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: #1e293b;
            background: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 11pt;
            line-height: 1.4;
        }

        .page-break {
            page-break-before: always;
            break-before: page;
        }

        /* Portada Ejecutiva */
        .cover-page {
            width: 100vw;
            height: 100vh;
            min-height: 297mm;
            padding: 25mm 20mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: linear-gradient(145deg, #050811 0%, #0b1528 50%, #002c6c 100%);
            color: #ffffff;
            position: relative;
            overflow: hidden;
        }

        .cover-page::after {
            content: '';
            position: absolute;
            bottom: -50px;
            right: -50px;
            width: 350px;
            height: 350px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(0,0,0,0) 70%);
            pointer-events: none;
        }

        .cover-header {
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            padding-bottom: 20px;
        }

        .ford-badge {
            display: inline-block;
            background: #002c6c;
            border: 2px solid rgba(255, 255, 255, 0.8);
            border-radius: 20px;
            padding: 4px 18px;
            font-weight: 900;
            font-style: italic;
            font-size: 15pt;
            letter-spacing: -1px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            margin-bottom: 12px;
        }

        .cover-title {
            font-size: 26pt;
            font-weight: 800;
            line-height: 1.15;
            margin: 10px 0 8px 0;
            letter-spacing: -0.5px;
            color: #ffffff;
        }

        .cover-subtitle {
            font-size: 13pt;
            color: #38bdf8;
            font-weight: 600;
            margin: 0;
        }

        .cover-meta-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(6, 182, 212, 0.15);
            border: 1px solid rgba(6, 182, 212, 0.4);
            border-radius: 6px;
            padding: 6px 12px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 9pt;
            color: #a5f3fc;
            margin-top: 15px;
        }

        .cover-body {
            margin: 30px 0;
        }

        .cover-desc {
            font-size: 11pt;
            color: #cbd5e1;
            max-width: 600px;
            line-height: 1.5;
            border-left: 3px solid #38bdf8;
            padding-left: 15px;
            margin-bottom: 20px;
        }

        .cover-pill-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            max-width: 600px;
        }

        .cover-pill {
            background: rgba(255, 255, 255, 0.07);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            padding: 10px 14px;
        }

        .cover-pill strong {
            display: block;
            font-size: 9pt;
            color: #38bdf8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .cover-pill span {
            font-size: 10pt;
            color: #f1f5f9;
        }

        .cover-footer {
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 9pt;
            color: #94a3b8;
        }

        .cover-team strong {
            color: #ffffff;
            display: block;
            margin-bottom: 4px;
        }

        /* Páginas de Contenido */
        .content-container {
            padding: 0;
        }

        /* Encabezado Superior de Página */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 8px;
            margin-bottom: 12px;
        }

        .page-header-title {
            font-size: 11pt;
            font-weight: 800;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .page-header-meta {
            font-size: 8.5pt;
            color: #64748b;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
        }

        /* Ficha Técnica de la Pantalla */
        .screen-card-info {
            background: #f8fafc;
            border: 1.5px solid #cbd5e1;
            border-radius: 8px;
            padding: 10px 14px;
            margin-bottom: 12px;
        }

        .screen-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 6px;
        }

        .screen-code-badge {
            background: #0f172a;
            color: #ffffff;
            font-family: 'JetBrains Mono', monospace;
            font-size: 9pt;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 4px;
            display: inline-block;
        }

        .screen-name {
            font-size: 11pt;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
        }

        .screen-figure {
            font-size: 8.5pt;
            font-weight: 700;
            color: #0369a1;
            background: #e0f2fe;
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid #bae6fd;
            white-space: nowrap;
        }

        .screen-specs-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 6px 14px;
            font-size: 8.5pt;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px dashed #cbd5e1;
        }

        .screen-spec-item strong {
            color: #475569;
        }

        .screen-purpose {
            font-size: 8.5pt;
            color: #334155;
            margin-top: 6px;
            line-height: 1.35;
        }

        /* Contenedor del Gráfico Wireframe */
        .wireframe-display-box {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #ffffff;
            border: 1.5px solid #0f172a;
            border-radius: 10px;
            padding: 8px;
            box-shadow: 4px 4px 0px #0f172a;
            max-height: 195mm;
            overflow: hidden;
        }

        .wireframe-display-box svg {
            max-height: 188mm;
            width: auto;
            max-width: 100%;
            display: block;
            margin: 0 auto;
        }

        /* Caso especial: W-08 Cabina Horizontal */
        .wireframe-display-box.wide svg {
            max-height: 175mm;
            width: 100%;
        }

        /* Pie de Página */
        .page-footer {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 8pt;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
            padding-top: 6px;
        }

        /* Tabla de Índice */
        .index-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9pt;
            margin-top: 15px;
        }

        .index-table th {
            background: #0f172a;
            color: #ffffff;
            font-weight: 700;
            text-align: left;
            padding: 8px 10px;
        }

        .index-table td {
            padding: 8px 10px;
            border-bottom: 1px solid #e2e8f0;
        }

        .index-table tr:nth-child(even) {
            background: #f8fafc;
        }
    </style>
</head>
<body>

    <!-- PORTADA EJECUTIVA -->
    <div class="cover-page">
        <div class="cover-header">
            <div class="ford-badge">Ford</div>
            <h1 class="cover-title">SafeTeen Co-Drive</h1>
            <p class="cover-subtitle">Catálogo Oficial de Wireframes y Prototipos en Balsamiq Mockups</p>
            <div class="cover-meta-badge">
                <span>AVANCE DE PROYECTO FINAL 3 (APF3) • SEMANA 12 • 2026</span>
            </div>
        </div>

        <div class="cover-body">
            <p class="cover-desc">
                Ecosistema telemático vehicular y de aprendizaje familiar para Ford Motor Company. Sustituye la vigilancia satelital invasiva y los bloqueos punitivos de fábrica por captura pasiva del bus CAN, paz mental desatendida y accesibilidad universal inclusiva.
            </p>

            <div class="cover-pill-grid">
                <div class="cover-pill">
                    <strong>Vehículo y Entorno:</strong>
                    <span>SUV Ford Territory Titanium 1.5L (Arequipa)</span>
                </div>
                <div class="cover-pill">
                    <strong>Estándar de Maquetación:</strong>
                    <span>Balsamiq Wireframes • Baja / Media Fidelidad</span>
                </div>
                <div class="cover-pill">
                    <strong>Normativas de Accesibilidad:</strong>
                    <span>ISO 9241-171 / WCAG 2.2 AA (Perfil Inclusivo)</span>
                </div>
                <div class="cover-pill">
                    <strong>Ingeniería de Requerimientos:</strong>
                    <span>MoSCoW & BDD (Catálogo RF-01 al RF-14)</span>
                </div>
            </div>
        </div>

        <div class="cover-footer">
            <div class="cover-team">
                <strong>Integrantes del Equipo de Proyecto:</strong>
                <div>• Anderson Roque Zevallos – U22321650</div>
                <div>• Jack Jhonatan Ramos Quispe – U25225261</div>
                <div>• Cesar Del Carpio Achahui – U23254280</div>
                <div>• Ivan Benjamin Mamani Villanueva – U23304519</div>
            </div>
            <div style="text-align: right;">
                <strong>Universidad Tecnológica del Perú</strong>
                <div>Curso: Diseño de Productos y Servicios</div>
                <div>Docente: Fernández Bernedo Alberto Edu</div>
                <div>Sede Arequipa - 2026</div>
            </div>
        </div>
    </div>

    <!-- PÁGINA 2: ÍNDICE DE PANTALLAS Y RESUMEN METODOLÓGICO -->
    <div class="page-break content-container">
        <div class="page-header">
            <div class="page-header-title">
                <span>Ford SafeTeen Co-Drive</span>
                <span style="font-weight: normal; color: #64748b;">| Tabla de Contenido de Wireframes</span>
            </div>
            <div class="page-header-meta">APF3 • SEMANA 12</div>
        </div>

        <h2 style="font-size: 15pt; font-weight: 800; color: #0f172a; margin: 10px 0 5px 0;">
            Distribución Modular de Maquetas Balsamiq (Tabla 13)
        </h2>
        <p style="font-size: 9.5pt; color: #475569; margin-bottom: 15px; line-height: 1.45;">
            Conforme al documento de avance del proyecto, el Producto Mínimo Viable (MVP) se estructuró en 8 pantallas organizadas en dos grupos funcionales: <strong>Módulos Operativos Centrales</strong> (conducción, supervisión familiar, accesibilidad sensorial y negociación) y <strong>Módulos de Soporte, Inducción y Control</strong> (onboarding, FAQ, configuración y consola SYNC 4).
        </p>

        <table class="index-table">
            <thead>
                <tr>
                    <th style="width: 10%;">Código</th>
                    <th style="width: 38%;">Nombre del Wireframe</th>
                    <th style="width: 26%;">Actor / Perfil Principal</th>
                    <th style="width: 16%;">Requerimientos</th>
                    <th style="width: 10%;">Informe</th>
                </tr>
            </thead>
            <tbody>
                ${pantallas.map((p, idx) => `
                    <tr>
                        <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700;">${p.codigo}</td>
                        <td style="font-weight: 700; color: #0f172a;">${p.titulo}</td>
                        <td>${p.actor.split('-')[0].trim()}</td>
                        <td style="font-family: 'JetBrains Mono', monospace; font-size: 8pt; color: #0369a1;">${p.reqs.split('•')[0].trim()}</td>
                        <td style="font-weight: 600; color: #475569;">Pág. ${[43, 44, 45, 46, 48, 50, 52, 53][idx]}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div style="margin-top: 25px; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 8px; padding: 12px 16px;">
            <h3 style="font-size: 10.5pt; font-weight: 800; color: #166534; margin: 0 0 6px 0;">
                🌱 Innovaciones Metodológicas Validadas en este Catálogo:
            </h3>
            <ul style="font-size: 8.5pt; color: #14532d; margin: 0; padding-left: 18px; line-height: 1.5;">
                <li><strong>Dimensión Inclusiva Universal:</strong> Integración de Mateo Huarca (hipoacusia bilateral de 65 dB) con sustitución completa de pitidos por pulsos hápticos en volante y luces cromáticas en pantalla.</li>
                <li><strong>Recomendaciones de Co-Evaluación Inter-Grupal:</strong> Adopción de las propuestas del Grupo B (SmartFleet UTP), incorporando alertas periféricas en clúster digital y slider único de Score (88 pts).</li>
                <li><strong>Desacoplamiento de Privacidad:</strong> Supresión total del mapa satelital continuo en tiempo real (cero espionaje), informando únicamente la confirmación desatendida de arribo seguro y estado de batería.</li>
            </ul>
        </div>

        <div class="page-footer">
            <span>Ford SafeTeen Co-Drive • Ecosistema Telemático</span>
            <span>Universidad Tecnológica del Perú</span>
        </div>
    </div>

    <!-- PÁGINAS 3 A 10: CADA UNA DE LAS 8 PANTALLAS BALSAMIQ -->
    ${pantallas.map((p, idx) => `
        <div class="page-break content-container">
            <div class="page-header">
                <div class="page-header-title">
                    <span class="screen-code-badge">${p.codigo}</span>
                    <span>${p.titulo}</span>
                </div>
                <div class="page-header-meta">${p.figura}</div>
            </div>

            <!-- Ficha Técnica -->
            <div class="screen-card-info">
                <div class="screen-card-header">
                    <h3 class="screen-name">${p.titulo}</h3>
                    <span class="screen-figure">${p.figura}</span>
                </div>

                <div class="screen-specs-grid">
                    <div class="screen-spec-item">
                        <strong>Actor / Perfil:</strong> ${p.actor}
                    </div>
                    <div class="screen-spec-item">
                        <strong>Requerimientos:</strong> <span style="font-family: 'JetBrains Mono', monospace; font-weight: bold; color: #0284c7;">${p.reqs}</span>
                    </div>
                </div>

                <div class="screen-purpose">
                    <strong>Propósito Técnico y Experiencia de Usuario:</strong> ${p.proposito}
                </div>
            </div>

            <!-- Wireframe SVG -->
            <div class="wireframe-display-box ${p.tipoDispositivo === 'sync4' ? 'wide' : ''}">
                ${svgContents[p.archivoId] || '<p>Wireframe no encontrado</p>'}
            </div>

            <div class="page-footer">
                <span>Wireframe Balsamiq Mockups • ${p.codigo}</span>
                <span>Ford SafeTeen Co-Drive • APF3 (Pág. ${idx + 3})</span>
            </div>
        </div>
    `).join('')}

</body>
</html>`;

// Guardar HTML en directorio temporal con ruta ASCII sin caracteres especiales
const os = require('os');
const tempHtmlPath = path.join(os.tmpdir(), 'temp_balsamiq_document.html');
const tempPdfPath = path.join(os.tmpdir(), 'temp_balsamiq_document.pdf');
fs.writeFileSync(tempHtmlPath, htmlContent);
console.log('HTML compilado guardado en:', tempHtmlPath);

// Rutas finales de salida
const pdfFinalBalsamiq = path.join(baseDir, 'Ford_SafeTeen_CoDrive_Wireframes_Balsamiq.pdf');
const pdfFinalRoot = path.join(__dirname, 'Ford_SafeTeen_CoDrive_Wireframes_Balsamiq.pdf');

console.log('Generando PDF mediante motor Edge Headless...');
try {
    const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    const psCmd = `Start-Process -FilePath '${edgeExe}' -ArgumentList '--headless=new','--disable-gpu','--no-sandbox','--run-all-compositor-stages-before-draw','--print-to-pdf=${tempPdfPath}','${tempHtmlPath}' -Wait`;
    execSync(`powershell -Command "${psCmd}"`, { stdio: 'inherit' });

    // Verificar y copiar a destinos finales
    if (fs.existsSync(tempPdfPath)) {
        fs.copyFileSync(tempPdfPath, pdfFinalBalsamiq);
        console.log('✔ PDF generado en:', pdfFinalBalsamiq);

        fs.copyFileSync(tempPdfPath, pdfFinalRoot);
        console.log('✔ Copia del PDF guardada en la raíz del MVP:', pdfFinalRoot);

        // Limpiar temporales
        try {
            fs.unlinkSync(tempHtmlPath);
            fs.unlinkSync(tempPdfPath);
        } catch (_) {}

        console.log('\n🎉 ¡PDF DE PANTALLAS EN BALSAMIQ GENERADO EXITOSAMENTE!');
    } else {
        throw new Error('El archivo PDF temporal no fue generado.');
    }
} catch (err) {
    console.error('Error al generar PDF con Edge:', err);
}
