self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); //will install the serviceworker
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim()); //will activate the serviceworker
});

// Register event listener for the 'push' event.
self.addEventListener('push', function(event) {

  // Retrieve the textual payload from event.data (a PushMessageData object).
  var payload = JSON.parse(event.data.text());
  var clickUrl = payload.url;

  // Keep the service worker alive until the web push notification is created.
  event.waitUntil(
    // Show a notification
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon
    })
  );
});

// Register event listener for the 'notificationclick' event.
self.addEventListener('notificationclick', function(event) {
  event.waitUntil(
    // Retrieve a list of the clients of this service worker.
    self.clients.matchAll().then(function(clientList) {
      // If there is at least one client, focus it.
      if (clientList.length > 0) {
        return clientList[0].focus();

      }

      // Otherwise, open a new page.
      return self.clients.openWindow(clickUrl);
    })
  );
});