import type { Metadata } from "next"
import { Suspense } from "react"
import { StatsContent } from "@/components/stats/stats-content"

export const metadata: Metadata = {
  title: "Track Focus & Productivity Statistics",
  description: "Visualize your focus patterns with detailed charts and heatmaps. Track weekly progress, monthly trends, and productivity growth. Discover your peak hours to optimize study and work sessions.",
  openGraph: {
    title: "Track Focus & Productivity Statistics | Pomobox",
    description: "Visualize your focus patterns with detailed charts and heatmaps. Track weekly progress, monthly trends, and productivity growth.",
    type: "website",
    url: "https://pomobox.app/stats",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Focus & Productivity Statistics | Pomobox",
    description: "Visualize your focus patterns with charts and heatmaps. Discover peak hours & boost productivity.",
  },
  alternates: {
    canonical: "https://pomobox.app/stats",
  },
  keywords: ["statistics", "productivity", "focus tracking", "pomodoro", "session tracking"],
}

// Loading skeleton for initial page load
function StatsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero skeleton */}
      <div className="h-40 bg-muted/10 rounded-3xl animate-pulse" />
      {/* Bento grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 h-80 bg-muted/10 rounded-2xl animate-pulse" />
        <div className="lg:col-span-5 h-80 bg-muted/10 rounded-2xl animate-pulse" />
        <div className="lg:col-span-12 h-48 bg-muted/10 rounded-2xl animate-pulse" />
      </div>
    </div>
  )
}

export default function StatsPage() {
  // JSON-LD 구조화 데이터: WebPage + BreadcrumbList
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Focus Statistics",
    description: "View your focus statistics and productivity patterns. Track weekly progress, monthly trends, and productivity growth.",
    url: "https://pomobox.app/stats",
    isPartOf: {
      "@type": "WebApplication",
      name: "Pomobox",
      applicationCategory: "ProductivityApplication",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pomobox.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Statistics",
          item: "https://pomobox.app/stats",
        },
      ],
    },
  }

  return (
    <main
      role="main"
      className="min-h-screen bg-background text-foreground"
    >
      {/* Mobile header (md 미만) */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <h1 className="text-lg font-semibold tracking-tight">Statistics</h1>
      </header>

      {/* Main content area */}
      <div className="flex-1 pt-4 md:pt-8 pb-12 md:ml-20">
        <div className="max-w-6xl mx-auto px-4 xl:px-8">
          {/* Page header - Editorial style */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-border via-border to-transparent max-w-16" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Analytics
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Statistics
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-xl">
              Discover your focus patterns and track your productivity journey
            </p>
          </header>

          {/* Stats content sections */}
          <Suspense fallback={<StatsLoadingSkeleton />}>
            <StatsContent />
          </Suspense>
        </div>
      </div>

      {/* JSON-LD structured data - static content, safe usage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
    </main>
  )
}
