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
  Newspaper,
  Info,
  Mail,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { SettingsDialog } from "@/components/settings-dialog"
import { useSettingsStore, type TimerSettings } from "@/lib/store"
import { cn } from "@/lib/utils"

// Guide submenu items
const guideItems = [
  { label: "What is Pomodoro?", href: "/guide/what-is-pomodoro" },
  { label: "For Students", href: "/guide/pomodoro-for-students" },
  { label: "For Developers", href: "/guide/pomodoro-for-developers" },
  { label: "Pomodoro vs Timeboxing", href: "/guide/pomodoro-vs-timeboxing" },
  { label: "Avoid Distractions", href: "/guide/how-to-avoid-distractions" },
]

// Blog submenu items
const blogItems = [
  { label: "Pomodoro History", href: "/blog/pomodoro-history" },
  { label: "Science of Focus", href: "/blog/science-of-focus" },
]

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
      glow: "shadow-[0_0_20px_-5px] shadow-primary/30",
    },
    violet: {
      bg: "bg-violet-500/12 dark:bg-violet-400/20",
      activeBg: "bg-violet-500/20 dark:bg-violet-400/30",
      text: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-500/15 dark:bg-violet-400/25",
      activeIconBg: "bg-violet-500/25 dark:bg-violet-400/35",
      glow: "shadow-[0_0_20px_-5px] shadow-violet-500/30",
    },
    amber: {
      bg: "bg-amber-500/12 dark:bg-amber-400/20",
      activeBg: "bg-amber-500/20 dark:bg-amber-400/30",
      text: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500/15 dark:bg-amber-400/25",
      activeIconBg: "bg-amber-500/25 dark:bg-amber-400/35",
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
            : cn("bg-muted/50 group-hover:bg-muted", "group-hover:" + colors.iconBg)
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

// Expandable menu with submenu
interface ExpandableMenuProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  isExpanded: boolean
  onToggle: () => void
  accentColor: string
  children: React.ReactNode
}

function ExpandableMenu({ icon, label, isActive, isExpanded, onToggle, accentColor, children }: ExpandableMenuProps) {
  const colorClasses = {
    violet: {
      bg: "bg-violet-500/12 dark:bg-violet-400/20",
      activeBg: "bg-violet-500/18 dark:bg-violet-400/25",
      text: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-500/15 dark:bg-violet-400/25",
      activeIconBg: "bg-violet-500/22 dark:bg-violet-400/30",
      chevron: "text-violet-500/70 dark:text-violet-400/70",
      line: "bg-violet-500/20 dark:bg-violet-400/30",
    },
    amber: {
      bg: "bg-amber-500/12 dark:bg-amber-400/20",
      activeBg: "bg-amber-500/18 dark:bg-amber-400/25",
      text: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500/15 dark:bg-amber-400/25",
      activeIconBg: "bg-amber-500/22 dark:bg-amber-400/30",
      chevron: "text-amber-500/70 dark:text-amber-400/70",
      line: "bg-amber-500/20 dark:bg-amber-400/30",
    },
  } as const

  const colors = colorClasses[accentColor as keyof typeof colorClasses]

  return (
    <div>
      {/* Parent button */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full group flex items-center gap-3.5 px-3 py-3 rounded-2xl transition-all duration-200",
          "hover:scale-[1.02] active:scale-[0.98]",
          isActive || isExpanded
            ? cn(colors.activeBg, colors.text)
            : "hover:bg-muted/60"
        )}
        aria-expanded={isExpanded}
      >
        {/* Icon with background */}
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
            isActive || isExpanded
              ? colors.activeIconBg
              : "bg-muted/50 group-hover:bg-muted"
          )}
        >
          <span className={cn(
            "transition-colors duration-200",
            (isActive || isExpanded) && colors.text
          )}>
            {icon}
          </span>
        </div>
        {/* Label */}
        <span className={cn(
          "flex-1 text-left font-medium text-[15px] transition-colors duration-200",
          (isActive || isExpanded) && colors.text
        )}>
          {label}
        </span>
        {/* Chevron */}
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-all duration-300 ease-out",
            isExpanded && "rotate-90",
            (isActive || isExpanded) ? colors.chevron : "text-muted-foreground/50"
          )}
        />
      </button>

      {/* Submenu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out origin-top",
          isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="relative pl-[26px] py-2">
          {/* Vertical connecting line */}
          <div className={cn(
            "absolute left-[22px] top-0 bottom-2 w-[2px] rounded-full",
            colors.line
          )} />

          <div className="space-y-0.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Submenu item
