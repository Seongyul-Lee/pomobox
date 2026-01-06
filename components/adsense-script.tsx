"use client"

import { useEffect } from "react"
import { ADS_CONFIG } from "@/lib/ads-config"

export function AdSenseScript() {
  useEffect(() => {
    // 광고가 비활성화된 경우 스크립트 로드하지 않음
    if (!ADS_CONFIG.enabled) return

    // AdSense 스크립트가 이미 로드되었는지 확인
    if (document.querySelector('script[src*="adsbygoogle"]')) {
      return
    }

    const script = document.createElement("script")
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.publisherId}`
    script.async = true
    script.crossOrigin = "anonymous"
    document.head.appendChild(script)
  }, [])

  return null
}
