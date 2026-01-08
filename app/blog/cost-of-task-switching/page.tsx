import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Clock,
  Zap,
  AlertTriangle,
  Timer,
  ChevronDown,
  TrendingDown,
  BarChart3,
  Target,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Layers,
  Focus,
  BrainCircuit,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { SwitchingCostCalculator } from "@/components/ui/switching-cost-calculator"

export const metadata: Metadata = {
  title: "The Hidden Cost of Task Switching: 23 Minutes Lost Per Interruption | Pomobox",
  description: "Research shows each task switch costs 23 minutes to refocus. Learn the neuroscience behind context switching costs and how to protect your productive time.",
  keywords: ["task switching cost", "context switching", "productivity loss", "refocus time", "interruption cost", "multitasking myth", "deep work"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/cost-of-task-switching",
    siteName: "Pomobox",
    title: "The Hidden Cost of Task Switching: 23 Minutes Per Interruption",
    description: "Research shows each task switch costs 23 minutes to refocus. Learn the neuroscience and how to protect your focus.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Task Switching Costs: 23 Minutes Lost Per Interruption | Pomobox",
    description: "The neuroscience behind context switching and how to reclaim your productive time.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/cost-of-task-switching",
  },
}

// Data
const KEY_STATS = [
  { value: "23", unit: "min", label: "to refocus after interruption" },
  { value: "40", unit: "%", label: "productivity loss from switching" },
  { value: "2.1", unit: "sec", label: "minimum switch cost" },
]

const RESEARCH_STUDIES = [
  {
    title: "The Cost of Interrupted Work",
    researcher: "Gloria Mark, UC Irvine (2008)",
    finding: "It takes an average of 23 minutes and 15 seconds to return to the original task after an interruption.",
    implication: "Even brief interruptions have outsized impacts on productivity.",
    stat: "23 min",
  },
  {
    title: "Executive Control of Cognitive Processes",
    researcher: "Rubinstein, Meyer & Evans, APA (2001)",
    finding: "Task switching can cost up to 40% of productive time. Each switch requires mental 'task-set reconfiguration.'",
    implication: "Multitasking is a myth—the brain rapidly switches, not parallel processes.",
    stat: "40%",
  },
  {
    title: "The Attentional Cost of Receiving a Cell Phone Notification",
    researcher: "Stothart, Mitchum & Yehnert, FSU (2015)",
    finding: "Even notifications you don't respond to increase errors by 28% and reduce focus performance.",
    implication: "The mere presence of potential interruptions degrades cognitive performance.",
    stat: "28%",
  },
  {
    title: "Residue Effects of Task Switching",
    researcher: "Sophie Leroy, University of Washington (2009)",
    finding: "Attention residue from incomplete tasks persists and impairs performance on subsequent tasks.",
    implication: "Finishing one task before starting another is neurologically optimal.",
    stat: "Residue",
  },
]

const SWITCHING_TYPES = [
  {
    type: "External Interruptions",
    examples: "Colleague visits, phone calls, Slack messages, email notifications",
    cost: "23 min average",
    icon: AlertTriangle,
    color: "red",
  },
  {
    type: "Self-Interruptions",
    examples: "Checking email, social media, suddenly remembering another task",
    cost: "Same as external",
    icon: RefreshCw,
    color: "orange",
  },
  {
    type: "Task Switching",
    examples: "Moving between different projects or types of work",
    cost: "2-40 min depending on complexity",
    icon: Layers,
    color: "amber",
  },
  {
    type: "Mental Load Switching",
    examples: "Shifting between creative, analytical, and administrative work",
    cost: "Higher for complex tasks",
    icon: BrainCircuit,
    color: "yellow",
  },
]

const NEUROSCIENCE = [
  {
    concept: "Prefrontal Cortex Depletion",
    explanation: "The PFC manages task switching but has limited capacity. Each switch depletes glucose and mental resources, reducing subsequent performance.",
  },
  {
    concept: "Attention Residue",
    explanation: "When switching tasks, part of your attention remains 'stuck' on the previous task. This residue reduces cognitive capacity for the new task.",
  },
  {
    concept: "Task-Set Reconfiguration",
    explanation: "Your brain must reconfigure its 'rules' for each task—which information matters, what actions are appropriate. This reconfiguration takes time.",
  },
  {
    concept: "Working Memory Overwrite",
    explanation: "Task context stored in working memory gets partially overwritten with each switch. Rebuilding this context is the 'refocus' time.",
  },
]

