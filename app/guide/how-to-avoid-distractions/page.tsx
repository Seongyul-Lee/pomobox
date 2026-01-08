import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ShieldOff,
  Brain,
  Smartphone,
  Bell,
  Users,
  Monitor,
  Headphones,
  Coffee,
  ChevronDown,
  Timer,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Clock,
  Eye,
  Volume2,
  Wifi,
  MessageSquare,
  Home,
  Building,
  Moon,
  Lock,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { DistractionAudit } from "@/components/ui/distraction-audit"

export const metadata: Metadata = {
  title: "How to Avoid Distractions: Complete Focus Guide | Pomobox",
  description: "Master distraction-free work: digital detox strategies, environment optimization, handling interruptions, and building sustainable focus habits. Science-backed methods.",
  keywords: ["avoid distractions", "focus at work", "digital distractions", "concentration tips", "productivity focus", "distraction-free work"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/how-to-avoid-distractions",
    siteName: "Pomobox",
    title: "How to Avoid Distractions: Complete Focus Guide",
    description: "Eliminate distractions and protect your focus. Digital strategies, environment setup, and science-backed methods for deep work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avoid Distractions Guide | Pomobox",
    description: "Master distraction-free work: digital detox, environment optimization, and focus habits.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/how-to-avoid-distractions",
  },
}

// Data
const DISTRACTION_TYPES = [
  {
    icon: Smartphone,
    type: "Digital Distractions",
    examples: "Social media, notifications, email, news, YouTube",
    impact: "Steals 2+ hours daily for average knowledge worker",
    color: "rose",
  },
  {
    icon: Users,
    type: "Social Interruptions",
    examples: "Colleagues, quick questions, meetings, calls",
    impact: "23 minutes to regain focus after each interruption",
    color: "amber",
  },
  {
    icon: Volume2,
    type: "Environmental Noise",
    examples: "Office chatter, construction, traffic, household sounds",
    impact: "Degrades complex cognitive performance by 50-66%",
    color: "violet",
  },
  {
    icon: Brain,
    type: "Internal Distractions",
    examples: "Worry, daydreaming, task-switching urges, hunger",
    impact: "Mind wanders 47% of waking hours on average",
    color: "cyan",
  },
]

const DIGITAL_STRATEGIES = [
  {
    icon: Bell,
    title: "Notification Purge",
    description: "Turn off ALL non-essential notifications. Keep only calls/texts from favorites. Batch check everything else 2-3 times daily.",
    tools: ["iOS/Android Focus modes", "Do Not Disturb schedules", "App-specific notification settings"],
  },
  {
    icon: Lock,
    title: "Website/App Blockers",
    description: "Block distracting sites during work hours. The friction of bypassing a blocker often breaks the compulsion loop.",
    tools: ["Freedom (cross-platform)", "Cold Turkey (desktop)", "Forest (mobile gamification)"],
  },
  {
    icon: Monitor,
    title: "Device Separation",
    description: "Keep phone in another room during deep work. Studies show even a visible phone reduces cognitive capacity by 10%.",
    tools: ["Physical phone box/drawer", "Smart speaker for urgent calls only", "Airplane mode during sessions"],
  },
  {
    icon: MessageSquare,
    title: "Communication Batching",
    description: "Check email/Slack at scheduled times (e.g., 9am, 1pm, 5pm). Set expectations with colleagues about response times.",
    tools: ["Calendar blocks for communication", "Auto-responders explaining schedule", "Status messages indicating focus time"],
  },
]

const ENVIRONMENT_SETUP = [
  {
    icon: Headphones,
    title: "Audio Environment",
    description: "Use noise-cancelling headphones or background audio to mask unpredictable sounds. Consistent noise is less distracting than intermittent.",
    recommendations: ["Lo-fi music (no lyrics)", "Brown/pink noise", "Nature sounds", "Binaural beats"],
  },
  {
    icon: Eye,
    title: "Visual Clutter",
    description: "Clear workspace of unnecessary items. Each visible object competes for attention. Keep only current task materials visible.",
    recommendations: ["Clean desk policy", "Single monitor for deep work", "Hide desktop icons", "Close unused browser tabs"],
  },
  {
    icon: Home,
    title: "Physical Space",
    description: "Designate a specific location for focused work. Your brain learns to enter 'work mode' in consistent environments.",
    recommendations: ["Dedicated desk/room", "Face away from high-traffic areas", "Good lighting (natural preferred)", "Comfortable temperature"],
  },
  {
    icon: Coffee,
    title: "Physical Needs",
    description: "Address biological needs before starting. Hunger, thirst, and discomfort are constant low-level distractions.",
    recommendations: ["Water bottle at desk", "Healthy snacks prepared", "Ergonomic chair/setup", "Bathroom before sessions"],
  },
]

