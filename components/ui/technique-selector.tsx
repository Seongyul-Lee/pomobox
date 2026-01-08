"use client"

import { useState, useMemo } from "react"
import { Timer, Waves, RotateCcw, ArrowRight, CheckCircle2, Clock, Zap, Brain, Target } from "lucide-react"
import Link from "next/link"

interface TechniqueSelectorProps {
  className?: string
}

interface Question {
  id: string
  question: string
  options: {
    label: string
    pomodoro: number
    flowtime: number
    description: string
  }[]
}

const QUESTIONS: Question[] = [
  {
    id: "interruptions",
    question: "How often do you get interrupted during work?",
    options: [
      { label: "Frequently", pomodoro: 3, flowtime: 0, description: "Multiple times per hour" },
      { label: "Sometimes", pomodoro: 2, flowtime: 1, description: "A few times per day" },
      { label: "Rarely", pomodoro: 0, flowtime: 3, description: "I have long uninterrupted blocks" },
    ],
  },
  {
    id: "task_type",
    question: "What type of work do you primarily do?",
    options: [
      { label: "Varied Tasks", pomodoro: 3, flowtime: 0, description: "Admin, emails, meetings mixed in" },
      { label: "Mixed", pomodoro: 1, flowtime: 1, description: "Some deep work, some routine" },
      { label: "Deep Creative Work", pomodoro: 0, flowtime: 3, description: "Writing, coding, design" },
    ],
  },
  {
    id: "structure_preference",
    question: "How do you feel about rigid schedules?",
    options: [
      { label: "Love Structure", pomodoro: 3, flowtime: 0, description: "Clear rules help me focus" },
      { label: "Balanced", pomodoro: 1, flowtime: 1, description: "Some structure, some flexibility" },
      { label: "Prefer Flexibility", pomodoro: 0, flowtime: 3, description: "I work best following my flow" },
    ],
  },
  {
    id: "flow_tendency",
    question: "How easily do you enter a 'flow state'?",
    options: [
      { label: "Rarely", pomodoro: 3, flowtime: 0, description: "I need help getting into focus" },
      { label: "Sometimes", pomodoro: 1, flowtime: 2, description: "When conditions are right" },
      { label: "Often", pomodoro: 0, flowtime: 3, description: "I can get deeply absorbed easily" },
    ],
  },
  {
    id: "break_behavior",
    question: "What happens when you take unscheduled breaks?",
    options: [
      { label: "Hard to Return", pomodoro: 3, flowtime: 0, description: "Breaks turn into hours" },
      { label: "Usually Fine", pomodoro: 1, flowtime: 2, description: "Can get back to work okay" },
      { label: "No Problem", pomodoro: 0, flowtime: 3, description: "I naturally return when rested" },
    ],
  },
]

const RESULTS = {
  pomodoro: {
    name: "Pomodoro Technique",
    icon: Timer,
    color: "primary",
    description: "Structured 25-minute sessions with mandatory breaks work best for you.",
    strengths: [
      "Provides external structure when focus is challenging",
      "Forces regular breaks to prevent burnout",
      "Clear start/stop signals reduce decision fatigue",
      "Works well in environments with interruptions",
    ],
    tips: [
      "Start with standard 25/5 intervals",
      "Use physical or audible timers",
      "Track completed pomodoros for motivation",
    ],
  },
  flowtime: {
    name: "Flowtime Technique",
    icon: Waves,
    color: "cyan",
    description: "Flexible sessions that follow your natural focus patterns suit you better.",
    strengths: [
      "Doesn't interrupt flow state with arbitrary timers",
      "Adapts to your natural energy rhythms",
      "Better for deep creative or analytical work",
      "Feels less restrictive and more natural",
    ],
    tips: [
      "Track session start times to build awareness",
      "Take breaks when you naturally feel focus waning",
      "Keep a time log to identify your patterns",
    ],
  },
  hybrid: {
    name: "Hybrid Approach",
    icon: Target,
    color: "violet",
    description: "You'd benefit from combining both techniques based on context.",
    strengths: [
      "Use Pomodoro for routine/admin tasks",
      "Use Flowtime for creative/deep work",
      "Flexibility to match technique to task type",
      "Best of both worlds",
    ],
    tips: [
      "Start sessions with Pomodoro, extend if in flow",
      "Use Pomodoro for task initiation, Flowtime for continuation",
      "Experiment to find your personal blend",
    ],
  },
}

