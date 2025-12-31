import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * 사용자 설정 타입 (Supabase user_settings 테이블)
 */
interface UserSettings {
  focus_duration: number
  break_duration: number
  daily_goal: number
  notifications_enabled: boolean
  sound_enabled: boolean
  sound_category: string
  sound_type: string
  volume: number
}

const DEFAULT_SETTINGS: UserSettings = {
  focus_duration: 25,
  break_duration: 5,
  daily_goal: 120,
  notifications_enabled: false,
  sound_enabled: true,
  sound_category: "melody",
  sound_type: "achievement",
  volume: 50,
}

/**
 * GET /api/settings
 * 사용자 설정 조회
 */
export async function GET() {
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

    // 설정 조회
    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("Failed to get settings:", error)
      return NextResponse.json({ error: "Failed to get settings" }, { status: 500 })
    }

    // 설정이 없으면 기본값 반환
    const settings = data
      ? {
          focus_duration: data.focus_duration ?? DEFAULT_SETTINGS.focus_duration,
          break_duration: data.break_duration ?? DEFAULT_SETTINGS.break_duration,
          daily_goal: data.daily_goal ?? DEFAULT_SETTINGS.daily_goal,
          notifications_enabled:
            data.notifications_enabled ?? DEFAULT_SETTINGS.notifications_enabled,
          sound_enabled: data.sound_enabled ?? DEFAULT_SETTINGS.sound_enabled,
          sound_category: data.sound_category ?? DEFAULT_SETTINGS.sound_category,
          sound_type: data.sound_type ?? DEFAULT_SETTINGS.sound_type,
          volume: data.volume ?? DEFAULT_SETTINGS.volume,
        }
      : DEFAULT_SETTINGS

    return NextResponse.json({ data: settings }, { status: 200 })
  } catch (error) {
    console.error("Settings GET API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * PUT /api/settings
 * 사용자 설정 업데이트
 */
export async function PUT(request: Request) {
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

    // 유효성 검사
    const validFields: (keyof UserSettings)[] = [
      "focus_duration",
      "break_duration",
      "daily_goal",
      "notifications_enabled",
      "sound_enabled",
      "sound_category",
      "sound_type",
      "volume",
    ]

    const updateData: Partial<UserSettings> = {}
    for (const field of validFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    // 숫자 필드 검증
    if (updateData.focus_duration !== undefined) {
      if (
        typeof updateData.focus_duration !== "number" ||
        updateData.focus_duration < 1 ||
        updateData.focus_duration > 120
      ) {
        return NextResponse.json(
          { error: "focus_duration must be between 1 and 120" },
          { status: 400 }
        )
      }
    }

    if (updateData.break_duration !== undefined) {
      if (
        typeof updateData.break_duration !== "number" ||
        updateData.break_duration < 1 ||
        updateData.break_duration > 60
      ) {
        return NextResponse.json(
          { error: "break_duration must be between 1 and 60" },
          { status: 400 }
        )
      }
    }

    if (updateData.volume !== undefined) {
      if (
        typeof updateData.volume !== "number" ||
        updateData.volume < 0 ||
        updateData.volume > 100
      ) {
        return NextResponse.json(
          { error: "volume must be between 0 and 100" },
          { status: 400 }
        )
      }
    }

    // upsert 실행
    const { data, error } = await supabase
      .from("user_settings")
      .upsert(
        {
          user_id: user.id,
          ...updateData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single()

    if (error) {
      console.error("Failed to update settings:", error)
      return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error("Settings PUT API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
