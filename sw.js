const CACHE = 'kaspi-v29';

const FILES = [
  './index.html',
  './style.css',
  './style2.css',
  './style3.css',
  './script.js',
  './script2.js',
  './manifest.json',
  './img/udostoverenie.jpg',
  './img/docs.png',
  './img/passport.png',
  './img/student.png',
  './img/kaspi.png',
  './img/kaspi.webp',
  './img/kasper.png',
  './img/kaspi_gold_card.png',
  './img/kaspi_deposit_badge.png',
  './img/kaspi_magazin_0024.png',
  './img/kaspi_travel_0024.png',
  './img/kaspi_rabota.png',
  './img/kaspi_bonus_symbol.png',
  './img/image 10.png',
  './img/image 11.png',
  './img/image 12.png',
  './img/image 13.png',
  './img/avatar.png',
  './img/arrow.png',
  './img/exit.png',
  './img/x.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      // Добавляем по одному, чтобы один 404 не ломал всё
      return Promise.allSettled(FILES.map(f => c.add(f)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
