"use client"

import { useEffect, useMemo } from "react"
import { Whiteboard } from "@/components/whiteboard/whiteboard"
import { Toolbar } from "@/components/whiteboard/toolbar"
import { Toaster } from "@/components/ui/toaster"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const params = useMemo(() => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""), [])
  const initialRoom = params.get("room") ?? ""

  useEffect(() => {
    if (!initialRoom) {
      // no-op; user can create/share a room from toolbar
    }
  }, [initialRoom])

  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <img src="/placeholder-logo.png" alt="CollabCanvas logo" className="h-6 w-6 rounded" />
          <h1 className="text-lg font-semibold tracking-tight text-pretty">CollabCanvas</h1>
        </div>
        <div className="text-sm text-muted-foreground">Real-time online whiteboard</div>
      </header>

      <section className="flex flex-col md:flex-row flex-1 min-h-0">
        <aside className="w-full md:w-auto border-b md:border-b-0 md:border-r bg-background">
          <Toolbar />
        </aside>

        <Separator orientation="vertical" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <Whiteboard />
        </div>
      </section>

      <Toaster />
    </main>
  )
}
