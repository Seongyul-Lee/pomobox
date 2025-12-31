import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/mypage/", "/update-password/", "/api/auth/"],
    },
    sitemap: "https://pomobox.app/sitemap.xml",
  }
}
