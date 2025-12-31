"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { updatePassword, verifyCurrentPassword } from "@/app/actions/account"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Lock, CheckCircle } from "lucide-react"

interface UpdatePasswordFormProps {
  locale: string
}

export function UpdatePasswordForm({ locale }: UpdatePasswordFormProps) {
  const t = useTranslations("Account")
  const tAuth = useTranslations("Auth")
  const router = useRouter()
  const { toast } = useToast()

  const [currentPassword, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 클라이언트 측 유효성 검사
    if (!currentPassword) {
      toast({
        variant: "destructive",
        title: tAuth("error"),
        description: t("currentPasswordRequired"),
      })
      return
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: tAuth("error"),
        description: t("passwordTooShort"),
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: tAuth("error"),
        description: t("passwordMismatch"),
      })
      return
    }

    startTransition(async () => {
      // 현재 비밀번호 검증
      const verifyResult = await verifyCurrentPassword(currentPassword)
      if (verifyResult.error) {
        toast({
          variant: "destructive",
          title: tAuth("error"),
          description: t(verifyResult.error),
        })
        return
      }

      const result = await updatePassword(password)

      if (result.error) {
        toast({
          variant: "destructive",
          title: tAuth("error"),
          description: result.error,
        })
        return
      }

      setSuccess(true)

      toast({
        title: t("passwordUpdated"),
        description: t("passwordUpdatedMessage"),
      })

      // 3초 후 마이페이지로 이동
      setTimeout(() => {
        router.push(`/${locale}/mypage`)
      }, 3000)
    })
  }

  if (success) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle>{t("passwordUpdated")}</CardTitle>
          <CardDescription>{t("passwordUpdatedMessage")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/mypage">
            <Button variant="outline" className="w-full">
              {t("backToMypage")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t("updatePassword")}</CardTitle>
        <CardDescription>{t("updatePasswordDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              placeholder={t("currentPassword")}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={isPending}
              className="pl-10"
            />
          </div>

          <hr className="border-border" />

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              placeholder={t("newPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isPending}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              placeholder={t("confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              disabled={isPending}
              className="pl-10"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("updating")}
              </>
            ) : (
              t("updatePassword")
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/mypage"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="inline-block mr-1 h-3 w-3" />
              {t("backToMypage")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
