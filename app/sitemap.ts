import type { MetadataRoute } from "next"

const baseUrl = "https://pomobox.app"

// Core app pages
const corePages = [
  { url: "", priority: 1.0, changeFrequency: "daily" as const },
  { url: "/stats", priority: 0.8, changeFrequency: "daily" as const },
  { url: "/dashboard", priority: 0.7, changeFrequency: "daily" as const },
]

// Guide pages (high-value SEO content)
const guidePages = [
  { url: "/guide/what-is-pomodoro", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-students", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-developers", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-vs-timeboxing", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/how-to-avoid-distractions", priority: 0.8, changeFrequency: "weekly" as const },
]

// Blog pages
const blogPages = [
  { url: "/blog/pomodoro-history", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/science-of-focus", priority: 0.7, changeFrequency: "monthly" as const },
]

// Informational pages
const infoPages = [
  { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
  { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
]

const allPages = [...corePages, ...guidePages, ...blogPages, ...infoPages]

export default function sitemap(): MetadataRoute.Sitemap {
  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
