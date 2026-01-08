"use client"

import { useState, useMemo } from "react"
import { Smartphone, Users, Volume2, Brain, ShieldCheck, AlertTriangle, ChevronRight } from "lucide-react"
import Link from "next/link"

interface DistractionAuditProps {
  className?: string
}

type DistractionType = "digital" | "social" | "environmental" | "internal"
type Severity = "none" | "mild" | "moderate" | "severe"

const DISTRACTION_CATEGORIES = [
  {
    id: "digital" as DistractionType,
    label: "Digital",
    icon: Smartphone,
    examples: "Phone, social media, notifications, email",
    strategies: [
      "Turn off all non-essential notifications",
      "Use app blockers during focus time",
      "Keep phone in another room",
      "Batch check email 2-3 times daily"
    ]
  },
  {
    id: "social" as DistractionType,
    label: "Social",
    icon: Users,
    examples: "Colleagues, meetings, quick questions",
    strategies: [
      "Set visible 'focus mode' signals",
      "Use scripts to defer interruptions",
      "Block calendar for deep work",
      "Batch communications during breaks"
    ]
  },
  {
    id: "environmental" as DistractionType,
    label: "Environmental",
    icon: Volume2,
    examples: "Noise, visual clutter, temperature",
    strategies: [
      "Use noise-cancelling headphones",
      "Clear workspace of unnecessary items",
      "Face away from high-traffic areas",
      "Try brown noise or lo-fi music"
    ]
  },
  {
    id: "internal" as DistractionType,
    label: "Internal",
    icon: Brain,
    examples: "Wandering thoughts, worry, fatigue",
    strategies: [
      "Keep a 'capture' notepad for stray thoughts",
      "Schedule dedicated 'worry time'",
      "Match task difficulty to energy levels",
      "Prioritize sleep and exercise"
    ]
  }
]

const SEVERITY_OPTIONS: { value: Severity; label: string; color: string }[] = [
  { value: "none", label: "Not an issue", color: "bg-emerald-500" },
  { value: "mild", label: "Mild", color: "bg-amber-400" },
  { value: "moderate", label: "Moderate", color: "bg-orange-500" },
  { value: "severe", label: "Severe", color: "bg-rose-500" }
]

export function DistractionAudit({ className = "" }: DistractionAuditProps) {
  const [ratings, setRatings] = useState<Record<DistractionType, Severity>>({
    digital: "none",
    social: "none",
    environmental: "none",
    internal: "none"
  })
  const [showResults, setShowResults] = useState(false)

  const setRating = (type: DistractionType, severity: Severity) => {
    setRatings(prev => ({ ...prev, [type]: severity }))
  }

  const results = useMemo(() => {
    const severityScore = { none: 0, mild: 1, moderate: 2, severe: 3 }
    const totalScore = Object.values(ratings).reduce((sum, r) => sum + severityScore[r], 0)

    const priorityAreas = DISTRACTION_CATEGORIES
      .filter(cat => ratings[cat.id] !== "none")
      .sort((a, b) => severityScore[ratings[b.id]] - severityScore[ratings[a.id]])

    const focusLevel = totalScore <= 2 ? "Good" : totalScore <= 5 ? "Moderate" : totalScore <= 8 ? "Challenging" : "Critical"
    const focusColor = totalScore <= 2 ? "text-emerald-500" : totalScore <= 5 ? "text-amber-500" : totalScore <= 8 ? "text-orange-500" : "text-rose-500"

    return { totalScore, priorityAreas, focusLevel, focusColor }
  }, [ratings])

  const hasAnyRating = Object.values(ratings).some(r => r !== "none")

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent border border-rose-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/20 text-rose-600 dark:text-rose-400 mb-3">
            <ShieldCheck className="h-3 w-3" />
            Self-Assessment
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Distraction Audit
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Identify your biggest focus challenges and get personalized strategies
          </p>
        </div>

        {!showResults ? (
          <>
            {/* Rating Form */}
            <div className="space-y-4 mb-6">
              {DISTRACTION_CATEGORIES.map(category => {
                const Icon = category.icon
                return (
                  <div key={category.id} className="p-4 rounded-xl bg-card/60 border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5 text-rose-500" />
                      <div>
                        <div className="font-medium text-foreground">{category.label}</div>
                        <div className="text-xs text-muted-foreground">{category.examples}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {SEVERITY_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => setRating(category.id, option.value)}
                          className={`px-2 py-1.5 text-xs rounded-lg transition-all ${
                            ratings[category.id] === option.value
                              ? `${option.color} text-white font-medium`
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Analyze Button */}
            <button
              onClick={() => setShowResults(true)}
              disabled={!hasAnyRating}
              className="w-full py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              Analyze My Distractions
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="p-5 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground">Your Focus Environment</span>
                <span className={`text-lg font-bold ${results.focusColor}`}>{results.focusLevel}</span>
              </div>

              {results.priorityAreas.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-xs font-medium text-muted-foreground">Priority areas to address:</div>
                  {results.priorityAreas.slice(0, 2).map(area => (
                    <div key={area.id} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="font-medium text-foreground">{area.label} Distractions</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          ratings[area.id] === "severe" ? "bg-rose-500/20 text-rose-500" :
                          ratings[area.id] === "moderate" ? "bg-orange-500/20 text-orange-500" :
                          "bg-amber-500/20 text-amber-500"
                        }`}>
                          {ratings[area.id]}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {area.strategies.slice(0, 2).map((strategy, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <ShieldCheck className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Great! You have minimal distractions. Focus on maintaining these habits.
                  </p>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setShowResults(false)
                setRatings({ digital: "none", social: "none", environmental: "none", internal: "none" })
              }}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm"
            >
              Start Over
            </button>
          </>
        )}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to practice distraction-free focus?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-500 font-medium text-sm transition-colors"
          >
            Start a Focus Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
