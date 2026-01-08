"use client"

import { useState, useMemo } from "react"
import { Clock, Brain, Zap, Coffee, Timer, ChevronRight, RotateCcw } from "lucide-react"
import Link from "next/link"

interface FocusDurationCalculatorProps {
  className?: string
}

type Factor = 1 | 2 | 3 | 4

interface Question {
  id: string
  label: string
  question: string
  options: { label: string; value: Factor; description: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: "experience",
    label: "Focus Experience",
    question: "How would you rate your current focus ability?",
    options: [
      { label: "Beginner", value: 1, description: "Often distracted, new to focus techniques" },
      { label: "Developing", value: 2, description: "Can focus but need structure" },
      { label: "Intermediate", value: 3, description: "Comfortable with 25-min sessions" },
      { label: "Advanced", value: 4, description: "Regularly do 45+ min deep work" },
    ],
  },
  {
    id: "task",
    label: "Task Complexity",
    question: "What type of work will you be doing?",
    options: [
      { label: "Simple", value: 1, description: "Email, admin, routine tasks" },
      { label: "Moderate", value: 2, description: "Reading, studying, basic coding" },
      { label: "Complex", value: 3, description: "Writing, problem-solving, design" },
      { label: "Deep Creative", value: 4, description: "Novel problems, intense thinking" },
    ],
  },
  {
    id: "energy",
    label: "Energy Level",
    question: "How is your current energy and alertness?",
    options: [
      { label: "Low", value: 1, description: "Tired, struggling to concentrate" },
      { label: "Below Average", value: 2, description: "Functional but not peak" },
      { label: "Good", value: 3, description: "Alert, well-rested" },
      { label: "Peak", value: 4, description: "Highly energized, optimal state" },
    ],
  },
  {
    id: "environment",
    label: "Environment",
    question: "How controlled is your work environment?",
    options: [
      { label: "High Distraction", value: 1, description: "Many interruptions expected" },
      { label: "Some Distraction", value: 2, description: "Occasional interruptions" },
      { label: "Mostly Quiet", value: 3, description: "Controlled, few interruptions" },
      { label: "Fully Controlled", value: 4, description: "Complete focus possible" },
    ],
  },
]

const DURATION_RESULTS = [
  {
    minScore: 4,
    maxScore: 7,
    duration: 15,
    label: "Quick Sprint",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    science: "Research shows even 15-minute intervals can be effective for building focus habits. Starting shorter reduces resistance and prevents burnout when conditions aren't optimal.",
    breakTime: 3,
  },
  {
    minScore: 8,
    maxScore: 10,
    duration: 20,
    label: "Short Focus",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    science: "20 minutes aligns closely with natural attention span limits (Bradbury, 2016). Ideal for moderate tasks or when building focus capacity.",
    breakTime: 4,
  },
  {
    minScore: 11,
    maxScore: 13,
    duration: 25,
    label: "Classic Pomodoro",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    science: "The scientifically-validated sweet spot. 25 minutes captures 95% of peak attention (vigilance decrement research) while allowing flow state entry.",
    breakTime: 5,
  },
  {
    minScore: 14,
    maxScore: 15,
    duration: 45,
    label: "Extended Session",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    science: "For experienced practitioners with optimal conditions. Allows deeper immersion but requires trained focus capacity. Aligns with half an ultradian cycle.",
    breakTime: 10,
  },
  {
    minScore: 16,
    maxScore: 16,
    duration: 90,
    label: "Ultra Focus",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    science: "Full ultradian cycle (Kleitman, 1982). Only recommended for peak conditions + advanced focus ability. Requires substantial recovery break afterward.",
    breakTime: 20,
  },
]

export function FocusDurationCalculator({ className = "" }: FocusDurationCalculatorProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Factor>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, value: Factor) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const result = useMemo(() => {
    if (!showResult) return null

    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0)
    return DURATION_RESULTS.find(r => totalScore >= r.minScore && totalScore <= r.maxScore) || DURATION_RESULTS[2]
  }, [answers, showResult])

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS.length) * 100
  const currentQ = QUESTIONS[currentQuestion]

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-3">
            <Clock className="h-3 w-3" />
            Science-Based Calculator
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Calculate Your Optimal Focus Duration
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Answer 4 questions based on cognitive science research
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
            <span>{showResult ? "Complete" : `${currentQ.label}`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground text-center">
              {currentQ.question}
            </h4>
            <div className="space-y-2">
              {currentQ.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
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
          <div className="space-y-4">
            <div className={`p-5 rounded-xl ${result.bgColor} border ${result.borderColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <Timer className={`h-6 w-6 ${result.color}`} />
                <div>
                  <div className={`text-2xl font-bold ${result.color}`}>{result.duration} minutes</div>
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase">Research Basis</span>
                </div>
                <p className="text-sm text-muted-foreground">{result.science}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30">
                <div className="p-3 rounded-lg bg-background/50 text-center">
                  <div className={`text-xl font-bold ${result.color}`}>{result.duration}</div>
                  <div className="text-xs text-muted-foreground">Focus (min)</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 text-center">
                  <div className={`text-xl font-bold ${result.color}`}>{result.breakTime}</div>
                  <div className="text-xs text-muted-foreground">Break (min)</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-xs font-medium text-foreground mb-2">Quick Tips:</div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ChevronRight className={`h-3 w-3 ${result.color}`} />
                  Start with this duration and adjust based on feel
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className={`h-3 w-3 ${result.color}`} />
                  Take all breaks—they restore cognitive resources
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className={`h-3 w-3 ${result.color}`} />
                  Re-calculate when conditions change significantly
                </div>
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
            Ready to test your calculated duration?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium text-sm transition-colors"
          >
            Start Your Optimized Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
