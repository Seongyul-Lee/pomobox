/**
 * Task Store (Zustand + Persist)
 *
 * Task 패널 상태와 Task 데이터를 중앙 관리하는 Zustand store.
 * localStorage에 자동 영속화 (비로그인 사용자용).
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Task 인터페이스
export interface Task {
  id: string // UUID (crypto.randomUUID())
  title: string // 최대 200자
  description?: string // 선택적
  isCompleted: boolean
  priority: number // 0-2 (낮음/중간/높음)
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

// 최대 Task 개수 제한
const MAX_TASKS = 30

// Task 생성 헬퍼 (ID 자동 생성)
export function createTask(
  title: string,
  options?: Partial<Omit<Task, 'id' | 'title' | 'createdAt' | 'updatedAt'>>
): Task {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title: title.slice(0, 200), // 최대 200자 제한
    description: options?.description,
    isCompleted: options?.isCompleted ?? false,
    priority: options?.priority ?? 1, // 기본값: 중간
    createdAt: now,
    updatedAt: now,
  }
}

// Store State 인터페이스
interface TaskStoreState {
  // 패널 상태
  isTaskPanelOpen: boolean

  // Task 데이터 (최대 30개)
  tasks: Task[]
}

// Store Actions 인터페이스
interface TaskStoreActions {
  // 패널 제어
  toggleTaskPanel: () => void
  openTaskPanel: () => void
  closeTaskPanel: () => void

  // Task CRUD
  addTask: (title: string, options?: Partial<Omit<Task, 'id' | 'title' | 'createdAt' | 'updatedAt'>>) => Task | null
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  deleteTask: (id: string) => void
  toggleTaskComplete: (id: string) => void

  // 유틸리티
  clearLocalTasks: () => void
  getTaskById: (id: string) => Task | undefined
}

type TaskStore = TaskStoreState & TaskStoreActions

/**
 * 30개 초과 시 가장 오래된 완료 항목부터 자동 삭제
 * @param tasks 현재 Task 배열
 * @returns 정리된 Task 배열 (최대 30개)
 */
function pruneExcessTasks(tasks: Task[]): Task[] {
  if (tasks.length <= MAX_TASKS) {
    return tasks
  }

  // 완료된 항목들을 createdAt 기준 오름차순 정렬 (오래된 순)
  const completedTasks = tasks
    .filter((t) => t.isCompleted)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const incompleteTasks = tasks.filter((t) => !t.isCompleted)

  // 삭제할 개수 계산
  const excessCount = tasks.length - MAX_TASKS

  // 완료된 항목 중 오래된 것부터 삭제
  const tasksToRemove = completedTasks.slice(0, excessCount)
  const removeIds = new Set(tasksToRemove.map((t) => t.id))

  // 삭제 대상이 아닌 완료 항목
  const remainingCompleted = completedTasks.filter((t) => !removeIds.has(t.id))

  return [...incompleteTasks, ...remainingCompleted]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isTaskPanelOpen: false,
      tasks: [],

      // 패널 제어
      toggleTaskPanel: () => set((state) => ({ isTaskPanelOpen: !state.isTaskPanelOpen })),
      openTaskPanel: () => set({ isTaskPanelOpen: true }),
      closeTaskPanel: () => set({ isTaskPanelOpen: false }),

      // Task 추가
      addTask: (title, options) => {
        const { tasks } = get()

        // 30개 제한 체크 (완료 항목 자동 삭제 후에도 꽉 차면 null 반환)
        const prunedTasks = pruneExcessTasks(tasks)
        if (prunedTasks.length >= MAX_TASKS) {
          // 완료 항목 없이 30개 꽉 참 → 추가 불가
          return null
        }

        const newTask = createTask(title, options)
        set({ tasks: [...prunedTasks, newTask] })
        return newTask
      },

      // Task 수정
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updates,
                  title: updates.title !== undefined ? updates.title.slice(0, 200) : task.title,
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }))
      },

      // Task 삭제
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      // 완료 토글
      toggleTaskComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  isCompleted: !task.isCompleted,
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }))
      },

      // 로컬 Task 전체 삭제 (로그인 시 마이그레이션 후 호출)
      clearLocalTasks: () => {
        set({ tasks: [] })
      },

      // ID로 Task 조회
      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id)
      },
    }),
    {
      name: 'pomobox-tasks', // localStorage key
      storage: createJSONStorage(() => {
        // SSR 안전 처리
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          }
        }
        return localStorage
      }),
      // 액션은 저장하지 않고 상태만 저장 (isTaskPanelOpen은 저장 안 함)
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    }
  )
)

// 셀렉터 (성능 최적화용)
export const selectIsTaskPanelOpen = (state: TaskStore) => state.isTaskPanelOpen
export const selectTasks = (state: TaskStore) => state.tasks
export const selectIncompleteTasks = (state: TaskStore) => state.tasks.filter((t) => !t.isCompleted)
export const selectCompletedTasks = (state: TaskStore) => state.tasks.filter((t) => t.isCompleted)
export const selectTaskCount = (state: TaskStore) => state.tasks.length
