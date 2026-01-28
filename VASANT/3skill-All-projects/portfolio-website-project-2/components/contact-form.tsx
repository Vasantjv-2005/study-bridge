"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, Mail, MessageSquare, Sparkles } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="max-w-2xl mx-auto animate-scale-in">
      <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-pink-500/30 transition-all duration-500 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-gray-900 dark:text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Send a Message</h3>
          <p className="text-gray-600 dark:text-gray-300">I'll get back to you as soon as possible!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Name</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="backdrop-blur-xl bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-white/20 focus:border-pink-500/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="backdrop-blur-xl bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-white/20 focus:border-pink-500/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-xl h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Subject</span>
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              required
              className="backdrop-blur-xl bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-white/20 focus:border-pink-500/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or just say hello..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="backdrop-blur-xl bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-white/20 focus:border-pink-500/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-xl resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}
