"use client"

import { useMemo } from "react"
import { Sun, Target, Timer, Sparkles } from "lucide-react"

import { useTodayStats } from "@/hooks/use-today-stats"
import { cn } from "@/lib/utils"

/**
 * Circular progress ring component
 */
function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
}: {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      className={cn("transform -rotate-90", className)}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/20"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--chart-2)" />
          <stop offset="50%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--chart-4)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function TodayStatsSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-chart-2/10 via-transparent to-primary/10 p-6">
      <div className="flex items-center gap-6">
        {/* Progress ring skeleton */}
        <div className="relative">
          <div className="w-[120px] h-[120px] rounded-full bg-muted/20 animate-pulse" />
        </div>
        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          <div className="h-4 w-20 bg-muted/30 rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted/20 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-muted/30 rounded animate-pulse" />
            <div className="h-4 w-24 bg-muted/30 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function TodayStats() {
  const { data, isLoading, error } = useTodayStats()

  // Get formatted date
  const formattedDate = useMemo(() => {
    const today = new Date()
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }, [])

  if (isLoading) {
    return <TodayStatsSkeleton />
  }

  if (error || !data) {
    return <TodayStatsSkeleton />
  }

  const { totalMinutes, totalSessions, formattedTime, goalProgress } = data
  const isGoalMet = goalProgress >= 100

  // Parse hours and minutes for display
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl h-full",
        "border border-border/30",
        "bg-gradient-to-br from-chart-2/8 via-transparent to-primary/8",
        "transition-all duration-500",
        "hover:border-chart-2/40 hover:shadow-lg hover:shadow-chart-2/10"
      )}
      role="region"
      aria-label={`Today's focus: ${formattedTime}, ${totalSessions} sessions completed, ${goalProgress}% of daily goal`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orb */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-chart-2/10 blur-3xl group-hover:bg-chart-2/15 transition-colors duration-500" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 p-5 lg:p-6 flex flex-col h-full">
        {/* Header Row - Today badge + Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-chart-2/15 group-hover:bg-chart-2/20 transition-colors">
              <Sun className="h-4 w-4 text-chart-2" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Today</h3>
          </div>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>

        {/* Main Content - Ring + Time */}
        <div className="flex items-center gap-5 flex-1">
          {/* Progress Ring - Compact */}
          <div className="relative flex-shrink-0">
            <ProgressRing progress={goalProgress} size={100} strokeWidth={8} />

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isGoalMet ? (
                <Sparkles className="h-5 w-5 text-chart-2 animate-pulse" />
              ) : (
                <span
                  className="text-xl font-bold tracking-tight"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {goalProgress}%
                </span>
              )}
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {isGoalMet ? "Done!" : "goal"}
              </span>
            </div>
          </div>

          {/* Time Display + Stats */}
          <div className="flex-1 min-w-0">
            {/* Main Time Display */}
            <div className="flex items-baseline gap-1 mb-3">
              {hours > 0 ? (
                <>
                  <span
                    className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-chart-2 via-primary to-chart-4 bg-clip-text text-transparent"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {hours}
                  </span>
                  <span className="text-lg font-medium text-muted-foreground">h</span>
                  {minutes > 0 && (
                    <>
                      <span
                        className="text-2xl font-bold tracking-tighter ml-0.5"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {minutes}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">m</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span
                    className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-chart-2 via-primary to-chart-4 bg-clip-text text-transparent"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {minutes}
                  </span>
                  <span className="text-lg font-medium text-muted-foreground">m</span>
                </>
              )}
            </div>

            {/* Mini Stats - Inline */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-primary/70" />
                <span
                  className="text-sm font-semibold"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {totalSessions}
                </span>
                <span className="text-xs text-muted-foreground">sessions</span>
              </div>

              <div className="w-px h-3 bg-border/50" />

              <div className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-chart-4/70" />
                <span
                  className="text-sm font-semibold"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0}
                </span>
                <span className="text-xs text-muted-foreground">min/sess</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
