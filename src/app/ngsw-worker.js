// src/ngsw-worker.js
self.addEventListener('periodicsync', (event) => {
    console.log('Periodic loaiding........');ß
    if (event.tag === 'periodic-notification') {
      event.waitUntil(
        self.registration.showNotification('Reminder', {
          body: 'This is your scheduled notification!',
          icon: 'https://example.com/notification-icon.png'  // Optional icon
        })
      );
    }
  });
  self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/app.js'
        ]);
      })
    );
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);
  });
  