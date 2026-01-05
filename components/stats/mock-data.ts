/**
 * 비로그인 사용자에게 보여줄 가상 데이터
 * 로그인 후 어떤 데이터가 표시될지 미리보기 용도
 */

import type { WeeklyStatsData } from "@/hooks/use-weekly-stats"
import type { RollingWeekData } from "@/hooks/use-rolling-4week-stats"

// 요일별 가상 데이터 (Weekly Pattern)
export const MOCK_WEEKLY_DATA: WeeklyStatsData[] = (() => {
  const today = new Date()
  const currentDayOfWeek = today.getDay() // 0 = Sunday

  return [
    { dayName: "SUN", date: "", dayOfWeek: 0, totalMinutes: 85, totalSessions: 4, isToday: currentDayOfWeek === 0 },
    { dayName: "MON", date: "", dayOfWeek: 1, totalMinutes: 120, totalSessions: 5, isToday: currentDayOfWeek === 1 },
    { dayName: "TUE", date: "", dayOfWeek: 2, totalMinutes: 95, totalSessions: 4, isToday: currentDayOfWeek === 2 },
    { dayName: "WED", date: "", dayOfWeek: 3, totalMinutes: 145, totalSessions: 6, isToday: currentDayOfWeek === 3 },
    { dayName: "THU", date: "", dayOfWeek: 4, totalMinutes: 110, totalSessions: 5, isToday: currentDayOfWeek === 4 },
    { dayName: "FRI", date: "", dayOfWeek: 5, totalMinutes: 75, totalSessions: 3, isToday: currentDayOfWeek === 5 },
    { dayName: "SAT", date: "", dayOfWeek: 6, totalMinutes: 60, totalSessions: 3, isToday: currentDayOfWeek === 6 },
  ]
})()

// 4주간 트렌드 가상 데이터 (Monthly Trend)
export const MOCK_ROLLING_4WEEK_DATA: RollingWeekData[] = [
  {
    weekLabel: "W-3",
    weekIndex: 3,
    startDate: "",
    endDate: "",
    totalMinutes: 420,
    totalSessions: 18,
    isCurrentWeek: false,
  },
  {
    weekLabel: "W-2",
    weekIndex: 2,
    startDate: "",
    endDate: "",
    totalMinutes: 540,
    totalSessions: 22,
    isCurrentWeek: false,
  },
  {
    weekLabel: "W-1",
    weekIndex: 1,
    startDate: "",
    endDate: "",
    totalMinutes: 480,
    totalSessions: 20,
    isCurrentWeek: false,
  },
  {
    weekLabel: "This Week",
    weekIndex: 0,
    startDate: "",
    endDate: "",
    totalMinutes: 620,
    totalSessions: 26,
    isCurrentWeek: true,
  },
]

// Growth Analysis 가상 데이터
export const MOCK_WEEK_COMPARISON = {
  thisWeek: {
    totalMinutes: 620,
    totalSessions: 26,
    avgMinutesPerDay: 89,
  },
  lastWeek: {
    totalMinutes: 480,
    totalSessions: 20,
    avgMinutesPerDay: 69,
  },
  comparison: {
    totalMinutes: {
      diff: 140,
      percent: 29,
      trend: "up" as const,
    },
    totalSessions: {
      diff: 6,
      percent: 30,
      trend: "up" as const,
    },
    avgMinutesPerDay: {
      diff: 20,
      percent: 29,
      trend: "up" as const,
    },
  },
}

// Focus Hours 가상 데이터 (시간대별 분포)
export interface MockHourlyData {
  hour: number
  total_minutes: number
  isPeak: boolean
  label: string
}

export const MOCK_HOURLY_DATA: MockHourlyData[] = Array.from({ length: 24 }, (_, hour) => {
  // 집중 시간 패턴: 오전 9-12시, 오후 2-5시에 높음
  let minutes = 0

  if (hour >= 9 && hour <= 11) {
    minutes = 80 + Math.floor(Math.random() * 40) // 80-120분
  } else if (hour >= 14 && hour <= 17) {
    minutes = 90 + Math.floor(Math.random() * 50) // 90-140분
  } else if (hour >= 7 && hour <= 8) {
    minutes = 30 + Math.floor(Math.random() * 20) // 30-50분
  } else if (hour >= 19 && hour <= 21) {
    minutes = 40 + Math.floor(Math.random() * 30) // 40-70분
  } else if (hour >= 6 && hour <= 22) {
    minutes = Math.floor(Math.random() * 20) // 0-20분
  }

  return {
    hour,
    total_minutes: minutes,
    isPeak: false,
    label: String(hour).padStart(2, "0"),
  }
})

// 피크 시간 설정 (가장 높은 값)
const maxIdx = MOCK_HOURLY_DATA.reduce((maxI, item, i, arr) =>
  item.total_minutes > arr[maxI].total_minutes ? i : maxI, 0)
MOCK_HOURLY_DATA[maxIdx].isPeak = true
