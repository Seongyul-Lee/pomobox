"use client"

import { useEffect, useState } from "react"

import { getAllHistory, type HistoryRecord } from "@/lib/storage/idb"

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
 */
export function useWeeklyStats(): UseWeeklyStatsReturn {
  const [data, setData] = useState<WeeklyStatsData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const refetch = () => setRefetchTrigger((prev) => prev + 1)

  useEffect(() => {
    async function fetchWeeklyStats() {
      setIsLoading(true)
      setError(null)

      try {
        // 오늘 날짜
        const today = new Date()
        const todayStr = formatDate(today)

        // 이번 주 월요일 계산
        const monday = getMonday(today)

        // 이번 주 7일 날짜 생성 (월~일)
        const weekDates: string[] = []
        for (let i = 0; i < 7; i++) {
          const d = new Date(monday)
          d.setDate(monday.getDate() + i)
          weekDates.push(formatDate(d))
        }

        // IndexedDB에서 전체 히스토리 조회
        const history = await getAllHistory()

        // 날짜별 Map 생성
        const historyMap = new Map<string, HistoryRecord>()
        for (const record of history) {
          historyMap.set(record.date, record)
        }

        // 주간 데이터 생성
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

        setData(weeklyData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch weekly stats"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeeklyStats()
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
  // 일요일(0)이면 -6, 월요일(1)이면 0, 화요일(2)이면 -1, ...
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}
