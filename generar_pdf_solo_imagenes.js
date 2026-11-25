/**
 * Generador de PDF que contiene EXCLUSIVAMENTE las imágenes de los maquetados
 * Sin textos externos, portadas, títulos o índices.
 * Ford SafeTeen Co-Drive - APF3
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const baseDir = path.join(__dirname, 'pantallas en balsamiq');

const listaArchivos = [
    { id: 'W01_Dashboard_Conductor_Joven', orient: 'portrait' },
    { id: 'W02_Tutor_Familiar_PeaceOfMind', orient: 'portrait' },
    { id: 'W03_Modo_Inclusivo_Accesibilidad', orient: 'portrait' },
    { id: 'W04_Contrato_Digital_Familiar', orient: 'portrait' },
    { id: 'W05_Manual_Uso_Onboarding', orient: 'portrait' },
    { id: 'W06_Centro_Ayuda_FAQ', orient: 'portrait' },
    { id: 'W07_Configuracion_General', orient: 'portrait' },
    { id: 'W08_Cabina_SYNC4_HMI', orient: 'landscape' }
];

console.log('Leyendo imágenes SVG de las maquetas...');
const svgs = [];

listaArchivos.forEach(item => {
    const svgPath = path.join(baseDir, `${item.id}.svg`);
    if (fs.existsSync(svgPath)) {
        let svg = fs.readFileSync(svgPath, 'utf8');
        // Quitar prólogo XML
        svg = svg.replace(/<\?xml[\s\S]*?\?>/i, '').trim();
        svgs.push({ id: item.id, orient: item.orient, content: svg });
    } else {
        console.warn('No se encontró:', svgPath);
    }
});

console.log(`Total de maquetas cargadas: ${svgs.length}`);

// Construir HTML limpio 100% enfocado en las imágenes a página completa
const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Wireframes Balsamiq - Ford SafeTeen Co-Drive</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 0;
        }
        @page landscape-page {
            size: A4 landscape;
            margin: 0;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
        }

        .wireframe-page {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            background: #ffffff;
        }

        .wireframe-page.page-portrait {
            width: 210mm;
            height: 297mm;
            padding: 8mm 12mm;
            page-break-after: always;
            break-after: page;
        }

        .wireframe-page.page-portrait svg {
            max-width: 100%;
            max-height: 278mm;
            width: auto;
            height: auto;
            display: block;
        }

        .wireframe-page.page-landscape {
            page: landscape-page;
            width: 297mm;
            height: 210mm;
            padding: 8mm 12mm;
            page-break-after: auto;
            break-after: auto;
        }

        .wireframe-page.page-landscape svg {
            max-width: 100%;
            max-height: 192mm;
            width: auto;
            height: auto;
            display: block;
        }
    </style>
</head>
<body>
    ${svgs.map(s => `
        <div class="wireframe-page page-${s.orient}">
            ${s.content}
        </div>
    `).join('')}
</body>
</html>`;

const tempHtml = path.join(os.tmpdir(), 'balsamiq_solo_imagenes.html');
const tempPdf = path.join(os.tmpdir(), 'balsamiq_solo_imagenes.pdf');

fs.writeFileSync(tempHtml, htmlContent);
console.log('HTML temporal guardado en:', tempHtml);

// Rutas finales para el PDF
const destBalsamiq = path.join(baseDir, 'Ford_SafeTeen_CoDrive_Wireframes_Balsamiq.pdf');
const destRoot = path.join(__dirname, 'Ford_SafeTeen_CoDrive_Wireframes_Balsamiq.pdf');

console.log('Compilando a PDF con Edge Headless...');
try {
    const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    const psCmd = `Start-Process -FilePath '${edgeExe}' -ArgumentList '--headless=new','--disable-gpu','--no-sandbox','--run-all-compositor-stages-before-draw','--print-to-pdf=${tempPdf}','${tempHtml}' -Wait`;
    execSync(`powershell -Command "${psCmd}"`, { stdio: 'inherit' });

    if (fs.existsSync(tempPdf)) {
        fs.copyFileSync(tempPdf, destBalsamiq);
        console.log('✔ PDF guardado en:', destBalsamiq);

        fs.copyFileSync(tempPdf, destRoot);
        console.log('✔ PDF guardado en:', destRoot);

        try {
            fs.unlinkSync(tempHtml);
            fs.unlinkSync(tempPdf);
        } catch (_) {}

        console.log('\n🎉 ¡PDF CREADO CON ÉXITO: ÚNICAMENTE LAS IMÁGENES DE LAS MAQUETAS!');
    } else {
        throw new Error('No se generó el PDF temporal.');
    }
} catch (err) {
    console.error('Error al generar PDF:', err);
}
