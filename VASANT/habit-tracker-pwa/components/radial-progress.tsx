"use client"

import type React from "react"

interface RadialProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  children?: React.ReactNode
}

export function RadialProgress({
  progress,
  size = 120,
  strokeWidth = 10,
  color = "hsl(221.2 83.2% 53.3%)",
  children,
}: RadialProgressProps) {
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}
