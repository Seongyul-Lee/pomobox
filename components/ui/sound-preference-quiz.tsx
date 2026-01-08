"use client"

import { useState, useMemo } from "react"
import { Volume2, Bell, Music, Zap, Leaf, ChevronRight, RotateCcw } from "lucide-react"
import Link from "next/link"

interface SoundPreferenceQuizProps {
  className?: string
}

type Answer = "bell" | "musical" | "sharp" | "nature"

interface Question {
  id: number
  question: string
  options: { label: string; value: Answer; description: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How easily do you get startled by sudden sounds?",
    options: [
      { label: "Very easily", value: "nature", description: "I prefer gentle transitions" },
      { label: "Somewhat", value: "bell", description: "Moderate sounds are fine" },
      { label: "Not really", value: "musical", description: "Clear sounds work well" },
      { label: "Not at all", value: "sharp", description: "I need distinct alerts" },
    ],
  },
  {
    id: 2,
    question: "What kind of work environment do you typically have?",
    options: [
      { label: "Quiet home office", value: "nature", description: "Peaceful, controlled" },
      { label: "Shared workspace", value: "bell", description: "Need discrete alerts" },
      { label: "Busy office", value: "sharp", description: "Need to cut through noise" },
      { label: "Creative studio", value: "musical", description: "Appreciate aesthetic sounds" },
    ],
  },
  {
    id: 3,
    question: "How do you feel about your current stress level?",
    options: [
      { label: "High stress", value: "nature", description: "Need calming sounds" },
      { label: "Moderate", value: "bell", description: "Balanced approach" },
      { label: "Low stress", value: "musical", description: "Open to variety" },
      { label: "Energized", value: "sharp", description: "Ready for action" },
    ],
  },
  {
    id: 4,
    question: "How deeply do you typically focus during work?",
    options: [
      { label: "Light focus", value: "bell", description: "Easy to transition" },
      { label: "Moderate depth", value: "musical", description: "Need clear signals" },
      { label: "Deep hyperfocus", value: "sharp", description: "Hard to break out" },
      { label: "Variable", value: "nature", description: "Gentle is safer" },
    ],
  },
]

const RESULTS = {
  bell: {
    title: "Classic Bell/Chime",
    icon: Bell,
    frequency: "800-1200 Hz",
    dopamineLevel: "High",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    description: "Classic bells and chimes create reliable reward signals without being jarring. The predictable tone creates strong expectancy confirmation in your brain's reward system.",
    tips: [
      "Choose a consistent bell tone",
      "Avoid overly complex melodies",
      "Consider varying intensity for breaks vs. sessions",
    ],
  },
  musical: {
    title: "Musical Note/Melody",
    icon: Music,
    frequency: "1000-2000 Hz",
    dopamineLevel: "Very High",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    description: "Musical sounds engage your reward circuits more deeply than simple tones. The melodic elements create a satisfying completion experience that reinforces productive habits.",
    tips: [
      "Pick melodies you genuinely enjoy",
      "Avoid songs with lyrics (too distracting)",
      "Rotate occasionally to prevent habituation",
    ],
  },
  sharp: {
    title: "Sharp Alert/Beep",
    icon: Zap,
    frequency: "1000-1500 Hz",
    dopamineLevel: "Highest",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "Sharp, distinct sounds are most effective at breaking through deep concentration states. They produce the strongest immediate dopamine response but may feel jarring in quiet environments.",
    tips: [
      "Use for deep work sessions only",
      "Lower volume in quiet settings",
      "Pair with a gentler break-end sound",
    ],
  },
  nature: {
    title: "Nature/Ambient Sound",
    icon: Leaf,
    frequency: "200-5000 Hz",
    dopamineLevel: "Moderate",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Natural sounds reduce cortisol while signaling completion. They're ideal if you're prone to anxiety or work in a stress-heavy environment. The gentle transition preserves your calm focus state.",
    tips: [
      "Birds, water, or wind sounds work well",
      "Ensure the sound is distinct enough to notice",
      "Great for break signals, consider stronger for session end",
    ],
  },
}

export function SoundPreferenceQuiz({ className = "" }: SoundPreferenceQuizProps) {
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

    const counts: Record<Answer, number> = { bell: 0, musical: 0, sharp: 0, nature: 0 }
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
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent border border-violet-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-600 dark:text-violet-400 mb-3">
            <Volume2 className="h-3 w-3" />
            Sound Preference Quiz
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Find Your Ideal Timer Sound
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Answer 4 questions for a personalized sound recommendation
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
              {QUESTIONS[currentQuestion].question}
            </h4>
            <div className="space-y-2">
              {QUESTIONS[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.value)}
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
          <div className="space-y-4">
            <div className={`p-5 rounded-xl ${result.bgColor} border ${result.borderColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <result.icon className={`h-6 w-6 ${result.color}`} />
                <div>
                  <div className={`text-lg font-bold ${result.color}`}>{result.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {result.frequency} | Dopamine: {result.dopamineLevel}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{result.description}</p>

              <div className="space-y-2 pt-3 border-t border-border/30">
                <div className="text-xs font-medium text-foreground">Tips for best results:</div>
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
            Ready to hear your recommended sound type?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 hover:text-violet-500 font-medium text-sm transition-colors"
          >
            Try It With a Focus Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
