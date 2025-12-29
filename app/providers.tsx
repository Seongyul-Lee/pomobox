"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { migrateFromLocalStorage } from "@/lib/storage/idb"

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

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  // 앱 초기화 시 localStorage → IndexedDB 마이그레이션
  useEffect(() => {
    migrateFromLocalStorage()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
