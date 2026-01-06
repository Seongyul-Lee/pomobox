/**
 * AdSense 광고 설정
 *
 * 환경변수로 광고 표시 여부를 제어합니다.
 * - NEXT_PUBLIC_ADS_ENABLED=true: 광고 표시
 * - NEXT_PUBLIC_ADS_ENABLED=false (또는 미설정): 광고 숨김
 */

export const ADS_CONFIG = {
  /** 광고 활성화 여부 (환경변수로 제어) */
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",

  /** AdSense Publisher ID */
  publisherId: "ca-pub-7020101743498097",

  /** 광고 슬롯 ID (승인 후 실제 ID로 교체) */
  slots: {
    verticalBanner: "PLACEHOLDER_VERTICAL_SLOT",
    horizontalBanner: "PLACEHOLDER_HORIZONTAL_SLOT",
  },
} as const
