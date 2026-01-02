"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useTaskStore, selectIsTaskPanelOpen } from "@/lib/store"

interface MainLayoutProps {
  children: ReactNode
  rightWidget?: ReactNode
  adArea?: ReactNode
  mobileContent?: ReactNode
  className?: string
}

/**
 * MainLayout - Dynamic Layout Component
 *
 * Task 패널 열림/닫힘에 따라 중앙 콘텐츠 영역이 동적으로 조정되는 레이아웃.
 *
 * Desktop (xl+):
 * - Task 패널 닫힘: ml-20 (사이드바 80px)
 * - Task 패널 열림: ml-[440px] (사이드바 80px + Task 패널 360px)
 *
 * Mobile (< xl):
 * - 사이드바 숨김, Task 패널은 Bottom Sheet
 * - 타이머 중앙 고정
 */
export function MainLayout({
  children,
  rightWidget,
  adArea,
  mobileContent,
  className,
}: MainLayoutProps) {
  const isTaskPanelOpen = useTaskStore(selectIsTaskPanelOpen)

  return (
    <div
      className={cn(
        "flex-1 pt-16 pb-6",
        "transition-[margin] duration-300 ease-in-out",
        // 모바일: 여백 없음
        // md+: 사이드바 여백 (64px)
        // lg+: 사이드바 여백 (80px)
        // xl+: 사이드바 + Task 패널 동적 여백
        "md:ml-16 lg:ml-20",
        // xl 이상에서 Task 패널 상태에 따른 추가 여백
        isTaskPanelOpen ? "xl:ml-[440px]" : "xl:ml-20",
        className
      )}
    >
      {/* Desktop Layout (xl+) */}
      <div className="hidden xl:flex justify-center items-start gap-6 px-8">
        {/* Center: Main Content (Timer) */}
        <main className="flex-1 flex justify-center">
          <div className="w-full max-w-xl">
            {children}
          </div>
        </main>

        {/* Right: Widget Area (BGM + Calendar) */}
        {rightWidget && (
          <aside
            className="w-[570px] flex-shrink-0 flex flex-col gap-4"
            aria-label="Music and Calendar"
          >
            {rightWidget}
          </aside>
        )}

        {/* Ad Area (2xl/2560px+ only) */}
        {adArea && (
          <aside
            className="hidden 2xl:block w-[200px] flex-shrink-0"
            aria-label="Advertisement"
          >
            {adArea}
          </aside>
        )}
      </div>

      {/* Mobile/Tablet Layout (< xl) */}
      <div className="xl:hidden px-4">
        {/* Center: Main Content (Timer) */}
        <main className="flex justify-center">
          <div className="w-full max-w-xl">
            {children}
          </div>
        </main>

        {/* Mobile: Additional Content (BGM + Calendar) */}
        {mobileContent && (
          <div className="mt-6 space-y-4">
            {mobileContent}
          </div>
        )}
      </div>
    </div>
  )
}
