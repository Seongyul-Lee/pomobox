import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  PenTool,
  FileText,
  Edit3,
  Search,
  Lightbulb,
  Clock,
  Target,
  Flame,
  Calendar,
  BookOpen,
  Quote,
  ChevronDown,
  Timer,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Newspaper,
  AlertTriangle,
  Coffee,
  Brain,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { WritingGoalCalculator } from "@/components/ui/writing-goal-calculator"

export const metadata: Metadata = {
  title: "Pomodoro for Writers: 7 Strategies to Boost Your Writing | Pomobox",
  description: "Master focused writing sessions with 7 proven Pomodoro strategies for writers. Overcome writer's block, boost productivity, and hit your word count goals.",
  keywords: ["pomodoro for writers", "writing productivity", "focus for writing", "writer's block solutions", "writing tips", "author productivity"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-for-writers",
    siteName: "Pomobox",
    title: "Pomodoro for Writers: 7 Strategies to Boost Your Writing",
    description: "Master focused writing sessions with 7 proven Pomodoro strategies. Overcome writer's block and hit your word count goals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for Writers | Pomobox",
    description: "7 proven Pomodoro strategies for writers: overcome blocks, boost productivity, hit your goals.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-for-writers",
  },
}

// 7가지 포모도로 전략 데이터
const SEVEN_STRATEGIES = [
  {
    number: 1,
    icon: FileText,
    title: "First Draft Flow Sessions",
    duration: "45-50 min focus + 10 min rest",
    description: "Longer sessions for creative momentum. Silence your inner editor and let words pour out. Quantity over quality in the first draft.",
    tips: ["Turn off spell-check", "Write without backspacing", "Set a word count target per session"],
    quote: { text: "The first draft is just you telling yourself the story.", author: "Terry Pratchett" },
  },
  {
    number: 2,
    icon: Edit3,
    title: "Editing & Revision Sprints",
    duration: "25 min edit + 5 min rest",
    description: "Shorter, focused sessions for polishing. Editing requires different brain energy than creating. Fresh eyes catch more errors.",
    tips: ["One type of edit per session", "Read aloud to catch awkward phrasing", "Track changes, review in next session"],
    quote: { text: "Write drunk, edit sober.", author: "Ernest Hemingway (attributed)" },
  },
  {
    number: 3,
    icon: Search,
    title: "Research Integration Mode",
    duration: "25 min research + 5 min notes",
    description: "Structured research prevents rabbit holes. Set clear research questions before starting. Document sources as you go.",
    tips: ["Define 3 questions before starting", "Use timer as research boundary", "Note sources immediately"],
    quote: { text: "Research is formalized curiosity. It is poking and prying with a purpose.", author: "Zora Neale Hurston" },
  },
  {
    number: 4,
    icon: Lightbulb,
    title: "Brainstorming Bursts",
    duration: "15-20 min ideation + 5 min capture",
    description: "Short, intense idea generation. No judgment during ideation. Capture everything, filter later. Mind maps work well here.",
    tips: ["No idea is too wild", "Quantity breeds quality", "Voice record if typing slows you down"],
    quote: { text: "The best way to have a good idea is to have lots of ideas.", author: "Linus Pauling" },
  },
  {
    number: 5,
    icon: AlertTriangle,
    title: "Writer's Block Breaker",
    duration: "10 min micro-session",
    description: "When stuck, shrink the commitment. Just 10 minutes. Write anything related to your topic. Movement creates momentum.",
    tips: ["Start mid-sentence from yesterday", "Write about why you're stuck", "Switch to a different section"],
    quote: { text: "You can always edit a bad page. You can't edit a blank page.", author: "Jodi Picoult" },
  },
  {
    number: 6,
    icon: Flame,
    title: "Deadline Sprint Strategy",
    duration: "50 min sprints + 10 min breaks",
    description: "When deadlines loom, extend sessions but keep breaks. Sustain quality under pressure. Plan sprint count before starting.",
    tips: ["Calculate sessions needed for deadline", "Eliminate all distractions", "Reward yourself after completion"],
    quote: { text: "I love deadlines. I love the whooshing noise they make as they go by.", author: "Douglas Adams" },
  },
  {
    number: 7,
    icon: Calendar,
    title: "Building Your Writing Routine",
    duration: "Same time daily",
    description: "Consistency beats inspiration. Write at the same time daily. Your brain will learn to prepare for creative work.",
    tips: ["Morning writing often works best", "Start with yesterday's last paragraph", "Track your daily streak"],
    quote: { text: "A writer who waits for ideal conditions under which to work will die without putting a word on paper.", author: "E.B. White" },
  },
]

