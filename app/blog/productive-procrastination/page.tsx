import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Lightbulb,
  Home,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Timer,
  Brain,
  Hourglass,
  Zap,
  Target,
  Coffee,
  ListTodo,
  Sparkles,
  Quote,
  BookOpen,
  TrendingUp,
  Shield,
  Play,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Productive Procrastination: Turn Delay into Your Secret Weapon | Pomobox",
  description:
    "Discover how to harness your procrastination instinct for productivity. Learn John Perry's structured procrastination method, the psychology behind delay, and practical strategies to make procrastination work for you.",
  keywords: [
    "productive procrastination",
    "structured procrastination",
    "procrastination hack",
    "john perry",
    "procrastination psychology",
    "time management",
    "productivity tips",
    "overcome procrastination",
    "2-minute rule",
    "task management",
    "focus strategies",
    "work productivity",
  ],
  openGraph: {
    title: "Productive Procrastination: Turn Delay into Your Secret Weapon | Pomobox",
    description:
      "Learn how to channel your procrastination instinct into productive work. A proven framework for getting things done by working with your psychology, not against it.",
    type: "article",
    publishedTime: "2025-01-13",
    modifiedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/productive-procrastination" },
}

// FAQ 데이터
const FAQ_DATA = [
  {
    question: "Isn't productive procrastination just another form of avoidance?",
    answer:
      "Not exactly. True procrastination involves doing nothing useful. Productive procrastination involves completing genuinely valuable tasks—just not the 'most important' one. The key insight is that you're still creating value. Over time, even the avoided task gets done when something newer takes its place at the top.",
  },
  {
    question: "Won't this method lead to constantly avoiding hard tasks?",
    answer:
      "The system is self-correcting. Hard tasks don't stay at the top forever—newer tasks push them down. When they're no longer the 'scariest' item, resistance decreases naturally. Plus, tasks often become easier with time as you gather information from related work or the urgency increases enough to overcome resistance.",
  },
  {
    question: "How do I know if I'm a good candidate for structured procrastination?",
    answer:
      "This method works best if: 1) You naturally work on multiple projects, 2) You feel guilty when procrastinating on 'nothing,' 3) You often find yourself doing smaller tasks to avoid big ones, 4) Traditional productivity systems feel restrictive. If these describe you, structured procrastination might be your native operating mode.",
  },
  {
    question: "How is this different from just being disorganized?",
    answer:
      "The crucial difference is intentionality and awareness. Disorganized people avoid tasks without a system. Structured procrastinators deliberately maintain a prioritized list and consciously choose to work on secondary items. They're still completing valuable work—just in a psychologically sustainable order.",
  },
  {
    question: "Can I combine this with the Pomodoro Technique?",
    answer:
      "Absolutely! They complement each other well. Use your structured procrastination list to choose what to work on, then apply Pomodoro for focused execution. The timer helps you commit to even the avoided task for just 25 minutes—often enough to overcome initial resistance and make real progress.",
  },
  {
    question: "What if the top task has a hard deadline I can't ignore?",
    answer:
      "Deadlines create natural urgency that overrides avoidance. When a task has a genuine, immediate deadline, it stops being the 'top scary item' and becomes a 'must-do-now crisis.' Most procrastinators perform well under real pressure. The method is for the 80% of tasks without urgent deadlines.",
  },
]

// JSON-LD 스키마 - 정적 데이터만 사용, XSS 위험 없음
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

