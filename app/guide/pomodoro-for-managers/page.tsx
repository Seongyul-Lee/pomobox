import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Users,
  Clock,
  Calendar,
  Target,
  CheckCircle2,
  ChevronDown,
  Timer,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  Coffee,
  Zap,
  MessageSquare,
  Video,
  Mail,
  Brain,
  Shield,
  TrendingUp,
  UserCheck,
  Workflow,
  CalendarOff,
  CalendarCheck,
  ListTodo,
  RefreshCw,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"

export const metadata: Metadata = {
  title: "Pomodoro for Managers: Reclaim Focus in a Meeting-Heavy World | Pomobox",
  description:
    "Solve the manager's time paradox. Learn how to use Pomodoro between meetings, create no-meeting zones, and lead by example with focused work habits.",
  keywords: [
    "pomodoro for managers",
    "meeting management",
    "leadership productivity",
    "manager time management",
    "no meeting zones",
    "deep work for leaders",
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-for-managers",
    siteName: "Pomobox",
    title: "Pomodoro for Managers: Reclaim Focus in a Meeting-Heavy World",
    description:
      "The problem-solution guide for managers drowning in meetings. Create focus time, batch meetings, and spread productivity culture to your team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for Managers | Pomobox",
    description:
      "Solve the manager's paradox: meetings demand presence, but real work requires focus. Here's how Pomodoro helps.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-for-managers",
  },
}

// 문제 정의
const PROBLEMS = [
  {
    icon: Calendar,
    title: "Calendar Tetris",
    stat: "62%",
    description: "of managers report having less than 2 hours of uninterrupted time daily",
  },
  {
    icon: RefreshCw,
    title: "Context Switching Tax",
    stat: "23 min",
    description: "average time to regain focus after each meeting ends",
  },
  {
    icon: Brain,
    title: "Decision Fatigue",
    stat: "35,000",
    description: "decisions the average adult makes daily—managers make even more",
  },
  {
    icon: Mail,
    title: "Always-On Culture",
    stat: "121",
    description: "emails received per day by the average business professional",
  },
]

// 원인 분석
const ROOT_CAUSES = [
  {
    cause: "The Maker vs. Manager Schedule Clash",
    explanation:
      "Paul Graham identified this: makers need long blocks, managers live in 1-hour slots. As a manager, your calendar naturally fragments—but your strategic work still needs maker time.",
    icon: Clock,
  },
  {
    cause: "Meeting Culture Spirals",
    explanation:
      "Meetings beget meetings. One sync leads to follow-ups, which spawn sub-committees. Without intervention, meetings expand to fill all available time.",
    icon: Users,
  },
  {
    cause: "The Availability Expectation",
    explanation:
      "Being a good manager is equated with being always available. But constant availability means zero capacity for the thinking work that makes you effective.",
    icon: MessageSquare,
  },
  {
    cause: "Reactive vs. Proactive Imbalance",
    explanation:
      "Managers default to reactive mode—responding to requests, attending scheduled meetings, putting out fires. Proactive strategic work gets perpetually postponed.",
    icon: AlertTriangle,
  },
]

