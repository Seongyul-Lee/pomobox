/**
 * Timer Store (Zustand + Persist)
 *
 * 타이머 상태를 중앙 관리하는 Zustand store.
 * state-machine.ts의 순수 함수를 내부적으로 사용하여 상태 전이.
 * Focus 세션만 영속화 (Break/LongBreak 제외).
 *
 * 설정 SSOT: settings-store가 SSOT이며, 이 store의 settings는 캐시.
 * settings-store 변경 시 자동으로 동기화됨 (subscribeToSettingsStore).
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  TimerState,
  TimerPhase,
  TimerStatus,
  TimerSettings,
  TimerEvent,
  createInitialState,
  transition,
  validateInvariants,
  getPhaseDuration,
} from '@/lib/state-machine'
import {
  getLocalToday,
  getLocalTodayStats,
  incrementLocalMinutes,
  saveLocalTodayStats,
} from '@/lib/storage/local-stats'
import { incrementHistorySession } from '@/lib/storage/local-history'

// 기본 설정 (settings-store에서 가져올 초기값)
const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
}

// 영속화 메타데이터
interface PersistMetadata {
  savedAt: string // YYYY-MM-DD (날짜 검증용)
  focusSessionStartMs: number | null // Focus 세션 시작 시간
  lastSavedMinute: number // 마지막 저장된 분 (1분 단위 저장용)
}

// 타이머 store에서 관리할 추가 상태
interface TimerStoreState extends TimerState, PersistMetadata {
  // 설정 (settings-store에서 자동 동기화되는 캐시)
  settings: TimerSettings

  // 일시정지 시 누적 시간
  pausedElapsedMs: number

  // 실시간 대시보드용 플래그 (로컬 타이머 상태 반영)
  dashboardIsRunning: boolean
  dashboardIsFocusPhase: boolean

  // 복원 완료 플래그
  _hasHydrated: boolean
}

// 타이머 액션
interface TimerStoreActions {
  // 이벤트 디스패치 (state-machine transition 호출)
  dispatch: (event: TimerEvent) => { notification?: { title: string; body: string }; sound?: boolean } | undefined

  // 편의 액션
  start: () => void
  pause: () => void
  resume: () => void
  skip: () => void
  reset: () => void
  timeUp: () => void

  // 시간 업데이트 (매 초 호출)
  tick: () => void

  // 설정 업데이트
  updateSettings: (settings: TimerSettings) => void

  // 통계 업데이트 (외부에서 로컬 통계 로드 시)
  setStats: (stats: {
    sessions?: number
    completedSessions?: number
    totalFocusMinutes?: number
  }) => void

  // 상태 초기화 (하루가 바뀔 때 등)
  resetDailyStats: () => void

  // 세션 상태 동기화 (외부 컴포넌트에서 호출) - deprecated, 내부 관리로 전환
  syncSessionState: (params: {
    sessionStartTime: number | null
    isRunning: boolean
    isFocusPhase: boolean
  }) => void

  // 1분 단위 자동 저장 (Focus 세션 중 호출)
  checkAndSaveMinute: (userId?: string, dailyGoal?: number) => void

  // 복원 완료 설정
  setHasHydrated: (state: boolean) => void
}

type TimerStore = TimerStoreState & TimerStoreActions

/**
 * Focus 세션 완료 시 통계 저장
 */
function handleFocusComplete(
  focusDuration: number,
  lastSavedMinute: number,
  userId?: string,
  dailyGoal?: number
): void {
  // 남은 분 계산 (이미 1분마다 저장했으므로 중복 방지)
  const remainingMinutes = focusDuration - lastSavedMinute

  // localStorage + IndexedDB에 남은 분 저장
  if (remainingMinutes > 0) {
    incrementLocalMinutes(remainingMinutes)
  }

  // 세션 카운트 증가 (daily_stats)
  const localStats = getLocalTodayStats()
  saveLocalTodayStats({
    ...localStats,
    totalSessions: localStats.totalSessions + 1,
  })

  // 히스토리에 세션 완료 기록
  incrementHistorySession()

  // Supabase 저장은 컴포넌트에서 처리 (user 컨텍스트 필요)
}

/**
 * 만료된 세션 처리 (페이지 새로고침 시)
 */
