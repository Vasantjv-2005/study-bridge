"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Upload,
  Download,
  Star,
  Eye,
  BookOpen,
  ImageIcon,
  Video,
  Globe,
  Award,
  TrendingUp,
  FileText,
  X,
  File,
} from "lucide-react"
import Link from "next/link"

export default function MaterialsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    subject: "",
    materialType: "",
    educationLevel: "",
    language: "english",
    tags: [] as string[],
    file: null as File | null,
  })
  const [currentTag, setCurrentTag] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleUploadMaterial = () => {
    if (!newMaterial.title || !newMaterial.description || !newMaterial.subject || !newMaterial.materialType) {
      alert("Please fill in all required fields")
      return
    }

    if (!newMaterial.file) {
      alert("Please select a file to upload")
      return
    }

    // Here you would typically upload to cloud storage and save to database
    console.log("New material:", newMaterial)
    alert("Material uploaded successfully!")

    // Reset form
    setNewMaterial({
      title: "",
      description: "",
      subject: "",
      materialType: "",
      educationLevel: "",
      language: "english",
      tags: [],
      file: null,
    })
    setIsUploadModalOpen(false)
  }

  const addTag = () => {
    if (currentTag && !newMaterial.tags.includes(currentTag)) {
      setNewMaterial({
        ...newMaterial,
        tags: [...newMaterial.tags, currentTag],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewMaterial({
      ...newMaterial,
      tags: newMaterial.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setNewMaterial({
        ...newMaterial,
        file: e.dataTransfer.files[0],
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMaterial({
        ...newMaterial,
        file: e.target.files[0],
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">StudyBridge</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/questions" className="text-gray-600 hover:text-blue-600">
                Questions
              </Link>
              <Link href="/materials" className="text-blue-600 font-medium">
                Materials
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-blue-600">
                Video Chat
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <Award className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">1,250 pts</span>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Materials Library</h1>
            <p className="text-gray-600">Share and discover study materials from students worldwide</p>
          </div>

          {/* Upload Material Dialog */}
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                <Upload className="h-4 w-4 mr-2" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upload Study Material</DialogTitle>
                <DialogDescription>
                  Share your study materials with the global community and earn points
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Material Title *</Label>
                  <Input
                    id="title"
                    placeholder="Give your material a descriptive title..."
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this material covers and how it can help other students..."
                    className="min-h-[100px]"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={newMaterial.subject}
                      onValueChange={(value) => setNewMaterial({ ...newMaterial, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="languages">Languages</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                        <SelectItem value="economics">Economics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="materialType">Material Type *</Label>
                    <Select
                      value={newMaterial.materialType}
                      onValueChange={(value) => setNewMaterial({ ...newMaterial, materialType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notes">Notes</SelectItem>
                        <SelectItem value="summaries">Summaries</SelectItem>
                        <SelectItem value="presentations">Presentations</SelectItem>
                        <SelectItem value="practice-tests">Practice Tests</SelectItem>
                        <SelectItem value="videos">Videos</SelectItem>
                        <SelectItem value="assignments">Assignments</SelectItem>
                        <SelectItem value="textbooks">Textbooks</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="educationLevel">Education Level</Label>
                    <Select
                      value={newMaterial.educationLevel}
                      onValueChange={(value) => setNewMaterial({ ...newMaterial, educationLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={newMaterial.language}
                      onValueChange={(value) => setNewMaterial({ ...newMaterial, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="portuguese">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* File Upload Area */}
                <div>
                  <Label>Upload File *</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {newMaterial.file ? (
                      <div className="space-y-2">
                        <File className="h-8 w-8 mx-auto text-blue-600" />
                        <p className="font-medium">{newMaterial.file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(newMaterial.file.size)}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNewMaterial({ ...newMaterial, file: null })}
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="text-gray-600">Drag and drop your file here, or click to browse</p>
                        <p className="text-sm text-gray-500">Supports PDF, DOC, PPT, images, videos (max 50MB)</p>
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mov,.avi"
                        />
                        <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                          Browse Files
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Tags (Optional)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newMaterial.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUploadMaterial}>Upload Material</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rest of the existing component remains the same */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Material Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notes">Notes</SelectItem>
                      <SelectItem value="summaries">Summaries</SelectItem>
                      <SelectItem value="presentations">Presentations</SelectItem>
                      <SelectItem value="practice-tests">Practice Tests</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Education Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All languages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Popular Materials */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span>Popular This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Calculus Cheat Sheet</p>
                    <p className="text-xs text-gray-500">Downloaded 234 times</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Organic Chemistry Notes</p>
                    <p className="text-xs text-gray-500">Downloaded 189 times</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Physics Lab Demo</p>
                    <p className="text-xs text-gray-500">Viewed 156 times</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search materials..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Material Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Materials</TabsTrigger>
                <TabsTrigger value="my-materials">My Materials</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {/* Material Cards - keeping existing content */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">Advanced Calculus Study Guide</h3>
                            <Badge className="bg-blue-100 text-blue-700">PDF</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Comprehensive guide covering derivatives, integrals, and applications. Perfect for exam
                            preparation.
                          </p>
                          <div className="flex items-center space-x-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">MK</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">Maria K.</span>
                            <Badge variant="secondary">🇧🇷 Brazil</Badge>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge className="bg-blue-100 text-blue-700">Mathematics</Badge>
                            <Badge variant="outline">Calculus</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                4.8 (24)
                              </span>
                              <span className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                156
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                342
                              </span>
                            </div>
                            <Button size="sm">Download</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">Organic Chemistry Lab Notes</h3>
                            <Badge className="bg-green-100 text-green-700">DOCX</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Detailed lab procedures and observations from organic chemistry experiments. Includes
                            reaction mechanisms.
                          </p>
                          <div className="flex items-center space-x-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">AS</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">Ahmed S.</span>
                            <Badge variant="secondary">🇪🇬 Egypt</Badge>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge className="bg-green-100 text-green-700">Chemistry</Badge>
                            <Badge variant="outline">Lab Work</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                4.6 (18)
                              </span>
                              <span className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                89
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                203
                              </span>
                            </div>
                            <Button size="sm">Download</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Video className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">Physics: Wave Motion Explained</h3>
                            <Badge className="bg-purple-100 text-purple-700">MP4</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Visual explanation of wave properties, interference, and standing waves. Great for visual
                            learners.
                          </p>
                          <div className="flex items-center space-x-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">YT</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">Yuki T.</span>
                            <Badge variant="secondary">🇯🇵 Japan</Badge>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge className="bg-red-100 text-red-700">Physics</Badge>
                            <Badge variant="outline">Waves</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                4.9 (31)
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                567
                              </span>
                              <span>15 min</span>
                            </div>
                            <Button size="sm">Watch</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">Spanish Grammar Infographic</h3>
                            <Badge className="bg-orange-100 text-orange-700">PNG</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Visual guide to Spanish verb conjugations and grammar rules. Perfect for quick reference.
                          </p>
                          <div className="flex items-center space-x-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">SC</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">Sophie C.</span>
                            <Badge variant="secondary">🇫🇷 France</Badge>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge className="bg-yellow-100 text-yellow-700">Languages</Badge>
                            <Badge variant="outline">Spanish</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                4.7 (22)
                              </span>
                              <span className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                134
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                298
                              </span>
                            </div>
                            <Button size="sm">Download</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="my-materials" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">You haven't uploaded any materials yet</h3>
                  <p className="text-gray-600 mb-4">Share your study materials to help others and earn points</p>
                  <Button onClick={() => setIsUploadModalOpen(true)}>Upload Your First Material</Button>
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No favorite materials yet</h3>
                  <p className="text-gray-600">Star materials you find helpful to save them here</p>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No recently viewed materials</h3>
                  <p className="text-gray-600">Materials you view will appear here for easy access</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
