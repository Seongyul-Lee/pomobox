"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { deleteAccount } from "@/app/actions/account"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, AlertTriangle } from "lucide-react"

interface DeleteAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: string
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  locale,
}: DeleteAccountDialogProps) {
  const t = useTranslations("Account")
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAccount()

      if (result.error) {
        toast({
          variant: "destructive",
          title: t("deleteAccount"),
          description: result.error,
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
