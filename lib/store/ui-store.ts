/**
 * UI Store (Zustand)
 *
 * UI 상태(다이얼로그, 모달 등)를 전역으로 관리하는 store.
 * persist 없음 - 페이지 새로고침 시 초기화됨.
 */

import { create } from 'zustand'

interface UIStore {
  // Settings Dialog 상태
  isSettingsOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  setSettingsOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isSettingsOpen: false,
  openSettings: () => set({ isSettingsOpen: true }),
  closeSettings: () => set({ isSettingsOpen: false }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
}))

// 셀렉터
export const selectIsSettingsOpen = (state: UIStore) => state.isSettingsOpen
