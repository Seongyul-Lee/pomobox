import Script from "next/script"
import { ADS_CONFIG } from "@/lib/ads-config"

/**
 * AdSense Script Component
 * Uses next/script with afterInteractive strategy to avoid blocking FCP
 */
export function AdSenseScript() {
  // 광고가 비활성화된 경우 스크립트 로드하지 않음
  if (!ADS_CONFIG.enabled) return null

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.publisherId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  )
}
