/* ═══════════════════════════════════════════════════════
   UNITVERSE — service-worker.js
   Estrategia: Cache-First para archivos locales,
               Network-First para peticiones externas.
═══════════════════════════════════════════════════════ */

const CACHE_NAME    = 'unitverse-v1';
const CACHE_FONTS   = 'unitverse-fonts-v1';

/* ── Archivos del proyecto que se guardan en caché al instalar ── */
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './activities.css',
  './mobile.css',
  './data.js',
  './app.js',
  './activities.js',
  './mobile-nav.js',
  './manifest.json',
  './favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* ────────────────────────────────────────────────────
   INSTALL — precachea todos los archivos del proyecto
──────────────────────────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())   // activa el SW inmediatamente
  );
});

/* ────────────────────────────────────────────────────
   ACTIVATE — elimina cachés viejos de versiones anteriores
──────────────────────────────────────────────────── */
self.addEventListener('activate', event => {
  const validCaches = [CACHE_NAME, CACHE_FONTS];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !validCaches.includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())  // toma control de todas las pestañas
  );
});

/* ────────────────────────────────────────────────────
   FETCH — estrategia según el tipo de petición
──────────────────────────────────────────────────── */
self.addEventListener('fetch', event => {

  const url = new URL(event.request.url);

  /* Fuentes de Google Fonts → Cache-First (raramente cambian) */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_FONTS).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  /* Archivos locales del proyecto → Cache-First con fallback a red */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;

        /* No está en caché: buscar en la red y guardarlo */
        return fetch(event.request)
          .then(response => {
            /* Solo cachear respuestas válidas */
            if (response && response.status === 200 && response.type === 'basic') {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => {
            /* Sin red y sin caché: devolver el index.html como fallback */
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
    );
    return;
  }

  /* Cualquier otra petición → red normal */
  event.respondWith(fetch(event.request));
});