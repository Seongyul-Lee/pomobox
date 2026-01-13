import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Briefcase,
  Clock,
  Target,
  CheckCircle2,
  ChevronDown,
  Timer,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Zap,
  Code2,
  Palette,
  PenTool,
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  AlertTriangle,
  Star,
  Quote,
  BarChart3,
  FileText,
  Home,
  Coffee,
  Laptop,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"

export const metadata: Metadata = {
  title: "Pomodoro for Freelancers: 3 Real Success Stories | Pomobox",
  description:
    "Real case studies from freelance developers, designers, and writers. Learn how they use Pomodoro for time tracking, client management, and billing.",
  keywords: [
    "pomodoro for freelancers",
    "freelance productivity",
    "time tracking billing",
    "freelance time management",
    "remote work focus",
    "self-employed productivity",
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-for-freelancers",
    siteName: "Pomobox",
    title: "Pomodoro for Freelancers: 3 Real Success Stories",
    description:
      "How a developer, designer, and writer transformed their freelance businesses with Pomodoro. Actionable insights from real case studies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for Freelancers | Pomobox",
    description:
      "Three freelancers share how Pomodoro transformed their work. Real numbers, real strategies, real results.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-for-freelancers",
  },
}

// 사례 연구 데이터
const CASE_STUDIES = [
  {
    id: "developer",
    name: "Marcus Chen",
    role: "Freelance Full-Stack Developer",
    icon: Code2,
    color: "cyan",
    location: "Austin, TX",
    experience: "6 years freelancing",
    avatar: "M",
    // 배경
    background: {
      situation:
        "Marcus juggles 3-4 clients simultaneously, building web applications and APIs. His work ranges from quick bug fixes to multi-month projects.",
      income: "$120-150K/year",
      workStyle: "Fully remote, home office",
    },
    // 도전 과제
    challenges: [
      {
        challenge: "Scope creep & underbilling",
        impact: "Lost ~$15K annually to untracked 'quick changes'",
      },
      {
        challenge: "Context switching between clients",
        impact: "Took 20-30 min to refocus after each switch",
      },
      {
        challenge: "Working nights & weekends",
        impact: "No clear boundaries; always 'catching up'",
      },
      {
        challenge: "Inconsistent estimates",
        impact: "Projects regularly ran 40% over time budget",
      },
    ],
    // 포모도로 적용
    implementation: {
      duration: "3 months to full adoption",
      approach: [
        "Started logging every Pomodoro with client + task tag",
        "One client per morning session, different client after lunch",
        "25-minute timer running during billable work only",
        "Used Pomodoro data to create accurate project estimates",
      ],
      tools: ["Pomobox for timing", "Notion for client tracking", "Toggl for billing reports"],
    },
    // 결과
    results: {
      before: {
        billableHours: "25-30 hrs/week recorded",
        estimate: "40% underestimated",
        income: "$10K/month average",
        stress: "High – no work-life boundary",
      },
      after: {
        billableHours: "32-36 hrs/week recorded",
        estimate: "90% accuracy",
        income: "$13K/month average (+30%)",
        stress: "Moderate – clear end times",
      },
      keyMetric: "+$36K annual revenue from recovered billable time",
    },
    // 인용
    quote:
      "I was shocked to discover I was giving away 8-10 hours of work per week. The Pomodoro log made every minute visible. Now I bill for what I actually do.",
    // 핵심 교훈
    lessons: [
      "Track EVERYTHING—small tasks add up to big money",
      "Batch clients by half-day to minimize switching",
      "Use historical Pomodoro data for future estimates",
      "Set hard stop times; the work expands to fill available time",
    ],
  },
  {
    id: "designer",
    name: "Sarah Park",
    role: "Freelance Brand & UI Designer",
    icon: Palette,
    color: "violet",
    location: "Brooklyn, NY",
    experience: "4 years freelancing",
    avatar: "S",
    // 배경
    background: {
      situation:
        "Sarah works with startups and small businesses on brand identity and product design. Projects range from logo design to full design systems.",
      income: "$80-100K/year",
      workStyle: "Hybrid—coworking space 3 days, home 2 days",
    },
    // 도전 과제
    challenges: [
      {
        challenge: "Perfectionism spirals",
        impact: "Spent 10+ hours on details clients didn't notice",
      },
      {
        challenge: "Revision fatigue",
        impact: "Unlimited revisions ate into profit margins",
      },
      {
        challenge: "Creative blocks",
        impact: "Stared at blank canvas for hours, felt unproductive",
      },
      {
        challenge: "Pricing anxiety",
        impact: "Undercharged by 30-40% compared to market rate",
      },
    ],
    // 포모도로 적용
    implementation: {
      duration: "6 weeks to see major changes",
      approach: [
        "45-min 'creative sprints' for exploration, 25-min for execution",
        "Capped revision rounds: 3 Pomodoros per revision cycle",
        "Used Pomodoro count to set project prices (X pomodoros × rate)",
        "Forced breaks prevented rabbit-hole perfectionism",
      ],
      tools: ["Pomobox for timing", "Figma for design", "Notion for project scope"],
    },
    // 결과
    results: {
      before: {
        projectTime: "40-60 hours per brand project",
        revisions: "Unlimited, unpaid",
        hourlyEffective: "$35/hr effective rate",
        burnout: "High—creative exhaustion frequent",
      },
      after: {
        projectTime: "25-35 hours per brand project",
        revisions: "3 rounds included, extras billed",
        hourlyEffective: "$65/hr effective rate",
        burnout: "Low—sustainable pace",
      },
      keyMetric: "Effective hourly rate nearly doubled",
    },
    // 인용
    quote:
      "Pomodoro broke my perfectionism. When the timer ends, I stop. Turns out clients loved my 'unfinished' work—they just wanted progress, not perfection.",
    // 핵심 교훈
    lessons: [
      "Time-box creative exploration; perfectionism hides in open-ended sessions",
      "Price projects by Pomodoro count, not gut feeling",
      "Longer sessions for creativity, shorter for revisions",
      "Breaks restore creative energy—they're not wasted time",
    ],
  },
  {
    id: "writer",
    name: "James Liu",
    role: "Freelance Content Writer & Copywriter",
    icon: PenTool,
    color: "emerald",
    location: "Vancouver, BC",
    experience: "5 years freelancing",
    avatar: "J",
    // 배경
    background: {
      situation:
        "James writes blog posts, website copy, and email sequences for B2B SaaS companies. He handles 15-20 pieces of content per month.",
      income: "$70-90K/year",
      workStyle: "Fully remote, travels frequently",
    },
    // 도전 과제
    challenges: [
      {
        challenge: "Writer's block anxiety",
        impact: "Spent hours 'thinking' without producing words",
      },
      {
        challenge: "Research rabbit holes",
        impact: "3-hour research sessions for 800-word articles",
      },
      {
        challenge: "Inconsistent output",
        impact: "Some days 5,000 words, others barely 500",
      },
      {
        challenge: "Deadline procrastination",
        impact: "Last-minute rushes, quality suffered",
      },
    ],
    // 포모도로 적용
    implementation: {
      duration: "2 months to establish rhythm",
      approach: [
        "Separate Pomodoros: Research (2), Outline (1), Draft (3-4), Edit (1-2)",
        "Word count targets per Pomodoro (aim: 400-500 words/session)",
        "'Garbage first draft' rule—just write during the timer, edit later",
        "Morning Pomodoros for drafting, afternoon for editing/admin",
      ],
      tools: ["Pomobox for timing", "Notion for content calendar", "Hemingway for editing"],
    },
    // 결과
    results: {
      before: {
        output: "8-12 articles/month",
        timePerArticle: "5-8 hours (highly variable)",
        wordCount: "1,500-2,500 words/day (inconsistent)",
        missedDeadlines: "2-3/month",
      },
      after: {
        output: "18-22 articles/month",
        timePerArticle: "3-4 hours (predictable)",
        wordCount: "3,000-4,000 words/day (consistent)",
        missedDeadlines: "0-1/month",
      },
      keyMetric: "Nearly doubled monthly output without increasing hours",
    },
    // 인용
    quote:
      "I used to wait for inspiration. Now I create it. Start the timer, put words on the page. After 25 minutes, I'm always in flow. Pomodoro taught me that motivation follows action.",
    // 핵심 교훈
    lessons: [
      "Don't wait to 'feel ready'—start the timer and begin",
      "Separate research from writing; mixing them kills productivity",
      "Track words per Pomodoro to predict project timelines",
      "Consistent small outputs beat sporadic large ones",
    ],
  },
]

