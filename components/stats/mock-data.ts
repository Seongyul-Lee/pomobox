/**
 * 비로그인 사용자에게 보여줄 가상 데이터
 * 로그인 후 어떤 데이터가 표시될지 미리보기 용도
 */

import type { WeeklyStatsData } from "@/hooks/use-weekly-stats"
import type { RollingWeekData } from "@/hooks/use-rolling-4week-stats"

// 요일별 가상 데이터 (Weekly Pattern)
// date 필드에 고유한 값을 사용하여 React key 중복 방지
export const MOCK_WEEKLY_DATA: WeeklyStatsData[] = (() => {
  const today = new Date()
  const currentDayOfWeek = today.getDay() // 0 = Sunday

  return [
    { dayName: "SUN", date: "mock-sun", dayOfWeek: 0, totalMinutes: 85, totalSessions: 4, isToday: currentDayOfWeek === 0 },
    { dayName: "MON", date: "mock-mon", dayOfWeek: 1, totalMinutes: 120, totalSessions: 5, isToday: currentDayOfWeek === 1 },
    { dayName: "TUE", date: "mock-tue", dayOfWeek: 2, totalMinutes: 95, totalSessions: 4, isToday: currentDayOfWeek === 2 },
    { dayName: "WED", date: "mock-wed", dayOfWeek: 3, totalMinutes: 145, totalSessions: 6, isToday: currentDayOfWeek === 3 },
    { dayName: "THU", date: "mock-thu", dayOfWeek: 4, totalMinutes: 110, totalSessions: 5, isToday: currentDayOfWeek === 4 },
    { dayName: "FRI", date: "mock-fri", dayOfWeek: 5, totalMinutes: 75, totalSessions: 3, isToday: currentDayOfWeek === 5 },
    { dayName: "SAT", date: "mock-sat", dayOfWeek: 6, totalMinutes: 60, totalSessions: 3, isToday: currentDayOfWeek === 6 },
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
// Math.random() 제거 - hydration mismatch 방지를 위해 고정값 사용
export interface MockHourlyData {
  hour: number
  total_minutes: number
  isPeak: boolean
  label: string
}

// 고정된 시간대별 분포 패턴 (오전 9-12시, 오후 2-5시에 높음)
const HOURLY_MINUTES = [
  0, 0, 0, 0, 0, 0,       // 00-05: 수면 시간
  5, 35, 45,              // 06-08: 아침
  95, 110, 85,            // 09-11: 오전 집중
  40, 25,                 // 12-13: 점심
  120, 130, 115, 100,     // 14-17: 오후 집중 (피크)
  55, 60, 50, 45,         // 18-21: 저녁
  15, 5                   // 22-23: 마무리
]

export const MOCK_HOURLY_DATA: MockHourlyData[] = HOURLY_MINUTES.map((minutes, hour) => ({
  hour,
  total_minutes: minutes,
  isPeak: hour === 15, // 15시가 피크
  label: String(hour).padStart(2, "0"),
}))
