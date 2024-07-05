// Service Worker Installation
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('teahouse-cache').then(cache => {
        return cache.addAll([
          'index.html',
          'offline.html',
          'css/offline.css',
          'js/offline.js',
          'img/offline.png',
          'icons/Icon-192.png',
          'icons/Icon-144.png',
          'icons/Icon-512.png',
          'icons/Icon-maskable-192.png',
          'icons/Icon-maskable-144.png',
          'icons/Icon-maskable-512.png',
          
        ]);
      })
    );
  });
  
  // Service Worker Activation and Cache Cleanup
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== 'teahouse-cache') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  // Cache Limit Function
function limitCacheSize(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    return cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]); // Delete the oldest item
      }
    });
  });
}
  
  self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') {
      event.respondWith(
        caches.open('dynamic-cache').then(cache => {
          return cache.match(event.request).then(response => {
            if (response) {
              // If response is found in cache, return it
              return response;
            }
  
            // If not, fetch the request from the network and cache it
            return fetch(event.request).then(networkResponse => {
              if (networkResponse.status === 200) {
                // Clone the response to store it in the cache
                const responseToCache = networkResponse.clone();
                cache.put(event.request, responseToCache);

                // Check and limit the cache size
              limitCacheSize('dynamic-cache', 15);
              }
              return networkResponse;
            }).catch(() => {
              return caches.match('offline.html'); // Serve the offline page when fetch fails
            });
          });
        })
      );
    } else {
      // For non-GET requests (e.g., POST), simply fetch from the network without caching
      event.respondWith(fetch(event.request));
    }
  });
  
  
  
  
  