import { createClient } from "./client"

/**
 * Task 타입 (Supabase 스키마 기반)
 */
export interface SupabaseTask {
  id: string
  user_id: string
  title: string
  description: string | null
  estimated_pomodoros: number
  completed_pomodoros: number
  is_completed: boolean
  priority: number
  due_date: string | null
  created_at: string
  updated_at: string
}

/**
 * Task 생성 시 필요한 데이터
 * - title: 필수
 * - 나머지: 선택적 (DB 기본값 사용)
 */
export type CreateTaskInput = {
  title: string
  description?: string | null
  estimated_pomodoros?: number
  completed_pomodoros?: number
  is_completed?: boolean
  priority?: number
  due_date?: string | null
}

/**
 * Task 수정 시 사용하는 데이터
 */
export type UpdateTaskInput = Partial<
  Omit<SupabaseTask, "id" | "user_id" | "created_at" | "updated_at">
>

/**
 * 사용자의 모든 Task 조회
 * 정렬: 미완료 우선, 우선순위 높은 순, 최신 순
 */
export async function fetchTasks(userId: string): Promise<SupabaseTask[]> {
  if (!userId) return []

  const supabase = createClient()

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("is_completed", { ascending: true })
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch tasks:", error)
    throw error
  }

  return data || []
}

/**
 * 새 Task 생성
 * - DB 스키마에 기본값 정의되어 있음 (estimated_pomodoros=1, priority=0 등)
 */
export async function createTask(
  userId: string,
  task: CreateTaskInput
): Promise<SupabaseTask | null> {
  if (!userId) return null

  const supabase = createClient()

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userId,
      title: task.title,
      ...(task.description !== undefined && { description: task.description }),
      ...(task.estimated_pomodoros !== undefined && { estimated_pomodoros: task.estimated_pomodoros }),
      ...(task.completed_pomodoros !== undefined && { completed_pomodoros: task.completed_pomodoros }),
      ...(task.is_completed !== undefined && { is_completed: task.is_completed }),
      ...(task.priority !== undefined && { priority: task.priority }),
      ...(task.due_date !== undefined && { due_date: task.due_date }),
    })
    .select()
    .single()

  if (error) {
    console.error("Failed to create task:", error)
    throw error
  }

  return data
}

/**
 * Task 수정
 */
export async function updateTask(
  userId: string,
  taskId: string,
  updates: UpdateTaskInput
): Promise<SupabaseTask | null> {
  if (!userId || !taskId) return null

  const supabase = createClient()

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    console.error("Failed to update task:", error)
    throw error
  }

  return data
}

/**
 * Task 삭제 (hard delete)
 */
export async function deleteTask(
  userId: string,
  taskId: string
): Promise<boolean> {
  if (!userId || !taskId) return false

  const supabase = createClient()

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", userId)

  if (error) {
    console.error("Failed to delete task:", error)
    return false
  }

  return true
}

/**
 * Task 완료 상태 토글
 */
export async function toggleTaskComplete(
  userId: string,
  taskId: string
): Promise<SupabaseTask | null> {
  if (!userId || !taskId) return null

  const supabase = createClient()

  // 현재 상태 조회
  const { data: current, error: fetchError } = await supabase
    .from("tasks")
    .select("is_completed")
    .eq("id", taskId)
    .eq("user_id", userId)
    .single()

  if (fetchError) {
    console.error("Failed to fetch task for toggle:", fetchError)
    throw fetchError
  }

  // 상태 토글
  const { data, error } = await supabase
    .from("tasks")
    .update({ is_completed: !current.is_completed })
    .eq("id", taskId)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    console.error("Failed to toggle task complete:", error)
    throw error
  }

  return data
}
