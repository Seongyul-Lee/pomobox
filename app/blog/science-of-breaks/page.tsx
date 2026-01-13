import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Brain,
  Home,
  ChevronRight,
  Timer,
  ArrowRight,
  Coffee,
  TreePine,
  Moon,
  Footprints,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  Activity,
  Pause,
  RefreshCw,
  Zap,
  Target,
  BookOpen,
} from "lucide-react"

export const metadata: Metadata = {
  title: "The Science of Breaks: Why Rest Makes You More Productive | Pomobox",
  description:
    "Discover why strategic breaks boost productivity. Learn about the Default Mode Network, micro-breaks, the science behind rest intervals, and how to overcome rest guilt.",
  keywords: [
    "science of breaks",
    "rest productivity",
    "micro breaks",
    "default mode network",
    "ultradian rhythm",
    "strategic rest",
    "break guilt",
    "pomodoro breaks",
    "work rest balance",
    "cognitive recovery",
    "attention restoration",
    "productivity science",
    "brain rest",
    "focus recovery",
    "rest intervals",
  ],
  openGraph: {
    title: "The Science of Breaks: Why Rest Makes You More Productive | Pomobox",
    description:
      "Discover the neuroscience behind strategic breaks and why resting actually improves your work output.",
    type: "article",
    publishedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/science-of-breaks" },
}

// Q&A 확장형: 핵심 질문들
const CORE_QUESTIONS = [
  {
    id: "main",
    question: "Doesn't taking breaks mean I'm getting less done?",
    answer:
      "Counterintuitively, no. Research consistently shows that strategic breaks improve total output. A study by Draugiem Group found that the most productive 10% of workers take a 17-minute break for every 52 minutes of work. The key word is 'strategic'—random breaks don't help, but intentional rest periods dramatically boost focus and creativity.",
    isMain: true,
  },
  {
    id: "dmn",
    question: "What happens in my brain during a break?",
    answer:
      "During rest, your brain activates the Default Mode Network (DMN)—a set of interconnected regions that become active when you're not focused on external tasks. The DMN is crucial for memory consolidation, creative insight, and self-reflection. When you're constantly 'on,' you suppress this network, missing its benefits.",
  },
  {
    id: "frequency",
    question: "How often should I take breaks?",
    answer:
      "Research on ultradian rhythms suggests our brains work in 90-120 minute cycles. The Pomodoro Technique uses 25-minute work blocks with 5-minute breaks (and a 15-30 minute break every 4 cycles). Studies show even micro-breaks of 40 seconds can restore mental acuity. The optimal frequency depends on task complexity—harder tasks benefit from more frequent breaks.",
  },
  {
    id: "guilt",
    question: "Why do I feel guilty when I take breaks?",
    answer:
      "Break guilt stems from hustle culture messaging that equates constant busyness with worth. However, this is a cognitive distortion. Elite performers in music, sports, and chess actually practice less than amateurs—but with higher intensity and deliberate rest. Rest isn't the opposite of productivity; it's a component of it.",
  },
  {
    id: "types",
    question: "Does the type of break matter?",
    answer:
      "Absolutely. Not all breaks are equal. Checking social media can actually increase fatigue (it's cognitively demanding). The best breaks involve: 1) Disconnection from screens, 2) Physical movement, 3) Nature exposure, or 4) Social interaction. A 5-minute walk outdoors is dramatically more restorative than 5 minutes on Twitter.",
  },
  {
    id: "timing",
    question: "When is the best time to take a break?",
    answer:
      "Take breaks BEFORE you're exhausted, not after. Signs you need a break: re-reading the same paragraph, making careless errors, mind wandering repeatedly. The Pomodoro timer works because it forces breaks at regular intervals—preventing the 'just a few more minutes' trap that leads to burnout.",
  },
]

// FAQ 섹션 (Q&A 확장형의 마무리)
const FAQ_DATA = [
  {
    question: "Can I skip breaks if I'm 'in the zone'?",
    answer:
      "Flow state is valuable, but unsustainable for hours. Research shows cognitive performance degrades after 90 minutes regardless of subjective experience. If you're truly in flow, take a shorter break (2-3 minutes) to maintain momentum, but don't skip entirely. The break will actually help you re-enter flow faster.",
  },
  {
    question: "What if my boss thinks breaks mean I'm not working?",
    answer:
      "Share the research: employees who take regular breaks are 13% more productive than those who push through (Stanford study). Frame breaks as 'cognitive maintenance.' Many forward-thinking companies now mandate break times. If your workplace culture punishes rest, consider whether it's sustainable long-term.",
  },
  {
    question: "Are naps during work actually beneficial?",
    answer:
      "A 10-26 minute 'power nap' can boost alertness, memory, and performance. NASA found that a 26-minute nap improved pilot performance by 34% and alertness by 54%. Key: keep it under 30 minutes to avoid sleep inertia (grogginess). The ideal nap time is between 1-3 PM when circadian dips occur.",
  },
  {
    question: "How do I know if I'm taking TOO many breaks?",
    answer:
      "If you're taking breaks to avoid work rather than to recover from it, that's procrastination. Signs of excessive breaks: frequent start/stop cycles, difficulty building momentum, using breaks as escape from challenging tasks. True rest feels restorative; avoidance breaks often leave you feeling more drained.",
  },
  {
    question: "Do breaks help with creative work?",
    answer:
      "Especially! The 'incubation effect' is well-documented: stepping away from a problem allows unconscious processing. Many creative breakthroughs happen during walks, showers, or rest periods. The key is to engage with the problem first, then disengage—your brain continues working even when you're not consciously focusing.",
  },
]

// JSON-LD 스키마 - 정적 데이터, 사용자 입력 없음, XSS 안전
const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...CORE_QUESTIONS, ...FAQ_DATA].map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
})

