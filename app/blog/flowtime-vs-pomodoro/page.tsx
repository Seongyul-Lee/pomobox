import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Timer,
  Waves,
  ChevronDown,
  Target,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Clock,
  Brain,
  Zap,
  BarChart3,
  Users,
  Shuffle,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { TechniqueSelector } from "@/components/ui/technique-selector"

export const metadata: Metadata = {
  title: "Flowtime vs Pomodoro: Which Focus Technique Is Right for You? | Pomobox",
  description: "Compare Flowtime and Pomodoro techniques. Learn when to use structured time-boxing vs. flexible flow-based focus for maximum productivity.",
  keywords: ["flowtime technique", "pomodoro vs flowtime", "flowmodoro", "focus techniques comparison", "time management methods", "productivity systems"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/flowtime-vs-pomodoro",
    siteName: "Pomobox",
    title: "Flowtime vs Pomodoro: Which Focus Technique Is Right for You?",
    description: "Compare structured Pomodoro with flexible Flowtime to find your ideal focus method.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowtime vs Pomodoro Comparison | Pomobox",
    description: "Find which focus technique matches your work style and brain.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/flowtime-vs-pomodoro",
  },
}

// Data
const TECHNIQUE_COMPARISON = [
  {
    aspect: "Session Length",
    pomodoro: "Fixed (typically 25 min)",
    flowtime: "Variable (until focus naturally wanes)",
    winner: "depends",
  },
  {
    aspect: "Break Timing",
    pomodoro: "Scheduled (5 min after each session)",
    flowtime: "Intuitive (when you feel the need)",
    winner: "depends",
  },
  {
    aspect: "Structure Level",
    pomodoro: "High (strict rules)",
    flowtime: "Low (flexible guidelines)",
    winner: "depends",
  },
  {
    aspect: "Flow State",
    pomodoro: "May interrupt flow",
    flowtime: "Preserves natural flow",
    winner: "flowtime",
  },
  {
    aspect: "Task Initiation",
    pomodoro: "Easier (clear start signal)",
    flowtime: "Harder (no external prompt)",
    winner: "pomodoro",
  },
  {
    aspect: "Burnout Prevention",
    pomodoro: "Built-in (mandatory breaks)",
    flowtime: "Self-managed (requires awareness)",
    winner: "pomodoro",
  },
  {
    aspect: "Time Tracking",
    pomodoro: "Easy (count sessions)",
    flowtime: "Requires logging",
    winner: "pomodoro",
  },
  {
    aspect: "Deep Work",
    pomodoro: "Good (protected blocks)",
    flowtime: "Excellent (uninterrupted immersion)",
    winner: "flowtime",
  },
]

const POMODORO_BEST_FOR = [
  {
    scenario: "High-distraction environments",
    reason: "External timer provides structure that cuts through chaos",
  },
  {
    scenario: "Task initiation struggles",
    reason: "'Just 25 minutes' lowers the psychological barrier to start",
  },
  {
    scenario: "Varied task types",
    reason: "Works well for admin, emails, and routine work mixed with focus work",
  },
  {
    scenario: "Building focus habits",
    reason: "Clear rules create consistency for beginners",
  },
  {
    scenario: "Time blindness (ADHD)",
    reason: "External time tracking compensates for internal clock issues",
  },
  {
    scenario: "Accountability needs",
    reason: "Countable sessions provide tangible progress metrics",
  },
]

const FLOWTIME_BEST_FOR = [
  {
    scenario: "Deep creative work",
    reason: "Uninterrupted immersion allows full creative expression",
  },
  {
    scenario: "Complex problem-solving",
    reason: "Some problems require extended focus that can't be time-boxed",
  },
  {
    scenario: "Strong flow tendency",
    reason: "If you easily enter flow, arbitrary timers are disruptive",
  },
  {
    scenario: "Self-aware workers",
    reason: "Requires ability to recognize when focus is waning",
  },
  {
    scenario: "Quiet environments",
    reason: "Works best when you control your interruption level",
  },
  {
    scenario: "Experienced practitioners",
    reason: "Those who've built focus capacity may not need training wheels",
  },
]

const HYBRID_STRATEGIES = [
  {
    name: "Pomodoro Start, Flow Continue",
    description: "Begin with a 25-minute Pomodoro. If in flow at the bell, extend. If not, take the break.",
    bestFor: "Task initiation struggles + occasional flow states",
  },
  {
    name: "Task-Type Switching",
    description: "Use Pomodoro for admin/routine tasks. Use Flowtime for creative/deep work.",
    bestFor: "Mixed workloads with different focus requirements",
  },
  {
    name: "Morning Pomodoro, Afternoon Flow",
    description: "Structured morning sessions to build momentum. Flexible afternoon for deeper work.",
    bestFor: "Those whose energy patterns support this split",
  },
  {
    name: "Flowtime with Checkpoints",
    description: "Work in flow, but set 45-minute alarms as 'check-in' points (not hard stops).",
    bestFor: "Flow-prone workers who sometimes lose track of time",
  },
]

