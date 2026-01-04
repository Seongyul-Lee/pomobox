"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
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
  isOAuthUser: boolean
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  isOAuthUser,
}: DeleteAccountDialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    // 이메일 유저인 경우 비밀번호 필수
    if (!isOAuthUser && !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your current password",
      })
      return
    }

    startTransition(async () => {
      const result = await deleteAccount(isOAuthUser ? undefined : password)

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Delete Account",
          description: result.error,
        })
        return
      }

      // 성공 시 다이얼로그 닫고 메인으로 리다이렉트
      onOpenChange(false)

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      })

      router.push("/")
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
            <DialogTitle>Delete Account?</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete your account? This will permanently delete all your data including focus sessions, statistics, and settings.
          </DialogDescription>
        </DialogHeader>

        {/* 이메일 유저인 경우에만 비밀번호 입력 필드 표시 */}
        {!isOAuthUser && (
          <div className="py-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter your password to confirm"
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
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
