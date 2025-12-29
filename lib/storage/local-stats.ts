import { recordToHistory } from "./local-history"
import {
  getDailyStats,
  saveDailyStats,
  type DailyStats,
} from "./idb"

const LEGACY_STORAGE_KEY = "pomobox_daily_stats"

export interface LocalDailyStats {
  date: string // YYYY-MM-DD
  totalMinutes: number
  totalSessions: number
}

/**
 * 로컬 시간 기준 오늘 날짜 (YYYY-MM-DD)
 * 타임존 문제 방지를 위해 toISOString 대신 로컬 날짜 사용
 */
export function getLocalToday(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
}

// 내부용 alias
function getToday(): string {
  return getLocalToday()
}

/**
 * 기본값 반환
 */
function getDefaultStats(): LocalDailyStats {
  return { date: getToday(), totalMinutes: 0, totalSessions: 0 }
}

/**
 * IndexedDB에서 오늘 통계 조회 (async)
 */
export async function getLocalTodayStatsAsync(): Promise<LocalDailyStats> {
  if (typeof window === "undefined") {
    return getDefaultStats()
  }

  try {
    const stats = await getDailyStats(getToday())
    if (!stats) {
      return getDefaultStats()
    }

    // 날짜가 다르면 초기화 (새로운 날)
    if (stats.date !== getToday()) {
      return getDefaultStats()
    }

    return stats
  } catch {
    return getDefaultStats()
  }
}

/**
 * 동기 버전 (하위 호환성) - localStorage 폴백
 * @deprecated getLocalTodayStatsAsync 사용 권장
 */
export function getLocalTodayStats(): LocalDailyStats {
  if (typeof window === "undefined") {
    return getDefaultStats()
  }

  try {
    const stored = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!stored) {
      return getDefaultStats()
    }

    const stats: LocalDailyStats = JSON.parse(stored)

    // 날짜가 다르면 초기화 (새로운 날)
    if (stats.date !== getToday()) {
      return getDefaultStats()
    }

    return stats
  } catch {
    return getDefaultStats()
  }
}

/**
 * IndexedDB에 오늘 통계 저장 (async)
 */
export async function saveLocalTodayStatsAsync(
  stats: LocalDailyStats
): Promise<void> {
  if (typeof window === "undefined") return

  try {
    await saveDailyStats(stats as DailyStats)
    // localStorage도 함께 업데이트 (폴백용)
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(stats))
  } catch (error) {
    console.error("Failed to save local stats:", error)
  }
}

/**
 * 동기 버전 (하위 호환성)
 * @deprecated saveLocalTodayStatsAsync 사용 권장
 */
export function saveLocalTodayStats(stats: LocalDailyStats): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(stats))
    // 백그라운드로 IndexedDB에도 저장
    saveDailyStats(stats as DailyStats).catch(console.error)
  } catch (error) {
    console.error("Failed to save local stats:", error)
  }
}

/**
 * 1분 단위 증분 저장 (async)
 * - Focus 세션 중 1분마다 호출
 */
export async function incrementLocalMinutesAsync(
  minutes: number = 1
): Promise<LocalDailyStats> {
  const current = await getLocalTodayStatsAsync()
  const updated: LocalDailyStats = {
    date: getToday(),
    totalMinutes: current.totalMinutes + minutes,
    totalSessions: current.totalSessions, // 세션 카운트 유지
  }
  await saveLocalTodayStatsAsync(updated)

  // 히스토리에도 기록 (대시보드용)
  await recordToHistory(minutes)

  return updated
}

/**
 * 동기 버전 (하위 호환성)
 * @deprecated incrementLocalMinutesAsync 사용 권장
 */
export function incrementLocalMinutes(minutes: number = 1): LocalDailyStats {
  const current = getLocalTodayStats()
  const updated: LocalDailyStats = {
    date: getToday(),
    totalMinutes: current.totalMinutes + minutes,
    totalSessions: current.totalSessions, // 세션 카운트 유지
  }
  saveLocalTodayStats(updated)

  // 히스토리에도 기록 (대시보드용) - 백그라운드
  recordToHistory(minutes)

  return updated
}

/**
 * 세션 완료 시 호출 (async)
 */
export async function recordLocalSessionAsync(
  durationMinutes: number
): Promise<LocalDailyStats> {
  const current = await getLocalTodayStatsAsync()
  const updated: LocalDailyStats = {
    date: getToday(),
    totalMinutes: current.totalMinutes + durationMinutes,
    totalSessions: current.totalSessions + 1,
  }
  await saveLocalTodayStatsAsync(updated)

  // 히스토리에도 기록 (대시보드용)
  await recordToHistory(durationMinutes)

  return updated
}

/**
 * 동기 버전 (하위 호환성)
 * @deprecated recordLocalSessionAsync 사용 권장
 */
export function recordLocalSession(durationMinutes: number): LocalDailyStats {
  const current = getLocalTodayStats()
  const updated: LocalDailyStats = {
    date: getToday(),
    totalMinutes: current.totalMinutes + durationMinutes,
    totalSessions: current.totalSessions + 1,
  }
  saveLocalTodayStats(updated)

  // 히스토리에도 기록 (대시보드용) - 백그라운드
  recordToHistory(durationMinutes)

  return updated
}

/**
 * 통계 초기화 (테스트/디버그용)
 */
export async function clearLocalStats(): Promise<void> {
  if (typeof window === "undefined") return
  localStorage.removeItem(LEGACY_STORAGE_KEY)
  // IndexedDB는 빈 값으로 덮어쓰기
  await saveDailyStats(getDefaultStats())
}
