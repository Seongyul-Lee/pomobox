import type { MetadataRoute } from "next"

const baseUrl = "https://pomobox.app"

const staticPages = [
  "",
  "/guide/what-is-pomodoro",
  "/privacy",
  "/terms",
  "/about",
  "/contact",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "monthly",
    priority: page === "" ? 1 : 0.8,
  }))
}
