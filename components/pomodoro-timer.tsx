"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"
import { playSound } from "@/lib/sounds"
import { useUser } from "@/hooks/use-user"
import { recordSessionComplete, incrementDailyMinutes } from "@/lib/supabase/stats"
import { getLocalTodayStats } from "@/lib/storage/local-stats"
import { GoalProgress } from "./goal-progress"
import { LoginPromptDialog } from "./login-prompt-dialog"
import { useTimerStore, useSettingsStore, useUIStore } from "@/lib/store"

const LOGIN_PROMPT_KEY = "hasShownLoginPrompt"

const TIMER_RADIUS = 140
const TIMER_STROKE_WIDTH = 10
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS

export function PomodoroTimer() {
  const searchParams = useSearchParams()
  const { user } = useUser()

  // Zustand stores
  const timerStore = useTimerStore()
  // 개별 셀렉터 사용 (무한 루프 방지)
  const focusDuration = useSettingsStore((state) => state.focusDuration)
  const breakDuration = useSettingsStore((state) => state.breakDuration)
  const dailyGoal = useSettingsStore((state) => state.dailyGoal)
  const notificationsEnabled = useSettingsStore((state) => state.notificationsEnabled)
  const soundEnabled = useSettingsStore((state) => state.soundEnabled)
  const soundType = useSettingsStore((state) => state.soundType)
  const volume = useSettingsStore((state) => state.volume)
  const setFocusDuration = useSettingsStore((state) => state.setFocusDuration)

  // Test-only: ?testDuration=10 sets focus duration to 10 seconds
  const testDurationSec = searchParams.get('testDuration')
    ? parseInt(searchParams.get('testDuration')!, 10)
    : null

  // 로컬 UI 상태 (영속화 불필요)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [localTotalMinutes, setLocalTotalMinutes] = useState(0)
  const [localSessions, setLocalSessions] = useState(0)

  // UI store for Settings Dialog
  const openSettings = useUIStore((state) => state.openSettings)

  // Store에서 상태 추출
  const {
    phase,
    status,
    timeLeft,
    sessions,
    completedSessions,
    targetEndAtMs,
    _hasHydrated,
    start,
    pause,
    resume,
    skip,
    reset,
    tick,
    updateSettings,
    checkAndSaveMinute,
  } = timerStore

  // 설정 동기화는 providers.tsx의 initSettingsSubscription()이 자동 처리
  // (settings-store → timer-store 자동 구독)

  // localStorage에서 오늘 통계 복원 (초기 로드 시)
  useEffect(() => {
    const localStats = getLocalTodayStats()
    setLocalTotalMinutes(localStats.totalMinutes)
    setLocalSessions(localStats.totalSessions)
  }, [])

  // testDuration 적용 (테스트 모드)
  // settings-store를 업데이트하여 SSOT 유지 (initSettingsSubscription이 timer-store에 반영)
  useEffect(() => {
    if (testDurationSec !== null && testDurationSec > 0 && phase === 'focus' && status === 'idle') {
      const testDurationMin = testDurationSec / 60
      // settings-store 업데이트 (SSOT)
      setFocusDuration(testDurationMin)
      // timer-store도 직접 업데이트 (즉시 반영용)
      updateSettings({
        focusDuration: testDurationMin,
        breakDuration,
      })
    }
  }, [testDurationSec, phase, status, setFocusDuration, breakDuration, updateSettings])

  // 타이머 계산
  const getDuration = useCallback(() => {
    if (phase === 'focus') {
      if (testDurationSec !== null && testDurationSec > 0) {
        return testDurationSec
      }
      return focusDuration * 60
    }
    if (phase === 'longBreak') return 15 * 60
    return breakDuration * 60
  }, [phase, testDurationSec, focusDuration, breakDuration])

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
    if (notificationsEnabled && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [notificationsEnabled])

  // Tick: 매초 시간 업데이트 + 부수효과 처리
  useEffect(() => {
    if (status !== 'running' || targetEndAtMs === null) return

    const updateTimer = () => {
      tick()

      // timeLeft가 0이 되면 부수효과 처리
      const currentTimeLeft = useTimerStore.getState().timeLeft
      const currentPhase = useTimerStore.getState().phase
      const currentStatus = useTimerStore.getState().status

      // 세션 완료 시 알림/사운드/통계
      if (currentTimeLeft === 0 && currentStatus === 'idle') {
        // 알림
        if (notificationsEnabled && Notification.permission === "granted") {
          const message = currentPhase === 'break' || currentPhase === 'longBreak'
            ? "Ready for another session?"
            : "Time for a break"
          new Notification(
            currentPhase === 'break' || currentPhase === 'longBreak'
              ? "Break time over!"
              : "Focus session complete!",
            { body: message, icon: "/icon.png" }
          )
        }

        // 사운드
        if (soundEnabled) {
          playSound(soundType, volume / 100)
        }

        // 로컬 통계 갱신
        const localStats = getLocalTodayStats()
        setLocalTotalMinutes(localStats.totalMinutes)
        setLocalSessions(localStats.totalSessions)

        // 목표 달성 시 confetti
        const previousTotal = localTotalMinutes
        const newTotal = localStats.totalMinutes
        if (previousTotal < dailyGoal && newTotal >= dailyGoal) {
          import("canvas-confetti").then(({ default: confetti }) => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
          })
        }

        // Supabase 저장 (로그인 사용자만)
        if (user && currentPhase === 'break') {
          recordSessionComplete(user.id, focusDuration, dailyGoal)
        }

        // 비로그인 사용자: 첫 세션 완료 시 로그인 유도
        if (!user && currentPhase === 'break') {
          if (typeof window !== "undefined" && !localStorage.getItem(LOGIN_PROMPT_KEY)) {
            setShowLoginPrompt(true)
            localStorage.setItem(LOGIN_PROMPT_KEY, "true")
          }
        }
      }
    }

    updateTimer()
    const id = window.setInterval(updateTimer, 1000)

    const handleVisibilityChange = () => {
      if (!document.hidden) updateTimer()
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.clearInterval(id)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [status, targetEndAtMs, tick, notificationsEnabled, soundEnabled, soundType, volume, dailyGoal, focusDuration, user, localTotalMinutes])

  // 1분마다 자동 저장 (Focus 세션 중에만)
  useEffect(() => {
    if (status !== 'running' || phase !== 'focus') return

    const intervalId = setInterval(() => {
      checkAndSaveMinute()

      // Supabase 저장 (로그인 사용자만)
      const { lastSavedMinute, focusSessionStartMs } = useTimerStore.getState()
      if (user && focusSessionStartMs) {
        const elapsedMs = Date.now() - focusSessionStartMs
        const elapsedMinutes = Math.floor(elapsedMs / 60000)
        if (elapsedMinutes > lastSavedMinute) {
          const minutesToSave = elapsedMinutes - lastSavedMinute
          incrementDailyMinutes(user.id, minutesToSave, dailyGoal).catch(console.error)
        }
      }

      // 로컬 통계 갱신
      const localStats = getLocalTodayStats()
      setLocalTotalMinutes(localStats.totalMinutes)
    }, 5000) // 5초마다 체크

    return () => clearInterval(intervalId)
  }, [status, phase, checkAndSaveMinute, user, dailyGoal])

  // 액션 핸들러
  const handleStart = useCallback(() => {
    start()
  }, [start])

  const handlePause = useCallback(() => {
    pause()
  }, [pause])

  const handleResume = useCallback(() => {
    resume()
  }, [resume])

  const handleReset = useCallback(() => {
    // CLAUDE.md 정책: "Skip/Reset은 통계에 반영하지 않음"
    // 통계 저장 없이 상태만 초기화
    reset()
  }, [reset])

  const handleSkip = useCallback(() => {
    // CLAUDE.md 정책: "Skip/Reset은 통계에 반영하지 않음"
    // 통계 저장 없이 상태만 초기화
    skip()
  }, [skip])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('[role="dialog"]')
      ) {
        return
      }

      if (e.code === 'Space') {
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

  // 복원 전 로딩 상태 (hydration 완료 대기)
  if (!_hasHydrated) {
    return (
      <div className="relative flex flex-col items-center gap-6 sm:gap-8">
        <div className="text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground uppercase tracking-wider mb-1">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col items-center gap-6 sm:gap-8">
      <div className="text-center relative">
        <p className="max-sm:text-[1.625rem] max-sm:leading-[1.2] max-sm:tracking-[0.02em] max-sm:font-semibold max-sm:bg-[linear-gradient(135deg,var(--timer-title-from)_0%,var(--timer-title-via)_50%,var(--timer-title-to)_100%)] max-sm:bg-clip-text max-sm:text-transparent sm:text-xl md:text-2xl sm:font-bold sm:text-foreground sm:uppercase sm:tracking-wider mb-0.5 sm:mb-1 hover-title-outline">
          {getTypeLabel()}
        </p>
        <p className="max-sm:text-[0.8125rem] max-sm:tracking-[0.025em] max-sm:text-[var(--timer-subtitle)] max-sm:mt-1.5 sm:text-xs sm:text-muted-foreground sm:mt-0 hover-phase-label">
          {getTypeDescription()}
        </p>
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-opacity duration-200 ${
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

      <div className="relative flex items-center justify-center group">
        {/* Progress ring - non-interactive */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${getTypeLabel()} progress: ${Math.round(progress)}%`}
        >
          <svg className={`w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 -rotate-90 hover-ring ${status === 'running' ? 'timer-pulse' : ''}`} viewBox="0 0 300 300" aria-hidden="true">
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
            <filter id="timerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="150"
            cy="150"
            r={TIMER_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={TIMER_STROKE_WIDTH}
            className="text-slate-200 dark:text-[oklch(100%_0_0/0.08)] transition-all duration-300"
          />
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
        </div>
        {/* Timer display button - interactive, outside progressbar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={openSettings}
            className="text-5xl sm:text-6xl md:text-7xl font-mono font-bold tracking-tight tabular-nums text-foreground hover-timer-display cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg transition-all duration-200"
            aria-label={`${minutes} minutes ${seconds} seconds remaining. Click to open settings.`}
          >
            <span
              role="timer"
              aria-live="off"
              aria-atomic="true"
            >
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </button>
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
          <span className="hidden sm:inline">Today: {localSessions} sessions ({localTotalMinutes} min)</span>
          <span className="sm:hidden">{localSessions} sessions · {localTotalMinutes}m</span>
        </span>
      </div>

      <GoalProgress
        currentMinutes={localTotalMinutes}
        goalMinutes={dailyGoal}
      />

      <LoginPromptDialog
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
      />
    </div>
  )
}
