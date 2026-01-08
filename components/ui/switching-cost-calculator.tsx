"use client"

import { useState, useMemo } from "react"
import { Calculator, Clock, TrendingDown, AlertTriangle, Zap, RotateCcw, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SwitchingCostCalculatorProps {
  className?: string
}

const INTERRUPTION_PRESETS = [
  { label: "Low (5/day)", value: 5, description: "Minimal interruptions, deep work focused" },
  { label: "Moderate (15/day)", value: 15, description: "Typical office environment" },
  { label: "High (30/day)", value: 30, description: "Open office, frequent meetings" },
  { label: "Very High (50+/day)", value: 50, description: "Constant notifications, chaotic" },
]

const REFOCUS_TIME_MINUTES = 23 // Research-backed average time to refocus after interruption
const WORKDAY_HOURS = 8
const WORKDAY_MINUTES = WORKDAY_HOURS * 60

export function SwitchingCostCalculator({ className = "" }: SwitchingCostCalculatorProps) {
  const [interruptions, setInterruptions] = useState<number | null>(null)
  const [customValue, setCustomValue] = useState("")
  const [showResult, setShowResult] = useState(false)

  const handlePresetSelect = (value: number) => {
    setInterruptions(value)
    setCustomValue("")
    setShowResult(true)
  }

  const handleCustomSubmit = () => {
    const value = parseInt(customValue)
    if (value > 0 && value <= 100) {
      setInterruptions(value)
      setShowResult(true)
    }
  }

  const result = useMemo(() => {
    if (!interruptions || !showResult) return null

    const totalLostMinutes = interruptions * REFOCUS_TIME_MINUTES
    const lostHours = totalLostMinutes / 60
    const percentLost = (totalLostMinutes / WORKDAY_MINUTES) * 100
    const effectiveWorkMinutes = Math.max(0, WORKDAY_MINUTES - totalLostMinutes)
    const effectiveWorkHours = effectiveWorkMinutes / 60

    // Weekly and yearly projections
    const weeklyLostHours = lostHours * 5
    const yearlyLostHours = lostHours * 250 // ~250 working days/year
    const yearlyLostDays = yearlyLostHours / 8

    // Severity level
    let severity: "low" | "moderate" | "high" | "critical"
    if (percentLost < 20) severity = "low"
    else if (percentLost < 40) severity = "moderate"
    else if (percentLost < 60) severity = "high"
    else severity = "critical"

    return {
      totalLostMinutes,
      lostHours,
      percentLost: Math.min(100, percentLost),
      effectiveWorkHours,
      weeklyLostHours,
      yearlyLostHours,
      yearlyLostDays,
      severity,
    }
  }, [interruptions, showResult])

  const reset = () => {
    setInterruptions(null)
    setCustomValue("")
    setShowResult(false)
  }

  const severityColors = {
    low: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500" },
    moderate: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500" },
    high: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-500" },
    critical: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-500" },
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent border border-orange-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-600 dark:text-orange-400 mb-3">
            <Calculator className="h-3 w-3" />
            Productivity Calculator
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Calculate Your Task Switching Cost
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Based on the 23-minute refocus time from research
          </p>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            {/* Question */}
            <div className="text-center">
              <h4 className="font-medium text-foreground mb-1">
                How many times are you interrupted daily?
              </h4>
              <p className="text-xs text-muted-foreground">
                Include notifications, messages, colleagues, meetings, etc.
              </p>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-2 gap-3">
              {INTERRUPTION_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetSelect(preset.value)}
                  className="p-4 text-left rounded-xl bg-card/60 border border-border/50 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
                >
                  <div className="font-medium text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    {preset.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-4 border-t border-border/30">
              <label className="text-sm text-muted-foreground block mb-2">
                Or enter a custom number:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="e.g., 25"
                  className="flex-1 px-4 py-2 rounded-xl bg-card/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500/50"
                />
                <button
                  onClick={handleCustomSubmit}
                  disabled={!customValue || parseInt(customValue) < 1}
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Main Result */}
            <div className={`p-5 rounded-xl ${severityColors[result.severity].bg} border ${severityColors[result.severity].border}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-5 w-5 ${severityColors[result.severity].text}`} />
                  <span className={`font-semibold ${severityColors[result.severity].text} capitalize`}>
                    {result.severity} Impact
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {interruptions} interruptions/day
                </span>
              </div>

              {/* Daily Loss */}
              <div className="text-center mb-4">
                <div className={`text-4xl font-bold ${severityColors[result.severity].text}`}>
                  {result.lostHours.toFixed(1)}h
                </div>
                <div className="text-sm text-muted-foreground">lost per day to context switching</div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Effective work time</span>
                  <span>{result.effectiveWorkHours.toFixed(1)}h / {WORKDAY_HOURS}h</span>
                </div>
                <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${result.severity === "critical" ? "bg-red-500" : result.severity === "high" ? "bg-orange-500" : result.severity === "moderate" ? "bg-amber-500" : "bg-emerald-500"} transition-all`}
                    style={{ width: `${100 - result.percentLost}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1 text-center">
                  {result.percentLost.toFixed(0)}% of your workday lost to refocusing
                </div>
              </div>

              {/* Projections */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/30">
                <div className="text-center">
                  <div className={`text-lg font-bold ${severityColors[result.severity].text}`}>
                    {result.weeklyLostHours.toFixed(0)}h
                  </div>
                  <div className="text-xs text-muted-foreground">per week</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${severityColors[result.severity].text}`}>
                    {result.yearlyLostHours.toFixed(0)}h
                  </div>
                  <div className="text-xs text-muted-foreground">per year</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${severityColors[result.severity].text}`}>
                    {result.yearlyLostDays.toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">workdays/year</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-xs font-medium text-foreground mb-2">How Pomodoro Helps:</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Protected 25-min focus blocks prevent interruptions</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Scheduled breaks let you batch-check notifications</span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Reducing to 4 Pomodoros/day = only 4 context switches</span>
                </div>
              </div>
            </div>

            {/* Potential Savings */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                Potential Recovery with Pomodoro
              </div>
              <div className="text-xs text-muted-foreground">
                If you reduce context switches from {interruptions} to 8 (4 Pomodoro cycles):
              </div>
              <div className="mt-2 text-lg font-bold text-emerald-500">
                +{((interruptions! - 8) * REFOCUS_TIME_MINUTES / 60).toFixed(1)} hours/day recovered
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Calculate Again
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to protect your focus time?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-500 font-medium text-sm transition-colors"
          >
            Start Protected Focus Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
