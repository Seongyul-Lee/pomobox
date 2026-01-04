import type { Metadata } from "next"
import { StatsContent } from "@/components/stats/stats-content"

export const metadata: Metadata = {
  title: "Statistics | Pomobox",
  description: "View your focus statistics and productivity patterns",
  openGraph: {
    title: "Statistics | Pomobox",
    description: "View your focus statistics and productivity patterns",
    type: "website",
  },
}

export default function StatsPage() {
  return (
    <main
      role="main"
      className="min-h-screen bg-[oklch(98.5%_0.0025_247.8)] dark:bg-[oklch(14.5%_0.00625_285.8)] text-[oklch(21.7%_0.026_264.4)] dark:text-[oklch(100%_0_0)]"
    >
      {/* Mobile header with back button (md 미만) */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-lg font-semibold">Focus Statistics</h1>
      </header>

      {/* Main content area */}
      <div className="md:ml-20 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page header (데스크탑 only) */}
          <section className="hidden md:block">
            <h1 className="text-2xl md:text-3xl font-bold">Focus Statistics</h1>
            <p className="text-muted-foreground mt-1">Track your focus time and productivity patterns</p>
          </section>

          {/* Stats content sections */}
          <StatsContent />
        </div>
      </div>
    </main>
  )
}
