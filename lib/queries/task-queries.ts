import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  type SupabaseTask,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "@/lib/supabase/tasks"

// ============================================
// Query Keys (캐시 키 관리)
// ============================================
export const taskKeys = {
  all: ["tasks"] as const,
  list: (userId: string) => [...taskKeys.all, "list", userId] as const,
}

// ============================================
// Query Hooks (데이터 조회)
// ============================================

/**
 * 사용자의 모든 Task 조회
 * - staleTime: 5분 (통계보다 짧음, 실시간성 중요)
 * - refetchOnWindowFocus: true (기본값)
 */
export function useTasks(userId: string | null) {
  return useQuery({
    queryKey: taskKeys.list(userId ?? ""),
    queryFn: () => fetchTasks(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (v5에서 cacheTime → gcTime)
  })
}

// ============================================
// Mutation Hooks (데이터 변경 - 낙관적 업데이트)
// ============================================

/**
 * Task CRUD Mutations 훅
 * - 낙관적 업데이트: UI 즉시 반영
 * - 에러 시 롤백
 * - 성공/실패 후 캐시 무효화
 */
export function useTaskMutations(userId: string | null) {
  const queryClient = useQueryClient()
  const queryKey = taskKeys.list(userId ?? "")

  /**
   * Task 추가
   */
  const addTask = useMutation({
    mutationFn: (task: CreateTaskInput) => createTask(userId!, task),
    onMutate: async (newTask) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey })

      // 이전 데이터 스냅샷
      const previousTasks = queryClient.getQueryData<SupabaseTask[]>(queryKey)

      // 낙관적 업데이트: 임시 ID로 즉시 UI 반영
      queryClient.setQueryData<SupabaseTask[]>(queryKey, (old = []) => [
        {
          id: `temp-${Date.now()}`,
          user_id: userId!,
          title: newTask.title,
          description: newTask.description ?? null,
          estimated_pomodoros: newTask.estimated_pomodoros ?? 1,
          completed_pomodoros: newTask.completed_pomodoros ?? 0,
          is_completed: newTask.is_completed ?? false,
          priority: newTask.priority ?? 0,
          due_date: newTask.due_date ?? null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...old,
      ])

      return { previousTasks }
    },
    onError: (_err, _newTask, context) => {
      // 에러 시 롤백
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKey, context.previousTasks)
      }
    },
    onSettled: () => {
      // 성공/실패 후 캐시 무효화 (서버 데이터로 동기화)
      queryClient.invalidateQueries({ queryKey })
    },
  })

  /**
   * Task 수정
   */
  const editTask = useMutation({
    mutationFn: ({
      taskId,
      updates,
    }: {
      taskId: string
      updates: UpdateTaskInput
    }) => updateTask(userId!, taskId, updates),
    onMutate: async ({ taskId, updates }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousTasks = queryClient.getQueryData<SupabaseTask[]>(queryKey)

      // 낙관적 업데이트: 해당 Task만 수정
      queryClient.setQueryData<SupabaseTask[]>(queryKey, (old = []) =>
        old.map((task) =>
          task.id === taskId
            ? { ...task, ...updates, updated_at: new Date().toISOString() }
            : task
        )
      )

      return { previousTasks }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKey, context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  /**
   * Task 삭제
   */
  const removeTask = useMutation({
    mutationFn: (taskId: string) => deleteTask(userId!, taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey })

      const previousTasks = queryClient.getQueryData<SupabaseTask[]>(queryKey)

      // 낙관적 업데이트: 해당 Task 제거
      queryClient.setQueryData<SupabaseTask[]>(queryKey, (old = []) =>
        old.filter((task) => task.id !== taskId)
      )

      return { previousTasks }
    },
    onError: (_err, _taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKey, context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  /**
   * Task 완료 상태 토글
   */
  const toggleComplete = useMutation({
    mutationFn: (taskId: string) => toggleTaskComplete(userId!, taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey })

      const previousTasks = queryClient.getQueryData<SupabaseTask[]>(queryKey)

      // 낙관적 업데이트: 완료 상태 토글
      queryClient.setQueryData<SupabaseTask[]>(queryKey, (old = []) =>
        old.map((task) =>
          task.id === taskId
            ? {
                ...task,
                is_completed: !task.is_completed,
                updated_at: new Date().toISOString(),
              }
            : task
        )
      )

      return { previousTasks }
    },
    onError: (_err, _taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKey, context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    addTask,
    editTask,
    removeTask,
    toggleComplete,
  }
}

// ============================================
// 타입 재export
// ============================================
export type { SupabaseTask, CreateTaskInput, UpdateTaskInput }