export function TechniqueSelector({ className = "" }: TechniqueSelectorProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, { pomodoro: number; flowtime: number }>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, scores: { pomodoro: number; flowtime: number }) => {
    const newAnswers = { ...answers, [questionId]: scores }
    setAnswers(newAnswers)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const result = useMemo(() => {
    if (!showResult) return null

    const totals = Object.values(answers).reduce(
      (acc, scores) => ({
        pomodoro: acc.pomodoro + scores.pomodoro,
        flowtime: acc.flowtime + scores.flowtime,
      }),
      { pomodoro: 0, flowtime: 0 }
    )

    const diff = Math.abs(totals.pomodoro - totals.flowtime)

    if (diff <= 3) return { ...RESULTS.hybrid, scores: totals }
    if (totals.pomodoro > totals.flowtime) return { ...RESULTS.pomodoro, scores: totals }
    return { ...RESULTS.flowtime, scores: totals }
  }, [answers, showResult])

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS.length) * 100
  const currentQ = QUESTIONS[currentQuestion]

  const colorClasses = {
    primary: { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-500" },
    violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-500" },
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-violet-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-600 dark:text-violet-400 mb-3">
            <Target className="h-3 w-3" />
            Technique Finder
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Which Technique Fits You?
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Answer 5 questions to find your ideal focus method
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{showResult ? "Complete" : `Question ${currentQuestion + 1} of ${QUESTIONS.length}`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground text-center">
              {currentQ.question}
            </h4>
            <div className="space-y-2">
              {currentQ.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(currentQ.id, { pomodoro: option.pomodoro, flowtime: option.flowtime })}
                  className="w-full p-4 text-left rounded-xl bg-card/60 border border-border/50 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group"
                >
                  <div className="font-medium text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400">
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
          <div className="space-y-5">
            {/* Result Card */}
            <div className={`p-5 rounded-xl ${colorClasses[result.color as keyof typeof colorClasses].bg} border ${colorClasses[result.color as keyof typeof colorClasses].border}`}>
              <div className="flex items-center gap-3 mb-3">
                <result.icon className={`h-8 w-8 ${colorClasses[result.color as keyof typeof colorClasses].text}`} />
                <div>
                  <div className={`text-xl font-bold ${colorClasses[result.color as keyof typeof colorClasses].text}`}>
                    {result.name}
                  </div>
                  <div className="text-sm text-muted-foreground">Best match for your work style</div>
                </div>
              </div>

              <p className="text-sm text-foreground mb-4">{result.description}</p>

              {/* Score Comparison */}
              <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-border/30">
                <div className="text-center p-2 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-primary">{result.scores.pomodoro}</div>
                  <div className="text-xs text-muted-foreground">Pomodoro</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-background/50">
                  <div className="text-lg font-bold text-cyan-500">{result.scores.flowtime}</div>
                  <div className="text-xs text-muted-foreground">Flowtime</div>
                </div>
              </div>

              {/* Why It Works */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-foreground">Why this works for you:</div>
                {result.strengths.map((strength, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className={`h-4 w-4 ${colorClasses[result.color as keyof typeof colorClasses].text} flex-shrink-0 mt-0.5`} />
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-xs font-medium text-foreground mb-2">Getting Started:</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {result.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
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
            Ready to try your recommended technique?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 hover:text-violet-500 font-medium text-sm transition-colors"
          >
            Start Focus Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
