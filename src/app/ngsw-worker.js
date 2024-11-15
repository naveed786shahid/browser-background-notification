// src/ngsw-worker.js
self.addEventListener('periodicsync', (event) => {
    console.log('Periodic loaiding........');
    if (event.tag === 'periodic-notification') {
      console.log('Periodic loaiding. reccc.......');

      event.waitUntil(
        self.registration.showNotification('Reminder', {
          body: 'This is your scheduled notification!',
          icon: './assets/icon-96x96.png'  // Optional icon
        })
      );
    }
  });

  
  self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);
  });
  