const PROTECTION_STRATEGIES = [
  {
    strategy: "Time-Boxing (Pomodoro)",
    description: "Dedicate fixed intervals to single tasks. External structure removes the need for willpower-based focus.",
    effectiveness: "High",
  },
  {
    strategy: "Notification Batching",
    description: "Check messages at scheduled intervals (e.g., every 2 hours) rather than continuously.",
    effectiveness: "High",
  },
  {
    strategy: "Task Bundling",
    description: "Group similar tasks together to reduce cognitive switching costs between task types.",
    effectiveness: "Medium-High",
  },
  {
    strategy: "Environment Design",
    description: "Put phone in another room, use website blockers, close unnecessary tabs before starting.",
    effectiveness: "Medium",
  },
  {
    strategy: "Interruption Logging",
    description: "Track interruptions for one week to identify patterns and major sources to eliminate.",
    effectiveness: "Medium",
  },
]

const FAQS = [
  {
    question: "Is all task switching bad?",
    answer: "Not necessarily. Scheduled breaks and planned transitions are fine—it's unplanned interruptions and constant switching that damage productivity. The key is intentional versus reactive switching.",
  },
  {
    question: "Can I train myself to switch faster?",
    answer: "Somewhat, but there's a neurological floor. Even highly trained individuals show measurable switching costs (minimum ~2 seconds for simple tasks). The brain simply cannot parallel-process complex cognitive work.",
  },
  {
    question: "Why do I feel productive when multitasking?",
    answer: "Rapid task switching creates a dopamine-driven illusion of productivity. The constant novelty feels rewarding, but objective measures show decreased output quality and quantity. It's a cognitive trap.",
  },
  {
    question: "How is Pomodoro different from regular focus attempts?",
    answer: "Pomodoro provides external structure that removes decision fatigue. Instead of constantly deciding whether to check notifications, you have a predetermined system: focus during sessions, check during breaks.",
  },
  {
    question: "What about jobs that require constant availability?",
    answer: "Even in reactive roles, you can batch interruptions. Set 'office hours' for non-urgent requests, use status indicators, and negotiate focused time blocks with your team. Even 2-3 protected hours daily makes a significant difference.",
  },
  {
    question: "Does the 23-minute figure apply to everyone?",
    answer: "The 23-minute average comes from office workers. Your personal refocus time varies based on task complexity, individual differences, and interruption type. Some people may take longer. The principle—that interruptions cost significant time—is universal.",
  },
]

