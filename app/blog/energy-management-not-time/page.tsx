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
  Zap,
  Heart,
  Dumbbell,
  Sparkles,
  Scale,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  BookOpen,
  Sun,
  Moon,
  Battery,
  BatteryLow,
  BatteryFull,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Energy Management vs Time Management: Why Energy Matters More | Pomobox",
  description:
    "Discover why managing your energy is more effective than managing time. Learn about the four energy types, energy audit methods, and peak performance timing strategies.",
  keywords: [
    "energy management",
    "productivity energy",
    "peak performance timing",
    "time management vs energy",
    "four energy types",
    "Tony Schwartz energy project",
    "ultradian rhythm",
    "energy audit",
    "sustainable productivity",
    "physical energy",
    "emotional energy",
    "mental energy",
    "spiritual energy",
    "circadian rhythm productivity",
    "energy optimization",
  ],
  openGraph: {
    title: "Energy Management vs Time Management: Why Energy Matters More | Pomobox",
    description:
      "The paradigm shift from time management to energy management for sustainable peak performance.",
    type: "article",
    publishedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/energy-management-not-time" },
}

// FAQ 데이터
const FAQ_DATA = [
  {
    question: "What if I don't know my natural energy patterns?",
    answer:
      "Track your energy for one week. Every 2 hours, rate your energy 1-10. Note what you ate, how you slept, and what you did. Patterns will emerge—most people have 1-2 peak windows and 1-2 valleys. Schedule accordingly.",
  },
  {
    question: "Can I change my chronotype (night owl vs early bird)?",
    answer:
      "Marginally, but it's largely genetic. About 25% are natural morning types, 25% evening types, and 50% somewhere in between. You can shift your schedule by 1-2 hours with consistent light exposure and sleep timing, but fighting your biology completely is unsustainable.",
  },
  {
    question: "How do I manage energy when my schedule is out of my control?",
    answer:
      "Focus on what you CAN control: sleep quality, nutrition timing, micro-breaks, and task ordering within your constraints. Even if you can't choose when you work, you can often choose WHAT you work on during high/low energy periods.",
  },
  {
    question: "Isn't this just another productivity hack that doesn't work long-term?",
    answer:
      "Energy management differs because it works WITH your biology, not against it. Time management often asks you to push through fatigue. Energy management asks you to respect your body's rhythms. That's why it's sustainable—it doesn't require willpower, just alignment.",
  },
]

// JSON-LD 스키마 - 정적 데이터, 사용자 입력 없음, XSS 안전
const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
})

// 비교 테이블 데이터
const COMPARISON_DATA = [
  {
    aspect: "Core Assumption",
    time: "All hours are equal",
    energy: "Quality of hours varies",
  },
  {
    aspect: "Focus",
    time: "How much time do I have?",
    energy: "How much capacity do I have?",
  },
  {
    aspect: "Response to Fatigue",
    time: "Push through with willpower",
    energy: "Rest strategically to restore",
  },
  {
    aspect: "Scheduling Deep Work",
    time: "Whenever there's a free slot",
    energy: "During personal peak hours",
  },
  {
    aspect: "Break Strategy",
    time: "When time permits",
    energy: "Before energy depletes",
  },
  {
    aspect: "Sustainability",
    time: "Often leads to burnout",
    energy: "Designed for longevity",
  },
  {
    aspect: "Recovery View",
    time: "Lost time = lost productivity",
    energy: "Rest = investment in capacity",
  },
]

// 4가지 에너지 유형
const ENERGY_TYPES = [
  {
    name: "Physical Energy",
    icon: Dumbbell,
    color: "emerald",
    description: "The foundation of all energy. Body fuels everything else.",
    sources: ["Sleep (7-9 hours)", "Nutrition (stable blood sugar)", "Exercise (regular movement)", "Hydration"],
    drains: ["Poor sleep", "Skipped meals", "Sedentary behavior", "Dehydration"],
    renewals: ["20-min walk", "Healthy snack", "Power nap", "Stretching"],
  },
  {
    name: "Emotional Energy",
    icon: Heart,
    color: "rose",
    description: "The quality of your feelings affects work quality.",
    sources: ["Positive relationships", "Gratitude practice", "Enjoyable activities", "Sense of control"],
    drains: ["Conflict", "Anxiety", "Frustration", "Isolation"],
    renewals: ["Deep breathing", "Social connection", "Music", "Time in nature"],
  },
  {
    name: "Mental Energy",
    icon: Brain,
    color: "violet",
    description: "Focus, concentration, and cognitive capacity.",
    sources: ["Clear priorities", "Single-tasking", "Regular breaks", "Challenging work"],
    drains: ["Multitasking", "Continuous partial attention", "Decision fatigue", "Unclear goals"],
    renewals: ["Pomodoro breaks", "Meditation", "Change of scenery", "Creative play"],
  },
  {
    name: "Spiritual Energy",
    icon: Sparkles,
    color: "amber",
    description: "Sense of purpose and connection to values.",
    sources: ["Meaningful work", "Clear purpose", "Aligned values", "Contribution to others"],
    drains: ["Misaligned work", "Lack of purpose", "Values conflicts", "Isolation from impact"],
    renewals: ["Reflect on 'why'", "Connect to mission", "Help others", "Journaling"],
  },
]

