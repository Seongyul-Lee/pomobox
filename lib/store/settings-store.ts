/**
 * Settings Store (Zustand + Persist)
 *
 * 타이머 설정을 중앙 관리하는 Zustand store.
 * localStorage에 자동 영속화.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type SoundCategory } from '@/lib/sounds'

// 전체 설정 인터페이스 (local-settings.ts와 동일)
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

// 설정 액션
interface SettingsStoreActions {
  // 개별 설정 업데이트
  setFocusDuration: (minutes: number) => void
  setBreakDuration: (minutes: number) => void
  setDailyGoal: (minutes: number) => void
  setNotificationsEnabled: (enabled: boolean) => void
  setSoundEnabled: (enabled: boolean) => void
  setSoundCategory: (category: SoundCategory) => void
  setSoundType: (type: string) => void
  setVolume: (volume: number) => void

  // 전체 설정 업데이트
  updateSettings: (settings: Partial<TimerSettings>) => void

  // 설정 초기화
  resetSettings: () => void
}

type SettingsStore = TimerSettings & SettingsStoreActions

export const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
  dailyGoal: 120,
  notificationsEnabled: false,
  soundEnabled: true,
  soundCategory: 'melody',
  soundType: 'achievement',
  volume: 50,
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // 초기 상태
      ...DEFAULT_SETTINGS,

      // 개별 설정 업데이트
      setFocusDuration: (minutes) => set({ focusDuration: minutes }),
      setBreakDuration: (minutes) => set({ breakDuration: minutes }),
      setDailyGoal: (minutes) => set({ dailyGoal: minutes }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setSoundCategory: (category) => set({ soundCategory: category }),
      setSoundType: (type) => set({ soundType: type }),
      setVolume: (volume) => set({ volume: volume }),

      // 전체 설정 업데이트
      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),

      // 설정 초기화
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'pomobox-settings', // localStorage key
      // 액션은 저장하지 않고 상태만 저장
      partialize: (state) => ({
        focusDuration: state.focusDuration,
        breakDuration: state.breakDuration,
        dailyGoal: state.dailyGoal,
        notificationsEnabled: state.notificationsEnabled,
        soundEnabled: state.soundEnabled,
        soundCategory: state.soundCategory,
        soundType: state.soundType,
        volume: state.volume,
      }),
    }
  )
)

// 셀렉터 (성능 최적화용)
export const selectFocusDuration = (state: SettingsStore) => state.focusDuration
export const selectBreakDuration = (state: SettingsStore) => state.breakDuration
export const selectDailyGoal = (state: SettingsStore) => state.dailyGoal
export const selectSoundEnabled = (state: SettingsStore) => state.soundEnabled
export const selectSoundCategory = (state: SettingsStore) => state.soundCategory
export const selectSoundType = (state: SettingsStore) => state.soundType
export const selectVolume = (state: SettingsStore) => state.volume
export const selectNotificationsEnabled = (state: SettingsStore) => state.notificationsEnabled

// 타이머에 필요한 설정만 추출
export const selectTimerSettings = (state: SettingsStore) => ({
  focusDuration: state.focusDuration,
  breakDuration: state.breakDuration,
})
