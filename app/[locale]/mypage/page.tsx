import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { MypageContent } from "@/components/mypage-content"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Account" })

  return {
    title: t("mypage"),
    description: t("accountManagement"),
  }
}

export default async function MyPage({ params }: Props) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 비로그인 유저는 로그인 페이지로 리다이렉트
  if (!user) {
    redirect(`/${locale}/auth/login?next=/mypage`)
  }

  // OAuth 사용자인지 확인 (provider가 email이 아니면 OAuth)
  const isOAuthUser = user.app_metadata?.provider !== "email"

  return <MypageContent user={user} isOAuthUser={isOAuthUser} locale={locale} />
}