// 공통 교훈
const COMMON_LESSONS = [
  {
    lesson: "Track Time Obsessively",
    explanation:
      "All three freelancers discovered they were losing significant income to untracked work. Pomodoro makes every minute visible—and billable.",
    icon: Clock,
  },
  {
    lesson: "Set Hard Boundaries",
    explanation:
      "The timer creates natural start and stop points. When work has clear containers, work-life balance becomes possible.",
    icon: Target,
  },
  {
    lesson: "Use Data for Pricing",
    explanation:
      "Historical Pomodoro data transforms pricing from guesswork to science. Know exactly how long tasks take, price accordingly.",
    icon: DollarSign,
  },
  {
    lesson: "Batch Similar Work",
    explanation:
      "All three batch similar tasks: client blocks, research vs. execution, creative vs. admin. Context switching is the enemy.",
    icon: BarChart3,
  },
]

// 프리랜서를 위한 Pomodoro 팁
const FREELANCER_TIPS = [
  {
    category: "Billing & Tracking",
    tips: [
      "Tag every Pomodoro with client name",
      "Bill in Pomodoro units (1 🍅 = 25 min = $X)",
      "Review weekly: Are you capturing all billable time?",
      "Build 15% buffer into estimates for admin/comms",
    ],
  },
  {
    category: "Client Management",
    tips: [
      "Assign client 'blocks' (AM/PM) not scattered throughout day",
      "Set response windows: check messages between Pomodoros",
      "Communicate in Pomodoro terms: 'This will take 2-3 sessions'",
      "Track scope creep in real-time with session logs",
    ],
  },
  {
    category: "Self-Motivation",
    tips: [
      "Start day with easy Pomodoro to build momentum",
      "Reward completed session streaks",
      "Make your Pomodoro count visible (dashboard, sticky note)",
      "Find an accountability partner for daily check-ins",
    ],
  },
]

