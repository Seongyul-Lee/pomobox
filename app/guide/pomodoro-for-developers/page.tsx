import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Code2,
  Brain,
  Clock,
  Target,
  Coffee,
  Bug,
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  Timer,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Terminal,
  Zap,
  FileCode,
  Layers,
  RefreshCw,
  MessageSquare,
  ArrowRight,
  Wrench,
  Database,
  Layout,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Pomodoro for Developers: Code Better, Ship Faster | Pomobox",
  description: "Deep coding sessions, debugging workflows, and code reviews with Pomodoro. Estimate tasks accurately and reduce context-switching.",
  keywords: ["pomodoro for developers", "coding productivity", "programmer focus", "developer time management", "coding sessions", "software developer productivity"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-for-developers",
    siteName: "Pomobox",
    title: "Pomodoro for Developers: Code Smarter, Ship Faster",
    description: "Master time-boxed coding sessions. Deep work, debugging, code reviews, and meeting recovery strategies for software developers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for Developers | Pomobox",
    description: "Code smarter with Pomodoro: deep coding, debugging strategies, and focus techniques for developers.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-for-developers",
  },
}

// Data
const DEV_SCENARIOS = [
  {
    icon: FileCode,
    title: "Deep Coding Sessions",
    duration: "45-50 min focus + 10 min rest",
    description: "Longer sessions for complex implementations. Get into flow state, then protect it. One feature or module per session.",
    tips: ["Close Slack/email completely", "Write intent comment before coding", "Commit at each break"],
  },
  {
    icon: Bug,
    title: "Debugging & Problem-Solving",
    duration: "25 min investigate + 5 min document",
    description: "Shorter sessions prevent tunnel vision. Document findings each break. Fresh eyes after rest often spot the bug.",
    tips: ["Set hypothesis before starting", "Time-box rabbit holes", "Log progress in breaks"],
  },
  {
    icon: GitBranch,
    title: "Code Review",
    duration: "25 min review + 5 min comments",
    description: "Focused review catches more issues than skimming. One PR per pomodoro for thorough feedback.",
    tips: ["Review logic before style", "Note patterns for later", "Write constructive comments"],
  },
  {
    icon: Layers,
    title: "Learning New Tech",
    duration: "25 min tutorial + 5 min practice",
    description: "Mix reading with hands-on coding. Build something small each session to cement understanding.",
    tips: ["Code along, don't just read", "Modify examples to test understanding", "Document gotchas"],
  },
]

const TASK_ESTIMATES = [
  { task: "Small bug fix", pomodoros: "1-2", notes: "Investigation + fix + test" },
  { task: "Medium feature", pomodoros: "3-5", notes: "Design + implement + refactor" },
  { task: "Large feature", pomodoros: "8-12", notes: "Break into subtasks first" },
  { task: "Code review (avg PR)", pomodoros: "1-2", notes: "Thorough review + comments" },
  { task: "Documentation", pomodoros: "2-3", notes: "Draft + examples + review" },
  { task: "Refactoring", pomodoros: "2-4", notes: "Plan + execute + verify tests" },
]

const INTERRUPTION_STRATEGIES = [
  {
    icon: MessageSquare,
    type: "Slack Messages",
    strategy: "Batch check during breaks only. Set status to 'Deep Work 🍅' during pomodoros. Most 'urgent' messages can wait 25 minutes.",
  },
  {
    icon: RefreshCw,
    type: "Meetings",
    strategy: "Schedule pomodoros around meetings. After meetings, do a 'recovery pomodoro'—simple task first to rebuild focus before complex work.",
  },
  {
    icon: Bug,
    type: "Production Issues",
    strategy: "True emergencies break the pomodoro—that's fine. Note where you were, handle it, then restart fresh. Don't resume mid-thought.",
  },
  {
    icon: Terminal,
    type: "Quick Questions",
    strategy: "Write down who asked what. Handle all accumulated questions in one break. Batching is faster than context-switching.",
  },
]

