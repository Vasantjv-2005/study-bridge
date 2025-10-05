"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useWhiteboardStore } from "@/lib/whiteboard/store"
import { exportJPEG, exportJSON, exportPNG } from "@/lib/whiteboard/export"
import type React from "react"
import { useMemo, useRef } from "react"

export function Toolbar() {
  const {
    tool,
    setTool,
    color,
    setColor,
    thickness,
    setThickness,
    fontSize,
    setFontSize,
    undo,
    redo,
    canUndo,
    canRedo,
    zoomIn,
    zoomOut,
    camera,
    selectedId,
    bringForward,
    sendBackward,
    loadFromLocal,
    saveToLocal,
    clearBoard,
    setImageOnUpload,
    makeShareLink,
  } = useWhiteboardStore()

  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement | null>(null)

  const colorOptions = useMemo(() => ["#0A84FF", "#111827", "#ef4444", "#10b981", "#f59e0b", "#0891B2"], [])

  const pickImage = () => fileRef.current?.click()

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await setImageOnUpload(file)
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      try {
        const ta = document.createElement("textarea")
        ta.value = text
        ta.style.position = "fixed"
        ta.style.left = "-9999px"
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        const ok = document.execCommand("copy")
        document.body.removeChild(ta)
        return ok
      } catch {
        return false
      }
    }
  }

  return (
    <div className="flex w-full md:w-[320px] flex-col gap-4 p-3">
      <div>
        <div className="text-sm font-medium">Tools</div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <ButtonGroup className="col-span-3">
            <Button variant={tool === "select" ? "default" : "outline"} onClick={() => setTool("select")}>
              Select
            </Button>
            <Button variant={tool === "hand" ? "default" : "outline"} onClick={() => setTool("hand")}>
              Hand
            </Button>
          </ButtonGroup>
          <Button variant={tool === "pen" ? "default" : "outline"} onClick={() => setTool("pen")}>
            Pen
          </Button>
          <Button variant={tool === "line" ? "default" : "outline"} onClick={() => setTool("line")}>
            Line
          </Button>
          <Button variant={tool === "arrow" ? "default" : "outline"} onClick={() => setTool("arrow")}>
            Arrow
          </Button>
          <Button variant={tool === "rect" ? "default" : "outline"} onClick={() => setTool("rect")}>
            Rect
          </Button>
          <Button variant={tool === "ellipse" ? "default" : "outline"} onClick={() => setTool("ellipse")}>
            Circle
          </Button>
          <Button variant={tool === "diamond" ? "default" : "outline"} onClick={() => setTool("diamond")}>
            Diamond
          </Button>
          <Button title="Text" variant={tool === "text" ? "default" : "outline"} onClick={() => setTool("text")}>
            A
          </Button>
          <Button variant="outline" onClick={pickImage}>
            Image
          </Button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-3 items-center gap-2">
        <Label className="col-span-1 text-xs">Color</Label>
        <div className="col-span-2 flex items-center gap-1">
          {colorOptions.map((c) => (
            <button
              key={c}
              aria-label={"Color " + c}
              onClick={() => setColor(c)}
              className="h-6 w-6 rounded-md border"
              style={{ background: c, outline: color === c ? "2px solid var(--color-ring)" : "none" }}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-6 w-8 rounded-md border bg-card"
          />
        </div>

        <Label className="col-span-1 text-xs">Thickness</Label>
        <div className="col-span-2">
          <Slider value={[thickness]} min={1} max={20} step={1} onValueChange={(v) => setThickness(v[0] ?? 2)} />
        </div>

        <Label className="col-span-1 text-xs">Font</Label>
        <div className="col-span-2 flex items-center gap-2">
          <Input
            type="number"
            min={10}
            max={96}
            value={fontSize}
            onChange={(e) => setFontSize(Number.parseInt(e.target.value || "16", 10))}
            className="h-8 w-24"
          />
          <span className="text-xs text-muted-foreground">px</span>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" onClick={undo} disabled={!canUndo}>
          Undo
        </Button>
        <Button variant="secondary" onClick={redo} disabled={!canRedo}>
          Redo
        </Button>
        <Button variant="outline" onClick={() => zoomOut()}>
          Zoom -
        </Button>
        <Button variant="outline" onClick={() => zoomIn()}>
          Zoom +
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">Zoom: {(camera.z * 100).toFixed(0)}%</div>

      <Separator />

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" disabled={!selectedId} onClick={() => bringForward()}>
          Layer Up
        </Button>
        <Button variant="outline" disabled={!selectedId} onClick={() => sendBackward()}>
          Layer Down
        </Button>
        <Button
          variant="destructive"
          disabled={!selectedId}
          onClick={() => {
            // delete is handled via store shortcut too
            // but provide explicit button for clarity
            const ev = new KeyboardEvent("keydown", { key: "Delete" })
            window.dispatchEvent(ev)
          }}
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={() => clearBoard()}>
          Clear
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={async () => {
            const ok = await exportPNG()
            toast({ description: ok ? "Exported PNG" : "Failed to export PNG" })
          }}
        >
          Export PNG
        </Button>
        <Button
          onClick={async () => {
            const ok = await exportJPEG()
            toast({ description: ok ? "Exported JPEG" : "Failed to export JPEG" })
          }}
        >
          Export JPG
        </Button>
        <Button variant="outline" onClick={() => exportJSON()}>
          Export JSON
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            saveToLocal()
            toast({ description: "Saved board locally" })
          }}
        >
          Save Local
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const exists = !!localStorage.getItem("collabcanvas-board")
            if (!exists) {
              toast({ description: "No local save found" })
              return
            }
            loadFromLocal()
            toast({ description: "Loaded board from local save" })
          }}
        >
          Load Local
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={async () => {
            const url = makeShareLink()
            const ok = await copyToClipboard(url)
            toast({ description: ok ? "Share link copied" : "Copy failed. Select and copy manually: " + url })
          }}
        >
          Share Link
        </Button>
      </div>
    </div>
  )
}
