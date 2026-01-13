import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Calendar,
  Home,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Timer,
  Target,
  ListChecks,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Palette,
  Quote,
  FileText,
  RotateCcw,
  Star,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Weekly Review Habit: How Top Performers Reflect and Improve | Pomobox",
  description:
    "Learn the weekly review habit from David Allen's GTD system. Explore how three professionals—a startup founder, a designer, and a researcher—use weekly reviews to stay productive and continuously improve.",
  keywords: [
    "weekly review",
    "gtd weekly review",
    "productivity reflection",
    "david allen",
    "getting things done",
    "productivity system",
    "weekly planning",
    "self reflection",
    "continuous improvement",
    "weekly routine",
    "productivity habits",
    "personal review",
  ],
  openGraph: {
    title: "Weekly Review Habit: How Top Performers Reflect and Improve | Pomobox",
    description:
      "Discover how successful professionals use weekly reviews to maintain clarity, reduce stress, and continuously improve. Three detailed case studies inside.",
    type: "article",
    publishedTime: "2025-01-13",
    modifiedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/weekly-review-habit" },
}

// FAQ 데이터
const FAQ_DATA = [
  {
    question: "How long should a weekly review take?",
    answer:
      "Most people complete an effective weekly review in 30-60 minutes. Beginners may need 90 minutes initially. The key is consistency over duration—a quick 20-minute review done every week beats a 2-hour review done sporadically. As the habit becomes automatic, you'll find your natural rhythm.",
  },
  {
    question: "What's the best day and time for a weekly review?",
    answer:
      "Friday afternoon is popular—it closes out the work week and sets up Monday. Sunday evening works well for planning the week ahead. Some prefer Monday morning for a fresh start. The 'best' time is whatever you'll actually do consistently. Experiment for 4 weeks to find your optimal slot.",
  },
  {
    question: "What if I skip a weekly review?",
    answer:
      "Don't try to 'catch up' with a double review—that leads to burnout. Simply do your next scheduled review as normal. If you're skipping frequently, your review might be too long or scheduled at a bad time. Simplify the process or move it to a more reliable time slot.",
  },
  {
    question: "How is this different from daily planning?",
    answer:
      "Daily planning focuses on immediate tasks—what to do today. Weekly reviews zoom out to examine patterns, progress toward goals, and system effectiveness. They catch things that slip through daily reviews: neglected projects, recurring problems, opportunities for improvement. Both are valuable at different time horizons.",
  },
  {
    question: "What tools do I need for a weekly review?",
    answer:
      "You can do an effective weekly review with just pen and paper. Digital tools like Notion, Obsidian, or a simple spreadsheet help with tracking over time. The most important 'tool' is a consistent set of questions you ask yourself each week. Start simple—complexity can come later.",
  },
  {
    question: "How do I measure if my weekly reviews are working?",
    answer:
      "Signs of an effective weekly review: fewer surprises and forgotten commitments, clearer priorities each week, reduced Sunday-night anxiety, visible progress on important projects, and a sense of control over your time. Track these qualitatively or rate your week's clarity on a 1-10 scale to see trends.",
  },
]

// JSON-LD 스키마 - 정적 하드코딩 데이터, 사용자 입력 없음, XSS 위험 없음
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

