"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface MiniTimerDemoProps {
  className?: string
}

const DEMO_DURATION = 60 // 1분 데모 (실제 25분은 너무 김)
const FULL_POMODORO = 25 * 60 // 25분

export function MiniTimerDemo({ className = "" }: MiniTimerDemoProps) {
  const [timeLeft, setTimeLeft] = useState(DEMO_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = ((DEMO_DURATION - timeLeft) / DEMO_DURATION) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = useCallback(() => {
    if (isCompleted) {
      setTimeLeft(DEMO_DURATION)
      setIsCompleted(false)
    }
    setIsRunning(true)
  }, [isCompleted])

  const handlePause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(DEMO_DURATION)
    setIsCompleted(false)
  }, [])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          setIsCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            <Play className="h-3 w-3" />
            Interactive Demo
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Try a Mini Pomodoro
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Experience the technique with this 1-minute demo
          </p>
        </div>

        {/* Timer Display */}
        <div className="relative flex justify-center mb-6">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            {/* Background Circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-muted/20"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={`transition-all duration-1000 ${
                  isCompleted
                    ? "text-emerald-500"
                    : isRunning
                    ? "text-primary"
                    : "text-primary/50"
                }`}
              />
            </svg>
            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2" />
                  <span className="text-sm font-medium text-emerald-500">Complete!</span>
                </>
              ) : (
                <>
                  <span className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {isRunning ? "Focus time" : "Ready"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              {isCompleted ? "Try Again" : "Start Demo"}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
            >
              <Pause className="h-4 w-4" />
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors"
            aria-label="Reset timer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* CTA to full timer */}
        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-3">
            Ready for a full 25-minute session?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            Start Real Pomodoro
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Floating tip */}
      {isRunning && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary animate-pulse">
          Stay focused until the timer ends!
        </div>
      )}
    </div>
  )
}
