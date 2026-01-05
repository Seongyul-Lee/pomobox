"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"
import { playSound } from "@/lib/sounds"
import { useUser } from "@/hooks/use-user"
import { recordSessionComplete, incrementDailyMinutes } from "@/lib/supabase/stats"
import { getLocalTodayStats, incrementLocalMinutes, saveLocalTodayStats } from "@/lib/storage/local-stats"
import { incrementHistorySession } from "@/lib/storage/local-history"
import { GoalProgress } from "./goal-progress"
import { LoginPromptDialog } from "./login-prompt-dialog"
import { useTimerStore, useSettingsStore } from "@/lib/store"

const LOGIN_PROMPT_KEY = "hasShownLoginPrompt"

type TimerPhase = 'focus' | 'break' | 'longBreak'
type TimerStatus = 'idle' | 'running' | 'paused'

const TIMER_RADIUS = 140
const TIMER_STROKE_WIDTH = 10
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS

export function PomodoroTimer() {
  const searchParams = useSearchParams()
  const { user } = useUser()

  // Zustand stores
  const syncSessionState = useTimerStore(state => state.syncSessionState)
  const settingsStore = useSettingsStore()

  // Test-only: ?testDuration=10 sets focus duration to 10 seconds
  const testDurationSec = searchParams.get('testDuration')
    ? parseInt(searchParams.get('testDuration')!, 10)
    : null

  // 로컬 상태 (Zustand와 동기화)
  const [phase, setPhase] = useState<TimerPhase>('focus')
  const [timeLeft, setTimeLeft] = useState(settingsStore.focusDuration * 60)
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [sessions, setSessions] = useState(0)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0)
  const [longBreakCount, setLongBreakCount] = useState(0)
  const [targetEndAtMs, setTargetEndAtMs] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Focus 세션 시작 시간 (경과 시간 계산용)
  const focusSessionStartRef = useRef<number | null>(null)
  // 마지막으로 저장된 분 (1분 단위 증분 저장용)
  const lastSavedMinuteRef = useRef<number>(0)

  // localStorage에서 오늘 통계 복원
  useEffect(() => {
    setTimeLeft(settingsStore.focusDuration * 60)

    const localStats = getLocalTodayStats()
    setTotalFocusMinutes(localStats.totalMinutes)
    setSessions(localStats.totalSessions)
  }, [settingsStore.focusDuration])

  const getDuration = () => {
    if (phase === 'focus') {
      // Test mode: use testDuration (in seconds) if provided
      if (testDurationSec !== null && testDurationSec > 0) {
        return testDurationSec
      }
      return settingsStore.focusDuration * 60
    }
    if (phase === 'longBreak') return 15 * 60
    return settingsStore.breakDuration * 60
  }

  // Initialize timeLeft when testDuration is provided
  useEffect(() => {
    if (testDurationSec !== null && testDurationSec > 0 && phase === 'focus' && status === 'idle') {
      setTimeLeft(testDurationSec)
    }
  }, [testDurationSec, phase, status])

  const duration = getDuration()
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((duration - timeLeft) / duration) * 100

  // Browser title update
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const title = phase === 'focus' ? 'Pomobox' : phase === 'longBreak' ? 'Long Break' : 'Break'
      document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - ${title}`
    }
  }, [timeLeft, phase, minutes, seconds])

  // Request notification permission
  useEffect(() => {
    if (settingsStore.notificationsEnabled && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [settingsStore.notificationsEnabled])

  // Initialize / clear target end time for time-based timer
  useEffect(() => {
    if (status === 'running' && targetEndAtMs === null) {
      setTargetEndAtMs(Date.now() + timeLeft * 1000)
      return
    }
    if (status !== 'running' && targetEndAtMs !== null) {
      setTargetEndAtMs(null)
    }
  }, [status, targetEndAtMs, timeLeft])

  // Tick: recompute remaining time from wall-clock (prevents background drift)
  useEffect(() => {
    if (status !== 'running' || targetEndAtMs === null) return

    const updateTimeLeft = () => {
      const remainingSeconds = Math.max(0, Math.ceil((targetEndAtMs - Date.now()) / 1000))
      setTimeLeft(remainingSeconds)
    }

    updateTimeLeft()
    const id = window.setInterval(updateTimeLeft, 1000)

    const handleVisibilityChange = () => {
      if (!document.hidden) updateTimeLeft()
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.clearInterval(id)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [status, targetEndAtMs])

  // Zustand store와 세션 상태 동기화 (대시보드 실시간 업데이트용)
  useEffect(() => {
    // Focus phase일 때 sessionStartTime 전달 (running/paused 모두)
    // Pause 시에도 sessionStartTime을 유지해야 대시보드 시간이 초기화되지 않음
    const sessionStartTime = phase === 'focus'
      ? focusSessionStartRef.current
      : null

    syncSessionState({
      sessionStartTime,
      isRunning: status === 'running',
      isFocusPhase: phase === 'focus',
    })
  }, [status, phase, syncSessionState])

  // 1분마다 자동 저장 (Focus 세션 중에만)
  useEffect(() => {
    if (status !== 'running' || phase !== 'focus' || focusSessionStartRef.current === null) {
      return
    }

    const checkAndSave = () => {
      if (focusSessionStartRef.current === null) return

      const elapsedMs = Date.now() - focusSessionStartRef.current
      const elapsedMinutes = Math.floor(elapsedMs / 60000)

      // 새로운 분이 경과했으면 저장
      if (elapsedMinutes > lastSavedMinuteRef.current) {
        const minutesToSave = elapsedMinutes - lastSavedMinuteRef.current
        lastSavedMinuteRef.current = elapsedMinutes

        // localStorage 저장 (모든 사용자)
        incrementLocalMinutes(minutesToSave)

        // Supabase 저장 (로그인 사용자만)
        if (user) {
          incrementDailyMinutes(user.id, minutesToSave, settingsStore.dailyGoal).catch(err => {
            console.error("Failed to save to Supabase:", err)
          })
        }
      }
    }

    // 5초마다 체크 (1초는 과하고, 1분은 느림)
    const intervalId = setInterval(checkAndSave, 5000)

    return () => clearInterval(intervalId)
  }, [status, phase, user, settingsStore.dailyGoal])

  // Phase transition when timer hits 0
  useEffect(() => {
    if (!(timeLeft === 0 && status === 'running')) return
    if (isTransitioning) return // Prevent duplicate transition

    setIsTransitioning(true)
    setStatus('idle')
    setTargetEndAtMs(null)

    // Notifications and sound
    if (settingsStore.notificationsEnabled && Notification.permission === "granted") {
      const message = phase === 'focus'
        ? "Time for a break"
        : "Ready for another session?"
      new Notification(
        phase === 'focus' ? "Focus session complete!" : "Break time over!",
        { body: message, icon: "/icon.png" }
      )
    }

    if (settingsStore.soundEnabled) {
      playSound(settingsStore.soundType, settingsStore.volume / 100)
    }

    if (phase === 'focus') {
      const newCompleted = completedSessions + 1
      setCompletedSessions(newCompleted)

      const newSessions = sessions + 1
      setSessions(newSessions)

      // 남은 분 계산 (이미 1분마다 저장했으므로 중복 방지)
      const remainingMinutes = settingsStore.focusDuration - lastSavedMinuteRef.current

      // localStorage에 남은 분 저장 + 세션 카운트 증가
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

      // localStorage에서 최신 값 읽어와서 state 동기화
      const updatedStats = getLocalTodayStats()
      const newTotal = updatedStats.totalMinutes
      setTotalFocusMinutes(newTotal)

      // 목표 달성 시 confetti 애니메이션 (동적 import)
      const previousTotal = totalFocusMinutes
      if (previousTotal < settingsStore.dailyGoal && newTotal >= settingsStore.dailyGoal) {
        import("canvas-confetti").then(({ default: confetti }) => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        })
      }

      // 로그인 사용자: Supabase에 남은 분 저장 + 세션 완료 기록
      if (user) {
        // 남은 분 저장
        if (remainingMinutes > 0) {
          incrementDailyMinutes(user.id, remainingMinutes, settingsStore.dailyGoal).catch(console.error)
        }
        // 세션 완료 기록 (세션 카운트 증가)
        recordSessionComplete(user.id, 0) // duration=0으로 세션만 기록
      } else {
        // 비로그인 사용자: 첫 세션 완료 시 로그인 유도 다이얼로그 표시
        if (typeof window !== "undefined" && !localStorage.getItem(LOGIN_PROMPT_KEY)) {
          setShowLoginPrompt(true)
          localStorage.setItem(LOGIN_PROMPT_KEY, "true")
        }
      }

      // lastSavedMinuteRef 초기화
      lastSavedMinuteRef.current = 0

      // Focus 세션 종료
      focusSessionStartRef.current = null

      // Long Break every 4 completed sessions (not skipped)
      if (newCompleted % 4 === 0) {
        setPhase('longBreak')
        setTimeLeft(15 * 60)
        setLongBreakCount(prev => prev + 1)
      } else {
        setPhase('break')
        setTimeLeft(settingsStore.breakDuration * 60)
      }
    } else {
      // 휴식 완료 → Focus로 전환
      setPhase('focus')

      const focusDuration = testDurationSec !== null && testDurationSec > 0
        ? testDurationSec
        : settingsStore.focusDuration * 60
      setTimeLeft(focusDuration)
    }

    setIsTransitioning(false) // Reset flag after transition
  }, [timeLeft, status, phase, settingsStore, completedSessions, totalFocusMinutes, sessions, isTransitioning, testDurationSec, user])

  const handleStart = useCallback(() => {
    if (isTransitioning) return

    // Focus 세션 시작 시 시작 시간 설정 (상태 변경 전에 설정해야 useEffect에서 참조 가능)
    if (phase === 'focus') {
      focusSessionStartRef.current = Date.now()
    }

    setStatus('running')
  }, [isTransitioning, phase])

  const handlePause = useCallback(() => {
    if (isTransitioning) return
    setStatus('paused')
    setTargetEndAtMs(null)
  }, [isTransitioning])

  const handleResume = useCallback(() => {
    if (isTransitioning) return
    setStatus('running')
  }, [isTransitioning])

  const handleReset = useCallback(() => {
    if (isTransitioning) return

    // Focus 세션 중 Reset 시: 이미 저장된 분 이후 남은 분만 저장
    if (phase === 'focus' && focusSessionStartRef.current !== null) {
      const elapsedMs = Date.now() - focusSessionStartRef.current
      const elapsedMinutes = Math.floor(elapsedMs / 60000)
      const remainingMinutes = elapsedMinutes - lastSavedMinuteRef.current

      // 남은 분이 있으면 저장 (세션 카운트는 증가 안함)
      if (remainingMinutes > 0) {
        incrementLocalMinutes(remainingMinutes)

        if (user) {
          incrementDailyMinutes(user.id, remainingMinutes, settingsStore.dailyGoal).catch(console.error)
        }
      }

      // localStorage에서 최신 값 읽어와서 state 동기화
      const updatedStats = getLocalTodayStats()
      setTotalFocusMinutes(updatedStats.totalMinutes)
    }

    // lastSavedMinuteRef 초기화
    lastSavedMinuteRef.current = 0

    // ref 초기화
    focusSessionStartRef.current = null

    setStatus('idle')
    setTargetEndAtMs(null)
    setPhase('focus')

    const focusDuration = testDurationSec !== null && testDurationSec > 0
      ? testDurationSec
      : settingsStore.focusDuration * 60
    setTimeLeft(focusDuration)
  }, [settingsStore.focusDuration, settingsStore.dailyGoal, isTransitioning, testDurationSec, phase, user])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore shortcuts in Input, Textarea, Dialog
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('[role="dialog"]')
      ) {
        return
      }

      if (e.code === 'Space') {
        // 버튼에 포커스된 경우 기본 동작(버튼 클릭) 허용
        if (target.tagName === 'BUTTON' || target.closest('button')) {
          return
        }
        e.preventDefault()
        if (status === 'running') {
          handlePause()
        } else if (status === 'paused') {
          handleResume()
        } else {
          handleStart()
        }
      } else if (e.code === 'Escape') {
        handlePause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [status, handlePause, handleResume, handleStart])

  const handleSkip = useCallback(() => {
    if (isTransitioning) return

    // Focus 세션 스킵 시: 이미 저장된 분 이후 남은 분만 저장
    if (phase === 'focus' && focusSessionStartRef.current !== null) {
      const elapsedMs = Date.now() - focusSessionStartRef.current
      const elapsedMinutes = Math.floor(elapsedMs / 60000)
      const remainingMinutes = elapsedMinutes - lastSavedMinuteRef.current

      // 남은 분이 있으면 저장 (세션 카운트는 증가 안함)
      if (remainingMinutes > 0) {
        incrementLocalMinutes(remainingMinutes)

        if (user) {
          incrementDailyMinutes(user.id, remainingMinutes, settingsStore.dailyGoal).catch(console.error)
        }
      }

      // localStorage에서 최신 값 읽어와서 state 동기화
      const updatedStats = getLocalTodayStats()
      setTotalFocusMinutes(updatedStats.totalMinutes)
    }

    // lastSavedMinuteRef 초기화
    lastSavedMinuteRef.current = 0

    setStatus('idle')
    setTargetEndAtMs(null)

    if (phase === 'focus') {
      // Skip increments completedSessions but NOT sessions
      const newCompleted = completedSessions + 1
      setCompletedSessions(newCompleted)

      // Focus 종료
      focusSessionStartRef.current = null

      // Always go to Short Break when skipping Focus
      setPhase('break')
      setTimeLeft(settingsStore.breakDuration * 60)
    } else {
      // 휴식 → Focus로 전환
      setPhase('focus')
      setTimeLeft(settingsStore.focusDuration * 60)
    }
  }, [phase, settingsStore, completedSessions, isTransitioning, user])

  const getTypeLabel = () => {
    if (phase === 'focus') return "Focus Session"
    if (phase === 'longBreak') return "Long Break"
    return "Break Time"
  }

  const getTypeDescription = () => {
    if (phase === 'focus') return "Stay focused"
    if (phase === 'longBreak') return "Take a longer break"
    return "Take a short break"
  }

  return (
    <div className="relative flex flex-col items-center gap-6 sm:gap-8">
      <div className="text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground uppercase tracking-wider mb-1 hover-title-outline">
          {getTypeLabel()}
        </p>
        <p className="text-xs text-muted-foreground mb-2 hover-phase-label">
          {getTypeDescription()}
        </p>
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-opacity duration-200 ${
            status === 'paused'
              ? 'bg-amber-500 opacity-100 visible animate-pulse'
              : 'opacity-0 invisible'
          }`}
          role="status"
          aria-live="polite"
        >
          <Pause className="h-3 w-3 text-[oklch(100%_0_0)]" />
          <span className="text-xs font-medium text-[oklch(100%_0_0)] uppercase tracking-wide">
            {status === 'paused' ? "Paused" : ''}
          </span>
        </div>
      </div>

      <div
        className="relative flex items-center justify-center group"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${getTypeLabel()} progress: ${Math.round(progress)}%`}
      >
        <svg className={`w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 -rotate-90 hover-ring ${status === 'running' ? 'timer-pulse' : ''}`} viewBox="0 0 300 300" aria-hidden="true">
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="timerGradientFocus" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(72% 0.25 280)" />
              <stop offset="50%" stopColor="oklch(65% 0.28 300)" />
              <stop offset="100%" stopColor="oklch(72% 0.25 280)" />
            </linearGradient>
            <linearGradient id="timerGradientBreak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(72% 0.20 145)" />
              <stop offset="100%" stopColor="oklch(65% 0.25 160)" />
            </linearGradient>
            <linearGradient id="timerGradientLongBreak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(70% 0.18 220)" />
              <stop offset="100%" stopColor="oklch(65% 0.22 240)" />
            </linearGradient>
            <linearGradient id="timerGradientPaused" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(75% 0.18 85)" />
              <stop offset="100%" stopColor="oklch(70% 0.20 70)" />
            </linearGradient>
            {/* Glow filter */}
            <filter id="timerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Background track */}
          <circle
            cx="150"
            cy="150"
            r={TIMER_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={TIMER_STROKE_WIDTH}
            className="text-slate-200 dark:text-[oklch(100%_0_0/0.08)] transition-all duration-300"
          />
          {/* Progress arc with gradient */}
          <circle
            cx="150"
            cy="150"
            r={TIMER_RADIUS}
            fill="none"
            stroke={
              status === 'paused'
                ? 'url(#timerGradientPaused)'
                : phase === 'focus'
                ? 'url(#timerGradientFocus)'
                : phase === 'longBreak'
                ? 'url(#timerGradientLongBreak)'
                : 'url(#timerGradientBreak)'
            }
            strokeWidth={TIMER_STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={TIMER_CIRCUMFERENCE}
            strokeDashoffset={TIMER_CIRCUMFERENCE - (progress / 100) * TIMER_CIRCUMFERENCE}
            filter={status === 'running' ? 'url(#timerGlow)' : undefined}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-5xl sm:text-6xl md:text-7xl font-mono font-bold tracking-tight tabular-nums text-foreground hover-timer-display"
            role="timer"
            aria-live="off"
            aria-atomic="true"
            aria-label={`${minutes} minutes ${seconds} seconds remaining`}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {status === 'running' ? (
            <Button size="lg" onClick={handlePause} variant="secondary" className="gap-2 px-6 sm:px-8 border-2 border-border dark:border-transparent hover:scale-105 transition-transform duration-200">
              <Pause className="h-5 w-5" />
              Pause
            </Button>
          ) : status === 'paused' ? (
            <Button size="lg" onClick={handleResume} className="gap-2 px-6 sm:px-8 glow-primary hover-glow hover-shine">
              <Play className="h-5 w-5" />
              Resume
            </Button>
          ) : (
            <Button size="lg" onClick={handleStart} className="gap-2 px-6 sm:px-8 glow-primary hover-glow hover-shine">
              <Play className="h-5 w-5" />
              Start
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={handleReset} aria-label="Reset timer" className="hover:scale-105 hover:bg-muted/50 transition-all duration-200">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleSkip}
          aria-label={phase === 'focus' ? "Skip current focus session and start break" : "Skip current break and return to focus session"}
          className="group gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground/60 border border-muted-foreground/30 rounded-xl hover:bg-muted/50 hover:scale-105 transition-all duration-200"
        >
          <SkipForward className="h-4 w-4 drop-shadow-md transition-transform duration-200 group-hover:translate-x-0.5" />
          <span className="hidden sm:inline">{phase === 'focus' ? "Skip to Break" : "Back to Focus"}</span>
          <span className="sm:hidden">{phase === 'focus' ? "Skip" : "Focus"}</span>
        </Button>
      </div>

      <div className="text-muted-foreground text-xs sm:text-sm font-medium hover-today-stats">
        <span className="text-foreground">
          <span className="hidden sm:inline">Today: {sessions} sessions ({totalFocusMinutes} min)</span>
          <span className="sm:hidden">{sessions} sessions · {totalFocusMinutes}m</span>
        </span>
      </div>

      <GoalProgress
        currentMinutes={totalFocusMinutes}
        goalMinutes={settingsStore.dailyGoal}
      />

      {/* Login Prompt Dialog for non-logged-in users */}
      <LoginPromptDialog
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
      />
    </div>
  )
}
