"use client"

import { Lock, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginRequiredOverlayProps {
  title?: string
  description?: string
  className?: string
}

/**
 * 비로그인 사용자에게 표시되는 로그인 유도 오버레이
 * 배경에 블러 처리된 가상 데이터가 보이면서, 로그인을 유도합니다.
 */
export function LoginRequiredOverlay({
  title = "Sign in to unlock",
  description = "Track your progress and unlock detailed insights",
  className,
}: LoginRequiredOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20 flex flex-col items-center justify-center",
        "bg-background/60 backdrop-blur-[2px]",
        "rounded-2xl",
        className
      )}
      role="region"
      aria-label="Login required to view this content"
    >
      {/* Frosted glass card */}
      <div
        className={cn(
          "relative flex flex-col items-center gap-4 p-6 lg:p-8",
          "bg-background/80 backdrop-blur-md",
          "border border-border/50 rounded-2xl",
          "shadow-xl shadow-background/20",
          "max-w-xs text-center",
          "animate-in fade-in zoom-in-95 duration-300"
        )}
      >
        {/* Lock icon with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="relative p-3 rounded-full bg-primary/10 border border-primary/20">
            <Lock className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h4 className="text-base font-semibold tracking-tight text-foreground">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="/auth/login"
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "px-5 py-2.5 rounded-lg",
            "bg-primary text-primary-foreground",
            "text-sm font-medium",
            "transition-all duration-200",
            "hover:bg-primary/90 hover:scale-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "shadow-md shadow-primary/25"
          )}
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Sign In
        </a>

        {/* Decorative corner accents */}
        <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
        <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr-xl" />
        <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl-xl" />
        <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />
      </div>
    </div>
  )
}
