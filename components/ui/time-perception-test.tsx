"use client"

import { useState, useRef, useEffect } from "react"
import { Clock, Play, Square, RotateCcw, Brain, Target, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

interface TimePerceptionTestProps {
  className?: string
}

type TestPhase = "intro" | "running" | "result" | "complete"

interface TrialResult {
  targetSeconds: number
  actualSeconds: number
  error: number
  errorPercent: number
}

const TARGET_INTERVALS = [15, 30, 60] // Seconds to estimate

export function TimePerceptionTest({ className = "" }: TimePerceptionTestProps) {
  const [phase, setPhase] = useState<TestPhase>("intro")
  const [currentTrial, setCurrentTrial] = useState(0)
  const [results, setResults] = useState<TrialResult[]>([])
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const targetSeconds = TARGET_INTERVALS[currentTrial]

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const startTrial = () => {
    setPhase("running")
    setStartTime(Date.now())
    setElapsed(0)

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 0.1)
    }, 100)
  }

  const stopTrial = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    const actualSeconds = startTime ? (Date.now() - startTime) / 1000 : 0
    const error = actualSeconds - targetSeconds
    const errorPercent = (error / targetSeconds) * 100

    const result: TrialResult = {
      targetSeconds,
      actualSeconds,
      error,
      errorPercent,
    }

    setResults((prev) => [...prev, result])
    setPhase("result")
  }

  const nextTrial = () => {
    if (currentTrial < TARGET_INTERVALS.length - 1) {
      setCurrentTrial((prev) => prev + 1)
      setPhase("intro")
      setElapsed(0)
    } else {
      setPhase("complete")
    }
  }

  const reset = () => {
    setPhase("intro")
    setCurrentTrial(0)
    setResults([])
    setElapsed(0)
    setStartTime(null)
  }

  // Calculate overall score
  const overallScore = results.length > 0
    ? results.reduce((sum, r) => sum + Math.abs(r.errorPercent), 0) / results.length
    : 0

  const getAccuracyLevel = (errorPercent: number) => {
    const absError = Math.abs(errorPercent)
    if (absError <= 10) return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500" }
    if (absError <= 20) return { label: "Good", color: "text-cyan-500", bg: "bg-cyan-500" }
    if (absError <= 35) return { label: "Moderate", color: "text-amber-500", bg: "bg-amber-500" }
    return { label: "Challenging", color: "text-orange-500", bg: "bg-orange-500" }
  }

  const getOverallAssessment = () => {
    if (overallScore <= 15) return {
      title: "Strong Time Perception",
      description: "Your internal clock is well-calibrated. You naturally sense time passing with reasonable accuracy.",
      color: "emerald",
    }
    if (overallScore <= 30) return {
      title: "Typical Time Perception",
      description: "Your time estimation is within normal range. External timers can still help maintain consistency.",
      color: "cyan",
    }
    if (overallScore <= 50) return {
      title: "Variable Time Perception",
      description: "You may experience time differently than expected. External structure (like Pomodoro timers) can be especially helpful.",
      color: "amber",
    }
    return {
      title: "Time Blindness Tendency",
      description: "You show signs of time blindness, common in ADHD. External timers and time-boxing are essential tools for you.",
      color: "orange",
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent border border-purple-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-600 dark:text-purple-400 mb-3">
            <Brain className="h-3 w-3" />
            Interactive Assessment
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Time Perception Test
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Discover how accurately you perceive time intervals
          </p>
        </div>

        {/* Progress */}
        {phase !== "complete" && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Trial {currentTrial + 1} of {TARGET_INTERVALS.length}</span>
              <span>{Math.round(((currentTrial + (phase === "result" ? 1 : 0)) / TARGET_INTERVALS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${((currentTrial + (phase === "result" ? 1 : 0)) / TARGET_INTERVALS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Intro Phase */}
        {phase === "intro" && (
          <div className="text-center space-y-6">
            <div className="p-6 rounded-xl bg-card/60 border border-border/50">
              <Clock className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Estimate {targetSeconds} seconds
              </h4>
              <p className="text-sm text-muted-foreground">
                Press start, then press stop when you think {targetSeconds} seconds have passed.
                <br />
                <strong className="text-foreground">Don't count in your head</strong> — just feel the time.
              </p>
            </div>

            <button
              onClick={startTrial}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
            >
              <Play className="h-5 w-5" />
              Start Timer
            </button>
          </div>
        )}

        {/* Running Phase */}
        {phase === "running" && (
          <div className="text-center space-y-6">
            <div className="p-8 rounded-xl bg-card/60 border border-purple-500/30">
              <div className="text-6xl font-bold text-purple-500 mb-2 tabular-nums">
                {elapsed.toFixed(1)}s
              </div>
              <p className="text-sm text-muted-foreground">
                Stop when you think <strong className="text-foreground">{targetSeconds} seconds</strong> have passed
              </p>
            </div>

            <button
              onClick={stopTrial}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
            >
              <Square className="h-5 w-5" />
              Stop — {targetSeconds}s reached
            </button>
          </div>
        )}

        {/* Result Phase */}
        {phase === "result" && results.length > 0 && (
          <div className="space-y-5">
            {(() => {
              const lastResult = results[results.length - 1]
              const accuracy = getAccuracyLevel(lastResult.errorPercent)
              return (
                <>
                  <div className={`p-5 rounded-xl ${accuracy.color === "text-emerald-500" ? "bg-emerald-500/10 border-emerald-500/20" : accuracy.color === "text-cyan-500" ? "bg-cyan-500/10 border-cyan-500/20" : accuracy.color === "text-amber-500" ? "bg-amber-500/10 border-amber-500/20" : "bg-orange-500/10 border-orange-500/20"} border`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-semibold ${accuracy.color}`}>
                        {accuracy.label} Accuracy
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Target: {lastResult.targetSeconds}s
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {lastResult.actualSeconds.toFixed(1)}s
                        </div>
                        <div className="text-xs text-muted-foreground">Your estimate</div>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${lastResult.error > 0 ? "text-amber-500" : lastResult.error < 0 ? "text-cyan-500" : "text-emerald-500"}`}>
                          {lastResult.error > 0 ? "+" : ""}{lastResult.error.toFixed(1)}s
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {lastResult.error > 0 ? "Over" : lastResult.error < 0 ? "Under" : "Exact"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {lastResult.error > 5 ? (
                          <>
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            Time felt slower than it was — you waited too long
                          </>
                        ) : lastResult.error < -5 ? (
                          <>
                            <AlertCircle className="h-4 w-4 text-cyan-500" />
                            Time felt faster than it was — you stopped too early
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            Well calibrated for this interval
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={nextTrial}
                    className="w-full py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
                  >
                    {currentTrial < TARGET_INTERVALS.length - 1 ? "Next Trial" : "See Results"}
                  </button>
                </>
              )
            })()}
          </div>
        )}

        {/* Complete Phase */}
        {phase === "complete" && (
          <div className="space-y-5">
            {(() => {
              const assessment = getOverallAssessment()
              const colorClasses = {
                emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500" },
                cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-500" },
                amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500" },
                orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-500" },
              }
              const colors = colorClasses[assessment.color as keyof typeof colorClasses]

              return (
                <>
                  <div className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}>
                    <h4 className={`text-lg font-semibold ${colors.text} mb-2`}>
                      {assessment.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {assessment.description}
                    </p>

                    <div className="text-center py-4 border-t border-border/30">
                      <div className={`text-3xl font-bold ${colors.text}`}>
                        {overallScore.toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Average deviation</div>
                    </div>
                  </div>

                  {/* Individual Results */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Your Results:</div>
                    {results.map((result, i) => {
                      const acc = getAccuracyLevel(result.errorPercent)
                      return (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card/60 border border-border/50">
                          <span className="text-sm text-muted-foreground">
                            {result.targetSeconds}s target
                          </span>
                          <span className="text-sm text-foreground">
                            {result.actualSeconds.toFixed(1)}s ({result.error > 0 ? "+" : ""}{result.error.toFixed(1)}s)
                          </span>
                          <span className={`text-xs font-medium ${acc.color}`}>
                            {acc.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <div className="text-xs font-medium text-foreground mb-2">Why Pomodoro Helps:</div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        External timer removes need for internal time tracking
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        25-minute blocks create manageable, concrete time units
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        Completion signals provide external structure
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Take Test Again
                  </button>
                </>
              )
            })()}
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Need external time structure?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-500 font-medium text-sm transition-colors"
          >
            Try Pomodoro Timer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