interface SubmenuItemProps {
  href: string
  label: string
  isActive: boolean
  accentColor: string
  onClick: () => void
  className?: string
}

function SubmenuItem({ href, label, isActive, accentColor, onClick, className }: SubmenuItemProps) {
  const colorClasses = {
    violet: {
      activeBg: "bg-violet-500/15 dark:bg-violet-400/20",
      hoverBg: "hover:bg-violet-500/10 dark:hover:bg-violet-400/15",
      text: "text-violet-600 dark:text-violet-400",
      dot: "bg-violet-500 dark:bg-violet-400",
    },
    amber: {
      activeBg: "bg-amber-500/15 dark:bg-amber-400/20",
      hoverBg: "hover:bg-amber-500/10 dark:hover:bg-amber-400/15",
      text: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500 dark:bg-amber-400",
    },
  } as const

  const colors = colorClasses[accentColor as keyof typeof colorClasses]

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
        "hover:scale-[1.01] active:scale-[0.99]",
        isActive
          ? cn(colors.activeBg, colors.text)
          : cn("text-muted-foreground", colors.hoverBg, "hover:text-foreground"),
        className
      )}
    >
      {/* Connecting dot */}
      <div className="relative flex items-center justify-center w-3">
        <div className={cn(
          "w-[6px] h-[6px] rounded-full transition-all duration-200",
          isActive
            ? cn(colors.dot, "scale-110")
            : "bg-muted-foreground/40 group-hover:bg-muted-foreground/60"
        )} />
      </div>
      <span className="transition-colors duration-200">{label}</span>
    </Link>
  )
}

export function MobileHeader() {
  const { theme, setTheme } = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [guidesExpanded, setGuidesExpanded] = useState(false)
  const [blogExpanded, setBlogExpanded] = useState(false)
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
    setGuidesExpanded(false)
    setBlogExpanded(false)
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
  const isGuideActive = pathname.startsWith("/guide")
  const isBlogActive = pathname.startsWith("/blog")

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Header Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 px-3 flex items-center justify-between bg-background/85 backdrop-blur-2xl border-b border-border/40">
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
          "md:hidden fixed top-14 left-0 right-0 z-40",
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

          {/* Guides with Submenu */}
          <div className="mobile-menu-item">
            <ExpandableMenu
              icon={<BookOpen className="h-5 w-5" />}
              label="Guides"
              isActive={isGuideActive}
              isExpanded={guidesExpanded}
              onToggle={() => setGuidesExpanded(!guidesExpanded)}
              accentColor="violet"
            >
              {guideItems.map((item, index) => (
                <SubmenuItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={isActive(item.href)}
                  accentColor="violet"
                  onClick={closeMenu}
                  className={guidesExpanded ? "mobile-submenu-item" : ""}
                />
              ))}
            </ExpandableMenu>
          </div>

          {/* Blog with Submenu */}
          <div className="mobile-menu-item">
            <ExpandableMenu
              icon={<Newspaper className="h-5 w-5" />}
              label="Blog"
              isActive={isBlogActive}
              isExpanded={blogExpanded}
              onToggle={() => setBlogExpanded(!blogExpanded)}
              accentColor="amber"
            >
              {blogItems.map((item, index) => (
                <SubmenuItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={isActive(item.href)}
                  accentColor="amber"
                  onClick={closeMenu}
                  className={blogExpanded ? "mobile-submenu-item" : ""}
                />
              ))}
            </ExpandableMenu>
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
