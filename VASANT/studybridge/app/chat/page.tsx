"use client"

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
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Video, CalendarIcon, Clock, Globe, Award, Plus, Search, Filter, Star, Languages, X } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    subject: "",
    sessionType: "",
    maxParticipants: 6,
    pointsCost: 0,
    duration: 60,
    scheduledDate: "",
    scheduledTime: "",
    languages: [] as string[],
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("")

  const handleCreateSession = () => {
    if (!newSession.title || !newSession.description || !newSession.subject || !newSession.sessionType) {
      alert("Please fill in all required fields")
      return
    }

    if (!newSession.scheduledDate || !newSession.scheduledTime) {
      alert("Please select date and time for the session")
      return
    }

    // Here you would typically save to database
    console.log("New session:", newSession)
    alert("Session created successfully!")

    // Reset form
    setNewSession({
      title: "",
      description: "",
      subject: "",
      sessionType: "",
      maxParticipants: 6,
      pointsCost: 0,
      duration: 60,
      scheduledDate: "",
      scheduledTime: "",
      languages: [],
      tags: [],
    })
    setIsCreateModalOpen(false)
  }

  const addTag = () => {
    if (currentTag && !newSession.tags.includes(currentTag)) {
      setNewSession({
        ...newSession,
        tags: [...newSession.tags, currentTag],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewSession({
      ...newSession,
      tags: newSession.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const addLanguage = () => {
    if (currentLanguage && !newSession.languages.includes(currentLanguage)) {
      setNewSession({
        ...newSession,
        languages: [...newSession.languages, currentLanguage],
      })
      setCurrentLanguage("")
    }
  }

  const removeLanguage = (languageToRemove: string) => {
    setNewSession({
      ...newSession,
      languages: newSession.languages.filter((lang) => lang !== languageToRemove),
    })
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
              <Link href="/materials" className="text-gray-600 hover:text-blue-600">
                Materials
              </Link>
              <Link href="/chat" className="text-blue-600 font-medium">
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
            <h1 className="text-3xl font-bold mb-2">Video Study Sessions</h1>
            <p className="text-gray-600">Schedule 1-on-1 sessions or join group study rooms</p>
          </div>

          {/* Create Session Dialog */}
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Study Session</DialogTitle>
                <DialogDescription>Host a study session and help others while earning points</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Session Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Advanced Calculus Problem Solving"
                    value={newSession.title}
                    onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you'll cover in this session and who should join..."
                    className="min-h-[100px]"
                    value={newSession.description}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={newSession.subject}
                      onValueChange={(value) => setNewSession({ ...newSession, subject: value })}
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
                    <Label htmlFor="sessionType">Session Type *</Label>
                    <Select
                      value={newSession.sessionType}
                      onValueChange={(value) => setNewSession({ ...newSession, sessionType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-on-1">1-on-1 Tutoring</SelectItem>
                        <SelectItem value="group">Group Study</SelectItem>
                        <SelectItem value="language-exchange">Language Exchange</SelectItem>
                        <SelectItem value="homework-help">Homework Help</SelectItem>
                        <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                        <SelectItem value="discussion">Discussion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Select
                      value={newSession.maxParticipants.toString()}
                      onValueChange={(value) =>
                        setNewSession({ ...newSession, maxParticipants: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 (1-on-1)</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="6">6 people</SelectItem>
                        <SelectItem value="10">10 people</SelectItem>
                        <SelectItem value="20">20 people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select
                      value={newSession.duration.toString()}
                      onValueChange={(value) => setNewSession({ ...newSession, duration: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pointsCost">Points Cost</Label>
                    <Select
                      value={newSession.pointsCost.toString()}
                      onValueChange={(value) => setNewSession({ ...newSession, pointsCost: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Free</SelectItem>
                        <SelectItem value="25">25 points</SelectItem>
                        <SelectItem value="50">50 points</SelectItem>
                        <SelectItem value="75">75 points</SelectItem>
                        <SelectItem value="100">100 points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduledDate">Date *</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={newSession.scheduledDate}
                      onChange={(e) => setNewSession({ ...newSession, scheduledDate: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="scheduledTime">Time *</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={newSession.scheduledTime}
                      onChange={(e) => setNewSession({ ...newSession, scheduledTime: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newSession.languages.map((language, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeLanguage(language)}
                      >
                        {language} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="portuguese">Portuguese</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" onClick={addLanguage}>
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Tags (Optional)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newSession.tags.map((tag, index) => (
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
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSession}>Create Session</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span>Quick Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-0 w-full"
                    classNames={{
                      months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                      month: "space-y-4 w-full flex flex-col",
                      table: "w-full h-full border-collapse space-y-1",
                      head_row: "",
                      row: "w-full mt-2",
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
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
                      <SelectItem value="languages">Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Session Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-on-1">1-on-1 Tutoring</SelectItem>
                      <SelectItem value="group">Group Study</SelectItem>
                      <SelectItem value="language">Language Exchange</SelectItem>
                      <SelectItem value="homework">Homework Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any language" />
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

            {/* Online Now */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online Now</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Maria K.</p>
                    <p className="text-xs text-gray-500">Mathematics tutor</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Ahmed S.</p>
                    <p className="text-xs text-gray-500">Physics expert</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>YT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Yuki T.</p>
                    <p className="text-xs text-gray-500">Language exchange</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
                <Input placeholder="Search sessions..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">Upcoming</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price">Lowest Points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Session Tabs */}
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="available">Available Sessions</TabsTrigger>
                <TabsTrigger value="my-sessions">My Sessions</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4 mt-6">
                {/* Session Cards */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">Advanced Calculus Help</h3>
                            <Badge className="bg-blue-100 text-blue-700">1-on-1</Badge>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm text-gray-600">Maria K.</span>
                            <Badge variant="secondary">🇧🇷 Brazil</Badge>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-sm">4.9 (47)</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Need help with derivatives and integrals? I'm a math major with 3 years of tutoring
                            experience. We can work through problems step by step.
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              60 minutes
                            </span>
                            <span className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Today, 3:00 PM
                            </span>
                            <span className="flex items-center">
                              <Languages className="h-4 w-4 mr-1" />
                              English, Portuguese
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 mb-1">50 points</div>
                        <Button size="sm">Book Session</Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-700">Mathematics</Badge>
                      <Badge variant="outline">Calculus</Badge>
                      <Badge variant="outline">Tutoring</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Add more session cards here... */}
              </TabsContent>

              <TabsContent value="my-sessions" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">You haven't created any sessions yet</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first session to start helping others and earning points
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>Create Your First Session</Button>
                </div>
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Video className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Chemistry Study Group</h3>
                          <p className="text-sm text-gray-600">with Lisa M. and 3 others</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              Today, 3:00 PM
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              60 minutes
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">Join Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">Spanish Practice Session</h3>
                          <p className="text-sm text-gray-600">with Raj K.</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              Yesterday, 2:00 PM
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              45 minutes
                            </span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span>Rated 5.0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
