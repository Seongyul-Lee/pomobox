import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Clock,
  Zap,
  Timer,
  ChevronDown,
  Target,
  Lightbulb,
  Waves,
  Sun,
  Moon,
  Coffee,
  Activity,
  TrendingUp,
  BarChart3,
  BatteryFull,
  BatteryLow,
  Repeat,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { EnergyCyclePlanner } from "@/components/ui/energy-cycle-planner"

export const metadata: Metadata = {
  title: "Ultradian Rhythms: The 90-Minute Focus Cycles Your Brain Follows | Pomobox",
  description: "Discover the science of ultradian rhythms—90-120 minute biological cycles that govern peak performance. Learn to align your work with your brain's natural patterns.",
  keywords: ["ultradian rhythms", "90 minute cycle", "BRAC", "basic rest activity cycle", "circadian rhythm productivity", "energy management", "peak performance timing"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/ultradian-rhythms",
    siteName: "Pomobox",
    title: "Ultradian Rhythms: The 90-Minute Focus Cycles",
    description: "The science of 90-120 minute biological cycles that govern peak performance and how to work with them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultradian Rhythms: 90-Minute Focus Cycles | Pomobox",
    description: "Align your work with your brain's natural 90-minute energy cycles.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/ultradian-rhythms",
  },
}

// Data
const KEY_STATS = [
  { value: "90", unit: "-120", label: "minutes per cycle" },
  { value: "15", unit: "-20", label: "min recovery needed" },
  { value: "3", unit: "-4", label: "peak cycles per day" },
]

const CYCLE_PHASES = [
  {
    phase: "Rising Energy",
    duration: "0-20 min",
    description: "Focus gradually sharpens as you enter the work phase",
    recommendation: "Good time to tackle familiar tasks or warm up",
    color: "cyan",
  },
  {
    phase: "Peak Performance",
    duration: "20-70 min",
    description: "Optimal cognitive function; highest alertness and creativity",
    recommendation: "Best window for complex, demanding work",
    color: "emerald",
  },
  {
    phase: "Declining Energy",
    duration: "70-90 min",
    description: "Attention naturally wanes; diminishing returns begin",
    recommendation: "Wrap up current task; avoid starting new complex work",
    color: "amber",
  },
  {
    phase: "Trough / Recovery",
    duration: "90-110 min",
    description: "Low alertness; body signals need for rest",
    recommendation: "Mandatory break; attempting to push through reduces next cycle quality",
    color: "orange",
  },
]

const SCIENTIFIC_BASIS = [
  {
    researcher: "Nathaniel Kleitman",
    year: "1963",
    discovery: "Basic Rest-Activity Cycle (BRAC)",
    description: "Discovered that humans cycle through periods of higher and lower alertness approximately every 90-120 minutes, both during sleep (REM cycles) and waking hours.",
  },
  {
    researcher: "Peretz Lavie",
    year: "1980s",
    discovery: "Daytime Ultradian Rhythms",
    description: "Confirmed through 'ultra-short sleep' experiments that alertness fluctuates in ~90-minute waves throughout the day, independent of sleep debt.",
  },
  {
    researcher: "Anders Ericsson",
    year: "1993",
    discovery: "Deliberate Practice Limits",
    description: "Found that elite performers (musicians, athletes) practice in sessions of ~90 minutes, with breaks between, suggesting biological limits on peak performance duration.",
  },
  {
    researcher: "Multiple Studies",
    year: "2000s",
    discovery: "Cognitive Performance Cycling",
    description: "Various studies confirmed that attention, memory consolidation, and creative problem-solving all fluctuate in ultradian patterns.",
  },
]

const POMODORO_ALIGNMENT = [
  {
    pomodoroUnit: "1 Pomodoro (25 min)",
    ultradianFit: "~1/3 of peak performance window",
    use: "Building focus gradually; warming up",
  },
  {
    pomodoroUnit: "2 Pomodoros (50 min)",
    ultradianFit: "Core of peak performance phase",
    use: "Deep work sessions",
  },
  {
    pomodoroUnit: "3 Pomodoros (75 min)",
    ultradianFit: "Nearly full ultradian cycle",
    use: "Extended creative or complex work",
  },
  {
    pomodoroUnit: "4 Pomodoros (100 min)",
    ultradianFit: "Full cycle + beginning of trough",
    use: "Maximum sustainable focus block",
  },
]