export default function ProductiveProcrastinationPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* FAQ Schema JSON-LD - 정적 데이터, XSS 위험 없음 */}
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
            <li className="text-foreground font-medium">Productive Procrastination</li>
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
              <Lightbulb className="h-3 w-3" />
              Psychology Hack
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              14 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Productive Procrastination: Turn Your Delay Instinct into a Secret Weapon
          </h1>
          <p className="text-lg text-muted-foreground">
            What if fighting procrastination is the wrong approach? Learn how Stanford professor
            John Perry turned his procrastination habit into a productivity system that earned
            him an Ig Nobel Prize—and how you can do the same.
          </p>
        </header>

        {/* Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">88%</div>
              <div className="text-xs md:text-sm text-muted-foreground">People Procrastinate</div>
            </div>
            <div className="text-center border-x border-amber-500/20">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">2min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Rule Threshold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">1996</div>
              <div className="text-xs md:text-sm text-muted-foreground">Perry&apos;s Essay Year</div>
            </div>
          </div>
        </section>

        {/* Opening Story - The Hook */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="h-8 w-8 text-indigo-500 flex-shrink-0" />
              <div>
                <p className="text-lg text-foreground italic mb-4">
                  &quot;I have been intending to write this essay for months. Why am I finally
                  doing it? Because I finally found some uncommitted time? Wrong. I have
                  papers to grade, textbooks to read, grant proposals to write. I am writing
                  this essay as a way of not doing all of those things.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  — John Perry, Stanford Philosophy Professor, opening his 1996 essay on Structured Procrastination
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Part 1: The Discovery - Story Intro */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-violet-500" />
            The Accidental Discovery
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              John Perry was supposed to be grading student papers. Instead, he found himself
              sharpening pencils, reorganizing his bookshelf, and writing an essay about why
              he wasn&apos;t grading papers. That essay would eventually win him an
              <strong> Ig Nobel Prize</strong> in Literature in 2011—an award for research that
              &quot;first makes you laugh, then makes you think.&quot;
            </p>
            <p className="text-muted-foreground mb-4">
              What Perry realized that day changed how he understood productivity forever:
              <strong> He was getting a tremendous amount done. Just not the &quot;most important&quot; thing.</strong>
            </p>
            <p className="text-muted-foreground">
              The bookshelf was organized. The pencils were sharp. And he&apos;d written an essay
              that would be read by millions. All while &quot;procrastinating&quot; on grading.
              This wasn&apos;t laziness—it was a <em>different kind of productivity</em>.
            </p>
          </div>
        </section>

        {/* Part 2: The Problem - Identifying the Pattern */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-rose-500" />
            Why We Really Procrastinate
          </h2>
          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 mb-6">
            <h3 className="font-semibold text-foreground mb-4">The Psychology Behind Delay</h3>
            <p className="text-muted-foreground mb-4">
              Traditional productivity advice treats procrastination as a character flaw to
              overcome. But psychological research reveals something more nuanced:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-rose-500" />
                  Fear of Failure
                </h4>
                <p className="text-sm text-muted-foreground">
                  The bigger the task, the more we have to lose. Procrastination protects our
                  ego—if we don&apos;t try, we can&apos;t fail.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-rose-500" />
                  Perfectionism
                </h4>
                <p className="text-sm text-muted-foreground">
                  We wait for the &quot;perfect moment&quot; or until we feel &quot;ready.&quot; Neither
                  ever comes, so we keep waiting.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <Hourglass className="h-4 w-4 text-rose-500" />
                  Present Bias
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our brains overvalue immediate rewards and undervalue future ones. The discomfort
                  of starting feels worse than any future consequence.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-rose-500" />
                  Decision Fatigue
                </h4>
                <p className="text-sm text-muted-foreground">
                  Large, ambiguous tasks require decisions. When we&apos;re mentally tired, we
                  default to easier tasks that require less thinking.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold text-foreground mb-3">The Key Insight</h4>
            <p className="text-muted-foreground">
              Here&apos;s what Perry noticed: <strong>procrastinators aren&apos;t lazy.</strong> They
              avoid one task by doing <em>other</em> tasks. The procrastinator cleaning their
              apartment before studying is still being productive—just not on the &quot;right&quot;
              thing. What if we could harness this tendency instead of fighting it?
            </p>
          </div>
        </section>

        {/* Part 3: The Solution - Structured Procrastination */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <ListTodo className="h-6 w-6 text-emerald-500" />
            The Structured Procrastination Method
          </h2>
          <p className="text-muted-foreground mb-6">
            Perry&apos;s breakthrough was simple: <strong>instead of fighting procrastination,
            design your task list to exploit it.</strong> Here&apos;s how the system works:
          </p>

          <div className="space-y-6">
            {/* Principle 1 */}
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm">1</span>
                Keep One &quot;Important&quot; Task at the Top
              </h3>
              <p className="text-muted-foreground mb-4">
                Your list needs a seemingly crucial task at the very top. This becomes the task
                you&apos;re &quot;avoiding&quot;—the one that drives you to do everything else.
              </p>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2">The Ideal Top Task:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Feels important and somewhat urgent</li>
                  <li>• Has a flexible (or non-existent) real deadline</li>
                  <li>• Is large and somewhat ambiguous</li>
                  <li>• Makes you slightly anxious when you think about it</li>
                </ul>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">2</span>
                Fill Your List with Genuinely Valuable Tasks
              </h3>
              <p className="text-muted-foreground mb-4">
                Below the top task, list all the real work that needs doing. These are the tasks
                you&apos;ll actually accomplish while &quot;avoiding&quot; the big one.
              </p>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2">Example List:</h4>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li className="text-rose-500 font-medium">1. Write quarterly report (TOP - avoided)</li>
                  <li className="text-foreground">2. Reply to client emails</li>
                  <li className="text-foreground">3. Review team&apos;s pull requests</li>
                  <li className="text-foreground">4. Update project documentation</li>
                  <li className="text-foreground">5. Schedule next week&apos;s meetings</li>
                  <li className="text-foreground">6. Fix minor bugs in dashboard</li>
                </ol>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  By avoiding the quarterly report, you accomplish items 2-6. That&apos;s a productive day.
                </p>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
              <h3 className="font-semibold text-violet-600 dark:text-violet-400 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-sm">3</span>
                Let New Tasks Push Old Ones Down
              </h3>
              <p className="text-muted-foreground mb-4">
                Here&apos;s the magic: when something newer and scarier comes along, it takes
                the top spot. The old &quot;avoided&quot; task drops to position 2 or 3—and
                suddenly feels much more doable.
              </p>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2">How Tasks Get Done:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Monday: &quot;Write quarterly report&quot; is terrifying (avoided)</li>
                  <li>• Wednesday: Boss mentions &quot;Strategy presentation needed&quot;</li>
                  <li>• Thursday: Presentation takes top spot. Report feels manageable now.</li>
                  <li>• Friday: Report gets done while avoiding the presentation.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Part 4: Making It Work - Practical Application */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Play className="h-6 w-6 text-primary" />
            Your Action Plan
          </h2>
          <p className="text-muted-foreground mb-6">
            Ready to turn your procrastination into productivity? Follow this week-by-week plan:
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <span className="text-primary font-bold text-sm">W1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Week 1: Build Your List</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Write down ALL pending tasks across work and personal life</li>
                    <li>• Identify which task feels most daunting—that&apos;s your top item</li>
                    <li>• Arrange the rest by genuine value, not artificial priority</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <span className="text-primary font-bold text-sm">W2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Week 2: Embrace the Avoidance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• When you feel resistance to the top task, don&apos;t fight it</li>
                    <li>• Pick something else from your list—anything genuinely useful</li>
                    <li>• Track what you accomplish while &quot;procrastinating&quot;</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <span className="text-primary font-bold text-sm">W3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Week 3: Add the 2-Minute Rule</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Before avoiding a task, ask: &quot;Can I do just 2 minutes of this?&quot;</li>
                    <li>• Often, starting is the hardest part—you might continue naturally</li>
                    <li>• If not, switch to another task guilt-free after 2 minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <span className="text-primary font-bold text-sm">W4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Week 4: Integrate with Pomodoro</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use Pomodoro to commit to avoided tasks for just 25 minutes</li>
                    <li>• The timer creates artificial urgency that overrides avoidance</li>
                    <li>• After one Pomodoro, you can switch guilt-free—or continue</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Part 5: Pomodoro Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            The Pomodoro + Procrastination Combo
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-6">
              The Pomodoro Technique is the perfect complement to structured procrastination.
              Here&apos;s how to combine them for maximum effect:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-primary" />
                  Morning: Top Task Attempt
                </h4>
                <p className="text-xs text-muted-foreground">
                  Start with ONE Pomodoro on your avoided task. Just 25 minutes. If you can&apos;t
                  continue after, switch to task #2. No guilt.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Midday: Productive Avoidance
                </h4>
                <p className="text-xs text-muted-foreground">
                  Work through tasks 2-5 using Pomodoros. You&apos;re being highly productive while
                  &quot;avoiding&quot; the big thing. Track your completions.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Afternoon: Momentum Check
                </h4>
                <p className="text-xs text-muted-foreground">
                  After completing 4+ Pomodoros on secondary tasks, try the top task again.
                  Momentum and accomplishment often reduce resistance.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  End of Day: Review
                </h4>
                <p className="text-xs text-muted-foreground">
                  Count completed Pomodoros. Even if you didn&apos;t touch the top task, you
                  likely accomplished significant work. That&apos;s a win.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/10">
              <h4 className="font-medium text-primary text-sm mb-2">The 25-Minute Bargain</h4>
              <p className="text-xs text-muted-foreground">
                Tell yourself: &quot;I&apos;ll do just one Pomodoro on this scary task.&quot; 25 minutes
                is short enough to feel manageable. Often, once you start, the resistance
                fades—the task isn&apos;t as bad as your brain predicted. If it is, you can
                switch after 25 minutes knowing you made genuine progress.
              </p>
            </div>
          </div>
        </section>

        {/* The Lessons - What We Learn */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-cyan-500" />
            Key Lessons from Productive Procrastination
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Work With Your Psychology, Not Against It</h4>
                  <p className="text-sm text-muted-foreground">
                    Fighting your natural tendencies requires willpower, which depletes. Designing
                    systems that channel your tendencies requires setup once, then runs automatically.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Productivity Isn&apos;t Binary</h4>
                  <p className="text-sm text-muted-foreground">
                    You&apos;re not either &quot;productive&quot; or &quot;procrastinating.&quot; There&apos;s a spectrum.
                    Doing task #3 while avoiding task #1 is still valuable. Perfect is the enemy of good.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Guilt Is the Real Enemy</h4>
                  <p className="text-sm text-muted-foreground">
                    The worst part of procrastination isn&apos;t the delayed task—it&apos;s the guilt spiral
                    that paralyzes us completely. Structured procrastination removes guilt by reframing
                    avoidance as a productivity strategy.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Tasks Don&apos;t Stay Scary Forever</h4>
                  <p className="text-sm text-muted-foreground">
                    The thing you&apos;re avoiding today will feel easier when something scarier arrives.
                    Time and context change our relationship to tasks. The system is self-correcting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            When This Doesn&apos;t Work
          </h2>
          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-muted-foreground mb-4">
              Structured procrastination isn&apos;t a silver bullet. It won&apos;t help if:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">You only have one task:</strong> The system requires
                  multiple items. If you truly have only one thing to do, you&apos;ll have to face it directly.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Deadlines are immovable:</strong> Real, hard deadlines
                  create genuine urgency. This system works best when the &quot;top task&quot; has flexible timing.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Your avoidance is truly unproductive:</strong> Scrolling
                  social media isn&apos;t productive procrastination—it&apos;s just procrastination. The system
                  only works if secondary tasks have real value.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">You&apos;re dealing with clinical issues:</strong> Chronic
                  procrastination can be a symptom of ADHD, anxiety, or depression. If avoidance is
                  significantly impacting your life, consider professional support.
                </p>
              </div>
            </div>
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
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Ready to Turn Your Procrastination Into Progress?
            </h2>
            <p className="text-muted-foreground mb-4">
              Stop fighting your brain. Start working with it. Build your structured procrastination
              list today, then use Pomodoro sessions to make progress on everything—even the
              task you&apos;re &quot;avoiding.&quot;
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start a Pomodoro Session
              </Link>
              <Link
                href="/blog/habit-stacking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Build Better Habits
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
                When you&apos;re ready to tackle that top task, use Cal Newport&apos;s deep work protocol.
              </p>
            </Link>
            <Link
              href="/blog/habit-stacking"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Habit Stacking
              </h3>
              <p className="text-sm text-muted-foreground">
                Build productive habits that run automatically—no willpower required.
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
                Keep your structured procrastination list fresh with weekly reviews.
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
                Group similar tasks together for more efficient productive procrastination.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
