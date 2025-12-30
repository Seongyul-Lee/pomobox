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

/**
 * Supabase PostgrestError 형식으로 에러 로깅
 */
function logSupabaseError(context: string, error: unknown, data?: unknown): void {
  console.error(`[pomobox] ${context}:`)

  // Supabase PostgrestError 구조 확인
  if (error && typeof error === 'object') {
    const pgError = error as { code?: string; message?: string; details?: string; hint?: string }
    console.error('  - code:', pgError.code ?? 'N/A')
    console.error('  - message:', pgError.message ?? 'N/A')
    console.error('  - details:', pgError.details ?? 'N/A')
    console.error('  - hint:', pgError.hint ?? 'N/A')
    console.error('  - full error:', JSON.stringify(error, null, 2))
  } else {
    console.error('  - error:', error)
  }

  // 문제가 된 데이터도 출력
  if (data !== undefined) {
    console.error('  - data being sent:', JSON.stringify(data, null, 2).slice(0, 1000)) // 최대 1000자
  }
}

/**
 * 레코드 유효성 검사
 */
function isValidRecord(record: unknown): boolean {
  if (!record || typeof record !== 'object') return false
  const r = record as Record<string, unknown>
  return r.user_id !== undefined && r.user_id !== null && r.date !== undefined && r.date !== null
}

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
  let lastError: unknown = null

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      // Supabase PostgrestError는 Error가 아닐 수 있음
      const errorInfo = error && typeof error === 'object'
        ? JSON.stringify(error)
        : String(error)
      console.warn(`[pomobox] Attempt ${attempt}/${retries} failed:`, errorInfo)

      if (attempt < retries) {
        // 지수 백오프: 1초, 2초, 4초...
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)))
      }
    }
  }

  throw lastError
}

interface MigrationBatchResult {
  migratedCount: number
  skippedBatches: number
}

/**
 * history → daily_stats 마이그레이션
 */
async function migrateHistoryToStats(
  userId: string,
  history: HistoryRecord[]
): Promise<MigrationBatchResult> {
  if (!history || history.length === 0) {
    console.log("[pomobox] No history data to migrate (empty array)")
    return { migratedCount: 0, skippedBatches: 0 }
  }

  // 유효하지 않은 데이터 필터링
  const validHistory = history.filter(record =>
    record && record.date && typeof record.totalSessions === 'number' && typeof record.totalMinutes === 'number'
  )

  if (validHistory.length === 0) {
    console.log("[pomobox] No valid history records to migrate after filtering")
    return { migratedCount: 0, skippedBatches: 0 }
  }

  if (validHistory.length !== history.length) {
    console.warn(`[pomobox] Filtered out ${history.length - validHistory.length} invalid history records`)
  }

  const supabase = createClient()
  let migratedCount = 0
  let skippedBatches = 0

  // 배치 처리 (100개씩)
  for (let i = 0; i < validHistory.length; i += BATCH_SIZE) {
    const batch = validHistory.slice(i, i + BATCH_SIZE)
    const batchIndex = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(validHistory.length / BATCH_SIZE)

    const records = batch.map((record) => ({
      user_id: userId,
      date: record.date,
      total_sessions: record.totalSessions ?? 0,
      total_minutes: record.totalMinutes ?? 0,
      goal_achieved: (record.totalMinutes ?? 0) >= 120, // 기본 목표 2시간
    }))

    // 레코드 유효성 최종 확인
    const validRecords = records.filter(isValidRecord)
    if (validRecords.length === 0) {
      console.warn(`[pomobox] Batch ${batchIndex}/${totalBatches}: All records invalid, skipping`)
      skippedBatches++
      continue
    }

    console.log(`[pomobox] Migrating history batch ${batchIndex}/${totalBatches} (${validRecords.length} records)`)

    // upsert로 중복 방지 (date + user_id 기준)
    const { error } = await supabase
      .from("daily_stats")
      .upsert(validRecords, { onConflict: "user_id,date" })

    if (error) {
      logSupabaseError(`Failed to migrate history batch ${batchIndex}/${totalBatches}`, error, validRecords)

      // 배치 실패 시 스킵하고 계속 진행 (전체 프로세스 중단 방지)
      skippedBatches++
      console.warn(`[pomobox] Skipping batch ${batchIndex} and continuing...`)
      continue
    }

    migratedCount += validRecords.length
  }

  if (skippedBatches > 0) {
    console.warn(`[pomobox] Migration completed with ${skippedBatches} skipped batches`)
  }

  console.log(`[pomobox] Migrated ${migratedCount} history records to daily_stats`)
  return { migratedCount, skippedBatches }
}

/**
 * attendance 마이그레이션
 */
