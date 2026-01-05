"use client"

import { Target } from "lucide-react"
import { useRealtimeFocusMinutes } from "@/hooks/use-realtime-focus"

interface GoalProgressProps {
  currentMinutes: number
  goalMinutes: number
  onGoalReached?: () => void
}

export function GoalProgress({ currentMinutes, goalMinutes }: GoalProgressProps) {
  const realtimeMinutes = useRealtimeFocusMinutes()

  // 저장된 시간 + 실시간 경과 시간
  const displayMinutes = currentMinutes + realtimeMinutes
  const progress = Math.min((displayMinutes / goalMinutes) * 100, 100)
  const isComplete = displayMinutes >= goalMinutes

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
        <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground hover-goal-label">
          <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="hidden sm:inline">Daily Goal</span>
          <span className="sm:hidden">Goal</span>
        </div>
        <span className={`hover-goal-value ${isComplete ? "text-green-500 font-medium" : "text-muted-foreground"}`}>
          <span className="hidden sm:inline">{displayMinutes} / {goalMinutes} min</span>
          <span className="sm:hidden">{displayMinutes}/{goalMinutes}m</span>
        </span>
      </div>
      <div className="h-1.5 sm:h-2 bg-[oklch(0.88_0.01_255)] dark:bg-muted rounded-full overflow-hidden hover-progress-bar">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isComplete
              ? "bg-green-500"
              : "bg-primary"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {isComplete && (
        <p className="text-[10px] sm:text-xs text-green-500 text-center mt-1 hover-hint-text">
          <span className="hidden sm:inline">Goal reached! Great job!</span>
          <span className="sm:hidden">🎉 Goal!</span>
        </p>
      )}
    </div>
  )
}
