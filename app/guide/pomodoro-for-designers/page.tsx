import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Palette,
  Sparkles,
  Clock,
  Target,
  CheckCircle2,
  ChevronDown,
  Timer,
  ArrowRight,
  ArrowLeft,
  Layers,
  Eye,
  MessageSquare,
  Lightbulb,
  Wrench,
  Monitor,
  Coffee,
  Zap,
  PenTool,
  Layout,
  MousePointer,
  Repeat,
  AlertTriangle,
  Rocket,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"

export const metadata: Metadata = {
  title: "Pomodoro for Designers: 5 Steps to Creative Focus | Pomobox",
  description:
    "A step-by-step guide to applying Pomodoro for design work. Optimize creative sessions, manage client feedback, and ship better designs faster.",
  keywords: [
    "pomodoro for designers",
    "creative productivity",
    "design focus",
    "figma workflow",
    "designer time management",
    "creative sessions",
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-for-designers",
    siteName: "Pomobox",
    title: "Pomodoro for Designers: 5 Steps to Creative Focus",
    description:
      "Master creative productivity with structured focus sessions. Optimize Figma workflows, handle feedback efficiently, and prevent creative burnout.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for Designers | Pomobox",
    description:
      "Design smarter with Pomodoro: creative sessions, feedback loops, and focus techniques for designers.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-for-designers",
  },
}

// 단계별 가이드 데이터
const GUIDE_STEPS = [
  {
    step: 1,
    icon: Layers,
    title: "Categorize Your Work",
    subtitle: "Separate creative from execution tasks",
    duration: "5-10 min (one-time setup)",
    description:
      "Design work isn't monolithic. Some tasks require free-flowing creativity, others demand precise execution. Understanding which is which lets you structure sessions accordingly.",
    details: [
      {
        category: "Creative Work",
        color: "violet",
        tasks: [
          "Brainstorming & ideation",
          "Initial concept sketches",
          "Exploring visual directions",
          "Mood board creation",
        ],
        recommendation: "40-50 min sessions with longer breaks",
      },
      {
        category: "Execution Work",
        color: "cyan",
        tasks: [
          "Component building",
          "Design system updates",
          "Asset exports",
          "Responsive adaptations",
        ],
        recommendation: "25 min classic Pomodoro",
      },
      {
        category: "Review Work",
        color: "amber",
        tasks: [
          "Design QA",
          "Client feedback review",
          "Handoff preparation",
          "Documentation",
        ],
        recommendation: "25 min focused batches",
      },
    ],
    tips: [
      "Create a simple spreadsheet to categorize your recurring tasks",
      "Color-code your calendar by work type",
      "Schedule creative work during your peak energy hours",
    ],
  },
  {
    step: 2,
    icon: Clock,
    title: "Design Your Sessions",
    subtitle: "Match session length to task type",
    duration: "Ongoing practice",
    description:
      "The classic 25-minute Pomodoro works for some design tasks, but creative work often benefits from longer sessions. Here's how to structure different session types.",
    sessionTypes: [
      {
        type: "Creative Sprint",
        duration: "45-50 min",
        break: "15 min",
        bestFor: "New concepts, exploration, brainstorming",
        color: "violet",
      },
      {
        type: "Standard Build",
        duration: "25 min",
        break: "5 min",
        bestFor: "Component creation, systematic work",
        color: "cyan",
      },
      {
        type: "Quick Review",
        duration: "15-20 min",
        break: "3 min",
        bestFor: "Feedback review, small revisions",
        color: "emerald",
      },
    ],
    tips: [
      "Start with standard 25 min and adjust based on when you naturally want to stop",
      "Longer sessions need longer breaks—don't skip rest after creative sprints",
      "Use the first 2-3 minutes of each session to set a clear intention",
    ],
  },
  {
    step: 3,
    icon: Monitor,
    title: "Optimize Your Environment",
    subtitle: "Set up Figma & tools for focused work",
    duration: "10-15 min setup",
    description:
      "Your design environment directly impacts focus. Small tweaks to your Figma setup and workspace can dramatically reduce context-switching and interruptions.",
    environmentSetup: [
      {
        area: "Figma Setup",
        icon: PenTool,
        items: [
          "Close unnecessary pages/projects",
          "Use focus mode (hide UI panels)",
          "Organize components before starting",
          "Set up keyboard shortcuts for common actions",
        ],
      },
      {
        area: "Desktop Setup",
        icon: Layout,
        items: [
          "Single window mode for design app",
          "Close email and messaging apps",
          "Use a separate browser profile for references only",
          "Keep inspiration board in a separate virtual desktop",
        ],
      },
      {
        area: "Physical Space",
        icon: Coffee,
        items: [
          "Proper lighting (avoid screen glare)",
          "Sketch materials within reach",
          "Water bottle nearby",
          "Headphones ready for focus music",
        ],
      },
    ],
    tips: [
      "Create a 'Focus Canvas' template in Figma with only what you need",
      "Use a website blocker during sessions (Dribbble can wait)",
      "Set Slack/Discord to DND with auto-response",
    ],
  },
  {
    step: 4,
    icon: MessageSquare,
    title: "Handle Feedback Efficiently",
    subtitle: "Process client & team input without derailing",
    duration: "Dedicated sessions",
    description:
      "Client feedback is essential but can fragment your focus. Batch feedback into dedicated sessions instead of reacting in real-time.",
    feedbackSystem: [
      {
        phase: "Collect",
        description: "Gather all feedback in one place (Figma comments, emails, meeting notes)",
        icon: Eye,
      },
      {
        phase: "Categorize",
        description: "Sort by urgency and effort: Quick fixes vs. Major changes",
        icon: Layers,
      },
      {
        phase: "Schedule",
        description: "Allocate specific Pomodoros: 1-2 for quick fixes, plan sessions for major revisions",
        icon: Clock,
      },
      {
        phase: "Execute",
        description: "Work through feedback systematically, one category at a time",
        icon: Target,
      },
    ],
    feedbackBatching: [
      { type: "Quick fixes (typos, colors)", pomodoros: "1", timing: "End of day" },
      { type: "Medium revisions (layout tweaks)", pomodoros: "2-3", timing: "Dedicated block" },
      { type: "Major changes (concept pivots)", pomodoros: "4+", timing: "Fresh session" },
    ],
    tips: [
      "Check feedback only between Pomodoros, never during",
      "Respond to acknowledge receipt, then schedule the actual work",
      "Group similar feedback items to avoid context-switching",
    ],
  },
  {
    step: 5,
    icon: Repeat,
    title: "Review & Refine",
    subtitle: "Track progress and optimize your rhythm",
    duration: "Weekly 15-min review",
    description:
      "The Pomodoro Technique improves with data. Track your sessions to understand your patterns and continuously refine your approach.",
    trackingMetrics: [
      { metric: "Sessions completed", why: "Baseline productivity measure" },
      { metric: "Session type distribution", why: "Balance creative vs. execution" },
      { metric: "Interruptions per session", why: "Identify focus blockers" },
      { metric: "Energy levels", why: "Find your peak creative hours" },
    ],
    weeklyReview: [
      "How many Pomodoros did I complete?",
      "Which sessions felt most productive?",
      "What interrupted me most?",
      "Did I have enough creative vs. execution balance?",
      "What will I adjust next week?",
    ],
    tips: [
      "Use Pomobox stats to see your weekly patterns",
      "Note your energy after each session (even just 1-5 scale)",
      "Adjust session lengths based on what's working",
    ],
  },
]

