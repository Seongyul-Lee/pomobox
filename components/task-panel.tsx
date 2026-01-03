"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { X, Plus, Trash2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  useTaskStore,
  selectIsTaskPanelOpen,
  selectTasks,
  MAX_TASKS,
  type Task,
} from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/hooks/use-user"
import {
  useTasks,
  useTaskMutations,
  type SupabaseTask,
} from "@/lib/queries/task-queries"

/**
 * SupabaseTask → 로컬 Task 형식으로 변환
 */
function convertSupabaseToLocal(task: SupabaseTask): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    isCompleted: task.is_completed,
    priority: task.priority,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  }
}

/**
 * useMediaQuery hook for responsive rendering
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

/**
 * Task Item Component
 */
function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  const t = useTranslations("Task")

  return (
    <div
      className={cn(
        "group flex items-start gap-3 p-3 rounded-lg",
        "bg-background/50 hover:bg-background/80",
        "border border-border/30 hover:border-border/50",
        "transition-all duration-200"
      )}
    >
      {/* Checkbox */}
      <button
        type="button"
        role="checkbox"
        aria-checked={task.isCompleted}
        onClick={() => onToggle(task.id)}
        className={cn(
          "flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2",
          "flex items-center justify-center",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          task.isCompleted
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground/50 hover:border-primary"
        )}
        aria-label={task.isCompleted ? t("markIncomplete") : t("markComplete")}
      >
        {task.isCompleted && <Check className="w-3 h-3" aria-hidden="true" />}
      </button>

      {/* Title */}
      <span
        className={cn(
          "flex-1 text-sm whitespace-normal break-all text-left",
          task.isCompleted && "text-muted-foreground"
        )}
      >
        {task.title}
      </span>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className={cn(
          "flex-shrink-0 w-8 h-8 opacity-0 group-hover:opacity-100",
          "text-muted-foreground hover:text-destructive",
          "transition-opacity duration-200"
        )}
        aria-label={t("deleteTask")}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

/**
 * 로딩 스켈레톤 UI
 */
function TaskListSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-12 w-full rounded-lg bg-muted/50 animate-pulse"
        />
      ))}
    </div>
  )
}

/**
 * Task List Content (shared between desktop and mobile)
 */
