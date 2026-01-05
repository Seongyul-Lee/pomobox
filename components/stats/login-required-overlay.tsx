"use client"

import { LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginRequiredOverlayProps {
  className?: string
  /** When true, shows centered login icon button */
  showLoginIcon?: boolean
}

/**
 * 비로그인 사용자에게 표시되는 블러 오버레이
 * 각 통계 패널 위에 개별적으로 배치되며, 중앙에 로그인 아이콘 버튼 표시
 */
export function LoginRequiredOverlay({
  className,
  showLoginIcon = true,
}: LoginRequiredOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20",
        "bg-background/50 backdrop-blur-[3px]",
        "rounded-2xl",
        "flex items-center justify-center",
        className
      )}
      role="region"
      aria-label="Login required to view this statistic"
    >
      {showLoginIcon && (
        <a
          href="/auth/login"
          className={cn(
            // Base styles
            "group relative flex items-center justify-center",
            "w-12 h-12 rounded-full",
            // Glass morphism effect
            "bg-background/80 backdrop-blur-md",
            "border border-border/60",
            "shadow-lg shadow-black/5",
            // Transitions
            "transition-all duration-300 ease-out",
            // Hover states
            "hover:scale-110 hover:bg-background/95",
            "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
            // Focus states
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-primary/50 focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background"
          )}
          aria-label="Sign in to view statistics"
        >
          {/* Subtle gradient ring on hover */}
          <div
            className={cn(
              "absolute inset-0 rounded-full opacity-0",
              "bg-gradient-to-br from-primary/20 via-transparent to-primary/10",
              "transition-opacity duration-300",
              "group-hover:opacity-100"
            )}
          />

          {/* Icon */}
          <LogIn
            className={cn(
              "relative z-10 h-5 w-5",
              "text-muted-foreground",
              "transition-colors duration-300",
              "group-hover:text-primary"
            )}
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  )
}
