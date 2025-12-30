import { createClient } from "@/lib/supabase/client"
import {
  getAllHistory,
  getAllAttendance,
  getDailyStats,
  getSetting,
  type HistoryRecord,
  type AttendanceRecord,
} from "@/lib/storage/idb"

const SYNC_FLAG = "pomobox_user_synced"
const MAX_RETRIES = 3
const BATCH_SIZE = 100

export interface MigrationResult {
  success: boolean
  migratedRecords: number
  error?: string
}

/**
 * 마이그레이션 완료 여부 확인
 */
export function isSynced(): boolean {
  if (typeof window === "undefined") return true
  return localStorage.getItem(SYNC_FLAG) === "true"
}

/**
 * 마이그레이션 완료 플래그 설정
 */
function setSynced(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(SYNC_FLAG, "true")
}

/**
 * 로컬 시간 기준 날짜 (YYYY-MM-DD)
 */
function getLocalDate(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

/**
 * 재시도 래퍼 함수
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      console.warn(`[pomobox] Attempt ${attempt}/${retries} failed:`, lastError.message)

      if (attempt < retries) {
        // 지수 백오프: 1초, 2초, 4초...
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)))
      }
    }
  }

  throw lastError
}

/**
 * history → daily_stats 마이그레이션
 */
async function migrateHistoryToStats(
  userId: string,
  history: HistoryRecord[]
): Promise<number> {
  if (history.length === 0) return 0

  const supabase = createClient()
  let migratedCount = 0

  // 배치 처리 (100개씩)
  for (let i = 0; i < history.length; i += BATCH_SIZE) {
    const batch = history.slice(i, i + BATCH_SIZE)

    const records = batch.map((record) => ({
      user_id: userId,
      date: record.date,
      total_sessions: record.totalSessions,
      total_minutes: record.totalMinutes,
      goal_achieved: record.totalMinutes >= 120, // 기본 목표 2시간
    }))

    // upsert로 중복 방지 (date + user_id 기준)
    const { error } = await supabase
      .from("daily_stats")
      .upsert(records, { onConflict: "user_id,date" })

    if (error) {
      console.error("[pomobox] Failed to migrate history batch:", error)
      throw error
    }

    migratedCount += batch.length
  }

  console.log(`[pomobox] Migrated ${migratedCount} history records to daily_stats`)
  return migratedCount
}

/**
 * attendance 마이그레이션
 */
async function migrateAttendance(
  userId: string,
  attendance: AttendanceRecord[]
): Promise<number> {
  if (attendance.length === 0) return 0

  const supabase = createClient()
  let migratedCount = 0

  // 배치 처리 (100개씩)
  for (let i = 0; i < attendance.length; i += BATCH_SIZE) {
    const batch = attendance.slice(i, i + BATCH_SIZE)

    const records = batch.map((record) => ({
      user_id: userId,
      date: record.date,
    }))

    // upsert로 중복 방지 (date + user_id 기준)
    const { error } = await supabase
      .from("attendance")
      .upsert(records, { onConflict: "user_id,date" })

    if (error) {
      console.error("[pomobox] Failed to migrate attendance batch:", error)
      throw error
    }

    migratedCount += batch.length
  }

  console.log(`[pomobox] Migrated ${migratedCount} attendance records`)
  return migratedCount
}

/**
 * bestStreak 마이그레이션
 */
async function migrateBestStreak(userId: string): Promise<void> {
  const bestStreak = await getSetting<number>("bestStreak")
  if (!bestStreak || bestStreak <= 0) return

  const supabase = createClient()

  const { error } = await supabase
    .from("user_stats")
    .upsert({
      user_id: userId,
      best_streak: bestStreak,
      updated_at: new Date().toISOString(),
    })

  if (error) {
    console.error("[pomobox] Failed to migrate bestStreak:", error)
    throw error
  }

  console.log(`[pomobox] Migrated bestStreak: ${bestStreak}`)
}

/**
 * 오늘 통계 마이그레이션 (진행 중인 세션 데이터)
 */
async function migrateTodayStats(userId: string): Promise<number> {
  const today = getLocalDate()
  const todayStats = await getDailyStats(today)

  if (!todayStats || (todayStats.totalMinutes === 0 && todayStats.totalSessions === 0)) {
    return 0
  }

  const supabase = createClient()

  // 먼저 오늘 통계 조회 (이미 있으면 병합)
  const { data: existing } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .single()

  const newTotalSessions = (existing?.total_sessions || 0) + todayStats.totalSessions
  const newTotalMinutes = (existing?.total_minutes || 0) + todayStats.totalMinutes

  const upsertData: Record<string, unknown> = {
    user_id: userId,
    date: today,
    total_sessions: newTotalSessions,
    total_minutes: newTotalMinutes,
    goal_achieved: newTotalMinutes >= 120,
  }
  if (existing?.id) {
    upsertData.id = existing.id
  }

  const { error } = await supabase.from("daily_stats").upsert(upsertData)

  if (error) {
    console.error("[pomobox] Failed to migrate today stats:", error)
    throw error
  }

  console.log(`[pomobox] Migrated today stats: ${todayStats.totalMinutes}min, ${todayStats.totalSessions} sessions`)
  return 1
}

/**
 * IndexedDB 데이터 삭제
 */
async function clearLocalData(): Promise<void> {
  if (typeof window === "undefined") return

  const { getDB } = await import("@/lib/storage/idb")
  const dbPromise = getDB()
  if (!dbPromise) return

  const db = await dbPromise

  // 각 스토어 비우기
  const tx = db.transaction(["history", "attendance", "daily_stats"], "readwrite")
  await Promise.all([
    tx.objectStore("history").clear(),
    tx.objectStore("attendance").clear(),
    tx.objectStore("daily_stats").clear(),
    tx.done,
  ])

  console.log("[pomobox] Cleared local IndexedDB data")
}

/**
 * 로컬 데이터 → Supabase 마이그레이션 (메인 함수)
 *
 * @param userId - Supabase 사용자 ID
 * @returns 마이그레이션 결과
 */
export async function migrateLocalToSupabase(userId: string): Promise<MigrationResult> {
  // 이미 마이그레이션 완료된 경우 스킵
  if (isSynced()) {
    console.log("[pomobox] Already synced, skipping migration")
    return { success: true, migratedRecords: 0 }
  }

  // SSR 환경에서는 스킵
  if (typeof window === "undefined") {
    return { success: true, migratedRecords: 0 }
  }

  console.log("[pomobox] Starting local → Supabase migration...")

  try {
    // 1. 로컬 데이터 수집
    const [history, attendance] = await Promise.all([
      getAllHistory(),
      getAllAttendance(),
    ])

    // 마이그레이션할 데이터가 없는 경우
    if (history.length === 0 && attendance.length === 0) {
      console.log("[pomobox] No local data to migrate")
      setSynced()
      return { success: true, migratedRecords: 0 }
    }

    // 2. 재시도 로직과 함께 마이그레이션 실행
    const [historyCount, attendanceCount, todayCount] = await withRetry(async () => {
      const hc = await migrateHistoryToStats(userId, history)
      const ac = await migrateAttendance(userId, attendance)
      const tc = await migrateTodayStats(userId)
      await migrateBestStreak(userId)
      return [hc, ac, tc] as const
    })

    const totalMigrated = historyCount + attendanceCount + todayCount

    // 3. 마이그레이션 성공 시 로컬 데이터 삭제
    await clearLocalData()

    // 4. 마이그레이션 완료 플래그 설정
    setSynced()

    console.log(`[pomobox] Migration completed: ${totalMigrated} records migrated`)

    return {
      success: true,
      migratedRecords: totalMigrated,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[pomobox] Migration failed:", errorMessage)

    // 실패 시 로컬 데이터 유지 (삭제 안 함)
    return {
      success: false,
      migratedRecords: 0,
      error: errorMessage,
    }
  }
}

/**
 * 마이그레이션 플래그 초기화 (테스트/디버그용)
 */
export function resetSyncFlag(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(SYNC_FLAG)
}
