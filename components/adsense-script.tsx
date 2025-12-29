"use client"

import { useEffect } from "react"

export function AdSenseScript() {
  useEffect(() => {
    // AdSense 스크립트가 이미 로드되었는지 확인
    if (document.querySelector('script[src*="adsbygoogle"]')) {
      return
    }

    const script = document.createElement("script")
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7020101743498097"
    script.async = true
    script.crossOrigin = "anonymous"
    document.head.appendChild(script)
  }, [])

  return null
}
