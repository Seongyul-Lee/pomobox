"use client"

import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { Timer, ListTodo, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { SettingsDialog } from "@/components/settings-dialog"
import { UserMenu } from "@/components/user-menu"
import { useSettingsStore, type TimerSettings } from "@/lib/store"

interface NavItem {
  id: string
  icon: React.ElementType
  href?: string
  onClick?: () => void
  isActive?: boolean
  /** Custom icon size class */
  iconClassName?: string
}

export function Sidebar() {
  const t = useTranslations("Sidebar")
  const pathname = usePathname()
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Settings store for SettingsDialog
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

  // Check if current path matches (handles locale prefix)
  const localePattern = new RegExp(`^/(${routing.locales.join("|")})`)
  const isActive = (path: string) => {
    const pathWithoutLocale = pathname.replace(localePattern, "")
    if (path === "/") {
      return pathWithoutLocale === "" || pathWithoutLocale === "/"
    }
    return pathWithoutLocale.startsWith(path)
  }

  // Default icon size (use size- prefix for Button compatibility)
  const defaultIconClass = "size-5 md:size-6"
  // Smaller icon size for Tasks, Statistics, Settings
  const smallerIconClass = "size-4 md:size-5"

  const navItems: NavItem[] = [
    {
      id: "timer",
      icon: Timer,
      href: "/",
      isActive: isActive("/"),
    },
    {
      id: "task",
      icon: ListTodo,
      iconClassName: smallerIconClass,
      // Task panel toggle - will be implemented in next task
      onClick: () => {
        // TODO: Toggle task panel
      },
    },
    {
      id: "statistics",
      icon: BarChart3,
      href: "/dashboard",
      isActive: isActive("/dashboard"),
      iconClassName: smallerIconClass,
    },
    {
      id: "settings",
      icon: Settings,
      iconClassName: smallerIconClass,
      onClick: () => setSettingsOpen(true),
    },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <nav
        role="navigation"
        aria-label={t("ariaLabel")}
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-16 md:w-20",
          "hidden md:flex flex-col items-center py-4",
          "glass-card border-r border-border/50"
        )}
      >
        {/* Top: Logo */}
        <div className="mb-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl hover:scale-105 transition-transform duration-200"
                aria-label={t("home")}
              >
                <Image
                  src="/icon.svg"
                  alt="Pomobox"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10"
                  priority
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("home")}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Middle: Navigation Items */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isCurrentActive = item.isActive
            const iconSize = item.iconClassName || defaultIconClass

            if (item.href) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl",
                        "transition-all duration-200",
                        "hover:bg-primary/10 hover:scale-105",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        isCurrentActive && "bg-primary/15 text-primary"
                      )}
                      aria-label={t(item.id)}
                      aria-current={isCurrentActive ? "page" : undefined}
                    >
                      <Icon className={iconSize} aria-hidden="true" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{t(item.id)}</p>
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={item.onClick}
                    className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-xl",
                      "transition-all duration-200",
                      "hover:bg-primary/10 hover:scale-105",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    aria-label={t(item.id)}
                  >
                    <Icon className={iconSize} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{t(item.id)}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {/* Bottom: User Menu */}
        <div className="mt-auto">
          <UserMenu
            iconOnly
            buttonClassName="w-12 h-12 md:w-14 md:h-14 rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-200 relative"
            iconClassName={smallerIconClass}
          />
        </div>

        {/* Settings Dialog (controlled) */}
        <SettingsDialog
          settings={currentSettings}
          onSettingsChange={(newSettings) => {
            settingsStore.setFocusDuration(newSettings.focusDuration)
            settingsStore.setBreakDuration(newSettings.breakDuration)
            settingsStore.setDailyGoal(newSettings.dailyGoal)
            settingsStore.setNotificationsEnabled(newSettings.notificationsEnabled)
            settingsStore.setSoundEnabled(newSettings.soundEnabled)
            settingsStore.setSoundCategory(newSettings.soundCategory)
            settingsStore.setSoundType(newSettings.soundType)
            settingsStore.setVolume(newSettings.volume)
          }}
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          hideTrigger
        />
      </nav>
    </TooltipProvider>
  )
}
