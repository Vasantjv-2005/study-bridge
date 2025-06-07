"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Trophy,
  Target,
  Calendar,
  BookOpen,
  Brain,
  Clock,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react"

export default function ProgressTrackerPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const stats = {
    totalPoints: 1250,
    questionsAnswered: 23,
    materialsShared: 12,
    videoSessions: 8,
    currentStreak: 7,
    longestStreak: 15,
    averageScore: 87,
    timeSpent: 45, // hours this week
  }

  const subjects = [
    { name: "Mathematics", progress: 85, level: 3, points: 450, color: "bg-blue-500" },
    { name: "Physics", progress: 72, level: 2, points: 320, color: "bg-green-500" },
    { name: "Chemistry", progress: 60, level: 2, points: 280, color: "bg-purple-500" },
    { name: "Computer Science", progress: 90, level: 4, points: 200, color: "bg-orange-500" },
  ]

  const achievements = [
    { id: 1, title: "First Answer", description: "Answered your first question", icon: "🎯", unlocked: true },
    { id: 2, title: "Helpful Helper", description: "Received 10 five-star ratings", icon: "⭐", unlocked: true },
    { id: 3, title: "Knowledge Sharer", description: "Uploaded 10 study materials", icon: "📚", unlocked: true },
    { id: 4, title: "Session Master", description: "Completed 5 video sessions", icon: "🎥", unlocked: true },
    { id: 5, title: "Streak Champion", description: "Maintain 30-day streak", icon: "🔥", unlocked: false },
    { id: 6, title: "Quiz Master", description: "Score 100% on 10 quizzes", icon: "🧠", unlocked: false },
  ]

  const weeklyActivity = [
    { day: "Mon", questions: 3, materials: 1, sessions: 0, points: 75 },
    { day: "Tue", questions: 5, materials: 2, sessions: 1, points: 125 },
    { day: "Wed", questions: 2, materials: 0, sessions: 1, points: 80 },
    { day: "Thu", questions: 4, materials: 1, sessions: 0, points: 90 },
    { day: "Fri", questions: 6, materials: 3, sessions: 2, points: 180 },
    { day: "Sat", questions: 2, materials: 1, sessions: 1, points: 70 },
    { day: "Sun", questions: 1, materials: 0, sessions: 0, points: 25 },
  ]

  const recentActivity = [
    {
      type: "question",
      title: "Answered: How to solve quadratic equations?",
      points: 50,
      time: "2 hours ago",
      rating: 5,
    },
    {
      type: "material",
      title: "Shared: Linear Algebra Study Guide",
      points: 75,
      time: "5 hours ago",
      downloads: 12,
    },
    {
      type: "session",
      title: "Completed: Calculus Tutoring Session",
      points: 100,
      time: "1 day ago",
      rating: 5,
    },
    {
      type: "quiz",
      title: "Completed: Physics Quiz - Mechanics",
      points: 80,
      time: "2 days ago",
      score: "8/10",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <BarChart3 className="h-8 w-8 mr-3 text-blue-600" />
          Progress Tracker
        </h1>
        <p className="text-gray-600">Track your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalPoints}</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-orange-600">{stats.currentStreak} days</p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-green-600">{stats.averageScore}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time This Week</p>
                <p className="text-2xl font-bold text-purple-600">{stats.timeSpent}h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Progress Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Subject Progress
              </CardTitle>
              <CardDescription>Your progress across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="outline">Level {subject.level}</Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{subject.progress}%</span>
                      <p className="text-xs text-gray-500">{subject.points} points</p>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Weekly Activity
              </CardTitle>
              <CardDescription>Your activity over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1 grid grid-cols-4 gap-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>{day.questions} Q</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{day.materials} M</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>{day.sessions} S</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-3 h-3 text-orange-500" />
                        <span>{day.points}p</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest contributions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {activity.type === "question" && <Brain className="h-5 w-5 text-blue-600" />}
                      {activity.type === "material" && <BookOpen className="h-5 w-5 text-green-600" />}
                      {activity.type === "session" && <Clock className="h-5 w-5 text-purple-600" />}
                      {activity.type === "quiz" && <Target className="h-5 w-5 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{activity.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{activity.time}</span>
                        <span className="flex items-center">
                          <Award className="h-3 w-3 mr-1 text-orange-500" />+{activity.points} points
                        </span>
                        {activity.rating && (
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {activity.rating}.0
                          </span>
                        )}
                        {activity.downloads && <span>{activity.downloads} downloads</span>}
                        {activity.score && <span>Score: {activity.score}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Achievements
              </CardTitle>
              <CardDescription>
                {achievements.filter((a) => a.unlocked).length} of {achievements.length} unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      achievement.unlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.unlocked ? "text-green-800" : "text-gray-500"}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.unlocked ? "text-green-600" : "text-gray-400"}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Answer 25 questions</span>
                  <span>{stats.questionsAnswered}/25</span>
                </div>
                <Progress value={(stats.questionsAnswered / 25) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Share 15 materials</span>
                  <span>{stats.materialsShared}/15</span>
                </div>
                <Progress value={(stats.materialsShared / 15) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Complete 10 sessions</span>
                  <span>{stats.videoSessions}/10</span>
                </div>
                <Progress value={(stats.videoSessions / 10) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.currentStreak}</div>
              <p className="text-sm text-gray-600 mb-4">Days in a row</p>
              <div className="text-sm text-gray-500">
                <p>Longest streak: {stats.longestStreak} days</p>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
