import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  // Generate JSON-LD for BreadcrumbList schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://pomobox.app${item.href}` }),
    })),
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-1 text-sm text-muted-foreground ${className}`}
      >
        <ol className="flex items-center gap-1 flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isFirst = index === 0

            return (
              <li key={item.label} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0" />
                )}

                {isLast ? (
                  <span
                    className="text-foreground font-medium truncate max-w-[200px]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {isFirst && <Home className="h-3.5 w-3.5" />}
                    <span className="hover:underline">{item.label}</span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-1">
                    {isFirst && <Home className="h-3.5 w-3.5" />}
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

// Preset breadcrumb configurations for common pages
export const BREADCRUMB_PRESETS = {
  guide: (title: string): BreadcrumbItem[] => [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: title },
  ],
  blog: (title: string): BreadcrumbItem[] => [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: title },
  ],
  legal: (title: string): BreadcrumbItem[] => [
    { label: "Home", href: "/" },
    { label: title },
  ],
}
