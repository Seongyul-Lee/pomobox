import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  FlaskConical,
  Brain,
  Clock,
  Zap,
  Activity,
  Target,
  Timer,
  ChevronDown,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Coffee,
  Eye,
  Heart,
  Waves,
  BatteryFull,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"

export const metadata: Metadata = {
  title: "Neuroscience Behind Pomodoro: Why It Works | Pomobox",
  description: "Brain science explaining Pomodoro effectiveness: attention cycles, cognitive load theory, ultradian rhythms, and flow states. Research-backed productivity insights.",
  keywords: ["pomodoro neuroscience", "brain science productivity", "attention span research", "cognitive psychology", "ultradian rhythms", "flow state science"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/science-of-focus",
    siteName: "Pomobox",
    title: "Neuroscience Behind Pomodoro: Why It Works",
    description: "Brain science explaining why time-boxed focus sessions improve productivity: attention cycles, cognitive load theory, and flow states.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuroscience Behind Pomodoro | Pomobox",
    description: "Brain science explaining Pomodoro effectiveness: attention cycles, cognitive load, flow states.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/science-of-focus",
  },
}

// Data
const CORE_CONCEPTS = [
  {
    icon: Clock,
    title: "Attention Span Limits",
    stat: "~20 min",
    description: "Research suggests sustained attention peaks around 20 minutes before declining. The 25-minute Pomodoro session aligns with this natural rhythm.",
    source: "Bradbury (2016), Attention span during lectures",
  },
  {
    icon: Waves,
    title: "Ultradian Rhythms",
    stat: "90-120 min",
    description: "The brain naturally cycles through ~90-minute periods of higher and lower alertness. Pomodoro works within these cycles for sustainable performance.",
    source: "Kleitman (1982), Basic Rest-Activity Cycle",
  },
  {
    icon: BatteryFull,
    title: "Cognitive Load Theory",
    stat: "7±2 items",
    description: "Working memory is limited. Time-boxing reduces cognitive load by focusing on one task, leaving more capacity for the task itself.",
    source: "Sweller (1988), Cognitive Load Theory",
  },
  {
    icon: Zap,
    title: "Depletion & Recovery",
    stat: "~10 min",
    description: "Mental resources deplete with use. Brief breaks (10-15 min) are sufficient to restore cognitive performance close to baseline levels.",
    source: "Ariga & Lleras (2011), Brief diversions improve focus",
  },
]

const NEUROSCIENCE = [
  {
    system: "Prefrontal Cortex (PFC)",
    role: "Executive control, focus, decision-making",
    relevance: "The PFC tires quickly under sustained demand. Pomodoro breaks allow glucose replenishment and neurotransmitter rebalancing, maintaining PFC function.",
  },
  {
    system: "Default Mode Network (DMN)",
    role: "Mind-wandering, creativity, consolidation",
    relevance: "Activates during breaks. DMN activity during rest helps consolidate learning and prepare for the next focus session. Skipping breaks suppresses this crucial process.",
  },
  {
    system: "Dopaminergic System",
    role: "Motivation, reward, habit formation",
    relevance: "Completing a Pomodoro triggers small dopamine releases. This creates positive associations with focused work, making it easier to start future sessions.",
  },
  {
    system: "Stress Response (HPA Axis)",
    role: "Cortisol, adrenaline, fight-or-flight",
    relevance: "Extended work without breaks elevates cortisol. Regular breaks prevent chronic stress buildup, reducing anxiety and improving long-term cognitive health.",
  },
]

const RESEARCH_FINDINGS = [
  {
    finding: "Brief Mental Breaks Improve Focus",
    study: "Ariga & Lleras, University of Illinois (2011)",
    result: "Participants who took brief breaks during a 50-minute task maintained performance, while those who didn't showed significant decline.",
    implication: "Pomodoro breaks aren't time 'lost'—they're necessary for sustained performance.",
  },
  {
    finding: "Time Awareness Increases Productivity",
    study: "Parkinson's Law research, various studies",
    result: "Work expands to fill available time. Time-boxing constrains work, increasing efficiency and reducing perfectionism.",
    implication: "The timer creates urgency that prevents task expansion.",
  },
  {
    finding: "Switching Costs Are Real",
    study: "Rubinstein et al., APA (2001)",
    result: "Task-switching can cost 40% of productive time. Each switch requires mental 'setup' time.",
    implication: "Single-task Pomodoro sessions eliminate switching costs within the session.",
  },
  {
    finding: "Flow States Require Uninterrupted Time",
    study: "Csikszentmihalyi, Flow research (1990s)",
    result: "Flow state requires 10-15 minutes of uninterrupted focus to achieve. Interruptions reset this.",
    implication: "Protected Pomodoro sessions enable flow entry; breaks should come after, not during.",
  },
]

