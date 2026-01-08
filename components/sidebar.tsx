"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ListTodo, BarChart3, BookOpen, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { UserMenu } from "@/components/user-menu"
import { useTaskStore, useUIStore } from "@/lib/store"

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  href?: string
  onClick?: () => void
  isActive?: boolean
}

export function Sidebar() {
  const pathname = usePathname()

  // UI store for Settings Dialog
  const setSettingsOpen = useUIStore((state) => state.setSettingsOpen)

  // Task panel controls
  const toggleTaskPanel = useTaskStore((state) => state.toggleTaskPanel)
  const closeTaskPanel = useTaskStore((state) => state.closeTaskPanel)

  // Check if current path matches
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === ""
    }
    return pathname.startsWith(path)
  }

  // Icon size for navigation items
  const iconClass = "size-4 md:size-5"

  const navItems: NavItem[] = [
    {
      id: "task",
      label: "Tasks",
      icon: ListTodo,
      onClick: toggleTaskPanel,
    },
    {
      id: "statistics",
      label: "Statistics",
      icon: BarChart3,
      href: "/stats",
      isActive: isActive("/stats"),
    },
    {
      id: "learn",
      label: "Learn",
      icon: BookOpen,
      href: "/learn",
      isActive: isActive("/learn"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      onClick: () => setSettingsOpen(true),
    },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <nav
        role="navigation"
        aria-label="Main Navigation"
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
                onClick={closeTaskPanel}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl hover:scale-105 transition-transform duration-200"
                aria-label="Home"
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
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Middle: Navigation Items */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isCurrentActive = item.isActive

            if (item.href) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      onClick={closeTaskPanel}
                      className={cn(
                        "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl",
                        "transition-all duration-200",
                        "hover:bg-primary/10 hover:scale-105",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        isCurrentActive && "bg-primary/15 text-primary"
                      )}
                      aria-label={item.label}
                      aria-current={isCurrentActive ? "page" : undefined}
                    >
                      <Icon className={iconClass} aria-hidden="true" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
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
                    aria-label={item.label}
                  >
                    <Icon className={iconClass} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
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
            iconClassName={iconClass}
          />
        </div>
      </nav>
    </TooltipProvider>
  )
}
