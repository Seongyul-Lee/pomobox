"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useTranslations } from "next-intl"
import { useUser } from "@/hooks/use-user"
import { useRealtimeFocusMinutes } from "@/hooks/use-realtime-focus"
import {
  TodayCard,
  WeeklyCard,
  WeeklyComparisonCard,
  MonthlyCard,
} from "@/components/dashboard-left"
import {
  getRecentDays,
  getCurrentMonthData,
  getPreviousMonthData,
  getLastWeekData,
  getTotalStats,
  type DayRecord,
} from "@/lib/storage/local-history"
import { getLocalTodayStats } from "@/lib/storage/local-stats"
import { getDailyGoal } from "@/lib/storage/local-settings"
import {
  useRecentDaysStats,
  useLastWeekStats,
  useMonthlyStats,
  usePreviousMonthStats,
  useTotalStats,
  useTodayStats,
} from "@/lib/queries/stats-queries"

const CARD_IDS = ["today", "weekly", "comparison", "monthly"] as const
type CardId = (typeof CARD_IDS)[number]

export function MobileStatsCarousel() {
  const t = useTranslations("Dashboard")
  const { user } = useUser()
  const realtimeMinutes = useRealtimeFocusMinutes()
  const [goalMinutes, setGoalMinutes] = useState(120)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 비로그인 사용자용 로컬 상태
  const [localWeeklyData, setLocalWeeklyData] = useState<DayRecord[]>([])
  const [localLastWeekData, setLocalLastWeekData] = useState<DayRecord[]>([])
  const [localMonthlyData, setLocalMonthlyData] = useState<DayRecord[]>([])
  const [localPrevMonthData, setLocalPrevMonthData] = useState<DayRecord[]>([])
  const [localTotalStats, setLocalTotalStats] = useState({ streakDays: 0 })
  const [localTodayStats, setLocalTodayStats] = useState({ totalMinutes: 0, totalSessions: 0 })

  // React Query: 로그인 사용자용 서버 데이터 조회
  const { data: weeklyQuery } = useRecentDaysStats(user?.id ?? null, 7)
  const { data: lastWeekQuery } = useLastWeekStats(user?.id ?? null)
  const { data: monthlyQuery } = useMonthlyStats(user?.id ?? null)
  const { data: prevMonthQuery } = usePreviousMonthStats(user?.id ?? null)
  const { data: totalQuery } = useTotalStats(user?.id ?? null)
  const { data: todayQuery } = useTodayStats(user?.id ?? null)

  // 최종 데이터: 로그인 시 서버 데이터, 비로그인 시 로컬 데이터
  const weeklyData = user ? (weeklyQuery ?? []) : localWeeklyData
  const lastWeekData = user ? (lastWeekQuery ?? []) : localLastWeekData
  const monthlyData = user ? (monthlyQuery ?? []) : localMonthlyData
  const prevMonthData = user ? (prevMonthQuery ?? []) : localPrevMonthData
  const totalStats = user
    ? { streakDays: totalQuery?.streakDays ?? 0 }
    : localTotalStats
  const todayStats = user
    ? {
        totalMinutes: todayQuery?.total_minutes ?? 0,
        totalSessions: todayQuery?.total_sessions ?? 0,
      }
    : localTodayStats

  // 비로그인 사용자: 로컬 데이터 로드
  const loadLocalData = useCallback(() => {
    setLocalWeeklyData(getRecentDays(7))
    setLocalLastWeekData(getLastWeekData())
    setLocalMonthlyData(getCurrentMonthData())
    setLocalPrevMonthData(getPreviousMonthData())
    setLocalTotalStats(getTotalStats())

    const today = getLocalTodayStats()
    setLocalTodayStats({
      totalMinutes: today.totalMinutes,
      totalSessions: today.totalSessions,
    })
  }, [])

  // 초기 로드 및 user 변경 시 데이터 로드
  useEffect(() => {
    setGoalMinutes(getDailyGoal())

    if (!user) {
      loadLocalData()
    }
  }, [user, loadLocalData])

  // 세션 종료 시 로컬 데이터 다시 로드
  const prevRealtimeMinutes = useRef(realtimeMinutes)
  useEffect(() => {
    if (prevRealtimeMinutes.current > 0 && realtimeMinutes === 0) {
      if (!user) {
        loadLocalData()
      }
    }
    prevRealtimeMinutes.current = realtimeMinutes
  }, [realtimeMinutes, user, loadLocalData])

  // 스크롤 이벤트로 현재 활성 카드 추적
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollLeft = container.scrollLeft
    const cardWidth = container.offsetWidth * 0.85 + 12 // 85% width + gap
    const newIndex = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(newIndex, CARD_IDS.length - 1))
  }, [])

  // 인디케이터 클릭으로 해당 카드로 스크롤
  const scrollToCard = useCallback((index: number) => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = container.offsetWidth * 0.85 + 12
    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    })
  }, [])

  // 카드 라벨
  const cardLabels: Record<CardId, string> = {
    today: t("overview"),
    weekly: t("weeklyStats"),
    comparison: t("weeklyComparison"),
    monthly: t("monthlyStats"),
  }

  return (
    <div className="space-y-3">
      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-pl-4 px-4 pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Today Overview */}
        <div className="flex-shrink-0 w-[85%] snap-center">
          <TodayCard
            todayMinutes={todayStats.totalMinutes}
            todaySessions={todayStats.totalSessions}
            streakDays={totalStats.streakDays}
            goalMinutes={goalMinutes}
            realtimeMinutes={realtimeMinutes}
          />
        </div>

        {/* Weekly Stats */}
        <div className="flex-shrink-0 w-[85%] snap-center">
          <WeeklyCard
            data={weeklyData}
            isLoggedIn={!!user}
            realtimeMinutes={realtimeMinutes}
          />
        </div>

        {/* This Week vs Last Week */}
        <div className="flex-shrink-0 w-[85%] snap-center">
          <WeeklyComparisonCard
            thisWeekData={weeklyData}
            lastWeekData={lastWeekData}
            isLoggedIn={!!user}
            realtimeMinutes={realtimeMinutes}
          />
        </div>

        {/* Monthly Stats */}
        <div className="flex-shrink-0 w-[85%] snap-center">
          <MonthlyCard
            data={monthlyData}
            prevData={prevMonthData}
            isLoggedIn={!!user}
            realtimeMinutes={realtimeMinutes}
          />
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2">
        {CARD_IDS.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToCard(index)}
            className={`transition-all duration-200 rounded-full ${
              activeIndex === index
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={cardLabels[id]}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>

      {/* Current Card Label */}
      <p className="text-center text-xs text-muted-foreground">
        {cardLabels[CARD_IDS[activeIndex]]}
      </p>
    </div>
  )
}
