"use client"

import Image from "next/image"
import Link from "next/link"
import { Settings, User, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState } from "react"
import { SettingsDialog } from "@/components/settings-dialog"
import { useSettingsStore, type TimerSettings } from "@/lib/store"
import { useUser } from "@/hooks/use-user"

export function MobileHeader() {
  const { theme, setTheme } = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { user } = useUser()
  const settingsStore = useSettingsStore()

  const currentSettings: TimerSettings = {
    focusDuration: settingsStore.focusDuration,
    breakDuration: settingsStore.breakDuration,
    dailyGoal: settingsStore.dailyGoal,
    notificationsEnabled: settingsStore.notificationsEnabled,
    soundEnabled: settingsStore.soundEnabled,
    soundCategory: settingsStore.soundCategory,
    soundType: settingsStore.soundType,
    volume: settingsStore.volume,
  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <header className="xl:hidden fixed top-0 left-0 right-0 z-40 h-14 px-4 flex items-center justify-between bg-background/80 backdrop-blur-lg border-b border-border/50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icon.svg"
          alt="Pomobox"
          width={28}
          height={28}
          className="w-7 h-7"
          priority
        />
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Pomobox
        </span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 rounded-full"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSettingsOpen(true)}
          className="h-9 w-9 rounded-full"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* User */}
        <Link href={user ? "/mypage" : "/auth/login"}>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            aria-label={user ? "My page" : "Sign in"}
          >
            <User className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog
        settings={currentSettings}
        onSettingsChange={(newSettings) => {
          settingsStore.updateSettings(newSettings)
        }}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        hideTrigger
      />
    </header>
  )
}
