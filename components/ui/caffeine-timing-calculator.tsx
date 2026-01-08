"use client"

import { useState, useMemo } from "react"
import { Coffee, Moon, Sun, Clock, AlertTriangle, CheckCircle2, RotateCcw, ArrowRight, Timer, Zap, Brain } from "lucide-react"
import Link from "next/link"

interface CaffeineTimingCalculatorProps {
  className?: string
}

export function CaffeineTimingCalculator({ className = "" }: CaffeineTimingCalculatorProps) {
  const [wakeTime, setWakeTime] = useState("07:00")
  const [bedTime, setBedTime] = useState("23:00")
  const [caffeineGoal, setCaffeineGoal] = useState<"focus" | "balanced" | "minimal">("balanced")
  const [showResult, setShowResult] = useState(false)

  const result = useMemo(() => {
    if (!showResult) return null

    // Parse times
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number)
    const [bedHour, bedMin] = bedTime.split(":").map(Number)
    const wakeMinutes = wakeHour * 60 + wakeMin
    let bedMinutes = bedHour * 60 + bedMin
    if (bedMinutes < wakeMinutes) bedMinutes += 24 * 60 // Handle past midnight

    const formatTime = (minutes: number) => {
      const normalizedMinutes = minutes % (24 * 60)
      const h = Math.floor(normalizedMinutes / 60)
      const m = normalizedMinutes % 60
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
    }

    // Cortisol peaks (natural alertness) - avoid caffeine during these
    const cortisolPeaks = [
      { start: wakeMinutes, end: wakeMinutes + 60, label: "First hour after waking" },
      { start: wakeMinutes + 240, end: wakeMinutes + 300, label: "Mid-morning (4-5h after wake)" },
    ]

    // Caffeine half-life is ~5-6 hours
    // Cutoff should be ~8-10 hours before bed for quality sleep
    const cutoffMinutes = bedMinutes - 10 * 60 // 10 hours before bed
    const lastSafeCaffeine = Math.max(cutoffMinutes, wakeMinutes + 60)

    // Optimal windows (between cortisol peaks, before cutoff)
    const optimalStart1 = wakeMinutes + 90 // 90 min after wake (cortisol dip)
    const optimalEnd1 = wakeMinutes + 180 // Before mid-morning cortisol
    const optimalStart2 = wakeMinutes + 330 // After mid-morning cortisol (5.5h)
    const optimalEnd2 = Math.min(lastSafeCaffeine, wakeMinutes + 480) // Until cutoff or 8h

    // Daily caffeine recommendation based on goal
    const caffeineAmounts = {
      focus: { cups: "3-4", mg: "300-400mg", note: "Maximum cognitive benefit" },
      balanced: { cups: "2-3", mg: "200-300mg", note: "Good balance of alertness and sleep" },
      minimal: { cups: "1-2", mg: "100-200mg", note: "Reduced tolerance, better sleep" },
    }

    // Generate schedule
    const schedule = []

    if (caffeineGoal === "focus" || caffeineGoal === "balanced") {
      schedule.push({
        time: formatTime(optimalStart1),
        label: "First coffee",
        reason: "Cortisol has dipped, caffeine is most effective",
        icon: Coffee,
      })
    }

    if (caffeineGoal === "focus") {
      schedule.push({
        time: formatTime(optimalStart2),
        label: "Second coffee",
        reason: "Afternoon productivity boost",
        icon: Coffee,
      })
    }

    if (caffeineGoal === "balanced") {
      const secondTime = Math.min(optimalStart2, lastSafeCaffeine)
      if (secondTime > optimalStart1 + 120) {
        schedule.push({
          time: formatTime(secondTime),
          label: "Optional second coffee",
          reason: "Only if needed, skip for better sleep",
          icon: Coffee,
        })
      }
    }

    if (caffeineGoal === "minimal") {
      schedule.push({
        time: formatTime(optimalStart1),
        label: "Single coffee",
        reason: "One cup for alertness without dependency",
        icon: Coffee,
      })
    }

    return {
      wakeTimeFormatted: formatTime(wakeMinutes),
      bedTimeFormatted: formatTime(bedMinutes),
      cutoffTime: formatTime(lastSafeCaffeine),
      optimalWindow1: `${formatTime(optimalStart1)} - ${formatTime(optimalEnd1)}`,
      optimalWindow2: optimalEnd2 > optimalStart2 ? `${formatTime(optimalStart2)} - ${formatTime(optimalEnd2)}` : null,
      schedule,
      recommendation: caffeineAmounts[caffeineGoal],
      cortisolPeaks: cortisolPeaks.map(p => ({
        ...p,
        startFormatted: formatTime(p.start),
        endFormatted: formatTime(p.end),
      })),
    }
  }, [showResult, wakeTime, bedTime, caffeineGoal])

  const reset = () => {
    setShowResult(false)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-600/10 via-orange-500/5 to-transparent border border-amber-600/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-600/20 text-amber-600 dark:text-amber-400 mb-3">
            <Coffee className="h-3 w-3" />
            Caffeine Optimizer
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Find Your Optimal Caffeine Timing
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Maximize alertness without hurting sleep quality
          </p>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            {/* Time Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Sun className="inline h-4 w-4 mr-1 text-amber-500" />
                  Wake Time
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-card border border-border focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Moon className="inline h-4 w-4 mr-1 text-indigo-500" />
                  Bed Time
                </label>
                <input
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-card border border-border focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Goal Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                What&apos;s your caffeine goal?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: "focus", label: "Max Focus", desc: "Peak productivity" },
                  { id: "balanced", label: "Balanced", desc: "Focus + sleep" },
                  { id: "minimal", label: "Minimal", desc: "Reduce intake" },
                ] as const).map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setCaffeineGoal(option.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      caffeineGoal === option.id
                        ? "bg-amber-500/10 border-amber-500/50 text-amber-600 dark:text-amber-400"
                        : "bg-card/60 border-border/50 text-muted-foreground hover:border-amber-500/30"
                    }`}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs opacity-70">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowResult(true)}
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
            >
              Calculate My Optimal Times
            </button>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Recommendation */}
            <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  Daily Recommendation
                </span>
                <span className="text-sm text-muted-foreground">
                  {result.recommendation.cups} cups ({result.recommendation.mg})
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{result.recommendation.note}</p>
            </div>

            {/* Schedule */}
            <div className="p-4 rounded-xl bg-card/60 border border-border/50">
              <div className="text-sm font-medium text-foreground mb-3">Your Caffeine Schedule:</div>
              <div className="space-y-2">
                {result.schedule.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Coffee className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{item.label}</span>
                        <span className="text-sm font-mono text-amber-600">{item.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
                    </div>
                  </div>
                ))}

                {/* Cutoff */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-red-600 dark:text-red-400">Caffeine Cutoff</span>
                      <span className="text-sm font-mono text-red-500">{result.cutoffTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">No caffeine after this time for quality sleep</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avoid Times */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-violet-500" />
                Cortisol Peaks (Natural Alertness)
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Caffeine is less effective during these times—your body is naturally alert.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {result.cortisolPeaks.map((peak, i) => (
                  <div key={i} className="p-2 rounded-lg bg-violet-500/10 text-center">
                    <div className="text-xs font-mono text-violet-500">
                      {peak.startFormatted} - {peak.endFormatted}
                    </div>
                    <div className="text-xs text-muted-foreground">{peak.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Science */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="text-sm font-medium text-foreground mb-2">Why This Works:</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Caffeine has a 5-6 hour half-life—plan accordingly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Wait 90 min after waking for first cup (cortisol dip)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Stop 8-10 hours before bed for deep sleep stages
                </li>
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Adjust Settings
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready for a focused work session?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-medium text-sm transition-colors"
          >
            <Timer className="h-4 w-4" />
            Start Focus Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
