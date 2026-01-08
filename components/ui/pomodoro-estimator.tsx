"use client"

import { useState, useMemo } from "react"
import { Calculator, Clock, Code2, Bug, GitBranch, FileCode, BookOpen, Layers, Zap } from "lucide-react"
import Link from "next/link"

interface PomodoroEstimatorProps {
  className?: string
}

type TaskType = "bug-fix" | "feature" | "code-review" | "refactoring" | "documentation" | "learning"
type Complexity = "low" | "medium" | "high"

const TASK_TYPES = [
  { id: "bug-fix" as TaskType, label: "Bug Fix", icon: Bug, basePomodoros: 1.5 },
  { id: "feature" as TaskType, label: "New Feature", icon: Code2, basePomodoros: 4 },
  { id: "code-review" as TaskType, label: "Code Review", icon: GitBranch, basePomodoros: 1.5 },
  { id: "refactoring" as TaskType, label: "Refactoring", icon: Layers, basePomodoros: 2.5 },
  { id: "documentation" as TaskType, label: "Documentation", icon: FileCode, basePomodoros: 2 },
  { id: "learning" as TaskType, label: "Learning/Research", icon: BookOpen, basePomodoros: 2 },
]

const COMPLEXITY_MULTIPLIERS: Record<Complexity, { label: string; multiplier: number; description: string }> = {
  low: { label: "Low", multiplier: 0.7, description: "Straightforward, familiar codebase" },
  medium: { label: "Medium", multiplier: 1, description: "Some unknowns, moderate complexity" },
  high: { label: "High", multiplier: 1.8, description: "Complex logic, unfamiliar territory" },
}

export function PomodoroEstimator({ className = "" }: PomodoroEstimatorProps) {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
  const [complexity, setComplexity] = useState<Complexity>("medium")

  const estimate = useMemo(() => {
    if (!selectedTask) return null

    const task = TASK_TYPES.find((t) => t.id === selectedTask)
    if (!task) return null

    const multiplier = COMPLEXITY_MULTIPLIERS[complexity].multiplier
    const pomodoros = Math.ceil(task.basePomodoros * multiplier)
    const minutes = pomodoros * 25
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return {
      pomodoros,
      timeFormatted: hours > 0
        ? `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`.trim()
        : `${minutes}m`,
      breaks: pomodoros - 1,
      totalWithBreaks: minutes + (pomodoros - 1) * 5,
    }
  }, [selectedTask, complexity])

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-3">
            <Calculator className="h-3 w-3" />
            Interactive Tool
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Pomodoro Task Estimator
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Get realistic time estimates for your dev tasks
          </p>
        </div>

        {/* Task Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            1. What type of task?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {TASK_TYPES.map((task) => {
              const Icon = task.icon
              const isSelected = selectedTask === task.id
              return (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(task.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {task.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Complexity Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            2. Task complexity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(COMPLEXITY_MULTIPLIERS) as Complexity[]).map((level) => {
              const { label, description } = COMPLEXITY_MULTIPLIERS[level]
              const isSelected = complexity === level
              return (
                <button
                  key={level}
                  onClick={() => setComplexity(level)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="font-medium text-sm">{label}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {description.split(",")[0]}
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
              <span className="text-sm font-medium text-foreground">Estimated Time</span>
              <Zap className="h-4 w-4 text-amber-500" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-500">{estimate.pomodoros}</div>
                <div className="text-xs text-muted-foreground">pomodoros</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{estimate.timeFormatted}</div>
                <div className="text-xs text-muted-foreground">focus time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-500">
                  {Math.floor(estimate.totalWithBreaks / 60)}h {estimate.totalWithBreaks % 60}m
                </div>
                <div className="text-xs text-muted-foreground">total w/ breaks</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                Includes {estimate.breaks} short break{estimate.breaks !== 1 ? "s" : ""} (5 min each).
                Track actual time to calibrate your estimates.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-muted/30 border border-dashed border-border/50 text-center">
            <Clock className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Select a task type to see the estimate
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to start tracking?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium text-sm transition-colors"
          >
            Start Your First Pomodoro
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