const OPTIMAL_DURATIONS = [
  {
    duration: "15-20 min",
    best_for: "Learning new material, high-anxiety tasks, low energy periods",
    science: "Matches natural attention span limits; reduces start resistance for difficult tasks",
  },
  {
    duration: "25 min (classic)",
    best_for: "General knowledge work, writing, coding, studying",
    science: "Slightly exceeds attention span to build stamina; short enough to prevent fatigue",
  },
  {
    duration: "45-50 min",
    best_for: "Deep creative work, complex problem-solving, experienced practitioners",
    science: "Allows deeper immersion; requires higher focus capacity; aligns with ~90-min ultradian cycles when paired with longer breaks",
  },
  {
    duration: "90 min",
    best_for: "Flow-state work for experts, single long-form tasks",
    science: "Full ultradian cycle; requires trained focus ability; needs substantial break (20-30 min) after",
  },
]

const BREAK_SCIENCE = [
  {
    icon: Activity,
    title: "Physical Movement",
    benefit: "Increases blood flow to brain, oxygenates tissue, releases muscle tension",
    recommendation: "Walk, stretch, or do light exercises—3-5 minutes makes a difference",
  },
  {
    icon: Eye,
    title: "Visual Rest",
    benefit: "Reduces eye strain from screens, allows ciliary muscles to relax",
    recommendation: "Look at distant objects, natural light if possible (20-20-20 rule)",
  },
  {
    icon: Brain,
    title: "Mental Defocusing",
    benefit: "Activates DMN for memory consolidation and creative incubation",
    recommendation: "Avoid new information (no social media); let mind wander",
  },
  {
    icon: Heart,
    title: "Stress Reduction",
    benefit: "Activates parasympathetic nervous system, lowers cortisol",
    recommendation: "Deep breathing, brief meditation, or simply stillness",
  },
]

const FAQS = [
  {
    question: "Is there scientific proof that Pomodoro works?",
    answer: "While no single study proves 'Pomodoro' specifically, the technique aligns with well-established research on attention spans, ultradian rhythms, cognitive load theory, and the benefits of brief rest periods. The science behind each component is solid.",
  },
  {
    question: "Why 25 minutes specifically?",
    answer: "25 minutes emerged empirically from Francesco Cirillo's experiments. Science supports this range: attention typically declines after 20-25 minutes of focused work. The exact number matters less than the principle—time-box slightly beyond your natural attention span to build capacity.",
  },
  {
    question: "Can focus be improved like a muscle?",
    answer: "Yes. Neuroplasticity research shows that regular focused practice strengthens neural pathways involved in attention. Studies show meditation practitioners (who train sustained attention) have measurably improved focus capacity over time.",
  },
  {
    question: "What happens in the brain during breaks?",
    answer: "The Default Mode Network (DMN) activates, which is crucial for memory consolidation, creative insight, and preparation for future tasks. Glucose replenishes in the prefrontal cortex. Stress hormones decrease. These processes are necessary for sustained cognitive performance.",
  },
  {
    question: "Is multitasking actually impossible?",
    answer: "For cognitively demanding tasks, yes. The brain can't truly parallel-process complex information—it rapidly switches between tasks, incurring 'switching costs' each time. Studies show multitaskers perform worse on all tasks compared to single-tasking.",
  },
  {
    question: "How long does it take to reach flow state?",
    answer: "Research suggests 10-23 minutes of uninterrupted focus is typically needed to enter flow state. This is why protected focus sessions (like Pomodoro) are essential—any interruption resets this 'warm-up' period.",
  },
]

