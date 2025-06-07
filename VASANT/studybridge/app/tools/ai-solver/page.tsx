"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  Lightbulb,
  BookOpen,
  Calculator,
  Beaker,
  Globe,
  Code,
  History,
  Star,
  Copy,
  RefreshCw,
  Zap,
} from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: string
  subject?: string
  difficulty?: string
}

interface QuickPrompt {
  id: string
  title: string
  prompt: string
  subject: string
  icon: any
}

const quickPrompts: QuickPrompt[] = [
  {
    id: "1",
    title: "Explain Like I'm 5",
    prompt: "Explain [topic] like I'm 5 years old with simple examples",
    subject: "General",
    icon: Lightbulb,
  },
  {
    id: "2",
    title: "Step-by-Step Solution",
    prompt: "Solve this step by step: [problem]",
    subject: "Mathematics",
    icon: Calculator,
  },
  {
    id: "3",
    title: "Concept Breakdown",
    prompt: "Break down the concept of [topic] into key components",
    subject: "Science",
    icon: Beaker,
  },
  {
    id: "4",
    title: "Real-World Examples",
    prompt: "Give me real-world examples of [concept] and how it's used",
    subject: "General",
    icon: Globe,
  },
  {
    id: "5",
    title: "Code Explanation",
    prompt: "Explain this code and how it works: [code]",
    subject: "Programming",
    icon: Code,
  },
  {
    id: "6",
    title: "Study Tips",
    prompt: "Give me effective study tips for [subject/topic]",
    subject: "Study Skills",
    icon: BookOpen,
  },
]

export default function AISolverPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI study assistant. I can help explain complex topics, solve problems step-by-step, and answer any academic questions you have. What would you like to learn about today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")

  const useQuickPrompt = (prompt: QuickPrompt) => {
    setCurrentMessage(prompt.prompt)
    setSelectedSubject(prompt.subject)
  }

  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date().toISOString(),
      subject: selectedSubject,
      difficulty: selectedDifficulty,
    }

    setMessages([...messages, userMessage])
    setCurrentMessage("")
    setIsLoading(true)

    // Simulate AI response (in real app, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(userMessage.content, selectedSubject),
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const generateAIResponse = (question: string, subject: string) => {
    // This is a mock response. In a real app, you'd integrate with OpenAI API
    const responses = {
      mathematics: `Great math question! Let me break this down step by step:

1. **Understanding the Problem**: ${question}

2. **Key Concepts**: 
   - This involves fundamental mathematical principles
   - We need to identify the variables and relationships

3. **Step-by-Step Solution**:
   - Step 1: Identify what we know
   - Step 2: Apply the relevant formula or theorem
   - Step 3: Solve systematically
   - Step 4: Verify our answer

4. **Real-World Application**: This type of problem appears in engineering, physics, and data analysis.

Would you like me to elaborate on any specific step or provide similar practice problems?`,

      physics: `Excellent physics question! Let me explain this concept clearly:

**The Physics Behind It:**
${question}

**Key Principles:**
- Conservation laws apply here
- We need to consider forces, energy, or motion
- Units and dimensional analysis are crucial

**Detailed Explanation:**
This phenomenon occurs because of fundamental physical laws. The relationship between the variables follows predictable patterns that we can analyze mathematically.

**Practical Examples:**
You can observe this in everyday situations like...

Would you like me to show you the mathematical derivation or provide more examples?`,

      default: `That's a thoughtful question about: ${question}

Let me help you understand this concept:

**Key Points:**
- This topic involves several important aspects
- Understanding the fundamentals is crucial
- There are practical applications you should know about

**Detailed Explanation:**
The concept you're asking about is fundamental to understanding this subject area. It connects to other important ideas and has real-world relevance.

**Study Tips:**
- Break it down into smaller components
- Practice with examples
- Connect it to what you already know
- Apply it to real situations

Is there a specific aspect you'd like me to focus on or explain further?`,
    }

    return responses[subject as keyof typeof responses] || responses.default
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        type: "ai",
        content:
          "Hello! I'm your AI study assistant. I can help explain complex topics, solve problems step-by-step, and answer any academic questions you have. What would you like to learn about today?",
        timestamp: new Date().toISOString(),
      },
    ])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Bot className="h-8 w-8 mr-3 text-blue-600" />
          AI Doubt Solver
        </h1>
        <p className="text-gray-600">Get instant explanations and step-by-step solutions powered by AI</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Quick Prompts Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Quick Prompts
              </CardTitle>
              <CardDescription>Click to use these helpful prompts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => {
                    setCurrentMessage(prompt.prompt)
                    setSelectedSubject(prompt.subject)
                  }}
                >
                  <div className="flex items-start space-x-2">
                    <prompt.icon className="h-4 w-4 mt-0.5 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{prompt.title}</div>
                      <div className="text-xs text-gray-500">{prompt.subject}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Recent Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-2">
                <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  <div className="font-medium">Quadratic Equations</div>
                  <div className="text-xs text-gray-500">Mathematics • 2 hours ago</div>
                </div>
                <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  <div className="font-medium">Newton's Laws</div>
                  <div className="text-xs text-gray-500">Physics • 1 day ago</div>
                </div>
                <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  <div className="font-medium">Organic Chemistry</div>
                  <div className="text-xs text-gray-500">Chemistry • 2 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Step-by-step solutions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Multiple explanation styles</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real-world examples</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Code explanations</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Study recommendations</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">AI Study Assistant</CardTitle>
                    <CardDescription>Powered by advanced language models</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Chat
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs opacity-75">{new Date(message.timestamp).toLocaleTimeString()}</div>
                      {message.type === "ai" && (
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyMessage(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Star className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input Area */}
            <div className="flex-shrink-0 border-t p-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty level (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Ask me anything! I can explain concepts, solve problems, or help with homework..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                />
                <Button onClick={sendMessage} disabled={!currentMessage.trim() || isLoading} className="px-6">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line. AI responses are generated for educational purposes.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