function TaskListContent({
  onClose,
  inputRef,
}: {
  onClose: () => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}) {
  const t = useTranslations("Task")
  const { toast } = useToast()
  const { user, loading: userLoading } = useUser()
  const userId = user?.id ?? null

  // Zustand store (비로그인 사용자용)
  const localTasks = useTaskStore(selectTasks)
  const localAddTask = useTaskStore((state) => state.addTask)
  const localToggleComplete = useTaskStore((state) => state.toggleTaskComplete)
  const localDeleteTask = useTaskStore((state) => state.deleteTask)
  const clearLocalTasks = useTaskStore((state) => state.clearLocalTasks)

  // React Query (로그인 사용자용)
  const {
    data: supabaseTasks,
    isLoading: tasksLoading,
    isError,
    error,
  } = useTasks(userId)
  const { addTask: addTaskMutation, toggleComplete, removeTask } = useTaskMutations(userId)

  // 마이그레이션 완료 플래그
  const [migrationDone, setMigrationDone] = useState(false)

  // 로그인 시 localStorage → Supabase 마이그레이션
  useEffect(() => {
    if (user && localTasks.length > 0 && !migrationDone) {
      const migrateLocalTasks = async () => {
        try {
          // 각 로컬 Task를 Supabase로 마이그레이션
          for (const task of localTasks) {
            await addTaskMutation.mutateAsync({
              title: task.title,
              description: task.description,
              is_completed: task.isCompleted,
              priority: task.priority,
            })
          }
          // 마이그레이션 완료 후 localStorage 정리
          clearLocalTasks()
          setMigrationDone(true)
          toast({
            title: t("migrationComplete"),
            description: t("migrationCompleteDesc"),
          })
        } catch {
          toast({
            title: t("migrationFailed"),
            description: t("migrationFailedDesc"),
            variant: "destructive",
          })
        }
      }
      migrateLocalTasks()
    }
  }, [user, localTasks, migrationDone, addTaskMutation, clearLocalTasks, toast, t])

  // 에러 토스트
  useEffect(() => {
    if (isError && error) {
      toast({
        title: t("fetchError"),
        description: t("fetchErrorDesc"),
        variant: "destructive",
      })
    }
  }, [isError, error, toast, t])

  const [inputValue, setInputValue] = useState("")
  const localInputRef = useRef<HTMLInputElement>(null)
  const effectiveInputRef = inputRef || localInputRef

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      effectiveInputRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [effectiveInputRef])

  // 통합된 Task 리스트
  const tasks: Task[] = userId
    ? (supabaseTasks ?? []).map(convertSupabaseToLocal)
    : localTasks

  const taskCount = tasks.length
  const isLoading = userLoading || (!!userId && tasksLoading)

  // Task 추가 핸들러
  const handleAddTask = useCallback(() => {
    const trimmedValue = inputValue.trim()
    if (!trimmedValue) return

    if (userId) {
      // 로그인 사용자: Supabase에 추가
      if (taskCount >= MAX_TASKS) {
        toast({
          title: t("limitReached"),
          description: t("limitReachedDesc"),
          variant: "destructive",
        })
        return
      }
      addTaskMutation.mutate({ title: trimmedValue })
      setInputValue("")
    } else {
      // 비로그인 사용자: localStorage에 추가
      const result = localAddTask(trimmedValue)
      if (result) {
        setInputValue("")
      } else {
        toast({
          title: t("limitReached"),
          description: t("limitReachedDesc"),
          variant: "destructive",
        })
      }
    }
  }, [inputValue, userId, taskCount, addTaskMutation, localAddTask, toast, t])

  // Task 토글 핸들러
  const handleToggle = useCallback(
    (id: string) => {
      if (userId) {
        toggleComplete.mutate(id)
      } else {
        localToggleComplete(id)
      }
    },
    [userId, toggleComplete, localToggleComplete]
  )

  // Task 삭제 핸들러
  const handleDelete = useCallback(
    (id: string) => {
      if (userId) {
        removeTask.mutate(id)
      } else {
        localDeleteTask(id)
      }
    },
    [userId, removeTask, localDeleteTask]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTask()
    }
  }

  // Separate incomplete and completed tasks
  const incompleteTasks = tasks.filter((t) => !t.isCompleted)
  const completedTasks = tasks.filter((t) => t.isCompleted)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
          <span className="text-sm text-muted-foreground">
            {taskCount}/{MAX_TASKS}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-8 h-8"
          aria-label={t("close")}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-b border-border/30">
        <div className="relative">
          <Plus
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            ref={effectiveInputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("addPlaceholder")}
            className="pl-9 pr-16"
            maxLength={100}
            aria-label={t("addPlaceholder")}
            disabled={isLoading}
          />
          {/* Character Counter */}
          <span
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none",
              inputValue.length >= 90
                ? "text-destructive"
                : "text-muted-foreground/60"
            )}
            aria-live="polite"
            aria-label={`${inputValue.length} of 100 characters`}
          >
            {inputValue.length}/100
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {isLoading ? (
          <TaskListSkeleton />
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p className="text-sm">{t("emptyState")}</p>
          </div>
        ) : (
          <>
            {/* Incomplete Tasks */}
            {incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <>
                <div className="pt-4 pb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("completed")} ({completedTasks.length})
                  </span>
                </div>
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/**
 * Desktop Slide Panel
 */
function DesktopTaskPanel() {
  const isOpen = useTaskStore(selectIsTaskPanelOpen)
  const closeTaskPanel = useTaskStore((state) => state.closeTaskPanel)
  const inputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations("Task")

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeTaskPanel()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeTaskPanel])

  return (
    <aside
      role="complementary"
      aria-label={t("ariaLabel")}
      aria-hidden={!isOpen}
      className={cn(
        "fixed top-0 z-30 h-screen overflow-hidden",
        "glass-card border-r border-border/50",
        "transition-all duration-300 ease-in-out",
        // Position: right of sidebar (80px on md+)
        "left-20",
        // Width animation (doesn't overlap sidebar)
        isOpen ? "w-[360px] opacity-100" : "w-0 opacity-0 pointer-events-none"
      )}
    >
      {/* Fixed width inner container to prevent content reflow */}
      <div className="w-[360px] h-full">
        <TaskListContent onClose={closeTaskPanel} inputRef={inputRef} />
      </div>
    </aside>
  )
}

/**
 * Mobile Bottom Sheet (Dialog-based)
 */
function MobileTaskSheet() {
  const isOpen = useTaskStore(selectIsTaskPanelOpen)
  const closeTaskPanel = useTaskStore((state) => state.closeTaskPanel)
  const t = useTranslations("Task")

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeTaskPanel()}>
      <DialogContent
        className={cn(
          // Bottom sheet positioning
          "!fixed !bottom-0 !left-0 !right-0 !top-auto",
          "!translate-x-0 !translate-y-0",
          "!max-w-full !w-full",
          "!rounded-t-2xl !rounded-b-none",
          "!max-h-[85vh]",
          // Animation override
          "data-[state=open]:!animate-none data-[state=closed]:!animate-none",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom"
        )}
        showCloseButton={false}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("ariaLabel")}</DialogDescription>
        </DialogHeader>

        <div className="h-[70vh]">
          <TaskListContent onClose={closeTaskPanel} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * TaskPanel - Responsive Task Management Panel
 *
 * - Desktop (xl+): Left slide panel next to sidebar
 * - Mobile (< xl): Bottom sheet dialog
 */
export function TaskPanel() {
  const isDesktop = useMediaQuery("(min-width: 1280px)")

  // SSR: render nothing, hydrate on client
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return isDesktop ? <DesktopTaskPanel /> : <MobileTaskSheet />
}
