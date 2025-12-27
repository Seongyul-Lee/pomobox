"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Palette, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const themes = [
  { value: "light", label: "Light", emoji: "☀️" },
  { value: "dark", label: "Dark (Default)", emoji: "🌙" },
  { value: "synthwave", label: "Synthwave", emoji: "🌆" },
  { value: "cyberpunk", label: "Cyberpunk", emoji: "🤖" },
  { value: "dracula", label: "Dracula", emoji: "🧛" },
  { value: "coffee", label: "Coffee", emoji: "☕" },
  { value: "nord", label: "Nord", emoji: "❄️" },
  { value: "cupcake", label: "Cupcake", emoji: "🧁" },
  { value: "valentine", label: "Valentine", emoji: "💕" },
  { value: "aqua", label: "Aqua", emoji: "🌊" },
  { value: "forest", label: "Forest", emoji: "🌲" },
  { value: "halloween", label: "Halloween", emoji: "🎃" },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="lg" className="h-12 w-12" aria-label="Select theme" disabled />
  }

  const currentTheme = themes.find(t => t.value === theme) || themes[1]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 bg-[oklch(100%_0_0/0.9)] dark:bg-[oklch(21%_0.0075_285.8/0.9)] synthwave:bg-[oklch(20%_0.06_280/0.9)] cyberpunk:bg-[oklch(18%_0.05_80/0.9)] dracula:bg-[oklch(26%_0.05_280/0.9)] coffee:bg-[oklch(24%_0.04_50/0.9)] nord:bg-[oklch(30%_0.025_240/0.9)] cupcake:bg-[oklch(99%_0.005_350/0.9)] valentine:bg-[oklch(98%_0.015_350/0.9)] aqua:bg-[oklch(24%_0.05_220/0.9)] forest:bg-[oklch(20%_0.04_150/0.9)] halloween:bg-[oklch(18%_0.03_50/0.9)] backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
            aria-label="Select theme"
          >
            <Palette className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>테마 선택</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </span>
              {theme === t.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