const PRACTICAL_APPLICATIONS = [
  {
    title: "Morning Peak (First Cycle)",
    time: "~2 hours after waking",
    quality: "Highest",
    bestFor: "Most challenging cognitive work, creative tasks, strategic thinking",
    avoid: "Meetings, emails, routine admin",
    icon: Sun,
  },
  {
    title: "Mid-Morning Cycle",
    time: "~3-4 hours after waking",
    quality: "High",
    bestFor: "Complex problem-solving, writing, deep analysis",
    avoid: "Starting new major projects late in cycle",
    icon: TrendingUp,
  },
  {
    title: "Post-Lunch Dip",
    time: "Early afternoon",
    quality: "Lower",
    bestFor: "Routine tasks, emails, light meetings",
    avoid: "Demanding cognitive work",
    icon: Coffee,
  },
  {
    title: "Afternoon Recovery",
    time: "Mid-late afternoon",
    quality: "Moderate-High",
    bestFor: "Second wind for focused work, collaborative tasks",
    avoid: "Work requiring peak creativity",
    icon: Activity,
  },
]

const SIGNS_TO_BREAK = [
  {
    sign: "Mind wandering increases",
    explanation: "The brain naturally seeks novelty as focus resources deplete",
  },
  {
    sign: "Making more errors",
    explanation: "Cognitive accuracy declines as the cycle progresses",
  },
  {
    sign: "Hunger or thirst",
    explanation: "Body signals often align with ultradian troughs",
  },
  {
    sign: "Yawning or restlessness",
    explanation: "Physical signs of the body requesting a state change",
  },
  {
    sign: "Re-reading the same content",
    explanation: "Working memory capacity is depleted; information isn't sticking",
  },
  {
    sign: "Feeling 'stuck'",
    explanation: "Creative insight often comes during breaks, not continued forcing",
  },
]

const FAQS = [
  {
    question: "Are ultradian rhythms the same for everyone?",
    answer: "The ~90-120 minute pattern is biologically consistent across humans, but individual variation exists. Some people have slightly shorter cycles (80-90 min), others longer (100-120 min). Chronotype (morning person vs. night owl) affects when your peaks occur, but not the cycling pattern itself.",
  },
  {
    question: "How do ultradian rhythms relate to Pomodoro's 25 minutes?",
    answer: "Pomodoro sessions are sub-divisions within ultradian cycles. Two Pomodoros (50 min) fit well within the peak performance phase. Four Pomodoros (with breaks) approximate a full ultradian cycle. The techniques are complementary, not competing.",
  },
  {
    question: "What happens if I ignore my ultradian trough?",
    answer: "Pushing through the trough is possible but costly. You'll experience diminishing returns, make more errors, and deplete resources needed for subsequent cycles. The 'second wind' feeling is often adrenaline masking fatigue, leading to larger crashes later.",
  },
  {
    question: "Can I have more than 4 peak cycles per day?",
    answer: "Biologically, no. While you can work more hours, true peak performance is limited to 3-4 ultradian cycles (4.5-6 hours of high-quality focus). Additional hours tend to be lower quality. Elite performers often achieve more by working fewer, higher-quality hours.",
  },
  {
    question: "How long should my ultradian break be?",
    answer: "Research suggests 15-20 minutes minimum for cognitive restoration. This is longer than Pomodoro's 5-minute breaks, which are designed for within-cycle recovery. After a full 90-minute cycle, take a proper 15-20 minute break—or lunch if timing aligns.",
  },
  {
    question: "Does caffeine override ultradian rhythms?",
    answer: "Caffeine masks fatigue signals but doesn't eliminate the underlying rhythm. You'll still have cycles; they'll just be harder to notice. Heavy caffeine use can disrupt natural energy management, making it harder to identify your optimal work windows.",
  },
]

