/**
 * Servidor HTTP Seguro y Optimizado para Ford SafeTeen Co-Drive MVP
 * Auditoría de Seguridad bajo directrices de cloudflare/security-audit-skill
 * 
 * Controles de Seguridad Implementados:
 * - Prevención de Path Traversal (URL decoding, path.resolve y validación estricta de raíz)
 * - Protección contra divulgación de archivos confidenciales (.jks, .env, package.json, etc.)
 * - Restricción estricta de métodos HTTP (Solo GET y HEAD)
 * - Cabeceras de seguridad defensivas (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
 * - Tipos MIME estrictos y mapeo seguro de recursos estáticos
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = path.resolve(__dirname);

// Extensiones de archivo permitidas públicamente
const ALLOWED_EXTENSIONS = new Set([
    '.html', '.css', '.js', '.json',
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.woff', '.woff2', '.ttf'
]);

// Archivos o patrones explícitamente bloqueados (información confidencial / código fuente del servidor)
const BLOCKED_FILES = new Set([
    'server.js',
    'package.json',
    'package-lock.json',
    'capacitor.config.json',
    'safeteen-release-key.jks',
    'generar_balsamiq.js',
    'generar_pdf.js',
    'generar_pdf_solo_imagenes.js'
]);

const BLOCKED_DIRECTORIES = [
    'node_modules',
    '.git',
    '.github',
    '.expo',
    'android_project',
    'expo_app',
    'ios',
    'java_mobile',
    're_targets',
    'supabase',
    'temp_audit_skill',
    'temp_rea',
    'www'
];

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    // 1. Restricción de Métodos HTTP
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Allow': 'GET, HEAD',
            'X-Content-Type-Options': 'nosniff'
        });
        res.end('405: Método no permitido');
        return;
    }

    // 2. Normalización y Decodificación Segura de URL
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('400: URL malformada');
        return;
    }

    if (decodedUrl === '/' || decodedUrl === '') {
        decodedUrl = '/index.html';
    }

    // Resolver ruta absoluta
    const safePath = path.normalize(decodedUrl).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.resolve(BASE_DIR, '.' + safePath);

    // 3. Verificación de Path Traversal
    if (!filePath.startsWith(BASE_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
        res.end('403: Acceso denegado');
        return;
    }

    // 4. Bloqueo de Directorios y Archivos Confidenciales
    const relativePath = path.relative(BASE_DIR, filePath);
    const pathParts = relativePath.split(path.sep);

    const isBlockedDir = pathParts.some(part => BLOCKED_DIRECTORIES.includes(part));
    const filename = path.basename(filePath);
    const isBlockedFile = BLOCKED_FILES.has(filename) || filename.endsWith('.jks') || filename.endsWith('.bat') || filename.endsWith('.md');

    if (isBlockedDir || isBlockedFile) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
        res.end('403: Recurso restringido');
        return;
    }

    // 5. Verificación de extensión permitida
    const ext = path.extname(filePath).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
        res.end('403: Tipo de archivo no permitido');
        return;
    }

    // 6. Verificación en disco y despacho
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
            res.end('404: Archivo no encontrado');
            return;
        }

        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Cabeceras de Seguridad Reforzadas (Defensa en Profundidad)
        const securityHeaders = {
            'Content-Type': contentType,
            'Content-Length': stats.size,
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(), microphone=(self), geolocation=(self)',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://xwfusgnpsvlraziqeokz.supabase.co https://*.supabase.co; img-src 'self' data: https:;",
            'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
        };

        res.writeHead(200, securityHeaders);

        if (req.method === 'HEAD') {
            res.end();
            return;
        }

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log('========================================================');
    console.log('  FORD SAFETEEN CO-DRIVE - SERVIDOR SEGURO AUDITADO');
    console.log(`  URL Local: http://localhost:${PORT}`);
    console.log('  Seguridad: Cabeceras CSP activas, Path Traversal mitigado');
    console.log('========================================================');
});
