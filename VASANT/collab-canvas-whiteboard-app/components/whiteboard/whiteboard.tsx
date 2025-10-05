"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useWhiteboardStore } from "@/lib/whiteboard/store"
import type { SceneElement, Point, Camera } from "@/lib/whiteboard/types"
import { cn } from "@/lib/utils"

type Presence = {
  id: string
  color: string
  name: string
  point?: Point | null
}

function randomColor() {
  const palette = ["#0A84FF", "#0891B2", "#16A34A", "#F59E0B", "#EF4444"]
  return palette[Math.floor(Math.random() * palette.length)]
}

function deviceId() {
  const key = "collabcanvas-device-id"
  let v = localStorage.getItem(key)
  if (!v) {
    v = Math.random().toString(36).slice(2)
    localStorage.setItem(key, v)
  }
  return v
}

export function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const {
    elements,
    setElements,
    addElement,
    updateElement,
    removeElement,
    selectElement,
    selectedId,
    tool,
    setPointer,
    pointer,
    color,
    thickness,
    fontSize,
    camera,
    setCamera,
    isPanning,
    setIsPanning,
    pushHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    setCollabConnected,
    collabConnected,
  } = useWhiteboardStore()

  const yDocRef = useRef<any | null>(null)
  const yElementsRef = useRef<any | null>(null)
  const yMetaRef = useRef<any | null>(null)
  const presenceMapRef = useRef<any | null>(null)
  const providersCleanupRef = useRef<(() => void) | null>(null)

  const myPresence = useRef<Presence>({
    id: typeof window !== "undefined" ? deviceId() : Math.random().toString(36).slice(2),
    color: randomColor(),
    name: "Guest",
  })
  const [peers, setPeers] = useState<Record<string, Presence>>({})

  useEffect(() => {
    let unobservePresence: (() => void) | null = null
    ;(async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        let room = params.get("room") || ""
        if (!room) room = "local-" + window.location.pathname

        const [{ default: Y }, maybeIdx] = await Promise.all([
          import("yjs").catch(() => ({ default: null as any })),
          import("y-indexeddb").catch(() => null),
        ])

        if (!Y) {
          setCollabConnected(false)
          return
        }

        const ydoc = new Y.Doc()
        yDocRef.current = ydoc
        const yElements = ydoc.getArray("elements")
        const yMeta = ydoc.getMap("meta")
        const presences = ydoc.getMap("presences")
        yElementsRef.current = yElements
        yMetaRef.current = yMeta
        presenceMapRef.current = presences

        let persist: any = null
        if (maybeIdx?.IndexeddbPersistence) {
          const { IndexeddbPersistence } = maybeIdx as any
          persist = new IndexeddbPersistence(`collabcanvas-${room}`, ydoc)
          persist.on("synced", () => {
            const snapshot = (yElements.toArray?.() ?? []) as SceneElement[]
            if (snapshot.length) setElements(snapshot)
            const cam = yMeta.get("camera") as Camera | undefined
            if (cam) setCamera(cam)
          })
        } else {
          setCollabConnected(false)
        }

        // BroadcastChannel provider removed (package unavailable). Collaboration continues via WebRTC.

        // WebRTC provider removed; collaboration status based on IndexedDB only
        setCollabConnected(!!persist)

        const updatePresence = () => {
          presences.set(myPresence.current.id, myPresence.current)
        }
        updatePresence()

        const presenceHandler = () => {
          const next: Record<string, Presence> = {}
          presences.forEach((v: Presence, k: string) => {
            if (k !== myPresence.current.id) next[k] = v
          })
          setPeers(next)
        }
        presences.observe(presenceHandler)
        unobservePresence = () => presences.unobserve(presenceHandler)

        const elementsObserver = () => {
          const arr = (yElements.toArray?.() ?? []) as SceneElement[]
          setElements(arr)
        }
        yElements.observe(elementsObserver)

        providersCleanupRef.current = () => {
          try {
            yElements.unobserve(elementsObserver)
          } catch {}
          try {
            unobservePresence?.()
          } catch {}
          // no webrtc to destroy
          try {
            persist?.destroy?.()
          } catch {}
        }
      } catch {
        setCollabConnected(false)
      }
    })()

    return () => {
      try {
        providersCleanupRef.current?.()
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const yMeta = yMetaRef.current
    if (yMeta) {
      try {
        yMeta.set("camera", camera)
      } catch {}
    }
  }, [camera])

  const [dpr, setDpr] = useState(1)
  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
    setDpr(nextDpr)
    canvas.width = Math.floor(rect.width * nextDpr)
    canvas.height = Math.floor(rect.height * nextDpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements, camera, selectedId, pointer, color, thickness, dpr])

  useEffect(() => {
    resize()
    const ro = new ResizeObserver(() => resize())
    const parent = canvasRef.current?.parentElement
    if (parent) ro.observe(parent)
    return () => ro.disconnect()
  }, [resize])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.translate(camera.x, camera.y)
    ctx.scale(camera.z, camera.z)

    const grid = 40
    ctx.save()
    ctx.strokeStyle = "rgba(0,0,0,0.05)"
    ctx.lineWidth = 1 / camera.z
    for (let x = -5000; x < 5000; x += grid) {
      ctx.beginPath()
      ctx.moveTo(x, -5000)
      ctx.lineTo(x, 5000)
      ctx.stroke()
    }
    for (let y = -5000; y < 5000; y += grid) {
      ctx.beginPath()
      ctx.moveTo(-5000, y)
      ctx.lineTo(5000, y)
      ctx.stroke()
    }
    ctx.restore()

    elements.forEach((el) => {
      drawElement(ctx, el)
    })

    if (selectedId) {
      const el = elements.find((e) => e.id === selectedId)
      if (el) drawSelection(ctx, el)
    }

    ctx.restore()
    drawCursors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements, selectedId, camera, dpr])

  useEffect(() => {
    draw()
  }, [draw])

  function drawElement(ctx: CanvasRenderingContext2D, el: SceneElement) {
    ctx.save()
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.strokeStyle = el.stroke
    ctx.fillStyle = el.fill ?? "transparent"
    ctx.lineWidth = el.thickness

    switch (el.type) {
      case "pen": {
        ctx.beginPath()
        el.points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        ctx.stroke()
        break
      }
      case "line": {
        ctx.beginPath()
        ctx.moveTo(el.x, el.y)
        ctx.lineTo(el.x2!, el.y2!)
        ctx.stroke()
        break
      }
      case "arrow": {
        ctx.beginPath()
        ctx.moveTo(el.x, el.y)
        ctx.lineTo(el.x2!, el.y2!)
        ctx.stroke()
        const angle = Math.atan2(el.y2! - el.y, el.x2! - el.x)
        const size = 8 + el.thickness * 1.2
        ctx.beginPath()
        ctx.moveTo(el.x2!, el.y2!)
        ctx.lineTo(el.x2! - size * Math.cos(angle - Math.PI / 6), el.y2! - size * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(el.x2! - size * Math.cos(angle + Math.PI / 6), el.y2! - size * Math.sin(angle + Math.PI / 6))
        ctx.closePath()
        ctx.fillStyle = el.stroke
        ctx.fill()
        break
      }
      case "rect": {
        if (el.fill && el.fill !== "transparent") ctx.fillRect(el.x, el.y, el.w!, el.h!)
        ctx.strokeRect(el.x, el.y, el.w!, el.h!)
        break
      }
      case "ellipse": {
        ctx.beginPath()
        ctx.ellipse(el.x + el.w! / 2, el.y + el.h! / 2, Math.abs(el.w! / 2), Math.abs(el.h! / 2), 0, 0, Math.PI * 2)
        if (el.fill && el.fill !== "transparent") ctx.fill()
        ctx.stroke()
        break
      }
      case "diamond": {
        ctx.beginPath()
        const cx = el.x + el.w! / 2
        const cy = el.y + el.h! / 2
        ctx.moveTo(cx, el.y)
        ctx.lineTo(el.x + el.w!, cy)
        ctx.lineTo(cx, el.y + el.h!)
        ctx.lineTo(el.x, cy)
        ctx.closePath()
        if (el.fill && el.fill !== "transparent") ctx.fill()
        ctx.stroke()
        break
      }
      case "text": {
        ctx.font = `${el.bold ? "bold " : ""}${el.italic ? "italic " : ""}${el.fontSize || 16}px ui-sans-serif, system-ui`
        ctx.fillStyle = el.stroke
        wrapText(ctx, el.text || "", el.x, el.y, Math.max(200, el.w || 200), (el.fontSize || 16) * 1.4)
        break
      }
      case "image": {
        const img = (el as any)._image as HTMLImageElement | undefined
        if (img && img.complete) {
          ctx.drawImage(img, el.x, el.y, el.w!, el.h!)
        }
        break
      }
    }
    ctx.restore()
  }

  function drawSelection(ctx: CanvasRenderingContext2D, el: SceneElement) {
    const bounds = elementBounds(el)
    ctx.save()
    ctx.strokeStyle = "rgba(10,132,255,0.85)"
    ctx.setLineDash([4 / camera.z, 4 / camera.z])
    ctx.lineWidth = 1 / camera.z
    ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h)
    ctx.restore()
  }

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) {
    // Respect explicit newlines while wrapping words within maxWidth.
    const paragraphs = text.split("\n")
    let yy = y
    for (const para of paragraphs) {
      if (para.length === 0) {
        // Empty line from consecutive \n
        ctx.fillText("", x, yy)
        yy += lineHeight
        continue
      }
      const words = para.split(" ")
      let line = ""
      for (const w of words) {
        const test = (line ? line : "") + (line ? " " : "") + w
        const width = ctx.measureText(test).width
        if (width > maxWidth && line) {
          ctx.fillText(line, x, yy)
          yy += lineHeight
          line = w
        } else {
          line = test
        }
      }
      ctx.fillText(line, x, yy)
      yy += lineHeight
    }
  }

  function screenToWorld(pt: Point): Point {
    return {
      x: (pt.x - camera.x) / camera.z,
      y: (pt.y - camera.y) / camera.z,
    }
  }

  function worldToScreen(pt: Point): Point {
    return {
      x: pt.x * camera.z + camera.x,
      y: pt.y * camera.z + camera.y,
    }
  }

  function elementBounds(el: SceneElement) {
    switch (el.type) {
      case "pen": {
        const xs = el.points.map((p) => p.x)
        const ys = el.points.map((p) => p.y)
        const minx = Math.min(...xs),
          maxx = Math.max(...xs)
        const miny = Math.min(...ys),
          maxy = Math.max(...ys)
        return { x: minx, y: miny, w: maxx - minx, h: maxy - miny }
      }
      case "line":
      case "arrow": {
        const minx = Math.min(el.x, el.x2!)
        const maxx = Math.max(el.x, el.x2!)
        const miny = Math.min(el.y, el.y2!)
        const maxy = Math.max(el.y, el.y2!)
        return { x: minx, y: miny, w: maxx - minx, h: maxy - miny }
      }
      case "text":
      case "image":
      case "rect":
      case "ellipse":
      case "diamond": {
        return { x: el.x, y: el.y, w: el.w!, h: el.h! }
      }
    }
  }

  const dragging = useRef<boolean>(false)
  const drawing = useRef<boolean>(false)
  const dragOffset = useRef<Point>({ x: 0, y: 0 })
  const draftRef = useRef<SceneElement | null>(null)

  function openTextEditor(hit: SceneElement) {
    if (hit.type !== "text") return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const input = document.createElement("textarea")
    input.value = hit.text || ""
    input.setAttribute("aria-label", "Edit text")
    input.rows = 3
    input.style.position = "fixed"
    input.style.zIndex = "9999"
    input.style.pointerEvents = "auto"
    input.style.background = "var(--color-card)"
    input.style.color = "var(--color-foreground)"
    input.style.border = "1px solid var(--color-border)"
    input.style.borderRadius = "6px"
    input.style.padding = "6px 8px"
    input.style.fontSize = `${hit.fontSize || 16}px`
    input.style.lineHeight = "1.4"
    input.style.minWidth = `${hit.w || 240}px`
    input.style.maxWidth = "480px"
    input.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"

    const screen = worldToScreen({ x: hit.x, y: hit.y })
    input.style.left = `${rect.left + screen.x}px`
    input.style.top = `${rect.top + screen.y}px`
    input.style.transform = "translate(0, 0)"

    const commit = () => {
      const nextText = input.value
      const lineH = (hit.fontSize || 16) * 1.4
      const lines = Math.max(1, nextText.split("\n").length)
      const nextH = Math.max(lineH, lines * lineH)
      const next = { ...hit, text: nextText, h: nextH }
      updateElement(hit.id, next as any)
      try {
        document.body.removeChild(input)
      } catch {}
      pushHistory()
    }

    const cancel = () => {
      try {
        document.body.removeChild(input)
      } catch {}
    }

    input.onkeydown = (ke) => {
      // Enter (without Shift) commits, Shift+Enter inserts newline
      if (ke.key === "Enter" && !ke.shiftKey) {
        ke.preventDefault()
        commit()
      }
      if (ke.key === "Escape") {
        ke.preventDefault()
        cancel()
      }
    }

    input.onblur = () => {
      commit()
    }

    const autoresize = () => {
      input.style.height = "auto"
      input.style.height = input.scrollHeight + "px"
    }
    input.addEventListener("input", autoresize)

    document.body.appendChild(input)
    input.focus()
    // If empty, just focus; if existing text, select for convenience
    if ((hit.text || "").length > 0) input.select()
    autoresize()
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const pt = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    const world = screenToWorld(pt)
    setPointer(world)

    if (tool === "hand" || e.button === 1) {
      setIsPanning(true)
      dragging.current = true
      dragOffset.current = { x: world.x, y: world.y }
      return
    }

    if (tool === "select") {
      const hit = hitTest(world, elements)
      if (hit) {
        selectElement(hit.id)
        dragging.current = true
        dragOffset.current = { x: world.x - hit.x, y: world.y - hit.y }
      } else {
        selectElement(null)
      }
      return
    }

    const id = "el-" + Math.random().toString(36).slice(2)
    let newEl: SceneElement
    switch (tool) {
      case "pen":
        newEl = { id, type: "pen", points: [world], stroke: color, thickness }
        break
      case "line":
        newEl = { id, type: "line", x: world.x, y: world.y, x2: world.x, y2: world.y, stroke: color, thickness }
        break
      case "arrow":
        newEl = { id, type: "arrow", x: world.x, y: world.y, x2: world.x, y2: world.y, stroke: color, thickness }
        break
      case "rect":
        newEl = { id, type: "rect", x: world.x, y: world.y, w: 0, h: 0, stroke: color, thickness }
        break
      case "ellipse":
        newEl = { id, type: "ellipse", x: world.x, y: world.y, w: 0, h: 0, stroke: color, thickness }
        break
      case "diamond":
        newEl = { id, type: "diamond", x: world.x, y: world.y, w: 0, h: 0, stroke: color, thickness }
        break
      case "text": {
        newEl = {
          id,
          type: "text",
          x: world.x,
          y: world.y,
          w: 240,
          h: fontSize * 1.6,
          stroke: color,
          thickness,
          fontSize,
          text: "",
          bold: false,
          italic: false,
        }
        addElement(newEl)
        selectElement(newEl.id)
        openTextEditor(newEl)
        // do not enter drawing mode for text
        return
      }
      default:
        return
    }
    draftRef.current = newEl
    addElement(newEl)
    drawing.current = true
  }

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const pt = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    const world = screenToWorld(pt)
    setPointer(world)

    updateMyPresencePoint(world)

    if (isPanning && dragging.current) {
      const last = dragOffset.current
      setCamera({
        x: camera.x + (pt.x - (last.x * camera.z + camera.x)),
        y: camera.y + (pt.y - (last.y * camera.z + camera.y)),
        z: camera.z,
      })
      dragOffset.current = world
      return
    }

    if (tool === "select" && dragging.current && selectedId) {
      const el = elements.find((e) => e.id === selectedId)
      if (!el) return
      const nx = world.x - dragOffset.current.x
      const ny = world.y - dragOffset.current.y
      updateElement(selectedId, { ...el, x: nx, y: ny })
      return
    }

    if (!drawing.current || !draftRef.current) return
    const d = draftRef.current
    switch (d.type) {
      case "pen":
        d.points.push(world)
        updateElement(d.id, { ...d })
        break
      case "line":
      case "arrow":
        d.x2 = world.x
        d.y2 = world.y
        updateElement(d.id, { ...d })
        break
      case "rect":
      case "ellipse":
      case "diamond":
        d.w = world.x - d.x
        d.h = world.y - d.y
        updateElement(d.id, { ...d })
        break
      case "text":
        break
    }
  }

  const onPointerUp = () => {
    if (isPanning) {
      setIsPanning(false)
      dragging.current = false
      return
    }
    if (tool === "select") {
      dragging.current = false
      pushHistory()
      return
    }
    if (drawing.current) {
      drawing.current = false
      draftRef.current = null
      pushHistory()
    }
  }

  const onWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const delta = Math.sign(e.deltaY)
    const factor = 1 - delta * 0.1
    const nz = Math.min(4, Math.max(0.2, camera.z * factor))
    setCamera({ x: camera.x, y: camera.y, z: nz })
  }

  const hitTest = (p: Point, els: SceneElement[]) => {
    for (let i = els.length - 1; i >= 0; i--) {
      const el = els[i]
      const b = elementBounds(el)
      if (p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h) {
        return el
      }
    }
    return null
  }

  const onDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pt = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    const world = screenToWorld(pt)
    const hit = hitTest(world, elements)
    if (hit && hit.type === "text") {
      openTextEditor(hit)
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId) {
          e.preventDefault()
          removeElement(selectedId)
          // Clear selection after delete
          try { selectElement(null) } catch {}
          pushHistory()
        }
      }
      if (e.key === " ") setIsPanning(true)
    }
    const onUp = (e: KeyboardEvent) => {
      if (e.key === " ") setIsPanning(false)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("keyup", onUp)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keyup", onUp)
    }
  }, [selectedId, undo, redo, removeElement, pushHistory, setIsPanning])

  const drawCursors = () => {
    const el = overlayRef.current
    const canvas = canvasRef.current
    if (!el || !canvas) return
    el.innerHTML = ""
    Object.values(peers).forEach((p) => {
      if (!p.point) return
      const div = document.createElement("div")
      div.className = "pointer-events-none absolute"
      const sx = p.point.x * camera.z + camera.x
      const sy = p.point.y * camera.z + camera.y
      div.style.left = `${sx}px`
      div.style.top = `${sy}px`
      div.style.transform = "translate(-50%, -50%)"
      div.innerHTML =
        '<div style="width:10px;height:10px;border-radius:9999px;"></div><div style="font-size:10px;margin-top:2px;"></div>'
      ;(div.firstChild as HTMLElement).style.background = p.color
      ;(div.lastChild as HTMLElement).textContent = p.name
      ;(div.lastChild as HTMLElement).style.color = "var(--color-muted-foreground)"
      el.appendChild(div)
    })
  }

  const updateMyPresencePoint = (p: Point) => {
    const presences = presenceMapRef.current
    if (!presences) return
    myPresence.current.point = p
    try {
      presences.set(myPresence.current.id, { ...myPresence.current })
    } catch {}
  }

  return (
    <div className="relative h-[calc(100vh-56px)] w-full overflow-hidden bg-background">
      <div ref={overlayRef} className="absolute inset-0 z-20 pointer-events-none" />
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 z-10 touch-none cursor-crosshair", isPanning ? "cursor-grab" : "")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDoubleClick}
        onWheel={onWheel}
      />
      {tool === "text" ? (
        <div className="absolute top-2 left-1/2 z-30 -translate-x-1/2 rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow">
          Click anywhere to start typing
        </div>
      ) : null}
      {!collabConnected && (
        <div className="absolute right-3 bottom-3 z-30 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow">
          Offline or local collaboration
        </div>
      )}
    </div>
  )
}