const RELATED_CONTENT = [
  { href: "/blog/science-of-focus", title: "Science of Focus", description: "Neuroscience of attention" },
  { href: "/blog/why-25-minutes", title: "Why 25 Minutes?", description: "Optimal session duration" },
  { href: "/blog/pomodoro-for-adhd", title: "Pomodoro for ADHD", description: "Neurodivergent adaptations" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ultradian Rhythms: The 90-Minute Focus Cycles Your Brain Follows",
    description: "Discover the science of ultradian rhythms—90-120 minute biological cycles that govern peak performance. Learn to align your work with your brain's natural patterns.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-08",
    dateModified: "2025-01-08",
    url: "https://pomobox.app/blog/ultradian-rhythms",
    mainEntityOfPage: "https://pomobox.app/blog/ultradian-rhythms",
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

export default function UltradianRhythmsPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Ultradian Rhythms")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6">
            <Waves className="h-3 w-3" />
            Chronobiology
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Ultradian Rhythms
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            The 90-minute energy cycles your brain naturally follows
          </p>
          <ArticleMeta
            publishedDate="2025-01-08"
            modifiedDate="2025-01-08"
            readingTime="11 min"
          />

          {/* Key Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {KEY_STATS.map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
                <div className="text-2xl md:text-3xl font-bold text-amber-500">
                  {stat.value}<span className="text-lg">{stat.unit}</span>
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Interactive Planner */}
        <section className="mb-16">
          <EnergyCyclePlanner />
        </section>

        {/* Extended Introduction */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              You've probably noticed that your energy and focus don't stay constant throughout the day. There are periods when ideas flow effortlessly and you accomplish hours of work in what feels like minutes, and other times when even simple tasks require immense effort. This isn't random, and it's not just about how much coffee you've had. Your brain operates on predictable 90-120 minute cycles called ultradian rhythms—a biological pattern as fundamental as your sleep cycles, but one that most people never learn to leverage.
            </p>
            <p>
              The Basic Rest-Activity Cycle (BRAC), discovered by sleep researcher Nathaniel Kleitman in the 1960s, reveals that humans oscillate between states of higher and lower alertness approximately every 90 minutes, both during sleep (as REM cycles) and during waking hours. This pattern isn't a quirk of modern life or something you can override with willpower—it's hardwired into your neurobiology. Understanding and working with this rhythm, rather than against it, is one of the most powerful productivity insights available.
            </p>
            <p>
              The implications for knowledge work are profound. Elite performers across domains—from musicians to athletes to writers—naturally tend toward 90-minute practice sessions followed by breaks. This isn't cultural convention; it's biological necessity. When researchers studied deliberate practice patterns, they consistently found that sustainable high-performance sessions cluster around this 90-minute window. Attempting to extend deep focus beyond this point yields diminishing returns and accelerates burnout. This article explores the science behind ultradian rhythms and provides practical strategies for structuring your workday to align with your brain's natural operating system.
            </p>
          </div>
        </section>

        {/* Cycle Phases */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Repeat className="h-3 w-3" />
              Cycle Anatomy
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Inside a 90-Minute Cycle
            </h2>
          </div>

          <div className="space-y-3">
            {CYCLE_PHASES.map((phase, index) => {
              const colorClasses = {
                cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-500" },
                emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500" },
                amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500" },
                orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-500" },
              }
              const colors = colorClasses[phase.color as keyof typeof colorClasses]

              return (
                <div
                  key={phase.phase}
                  className={`p-5 rounded-2xl ${colors.bg} border ${colors.border}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center text-sm font-bold ${colors.text}`}>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className={`font-semibold ${colors.text}`}>{phase.phase}</h3>
                        <p className="text-xs text-muted-foreground">{phase.duration}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                  <p className="text-sm text-foreground">
                    <strong>Best practice:</strong> {phase.recommendation}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Deep Dive: Scientific Basis */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>The Science Behind 90-Minute Cycles</h2>
            <p>
              Ultradian rhythms emerge from the interplay between multiple brain systems. The suprachiasmatic nucleus (SCN), your brain's master clock, orchestrates circadian (24-hour) rhythms, but ultradian cycles appear to arise from more distributed neural processes. Neurotransmitter systems—particularly those involving dopamine, norepinephrine, and acetylcholine—fluctuate in waves that create the rising and falling alertness you experience throughout the day.
            </p>
            <p>
              During the ascending phase of an ultradian cycle, these neurotransmitters reach optimal concentrations for focused attention. The prefrontal cortex operates efficiently, working memory capacity is maximized, and the brain's "default mode network" (associated with mind-wandering) is appropriately suppressed. This is your biological window for cognitively demanding work. As the cycle progresses, neurotransmitter concentrations shift, the default mode network becomes more active, and the brain signals its need for rest through the familiar symptoms: mind-wandering, restlessness, increased errors.
            </p>
            <p>
              Crucially, the recovery phase isn't wasted time—it's when the brain consolidates learning, clears metabolic waste products, and prepares for the next cycle. Studies show that memory consolidation and creative insight often occur during these "downtime" periods. The famous stories of scientists solving problems while showering or walking aren't accidents; they're examples of the brain's natural processing during ultradian troughs. Skipping these recovery periods doesn't save time; it degrades the quality of subsequent cycles and accelerates cognitive fatigue.
            </p>
          </div>
        </section>

        {/* Scientific Basis */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Brain className="h-3 w-3" />
              Research
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Key Scientific Discoveries
            </h2>
          </div>

          <div className="space-y-4">
            {SCIENTIFIC_BASIS.map((item) => (
              <div
                key={item.discovery}
                className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-violet-500">{item.discovery}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.year}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.researcher}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pomodoro Alignment */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Timer className="h-3 w-3" />
              Alignment
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              How Pomodoro Fits Ultradian Cycles
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Pomodoro Units</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Ultradian Fit</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Best Use</th>
                </tr>
              </thead>
              <tbody>
                {POMODORO_ALIGNMENT.map((item, index) => (
                  <tr key={item.pomodoroUnit} className={index % 2 === 0 ? "bg-card/30" : "bg-card/60"}>
                    <td className="py-3 px-4 font-medium text-primary">{item.pomodoroUnit}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.ultradianFit}</td>
                    <td className="py-3 px-4 text-foreground">{item.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Applications */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Clock className="h-3 w-3" />
              Daily Planning
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Structuring Your Day
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRACTICAL_APPLICATIONS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Icon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <span className={`ml-auto px-2 py-1 rounded-lg text-xs font-medium ${
                      item.quality === "Highest" ? "bg-emerald-500/10 text-emerald-500" :
                      item.quality === "High" ? "bg-cyan-500/10 text-cyan-500" :
                      item.quality === "Moderate-High" ? "bg-amber-500/10 text-amber-500" :
                      "bg-orange-500/10 text-orange-500"
                    }`}>
                      {item.quality}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">
                    <strong>Best for:</strong> {item.bestFor}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Avoid:</strong> {item.avoid}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Signs to Break */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
              <BatteryLow className="h-3 w-3" />
              Signals
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Signs You've Hit the Trough
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SIGNS_TO_BREAK.map((item) => (
              <div
                key={item.sign}
                className="p-4 rounded-xl bg-gradient-to-br from-orange-500/5 to-amber-500/5 border border-orange-500/10"
              >
                <h3 className="font-medium text-orange-500 mb-1">{item.sign}</h3>
                <p className="text-sm text-muted-foreground">{item.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-amber-500/10">
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </span>
              Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Your brain cycles naturally.</strong> 90-120 minute ultradian rhythms govern peak performance—work with them, not against them.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Peak hours are limited.</strong> You have 3-4 high-quality cycles per day. Protect them for your most important work.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Troughs are productive too.</strong> Recovery phases enable memory consolidation and creative insight. They're not wasted time.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Pomodoro fits within cycles.</strong> Use 2-3 Pomodoros during peak phases, longer breaks between full cycles.
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Work With Your Natural Rhythm
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Your brain already knows when to focus and when to rest. Start listening to it with structured time-boxing.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Rhythm-Aligned Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/blog/pomodoro-for-adhd"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Pomodoro for ADHD
          </Link>
          <Link
            href="/blog/science-of-focus"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Science of Focus
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
