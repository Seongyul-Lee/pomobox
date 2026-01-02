import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * POST /api/check-in
 * 출석 체크 (하루에 한 번만 가능)
 */
export async function POST() {
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

    const today = getLocalDate()

    // 이미 출석했는지 확인
    const { data: existing } = await supabase
      .from("attendance")
      .select("id")
      .eq("user_id", user.id)
      .eq("date", today)
      .single()

    if (existing) {
      return NextResponse.json(
        { data: { already_checked_in: true, date: today } },
        { status: 200 }
      )
    }

    // 출석 기록
    const { error: insertError } = await supabase
      .from("attendance")
      .insert({ user_id: user.id, date: today })

    if (insertError) {
      console.error("Failed to check in:", insertError)
      return NextResponse.json({ error: "Failed to check in" }, { status: 500 })
    }

    // 스트릭 업데이트 (현재 연속 일수 계산 후 best_streak 갱신)
    await updateStreakIfNeeded(supabase, user.id)

    return NextResponse.json(
      { data: { checked_in: true, date: today } },
      { status: 201 }
    )
  } catch (error) {
    console.error("Check-in API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * 로컬 시간 기준 날짜 (YYYY-MM-DD)
 */
function getLocalDate(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

/**
 * 스트릭 계산 및 best_streak 업데이트
 */
async function updateStreakIfNeeded(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  try {
    // 출석 기록 조회
    const { data: attendance } = await supabase
      .from("attendance")
      .select("date")
      .eq("user_id", userId)
      .order("date", { ascending: false })

    if (!attendance || attendance.length === 0) return

    const attendanceSet = new Set(attendance.map((r) => r.date))
    const today = new Date()
    let currentStreak = 0

    // 연속 일수 계산
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = getLocalDate(date)

      if (attendanceSet.has(dateStr)) {
        currentStreak++
      } else if (i > 0) {
        break
      }
    }

    // best_streak 조회
    const { data: stats } = await supabase
      .from("user_stats")
      .select("best_streak")
      .eq("user_id", userId)
      .maybeSingle()

    const bestStreak = stats?.best_streak ?? 0

    // 현재가 더 높으면 업데이트
    if (currentStreak > bestStreak) {
      await supabase.from("user_stats").upsert(
        {
          user_id: userId,
          best_streak: currentStreak,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
    }
  } catch (error) {
    console.error("Failed to update streak:", error)
    // 스트릭 업데이트 실패해도 체크인은 성공
  }
}