// 글쓰기 유형별 팁
const WRITER_TYPES = [
  {
    icon: BookOpen,
    type: "Authors & Novelists",
    sessionTip: "45-50 min sessions for first drafts, 25 min for editing",
    strategies: [
      "Scene-by-scene pomodoros",
      "Character development sessions",
      "Dialogue-focused sprints",
    ],
  },
  {
    icon: Newspaper,
    type: "Bloggers & Content Creators",
    sessionTip: "25 min sessions work well for article-length content",
    strategies: [
      "Outline in one session, write in next",
      "Batch similar posts together",
      "Schedule SEO research separately",
    ],
  },
  {
    icon: Briefcase,
    type: "Copywriters",
    sessionTip: "25 min for drafts, multiple short sessions for iteration",
    strategies: [
      "Headlines in dedicated sessions",
      "A/B variations in single pomodoro",
      "Client revisions batched together",
    ],
  },
  {
    icon: GraduationCap,
    type: "Academic Writers",
    sessionTip: "25 min focused, with research sessions separate",
    strategies: [
      "Literature review as dedicated phase",
      "Citation management in breaks",
      "Argument structure before prose",
    ],
  },
]

// 글쓰기별 추천 세션 길이
const SESSION_RECOMMENDATIONS = [
  { task: "First Draft (Creative)", duration: "45-50 min", reason: "Builds creative momentum" },
  { task: "Editing & Polishing", duration: "25 min", reason: "Maintains fresh perspective" },
  { task: "Research & Notes", duration: "25 min", reason: "Prevents rabbit holes" },
  { task: "Outlining & Planning", duration: "25 min", reason: "Structured thinking" },
  { task: "Brainstorming", duration: "15-20 min", reason: "Intense idea generation" },
  { task: "Proofreading", duration: "25 min", reason: "Detail-focused attention" },
]

// FAQ 데이터
const FAQS = [
  {
    question: "25 minutes feels too short for getting into a writing flow. What should I do?",
    answer: "For first drafts, extend to 45-50 minutes. The classic 25-minute pomodoro was designed for varied tasks. Creative writing often needs longer uninterrupted time. Experiment with 40, 45, or 50 minutes to find your flow sweet spot.",
  },
  {
    question: "How do I handle writer's block during a pomodoro?",
    answer: "Start a micro-session (just 10 minutes). Write anything—even 'I don't know what to write' over and over. Movement creates momentum. Often, the block breaks within minutes. If not, switch to a different writing task like editing or research.",
  },
  {
    question: "Should I count research time as writing pomodoros?",
    answer: "Keep them separate. Research and writing use different mental modes. Track research pomodoros separately to understand where your time actually goes. This prevents 'research' from eating all your writing time.",
  },
  {
    question: "How many pomodoros should I aim for daily?",
    answer: "Quality over quantity. 4-6 focused writing pomodoros (2-3 hours) is excellent for most writers. Professional authors report 3-5 hours of actual writing as sustainable. Beyond that, diminishing returns set in. Listen to your brain.",
  },
  {
    question: "What's the best time of day for writing pomodoros?",
    answer: "Most writers report peak creativity in the morning, before the world's demands intrude. However, some thrive at night. Track your word count per session at different times for a week. Your data will reveal your personal peak hours.",
  },
  {
    question: "How do I handle interruptions mid-sentence?",
    answer: "Leave a note to yourself: '→ was writing about X, next point is Y.' When you return, you can pick up exactly where you were. Some writers intentionally stop mid-sentence—it makes restarting easier because you know exactly what comes next.",
  },
]

// 관련 가이드
const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Core technique basics" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Block interruptions effectively" },
  { href: "/guide/pomodoro-for-developers", title: "For Developers", description: "Coding-focused strategies" },
]

