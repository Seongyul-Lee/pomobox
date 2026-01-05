import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { MypageContent } from "@/components/mypage-content"

export const metadata: Metadata = {
  title: "My Account",
  description: "Account Management",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function MyPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 비로그인 유저는 로그인 페이지로 리다이렉트
  if (!user) {
    redirect("/auth/login?next=/mypage")
  }

  // OAuth 사용자인지 확인 (provider가 email이 아니면 OAuth)
  const isOAuthUser = user.app_metadata?.provider !== "email"

  return <MypageContent user={user} isOAuthUser={isOAuthUser} />
}
