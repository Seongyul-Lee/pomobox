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

      {/* JSON-LD structured data - static content, safe usage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
    </main>
  )
}
