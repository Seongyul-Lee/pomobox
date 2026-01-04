"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeleteAccountDialog } from "@/components/delete-account-dialog"
import { ArrowLeft, LogOut, Key, Mail, Loader2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"

// Google 아이콘 SVG
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

interface MypageContentProps {
  user: User
  isOAuthUser: boolean
}

export function MypageContent({
  user,
  isOAuthUser,
}: MypageContentProps) {
  const router = useRouter()
  const supabase = createClient()

  const [loggingOut, setLoggingOut] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Timer
        </Link>

        <h1 className="text-2xl font-bold mb-6">My Account</h1>

        {/* 프로필 섹션 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground/80">{user.email}</p>
              </div>
              {/* OAuth 배지 */}
              {isOAuthUser && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  <GoogleIcon className="h-3.5 w-3.5" />
                  Logged in via Google
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 계정 관리 섹션 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* 로그아웃 */}
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4 text-foreground/80" />
              )}
              <span className="text-foreground/80">Sign out</span>
            </Button>

            {/* 비밀번호 변경 (OAuth 사용자에게는 숨김) */}
            {!isOAuthUser && (
              <Link href="/update-password" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Key className="h-4 w-4 text-foreground/80" />
                  <span className="text-foreground/80">Change Password</span>
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Delete Account</CardTitle>
            <CardDescription>This action cannot be undone. All your data will be permanently deleted.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* 삭제 확인 다이얼로그 */}
        <DeleteAccountDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          isOAuthUser={isOAuthUser}
        />
      </div>
    </div>
  )
}
