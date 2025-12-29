import { openDB, type IDBPDatabase, type DBSchema } from "idb"

const DB_NAME = "pomobox_db"
const DB_VERSION = 1

/**
 * IndexedDB 스키마 정의
 * - daily_stats: 오늘 통계 (date PK)
 * - history: 일별 히스토리 (date PK)
 * - settings: 사용자 설정 (key-value)
 * - attendance: 출석 기록 (date PK)
 */
export interface PomoboxDB extends DBSchema {
  daily_stats: {
    key: string // date (YYYY-MM-DD)
    value: {
      date: string
      totalMinutes: number
      totalSessions: number
    }
  }
  history: {
    key: string // date (YYYY-MM-DD)
    value: {
      date: string
      totalMinutes: number
      totalSessions: number
    }
  }
  settings: {
    key: string // setting key
    value: {
      key: string
      value: unknown
    }
  }
  attendance: {
    key: string // date (YYYY-MM-DD)
    value: {
      date: string
      bestStreak?: number
    }
  }
}

let dbPromise: Promise<IDBPDatabase<PomoboxDB>> | null = null

/**
 * IndexedDB 연결 (싱글톤)
 * SSR 환경에서는 null 반환
 */
export function getDB(): Promise<IDBPDatabase<PomoboxDB>> | null {
  if (typeof window === "undefined") return null

  if (!dbPromise) {
    dbPromise = openDB<PomoboxDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        // 버전 1: 초기 스키마
        if (oldVersion < 1) {
          db.createObjectStore("daily_stats", { keyPath: "date" })
          db.createObjectStore("history", { keyPath: "date" })
          db.createObjectStore("settings", { keyPath: "key" })
          db.createObjectStore("attendance", { keyPath: "date" })
        }
      },
    })
  }

  return dbPromise
}

// ============================================================
// daily_stats 스토어 헬퍼
// ============================================================

export interface DailyStats {
  date: string
  totalMinutes: number
  totalSessions: number
}

export async function getDailyStats(date: string): Promise<DailyStats | null> {
  const db = getDB()
  if (!db) return null

  const result = await (await db).get("daily_stats", date)
  return result ?? null
}

export async function saveDailyStats(stats: DailyStats): Promise<void> {
  const db = getDB()
  if (!db) return

  await (await db).put("daily_stats", stats)
}

// ============================================================
// history 스토어 헬퍼
// ============================================================

export interface HistoryRecord {
  date: string
  totalMinutes: number
  totalSessions: number
}

export async function getAllHistory(): Promise<HistoryRecord[]> {
  const db = getDB()
  if (!db) return []

  return (await db).getAll("history")
}

export async function getHistoryByDate(
  date: string
): Promise<HistoryRecord | null> {
  const db = getDB()
  if (!db) return null

  const result = await (await db).get("history", date)
  return result ?? null
}

export async function saveHistoryRecord(record: HistoryRecord): Promise<void> {
  const db = getDB()
  if (!db) return

  await (await db).put("history", record)
}

export async function saveAllHistory(records: HistoryRecord[]): Promise<void> {
  const db = getDB()
  if (!db) return

  const dbInstance = await db
  const tx = dbInstance.transaction("history", "readwrite")
  await Promise.all([...records.map((r) => tx.store.put(r)), tx.done])
}

// ============================================================
// settings 스토어 헬퍼
// ============================================================

export async function getSetting<T>(key: string): Promise<T | null> {
  const db = getDB()
  if (!db) return null

  const result = await (await db).get("settings", key)
  return result ? (result.value as T) : null
}

export async function saveSetting<T>(key: string, value: T): Promise<void> {
  const db = getDB()
  if (!db) return

  await (await db).put("settings", { key, value })
}

export async function getAllSettings(): Promise<
  Record<string, unknown> | null
> {
  const db = getDB()
  if (!db) return null

  const all = await (await db).getAll("settings")
  const result: Record<string, unknown> = {}
  for (const item of all) {
    result[item.key] = item.value
  }
  return result
}

// ============================================================
// attendance 스토어 헬퍼
// ============================================================

export interface AttendanceRecord {
  date: string
  bestStreak?: number
}

export async function getAllAttendance(): Promise<AttendanceRecord[]> {
  const db = getDB()
  if (!db) return []

  return (await db).getAll("attendance")
}

export async function getAttendanceByDate(
  date: string
): Promise<AttendanceRecord | null> {
  const db = getDB()
  if (!db) return null

  const result = await (await db).get("attendance", date)
  return result ?? null
}

export async function saveAttendanceRecord(
  record: AttendanceRecord
): Promise<void> {
  const db = getDB()
  if (!db) return

  await (await db).put("attendance", record)
}

