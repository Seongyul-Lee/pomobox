import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { Link as LocaleLink } from "@/i18n/navigation"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { TaskPanel } from "@/components/task-panel"
import { DashboardRight } from "@/components/dashboard-right"
import { BgmPanel } from "@/components/bgm-panel"
import { MainLayout } from "@/components/main-layout"

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
        {/* Fixed Sidebar (md+) */}
        <Sidebar />

        {/* Task Panel (slides from left on desktop, bottom sheet on mobile) */}
        <TaskPanel />

        {/* Fixed Header Controls */}
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
          adArea={
            <div className="h-[600px] rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Ad</span>
            </div>
          }
          mobileContent={
            <>
              <BgmPanel />
              <Suspense fallback={null}>
                <DashboardRight />
              </Suspense>
            </>
          }
        >
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
        </MainLayout>

        {/* SEO Section */}
        <section className="mb-10 md:ml-16 lg:ml-20">
          <div className="px-4 xl:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-lg xl:text-xl font-bold text-foreground mb-4">
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
        <div className="w-full px-4 xl:px-8 pb-3 md:ml-16 lg:ml-20">
          {/* 하단 광고 여백 */}
          <div className="h-24 mb-2" />

          {/* Minimal Footer */}
          <div className="text-center text-xs text-muted-foreground py-1">
            <span>© 2025 pomobox</span>
            <span className="mx-2">·</span>
            <LocaleLink href="/about" className="hover:text-foreground hover:underline">
              About
            </LocaleLink>
            <span className="mx-2">·</span>
            <LocaleLink href="/contact" className="hover:text-foreground hover:underline">
              Contact
            </LocaleLink>
            <span className="mx-2">·</span>
            <LocaleLink href="/privacy" className="hover:text-foreground hover:underline">
              Privacy
            </LocaleLink>
            <span className="mx-2">·</span>
            <LocaleLink href="/terms" className="hover:text-foreground hover:underline">
              Terms
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
