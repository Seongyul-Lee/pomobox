"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"
import { migrateLocalToSupabase, isSynced } from "@/lib/sync/migrate-local-data"
import { useToast } from "@/hooks/use-toast"

/**
 * 로그인 사용자의 로컬 데이터를 Supabase로 마이그레이션하는 훅
 * - 앱 초기화 시 1회 실행
 * - 이미 마이그레이션된 경우 스킵
 */
export function useSyncLocalData() {
  const t = useTranslations("Sync")
  const { toast } = useToast()
  const hasRunRef = useRef(false)

  useEffect(() => {
    // 중복 실행 방지
    if (hasRunRef.current) return
    hasRunRef.current = true

    // 이미 마이그레이션된 경우 스킵
    if (isSynced()) return

    async function syncData() {
      const supabase = createClient()

      // 현재 사용자 확인
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // 로그인되지 않은 경우 스킵
      if (!user) return

      // 마이그레이션 실행
      const result = await migrateLocalToSupabase(user.id)

      if (result.success && result.migratedRecords > 0) {
        toast({
          title: t("syncComplete"),
          description: t("syncCompleteDescription", { count: result.migratedRecords }),
        })
      } else if (!result.success) {
        toast({
          title: t("syncFailed"),
          description: t("syncFailedDescription"),
          variant: "destructive",
        })
      }
    }

    syncData()
  }, [t, toast])
}
