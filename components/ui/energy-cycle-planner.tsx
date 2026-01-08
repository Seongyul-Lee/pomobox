"use client"

import { useState } from "react"
import { Sun, Moon, Coffee, Zap, Brain, Clock, ArrowRight, RotateCcw, Sunrise, Sunset } from "lucide-react"
import Link from "next/link"

interface EnergyCyclePlannerProps {
  className?: string
}

type TimeSlot = "early_morning" | "late_morning" | "early_afternoon" | "late_afternoon" | "evening"

interface EnergyLevel {
  slot: TimeSlot
  label: string
  time: string
  icon: typeof Sun
  energy: 1 | 2 | 3 | 4 | 5
}

const TIME_SLOTS: { slot: TimeSlot; label: string; time: string; icon: typeof Sun }[] = [
  { slot: "early_morning", label: "Early Morning", time: "6-9 AM", icon: Sunrise },
  { slot: "late_morning", label: "Late Morning", time: "9-12 PM", icon: Sun },
  { slot: "early_afternoon", label: "Early Afternoon", time: "12-3 PM", icon: Coffee },
  { slot: "late_afternoon", label: "Late Afternoon", time: "3-6 PM", icon: Sunset },
  { slot: "evening", label: "Evening", time: "6-9 PM", icon: Moon },
]

const ENERGY_LABELS = ["Very Low", "Low", "Moderate", "High", "Peak"]

export function EnergyCyclePlanner({ className = "" }: EnergyCyclePlannerProps) {
  const [energyLevels, setEnergyLevels] = useState<Record<TimeSlot, number>>({
    early_morning: 0,
    late_morning: 0,
    early_afternoon: 0,
    late_afternoon: 0,
    evening: 0,
  })
  const [showResult, setShowResult] = useState(false)

  const handleEnergySelect = (slot: TimeSlot, level: number) => {
    setEnergyLevels((prev) => ({ ...prev, [slot]: level }))
  }

  const allSelected = Object.values(energyLevels).every((v) => v > 0)

  const getRecommendation = () => {
    const entries = Object.entries(energyLevels) as [TimeSlot, number][]
    const sorted = entries.sort((a, b) => b[1] - a[1])

    const peakSlots = sorted.filter(([_, level]) => level >= 4)
    const moderateSlots = sorted.filter(([_, level]) => level === 3)
    const lowSlots = sorted.filter(([_, level]) => level <= 2)

    // Identify ultradian pattern
    let pattern = "variable"
    const morningAvg = (energyLevels.early_morning + energyLevels.late_morning) / 2
    const afternoonAvg = (energyLevels.early_afternoon + energyLevels.late_afternoon) / 2

    if (morningAvg > afternoonAvg + 1) pattern = "morning_person"
    else if (afternoonAvg > morningAvg + 1) pattern = "afternoon_person"
    else if (energyLevels.evening > morningAvg && energyLevels.evening > afternoonAvg) pattern = "night_owl"

    return {
      peakSlots,
      moderateSlots,
      lowSlots,
      pattern,
      bestDeepWork: peakSlots[0]?.[0] || sorted[0][0],
      bestAdmin: lowSlots[0]?.[0] || sorted[sorted.length - 1][0],
    }
  }

  const getSlotInfo = (slot: TimeSlot) => TIME_SLOTS.find((s) => s.slot === slot)!

  const reset = () => {
    setEnergyLevels({
      early_morning: 0,
      late_morning: 0,
      early_afternoon: 0,
      late_afternoon: 0,
      evening: 0,
    })
    setShowResult(false)
  }

  const recommendation = showResult ? getRecommendation() : null

  const patternLabels = {
    morning_person: { label: "Morning Person", description: "Peak cognitive performance before noon", color: "text-amber-500" },
    afternoon_person: { label: "Afternoon Achiever", description: "Best focus after lunch dip passes", color: "text-orange-500" },
    night_owl: { label: "Night Owl", description: "Energy builds throughout the day", color: "text-violet-500" },
    variable: { label: "Balanced Pattern", description: "Fairly consistent energy throughout day", color: "text-cyan-500" },
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-600 dark:text-amber-400 mb-3">
            <Zap className="h-3 w-3" />
            Energy Mapping Tool
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Map Your Ultradian Rhythm
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Identify your natural energy peaks for optimal work scheduling
          </p>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="font-medium text-foreground mb-1">
                Rate your typical energy level for each time period
              </h4>
              <p className="text-xs text-muted-foreground">
                Think about a normal day without unusual factors
              </p>
            </div>

            <div className="space-y-4">
              {TIME_SLOTS.map(({ slot, label, time, icon: Icon }) => (
                <div key={slot} className="p-4 rounded-xl bg-card/60 border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Icon className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{label}</div>
                      <div className="text-xs text-muted-foreground">{time}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleEnergySelect(slot, level)}
                        className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                          energyLevels[slot] === level
                            ? level >= 4
                              ? "bg-emerald-500 text-white"
                              : level === 3
                                ? "bg-amber-500 text-white"
                                : "bg-orange-500 text-white"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {ENERGY_LABELS[level - 1]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowResult(true)}
              disabled={!allSelected}
              className="w-full py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {allSelected ? "Get Your Schedule" : "Select all time periods"}
            </button>
          </div>
        ) : recommendation ? (
          <div className="space-y-5">
            {/* Pattern Type */}
            <div className="p-5 rounded-xl bg-card/60 border border-border/50 text-center">
              <div className={`text-2xl font-bold ${patternLabels[recommendation.pattern as keyof typeof patternLabels].color} mb-1`}>
                {patternLabels[recommendation.pattern as keyof typeof patternLabels].label}
              </div>
              <p className="text-sm text-muted-foreground">
                {patternLabels[recommendation.pattern as keyof typeof patternLabels].description}
              </p>
            </div>

            {/* Energy Visualization */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-xs font-medium text-foreground mb-3">Your Energy Pattern:</div>
              <div className="flex items-end gap-2 h-24">
                {TIME_SLOTS.map(({ slot, label }) => {
                  const level = energyLevels[slot]
                  const height = (level / 5) * 100
                  return (
                    <div key={slot} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-muted/50 rounded-t-lg relative" style={{ height: "100%" }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                            level >= 4 ? "bg-emerald-500" : level === 3 ? "bg-amber-500" : "bg-orange-500"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground text-center leading-tight">
                        {label.split(" ")[0]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Deep Work Window
                  </span>
                </div>
                <p className="text-sm text-foreground">
                  Schedule your most challenging tasks during <strong>{getSlotInfo(recommendation.bestDeepWork).label}</strong> ({getSlotInfo(recommendation.bestDeepWork).time})
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use longer Pomodoro sessions (45-50 min) during this window
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Coffee className="h-4 w-4 text-cyan-500" />
                  <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                    Admin & Light Tasks
                  </span>
                </div>
                <p className="text-sm text-foreground">
                  Handle emails, meetings, and routine tasks during <strong>{getSlotInfo(recommendation.bestAdmin).label}</strong> ({getSlotInfo(recommendation.bestAdmin).time})
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use shorter Pomodoro sessions (15-25 min) when energy is lower
                </p>
              </div>
            </div>

            {/* Ultradian Tips */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-xs font-medium text-foreground mb-2">Ultradian Rhythm Tips:</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Your energy naturally cycles every 90-120 minutes
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Take a 15-20 min break after each full cycle
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Plan 3-4 deep work cycles per day maximum
                </li>
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Map Again
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to work with your natural rhythm?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-medium text-sm transition-colors"
          >
            Start Rhythm-Aligned Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
