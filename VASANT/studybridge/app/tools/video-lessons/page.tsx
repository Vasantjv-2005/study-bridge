"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Video, Play, Pause, Star, Download, Share, PenTool, Save, Search, Eye, ThumbsUp } from "lucide-react"

interface VideoLesson {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  subject: string
  difficulty: "beginner" | "intermediate" | "advanced"
  thumbnail: string
  videoUrl: string
  views: number
  likes: number
  rating: number
  tags: string[]
  uploadDate: string
}

interface Note {
  id: string
  videoId: string
  timestamp: number
  content: string
  createdAt: string
}

const sampleLessons: VideoLesson[] = [
  {
    id: "1",
    title: "Introduction to Calculus - Limits and Derivatives",
    description: "Learn the fundamental concepts of calculus including limits, continuity, and basic derivatives.",
    instructor: "Dr. Sarah Johnson",
    duration: "45:30",
    subject: "Mathematics",
    difficulty: "intermediate",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://example.com/video1",
    views: 1250,
    likes: 89,
    rating: 4.8,
    tags: ["calculus", "derivatives", "limits"],
    uploadDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Quantum Mechanics Basics",
    description: "Understanding wave-particle duality and the Schrödinger equation.",
    instructor: "Prof. Michael Chen",
    duration: "52:15",
    subject: "Physics",
    difficulty: "advanced",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://example.com/video2",
    views: 890,
    likes: 67,
    rating: 4.9,
    tags: ["quantum", "physics", "mechanics"],
    uploadDate: "2024-01-12",
  },
  {
    id: "3",
    title: "Organic Chemistry: Reaction Mechanisms",
    description: "Explore common organic reaction mechanisms and their applications.",
    instructor: "Dr. Emily Rodriguez",
    duration: "38:45",
    subject: "Chemistry",
    difficulty: "intermediate",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://example.com/video3",
    views: 675,
    likes: 45,
    rating: 4.7,
    tags: ["organic", "chemistry", "reactions"],
    uploadDate: "2024-01-10",
  },
]

export default function VideoLessonsPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const subjects = Array.from(new Set(sampleLessons.map((lesson) => lesson.subject)))

  const filteredLessons = sampleLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === "all" || lesson.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === "all" || lesson.difficulty === selectedDifficulty

    return matchesSearch && matchesSubject && matchesDifficulty
  })

  const addNote = () => {
    if (!newNote.trim() || !selectedVideo) return

    const note: Note = {
      id: Date.now().toString(),
      videoId: selectedVideo.id,
      timestamp: currentTime,
      content: newNote,
      createdAt: new Date().toISOString(),
    }

    setNotes([...notes, note])
    setNewNote("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Video className="h-8 w-8 mr-3 text-blue-600" />
          Video Lessons
        </h1>
        <p className="text-gray-600">Watch educational videos and take interactive notes</p>
      </div>

      {selectedVideo ? (
        // Video Player View
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {/* Video Player Placeholder */}
                <div className="relative bg-black aspect-video rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">{selectedVideo.title}</p>
                    <p className="text-sm opacity-75">Video Player Placeholder</p>
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <Button variant="secondary" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isPlaying ? "Pause" : "Play"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm">{formatTime(currentTime)}</span>
                    <Progress value={(currentTime / 2700) * 100} className="flex-1" />
                    <span className="text-sm">{selectedVideo.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {selectedVideo.views}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {selectedVideo.likes}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {selectedVideo.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Details */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedVideo.title}</CardTitle>
                    <CardDescription className="mt-2">{selectedVideo.description}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedVideo(null)}>
                    Back to Lessons
                  </Button>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <Avatar>
                    <AvatarFallback>
                      {selectedVideo.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedVideo.instructor}</p>
                    <p className="text-sm text-gray-600">Instructor</p>
                  </div>
                  <Badge className={getDifficultyColor(selectedVideo.difficulty)}>{selectedVideo.difficulty}</Badge>
                  <Badge variant="outline">{selectedVideo.subject}</Badge>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Notes Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenTool className="h-5 w-5 mr-2" />
                  Take Notes
                </CardTitle>
                <CardDescription>Add notes at {formatTime(currentTime)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your note here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={addNote} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Notes ({notes.filter((n) => n.videoId === selectedVideo.id).length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {notes
                    .filter((note) => note.videoId === selectedVideo.id)
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .map((note) => (
                      <div key={note.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {formatTime(note.timestamp)}
                          </Badge>
                          <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    ))}
                  {notes.filter((n) => n.videoId === selectedVideo.id).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No notes yet. Start taking notes!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Lessons Library View
        <div>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={lesson.thumbnail || "/placeholder.svg"}
                      alt={lesson.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {lesson.duration}
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className={getDifficultyColor(lesson.difficulty)}>{lesson.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{lesson.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>

                    <div className="flex items-center space-x-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {lesson.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{lesson.instructor}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{lesson.subject}</Badge>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {lesson.views}
                        </span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          {lesson.rating}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => setSelectedVideo(lesson)}>
                      <Play className="h-4 w-4 mr-2" />
                      Watch Lesson
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