async function migrateAttendance(
  userId: string,
  attendance: AttendanceRecord[]
): Promise<MigrationBatchResult> {
  if (!attendance || attendance.length === 0) {
    console.log("[pomobox] No attendance data to migrate (empty array)")
    return { migratedCount: 0, skippedBatches: 0 }
  }

  // 유효하지 않은 데이터 필터링
  const validAttendance = attendance.filter(record => record && record.date)

  if (validAttendance.length === 0) {
    console.log("[pomobox] No valid attendance records to migrate after filtering")
    return { migratedCount: 0, skippedBatches: 0 }
  }

  if (validAttendance.length !== attendance.length) {
    console.warn(`[pomobox] Filtered out ${attendance.length - validAttendance.length} invalid attendance records`)
  }

  const supabase = createClient()
  let migratedCount = 0
  let skippedBatches = 0

  // 배치 처리 (100개씩)
  for (let i = 0; i < validAttendance.length; i += BATCH_SIZE) {
    const batch = validAttendance.slice(i, i + BATCH_SIZE)
    const batchIndex = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(validAttendance.length / BATCH_SIZE)

    const records = batch.map((record) => ({
      user_id: userId,
      date: record.date,
    }))

    // 레코드 유효성 최종 확인
    const validRecords = records.filter(isValidRecord)
    if (validRecords.length === 0) {
      console.warn(`[pomobox] Attendance batch ${batchIndex}/${totalBatches}: All records invalid, skipping`)
      skippedBatches++
      continue
    }

    console.log(`[pomobox] Migrating attendance batch ${batchIndex}/${totalBatches} (${validRecords.length} records)`)

    // upsert로 중복 방지 (date + user_id 기준)
    const { error } = await supabase
      .from("attendance")
      .upsert(validRecords, { onConflict: "user_id,date" })

    if (error) {
      logSupabaseError(`Failed to migrate attendance batch ${batchIndex}/${totalBatches}`, error, validRecords)

      // 배치 실패 시 스킵하고 계속 진행
      skippedBatches++
      console.warn(`[pomobox] Skipping attendance batch ${batchIndex} and continuing...`)
      continue
    }

    migratedCount += validRecords.length
  }

  if (skippedBatches > 0) {
    console.warn(`[pomobox] Attendance migration completed with ${skippedBatches} skipped batches`)
  }

  console.log(`[pomobox] Migrated ${migratedCount} attendance records`)
  return { migratedCount, skippedBatches }
}

/**
 * bestStreak 마이그레이션
 */
async function migrateBestStreak(userId: string): Promise<void> {
  const bestStreak = await getSetting<number>("bestStreak")
  if (!bestStreak || bestStreak <= 0) {
    console.log("[pomobox] No bestStreak to migrate (empty or zero)")
    return
  }

  const supabase = createClient()
  const data = {
    user_id: userId,
    best_streak: bestStreak,
    updated_at: new Date().toISOString(),
  }

  console.log(`[pomobox] Migrating bestStreak: ${bestStreak}`)

  const { error } = await supabase
    .from("user_stats")
    .upsert(data)

  if (error) {
    logSupabaseError("Failed to migrate bestStreak", error, data)
    // bestStreak 실패는 치명적이지 않으므로 경고만 출력하고 계속 진행
    console.warn("[pomobox] Skipping bestStreak migration and continuing...")
    return
  }

  console.log(`[pomobox] Successfully migrated bestStreak: ${bestStreak}`)
}

/**
 * 오늘 통계 마이그레이션 (진행 중인 세션 데이터)
 */
async function migrateTodayStats(userId: string): Promise<number> {
  const today = getLocalDate()
  const todayStats = await getDailyStats(today)

  if (!todayStats || (todayStats.totalMinutes === 0 && todayStats.totalSessions === 0)) {
    console.log("[pomobox] No today stats to migrate (empty or zero)")
    return 0
  }

  console.log(`[pomobox] Migrating today stats: ${todayStats.totalMinutes}min, ${todayStats.totalSessions} sessions`)

  const supabase = createClient()

  // 먼저 오늘 통계 조회 (이미 있으면 병합)
  const { data: existing, error: fetchError } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .single()

  // PGRST116은 "no rows returned" 에러로, 데이터가 없는 정상 케이스
  if (fetchError && fetchError.code !== 'PGRST116') {
    logSupabaseError("Failed to fetch existing today stats", fetchError, { userId, today })
  }

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
    logSupabaseError("Failed to migrate today stats", error, upsertData)
    // 오늘 통계 실패는 치명적이지 않으므로 경고만 출력하고 계속 진행
    console.warn("[pomobox] Skipping today stats migration and continuing...")
    return 0
  }

  console.log(`[pomobox] Successfully migrated today stats: ${newTotalMinutes}min, ${newTotalSessions} sessions`)
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
    const [historyResult, attendanceResult, todayCount] = await withRetry(async () => {
      const hr = await migrateHistoryToStats(userId, history)
      const ar = await migrateAttendance(userId, attendance)
      const tc = await migrateTodayStats(userId)
      await migrateBestStreak(userId)
      return [hr, ar, tc] as const
    })

    const totalMigrated = historyResult.migratedCount + attendanceResult.migratedCount + todayCount
    const totalSkipped = historyResult.skippedBatches + attendanceResult.skippedBatches

    // 3. skipped batches가 있으면 실패로 처리 (로컬 데이터 보존)
    if (totalSkipped > 0) {
      console.error(`[pomobox] Migration failed: ${totalSkipped} batches were skipped due to errors`)
      return {
        success: false,
        migratedRecords: totalMigrated,
        error: `${totalSkipped} batches failed to migrate. Local data preserved for retry.`,
      }
    }

    // 4. 마이그레이션 성공 시 로컬 데이터 삭제
    await clearLocalData()

    // 5. 마이그레이션 완료 플래그 설정
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
