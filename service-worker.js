/* ═══════════════════════════════════════════════════════
   UNITVERSE — service-worker.js
   Estrategia: Cache First para assets locales + Network First para fuentes
═══════════════════════════════════════════════════════ */

const CACHE_NAME = 'unitverse-v1';
const OFFLINE_URL = './index.html';

// Todos los archivos del proyecto que se cachean al instalar
const ASSETS_TO_CACHE = [
  './index.html',
  './style.css',
  './activities.css',
  './app.js',
  './data.js',
  './activities.js',
  './favicon.svg',
  './manifest.json'
];

// ── INSTALL: precachear todos los assets locales ──────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      // Activar inmediatamente sin esperar que se cierre la pestaña anterior
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE: limpiar caches viejos ──────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => {
      // Tomar control de todas las pestañas abiertas de inmediato
      return self.clients.claim();
    })
  );
});

// ── FETCH: Cache First para archivos locales, Network First para externos ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones GET
  if (request.method !== 'GET') return;

  // Para fuentes de Google Fonts y recursos externos: Network First con fallback
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        fetch(request)
          .then(response => {
            // Cachear la fuente descargada
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cache.match(request))
      )
    );
    return;
  }

  // Para archivos locales del proyecto: Cache First
  if (url.origin === location.origin || request.url.startsWith('./')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;

        // No está en cache — intentar red y guardar
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => {
          // Sin red y sin cache — devolver la página principal como fallback
          if (request.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
    );
  }
});
