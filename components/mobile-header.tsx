"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Settings,
  Moon,
  Sun,
  Sparkles,
  Home,
  BookOpen,
  Info,
  Mail,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { SettingsDialog } from "@/components/settings-dialog"
import { useSettingsStore, type TimerSettings } from "@/lib/store"
import { cn } from "@/lib/utils"

// Animated hamburger icon component
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-5 flex items-center justify-center">
      {/* Top line */}
      <span
        className={cn(
          "absolute h-[2px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]",
          isOpen
            ? "w-5 rotate-45 top-[9px]"
            : "w-5 top-[4px]"
        )}
      />
      {/* Middle line */}
      <span
        className={cn(
          "absolute h-[2px] rounded-full bg-current transition-all duration-200",
          isOpen
            ? "w-0 opacity-0"
            : "w-3.5 opacity-100 left-0"
        )}
        style={{ top: "9px" }}
      />
      {/* Bottom line */}
      <span
        className={cn(
          "absolute h-[2px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]",
          isOpen
            ? "w-5 -rotate-45 top-[9px]"
            : "w-4 top-[14px] left-0"
        )}
      />
    </div>
  )
}

// Menu item with icon background
interface MenuItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  accentColor?: string
  onClick: () => void
  className?: string
}

function MenuItem({ href, icon, label, isActive, accentColor = "primary", onClick, className }: MenuItemProps) {
  const colorClasses = {
    primary: {
      bg: "bg-primary/12 dark:bg-primary/20",
      activeBg: "bg-primary/20 dark:bg-primary/30",
      text: "text-primary",
      iconBg: "bg-primary/15 dark:bg-primary/25",
      activeIconBg: "bg-primary/25 dark:bg-primary/35",
      groupHoverIconBg: "group-hover:bg-primary/15 dark:group-hover:bg-primary/25",
      glow: "shadow-[0_0_20px_-5px] shadow-primary/30",
    },
    violet: {
      bg: "bg-violet-500/12 dark:bg-violet-400/20",
      activeBg: "bg-violet-500/20 dark:bg-violet-400/30",
      text: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-500/15 dark:bg-violet-400/25",
      activeIconBg: "bg-violet-500/25 dark:bg-violet-400/35",
      groupHoverIconBg: "group-hover:bg-violet-500/15 dark:group-hover:bg-violet-400/25",
      glow: "shadow-[0_0_20px_-5px] shadow-violet-500/30",
    },
    amber: {
      bg: "bg-amber-500/12 dark:bg-amber-400/20",
      activeBg: "bg-amber-500/20 dark:bg-amber-400/30",
      text: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500/15 dark:bg-amber-400/25",
      activeIconBg: "bg-amber-500/25 dark:bg-amber-400/35",
      groupHoverIconBg: "group-hover:bg-amber-500/15 dark:group-hover:bg-amber-400/25",
      glow: "shadow-[0_0_20px_-5px] shadow-amber-500/30",
    },
  } as const

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.primary

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3.5 px-3 py-3 rounded-2xl transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        isActive
          ? cn(colors.activeBg, colors.text, colors.glow)
          : "hover:bg-muted/60",
        className
      )}
    >
      {/* Icon with background */}
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
          isActive
            ? colors.activeIconBg
            : cn("bg-muted/50 group-hover:bg-muted", colors.groupHoverIconBg)
        )}
      >
        <span className={cn(
          "transition-colors duration-200",
          isActive && colors.text
        )}>
          {icon}
        </span>
      </div>
      {/* Label */}
      <span className={cn(
        "font-medium text-[15px] transition-colors duration-200",
        isActive && colors.text
      )}>
        {label}
      </span>
    </Link>
  )
}

export function MobileHeader() {
  const { theme, setTheme } = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
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

  // Theme cycle: Light -> Midnight -> Dark -> Light
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("midnight")
    } else if (theme === "midnight") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  // Get theme icon based on current theme
  const getThemeIcon = () => {
    if (theme === "light") {
      return <Sparkles className="h-[18px] w-[18px]" />
    } else if (theme === "midnight") {
      return <Moon className="h-[18px] w-[18px]" />
    } else {
      return <Sun className="h-[18px] w-[18px]" />
    }
  }

  // Mount check for theme icon
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Close menu on escape key - use ref to avoid memory leak
  const menuOpenRef = useRef(menuOpen)
  useEffect(() => { menuOpenRef.current = menuOpen }, [menuOpen])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && menuOpenRef.current) {
      setMenuOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Check if current path matches
  const isActive = (path: string) => pathname === path
  const isLearnActive = pathname === "/learn" || pathname.startsWith("/guide") || pathname.startsWith("/blog")

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Header Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 pt-safe h-[calc(3.5rem+env(safe-area-inset-top,0px))] px-3 flex items-center justify-between bg-background/85 backdrop-blur-2xl border-b border-border/40">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-1.5">
          {/* Hamburger Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "h-11 w-11 rounded-xl transition-all duration-200",
              menuOpen && "bg-muted"
            )}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon isOpen={menuOpen} />
          </Button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 px-1 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <Image
              src="/icon.svg"
              alt="Pomobox"
              width={26}
              height={26}
              className="w-[26px] h-[26px]"
              priority
            />
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Pomobox
            </span>
          </Link>
        </div>

        {/* Right: Theme + Settings */}
        <div className="flex items-center gap-0.5">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-11 w-11 rounded-xl hover:bg-muted/80 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {mounted && getThemeIcon()}
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            className="h-11 w-11 rounded-xl hover:bg-muted/80 transition-all duration-200"
            aria-label="Settings"
          >
            <Settings className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-down Menu */}
      <nav
        id="mobile-menu"
        className={cn(
          "md:hidden fixed top-[calc(3.5rem+env(safe-area-inset-top,0px))] left-0 right-0 z-40",
          "bg-background/95 backdrop-blur-2xl",
          "border-b border-border/40",
          "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          menuOpen
            ? "max-h-[calc(100vh-3.5rem)] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />

        <div className="relative p-4 space-y-1 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Home */}
          <div className="mobile-menu-item">
            <MenuItem
              href="/"
              icon={<Home className="h-5 w-5" />}
              label="Home"
              isActive={isActive("/")}
              accentColor="primary"
              onClick={closeMenu}
            />
          </div>

          {/* Learn */}
          <div className="mobile-menu-item">
            <MenuItem
              href="/learn"
              icon={<BookOpen className="h-5 w-5" />}
              label="Learn"
              isActive={isLearnActive}
              accentColor="violet"
              onClick={closeMenu}
            />
          </div>

          {/* Separator */}
          <div className="mobile-menu-item py-2">
            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
          </div>

          {/* About */}
          <div className="mobile-menu-item">
            <MenuItem
              href="/about"
              icon={<Info className="h-5 w-5" />}
              label="About"
              isActive={isActive("/about")}
              accentColor="primary"
              onClick={closeMenu}
            />
          </div>

          {/* Contact */}
          <div className="mobile-menu-item">
            <MenuItem
              href="/contact"
              icon={<Mail className="h-5 w-5" />}
              label="Contact"
              isActive={isActive("/contact")}
              accentColor="primary"
              onClick={closeMenu}
            />
          </div>

          {/* FAQ */}
          <div className="mobile-menu-item">
            <MenuItem
              href="/faq"
              icon={<HelpCircle className="h-5 w-5" />}
              label="FAQ"
              isActive={isActive("/faq")}
              accentColor="primary"
              onClick={closeMenu}
            />
          </div>
        </div>
      </nav>

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
    </>
  )
}