export async function saveAllAttendance(
  records: AttendanceRecord[]
): Promise<void> {
  const db = getDB()
  if (!db) return

  const dbInstance = await db
  const tx = dbInstance.transaction("attendance", "readwrite")
  await Promise.all([...records.map((r) => tx.store.put(r)), tx.done])
}

// ============================================================
// 마이그레이션 유틸리티
// ============================================================

const MIGRATION_FLAG = "pomobox_idb_migrated"

// localStorage 키 (레거시)
const LEGACY_KEYS = {
  dailyStats: "pomobox_daily_stats",
  history: "pomobox_history",
  settings: "pomobox_settings",
  attendance: "pomobox_attendance",
  bestStreak: "pomobox_best_streak",
}

/**
 * localStorage → IndexedDB 마이그레이션 완료 여부
 */
export function isMigrated(): boolean {
  if (typeof window === "undefined") return true
  return localStorage.getItem(MIGRATION_FLAG) === "true"
}

/**
 * 마이그레이션 완료 플래그 설정
 */
export function setMigrated(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(MIGRATION_FLAG, "true")
}

/**
 * localStorage → IndexedDB 1회 마이그레이션
 * 앱 초기화 시 호출
 */
export async function migrateFromLocalStorage(): Promise<void> {
  if (typeof window === "undefined") return
  if (isMigrated()) return

  console.log("[pomobox] Starting localStorage → IndexedDB migration...")

  try {
    const db = getDB()
    if (!db) {
      console.warn("[pomobox] IndexedDB not available, skipping migration")
      return
    }

    const dbInstance = await db

    // 1. daily_stats 마이그레이션
    const dailyStatsStr = localStorage.getItem(LEGACY_KEYS.dailyStats)
    if (dailyStatsStr) {
      try {
        const dailyStats = JSON.parse(dailyStatsStr) as DailyStats
        await dbInstance.put("daily_stats", dailyStats)
        console.log("[pomobox] Migrated daily_stats")
      } catch (e) {
        console.warn("[pomobox] Failed to migrate daily_stats:", e)
      }
    }

    // 2. history 마이그레이션
    const historyStr = localStorage.getItem(LEGACY_KEYS.history)
    if (historyStr) {
      try {
        const history = JSON.parse(historyStr) as HistoryRecord[]
        const tx = dbInstance.transaction("history", "readwrite")
        await Promise.all([...history.map((r) => tx.store.put(r)), tx.done])
        console.log(`[pomobox] Migrated ${history.length} history records`)
      } catch (e) {
        console.warn("[pomobox] Failed to migrate history:", e)
      }
    }

    // 3. settings 마이그레이션
    const settingsStr = localStorage.getItem(LEGACY_KEYS.settings)
    if (settingsStr) {
      try {
        const settings = JSON.parse(settingsStr) as Record<string, unknown>
        const tx = dbInstance.transaction("settings", "readwrite")
        const entries = Object.entries(settings)
        await Promise.all([
          ...entries.map(([key, value]) => tx.store.put({ key, value })),
          tx.done,
        ])
        console.log(`[pomobox] Migrated ${entries.length} settings`)
      } catch (e) {
        console.warn("[pomobox] Failed to migrate settings:", e)
      }
    }

    // 4. attendance 마이그레이션
    const attendanceStr = localStorage.getItem(LEGACY_KEYS.attendance)
    if (attendanceStr) {
      try {
        const dates = JSON.parse(attendanceStr) as string[]
        const records: AttendanceRecord[] = dates.map((date) => ({ date }))
        const tx = dbInstance.transaction("attendance", "readwrite")
        await Promise.all([...records.map((r) => tx.store.put(r)), tx.done])
        console.log(`[pomobox] Migrated ${dates.length} attendance records`)
      } catch (e) {
        console.warn("[pomobox] Failed to migrate attendance:", e)
      }
    }

    // 5. bestStreak 마이그레이션
    const bestStreakStr = localStorage.getItem(LEGACY_KEYS.bestStreak)
    if (bestStreakStr) {
      try {
        const bestStreak = parseInt(bestStreakStr, 10)
        await dbInstance.put("settings", { key: "bestStreak", value: bestStreak })
        console.log(`[pomobox] Migrated bestStreak: ${bestStreak}`)
      } catch (e) {
        console.warn("[pomobox] Failed to migrate bestStreak:", e)
      }
    }

    // 마이그레이션 완료 플래그 설정
    setMigrated()
    console.log("[pomobox] Migration completed successfully")
  } catch (error) {
    console.error("[pomobox] Migration failed:", error)
  }
}
