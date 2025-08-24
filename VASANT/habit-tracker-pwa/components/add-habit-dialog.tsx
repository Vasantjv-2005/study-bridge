"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { addHabit, type Habit } from "@/lib/db"

interface AddHabitDialogProps {
  onHabitAdded: () => void
  editHabit?: Habit | null
  onEditComplete?: () => void
}

const HABIT_COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"]

const HABIT_ICONS = ["💪", "📚", "🏃", "🧘", "💧", "🥗", "😴", "🎯", "✍️", "🎵", "🎨", "🌱", "🏠", "💼", "📱", "🎮"]

export function AddHabitDialog({ onHabitAdded, editHabit, onEditComplete }: AddHabitDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(editHabit?.name || "")
  const [description, setDescription] = useState(editHabit?.description || "")
  const [color, setColor] = useState(editHabit?.color || HABIT_COLORS[0])
  const [icon, setIcon] = useState(editHabit?.icon || HABIT_ICONS[0])
  const [reminderTime, setReminderTime] = useState(editHabit?.reminderTime || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsLoading(true)
    try {
      if (editHabit) {
        // Update existing habit
        const { updateHabit } = await import("@/lib/db")
        await updateHabit({
          ...editHabit,
          name: name.trim(),
          description: description.trim(),
          color,
          icon,
          reminderTime: reminderTime || undefined,
        })
        onEditComplete?.()
      } else {
        // Add new habit
        await addHabit({
          name: name.trim(),
          description: description.trim(),
          color,
          icon,
          reminderTime: reminderTime || undefined,
        })
        onHabitAdded()
      }

      // Reset form
      setName("")
      setDescription("")
      setColor(HABIT_COLORS[0])
      setIcon(HABIT_ICONS[0])
      setReminderTime("")
      setOpen(false)
    } catch (error) {
      console.error("Error saving habit:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          {editHabit ? "Edit Habit" : "Add New Habit"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editHabit ? "Edit Habit" : "Add New Habit"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about your habit..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {HABIT_COLORS.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === colorOption ? "border-gray-900" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => setColor(colorOption)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-4 gap-2">
                {HABIT_ICONS.map((iconOption) => (
                  <button
                    key={iconOption}
                    type="button"
                    className={`w-8 h-8 text-lg border rounded ${
                      icon === iconOption ? "border-gray-900 bg-gray-100" : "border-gray-300"
                    }`}
                    onClick={() => setIcon(iconOption)}
                  >
                    {iconOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder">Reminder Time (Optional)</Label>
            <Input id="reminder" type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !name.trim()} className="flex-1">
              {isLoading ? "Saving..." : editHabit ? "Update" : "Add Habit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