const FLOWTIME_MECHANICS = [
  {
    step: "1. Start Working",
    detail: "Note your start time. Begin the task without a predetermined end time.",
  },
  {
    step: "2. Work Until Focus Wanes",
    detail: "Continue until you naturally feel distracted, tired, or stuck. Don't force it.",
  },
  {
    step: "3. Log Your Session",
    detail: "Record how long you worked. This builds self-awareness over time.",
  },
  {
    step: "4. Take a Break",
    detail: "Rest proportional to work time. Rough guide: 5 min break per 25 min worked.",
  },
  {
    step: "5. Analyze Patterns",
    detail: "Review logs weekly. Identify your natural session lengths and optimal times.",
  },
]

const FAQS = [
  {
    question: "Can I switch between techniques?",
    answer: "Absolutely. Many productivity experts recommend using Pomodoro for certain tasks (admin, routine work, task initiation) and Flowtime for others (creative work, deep analysis). The techniques aren't mutually exclusive—they're tools in your toolkit.",
  },
  {
    question: "Is Flowtime just 'work until you're tired'?",
    answer: "No. Flowtime requires active self-monitoring and logging. You track start times, end times, and session durations to build awareness of your patterns. It's structured flexibility, not unstructured work.",
  },
  {
    question: "Why would anyone choose Pomodoro over Flowtime?",
    answer: "Pomodoro excels at providing external structure when internal motivation or focus is unreliable. It's particularly valuable for task initiation (the hardest part for many), working in distracting environments, and preventing burnout through mandatory breaks.",
  },
  {
    question: "Does the 25-minute Pomodoro limit hurt deep work?",
    answer: "It can, which is why many practitioners extend to 45-50 minute sessions for deep work. The 25-minute duration is a starting point, not a mandate. Some use 2-3 Pomodoros consecutively with only 5-minute breaks between.",
  },
  {
    question: "How do I know when my focus is 'naturally waning' in Flowtime?",
    answer: "Signs include: re-reading the same content, mind wandering to unrelated topics, feeling restless or fidgety, making more errors, or suddenly feeling hungry/thirsty. With practice, you'll recognize your personal signals.",
  },
  {
    question: "Which technique is better for ADHD?",
    answer: "Generally Pomodoro, because it provides external time structure that compensates for time blindness. However, some ADHD individuals who hyperfocus prefer Flowtime with checkpoint alarms. Experimentation is key.",
  },
]

