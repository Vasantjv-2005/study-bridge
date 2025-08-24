"use client"
import type React from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  children,
  showRadialGradient = true,
  className,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={`relative flex flex-col h-[100vh] items-center justify-center bg-background transition-bg ${className}`}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={
              "absolute inset-0 z-0 [transform:scale(1.5)] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--aurora-1)),transparent_40%),radial-gradient(circle_at_20%_70%,hsl(var(--aurora-2)),transparent_40%),radial-gradient(circle_at_80%_30%,hsl(var(--aurora-3)),transparent_40%)] opacity-50"
            }
          />
        </div>
        {showRadialGradient && (
          <div className="absolute inset-0 z-0 [mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]" />
        )}
        {children}
      </div>
    </main>
  )
}