function handleExpiredSession(
  focusSessionStartMs: number | null,
  targetEndAtMs: number | null,
  lastSavedMinute: number,
  focusDuration: number
): void {
  if (!focusSessionStartMs || !targetEndAtMs) return

  // 세션 완료 시간 역산
  const elapsedMs = targetEndAtMs - focusSessionStartMs
  const elapsedMinutes = Math.floor(elapsedMs / 60000)
  const remainingMinutes = elapsedMinutes - lastSavedMinute

  // 남은 분 저장
  if (remainingMinutes > 0) {
    incrementLocalMinutes(remainingMinutes)
  }

  // 세션 완료 카운트 증가
  const localStats = getLocalTodayStats()
  saveLocalTodayStats({
    ...localStats,
    totalSessions: localStats.totalSessions + 1,
  })

  // 히스토리 기록
  incrementHistorySession()

  console.log('[timer-store] 만료 세션 처리 완료:', {
    elapsedMinutes,
    remainingMinutes,
  })
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      // 초기 상태 (state-machine 사용)
      ...createInitialState(DEFAULT_TIMER_SETTINGS.focusDuration),

      // 영속화 메타데이터
      savedAt: getLocalToday(),
      focusSessionStartMs: null,
      lastSavedMinute: 0,

      // 추가 상태
      settings: DEFAULT_TIMER_SETTINGS,
      pausedElapsedMs: 0,
      dashboardIsRunning: false,
      dashboardIsFocusPhase: true,
      _hasHydrated: false,

      // 이벤트 디스패치
      dispatch: (event: TimerEvent) => {
        const state = get()
        const { settings } = state

        // state-machine의 현재 상태 추출
        const currentTimerState: TimerState = {
          phase: state.phase,
          status: state.status,
          timeLeft: state.timeLeft,
          sessions: state.sessions,
          completedSessions: state.completedSessions,
          totalFocusMinutes: state.totalFocusMinutes,
          longBreakCount: state.longBreakCount,
          targetEndAtMs: state.targetEndAtMs,
        }

        // 상태 전이 실행
        const result = transition(currentTimerState, event, settings)

        // 불변조건 검증
        if (!validateInvariants(result.state)) {
          console.error('Timer state invariant violation detected')
        }

        // 세션 시작 시간 관리
        let focusSessionStartMs = state.focusSessionStartMs
        let pausedElapsedMs = state.pausedElapsedMs
        let lastSavedMinute = state.lastSavedMinute

        if (event.type === 'START') {
          if (state.phase === 'focus' && state.status === 'idle') {
            // 새 Focus 세션 시작
            focusSessionStartMs = Date.now()
            lastSavedMinute = 0
            pausedElapsedMs = 0
          }
        } else if (event.type === 'PAUSE') {
          if (state.status === 'running' && focusSessionStartMs !== null) {
            pausedElapsedMs = Date.now() - focusSessionStartMs
          }
        } else if (event.type === 'RESUME') {
          if (state.phase === 'focus' && pausedElapsedMs > 0) {
            focusSessionStartMs = Date.now() - pausedElapsedMs
          }
        } else if (event.type === 'SKIP' || event.type === 'RESET') {
          // Skip/Reset: 통계 저장 없이 상태만 초기화
          // CLAUDE.md 정책: "Skip/Reset은 통계에 반영하지 않음"
          focusSessionStartMs = null
          pausedElapsedMs = 0
          lastSavedMinute = 0
        } else if (event.type === 'TIME_UP') {
          // Focus 완료 시 통계 저장
          if (state.phase === 'focus') {
            handleFocusComplete(settings.focusDuration, lastSavedMinute)
          }
          focusSessionStartMs = null
          pausedElapsedMs = 0
          lastSavedMinute = 0
        }

        // 대시보드 플래그 업데이트
        const dashboardIsRunning = result.state.status === 'running'
        const dashboardIsFocusPhase = result.state.phase === 'focus'

        set({
          ...result.state,
          focusSessionStartMs,
          pausedElapsedMs,
          lastSavedMinute,
          savedAt: getLocalToday(),
          dashboardIsRunning,
          dashboardIsFocusPhase,
        })

        // 부수 효과 반환 (알림, 사운드)
        return result.sideEffects
      },

      // 편의 액션
      start: () => get().dispatch({ type: 'START' }),
      pause: () => get().dispatch({ type: 'PAUSE' }),
      resume: () => get().dispatch({ type: 'RESUME' }),
      skip: () => get().dispatch({ type: 'SKIP' }),
      reset: () => get().dispatch({ type: 'RESET' }),
      timeUp: () => get().dispatch({ type: 'TIME_UP' }),

      // 시간 업데이트 (wall-clock 기반)
      tick: () => {
        const { status, targetEndAtMs } = get()

        if (status !== 'running' || targetEndAtMs === null) {
          return
        }

        const now = Date.now()
        const newTimeLeft = Math.max(0, Math.ceil((targetEndAtMs - now) / 1000))

        set({ timeLeft: newTimeLeft })

        // 시간이 다 되면 TIME_UP 이벤트 발생
        if (newTimeLeft === 0) {
          get().dispatch({ type: 'TIME_UP' })
        }
      },

      // 설정 업데이트
      updateSettings: (settings: TimerSettings) => {
        const { status, phase } = get()

        set({ settings })

        // idle 상태일 때만 timeLeft 업데이트
        if (status === 'idle') {
          const newTimeLeft = getPhaseDuration(phase, settings)
          set({ timeLeft: newTimeLeft })
        }
      },

      // 외부에서 통계 로드 시
      setStats: (stats) => {
        set({
          sessions: stats.sessions ?? get().sessions,
          completedSessions: stats.completedSessions ?? get().completedSessions,
          totalFocusMinutes: stats.totalFocusMinutes ?? get().totalFocusMinutes,
        })
      },

      // 일일 통계 리셋 (store 내 통계만, 영구 저장소는 별도)
      resetDailyStats: () => {
        set({
          sessions: 0,
          completedSessions: 0,
          totalFocusMinutes: 0,
          longBreakCount: 0,
          phase: 'focus',
          status: 'idle',
          timeLeft: get().settings.focusDuration * 60,
          targetEndAtMs: null,
          focusSessionStartMs: null,
          lastSavedMinute: 0,
          pausedElapsedMs: 0,
          savedAt: getLocalToday(),
        })
      },

      // 세션 상태 동기화 (대시보드용) - deprecated
      syncSessionState: ({ sessionStartTime, isRunning, isFocusPhase }) => {
        set({
          focusSessionStartMs: sessionStartTime,
          dashboardIsRunning: isRunning,
          dashboardIsFocusPhase: isFocusPhase,
        })
      },

      // 1분 단위 자동 저장
      checkAndSaveMinute: (userId?: string, dailyGoal?: number) => {
        const { status, phase, focusSessionStartMs, lastSavedMinute } = get()

        if (status !== 'running' || phase !== 'focus' || focusSessionStartMs === null) {
          return
        }

        const elapsedMs = Date.now() - focusSessionStartMs
        const elapsedMinutes = Math.floor(elapsedMs / 60000)

        // 새로운 분이 경과했으면 저장
        if (elapsedMinutes > lastSavedMinute) {
          const minutesToSave = elapsedMinutes - lastSavedMinute

          // localStorage 저장 (모든 사용자)
          incrementLocalMinutes(minutesToSave)

          // lastSavedMinute 업데이트
          set({ lastSavedMinute: elapsedMinutes })

          // Supabase 저장은 호출자에서 처리 (userId 필요)
        }
      },

      // 복원 완료 설정
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
      },
    }),
    {
      name: 'pomobox-timer-state',
      storage: createJSONStorage(() => {
        // SSR 안전 처리
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          }
        }
        return localStorage
      }),

      // Focus 세션만 영속화 (Break/LongBreak 제외)
      partialize: (state) => {
        // Break/LongBreak는 저장하지 않음
        if (state.phase !== 'focus') {
          return {
            // 최소한의 메타데이터만 저장 (날짜 검증용)
            savedAt: state.savedAt,
            settings: state.settings,
          }
        }

        // idle 상태도 저장하지 않음 (진행 중인 세션만)
        if (state.status === 'idle') {
          return {
            savedAt: state.savedAt,
            settings: state.settings,
          }
        }

        // Focus 세션 running/paused 상태만 저장
        return {
          phase: state.phase,
          status: state.status,
          timeLeft: state.timeLeft,
          targetEndAtMs: state.targetEndAtMs,
          sessions: state.sessions,
          completedSessions: state.completedSessions,
          totalFocusMinutes: state.totalFocusMinutes,
          longBreakCount: state.longBreakCount,
          savedAt: state.savedAt,
          focusSessionStartMs: state.focusSessionStartMs,
          lastSavedMinute: state.lastSavedMinute,
          pausedElapsedMs: state.pausedElapsedMs,
          settings: state.settings,
        }
      },

      // 복원 시 처리
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('[timer-store] 복원 실패:', error)
          return
        }

        if (!state) {
          console.log('[timer-store] 저장된 상태 없음')
          return
        }

        const today = getLocalToday()
        const savedDate = state.savedAt

        // 날짜 검증: 다른 날이면 초기화
        if (savedDate !== today) {
          console.log('[timer-store] 날짜 변경 감지 → 초기화', { savedDate, today })
          state.resetDailyStats()
          state.setHasHydrated(true)
          return
        }

        // Focus 세션만 복원 (Break/LongBreak 무시)
        if (state.phase !== 'focus') {
          console.log('[timer-store] Focus 아님 → 복원 안 함', { phase: state.phase })
          state.setHasHydrated(true)
          return
        }

        // idle 상태는 복원할 필요 없음
        if (state.status === 'idle') {
          console.log('[timer-store] idle 상태 → 복원 안 함')
          state.setHasHydrated(true)
          return
        }

        // running 상태 복원: 만료 체크
        if (state.status === 'running' && state.targetEndAtMs) {
          const now = Date.now()

          if (now >= state.targetEndAtMs) {
            // 세션 만료 → 완료 처리
            console.log('[timer-store] 만료 세션 감지 → 자동 완료')
            handleExpiredSession(
              state.focusSessionStartMs,
              state.targetEndAtMs,
              state.lastSavedMinute,
              state.settings.focusDuration
            )

            // Break로 전환
            state.phase = 'break' as TimerPhase
            state.status = 'idle' as TimerStatus
            state.timeLeft = state.settings.breakDuration * 60
            state.targetEndAtMs = null
            state.focusSessionStartMs = null
            state.lastSavedMinute = 0
            state.pausedElapsedMs = 0
            state.sessions = (state.sessions || 0) + 1
            state.completedSessions = (state.completedSessions || 0) + 1
          } else {
            // 타이머 재시작: timeLeft 재계산
            const newTimeLeft = Math.ceil((state.targetEndAtMs - now) / 1000)
            console.log('[timer-store] 유효 세션 복원 → 자동 재시작', {
              originalTimeLeft: state.timeLeft,
              newTimeLeft,
            })
            state.timeLeft = newTimeLeft
          }
        }

        // paused 상태는 그대로 복원
        if (state.status === 'paused') {
          console.log('[timer-store] paused 상태 복원')
        }

        state.setHasHydrated(true)
      },
    }
  )
)

