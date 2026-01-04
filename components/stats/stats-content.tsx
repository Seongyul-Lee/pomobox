"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeeklyStatsChart } from "@/components/stats/weekly-stats-chart"
import { WeekComparison } from "@/components/stats/week-comparison"
import { Rolling4WeekChart } from "@/components/stats/rolling-4week-chart"

export function StatsContent() {
  return (
    <div className="space-y-6">
      {/* Section 1: Weekly Stats */}
      <section aria-labelledby="weekly-stats-title">
        <Card>
          <CardHeader>
            <CardTitle id="weekly-stats-title" className="text-lg">
              Weekly Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyStatsChart />
          </CardContent>
        </Card>
      </section>

      {/* Section 2: This Week vs Last Week */}
      <section aria-labelledby="weekly-comparison-title">
        <Card>
          <CardHeader>
            <CardTitle id="weekly-comparison-title" className="text-lg">
              This Week vs Last Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeekComparison />
          </CardContent>
        </Card>
      </section>

      {/* Section 3: Rolling 4-Week */}
      <section aria-labelledby="rolling-stats-title">
        <Card>
          <CardHeader>
            <CardTitle id="rolling-stats-title" className="text-lg">
              Rolling 4-Week Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Rolling4WeekChart />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
