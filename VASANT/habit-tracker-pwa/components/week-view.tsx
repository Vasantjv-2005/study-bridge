"use client"

import type { Habit, HabitEntry } from "@/lib/db"
import { formatDate } from "@/lib/habits"
import { motion } from "framer-motion"

interface WeekViewProps {
  habits: Habit[]
  entries: HabitEntry[]
}

export function WeekView({ habits, entries }: WeekViewProps) {
  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - d.getDay() + i)
    return d
  })

  const weekData = weekDates.map((date) => {
    const dateString = formatDate(date)
    const dayEntries = entries.filter((e) => e.date === dateString && e.completed)
    const progress = habits.length > 0 ? (dayEntries.length / habits.length) * 100 : 0
    return {
      date,
      progress,
    }
  })

  return (
    <div className="bg-card p-4 rounded-lg border">
      <h3 className="font-semibold text-card-foreground mb-3">This Week's Consistency</h3>
      <div className="flex justify-between items-end gap-2 h-24">
        {weekData.map(({ date, progress }, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <motion.div
              className="w-full rounded-full bg-primary/10"
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.5, delay: index * 0.05, type: "spring" }}
              style={{
                background: `linear-gradient(to top, hsl(var(--primary)/0.5), hsl(var(--primary)))`,
              }}
            />
            <span className="text-xs text-muted-foreground">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
