"use client"

import { useEffect, useState, useCallback } from "react"

import { getDailyStats, getHistoryByDate, type DailyStats } from "@/lib/storage/idb"

export interface TodayStatsData {
  date: string
  totalMinutes: number
  totalSessions: number
  // Computed fields
  formattedTime: string
  goalProgress: number // percentage (0-100)
}

interface UseTodayStatsReturn {
  data: TodayStatsData | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Format today's date as YYYY-MM-DD
 */
function getTodayDateStr(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * Format minutes to "Xh Ym" or "Xm"
 */
function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${mins}m`
  }
}

/**
 * Hook to fetch today's statistics
 */
export function useTodayStats(dailyGoalMinutes = 120): UseTodayStatsReturn {
  const [data, setData] = useState<TodayStatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const refetch = useCallback(() => setRefetchTrigger((prev) => prev + 1), [])

  useEffect(() => {
    async function fetchTodayStats() {
      setIsLoading(true)
      setError(null)

      try {
        const todayStr = getTodayDateStr()

        // Try daily_stats first (current session data)
        let stats: DailyStats | null = await getDailyStats(todayStr)

        // Fallback to history if daily_stats is empty
        if (!stats || (stats.totalMinutes === 0 && stats.totalSessions === 0)) {
          const historyRecord = await getHistoryByDate(todayStr)
          if (historyRecord) {
            stats = {
              date: historyRecord.date,
              totalMinutes: historyRecord.totalMinutes,
              totalSessions: historyRecord.totalSessions,
            }
          }
        }

        const totalMinutes = stats?.totalMinutes ?? 0
        const totalSessions = stats?.totalSessions ?? 0

        const todayData: TodayStatsData = {
          date: todayStr,
          totalMinutes,
          totalSessions,
          formattedTime: formatMinutes(totalMinutes),
          goalProgress: Math.min(100, Math.round((totalMinutes / dailyGoalMinutes) * 100)),
        }

        setData(todayData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch today stats"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodayStats()
  }, [refetchTrigger, dailyGoalMinutes])

  return { data, isLoading, error, refetch }
}
