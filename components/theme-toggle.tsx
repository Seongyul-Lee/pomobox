"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 테마 순서: Midnight → Dark → Light
const THEME_LIST = ["midnight", "dark", "light"] as const
type Theme = (typeof THEME_LIST)[number]

function getThemeIcon(theme: string, className = "h-4 w-4") {
  switch (theme) {
    case "light":
      return <Sun className={className} />
    case "dark":
      return <Moon className={className} />
    case "midnight":
      return <Sparkles className={className} />
    default:
      return <Sparkles className={className} />
  }
}

function getThemeLabel(theme: string): string {
  switch (theme) {
    case "light":
      return "Light"
    case "dark":
      return "Dark"
    case "midnight":
      return "Midnight"
    default:
      return "Theme"
  }
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="lg" className="h-12 w-12" aria-label="Toggle theme" disabled />
  }

  const currentTheme = theme || "midnight"

  // 테마별 배경색 클래스
  const bgClass = currentTheme === "light"
    ? "bg-white/90"
    : currentTheme === "midnight"
      ? "bg-slate-800/90"
      : "bg-zinc-900/90"

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className={`h-12 w-12 ${bgClass} backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all`}
            aria-label="Select theme"
          >
            {getThemeIcon(currentTheme, "h-6 w-6")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px]">
          {THEME_LIST.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {getThemeIcon(themeOption)}
                <span>{getThemeLabel(themeOption)}</span>
              </div>
              {currentTheme === themeOption && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
