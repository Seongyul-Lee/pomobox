"use client"

import { useState, useEffect, useRef } from "react"
import { useTimerStore, selectSessionStartTime, selectIsRunning, selectIsFocusPhase } from "@/lib/store"

/**
 * 실시간 Focus 경과 시간(분)을 반환하는 훅
 * - Focus 세션 중에만 증가
 * - 분 단위 변경 시에만 리렌더링
 * - Zustand store 사용
 */
export function useRealtimeFocusMinutes(): number {
  const sessionStartTime = useTimerStore(selectSessionStartTime)
  const isRunning = useTimerStore(selectIsRunning)
  const isFocusPhase = useTimerStore(selectIsFocusPhase)

  const [elapsedMinutes, setElapsedMinutes] = useState(0)
  const lastMinutesRef = useRef(0)

  useEffect(() => {
    // Focus 세션이 아니면 0
    if (!isFocusPhase || !sessionStartTime) {
      if (elapsedMinutes !== 0) {
        setElapsedMinutes(0)
        lastMinutesRef.current = 0
      }
      return
    }

    // 타이머가 멈춰있으면 현재 값 유지
    if (!isRunning) {
      return
    }

    // 매초 경과 시간 계산
    const updateElapsed = () => {
      const elapsedMs = Date.now() - sessionStartTime
      const minutes = Math.floor(elapsedMs / 60000)

      // 분이 변경되었을 때만 state 업데이트 (리렌더링 최소화)
      if (minutes !== lastMinutesRef.current) {
        lastMinutesRef.current = minutes
        setElapsedMinutes(minutes)
      }
    }

    // 초기 계산
    updateElapsed()

    // 1초마다 업데이트
    const intervalId = setInterval(updateElapsed, 1000)

    return () => clearInterval(intervalId)
  }, [sessionStartTime, isRunning, isFocusPhase, elapsedMinutes])

  return elapsedMinutes
}

/**
 * 실시간 Focus 경과 시간(초)을 반환하는 훅
 * - 더 정밀한 업데이트가 필요한 경우 사용
 */
export function useRealtimeFocusSeconds(): number {
  const sessionStartTime = useTimerStore(selectSessionStartTime)
  const isRunning = useTimerStore(selectIsRunning)
  const isFocusPhase = useTimerStore(selectIsFocusPhase)

  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    if (!isFocusPhase || !sessionStartTime) {
      if (elapsedSeconds !== 0) {
        setElapsedSeconds(0)
      }
      return
    }

    if (!isRunning) {
      return
    }

    const updateElapsed = () => {
      const elapsedMs = Date.now() - sessionStartTime
      const seconds = Math.floor(elapsedMs / 1000)
      setElapsedSeconds(seconds)
    }

    updateElapsed()
    const intervalId = setInterval(updateElapsed, 1000)

    return () => clearInterval(intervalId)
  }, [sessionStartTime, isRunning, isFocusPhase, elapsedSeconds])

  return elapsedSeconds
}
