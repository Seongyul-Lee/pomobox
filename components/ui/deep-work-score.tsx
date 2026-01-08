"use client"

import { useState, useMemo } from "react"
import { Brain, Smartphone, Calendar, Clock, Home, Users, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, Timer } from "lucide-react"
import Link from "next/link"

interface DeepWorkScoreProps {
  className?: string
}

interface Question {
  id: string
  question: string
  icon: React.ElementType
  options: {
    label: string
    score: number
    tip?: string
  }[]
}

const QUESTIONS: Question[] = [
  {
    id: "phone",
    question: "How often do you check your phone during focused work?",
    icon: Smartphone,
    options: [
      { label: "Every few minutes", score: 0, tip: "Each check costs 23 min of focus recovery" },
      { label: "Every 30 minutes", score: 1 },
      { label: "Only during breaks", score: 3 },
      { label: "Phone is in another room", score: 4 },
    ],
  },
  {
    id: "schedule",
    question: "Do you have dedicated time blocks for deep work?",
    icon: Calendar,
    options: [
      { label: "No, I work reactively", score: 0 },
      { label: "Sometimes, when I remember", score: 1 },
      { label: "Most days, but flexible", score: 2 },
      { label: "Yes, same time every day", score: 4, tip: "Routine reduces decision fatigue" },
    ],
  },
  {
    id: "duration",
    question: "How long can you typically focus without interruption?",
    icon: Clock,
    options: [
      { label: "Under 15 minutes", score: 0 },
      { label: "15-30 minutes", score: 1 },
      { label: "30-60 minutes", score: 2 },
      { label: "60-90+ minutes", score: 4, tip: "Elite deep work capacity" },
    ],
  },
  {
    id: "environment",
    question: "How would you describe your work environment?",
    icon: Home,
    options: [
      { label: "Open office / constant noise", score: 0 },
      { label: "Shared space with some quiet", score: 1 },
      { label: "Private space, some interruptions", score: 2 },
      { label: "Fully controlled, distraction-free", score: 4 },
    ],
  },
  {
    id: "notifications",
    question: "How do you manage digital notifications?",
    icon: Users,
    options: [
      { label: "All notifications on", score: 0, tip: "Average worker interrupted 50+ times/day" },
      { label: "Some apps silenced", score: 1 },
      { label: "Do Not Disturb during work", score: 3 },
      { label: "Batch all comms to set times", score: 4 },
    ],
  },
]

const SCORE_RANGES = [
  { min: 0, max: 5, level: "Shallow", color: "red", message: "Your environment actively fights focus. Major changes needed." },
  { min: 6, max: 10, level: "Distracted", color: "orange", message: "Frequent context switches drain your cognitive energy." },
  { min: 11, max: 15, level: "Developing", color: "amber", message: "You have some good habits. Build more structure." },
  { min: 16, max: 18, level: "Focused", color: "emerald", message: "Strong deep work foundation. Optimize for consistency." },
  { min: 19, max: 20, level: "Elite", color: "cyan", message: "Exceptional focus discipline. You're in the top tier." },
]

export function DeepWorkScore({ className = "" }: DeepWorkScoreProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score }
    setAnswers(newAnswers)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const result = useMemo(() => {
    if (!showResult) return null

    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const maxScore = QUESTIONS.length * 4
    const percentage = Math.round((totalScore / maxScore) * 100)

    const scoreRange = SCORE_RANGES.find(
      (range) => totalScore >= range.min && totalScore <= range.max
    ) || SCORE_RANGES[0]

    // Find weakest areas
    const weakAreas = QUESTIONS
      .filter((q) => answers[q.id] <= 1)
      .map((q) => q.question.replace("How ", "").replace("Do you ", "").replace("?", ""))
      .slice(0, 3)

    return {
      totalScore,
      maxScore,
      percentage,
      ...scoreRange,
      weakAreas,
    }
  }, [answers, showResult])

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS.length) * 100
  const currentQ = QUESTIONS[currentQuestion]

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    red: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-500" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-500" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-500" },
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 mb-3">
            <Brain className="h-3 w-3" />
            Deep Work Assessment
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Calculate Your Deep Work Score
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Assess your environment and habits for focused work
          </p>
        </div>

        {/* Progress Bar */}
        {!showResult && (
          <div className="mb-6">
            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        {!showResult ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <currentQ.icon className="h-6 w-6 text-indigo-500" />
              <h4 className="font-medium text-foreground text-center">
                {currentQ.question}
              </h4>
            </div>
            <div className="space-y-2">
              {currentQ.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(currentQ.id, option.score)}
                  className="w-full p-4 text-left rounded-xl bg-card/60 border border-border/50 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {option.label}
                    </span>
                    {option.score === 4 && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )}
                    {option.score === 0 && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {option.tip && (
                    <p className="text-xs text-muted-foreground mt-1">{option.tip}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Score Display */}
            <div className={`p-5 rounded-xl ${colorClasses[result.color].bg} border ${colorClasses[result.color].border}`}>
              <div className="text-center mb-4">
                <div className={`text-5xl font-bold ${colorClasses[result.color].text} mb-1`}>
                  {result.totalScore}/{result.maxScore}
                </div>
                <div className={`text-lg font-semibold ${colorClasses[result.color].text}`}>
                  {result.level} Deep Worker
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {result.message}
                </div>
              </div>

              {/* Score Bar */}
              <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                <div
                  className={`h-full ${result.color === "red" ? "bg-red-500" : result.color === "orange" ? "bg-orange-500" : result.color === "amber" ? "bg-amber-500" : result.color === "emerald" ? "bg-emerald-500" : "bg-cyan-500"} transition-all duration-500`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Shallow</span>
                <span>Elite</span>
              </div>
            </div>

            {/* Weak Areas */}
            {result.weakAreas.length > 0 && (
              <div className="p-4 rounded-xl bg-card/60 border border-border/50">
                <div className="text-sm font-medium text-foreground mb-3">Areas to Improve:</div>
                <ul className="space-y-2">
                  {result.weakAreas.map((area, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
              <div className="text-sm font-medium text-foreground mb-2">Quick Wins:</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {result.totalScore < 10 && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      Put phone in another room during work blocks
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      Schedule 2 hours of uninterrupted time daily
                    </li>
                  </>
                )}
                {result.totalScore >= 10 && result.totalScore < 16 && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      Batch email/messages to 2-3 set times per day
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      Use Pomodoro to build focus duration gradually
                    </li>
                  </>
                )}
                {result.totalScore >= 16 && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      Experiment with 90-minute deep work blocks
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      Track your peak focus hours to optimize schedule
                    </li>
                  </>
                )}
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Assessment
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to improve your focus?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium text-sm transition-colors"
          >
            <Timer className="h-4 w-4" />
            Start Deep Work Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
