import { Suspense } from "react"
import dynamic from "next/dynamic"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { ThemeToggle } from "@/components/theme-toggle"
import { DashboardRight } from "@/components/dashboard-right"
import { BgmPanel } from "@/components/bgm-panel"
import { BgmMiniPlayer } from "@/components/bgm-mini-player"
import { MainLayout } from "@/components/main-layout"
import { PwaInstallPrompt } from "@/components/pwa-install-prompt"
import { AdSenseVerticalBanner } from "@/components/adsense-vertical-banner"
import { AdSenseHorizontalBanner } from "@/components/adsense-horizontal-banner"

// Dynamic import for below-the-fold content (improves LCP)
const PomodoroGuideSection = dynamic(
  () => import("@/components/pomodoro-guide-section").then(m => ({ default: m.PomodoroGuideSection })),
  { ssr: true }
)

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

const siteDescription = "A clean, distraction-free Pomodoro timer to boost your productivity. Track focus sessions, take smart breaks, and stay in flow."

export default function Home() {
  // JSON-LD 구조화 데이터: WebApplication
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
              <BgmPanel />
              <Suspense fallback={null}>
                <DashboardRight />
              </Suspense>
            </>
          }
          mobileContent={
            <>
              <BgmMiniPlayer />
              <Suspense fallback={null}>
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

        {/* Pomodoro Guide Sections */}
        <PomodoroGuideSection />

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

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationJsonLd),
          }}
        />
      </main>
  )
}
