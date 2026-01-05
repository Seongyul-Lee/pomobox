import { Lightbulb } from "lucide-react"

interface DefinitionBoxProps {
  term: string
  definition: string
  className?: string
}

/**
 * DefinitionBox - Optimized for Featured Snippets
 *
 * Formats a definition in a way that Google can easily extract
 * for featured snippet display. Keep definitions under 300 characters.
 */
export function DefinitionBox({ term, definition, className = "" }: DefinitionBoxProps) {
  return (
    <div
      className={`p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 ${className}`}
      role="definition"
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div>
          <dt className="font-semibold text-lg text-foreground mb-2">
            What is {term}?
          </dt>
          <dd className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{term}</strong> {definition}
          </dd>
        </div>
      </div>
    </div>
  )
}

interface QuickAnswerProps {
  question: string
  answer: string
  className?: string
}

/**
 * QuickAnswer - Short answer format for featured snippets
 *
 * Provides a concise answer that Google can extract.
 * Best for "how many", "when", "why" type questions.
 */
export function QuickAnswer({ question, answer, className = "" }: QuickAnswerProps) {
  return (
    <div
      className={`p-5 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 ${className}`}
    >
      <p className="font-medium text-foreground mb-2">{question}</p>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}
