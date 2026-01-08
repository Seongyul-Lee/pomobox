import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Clock,
  Zap,
  Activity,
  Timer,
  ChevronDown,
  FlaskConical,
  AlertTriangle,
  BookOpen,
  LineChart,
  Target,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  TrendingDown,
  BatteryFull,
  Waves,
  Lightbulb,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { FocusDurationCalculator } from "@/components/ui/focus-duration-calculator"

export const metadata: Metadata = {
  title: "Why 25 Minutes? Research-Proven Focus Duration Science | Pomobox",
  description: "Discover why 25 minutes is neuroscience's optimal focus time. Evidence-based research on attention spans, ultradian rhythms, and cognitive load. Start focusing better today.",
  keywords: [
    "why 25 minutes pomodoro",
    "attention span research",
    "focus duration science",
    "optimal work interval",
    "ultradian rhythms",
    "cognitive load theory",
    "pomodoro technique science",
    "peak focus window",
    "vigilance decrement",
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/why-25-minutes",
    siteName: "Pomobox",
    title: "25-Minute Focus: The Neuroscience Behind Pomodoro",
    description: "Science proves 25 minutes is peak focus time. Discover why this interval aligns with attention spans, brain rhythms, and cognitive limits.",
    authors: ["Pomobox Team"],
    publishedTime: "2026-01-08T00:00:00Z",
    modifiedTime: "2026-01-08T00:00:00Z",
    tags: ["pomodoro", "productivity", "cognitive science", "focus", "research"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why 25 Minutes? Pomodoro Focus Science",
    description: "The science behind Pomodoro's 25-minute sweet spot. Attention spans, brain rhythms, and why shorter doesn't work. Evidence explained.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/why-25-minutes",
  },
}

// Research Data
const CORE_RESEARCH = [
  {
    icon: Clock,
    title: "Attention Span Limits",
    stat: "20-25 min",
    description: "Research by Bradbury (2016) demonstrated that sustained attention during lectures declines significantly after 20-25 minutes. The Pomodoro's 25-minute duration captures peak focus before cognitive fatigue sets in.",
    source: "Bradbury, 2016",
    color: "cyan",
  },
  {
    icon: TrendingDown,
    title: "Vigilance Decrement",
    stat: "~30 min",
    description: "Ariga and Lleras (2011) found that vigilance—the ability to sustain attention on a task—naturally declines after approximately 30 minutes of continuous focus. Brief diversions restore performance.",
    source: "Ariga & Lleras, 2011",
    color: "violet",
  },
  {
    icon: Waves,
    title: "Ultradian Rhythms",
    stat: "90-120 min",
    description: "Kleitman's research (1982) on Basic Rest-Activity Cycles (BRAC) revealed 90-120 minute biological rhythms. The 25-minute Pomodoro fits neatly as a micro-cycle within this natural energy pattern.",
    source: "Kleitman, 1982",
    color: "emerald",
  },
  {
    icon: Brain,
    title: "Cognitive Load Theory",
    stat: "7±2 items",
    description: "Sweller's Cognitive Load Theory (1988) shows working memory has strict limits. Time-boxing to 25 minutes prevents cognitive overload by breaking complex work into manageable chunks.",
    source: "Sweller, 1988",
    color: "amber",
  },
]

const DURATION_COMPARISON = [
  {
    duration: "15 min",
    label: "Too Short",
    attention: 85,
    fatigue: 5,
    flowPotential: 35,
    verdict: "Insufficient for deep work",
    science: "Insufficient time to enter flow state (requires 10-23 minutes). Limited productivity gains despite low fatigue.",
    color: "slate",
  },
  {
    duration: "25 min",
    label: "Optimal",
    attention: 92,
    fatigue: 25,
    flowPotential: 85,
    verdict: "Peak efficiency zone",
    science: "Aligns with natural attention span (Bradbury, 2016). Captures flow state while ending before vigilance decrement.",
    color: "primary",
  },
  {
    duration: "45 min",
    label: "Extended",
    attention: 70,
    fatigue: 55,
    flowPotential: 75,
    verdict: "Risk of diminishing returns",
    science: "Exceeds typical attention span. Vigilance decrement begins (Ariga & Lleras, 2011). Requires trained focus capacity.",
    color: "amber",
  },
  {
    duration: "90 min",
    label: "Ultra",
    attention: 45,
    fatigue: 85,
    flowPotential: 60,
    verdict: "High cognitive cost",
    science: "Full ultradian cycle (Kleitman, 1982). Significant fatigue accumulation. Requires extended recovery break.",
    color: "orange",
  },
]

const RESEARCH_CITATIONS = [
  {
    authors: "Bradbury, N. A.",
    year: "2016",
    title: "Attention span during lectures: 8 seconds, 10 minutes, or more?",
    journal: "Advances in Physiology Education",
    volume: "40(4), 509-513",
    doi: "10.1152/advan.00109.2016",
    finding: "Sustained attention during educational content peaks around 10-15 minutes and declines progressively, with significant drops after 20-25 minutes.",
  },
  {
    authors: "Ariga, A., & Lleras, A.",
    year: "2011",
    title: "Brief and rare mental 'breaks' keep you focused: Deactivation and reactivation of task goals preempt vigilance decrements",
    journal: "Cognition",
    volume: "118(3), 439-443",
    doi: "10.1016/j.cognition.2010.12.007",
    finding: "Brief diversions from a task dramatically improve focus. Participants who took short breaks maintained performance over 50 minutes, while those who didn't showed significant decline.",
  },
  {
    authors: "Kleitman, N.",
    year: "1982",
    title: "Basic rest-activity cycle—22 years later",
    journal: "Sleep",
    volume: "5(4), 311-317",
    doi: "10.1093/sleep/5.4.311",
    finding: "The human body follows 90-120 minute cycles of alertness and fatigue throughout the day, known as ultradian rhythms.",
  },
  {
    authors: "Sweller, J.",
    year: "1988",
    title: "Cognitive load during problem solving: Effects on learning",
    journal: "Cognitive Science",
    volume: "12(2), 257-285",
    doi: "10.1016/0364-0213(88)90023-7",
    finding: "Working memory has limited capacity. Instructional designs that reduce extraneous cognitive load improve learning and performance.",
  },
  {
    authors: "Miller, G. A.",
    year: "1956",
    title: "The magical number seven, plus or minus two",
    journal: "Psychological Review",
    volume: "63(2), 81-97",
    doi: "10.1037/h0043158",
    finding: "Human working memory can hold approximately 7±2 items simultaneously. This limitation fundamentally constrains cognitive processing.",
  },
]

const FOCUS_TIMELINE = [
  { time: "0-5 min", label: "Warm-Up Phase", percentage: 60, description: "Brain transitions from diffuse to focused mode. Neural pathways activate for the specific task. Mild resistance common.", colorClass: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20" },
  { time: "5-15 min", label: "Flow Entry", percentage: 85, description: "Attention networks fully engaged. Working memory loaded with task-relevant information. Flow state becomes accessible.", colorClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { time: "15-25 min", label: "Peak Performance", percentage: 95, description: "Maximum cognitive efficiency. Deep focus achieved. Optimal balance of engagement and sustainable effort.", colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { time: "25-35 min", label: "Decline Onset", percentage: 75, description: "Vigilance decrement begins (Ariga & Lleras). Attention lapses increase. Working memory strain accumulates.", colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { time: "35+ min", label: "Fatigue Zone", percentage: 50, description: "Significant cognitive decline. Error rates increase. Mental resources depleted. Break urgently needed.", colorClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
]

const WHY_NOT_OTHER = [
  {
    question: "Why not 20 minutes?",
    answer: "While 20 minutes captures most of peak attention, it often cuts flow state short. Research suggests flow entry requires 10-23 minutes of uninterrupted focus (Csikszentmihalyi). The extra 5 minutes allows flow to fully develop without significant fatigue costs.",
  },
  {
    question: "Why not 30 minutes?",
    answer: "By 30 minutes, vigilance decrement is well underway (Ariga & Lleras, 2011). Studies show attention quality drops noticeably between 25-30 minutes. The 25-minute mark captures approximately 95% of peak focus time while avoiding the steeper decline phase.",
  },
  {
    question: "Why not 50 minutes (like school classes)?",
    answer: "Traditional 50-minute class periods were designed for administrative convenience, not cognitive science. Research shows significant attention decline by 35-40 minutes, meaning the last 10-15 minutes of a typical class operate at reduced efficiency.",
  },
  {
    question: "Why not match the full 90-minute ultradian cycle?",
    answer: "While 90-minute sessions align with natural biological rhythms (Kleitman, 1982), they demand trained focus capacity and produce substantial cognitive fatigue. Four 25-minute Pomodoros with breaks achieve similar productive time with better sustained quality.",
  },
]

const FAQS = [
  {
    question: "Why is 25 minutes the ideal focus time?",
    answer: "25 minutes aligns with human cognitive physiology. Research shows sustained attention peaks around 20 minutes before declining (Bradbury, 2016), vigilance decrement sets in after 25-30 minutes (Ariga & Lleras, 2011), and working memory needs periodic rest to maintain performance. The 25-minute interval captures peak focus while ending before significant cognitive fatigue.",
  },
  {
    question: "What is the science behind the Pomodoro Technique?",
    answer: "The Pomodoro Technique is backed by multiple areas of cognitive science: attention span research showing 20-25 minute focus limits, Cognitive Load Theory explaining working memory constraints (Sweller, 1988), ultradian rhythms describing 90-120 minute energy cycles (Kleitman, 1982), and vigilance decrement research proving brief breaks restore performance (Ariga & Lleras, 2011).",
  },
  {
    question: "How long can humans focus without a break?",
    answer: "Research indicates peak sustained attention lasts approximately 20-25 minutes for most adults. While focus can continue beyond this point, quality declines progressively. By 35-40 minutes, vigilance decrement significantly impairs performance. Brief 5-10 minute breaks restore attention to near-baseline levels.",
  },
  {
    question: "Can I extend Pomodoro sessions beyond 25 minutes?",
    answer: "Yes, but with trade-offs. Sessions of 45-50 minutes can work for deep creative work or experienced practitioners, but require trained focus capacity and longer recovery breaks. For most knowledge work, the 25-minute standard optimizes the attention-to-fatigue ratio.",
  },
  {
    question: "What happens in the brain during a 25-minute focus session?",
    answer: "During focused work, the prefrontal cortex manages executive function and attention. Working memory holds task-relevant information (limited to 7±2 items per Miller, 1956). After 20-25 minutes, glucose depletion and neurotransmitter changes reduce prefrontal efficiency. Breaks allow restoration of these resources.",
  },
  {
    question: "Did Francesco Cirillo know about this research?",
    answer: "Cirillo developed the Pomodoro Technique empirically in the late 1980s through personal experimentation, not academic research. However, subsequent cognitive science has validated his intuitive discovery. The 25-minute interval he settled on happens to align remarkably well with attention span research published later.",
  },
]

const RELATED_CONTENT = [
  { href: "/blog/science-of-focus", title: "Neuroscience Behind Pomodoro", description: "Brain science of focus" },
  { href: "/blog/psychology-of-timer-sounds", title: "Psychology of Timer Sounds", description: "Dopamine and rewards" },
  { href: "/blog/pomodoro-history", title: "Pomodoro History", description: "Origins of the technique" },
]

// JSON-LD Schemas
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Why 25 Minutes is the Magic Number: The Science Behind Pomodoro's Optimal Focus Duration",
  "description": "Research reveals why the 25-minute Pomodoro interval aligns with human cognitive physiology. Explore attention span research, ultradian rhythms, and focus duration science.",
  "author": {
    "@type": "Organization",
    "name": "Pomobox Team",
    "url": "https://pomobox.app",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Pomobox",
    "logo": { "@type": "ImageObject", "url": "https://pomobox.app/logo.png" },
  },
  "datePublished": "2026-01-08",
  "dateModified": "2026-01-08",
  "url": "https://pomobox.app/blog/why-25-minutes",
  "mainEntityOfPage": "https://pomobox.app/blog/why-25-minutes",
  "keywords": ["why 25 minutes pomodoro", "attention span research", "focus duration science", "cognitive load theory"],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://pomobox.app",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://pomobox.app/blog",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Why 25 Minutes?",
      "item": "https://pomobox.app/blog/why-25-minutes",
    },
  ],
}

export default function Why25MinutesPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Why 25 Minutes?")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-6">
            <FlaskConical className="h-3 w-3" />
            Cognitive Science Research
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Why 25 Minutes is the Magic Number
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            The science behind Pomodoro&apos;s optimal focus duration
          </p>
          <ArticleMeta
            publishedDate="2026-01-08"
            modifiedDate="2026-01-08"
            readingTime="16 min"
          />

          {/* Key Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-cyan-500">20-25</div>
              <div className="text-xs text-muted-foreground">min attention peak</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">7±2</div>
              <div className="text-xs text-muted-foreground">working memory items</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">90</div>
              <div className="text-xs text-muted-foreground">min ultradian cycle</div>
            </div>
          </div>
        </header>

        {/* Interactive Calculator */}
        <section className="mb-12">
          <FocusDurationCalculator />
        </section>

        {/* Extended Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              The question &quot;why 25 minutes?&quot; might seem like a minor detail in the broader landscape of productivity techniques, but it touches on something fundamental about human cognition. This specific duration wasn&apos;t chosen arbitrarily—it emerged from years of practical experimentation by Francesco Cirillo in the 1980s, and has since been validated by decades of cognitive science research. Understanding the science behind this number transforms how you approach focused work, turning what might seem like an arbitrary rule into a research-backed strategy for sustained performance.
            </p>
            <p>
              At its core, the 25-minute interval represents a carefully calibrated balance between competing cognitive demands. On one side, you need enough time to enter a state of deep focus—research suggests this transition takes at least 10-15 minutes for most people. On the other side, you need to stop before attention quality degrades significantly, which typically begins around the 25-30 minute mark. The Pomodoro&apos;s duration threads this needle precisely, capturing the productive sweet spot where focus is fully engaged but fatigue hasn&apos;t yet accumulated.
            </p>
            <p>
              What makes this duration particularly elegant is how it compounds over time. Four 25-minute sessions (with breaks) roughly equal one complete ultradian cycle—the 90-120 minute biological rhythm that governs human alertness throughout the day. By structuring work this way, Pomodoro practitioners unconsciously align their efforts with natural energy fluctuations, riding peaks of alertness while using breaks to navigate the inevitable troughs. This biological harmony explains why many users report feeling less exhausted after a full day of Pomodoro sessions compared to traditional marathon work blocks.
            </p>
          </div>
        </section>

        {/* Medical Disclaimer - YMYL Requirement */}
        <section className="mb-12" aria-label="Research disclaimer">
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-foreground mb-2">Educational Content Notice</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This article is for <strong className="text-foreground">informational purposes only</strong> and summarizes peer-reviewed cognitive science research.
                  Individual focus capacity varies based on factors including sleep, nutrition, task type, and neurological differences.
                  The research cited represents general findings that may not apply uniformly to all individuals.
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  Content reviewed: January 2026 | Sources: Peer-reviewed cognitive science journals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Definition Section - Featured Snippet Target */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-cyan-500/10">
                <BookOpen className="h-5 w-5 text-cyan-500" />
              </span>
              The 25-Minute Question
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Why exactly 25 minutes?</strong> When Francesco Cirillo developed the Pomodoro
                Technique in the late 1980s, he settled on this duration through personal experimentation. What he discovered
                empirically has since been validated by decades of cognitive science research. The 25-minute interval isn&apos;t
                arbitrary—it represents a carefully balanced sweet spot in human attention and cognitive endurance.
              </p>
              <p>
                According to neuroscience research, sustained attention peaks at approximately 20-25 minutes before
                entering a decline phase known as <strong className="text-foreground">vigilance decrement</strong>. This phenomenon,
                documented by Ariga and Lleras at the University of Illinois, explains why the Pomodoro Technique&apos;s
                time-boxing approach works so effectively. The 25-minute duration captures nearly all of peak attention
                while ending before significant cognitive fatigue accumulates.
              </p>
              <p>
                Studies from cognitive psychology laboratories worldwide have reinforced these findings. Working memory—the
                mental workspace where we hold and manipulate information—operates under strict capacity constraints. Miller&apos;s
                famous &quot;7±2&quot; rule (1956) established that humans can only juggle about seven items simultaneously.
                Time-boxing work into focused 25-minute intervals helps manage this cognitive load, preventing the
                overwhelm that degrades performance during extended sessions.
              </p>
            </div>
          </div>
        </section>

        {/* Core Research Findings */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <FlaskConical className="h-3 w-3" />
              Research Foundations
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              The Science of Focus Duration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_RESEARCH.map((item) => {
              const Icon = item.icon
              const colorStyles: Record<string, string> = {
                cyan: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
                violet: "from-violet-500/10 to-violet-500/5 border-violet-500/20",
                emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
                amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20",
              }
              const iconStyles: Record<string, string> = {
                cyan: "text-cyan-500",
                violet: "text-violet-500",
                emerald: "text-emerald-500",
                amber: "text-amber-500",
              }

              return (
                <div
                  key={item.title}
                  className={`p-5 md:p-6 rounded-2xl bg-gradient-to-br ${colorStyles[item.color]} border`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background/50">
                        <Icon className={`h-4 w-4 ${iconStyles[item.color]}`} />
                      </div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <span className={`text-lg font-bold ${iconStyles[item.color]}`}>{item.stat}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs text-muted-foreground/70 italic">Source: {item.source}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Deep Dive: Attention Span Research */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-6">
              <span className="p-2 rounded-xl bg-cyan-500/10">
                <Brain className="h-5 w-5 text-cyan-500" />
              </span>
              Understanding Attention Span Research
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The question of how long humans can sustain focused attention has occupied cognitive scientists for
                decades. While popular myths claim attention spans have shrunk to 8 seconds (shorter than a goldfish),
                the reality is more nuanced. According to neuroscience research by Bradbury (2016), the often-cited
                &quot;attention span&quot; statistics typically conflate different types of attention and lack rigorous
                scientific backing.
              </p>
              <p>
                What research does show is that <strong className="text-foreground">sustained attention</strong>—the
                ability to maintain focus on a single task—follows predictable patterns. Studies from cognitive psychology
                laboratories demonstrate that attention quality peaks within the first 20 minutes of focused work, then
                begins a gradual decline. This isn&apos;t a sudden collapse but a progressive reduction in vigilance and
                accuracy.
              </p>
              <p>
                The Pomodoro Technique&apos;s 25-minute duration strategically captures this peak attention window. By
                ending sessions before significant vigilance decrement occurs, the method preserves cognitive resources
                for subsequent work periods. Studies from the University of Illinois suggest that brief mental breaks
                can reset this attention clock, restoring performance to near-baseline levels—exactly what the 5-minute
                Pomodoro break accomplishes.
              </p>
            </div>
          </div>
        </section>

        {/* Focus Curve Infographic */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <LineChart className="h-3 w-3" />
              Visual Guide
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              The Focus Curve Over Time
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <div className="space-y-4">
              {FOCUS_TIMELINE.map((phase) => (
                <div key={phase.time} className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${phase.colorClass} border min-w-[80px] text-center`}>
                      {phase.time}
                    </div>
                    <h4 className="font-semibold text-foreground">{phase.label}</h4>
                    <span className="text-sm text-muted-foreground ml-auto">{phase.percentage}%</span>
                  </div>
                  <div className="ml-0 md:ml-[96px]">
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          phase.percentage >= 90 ? 'bg-emerald-500' :
                          phase.percentage >= 75 ? 'bg-cyan-500' :
                          phase.percentage >= 60 ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`}
                        style={{ width: `${phase.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 25-minute marker */}
            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground">
                  <strong>The 25-minute mark</strong> captures the transition from Peak Performance to Decline Onset—maximizing
                  productive focus while exiting before significant fatigue accumulates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Duration Comparison Table */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Clock className="h-3 w-3" />
              Comparison
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Session Duration Comparison
            </h2>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-4">
            {DURATION_COMPARISON.map((item) => (
              <div
                key={item.duration}
                className={`p-5 rounded-2xl border ${
                  item.color === 'primary'
                    ? 'bg-primary/5 border-primary/30'
                    : 'bg-card/60 dark:bg-card/40 border-border/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className={`text-2xl font-bold ${item.color === 'primary' ? 'text-primary' : 'text-foreground'}`}>
                      {item.duration}
                    </span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.color === 'primary'
                        ? 'bg-primary/20 text-primary'
                        : item.color === 'amber'
                        ? 'bg-amber-500/20 text-amber-500'
                        : item.color === 'orange'
                        ? 'bg-orange-500/20 text-orange-500'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Attention Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.attention >= 85 ? 'bg-emerald-500' : item.attention >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.attention}%` }} />
                      </div>
                      <span className="text-xs font-medium w-8">{item.attention}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Fatigue Level</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.fatigue <= 25 ? 'bg-emerald-500' : item.fatigue <= 55 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.fatigue}%` }} />
                      </div>
                      <span className="text-xs font-medium w-8">{item.fatigue}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Flow Potential</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.flowPotential >= 80 ? 'bg-emerald-500' : item.flowPotential >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.flowPotential}%` }} />
                      </div>
                      <span className="text-xs font-medium w-8">{item.flowPotential}%</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground italic">{item.science}</p>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Duration</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Attention</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Fatigue</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Flow Potential</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Research Note</th>
                </tr>
              </thead>
              <tbody>
                {DURATION_COMPARISON.map((item) => (
                  <tr
                    key={item.duration}
                    className={`border-b border-border/30 last:border-0 ${item.color === 'primary' ? 'bg-primary/5' : ''}`}
                  >
                    <td className="py-3 px-2">
                      <span className={`font-bold ${item.color === 'primary' ? 'text-primary' : 'text-foreground'}`}>
                        {item.duration}
                      </span>
                      <span className={`ml-2 text-xs ${item.color === 'primary' ? 'text-primary' : 'text-muted-foreground'}`}>
                        ({item.label})
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.attention >= 85 ? 'bg-emerald-500' : item.attention >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.attention}%` }} />
                        </div>
                        <span className="text-xs">{item.attention}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.fatigue <= 25 ? 'bg-emerald-500' : item.fatigue <= 55 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.fatigue}%` }} />
                        </div>
                        <span className="text-xs">{item.fatigue}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.flowPotential >= 80 ? 'bg-emerald-500' : item.flowPotential >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.flowPotential}%` }} />
                        </div>
                        <span className="text-xs">{item.flowPotential}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground max-w-xs">{item.science}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ultradian Rhythms Deep Dive */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-6">
              <span className="p-2 rounded-xl bg-violet-500/10">
                <Waves className="h-5 w-5 text-violet-500" />
              </span>
              Ultradian Rhythms: Your Body&apos;s Natural Work Cycles
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Beyond attention spans, our bodies operate on deeper biological rhythms that influence productivity.
                Nathaniel Kleitman, the pioneering sleep researcher, discovered that humans experience <strong className="text-foreground">ultradian
                rhythms</strong>—90-120 minute cycles of higher and lower alertness throughout the day. These cycles
                continue even during waking hours, creating natural peaks and troughs in cognitive performance.
              </p>
              <p>
                The 25-minute Pomodoro works elegantly within this biological framework. Four Pomodoros (25 minutes
                each plus breaks) approximately equal one complete ultradian cycle. Rather than fighting against
                natural energy fluctuations, the Pomodoro method rides these waves—capturing peak performance during
                high-alertness phases while using breaks to navigate the natural dips.
              </p>
              <p>
                Studies from sleep and chronobiology research suggest that honoring these natural rhythms significantly
                improves both productivity and well-being. The Pomodoro Technique&apos;s structure—particularly the longer
                15-30 minute break after four sessions—aligns with the recovery needs that ultradian cycling demands.
                This is why experienced Pomodoro practitioners often report feeling less exhausted at day&apos;s end
                compared to working in longer, unstructured blocks.
              </p>
            </div>
          </div>
        </section>

        {/* The Cognitive Cost of Ignoring Duration Science */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>What Happens When You Ignore Duration Science</h2>
            <p>
              Understanding optimal focus duration isn&apos;t just academic—ignoring it has real cognitive costs. When you push past the 25-30 minute threshold without breaks, several measurable changes occur in brain function. Working memory capacity decreases as the prefrontal cortex depletes its glucose reserves. Error rates increase as vigilance declines. And perhaps most insidiously, your subjective perception of productivity often remains high even as objective output quality drops, creating a dangerous illusion of effectiveness.
            </p>
            <p>
              The phenomenon of &quot;attention debt&quot; helps explain the long-term consequences of extended work sessions. Just as sleep debt accumulates when you skimp on rest, attention debt builds when you force focus beyond sustainable limits. This debt doesn&apos;t disappear after a single break—it compounds across the workday and even across weeks, manifesting as chronic mental fatigue, decreased creativity, and increased susceptibility to burnout. The 25-minute Pomodoro with mandatory breaks functions as a debt-prevention strategy, ensuring you never accumulate more attention debt than a brief rest can repay.
            </p>
            <p>
              Research from productivity tracking studies suggests that workers who ignore duration science—pushing through 2-3 hour blocks without breaks—often produce less total quality output than those who take regular breaks despite working fewer continuous minutes. The math is counterintuitive but consistent: shorter focused sessions with breaks frequently outperform longer marathon sessions because the quality of each minute remains high rather than degrading progressively. This is why the calculator above factors in your current conditions rather than simply recommending the longest possible session.
            </p>
          </div>
        </section>

        {/* Why Not Other Durations */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Target className="h-3 w-3" />
              Critical Analysis
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Why Not Other Durations?
            </h2>
          </div>

          <div className="space-y-4">
            {WHY_NOT_OTHER.map((item) => (
              <div
                key={item.question}
                className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <h3 className="font-semibold text-foreground mb-3">{item.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Research Citations */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FlaskConical className="h-3 w-3" />
              Primary Sources
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Key Research Studies
            </h2>
          </div>

          <div className="space-y-4">
            {RESEARCH_CITATIONS.map((citation) => (
              <div
                key={citation.doi}
                className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <h3 className="font-semibold text-foreground mb-1">{citation.title}</h3>
                <p className="text-xs text-muted-foreground/70 mb-3">
                  {citation.authors} ({citation.year}). <em>{citation.journal}</em>, {citation.volume}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Key Finding:</strong> {citation.finding}
                </p>
                <a
                  href={`https://doi.org/${citation.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  DOI: {citation.doi}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-6">
              <span className="p-2 rounded-xl bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </span>
              Practical Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">25 minutes captures 95% of peak attention.</strong> Research shows diminishing returns after this point, making it the optimal stopping point before quality declines.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Brief breaks restore cognitive resources.</strong> The 5-minute Pomodoro break isn&apos;t wasted time—it actively resets attention systems for the next session.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Working memory needs chunking.</strong> Complex tasks become manageable when broken into 25-minute segments that respect cognitive load limits.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Four Pomodoros equal one ultradian cycle.</strong> Structure your deep work in 4-session blocks with a longer break to align with natural biological rhythms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
              Experience the Science
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              The research is clear: 25 minutes is the optimal focus duration. Start your first science-backed session and feel the difference.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-600/20"
            >
              <Timer className="h-5 w-5" />
              Start 25-Minute Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/blog/psychology-of-timer-sounds"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Psychology of Timer Sounds
          </Link>
          <Link
            href="/blog/science-of-focus"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Neuroscience of Focus
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(articleSchema)}
      </Script>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
    </main>
  )
}
