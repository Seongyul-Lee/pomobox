import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * POST /api/sessions
 * Focus 세션 완료 시 저장 + 일일 통계 업데이트
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 요청 본문 파싱
    const body = await request.json()
    const { duration_minutes, session_type = "focus", daily_goal_minutes = 120 } = body

    // 유효성 검사
    if (typeof duration_minutes !== "number" || duration_minutes <= 0) {
      return NextResponse.json(
        { error: "duration_minutes must be a positive number" },
        { status: 400 }
      )
    }

    if (!["focus", "break", "long_break"].includes(session_type)) {
      return NextResponse.json(
        { error: "session_type must be 'focus', 'break', or 'long_break'" },
        { status: 400 }
      )
    }

    // 1. focus_sessions 테이블에 저장
    const { data: session, error: sessionError } = await supabase
      .from("focus_sessions")
      .insert({
        user_id: user.id,
        duration_minutes,
        session_type,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (sessionError) {
      console.error("Failed to save session:", sessionError)
      return NextResponse.json({ error: "Failed to save session" }, { status: 500 })
    }

    // 2. daily_stats 업데이트 (focus 세션만)
    if (session_type === "focus") {
      const today = getLocalDate()

      // 오늘 통계 조회
      const { data: existing } = await supabase
        .from("daily_stats")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single()

      const newTotalSessions = (existing?.total_sessions || 0) + 1
      const newTotalMinutes = (existing?.total_minutes || 0) + duration_minutes
      const goalAchieved = newTotalMinutes >= daily_goal_minutes

      const upsertData: Record<string, unknown> = {
        user_id: user.id,
        date: today,
        total_sessions: newTotalSessions,
        total_minutes: newTotalMinutes,
        goal_achieved: goalAchieved,
      }

      if (existing?.id) {
        upsertData.id = existing.id
      }

      const { error: statsError } = await supabase.from("daily_stats").upsert(upsertData)

      if (statsError) {
        console.error("Failed to update daily stats:", statsError)
        // 세션은 저장됐으므로 stats 에러는 로그만
      }
    }

    return NextResponse.json({ data: session }, { status: 201 })
  } catch (error) {
    console.error("Session API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * 로컬 시간 기준 날짜 (YYYY-MM-DD)
 */
function getLocalDate(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
