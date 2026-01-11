/**
 * 날짜 관련 공통 유틸리티
 * - 여러 통계 hooks와 Supabase 모듈에서 사용
 */

/**
 * Date를 YYYY-MM-DD 형식 문자열로 변환
 * 타임존 문제 방지를 위해 toISOString 대신 로컬 날짜 사용
 */
export function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * 주어진 날짜가 속한 주의 월요일을 반환 (ISO-8601)
 */
export function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  // 일요일(0)이면 -6, 월요일(1)이면 0, 화요일(2)이면 -1, ...
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * 주어진 월요일부터 7일(월~일)의 날짜 배열 반환
 */
export function getWeekDates(monday: Date): string[] {
  const dates: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    dates.push(formatDate(d))
  }
  return dates
}

/**
 * 분(minutes)을 "Xh Ym" 또는 "Xm" 형식으로 변환
 */
export function formatMinutes(minutes: number): string {
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
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function getTodayDateStr(): string {
  return formatDate(new Date())
}
