import { createClient } from "./client"

/**
 * 로컬 시간 기준 날짜 (YYYY-MM-DD)
 * 타임존 문제 방지를 위해 toISOString 대신 로컬 날짜 사용
 */
function getLocalDate(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export interface FocusSession {
  id?: string
  user_id: string
  duration_minutes: number
  session_type: "focus" | "break" | "long_break"
  completed_at: string
}

export interface DailyStats {
  id?: string
  user_id: string
  date: string
  total_sessions: number
  total_minutes: number
  goal_achieved: boolean
}

/**
 * Focus 세션 완료 시 저장
 */
export async function saveSession(
  userId: string,
  durationMinutes: number,
  sessionType: "focus" | "break" | "long_break" = "focus"
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("focus_sessions")
    .insert({
      user_id: userId,
      duration_minutes: durationMinutes,
      session_type: sessionType,
      completed_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    console.error("Failed to save session:", error)
    throw error
  }

  return data
}

/**
 * 일일 통계 업데이트 - 세션 카운트만 증가 (분은 incrementDailyMinutes에서 처리)
 * @param userId - 사용자 ID
 * @param dailyGoalMinutes - 일일 목표 (goal_achieved 계산용)
 */
export async function updateDailyStats(
  userId: string,
  dailyGoalMinutes: number = 120
) {
  const supabase = createClient()
  const today = getLocalDate() // YYYY-MM-DD

  // 먼저 오늘 통계 조회
  const { data: existing } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle()

  const newTotalSessions = (existing?.total_sessions || 0) + 1
  // 분은 이미 incrementDailyMinutes에서 저장됨 - 여기서는 기존 값 유지
  const currentMinutes = existing?.total_minutes || 0
  const goalAchieved = currentMinutes >= dailyGoalMinutes

  // upsert 데이터 준비 (기존 레코드가 있으면 id 포함하여 update)
  const upsertData: Record<string, unknown> = {
    user_id: userId,
    date: today,
    total_sessions: newTotalSessions,
    total_minutes: currentMinutes,
    goal_achieved: goalAchieved,
  }
  if (existing?.id) {
    upsertData.id = existing.id
  }

  const { data, error } = await supabase
    .from("daily_stats")
    .upsert(upsertData)
    .select()

  if (error) {
    console.error("Failed to update daily stats:", error, { userId, existing })
    throw error
  }

  return data
}

/**
 * 오늘 통계 조회
 */
export async function getTodayStats(userId: string): Promise<DailyStats | null> {
  const supabase = createClient()
  const today = getLocalDate()

  const { data, error } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle()

  if (error) {
    console.error("Failed to get today stats:", error)
    throw error
  }

  return data
}

/**
 * 주간 통계 조회 (최근 7일)
 */
export async function getWeeklyStats(userId: string): Promise<DailyStats[]> {
  const supabase = createClient()
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weekAgoStr = getLocalDate(weekAgo)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .gte("date", weekAgoStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get weekly stats:", error)
    throw error
  }

  return data || []
}

/**
 * 1분 단위 증분 저장 (세션 카운트는 증가 안함)
 * - Focus 세션 중 1분마다 호출
 */
export async function incrementDailyMinutes(
  userId: string,
  minutes: number = 1,
  dailyGoalMinutes: number = 120
) {
  const supabase = createClient()
  const today = getLocalDate()

  // 먼저 오늘 통계 조회
  const { data: existing } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle()

  // 시간만 증가, 세션 카운트는 유지
  const newTotalMinutes = (existing?.total_minutes || 0) + minutes
  const goalAchieved = newTotalMinutes >= dailyGoalMinutes

  // upsert 데이터 준비 (기존 레코드가 있으면 id 포함하여 update)
  const upsertData: Record<string, unknown> = {
    user_id: userId,
    date: today,
    total_sessions: existing?.total_sessions || 0, // 세션 카운트 유지
    total_minutes: newTotalMinutes,
    goal_achieved: goalAchieved,
  }
  if (existing?.id) {
    upsertData.id = existing.id
  }

  const { data, error } = await supabase
    .from("daily_stats")
    .upsert(upsertData)
    .select()

  if (error) {
    console.error("Failed to increment daily minutes:", error, { userId, minutes, existing })
    throw error
  }

  return data
}

/**
 * 세션 완료 시 호출 (focus_sessions 저장 + 세션 카운트 증가)
 * @param userId - 사용자 ID
 * @param durationMinutes - 세션 집중 시간 (focus_sessions 테이블용)
 * @param dailyGoalMinutes - 일일 목표 (goal_achieved 계산용)
 */
export async function recordSessionComplete(
  userId: string,
  durationMinutes: number,
  dailyGoalMinutes: number = 120
) {
  try {
    // focus_sessions에 실제 집중 시간 저장 (시간대별 분포 차트용)
    await saveSession(userId, durationMinutes, "focus")
    // daily_stats 세션 카운트만 증가 (분은 incrementDailyMinutes에서 처리)
    await updateDailyStats(userId, dailyGoalMinutes)
  } catch (error) {
    console.error("Failed to record session:", error)
    // 에러가 발생해도 로컬 상태는 유지됨
  }
}

// ============================================
// 대시보드용 조회 함수
// ============================================

export interface DayRecord {
  date: string
  totalMinutes: number
  totalSessions: number
}

/**
 * 최근 N일 데이터 조회 (빈 날짜는 0으로 채움)
 */
export async function getRecentDaysStats(userId: string, days: number): Promise<DayRecord[]> {
  const supabase = createClient()
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - days + 1)
  const startDateStr = getLocalDate(startDate)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .gte("date", startDateStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get recent days stats:", error)
    return []
  }

  // 빈 날짜 채우기
  const result: DayRecord[] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = getLocalDate(date)

    const existing = data?.find((d) => d.date === dateStr)
    result.push({
      date: dateStr,
      totalMinutes: existing?.total_minutes || 0,
      totalSessions: existing?.total_sessions || 0,
    })
  }

  return result
}

