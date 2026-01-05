"use client"

import { TrendingUp, TrendingDown, Minus, Clock, Target, CalendarDays, RefreshCw } from "lucide-react"

import { useWeekComparison } from "@/hooks/use-week-comparison"
import { cn } from "@/lib/utils"
import { MOCK_WEEK_COMPARISON } from "./mock-data"

interface WeekComparisonProps {
  /** Mock 모드: 가상 데이터를 표시 (비로그인 사용자용) */
  useMockData?: boolean
}

interface KPICardProps {
  title: string
  thisWeekValue: string
  lastWeekValue: string
  diff: string
  percent: number
  trend: "up" | "down" | "same"
  icon: React.ReactNode
  accentColor?: string
}

function KPICard({
  title,
  thisWeekValue,
  lastWeekValue,
  diff,
  percent,
  trend,
  icon,
  accentColor = "from-primary/20",
}: KPICardProps) {
  const trendIcon = {
    up: <TrendingUp className="h-3.5 w-3.5" />,
    down: <TrendingDown className="h-3.5 w-3.5" />,
    same: <Minus className="h-3.5 w-3.5" />,
  }

  const trendColor = {
    up: "text-[oklch(65%_0.18_145)]",
    down: "text-[oklch(65%_0.18_25)]",
    same: "text-muted-foreground",
  }

  const trendBg = {
    up: "bg-[oklch(65%_0.18_145/0.15)]",
    down: "bg-[oklch(65%_0.18_25/0.15)]",
    same: "bg-muted/30",
  }

  const trendDescription = trend === "up" ? "increased" : trend === "down" ? "decreased" : "unchanged"

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-gradient-to-br",
        accentColor,
        "to-transparent",
        "border border-border/30",
        "p-5 space-y-4",
        "transition-all duration-300",
        "hover:border-border/50 hover:shadow-md"
      )}
      aria-label={`${title}: ${thisWeekValue} this week, ${trendDescription} from ${lastWeekValue} last week`}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header with icon */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/30">
            <span className="text-muted-foreground" aria-hidden="true">
              {icon}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>

        {/* Trend Badge - positioned top right */}
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
            trendBg[trend],
            trendColor[trend]
          )}
          aria-hidden="true"
        >
          {trendIcon[trend]}
          <span>
            {trend === "same" ? "0%" : `${percent > 0 ? "+" : ""}${percent}%`}
          </span>
        </div>
      </div>

      {/* Main Value - Large Typography */}
      <div className="relative">
        <div
          className="text-3xl lg:text-4xl font-bold tracking-tight"
          style={{ fontVariantNumeric: "tabular-nums" }}
          aria-hidden="true"
        >
          {thisWeekValue}
        </div>
      </div>

      {/* Comparison footer */}
      <div className="relative flex items-center gap-2 pt-2 border-t border-border/20">
        <span className="text-xs text-muted-foreground" aria-hidden="true">
          vs last week:
        </span>
        <span className="text-xs font-medium text-muted-foreground/80" aria-hidden="true">
          {lastWeekValue}
        </span>
        <span className={cn("text-xs font-medium ml-auto", trendColor[trend])} aria-hidden="true">
          {trend === "up" && "+"}
          {diff}
        </span>
      </div>
    </article>
  )
}

function SkeletonKPICard() {
  return (
    <div className="rounded-xl border border-border/30 bg-muted/5 p-5 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-muted/30 rounded-lg" />
          <div className="h-4 w-20 bg-muted/30 rounded" />
        </div>
        <div className="h-6 w-14 bg-muted/30 rounded-full" />
      </div>
      <div className="h-10 w-28 bg-muted/20 rounded" />
      <div className="flex items-center gap-2 pt-2 border-t border-border/20">
        <div className="h-3 w-20 bg-muted/30 rounded" />
        <div className="h-3 w-12 bg-muted/30 rounded ml-auto" />
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

export function WeekComparison({ useMockData = false }: WeekComparisonProps) {
  const { data: realData, isLoading, error, refetch } = useWeekComparison()

  // Mock 모드에서는 에러 무시
  if (error && !useMockData) {
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

  // Mock 모드에서는 로딩 무시
  if ((isLoading || !realData) && !useMockData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonKPICard />
        <SkeletonKPICard />
        <SkeletonKPICard />
      </div>
    )
  }

  // Mock 모드면 가상 데이터 사용
  const data = useMockData ? MOCK_WEEK_COMPARISON : realData!
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
        accentColor="from-chart-1/15"
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
        accentColor="from-chart-2/15"
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
        accentColor="from-chart-4/15"
      />
    </div>
  )
}
