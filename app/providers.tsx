"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { migrateFromLocalStorage } from "@/lib/storage/idb"
import { useSyncLocalData } from "@/hooks/use-sync-local-data"
import { initSettingsSubscription } from "@/lib/store"

// QueryClient 생성 함수
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 통계 데이터: 5분 staleTime (PRD 성능 최적화)
        staleTime: 5 * 60 * 1000,
        // SSR에서 즉시 refetch 방지
        refetchOnWindowFocus: false,
      },
    },
  })
}

// 브라우저용 싱글톤 QueryClient
let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새 QueryClient 생성
    return makeQueryClient()
  } else {
    // 브라우저: 싱글톤 재사용 (React Suspense 대응)
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

/**
 * 앱 초기화 작업을 수행하는 내부 컴포넌트
 * - localStorage → IndexedDB 마이그레이션
 * - settings-store → timer-store 자동 동기화 설정
 * - 로그인 사용자의 로컬 → Supabase 마이그레이션
 */
function AppInitializer({ children }: { children: React.ReactNode }) {
  // localStorage → IndexedDB 마이그레이션 + settings 구독 초기화
  useEffect(() => {
    migrateFromLocalStorage()
    initSettingsSubscription()
  }, [])

  // 로그인 사용자의 로컬 → Supabase 마이그레이션
  useSyncLocalData()

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="midnight"
        themes={["light", "dark", "midnight"]}
        enableSystem={false}
      >
        <AppInitializer>{children}</AppInitializer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
