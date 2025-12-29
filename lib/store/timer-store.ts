/**
 * Timer Store (Zustand)
 *
 * 타이머 상태를 중앙 관리하는 Zustand store.
 * state-machine.ts의 순수 함수를 내부적으로 사용하여 상태 전이.
 */

import { create } from 'zustand'
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

// 타이머 store에서 관리할 추가 상태
interface TimerStoreState extends TimerState {
  // 설정 (settings-store와 동기화 필요)
  settings: TimerSettings

  // Focus 세션 시작 시간 (경과 시간 계산용)
  sessionStartTime: number | null

  // 일시정지 시 누적 시간
  pausedElapsedMs: number
}

// 타이머 액션
interface TimerStoreActions {
  // 이벤트 디스패치 (state-machine transition 호출)
  dispatch: (event: TimerEvent) => void

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
}

type TimerStore = TimerStoreState & TimerStoreActions

const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
}

export const useTimerStore = create<TimerStore>()((set, get) => ({
  // 초기 상태 (state-machine 사용)
  ...createInitialState(DEFAULT_SETTINGS.focusDuration),

  // 추가 상태
  settings: DEFAULT_SETTINGS,
  sessionStartTime: null,
  pausedElapsedMs: 0,

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
    let sessionStartTime = state.sessionStartTime
    let pausedElapsedMs = state.pausedElapsedMs

    if (event.type === 'START') {
      if (state.phase === 'focus') {
        sessionStartTime = Date.now() - pausedElapsedMs
      }
    } else if (event.type === 'PAUSE') {
      if (state.status === 'running' && sessionStartTime !== null) {
        pausedElapsedMs = Date.now() - sessionStartTime
      }
    } else if (event.type === 'RESUME') {
      if (state.phase === 'focus' && pausedElapsedMs > 0) {
        sessionStartTime = Date.now() - pausedElapsedMs
      }
    } else if (event.type === 'SKIP' || event.type === 'RESET' || event.type === 'TIME_UP') {
      sessionStartTime = null
      pausedElapsedMs = 0
    }

    set({
      ...result.state,
      sessionStartTime,
      pausedElapsedMs,
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
    })
  },
}))

// 셀렉터 (성능 최적화용)
export const selectTimerStatus = (state: TimerStore) => state.status
export const selectTimerPhase = (state: TimerStore) => state.phase
export const selectTimeLeft = (state: TimerStore) => state.timeLeft
export const selectSessions = (state: TimerStore) => state.sessions
export const selectTotalFocusMinutes = (state: TimerStore) => state.totalFocusMinutes
export const selectIsRunning = (state: TimerStore) => state.status === 'running'
export const selectIsFocusPhase = (state: TimerStore) => state.phase === 'focus'
export const selectSessionStartTime = (state: TimerStore) => state.sessionStartTime
