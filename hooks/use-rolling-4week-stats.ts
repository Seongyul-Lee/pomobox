"use client"

import { useEffect, useState } from "react"

import { getAllHistory, type HistoryRecord } from "@/lib/storage/idb"

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
 * ISO-8601 준수: 월요일 시작
 */
export function useRolling4WeekStats(): UseRolling4WeekStatsReturn {
  const [data, setData] = useState<RollingWeekData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const refetch = () => setRefetchTrigger((prev) => prev + 1)

  useEffect(() => {
    async function fetchRolling4WeekStats() {
      setIsLoading(true)
      setError(null)

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

        // IndexedDB에서 전체 히스토리 조회
        const history = await getAllHistory()

        // 날짜별 Map 생성
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

        setData(weeks)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch rolling 4-week stats"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchRolling4WeekStats()
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
 * 주어진 날짜가 속한 주의 월요일을 반환 (ISO-8601)
 */
function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  // 일요일(0)이면 -6, 월요일(1)이면 0, 화요일(2)이면 -1, ...
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}