const INTERRUPTION_SCRIPTS = [
  {
    situation: "Colleague approaches your desk",
    response: "\"I'm in the middle of focused work. Can I find you in 20 minutes when I'm at a break point?\"",
    note: "Most 'urgent' requests can wait 20 minutes",
  },
  {
    situation: "Manager needs something 'quick'",
    response: "\"Sure, let me wrap up this thought so I don't lose it. I'll be with you in 5 minutes.\"",
    note: "Finishing a logical unit prevents restart time",
  },
  {
    situation: "Phone rings during focus time",
    response: "Let it go to voicemail unless it's from your 'emergency contacts' list",
    note: "Set up VIP contacts that bypass Do Not Disturb",
  },
  {
    situation: "Recurring meeting request",
    response: "\"Can we batch this discussion with [other meetings] or handle it async?\"",
    note: "Meetings fragment days—consolidate when possible",
  },
]

const INTERNAL_STRATEGIES = [
  {
    icon: Target,
    title: "Capture & Continue",
    description: "Keep a 'distraction notepad' nearby. When random thoughts arise, write them down in 3-5 words, then return to task. Review during breaks.",
  },
  {
    icon: Clock,
    title: "Time-Box Worry",
    description: "Schedule 'worry time'—15 minutes daily to address concerns. When worries arise outside this time, remind yourself: 'I'll handle this at 6pm.'",
  },
  {
    icon: Zap,
    title: "Energy Management",
    description: "Schedule demanding tasks during peak energy hours (usually 2-4 hours after waking). Save easier tasks for low-energy periods.",
  },
  {
    icon: Moon,
    title: "Sleep & Exercise",
    description: "Sleep deprivation increases distractibility by 70%. Regular exercise improves sustained attention. These basics multiply all other strategies.",
  },
]

const POMODORO_INTEGRATION = [
  {
    phase: "Before Pomodoro",
    actions: ["Clear workspace", "Close unnecessary apps/tabs", "Put phone away", "Set status to 'focused'"],
  },
  {
    phase: "During Pomodoro",
    actions: ["Note distractions on paper, don't act", "If urge is strong, remind 'only X minutes left'", "If interrupted, mark pomodoro as void, restart"],
  },
  {
    phase: "During Break",
    actions: ["Process captured distractions", "Handle quick messages", "Move body", "DON'T start anything requiring focus"],
  },
  {
    phase: "After 4 Pomodoros",
    actions: ["Longer break (15-30 min)", "Review productivity", "Batch communications", "Reassess remaining work"],
  },
]

const FAQS = [
  {
    question: "What if my job requires constant availability?",
    answer: "Even in responsive roles, you can carve out 2-3 focus blocks daily. Communicate availability windows to colleagues. Studies show batch-processing requests is faster than constant switching, so you'll actually be MORE responsive overall.",
  },
  {
    question: "How long does it take to build focus habits?",
    answer: "Research suggests 21-66 days for habit formation, averaging around 66 days. Start small: one 25-minute distraction-free session daily. Add more as it becomes automatic. The habit compounds.",
  },
  {
    question: "I work in an open office. How do I focus?",
    answer: "Use signals: noise-cancelling headphones (even without music) indicate 'don't disturb.' Book meeting rooms for solo focus time. Come in early/stay late for quiet hours. Advocate for quiet zones.",
  },
  {
    question: "What about important notifications I can't miss?",
    answer: "Create a VIP list for true emergencies (family, critical colleagues). All others can wait. In 99% of cases, nothing is as urgent as it feels. Your deep work is more valuable than instant responses.",
  },
  {
    question: "How do I deal with FOMO (fear of missing out)?",
    answer: "Remember: you're not missing out—you're opting in to focused, valuable work. Social media will still be there during breaks. Check during scheduled times and you'll realize you missed nothing important.",
  },
  {
    question: "My brain won't stop racing with thoughts. What helps?",
    answer: "The 'capture' method works for most. Write the thought in 3-5 words, promise yourself you'll address it later, and return to work. Meditation practice also trains this 'notice and redirect' skill.",
  },
]

