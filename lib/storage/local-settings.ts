import { type SoundCategory } from "@/lib/sounds"
import { getSetting, saveSetting, getAllSettings } from "./idb"

const LEGACY_SETTINGS_KEY = "pomobox_settings"

export interface TimerSettings {
  focusDuration: number
  breakDuration: number
  dailyGoal: number
  notificationsEnabled: boolean
  soundEnabled: boolean
  soundCategory: SoundCategory
  soundType: string
  volume: number
}

export const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
  dailyGoal: 120,
  notificationsEnabled: false,
  soundEnabled: true,
  soundCategory: "melody",
  soundType: "achievement",
  volume: 50,
}

/**
 * IndexedDB에서 설정 조회 (async)
 */
export async function getLocalSettingsAsync(): Promise<TimerSettings> {
  if (typeof window === "undefined") return DEFAULT_SETTINGS

  try {
    const allSettings = await getAllSettings()
    if (!allSettings) return DEFAULT_SETTINGS

    return {
      ...DEFAULT_SETTINGS,
      ...allSettings,
    } as TimerSettings
  } catch {
    return DEFAULT_SETTINGS
  }
}

/**
 * 동기 버전 (하위 호환성) - localStorage 폴백
 */
export function getLocalSettings(): TimerSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS

  try {
    const stored = localStorage.getItem(LEGACY_SETTINGS_KEY)
    if (!stored) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

/**
 * IndexedDB에 설정 저장 (async)
 */
export async function saveLocalSettingsAsync(
  settings: TimerSettings
): Promise<void> {
  if (typeof window === "undefined") return

  try {
    // 각 설정을 개별 key-value로 저장
    const entries = Object.entries(settings) as [
      keyof TimerSettings,
      TimerSettings[keyof TimerSettings],
    ][]
    await Promise.all(
      entries.map(([key, value]) => saveSetting(key, value))
    )
    // localStorage도 함께 업데이트 (폴백용)
    localStorage.setItem(LEGACY_SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error("Failed to save settings:", error)
  }
}

/**
 * 동기 버전 (하위 호환성)
 */
export function saveLocalSettings(settings: TimerSettings): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(LEGACY_SETTINGS_KEY, JSON.stringify(settings))
    // 백그라운드로 IndexedDB에도 저장
    const entries = Object.entries(settings) as [
      keyof TimerSettings,
      TimerSettings[keyof TimerSettings],
    ][]
    Promise.all(
      entries.map(([key, value]) => saveSetting(key, value))
    ).catch(console.error)
  } catch (error) {
    console.error("Failed to save settings:", error)
  }
}

/**
 * 일일 목표만 조회 (DashboardLeft용)
 */
export function getDailyGoal(): number {
  const settings = getLocalSettings()
  return settings.dailyGoal
}

/**
 * 일일 목표만 조회 (async)
 */
export async function getDailyGoalAsync(): Promise<number> {
  const settings = await getLocalSettingsAsync()
  return settings.dailyGoal
}