// 셀렉터 (성능 최적화용)
export const selectTimerStatus = (state: TimerStore) => state.status
export const selectTimerPhase = (state: TimerStore) => state.phase
export const selectTimeLeft = (state: TimerStore) => state.timeLeft
export const selectSessions = (state: TimerStore) => state.sessions
export const selectTotalFocusMinutes = (state: TimerStore) => state.totalFocusMinutes
export const selectIsRunning = (state: TimerStore) => state.dashboardIsRunning
export const selectIsFocusPhase = (state: TimerStore) => state.dashboardIsFocusPhase
export const selectSessionStartTime = (state: TimerStore) => state.focusSessionStartMs
export const selectHasHydrated = (state: TimerStore) => state._hasHydrated
export const selectTargetEndAtMs = (state: TimerStore) => state.targetEndAtMs
export const selectCompletedSessions = (state: TimerStore) => state.completedSessions
export const selectLongBreakCount = (state: TimerStore) => state.longBreakCount
export const selectLastSavedMinute = (state: TimerStore) => state.lastSavedMinute

/**
 * settings-store 구독 설정
 *
 * settings-store의 focusDuration/breakDuration 변경 시
 * timer-store의 settings를 자동으로 업데이트합니다.
 *
 * 이 함수는 앱 초기화 시 한 번 호출되어야 합니다.
 * (providers.tsx 또는 layout에서 호출)
 */
let settingsSubscriptionInitialized = false

export function initSettingsSubscription(): void {
  if (settingsSubscriptionInitialized) return
  if (typeof window === 'undefined') return // SSR 방지

  // 동적 import로 순환 의존성 방지
  import('./settings-store').then(({ useSettingsStore }) => {
    // 초기 동기화
    const { focusDuration, breakDuration } = useSettingsStore.getState()
    useTimerStore.getState().updateSettings({ focusDuration, breakDuration })

    // 변경 구독
    useSettingsStore.subscribe((state, prevState) => {
      if (
        state.focusDuration !== prevState.focusDuration ||
        state.breakDuration !== prevState.breakDuration
      ) {
        useTimerStore.getState().updateSettings({
          focusDuration: state.focusDuration,
          breakDuration: state.breakDuration,
        })
      }
    })

    settingsSubscriptionInitialized = true
  })
}
