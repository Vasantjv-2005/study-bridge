"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Flame, Target, Trash2, Edit, Zap } from "lucide-react"
import { type Habit, type HabitEntry, addEntry, getEntryForHabitAndDate } from "@/lib/db"
import { calculateStreak, formatDate } from "@/lib/habits"
import { motion, AnimatePresence } from "framer-motion"

interface HabitCardProps {
  habit: Habit
  entries: HabitEntry[]
  onUpdate: () => void
  onEdit: (habit: Habit) => void
  onDelete: (habitId: string) => void
}

export function HabitCard({ habit, entries, onUpdate, onEdit, onDelete }: HabitCardProps) {
  const [todayEntry, setTodayEntry] = useState<HabitEntry | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const today = formatDate(new Date())
  const streaks = calculateStreak(entries)

  useEffect(() => {
    const loadTodayEntry = async () => {
      const entry = await getEntryForHabitAndDate(habit.id, today)
      setTodayEntry(entry || null)
    }
    loadTodayEntry()
  }, [habit.id, today, entries])

  const handleToggleComplete = async () => {
    setIsLoading(true)
    try {
      const completed = !todayEntry?.completed
      await addEntry({ habitId: habit.id, date: today, completed })
      onUpdate()
    } catch (error) {
      console.error("Error toggling habit:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isCompleted = todayEntry?.completed ?? false

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="relative group"
    >
      <div
        className={`absolute -inset-0.5 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}
        style={{
          background: `linear-gradient(45deg, hsl(var(--aurora-1)), hsl(var(--aurora-2)), hsl(var(--aurora-3)))`,
        }}
      />
      <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-white/5"
                style={{ color: habit.color }}
              >
                {habit.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{habit.name}</h3>
                <p className="text-sm text-muted-foreground">{habit.description}</p>
              </div>
            </div>
            <Button
              onClick={handleToggleComplete}
              disabled={isLoading}
              variant="ghost"
              size="icon"
              className={`w-12 h-12 rounded-full flex-shrink-0 transition-all duration-300 border-2 ${
                isCompleted
                  ? "bg-green-500/20 border-green-500 text-green-300"
                  : "bg-white/5 border-white/10 text-muted-foreground"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isCompleted ? "check" : "zap"}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {isCompleted ? <Check className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>{streaks.current} Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-indigo-400" />
              <span>Best: {streaks.longest}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(habit)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(habit.id)}
              className="h-8 w-8 text-muted-foreground hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