// 해결 전략
const SOLUTIONS = [
  {
    id: "no-meeting-zone",
    title: "Create No-Meeting Zones",
    icon: CalendarOff,
    color: "violet",
    description: "Block recurring time on your calendar for focused work. Treat these blocks as non-negotiable as any client meeting.",
    tactics: [
      {
        tactic: "Morning Focus Block",
        details: "Reserve 8-10 AM (or your peak energy time) for strategic work. No meetings, no exceptions.",
        implementation: "Block as 'Focus Time' on calendar, set auto-decline for this window",
      },
      {
        tactic: "No-Meeting Days",
        details: "Designate one day per week with zero meetings. Tuesday or Wednesday work best (Monday has kickoffs, Friday has wrap-ups).",
        implementation: "Team-wide agreement; communicate in advance to stakeholders",
      },
      {
        tactic: "Core Hours Model",
        details: "Set 10 AM - 3 PM as meeting-eligible. Before and after are protected focus time.",
        implementation: "Update calendar settings; communicate boundaries clearly",
      },
    ],
    metrics: { before: "0-1 hours focus/day", after: "2-3 hours focus/day" },
  },
  {
    id: "meeting-batching",
    title: "Batch Your Meetings",
    icon: CalendarCheck,
    color: "cyan",
    description: "Group similar meetings together to minimize context-switching. One long meeting day beats scattered meetings across five days.",
    tactics: [
      {
        tactic: "1:1 Day",
        details: "Stack all direct report 1:1s on the same day. Back-to-back with short breaks between.",
        implementation: "Block a full afternoon for 1:1s; 30 min each with 5 min buffer",
      },
      {
        tactic: "External Meeting Windows",
        details: "Designate specific windows for external calls/client meetings. Protect other times.",
        implementation: "Share your 'available for meetings' times with external partners",
      },
      {
        tactic: "Standing Meeting Audit",
        details: "Review recurring meetings quarterly. Cancel or reduce frequency of low-value standups.",
        implementation: "Ask: What decisions have these meetings driven in the last month?",
      },
    ],
    metrics: { before: "12+ context switches/day", after: "4-6 context switches/day" },
  },
  {
    id: "delegation",
    title: "Delegate with Pomodoros",
    icon: UserCheck,
    color: "emerald",
    description: "Use Pomodoros to create capacity for delegation. Investing one Pomodoro in delegation saves many in the future.",
    tactics: [
      {
        tactic: "Delegation Pomodoro",
        details: "Dedicate one 25-min session daily to offloading tasks. Write clear instructions, assign owners, set check-in points.",
        implementation: "Keep a 'to delegate' list; work through it systematically",
      },
      {
        tactic: "Teaching Moments",
        details: "Instead of doing tasks yourself, use a Pomodoro to teach someone else how to do them.",
        implementation: "Record Loom videos or write docs during delegation sessions",
      },
      {
        tactic: "Decision Frameworks",
        details: "Create decision trees so your team can handle routine decisions without you.",
        implementation: "Document: If X happens, do Y. Reduces meetings by 30%+",
      },
    ],
    metrics: { before: "Bottleneck on all decisions", after: "Team autonomy + fewer escalations" },
  },
  {
    id: "recovery-pomodoros",
    title: "Use Recovery Pomodoros",
    icon: RefreshCw,
    color: "amber",
    description: "After meetings, your brain needs time to rebuild focus. Don't jump straight into deep work—use a recovery session.",
    tactics: [
      {
        tactic: "Post-Meeting Processing",
        details: "Spend 10-15 min after meetings to capture action items, send follow-ups, update notes.",
        implementation: "Build 15 min buffer after every meeting in your calendar",
      },
      {
        tactic: "Low-Stakes First Task",
        details: "After a meeting block, do one easy Pomodoro (emails, admin) before attempting deep work.",
        implementation: "Queue up simple tasks specifically for post-meeting slots",
      },
      {
        tactic: "Energy Reset",
        details: "Take a real break between meeting mode and focus mode. Walk, stretch, get coffee.",
        implementation: "Set 5-min walking break between meeting blocks and focus blocks",
      },
    ],
    metrics: { before: "Scattered attention post-meetings", after: "Clean transition to focus work" },
  },
]

// 예방/장기 전략
const PREVENTION_STRATEGIES = [
  {
    title: "Model the Behavior",
    description: "When you protect your focus time, you give your team permission to protect theirs. Visible Pomodoro use normalizes deep work.",
    icon: Target,
  },
  {
    title: "Async by Default",
    description: "Challenge every meeting request: Could this be an email? A Loom video? A Slack thread? Reserve sync time for high-bandwidth communication.",
    icon: MessageSquare,
  },
  {
    title: "Teach Pomodoro to Your Team",
    description: "Share the technique with direct reports. When the whole team practices focused work, meeting culture naturally shifts.",
    icon: Users,
  },
  {
    title: "Audit Calendar Quarterly",
    description: "Every quarter, delete 20% of recurring meetings. If no one notices, they weren't needed.",
    icon: Calendar,
  },
]

