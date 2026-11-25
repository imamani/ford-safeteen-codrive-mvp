// Ford SafeTeen Co-Drive - Service Worker para Soporte Móvil PWA
const CACHE_NAME = 'safeteen-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html',
  './css/styles.css',
  './js/utils.js',
  './js/data.js',
  './js/canBusSimulator.js',
  './js/supabaseClient.js',
  './js/app.js',
  './js/views/loginView.js',
  './js/views/conductorJoven.js',
  './js/views/tutorFamiliar.js',
  './js/views/modoInclusivo.js',
  './js/views/contratoDigital.js',
  './js/views/onboarding.js',
  './js/views/centroAyuda.js',
  './js/views/configuracion.js',
  './js/views/cabinaSync4.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => console.log('PWA cache prefetch:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('./index.html'))
  );
});
