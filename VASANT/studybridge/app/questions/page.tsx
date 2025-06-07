"use client"

import { useState, useEffect } from "react"
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
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Plus,
  MessageCircle,
  Award,
  TrendingUp,
  Globe,
  Star,
  ThumbsUp,
  Eye,
  X,
  Loader2,
  AlertTriangle,
  Send,
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

// Create a fresh Supabase client to avoid schema cache issues
const supabase = createClient(
  "https://iyqqfeellpairnqouctk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5cXFmZWVsbHBhaXJucW91Y3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjEwOTgsImV4cCI6MjA2NDc5NzA5OH0.dEdhOUCPvL8Ik2M717FjhUaer3nEFIi5kf5LgjqgQyc",
)

interface Question {
  id: string
  title: string
  description: string
  subject: string
  difficulty: string
  points_offered: number
  language: string
  tags: string[]
  user_id: string
  is_solved: boolean
  views_count: number
  likes_count: number
  created_at: string
  user_profile?: {
    full_name: string
    country: string
    avatar_url: string
  }
  answer_count?: number
}

export default function QuestionsPage() {
  const [isAskModalOpen, setIsAskModalOpen] = useState(false)
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dbStatus, setDbStatus] = useState<string>("")
  const [needsSetup, setNeedsSetup] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [answerText, setAnswerText] = useState("")

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    subject: "",
    difficulty: "intermediate",
    pointsOffered: 50,
    language: "english",
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState("")

  // Fetch questions from database
  const fetchQuestions = async () => {
    try {
      setIsLoading(true)
      console.log("Fetching questions from database...")

      // First check if the table exists and has the right structure
      const { data: tableInfo, error: tableError } = await supabase.from("questions").select("id, title").limit(1)

      if (tableError) {
        console.error("Error checking table:", tableError)

        if (tableError.message.includes("relation") && tableError.message.includes("does not exist")) {
          setDbStatus("Questions table not found. Please run the database setup script.")
          setNeedsSetup(true)
        } else {
          setDbStatus(`Error: ${tableError.message}`)
        }

        setQuestions([])
        setIsLoading(false)
        return
      }

      // If we got here, the table exists, so fetch all questions
      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false })

      if (questionsError) {
        console.error("Error fetching questions:", questionsError)
        setDbStatus(`Error: ${questionsError.message}`)
        setQuestions([])
        return
      }

      console.log("Fetched questions:", questionsData)
      setDbStatus(`Connected! Found ${questionsData?.length || 0} questions`)

      if (!questionsData || questionsData.length === 0) {
        console.log("No questions found in database")
        setQuestions([])
        return
      }

      // Process questions and add mock user profiles
      const processedQuestions = questionsData.map((q, index) => ({
        ...q,
        user_profile: {
          full_name: ["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Emma Brown"][index % 5],
          country: ["USA", "UK", "Canada", "Australia", "Germany"][index % 5],
          avatar_url: "/placeholder.svg?height=32&width=32",
        },
        answer_count: Math.floor(Math.random() * 10),
      }))

      setQuestions(processedQuestions)
    } catch (error) {
      console.error("Unexpected error fetching questions:", error)
      setDbStatus(`Unexpected error: ${error}`)
      setQuestions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleAskQuestion = async () => {
    if (!newQuestion.title || !newQuestion.description || !newQuestion.subject) {
      alert("Please fill in all required fields (title, description, and subject).")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("Starting question submission...")

      // Simplified question data - only include essential fields
      const questionData = {
        title: newQuestion.title.trim(),
        description: newQuestion.description.trim(),
        subject: newQuestion.subject,
        difficulty: newQuestion.difficulty,
        points_offered: newQuestion.pointsOffered,
        language: newQuestion.language,
        tags: newQuestion.tags,
        user_id: "00000000-0000-0000-0000-000000000999", // Demo user ID
      }

      console.log("Question data to insert:", questionData)

      // Insert into database
      const { data, error } = await supabase.from("questions").insert([questionData]).select()

      if (error) {
        console.error("Database insert error:", error)
        console.error("Error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        })

        // Check if it's a schema-related error
        if (error.message.includes("column") && error.message.includes("schema cache")) {
          alert("Database schema error. Please run the database setup script to fix the table structure.")
          setNeedsSetup(true)
        } else {
          alert(`Failed to save question to database: ${error.message}`)
        }
        return
      }

      console.log("Question successfully saved to database:", data)

      if (data && data.length > 0) {
        // Add the new question to the local state with user profile
        const newQuestionWithProfile = {
          ...data[0],
          user_profile: {
            full_name: "You",
            country: "Your Country",
            avatar_url: "/placeholder.svg?height=32&width=32",
          },
          answer_count: 0,
          // Add default values for fields that might be missing
          views_count: 0,
          likes_count: 0,
          is_solved: false,
        }

        setQuestions((prev) => [newQuestionWithProfile, ...prev])
        alert("Your question has been posted successfully and saved to the database!")
      }

      // Reset form
      setNewQuestion({
        title: "",
        description: "",
        subject: "",
        difficulty: "intermediate",
        pointsOffered: 50,
        language: "english",
        tags: [],
      })
      setCurrentTag("")
      setIsAskModalOpen(false)

      // Refresh questions from database to ensure consistency
      setTimeout(() => {
        fetchQuestions()
      }, 1000)
    } catch (error) {
      console.error("Unexpected error during submission:", error)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnswerQuestion = (question: Question) => {
    setCurrentQuestion(question)
    setIsAnswerModalOpen(true)
  }

  const submitAnswer = async () => {
    if (!answerText.trim() || !currentQuestion) {
      alert("Please enter your answer before submitting.")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would save the answer to the database
      // For now, we'll just simulate a successful submission
      setTimeout(() => {
        // Update the answer count for the current question
        const updatedQuestions = questions.map((q) => {
          if (q.id === currentQuestion.id) {
            return {
              ...q,
              answer_count: (q.answer_count || 0) + 1,
            }
          }
          return q
        })

        setQuestions(updatedQuestions)
        setIsAnswerModalOpen(false)
        setAnswerText("")
        setCurrentQuestion(null)
        alert("Your answer has been submitted successfully!")
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      console.error("Error submitting answer:", error)
      alert("Failed to submit your answer. Please try again.")
      setIsSubmitting(false)
    }
  }

  const addTag = () => {
    if (currentTag && !newQuestion.tags.includes(currentTag)) {
      setNewQuestion({
        ...newQuestion,
        tags: [...newQuestion.tags, currentTag],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewQuestion({
      ...newQuestion,
      tags: newQuestion.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      Germany: "🇩🇪",
      India: "🇮🇳",
      France: "🇫🇷",
      Japan: "🇯🇵",
      USA: "🇺🇸",
      UK: "🇬🇧",
      Canada: "🇨🇦",
      Australia: "🇦🇺",
      Brazil: "🇧🇷",
      China: "🇨🇳",
      "Your Country": "🏠",
      Unknown: "🌍",
    }
    return flags[country] || "🌍"
  }

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      mathematics: "bg-blue-100 text-blue-700",
      physics: "bg-purple-100 text-purple-700",
      chemistry: "bg-green-100 text-green-700",
      biology: "bg-emerald-100 text-emerald-700",
      "computer-science": "bg-indigo-100 text-indigo-700",
      languages: "bg-yellow-100 text-yellow-700",
      history: "bg-orange-100 text-orange-700",
      literature: "bg-pink-100 text-pink-700",
      economics: "bg-red-100 text-red-700",
    }
    return colors[subject] || "bg-gray-100 text-gray-700"
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
              <Link href="/questions" className="text-blue-600 font-medium">
                Questions
              </Link>
              <Link href="/materials" className="text-gray-600 hover:text-blue-600">
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
        {needsSetup && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <div>
              <h3 className="font-medium text-amber-800">Database setup required</h3>
              <p className="text-sm text-amber-700">
                Please run the database setup script to create the questions table with the correct structure.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Q&A Marketplace</h1>
            <p className="text-gray-600">Ask questions, share knowledge, and earn points by helping others</p>
            {dbStatus && (
              <p className={`text-xs mt-1 ${dbStatus.includes("Error") ? "text-red-500" : "text-green-600"}`}>
                Database status: {dbStatus}
              </p>
            )}
          </div>

          {/* Ask Question Dialog */}
          <Dialog open={isAskModalOpen} onOpenChange={setIsAskModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ask a New Question</DialogTitle>
                <DialogDescription>Get help from our global community of students and experts</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Question Title *</Label>
                  <Input
                    id="title"
                    placeholder="What's your question? Be specific..."
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Question Details *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about your question. Include what you've tried and where you're stuck..."
                    className="min-h-[120px]"
                    value={newQuestion.description}
                    onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={newQuestion.subject}
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, subject: value })}
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
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={newQuestion.difficulty}
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="points">Points Offered</Label>
                    <Select
                      value={newQuestion.pointsOffered.toString()}
                      onValueChange={(value) =>
                        setNewQuestion({ ...newQuestion, pointsOffered: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25 points</SelectItem>
                        <SelectItem value="50">50 points</SelectItem>
                        <SelectItem value="75">75 points</SelectItem>
                        <SelectItem value="100">100 points</SelectItem>
                        <SelectItem value="150">150 points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={newQuestion.language}
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, language: value })}
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

                <div>
                  <Label>Tags (Optional)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newQuestion.tags.map((tag, index) => (
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
                  <Button variant="outline" onClick={() => setIsAskModalOpen(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button onClick={handleAskQuestion} disabled={isSubmitting || needsSetup}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Question"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Answer Question Dialog */}
          <Dialog open={isAnswerModalOpen} onOpenChange={setIsAnswerModalOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Answer Question</DialogTitle>
                <DialogDescription>{currentQuestion?.title}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-700">{currentQuestion?.description}</p>
                </div>

                <div>
                  <Label htmlFor="answer">Your Answer</Label>
                  <Textarea
                    id="answer"
                    placeholder="Provide a detailed answer to help the student..."
                    className="min-h-[200px]"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                  />
                </div>

                <DialogFooter className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAnswerModalOpen(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button onClick={submitAnswer} disabled={isSubmitting || !answerText.trim()}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Answer
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rest of the component remains the same */}
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
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
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
                <div>
                  <label className="text-sm font-medium mb-2 block">Points Offered</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-50">10-50 points</SelectItem>
                      <SelectItem value="50-100">50-100 points</SelectItem>
                      <SelectItem value="100+">100+ points</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span>Top Helpers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Maria K.</p>
                    <p className="text-xs text-gray-500">2,450 pts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Ahmed S.</p>
                    <p className="text-xs text-gray-500">2,100 pts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>YT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Yuki T.</p>
                    <p className="text-xs text-gray-500">1,890 pts</p>
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
                <Input placeholder="Search questions..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="points">Highest Points</SelectItem>
                  <SelectItem value="unanswered">Unanswered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Question Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Questions</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                <TabsTrigger value="my-questions">My Questions</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading questions...</span>
                  </div>
                ) : questions.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
                    <p className="text-gray-600 mb-4">Be the first to ask a question!</p>
                    <Button onClick={() => setIsAskModalOpen(true)} disabled={needsSetup}>
                      Ask the First Question
                    </Button>
                  </div>
                ) : (
                  questions.map((question) => (
                    <Card
                      key={question.id}
                      className={`hover:shadow-md transition-shadow ${question.is_solved ? "border-l-4 border-l-green-500" : ""}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={question.user_profile?.avatar_url || "/placeholder.svg"} />
                            <AvatarFallback>{question.user_profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">
                                {question.user_profile?.full_name || "Anonymous User"}
                              </span>
                              <Badge variant="secondary">
                                {getCountryFlag(question.user_profile?.country || "Unknown")}{" "}
                                {question.user_profile?.country || "Unknown"}
                              </Badge>
                              {question.is_solved ? (
                                <Badge className="bg-green-100 text-green-700">Solved</Badge>
                              ) : (
                                <Badge className="bg-green-100 text-green-700">{question.points_offered} points</Badge>
                              )}
                              <span className="text-sm text-gray-500">{formatTimeAgo(question.created_at)}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-3">{question.description}</p>
                            <div className="flex items-center space-x-4 mb-3">
                              <Badge className={getSubjectColor(question.subject)}>
                                {question.subject.charAt(0).toUpperCase() + question.subject.slice(1).replace("-", " ")}
                              </Badge>
                              <Badge variant="outline">{question.difficulty}</Badge>
                              {question.tags &&
                                question.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline">
                                    {tag}
                                  </Badge>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {question.answer_count || 0} answers
                                </span>
                                <span className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {question.views_count || 0} views
                                </span>
                                <span className="flex items-center">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {question.likes_count || 0} likes
                                </span>
                                {question.is_solved && (
                                  <span className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                    Best answer selected
                                  </span>
                                )}
                              </div>
                              <Button
                                size="sm"
                                variant={question.is_solved ? "outline" : "default"}
                                onClick={() => (question.is_solved ? null : handleAnswerQuestion(question))}
                              >
                                {question.is_solved ? "View Answers" : "Answer Question"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No unanswered questions</h3>
                  <p className="text-gray-600">All questions have been answered by our amazing community!</p>
                </div>
              </TabsContent>

              <TabsContent value="my-questions" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">You haven't asked any questions yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start by asking your first question to get help from the community
                  </p>
                  <Button onClick={() => setIsAskModalOpen(true)} disabled={needsSetup}>
                    Ask Your First Question
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="following" className="space-y-4 mt-6">
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No followed questions</h3>
                  <p className="text-gray-600">Follow questions you're interested in to get updates</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