// 팀 도입 가이드
const TEAM_ADOPTION = [
  {
    week: "Week 1-2",
    focus: "Personal Practice",
    actions: ["Start using Pomodoro yourself", "Protect 1 hour of focus time daily", "Track your sessions"],
  },
  {
    week: "Week 3-4",
    focus: "Make It Visible",
    actions: [
      "Share your focus calendar with team",
      "Set Slack status during Pomodoros",
      "Mention technique in 1:1s casually",
    ],
  },
  {
    week: "Month 2",
    focus: "Introduce to Team",
    actions: [
      "Run a 15-min Pomodoro intro session",
      "Designate optional team focus hours",
      "Encourage experimentation",
    ],
  },
  {
    week: "Month 3+",
    focus: "Institutionalize",
    actions: [
      "Make no-meeting zones team policy",
      "Include focus time in team agreements",
      "Celebrate deep work achievements",
    ],
  },
]

// FAQ
const FAQS = [
  {
    question: "My calendar is 80% meetings. Where do I even start?",
    answer:
      "Start small: protect just 30 minutes tomorrow morning. Use that time for one Pomodoro on your most important task. As you demonstrate results, gradually expand. Audit your meetings—cancel one low-value recurring meeting this week.",
  },
  {
    question: "Won't my team think I'm unavailable if I block focus time?",
    answer:
      "Reframe it: you're making yourself MORE available for what matters by being less available for what doesn't. Communicate clearly: 'I'm available for urgent issues anytime, but non-urgent items will wait until after my focus block.' Most 'urgent' things aren't.",
  },
  {
    question: "How do I handle executives who expect immediate responses?",
    answer:
      "Set expectations proactively: 'I check messages every hour and respond to urgent items immediately.' Define what 'urgent' means. Most executives respect boundary-setting if it comes with clear communication and reliable follow-through.",
  },
  {
    question: "What about open-door policies?",
    answer:
      "Open-door doesn't mean always-open. Signal when you're in focus mode (closed door, headphones, status light) and when you're available. Teams quickly learn your rhythm and batch their questions for your available times.",
  },
  {
    question: "How many Pomodoros can a manager realistically complete?",
    answer:
      "2-4 quality Pomodoros per day is excellent for most managers. That's 1-2 hours of protected focus time. The goal isn't maximizing pomodoro count—it's ensuring you have consistent time for strategic work that doesn't happen in meetings.",
  },
  {
    question: "Should I count 1:1 meetings as Pomodoros?",
    answer:
      "No—1:1s are valuable but different from focused individual work. However, you can use Pomodoro structure for 1:1s: 25-minute focused conversation + 5-minute break/transition. This keeps 1:1s efficient and prevents overrun.",
  },
]

