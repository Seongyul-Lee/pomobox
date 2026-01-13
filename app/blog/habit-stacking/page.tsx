import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Layers,
  Home,
  ChevronRight,
  Target,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Timer,
  Link2,
  Compass,
  Zap,
  Calendar,
  ListChecks,
  Repeat,
  TrendingUp,
  Coffee,
  Sun,
  Moon,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Habit Stacking: Build Powerful Routines with the Compound Effect | Pomobox",
  description:
    "Learn the 4-step habit stacking method from Atomic Habits. Build powerful routines by linking new habits to existing ones. Includes worksheets, examples, and Pomodoro integration tips.",
  keywords: [
    "habit stacking",
    "atomic habits",
    "habit formation",
    "behavior design",
    "habit building",
    "routine building",
    "james clear",
    "compound effect",
    "habit triggers",
    "cue-routine-reward",
    "productivity habits",
    "daily routines",
  ],
  openGraph: {
    title: "Habit Stacking: Build Powerful Routines | Pomobox",
    description:
      "Master the 4-step habit stacking method. Learn to build unbreakable routines by linking new behaviors to existing habits.",
    type: "article",
    publishedTime: "2025-01-13",
    modifiedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/habit-stacking" },
}

// FAQ 데이터
const FAQ_DATA = [
  {
    question: "How many habits can I stack at once?",
    answer:
      "Start with just one new habit stacked onto an existing anchor. Once that becomes automatic (typically 2-4 weeks), you can add another. Trying to stack too many habits at once leads to overwhelm and failure. Think of it as building a chain—each link must be strong before adding the next.",
  },
  {
    question: "What if my anchor habit isn't consistent?",
    answer:
      "Choose a different anchor. Your anchor habit must be something you do reliably every day without thinking—like brushing your teeth, making coffee, or eating lunch. If your chosen anchor varies in timing or frequency, your new habit won't have a stable foundation.",
  },
  {
    question: "How long until a stacked habit becomes automatic?",
    answer:
      "Research by Phillippa Lally at UCL found habit formation takes 18 to 254 days, with an average of 66 days. Simple habits like drinking water stack faster; complex habits like exercise take longer. The key is consistency—missing one day doesn't reset progress, but missing multiple days does.",
  },
  {
    question: "Can I use Pomodoro sessions as habit anchors?",
    answer:
      "Absolutely! Pomodoro breaks are excellent anchors because they occur at predictable intervals throughout your workday. Stack habits like 'After my Pomodoro break starts, I will do 10 stretches' or 'After completing 4 Pomodoros, I will review my task list.'",
  },
  {
    question: "What's the difference between habit stacking and habit chaining?",
    answer:
      "They're similar concepts. Habit stacking (James Clear's term) focuses on attaching ONE new habit to ONE existing habit. Habit chaining extends this into longer sequences—a morning routine of 5-10 linked behaviors. Start with stacking, then expand into chains once each link is solid.",
  },
  {
    question: "Why do my stacked habits keep failing?",
    answer:
      "Common reasons: 1) The new habit is too ambitious—make it smaller. 2) The anchor isn't truly automatic. 3) Timing is inconsistent. 4) No visual cue or reminder. 5) Trying to change too much at once. Review the 4 steps and identify which principle you're violating.",
  },
]

// JSON-LD 스키마 - 정적 데이터만 사용, 사용자 입력 없음
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

// 습관 스택 예시 데이터
const HABIT_STACK_EXAMPLES = [
  {
    anchor: "After I pour my morning coffee",
    newHabit: "I will write down my top 3 priorities for the day",
    category: "Productivity",
    icon: Coffee,
  },
  {
    anchor: "After I sit down at my desk",
    newHabit: "I will start a 25-minute Pomodoro timer",
    category: "Focus",
    icon: Timer,
  },
  {
    anchor: "After my Pomodoro break begins",
    newHabit: "I will do 10 desk stretches",
    category: "Health",
    icon: Zap,
  },
  {
    anchor: "After I eat lunch",
    newHabit: "I will take a 10-minute walk outside",
    category: "Energy",
    icon: Sun,
  },
  {
    anchor: "After I close my laptop for the day",
    newHabit: "I will review what I accomplished today",
    category: "Reflection",
    icon: Moon,
  },
]

