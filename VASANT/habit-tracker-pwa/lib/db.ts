import { openDB, type DBSchema, type IDBPDatabase } from "idb"

export interface Habit {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  createdAt: Date
  targetDays?: number[]
  reminderTime?: string
}

export interface HabitEntry {
  id: string
  habitId: string
  date: string
  completed: boolean
  notes?: string
  timestamp: Date
}

interface HabitDB extends DBSchema {
  habits: {
    key: string
    value: Habit
  }
  entries: {
    key: string
    value: HabitEntry
    indexes: {
      "by-habit": string
      "by-date": string
      "by-habit-date": [string, string]
    }
  }
}

let dbInstance: IDBPDatabase<HabitDB> | null = null

export async function initDB(): Promise<IDBPDatabase<HabitDB>> {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<HabitDB>("habit-tracker", 1, {
    upgrade(db) {
      // Create habits store
      const habitStore = db.createObjectStore("habits", {
        keyPath: "id",
      })

      // Create entries store
      const entryStore = db.createObjectStore("entries", {
        keyPath: "id",
      })

      // Create indexes for efficient querying
      entryStore.createIndex("by-habit", "habitId")
      entryStore.createIndex("by-date", "date")
      entryStore.createIndex("by-habit-date", ["habitId", "date"])
    },
  })

  return dbInstance
}

export async function addHabit(habit: Omit<Habit, "id" | "createdAt">): Promise<Habit> {
  const db = await initDB()
  const newHabit: Habit = {
    ...habit,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  }

  await db.add("habits", newHabit)
  return newHabit
}

export async function getHabits(): Promise<Habit[]> {
  const db = await initDB()
  return await db.getAll("habits")
}

export async function updateHabit(habit: Habit): Promise<void> {
  const db = await initDB()
  await db.put("habits", habit)
}

export async function deleteHabit(habitId: string): Promise<void> {
  const db = await initDB()
  await db.delete("habits", habitId)

  // Delete all entries for this habit
  const entries = await db.getAllFromIndex("entries", "by-habit", habitId)
  for (const entry of entries) {
    await db.delete("entries", entry.id)
  }
}

export async function addEntry(entry: Omit<HabitEntry, "id" | "timestamp">): Promise<HabitEntry> {
  const db = await initDB()
  const newEntry: HabitEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  }

  await db.put("entries", newEntry)
  return newEntry
}

export async function getEntriesForHabit(habitId: string): Promise<HabitEntry[]> {
  const db = await initDB()
  return await db.getAllFromIndex("entries", "by-habit", habitId)
}

export async function getEntriesForDate(date: string): Promise<HabitEntry[]> {
  const db = await initDB()
  return await db.getAllFromIndex("entries", "by-date", date)
}

export async function getEntryForHabitAndDate(habitId: string, date: string): Promise<HabitEntry | undefined> {
  const db = await initDB()
  const entries = await db.getAllFromIndex("entries", "by-habit-date", [habitId, date])
  return entries[0]
}

export async function getAllEntries(): Promise<HabitEntry[]> {
  const db = await initDB()
  return await db.getAll("entries")
}
