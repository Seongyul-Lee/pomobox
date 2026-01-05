"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeeklyStatsChart } from "@/components/stats/weekly-stats-chart"
import { WeekComparison } from "@/components/stats/week-comparison"
import { Rolling4WeekChart } from "@/components/stats/rolling-4week-chart"
import { HourlyDistributionChart } from "@/components/stats/hourly-distribution-chart"
import { ErrorBoundary } from "@/components/error-boundary"

// Skeleton for chart loading states
function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`${height} animate-pulse`}>
      <div className="h-full bg-muted/50 rounded-lg" />
    </div>
  )
}

// Skeleton for section loading
function SectionSkeleton() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="h-6 w-32 bg-muted/50 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <ChartSkeleton />
      </CardContent>
    </Card>
  )
}

export function StatsContent() {
  return (
    <div className="space-y-8">
      {/* Section 1: Weekly Pattern */}
      <section aria-labelledby="weekly-stats-title">
        <ErrorBoundary fallback={<SectionSkeleton />}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle id="weekly-stats-title" className="text-lg font-bold">
                Weekly Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ChartSkeleton />}>
                <WeeklyStatsChart />
              </Suspense>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </section>

      {/* Section 2: Growth Analysis */}
      <section aria-labelledby="weekly-comparison-title">
        <ErrorBoundary fallback={<SectionSkeleton />}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle id="weekly-comparison-title" className="text-lg font-bold">
                Growth Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ChartSkeleton height="h-48" />}>
                <WeekComparison />
              </Suspense>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </section>

      {/* Section 3: Monthly Trend */}
      <section aria-labelledby="rolling-stats-title">
        <ErrorBoundary fallback={<SectionSkeleton />}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle id="rolling-stats-title" className="text-lg font-bold">
                Monthly Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ChartSkeleton />}>
                <Rolling4WeekChart />
              </Suspense>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </section>

      {/* Section 4: Hourly Distribution */}
      <section aria-labelledby="hourly-distribution-title">
        <ErrorBoundary fallback={<SectionSkeleton />}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle id="hourly-distribution-title" className="text-lg font-bold">
                Focus Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ChartSkeleton />}>
                <HourlyDistributionChart />
              </Suspense>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </section>
    </div>
  )
}
