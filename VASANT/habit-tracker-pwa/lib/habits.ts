import { type Habit, type HabitEntry, getEntriesForHabit } from "./db"

export function calculateStreak(entries: HabitEntry[]): { current: number; longest: number } {
  if (entries.length === 0) return { current: 0, longest: 0 }

  // Sort entries by date (newest first)
  const sortedEntries = entries
    .filter((entry) => entry.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sortedEntries.length === 0) return { current: 0, longest: 0 }

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Check if there's an entry for today or yesterday to start current streak
  const latestEntry = new Date(sortedEntries[0].date)
  latestEntry.setHours(0, 0, 0, 0)

  const daysDiff = Math.floor((today.getTime() - latestEntry.getTime()) / (1000 * 60 * 60 * 24))

  if (daysDiff <= 1) {
    // Start counting current streak
    const currentDate = new Date(latestEntry)

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date)
      entryDate.setHours(0, 0, 0, 0)

      if (entryDate.getTime() === currentDate.getTime()) {
        currentStreak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
  }

  // Calculate longest streak
  let consecutiveDate = new Date(sortedEntries[0].date)
  consecutiveDate.setHours(0, 0, 0, 0)
  tempStreak = 1

  for (let i = 1; i < sortedEntries.length; i++) {
    const entryDate = new Date(sortedEntries[i].date)
    entryDate.setHours(0, 0, 0, 0)

    const expectedDate = new Date(consecutiveDate)
    expectedDate.setDate(expectedDate.getDate() - 1)

    if (entryDate.getTime() === expectedDate.getTime()) {
      tempStreak++
      consecutiveDate = entryDate
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
      consecutiveDate = entryDate
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak)

  return { current: currentStreak, longest: longestStreak }
}

export function getCompletionRate(entries: HabitEntry[], days = 30): number {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const relevantEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date)
    return entryDate >= startDate && entryDate <= endDate
  })

  const completedDays = relevantEntries.filter((entry) => entry.completed).length
  return days > 0 ? Math.round((completedDays / days) * 100) : 0
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function getDateRange(days: number): string[] {
  const dates: string[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    dates.push(formatDate(date))
  }

  return dates
}

export async function getHabitStats(habit: Habit) {
  const entries = await getEntriesForHabit(habit.id)
  const streaks = calculateStreak(entries)
  const completionRate = getCompletionRate(entries)
  const totalCompletions = entries.filter((e) => e.completed).length

  return {
    streaks,
    completionRate,
    totalCompletions,
    totalEntries: entries.length,
  }
}