const RELATED_CONTENT = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Learn the technique" },
  { href: "/blog/pomodoro-history", title: "Pomodoro History", description: "Origins of the technique" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Protect your focus" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Neuroscience Behind Pomodoro: Why It Works",
    description: "Brain science explaining why time-boxed focus sessions improve productivity: attention cycles, cognitive load theory, ultradian rhythms, and flow states.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-05",
    dateModified: "2025-01-05",
    url: "https://pomobox.app/blog/science-of-focus",
    mainEntityOfPage: "https://pomobox.app/blog/science-of-focus",
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

export default function ScienceOfFocusPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Neuroscience Behind Pomodoro")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-6">
            <FlaskConical className="h-3 w-3" />
            Research-Backed
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Neuroscience Behind Pomodoro
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Brain science explaining why time-boxed focus sessions work
          </p>
          <ArticleMeta
            publishedDate="2025-01-05"
            modifiedDate="2025-01-05"
            readingTime="10 min"
          />

          {/* Key Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-cyan-500">20</div>
              <div className="text-xs text-muted-foreground">min attention peak</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">23</div>
              <div className="text-xs text-muted-foreground">min to refocus</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">40%</div>
              <div className="text-xs text-muted-foreground">switching cost</div>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-cyan-500/10">
                <Brain className="h-5 w-5 text-cyan-500" />
              </span>
              Why Your Brain Needs Structure
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">The Pomodoro Technique isn't arbitrary.</strong> Its core principles—time-boxing, single-tasking, and mandatory breaks—align with fundamental findings from neuroscience and cognitive psychology.
              </p>
              <p>
                Research has revealed that human attention has natural limits, that the brain operates in rhythmic cycles, and that rest is active (not passive) for cognitive performance. <strong className="text-foreground">Understanding this science explains why Pomodoro works</strong>—and how to optimize it for your brain.
              </p>
              <p>
                This article explores the research behind each element of the technique, from attention spans to flow states to the neuroscience of breaks.
              </p>
            </div>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <BarChart3 className="h-3 w-3" />
              Key Findings
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Core Scientific Concepts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_CONCEPTS.map((concept) => {
              const Icon = concept.icon
              return (
                <div
                  key={concept.title}
                  className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{concept.title}</h3>
                    </div>
                    <span className="text-lg font-bold text-primary">{concept.stat}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{concept.description}</p>
                  <p className="text-xs text-muted-foreground/70 italic">{concept.source}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Neuroscience */}
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
                key={item.system}
                className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
              >
                <h3 className="font-semibold text-violet-500 mb-2">{item.system}</h3>
                <p className="text-sm text-foreground mb-2">{item.role}</p>
                <p className="text-sm text-muted-foreground">{item.relevance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Research Findings */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FlaskConical className="h-3 w-3" />
              Studies
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Research That Supports Pomodoro
            </h2>
          </div>

          <div className="space-y-4">
            {RESEARCH_FINDINGS.map((research) => (
              <div
                key={research.finding}
                className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <h3 className="font-semibold text-foreground mb-1">{research.finding}</h3>
                <p className="text-xs text-muted-foreground/70 mb-3">{research.study}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong className="text-foreground">Finding:</strong> {research.result}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  <strong>→ Implication:</strong> {research.implication}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Optimal Durations */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Clock className="h-3 w-3" />
              Timing
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Optimal Session Durations
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Duration</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Best For</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Science</th>
                </tr>
              </thead>
              <tbody>
                {OPTIMAL_DURATIONS.map((item) => (
                  <tr key={item.duration} className="border-b border-border/30 last:border-0">
                    <td className="py-3 px-2 font-medium text-primary whitespace-nowrap">{item.duration}</td>
                    <td className="py-3 px-2 text-foreground">{item.best_for}</td>
                    <td className="py-3 px-2 text-muted-foreground">{item.science}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Break Science */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Coffee className="h-3 w-3" />
              Rest Science
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              What Makes a Good Break
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BREAK_SCIENCE.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-rose-500" />
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.benefit}</p>
                  <p className="text-sm text-foreground">
                    <strong>Try:</strong> {item.recommendation}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </span>
              Practical Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Sessions should be protected.</strong> Every interruption resets your focus clock by 10-23 minutes. Guard your Pomodoro time.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Breaks are active processes.</strong> Your brain does critical work during rest. Skipping breaks hurts performance.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Single-tasking is scientifically superior.</strong> Multitasking isn't efficient—it's costly. Focus on one thing per session.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Focus capacity is trainable.</strong> Consistent practice strengthens attention networks. Start with shorter sessions if needed.
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Put Science Into Practice
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Your brain is wired for focused intervals with rest. Start your first research-backed focus session now.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Science-Backed Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/blog/pomodoro-history"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Pomodoro History
          </Link>
          <Link
            href="/guide/what-is-pomodoro"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            What is Pomodoro?
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
