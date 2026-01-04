"use client"

import { useState, useMemo } from "react"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  type TooltipProps,
} from "recharts"
import { BarChart3, TrendingUp, Activity, RefreshCw } from "lucide-react"

import { useWeeklyStats, type WeeklyStatsData } from "@/hooks/use-weekly-stats"
import { cn } from "@/lib/utils"

type ChartType = "bar" | "area" | "line"

// Full day names for tooltip
const FULL_DAY_NAMES: Record<string, string> = {
  SUN: "Sunday",
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
}

interface ChartSelectorProps {
  selected: ChartType
  onChange: (type: ChartType) => void
}

function ChartSelector({ selected, onChange }: ChartSelectorProps) {
  const buttons: { type: ChartType; icon: React.ReactNode; label: string }[] = [
    { type: "bar", icon: <BarChart3 className="h-4 w-4" />, label: "Bar" },
    { type: "area", icon: <TrendingUp className="h-4 w-4" />, label: "Area" },
    { type: "line", icon: <Activity className="h-4 w-4" />, label: "Line" },
  ]

  return (
    <div className="flex gap-1" role="group" aria-label="Chart type selector">
      {buttons.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          aria-pressed={selected === type}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            selected === type
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null

  const data = payload[0].payload as WeeklyStatsData
  const fullDayName = FULL_DAY_NAMES[data.dayName] || data.dayName

  // Format date: "Monday, Jan 1"
  const dateObj = new Date(data.date)
  const formattedDate = `${fullDayName}, ${dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`

  // Format time: "2h 30m"
  const hours = Math.floor(data.totalMinutes / 60)
  const minutes = data.totalMinutes % 60
  const formattedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

  return (
    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
      <p className="font-medium text-sm">{formattedDate}</p>
      <div className="mt-1.5 space-y-0.5 text-sm text-muted-foreground">
        <p>{formattedTime}</p>
        <p>{data.totalSessions} sessions</p>
      </div>
    </div>
  )
}

// 고정 높이 패턴 (hydration mismatch 방지)
const SKELETON_HEIGHTS = [45, 65, 55, 40, 70, 50, 60]

function SkeletonChart() {
  return (
    <div className="h-[200px] xl:h-[300px] flex items-end justify-between gap-2 px-4">
      {SKELETON_HEIGHTS.map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-muted/50 rounded-t animate-pulse"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

export function WeeklyStatsChart() {
  const [chartType, setChartType] = useState<ChartType>("bar")
  const { data, isLoading, error, refetch } = useWeeklyStats()

  // Y축 최대값 계산 (데이터 최대값 + 20%)
  const maxMinutes = Math.max(...data.map((d) => d.totalMinutes), 1)
  const yAxisMax = Math.ceil(maxMinutes * 1.2)

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

  const chartColor = "var(--chart-1)"
  const todayColor = "var(--primary)"

  // 공통 차트 설정
  const commonProps = {
    data,
    margin: { top: 10, right: 10, left: -20, bottom: 0 },
  }

  // 커스텀 Dot 렌더링 함수 (Area/Line 공통)
  const renderDot = useMemo(() => {
    return (props: { cx?: number; cy?: number; payload?: WeeklyStatsData; index?: number }) => {
      const { cx, cy, payload, index } = props
      if (cx === undefined || cy === undefined || !payload) {
        return <circle key={`dot-empty-${index}`} cx={0} cy={0} r={0} fill="transparent" />
      }
      const isToday = payload.isToday
      return (
        <circle
          key={`dot-${payload.date}`}
          cx={cx}
          cy={cy}
          r={isToday ? 6 : 4}
          fill={isToday ? todayColor : chartColor}
          stroke={isToday ? "var(--background)" : "none"}
          strokeWidth={isToday ? 2 : 0}
        />
      )
    }
  }, [chartColor, todayColor])

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <XAxis
              dataKey="dayName"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, yAxisMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
            />
            <Bar dataKey="totalMinutes" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isToday ? todayColor : chartColor}
                  stroke={entry.isToday ? todayColor : "none"}
                  strokeWidth={entry.isToday ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dayName"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, yAxisMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalMinutes"
              stroke={chartColor}
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={renderDot}
            />
          </AreaChart>
        )

      case "line":
        return (
          <LineChart {...commonProps}>
            <XAxis
              dataKey="dayName"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, yAxisMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="totalMinutes"
              stroke={chartColor}
              strokeWidth={2}
              dot={renderDot}
              activeDot={{ r: 6, fill: chartColor }}
            />
          </LineChart>
        )
    }
  }

  return (
    <div className="space-y-4">
      {/* Header with Chart Selector */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Weekly Stats
        </p>
        <ChartSelector selected={chartType} onChange={setChartType} />
      </div>

      {/* Chart */}
      {isLoading ? (
        <SkeletonChart />
      ) : (
        <div className="h-[200px] xl:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
