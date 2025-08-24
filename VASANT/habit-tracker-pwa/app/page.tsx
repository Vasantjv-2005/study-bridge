"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { HabitCard } from "@/components/habit-card"
import { AddHabitDialog } from "@/components/add-habit-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { type Habit, type HabitEntry, getHabits, getAllEntries, deleteHabit } from "@/lib/db"
import { formatDate } from "@/lib/habits"
import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Confetti from "react-confetti"
import { useWindowSize } from "@uidotdev/usehooks"

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [entries, setEntries] = useState<HabitEntry[]>([])
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const { toast } = useToast()
  const { width, height } = useWindowSize()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [habitsData, entriesData] = await Promise.all([getHabits(), getAllEntries()])
      setHabits(habitsData)
      setEntries(entriesData)
    } catch (error) {
      console.error("Error loading data:", error)
      toast({ title: "Error", description: "Could not load your habits.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteHabit = async (habitId: string) => {
    if (confirm("Are you sure you want to delete this habit and all its data? This action cannot be undone.")) {
      await deleteHabit(habitId)
      toast({ title: "Habit Deleted", description: "The habit has been removed." })
      loadData()
    }
  }

  const { completedToday, allHabitsCompleted } = useMemo(() => {
    const todayEntries = entries.filter((entry) => entry.date === formatDate(new Date()))
    const completed = todayEntries.filter((entry) => entry.completed).length
    const allCompleted = habits.length > 0 && completed === habits.length
    return {
      completedToday: completed,
      allHabitsCompleted: allCompleted,
    }
  }, [entries, habits])

  useEffect(() => {
    if (allHabitsCompleted) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 8000) // Confetti for 8 seconds
      return () => clearTimeout(timer)
    }
  }, [allHabitsCompleted])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
      </div>
    )
  }

  return (
    <>
      {showConfetti && <Confetti width={width!} height={height!} recycle={false} numberOfPieces={400} />}
      <Toaster />
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-8 h-full flex flex-col">
        <header className="flex items-center justify-between mb-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-foreground">{getGreeting()}</h1>
            <p className="text-muted-foreground">Ready to make progress today?</p>
          </motion.div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AddHabitDialog onHabitAdded={loadData}>
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-2" /> New Habit
              </Button>
            </AddHabitDialog>
          </div>
        </header>

        <main className="flex-1">
          <AnimatePresence>
            {habits.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-2xl font-semibold mb-2">Welcome to HabitFlow</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first habit and start building a better you, one day at a time.
                </p>
                <AddHabitDialog onHabitAdded={loadData}>
                  <Button size="lg" variant="primary">
                    <Plus className="h-5 w-5 mr-2" /> Create First Habit
                  </Button>
                </AddHabitDialog>
              </motion.div>
            ) : (
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    entries={entries.filter((entry) => entry.habitId === habit.id)}
                    onUpdate={loadData}
                    onEdit={setEditingHabit}
                    onDelete={handleDeleteHabit}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {editingHabit && (
          <AddHabitDialog
            editHabit={editingHabit}
            onEditComplete={() => {
              setEditingHabit(null)
              loadData()
            }}
            onHabitAdded={() => {}}
          />
        )}
      </div>
    </>
  )
}