// JSON-LD 스키마
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro for Writers: 7 Strategies to Boost Your Writing Productivity",
    description: "Complete guide to using Pomodoro for writing: first drafts, editing, research, and overcoming writer's block with time-boxed sessions.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    url: "https://pomobox.app/guide/pomodoro-for-writers",
    mainEntityOfPage: "https://pomobox.app/guide/pomodoro-for-writers",
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
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "7 Pomodoro Strategies for Writers",
    description: "Step-by-step strategies to improve writing productivity using the Pomodoro Technique",
    step: SEVEN_STRATEGIES.map((strategy, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: strategy.title,
      text: strategy.description,
    })),
  },
]

export default function PomodoroForWritersPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.guide("Pomodoro for Writers")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6">
            <PenTool className="h-3 w-3" />
            Writer&apos;s Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            7 Pomodoro Strategies for Writers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Turn time-boxing into your secret weapon. Write more, stress less, and finally beat writer&apos;s block.
          </p>
          <ArticleMeta readingTime="12 min" />

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">45</div>
              <div className="text-xs text-muted-foreground">min for drafts</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground">words/session</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500">4-6</div>
              <div className="text-xs text-muted-foreground">daily sessions</div>
            </div>
          </div>
        </header>

        {/* Interactive Tool: Writing Goal Calculator */}
        <section className="mb-16">
          <WritingGoalCalculator />
        </section>

        {/* Extended Introduction - Prose */}
        <section className="mb-16 prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Writing is one of the most cognitively demanding creative activities. Unlike many jobs where you can coast on autopilot, writing requires sustained focus, creativity, and the courage to face a blank page. Every writer knows the peculiar terror of the cursor blinking on an empty document—and the relief when words finally start flowing.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Pomodoro Technique was practically made for writers. Francesco Cirillo, who invented the technique, was himself a student struggling to focus on his studies. The tomato-shaped timer (pomodoro is Italian for tomato) became his tool for breaking through resistance. For writers, this resistance often manifests as procrastination, perfectionism, or the dreaded writer&apos;s block.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            What makes Pomodoro particularly powerful for writing is its flexibility. A first draft needs long, uninterrupted creative flow—so you extend to 45-50 minutes. Editing benefits from fresh eyes—so you take frequent breaks. Research can become an endless rabbit hole—so the timer keeps you accountable. These 7 strategies will help you adapt the technique to every phase of your writing process.
          </p>
        </section>

        {/* 7 Strategies Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3 w-3" />
              Core Strategies
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              7 Pomodoro Strategies for Every Writer
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              From first draft to final polish—a strategy for every writing challenge
            </p>
          </div>

          <div className="space-y-6">
            {SEVEN_STRATEGIES.map((strategy) => {
              const Icon = strategy.icon
              return (
                <div
                  key={strategy.number}
                  className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                      <span className="text-xl md:text-2xl font-bold text-amber-500">{strategy.number}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Icon className="h-5 w-5 text-amber-500" />
                        <h3 className="text-lg md:text-xl font-semibold text-foreground">{strategy.title}</h3>
                      </div>

                      {/* Duration Badge */}
                      <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground mb-3">
                        {strategy.duration}
                      </span>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">{strategy.description}</p>

                      {/* Tips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {strategy.tips.map((tip, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {tip}
                          </span>
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="p-4 rounded-xl bg-muted/50 border-l-4 border-amber-500/50">
                        <p className="text-sm italic text-muted-foreground">
                          &ldquo;{strategy.quote.text}&rdquo;
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          — {strategy.quote.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Session Recommendations Table */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Clock className="h-3 w-3" />
              Quick Reference
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Recommended Session Lengths
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-2 font-medium text-foreground">Writing Task</th>
                    <th className="text-center py-3 px-2 font-medium text-foreground">Duration</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground">Why It Works</th>
                  </tr>
                </thead>
                <tbody>
                  {SESSION_RECOMMENDATIONS.map((item, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="py-3 px-2 text-foreground">{item.task}</td>
                      <td className="py-3 px-2 text-center text-amber-500 font-medium">{item.duration}</td>
                      <td className="py-3 px-2 text-muted-foreground">{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Writer Types Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <User className="h-3 w-3" />
              By Writer Type
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Pomodoro Tips by Writer Type
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WRITER_TYPES.map((writer) => {
              const Icon = writer.icon
              return (
                <div
                  key={writer.type}
                  className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-violet-500/10">
                      <Icon className="h-5 w-5 text-violet-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">{writer.type}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{writer.sessionTip}</p>

                  <ul className="space-y-2">
                    {writer.strategies.map((strategy, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Prose: The Psychology of Writing Flow */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/10">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-6">
              <span className="p-2 rounded-xl bg-emerald-500/10">
                <Brain className="h-5 w-5 text-emerald-500" />
              </span>
              The Psychology of Writing Flow
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Writer&apos;s block isn&apos;t a lack of ideas—it&apos;s often a fear response. The amygdala, our brain&apos;s alarm system, can interpret a blank page as a threat. &ldquo;What if it&apos;s not good enough?&rdquo; becomes an existential crisis rather than a manageable concern. The Pomodoro Technique short-circuits this anxiety by making the commitment tiny: &ldquo;I just need to write for 25 minutes.&rdquo;
              </p>
              <p>
                Research by psychologist Mihaly Csikszentmihalyi on flow states shows that we enter flow when challenge meets skill. Too easy, we&apos;re bored. Too hard, we&apos;re anxious. The Pomodoro&apos;s time constraint creates just enough pressure to engage without overwhelming. It&apos;s a Goldilocks zone for creativity.
              </p>
              <p>
                Professional writers have long known this intuitively. Anthony Trollope wrote for exactly 3 hours each morning, producing 47 novels. Haruki Murakami writes for 4-5 hours, starting at 4 AM. Graham Greene aimed for 500 words per day—no more, no less. These self-imposed limits aren&apos;t restrictions; they&apos;re permissions to stop worrying and start writing.
              </p>
              <p>
                The key insight: <strong className="text-foreground">consistency beats intensity</strong>. Four focused pomodoros daily, five days a week, produces more quality writing than one marathon weekend session followed by burned-out weeks. Your brain needs recovery time to consolidate learning and replenish creative resources. Honor the breaks.
              </p>
            </div>
          </div>
        </section>

        {/* Writer's Block Deep Dive */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <AlertTriangle className="h-3 w-3" />
              Block Breakers
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Emergency Writer&apos;s Block Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10">
              <h3 className="font-semibold text-foreground mb-3">The 10-Minute Micro-Session</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Can&apos;t face 25 minutes? Start with 10. Write anything—notes, complaints, stream of consciousness. Often, resistance breaks within the first few minutes.
              </p>
              <p className="text-xs text-muted-foreground italic">
                &ldquo;The secret of getting ahead is getting started.&rdquo; — Mark Twain
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10">
              <h3 className="font-semibold text-foreground mb-3">The Skip-Ahead Strategy</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Stuck on a section? Skip it. Write [TK] (journalist shorthand for &ldquo;to come&rdquo;) and move to a part you&apos;re excited about. Momentum is more valuable than order.
              </p>
              <p className="text-xs text-muted-foreground italic">
                &ldquo;Don&apos;t get it right, get it written.&rdquo; — James Thurber
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10">
              <h3 className="font-semibold text-foreground mb-3">The Ugly First Draft Permission</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Give yourself explicit permission to write badly. First drafts are supposed to be rough. You can&apos;t edit nothing. Lower the bar, raise the output.
              </p>
              <p className="text-xs text-muted-foreground italic">
                &ldquo;Nobody ever wrote a perfect first draft.&rdquo; — Everyone
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10">
              <h3 className="font-semibold text-foreground mb-3">The Environment Reset</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Sometimes the space is wrong. Take a break, change locations. Write in a coffee shop, library, or even standing. New environment, new energy.
              </p>
              <p className="text-xs text-muted-foreground italic">
                &ldquo;Almost all good writing begins with terrible first efforts.&rdquo; — Anne Lamott
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Writer FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group p-4 md:p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-amber-500/30 transition-colors"
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

        {/* Related Guides */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Related Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-amber-500/30 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-amber-500 transition-colors flex items-center gap-2">
                  {guide.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Write?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start your first writing pomodoro. Set the timer, close other tabs, and let the words flow. Your best writing is waiting.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Writing Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/pomodoro-for-developers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            For Developers
          </Link>
          <Link
            href="/guide/pomodoro-for-students"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            For Students
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD Schemas */}
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd[0])}
      </Script>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd[1])}
      </Script>
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd[2])}
      </Script>
    </main>
  )
}
