import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Habit Tracker PWA",
    short_name: "HabitTracker",
    description: "Track your daily habits and build streaks with offline support",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    orientation: "portrait",
    categories: ["productivity", "lifestyle", "health"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Add Habit",
        short_name: "Add",
        description: "Quickly add a new habit",
        url: "/habits?action=add",
        icons: [{ src: "/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  }
}
