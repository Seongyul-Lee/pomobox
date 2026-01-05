"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Mobile-only floating navigation for guide/blog pages
 * Positioned above bottom navigation bar (h-16 = 64px + safe area)
 * Shows links to Guide and Blog pages (not accessible from main nav)
 */
export function MobileGuideNav() {
  const pathname = usePathname()

  // Check current section
  const isGuidePage = pathname.startsWith("/guide")
  const isBlogPage = pathname.startsWith("/blog")

  return (
    <nav
      className="xl:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 px-4 py-2.5 pointer-events-none"
      aria-label="Content navigation"
    >
      <div className="flex justify-center items-center gap-3 pointer-events-auto">
        {/* Guide Button */}
        <Link
          href="/guide/what-is-pomodoro"
          className={cn(
            "group flex items-center gap-2 px-4 py-2.5 rounded-full",
            "bg-background/90 dark:bg-card/80",
            "backdrop-blur-xl backdrop-saturate-150",
            "border shadow-lg shadow-black/5 dark:shadow-black/20",
            "active:scale-95 transition-all duration-300 ease-out",
            isGuidePage
              ? "border-primary/50 dark:border-primary/40 text-primary"
              : "border-border/50 dark:border-white/10 hover:border-violet-500/30 dark:hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10"
          )}
          aria-label="Go to Guides"
          aria-current={isGuidePage ? "page" : undefined}
        >
          <BookOpen
            className={cn(
              "h-4 w-4 transition-all duration-300",
              isGuidePage
                ? "text-primary"
                : "text-muted-foreground group-hover:text-violet-500 group-hover:scale-110"
            )}
          />
          <span className={cn(
            "text-sm font-medium transition-colors duration-300",
            isGuidePage
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}>
            Guides
          </span>
        </Link>

        {/* Blog Button */}
        <Link
          href="/blog/pomodoro-history"
          className={cn(
            "group flex items-center gap-2 px-4 py-2.5 rounded-full",
            "bg-background/90 dark:bg-card/80",
            "backdrop-blur-xl backdrop-saturate-150",
            "border shadow-lg shadow-black/5 dark:shadow-black/20",
            "active:scale-95 transition-all duration-300 ease-out",
            isBlogPage
              ? "border-amber-500/50 dark:border-amber-500/40 text-amber-600 dark:text-amber-400"
              : "border-border/50 dark:border-white/10 hover:border-amber-500/30 dark:hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10"
          )}
          aria-label="Go to Blog"
          aria-current={isBlogPage ? "page" : undefined}
        >
          <Newspaper
            className={cn(
              "h-4 w-4 transition-all duration-300",
              isBlogPage
                ? "text-amber-500"
                : "text-muted-foreground group-hover:text-amber-500 group-hover:scale-110"
            )}
          />
          <span className={cn(
            "text-sm font-medium transition-colors duration-300",
            isBlogPage
              ? "text-amber-600 dark:text-amber-400"
              : "text-muted-foreground group-hover:text-foreground"
          )}>
            Blog
          </span>
        </Link>
      </div>
    </nav>
  )
}
