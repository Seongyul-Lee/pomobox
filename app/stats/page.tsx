import type { Metadata } from "next"
import { Suspense } from "react"
import { StatsContent } from "@/components/stats/stats-content"

export const metadata: Metadata = {
  title: "Statistics | Pomobox",
  description: "View your focus statistics and productivity patterns. Track weekly patterns, growth analysis, and monthly trends.",
  openGraph: {
    title: "Statistics | Pomobox",
    description: "View your focus statistics and productivity patterns. Track weekly patterns, growth analysis, and monthly trends.",
    type: "website",
  },
}

// Loading skeleton for initial page load
function StatsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-xl p-6">
          <div className="h-6 w-40 bg-muted/50 rounded animate-pulse mb-4" />
          <div className="h-64 bg-muted/50 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export default function StatsPage() {
  return (
    <main
      role="main"
      className="min-h-screen bg-background text-foreground"
    >
      {/* Mobile header with back button (md 미만) */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-lg font-semibold">Statistics</h1>
      </header>

      {/* Main content area */}
      <main className="flex-1 pt-4 md:pt-8 pb-6 md:ml-20">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          {/* Page header */}
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Statistics</h1>
            <p className="text-muted-foreground mt-1">
              Track your focus patterns and progress
            </p>
          </header>

          {/* Stats content sections */}
          <Suspense fallback={<StatsLoadingSkeleton />}>
            <StatsContent />
          </Suspense>
        </div>
      </main>
    </main>
  )
}
