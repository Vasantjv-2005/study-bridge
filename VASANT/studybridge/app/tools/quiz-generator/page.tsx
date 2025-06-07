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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Brain, Plus, Trash2, Play, RotateCcw, CheckCircle, XCircle, Trophy, Lightbulb } from "lucide-react"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  subject: string
}

interface QuizResult {
  questionId: string
  userAnswer: string | number
  isCorrect: boolean
  timeSpent: number
}

export default function QuizGeneratorPage() {
  const [activeTab, setActiveTab] = useState("create")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    difficulty: "medium",
    options: ["", "", "", ""],
  })
  const [quizInProgress, setQuizInProgress] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({})
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes default
  const [quizStartTime, setQuizStartTime] = useState<number>(0)

  const addQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.correctAnswer) {
      alert("Please fill in all required fields")
      return
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: currentQuestion.type as Question["type"],
      question: currentQuestion.question,
      options: currentQuestion.type === "multiple-choice" ? currentQuestion.options : undefined,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation || "",
      difficulty: currentQuestion.difficulty as Question["difficulty"],
      subject: currentQuestion.subject || "General",
    }

    setQuestions([...questions, newQuestion])
    setCurrentQuestion({
      type: "multiple-choice",
      difficulty: "medium",
      options: ["", "", "", ""],
    })
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const startQuiz = () => {
    if (questions.length === 0) {
      alert("Please add at least one question")
      return
    }
    setQuizInProgress(true)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizResults([])
    setShowResults(false)
    setQuizStartTime(Date.now())
  }

  const submitAnswer = () => {
    const currentQ = questions[currentQuestionIndex]
    const userAnswer = userAnswers[currentQ.id]

    if (userAnswer === undefined) {
      alert("Please select an answer")
      return
    }

    const isCorrect = userAnswer.toString() === currentQ.correctAnswer.toString()
    const timeSpent = Date.now() - quizStartTime

    const result: QuizResult = {
      questionId: currentQ.id,
      userAnswer,
      isCorrect,
      timeSpent,
    }

    const newResults = [...quizResults, result]
    setQuizResults(newResults)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz completed
      setQuizInProgress(false)
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setQuizInProgress(false)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizResults([])
    setShowResults(false)
  }

  const calculateScore = () => {
    const correct = quizResults.filter((r) => r.isCorrect).length
    return Math.round((correct / quizResults.length) * 100)
  }

  const renderQuestionForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Question
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Question Type</Label>
            <Select
              value={currentQuestion.type}
              onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, type: value as Question["type"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="short-answer">Short Answer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select
              value={currentQuestion.difficulty}
              onValueChange={(value) =>
                setCurrentQuestion({ ...currentQuestion, difficulty: value as Question["difficulty"] })
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
          <Label>Subject</Label>
          <Input
            placeholder="e.g., Mathematics, Physics, History"
            value={currentQuestion.subject || ""}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, subject: e.target.value })}
          />
        </div>

        <div>
          <Label>Question</Label>
          <Textarea
            placeholder="Enter your question here..."
            value={currentQuestion.question || ""}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
          />
        </div>

        {currentQuestion.type === "multiple-choice" && (
          <div>
            <Label>Options</Label>
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(currentQuestion.options || [])]
                      newOptions[index] = e.target.value
                      setCurrentQuestion({ ...currentQuestion, options: newOptions })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>Correct Answer</Label>
          {currentQuestion.type === "multiple-choice" ? (
            <Select
              value={currentQuestion.correctAnswer?.toString()}
              onValueChange={(value) =>
                setCurrentQuestion({ ...currentQuestion, correctAnswer: Number.parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select correct option" />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options?.map((option, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {String.fromCharCode(65 + index)}: {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : currentQuestion.type === "true-false" ? (
            <Select
              value={currentQuestion.correctAnswer?.toString()}
              onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, correctAnswer: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input
              placeholder="Enter the correct answer"
              value={currentQuestion.correctAnswer?.toString() || ""}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
            />
          )}
        </div>

        <div>
          <Label>Explanation (Optional)</Label>
          <Textarea
            placeholder="Explain why this is the correct answer..."
            value={currentQuestion.explanation || ""}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
          />
        </div>

        <Button onClick={addQuestion} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </CardContent>
    </Card>
  )

  const renderQuestionsList = () => (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Questions ({questions.length})</CardTitle>
        <CardDescription>
          {questions.length > 0 && (
            <Button onClick={startQuiz} className="mt-2">
              <Play className="h-4 w-4 mr-2" />
              Start Quiz
            </Button>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No questions added yet. Create your first question!</p>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{question.type}</Badge>
                        <Badge
                          variant={
                            question.difficulty === "easy"
                              ? "default"
                              : question.difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline">{question.subject}</Badge>
                      </div>
                      <h4 className="font-medium mb-2">
                        Q{index + 1}: {question.question}
                      </h4>
                      {question.options && (
                        <div className="text-sm text-gray-600 space-y-1">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`flex items-center space-x-2 ${
                                optIndex === question.correctAnswer ? "text-green-600 font-medium" : ""
                              }`}
                            >
                              <span>{String.fromCharCode(65 + optIndex)}.</span>
                              <span>{option}</span>
                              {optIndex === question.correctAnswer && <CheckCircle className="h-4 w-4" />}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeQuestion(question.id)}>
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

  const renderQuizInterface = () => {
    const currentQ = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Quiz in Progress</CardTitle>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
              <Button variant="outline" onClick={resetQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="outline">{currentQ.type}</Badge>
              <Badge
                variant={
                  currentQ.difficulty === "easy"
                    ? "default"
                    : currentQ.difficulty === "medium"
                      ? "secondary"
                      : "destructive"
                }
              >
                {currentQ.difficulty}
              </Badge>
              <Badge variant="outline">{currentQ.subject}</Badge>
            </div>
            <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
          </div>

          <div>
            {currentQ.type === "multiple-choice" && (
              <RadioGroup
                value={userAnswers[currentQ.id]?.toString()}
                onValueChange={(value) => setUserAnswers({ ...userAnswers, [currentQ.id]: Number.parseInt(value) })}
              >
                {currentQ.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === "true-false" && (
              <RadioGroup
                value={userAnswers[currentQ.id]?.toString()}
                onValueChange={(value) => setUserAnswers({ ...userAnswers, [currentQ.id]: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true" className="cursor-pointer">
                    True
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false" className="cursor-pointer">
                    False
                  </Label>
                </div>
              </RadioGroup>
            )}

            {currentQ.type === "short-answer" && (
              <Input
                placeholder="Type your answer here..."
                value={userAnswers[currentQ.id]?.toString() || ""}
                onChange={(e) => setUserAnswers({ ...userAnswers, [currentQ.id]: e.target.value })}
              />
            )}
          </div>

          <Button onClick={submitAnswer} className="w-full">
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  const renderResults = () => {
    const score = calculateScore()
    const correctAnswers = quizResults.filter((r) => r.isCorrect).length

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
              Quiz Results
            </CardTitle>
            <div className="text-4xl font-bold text-blue-600 mt-4">{score}%</div>
            <CardDescription>
              You got {correctAnswers} out of {questions.length} questions correct
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4">
              <Button onClick={resetQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("create")}>
                Create New Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const result = quizResults.find((r) => r.questionId === question.id)
                const isCorrect = result?.isCorrect

                return (
                  <Card
                    key={question.id}
                    className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            <span className="font-medium">Question {index + 1}</span>
                          </div>
                          <p className="mb-2">{question.question}</p>
                          <div className="text-sm space-y-1">
                            <p>
                              <span className="font-medium">Your answer:</span>{" "}
                              {question.type === "multiple-choice"
                                ? `${String.fromCharCode(65 + Number(result?.userAnswer))}. ${question.options?.[Number(result?.userAnswer)]}`
                                : result?.userAnswer}
                            </p>
                            <p>
                              <span className="font-medium">Correct answer:</span>{" "}
                              {question.type === "multiple-choice"
                                ? `${String.fromCharCode(65 + Number(question.correctAnswer))}. ${question.options?.[Number(question.correctAnswer)]}`
                                : question.correctAnswer}
                            </p>
                            {question.explanation && (
                              <div className="mt-2 p-2 bg-blue-50 rounded">
                                <div className="flex items-start space-x-2">
                                  <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                                  <p className="text-sm text-blue-800">{question.explanation}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Brain className="h-8 w-8 mr-3 text-blue-600" />
          Interactive Quiz Generator
        </h1>
        <p className="text-gray-600">Create custom quizzes with auto-grading and detailed explanations</p>
      </div>

      {quizInProgress ? (
        renderQuizInterface()
      ) : showResults ? (
        renderResults()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Questions</TabsTrigger>
            <TabsTrigger value="manage">Manage Quiz ({questions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="mt-6">
            {renderQuestionForm()}
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            {renderQuestionsList()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
