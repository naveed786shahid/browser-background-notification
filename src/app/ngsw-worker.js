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
  