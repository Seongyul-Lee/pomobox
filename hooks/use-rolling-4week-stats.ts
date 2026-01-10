"use client"

import { useEffect, useState } from "react"

import { getAllHistory, type HistoryRecord } from "@/lib/storage/idb"
import { useUser } from "@/hooks/use-user"
import {
  useRolling4WeekStatsQuery,
  type Rolling4WeekData,
} from "@/lib/queries/stats-queries"

export interface RollingWeekData {
  weekLabel: string // "This Week", "W-1", "W-2", "W-3"
  weekIndex: number // 0 = This Week, 1 = W-1, ...
  startDate: string // YYYY-MM-DD (Monday)
  endDate: string // YYYY-MM-DD (Sunday)
  totalMinutes: number
  totalSessions: number
  isCurrentWeek: boolean
}

interface UseRolling4WeekStatsReturn {
  data: RollingWeekData[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * 최근 4주간 (월요일 기준) 통계 데이터를 조회하는 훅
 * - 로그인: Supabase 데이터 사용
 * - 비로그인: IndexedDB 데이터 사용
 * ISO-8601 준수: 월요일 시작
 */
export function useRolling4WeekStats(): UseRolling4WeekStatsReturn {
  const { user } = useUser()

  // Supabase 쿼리 (로그인 시에만 활성화)
  const {
    data: supabaseData,
    isLoading: supabaseLoading,
    error: supabaseError,
    refetch: supabaseRefetch,
  } = useRolling4WeekStatsQuery(user?.id ?? null)

  // 비로그인: IndexedDB 상태
  const [localData, setLocalData] = useState<RollingWeekData[]>([])
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
        const thisWeekMonday = getMonday(today)

        // 4주간의 주차 정보 생성 (W-3, W-2, W-1, This Week 순서)
        const weeks: RollingWeekData[] = []

        for (let i = 3; i >= 0; i--) {
          const weekMonday = new Date(thisWeekMonday)
          weekMonday.setDate(thisWeekMonday.getDate() - i * 7)

          const weekSunday = new Date(weekMonday)
          weekSunday.setDate(weekMonday.getDate() + 6)

          weeks.push({
            weekLabel: i === 0 ? "This Week" : `W-${i}`,
            weekIndex: i,
            startDate: formatDate(weekMonday),
            endDate: formatDate(weekSunday),
            totalMinutes: 0,
            totalSessions: 0,
            isCurrentWeek: i === 0,
          })
        }

        const history = await getAllHistory()
        const historyMap = new Map<string, HistoryRecord>()
        for (const record of history) {
          historyMap.set(record.date, record)
        }

        // 각 주차별 데이터 집계
        for (const week of weeks) {
          const weekMonday = new Date(week.startDate)

          for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            const currentDate = new Date(weekMonday)
            currentDate.setDate(weekMonday.getDate() + dayOffset)
            const dateStr = formatDate(currentDate)

            const record = historyMap.get(dateStr)
            if (record) {
              week.totalMinutes += record.totalMinutes
              week.totalSessions += record.totalSessions
            }
          }
        }

        setLocalData(weeks)
      } catch (err) {
        setLocalError(err instanceof Error ? err : new Error("Failed to fetch rolling 4-week stats"))
      } finally {
        setLocalLoading(false)
      }
    }

    fetchLocalData()
  }, [user, refetchTrigger])

  // Supabase 데이터를 RollingWeekData[]로 변환 (타입 호환)
  const transformedSupabaseData: RollingWeekData[] = supabaseData
    ? supabaseData.map((item: Rolling4WeekData) => ({
        weekLabel: item.weekLabel,
        weekIndex: item.weekIndex,
        startDate: item.startDate,
        endDate: item.endDate,
        totalMinutes: item.totalMinutes,
        totalSessions: item.totalSessions,
        isCurrentWeek: item.isCurrentWeek,
      }))
    : []

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
  // 일요일(0)이면 -6, 월요일(1)이면 0, 화요일(2)이면 -1, ...
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}