/**
 * 지난주 데이터 조회 (7일 전 ~ 13일 전)
 */
export async function getLastWeekStats(userId: string): Promise<DayRecord[]> {
  const supabase = createClient()
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 13)
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() - 7)

  const startDateStr = getLocalDate(startDate)
  const endDateStr = getLocalDate(endDate)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .gte("date", startDateStr)
    .lte("date", endDateStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get last week stats:", error)
    return []
  }

  // 빈 날짜 채우기
  const result: DayRecord[] = []
  for (let i = 13; i >= 7; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = getLocalDate(date)

    const existing = data?.find((d) => d.date === dateStr)
    result.push({
      date: dateStr,
      totalMinutes: existing?.total_minutes || 0,
      totalSessions: existing?.total_sessions || 0,
    })
  }

  return result
}

/**
 * 이번 달 데이터 조회
 */
export async function getMonthlyStats(userId: string): Promise<DayRecord[]> {
  const supabase = createClient()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1)
  const firstDayStr = getLocalDate(firstDay)
  const todayStr = getLocalDate(now)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .gte("date", firstDayStr)
    .lte("date", todayStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get monthly stats:", error)
    return []
  }

  // 빈 날짜 채우기
  const result: DayRecord[] = []
  for (let d = new Date(firstDay); d <= now; d.setDate(d.getDate() + 1)) {
    const dateStr = getLocalDate(d)
    const existing = data?.find((r) => r.date === dateStr)
    result.push({
      date: dateStr,
      totalMinutes: existing?.total_minutes || 0,
      totalSessions: existing?.total_sessions || 0,
    })
  }

  return result
}

/**
 * 전월 데이터 조회
 */
export async function getPreviousMonthStats(userId: string): Promise<DayRecord[]> {
  const supabase = createClient()
  const now = new Date()
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
  const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const firstDayStr = getLocalDate(firstDay)
  const lastDayStr = getLocalDate(lastDay)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .gte("date", firstDayStr)
    .lte("date", lastDayStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get previous month stats:", error)
    return []
  }

  // 빈 날짜 채우기
  const result: DayRecord[] = []
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const dateStr = getLocalDate(d)
    const existing = data?.find((r) => r.date === dateStr)
    result.push({
      date: dateStr,
      totalMinutes: existing?.total_minutes || 0,
      totalSessions: existing?.total_sessions || 0,
    })
  }

  return result
}

// ============================================
// 시간대별 집중도 분석 (RPC)
// ============================================

export interface HourlyDistribution {
  hour: number // 0-23
  total_minutes: number
}

/**
 * 시간대별 집중도 조회 (Supabase RPC)
 * - DB에서 시간대별 집계 후 결과만 반환
 * - 타임존 자동 감지 (Intl API)
 */
export async function getFocusDistributionByHour(
  userId: string,
  startDate: string, // YYYY-MM-DD
  endDate: string,
  userTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): Promise<HourlyDistribution[]> {
  const supabase = createClient()

  const { data, error } = await supabase.rpc("get_focus_distribution_by_hour", {
    p_user_id: userId,
    p_start_date: startDate,
    p_end_date: endDate,
    p_user_timezone: userTimezone,
  })

  if (error) {
    console.error("Failed to get focus distribution:", error)
    throw error
  }

  return data || []
}

// ============================================
// 주간 통계 (월요일 기준)
// ============================================

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

/**
 * 이번 주 통계 조회 (월요일 ~ 일요일)
 */
export async function getCurrentWeekStats(userId: string): Promise<DayRecord[]> {
  const supabase = createClient()
  const today = new Date()
  const monday = getMonday(today)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const mondayStr = getLocalDate(monday)
  const sundayStr = getLocalDate(sunday)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .gte("date", mondayStr)
    .lte("date", sundayStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get current week stats:", error)
    return []
  }

  // 빈 날짜 채우기 (월~일 7일)
  const result: DayRecord[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    const dateStr = getLocalDate(date)

    const existing = data?.find((d) => d.date === dateStr)
    result.push({
      date: dateStr,
      totalMinutes: existing?.total_minutes || 0,
      totalSessions: existing?.total_sessions || 0,
    })
  }

  return result
}

