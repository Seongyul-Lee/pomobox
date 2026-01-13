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
  Moon,
  Sun,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  Coffee,
  ThermometerSnowflake,
  BookOpen,
  TrendingDown,
  Target,
  Shield,
  Lightbulb,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sleep and Productivity: Why Sleeping Less Means Getting Less Done | Pomobox",
  description:
    "Discover why cutting sleep destroys productivity. Learn the cognitive science of sleep deprivation, optimal sleep duration, sleep hygiene practices, and strategic power napping.",
  keywords: [
    "sleep productivity",
    "sleep deprivation focus",
    "optimal sleep",
    "sleep hygiene",
    "power nap",
    "cognitive function sleep",
    "sleep schedule",
    "productivity sleep",
    "deep work sleep",
    "sleep quality",
    "circadian rhythm",
    "sleep debt",
    "REM sleep",
    "sleep optimization",
    "work performance sleep",
  ],
  openGraph: {
    title: "Sleep and Productivity: Why Sleeping Less Means Getting Less Done | Pomobox",
    description:
      "The science of sleep deprivation and evidence-based strategies for better rest and peak performance.",
    type: "article",
    publishedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/sleep-and-productivity" },
}

// FAQ 데이터
const FAQ_DATA = [
  {
    question: "Can I 'catch up' on sleep during weekends?",
    answer:
      "Partially. While you can reduce acute sleep debt with extra sleep, you can't fully reverse the cognitive deficits from chronic deprivation. Weekend recovery sleep helps, but it disrupts your circadian rhythm, making Monday harder. Consistent sleep schedules work better than the binge-recovery cycle.",
  },
  {
    question: "Is 6 hours of sleep really not enough?",
    answer:
      "For 97% of people, no. While a tiny genetic minority (1-3%) can thrive on 6 hours, most people who think they're fine on 6 hours have simply adapted to feeling suboptimal. Studies show 6-hour sleepers perform like someone with a 0.05% blood alcohol level—legally impaired in many contexts.",
  },
  {
    question: "What if I can't fall asleep even when tired?",
    answer:
      "This often indicates hyperarousal from stress or poor sleep habits. Solutions: 1) Stop screens 1 hour before bed, 2) Keep bedroom cool (65-68°F/18-20°C), 3) Try 'cognitive shuffling' (random word visualization), 4) If you can't sleep after 20 min, leave bed and return when sleepy. If persistent, consult a sleep specialist.",
  },
  {
    question: "Are sleep apps and trackers accurate?",
    answer:
      "Consumer sleep trackers are reasonably accurate for total sleep time and wake periods, but less reliable for sleep stages (REM, deep sleep). Use them for trends rather than precise data. More important than tracking is following proven sleep hygiene practices consistently.",
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

// Sleep hygiene checklist
const SLEEP_HYGIENE = [
  {
    category: "Environment",
    icon: ThermometerSnowflake,
    color: "blue",
    items: [
      { do: "Keep room at 65-68°F (18-20°C)", dont: "Sleep in warm room" },
      { do: "Complete darkness or sleep mask", dont: "Leave lights or screens on" },
      { do: "White noise or silence", dont: "Inconsistent noise levels" },
      { do: "Reserve bed for sleep only", dont: "Work or watch TV in bed" },
    ],
  },
  {
    category: "Pre-Sleep Routine",
    icon: Moon,
    color: "violet",
    items: [
      { do: "Wind down 30-60 min before", dont: "Stimulating activities before bed" },
      { do: "Dim lights after sunset", dont: "Bright screens in the hour before" },
      { do: "Same bedtime ±30 min daily", dont: "Wildly varying sleep times" },
      { do: "Light reading or stretching", dont: "Intense exercise 2h before bed" },
    ],
  },
  {
    category: "Substances",
    icon: Coffee,
    color: "amber",
    items: [
      { do: "Stop caffeine by 2pm", dont: "Coffee after noon (or 6h before bed)" },
      { do: "Limit alcohol (disrupts REM)", dont: "Nightcap for sleep (backfires)" },
      { do: "Light dinner 2-3h before bed", dont: "Heavy meals close to bedtime" },
      { do: "Stay hydrated (but not right before)", dont: "Excessive fluids causing wake-ups" },
    ],
  },
]

export default function SleepAndProductivityPage() {
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
            <li className="text-foreground font-medium">Sleep &amp; Productivity</li>
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Moon className="h-3 w-3" />
              Sleep Science
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              14 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sleep and Productivity: Why Sleeping Less Means Getting Less Done
          </h1>
          <p className="text-lg text-muted-foreground">
            The paradox solved—why cutting sleep to get more done actually destroys your output,
            and evidence-based strategies to optimize both.
          </p>
        </header>

        {/* Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">7-9h</div>
              <div className="text-xs md:text-sm text-muted-foreground">Optimal Sleep Duration</div>
            </div>
            <div className="text-center border-x border-indigo-500/20">
              <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400">40%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Focus Drop on 6h Sleep</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">97%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Need 7+ Hours</div>
            </div>
          </div>
        </section>

        {/* 문제-해결형 섹션 1: 문제 상황 묘사 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-rose-500" />
            The Problem: The Sleep-Sacrifice Trap
          </h2>
          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
            <blockquote className="text-lg font-medium text-foreground mb-4 italic">
              &quot;I&apos;ll just sleep less and get more done. Who needs 8 hours anyway?&quot;
            </blockquote>
            <p className="text-muted-foreground mb-4">
              This is one of the most common—and costly—productivity traps. The logic seems sound:
              reduce sleep from 8 hours to 6, and you gain 14 extra hours per week. But here&apos;s
              what actually happens:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-semibold text-foreground mb-2">What You Expect</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 2 extra hours per day</li>
                  <li>• Same productivity per hour</li>
                  <li>• Net gain: 14 hours/week</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">What Actually Happens</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 40% reduction in cognitive performance</li>
                  <li>• Slower work, more errors</li>
                  <li>• Net loss: effective hours decrease</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 문제-해결형 섹션 2: 왜 발생하는가 (원인) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-violet-500" />
            Why This Happens: The Cognitive Cost of Sleep Debt
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p>
              Sleep isn&apos;t just rest—it&apos;s when your brain performs critical maintenance.
              Cutting sleep is like skipping oil changes to save time driving. It works briefly,
              then the engine fails.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <TrendingDown className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Prefrontal Cortex Impairment</h3>
                  <p className="text-sm text-muted-foreground">
                    The prefrontal cortex—responsible for focus, decision-making, and impulse control—is
                    the first area affected by sleep deprivation. After 17 hours awake, cognitive
                    performance equals someone with 0.05% blood alcohol. After 24 hours, it&apos;s equivalent
                    to 0.10%—legally drunk.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Zap className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Adenosine Buildup</h3>
                  <p className="text-sm text-muted-foreground">
                    While awake, your brain accumulates adenosine—a chemical that creates sleep pressure.
                    Only sleep clears it. Caffeine blocks adenosine receptors temporarily, but the
                    adenosine keeps building. When caffeine wears off, you crash harder.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Brain className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Memory Consolidation Failure</h3>
                  <p className="text-sm text-muted-foreground">
                    During deep sleep, your brain transfers information from short-term to long-term
                    memory. Skip this, and you literally can&apos;t retain what you learned. Studying
                    late instead of sleeping actually reduces retention.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">The Perception Gap</h3>
                  <p className="text-sm text-muted-foreground">
                    The cruelest trick: sleep deprivation impairs your ability to recognize your own
                    impairment. You feel &quot;fine&quot; while performing terribly. This is why sleep-deprived
                    people keep making the same mistake—they genuinely don&apos;t know they&apos;re impaired.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual: Sleep Deprivation Effects */}
          <div className="mt-6 p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
            <h4 className="font-semibold text-foreground mb-4">Cumulative Sleep Debt Effects</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-muted-foreground">6h × 7 days</div>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-amber-500" />
                </div>
                <div className="w-24 text-sm text-amber-600 dark:text-amber-400">Mild impairment</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-muted-foreground">6h × 14 days</div>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-orange-500" />
                </div>
                <div className="w-24 text-sm text-orange-600 dark:text-orange-400">Like 24h no sleep</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-muted-foreground">4h × 7 days</div>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-rose-500" />
                </div>
                <div className="w-24 text-sm text-rose-600 dark:text-rose-400">Severe deficit</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Sleep debt accumulates. Two weeks of 6-hour nights equals the cognitive impairment of
              pulling an all-nighter—except you don&apos;t realize it.
            </p>
          </div>
        </section>

        {/* 문제-해결형 섹션 3: 해결 전략 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-emerald-500" />
            The Solution: Sleep Optimization Strategies
          </h2>

          {/* Strategy 1: Optimal Sleep Duration */}
          <div className="mb-6 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-500" />
              Find Your Optimal Sleep Duration
            </h3>
            <p className="text-muted-foreground mb-4">
              While 7-9 hours is the range for most adults, your personal optimum varies. Here&apos;s how
              to find it:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">The Vacation Test</h4>
                <p className="text-sm text-muted-foreground">
                  During vacation (after 3+ days), sleep without an alarm. After initial catch-up,
                  note your natural sleep duration. This is your biological need.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">Age-Based Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ages 18-25: 7-9 hours</li>
                  <li>• Ages 26-64: 7-9 hours</li>
                  <li>• Ages 65+: 7-8 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 2: Sleep Hygiene */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Moon className="h-5 w-5 text-violet-500" />
              Sleep Hygiene Checklist
            </h3>
            <div className="space-y-4">
              {SLEEP_HYGIENE.map((section) => {
                const Icon = section.icon
                const colorClasses = {
                  blue: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
                  violet: "bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400",
                  amber: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
                }[section.color]

                return (
                  <div key={section.category} className={`p-5 rounded-xl border ${colorClasses}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5" />
                      <h4 className="font-semibold text-foreground">{section.category}</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex-1">
                            <div className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item.do}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-2 text-sm">
                              <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item.dont}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Strategy 3: Power Napping */}
          <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sun className="h-5 w-5 text-indigo-500" />
              Strategic Power Napping
            </h3>
            <p className="text-muted-foreground mb-4">
              Power naps can offset (not replace) some sleep debt. NASA found that a 26-minute nap
              improved pilot performance by 34%. Here&apos;s how to nap effectively:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/50 text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">10-20 min</div>
                <div className="text-sm font-medium text-foreground mb-1">Power Nap</div>
                <div className="text-xs text-muted-foreground">
                  Alertness boost, no grogginess
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50 text-center">
                <div className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-1">1-3 PM</div>
                <div className="text-sm font-medium text-foreground mb-1">Optimal Window</div>
                <div className="text-xs text-muted-foreground">
                  Natural circadian dip
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50 text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-1">≤30 min</div>
                <div className="text-sm font-medium text-foreground mb-1">Max Duration</div>
                <div className="text-xs text-muted-foreground">
                  Avoid sleep inertia
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-indigo-500/10">
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                <strong>Coffee nap hack:</strong> Drink coffee, then nap for 20 minutes. You&apos;ll wake
                just as caffeine kicks in, feeling doubly refreshed.
              </p>
            </div>
          </div>
        </section>

        {/* 문제-해결형 섹션 4: 예방법 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            Prevention: Building Sustainable Sleep Habits
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">1. Protect Your Sleep Window</h3>
              <p className="text-sm text-muted-foreground">
                Schedule sleep like an important meeting. If you need to wake at 6 AM and need 8 hours,
                your non-negotiable bedtime is 10 PM. Work backwards from wake time, not forward from
                when you feel tired.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">2. Create a Wind-Down Ritual</h3>
              <p className="text-sm text-muted-foreground">
                Your brain needs transition time. Create a 30-60 minute pre-sleep routine: dim lights,
                stop work, no screens, light reading, stretching. Do this consistently and your brain
                will learn to associate it with sleep.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">3. Manage Technology</h3>
              <p className="text-sm text-muted-foreground">
                Blue light suppresses melatonin. Use night mode or blue-light blocking glasses after
                sunset. Better yet, stop all screens 1 hour before bed. Charge your phone outside the
                bedroom to remove temptation.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">4. Reframe Your Mindset</h3>
              <p className="text-sm text-muted-foreground">
                Sleeping 8 hours isn&apos;t losing 8 hours of productivity—it&apos;s investing 8 hours to make
                your 16 waking hours actually effective. Top performers protect sleep fiercely. It&apos;s
                not lazy; it&apos;s strategic.
              </p>
            </div>
          </div>

          {/* The Sleep-Pomodoro Connection */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary" />
              The Sleep-Pomodoro Connection
            </h3>
            <p className="text-muted-foreground mb-4">
              Good sleep and focused work create a virtuous cycle:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">Well-Rested Pomodoros</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Higher focus quality per session</li>
                  <li>• Fewer sessions needed for same output</li>
                  <li>• Better retention of learned material</li>
                  <li>• More energy for deep work blocks</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">Sleep-Deprived Pomodoros</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Scattered attention, frequent drift</li>
                  <li>• More sessions, less actual progress</li>
                  <li>• Poor encoding, forgotten work</li>
                  <li>• Exhaustion by afternoon</li>
                </ul>
              </div>
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
                <strong>Walker, M. (2017)</strong>. Why We Sleep: Unlocking the Power of Sleep and Dreams.
                Scribner. Comprehensive overview of sleep science and its impact on performance.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Van Dongen, H. P. et al. (2003)</strong>. The cumulative cost of additional
                wakefulness. Sleep. Classic study on sleep debt accumulation.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Rosekind, M. R. et al. (1995)</strong>. NASA nap study. Alertness management:
                strategic naps in operational settings. 26-minute nap effectiveness data.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-foreground">
                <strong>Williamson, A. M. &amp; Feyer, A. M. (2000)</strong>. Moderate sleep deprivation
                produces impairments equivalent to legally prescribed levels of alcohol intoxication.
                Occupational and Environmental Medicine.
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
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Make Sleep Your Productivity Superpower
            </h2>
            <p className="text-muted-foreground mb-4">
              Tonight, commit to 7+ hours. Tomorrow, notice the difference in your Pomodoro sessions.
              Better sleep doesn&apos;t cost time—it multiplies it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Well-Rested Session
              </Link>
              <Link
                href="/blog/energy-management-not-time"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Energy Management
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
              href="/blog/science-of-breaks"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                The Science of Breaks
              </h3>
              <p className="text-sm text-muted-foreground">
                Why strategic rest during work improves output.
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
                Managing energy for sustainable peak performance.
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
                Maximize the quality of your focused hours.
              </p>
            </Link>
            <Link
              href="/blog/caffeine-and-focus"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Caffeine &amp; Focus
              </h3>
              <p className="text-sm text-muted-foreground">
                How caffeine interacts with sleep and productivity.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
