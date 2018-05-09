
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('restaurant').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/data/restaurants.json',
        '/images/',
        '/images/1-400small.jpg',
        '/images/2-400small.jpg',
        '/images/3-400small.jpg',
        '/images/4-400small.jpg',
        '/images/5-400small.jpg',
        '/images/6-400small.jpg',
        '/images/7-400small.jpg',
        '/images/8-400small.jpg',
        '/images/9-400small.jpg',
        '/images/10-400small.jpg',
      ]).then(() => {
        console.log('All Files are cached');
        return self.skipWaiting();
      }).catch((error) => {
        console.log('Failed to cache', error);
      })
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('restaurant').then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((res) => {
          cache.put(event.request, res.clone());
          return res;
        });
      });
    })
  );
});