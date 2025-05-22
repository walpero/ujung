self.addEventListener('push', (event) => {
  try {
    const options = {
      body: event.data.text(),
      icon: '/favicon.png',
      badge: '/favicon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification('New Airdrop Available!', options)
    );
  } catch (error) {
    console.error('Error showing notification:', error);
  }
});

self.addEventListener('notificationclick', (event) => {
  try {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('https://airdrops-hunter.cloud/airdrops')
    );
  } catch (error) {
    console.error('Error handling notification click:', error);
  }
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});