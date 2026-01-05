"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Timer, ListTodo, BarChart3, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTaskStore } from "@/lib/store"
import { useUser } from "@/hooks/use-user"

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  href?: string
  onClick?: () => void
}

export function MobileNav() {
  const pathname = usePathname()
  const toggleTaskPanel = useTaskStore((state) => state.toggleTaskPanel)
  const isTaskPanelOpen = useTaskStore((state) => state.isTaskPanelOpen)
  const { user } = useUser()

  // Check if current path matches
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === ""
    }
    return pathname.startsWith(path)
  }

  const navItems: NavItem[] = [
    {
      id: "timer",
      label: "Timer",
      icon: Timer,
      href: "/",
    },
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
    },
    {
      id: "user",
      label: "Account",
      icon: User,
      href: user ? "/mypage" : "/auth/login",
    },
  ]

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 h-16 pb-safe bg-background/90 backdrop-blur-lg border-t border-border/50"
    >
      <div className="h-full flex items-center justify-around px-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isCurrentActive = item.href ? isActive(item.href) : (item.id === "task" && isTaskPanelOpen)

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl min-w-[64px]",
                  "transition-all duration-200 active:scale-95",
                  isCurrentActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                aria-label={item.label}
                aria-current={isCurrentActive ? "page" : undefined}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  isCurrentActive && "bg-primary/10"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl min-w-[64px]",
                "transition-all duration-200 active:scale-95",
                isCurrentActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              aria-label={item.label}
            >
              <div className={cn(
                "p-2 rounded-xl transition-colors",
                isCurrentActive && "bg-primary/10"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