const ENVIRONMENT_SETUP = [
  {
    icon: Terminal,
    title: "IDE Setup",
    items: ["Enable focus mode / zen mode", "Close file explorers you don't need", "Use keyboard shortcuts over mouse", "Disable notifications in editor"],
  },
  {
    icon: Layout,
    title: "Desktop Setup",
    items: ["Single monitor for deep work (or disable second)", "Close browser tabs except docs", "Use virtual desktops—one for code, one for reference", "Dark mode reduces eye strain"],
  },
  {
    icon: Wrench,
    title: "Tools & Blockers",
    items: ["Website blockers: Freedom, Cold Turkey", "Pomodoro timer: Pomobox (obviously)", "Status indicator for team visibility", "Noise: lo-fi music or white noise"],
  },
]

const FAQS = [
  {
    question: "25 minutes isn't enough for coding flow state. What do I do?",
    answer: "Use 45-50 minute pomodoros for deep coding. The classic 25 minutes was designed for administrative work. Developers often need longer sessions. Experiment with 40, 45, or 50 minutes to find your optimal duration.",
  },
  {
    question: "How do I handle a pomodoro when I'm 'almost done'?",
    answer: "Finish the current logical unit (function, test, commit), then take the break. Don't start something new. The break helps cement what you learned and prevents errors from fatigue.",
  },
  {
    question: "Should I count meetings as pomodoros?",
    answer: "No—meetings aren't focused individual work. After meetings, schedule a 'recovery pomodoro' doing simpler tasks (code review, documentation) before tackling complex coding. Your focus needs time to rebuild.",
  },
  {
    question: "How do I track coding pomodoros for project estimates?",
    answer: "Log pomodoros per task/ticket. After a few weeks, you'll have data: 'medium bugs take 2 pomodoros, features take 5-8.' This dramatically improves sprint planning accuracy.",
  },
  {
    question: "What if I'm pair programming?",
    answer: "Sync pomodoros with your partner—focus together, break together. During breaks, discuss approach or take separate rests. Driver/navigator switches can happen at break boundaries.",
  },
  {
    question: "How many coding pomodoros per day is realistic?",
    answer: "6-8 deep coding pomodoros (4-5 hours) is excellent. Beyond that, quality drops. Senior devs often report 4-6 hours of focused coding as their sustainable maximum. The rest is meetings, reviews, and admin.",
  },
]

const WORKFLOW_INTEGRATION = [
  {
    workflow: "Agile/Scrum",
    approach: "Estimate tickets in pomodoros. 1 story point ≈ 2-3 pomodoros. Track actual vs estimated for calibration. Use standup to share previous day's pomodoro count.",
  },
  {
    workflow: "Kanban",
    approach: "Pomodoros per WIP item. Visible timer on desk/screen shows you're in flow. Team learns to batch questions for your breaks.",
  },
  {
    workflow: "Remote Work",
    approach: "Status messages + calendar blocks show availability. Video off during pomodoros. Async by default—sync in breaks or scheduled slots.",
  },
]

