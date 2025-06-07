"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Map,
  Plus,
  Download,
  Share,
  Trash2,
  Edit,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  GitBranch,
  Lightbulb,
} from "lucide-react"

interface MindMapNode {
  id: string
  text: string
  x: number
  y: number
  color: string
  level: number
  parentId?: string
  children: string[]
}

interface MindMap {
  id: string
  title: string
  description: string
  subject: string
  nodes: MindMapNode[]
  createdAt: string
  updatedAt: string
}

const colorOptions = [
  { name: "Blue", value: "#3B82F6", bg: "bg-blue-500" },
  { name: "Green", value: "#10B981", bg: "bg-green-500" },
  { name: "Purple", value: "#8B5CF6", bg: "bg-purple-500" },
  { name: "Red", value: "#EF4444", bg: "bg-red-500" },
  { name: "Orange", value: "#F59E0B", bg: "bg-orange-500" },
  { name: "Pink", value: "#EC4899", bg: "bg-pink-500" },
  { name: "Indigo", value: "#6366F1", bg: "bg-indigo-500" },
  { name: "Teal", value: "#14B8A6", bg: "bg-teal-500" },
]

const sampleMindMaps: MindMap[] = [
  {
    id: "1",
    title: "Photosynthesis Process",
    description: "Understanding how plants convert light energy into chemical energy",
    subject: "Biology",
    nodes: [
      {
        id: "root",
        text: "Photosynthesis",
        x: 400,
        y: 300,
        color: "#10B981",
        level: 0,
        children: ["light", "dark"],
      },
      {
        id: "light",
        text: "Light Reactions",
        x: 200,
        y: 200,
        color: "#3B82F6",
        level: 1,
        parentId: "root",
        children: ["chlorophyll", "atp"],
      },
      {
        id: "dark",
        text: "Calvin Cycle",
        x: 600,
        y: 200,
        color: "#8B5CF6",
        level: 1,
        parentId: "root",
        children: ["co2", "glucose"],
      },
      {
        id: "chlorophyll",
        text: "Chlorophyll",
        x: 100,
        y: 100,
        color: "#10B981",
        level: 2,
        parentId: "light",
        children: [],
      },
      {
        id: "atp",
        text: "ATP Production",
        x: 300,
        y: 100,
        color: "#F59E0B",
        level: 2,
        parentId: "light",
        children: [],
      },
      {
        id: "co2",
        text: "CO₂ Fixation",
        x: 500,
        y: 100,
        color: "#EF4444",
        level: 2,
        parentId: "dark",
        children: [],
      },
      {
        id: "glucose",
        text: "Glucose Formation",
        x: 700,
        y: 100,
        color: "#EC4899",
        level: 2,
        parentId: "dark",
        children: [],
      },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
]

export default function MindMapPage() {
  const [mindMaps, setMindMaps] = useState<MindMap[]>(sampleMindMaps)
  const [selectedMap, setSelectedMap] = useState<MindMap | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditingNode, setIsEditingNode] = useState<string | null>(null)
  const [newMapData, setNewMapData] = useState({
    title: "",
    description: "",
    subject: "",
    rootNodeText: "",
  })
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [newNodeText, setNewNodeText] = useState("")
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value)
  const [zoom, setZoom] = useState(1)

  const createNewMindMap = () => {
    if (!newMapData.title || !newMapData.rootNodeText) {
      alert("Please fill in the title and root node text")
      return
    }

    const newMap: MindMap = {
      id: Date.now().toString(),
      title: newMapData.title,
      description: newMapData.description,
      subject: newMapData.subject || "General",
      nodes: [
        {
          id: "root",
          text: newMapData.rootNodeText,
          x: 400,
          y: 300,
          color: colorOptions[0].value,
          level: 0,
          children: [],
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setMindMaps([...mindMaps, newMap])
    setSelectedMap(newMap)
    setNewMapData({ title: "", description: "", subject: "", rootNodeText: "" })
    setIsCreateModalOpen(false)
  }

  const addChildNode = () => {
    if (!selectedMap || !selectedNodeId || !newNodeText.trim()) return

    const parentNode = selectedMap.nodes.find((n) => n.id === selectedNodeId)
    if (!parentNode) return

    const newNodeId = Date.now().toString()
    const childrenCount = parentNode.children.length
    const angle = childrenCount * 60 - 30 // Spread children around parent
    const distance = 150
    const newX = parentNode.x + Math.cos((angle * Math.PI) / 180) * distance
    const newY = parentNode.y + Math.sin((angle * Math.PI) / 180) * distance

    const newNode: MindMapNode = {
      id: newNodeId,
      text: newNodeText,
      x: newX,
      y: newY,
      color: selectedColor,
      level: parentNode.level + 1,
      parentId: selectedNodeId,
      children: [],
    }

    const updatedNodes = selectedMap.nodes.map((node) =>
      node.id === selectedNodeId ? { ...node, children: [...node.children, newNodeId] } : node,
    )

    const updatedMap = {
      ...selectedMap,
      nodes: [...updatedNodes, newNode],
      updatedAt: new Date().toISOString(),
    }

    setSelectedMap(updatedMap)
    setMindMaps(mindMaps.map((map) => (map.id === selectedMap.id ? updatedMap : map)))
    setNewNodeText("")
  }

  const deleteNode = (nodeId: string) => {
    if (!selectedMap || nodeId === "root") return

    const nodeToDelete = selectedMap.nodes.find((n) => n.id === nodeId)
    if (!nodeToDelete) return

    // Remove from parent's children
    const updatedNodes = selectedMap.nodes
      .filter((node) => node.id !== nodeId && !isDescendant(node.id, nodeId, selectedMap.nodes))
      .map((node) => ({
        ...node,
        children: node.children.filter((childId) => childId !== nodeId),
      }))

    const updatedMap = {
      ...selectedMap,
      nodes: updatedNodes,
      updatedAt: new Date().toISOString(),
    }

    setSelectedMap(updatedMap)
    setMindMaps(mindMaps.map((map) => (map.id === selectedMap.id ? updatedMap : map)))
    setSelectedNodeId(null)
  }

  const isDescendant = (nodeId: string, ancestorId: string, nodes: MindMapNode[]): boolean => {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node || !node.parentId) return false
    if (node.parentId === ancestorId) return true
    return isDescendant(node.parentId, ancestorId, nodes)
  }

  const updateNodeText = (nodeId: string, newText: string) => {
    if (!selectedMap) return

    const updatedNodes = selectedMap.nodes.map((node) => (node.id === nodeId ? { ...node, text: newText } : node))

    const updatedMap = {
      ...selectedMap,
      nodes: updatedNodes,
      updatedAt: new Date().toISOString(),
    }

    setSelectedMap(updatedMap)
    setMindMaps(mindMaps.map((map) => (map.id === selectedMap.id ? updatedMap : map)))
    setIsEditingNode(null)
  }

  const exportMindMap = () => {
    if (!selectedMap) return
    const dataStr = JSON.stringify(selectedMap, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${selectedMap.title.replace(/\s+/g, "_")}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const renderMindMapCanvas = () => {
    if (!selectedMap) return null

    return (
      <div className="relative w-full h-[600px] border rounded-lg overflow-hidden bg-gray-50">
        <svg width="100%" height="100%" style={{ transform: `scale(${zoom})` }} className="absolute inset-0">
          {/* Render connections */}
          {selectedMap.nodes.map((node) =>
            node.children.map((childId) => {
              const child = selectedMap.nodes.find((n) => n.id === childId)
              if (!child) return null
              return (
                <line
                  key={`${node.id}-${childId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={child.x}
                  y2={child.y}
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
              )
            }),
          )}

          {/* Render nodes */}
          {selectedMap.nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.level === 0 ? 40 : 30}
                fill={node.color}
                stroke={selectedNodeId === node.id ? "#1F2937" : "white"}
                strokeWidth={selectedNodeId === node.id ? 3 : 2}
                className="cursor-pointer hover:opacity-80"
                onClick={() => setSelectedNodeId(node.id)}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={node.level === 0 ? "14" : "12"}
                fontWeight="bold"
                className="pointer-events-none select-none"
              >
                {node.text.length > 12 ? `${node.text.substring(0, 12)}...` : node.text}
              </text>
            </g>
          ))}
        </svg>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 0.1, 2))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(1)}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Node Info Panel */}
        {selectedNodeId && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Node Details</h4>
              <Button variant="ghost" size="sm" onClick={() => setSelectedNodeId(null)}>
                ×
              </Button>
            </div>
            {(() => {
              const node = selectedMap.nodes.find((n) => n.id === selectedNodeId)
              if (!node) return null
              return (
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Text:</strong> {node.text}
                  </p>
                  <p className="text-sm">
                    <strong>Level:</strong> {node.level}
                  </p>
                  <p className="text-sm">
                    <strong>Children:</strong> {node.children.length}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditingNode(selectedNodeId)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {selectedNodeId !== "root" && (
                      <Button variant="destructive" size="sm" onClick={() => deleteNode(selectedNodeId)}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Map className="h-8 w-8 mr-3 text-blue-600" />
          Mind Mapping Tool
        </h1>
        <p className="text-gray-600">Visualize concepts and their relationships</p>
      </div>

      {selectedMap ? (
        // Mind Map Editor View
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selectedMap.title}</h2>
              <p className="text-gray-600">{selectedMap.description}</p>
              <Badge variant="outline" className="mt-2">
                {selectedMap.subject}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setSelectedMap(null)}>
                Back to Maps
              </Button>
              <Button variant="outline" onClick={exportMindMap}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Mind Map Canvas */}
            <div className="lg:col-span-3">{renderMindMapCanvas()}</div>

            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Add Node */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Node
                  </CardTitle>
                  <CardDescription>
                    {selectedNodeId ? "Add child to selected node" : "Select a node first"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Node Text</Label>
                    <Input
                      placeholder="Enter node text..."
                      value={newNodeText}
                      onChange={(e) => setNewNodeText(e.target.value)}
                      disabled={!selectedNodeId}
                    />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                            selectedColor === color.value ? "border-gray-800" : "border-gray-300"
                          }`}
                          onClick={() => setSelectedColor(color.value)}
                        />
                      ))}
                    </div>
                  </div>
                  <Button onClick={addChildNode} disabled={!selectedNodeId || !newNodeText.trim()} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Child Node
                  </Button>
                </CardContent>
              </Card>

              {/* Map Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GitBranch className="h-5 w-5 mr-2" />
                    Map Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Nodes:</span>
                    <span className="font-medium">{selectedMap.nodes.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Max Depth:</span>
                    <span className="font-medium">{Math.max(...selectedMap.nodes.map((n) => n.level))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Created:</span>
                    <span className="font-medium">{new Date(selectedMap.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Updated:</span>
                    <span className="font-medium">{new Date(selectedMap.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Click on nodes to select them</p>
                  <p>• Add child nodes to expand concepts</p>
                  <p>• Use different colors to categorize ideas</p>
                  <p>• Zoom in/out for better navigation</p>
                  <p>• Export your maps for sharing</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Edit Node Dialog */}
          {isEditingNode && (
            <Dialog open={!!isEditingNode} onOpenChange={() => setIsEditingNode(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Node</DialogTitle>
                  <DialogDescription>Update the node text</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Node Text</Label>
                    <Input
                      defaultValue={selectedMap.nodes.find((n) => n.id === isEditingNode)?.text}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          updateNodeText(isEditingNode, e.currentTarget.value)
                        }
                      }}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditingNode(null)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        const input = document.querySelector("input[defaultValue]") as HTMLInputElement
                        if (input) updateNodeText(isEditingNode, input.value)
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ) : (
        // Mind Maps Library View
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Mind Maps</h2>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Map
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Mind Map</DialogTitle>
                  <DialogDescription>Start with a central concept and build from there</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Map Title</Label>
                    <Input
                      placeholder="e.g., Photosynthesis Process"
                      value={newMapData.title}
                      onChange={(e) => setNewMapData({ ...newMapData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Brief description of what this map covers..."
                      value={newMapData.description}
                      onChange={(e) => setNewMapData({ ...newMapData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Select
                      value={newMapData.subject}
                      onValueChange={(value) => setNewMapData({ ...newMapData, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Literature">Literature</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Central Concept</Label>
                    <Input
                      placeholder="e.g., Photosynthesis"
                      value={newMapData.rootNodeText}
                      onChange={(e) => setNewMapData({ ...newMapData, rootNodeText: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createNewMindMap}>Create Map</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mindMaps.map((map) => (
              <Card key={map.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{map.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{map.description}</p>
                      <Badge variant="outline">{map.subject}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{map.nodes.length} nodes</span>
                    <span>{new Date(map.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <Button className="w-full" onClick={() => setSelectedMap(map)}>
                    <Map className="h-4 w-4 mr-2" />
                    Open Map
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {mindMaps.length === 0 && (
            <div className="text-center py-12">
              <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No mind maps yet</h3>
              <p className="text-gray-600 mb-4">Create your first mind map to start visualizing concepts</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Map
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