const RELATED_CONTENT = [
  { href: "/blog/science-of-focus", title: "Science of Focus", description: "Neuroscience of attention" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoiding Distractions", description: "Practical strategies" },
  { href: "/blog/why-25-minutes", title: "Why 25 Minutes?", description: "Optimal focus duration" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Hidden Cost of Task Switching: 23 Minutes Lost Per Interruption",
    description: "Research shows each task switch costs 23 minutes to refocus. Learn the neuroscience behind context switching costs and how to protect your productive time.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    url: "https://pomobox.app/blog/cost-of-task-switching",
    mainEntityOfPage: "https://pomobox.app/blog/cost-of-task-switching",
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

export default function CostOfTaskSwitchingPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Cost of Task Switching")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 mb-6">
            <TrendingDown className="h-3 w-3" />
            Productivity Research
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            The Hidden Cost of Task Switching
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Why every interruption costs you 23 minutes of productive time
          </p>
          <ArticleMeta readingTime="10 min" />

          {/* Key Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {KEY_STATS.map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
                <div className="text-2xl md:text-3xl font-bold text-orange-500">
                  {stat.value}<span className="text-lg">{stat.unit}</span>
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Interactive Calculator */}
        <section className="mb-16">
          <SwitchingCostCalculator />
        </section>

        {/* Extended Introduction */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              In the modern workplace, interruptions have become so normalized that we rarely question their true cost. A colleague stops by with a quick question, a notification pops up on your phone, you remember an email you need to send—these micro-interruptions seem harmless in isolation. But research from cognitive science and workplace productivity studies reveals a shocking truth: each of these interruptions costs far more than the few seconds they take. On average, it takes 23 minutes and 15 seconds to return to the original task with the same level of focus you had before the interruption.
            </p>
            <p>
              This isn't a matter of willpower or discipline. It's neuroscience. Your brain cannot instantly switch between complex cognitive tasks—it must undergo a process called "task-set reconfiguration," rebuild context in working memory, and overcome the "attention residue" left by the previous task. These processes are metabolically expensive and time-consuming, regardless of how motivated or skilled you are. Understanding this reality is the first step toward protecting your most valuable professional asset: focused attention.
            </p>
            <p>
              The implications extend beyond individual productivity. In a knowledge economy where deep thinking creates disproportionate value, organizations that fail to protect focused time are systematically destroying their most important output. The constant connectivity that feels efficient is actually a massive hidden tax on cognitive work. This article examines the research, explains the neuroscience, and provides practical strategies to reclaim the hours currently lost to preventable context switching.
            </p>
          </div>
        </section>

        {/* Research Studies */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <BarChart3 className="h-3 w-3" />
              Research
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              What the Research Shows
            </h2>
          </div>

          <div className="space-y-4">
            {RESEARCH_STUDIES.map((study) => (
              <div
                key={study.title}
                className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{study.title}</h3>
                    <p className="text-xs text-muted-foreground">{study.researcher}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-500 font-bold text-sm whitespace-nowrap">
                    {study.stat}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong className="text-foreground">Finding:</strong> {study.finding}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  <strong>→</strong> {study.implication}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Types of Switching */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Layers className="h-3 w-3" />
              Categories
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Types of Context Switching
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SWITCHING_TYPES.map((item) => {
              const Icon = item.icon
              const colorClasses = {
                red: "from-red-500/10 to-red-500/5 border-red-500/20 text-red-500",
                orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-500",
                amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-500",
                yellow: "from-yellow-500/10 to-yellow-500/5 border-yellow-500/20 text-yellow-500",
              }
              return (
                <div
                  key={item.type}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} border`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`h-5 w-5 ${colorClasses[item.color as keyof typeof colorClasses].split(" ").pop()}`} />
                    <h3 className="font-semibold text-foreground">{item.type}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.examples}</p>
                  <p className="text-sm font-medium text-foreground">Cost: {item.cost}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Deep Dive: The Neuroscience */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>The Neuroscience of Switching Costs</h2>
            <p>
              Understanding why task switching is so costly requires examining what happens inside the brain during focus and interruption. The prefrontal cortex (PFC), located behind your forehead, serves as the brain's executive control center. It manages working memory, attention allocation, and the rules that govern task performance. When you're deeply focused on a complex task, the PFC maintains an intricate "task set"—a constellation of neural patterns that represent what you're doing, why you're doing it, and how to do it effectively.
            </p>
            <p>
              When an interruption occurs, this task set doesn't simply pause—it partially degrades. The PFC must shift resources to process the interruption, which means the original task set loses some of its neural activation. This is the phenomenon researchers call "attention residue": even after you consciously decide to return to your original task, part of your neural resources remain allocated to the interrupting stimulus. Sophie Leroy's research at the University of Washington demonstrated that this residue measurably impairs performance on the resumed task.
            </p>
            <p>
              The 23-minute refocus time isn't arbitrary—it represents the time needed to fully rebuild the degraded task set. During this period, you must reactivate the relevant rules, reload context into working memory, and suppress the lingering activation from the interruption. This process is metabolically expensive, consuming glucose and mental energy that could otherwise be directed toward productive work. The more complex the original task, the longer this reconstruction takes.
            </p>
          </div>
        </section>

        {/* Neuroscience Concepts */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Brain className="h-3 w-3" />
              Neuroscience
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              What Happens in Your Brain
            </h2>
          </div>

          <div className="space-y-4">
            {NEUROSCIENCE.map((item) => (
              <div
                key={item.concept}
                className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
              >
                <h3 className="font-semibold text-violet-500 mb-2">{item.concept}</h3>
                <p className="text-sm text-muted-foreground">{item.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Protection Strategies */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-3 w-3" />
              Strategies
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              How to Protect Your Focus
            </h2>
          </div>

          <div className="space-y-3">
            {PROTECTION_STRATEGIES.map((item, index) => (
              <div
                key={item.strategy}
                className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-500">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-foreground">{item.strategy}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-medium whitespace-nowrap">
                    {item.effectiveness}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-orange-500/10">
                <Lightbulb className="h-5 w-5 text-orange-500" />
              </span>
              Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Every interruption costs ~23 minutes.</strong> What feels like a 30-second question actually costs half an hour of productive work.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Multitasking is neurologically impossible.</strong> The brain rapidly switches, incurring costs each time. Single-tasking is objectively superior.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Structure beats willpower.</strong> Use external systems (Pomodoro, notification blocking) rather than relying on self-control.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Even unattended notifications hurt.</strong> The mere possibility of interruption degrades performance. Remove the source, not just the response.
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Stop Losing Hours to Interruptions
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Protect your focus with structured time-boxing. Each Pomodoro session is a shield against context switching costs.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Protected Focus Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/blog/science-of-focus"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Science of Focus
          </Link>
          <Link
            href="/blog/pomodoro-for-adhd"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Pomodoro for ADHD
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
