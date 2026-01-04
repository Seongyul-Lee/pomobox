import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UpdatePasswordForm } from "@/components/update-password-form"

export const metadata: Metadata = {
  title: "Update Password",
  description: "Enter your new password",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function UpdatePasswordPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 비로그인 유저는 로그인 페이지로 리다이렉트
  // (비밀번호 재설정 링크로 접근 시 세션이 생성됨)
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <UpdatePasswordForm />
    </div>
  )
}
