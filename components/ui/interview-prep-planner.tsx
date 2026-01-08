"use client"

import { useState, useMemo } from "react"
import { Code2, Calendar, Clock, Target, RotateCcw, ArrowRight, CheckCircle2, Zap, Brain, BookOpen } from "lucide-react"
import Link from "next/link"

interface InterviewPrepPlannerProps {
  className?: string
}

interface PrepPlan {
  weeksUntil: number
  hoursPerDay: number
  currentLevel: "beginner" | "intermediate" | "advanced"
  focusAreas: string[]
}

const FOCUS_AREAS = [
  { id: "arrays", label: "Arrays & Strings", sessions: 8 },
  { id: "linkedlists", label: "Linked Lists", sessions: 5 },
  { id: "trees", label: "Trees & Graphs", sessions: 10 },
  { id: "dp", label: "Dynamic Programming", sessions: 12 },
  { id: "sorting", label: "Sorting & Searching", sessions: 5 },
  { id: "system", label: "System Design", sessions: 8 },
  { id: "behavioral", label: "Behavioral Prep", sessions: 4 },
]

const LEVEL_MULTIPLIERS = {
  beginner: 1.5,
  intermediate: 1.0,
  advanced: 0.7,
}

export function InterviewPrepPlanner({ className = "" }: InterviewPrepPlannerProps) {
  const [step, setStep] = useState(1)
  const [weeksUntil, setWeeksUntil] = useState<number>(4)
  const [hoursPerDay, setHoursPerDay] = useState<number>(2)
  const [currentLevel, setCurrentLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate")
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["arrays", "trees", "dp"])
  const [showResult, setShowResult] = useState(false)

  const toggleArea = (id: string) => {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const result = useMemo(() => {
    if (!showResult) return null

    const multiplier = LEVEL_MULTIPLIERS[currentLevel]
    const totalDays = weeksUntil * 7
    const totalHours = totalDays * hoursPerDay
    const totalPomodoros = Math.floor((totalHours * 60) / 30) // 25 min work + 5 min break

    const selectedFocusAreas = FOCUS_AREAS.filter((area) => selectedAreas.includes(area.id))
    const baseSessions = selectedFocusAreas.reduce((sum, area) => sum + area.sessions, 0)
    const adjustedSessions = Math.round(baseSessions * multiplier)

    const pomodorosPerArea = selectedFocusAreas.map((area) => ({
      ...area,
      pomodoros: Math.round((area.sessions * multiplier / adjustedSessions) * totalPomodoros),
    }))

    const pomodorosPerDay = Math.round(totalPomodoros / totalDays)
    const hoursOfPractice = Math.round((totalPomodoros * 25) / 60)

    // Weekly schedule suggestion
    const weeklySchedule = {
      weekdays: Math.round(pomodorosPerDay * 0.8),
      weekends: Math.round(pomodorosPerDay * 1.5),
    }

    // Readiness assessment
    let readiness: "low" | "moderate" | "good" | "excellent"
    const practiceIntensity = totalPomodoros / adjustedSessions
    if (practiceIntensity < 2) readiness = "low"
    else if (practiceIntensity < 4) readiness = "moderate"
    else if (practiceIntensity < 6) readiness = "good"
    else readiness = "excellent"

    return {
      totalPomodoros,
      pomodorosPerDay,
      pomodorosPerArea,
      hoursOfPractice,
      weeklySchedule,
      readiness,
      weeksUntil,
    }
  }, [showResult, weeksUntil, hoursPerDay, currentLevel, selectedAreas])

  const reset = () => {
    setStep(1)
    setShowResult(false)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
    else setShowResult(true)
  }

  const readinessColors = {
    low: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-500" },
    moderate: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500" },
    good: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500" },
    excellent: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-500" },
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent border border-emerald-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-3">
            <Code2 className="h-3 w-3" />
            Interview Prep Planner
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Create Your Study Plan
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Calculate how many Pomodoro sessions you need
          </p>
        </div>

        {/* Progress */}
        {!showResult && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Step {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {!showResult ? (
          <div className="space-y-6">
            {step === 1 && (
              <>
                <h4 className="font-medium text-foreground text-center">
                  When is your interview?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 4, 8].map((weeks) => (
                    <button
                      key={weeks}
                      onClick={() => setWeeksUntil(weeks)}
                      className={`p-4 rounded-xl border transition-all ${
                        weeksUntil === weeks
                          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                          : "bg-card/60 border-border/50 text-muted-foreground hover:border-emerald-500/30"
                      }`}
                    >
                      <Calendar className="h-5 w-5 mx-auto mb-1" />
                      <div className="font-medium">{weeks} {weeks === 1 ? "week" : "weeks"}</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h4 className="font-medium text-foreground text-center">
                  How much time can you dedicate daily?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setHoursPerDay(hours)}
                      className={`p-4 rounded-xl border transition-all ${
                        hoursPerDay === hours
                          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                          : "bg-card/60 border-border/50 text-muted-foreground hover:border-emerald-500/30"
                      }`}
                    >
                      <Clock className="h-5 w-5 mx-auto mb-1" />
                      <div className="font-medium">{hours} {hours === 1 ? "hour" : "hours"}/day</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/30">
                  <h4 className="font-medium text-foreground text-center mb-3">
                    Your current level?
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(["beginner", "intermediate", "advanced"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setCurrentLevel(level)}
                        className={`p-3 rounded-xl border text-sm transition-all ${
                          currentLevel === level
                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                            : "bg-card/60 border-border/50 text-muted-foreground hover:border-emerald-500/30"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h4 className="font-medium text-foreground text-center">
                  Select your focus areas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {FOCUS_AREAS.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => toggleArea(area.id)}
                      className={`p-3 rounded-xl border text-left text-sm transition-all ${
                        selectedAreas.includes(area.id)
                          ? "bg-emerald-500/10 border-emerald-500/50"
                          : "bg-card/60 border-border/50 hover:border-emerald-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedAreas.includes(area.id)
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-muted-foreground/50"
                        }`}>
                          {selectedAreas.includes(area.id) && (
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className={selectedAreas.includes(area.id) ? "text-foreground" : "text-muted-foreground"}>
                          {area.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={nextStep}
              disabled={step === 3 && selectedAreas.length === 0}
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {step < 3 ? "Next" : "Generate Plan"}
            </button>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Readiness */}
            <div className={`p-5 rounded-xl ${readinessColors[result.readiness].bg} border ${readinessColors[result.readiness].border}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-semibold ${readinessColors[result.readiness].text} capitalize`}>
                  {result.readiness} Readiness
                </span>
                <span className="text-sm text-muted-foreground">
                  {result.weeksUntil} weeks to go
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-background/50">
                  <div className={`text-2xl font-bold ${readinessColors[result.readiness].text}`}>
                    {result.totalPomodoros}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Sessions</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <div className={`text-2xl font-bold ${readinessColors[result.readiness].text}`}>
                    {result.pomodorosPerDay}
                  </div>
                  <div className="text-xs text-muted-foreground">Per Day</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <div className={`text-2xl font-bold ${readinessColors[result.readiness].text}`}>
                    {result.hoursOfPractice}h
                  </div>
                  <div className="text-xs text-muted-foreground">Total Practice</div>
                </div>
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="p-4 rounded-xl bg-card/60 border border-border/50">
              <div className="text-sm font-medium text-foreground mb-3">Sessions by Topic:</div>
              <div className="space-y-2">
                {result.pomodorosPerArea.map((area) => (
                  <div key={area.id} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{area.label}</span>
                    <span className="text-sm font-medium text-emerald-500">
                      {area.pomodoros} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-xs font-medium text-foreground mb-2">Suggested Schedule:</div>
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-500" />
                  <span>Weekdays: {result.weeklySchedule.weekdays} pomodoros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-500" />
                  <span>Weekends: {result.weeklySchedule.weekends} pomodoros</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="text-xs font-medium text-foreground mb-2">Pro Tips:</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Start each session with a specific problem type
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Review mistakes during break time
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Track completion rate to stay motivated
                </li>
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Create New Plan
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to start your prep?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-medium text-sm transition-colors"
          >
            Start Coding Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
