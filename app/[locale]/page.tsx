"use client"

import { Suspense } from "react"
import { useTranslations } from "next-intl"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { BgmPanel } from "@/components/bgm-panel"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

function TimerFallback() {
  const t = useTranslations("Home")
  return (
    <div className="flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
      <div className="animate-pulse text-muted-foreground">{t("loading")}</div>
    </div>
  )
}

export default function Home() {
  const t = useTranslations("Home")

  return (
    <main className="relative min-h-screen bg-gray-50 dark:bg-zinc-950 text-slate-900 dark:text-white">
      {/* Fixed Header Controls */}
      <ThemeToggle />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <UserMenu />
      </div>

      {/* 3-Column Layout */}
      <div className="min-h-screen pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 lg:gap-8">
          {/* Left Sidebar: Dashboard (hidden on mobile, shown at bottom) */}
          <aside className="hidden lg:block space-y-4">
            <Suspense fallback={null}>
              <DashboardSidebar />
            </Suspense>
          </aside>

          {/* Center: Timer */}
          <section className="flex flex-col items-center">
            <div className="text-center mb-4 md:mb-8 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {t("title")}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">{t("description")}</p>
            </div>
            <Suspense fallback={<TimerFallback />}>
              <PomodoroTimer />
            </Suspense>
          </section>

          {/* Right Sidebar: BGM + Shortcuts (hidden on mobile, shown at bottom) */}
          <aside className="hidden lg:block space-y-4">
            <BgmPanel />
            <KeyboardShortcuts />
          </aside>
        </div>

        {/* Mobile: Stacked panels below timer */}
        <div className="lg:hidden mt-8 space-y-6 max-w-md mx-auto">
          <BgmPanel />
          <Suspense fallback={null}>
            <DashboardSidebar />
          </Suspense>
          <KeyboardShortcuts />
        </div>
      </div>
    </main>
  )
}
