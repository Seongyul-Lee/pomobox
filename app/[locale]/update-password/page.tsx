import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { UpdatePasswordForm } from "@/components/update-password-form"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Account" })

  return {
    title: t("updatePassword"),
    description: t("updatePasswordDescription"),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function UpdatePasswordPage({ params }: Props) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 비로그인 유저는 로그인 페이지로 리다이렉트
  // (비밀번호 재설정 링크로 접근 시 세션이 생성됨)
  if (!user) {
    redirect(`/${locale}/auth/login`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <UpdatePasswordForm locale={locale} />
    </div>
  )
}