// 관련 가이드
const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Core technique basics" },
  { href: "/guide/pomodoro-for-developers", title: "For Developers", description: "IC-focused strategies" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Block interruptions" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro Technique for Managers: Reclaim Focus in a Meeting-Heavy World",
    description:
      "A problem-solution guide for managers struggling with meeting overload. Learn to create focus time, batch meetings, and spread productivity culture.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    url: "https://pomobox.app/guide/pomodoro-for-managers",
    mainEntityOfPage: "https://pomobox.app/guide/pomodoro-for-managers",
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

export default function PomodoroForManagersPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb items={BREADCRUMB_PRESETS.guide("Pomodoro for Managers")} className="mb-8" />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-6">
            <Users className="h-3 w-3" />
            Manager Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro for Managers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Solve the meeting paradox. Lead with focus.
          </p>
          <ArticleMeta readingTime="11 min" />
        </header>

        {/* THE PROBLEM */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <AlertTriangle className="h-3 w-3" />
              The Problem
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              &quot;All Day in Meetings—When Do I Actually Work?&quot;
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10 mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              You know the feeling. Back-to-back meetings from 9 to 5. A few minutes between each—just enough to grab coffee, never enough to think. Important strategic work sits untouched. You answer emails at night just to stay afloat.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">This isn&apos;t a personal failure—it&apos;s a structural problem.</strong> Management roles are designed around availability and coordination. But your most important work requires focus that meetings destroy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROBLEMS.map((problem) => {
              const Icon = problem.icon
              return (
                <div
                  key={problem.title}
                  className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 text-center"
                >
                  <Icon className="h-5 w-5 text-rose-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">{problem.stat}</div>
                  <div className="text-xs text-muted-foreground">{problem.description}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* WHY THIS HAPPENS */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Brain className="h-3 w-3" />
              Root Causes
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Why Managers Lose Focus
            </h2>
          </div>

          <div className="space-y-4">
            {ROOT_CAUSES.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.cause}
                  className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 flex-shrink-0">
                      <Icon className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.cause}</h3>
                      <p className="text-sm text-muted-foreground">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* THE SOLUTIONS */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Lightbulb className="h-3 w-3" />
              Solutions
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Four Strategies That Work
            </h2>
          </div>

          <div className="space-y-8">
            {SOLUTIONS.map((solution) => {
              const Icon = solution.icon
              const colorMap: Record<string, string> = {
                violet: "violet",
                cyan: "cyan",
                emerald: "emerald",
                amber: "amber",
              }
              const color = colorMap[solution.color] || "primary"

              return (
                <div
                  key={solution.id}
                  className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  {/* Solution Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="p-3 rounded-2xl"
                      style={{
                        backgroundColor:
                          color === "violet"
                            ? "rgba(139, 92, 246, 0.1)"
                            : color === "cyan"
                              ? "rgba(6, 182, 212, 0.1)"
                              : color === "emerald"
                                ? "rgba(16, 185, 129, 0.1)"
                                : "rgba(245, 158, 11, 0.1)",
                      }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{
                          color:
                            color === "violet"
                              ? "rgb(139, 92, 246)"
                              : color === "cyan"
                                ? "rgb(6, 182, 212)"
                                : color === "emerald"
                                  ? "rgb(16, 185, 129)"
                                  : "rgb(245, 158, 11)",
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{solution.title}</h3>
                      <p className="text-sm text-muted-foreground">{solution.description}</p>
                    </div>
                  </div>

                  {/* Tactics */}
                  <div className="space-y-4 mb-6">
                    {solution.tactics.map((tactic, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-muted/50 border border-border/50"
                      >
                        <h4 className="font-medium text-foreground mb-2">{tactic.tactic}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{tactic.details}</p>
                        <p className="text-xs text-muted-foreground/80 italic flex items-start gap-2">
                          <Zap className="h-3 w-3 mt-0.5 flex-shrink-0" style={{
                            color:
                              color === "violet"
                                ? "rgb(139, 92, 246)"
                                : color === "cyan"
                                  ? "rgb(6, 182, 212)"
                                  : color === "emerald"
                                    ? "rgb(16, 185, 129)"
                                    : "rgb(245, 158, 11)",
                          }} />
                          {tactic.implementation}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/50 border border-border/30">
                    <div className="flex-1 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Before</div>
                      <div className="text-sm font-medium text-rose-500">{solution.metrics.before}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 text-center">
                      <div className="text-xs text-muted-foreground mb-1">After</div>
                      <div className="text-sm font-medium text-emerald-500">{solution.metrics.after}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* PREVENTION - Long-Term */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Shield className="h-3 w-3" />
              Prevention
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Building a Sustainable System
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PREVENTION_STRATEGIES.map((strategy) => {
              const Icon = strategy.icon
              return (
                <div
                  key={strategy.title}
                  className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-foreground">{strategy.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Team Adoption Roadmap */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Users className="h-3 w-3" />
              Team Rollout
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Spreading Focus Culture
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEAM_ADOPTION.map((phase, i) => (
                <div key={phase.week} className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-sm font-bold text-violet-500">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{phase.week}</h3>
                      <p className="text-xs text-muted-foreground">{phase.focus}</p>
                    </div>
                  </div>
                  <ul className="ml-11 space-y-2">
                    {phase.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0 mt-1" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Manager FAQs</h2>
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Lead with Focus?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start with one protected hour tomorrow. Block it now, before your calendar fills up.
              Your strategic work is waiting.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Focus Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/pomodoro-for-designers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            For Designers
          </Link>
          <Link
            href="/guide/pomodoro-for-freelancers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            For Freelancers
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
