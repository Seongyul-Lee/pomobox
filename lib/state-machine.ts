/**
 * Pomodoro Timer State Machine
 *
 * Pure function-based state machine for managing timer state transitions.
 * Stateless 앱 정책에 따라 localStorage 연동 없이 순수 상태 관리만 수행.
 */

export type TimerPhase = 'focus' | 'break' | 'longBreak'
export type TimerStatus = 'idle' | 'running' | 'paused'

/**
 * 타이머 상태
 *
 * Stateless 정책: 이 상태는 브라우저 세션에만 존재하며 영구 저장되지 않음
 */
export interface TimerState {
  phase: TimerPhase
  status: TimerStatus
  timeLeft: number // seconds
  sessions: number // 완료된 Focus 세션 수 (TIME_UP만 카운트)
  completedSessions: number // 종료된 Focus 세션 수 (TIME_UP + SKIP)
  totalFocusMinutes: number // 누적 Focus 시간 (완료된 세션만)
  longBreakCount: number // Long Break 시작 횟수
  targetEndAtMs: number | null // running일 때 종료 시각 (wall-clock 기반)
}

/**
 * 타이머 이벤트
 */
export type TimerEvent =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SKIP' }
  | { type: 'RESET' }
  | { type: 'TIME_UP' } // timeLeft === 0 && status === 'running'

/**
 * 타이머 설정 (전이 로직에 필요한 설정만)
 */
export interface TimerSettings {
  focusDuration: number // minutes
  breakDuration: number // minutes
}

/**
 * 전이 결과
 *
 * 새로운 상태 + 선택적 부수 효과 (알림, 사운드)
 */
export interface TransitionResult {
  state: TimerState
  sideEffects?: {
    notification?: {
      title: string
      body: string
    }
    sound?: boolean
  }
}

/**
 * 초기 상태 생성
 */
export function createInitialState(focusDurationMinutes: number): TimerState {
  return {
    phase: 'focus',
    status: 'idle',
    timeLeft: focusDurationMinutes * 60,
    sessions: 0,
    completedSessions: 0,
    totalFocusMinutes: 0,
    longBreakCount: 0,
    targetEndAtMs: null,
  }
}

/**
 * 상태 전이 함수 (순수 함수)
 *
 * @param state 현재 상태
 * @param event 이벤트
 * @param settings 타이머 설정
 * @returns 새로운 상태 + 부수 효과
 */
export function transition(
  state: TimerState,
  event: TimerEvent,
  settings: TimerSettings
): TransitionResult {
  switch (event.type) {
    case 'START':
      return handleStart(state)

    case 'PAUSE':
      return handlePause(state)

    case 'RESUME':
      return handleResume(state)

    case 'SKIP':
      return handleSkip(state, settings)

    case 'RESET':
      return handleReset(state, settings)

    case 'TIME_UP':
      return handleTimeUp(state, settings)

    default:
      // Exhaustiveness check
      const _exhaustive: never = event
      return { state }
  }
}

/**
 * START: idle → running
 */
function handleStart(state: TimerState): TransitionResult {
  if (state.status !== 'idle') {
    // 이미 실행 중이거나 일시정지 상태면 무시
    return { state }
  }

  const now = Date.now()
  return {
    state: {
      ...state,
      status: 'running',
      targetEndAtMs: now + state.timeLeft * 1000,
    },
  }
}

/**
 * PAUSE: running → paused
 */
function handlePause(state: TimerState): TransitionResult {
  if (state.status !== 'running') {
    // 실행 중이 아니면 무시
    return { state }
  }

  return {
    state: {
      ...state,
      status: 'paused',
      targetEndAtMs: null,
    },
  }
}

/**
 * RESUME: paused → running
 */
function handleResume(state: TimerState): TransitionResult {
  if (state.status !== 'paused') {
    // 일시정지 상태가 아니면 무시
    return { state }
  }

  const now = Date.now()
  return {
    state: {
      ...state,
      status: 'running',
      targetEndAtMs: now + state.timeLeft * 1000,
    },
  }
}

/**
 * SKIP: 현재 phase 강제 종료
 *
 * - Focus Skip: completedSessions++, 통계 불변, Short Break로 전환
 * - Break/LongBreak Skip: Focus로 전환
 */
function handleSkip(state: TimerState, settings: TimerSettings): TransitionResult {
  if (state.phase === 'focus') {
    // Focus Skip: completedSessions만 증가 (sessions, totalFocusMinutes 불변)
    const newCompletedSessions = state.completedSessions + 1

    // Skip된 Focus는 Long Break 트리거 안 함 (항상 Short Break)
    return {
      state: {
        ...state,
        status: 'idle',
        phase: 'break',
        timeLeft: settings.breakDuration * 60,
        completedSessions: newCompletedSessions,
        targetEndAtMs: null,
      },
    }
  } else {
    // Break/LongBreak Skip: Focus로 전환
    return {
      state: {
        ...state,
        status: 'idle',
        phase: 'focus',
        timeLeft: settings.focusDuration * 60,
        targetEndAtMs: null,
      },
    }
  }
}

