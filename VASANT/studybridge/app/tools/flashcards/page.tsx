"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Plus, Trash2, CheckCircle, XCircle, Brain, Eye, Shuffle } from "lucide-react"

interface Flashcard {
  id: string
  front: string
  back: string
  subject: string
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  createdAt: string
  lastReviewed?: string
  reviewCount: number
  correctCount: number
  nextReview: string
  interval: number // days
  easeFactor: number
}

interface StudySession {
  id: string
  date: string
  cardsStudied: number
  correctAnswers: number
  timeSpent: number
}

const defaultCards: Flashcard[] = [
  {
    id: "1",
    front: "What is the derivative of x²?",
    back: "2x",
    subject: "Mathematics",
    difficulty: "easy",
    tags: ["calculus", "derivatives"],
    createdAt: new Date().toISOString(),
    reviewCount: 0,
    correctCount: 0,
    nextReview: new Date().toISOString(),
    interval: 1,
    easeFactor: 2.5,
  },
  {
    id: "2",
    front: "What is the capital of France?",
    back: "Paris",
    subject: "Geography",
    difficulty: "easy",
    tags: ["capitals", "europe"],
    createdAt: new Date().toISOString(),
    reviewCount: 0,
    correctCount: 0,
    nextReview: new Date().toISOString(),
    interval: 1,
    easeFactor: 2.5,
  },
  {
    id: "3",
    front: "Define photosynthesis",
    back: "The process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen",
    subject: "Biology",
    difficulty: "medium",
    tags: ["plants", "energy"],
    createdAt: new Date().toISOString(),
    reviewCount: 0,
    correctCount: 0,
    nextReview: new Date().toISOString(),
    interval: 1,
    easeFactor: 2.5,
  },
]

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>(defaultCards)
  const [currentCard, setCurrentCard] = useState<Partial<Flashcard>>({
    difficulty: "medium",
    tags: [],
  })
  const [studyMode, setStudyMode] = useState(false)
  const [currentStudyIndex, setCurrentStudyIndex] = useState(0)
  const [studyCards, setStudyCards] = useState<Flashcard[]>([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    correctAnswers: 0,
    startTime: 0,
  })
  const [filterSubject, setFilterSubject] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")

  const subjects = Array.from(new Set(cards.map((card) => card.subject)))

  const addCard = () => {
    if (!currentCard.front || !currentCard.back) {
      alert("Please fill in both front and back of the card")
      return
    }

    const newCard: Flashcard = {
      id: Date.now().toString(),
      front: currentCard.front,
      back: currentCard.back,
      subject: currentCard.subject || "General",
      difficulty: currentCard.difficulty as Flashcard["difficulty"],
      tags: currentCard.tags || [],
      createdAt: new Date().toISOString(),
      reviewCount: 0,
      correctCount: 0,
      nextReview: new Date().toISOString(),
      interval: 1,
      easeFactor: 2.5,
    }

    setCards([...cards, newCard])
    setCurrentCard({
      difficulty: "medium",
      tags: [],
    })
  }

  const removeCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const startStudySession = () => {
    let filteredCards = cards

    if (filterSubject !== "all") {
      filteredCards = filteredCards.filter((card) => card.subject === filterSubject)
    }

    if (filterDifficulty !== "all") {
      filteredCards = filteredCards.filter((card) => card.difficulty === filterDifficulty)
    }

    // Sort by next review date (spaced repetition)
    filteredCards.sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())

    if (filteredCards.length === 0) {
      alert("No cards available for study")
      return
    }

    setStudyCards(filteredCards)
    setStudyMode(true)
    setCurrentStudyIndex(0)
    setShowAnswer(false)
    setSessionStats({
      cardsStudied: 0,
      correctAnswers: 0,
      startTime: Date.now(),
    })
  }

  const shuffleCards = () => {
    const shuffled = [...studyCards].sort(() => Math.random() - 0.5)
    setStudyCards(shuffled)
    setCurrentStudyIndex(0)
    setShowAnswer(false)
  }

  const markAnswer = (correct: boolean) => {
    const card = studyCards[currentStudyIndex]
    const updatedCard = { ...card }

    updatedCard.reviewCount += 1
    updatedCard.lastReviewed = new Date().toISOString()

    if (correct) {
      updatedCard.correctCount += 1
      // Increase interval based on spaced repetition algorithm
      updatedCard.interval = Math.round(updatedCard.interval * updatedCard.easeFactor)
      updatedCard.easeFactor = Math.max(1.3, updatedCard.easeFactor + 0.1)
    } else {
      // Reset interval for incorrect answers
      updatedCard.interval = 1
      updatedCard.easeFactor = Math.max(1.3, updatedCard.easeFactor - 0.2)
    }

    // Calculate next review date
    const nextReview = new Date()
    nextReview.setDate(nextReview.getDate() + updatedCard.interval)
    updatedCard.nextReview = nextReview.toISOString()

    // Update cards array
    setCards(cards.map((c) => (c.id === card.id ? updatedCard : c)))

    // Update session stats
    setSessionStats((prev) => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
    }))

    // Move to next card or end session
    if (currentStudyIndex < studyCards.length - 1) {
      setCurrentStudyIndex(currentStudyIndex + 1)
      setShowAnswer(false)
    } else {
      endStudySession()
    }
  }

  const endStudySession = () => {
    const session: StudySession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      cardsStudied: sessionStats.cardsStudied,
      correctAnswers: sessionStats.correctAnswers,
      timeSpent: Math.round((Date.now() - sessionStats.startTime) / 1000),
    }

    setStudySessions([...studySessions, session])
    setStudyMode(false)
    setCurrentStudyIndex(0)
    setShowAnswer(false)
  }

  const getCardsDueForReview = () => {
    const now = new Date()
    return cards.filter((card) => new Date(card.nextReview) <= now).length
  }

  const getSuccessRate = (card: Flashcard) => {
    if (card.reviewCount === 0) return 0
    return Math.round((card.correctCount / card.reviewCount) * 100)
  }

  const addTag = (tag: string) => {
    if (tag && !currentCard.tags?.includes(tag)) {
      setCurrentCard({
        ...currentCard,
        tags: [...(currentCard.tags || []), tag],
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCurrentCard({
      ...currentCard,
      tags: currentCard.tags?.filter((tag) => tag !== tagToRemove) || [],
    })
  }

  const renderCreateCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Create New Flashcard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Subject</Label>
            <Input
              placeholder="e.g., Mathematics, History"
              value={currentCard.subject || ""}
              onChange={(e) => setCurrentCard({ ...currentCard, subject: e.target.value })}
            />
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select
              value={currentCard.difficulty}
              onValueChange={(value) =>
                setCurrentCard({ ...currentCard, difficulty: value as Flashcard["difficulty"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Front (Question)</Label>
          <Textarea
            placeholder="Enter the question or prompt..."
            value={currentCard.front || ""}
            onChange={(e) => setCurrentCard({ ...currentCard, front: e.target.value })}
          />
        </div>

        <div>
          <Label>Back (Answer)</Label>
          <Textarea
            placeholder="Enter the answer or explanation..."
            value={currentCard.back || ""}
            onChange={(e) => setCurrentCard({ ...currentCard, back: e.target.value })}
          />
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {currentCard.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                {tag} ×
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Add tags (press Enter)"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTag(e.currentTarget.value)
                e.currentTarget.value = ""
              }
            }}
          />
        </div>

        <Button onClick={addCard} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Flashcard
        </Button>
      </CardContent>
    </Card>
  )

  const renderCardsList = () => (
    <Card>
      <CardHeader>
        <CardTitle>Your Flashcards ({cards.length})</CardTitle>
        <div className="flex space-x-2">
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={startStudySession}>
            <Brain className="h-4 w-4 mr-2" />
            Start Study Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {cards.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No flashcards created yet. Create your first card!</p>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <Card key={card.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{card.subject}</Badge>
                        <Badge
                          variant={
                            card.difficulty === "easy"
                              ? "default"
                              : card.difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {card.difficulty}
                        </Badge>
                        {card.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mb-2">
                        <strong>Q:</strong> {card.front}
                      </div>
                      <div className="mb-2 text-gray-600">
                        <strong>A:</strong> {card.back}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Reviews: {card.reviewCount}</span>
                        <span>Success: {getSuccessRate(card)}%</span>
                        <span>Next: {new Date(card.nextReview).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeCard(card.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderStudyInterface = () => {
    const card = studyCards[currentStudyIndex]
    const progress = ((currentStudyIndex + 1) / studyCards.length) * 100

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Study Session</CardTitle>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">
                  Card {currentStudyIndex + 1} of {studyCards.length}
                </Badge>
                <Button variant="outline" onClick={shuffleCards}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
                <Button variant="outline" onClick={endStudySession}>
                  End Session
                </Button>
              </div>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Badge variant="outline">{card.subject}</Badge>
                <Badge
                  variant={
                    card.difficulty === "easy" ? "default" : card.difficulty === "medium" ? "secondary" : "destructive"
                  }
                >
                  {card.difficulty}
                </Badge>
              </div>

              <div className="min-h-[200px] flex items-center justify-center">
                <div className="text-lg font-medium max-w-2xl">{showAnswer ? card.back : card.front}</div>
              </div>

              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Show Answer
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">How well did you know this?</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="destructive" onClick={() => markAnswer(false)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Incorrect
                    </Button>
                    <Button variant="default" onClick={() => markAnswer(true)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Correct
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Session Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{sessionStats.cardsStudied}</div>
                <div className="text-sm text-gray-600">Cards Studied</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{sessionStats.correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {sessionStats.cardsStudied > 0
                    ? Math.round((sessionStats.correctAnswers / sessionStats.cardsStudied) * 100)
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderStats = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{cards.length}</div>
            <div className="text-sm text-gray-600">Total Cards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-orange-600">{getCardsDueForReview()}</div>
            <div className="text-sm text-gray-600">Due for Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">{studySessions.length}</div>
            <div className="text-sm text-gray-600">Study Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {studySessions.length > 0
                ? Math.round(
                    studySessions.reduce(
                      (acc, session) => acc + (session.correctAnswers / session.cardsStudied) * 100,
                      0,
                    ) / studySessions.length,
                  )
                : 0}
              %
            </div>
            <div className="text-sm text-gray-600">Avg. Accuracy</div>
          </CardContent>
        </Card>
      </div>

      {studySessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Study Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {studySessions
                .slice(-5)
                .reverse()
                .map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{new Date(session.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">
                        {Math.floor(session.timeSpent / 60)}m {session.timeSpent % 60}s
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {session.correctAnswers}/{session.cardsStudied}
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round((session.correctAnswers / session.cardsStudied) * 100)}% accuracy
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <CreditCard className="h-8 w-8 mr-3 text-blue-600" />
          Smart Flashcards
        </h1>
        <p className="text-gray-600">Spaced repetition learning system for effective memorization</p>
      </div>

      {studyMode ? (
        renderStudyInterface()
      ) : (
        <Tabs defaultValue="study" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="study">Study ({getCardsDueForReview()} due)</TabsTrigger>
            <TabsTrigger value="create">Create Cards</TabsTrigger>
            <TabsTrigger value="manage">Manage ({cards.length})</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="study" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Ready to Study?
                </CardTitle>
                <CardDescription>
                  You have {getCardsDueForReview()} cards due for review using spaced repetition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label>Filter by Subject</Label>
                    <Select value={filterSubject} onValueChange={setFilterSubject}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Filter by Difficulty</Label>
                    <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={startStudySession} className="w-full" size="lg">
                  <Brain className="h-5 w-5 mr-2" />
                  Start Study Session
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            {renderCreateCard()}
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            {renderCardsList()}
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            {renderStats()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
