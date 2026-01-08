"use client"

import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface TocItem {
  id: string
  title: string
  level: 1 | 2
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      })
      // Update URL hash without scrolling
      window.history.pushState(null, "", `#${id}`)
      setActiveId(id)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    )

    // Observe all section headings
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  // Set initial active based on URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && items.some((item) => item.id === hash)) {
      setActiveId(hash)
    } else if (items.length > 0) {
      setActiveId(items[0].id)
    }
  }, [items])

  return (
    <nav
      aria-label="Table of contents"
      className={cn("space-y-1", className)}
    >
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block py-1.5 text-sm transition-colors border-l-2",
                  item.level === 1 ? "pl-3" : "pl-5",
                  isActive
                    ? "text-primary border-primary font-medium"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50"
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
