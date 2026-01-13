"use client"

import { useState, useMemo } from "react"
import { Calculator, Clock, PenTool, Target, Zap } from "lucide-react"
import Link from "next/link"

interface WritingGoalCalculatorProps {
  className?: string
}

type WritingType = "first-draft" | "editing" | "research" | "blogging" | "copywriting"

const WRITING_TYPES = [
  { id: "first-draft" as WritingType, label: "First Draft", wordsPerHour: 500, sessionLength: 45, description: "Creative flow writing" },
  { id: "editing" as WritingType, label: "Editing", wordsPerHour: 800, sessionLength: 25, description: "Revision and polish" },
  { id: "research" as WritingType, label: "Research Writing", wordsPerHour: 300, sessionLength: 25, description: "With source integration" },
  { id: "blogging" as WritingType, label: "Blog Post", wordsPerHour: 600, sessionLength: 25, description: "Conversational content" },
  { id: "copywriting" as WritingType, label: "Copywriting", wordsPerHour: 400, sessionLength: 25, description: "Persuasive, polished copy" },
]

const PRESET_GOALS = [
  { label: "Blog Post", words: 1500 },
  { label: "Newsletter", words: 800 },
  { label: "Short Article", words: 2000 },
  { label: "Long-form", words: 5000 },
]

export function WritingGoalCalculator({ className = "" }: WritingGoalCalculatorProps) {
  const [wordGoal, setWordGoal] = useState<number>(1500)
  const [selectedType, setSelectedType] = useState<WritingType>("first-draft")
  const [customGoal, setCustomGoal] = useState<string>("1500")

  const estimate = useMemo(() => {
    const type = WRITING_TYPES.find((t) => t.id === selectedType)
    if (!type || wordGoal <= 0) return null

    const hoursNeeded = wordGoal / type.wordsPerHour
    const sessionMinutes = type.sessionLength
    const pomodorosNeeded = Math.ceil((hoursNeeded * 60) / sessionMinutes)
    const focusMinutes = pomodorosNeeded * sessionMinutes
    const breakMinutes = (pomodorosNeeded - 1) * 5
    const totalMinutes = focusMinutes + breakMinutes

    return {
      pomodoros: pomodorosNeeded,
      focusTime: focusMinutes,
      totalTime: totalMinutes,
      sessionLength: sessionMinutes,
      wordsPerSession: Math.round((type.wordsPerHour * sessionMinutes) / 60),
    }
  }, [wordGoal, selectedType])

  const handleCustomGoalChange = (value: string) => {
    setCustomGoal(value)
    const parsed = parseInt(value, 10)
    if (!isNaN(parsed) && parsed > 0) {
      setWordGoal(parsed)
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${mins}m`
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-600 dark:text-amber-400 mb-3">
            <Calculator className="h-3 w-3" />
            Interactive Tool
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Writing Goal Calculator
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Plan your writing sessions with realistic estimates
          </p>
        </div>

        {/* Word Goal Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            1. How many words is your goal?
          </label>

          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESET_GOALS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setWordGoal(preset.words)
                  setCustomGoal(preset.words.toString())
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  wordGoal === preset.words
                    ? "bg-amber-500 text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {preset.label} ({preset.words.toLocaleString()})
              </button>
            ))}
          </div>

          {/* Custom input */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={customGoal}
              onChange={(e) => handleCustomGoalChange(e.target.value)}
              min={100}
              max={100000}
              className="flex-1 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              placeholder="Enter word count"
            />
            <span className="text-sm text-muted-foreground">words</span>
          </div>
        </div>

        {/* Writing Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            2. What type of writing?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {WRITING_TYPES.map((type) => {
              const isSelected = selectedType === type.id
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    isSelected
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="font-medium text-sm">{type.label}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? "text-white/80" : ""}`}>
                    ~{type.wordsPerHour} words/hr
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        {estimate ? (
          <div className="p-5 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Your Writing Plan</span>
              <Zap className="h-4 w-4 text-amber-500" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-amber-500">{estimate.pomodoros}</div>
                <div className="text-xs text-muted-foreground">sessions</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">{estimate.sessionLength}m</div>
                <div className="text-xs text-muted-foreground">per session</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-cyan-500">{formatTime(estimate.focusTime)}</div>
                <div className="text-xs text-muted-foreground">focus time</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-emerald-500">{formatTime(estimate.totalTime)}</div>
                <div className="text-xs text-muted-foreground">total w/ breaks</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                ~{estimate.wordsPerSession} words per {estimate.sessionLength}-minute session.
                Adjust based on your personal writing speed.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-muted/30 border border-dashed border-border/50 text-center">
            <Target className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Enter a word goal to see your writing plan
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to start writing?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-medium text-sm transition-colors"
          >
            <PenTool className="h-4 w-4" />
            Start Your Writing Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