const RELATED_CONTENT = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Learn the technique" },
  { href: "/blog/ultradian-rhythms", title: "Ultradian Rhythms", description: "90-minute energy cycles" },
  { href: "/blog/pomodoro-for-adhd", title: "Pomodoro for ADHD", description: "Neurodivergent adaptations" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Flowtime vs Pomodoro: Which Focus Technique Is Right for You?",
    description: "Compare Flowtime and Pomodoro techniques. Learn when to use structured time-boxing vs. flexible flow-based focus for maximum productivity.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-08",
    dateModified: "2025-01-08",
    url: "https://pomobox.app/blog/flowtime-vs-pomodoro",
    mainEntityOfPage: "https://pomobox.app/blog/flowtime-vs-pomodoro",
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

export default function FlowtimeVsPomodoroPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Flowtime vs Pomodoro")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-6">
            <Shuffle className="h-3 w-3" />
            Technique Comparison
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Flowtime vs Pomodoro
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Structured time-boxing or flexible flow—which fits your brain?
          </p>
          <ArticleMeta
            publishedDate="2025-01-08"
            modifiedDate="2025-01-08"
            readingTime="9 min"
          />

          {/* Visual Comparison */}
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <Timer className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-bold text-primary">Pomodoro</div>
              <div className="text-xs text-muted-foreground">Fixed intervals</div>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
              <Waves className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
              <div className="font-bold text-cyan-500">Flowtime</div>
              <div className="text-xs text-muted-foreground">Natural rhythm</div>
            </div>
          </div>
        </header>

        {/* Interactive Selector */}
        <section className="mb-16">
          <TechniqueSelector />
        </section>

        {/* Extended Introduction */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              The Pomodoro Technique has dominated productivity discussions for decades, but it's not the only game in town. The Flowtime Technique (sometimes called Flowmodoro) emerged as an alternative for people who found rigid 25-minute intervals disruptive to their natural focus patterns. Rather than working against the brain's tendency to enter extended flow states, Flowtime works with it—letting you ride waves of concentration until they naturally subside.
            </p>
            <p>
              Neither technique is universally superior. Pomodoro excels at providing external structure, making task initiation easier, and preventing burnout through mandatory breaks. Flowtime shines when you need uninterrupted immersion for creative or complex analytical work. The best practitioners often use both—selecting the right tool for the task at hand rather than dogmatically adhering to one system.
            </p>
            <p>
              This article provides a detailed comparison to help you understand when each technique excels, how to implement Flowtime if you haven't tried it, and how to create hybrid approaches that capture the benefits of both. The goal isn't to crown a winner—it's to help you build a personalized productivity system that matches your brain, your work, and your environment.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <BarChart3 className="h-3 w-3" />
              Head-to-Head
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Feature Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-3 font-medium text-foreground">Aspect</th>
                  <th className="text-left py-3 px-3 font-medium text-primary">Pomodoro</th>
                  <th className="text-left py-3 px-3 font-medium text-cyan-500">Flowtime</th>
                </tr>
              </thead>
              <tbody>
                {TECHNIQUE_COMPARISON.map((row) => (
                  <tr key={row.aspect} className="border-b border-border/30">
                    <td className="py-3 px-3 font-medium text-foreground">{row.aspect}</td>
                    <td className={`py-3 px-3 ${row.winner === "pomodoro" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      {row.pomodoro}
                      {row.winner === "pomodoro" && <CheckCircle2 className="inline h-4 w-4 ml-1" />}
                    </td>
                    <td className={`py-3 px-3 ${row.winner === "flowtime" ? "text-cyan-500 font-medium" : "text-muted-foreground"}`}>
                      {row.flowtime}
                      {row.winner === "flowtime" && <CheckCircle2 className="inline h-4 w-4 ml-1" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Use Each */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pomodoro Best For */}
            <div className="p-5 md:p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Timer className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-primary">Pomodoro Excels When...</h3>
              </div>
              <div className="space-y-3">
                {POMODORO_BEST_FOR.map((item) => (
                  <div key={item.scenario} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-foreground text-sm">{item.scenario}</div>
                      <div className="text-xs text-muted-foreground">{item.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flowtime Best For */}
            <div className="p-5 md:p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Waves className="h-6 w-6 text-cyan-500" />
                <h3 className="text-lg font-semibold text-cyan-500">Flowtime Excels When...</h3>
              </div>
              <div className="space-y-3">
                {FLOWTIME_BEST_FOR.map((item) => (
                  <div key={item.scenario} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-foreground text-sm">{item.scenario}</div>
                      <div className="text-xs text-muted-foreground">{item.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How Flowtime Works */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Waves className="h-3 w-3" />
              Method
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              How Flowtime Works
            </h2>
          </div>

          <div className="space-y-3">
            {FLOWTIME_MECHANICS.map((item, index) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-sm font-bold text-cyan-500 flex-shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{item.step.split(". ")[1]}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hybrid Strategies */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Target className="h-3 w-3" />
              Hybrid
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Best of Both Worlds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HYBRID_STRATEGIES.map((strategy) => (
              <div
                key={strategy.name}
                className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
              >
                <h3 className="font-semibold text-violet-500 mb-2">{strategy.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                <p className="text-xs text-foreground">
                  <strong>Best for:</strong> {strategy.bestFor}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-violet-500/10">
                <Lightbulb className="h-5 w-5 text-violet-500" />
              </span>
              Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Neither technique is universally better.</strong> The right choice depends on your work type, environment, and personal tendencies.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Pomodoro provides structure.</strong> Use it when you need help starting tasks, working in distracting environments, or building focus habits.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Flowtime preserves flow.</strong> Use it for deep creative work when you can control your environment and have developed self-awareness.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Hybrid approaches work.</strong> Most advanced practitioners use both techniques, selecting based on the task and context.
                </p>
              </div>
            </div>
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

        {/* Related Content */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Continue Reading</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_CONTENT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Try Both and Decide
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              The best technique is the one you'll actually use. Start with Pomodoro, experiment with Flowtime, find your blend.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Your Experiment
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/blog/ultradian-rhythms"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Ultradian Rhythms
          </Link>
          <Link
            href="/blog/focus-for-coding-interviews"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Focus for Coding Interviews
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd[0])}
      </Script>
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd[1])}
      </Script>
    </main>
  )
}