// Prerequisites
const PREREQUISITES = [
  {
    icon: Timer,
    title: "Pomodoro Timer",
    description: "Any timer works—Pomobox tracks stats automatically",
  },
  {
    icon: PenTool,
    title: "Design Tool",
    description: "Figma, Sketch, Adobe XD, or your tool of choice",
  },
  {
    icon: Lightbulb,
    title: "Open Mind",
    description: "Willingness to experiment with session lengths",
  },
]

// Warnings
const WARNINGS = [
  {
    title: "Don't force creative flow",
    description:
      "If inspiration strikes, it's okay to extend a session. The timer is a guide, not a prison. Just take a longer break after.",
  },
  {
    title: "Avoid perfectionism traps",
    description:
      "Set clear 'done' criteria before starting. When the timer ends, stop tweaking and move on. Iteration happens in the next session.",
  },
  {
    title: "Don't skip breaks",
    description:
      "Creative work is mentally exhausting. Skipping breaks leads to creative blocks later. Step away, even if it feels unnecessary.",
  },
]

// FAQ data
const FAQS = [
  {
    question: "Creativity can't be timed—doesn't Pomodoro kill inspiration?",
    answer:
      "Actually, constraints often boost creativity. Knowing you have 45 minutes creates urgency that fights perfectionism and overthinking. If inspiration truly strikes mid-session, finish your thought, note where you are, and take a shorter break. The structure is flexible—use it as a guide, not a prison.",
  },
  {
    question: "How do I handle urgent client requests during a Pomodoro?",
    answer:
      "Ask yourself: Is this truly urgent, or just marked 'urgent'? Most 'urgent' requests can wait 20 minutes. If it's genuinely time-sensitive (presentation in an hour), handle it—but restart your Pomodoro fresh after. Don't try to resume mid-thought.",
  },
  {
    question: "What about collaborative design sessions or workshops?",
    answer:
      "Sync Pomodoros with your team: focused work together, breaks together. For workshops, use 25-minute sprints followed by 10-minute share-outs. The group rhythm keeps energy high and prevents meetings from dragging.",
  },
  {
    question: "How many design Pomodoros should I aim for daily?",
    answer:
      "Quality over quantity. 4-6 deep creative Pomodoros is excellent—that's 3-4 hours of genuine focus. Beyond that, creative quality drops. Fill remaining time with less demanding tasks: admin, emails, or lighter work.",
  },
  {
    question: "Should I count research and inspiration browsing as Pomodoros?",
    answer:
      "Only if it's intentional. 'Research Pomodoro: find 5 navigation patterns for this project'—yes. Aimlessly scrolling Dribbble—no. Set a specific goal for research sessions, otherwise they become procrastination disguised as work.",
  },
]