// Break types data
const BREAK_TYPES = [
  {
    name: "Micro-Break",
    duration: "40 sec - 2 min",
    icon: Pause,
    color: "emerald",
    activities: ["Stand and stretch", "Look out window (20-20-20 rule)", "Deep breathing"],
    effect: "Immediate attention reset",
  },
  {
    name: "Short Break",
    duration: "5-10 min",
    icon: Coffee,
    color: "blue",
    activities: ["Walk to get water", "Light stretching", "Brief chat with colleague"],
    effect: "Mental recovery between tasks",
  },
  {
    name: "Long Break",
    duration: "15-30 min",
    icon: Footprints,
    color: "violet",
    activities: ["Walk outside", "Healthy snack", "Casual reading"],
    effect: "Full cognitive reset",
  },
  {
    name: "Power Nap",
    duration: "10-26 min",
    icon: Moon,
    color: "indigo",
    activities: ["Dark, quiet space", "Set alarm", "Avoid caffeine 6hrs before"],
    effect: "Alertness and memory boost",
  },
]

export default function ScienceOfBreaksPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* FAQ Schema JSON-LD - static data, no user input, XSS-safe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/learn" className="hover:text-foreground transition-colors">
                Learn
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium">Science of Breaks</li>
          </ol>
        </nav>

        {/* Back Link */}
        <nav className="mb-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Hub
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Brain className="h-3 w-3" />
              Cognitive Science
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              12 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Science of Breaks: Why Rest Makes You More Productive
          </h1>
          <p className="text-lg text-muted-foreground">
            Answers to your questions about strategic rest—backed by neuroscience and productivity research.
          </p>
        </header>

        {/* Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">52:17</div>
              <div className="text-xs md:text-sm text-muted-foreground">Optimal Work:Break Ratio</div>
            </div>
            <div className="text-center border-x border-emerald-500/20">
              <div className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-400">40sec</div>
              <div className="text-xs md:text-sm text-muted-foreground">Min Effective Break</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">34%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Nap Performance Boost</div>
            </div>
          </div>
        </section>

        {/* Q&A 확장형: 핵심 질문 (Main Question) */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-amber-500/5 border-2 border-amber-500/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-amber-500/10 flex-shrink-0">
                <HelpCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">
                  {CORE_QUESTIONS[0].question}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {CORE_QUESTIONS[0].answer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Q&A 확장형: 관련 질문들 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            Related Questions
          </h2>
          <div className="space-y-4">
            {CORE_QUESTIONS.slice(1).map((item) => (
              <div key={item.id} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  {item.question}
                </h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 심화 설명: Default Mode Network */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-violet-500" />
            Deep Dive: The Default Mode Network
          </h2>
          <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
            <p className="text-muted-foreground mb-6">
              The Default Mode Network (DMN) is your brain&apos;s &quot;idle mode&quot; circuit—but it&apos;s far
              from idle. When you stop focusing on external tasks, the DMN activates and performs
              critical functions.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <RefreshCw className="h-5 w-5 text-violet-500 mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Memory Consolidation</h4>
                <p className="text-xs text-muted-foreground">
                  Transfers information from short-term to long-term memory. Learning requires rest.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <Zap className="h-5 w-5 text-violet-500 mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Creative Insight</h4>
                <p className="text-xs text-muted-foreground">
                  Makes novel connections between unrelated ideas. &quot;Aha moments&quot; often occur during rest.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <Target className="h-5 w-5 text-violet-500 mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Self-Reflection</h4>
                <p className="text-xs text-muted-foreground">
                  Processes past experiences and plans for the future. Essential for decision-making.
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-violet-500/10">
              <p className="text-sm text-violet-700 dark:text-violet-300">
                <strong>Key insight:</strong> Constant focus suppresses the DMN. By never resting,
                you&apos;re blocking your brain&apos;s ability to consolidate learning, generate insights,
                and maintain psychological health.
              </p>
            </div>
          </div>
        </section>

        {/* Break Types - Visual Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Activity className="h-6 w-6 text-emerald-500" />
            Types of Effective Breaks
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {BREAK_TYPES.map((breakType) => {
              const Icon = breakType.icon
              const colorClasses = {
                emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
                violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
                indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
              }[breakType.color]

              return (
                <div key={breakType.name} className={`p-5 rounded-xl border ${colorClasses}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <h3 className="font-semibold text-foreground">{breakType.name}</h3>
                      <span className="text-xs text-muted-foreground">{breakType.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {breakType.activities.map((activity, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs font-medium opacity-80">
                    Effect: {breakType.effect}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Nature and Breaks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <TreePine className="h-6 w-6 text-green-500" />
            The Nature Premium
          </h2>
          <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
            <p className="text-muted-foreground mb-4">
              Attention Restoration Theory (Kaplan, 1995) explains why nature breaks are especially
              effective. Natural environments allow &quot;soft fascination&quot;—gentle engagement that
              restores directed attention without demanding effort.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-semibold text-foreground mb-2">Indoor Break</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Partial attention recovery</li>
                  <li>• May still have work cues visible</li>
                  <li>• Limited sensory change</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Nature Break ✓</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Full attention restoration</li>
                  <li>• Complete context shift</li>
                  <li>• Multi-sensory engagement</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-green-700 dark:text-green-400">
              <strong>Pro tip:</strong> Even looking at nature photos or having plants nearby provides
              some benefit. A 40-second view of a green roof improved focus by 6% in one study.
            </p>
          </div>
        </section>

        {/* Overcoming Break Guilt */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <RefreshCw className="h-6 w-6 text-rose-500" />
            Overcoming Break Guilt
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Reframe: Rest is Part of the Work</h3>
              <p className="text-sm text-muted-foreground">
                Athletes understand that rest days are when muscles grow. Knowledge workers need to
                adopt the same mindset. Your brain consolidates learning and generates insights during
                rest—it&apos;s not time off from productivity, it&apos;s part of the productivity process.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Track Your Output, Not Your Hours</h3>
              <p className="text-sm text-muted-foreground">
                If taking breaks makes you anxious, run an experiment. For one week, work without breaks.
                The next week, take regular breaks. Compare your actual output. Most people find they
                produce more with breaks—and the data overcomes the guilt.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Use Scheduled Breaks (Pomodoro)</h3>
              <p className="text-sm text-muted-foreground">
                The Pomodoro Technique removes guilt by making breaks mandatory and timed. You&apos;re not
                choosing to rest—you&apos;re following a system that&apos;s been proven effective. The timer
                gives you permission.
              </p>
            </div>
          </div>
        </section>

        {/* Pomodoro Connection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            The Pomodoro Break Structure
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-6">
              The Pomodoro Technique provides a scientifically-aligned break structure that removes
              decision fatigue and ensures regular recovery.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/50 text-center">
                <div className="text-2xl font-bold text-primary mb-1">25 min</div>
                <div className="text-sm font-medium text-foreground mb-1">Focus Block</div>
                <div className="text-xs text-muted-foreground">
                  Deep work without interruption
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50 text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">5 min</div>
                <div className="text-sm font-medium text-foreground mb-1">Short Break</div>
                <div className="text-xs text-muted-foreground">
                  Quick recovery between blocks
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50 text-center">
                <div className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-1">15-30 min</div>
                <div className="text-sm font-medium text-foreground mb-1">Long Break</div>
                <div className="text-xs text-muted-foreground">
                  Full reset every 4 cycles
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-primary/10">
              <p className="text-sm text-primary">
                <strong>Math:</strong> 4 Pomodoros = 100 min work + 35 min breaks = 2h 15min.
                This gives you 3.5 hours of focused work in a 4-hour morning.
              </p>
            </div>
          </div>
        </section>

        {/* Research References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-cyan-500" />
            Research References
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Draugiem Group (2014)</strong>. Internal productivity study using DeskTime tracking.
                Found 52:17 work-break ratio among top 10% performers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>NASA (1995)</strong>. Nap study with pilots. 26-minute naps improved performance
                34% and alertness 54%.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Kaplan, S. (1995)</strong>. &quot;The Restorative Benefits of Nature.&quot; Journal of
                Environmental Psychology. Foundation for Attention Restoration Theory.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Lee, K. et al. (2015)</strong>. &quot;40-second green roof views sustain attention.&quot;
                Journal of Environmental Psychology. Micro-break effectiveness study.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section - Q&A 확장형 마무리 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">More Questions Answered</h2>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Start Working Smarter, Not Longer
            </h2>
            <p className="text-muted-foreground mb-4">
              Use the Pomodoro Technique to build strategic breaks into your workflow. Your brain
              will thank you—and your output will prove it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Pomodoro Session
              </Link>
              <Link
                href="/blog/sleep-and-productivity"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Sleep &amp; Productivity
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/blog/deep-work-method"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Deep Work Method
              </h3>
              <p className="text-sm text-muted-foreground">
                Cal Newport&apos;s complete framework for focused productivity.
              </p>
            </Link>
            <Link
              href="/blog/sleep-and-productivity"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Sleep &amp; Productivity
              </h3>
              <p className="text-sm text-muted-foreground">
                How rest at night affects your daytime performance.
              </p>
            </Link>
            <Link
              href="/blog/social-media-brain"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Social Media &amp; Your Brain
              </h3>
              <p className="text-sm text-muted-foreground">
                Why scrolling isn&apos;t a real break for your brain.
              </p>
            </Link>
            <Link
              href="/blog/energy-management-not-time"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Energy Management
              </h3>
              <p className="text-sm text-muted-foreground">
                Managing energy, not just time, for peak performance.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
