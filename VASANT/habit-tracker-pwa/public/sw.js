const CACHE_NAME = "habit-tracker-v1"
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Background sync for offline habit tracking
self.addEventListener("sync", (event) => {
  if (event.tag === "habit-sync") {
    event.waitUntil(syncHabits())
  }
})

// Push notification handler
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Time to complete your habits!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "complete",
        title: "Mark Complete",
        icon: "/icon-192x192.png",
      },
      {
        action: "dismiss",
        title: "Dismiss",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Habit Reminder", options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "complete") {
    // Handle habit completion
    event.waitUntil(clients.openWindow("/"))
  } else if (event.action === "dismiss") {
    // Just close the notification
    return
  } else {
    // Default action - open the app
    event.waitUntil(clients.openWindow("/"))
  }
})

async function syncHabits() {
  // Sync offline habit data when connection is restored
  try {
    const cache = await caches.open(CACHE_NAME)
    // Implementation would sync with server if you had one
    console.log("Syncing habits...")
  } catch (error) {
    console.error("Sync failed:", error)
  }
}
