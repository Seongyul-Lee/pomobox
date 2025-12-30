"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"
import { SettingsDialog } from "./settings-dialog"
import { playSound } from "@/lib/sounds"
import { useUser } from "@/hooks/use-user"
import { recordSessionComplete, incrementDailyMinutes } from "@/lib/supabase/stats"
import { getLocalTodayStats, incrementLocalMinutes, saveLocalTodayStats } from "@/lib/storage/local-stats"
import { GoalProgress } from "./goal-progress"
import { useTimerStore, useSettingsStore, type TimerSettings } from "@/lib/store"

type TimerPhase = 'focus' | 'break' | 'longBreak'
type TimerStatus = 'idle' | 'running' | 'paused'

const TIMER_RADIUS = 140
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS

export function PomodoroTimer() {
  const t = useTranslations("Timer")
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
      // 세션 카운트 증가
      const localStats = getLocalTodayStats()
      saveLocalTodayStats({
        ...localStats,
        totalSessions: localStats.totalSessions + 1,
      })

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

  const handleSettingsChange = (newSettings: TimerSettings) => {
    // Zustand store 업데이트 (자동으로 localStorage에 저장됨)
    settingsStore.updateSettings(newSettings)

    if (status !== 'running') {
      if (phase === 'focus') {
        setTimeLeft(newSettings.focusDuration * 60)
      } else if (phase === 'break') {
        setTimeLeft(newSettings.breakDuration * 60)
      }
    }
  }

  const getTypeLabel = () => {
    if (phase === 'focus') return t('focusSession')
    if (phase === 'longBreak') return t('longBreak')
    return t('breakTime')
  }

  const getTypeDescription = () => {
    if (phase === 'focus') return t('focusDescription')
    if (phase === 'longBreak') return t('longBreakDescription')
    return t('breakDescription')
  }

  // 현재 settings 객체 구성 (SettingsDialog용) - 메모이제이션으로 불필요한 리렌더링 방지
  const currentSettings: TimerSettings = useMemo(() => ({
    focusDuration: settingsStore.focusDuration,
    breakDuration: settingsStore.breakDuration,
    dailyGoal: settingsStore.dailyGoal,
    notificationsEnabled: settingsStore.notificationsEnabled,
    soundEnabled: settingsStore.soundEnabled,
    soundCategory: settingsStore.soundCategory,
    soundType: settingsStore.soundType,
    volume: settingsStore.volume,
  }), [
    settingsStore.focusDuration,
    settingsStore.breakDuration,
    settingsStore.dailyGoal,
    settingsStore.notificationsEnabled,
    settingsStore.soundEnabled,
    settingsStore.soundCategory,
    settingsStore.soundType,
    settingsStore.volume,
  ])

  return (
    <div className="relative flex flex-col items-center gap-8">
      <div className="absolute top-4 right-4">
        <SettingsDialog
          settings={currentSettings}
          isRunning={status === 'running'}
          onSettingsChange={handleSettingsChange}
          buttonClassName="hover-rotate-settings"
        />
      </div>

      <div className="text-center">
        <p className="text-2xl md:text-lg font-bold text-foreground uppercase tracking-wider mb-1 hover-title-outline">
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
            {status === 'paused' ? t('paused') : ''}
          </span>
        </div>
      </div>

      <div className="relative flex items-center justify-center group">
        <svg className="w-64 h-64 sm:w-72 sm:h-72 -rotate-90 hover-ring" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r={TIMER_RADIUS} fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-300 dark:text-[oklch(100%_0_0/0.1)] transition-all duration-300" />
          <circle
            cx="150"
            cy="150"
            r={TIMER_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={TIMER_CIRCUMFERENCE}
            strokeDashoffset={TIMER_CIRCUMFERENCE - (progress / 100) * TIMER_CIRCUMFERENCE}
            className={`transition-all duration-1000 ease-linear group-hover:stroke-10 ${
              status === 'paused'
                ? 'text-amber-500'
                : phase === 'focus'
                ? 'text-primary'
                : phase === 'longBreak'
                ? 'text-blue-500'
                : 'text-green-500'
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-mono font-bold tracking-tight tabular-nums text-foreground dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:to-zinc-500 dark:bg-clip-text hover-timer-display">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {status === 'running' ? (
            <Button size="lg" onClick={handlePause} variant="secondary" className="gap-2 px-8 border-2 border-border dark:border-transparent hover:scale-105 transition-transform duration-200">
              <Pause className="h-5 w-5" />
              {t('pause')}
            </Button>
          ) : status === 'paused' ? (
            <Button size="lg" onClick={handleResume} className="gap-2 px-8 glow-primary hover-glow hover-shine">
              <Play className="h-5 w-5" />
              {t('resume')}
            </Button>
          ) : (
            <Button size="lg" onClick={handleStart} className="gap-2 px-8 glow-primary hover-glow hover-shine">
              <Play className="h-5 w-5" />
              {t('start')}
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={handleReset} aria-label="Reset timer" className="hover:scale-105 hover:bg-muted/50 transition-all duration-200">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <Button size="sm" variant="ghost" onClick={handleSkip} className="group gap-2 text-muted-foreground hover:text-foreground/60 border border-muted-foreground/30 rounded-xl hover:bg-muted/50 hover:scale-105 transition-all duration-200">
          <SkipForward className="h-4 w-4 drop-shadow-md transition-transform duration-200 group-hover:translate-x-0.5" />
          {phase === 'focus' ? t('skipToBreak') : t('backToFocus')}
        </Button>
      </div>

      <div className="text-muted-foreground text-sm font-medium hover-today-stats">
        <span className="text-foreground">{t('today', { sessions, minutes: totalFocusMinutes })}</span>
      </div>

      <GoalProgress
        currentMinutes={totalFocusMinutes}
        goalMinutes={settingsStore.dailyGoal}
      />

    </div>
  )
}
