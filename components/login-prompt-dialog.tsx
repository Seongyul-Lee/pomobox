"use client"

import { useRouter } from "next/navigation"
import { Sparkles, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LoginPromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginPromptDialog({ open, onOpenChange }: LoginPromptDialogProps) {
  const router = useRouter()

  const handleLogin = () => {
    onOpenChange(false)
    router.push("/auth/login")
  }

  const handleDismiss = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="glass-card max-w-md"
        aria-labelledby="login-prompt-title"
        aria-describedby="login-prompt-description"
      >
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle id="login-prompt-title" className="text-xl">
            First Session Complete!
          </DialogTitle>
          <DialogDescription id="login-prompt-description" className="text-center">
            Sign in to save your progress permanently and access your stats from any device.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleLogin}
            className="w-full gap-2 glow-primary"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
