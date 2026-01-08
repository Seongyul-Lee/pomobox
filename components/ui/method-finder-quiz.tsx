"use client"

import { useState, useMemo } from "react"
import { HelpCircle, Timer, Calendar, Sparkles, ChevronRight, RotateCcw } from "lucide-react"
import Link from "next/link"

interface MethodFinderQuizProps {
  className?: string
}

type Answer = "pomodoro" | "timeboxing" | "hybrid"

interface Question {
  id: number
  question: string
  options: { label: string; value: Answer }[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How do your tasks typically vary in length?",
    options: [
      { label: "Most tasks take similar time (15-45 min)", value: "pomodoro" },
      { label: "Tasks range from 10 min to several hours", value: "timeboxing" },
      { label: "Mix of both—some short, some long", value: "hybrid" },
    ],
  },
  {
    id: 2,
    question: "How often do you work with others on shared schedules?",
    options: [
      { label: "Mostly solo work, few meetings", value: "pomodoro" },
      { label: "Frequently coordinate with team calendars", value: "timeboxing" },
      { label: "Both—solo deep work + team collaboration", value: "hybrid" },
    ],
  },
  {
    id: 3,
    question: "What's your biggest productivity challenge?",
    options: [
      { label: "Starting tasks / fighting procrastination", value: "pomodoro" },
      { label: "Tasks expanding beyond planned time", value: "timeboxing" },
      { label: "Balancing focused work with meetings", value: "hybrid" },
    ],
  },
  {
    id: 4,
    question: "How do you prefer to structure breaks?",
    options: [
      { label: "Regular, scheduled breaks (every 25-50 min)", value: "pomodoro" },
      { label: "Take breaks when I finish tasks", value: "timeboxing" },
      { label: "Depends on the type of work", value: "hybrid" },
    ],
  },
  {
    id: 5,
    question: "How important is calendar integration to you?",
    options: [
      { label: "Not critical—I track time separately", value: "pomodoro" },
      { label: "Essential—I live by my calendar", value: "timeboxing" },
      { label: "Nice to have for some tasks", value: "hybrid" },
    ],
  },
]

const RESULTS = {
  pomodoro: {
    title: "Pomodoro Technique",
    icon: Timer,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    description: "You'll thrive with fixed focus intervals and mandatory breaks. Pomodoro's structure will help you fight procrastination and maintain sustainable productivity.",
    tips: [
      "Start with 25-minute sessions",
      "Take all breaks—they're not optional",
      "Track completed pomodoros daily",
    ],
  },
  timeboxing: {
    title: "Timeboxing",
    icon: Calendar,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "Your work style benefits from flexible time allocation. Timeboxing will help you plan your day, prevent task overrun, and coordinate with your team.",
    tips: [
      "Block time on your calendar",
      "Set hard stops for each box",
      "Review and adjust estimates weekly",
    ],
  },
  hybrid: {
    title: "Hybrid Approach",
    icon: Sparkles,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    description: "You'd benefit from combining both methods. Use timeboxing for weekly/daily planning, then execute with Pomodoro sessions within those blocks.",
    tips: [
      "Plan your week with timeboxes",
      "Use pomodoros for deep work blocks",
      "Switch methods based on task type",
    ],
  },
}

export function MethodFinderQuiz({ className = "" }: MethodFinderQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const result = useMemo(() => {
    if (!showResult) return null

    const counts = { pomodoro: 0, timeboxing: 0, hybrid: 0 }
    answers.forEach(a => counts[a]++)

    const winner = Object.entries(counts).reduce((a, b) =>
      counts[a[0] as Answer] >= counts[b[0] as Answer] ? a : b
    )[0] as Answer

    return RESULTS[winner]
  }, [answers, showResult])

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS.length) * 100

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-600 dark:text-amber-400 mb-3">
            <HelpCircle className="h-3 w-3" />
            Quick Quiz
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Find Your Ideal Method
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Answer 5 questions to discover which technique suits you best
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{showResult ? "Complete" : `Question ${currentQuestion + 1} of ${QUESTIONS.length}`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {!showResult ? (
          /* Question */
          <div className="space-y-4">
            <h4 className="font-medium text-foreground text-center">
              {QUESTIONS[currentQuestion].question}
            </h4>
            <div className="space-y-2">
              {QUESTIONS[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-4 text-left rounded-xl bg-card/60 border border-border/50 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group"
                >
                  <span className="text-sm text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          /* Result */
          <div className="space-y-4">
            <div className={`p-5 rounded-xl ${result.bgColor} border ${result.borderColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <result.icon className={`h-6 w-6 ${result.color}`} />
                <h4 className={`text-lg font-bold ${result.color}`}>{result.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{result.description}</p>
              <div className="space-y-2">
                <div className="text-xs font-medium text-foreground">Quick tips:</div>
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className={`h-3 w-3 ${result.color}`} />
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Take Quiz Again
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to try your recommended method?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-medium text-sm transition-colors"
          >
            Start a Pomodoro Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