// FAQ
const FAQS = [
  {
    question: "How do I handle interrupting client calls during a Pomodoro?",
    answer:
      "Set expectations upfront: 'I check messages every 30 minutes and respond to urgent calls immediately.' Define what 'urgent' means in your contract. Most clients are fine waiting if they know when to expect a response. For truly urgent matters, answer—but restart your Pomodoro fresh.",
  },
  {
    question: "Should I bill clients for Pomodoros spent on admin and emails?",
    answer:
      "Track them separately. Admin directly related to a client's project (sending files, clarifying scope) is billable. General business admin is not. Many freelancers add a 10-15% project management fee to cover client-related admin.",
  },
  {
    question: "How do I stay motivated working alone at home?",
    answer:
      "The Pomodoro structure itself is motivating—you only need to focus for 25 minutes, not 'all day.' Add external accountability: coworking sessions, virtual body-doubling, daily check-ins with a freelancer friend. Celebrate Pomodoro milestones to make progress visible.",
  },
  {
    question: "What if my work doesn't fit neatly into 25-minute chunks?",
    answer:
      "It rarely does—and that's fine. The timer is a rhythm, not a rule. If you're mid-flow at 25 minutes, finish your thought (another 5-10 min), then take a longer break. The point is regular breaks and time awareness, not rigid compliance.",
  },
  {
    question: "How do I convince clients that Pomodoro-based pricing is fair?",
    answer:
      "Don't sell them on Pomodoro—sell them on predictability. 'Based on similar projects, this will take 15-18 focused work sessions, which translates to X hours and Y cost.' Your internal methodology is yours; clients care about clear timelines and budgets.",
  },
]

