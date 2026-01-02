import type { MetadataRoute } from "next"

const baseUrl = "https://pomobox.app"
const languages = ["en", "ko", "ja", "zh-CN"]

// 정적 페이지 경로 (locale 제외)
const staticPages = [
  "", // 메인 페이지
  "/guide/what-is-pomodoro",
  "/privacy",
  "/terms",
  "/about",
  "/contact",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // 각 언어별로 모든 정적 페이지 URL 생성
  for (const lang of languages) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "monthly",
        priority: page === "" ? 1 : 0.8,
      })
    }
  }

  return entries
}
