"use server"

import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export type ActionResult = {
  success?: boolean
  error?: string
}

/**
 * 현재 비밀번호 검증 (Re-authentication)
 * - signInWithPassword로 현재 비밀번호 확인
 */
export async function verifyCurrentPassword(
  currentPassword: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user || !user.email) {
      return { error: "Unauthorized" }
    }

    // 현재 비밀번호로 로그인 시도하여 검증
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    })

    if (signInError) {
      return { error: "incorrectPassword" }
    }

    return { success: true }
  } catch (error) {
    console.error("verifyCurrentPassword error:", error)
    return { error: "An unexpected error occurred" }
  }
}

/**
 * 회원 탈퇴 Server Action
 * - 이메일 유저: 비밀번호 검증 후 삭제
 * - OAuth 유저: 바로 삭제
 * - DB CASCADE 정책으로 관련 데이터 자동 삭제
 */
export async function deleteAccount(
  currentPassword?: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "Unauthorized" }
    }

    // 이메일 유저인 경우 비밀번호 검증 필수
    const isEmailUser = user.app_metadata?.provider === "email"
    if (isEmailUser) {
      if (!currentPassword) {
        return { error: "currentPasswordRequired" }
      }

      // 비밀번호 검증
      const verifyResult = await verifyCurrentPassword(currentPassword)
      if (verifyResult.error) {
        return verifyResult
      }
    }

    // Admin API로 유저 삭제 (CASCADE로 모든 데이터 자동 삭제)
    try {
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
        user.id
      )

      if (deleteError) {
        console.error("Failed to delete user:", deleteError.message)
        return { error: deleteError.message }
      }
    } catch (adminError) {
      console.error("Admin client error:", adminError)
      // 환경변수 누락 등의 설정 오류
      return { error: "serverConfigurationError" }
    }

    // 세션 삭제 (쿠키 정리)
    await supabase.auth.signOut()

    // 캐시 무효화
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("deleteAccount error:", error)
    return { error: "An unexpected error occurred" }
  }
}

/**
 * 비밀번호 재설정 이메일 발송
 */
export async function sendPasswordResetEmail(
  email: string,
  locale: string = "en"
): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    // 현재 origin 가져오기 (서버 환경에서는 환경변수 또는 기본값 사용)
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/${locale}/auth/callback?next=/update-password`,
    })

    if (error) {
      console.error("Failed to send reset email:", error.message)
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("sendPasswordResetEmail error:", error)
    return { error: "An unexpected error occurred" }
  }
}

/**
 * 비밀번호 변경
 */
export async function updatePassword(
  newPassword: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "Unauthorized" }
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      console.error("Failed to update password:", error.message)
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("updatePassword error:", error)
    return { error: "An unexpected error occurred" }
  }
}