/**
 * 지난주 통계 조회 (월요일 ~ 일요일)
 */
export async function getLastWeekStatsMonday(userId: string): Promise<DayRecord[]> {
  const supabase = createClient()
  const today = new Date()
  const thisMonday = getMonday(today)
  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)
  const lastSunday = new Date(lastMonday)
  lastSunday.setDate(lastMonday.getDate() + 6)

  const lastMondayStr = getLocalDate(lastMonday)
  const lastSundayStr = getLocalDate(lastSunday)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .gte("date", lastMondayStr)
    .lte("date", lastSundayStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get last week stats:", error)
    return []
  }

  // 빈 날짜 채우기 (월~일 7일)
  const result: DayRecord[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(lastMonday)
    date.setDate(lastMonday.getDate() + i)
    const dateStr = getLocalDate(date)

    const existing = data?.find((d) => d.date === dateStr)
    result.push({
      date: dateStr,
      totalMinutes: existing?.total_minutes || 0,
      totalSessions: existing?.total_sessions || 0,
    })
  }

  return result
}

export interface Rolling4WeekData {
  weekLabel: string // "This Week", "W-1", "W-2", "W-3"
  weekIndex: number // 0 = This Week, 1 = W-1, ...
  startDate: string // YYYY-MM-DD (Monday)
  endDate: string // YYYY-MM-DD (Sunday)
  totalMinutes: number
  totalSessions: number
  isCurrentWeek: boolean
}

/**
 * 최근 4주간 통계 조회 (월요일 기준)
 */
export async function getRolling4WeekStats(userId: string): Promise<Rolling4WeekData[]> {
  const supabase = createClient()
  const today = new Date()
  const thisMonday = getMonday(today)

  // 4주 전 월요일부터 이번 주 일요일까지 범위
  const startMonday = new Date(thisMonday)
  startMonday.setDate(thisMonday.getDate() - 21) // 3주 전 월요일
  const endSunday = new Date(thisMonday)
  endSunday.setDate(thisMonday.getDate() + 6)

  const startStr = getLocalDate(startMonday)
  const endStr = getLocalDate(endSunday)

  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .gte("date", startStr)
    .lte("date", endStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Failed to get rolling 4-week stats:", error)
    return []
  }

  // 날짜별 Map 생성
  const dataMap = new Map<string, { total_minutes: number; total_sessions: number }>()
  for (const record of data || []) {
    dataMap.set(record.date, {
      total_minutes: record.total_minutes,
      total_sessions: record.total_sessions,
    })
  }

  // 4주간의 주차 정보 생성 (W-3, W-2, W-1, This Week 순서)
  const weeks: Rolling4WeekData[] = []

  for (let i = 3; i >= 0; i--) {
    const weekMonday = new Date(thisMonday)
    weekMonday.setDate(thisMonday.getDate() - i * 7)
    const weekSunday = new Date(weekMonday)
    weekSunday.setDate(weekMonday.getDate() + 6)

    let totalMinutes = 0
    let totalSessions = 0

    // 해당 주의 7일 데이터 집계
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const currentDate = new Date(weekMonday)
      currentDate.setDate(weekMonday.getDate() + dayOffset)
      const dateStr = getLocalDate(currentDate)

      const record = dataMap.get(dateStr)
      if (record) {
        totalMinutes += record.total_minutes
        totalSessions += record.total_sessions
      }
    }

    weeks.push({
      weekLabel: i === 0 ? "This Week" : `W-${i}`,
      weekIndex: i,
      startDate: getLocalDate(weekMonday),
      endDate: getLocalDate(weekSunday),
      totalMinutes,
      totalSessions,
      isCurrentWeek: i === 0,
    })
  }

  return weeks
}

/**
 * 전체 통계 (연속 출석 일수 포함)
 */
export async function getTotalStatsFromDB(userId: string): Promise<{
  totalMinutes: number
  totalSessions: number
  totalDays: number
  streakDays: number
}> {
  const supabase = createClient()

  // 전체 통계 조회
  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, total_minutes, total_sessions")
    .eq("user_id", userId)
    .order("date", { ascending: false })

  if (error) {
    console.error("Failed to get total stats:", error)
    return { totalMinutes: 0, totalSessions: 0, totalDays: 0, streakDays: 0 }
  }

  const totalMinutes = data?.reduce((sum, r) => sum + (r.total_minutes || 0), 0) || 0
  const totalSessions = data?.reduce((sum, r) => sum + (r.total_sessions || 0), 0) || 0
  const totalDays = data?.filter((r) => r.total_sessions > 0).length || 0

  // 연속 일수 계산
  let streakDays = 0
  const today = new Date()
  const dates = new Set(data?.map((r) => r.date) || [])

  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = getLocalDate(date)

    if (dates.has(dateStr)) {
      streakDays++
    } else if (i > 0) {
      break
    }
  }

  return { totalMinutes, totalSessions, totalDays, streakDays }
}
