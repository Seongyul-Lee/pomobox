import { Clock } from "lucide-react"

interface ArticleMetaProps {
  readingTime?: string
  className?: string
}

export function ArticleMeta({
  readingTime,
  className = "",
}: ArticleMetaProps) {
  if (!readingTime) return null

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        <span>{readingTime} read</span>
      </div>
    </div>
  )
}