// Related guides
const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Core technique basics" },
  { href: "/guide/pomodoro-for-developers", title: "For Developers", description: "Coding-focused strategies" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Block interruptions" },
]

// JSON-LD schema
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Pomodoro Technique for Designers: 5 Steps to Creative Focus",
    description:
      "A step-by-step guide to applying the Pomodoro Technique for design work, including creative sessions, feedback handling, and workflow optimization.",
    step: GUIDE_STEPS.map((step) => ({
      "@type": "HowToStep",
      position: step.step,
      name: step.title,
      text: step.description,
    })),
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

export default function PomodoroForDesignersPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb items={BREADCRUMB_PRESETS.guide("Pomodoro for Designers")} className="mb-8" />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-6">
            <Palette className="h-3 w-3" />
            Designer Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro for Designers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            5 steps to master creative focus. Design better, ship faster.
          </p>
          <ArticleMeta readingTime="12 min" />

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-violet-500">45</div>
              <div className="text-xs text-muted-foreground">min creative sprint</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">5</div>
              <div className="text-xs text-muted-foreground">simple steps</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">4-6</div>
              <div className="text-xs text-muted-foreground">daily sessions</div>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-16 prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Design work demands a unique kind of focus. Unlike repetitive tasks, creative work
            requires shifting between open exploration and precise execution—sometimes within the
            same hour. The Pomodoro Technique, when adapted for designers, creates a rhythm that
            protects your creative energy while ensuring you ship quality work.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This guide breaks down the process into{" "}
            <strong className="text-foreground">5 actionable steps</strong>. Whether you&apos;re a
            UI designer drowning in feedback, a brand designer juggling multiple clients, or a
            product designer fighting meeting overload—these steps will help you reclaim your focus.
          </p>
        </section>

        {/* Prerequisites */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10">
            <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mb-6">
              <Rocket className="h-5 w-5 text-violet-500" />
              Before You Start
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PREREQUISITES.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10 flex-shrink-0">
                      <Icon className="h-4 w-4 text-violet-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-16 space-y-8">
          {GUIDE_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                {/* Step Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-violet-500">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>

                {/* Step Description */}
                <p className="text-muted-foreground mb-6">{step.description}</p>

                {/* Step 1: Work Categories */}
                {step.details && (
                  <div className="space-y-4 mb-6">
                    {step.details.map((detail) => (
                      <div
                        key={detail.category}
                        className={`p-4 rounded-xl bg-${detail.color}-500/5 border border-${detail.color}-500/10`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`w-2 h-2 rounded-full bg-${detail.color}-500`}
                            style={{
                              backgroundColor:
                                detail.color === "violet"
                                  ? "rgb(139, 92, 246)"
                                  : detail.color === "cyan"
                                    ? "rgb(6, 182, 212)"
                                    : "rgb(245, 158, 11)",
                            }}
                          />
                          <h3 className="font-medium text-foreground">{detail.category}</h3>
                        </div>
                        <ul className="grid grid-cols-2 gap-2 mb-3">
                          {detail.tasks.map((task, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-muted-foreground/80 italic">
                          → {detail.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2: Session Types */}
                {step.sessionTypes && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {step.sessionTypes.map((session) => (
                      <div
                        key={session.type}
                        className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center"
                      >
                        <h3 className="font-medium text-foreground mb-2">{session.type}</h3>
                        <div className="text-2xl font-bold text-primary mb-1">{session.duration}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          +{session.break} break
                        </div>
                        <p className="text-xs text-muted-foreground">{session.bestFor}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 3: Environment Setup */}
                {step.environmentSetup && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {step.environmentSetup.map((setup) => {
                      const SetupIcon = setup.icon
                      return (
                        <div key={setup.area} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                          <div className="flex items-center gap-2 mb-3">
                            <SetupIcon className="h-4 w-4 text-violet-500" />
                            <h3 className="font-medium text-foreground text-sm">{setup.area}</h3>
                          </div>
                          <ul className="space-y-2">
                            {setup.items.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs text-muted-foreground"
                              >
                                <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Step 4: Feedback System */}
                {step.feedbackSystem && (
                  <>
                    <div className="flex flex-wrap justify-between gap-2 mb-6">
                      {step.feedbackSystem.map((phase, i) => {
                        const PhaseIcon = phase.icon
                        return (
                          <div key={phase.phase} className="flex items-center gap-2">
                            {i > 0 && <ArrowRight className="h-4 w-4 text-muted-foreground/50" />}
                            <div className="p-3 rounded-xl bg-muted/50 text-center">
                              <PhaseIcon className="h-4 w-4 text-violet-500 mx-auto mb-1" />
                              <span className="text-xs font-medium text-foreground">{phase.phase}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-2 px-2 font-medium text-foreground">
                              Feedback Type
                            </th>
                            <th className="text-center py-2 px-2 font-medium text-foreground">
                              Pomodoros
                            </th>
                            <th className="text-left py-2 px-2 font-medium text-foreground">
                              When
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {step.feedbackBatching?.map((item, i) => (
                            <tr key={i} className="border-b border-border/30 last:border-0">
                              <td className="py-2 px-2 text-muted-foreground">{item.type}</td>
                              <td className="py-2 px-2 text-center text-primary font-medium">
                                {item.pomodoros} 🍅
                              </td>
                              <td className="py-2 px-2 text-muted-foreground">{item.timing}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Step 5: Review */}
                {step.trackingMetrics && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {step.trackingMetrics.map((item) => (
                        <div key={item.metric} className="p-3 rounded-xl bg-muted/50 text-center">
                          <div className="text-xs font-medium text-foreground mb-1">{item.metric}</div>
                          <div className="text-xs text-muted-foreground">{item.why}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                      <h3 className="font-medium text-foreground mb-3 text-sm">
                        Weekly Review Questions
                      </h3>
                      <ul className="space-y-2">
                        {step.weeklyReview?.map((question, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-violet-500 font-medium">{i + 1}.</span>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Tips */}
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <h3 className="flex items-center gap-2 font-medium text-foreground mb-3 text-sm">
                    <Lightbulb className="h-4 w-4 text-emerald-500" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-2">
                    {step.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0 mt-1" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </section>

        {/* Warnings / Cautions */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <AlertTriangle className="h-3 w-3" />
              Important Warnings
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground">Watch Out For</h2>
          </div>

          <div className="space-y-4">
            {WARNINGS.map((warning) => (
              <div
                key={warning.title}
                className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10"
              >
                <h3 className="font-semibold text-foreground mb-2">{warning.title}</h3>
                <p className="text-sm text-muted-foreground">{warning.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10">
            <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mb-4">
              <Zap className="h-5 w-5 text-cyan-500" />
              What&apos;s Next?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">This week:</strong> Start with Step 1—categorize
                your current projects. Try one creative sprint (45 min) and one standard session (25
                min) to feel the difference.
              </p>
              <p>
                <strong className="text-foreground">Next week:</strong> Implement Steps 2-3. Set up
                your environment and experiment with session lengths. Track what works.
              </p>
              <p>
                <strong className="text-foreground">Ongoing:</strong> Add feedback batching (Step 4)
                and weekly reviews (Step 5) as the system becomes natural.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Designer FAQs</h2>
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Design with Focus?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start your first creative sprint. Track your sessions, find your rhythm, and watch
              your design workflow transform.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Creative Session
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
            href="/guide/pomodoro-for-managers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            For Managers
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <Script id="howto-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd[0])}
      </Script>
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd[1])}
      </Script>
    </main>
  )
}