const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Core technique basics" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Block interruptions effectively" },
  { href: "/guide/pomodoro-vs-timeboxing", title: "Pomodoro vs Timeboxing", description: "Compare methodologies" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro Technique for Developers: Code Better with Time-Boxing",
    description: "Complete guide to using Pomodoro for software development: deep coding sessions, debugging, code reviews, and team workflow integration.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-20",
    dateModified: "2025-01-05",
    url: "https://pomobox.app/guide/pomodoro-for-developers",
    mainEntityOfPage: "https://pomobox.app/guide/pomodoro-for-developers",
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

export default function PomodoroForDevelopersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/guide/what-is-pomodoro"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pomodoro Guide
        </Link>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-6">
            <Code2 className="h-3 w-3" />
            Developer Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro for Developers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Code smarter, ship faster. Deep work sessions for serious programmers.
          </p>

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-cyan-500">45</div>
              <div className="text-xs text-muted-foreground">min deep work</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">23</div>
              <div className="text-xs text-muted-foreground">min to refocus</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">6-8</div>
              <div className="text-xs text-muted-foreground">daily pomodoros</div>
            </div>
          </div>
        </header>

        {/* Why Developers Need Pomodoro */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-cyan-500/10">
                <Brain className="h-5 w-5 text-cyan-500" />
              </span>
              The Developer's Focus Problem
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Research shows:</strong> It takes an average of <strong className="text-foreground">23 minutes</strong> to fully regain focus after an interruption. In a typical dev environment with Slack pings, quick questions, and meetings, you might never reach deep focus at all.
              </p>
              <p>
                <strong className="text-foreground">The flow state paradox:</strong> Programming requires flow state for quality work—but modern dev environments destroy flow constantly. Studies show developers get only <strong className="text-foreground">2 hours of uninterrupted coding</strong> per 8-hour day on average.
              </p>
              <p>
                <strong className="text-foreground">Pomodoro as a shield:</strong> Time-boxing creates protected blocks. When the timer runs, you have explicit permission to ignore Slack. The break provides a scheduled time to handle everything else. Structure creates freedom.
              </p>
              <p>
                <strong className="text-foreground">Bonus:</strong> Tracking pomodoros per task gives you actual data for estimates. "This feature will take 2 weeks" becomes "This feature will take 15-18 pomodoros"—much more accurate.
              </p>
            </div>
          </div>
        </section>

        {/* Dev Scenarios */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Terminal className="h-3 w-3" />
              By Task Type
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Pomodoro for Different Dev Tasks
            </h2>
          </div>

          <div className="space-y-4">
            {DEV_SCENARIOS.map((scenario) => {
              const Icon = scenario.icon
              return (
                <div
                  key={scenario.title}
                  className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 flex-shrink-0">
                      <Icon className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{scenario.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {scenario.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {scenario.tips.map((tip, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {tip}
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

        {/* Task Estimation */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Clock className="h-3 w-3" />
              Estimation
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Pomodoro-Based Estimation
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-2 font-medium text-foreground">Task Type</th>
                    <th className="text-center py-3 px-2 font-medium text-foreground">Pomodoros</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {TASK_ESTIMATES.map((item, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="py-3 px-2 text-foreground">{item.task}</td>
                      <td className="py-3 px-2 text-center text-primary font-medium">{item.pomodoros} 🍅</td>
                      <td className="py-3 px-2 text-muted-foreground">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              * Track your actual pomodoros per task for 2-3 weeks to calibrate these estimates to your own pace.
            </p>
          </div>
        </section>

        {/* Handling Interruptions */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <AlertTriangle className="h-3 w-3" />
              Interruption Handling
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Dealing with Interruptions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERRUPTION_STRATEGIES.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.type}
                  className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-rose-500" />
                    <h3 className="font-semibold text-foreground">{item.type}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.strategy}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Environment Setup */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Wrench className="h-3 w-3" />
              Environment
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Optimize Your Setup
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ENVIRONMENT_SETUP.map((section) => {
              const Icon = section.icon
              return (
                <div
                  key={section.title}
                  className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Icon className="h-4 w-4 text-amber-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Workflow Integration */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <GitBranch className="h-3 w-3" />
              Team Workflow
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Integrate with Your Workflow
            </h2>
          </div>

          <div className="space-y-4">
            {WORKFLOW_INTEGRATION.map((item) => (
              <div
                key={item.workflow}
                className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/10"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.workflow}</h3>
                <p className="text-sm text-muted-foreground">{item.approach}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Developer FAQs
            </h2>
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Ship More Code?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start your first coding pomodoro. Track your sessions, measure your output, and watch your productivity data transform your estimates.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Coding Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/pomodoro-for-students"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            For Students
          </Link>
          <Link
            href="/guide/pomodoro-vs-timeboxing"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Pomodoro vs Timeboxing
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
