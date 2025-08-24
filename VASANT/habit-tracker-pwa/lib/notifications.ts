"use client"

export interface NotificationPermission {
  granted: boolean
  denied: boolean
  default: boolean
}

export function getNotificationPermission(): NotificationPermission {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { granted: false, denied: true, default: false }
  }

  return {
    granted: Notification.permission === "granted",
    denied: Notification.permission === "denied",
    default: Notification.permission === "default",
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission === "denied") {
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === "granted"
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return
  }

  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        ...options,
      })
    })
  } else if (Notification.permission !== "denied") {
    // Request permission if not denied
    requestNotificationPermission().then((granted) => {
      if (granted) {
        showNotification(title, options)
      }
    })
  }
}

export function scheduleHabitReminder(habitName: string, time: string) {
  // This is a mock implementation using setTimeout.
  // For a production PWA, you would use the Push API with a server
  // to schedule notifications even when the app is closed.
  const [hours, minutes] = time.split(":").map(Number)
  const now = new Date()
  const scheduledTime = new Date()
  scheduledTime.setHours(hours, minutes, 0, 0)

  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1)
  }

  const timeUntilReminder = scheduledTime.getTime() - now.getTime()

  console.log(`Scheduling reminder for ${habitName} in ${timeUntilReminder / 1000} seconds.`)

  setTimeout(() => {
    showNotification(`Time for your habit!`, {
      body: `Don't forget to complete "${habitName}" today.`,
      tag: `habit-${habitName}`,
      requireInteraction: true,
    })
  }, timeUntilReminder)
}
