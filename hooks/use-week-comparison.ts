"use client"

import { useEffect, useState } from "react"

import { getAllHistory, type HistoryRecord } from "@/lib/storage/idb"

export interface WeekComparisonData {
  thisWeek: {
    totalMinutes: number
    totalSessions: number
    avgMinutesPerDay: number
  }
  lastWeek: {
    totalMinutes: number
    totalSessions: number
    avgMinutesPerDay: number
  }
  comparison: {
    totalMinutes: {
      diff: number
      percent: number
      trend: "up" | "down" | "same"
    }
    totalSessions: {
      diff: number
      percent: number
      trend: "up" | "down" | "same"
    }
    avgMinutesPerDay: {
      diff: number
      percent: number
      trend: "up" | "down" | "same"
    }
  }
}

interface UseWeekComparisonReturn {
  data: WeekComparisonData | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * 이번 주와 지난주 통계를 비교하는 훅
 * - 이번 주: 월요일 ~ 오늘
 * - 지난주: 7일 전 ~ 13일 전
 */
export function useWeekComparison(): UseWeekComparisonReturn {
  const [data, setData] = useState<WeekComparisonData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const refetch = () => setRefetchTrigger((prev) => prev + 1)

  useEffect(() => {
    async function fetchComparisonStats() {
      setIsLoading(true)
      setError(null)

      try {
        const today = new Date()

        // 이번 주 월요일
        const thisMonday = getMonday(today)

        // 지난주 월요일 (이번 주 월요일 - 7일)
        const lastMonday = new Date(thisMonday)
        lastMonday.setDate(thisMonday.getDate() - 7)

        // 이번 주 날짜 목록 (월요일 ~ 일요일)
        const thisWeekDates = getWeekDates(thisMonday)

        // 지난주 날짜 목록 (월요일 ~ 일요일)
        const lastWeekDates = getWeekDates(lastMonday)

        // IndexedDB에서 전체 히스토리 조회
        const history = await getAllHistory()

        // 날짜별 Map 생성
        const historyMap = new Map<string, HistoryRecord>()
        for (const record of history) {
          historyMap.set(record.date, record)
        }

        // 이번 주 통계 계산
        const thisWeekStats = calculateWeekStats(thisWeekDates, historyMap)

        // 지난주 통계 계산
        const lastWeekStats = calculateWeekStats(lastWeekDates, historyMap)

        // 비교 계산
        const comparison = {
          totalMinutes: calculateComparison(
            thisWeekStats.totalMinutes,
            lastWeekStats.totalMinutes
          ),
          totalSessions: calculateComparison(
            thisWeekStats.totalSessions,
            lastWeekStats.totalSessions
          ),
          avgMinutesPerDay: calculateComparison(
            thisWeekStats.avgMinutesPerDay,
            lastWeekStats.avgMinutesPerDay
          ),
        }

        setData({
          thisWeek: thisWeekStats,
          lastWeek: lastWeekStats,
          comparison,
        })
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch comparison stats")
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchComparisonStats()
  }, [refetchTrigger])

  return { data, isLoading, error, refetch }
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 */
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * 주어진 날짜가 속한 주의 월요일을 반환
 */
function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * 주어진 월요일부터 7일간의 날짜 목록 반환
 */
function getWeekDates(monday: Date): string[] {
  const dates: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    dates.push(formatDate(d))
  }
  return dates
}

/**
 * 주간 통계 계산
 */
function calculateWeekStats(
  dates: string[],
  historyMap: Map<string, HistoryRecord>
): {
  totalMinutes: number
  totalSessions: number
  avgMinutesPerDay: number
} {
  let totalMinutes = 0
  let totalSessions = 0

  for (const date of dates) {
    const record = historyMap.get(date)
    if (record) {
      totalMinutes += record.totalMinutes
      totalSessions += record.totalSessions
    }
  }

  return {
    totalMinutes,
    totalSessions,
    avgMinutesPerDay: Math.round(totalMinutes / 7),
  }
}

/**
 * 증감 비교 계산
 */
function calculateComparison(
  current: number,
  previous: number
): {
  diff: number
  percent: number
  trend: "up" | "down" | "same"
} {
  const diff = current - previous

  let percent = 0
  if (previous > 0) {
    percent = Math.round((diff / previous) * 100)
  } else if (current > 0) {
    percent = 100
  }

  let trend: "up" | "down" | "same" = "same"
  if (diff > 0) {
    trend = "up"
  } else if (diff < 0) {
    trend = "down"
  }

  return { diff, percent, trend }
}
