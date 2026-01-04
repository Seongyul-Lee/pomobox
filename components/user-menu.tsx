"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Loader2, Settings } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface UserMenuProps {
  /** Show icon only (no text) for non-logged-in state */
  iconOnly?: boolean
  /** Custom class for button size */
  buttonClassName?: string
  /** Custom class for icon size */
  iconClassName?: string
}

export function UserMenu({ iconOnly = false, buttonClassName, iconClassName = "h-4 w-4" }: UserMenuProps) {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled aria-label="Loading" className={buttonClassName}>
        <Loader2 className={`${iconClassName} animate-spin`} />
      </Button>
    )
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button
          variant="ghost"
          size={iconOnly ? "icon" : "sm"}
          className={buttonClassName || (iconOnly ? "hover:scale-105 hover:bg-primary/10 transition-all duration-200" : "gap-2 hover:scale-105 hover:bg-primary/10 transition-all duration-200")}
          aria-label="Sign in"
        >
          <User className={iconClassName} />
          {!iconOnly && "Sign in"}
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={buttonClassName || "relative hover:scale-105 hover:bg-primary/10 transition-all duration-200"} aria-label="User menu">
          <User className={iconClassName} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled className="text-xs text-muted-foreground">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="gap-2 cursor-pointer">
          <Link href="/mypage">
            <Settings className="h-4 w-4" />
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="gap-2 cursor-pointer">
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
