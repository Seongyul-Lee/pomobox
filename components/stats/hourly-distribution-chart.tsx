"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts"
import { Clock, RefreshCw } from "lucide-react"

import { useFocusDistributionQuery, type HourlyDistribution } from "@/lib/queries/stats-queries"
import { useUser } from "@/hooks/use-user"
import { MOCK_HOURLY_DATA, type MockHourlyData } from "./mock-data"

interface HourlyDistributionChartProps {
  /** Mock 모드: 가상 데이터를 표시 (비로그인 사용자용) */
  useMockData?: boolean
}

/**
 * 빈 시간대 0분으로 채우기 (0-23시)
 */
function fillMissingHours(data: HourlyDistribution[]): HourlyDistribution[] {
  const result = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    total_minutes: 0,
  }))
  data.forEach((d) => {
    if (d.hour >= 0 && d.hour < 24) {
      result[d.hour] = d
    }
  })
  return result
}

/**
 * 날짜 범위 계산 (최근 30일)
 */
function getDateRange(): { startDate: string; endDate: string } {
  const today = new Date()
  const start = new Date(today)
  start.setDate(start.getDate() - 29) // 30일 전

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

  return {
    startDate: format(start),
    endDate: format(today),
  }
}

/**
 * 시간 포맷팅: "09:00 - 10:00"
 */
function formatHourRange(hour: number): string {
  const start = String(hour).padStart(2, "0")
  const end = String((hour + 1) % 24).padStart(2, "0")
  return `${start}:00 - ${end}:00`
}

/**
 * 분 → 시간/분 포맷팅: "2h 5m"
 */
function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }
  return `${mins}m`
}

interface ChartDataPoint extends HourlyDistribution {
  isPeak: boolean
  label: string
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null

  const data = payload[0].payload as ChartDataPoint

  return (
    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
      <p className="font-medium text-sm">{formatHourRange(data.hour)}</p>
      <div className="mt-1.5 flex items-center gap-2 text-sm">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-foreground font-medium">
          {formatMinutes(data.total_minutes)}
        </span>
        {data.isPeak && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
            Peak
          </span>
        )}
      </div>
    </div>
  )
}

// 고정 높이 패턴 (hydration mismatch 방지)
const SKELETON_HEIGHTS = [20, 35, 45, 60, 75, 85, 90, 95, 80, 70, 55, 40, 30, 25, 20, 25, 35, 50, 65, 75, 70, 55, 40, 25]

function SkeletonChart() {
  return (
    <div className="h-[200px] xl:h-[300px] flex items-end justify-between gap-0.5 px-4">
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

function EmptyState() {
  return (
    <div className="h-[200px] xl:h-[300px] flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <Clock className="h-8 w-8 opacity-50" />
      <p className="text-sm">No focus data yet</p>
      <p className="text-xs">Complete focus sessions to see your patterns</p>
    </div>
  )
}

export function HourlyDistributionChart({ useMockData = false }: HourlyDistributionChartProps) {
  const { user } = useUser()
  const { startDate, endDate } = useMemo(() => getDateRange(), [])

  const { data: rawData, isLoading, error, refetch } = useFocusDistributionQuery(
    user?.id ?? null,
    startDate,
    endDate
  )

  // 차트 데이터 전처리
  const chartData = useMemo<ChartDataPoint[]>(() => {
    // Mock 모드면 가상 데이터 사용
    if (useMockData) {
      return MOCK_HOURLY_DATA as ChartDataPoint[]
    }

    if (!rawData || rawData.length === 0) return []

    const filledData = fillMissingHours(rawData)
    const maxMinutes = Math.max(...filledData.map((d) => d.total_minutes))

    return filledData.map((d) => ({
      ...d,
      isPeak: d.total_minutes === maxMinutes && maxMinutes > 0,
      label: String(d.hour).padStart(2, "0"),
    }))
  }, [rawData, useMockData])

  // Y축 최대값 계산
  const yAxisMax = useMemo(() => {
    const max = Math.max(...chartData.map((d) => d.total_minutes), 1)
    return Math.ceil(max * 1.2)
  }, [chartData])

  // 피크 시간대 찾기
  const peakHour = useMemo(() => {
    const peak = chartData.find((d) => d.isPeak)
    return peak ? peak.hour : null
  }, [chartData])

  // 총 집중 시간
  const totalMinutes = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.total_minutes, 0)
  }, [chartData])

  // Mock 모드에서는 에러 무시
  if (error && !useMockData) {
    return (
      <div className="h-[200px] xl:h-[300px] flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <p className="text-sm">Failed to load data</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    )
  }

  // Mock 모드에서는 로딩 무시
  if (isLoading && !useMockData) {
    return <SkeletonChart />
  }

  // 데이터 없음 (Mock 모드에서는 무시)
  if ((!chartData.length || totalMinutes === 0) && !useMockData) {
    return <EmptyState />
  }

  const chartColor = "var(--chart-2)"
  const peakColor = "var(--primary)"

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Last 30 days
        </p>
        {peakHour !== null && (
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">Peak:</span>
            <span className="font-medium text-primary">
              {formatHourRange(peakHour)}
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div
        className="h-[200px] xl:h-[300px]"
        role="img"
        aria-label={`Hourly focus distribution chart showing peak productivity hours. Peak hour: ${peakHour !== null ? formatHourRange(peakHour) : 'none'}. Total focus time: ${formatMinutes(totalMinutes)}.`}
      >
        {/* Screen reader accessible data summary */}
        <div className="sr-only">
          <h3>Hourly Focus Distribution</h3>
          <p>Peak hour: {peakHour !== null ? formatHourRange(peakHour) : 'No data'}</p>
          <p>Total focus time in last 30 days: {formatMinutes(totalMinutes)}</p>
          <details>
            <summary>Hourly breakdown</summary>
            <ul>
              {chartData.filter(d => d.total_minutes > 0).map(d => (
                <li key={d.hour}>
                  {formatHourRange(d.hour)}: {formatMinutes(d.total_minutes)}
                </li>
              ))}
            </ul>
          </details>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              interval={2} // 3시간 간격으로 표시
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
              dataKey="total_minutes"
              stroke={chartColor}
              strokeWidth={2}
              fill="url(#hourlyGradient)"
              dot={(props) => {
                const { cx, cy, payload, index } = props
                if (cx === undefined || cy === undefined || !payload) {
                  return <circle key={`dot-empty-${index}`} cx={0} cy={0} r={0} fill="transparent" />
                }
                const isPeak = (payload as ChartDataPoint).isPeak
                if (!isPeak) return <circle key={`dot-${index}`} cx={0} cy={0} r={0} fill="transparent" />
                return (
                  <circle
                    key={`dot-peak-${index}`}
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={peakColor}
                    stroke="var(--background)"
                    strokeWidth={2}
                  />
                )
              }}
              activeDot={{ r: 5, fill: chartColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
