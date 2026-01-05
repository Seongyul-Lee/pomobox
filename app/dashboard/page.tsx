import { redirect } from "next/navigation"

/**
 * Legacy /dashboard page - redirects to /stats
 *
 * This page was replaced by the new /stats page in Phase 2.
 * Keeping this redirect for backwards compatibility with bookmarks.
 */
export default function DashboardPage() {
  redirect("/stats")
}
