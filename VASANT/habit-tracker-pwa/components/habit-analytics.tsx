"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import type { Habit, HabitEntry } from "@/lib/db"
import { getDateRange } from "@/lib/habits"
import { Calendar, TrendingUp, Target, Award } from "lucide-react"

interface HabitAnalyticsProps {
  habits: Habit[]
  entries: HabitEntry[]
}

export function HabitAnalytics({ habits, entries }: HabitAnalyticsProps) {
  const analyticsData = useMemo(() => {
    const last30Days = getDateRange(30)
    const last7Days = getDateRange(7)

    // Daily completion data for the last 30 days
    const dailyData = last30Days.map((date) => {
      const dayEntries = entries.filter((entry) => entry.date === date && entry.completed)
      return {
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        completed: dayEntries.length,
        total: habits.length,
      }
    })

    // Weekly completion data
    const weeklyData = last7Days.map((date) => {
      const dayEntries = entries.filter((entry) => entry.date === date && entry.completed)
      return {
        day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        completed: dayEntries.length,
        percentage: habits.length > 0 ? Math.round((dayEntries.length / habits.length) * 100) : 0,
      }
    })

    // Overall stats
    const totalCompletions = entries.filter((entry) => entry.completed).length
    const totalPossible = habits.length * 30 // Assuming 30 days
    const overallCompletion = totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0

    // Best performing habits
    const habitStats = habits
      .map((habit) => {
        const habitEntries = entries.filter((entry) => entry.habitId === habit.id)
        const completedEntries = habitEntries.filter((entry) => entry.completed)
        const completionRate =
          habitEntries.length > 0 ? Math.round((completedEntries.length / habitEntries.length) * 100) : 0

        return {
          habit,
          completionRate,
          totalCompletions: completedEntries.length,
        }
      })
      .sort((a, b) => b.completionRate - a.completionRate)

    return {
      dailyData,
      weeklyData,
      overallCompletion,
      habitStats,
      totalHabits: habits.length,
      totalCompletions,
    }
  }, [habits, entries])

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Active Habits</p>
                <p className="text-2xl font-bold">{analyticsData.totalHabits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Total Completions</p>
                <p className="text-2xl font-bold">{analyticsData.totalCompletions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Overall Rate</p>
                <p className="text-2xl font-bold">{analyticsData.overallCompletion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">This Week</p>
                <p className="text-2xl font-bold">
                  {analyticsData.weeklyData.reduce((sum, day) => sum + day.completed, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Completions (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                <Line type="monotone" dataKey="percentage" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Habit Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Habit Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.habitStats.map(({ habit, completionRate, totalCompletions }) => (
              <div key={habit.id} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-lg">{habit.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{habit.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress value={completionRate} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-12">{completionRate}%</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{totalCompletions} completed</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