export default function WeeklyReviewHabitPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* FAQ Schema JSON-LD - 정적 하드코딩 데이터, 사용자 입력 없음 */}
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
            <li className="text-foreground font-medium">Weekly Review Habit</li>
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Calendar className="h-3 w-3" />
              Weekly Habit
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              15 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weekly Review Habit: How Top Performers Reflect and Improve
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover the weekly review practice used by productivity experts, successful executives,
            and creative professionals. Three detailed case studies show exactly how they do it.
          </p>
        </header>

        {/* Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-violet-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400">45min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Average Review Time</div>
            </div>
            <div className="text-center border-x border-violet-500/20">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">52x</div>
              <div className="text-xs md:text-sm text-muted-foreground">Yearly Improvements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">3</div>
              <div className="text-xs md:text-sm text-muted-foreground">Case Studies</div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="h-8 w-8 text-indigo-500 flex-shrink-0" />
              <div>
                <p className="text-lg text-foreground italic mb-4">
                  &quot;The Weekly Review is the time to gather and process all your stuff,
                  review your system, update your lists, and get clean, clear, current, and
                  complete.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  — David Allen, Getting Things Done
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Weekly Reviews Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            Why Weekly Reviews Transform Productivity
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-muted-foreground">
              Most people live in reaction mode—responding to emails, attending meetings, fighting fires.
              Without regular reflection, important-but-not-urgent work gets perpetually postponed.
              Goals drift. Systems break down. Stress accumulates.
            </p>
            <p className="text-muted-foreground">
              The weekly review breaks this cycle. It&apos;s a scheduled pause to step back, assess
              reality, and deliberately choose what deserves your attention. Done consistently,
              it compounds into dramatic improvements—52 chances per year to course-correct.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <RotateCcw className="h-5 w-5 text-violet-500 mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Reset Mental State</h3>
              <p className="text-sm text-muted-foreground">
                Clear the mental clutter accumulated over the week. Start fresh with a clean slate.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <Target className="h-5 w-5 text-violet-500 mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Realign Priorities</h3>
              <p className="text-sm text-muted-foreground">
                Ensure daily actions connect to bigger goals. Catch drift before it becomes disaster.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <TrendingUp className="h-5 w-5 text-violet-500 mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Continuous Improvement</h3>
              <p className="text-sm text-muted-foreground">
                Identify what&apos;s working and what isn&apos;t. Make small adjustments that compound over time.
              </p>
            </div>
          </div>
        </section>

        {/* Case Study 1: Startup Founder */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Case Study 1: Sarah, Startup Founder</h2>
                <p className="text-sm text-muted-foreground">B2B SaaS company, 15-person team</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Background</h3>
              <p className="text-muted-foreground">
                Sarah runs a growing SaaS startup. Her days are fragmented—investor calls, product
                decisions, hiring interviews, customer escalations. Before implementing weekly reviews,
                she felt constantly behind. Important strategic work kept getting pushed by urgent
                operational issues.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">The Challenge</h3>
              <div className="p-4 rounded-xl bg-background/50">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Weeks would pass without progress on quarterly OKRs
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Constantly surprised by forgotten commitments
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    No time to think strategically—always in reaction mode
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Sunday anxiety about the week ahead
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Her Weekly Review Process</h3>
              <div className="p-4 rounded-xl bg-background/50">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">When:</strong> Friday 4-5 PM (before weekend)
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Where:</strong> Quiet corner of a coffee shop
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong className="text-foreground">Duration:</strong> 60 minutes
                </p>

                <h4 className="font-medium text-foreground text-sm mb-2">Her 5-Part Framework:</h4>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li><strong>1. Inbox Zero (10 min)</strong> — Process all emails, Slack DMs, and notes</li>
                  <li><strong>2. Calendar Audit (10 min)</strong> — Review past week, prep for next week</li>
                  <li><strong>3. OKR Check (15 min)</strong> — Score progress, identify blockers</li>
                  <li><strong>4. Team Pulse (10 min)</strong> — Note team concerns, schedule 1:1s if needed</li>
                  <li><strong>5. Strategic Block (15 min)</strong> — What&apos;s the ONE thing that moves the needle?</li>
                </ol>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Results After 3 Months</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Quarterly OKRs hit for first time in 4 quarters</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Inbox at zero most days (vs. 200+ before)</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Sunday anxiety eliminated—weekends truly off</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Team reports clearer communication</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 text-sm mb-2 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Sarah&apos;s Key Lesson
              </h4>
              <p className="text-sm text-muted-foreground italic">
                &quot;The weekly review isn&apos;t about planning more—it&apos;s about being intentional
                instead of reactive. That 60 minutes saves hours of spinning my wheels.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Case Study 2: UX Designer */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-rose-500/10">
                <Palette className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Case Study 2: Marcus, Senior UX Designer</h2>
                <p className="text-sm text-muted-foreground">Design agency, multiple client projects</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-3">Background</h3>
              <p className="text-muted-foreground">
                Marcus juggles 4-5 client projects simultaneously. His challenge isn&apos;t too little
                work—it&apos;s keeping track of commitments across fragmented contexts without dropping balls.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-3">The Challenge</h3>
              <div className="p-4 rounded-xl bg-background/50">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Feedback from one project would get lost in another&apos;s context
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Skill development kept getting postponed for client work
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    No visibility into actual time spent vs. estimates
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Creative blocks would linger unaddressed for weeks
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-3">His Weekly Review Process</h3>
              <div className="p-4 rounded-xl bg-background/50">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">When:</strong> Sunday 10-11 AM (with coffee)
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Where:</strong> Home office with lo-fi music
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong className="text-foreground">Duration:</strong> 45-60 minutes
                </p>

                <h4 className="font-medium text-foreground text-sm mb-2">His Project-Centric Framework:</h4>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li><strong>1. Time Audit (10 min)</strong> — Review time tracking: where did hours go?</li>
                  <li><strong>2. Project Sweep (20 min)</strong> — Each project: status, next action, blockers</li>
                  <li><strong>3. Learning Log (10 min)</strong> — What did I learn? What do I want to learn?</li>
                  <li><strong>4. Creative Health (5 min)</strong> — Rate creative energy 1-10. If low, schedule recharge.</li>
                  <li><strong>5. Week Ahead (10 min)</strong> — Block deep design time before meetings fill calendar</li>
                </ol>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-3">Results After 3 Months</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Zero missed client deadlines (vs. 2-3/month before)</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Completed Figma certification (4-month goal)</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Estimates improved to within 10% accuracy</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Creative blocks addressed same week they arise</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/10">
              <h4 className="font-medium text-rose-600 dark:text-rose-400 text-sm mb-2 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Marcus&apos;s Key Lesson
              </h4>
              <p className="text-sm text-muted-foreground italic">
                &quot;The creative health check was a game-changer. Burnout used to sneak up on me.
                Now I catch warning signs and take a museum day before it becomes a crisis.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Case Study 3: Academic Researcher */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Case Study 3: Dr. Priya, Research Scientist</h2>
                <p className="text-sm text-muted-foreground">University lab, PhD advisor to 4 students</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Background</h3>
              <p className="text-muted-foreground">
                Dr. Priya balances her own research, teaching, grant writing, and mentoring PhD students.
                Academic work has long time horizons—papers take months. Without deliberate tracking,
                progress becomes invisible.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">The Challenge</h3>
              <div className="p-4 rounded-xl bg-background/50">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Long-term projects felt like they made no weekly progress
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Student mentoring crowded out personal research time
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Grant deadlines would arrive as &quot;surprises&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    Teaching prep expanded to fill all available time
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Her Weekly Review Process</h3>
              <div className="p-4 rounded-xl bg-background/50">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">When:</strong> Monday 7-8 AM (before students arrive)
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Where:</strong> Empty lab with door closed
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong className="text-foreground">Duration:</strong> 50 minutes
                </p>

                <h4 className="font-medium text-foreground text-sm mb-2">Her Research-Focused Framework:</h4>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li><strong>1. Publication Pipeline (15 min)</strong> — Update status of each paper</li>
                  <li><strong>2. Grant Countdown (10 min)</strong> — Days until deadlines, next milestone</li>
                  <li><strong>3. Student Check (10 min)</strong> — Each student: blocked? When&apos;s next 1:1?</li>
                  <li><strong>4. Research Hours (5 min)</strong> — How many hours of personal research? Target: 15+</li>
                  <li><strong>5. Week Design (10 min)</strong> — Block 3+ hours of protected research time</li>
                </ol>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Results After 6 Months</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Published 3 papers (vs. 1 in previous year)</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Won major grant on second submission</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">Research hours consistent at 15-18/week</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                  <p className="text-sm text-foreground">All 4 students progressing well</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10">
              <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-sm mb-2 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Dr. Priya&apos;s Key Lesson
              </h4>
              <p className="text-sm text-muted-foreground italic">
                &quot;The publication pipeline view changed everything. I could finally see that I was
                making progress—just across a longer timeline than I intuitively recognized.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Common Patterns */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <ListChecks className="h-6 w-6 text-primary" />
            Patterns Across All Three Case Studies
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Consistent Time and Place</h4>
                  <p className="text-sm text-muted-foreground">
                    All three protect a specific time slot and location. The review becomes a ritual.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Personalized Frameworks</h4>
                  <p className="text-sm text-muted-foreground">
                    Each review is tailored to their role. Generic templates don&apos;t work—customize for your context.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Balance of Review and Planning</h4>
                  <p className="text-sm text-muted-foreground">
                    About half the time looks backward, half looks forward. Both are essential.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Time-Bound Sections</h4>
                  <p className="text-sm text-muted-foreground">
                    Each section has a time limit. This prevents perfectionism and keeps reviews manageable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Weekly Review Template */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <FileText className="h-6 w-6 text-cyan-500" />
            Build Your Own Weekly Review
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent border border-cyan-500/20">
            <p className="text-muted-foreground mb-6">
              Start with this universal template, then customize based on what matters in your work:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">Part 1: Clear (10 min)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Process inbox to zero (or near-zero)</li>
                  <li>• Review notes and capture any loose items</li>
                  <li>• Empty physical inbox if you have one</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">Part 2: Review (15 min)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• What did I accomplish this week?</li>
                  <li>• What didn&apos;t get done that should have?</li>
                  <li>• What surprised me? What did I learn?</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">Part 3: Assess (10 min)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check progress on current projects/goals</li>
                  <li>• Identify any blocked items</li>
                  <li>• Rate your energy/wellbeing this week (1-10)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2">Part 4: Plan (10 min)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• What are the top 3 priorities for next week?</li>
                  <li>• Block time for important-but-not-urgent work</li>
                  <li>• Identify one thing to improve next week</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/10">
              <h4 className="font-medium text-cyan-600 dark:text-cyan-400 text-sm mb-2">Pomodoro Integration</h4>
              <p className="text-xs text-muted-foreground">
                Add a quick stats review: How many sessions did you complete? What was your longest
                focus streak? Are you trending up or down week over week?
              </p>
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
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-violet-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Start Your Weekly Review Practice
            </h2>
            <p className="text-muted-foreground mb-4">
              You don&apos;t need a perfect system—you need a consistent one. Block 45 minutes this
              week for your first review. Use the template above. Adjust based on what you learn.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Your First Review
              </Link>
              <Link
                href="/blog/habit-stacking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Make It a Habit
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
                Use your weekly review to protect and schedule deep work time.
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
                Attach your weekly review to an existing anchor habit.
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
                Review your structured procrastination list during weekly reviews.
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
                Plan your weekly task batches during the review process.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
