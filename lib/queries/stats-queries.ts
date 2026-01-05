import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getTodayStats,
  getWeeklyStats,
  getRecentDaysStats,
  getLastWeekStats,
  getMonthlyStats,
  getPreviousMonthStats,
  getTotalStatsFromDB,
  getFocusDistributionByHour,
  incrementDailyMinutes,
  recordSessionComplete,
  type DailyStats,
  type DayRecord,
  type HourlyDistribution,
} from "@/lib/supabase/stats"

// ============================================
// Query Keys (캐시 키 관리)
// ============================================
export const statsKeys = {
  all: ["stats"] as const,
  today: (userId: string) => [...statsKeys.all, "today", userId] as const,
  weekly: (userId: string) => [...statsKeys.all, "weekly", userId] as const,
  recentDays: (userId: string, days: number) =>
    [...statsKeys.all, "recentDays", userId, days] as const,
  lastWeek: (userId: string) => [...statsKeys.all, "lastWeek", userId] as const,
  monthly: (userId: string) => [...statsKeys.all, "monthly", userId] as const,
  previousMonth: (userId: string) =>
    [...statsKeys.all, "previousMonth", userId] as const,
  total: (userId: string) => [...statsKeys.all, "total", userId] as const,
  focusDistribution: (userId: string, startDate: string, endDate: string) =>
    [...statsKeys.all, "focusDistribution", userId, startDate, endDate] as const,
}

// ============================================
// Query Hooks (데이터 조회)
// ============================================

/**
 * 오늘 통계 조회
 */
export function useTodayStats(userId: string | null) {
  return useQuery({
    queryKey: statsKeys.today(userId ?? ""),
    queryFn: () => getTodayStats(userId!),
    enabled: !!userId,
  })
}

/**
 * 주간 통계 조회 (최근 7일)
 */
export function useWeeklyStats(userId: string | null) {
  return useQuery({
    queryKey: statsKeys.weekly(userId ?? ""),
    queryFn: () => getWeeklyStats(userId!),
    enabled: !!userId,
  })
}

/**
 * 최근 N일 데이터 조회
 */
export function useRecentDaysStats(userId: string | null, days: number = 7) {
  return useQuery({
    queryKey: statsKeys.recentDays(userId ?? "", days),
    queryFn: () => getRecentDaysStats(userId!, days),
    enabled: !!userId,
  })
}

/**
 * 지난주 데이터 조회 (7일 전 ~ 13일 전)
 */
export function useLastWeekStats(userId: string | null) {
  return useQuery({
    queryKey: statsKeys.lastWeek(userId ?? ""),
    queryFn: () => getLastWeekStats(userId!),
    enabled: !!userId,
  })
}

/**
 * 이번 달 데이터 조회
 */
export function useMonthlyStats(userId: string | null) {
  return useQuery({
    queryKey: statsKeys.monthly(userId ?? ""),
    queryFn: () => getMonthlyStats(userId!),
    enabled: !!userId,
  })
}

/**
 * 전월 데이터 조회
 */
export function usePreviousMonthStats(userId: string | null) {
  return useQuery({
    queryKey: statsKeys.previousMonth(userId ?? ""),
    queryFn: () => getPreviousMonthStats(userId!),
    enabled: !!userId,
  })
}

/**
 * 전체 통계 조회 (연속 출석 일수 포함)
 */
export function useTotalStats(userId: string | null) {
  return useQuery({
    queryKey: statsKeys.total(userId ?? ""),
    queryFn: () => getTotalStatsFromDB(userId!),
    enabled: !!userId,
  })
}

/**
 * 시간대별 집중도 분포 조회 (RPC)
 * - staleTime 10분: 변동이 적은 데이터
 * - 타임존 자동 감지 (Intl API)
 */
export function useFocusDistributionQuery(
  userId: string | null,
  startDate: string,
  endDate: string
) {
  return useQuery({
    queryKey: statsKeys.focusDistribution(userId ?? "", startDate, endDate),
    queryFn: () =>
      userId ? getFocusDistributionByHour(userId, startDate, endDate) : [],
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10분 (변동 적음)
  })
}

// ============================================
// Mutation Hooks (데이터 변경)
// ============================================

/**
 * 1분 단위 증분 저장 (세션 중 1분마다 호출)
 * - staleTime 30초로 실시간 데이터 처리
 */
export function useIncrementMinutes() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      minutes,
      dailyGoalMinutes,
    }: {
      userId: string
      minutes?: number
      dailyGoalMinutes?: number
    }) => incrementDailyMinutes(userId, minutes, dailyGoalMinutes),
    onSuccess: (_data, variables) => {
      // 오늘 통계와 주간 통계 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: statsKeys.today(variables.userId),
      })
      queryClient.invalidateQueries({
        queryKey: statsKeys.recentDays(variables.userId, 7),
      })
    },
  })
}

/**
 * 세션 완료 시 호출 (저장 + 일일 통계 업데이트)
 */
export function useRecordSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      durationMinutes,
      dailyGoalMinutes,
    }: {
      userId: string
      durationMinutes: number
      dailyGoalMinutes?: number
    }) => recordSessionComplete(userId, durationMinutes, dailyGoalMinutes),
    onSuccess: (_data, variables) => {
      // 모든 통계 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: statsKeys.all,
      })
    },
  })
}

// ============================================
// 타입 재export
// ============================================
export type { DailyStats, DayRecord, HourlyDistribution }
