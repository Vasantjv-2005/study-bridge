"use client"

import Image from "next/image"

export function CoverLetterSection() {
  const imagePath = "/cover-letter.png"

  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Cover Letter</h2>

          <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt="Cover letter document preview for Vasant Jevengekar"
              width={1600}
              height={2200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
