"use client"

import Link from "next/link"
import { Home, BarChart3 } from "lucide-react"

/**
 * Mobile-only floating navigation for guide pages
 * Positioned below the MobileHeader (h-14 = 56px)
 * Displays Home (left) and Stats (right) buttons
 */
export function MobileGuideNav() {
  return (
    <nav
      className="xl:hidden sticky top-14 z-30 px-4 py-2.5 -mt-px"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-between items-center">
        {/* Home Button - Left */}
        <Link
          href="/"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full
                     bg-background/80 dark:bg-card/60
                     backdrop-blur-xl backdrop-saturate-150
                     border border-border/50 dark:border-white/10
                     shadow-lg shadow-black/5 dark:shadow-black/20
                     hover:bg-background dark:hover:bg-card/80
                     hover:border-primary/30 dark:hover:border-primary/40
                     hover:shadow-xl hover:shadow-primary/10
                     active:scale-95
                     transition-all duration-300 ease-out"
          aria-label="Go to Home"
        >
          <Home
            className="h-4 w-4 text-muted-foreground
                       group-hover:text-primary
                       group-hover:scale-110
                       transition-all duration-300"
          />
          <span className="text-sm font-medium text-muted-foreground
                          group-hover:text-foreground
                          transition-colors duration-300">
            Home
          </span>
        </Link>

        {/* Stats Button - Right */}
        <Link
          href="/stats"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full
                     bg-background/80 dark:bg-card/60
                     backdrop-blur-xl backdrop-saturate-150
                     border border-border/50 dark:border-white/10
                     shadow-lg shadow-black/5 dark:shadow-black/20
                     hover:bg-background dark:hover:bg-card/80
                     hover:border-emerald-500/30 dark:hover:border-emerald-500/40
                     hover:shadow-xl hover:shadow-emerald-500/10
                     active:scale-95
                     transition-all duration-300 ease-out"
          aria-label="Go to Statistics"
        >
          <span className="text-sm font-medium text-muted-foreground
                          group-hover:text-foreground
                          transition-colors duration-300">
            Stats
          </span>
          <BarChart3
            className="h-4 w-4 text-muted-foreground
                       group-hover:text-emerald-500
                       group-hover:scale-110
                       transition-all duration-300"
          />
        </Link>
      </div>
    </nav>
  )
}
