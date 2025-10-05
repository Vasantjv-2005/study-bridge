import { useWhiteboardStore } from "./store"
import type { BoardState } from "./types"

export async function exportPNG(): Promise<boolean> {
  const canvas = document.querySelector("canvas")
  if (!canvas) return false
  const url = canvas.toDataURL("image/png")
  const ok = await downloadDataUrl(url, "collabcanvas.png")
  return ok
}

export async function exportJPEG(): Promise<boolean> {
  const canvas = document.querySelector("canvas")
  if (!canvas) return false
  const url = canvas.toDataURL("image/jpeg", 0.92)
  const ok = await downloadDataUrl(url, "collabcanvas.jpg")
  return ok
}

export function exportJSON() {
  const state = currentState()
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = "collabcanvas.json"
  a.click()
}

export function exportStateAsJSON(): string {
  const state = currentState()
  return JSON.stringify(state)
}

export async function exportBoardJSONBlob() {
  const state = currentState()
  return new Blob([JSON.stringify(state, null, 2)], { type: "application/json" })
}

export async function exportCanvasBlob(type: "image/png" | "image/jpeg") {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement | null
  if (!canvas) throw new Error("No canvas")
  return await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b as Blob), type))
}

function currentState(): BoardState {
  const s = useWhiteboardStore.getState()
  return { elements: s.elements, camera: s.camera }
}

async function downloadDataUrl(url: string, filename: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  return true
}