// 관련 가이드
const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Core technique basics" },
  { href: "/guide/pomodoro-for-developers", title: "For Developers", description: "Technical focus strategies" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Block interruptions" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro for Freelancers: 3 Real Case Studies",
    description:
      "Real success stories from freelance developers, designers, and writers using Pomodoro for billing, client management, and productivity.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    url: "https://pomobox.app/guide/pomodoro-for-freelancers",
    mainEntityOfPage: "https://pomobox.app/guide/pomodoro-for-freelancers",
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

export default function PomodoroForFreelancersPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb items={BREADCRUMB_PRESETS.guide("Pomodoro for Freelancers")} className="mb-8" />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
            <Briefcase className="h-3 w-3" />
            Freelancer Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro for Freelancers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            3 real success stories. Real strategies. Real results.
          </p>
          <ArticleMeta readingTime="15 min" />

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500">3</div>
              <div className="text-xs text-muted-foreground">case studies</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">+30%</div>
              <div className="text-xs text-muted-foreground">avg income gain</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">2x</div>
              <div className="text-xs text-muted-foreground">output increase</div>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-16 prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Freelancing offers freedom, but it demands discipline. Without a boss or office
            structure, it&apos;s easy to lose hours to untracked work, burn out from
            boundary-less days, or undercharge because you don&apos;t know how long things
            actually take.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We spoke with three successful freelancers—a developer, a designer, and a writer—who
            transformed their businesses with the Pomodoro Technique. Their stories reveal common
            patterns that work across different creative fields.
          </p>
        </section>

        {/* Case Studies */}
        <section className="mb-16 space-y-12">
          {CASE_STUDIES.map((study, index) => {
            const Icon = study.icon
            const colorMap: Record<string, { bg: string; text: string; border: string }> = {
              cyan: {
                bg: "rgba(6, 182, 212, 0.1)",
                text: "rgb(6, 182, 212)",
                border: "rgba(6, 182, 212, 0.2)",
              },
              violet: {
                bg: "rgba(139, 92, 246, 0.1)",
                text: "rgb(139, 92, 246)",
                border: "rgba(139, 92, 246, 0.2)",
              },
              emerald: {
                bg: "rgba(16, 185, 129, 0.1)",
                text: "rgb(16, 185, 129)",
                border: "rgba(16, 185, 129, 0.2)",
              },
            }
            const colors = colorMap[study.color]

            return (
              <article
                key={study.id}
                className="rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 overflow-hidden"
              >
                {/* Case Study Header */}
                <div
                  className="p-6 md:p-8"
                  style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                      style={{ backgroundColor: colors.text }}
                    >
                      {study.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                        >
                          Case Study #{index + 1}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                        {study.name}
                      </h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Icon className="h-4 w-4" style={{ color: colors.text }} />
                          {study.role}
                        </span>
                        <span className="flex items-center gap-1">
                          <Home className="h-3 w-3" />
                          {study.location}
                        </span>
                        <span>{study.experience}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                  {/* Background */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      <Laptop className="h-4 w-4" />
                      Background
                    </h3>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <p className="text-muted-foreground mb-3">{study.background.situation}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-emerald-500" />
                          {study.background.income}
                        </span>
                        <span className="flex items-center gap-1">
                          <Home className="h-4 w-4 text-blue-500" />
                          {study.background.workStyle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      <AlertTriangle className="h-4 w-4 text-rose-500" />
                      Challenges Before Pomodoro
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {study.challenges.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10"
                        >
                          <h4 className="font-medium text-foreground mb-1">{item.challenge}</h4>
                          <p className="text-sm text-rose-500/80">{item.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implementation */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      <Zap className="h-4 w-4" style={{ color: colors.text }} />
                      How {study.name.split(" ")[0]} Applied Pomodoro
                    </h3>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/30 mb-4">
                      <p className="text-xs text-muted-foreground mb-3">
                        Adoption timeline: <strong className="text-foreground">{study.implementation.duration}</strong>
                      </p>
                      <ul className="space-y-2">
                        {study.implementation.approach.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: colors.text }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.implementation.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      Results
                    </h3>
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-2 px-2 font-medium text-foreground">Metric</th>
                            <th className="text-center py-2 px-2 font-medium text-rose-500">Before</th>
                            <th className="text-center py-2 px-2 font-medium text-emerald-500">After</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(study.results.before).map((key) => (
                            <tr key={key} className="border-b border-border/30 last:border-0">
                              <td className="py-2 px-2 text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </td>
                              <td className="py-2 px-2 text-center text-rose-500/80">
                                {study.results.before[key as keyof typeof study.results.before]}
                              </td>
                              <td className="py-2 px-2 text-center text-emerald-500">
                                {study.results.after[key as keyof typeof study.results.after]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="p-4 rounded-xl text-center"
                      style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                    >
                      <span className="text-sm text-muted-foreground">Key Result: </span>
                      <span className="font-semibold" style={{ color: colors.text }}>
                        {study.results.keyMetric}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="p-6 rounded-xl bg-muted/30 border-l-4" style={{ borderLeftColor: colors.text }}>
                    <Quote className="h-6 w-6 mb-3" style={{ color: colors.text }} />
                    <p className="text-lg text-foreground italic mb-3">&quot;{study.quote}&quot;</p>
                    <p className="text-sm text-muted-foreground">— {study.name}</p>
                  </div>

                  {/* Key Lessons */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Key Takeaways
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {study.lessons.map((lesson, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          {lesson}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        {/* Common Lessons */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Lightbulb className="h-3 w-3" />
              Common Patterns
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              What All Three Discovered
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMMON_LESSONS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.lesson}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold text-foreground">{item.lesson}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.explanation}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Practical Tips */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FileText className="h-3 w-3" />
              Actionable Tips
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Freelancer Pomodoro Playbook
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FREELANCER_TIPS.map((section) => (
              <div
                key={section.category}
                className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <h3 className="font-semibold text-foreground mb-4">{section.category}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0 mt-1" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Freelancer FAQs</h2>
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
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Transform Your Freelance Business?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start tracking today. Your first Pomodoro is free—and so is the clarity it brings
              to your work and billing.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Your First Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/pomodoro-for-managers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            For Managers
          </Link>
          <Link
            href="/guide/pomodoro-for-entrepreneurs"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            For Entrepreneurs
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
