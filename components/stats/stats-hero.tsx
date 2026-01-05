"use client"

import { useMemo } from "react"
import { Flame, Calendar, Zap } from "lucide-react"

import { useWeekComparison } from "@/hooks/use-week-comparison"

/**
 * Format minutes to "Xh Ym" or just "Xh" / "Ym"
 */
function formatTime(minutes: number): { hours: number; mins: number; display: string } {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  let display: string
  if (hours > 0 && mins > 0) {
    display = `${hours}h ${mins}m`
  } else if (hours > 0) {
    display = `${hours}h`
  } else {
    display = `${mins}m`
  }

  return { hours, mins, display }
}

/**
 * Get current week date range string
 */
function getWeekRange(): string {
  const now = new Date()
  const dayOfWeek = now.getDay()

  // Get Sunday of current week
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - dayOfWeek)

  // Get Saturday of current week
  const saturday = new Date(sunday)
  saturday.setDate(sunday.getDate() + 6)

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return `${formatDate(sunday)} - ${formatDate(saturday)}`
}

function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-chart-2/10 border border-border/50">
      <div className="relative z-10 px-6 py-8 lg:px-10 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Main stat skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-32 bg-muted/30 rounded animate-pulse" />
            <div className="h-16 w-48 bg-muted/20 rounded animate-pulse" />
            <div className="h-4 w-24 bg-muted/30 rounded animate-pulse" />
          </div>

          {/* Mini stats skeleton */}
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 bg-muted/30 rounded animate-pulse" />
                <div className="h-6 w-12 bg-muted/20 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatsHero() {
  const { data, isLoading, error } = useWeekComparison()

  const weekRange = useMemo(() => getWeekRange(), [])

  if (isLoading || !data) {
    return <HeroSkeleton />
  }

  if (error) {
    return <HeroSkeleton />
  }

  const { thisWeek, comparison } = data
  const timeFormatted = formatTime(thisWeek.totalMinutes)

  // Determine streak or growth message
  const growthPercent = comparison.totalMinutes.percent
  const isGrowing = comparison.totalMinutes.trend === "up"

  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-chart-2/10 border border-border/50 transition-all duration-500 ease-out hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
      role="region"
      aria-label={`This week's focus summary: ${timeFormatted.display} total focus time`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs - animate on hover */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:bg-primary/20 group-hover:scale-110" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-chart-2/10 blur-3xl transition-all duration-700 group-hover:bg-chart-2/20 group-hover:scale-105" />

        {/* Grid pattern - subtle fade in on hover */}
        <div
          className="absolute inset-0 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-chart-2/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="relative z-10 px-6 py-8 lg:px-10 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Main stat - Big Typography */}
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              This Week
              <span className="text-[10px] font-normal normal-case opacity-70">
                ({weekRange})
              </span>
            </p>

            {/* Large time display */}
            <div className="flex items-baseline gap-1">
              <span
                className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {timeFormatted.hours > 0 ? timeFormatted.hours : timeFormatted.mins}
              </span>
              <span className="text-2xl lg:text-3xl font-medium text-muted-foreground">
                {timeFormatted.hours > 0 ? "h" : "m"}
              </span>
              {timeFormatted.hours > 0 && timeFormatted.mins > 0 && (
                <>
                  <span
                    className="text-3xl lg:text-4xl font-bold tracking-tighter ml-1"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {timeFormatted.mins}
                  </span>
                  <span className="text-xl lg:text-2xl font-medium text-muted-foreground">
                    m
                  </span>
                </>
              )}
            </div>

            {/* Growth indicator */}
            {growthPercent !== 0 && (
              <p className={`text-sm font-medium flex items-center gap-1.5 ${
                isGrowing ? "text-success" : "text-destructive"
              }`}>
                <Zap className="h-3.5 w-3.5" />
                {isGrowing ? "+" : ""}{growthPercent}% vs last week
              </p>
            )}
          </div>

          {/* Mini stats */}
          <div className="flex gap-8 lg:gap-10">
            {/* Sessions */}
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Sessions
              </p>
              <p
                className="text-2xl lg:text-3xl font-bold tracking-tight"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {thisWeek.totalSessions}
              </p>
            </div>

            {/* Daily Avg */}
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Daily Avg
              </p>
              <p
                className="text-2xl lg:text-3xl font-bold tracking-tight"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatTime(thisWeek.avgMinutesPerDay).display}
              </p>
            </div>

            {/* Streak placeholder - could be connected to real data later */}
            <div className="space-y-0.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Flame className="h-3 w-3 text-orange-500" />
                Active Days
              </p>
              <p
                className="text-2xl lg:text-3xl font-bold tracking-tight"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {thisWeek.totalSessions > 0
                  ? Math.min(7, Math.ceil(thisWeek.totalSessions / 2))
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
