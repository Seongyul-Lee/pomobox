import type { MetadataRoute } from "next"

const baseUrl = "https://pomobox.app"

// Core app pages
const corePages = [
  { url: "", priority: 1.0, changeFrequency: "daily" as const },
  { url: "/stats", priority: 0.8, changeFrequency: "daily" as const },
  { url: "/learn", priority: 0.9, changeFrequency: "weekly" as const },
]

// Guide pages (high-value SEO content)
const guidePages = [
  { url: "/guide/what-is-pomodoro", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-students", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-developers", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-vs-timeboxing", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/how-to-avoid-distractions", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-remote-workers", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-writers", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-designers", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-managers", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-freelancers", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guide/pomodoro-for-entrepreneurs", priority: 0.8, changeFrequency: "weekly" as const },
]

// Blog pages
const blogPages = [
  { url: "/blog/pomodoro-history", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/science-of-focus", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/psychology-of-timer-sounds", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/why-25-minutes", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/caffeine-and-focus", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/cost-of-task-switching", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/deep-work-method", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/flowtime-vs-pomodoro", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/focus-for-coding-interviews", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/morning-routine-productivity", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/nature-sounds-focus", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/pomodoro-for-adhd", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/ultradian-rhythms", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/habit-stacking", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/social-media-brain", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/productive-procrastination", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/science-of-breaks", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/weekly-review-habit", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/sleep-and-productivity", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/batching-tasks", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/energy-management-not-time", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog/ergonomics-for-focus", priority: 0.7, changeFrequency: "monthly" as const },
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