const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Core technique for focused work" },
  { href: "/guide/pomodoro-for-developers", title: "For Developers", description: "Focus strategies for coding" },
  { href: "/blog/science-of-focus", title: "Science of Focus", description: "Why these methods work" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Avoid Distractions: Complete Focus Guide",
    description: "Comprehensive guide to eliminating distractions: digital strategies, environment optimization, handling interruptions, and building sustainable focus habits.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    url: "https://pomobox.app/guide/how-to-avoid-distractions",
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
    name: "How to Avoid Distractions While Working",
    description: "Step-by-step guide to creating a distraction-free work environment",
    step: [
      { "@type": "HowToStep", name: "Audit your distractions", text: "Track what interrupts you for 3 days" },
      { "@type": "HowToStep", name: "Eliminate digital triggers", text: "Turn off notifications, use blockers, separate devices" },
      { "@type": "HowToStep", name: "Optimize environment", text: "Clear workspace, manage noise, address physical needs" },
      { "@type": "HowToStep", name: "Handle interruptions", text: "Set boundaries, batch communications, use scripts" },
      { "@type": "HowToStep", name: "Manage internal distractions", text: "Capture thoughts, schedule worry time, maintain energy" },
    ],
  },
]

export default function HowToAvoidDistractionsPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.guide("How to Avoid Distractions")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-6">
            <ShieldOff className="h-3 w-3" />
            Focus Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            How to Avoid Distractions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Protect your focus. Eliminate interruptions. Do your best work.
          </p>
          <ArticleMeta readingTime="14 min" />

          {/* Distraction Cost Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-rose-500">23</div>
              <div className="text-xs text-muted-foreground">min to refocus</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">47%</div>
              <div className="text-xs text-muted-foreground">mind wanders</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">2h+</div>
              <div className="text-xs text-muted-foreground">lost daily</div>
            </div>
          </div>
        </header>

        {/* Interactive Tool: Distraction Audit */}
        <section className="mb-16">
          <DistractionAudit />
        </section>

        {/* Extended Introduction - Prose */}
        <section className="mb-16 prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            We live in the most distraction-rich environment in human history. Your smartphone alone contains more entertainment, social connection, and information than existed in entire civilizations. And it&apos;s always within arm&apos;s reach, designed by brilliant engineers whose explicit goal is to capture and hold your attention. Every notification, every infinite scroll, every autoplay video is the result of millions of dollars in research on what makes human brains unable to look away.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            But here&apos;s what the attention economy doesn&apos;t want you to know: focus is a competitive advantage. While most people fragment their attention across dozens of apps and conversations, those who can sustain deep concentration produce disproportionately better work. Cal Newport, author of &quot;Deep Work,&quot; argues that the ability to focus without distraction is becoming both rare and valuable—and those who master it will thrive.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The strategies in this guide aren&apos;t about willpower. Relying on willpower to resist distraction is like trying to hold your breath—eventually, you&apos;ll gasp. Instead, we focus on <em>environmental design</em>: structuring your physical and digital spaces so that the path of least resistance leads to focused work. When checking Twitter requires more effort than continuing to work, the battle is already won.
          </p>
        </section>

        {/* The Distraction Problem */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-rose-500/10">
                <AlertTriangle className="h-5 w-5 text-rose-500" />
              </span>
              The Attention Crisis
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">The modern reality:</strong> The average knowledge worker checks email <strong className="text-foreground">every 6 minutes</strong>, gets interrupted <strong className="text-foreground">every 11 minutes</strong>, and spends <strong className="text-foreground">23 minutes</strong> recovering from each interruption. Do the math—deep focus is almost impossible.
              </p>
              <p>
                <strong className="text-foreground">The compound cost:</strong> Distractions don&apos;t just steal time—they steal your best thinking. Complex problems require sustained attention. Every interruption forces you to rebuild context from scratch.
              </p>
              <p>
                <strong className="text-foreground">The good news:</strong> Attention is a skill, and your environment is a choice. This guide covers every distraction type and provides actionable strategies. Master these, and you&apos;ll reclaim hours of high-quality work daily.
              </p>
            </div>
          </div>
        </section>

        {/* Types of Distractions */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Target className="h-3 w-3" />
              Know Your Enemy
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Types of Distractions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISTRACTION_TYPES.map((item) => {
              const Icon = item.icon
              const colorClasses = {
                rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
                amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
                violet: "bg-violet-500/10 text-violet-500 border-violet-500/20",
                cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
              }
              return (
                <div
                  key={item.type}
                  className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.type}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.examples}</p>
                  <p className="text-xs text-rose-500">{item.impact}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Digital Strategies */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Smartphone className="h-3 w-3" />
              Digital Detox
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Eliminating Digital Distractions
            </h2>
          </div>

          <div className="space-y-4">
            {DIGITAL_STRATEGIES.map((strategy) => {
              const Icon = strategy.icon
              return (
                <div
                  key={strategy.title}
                  className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{strategy.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {strategy.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground"
                          >
                            {tool}
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

        {/* Environment Setup */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Home className="h-3 w-3" />
              Environment
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Optimize Your Space
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ENVIRONMENT_SETUP.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.recommendations.map((rec, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Interruption Scripts */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Users className="h-3 w-3" />
              Scripts
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Handling Interruptions
            </h2>
          </div>

          <div className="space-y-4">
            {INTERRUPTION_SCRIPTS.map((script, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10"
              >
                <div className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                  {script.situation}
                </div>
                <p className="text-foreground font-medium mb-2 italic">
                  {script.response}
                </p>
                <p className="text-xs text-muted-foreground">{script.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Distractions */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Brain className="h-3 w-3" />
              Mental Focus
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Managing Internal Distractions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERNAL_STRATEGIES.map((strategy) => {
              const Icon = strategy.icon
              return (
                <div
                  key={strategy.title}
                  className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-cyan-500" />
                    <h3 className="font-semibold text-foreground">{strategy.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* The Neuroscience of Distraction - Prose Section */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 border border-violet-500/10">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              The Neuroscience of Distraction
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Understanding why distractions are so compelling can help you resist them. Your brain has two attention systems: the &quot;bottom-up&quot; system that automatically responds to novel stimuli (a notification sound, movement in your peripheral vision), and the &quot;top-down&quot; system that deliberately directs focus (reading this paragraph). The problem? Bottom-up is faster and stronger.
              </p>
              <p>
                This isn&apos;t a design flaw—it&apos;s survival programming. For our ancestors, the rustle in the bushes that might be a predator needed to override whatever task they were doing. But today, those same neural pathways fire for email pings and social media likes. Your brain literally cannot distinguish between a life-threatening alert and a marketing notification.
              </p>
              <p>
                There&apos;s also the dopamine factor. Each notification triggers a small dopamine release—not because the content is rewarding, but because of <em>uncertainty</em>. Your brain craves finding out &quot;what&apos;s there,&quot; the same mechanism that makes slot machines addictive. Social media apps exploit this by making notifications unpredictable: sometimes it&apos;s exciting news, usually it&apos;s nothing, but you never know until you check.
              </p>
              <p>
                The solution isn&apos;t fighting your biology—it&apos;s working with it. By removing triggers (phone in another room), creating friction (app blockers), and providing alternative dopamine sources (progress tracking, completion rewards), you can redirect these powerful neural systems toward productive ends.
              </p>
            </div>
          </div>
        </section>

        {/* Pomodoro Integration */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Timer className="h-3 w-3" />
              With Pomodoro
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Focus + Pomodoro Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POMODORO_INTEGRATION.map((phase) => (
              <div
                key={phase.phase}
                className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <h3 className="font-semibold text-primary mb-3">{phase.phase}</h3>
                <ul className="space-y-2">
                  {phase.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {action}
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Frequently Asked Questions
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-rose-500/10 to-orange-500/5 border border-rose-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Focus?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start with one distraction-free pomodoro. 25 minutes of protected focus. Experience what deep work feels like.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Timer className="h-5 w-5" />
              Start Focused Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/pomodoro-vs-timeboxing"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Pomodoro vs Timeboxing
          </Link>
          <Link
            href="/blog/science-of-focus"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Science of Focus
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
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
