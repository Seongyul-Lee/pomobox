import { Suspense } from "react"
import dynamic from "next/dynamic"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainLayout } from "@/components/main-layout"
import { PwaInstallPrompt } from "@/components/pwa-install-prompt"
import { AdSenseVerticalBanner } from "@/components/adsense-vertical-banner"
import { AdSenseHorizontalBanner } from "@/components/adsense-horizontal-banner"
import { LazyGuideSection } from "@/components/lazy-guide-section"

// Skeleton for DashboardRight (Activity Calendar)
function DashboardRightSkeleton() {
  return (
    <div className="glass-card border-0 flex flex-col flex-1 rounded-xl p-4 xl:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 xl:h-6 xl:w-6 rounded bg-muted/30 animate-pulse" />
          <div className="h-5 w-32 rounded bg-muted/20 animate-pulse" />
        </div>
        <div className="h-4 w-20 rounded bg-muted/30 animate-pulse" />
      </div>
      <div className="p-3 xl:p-4 rounded-xl bg-muted/10 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-muted/20 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-4 w-20 rounded bg-muted/20 animate-pulse" />
              <div className="h-3 w-16 rounded bg-muted/30 animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-20 rounded bg-muted/20 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-muted/10">
            <div className="h-6 w-6 rounded bg-muted/20 animate-pulse mb-1" />
            <div className="h-5 w-8 rounded bg-muted/20 animate-pulse" />
            <div className="h-3 w-12 rounded bg-muted/30 animate-pulse mt-1" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`label-${i}`} className="h-4 rounded bg-muted/30 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5 xl:gap-2.5 flex-1 content-start">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={`day-${i}`} className="aspect-square rounded-md xl:rounded-lg bg-muted/20 animate-pulse" />
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 mt-auto">
        <div className="h-3 w-20 rounded bg-muted/30 animate-pulse" />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 w-3 rounded bg-muted/20 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Skeleton for BgmPanel
function BgmPanelSkeleton() {
  return (
    <div className="glass-card border-0 rounded-xl p-4 xl:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-5 rounded bg-muted/30 animate-pulse" />
        <div className="h-5 w-24 rounded bg-muted/20 animate-pulse" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-muted/20 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-muted/20 animate-pulse" />
          <div className="h-2 w-full rounded bg-muted/10 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// Skeleton for BgmMiniPlayer (mobile)
function BgmMiniPlayerSkeleton() {
  return (
    <div className="glass-card border-0 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-muted/20 animate-pulse" />
        <div className="flex-1">
          <div className="h-3 w-24 rounded bg-muted/20 animate-pulse" />
        </div>
        <div className="h-6 w-12 rounded bg-muted/20 animate-pulse" />
      </div>
    </div>
  )
}

// Static timer skeleton for fast LCP - shows default 25:00
function TimerFallback() {
  return (
    <div className="relative flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-lg font-bold text-foreground uppercase tracking-wider mb-1">
          Focus Session
        </p>
        <p className="text-xs text-muted-foreground mb-2">
          Time to concentrate
        </p>
      </div>
      <div className="relative flex items-center justify-center">
        <svg className="w-64 h-64 sm:w-72 sm:h-72 -rotate-90" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r={140} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted dark:text-[oklch(100%_0_0/0.1)]" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-mono font-semibold tracking-tight text-foreground">
            25:00
          </span>
        </div>
      </div>
    </div>
  )
}

// Dynamic imports for non-critical components (improves FCP)
// Note: In Next.js 16 Server Components, ssr: false is not allowed
// Using loading option instead for skeleton fallback
const DashboardRight = dynamic(
  () => import("@/components/dashboard-right").then((m) => m.DashboardRight),
  { loading: () => <DashboardRightSkeleton /> }
)

const BgmPanel = dynamic(
  () => import("@/components/bgm-panel").then((m) => m.BgmPanel),
  { loading: () => <BgmPanelSkeleton /> }
)

const BgmMiniPlayer = dynamic(
  () => import("@/components/bgm-mini-player").then((m) => m.BgmMiniPlayer),
  { loading: () => <BgmMiniPlayerSkeleton /> }
)

const siteDescription = "A clean, distraction-free Pomodoro timer to boost your productivity. Track focus sessions, take smart breaks, and stay in flow."

export default function Home() {
  // JSON-LD structured data: WebApplication (static, safe to use)
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pomobox",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: siteDescription,
    featureList: ["Pomodoro Timer", "Task Management", "Statistics", "White Noise"],
    url: "https://pomobox.app",
    screenshot: "https://pomobox.app/og-image.png",
  }

  return (
      <main className="relative min-h-screen flex flex-col text-foreground">
        {/* Fixed Header Controls (desktop only) */}
        <ThemeToggle />

        {/* Main Layout - Dynamic layout based on Task Panel state */}
        <MainLayout
          rightWidget={
            <>
              <Suspense fallback={<BgmPanelSkeleton />}>
                <BgmPanel />
              </Suspense>
              <Suspense fallback={<DashboardRightSkeleton />}>
                <DashboardRight />
              </Suspense>
            </>
          }
          mobileContent={
            <>
              <Suspense fallback={<BgmMiniPlayerSkeleton />}>
                <BgmMiniPlayer />
              </Suspense>
              <Suspense fallback={<DashboardRightSkeleton />}>
                <DashboardRight />
              </Suspense>
            </>
          }
          adArea={<AdSenseVerticalBanner />}
        >
          {/* Center: Timer */}
          <section className="flex flex-col items-center justify-start pt-8 xl:pt-12">
            <div className="hidden md:block text-center mb-4 md:mb-8 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 hover-title-outline inline-block">
                Pomodoro Timer
              </h1>
              <p className="text-slate-500 dark:text-slate-400 hover-phase-label">Stay focused, one session at a time</p>
            </div>
            <Suspense fallback={<TimerFallback />}>
              <PomodoroTimer />
            </Suspense>
          </section>
        </MainLayout>

        {/* Pomodoro Guide Sections - Lazy loaded for faster initial page load */}
        <LazyGuideSection />

        {/* PWA Install Prompt */}
        <div className="md:ml-16 lg:ml-20 py-6 md:py-8 px-4 xl:px-8">
          <div className="max-w-4xl mx-auto">
            <PwaInstallPrompt />
          </div>
        </div>

        {/* Ad Banner - Desktop only */}
        <div className="hidden xl:block w-full px-4 xl:px-8 md:ml-16 lg:ml-20">
          <AdSenseHorizontalBanner />
        </div>

        {/* JSON-LD structured data - static content, XSS-safe */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationJsonLd),
          }}
        />
      </main>
  )
}
