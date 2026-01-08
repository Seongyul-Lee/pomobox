"use client"

import { useState, useEffect, useCallback } from "react"
import { Check, Home, Calendar, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChecklistItem {
  id: string
  category: "environment" | "schedule" | "tools"
  label: string
}

interface GuideChecklistProps {
  items: ChecklistItem[]
  storageKey: string
  className?: string
}

const CATEGORY_CONFIG = {
  environment: {
    icon: Home,
    label: "Environment",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  schedule: {
    icon: Calendar,
    label: "Schedule",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  tools: {
    icon: Wrench,
    label: "Tools",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
}

export function GuideChecklist({ items, storageKey, className }: GuideChecklistProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCompleted(new Set(parsed))
      } catch {
        // Ignore parse errors
      }
    }
    setIsLoaded(true)
  }, [storageKey])

  // Save to localStorage when completed changes
  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem(storageKey, JSON.stringify([...completed]))
  }, [completed, storageKey, isLoaded])

  const toggleItem = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleItem(id)
      }
    },
    [toggleItem]
  )

  const completedCount = completed.size
  const totalCount = items.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const isComplete = completedCount === totalCount

  // Group items by category
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>
  )

  const categories = ["environment", "schedule", "tools"] as const

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Section */}
      <div className="p-4 md:p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">
            Your Home Office Score
          </span>
          <span
            className={cn(
              "text-sm font-semibold",
              isComplete ? "text-green-500" : "text-muted-foreground"
            )}
          >
            {completedCount} / {totalCount}
          </span>
        </div>
        <div className="h-2.5 bg-[oklch(0.88_0.01_255)] dark:bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-500 rounded-full",
              isComplete ? "bg-green-500" : "bg-primary"
            )}
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={completedCount}
            aria-valuemin={0}
            aria-valuemax={totalCount}
            aria-label={`${completedCount} of ${totalCount} items completed`}
          />
        </div>
        {isComplete && (
          <p className="text-xs text-green-500 text-center mt-2 font-medium">
            Great setup! You&apos;re ready for focused remote work.
          </p>
        )}
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const config = CATEGORY_CONFIG[category]
          const categoryItems = groupedItems[category] || []
          if (categoryItems.length === 0) return null

          const CategoryIcon = config.icon
          const categoryCompleted = categoryItems.filter((item) =>
            completed.has(item.id)
          ).length

          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={cn("p-1.5 rounded-lg", config.bgColor)}>
                  <CategoryIcon className={cn("h-3.5 w-3.5", config.color)} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {config.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({categoryCompleted}/{categoryItems.length})
                </span>
              </div>

              <div className="space-y-1.5 pl-1">
                {categoryItems.map((item) => {
                  const isChecked = completed.has(item.id)
                  return (
                    <div
                      key={item.id}
                      role="checkbox"
                      aria-checked={isChecked}
                      aria-label={item.label}
                      tabIndex={0}
                      onClick={() => toggleItem(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
                        "border border-border/50 hover:border-primary/30",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        isChecked
                          ? "bg-primary/5 dark:bg-primary/10"
                          : "bg-card/60 dark:bg-card/40"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-5 h-5 rounded-md border-2 transition-colors flex-shrink-0",
                          isChecked
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/40"
                        )}
                      >
                        {isChecked && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span
                        className={cn(
                          "text-sm transition-colors",
                          isChecked
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