/**
 * RESET: 초기 Focus 상태로 리셋
 *
 * PRD 요구사항: 통계는 불변 (sessions, completedSessions, totalFocusMinutes, longBreakCount 유지)
 */
function handleReset(state: TimerState, settings: TimerSettings): TransitionResult {
  return {
    state: {
      ...state, // 기존 통계 유지
      phase: 'focus',
      status: 'idle',
      timeLeft: settings.focusDuration * 60,
      targetEndAtMs: null,
    },
  }
}

/**
 * TIME_UP: 타이머 종료 (00:00 도달)
 *
 * - Focus 완료: sessions++, completedSessions++, totalFocusMinutes += focusDuration
 * - Long Break 트리거: completedSessions % 4 === 0
 * - Break/LongBreak 완료: Focus로 전환
 */
function handleTimeUp(state: TimerState, settings: TimerSettings): TransitionResult {
  // TIME_UP은 running 상태에서만 발생해야 함
  if (state.status !== 'running') {
    return { state }
  }

  if (state.phase === 'focus') {
    // Focus 완료: 통계 업데이트
    const newSessions = state.sessions + 1
    const newCompletedSessions = state.completedSessions + 1
    const newTotalFocusMinutes = state.totalFocusMinutes + settings.focusDuration

    // Long Break 트리거 체크 (completedSessions % 4 === 0)
    const shouldTriggerLongBreak = newCompletedSessions % 4 === 0

    if (shouldTriggerLongBreak) {
      return {
        state: {
          ...state,
          status: 'idle',
          phase: 'longBreak',
          timeLeft: 15 * 60,
          sessions: newSessions,
          completedSessions: newCompletedSessions,
          totalFocusMinutes: newTotalFocusMinutes,
          longBreakCount: state.longBreakCount + 1,
          targetEndAtMs: null,
        },
        sideEffects: {
          notification: {
            title: 'Focus session complete!',
            body: 'Time for a long break - you earned it!',
          },
          sound: true,
        },
      }
    } else {
      return {
        state: {
          ...state,
          status: 'idle',
          phase: 'break',
          timeLeft: settings.breakDuration * 60,
          sessions: newSessions,
          completedSessions: newCompletedSessions,
          totalFocusMinutes: newTotalFocusMinutes,
          targetEndAtMs: null,
        },
        sideEffects: {
          notification: {
            title: 'Focus session complete!',
            body: 'Time for a break',
          },
          sound: true,
        },
      }
    }
  } else {
    // Break/LongBreak 완료: Focus로 전환
    return {
      state: {
        ...state,
        status: 'idle',
        phase: 'focus',
        timeLeft: settings.focusDuration * 60,
        targetEndAtMs: null,
      },
      sideEffects: {
        notification: {
          title: 'Break time over!',
          body: 'Ready for another session?',
        },
        sound: true,
      },
    }
  }
}

/**
 * 불변조건 검증
 *
 * PRD Section 3의 5가지 정의 불변조건:
 * 1. sessions는 "완료 Focus" 횟수와 항상 동일
 * 2. totalFocusMinutes는 "완료 Focus들의 (각 Focus duration 합)"과 항상 동일
 * 3. Skip/Reset은 sessions와 totalFocusMinutes를 절대 변경하지 않음
 * 4. completedSessions는 "종료된 Focus" 횟수(완료+Skip)와 동일
 * 5. longBreakCount는 "completedSessions가 4의 배수로 도달하여 Long Break가 시작된 횟수"와 동일
 *
 * @param state 검증할 상태
 * @returns 불변조건 만족 여부
 */
export function validateInvariants(state: TimerState): boolean {
  // 1. sessions <= completedSessions (완료 세션은 종료 세션의 부분집합)
  if (state.sessions > state.completedSessions) {
    console.error('Invariant violated: sessions > completedSessions')
    return false
  }

  // 2. totalFocusMinutes는 음수가 아니어야 함
  if (state.totalFocusMinutes < 0) {
    console.error('Invariant violated: totalFocusMinutes < 0')
    return false
  }

  // 3. longBreakCount는 음수가 아니어야 함
  if (state.longBreakCount < 0) {
    console.error('Invariant violated: longBreakCount < 0')
    return false
  }

  // 4. timeLeft는 음수가 아니어야 함
  if (state.timeLeft < 0) {
    console.error('Invariant violated: timeLeft < 0')
    return false
  }

  // 5. running 상태일 때 targetEndAtMs는 null이 아니어야 함
  if (state.status === 'running' && state.targetEndAtMs === null) {
    console.error('Invariant violated: running but targetEndAtMs is null')
    return false
  }

  // 6. idle/paused 상태일 때 targetEndAtMs는 null이어야 함
  if (state.status !== 'running' && state.targetEndAtMs !== null) {
    console.error('Invariant violated: not running but targetEndAtMs is not null')
    return false
  }

  return true
}

/**
 * Phase별 기본 duration 계산 (seconds)
 */
export function getPhaseDuration(phase: TimerPhase, settings: TimerSettings): number {
  switch (phase) {
    case 'focus':
      return settings.focusDuration * 60
    case 'break':
      return settings.breakDuration * 60
    case 'longBreak':
      return 15 * 60 // Long Break는 고정 15분
  }
}
