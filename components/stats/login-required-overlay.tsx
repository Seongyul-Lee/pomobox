"use client"

import { LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginRequiredOverlayProps {
  className?: string
  /** When true, only shows blur overlay without the login prompt card */
  blurOnly?: boolean
}

/**
 * 비로그인 사용자에게 표시되는 블러 오버레이
 * blurOnly=true: 블러 효과만 표시
 * blurOnly=false: 블러 없이 로그인 유도 카드만 표시 (통합 프롬프트용)
 */
export function LoginRequiredOverlay({
  className,
  blurOnly = false,
}: LoginRequiredOverlayProps) {
  // Blur-only mode: just the frosted overlay without login card
  if (blurOnly) {
    return (
      <div
        className={cn(
          "absolute inset-0 z-20",
          "bg-background/50 backdrop-blur-[3px]",
          "rounded-2xl",
          className
        )}
        aria-hidden="true"
      />
    )
  }

  // Full login prompt (used once, centered over the grid)
  return null
}

interface UnifiedLoginPromptProps {
  className?: string
}

/**
 * 통합 로그인 유도 프롬프트
 * 전체 통계 그리드 위에 한 번만 표시됩니다.
 */
export function UnifiedLoginPrompt({ className }: UnifiedLoginPromptProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-30 flex items-center justify-center",
        "pointer-events-none",
        className
      )}
      role="region"
      aria-label="Login required to view statistics"
    >
      {/* Centered login card - 60px 위로 오프셋 */}
      <div
        className={cn(
          "pointer-events-auto",
          "relative flex flex-col items-center gap-5 px-8 py-7",
          "bg-background/95 backdrop-blur-xl",
          "border border-border/60 rounded-2xl",
          "shadow-2xl shadow-black/10",
          "max-w-sm text-center",
          "animate-in fade-in zoom-in-95 duration-500",
          "-translate-y-[60px]"
        )}
      >
        {/* Subtle gradient accent at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Content */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold tracking-tight text-foreground">
            Log in and check your statistics
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Track your focus sessions and discover productivity patterns
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="/auth/login"
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "w-full px-6 py-3 rounded-xl",
            "bg-primary text-primary-foreground",
            "text-sm font-medium",
            "transition-all duration-200",
            "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Sign In
        </a>
      </div>
    </div>
  )
}
