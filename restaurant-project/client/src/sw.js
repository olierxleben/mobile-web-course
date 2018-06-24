
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('restaurant').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/main.js',
        '/js/idb.js',
        '/js/restaurants_db.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/data/restaurants.json',
        '/images/',
        '/images/1_400.jpg',
        '/images/2_400.jpg',
        '/images/3_400.jpg',
        '/images/4_400.jpg',
        '/images/5_400.jpg',
        '/images/6_400.jpg',
        '/images/7_400.jpg',
        '/images/8_400.jpg',
        '/images/9_400.jpg',
        '/images/10_400.jpg',
        '/favicon.png'
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