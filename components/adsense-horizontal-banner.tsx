"use client"

import { useEffect, useRef, useState } from "react"
import { ADS_CONFIG } from "@/lib/ads-config"

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

/**
 * AdSenseHorizontalBanner - Google AdSense 가로 배너 (728x90 / 반응형)
 *
 * - 푸터 상단에 표시
 * - NEXT_PUBLIC_ADS_ENABLED=true일 때만 렌더링
 * - Intersection Observer를 사용한 Lazy Loading
 * - localhost에서는 광고를 로드하지 않음 (400 에러 방지)
 */
export function AdSenseHorizontalBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isProduction, setIsProduction] = useState(false)

  // 프로덕션 환경 체크 (클라이언트에서만)
  useEffect(() => {
    if (!ADS_CONFIG.enabled) return
    setIsProduction(
      typeof window !== "undefined" &&
      !window.location.hostname.includes("localhost") &&
      !window.location.hostname.includes("127.0.0.1")
    )
  }, [])

  // Intersection Observer로 뷰포트 진입 감지
  useEffect(() => {
    if (!ADS_CONFIG.enabled) return
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

  // 뷰포트에 들어오면 AdSense 광고 로드 (프로덕션 환경에서만)
  useEffect(() => {
    if (!ADS_CONFIG.enabled) return
    if (!isVisible || hasLoaded || !isProduction) return

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

    const timer = setTimeout(checkAndPush, 100)
    const maxWait = setTimeout(checkAndPush, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(maxWait)
    }
  }, [isVisible, hasLoaded, isProduction])

  // 광고가 비활성화된 경우 렌더링하지 않음
  if (!ADS_CONFIG.enabled) {
    return null
  }

  const showPlaceholder = !isProduction || !isVisible

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center py-4"
    >
      {showPlaceholder ? (
        // 개발 환경 또는 뷰포트 진입 전: 플레이스홀더
        <div className="w-full max-w-[728px] h-[90px] rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Ad</span>
        </div>
      ) : (
        // 프로덕션 환경 + 뷰포트 진입: 실제 광고
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: "728px",
            height: "90px",
          }}
          data-ad-client={ADS_CONFIG.publisherId}
          data-ad-slot={ADS_CONFIG.slots.horizontalBanner}
        />
      )}
    </div>
  )
}
