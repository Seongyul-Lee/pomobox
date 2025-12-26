"use client"

import { useTranslations } from "next-intl"
import { Target } from "lucide-react"
import { useRealtimeFocusMinutes } from "@/hooks/use-realtime-focus"

interface GoalProgressProps {
  currentMinutes: number
  goalMinutes: number
  onGoalReached?: () => void
}

export function GoalProgress({ currentMinutes, goalMinutes }: GoalProgressProps) {
  const t = useTranslations("Timer")
  const realtimeMinutes = useRealtimeFocusMinutes()

  // 저장된 시간 + 실시간 경과 시간
  const displayMinutes = currentMinutes + realtimeMinutes
  const progress = Math.min((displayMinutes / goalMinutes) * 100, 100)
  const isComplete = displayMinutes >= goalMinutes

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between text-sm mb-1">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Target className="h-3.5 w-3.5" />
          <span>{t("dailyGoal")}</span>
        </div>
        <span className={isComplete ? "text-green-500 font-medium" : "text-muted-foreground"}>
          {displayMinutes}/{goalMinutes} {t("min")}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isComplete
              ? "bg-green-500"
              : "bg-primary"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {isComplete ? (
        <p className="text-xs text-green-500 text-center mt-1">
          {t("goalReached")}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground/70 text-center mt-1">
          {t("goalHint")}
        </p>
      )}
    </div>
  )
}
