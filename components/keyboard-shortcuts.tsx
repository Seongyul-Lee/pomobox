"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Keyboard, ChevronDown } from "lucide-react"

interface Shortcut {
  key: string
  labelKey: string
}

const SHORTCUTS: Shortcut[] = [
  { key: "Space", labelKey: "startPause" },
  { key: "R", labelKey: "reset" },
  { key: "Esc", labelKey: "pause" },
]

export function KeyboardShortcuts() {
  const t = useTranslations("Shortcuts")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-xs text-muted-foreground hover:text-foreground"
        >
          <span className="flex items-center gap-2">
            <Keyboard className="h-3 w-3" />
            {t("title")}
          </span>
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <div className="space-y-1.5 text-xs">
          {SHORTCUTS.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between px-2 py-1 rounded bg-muted/50"
            >
              <span className="text-muted-foreground">{t(shortcut.labelKey)}</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-background border rounded shadow-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
