"use client"

import { useEffect, useRef } from "react"
import { isSynced } from "@/lib/sync/migrate-local-data"
import { useToast } from "@/hooks/use-toast"

/**
 * 로그인 사용자의 로컬 데이터를 Supabase로 마이그레이션하는 훅
 * - 앱 초기화 시 1회 실행
 * - 이미 마이그레이션된 경우 스킵
 * - Supabase 클라이언트는 필요할 때만 동적 로드
 */
export function useSyncLocalData() {
  const { toast } = useToast()
  const hasRunRef = useRef(false)

  useEffect(() => {
    // 중복 실행 방지
    if (hasRunRef.current) return
    hasRunRef.current = true

    // 이미 마이그레이션된 경우 스킵
    if (isSynced()) return

    async function syncData() {
      // Supabase 클라이언트 동적 로드
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()

      // 현재 사용자 확인
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // 로그인되지 않은 경우 스킵
      if (!user) return

      // 마이그레이션 모듈 동적 로드
      const { migrateLocalToSupabase } = await import("@/lib/sync/migrate-local-data")

      // 마이그레이션 실행
      const result = await migrateLocalToSupabase(user.id)

      if (result.success && result.migratedRecords > 0) {
        toast({
          title: "Sync complete",
          description: `${result.migratedRecords} records have been synced to your account.`,
        })
      } else if (!result.success) {
        toast({
          title: "Sync failed",
          description: "Failed to sync your data. Please try again later.",
          variant: "destructive",
        })
      }
    }

    syncData()
  }, [toast])
}
