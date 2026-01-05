import { Calendar, Clock } from "lucide-react"

interface ArticleMetaProps {
  publishedDate: string
  modifiedDate?: string
  readingTime?: string
  className?: string
}

export function ArticleMeta({
  publishedDate,
  modifiedDate,
  readingTime,
  className = "",
}: ArticleMetaProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const displayDate = modifiedDate || publishedDate
  const isUpdated = modifiedDate && modifiedDate !== publishedDate

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <Calendar className="h-4 w-4" />
        <span>
          {isUpdated ? "Updated " : "Published "}
          <time dateTime={displayDate}>{formatDate(displayDate)}</time>
        </span>
      </div>

      {readingTime && (
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readingTime} read</span>
        </div>
      )}
    </div>
  )
}
