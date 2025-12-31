import { getTranslations } from "next-intl/server"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Account" })

  return {
    title: t("resetPassword"),
    description: t("resetPasswordDescription"),
  }
}

export default async function ForgotPasswordPage({ params }: Props) {
  const { locale } = await params

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <ForgotPasswordForm locale={locale} />
    </div>
  )
}
