const CACHE_NAME = 'work-tracker-v12';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// تثبيت التطبيق وتخزين الملفات
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

// تفعيل التحديثات الجديدة
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// استدعاء الملفات حتى بدون إنترنت
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