export default function EnergyManagementPage() {
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
            <li className="text-foreground font-medium">Energy Management</li>
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Zap className="h-3 w-3" />
              Performance Science
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              14 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Energy Management vs Time Management: Why Energy Matters More
          </h1>
          <p className="text-lg text-muted-foreground">
            The paradigm shift that transforms productivity—work with your biology, not against it.
          </p>
        </header>

        {/* Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">4</div>
              <div className="text-xs md:text-sm text-muted-foreground">Energy Types</div>
            </div>
            <div className="text-center border-x border-amber-500/20">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">90-120</div>
              <div className="text-xs md:text-sm text-muted-foreground">Min Ultradian Cycle</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">2-4h</div>
              <div className="text-xs md:text-sm text-muted-foreground">Daily Peak Window</div>
            </div>
          </div>
        </section>

        {/* 비교 분석형 섹션 1: 개요 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Scale className="h-6 w-6 text-violet-500" />
            The Core Insight
          </h2>
          <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
            <blockquote className="text-lg font-medium text-foreground mb-4 italic">
              &quot;Manage your energy, not your time.&quot;
            </blockquote>
            <p className="text-sm text-muted-foreground mb-4">
              — Tony Schwartz &amp; Jim Loehr, The Power of Full Engagement
            </p>
            <p className="text-muted-foreground">
              Time management assumes all hours are equal. They&apos;re not. An hour at 9 AM after good sleep
              is worth three hours at 9 PM when exhausted. Energy management recognizes this reality
              and works with your biology rather than against it.
            </p>
          </div>
        </section>

        {/* 비교 분석형 섹션 2: 각 개념 설명 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Two Paradigms Compared</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Time Management */}
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-foreground">Time Management</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The traditional approach: optimize your schedule, batch tasks, eliminate time-wasters,
                and squeeze more into each day.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Good for: Scheduling, prioritization, deadlines</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Limitation: Ignores varying human capacity</span>
                </div>
              </div>
            </div>

            {/* Energy Management */}
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold text-foreground">Energy Management</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The evolved approach: align tasks with energy levels, protect recovery, and work
                with your biological rhythms.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Good for: Sustainable performance, preventing burnout</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Key insight: Quality of hours matters more than quantity</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 비교 분석형 섹션 3: 비교 테이블 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Scale className="h-6 w-6 text-primary" />
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-foreground bg-muted/50 rounded-tl-lg">
                    Aspect
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/5">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Management
                    </div>
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/5 rounded-tr-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Energy Management
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="p-4 text-sm font-medium text-foreground border-t border-border">
                      {row.aspect}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground border-t border-border">
                      {row.time}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground border-t border-border">
                      {row.energy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Four Energy Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Battery className="h-6 w-6 text-emerald-500" />
            The Four Energy Types
          </h2>
          <p className="text-muted-foreground mb-6">
            According to Tony Schwartz&apos;s research, human energy operates in four interconnected dimensions.
            Neglecting any one drains the others.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {ENERGY_TYPES.map((type) => {
              const Icon = type.icon
              const colorClasses = {
                emerald: "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
                rose: "bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400",
                violet: "bg-violet-500/5 border-violet-500/20 text-violet-600 dark:text-violet-400",
                amber: "bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400",
              }[type.color]

              return (
                <div key={type.name} className={`p-5 rounded-xl border ${colorClasses}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5" />
                    <h3 className="font-semibold text-foreground">{type.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-medium text-foreground mb-1">Sources</div>
                      <div className="flex flex-wrap gap-1">
                        {type.sources.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-xs bg-background/50 text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground mb-1">Drains</div>
                      <div className="flex flex-wrap gap-1">
                        {type.drains.map((d, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground mb-1">Quick Renewals</div>
                      <div className="flex flex-wrap gap-1">
                        {type.renewals.map((r, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Daily Energy Pattern */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            The Daily Energy Pattern
          </h2>
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-muted-foreground mb-6">
              Most people follow a predictable energy pattern. Understanding yours is the key to
              scheduling work strategically.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Sun className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">Morning Peak (9 AM - 12 PM)</span>
                    <div className="flex items-center gap-1">
                      <BatteryFull className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs text-emerald-500">High Energy</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best for: Deep work, complex problems, creative tasks, important decisions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <BatteryLow className="h-5 w-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">Afternoon Dip (1 PM - 3 PM)</span>
                    <div className="flex items-center gap-1">
                      <BatteryLow className="h-4 w-4 text-orange-500" />
                      <span className="text-xs text-orange-500">Low Energy</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best for: Administrative tasks, routine work, meetings, or a power nap
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Battery className="h-5 w-5 text-violet-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">Second Wind (3 PM - 6 PM)</span>
                    <div className="flex items-center gap-1">
                      <Battery className="h-4 w-4 text-violet-500" />
                      <span className="text-xs text-violet-500">Medium Energy</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best for: Collaborative work, communication, planning, lighter cognitive tasks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <Moon className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">Evening (6 PM+)</span>
                    <div className="flex items-center gap-1">
                      <BatteryLow className="h-4 w-4 text-indigo-500" />
                      <span className="text-xs text-indigo-500">Wind Down</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best for: Recovery, light reading, preparation for next day, relaxation
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> Night owls may have their peak shifted later. Track your own
              pattern for a week to identify your personal rhythm.
            </p>
          </div>
        </section>

        {/* 비교 분석형 섹션 4: 상황별 추천 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-emerald-500" />
            When to Use Each Approach
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Use Time Management When...</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  Coordinating with others (meetings, deadlines, handoffs)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  Protecting focus blocks on your calendar
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  Batching similar tasks for efficiency
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  Planning your week and prioritizing tasks
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Use Energy Management When...</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Deciding WHEN to schedule deep work
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Determining how long you can sustain focused work
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Planning recovery and rest periods
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Matching task difficulty to your current state
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-500" />
                Best Practice: Combine Both
              </h3>
              <p className="text-sm text-muted-foreground">
                Use time management to PROTECT your high-energy windows. Use energy management to
                decide WHAT to do in those windows. Schedule deep work during your peak, admin during
                your dip, and strategic rest before you crash.
              </p>
            </div>
          </div>
        </section>

        {/* Pomodoro Connection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            Pomodoro + Energy Management
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-6">
              The Pomodoro Technique naturally supports energy management by building in recovery
              cycles. Here&apos;s how to optimize it for your energy:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">During Peak Energy</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Chain 3-4 Pomodoros for deep work</li>
                  <li>• Tackle most cognitively demanding tasks</li>
                  <li>• Take active breaks (stretch, move)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">During Low Energy</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use shorter 15-20 min Pomodoros</li>
                  <li>• Handle email, admin, routine tasks</li>
                  <li>• Take longer recovery breaks</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-primary/10">
              <p className="text-sm text-primary">
                <strong>Key insight:</strong> The Pomodoro timer respects ultradian rhythms (90-120 min
                cycles). Four 25-min Pomodoros = ~2 hours = one natural energy cycle.
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
                <strong>Schwartz, T. &amp; Loehr, J. (2003)</strong>. The Power of Full Engagement: Managing
                Energy, Not Time. Free Press. Original source for the four energy types framework.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Pink, D. (2018)</strong>. When: The Scientific Secrets of Perfect Timing. Riverhead
                Books. Research on chronotypes and daily performance patterns.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Peretz, L. &amp; Lavie, P. (1985)</strong>. Ultradian rhythms in cognitive performance.
                Biological Psychology. Foundation for understanding 90-120 minute work cycles.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Roenneberg, T. (2012)</strong>. Internal Time: Chronotypes, Social Jet Lag, and Why
                You&apos;re So Tired. Harvard University Press. Chronobiology research.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
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
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Start Working With Your Energy
            </h2>
            <p className="text-muted-foreground mb-4">
              Tomorrow, schedule your most important work during your peak energy window. Notice the
              difference when you stop fighting your biology and start leveraging it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Peak-Energy Pomodoro
              </Link>
              <Link
                href="/blog/ergonomics-for-focus"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Ergonomics for Focus
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
              href="/blog/sleep-and-productivity"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Sleep &amp; Productivity
              </h3>
              <p className="text-sm text-muted-foreground">
                The foundation of physical energy: optimizing sleep.
              </p>
            </Link>
            <Link
              href="/blog/science-of-breaks"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                The Science of Breaks
              </h3>
              <p className="text-sm text-muted-foreground">
                Strategic recovery for sustained energy.
              </p>
            </Link>
            <Link
              href="/blog/deep-work-method"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Deep Work Method
              </h3>
              <p className="text-sm text-muted-foreground">
                Using your peak energy for focused work.
              </p>
            </Link>
            <Link
              href="/blog/ergonomics-for-focus"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Ergonomics for Focus
              </h3>
              <p className="text-sm text-muted-foreground">
                Physical setup that supports sustained energy.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
