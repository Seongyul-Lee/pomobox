"use client"

import { useState, useMemo } from "react"
import { FlaskConical, Timer, Brain, Zap, Coffee, ChevronRight, RotateCcw } from "lucide-react"
import Link from "next/link"

interface SessionRecommenderProps {
  className?: string
}

type Answer = number // 1-3 scale

interface Question {
  id: number
  question: string
  options: { label: string; value: Answer; description: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How experienced are you with focused work sessions?",
    options: [
      { label: "Beginner", value: 1, description: "New to time-boxing techniques" },
      { label: "Intermediate", value: 2, description: "Used Pomodoro occasionally" },
      { label: "Advanced", value: 3, description: "Regularly practice deep work" },
    ],
  },
  {
    id: 2,
    question: "What type of work will you be doing?",
    options: [
      { label: "Light tasks", value: 1, description: "Email, admin, simple reading" },
      { label: "Moderate focus", value: 2, description: "Writing, studying, coding" },
      { label: "Deep creative", value: 3, description: "Complex problem-solving, design" },
    ],
  },
  {
    id: 3,
    question: "How is your current energy level?",
    options: [
      { label: "Low", value: 1, description: "Tired, hard to concentrate" },
      { label: "Normal", value: 2, description: "Average, functional" },
      { label: "High", value: 3, description: "Alert, well-rested" },
    ],
  },
  {
    id: 4,
    question: "How distraction-prone is your environment?",
    options: [
      { label: "High distractions", value: 1, description: "Open office, notifications on" },
      { label: "Some distractions", value: 2, description: "Occasional interruptions" },
      { label: "Low distractions", value: 3, description: "Quiet, controlled space" },
    ],
  },
]

const RESULTS = [
  {
    minScore: 4,
    maxScore: 6,
    duration: "15-20 min",
    label: "Quick Sprint",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    science: "Short sessions match natural attention limits (~20 min) and reduce start resistance. Ideal for building focus habits or managing low-energy periods.",
    tips: ["Take 3-5 min breaks", "Set small, achievable goals", "Build up duration gradually"],
  },
  {
    minScore: 7,
    maxScore: 9,
    duration: "25 min",
    label: "Classic Pomodoro",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    science: "The classic 25-minute session slightly exceeds the attention span peak, building focus stamina without causing fatigue. Optimal for most knowledge work.",
    tips: ["5 min breaks between sessions", "4 pomodoros = 1 long break", "Track completed sessions"],
  },
  {
    minScore: 10,
    maxScore: 11,
    duration: "45-50 min",
    label: "Deep Dive",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    science: "Extended sessions allow deeper immersion and flow state entry (requires 10-15 min warmup). Best for complex work when you have trained focus capacity.",
    tips: ["10 min breaks recommended", "Prepare everything before starting", "Protect from all interruptions"],
  },
  {
    minScore: 12,
    maxScore: 12,
    duration: "90 min",
    label: "Ultra Focus",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    science: "Full ultradian cycle (~90 min) for experienced deep workers. Allows complete immersion but requires substantial recovery (20-30 min break) and optimal conditions.",
    tips: ["20-30 min break after", "Only for peak energy hours", "Single complex task per session"],
  },
]

export function SessionRecommender({ className = "" }: SessionRecommenderProps) {
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

    const totalScore = answers.reduce((sum, a) => sum + a, 0)
    return RESULTS.find(r => totalScore >= r.minScore && totalScore <= r.maxScore) || RESULTS[1]
  }, [answers, showResult])

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS.length) * 100

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-3">
            <FlaskConical className="h-3 w-3" />
            Science-Based Tool
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Find Your Optimal Session Duration
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Answer 4 questions for a personalized recommendation based on cognitive science
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-300"
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
                  className="w-full p-4 text-left rounded-xl bg-card/60 border border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="font-medium text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    {option.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          /* Result */
          <div className="space-y-4">
            <div className={`p-5 rounded-xl ${result.bgColor} border ${result.borderColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <Timer className={`h-6 w-6 ${result.color}`} />
                <div>
                  <div className={`text-2xl font-bold ${result.color}`}>{result.duration}</div>
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase">The Science</span>
                </div>
                <p className="text-sm text-muted-foreground">{result.science}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-border/30">
                <div className="text-xs font-medium text-foreground">Recommended approach:</div>
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
              Take Assessment Again
            </button>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to try your recommended duration?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium text-sm transition-colors"
          >
            Start Your Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
