"use client"

import { TrendingUp, TrendingDown, Minus, Clock, Target, CalendarDays, RefreshCw } from "lucide-react"

import { useWeekComparison } from "@/hooks/use-week-comparison"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  thisWeekValue: string
  lastWeekValue: string
  diff: string
  percent: number
  trend: "up" | "down" | "same"
  icon: React.ReactNode
}

function KPICard({
  title,
  thisWeekValue,
  lastWeekValue,
  diff,
  percent,
  trend,
  icon,
}: KPICardProps) {
  const trendIcon = {
    up: <TrendingUp className="h-4 w-4" />,
    down: <TrendingDown className="h-4 w-4" />,
    same: <Minus className="h-4 w-4" />,
  }

  const trendColor = {
    up: "text-[oklch(59%_0.2_145)]", // 녹색
    down: "text-[oklch(59%_0.2_25)]", // 빨간색
    same: "text-muted-foreground",
  }

  const trendBg = {
    up: "bg-[oklch(59%_0.2_145/0.1)]",
    down: "bg-[oklch(59%_0.2_25/0.1)]",
    same: "bg-muted/50",
  }

  const trendDescription = trend === "up" ? "increased" : trend === "down" ? "decreased" : "unchanged"

  return (
    <article
      className="rounded-xl border bg-background/50 backdrop-blur-sm p-4 space-y-3"
      aria-label={`${title}: ${thisWeekValue} this week, ${trendDescription} from ${lastWeekValue} last week`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <span aria-hidden="true">{icon}</span>
        <span className="text-sm font-medium">{title}</span>
      </div>

      {/* This Week Value */}
      <div className="text-2xl font-bold tracking-tight" aria-hidden="true">
        {thisWeekValue}
      </div>

      {/* Last Week + Trend */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground" aria-hidden="true">
          Last week: {lastWeekValue}
        </span>

        {/* Trend Badge */}
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
            trendBg[trend],
            trendColor[trend]
          )}
          aria-hidden="true"
        >
          {trendIcon[trend]}
          <span>
            {trend === "up" && "+"}
            {diff} ({trend === "same" ? "0" : `${percent > 0 ? "+" : ""}${percent}`}%)
          </span>
        </div>
      </div>
    </article>
  )
}

function SkeletonKPICard() {
  return (
    <div className="rounded-xl border bg-background/50 backdrop-blur-sm p-4 space-y-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-muted rounded" />
        <div className="h-4 w-20 bg-muted rounded" />
      </div>
      <div className="h-8 w-24 bg-muted rounded" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-muted rounded" />
        <div className="h-5 w-16 bg-muted rounded-full" />
      </div>
    </div>
  )
}

/**
 * 시간을 "Xh Ym" 형식으로 변환
 */
function formatTime(minutes: number): string {
  const absMinutes = Math.abs(minutes)
  const hours = Math.floor(absMinutes / 60)
  const mins = absMinutes % 60

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${mins}m`
  }
}

export function WeekComparison() {
  const { data, isLoading, error, refetch } = useWeekComparison()

  if (error) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <p className="text-sm">{error.message}</p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonKPICard />
        <SkeletonKPICard />
        <SkeletonKPICard />
      </div>
    )
  }

  const { thisWeek, lastWeek, comparison } = data

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Time */}
      <KPICard
        title="Total Time"
        thisWeekValue={formatTime(thisWeek.totalMinutes)}
        lastWeekValue={formatTime(lastWeek.totalMinutes)}
        diff={formatTime(comparison.totalMinutes.diff)}
        percent={comparison.totalMinutes.percent}
        trend={comparison.totalMinutes.trend}
        icon={<Clock className="h-4 w-4" />}
      />

      {/* Total Sessions */}
      <KPICard
        title="Total Sessions"
        thisWeekValue={`${thisWeek.totalSessions}`}
        lastWeekValue={`${lastWeek.totalSessions}`}
        diff={`${Math.abs(comparison.totalSessions.diff)}`}
        percent={comparison.totalSessions.percent}
        trend={comparison.totalSessions.trend}
        icon={<Target className="h-4 w-4" />}
      />

      {/* Average per Day */}
      <KPICard
        title="Daily Average"
        thisWeekValue={formatTime(thisWeek.avgMinutesPerDay)}
        lastWeekValue={formatTime(lastWeek.avgMinutesPerDay)}
        diff={formatTime(comparison.avgMinutesPerDay.diff)}
        percent={comparison.avgMinutesPerDay.percent}
        trend={comparison.avgMinutesPerDay.trend}
        icon={<CalendarDays className="h-4 w-4" />}
      />
    </div>
  )
}
