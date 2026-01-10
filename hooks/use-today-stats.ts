"use client"

import { useEffect, useState, useCallback, useMemo } from "react"

import { getDailyStats, getHistoryByDate, type DailyStats } from "@/lib/storage/idb"
import { useUser } from "@/hooks/use-user"
import { useTodayStats as useTodayStatsQuery } from "@/lib/queries/stats-queries"

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
 * - 로그인: Supabase 데이터 사용
 * - 비로그인: IndexedDB 데이터 사용
 */
export function useTodayStats(dailyGoalMinutes = 120): UseTodayStatsReturn {
  const { user } = useUser()

  // Supabase 쿼리 (로그인 시에만 활성화)
  const {
    data: supabaseData,
    isLoading: supabaseLoading,
    error: supabaseError,
    refetch: supabaseRefetch,
  } = useTodayStatsQuery(user?.id ?? null)

  // 비로그인: IndexedDB 상태
  const [localData, setLocalData] = useState<TodayStatsData | null>(null)
  const [localLoading, setLocalLoading] = useState(false)
  const [localError, setLocalError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const localRefetch = useCallback(() => setRefetchTrigger((prev) => prev + 1), [])

  // 비로그인: IndexedDB에서 데이터 조회
  useEffect(() => {
    if (user) return // 로그인 상태면 스킵

    async function fetchLocalData() {
      setLocalLoading(true)
      setLocalError(null)

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

        setLocalData(todayData)
      } catch (err) {
        setLocalError(err instanceof Error ? err : new Error("Failed to fetch today stats"))
      } finally {
        setLocalLoading(false)
      }
    }

    fetchLocalData()
  }, [user, refetchTrigger, dailyGoalMinutes])

  // Supabase 데이터를 TodayStatsData로 변환
  const transformedSupabaseData = useMemo<TodayStatsData | null>(() => {
    if (!user) return null

    const todayStr = getTodayDateStr()
    const totalMinutes = supabaseData?.total_minutes ?? 0
    const totalSessions = supabaseData?.total_sessions ?? 0

    return {
      date: todayStr,
      totalMinutes,
      totalSessions,
      formattedTime: formatMinutes(totalMinutes),
      goalProgress: Math.min(100, Math.round((totalMinutes / dailyGoalMinutes) * 100)),
    }
  }, [user, supabaseData, dailyGoalMinutes])

  // 로그인 여부에 따라 반환값 결정
  if (user) {
    return {
      data: transformedSupabaseData,
      isLoading: supabaseLoading,
      error: supabaseError || null,
      refetch: supabaseRefetch,
    }
  }

  return {
    data: localData,
    isLoading: localLoading,
    error: localError,
    refetch: localRefetch,
  }
}
