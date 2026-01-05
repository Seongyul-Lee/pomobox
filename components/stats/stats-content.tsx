"use client"

import { Suspense } from "react"
import { WeeklyStatsChart } from "@/components/stats/weekly-stats-chart"
import { WeekComparison } from "@/components/stats/week-comparison"
import { Rolling4WeekChart } from "@/components/stats/rolling-4week-chart"
import { HourlyDistributionChart } from "@/components/stats/hourly-distribution-chart"
import { StatsHero } from "@/components/stats/stats-hero"
import { TodayStats } from "@/components/stats/today-stats"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoginRequiredOverlay } from "@/components/stats/login-required-overlay"
import { useUser } from "@/hooks/use-user"

// Skeleton for chart loading states
function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`${height} animate-pulse`}>
      <div className="h-full bg-muted/20 rounded-2xl" />
    </div>
  )
}

// Skeleton for bento card
function BentoSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-muted/10 animate-pulse ${className}`}>
      <div className="p-6">
        <div className="h-5 w-24 bg-muted/30 rounded mb-4" />
        <div className="h-48 bg-muted/20 rounded-xl" />
      </div>
    </div>
  )
}

// Bento card wrapper with glass morphism
function BentoCard({
  children,
  className = "",
  gradient = "from-primary/5 to-transparent",
}: {
  children: React.ReactNode
  className?: string
  gradient?: string
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${gradient}
        border border-border/50
        backdrop-blur-sm
        transition-all duration-300
        hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
        ${className}
      `}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Section header with accent line
function SectionHeader({
  title,
  subtitle,
  id,
}: {
  title: string
  subtitle?: string
  id: string
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-primary/30" />
      <div>
        <h3 id={id} className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export function StatsContent() {
  const { isLoggedIn, loading: authLoading } = useUser()

  // 비로그인 사용자에게는 Mock 데이터 + 오버레이 표시
  const showMockData = !isLoggedIn && !authLoading

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Section - This Week + Today */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        {/* This Week Summary - spans 7 columns on lg */}
        <div className="lg:col-span-7">
          <ErrorBoundary
            fallback={
              <div className="h-48 bg-muted/10 rounded-3xl animate-pulse" />
            }
          >
            <Suspense
              fallback={
                <div className="h-48 bg-muted/10 rounded-3xl animate-pulse" />
              }
            >
              <StatsHero />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Today Stats - spans 5 columns on lg */}
        <div className="lg:col-span-5">
          <ErrorBoundary
            fallback={
              <div className="h-48 bg-muted/10 rounded-2xl animate-pulse" />
            }
          >
            <Suspense
              fallback={
                <div className="h-48 bg-muted/10 rounded-2xl animate-pulse" />
              }
            >
              <TodayStats />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        {/* Weekly Pattern - Large Card (spans 7 columns) */}
        <section
          aria-labelledby="weekly-stats-title"
          className="lg:col-span-7"
        >
          <ErrorBoundary fallback={<BentoSkeleton className="h-full" />}>
            <BentoCard
              gradient="from-chart-1/8 via-transparent to-transparent"
              className="h-full"
            >
              <div className="relative p-5 lg:p-6">
                <SectionHeader
                  id="weekly-stats-title"
                  title="Weekly Pattern"
                  subtitle="Your focus rhythm this week"
                />
                <Suspense fallback={<ChartSkeleton height="h-[260px]" />}>
                  <WeeklyStatsChart useMockData={showMockData} />
                </Suspense>
                {showMockData && (
                  <LoginRequiredOverlay
                    title="Unlock Weekly Insights"
                    description="Sign in to track your weekly focus patterns"
                  />
                )}
              </div>
            </BentoCard>
          </ErrorBoundary>
        </section>

        {/* Monthly Trend - Medium Card (spans 5 columns) */}
        <section
          aria-labelledby="rolling-stats-title"
          className="lg:col-span-5"
        >
          <ErrorBoundary fallback={<BentoSkeleton className="h-full" />}>
            <BentoCard
              gradient="from-chart-2/8 via-transparent to-transparent"
              className="h-full"
            >
              <div className="relative p-5 lg:p-6">
                <SectionHeader
                  id="rolling-stats-title"
                  title="Monthly Trend"
                  subtitle="4-week progress overview"
                />
                <Suspense fallback={<ChartSkeleton height="h-[260px]" />}>
                  <Rolling4WeekChart useMockData={showMockData} />
                </Suspense>
                {showMockData && (
                  <LoginRequiredOverlay
                    title="Unlock Monthly Trends"
                    description="Sign in to see your progress over time"
                  />
                )}
              </div>
            </BentoCard>
          </ErrorBoundary>
        </section>

        {/* Growth Analysis - Full Width */}
        <section
          aria-labelledby="weekly-comparison-title"
          className="lg:col-span-12"
        >
          <ErrorBoundary fallback={<BentoSkeleton />}>
            <BentoCard gradient="from-primary/5 via-transparent to-chart-4/5">
              <div className="relative p-5 lg:p-6">
                <SectionHeader
                  id="weekly-comparison-title"
                  title="Growth Analysis"
                  subtitle="This week vs last week"
                />
                <Suspense
                  fallback={
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-32 bg-muted/20 rounded-xl animate-pulse"
                        />
                      ))}
                    </div>
                  }
                >
                  <WeekComparison useMockData={showMockData} />
                </Suspense>
                {showMockData && (
                  <LoginRequiredOverlay
                    title="Unlock Growth Analysis"
                    description="Sign in to compare your weekly performance"
                  />
                )}
              </div>
            </BentoCard>
          </ErrorBoundary>
        </section>

        {/* Focus Hours - Full Width with special treatment */}
        <section
          aria-labelledby="hourly-distribution-title"
          className="lg:col-span-12"
        >
          <ErrorBoundary fallback={<BentoSkeleton />}>
            <BentoCard gradient="from-chart-5/8 via-transparent to-chart-3/5">
              <div className="relative p-5 lg:p-6">
                <SectionHeader
                  id="hourly-distribution-title"
                  title="Focus Hours"
                  subtitle="When you're most productive"
                />
                <Suspense fallback={<ChartSkeleton height="h-[280px]" />}>
                  <HourlyDistributionChart useMockData={showMockData} />
                </Suspense>
                {showMockData && (
                  <LoginRequiredOverlay
                    title="Discover Peak Hours"
                    description="Sign in to find when you're most productive"
                  />
                )}
              </div>
            </BentoCard>
          </ErrorBoundary>
        </section>
      </div>
    </div>
  )
}
