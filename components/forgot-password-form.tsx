"use client"

import { useState, useTransition } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { sendPasswordResetEmail } from "@/app/actions/account"
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
import { ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react"

interface ForgotPasswordFormProps {
  locale: string
}

export function ForgotPasswordForm({ locale }: ForgotPasswordFormProps) {
  const t = useTranslations("Account")
  const tAuth = useTranslations("Auth")
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const result = await sendPasswordResetEmail(email, locale)

      if (result.error) {
        toast({
          variant: "destructive",
          title: tAuth("error"),
          description: result.error,
        })
        return
      }

      setEmailSent(true)
    })
  }

  if (emailSent) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle>{t("resetEmailSent")}</CardTitle>
          <CardDescription>{t("resetEmailSentDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {tAuth("login")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t("resetPassword")}</CardTitle>
        <CardDescription>{t("resetPasswordDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder={tAuth("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
              className="pl-10"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("sendResetLink")
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="inline-block mr-1 h-3 w-3" />
              {tAuth("login")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
