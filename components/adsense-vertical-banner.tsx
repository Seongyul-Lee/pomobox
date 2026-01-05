"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

/**
 * AdSenseVerticalBanner - Google AdSense 수직 배너 (160x600)
 *
 * - 2xl 이상 해상도에서만 표시 (MainLayout에서 처리)
 * - Intersection Observer를 사용한 Lazy Loading
 * - AdSense 스크립트는 layout.tsx에서 로드됨
 */
export function AdSenseVerticalBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Intersection Observer로 뷰포트 진입 감지
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "100px" }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  // 뷰포트에 들어오면 AdSense 광고 로드
  useEffect(() => {
    if (!isVisible || hasLoaded) return

    // AdSense 스크립트가 로드될 때까지 대기
    const checkAndPush = () => {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        try {
          window.adsbygoogle.push({})
          setHasLoaded(true)
        } catch (e) {
          console.warn("AdSense push failed:", e)
        }
      }
    }

    // 스크립트 로드 대기 (최대 5초)
    const timer = setTimeout(checkAndPush, 100)
    const maxWait = setTimeout(checkAndPush, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(maxWait)
    }
  }, [isVisible, hasLoaded])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-start h-[600px]"
    >
      {isVisible ? (
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: "160px",
            height: "600px",
          }}
          data-ad-client="ca-pub-7020101743498097"
          data-ad-slot="PLACEHOLDER_SLOT_ID"
        />
      ) : (
        // Placeholder while waiting for intersection
        <div className="w-[160px] h-[600px] rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Ad</span>
        </div>
      )}
    </div>
  )
}
