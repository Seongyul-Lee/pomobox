import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Pomobox - Minimal Pomodoro Timer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  // 언어별 서브타이틀
  const subtitles: Record<string, string> = {
    en: "Minimal Pomodoro Timer",
    ko: "미니멀 뽀모도로 타이머",
    ja: "ミニマルポモドーロタイマー",
    "zh-CN": "极简番茄钟",
  }

  const subtitle = subtitles[locale] || subtitles.en

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111116",
        }}
      >
        {/* Main Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Pomobox
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: "#A1A1AA",
            letterSpacing: "0.01em",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
