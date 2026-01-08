"use client"

import { useState, useMemo } from "react"
import { Sun, Moon, Coffee, Dumbbell, BookOpen, Brain, Clock, CheckCircle2, RotateCcw, ArrowRight, Timer, Sparkles } from "lucide-react"
import Link from "next/link"

interface MorningRoutineBuilderProps {
  className?: string
}

interface Activity {
  id: string
  name: string
  icon: React.ElementType
  duration: number
  benefit: string
  category: "physical" | "mental" | "planning"
  research: string
}

const ACTIVITIES: Activity[] = [
  {
    id: "hydrate",
    name: "Hydration",
    icon: Coffee,
    duration: 2,
    benefit: "Rehydrate after sleep",
    category: "physical",
    research: "Mild dehydration impairs cognitive performance by 10-15%",
  },
  {
    id: "light",
    name: "Sunlight Exposure",
    icon: Sun,
    duration: 10,
    benefit: "Reset circadian rhythm",
    category: "physical",
    research: "Morning light advances cortisol awakening response by 30 min",
  },
  {
    id: "exercise",
    name: "Light Exercise",
    icon: Dumbbell,
    duration: 15,
    benefit: "Boost BDNF and alertness",
    category: "physical",
    research: "Morning exercise increases executive function for 2+ hours",
  },
  {
    id: "meditate",
    name: "Meditation",
    icon: Brain,
    duration: 10,
    benefit: "Reduce cortisol, improve focus",
    category: "mental",
    research: "8 weeks of meditation increases prefrontal cortex density",
  },
  {
    id: "journal",
    name: "Journaling",
    icon: BookOpen,
    duration: 10,
    benefit: "Clear mental clutter",
    category: "mental",
    research: "Expressive writing reduces working memory load",
  },
  {
    id: "plan",
    name: "Daily Planning",
    icon: Clock,
    duration: 5,
    benefit: "Set clear priorities",
    category: "planning",
    research: "Planning reduces decision fatigue by 40% throughout day",
  },
  {
    id: "mit",
    name: "Most Important Task",
    icon: Sparkles,
    duration: 30,
    benefit: "Tackle hard work first",
    category: "planning",
    research: "Willpower depletes; morning focus capacity is 20% higher",
  },
]

export function MorningRoutineBuilder({ className = "" }: MorningRoutineBuilderProps) {
  const [wakeTime, setWakeTime] = useState("07:00")
  const [workStart, setWorkStart] = useState("09:00")
  const [selectedActivities, setSelectedActivities] = useState<string[]>(["hydrate", "light", "plan"])
  const [showResult, setShowResult] = useState(false)

  const toggleActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const result = useMemo(() => {
    if (!showResult) return null

    const selected = ACTIVITIES.filter((a) => selectedActivities.includes(a.id))
    const totalDuration = selected.reduce((sum, a) => sum + a.duration, 0)

    // Parse times
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number)
    const [workHour, workMin] = workStart.split(":").map(Number)
    const wakeMinutes = wakeHour * 60 + wakeMin
    const workMinutes = workHour * 60 + workMin
    const availableTime = workMinutes - wakeMinutes

    // Generate schedule
    let currentTime = wakeMinutes
    const schedule = selected.map((activity) => {
      const startHour = Math.floor(currentTime / 60)
      const startMin = currentTime % 60
      const timeStr = `${startHour.toString().padStart(2, "0")}:${startMin.toString().padStart(2, "0")}`
      currentTime += activity.duration
      return { ...activity, startTime: timeStr }
    })

    const bufferTime = availableTime - totalDuration
    const fitsInSchedule = bufferTime >= 0

    return {
      schedule,
      totalDuration,
      availableTime,
      bufferTime,
      fitsInSchedule,
      physicalCount: selected.filter((a) => a.category === "physical").length,
      mentalCount: selected.filter((a) => a.category === "mental").length,
      planningCount: selected.filter((a) => a.category === "planning").length,
    }
  }, [showResult, wakeTime, workStart, selectedActivities])

  const reset = () => {
    setShowResult(false)
  }

  const totalSelected = selectedActivities.reduce((sum, id) => {
    const activity = ACTIVITIES.find((a) => a.id === id)
    return sum + (activity?.duration || 0)
  }, 0)

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-600 dark:text-amber-400 mb-3">
            <Sun className="h-3 w-3" />
            Morning Routine Builder
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Design Your Productive Morning
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Build a science-backed routine that fits your schedule
          </p>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Wake Time
                </label>
                <div className="relative">
                  <Moon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-card border border-border focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Work Starts
                </label>
                <div className="relative">
                  <Sun className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={workStart}
                    onChange={(e) => setWorkStart(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-card border border-border focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Activity Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Select Activities</span>
                <span className="text-xs text-muted-foreground">{totalSelected} min selected</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ACTIVITIES.map((activity) => {
                  const isSelected = selectedActivities.includes(activity.id)
                  const categoryColors = {
                    physical: "text-emerald-500",
                    mental: "text-violet-500",
                    planning: "text-amber-500",
                  }
                  return (
                    <button
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500/50"
                          : "bg-card/60 border-border/50 hover:border-amber-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${isSelected ? "bg-amber-500/20" : "bg-muted/50"} flex items-center justify-center`}>
                          <activity.icon className={`h-4 w-4 ${isSelected ? "text-amber-500" : categoryColors[activity.category]}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium text-sm ${isSelected ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
                              {activity.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{activity.duration} min</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{activity.benefit}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              onClick={() => setShowResult(true)}
              disabled={selectedActivities.length === 0}
              className="w-full py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate My Routine
            </button>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Summary */}
            <div className={`p-5 rounded-xl ${result.fitsInSchedule ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"} border`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-semibold ${result.fitsInSchedule ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                  {result.fitsInSchedule ? "Perfect Fit!" : "Tight Schedule"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {result.totalDuration} min routine
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-emerald-500">{result.physicalCount}</div>
                  <div className="text-xs text-muted-foreground">Physical</div>
                </div>
                <div className="p-2 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-violet-500">{result.mentalCount}</div>
                  <div className="text-xs text-muted-foreground">Mental</div>
                </div>
                <div className="p-2 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-amber-500">{result.planningCount}</div>
                  <div className="text-xs text-muted-foreground">Planning</div>
                </div>
              </div>

              {!result.fitsInSchedule && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
                  Your routine exceeds available time by {Math.abs(result.bufferTime)} minutes.
                  Consider waking earlier or removing activities.
                </p>
              )}
            </div>

            {/* Schedule */}
            <div className="p-4 rounded-xl bg-card/60 border border-border/50">
              <div className="text-sm font-medium text-foreground mb-3">Your Morning Schedule:</div>
              <div className="space-y-2">
                {result.schedule.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                    <span className="text-sm font-mono text-amber-500 w-12">{item.startTime}</span>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground flex-1">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.duration}m</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-sm font-mono text-amber-500 w-12">{workStart}</span>
                  <Timer className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Start Work (Deep Focus)</span>
                </div>
              </div>
            </div>

            {/* Science Tips */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-sm font-medium text-foreground mb-2">Why This Works:</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {result.schedule.slice(0, 2).map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>{item.name}:</strong> {item.research}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Modify Routine
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Start your day with a focused session
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-medium text-sm transition-colors"
          >
            <Timer className="h-4 w-4" />
            Launch Morning Focus Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
