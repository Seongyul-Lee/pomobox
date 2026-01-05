import type { Metadata } from "next"
import Link from "next/link"
import {
  Scale,
  Clock,
  Target,
  Timer,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Sparkles,
  Zap,
  Brain,
  Users,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Calendar,
  Coffee,
  Lightbulb,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { QuickAnswer } from "@/components/ui/definition-box"

export const metadata: Metadata = {
  title: "Pomodoro vs Timeboxing: Which is Right for You? | Pomobox",
  description: "Compare Pomodoro and Timeboxing: differences, pros & cons, best use cases. Choose the right time management method for your workflow.",
  keywords: ["pomodoro vs timeboxing", "time management comparison", "pomodoro technique", "timeboxing method", "productivity techniques", "time blocking"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-vs-timeboxing",
    siteName: "Pomobox",
    title: "Pomodoro vs Timeboxing: Complete Comparison Guide",
    description: "Detailed comparison of Pomodoro Technique and Timeboxing. Find which time management method works best for your workflow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro vs Timeboxing | Pomobox",
    description: "Compare Pomodoro and Timeboxing: differences, pros & cons, and when to use each method.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-vs-timeboxing",
  },
}

// Data
const COMPARISON_TABLE = [
  {
    aspect: "Session Length",
    pomodoro: "Fixed: 25 minutes (or chosen duration)",
    timeboxing: "Variable: you set per-task duration",
    winner: "tie",
  },
  {
    aspect: "Break Structure",
    pomodoro: "Built-in: 5 min short, 15-30 min long",
    timeboxing: "Optional: you decide if/when",
    winner: "pomodoro",
  },
  {
    aspect: "Task Granularity",
    pomodoro: "Time-based: work in fixed intervals",
    timeboxing: "Task-based: allocate time to specific tasks",
    winner: "timeboxing",
  },
  {
    aspect: "Flexibility",
    pomodoro: "Lower: strict intervals encourage discipline",
    timeboxing: "Higher: adapt durations to task needs",
    winner: "timeboxing",
  },
  {
    aspect: "Learning Curve",
    pomodoro: "Simple: one rule (25+5) to start",
    timeboxing: "Moderate: requires estimation skills",
    winner: "pomodoro",
  },
  {
    aspect: "Procrastination Fighting",
    pomodoro: "Strong: low barrier to start (just 25 min)",
    timeboxing: "Moderate: depends on box size",
    winner: "pomodoro",
  },
  {
    aspect: "Calendar Integration",
    pomodoro: "Manual: track separately from calendar",
    timeboxing: "Native: fits calendar block scheduling",
    winner: "timeboxing",
  },
  {
    aspect: "Team Collaboration",
    pomodoro: "Individual focus, sync during breaks",
    timeboxing: "Meeting-friendly, shared calendars",
    winner: "timeboxing",
  },
]

const POMODORO_PROS = [
  "Fights procrastination with low-commitment start",
  "Built-in breaks prevent burnout",
  "Simple to learn and start immediately",
  "Creates urgency that boosts focus",
  "Easy to track daily productivity",
  "Forces regular recovery periods",
]

const POMODORO_CONS = [
  "Fixed intervals may not suit all task types",
  "Interrupting flow state for breaks can frustrate some",
  "Less flexible for collaborative work",
  "Doesn't integrate naturally with calendars",
]

const TIMEBOXING_PROS = [
  "Flexible durations match task requirements",
  "Integrates seamlessly with calendar tools",
  "Works well for team/meeting scheduling",
  "Prevents tasks from expanding indefinitely",
  "Better for variable-length deep work",
  "Natural fit for project planning",
]

const TIMEBOXING_CONS = [
  "Requires estimation skills (which improve over time)",
  "No built-in break structure",
  "Easier to ignore self-imposed deadlines",
  "Can lead to burnout without discipline",
]

const USE_CASES = [
  {
    icon: Brain,
    title: "Deep Focus Work",
    recommendation: "Pomodoro",
    reason: "Fixed intervals with mandatory breaks maintain sustainable focus. The 25-minute commitment feels achievable, reducing start resistance.",
  },
  {
    icon: Calendar,
    title: "Day Planning",
    recommendation: "Timeboxing",
    reason: "Block your calendar for specific tasks. Visual scheduling helps prevent over-commitment and shows others your availability.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    recommendation: "Timeboxing",
    reason: "Shared calendars, meeting scheduling, and project coordination all work better with flexible time blocks.",
  },
  {
    icon: Zap,
    title: "Fighting Procrastination",
    recommendation: "Pomodoro",
    reason: "'Just 25 minutes' is psychologically easier than 'work on this for 2 hours.' Small commitments overcome start resistance.",
  },
  {
    icon: Briefcase,
    title: "Variable Tasks",
    recommendation: "Timeboxing",
    reason: "When tasks range from 15 minutes to 3 hours, flexible boxes adapt better than fixed intervals.",
  },
  {
    icon: BarChart3,
    title: "Productivity Tracking",
    recommendation: "Both / Hybrid",
    reason: "Pomodoros give granular daily metrics. Timeboxing shows weekly/monthly allocation. Use both for complete picture.",
  },
]

const HYBRID_APPROACHES = [
  {
    name: "Timeboxed Pomodoros",
    description: "Allocate 2-hour timebox to a project, then use pomodoros within it. Combines calendar planning with focused execution.",
    example: "9-11am: Feature X (4 pomodoros), 1-3pm: Bug fixes (4 pomodoros)",
  },
  {
    name: "Pomodoro for Focus, Timebox for Planning",
    description: "Use timeboxing for weekly/daily planning, switch to Pomodoro when actually working on tasks.",
    example: "Plan tomorrow with timeboxes, execute today with pomodoros",
  },
  {
    name: "Task-Type Switching",
    description: "Pomodoro for creative/coding work, timeboxing for admin/meetings. Match method to task nature.",
    example: "Creative work: pomodoros. Emails/calls: timeboxes.",
  },
]

const FAQS = [
  {
    question: "Can I use both Pomodoro and Timeboxing together?",
    answer: "Absolutely! Many people use timeboxing for weekly/daily planning (blocking calendar slots for projects) and Pomodoro for actual execution within those blocks. They're complementary, not competing.",
  },
  {
    question: "Which is better for beginners?",
    answer: "Pomodoro is easier to start—just set 25 minutes and go. Timeboxing requires estimation skills that develop over time. Start with Pomodoro, add timeboxing for planning as you get comfortable.",
  },
  {
    question: "What if 25-minute Pomodoros feel too short?",
    answer: "Adjust! Many people (especially developers) use 45-50 minute pomodoros. The break structure is the key principle—the exact duration is flexible. Some use '52/17' (52 min work, 17 min break).",
  },
  {
    question: "Is timeboxing just 'working until the box ends'?",
    answer: "Not quite. The timebox is a limit, not a minimum. If you finish early, take a break or start the next task. If time runs out, stop and reassess—the box prevents tasks from expanding infinitely.",
  },
  {
    question: "Which technique is better for remote work?",
    answer: "Timeboxing integrates better with shared calendars and async communication. Pomodoro works well for focused solo work. Most remote workers benefit from combining both.",
  },
  {
    question: "How do I track time with each method?",
    answer: "Pomodoro: count completed pomodoros per day/week. Timeboxing: calendar shows time allocation. For billing/reporting, pomodoro counts are often more accurate than 'I worked on X all afternoon.'",
  },
]

const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Complete technique guide" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Stay focused during work" },
  { href: "/blog/science-of-focus", title: "Science of Focus", description: "Why these techniques work" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro vs Timeboxing: Which Technique is Right for You?",
    description: "Comprehensive comparison of Pomodoro Technique and Timeboxing: differences, pros and cons, use cases, and how to choose the right method.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-05",
    dateModified: "2025-01-05",
    url: "https://pomobox.app/guide/pomodoro-vs-timeboxing",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
]

export default function PomodoroVsTimeboxingPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.guide("Pomodoro vs Timeboxing")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6">
            <Scale className="h-3 w-3" />
            Comparison
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro vs Timeboxing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Two powerful time management techniques. Which one fits your workflow?
          </p>
          <ArticleMeta
            publishedDate="2025-01-05"
            modifiedDate="2025-01-05"
            readingTime="9 min"
          />

          {/* Quick Comparison Visual */}
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <Timer className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-bold text-foreground">Pomodoro</div>
              <div className="text-sm text-muted-foreground">Fixed intervals + breaks</div>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <Calendar className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="font-bold text-foreground">Timeboxing</div>
              <div className="text-sm text-muted-foreground">Flexible task allocation</div>
            </div>
          </div>
        </header>

        {/* Featured Snippet: Quick Answer */}
        <QuickAnswer
          question="What's the difference between Pomodoro and Timeboxing?"
          answer="Pomodoro uses fixed 25-minute focus sessions with mandatory 5-minute breaks, designed for sustained deep work. Timeboxing allocates flexible time blocks to specific tasks on your calendar, ideal for project planning. Choose Pomodoro for daily focus, Timeboxing for schedule management—or combine both methods."
          className="mb-16"
        />

        {/* Quick Summary */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </span>
              Quick Summary
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Pomodoro</strong> = Fixed 25-minute focus blocks with mandatory breaks. Best for: deep work, fighting procrastination, sustainable daily productivity.
              </p>
              <p>
                <strong className="text-foreground">Timeboxing</strong> = Allocate custom durations to specific tasks on your calendar. Best for: planning, meetings, variable-length tasks, team coordination.
              </p>
              <p>
                <strong className="text-foreground">Best approach?</strong> Use both. Timebox your day/week for planning, use Pomodoro within those blocks for execution. They're complementary, not competing.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Scale className="h-3 w-3" />
              Side-by-Side
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Feature Comparison
            </h2>
          </div>

          <div className="p-4 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Aspect</th>
                  <th className="text-left py-3 px-2 font-medium text-primary">Pomodoro</th>
                  <th className="text-left py-3 px-2 font-medium text-amber-500">Timeboxing</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-border/30 last:border-0">
                    <td className="py-3 px-2 font-medium text-foreground">{row.aspect}</td>
                    <td className={`py-3 px-2 ${row.winner === 'pomodoro' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {row.pomodoro}
                    </td>
                    <td className={`py-3 px-2 ${row.winner === 'timeboxing' ? 'text-amber-500' : 'text-muted-foreground'}`}>
                      {row.timeboxing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Pros & Cons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pomodoro */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Pomodoro Technique
              </h3>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">Pros</div>
                <ul className="space-y-2">
                  {POMODORO_PROS.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                <div className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-3">Cons</div>
                <ul className="space-y-2">
                  {POMODORO_CONS.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeboxing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-500 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeboxing
              </h3>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">Pros</div>
                <ul className="space-y-2">
                  {TIMEBOXING_PROS.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                <div className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-3">Cons</div>
                <ul className="space-y-2">
                  {TIMEBOXING_CONS.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Target className="h-3 w-3" />
              Use Cases
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              When to Use Each
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {USE_CASES.map((item) => {
              const Icon = item.icon
              const isPomodoro = item.recommendation === "Pomodoro"
              const isHybrid = item.recommendation.includes("Hybrid") || item.recommendation.includes("Both")
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${isPomodoro ? 'bg-primary/10' : isHybrid ? 'bg-violet-500/10' : 'bg-amber-500/10'}`}>
                      <Icon className={`h-4 w-4 ${isPomodoro ? 'text-primary' : isHybrid ? 'text-violet-500' : 'text-amber-500'}`} />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <div className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-2 ${
                    isPomodoro ? 'bg-primary/10 text-primary' : isHybrid ? 'bg-violet-500/10 text-violet-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {item.recommendation}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Hybrid Approaches */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Lightbulb className="h-3 w-3" />
              Best of Both
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Hybrid Approaches
            </h2>
          </div>

          <div className="space-y-4">
            {HYBRID_APPROACHES.map((approach) => (
              <div
                key={approach.name}
                className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
              >
                <h3 className="font-semibold text-foreground mb-2">{approach.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{approach.description}</p>
                <div className="p-3 rounded-lg bg-background/50 text-sm">
                  <span className="text-violet-500 font-medium">Example: </span>
                  <span className="text-muted-foreground">{approach.example}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group p-4 md:p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Related Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {guide.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-500/5 border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Try Pomodoro Today
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Whether you use Pomodoro alone or combine it with timeboxing, start with a simple 25-minute session. No setup required.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Timer className="h-5 w-5" />
              Start First Pomodoro
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/pomodoro-for-developers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            For Developers
          </Link>
          <Link
            href="/guide/how-to-avoid-distractions"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Avoid Distractions
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
