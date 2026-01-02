"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsContent() {
  const t = useTranslations("Stats")

  return (
    <div className="space-y-6">
      {/* Section 1: Weekly Stats */}
      <section aria-labelledby="weekly-stats-title">
        <Card>
          <CardHeader>
            <CardTitle id="weekly-stats-title" className="text-lg">
              {t("weeklyStats")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              {t("comingSoon")}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 2: This Week vs Last Week */}
      <section aria-labelledby="weekly-comparison-title">
        <Card>
          <CardHeader>
            <CardTitle id="weekly-comparison-title" className="text-lg">
              {t("weeklyComparison")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              {t("comingSoon")}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 3: Rolling 4-Week */}
      <section aria-labelledby="rolling-stats-title">
        <Card>
          <CardHeader>
            <CardTitle id="rolling-stats-title" className="text-lg">
              {t("rollingStats")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              {t("comingSoon")}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
