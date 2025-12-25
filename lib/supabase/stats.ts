import { createClient } from "./client"

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
 * 일일 통계 업데이트 (upsert)
 */
export async function updateDailyStats(
  userId: string,
  durationMinutes: number,
  dailyGoalMinutes: number = 120
) {
  const supabase = createClient()
  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

  // 먼저 오늘 통계 조회
  const { data: existing } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .single()

  const newTotalSessions = (existing?.total_sessions || 0) + 1
  const newTotalMinutes = (existing?.total_minutes || 0) + durationMinutes
  const goalAchieved = newTotalMinutes >= dailyGoalMinutes

  const { data, error } = await supabase
    .from("daily_stats")
    .upsert({
      user_id: userId,
      date: today,
      total_sessions: newTotalSessions,
      total_minutes: newTotalMinutes,
      goal_achieved: goalAchieved,
    })
    .select()

  if (error) {
    console.error("Failed to update daily stats:", error)
    throw error
  }

  return data
}

/**
 * 오늘 통계 조회
 */
export async function getTodayStats(userId: string): Promise<DailyStats | null> {
  const supabase = createClient()
  const today = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned
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
  const weekAgoStr = weekAgo.toISOString().split("T")[0]

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
 * 세션 완료 시 호출 (저장 + 일일 통계 업데이트)
 */
export async function recordSessionComplete(
  userId: string,
  durationMinutes: number,
  dailyGoalMinutes: number = 120
) {
  try {
    await saveSession(userId, durationMinutes, "focus")
    await updateDailyStats(userId, durationMinutes, dailyGoalMinutes)
  } catch (error) {
    console.error("Failed to record session:", error)
    // 에러가 발생해도 로컬 상태는 유지됨
  }
}
