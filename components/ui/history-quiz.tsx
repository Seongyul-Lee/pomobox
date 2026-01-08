"use client"

import { useState, useMemo } from "react"
import { History, Trophy, RotateCcw, CheckCircle2, XCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

interface HistoryQuizProps {
  className?: string
}

interface Question {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "In which decade was the Pomodoro Technique invented?",
    options: ["1970s", "1980s", "1990s", "2000s"],
    correctIndex: 1,
    explanation: "Francesco Cirillo developed the technique in the late 1980s while struggling to focus as a university student in Italy.",
  },
  {
    id: 2,
    question: "Why is it called 'Pomodoro'?",
    options: [
      "It was invented in Pomodoro, Italy",
      "Named after a tomato-shaped kitchen timer",
      "It's an acronym for a productivity system",
      "Named after Francesco's nickname",
    ],
    correctIndex: 1,
    explanation: "Pomodoro is Italian for 'tomato.' Cirillo used a tomato-shaped kitchen timer when he first developed the technique.",
  },
  {
    id: 3,
    question: "What was Cirillo's first focus challenge to himself?",
    options: ["25 minutes", "10 minutes", "15 minutes", "5 minutes"],
    correctIndex: 1,
    explanation: "Cirillo started with a modest goal: 'Can I focus for just 10 minutes?' This small commitment was the seed of the entire technique.",
  },
  {
    id: 4,
    question: "When was the Pomodoro Technique publicly released as a free PDF?",
    options: ["1992", "1998", "2006", "2012"],
    correctIndex: 2,
    explanation: "In 2006, Cirillo published 'The Pomodoro Technique' as a free PDF, triggering its viral spread through productivity communities.",
  },
  {
    id: 5,
    question: "How did Cirillo arrive at 25 minutes as the optimal interval?",
    options: [
      "Based on scientific research",
      "Through personal experimentation",
      "Recommended by a productivity expert",
      "It was the timer's maximum setting",
    ],
    correctIndex: 1,
    explanation: "Cirillo experimented with various durations—2 minutes (too short), 45 minutes (too long)—before settling on 25 minutes as the optimal balance.",
  },
]

const SCORE_FEEDBACK = [
  { minScore: 0, maxScore: 1, title: "Pomodoro Newcomer", message: "Time to learn more about the technique's fascinating history!" },
  { minScore: 2, maxScore: 3, title: "History Student", message: "You know the basics! Keep exploring the story behind the technique." },
  { minScore: 4, maxScore: 4, title: "Pomodoro Historian", message: "Impressive knowledge! You understand the technique's origins well." },
  { minScore: 5, maxScore: 5, title: "Pomodoro Expert", message: "Perfect score! You could write your own history of the technique." },
]

export function HistoryQuiz({ className = "" }: HistoryQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === QUESTIONS[currentQuestion].correctIndex) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setShowResult(false)
  }

  const feedback = useMemo(() => {
    return SCORE_FEEDBACK.find(f => score >= f.minScore && score <= f.maxScore) || SCORE_FEEDBACK[0]
  }, [score])

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS.length) * 100

  const currentQ = QUESTIONS[currentQuestion]

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-600 dark:text-amber-400 mb-3">
            <History className="h-3 w-3" />
            History Quiz
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Test Your Pomodoro Knowledge
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {showResult ? "Quiz complete!" : `Question ${currentQuestion + 1} of ${QUESTIONS.length}`}
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
            <span>Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            {/* Question */}
            <h4 className="font-medium text-foreground text-center">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, i) => {
                const isCorrect = i === currentQ.correctIndex
                const isSelected = i === selectedAnswer
                let buttonClass = "w-full p-4 text-left rounded-xl bg-card/60 border transition-all"

                if (showExplanation) {
                  if (isCorrect) {
                    buttonClass += " border-emerald-500 bg-emerald-500/10"
                  } else if (isSelected) {
                    buttonClass += " border-rose-500 bg-rose-500/10"
                  } else {
                    buttonClass += " border-border/50 opacity-50"
                  }
                } else {
                  buttonClass += " border-border/50 hover:border-amber-500/50 hover:bg-amber-500/5 cursor-pointer"
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectAnswer(i)}
                    disabled={showExplanation}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${
                        showExplanation && isCorrect ? "text-emerald-600 dark:text-emerald-400 font-medium" :
                        showExplanation && isSelected ? "text-rose-600 dark:text-rose-400" :
                        "text-foreground"
                      }`}>
                        {option}
                      </span>
                      {showExplanation && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-rose-500" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Explanation:</strong> {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestion < QUESTIONS.length - 1 ? "Next Question" : "See Results"}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          /* Results */
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50 text-center">
              <Trophy className={`h-12 w-12 mx-auto mb-3 ${
                score === 5 ? "text-amber-500" :
                score >= 4 ? "text-emerald-500" :
                score >= 2 ? "text-cyan-500" :
                "text-muted-foreground"
              }`} />
              <div className="text-3xl font-bold text-foreground mb-1">
                {score} / {QUESTIONS.length}
              </div>
              <div className={`text-lg font-semibold mb-2 ${
                score === 5 ? "text-amber-500" :
                score >= 4 ? "text-emerald-500" :
                score >= 2 ? "text-cyan-500" :
                "text-muted-foreground"
              }`}>
                {feedback.title}
              </div>
              <p className="text-sm text-muted-foreground">
                {feedback.message}
              </p>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to make your own Pomodoro history?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-medium text-sm transition-colors"
          >
            Start Your First Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
