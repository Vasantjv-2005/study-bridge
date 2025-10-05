"use client"

import { create } from "zustand"
import type { BoardState, Camera, SceneElement, Tool, Point } from "./types"

type Store = {
  elements: SceneElement[]
  selectedId: string | null
  tool: Tool
  color: string
  thickness: number
  fontSize: number
  camera: Camera
  pointer: Point | null
  isPanning: boolean
  history: BoardState[]
  future: BoardState[]
  collabConnected: boolean

  setElements: (els: SceneElement[]) => void
  addElement: (el: SceneElement) => void
  updateElement: (id: string, el: SceneElement) => void
  removeElement: (id: string) => void
  selectElement: (id: string | null) => void

  setTool: (t: Tool) => void
  setColor: (c: string) => void
  setThickness: (v: number) => void
  setFontSize: (v: number) => void

  setCamera: (c: Camera) => void
  setPointer: (p: Point | null) => void
  setIsPanning: (v: boolean) => void

  pushHistory: () => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean

  zoomIn: () => void
  zoomOut: () => void

  bringForward: () => void
  sendBackward: () => void
  clearBoard: () => void

  saveToLocal: () => void
  loadFromLocal: () => void

  setImageOnUpload: (file: File) => Promise<void>

  setCollabConnected: (v: boolean) => void

  makeShareLink: () => string
}

const initial: BoardState = {
  elements: [],
  camera: {
    x: 0,
    y: 0,
    z: 1,
  },
}

export const useWhiteboardStore = create<Store>((set, get) => ({
  elements: [],
  selectedId: null,
  tool: "select",
  color: "#0A84FF",
  thickness: 2,
  fontSize: 18,
  camera: { x: 0, y: 0, z: 1 },
  pointer: null,
  isPanning: false,
  history: [],
  future: [],
  collabConnected: false,

  setElements: (els) => set({ elements: els }),
  addElement: (el) => set({ elements: [...get().elements, el] }),
  updateElement: (id, el) => set({ elements: get().elements.map((e) => (e.id === id ? el : e)) }),
  removeElement: (id) => {
    const next = get().elements.filter((e) => e.id !== id)
    set({ elements: next, selectedId: get().selectedId === id ? null : get().selectedId })
  },
  selectElement: (id) => set({ selectedId: id }),

  setTool: (t) => set({ tool: t }),
  setColor: (c) => set({ color: c }),
  setThickness: (v) => set({ thickness: v }),
  setFontSize: (v) => set({ fontSize: v }),

  setCamera: (c) => set({ camera: c }),
  setPointer: (p) => set({ pointer: p }),
  setIsPanning: (v) => set({ isPanning: v }),

  pushHistory: () => {
    const snap: BoardState = { elements: structuredClone(get().elements), camera: { ...get().camera } }
    set({ history: [...get().history, snap], future: [] })
  },
  undo: () => {
    const hist = get().history
    if (!hist.length) return
    const last = hist[hist.length - 1]
    const rest = hist.slice(0, -1)
    const cur: BoardState = { elements: structuredClone(get().elements), camera: { ...get().camera } }
    set({ elements: last.elements, camera: last.camera, history: rest, future: [cur, ...get().future] })
  },
  redo: () => {
    const fut = get().future
    if (!fut.length) return
    const next = fut[0]
    const rest = fut.slice(1)
    const cur: BoardState = { elements: structuredClone(get().elements), camera: { ...get().camera } }
    set({ elements: next.elements, camera: next.camera, future: rest, history: [...get().history, cur] })
  },
  canUndo: false,
  canRedo: false,

  zoomIn: () => {
    const c = get().camera
    set({ camera: { ...c, z: Math.min(4, c.z * 1.1) } })
  },
  zoomOut: () => {
    const c = get().camera
    set({ camera: { ...c, z: Math.max(0.2, c.z / 1.1) } })
  },

  bringForward: () => {
    const { elements, selectedId } = get()
    if (!selectedId) return
    const i = elements.findIndex((e) => e.id === selectedId)
    if (i < 0 || i === elements.length - 1) return
    const next = elements.slice()
    const [el] = next.splice(i, 1)
    next.splice(i + 1, 0, el)
    set({ elements: next })
  },
  sendBackward: () => {
    const { elements, selectedId } = get()
    if (!selectedId) return
    const i = elements.findIndex((e) => e.id === selectedId)
    if (i <= 0) return
    const next = elements.slice()
    const [el] = next.splice(i, 1)
    next.splice(i - 1, 0, el)
    set({ elements: next })
  },
  clearBoard: () => set({ elements: [], selectedId: null }),

  saveToLocal: () => {
    const state: BoardState = { elements: get().elements, camera: get().camera }
    localStorage.setItem("collabcanvas-board", JSON.stringify(state))
  },
  loadFromLocal: () => {
    const raw = localStorage.getItem("collabcanvas-board")
    if (!raw) return
    const state: BoardState = JSON.parse(raw)
    set({ elements: state.elements, camera: state.camera })
  },

  setImageOnUpload: async (file: File) => {
    const url = URL.createObjectURL(file)
    const id = "el-" + Math.random().toString(36).slice(2)
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = url
    await img.decode().catch(() => {})
    const el: SceneElement = {
      id,
      type: "image",
      x: 100,
      y: 100,
      w: img.width ? Math.min(400, img.width) : 320,
      h: img.height ? Math.min(300, img.height) : 180,
      stroke: "#000",
      thickness: 1,
      src: url,
    } as any
    ;(el as any)._image = img
    set({ elements: [...get().elements, el] })
  },

  setCollabConnected: (v) => set({ collabConnected: v }),

  makeShareLink: () => {
    const url = new URL(window.location.href)
    let room = url.searchParams.get("room")
    if (!room) {
      room = Math.random().toString(36).slice(2, 8)
      url.searchParams.set("room", room)
      // Reflect in current URL so the shown link matches what we copy
      window.history.replaceState(null, "", url.toString())
    }
    return url.toString()
  },
}))

// Keep canUndo/canRedo derived flags in sync
useWhiteboardStore.subscribe((s) => {
  const canUndo = s.history.length > 0
  const canRedo = s.future.length > 0
  if (s.canUndo !== canUndo || s.canRedo !== canRedo) {
    useWhiteboardStore.setState({ canUndo, canRedo })
  }
})
