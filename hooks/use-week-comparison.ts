"use client"

import { useEffect, useState, useMemo } from "react"

import { getAllHistory, type HistoryRecord } from "@/lib/storage/idb"
import { useUser } from "@/hooks/use-user"
import {
  useCurrentWeekStats,
  useLastWeekStatsMonday,
  type DayRecord,
} from "@/lib/queries/stats-queries"

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
 * - 로그인: Supabase 데이터 사용
 * - 비로그인: IndexedDB 데이터 사용
 */
export function useWeekComparison(): UseWeekComparisonReturn {
  const { user } = useUser()

  // Supabase 쿼리 (로그인 시에만 활성화)
  const {
    data: supabaseThisWeek,
    isLoading: isLoadingThisWeek,
    error: errorThisWeek,
    refetch: refetchThisWeek,
  } = useCurrentWeekStats(user?.id ?? null)

  const {
    data: supabaseLastWeek,
    isLoading: isLoadingLastWeek,
    error: errorLastWeek,
    refetch: refetchLastWeek,
  } = useLastWeekStatsMonday(user?.id ?? null)

  // 비로그인: IndexedDB 상태
  const [localData, setLocalData] = useState<WeekComparisonData | null>(null)
  const [localLoading, setLocalLoading] = useState(false)
  const [localError, setLocalError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  // 비로그인: IndexedDB에서 데이터 조회
  useEffect(() => {
    if (user) return // 로그인 상태면 스킵

    async function fetchLocalData() {
      setLocalLoading(true)
      setLocalError(null)

      try {
        const today = new Date()
        const thisMonday = getMonday(today)
        const lastMonday = new Date(thisMonday)
        lastMonday.setDate(thisMonday.getDate() - 7)

        const thisWeekDates = getWeekDates(thisMonday)
        const lastWeekDates = getWeekDates(lastMonday)

        const history = await getAllHistory()
        const historyMap = new Map<string, HistoryRecord>()
        for (const record of history) {
          historyMap.set(record.date, record)
        }

        const thisWeekStats = calculateWeekStats(thisWeekDates, historyMap)
        const lastWeekStats = calculateWeekStats(lastWeekDates, historyMap)

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

        setLocalData({
          thisWeek: thisWeekStats,
          lastWeek: lastWeekStats,
          comparison,
        })
      } catch (err) {
        setLocalError(
          err instanceof Error ? err : new Error("Failed to fetch comparison stats")
        )
      } finally {
        setLocalLoading(false)
      }
    }

    fetchLocalData()
  }, [user, refetchTrigger])

  // Supabase 데이터를 WeekComparisonData로 변환
  const supabaseData = useMemo<WeekComparisonData | null>(() => {
    if (!user || !supabaseThisWeek || !supabaseLastWeek) return null

    const thisWeekStats = calculateWeekStatsFromDayRecords(supabaseThisWeek)
    const lastWeekStats = calculateWeekStatsFromDayRecords(supabaseLastWeek)

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

    return {
      thisWeek: thisWeekStats,
      lastWeek: lastWeekStats,
      comparison,
    }
  }, [user, supabaseThisWeek, supabaseLastWeek])

  // 로그인 여부에 따라 반환값 결정
  if (user) {
    return {
      data: supabaseData,
      isLoading: isLoadingThisWeek || isLoadingLastWeek,
      error: errorThisWeek || errorLastWeek || null,
      refetch: () => {
        refetchThisWeek()
        refetchLastWeek()
      },
    }
  }

  return {
    data: localData,
    isLoading: localLoading,
    error: localError,
    refetch: () => setRefetchTrigger((prev) => prev + 1),
  }
}

// ============================================
// 헬퍼 함수
// ============================================

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function getWeekDates(monday: Date): string[] {
  const dates: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    dates.push(formatDate(d))
  }
  return dates
}

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

function calculateWeekStatsFromDayRecords(
  records: DayRecord[]
): {
  totalMinutes: number
  totalSessions: number
  avgMinutesPerDay: number
} {
  let totalMinutes = 0
  let totalSessions = 0

  for (const record of records) {
    totalMinutes += record.totalMinutes
    totalSessions += record.totalSessions
  }

  return {
    totalMinutes,
    totalSessions,
    avgMinutesPerDay: Math.round(totalMinutes / 7),
  }
}

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
