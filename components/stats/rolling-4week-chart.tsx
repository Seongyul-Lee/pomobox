"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  type TooltipProps,
} from "recharts"
import { RefreshCw } from "lucide-react"

import {
  useRolling4WeekStats,
  type RollingWeekData,
} from "@/hooks/use-rolling-4week-stats"

// Skeleton heights for loading state (hydration mismatch prevention)
const SKELETON_HEIGHTS = [50, 70, 60, 80]

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null

  const data = payload[0].payload as RollingWeekData

  // Format date range: "Dec 18 - Dec 24"
  const startDate = new Date(data.startDate)
  const endDate = new Date(data.endDate)
  const dateRange = `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`

  // Format time: "2h 30m"
  const hours = Math.floor(data.totalMinutes / 60)
  const minutes = data.totalMinutes % 60
  const formattedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

  return (
    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
      <p className="font-medium text-sm">
        {data.weekLabel} ({dateRange})
      </p>
      <div className="mt-1.5 space-y-0.5 text-sm text-muted-foreground">
        <p>{formattedTime}</p>
        <p>{data.totalSessions} sessions</p>
      </div>
    </div>
  )
}

function SkeletonChart() {
  return (
    <div className="h-[200px] xl:h-[300px] flex items-end justify-around gap-4 px-8">
      {SKELETON_HEIGHTS.map((height, i) => (
        <div
          key={i}
          className="flex-1 max-w-20 bg-muted/50 rounded-t animate-pulse"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

export function Rolling4WeekChart() {
  const { data, isLoading, error, refetch } = useRolling4WeekStats()

  // Y-axis max calculation (max value + 20%)
  const maxMinutes = Math.max(...data.map((d) => d.totalMinutes), 1)
  const yAxisMax = Math.ceil(maxMinutes * 1.2)

  // Check if all weeks have no data
  const hasAnyData = data.some((d) => d.totalMinutes > 0)

  if (error) {
    return (
      <div className="h-[200px] xl:h-[300px] flex flex-col items-center justify-center gap-4 text-muted-foreground">
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

  if (isLoading) {
    return <SkeletonChart />
  }

  // Empty state: all weeks have no data
  if (!hasAnyData) {
    return (
      <div className="h-[200px] xl:h-[300px] flex items-end justify-around gap-4 px-8 pb-8">
        {data.map((week) => (
          <div key={week.weekLabel} className="flex flex-col items-center gap-2">
            <div className="w-14 h-5 bg-muted/30 rounded-t" />
            <span className="text-xs text-muted-foreground">{week.weekLabel}</span>
          </div>
        ))}
      </div>
    )
  }

  const chartColor = "var(--chart-1)"
  const currentWeekColor = "var(--primary)"

  // Y-axis tick formatter: minutes to hours
  const formatYAxis = (value: number) => {
    if (value === 0) return "0"
    const hours = value / 60
    return hours >= 1 ? `${Math.round(hours)}h` : `${value}m`
  }

  // Format time for accessibility
  const formatTimeA11y = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours} hours ${mins} minutes`
  }

  return (
    <div
      className="h-[200px] xl:h-[300px]"
      role="img"
      aria-label={`Monthly trend chart showing focus time for the last 4 weeks. ${data.map(d => `${d.weekLabel}: ${formatTimeA11y(d.totalMinutes)}`).join(', ')}`}
    >
      {/* Screen reader accessible data summary */}
      <div className="sr-only">
        <h3>Monthly Trend Summary</h3>
        <ul>
          {data.map(d => (
            <li key={d.weekLabel}>
              {d.weekLabel}: {formatTimeA11y(d.totalMinutes)} ({d.totalSessions} sessions)
            </li>
          ))}
        </ul>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <XAxis
            dataKey="weekLabel"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            domain={[0, yAxisMax]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "var(--muted)", opacity: 0.3 }}
          />
          <Bar dataKey="totalMinutes" radius={[4, 4, 0, 0]} minPointSize={5}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isCurrentWeek ? currentWeekColor : chartColor}
                stroke={entry.isCurrentWeek ? currentWeekColor : "none"}
                strokeWidth={entry.isCurrentWeek ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
