"use client"

import { useEffect, useState, useMemo } from "react"

import { getAllHistory, type HistoryRecord } from "@/lib/storage/idb"
import { useUser } from "@/hooks/use-user"
import { useCurrentWeekStats, type DayRecord } from "@/lib/queries/stats-queries"
import { formatDate, getMonday } from "@/lib/date-utils"

export interface WeeklyStatsData {
  date: string // YYYY-MM-DD
  dayOfWeek: number // 0 = Sunday, 1 = Monday, ...
  dayName: string // Mon, Tue, ...
  totalMinutes: number
  totalSessions: number
  isToday: boolean
}

interface UseWeeklyStatsReturn {
  data: WeeklyStatsData[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * 이번 주 (월요일 ~ 일요일) 통계 데이터를 조회하는 훅
 * - 로그인: Supabase 데이터 사용
 * - 비로그인: IndexedDB 데이터 사용
 */
export function useWeeklyStats(): UseWeeklyStatsReturn {
  const { user } = useUser()

  // Supabase 쿼리 (로그인 시에만 활성화)
  const {
    data: supabaseData,
    isLoading: supabaseLoading,
    error: supabaseError,
    refetch: supabaseRefetch,
  } = useCurrentWeekStats(user?.id ?? null)

  // 비로그인: IndexedDB 상태
  const [localData, setLocalData] = useState<WeeklyStatsData[]>([])
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
        const todayStr = formatDate(today)
        const monday = getMonday(today)

        // 이번 주 7일 날짜 생성 (월~일)
        const weekDates: string[] = []
        for (let i = 0; i < 7; i++) {
          const d = new Date(monday)
          d.setDate(monday.getDate() + i)
          weekDates.push(formatDate(d))
        }

        const history = await getAllHistory()
        const historyMap = new Map<string, HistoryRecord>()
        for (const record of history) {
          historyMap.set(record.date, record)
        }

        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        const weeklyData: WeeklyStatsData[] = weekDates.map((date, index) => {
          const record = historyMap.get(date)
          return {
            date,
            dayOfWeek: (index + 1) % 7, // 월=1, 화=2, ..., 일=0
            dayName: dayNames[index],
            totalMinutes: record?.totalMinutes ?? 0,
            totalSessions: record?.totalSessions ?? 0,
            isToday: date === todayStr,
          }
        })

        setLocalData(weeklyData)
      } catch (err) {
        setLocalError(err instanceof Error ? err : new Error("Failed to fetch weekly stats"))
      } finally {
        setLocalLoading(false)
      }
    }

    fetchLocalData()
  }, [user, refetchTrigger])

  // Supabase 데이터를 WeeklyStatsData[]로 변환
  const transformedSupabaseData = useMemo<WeeklyStatsData[]>(() => {
    if (!user || !supabaseData) return []

    const today = new Date()
    const todayStr = formatDate(today)
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    return supabaseData.map((record: DayRecord, index: number) => ({
      date: record.date,
      dayOfWeek: (index + 1) % 7, // 월=1, 화=2, ..., 일=0
      dayName: dayNames[index],
      totalMinutes: record.totalMinutes,
      totalSessions: record.totalSessions,
      isToday: record.date === todayStr,
    }))
  }, [user, supabaseData])

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
    refetch: () => setRefetchTrigger((prev) => prev + 1),
  }
}

