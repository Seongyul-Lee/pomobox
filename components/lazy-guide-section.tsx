"use client"

import dynamic from "next/dynamic"

// Skeleton for PomodoroGuideSection (below-the-fold)
function PomodoroGuideSkeleton() {
  return (
    <div className="md:ml-16 lg:ml-20 bg-gradient-to-b from-transparent via-muted/30 to-muted/50 dark:via-background dark:to-muted/10">
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-6 w-40 mx-auto rounded-full bg-muted/30 animate-pulse" />
            <div className="mt-6 h-12 w-80 mx-auto rounded bg-muted/20 animate-pulse" />
            <div className="mt-4 h-6 w-64 mx-auto rounded bg-muted/20 animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 w-12 mx-auto rounded bg-muted/20 animate-pulse" />
                <div className="h-4 w-16 mx-auto rounded bg-muted/30 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Dynamic import with SSR disabled for faster initial page load
const PomodoroGuideSection = dynamic(
  () => import("@/components/pomodoro-guide-section").then(m => ({ default: m.PomodoroGuideSection })),
  {
    ssr: false,
    loading: () => <PomodoroGuideSkeleton />
  }
)

export function LazyGuideSection() {
  return <PomodoroGuideSection />
}
