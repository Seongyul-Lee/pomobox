import { Suspense } from "react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Link as LocaleLink } from "@/i18n/navigation"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { DashboardLeft } from "@/components/dashboard-left"
import { DashboardRight } from "@/components/dashboard-right"
import { BgmPanel } from "@/components/bgm-panel"

type Props = {
  params: Promise<{ locale: string }>
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

export default async function Home({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations("Home")
  const tGuide = await getTranslations("Guide")
  const tMeta = await getTranslations("Metadata")

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
    description: tMeta("description"),
    featureList: ["Pomodoro Timer", "Task Management", "Statistics", "White Noise"],
    url: `https://pomobox.app/${locale}`,
    screenshot: "https://pomobox.app/og-image.png",
  }

  return (
      <main className="relative min-h-screen flex flex-col text-foreground pt-safe">
        {/* Fixed Header Controls */}
        <ThemeToggle />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <UserMenu />
        </div>

        {/* Main Layout */}
        <div className="flex-1 pt-16 pb-6 siderail-margin">
          <div className="main-layout flex justify-center items-start gap-4 px-4 xl:px-8">
            {/* 3-Column Content Grid */}
            <div className="dashboard-grid w-full grid grid-cols-1 xl:grid-cols-[570px_minmax(400px,1fr)_570px] gap-6 xl:gap-6 xl:items-stretch">
              {/* Left: Dashboard (오늘 요약, 주간, 월간) */}
              <aside className="hidden xl:flex xl:flex-col gap-4" aria-label="Statistics Dashboard">
                <Suspense fallback={null}>
                  <DashboardLeft />
                </Suspense>
              </aside>

              {/* Center: Timer */}
              <section className="flex flex-col items-center justify-start pt-8 xl:pt-12">
                <div className="hidden md:block text-center mb-4 md:mb-8 px-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 hover-title-outline inline-block">
                    {t("title")}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 hover-phase-label">{t("description")}</p>
                </div>
                <Suspense fallback={<TimerFallback />}>
                  <PomodoroTimer />
                </Suspense>
              </section>

              {/* Right: BGM + Activity Calendar */}
              <aside className="hidden xl:flex xl:flex-col gap-4" aria-label="Music and Calendar">
                <BgmPanel />
                <Suspense fallback={null}>
                  <DashboardRight />
                </Suspense>
              </aside>
            </div>
          </div>

          {/* Mobile: Stacked panels below timer */}
          <div className="xl:hidden mt-8 space-y-6 max-w-md mx-auto">
            <BgmPanel />
            <Suspense fallback={null}>
              <DashboardLeft />
            </Suspense>
            <Suspense fallback={null}>
              <DashboardRight />
            </Suspense>
          </div>
        </div>

        {/* SEO Section */}
        <section className="mb-10 siderail-margin">
          <div className="px-4 xl:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-lg xl:text-xl font-bold text-white mb-4">
                {t("seoSectionTitle")}
              </h2>
              <p className="text-sm xl:text-base text-gray-400 mb-5 leading-relaxed">
                {t("seoSectionDesc")}
              </p>
              <LocaleLink
                href="/guide/what-is-pomodoro"
                className="text-primary hover:underline text-sm"
              >
                {t("seoSectionMore")} →
              </LocaleLink>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="w-full px-4 xl:px-8 pb-3">
          {/* 하단 광고 여백 */}
          <div className="h-24 mb-2" />

          {/* Minimal Footer */}
          <div className="text-center text-xs text-muted-foreground py-1">
            <span>© 2025 pomobox</span>
            <span className="mx-2">·</span>
            <Link href="/privacy" className="hover:text-foreground hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-2">·</span>
            <LocaleLink href="/guide/what-is-pomodoro" className="hover:text-foreground hover:underline">
              {tGuide("whatIsPomodoro")}
            </LocaleLink>
          </div>
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
