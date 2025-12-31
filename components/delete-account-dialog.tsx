"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { deleteAccount } from "@/app/actions/account"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, AlertTriangle, Lock } from "lucide-react"

interface DeleteAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: string
  isOAuthUser: boolean
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  locale,
  isOAuthUser,
}: DeleteAccountDialogProps) {
  const t = useTranslations("Account")
  const tAuth = useTranslations("Auth")
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    // 이메일 유저인 경우 비밀번호 필수
    if (!isOAuthUser && !password) {
      toast({
        variant: "destructive",
        title: tAuth("error"),
        description: t("currentPasswordRequired"),
      })
      return
    }

    startTransition(async () => {
      const result = await deleteAccount(isOAuthUser ? undefined : password)

      if (result.error) {
        toast({
          variant: "destructive",
          title: t("deleteAccount"),
          description: t(result.error) || result.error,
        })
        return
      }

      // 성공 시 다이얼로그 닫고 메인으로 리다이렉트
      onOpenChange(false)

      toast({
        title: t("deleteSuccess"),
        description: t("deleteSuccessMessage"),
      })

      router.push(`/${locale}`)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>{t("deleteConfirmTitle")}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            {t("deleteConfirmMessage")}
          </DialogDescription>
        </DialogHeader>

        {/* 이메일 유저인 경우에만 비밀번호 입력 필드 표시 */}
        {!isOAuthUser && (
          <div className="py-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder={t("enterPasswordToDelete")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                className="pl-10"
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("deleting")}
              </>
            ) : (
              t("confirm")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
