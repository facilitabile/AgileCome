// Service worker: mette in cache l'app per usarla anche senza connessione
const CACHE = 'agilecome-v1';
const FILES = [
  './', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'img/01.jpg',
  'img/02.jpg',
  'img/03.jpg',
  'img/04.jpg',
  'img/05.jpg',
  'img/06.jpg',
  'img/07.jpg',
  'img/08.jpg',
  'img/09.jpg',
  'img/10.jpg',
  'img/11.jpg',
  'img/12.jpg',
  'img/13.jpg',
  'img/14.jpg',
  'img/15.jpg',
  'img/16.jpg',
  'img/17.jpg',
  'img/18.jpg',
  'img/19.jpg',
  'img/20.jpg',
  'img/21.jpg',
  'img/22.jpg',
  'img/23.jpg',
  'img/24.jpg',
  'img/25.jpg',
  'img/26.jpg',
  'img/27.jpg',
  'img/28.jpg',
  'img/29.jpg',
  'img/30.jpg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    const url = new URL(e.request.url);
    if (url.origin === location.origin || url.host.endsWith('fonts.googleapis.com') || url.host.endsWith('fonts.gstatic.com')) {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy));
    }
    return res;
  }).catch(() => caches.match('index.html'))));
});
