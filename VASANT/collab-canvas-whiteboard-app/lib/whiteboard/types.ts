export type Point = { x: number; y: number }

export type Tool = "select" | "hand" | "pen" | "line" | "arrow" | "rect" | "ellipse" | "diamond" | "text"

export type BaseElement = {
  id: string
  stroke: string
  thickness: number
}

export type Size = { w?: number; h?: number }

export type Positioned = { x: number; y: number }

export type Pen = BaseElement & { type: "pen"; points: Point[] }
export type Line = BaseElement & { type: "line" | "arrow"; x: number; y: number; x2?: number; y2?: number }
export type RectLike = BaseElement & Positioned & Size & { type: "rect" | "ellipse" | "diamond"; fill?: string }
export type TextEl = BaseElement &
  Positioned &
  Size & { type: "text"; text?: string; fontSize: number; bold?: boolean; italic?: boolean }
export type ImageEl = BaseElement & Positioned & Size & { type: "image"; src: string }

export type SceneElement = Pen | Line | RectLike | TextEl | ImageEl

export type Camera = { x: number; y: number; z: number }

export type BoardState = {
  elements: SceneElement[]
  camera: Camera
}