export default function HabitStackingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* FAQ Schema JSON-LD - 정적 데이터, 사용자 입력 없음 */}
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
            <li className="text-foreground font-medium">Habit Stacking</li>
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
              <Layers className="h-3 w-3" />
              Habit Building
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              12 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Habit Stacking: Build Powerful Routines with the Compound Effect
          </h1>
          <p className="text-lg text-muted-foreground">
            Master the science-backed 4-step method to build unbreakable habits by linking new
            behaviors to existing routines. No willpower required.
          </p>
        </header>

        {/* Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">66</div>
              <div className="text-xs md:text-sm text-muted-foreground">Days to Form Habit</div>
            </div>
            <div className="text-center border-x border-emerald-500/20">
              <div className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-400">40%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Actions are Habits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">4</div>
              <div className="text-xs md:text-sm text-muted-foreground">Steps to Stack</div>
            </div>
          </div>
        </section>

        {/* Prerequisites Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Compass className="h-6 w-6 text-amber-500" />
            Before You Start: Prerequisites
          </h2>
          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-muted-foreground mb-4">
              Habit stacking works because it leverages your brain&apos;s existing neural pathways.
              Before you begin, make sure you have:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-foreground">At Least 3 Solid Anchor Habits</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Daily behaviors you do automatically without thinking—brushing teeth, morning
                  coffee, lunch break, shutting down laptop.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-foreground">One Clear Goal Habit</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The specific behavior you want to build. Not &quot;be healthier&quot; but
                  &quot;do 10 pushups&quot; or &quot;write 100 words.&quot;
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-foreground">A Tracking System</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  A simple way to mark completion—calendar, app, or habit tracker. Visual
                  progress reinforces the behavior loop.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-foreground">Commitment to 30 Days</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Habit formation requires consistency. Commit to trying this method for at
                  least 30 days before evaluating results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Core Formula */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            The Habit Stacking Formula
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <div className="text-center mb-6">
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                &quot;After I <span className="text-primary">[CURRENT HABIT]</span>, I will <span className="text-emerald-500">[NEW HABIT]</span>.&quot;
              </p>
              <p className="text-sm text-muted-foreground">
                — James Clear, Atomic Habits
              </p>
            </div>
            <p className="text-muted-foreground">
              This simple formula is the foundation of habit stacking. By pairing a new behavior
              with an existing habit, you create a clear trigger that removes the need for
              motivation or willpower. Your brain already knows when and where to perform the
              anchor habit—you&apos;re just attaching something new to that existing sequence.
            </p>
          </div>
        </section>

        {/* 4-Step Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <ListChecks className="h-6 w-6 text-primary" />
            4-Step Habit Stacking Guide
          </h2>

          {/* Step 1 */}
          <div className="relative pl-12 mb-8">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">1</span>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Map Your Existing Habits
              </h3>
              <p className="text-muted-foreground mb-4">
                Write down everything you do daily without thinking. These are your potential
                anchor habits. Focus on behaviors that happen at consistent times and locations.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-background/50">
                  <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    Morning Anchors
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Wake up alarm goes off</li>
                    <li>• Brush teeth</li>
                    <li>• Make coffee/tea</li>
                    <li>• Check phone</li>
                    <li>• Eat breakfast</li>
                    <li>• Sit down at desk</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-background/50">
                  <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                    <Moon className="h-4 w-4 text-indigo-500" />
                    Evening Anchors
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Close laptop/end work</li>
                    <li>• Eat dinner</li>
                    <li>• Turn on TV</li>
                    <li>• Brush teeth</li>
                    <li>• Get into bed</li>
                    <li>• Turn off lights</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10">
                <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-sm mb-2">
                  Exercise: Habit Audit
                </h4>
                <p className="text-xs text-muted-foreground">
                  Spend one day noting every automatic action you take. You&apos;ll likely find
                  15-30 potential anchors. Circle the ones that are most consistent in timing
                  and location.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-12 mb-8">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
            </div>
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Choose the Right Anchor
              </h3>
              <p className="text-muted-foreground mb-4">
                Not all anchors are equal. The best anchor shares context with your new habit—
                same location, time of day, or energy level.
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-foreground">New Habit</th>
                      <th className="text-left py-2 px-3 font-medium text-emerald-600 dark:text-emerald-400">Good Anchor</th>
                      <th className="text-left py-2 px-3 font-medium text-rose-600 dark:text-rose-400">Bad Anchor</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3">10 pushups</td>
                      <td className="py-2 px-3">After I pour morning coffee</td>
                      <td className="py-2 px-3">After I check email</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3">Read 10 pages</td>
                      <td className="py-2 px-3">After I get into bed</td>
                      <td className="py-2 px-3">After lunch break</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3">Review daily goals</td>
                      <td className="py-2 px-3">After I sit at desk</td>
                      <td className="py-2 px-3">After I eat dinner</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">5-min meditation</td>
                      <td className="py-2 px-3">After I brush teeth (morning)</td>
                      <td className="py-2 px-3">After I eat lunch</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10">
                <h4 className="font-medium text-blue-600 dark:text-blue-400 text-sm mb-2">
                  Anchor Selection Criteria
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Same physical location as new habit</li>
                  <li>✓ Happens at consistent time daily</li>
                  <li>✓ Similar energy level required</li>
                  <li>✓ Natural transition point in your routine</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pl-12 mb-8">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-violet-600 dark:text-violet-400">3</span>
            </div>
            <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Make It Stupidly Small
              </h3>
              <p className="text-muted-foreground mb-4">
                The #1 mistake in habit building is starting too big. Your new habit should take
                less than 2 minutes initially. This removes all resistance and builds the neural
                pathway first.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <h4 className="font-medium text-rose-600 dark:text-rose-400 text-sm mb-2">
                    Too Ambitious
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• &quot;Exercise for 30 minutes&quot;</li>
                    <li>• &quot;Write 1000 words&quot;</li>
                    <li>• &quot;Meditate for 20 minutes&quot;</li>
                    <li>• &quot;Read a chapter&quot;</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-sm mb-2">
                    Right-Sized
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• &quot;Do 1 pushup&quot;</li>
                    <li>• &quot;Write 1 sentence&quot;</li>
                    <li>• &quot;Take 3 deep breaths&quot;</li>
                    <li>• &quot;Read 1 page&quot;</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-violet-500/10">
                <h4 className="font-medium text-violet-600 dark:text-violet-400 text-sm mb-2">
                  The 2-Minute Rule
                </h4>
                <p className="text-xs text-muted-foreground">
                  Scale down your habit until it takes 2 minutes or less. Once automatic, you
                  can expand. &quot;Run for 30 minutes&quot; becomes &quot;Put on running shoes.&quot;
                  The point isn&apos;t the workout—it&apos;s building the identity of someone who
                  exercises.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative pl-12 mb-8">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">4</span>
            </div>
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Create a Visual Cue
              </h3>
              <p className="text-muted-foreground mb-4">
                Make the trigger impossible to miss. Place a physical reminder where your anchor
                habit happens. This bridges the gap until the stack becomes automatic.
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                  <Coffee className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      &quot;After coffee, write priorities&quot;
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Place notebook and pen next to coffee maker
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                  <Timer className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      &quot;After Pomodoro break, stretch&quot;
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Put stretch routine card on desk where you see it
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                  <Moon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      &quot;After getting into bed, read&quot;
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Book lives on pillow during the day
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10">
                <h4 className="font-medium text-amber-600 dark:text-amber-400 text-sm mb-2">
                  Environment Design Principle
                </h4>
                <p className="text-xs text-muted-foreground">
                  You don&apos;t rise to the level of your goals—you fall to the level of your
                  systems. Make good habits obvious by designing your environment. The cue should
                  be visible, accessible, and impossible to ignore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Habit Stack Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Link2 className="h-6 w-6 text-cyan-500" />
            Ready-to-Use Habit Stacks
          </h2>
          <div className="space-y-3">
            {HABIT_STACK_EXAMPLES.map((example, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <example.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary mb-1 block">
                      {example.category}
                    </span>
                    <p className="text-sm text-foreground">
                      <span className="text-muted-foreground">{example.anchor},</span>{" "}
                      <span className="font-medium">{example.newHabit}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pomodoro Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            Habit Stacking + Pomodoro
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-6">
              Pomodoro technique creates natural anchor points throughout your workday. Use these
              predictable moments to stack productivity and wellness habits.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2">Session Start Stacks</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• After starting timer → Clear desk of distractions</li>
                  <li>• After starting timer → Write session goal on sticky note</li>
                  <li>• After starting timer → Put phone in another room</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2">Break Time Stacks</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• After break starts → Do 10 stretches</li>
                  <li>• After break starts → Refill water bottle</li>
                  <li>• After break starts → Look out window for 20 seconds</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2">Session End Stacks</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• After 4 pomodoros → Review what you accomplished</li>
                  <li>• After long break starts → Take 5-min walk</li>
                  <li>• After completing session → Note any blockers</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2">Daily Completion Stacks</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• After daily pomodoro goal → Celebrate briefly</li>
                  <li>• After final session → Plan tomorrow&apos;s top 3</li>
                  <li>• After work shutdown → Record total focus time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cautions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <span className="text-rose-500 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Stacking Too Many at Once</h4>
                  <p className="text-sm text-muted-foreground">
                    Each new habit requires cognitive effort. Stack one at a time, wait until
                    it&apos;s automatic (2-4 weeks), then add another.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <span className="text-rose-500 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Choosing Inconsistent Anchors</h4>
                  <p className="text-sm text-muted-foreground">
                    &quot;After I check social media&quot; fails because timing varies. Pick
                    anchors tied to fixed daily events—meals, work start/end, sleep routine.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <span className="text-rose-500 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Ignoring Context Mismatch</h4>
                  <p className="text-sm text-muted-foreground">
                    Stacking &quot;exercise&quot; after &quot;reading in bed&quot; creates friction.
                    Match energy levels and locations between anchor and new habit.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <span className="text-rose-500 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">No Tracking or Accountability</h4>
                  <p className="text-sm text-muted-foreground">
                    What gets measured gets managed. Use a simple habit tracker or calendar to
                    mark each successful completion. Visual progress builds momentum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
            Next Steps: Building Your Stack
          </h2>
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">This Week: Audit Your Anchors</p>
                  <p className="text-sm text-muted-foreground">
                    Spend 2 days noting every automatic habit. List 10+ potential anchors.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Day 3: Create Your First Stack</p>
                  <p className="text-sm text-muted-foreground">
                    Pick ONE goal habit, find the best anchor, and write your stack formula.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Day 4+: Execute Daily</p>
                  <p className="text-sm text-muted-foreground">
                    Perform your stack every day. Track completions. Don&apos;t add new habits yet.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">4</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Week 4+: Expand Gradually</p>
                  <p className="text-sm text-muted-foreground">
                    Once automatic, either make the habit bigger or add another stack.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* CTA Section */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Start Building Your First Stack Today
            </h2>
            <p className="text-muted-foreground mb-4">
              The best time to start habit stacking was yesterday. The second best time is now.
              Pick one small habit, find your anchor, and begin. Pomodoro sessions create perfect
              anchor points throughout your day.
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
                href="/blog/batching-tasks"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Task Batching Guide
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
                Stack deep work sessions into your daily routine for elite productivity.
              </p>
            </Link>
            <Link
              href="/blog/productive-procrastination"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Productive Procrastination
              </h3>
              <p className="text-sm text-muted-foreground">
                Turn your procrastination instinct into a habit-building advantage.
              </p>
            </Link>
            <Link
              href="/blog/weekly-review-habit"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Weekly Review Habit
              </h3>
              <p className="text-sm text-muted-foreground">
                Build a weekly review ritual to track your habit stacking progress.
              </p>
            </Link>
            <Link
              href="/blog/batching-tasks"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Task Batching
              </h3>
              <p className="text-sm text-muted-foreground">
                Combine habit stacking with task batching for maximum efficiency.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
