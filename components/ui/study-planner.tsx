"use client"

import { useState, useMemo } from "react"
import { BookOpen, Clock, Plus, X, Sparkles, GraduationCap } from "lucide-react"
import Link from "next/link"

interface StudyPlannerProps {
  className?: string
}

interface Subject {
  id: string
  name: string
  difficulty: "easy" | "medium" | "hard"
}

const DIFFICULTY_CONFIG = {
  easy: { label: "Easy", pomodoros: 1, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  medium: { label: "Medium", pomodoros: 2, color: "text-amber-500", bg: "bg-amber-500/10" },
  hard: { label: "Hard", pomodoros: 3, color: "text-rose-500", bg: "bg-rose-500/10" },
}

const PRESET_SUBJECTS = [
  "Math", "Physics", "Chemistry", "Biology", "History",
  "Literature", "Economics", "Psychology", "Computer Science", "Languages"
]

export function StudyPlanner({ className = "" }: StudyPlannerProps) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [showPresets, setShowPresets] = useState(false)

  const addSubject = (name: string, difficulty: Subject["difficulty"] = "medium") => {
    if (!name.trim()) return
    setSubjects(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: name.trim(), difficulty }
    ])
    setNewSubject("")
    setShowPresets(false)
  }

  const removeSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id))
  }

  const updateDifficulty = (id: string, difficulty: Subject["difficulty"]) => {
    setSubjects(prev => prev.map(s =>
      s.id === id ? { ...s, difficulty } : s
    ))
  }

  const schedule = useMemo(() => {
    if (subjects.length === 0) return null

    const totalPomodoros = subjects.reduce((sum, s) =>
      sum + DIFFICULTY_CONFIG[s.difficulty].pomodoros, 0
    )
    const focusMinutes = totalPomodoros * 25
    const breakMinutes = (totalPomodoros - 1) * 5 + Math.floor(totalPomodoros / 4) * 15
    const totalMinutes = focusMinutes + breakMinutes

    return {
      totalPomodoros,
      focusTime: `${Math.floor(focusMinutes / 60)}h ${focusMinutes % 60}m`,
      totalTime: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
      breakdown: subjects.map(s => ({
        name: s.name,
        pomodoros: DIFFICULTY_CONFIG[s.difficulty].pomodoros,
        difficulty: s.difficulty
      }))
    }
  }, [subjects])

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-3">
            <Sparkles className="h-3 w-3" />
            Interactive Planner
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Study Session Planner
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add your subjects and get a personalized pomodoro schedule
          </p>
        </div>

        {/* Add Subject */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Add subjects to study
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onFocus={() => setShowPresets(true)}
                onKeyDown={(e) => e.key === "Enter" && addSubject(newSubject)}
                placeholder="e.g., Calculus, History..."
                className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              {showPresets && !newSubject && (
                <div className="absolute top-full left-0 right-0 mt-1 p-2 rounded-xl bg-card border border-border/50 shadow-lg z-10">
                  <div className="flex flex-wrap gap-1">
                    {PRESET_SUBJECTS.filter(p => !subjects.some(s => s.name === p)).slice(0, 6).map(preset => (
                      <button
                        key={preset}
                        onClick={() => addSubject(preset)}
                        className="px-2 py-1 text-xs rounded-lg bg-muted/50 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => addSubject(newSubject)}
              disabled={!newSubject.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Subject List */}
        {subjects.length > 0 && (
          <div className="mb-6 space-y-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Your subjects ({subjects.length})
            </label>
            {subjects.map(subject => (
              <div
                key={subject.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/50"
              >
                <BookOpen className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="flex-1 font-medium text-foreground">{subject.name}</span>
                <div className="flex gap-1">
                  {(Object.keys(DIFFICULTY_CONFIG) as Subject["difficulty"][]).map(diff => (
                    <button
                      key={diff}
                      onClick={() => updateDifficulty(subject.id, diff)}
                      className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                        subject.difficulty === diff
                          ? `${DIFFICULTY_CONFIG[diff].bg} ${DIFFICULTY_CONFIG[diff].color} font-medium`
                          : "text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      {DIFFICULTY_CONFIG[diff].label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => removeSubject(subject.id)}
                  className="p-1 text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Schedule Results */}
        {schedule ? (
          <div className="p-5 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Your Study Plan</span>
              <GraduationCap className="h-4 w-4 text-emerald-500" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <div className="text-3xl font-bold text-emerald-500">{schedule.totalPomodoros}</div>
                <div className="text-xs text-muted-foreground">pomodoros</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{schedule.focusTime}</div>
                <div className="text-xs text-muted-foreground">focus time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-500">{schedule.totalTime}</div>
                <div className="text-xs text-muted-foreground">total</div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50">
              <div className="text-xs font-medium text-muted-foreground mb-2">Breakdown:</div>
              {schedule.breakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.name}</span>
                  <span className={DIFFICULTY_CONFIG[item.difficulty].color}>
                    {item.pomodoros} 🍅
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-muted/30 border border-dashed border-border/50 text-center">
            <Clock className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Add subjects to see your study schedule
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to start studying?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-medium text-sm transition-colors"
          >
            Start Your Study Session
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
