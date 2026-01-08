import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Clock,
  Zap,
  Timer,
  ChevronDown,
  Target,
  Lightbulb,
  Eye,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Settings,
  Volume2,
  Gauge,
  Heart,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { TimePerceptionTest } from "@/components/ui/time-perception-test"

export const metadata: Metadata = {
  title: "Pomodoro Technique for ADHD: Managing Time Blindness | Pomobox",
  description: "How the Pomodoro Technique helps ADHD brains with time blindness, hyperfocus, and executive function. Research-backed adaptations for neurodivergent productivity.",
  keywords: ["ADHD pomodoro", "time blindness", "ADHD productivity", "ADHD time management", "neurodivergent productivity", "ADHD focus techniques", "executive function"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/pomodoro-for-adhd",
    siteName: "Pomobox",
    title: "Pomodoro Technique for ADHD: Managing Time Blindness",
    description: "How the Pomodoro Technique helps ADHD brains with time blindness, hyperfocus, and executive function challenges.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for ADHD: Managing Time Blindness | Pomobox",
    description: "Research-backed adaptations of Pomodoro for neurodivergent productivity.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/pomodoro-for-adhd",
  },
}

// Data
const KEY_CHALLENGES = [
  {
    challenge: "Time Blindness",
    description: "Difficulty sensing how much time has passed or accurately estimating how long tasks will take",
    icon: Clock,
    pomoSolution: "External timer provides concrete time feedback that internal sense lacks",
  },
  {
    challenge: "Hyperfocus Traps",
    description: "Getting absorbed in interesting tasks for hours while neglecting other responsibilities",
    icon: Eye,
    pomoSolution: "Mandatory breaks interrupt hyperfocus, prompting task review and priority check",
  },
  {
    challenge: "Task Initiation",
    description: "Struggling to start tasks, especially those perceived as boring or overwhelming",
    icon: Zap,
    pomoSolution: "'Just 25 minutes' lowers psychological barrier; starting is easier than 'doing the whole thing'",
  },
  {
    challenge: "Sustained Attention",
    description: "Difficulty maintaining focus on non-stimulating tasks for extended periods",
    icon: Target,
    pomoSolution: "Short intervals with promised breaks make sustained focus feel achievable",
  },
]

const ADHD_ADAPTATIONS = [
  {
    standard: "25-minute sessions",
    adaptation: "Start with 15-minute sessions",
    reason: "Lower barrier to entry; build success before extending duration",
    priority: "high",
  },
  {
    standard: "5-minute breaks",
    adaptation: "Movement breaks (not phone)",
    reason: "Physical activity helps regulate dopamine; screens can trigger hyperfocus on break content",
    priority: "high",
  },
  {
    standard: "Track completed pomodoros",
    adaptation: "Visual progress tracking",
    reason: "Concrete visual feedback compensates for poor internal reward signaling",
    priority: "medium",
  },
  {
    standard: "Single task per session",
    adaptation: "Write task before starting timer",
    reason: "Externalizes executive function; reduces working memory load during session",
    priority: "high",
  },
  {
    standard: "4 pomodoros then long break",
    adaptation: "Flexible cycles based on energy",
    reason: "ADHD energy fluctuates; rigid structure can backfire on low-energy days",
    priority: "medium",
  },
  {
    standard: "Silent timer",
    adaptation: "Audible ticking or ambient sound",
    reason: "Continuous audio feedback helps maintain time awareness throughout session",
    priority: "low",
  },
]

const TIME_BLINDNESS_FACTS = [
  {
    fact: "ADHD affects the brain's internal clock",
    explanation: "Research shows differences in the basal ganglia and prefrontal cortex—areas involved in time perception—in ADHD brains.",
  },
  {
    fact: "Time estimation errors go both directions",
    explanation: "People with ADHD may perceive time as passing slower (leading to impatience) or faster (leading to lateness), often inconsistently.",
  },
  {
    fact: "External time cues are essential",
    explanation: "Without reliable internal time sense, external signals (timers, alarms, visual countdowns) become necessary scaffolding, not crutches.",
  },
  {
    fact: "Emotional state affects time perception",
    explanation: "Interesting tasks make time fly (hyperfocus); boring tasks make minutes feel like hours. This variability makes planning difficult.",
  },
]

const DOPAMINE_CONNECTION = [
  {
    aspect: "Motivation",
    neurotypical: "Future rewards provide sufficient motivation",
    adhd: "Distant rewards feel abstract; immediate structure needed",
    pomoHelp: "Each session completion is a small, immediate win",
  },
  {
    aspect: "Task Switching",
    neurotypical: "Can switch tasks when appropriate",
    adhd: "Either can't stop (hyperfocus) or can't start (paralysis)",
    pomoHelp: "Timer provides external 'permission' to switch",
  },
  {
    aspect: "Time Urgency",
    neurotypical: "Can work on non-urgent tasks steadily",
    adhd: "Often needs urgency/deadline to activate focus",
    pomoHelp: "Timer creates artificial urgency that activates focus",
  },
  {
    aspect: "Reward Sensitivity",
    neurotypical: "Steady motivation from progress",
    adhd: "Needs more frequent reward signals",
    pomoHelp: "Frequent completions provide regular dopamine hits",
  },
]

const COMMON_MISTAKES = [
  {
    mistake: "Trying to do 'normal' 25-minute sessions immediately",
    why: "Sets up failure; builds negative association",
    fix: "Start with 10-15 minutes, increase gradually as you succeed",
  },
  {
    mistake: "Using phone during breaks",
    why: "Phone can trigger new hyperfocus, making it hard to return to work",
    fix: "Physical breaks only: stretch, walk, hydrate",
  },
  {
    mistake: "Being rigid about the system",
    why: "ADHD brains need some flexibility; rigidity causes rebellion",
    fix: "Adapt session lengths and break activities to your energy",
  },
  {
    mistake: "Not writing down the task before starting",
    why: "Working memory limitations mean you might forget what you were doing",
    fix: "Always externalize: write the specific task before pressing start",
  },
  {
    mistake: "Skipping breaks to 'power through'",
    why: "ADHD brains need more frequent recovery; skipping leads to burnout",
    fix: "Breaks are mandatory, not optional. They're part of the system.",
  },
]

const FAQS = [
  {
    question: "Does Pomodoro actually work for ADHD?",
    answer: "For many people with ADHD, yes—with adaptations. The external timer compensates for time blindness, short intervals match attention patterns, and the structure reduces executive function demands. However, it's not universal; some find even 25 minutes too long. Start with 15-minute sessions and adjust based on what works for you.",
  },
  {
    question: "What if I hyperfocus and ignore the timer?",
    answer: "Use audible alarms you can't ignore, or timers that require physical interaction to stop. Some people find visual timers (like sand timers or countdown displays) easier to notice. The key is making the break signal unmissable. Also, remove headphones during the last 5 minutes of a session.",
  },
  {
    question: "I can't focus for even 25 minutes. Is Pomodoro not for me?",
    answer: "No—you just need shorter intervals. Start with 10 or 15 minutes. The original 25-minute duration isn't sacred; it's just what worked for the inventor. Many ADHD adults find 15-20 minutes optimal. Success at shorter intervals builds confidence and may eventually allow longer sessions.",
  },
  {
    question: "Why do breaks feel harder than working?",
    answer: "Transitioning between states is difficult for ADHD brains. The break feels like an interruption to hard-won focus. However, skipping breaks leads to faster burnout. Try structured breaks with specific activities (walk to kitchen, 10 jumping jacks) rather than open-ended 'rest.'",
  },
  {
    question: "Can medication replace the need for Pomodoro?",
    answer: "Medication and techniques like Pomodoro work best together. Medication can improve baseline focus and time perception, but external structure remains valuable. Many medicated adults still use timers and time-boxing because the techniques provide accountability that medication alone doesn't.",
  },
  {
    question: "How do I handle tasks that require longer focus?",
    answer: "Chain multiple Pomodoro sessions with the understanding that you're working on the same task. The breaks between sessions still help prevent burnout. For deep creative work, some people extend to 45-50 minute sessions once they've built up tolerance through regular practice.",
  },
]

const RELATED_CONTENT = [
  { href: "/blog/cost-of-task-switching", title: "Task Switching Costs", description: "Why interruptions hurt" },
  { href: "/blog/science-of-focus", title: "Science of Focus", description: "Neuroscience of attention" },
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Learn the basics" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro Technique for ADHD: Managing Time Blindness",
    description: "How the Pomodoro Technique helps ADHD brains with time blindness, hyperfocus, and executive function. Research-backed adaptations for neurodivergent productivity.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-08",
    dateModified: "2025-01-08",
    url: "https://pomobox.app/blog/pomodoro-for-adhd",
    mainEntityOfPage: "https://pomobox.app/blog/pomodoro-for-adhd",
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

export default function PomodoroForADHDPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Pomodoro for ADHD")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-6">
            <Brain className="h-3 w-3" />
            Neurodivergent Productivity
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro for ADHD Brains
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            How external timers help manage time blindness and hyperfocus
          </p>
          <ArticleMeta
            publishedDate="2025-01-08"
            modifiedDate="2025-01-08"
            readingTime="12 min"
          />

          {/* Key Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-purple-500">6%</div>
              <div className="text-xs text-muted-foreground">of adults have ADHD</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">15</div>
              <div className="text-xs text-muted-foreground">min starting interval</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">80%</div>
              <div className="text-xs text-muted-foreground">report time blindness</div>
            </div>
          </div>
        </header>

        {/* Interactive Test */}
        <section className="mb-16">
          <TimePerceptionTest />
        </section>

        {/* Extended Introduction */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              If you have ADHD, you've likely experienced the frustration of looking up from a task to discover that three hours have vanished—or conversely, feeling like you've been working for an eternity only to find that ten minutes have passed. This isn't a character flaw or lack of discipline. It's time blindness, a neurological difference in how ADHD brains perceive and track the passage of time. Research suggests that differences in dopamine signaling and prefrontal cortex function literally change how time feels, making internal time estimation unreliable.
            </p>
            <p>
              The Pomodoro Technique, while not designed specifically for ADHD, addresses several core ADHD challenges in ways that make it remarkably effective for many neurodivergent individuals. The external timer compensates for internal time blindness. The short intervals match ADHD attention patterns. The mandatory breaks interrupt hyperfocus before it derails your entire day. And the concrete structure reduces the executive function demands that often paralyze ADHD adults when facing unstructured work time.
            </p>
            <p>
              However, the standard Pomodoro prescription often needs adaptation for ADHD brains. Twenty-five minutes may be too long initially. Phone-based breaks can trigger new hyperfocus spirals. Rigid rules can provoke the ADHD tendency toward rebellion against structure. This article explores the neuroscience of why Pomodoro works for ADHD, provides specific adaptations that increase success, and addresses common pitfalls that cause the technique to fail for neurodivergent users.
            </p>
          </div>
        </section>

        {/* Key Challenges */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <AlertTriangle className="h-3 w-3" />
              Challenges
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              ADHD Challenges Pomodoro Addresses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KEY_CHALLENGES.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.challenge}
                  className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Icon className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.challenge}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      <strong>Pomodoro helps:</strong> {item.pomoSolution}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Time Blindness Deep Dive */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Understanding Time Blindness</h2>
            <p>
              Time blindness isn't about not caring about time or being irresponsible—it's a genuine neurological difference. The brain regions responsible for time perception, including the basal ganglia and prefrontal cortex, function differently in ADHD. Dopamine, the neurotransmitter that ADHD brains have less of, plays a crucial role in our internal clock. When dopamine signaling is disrupted, so is our ability to accurately sense time's passage.
            </p>
            <p>
              This explains why time feels different depending on the task. Engaging activities (which raise dopamine) make time fly by—this is why you can hyperfocus on a video game or interesting project for hours without noticing. Boring tasks (which don't raise dopamine) make time crawl—each minute feels like ten, making sustained focus feel impossibly difficult. Neurotypical brains experience this effect too, but for ADHD brains, the magnitude is often much greater.
            </p>
            <p>
              External timers don't fix time blindness—they work around it. Instead of relying on an unreliable internal clock, you outsource time-tracking to an external device. The timer provides objective reality that your brain can't argue with. When 25 minutes have passed, the alarm sounds regardless of whether it felt like 5 minutes or 50. This external feedback loop is essential scaffolding, not a crutch to eventually remove.
            </p>
          </div>
        </section>

        {/* Time Blindness Facts */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Clock className="h-3 w-3" />
              Time Blindness
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              What Research Shows
            </h2>
          </div>

          <div className="space-y-3">
            {TIME_BLINDNESS_FACTS.map((item) => (
              <div
                key={item.fact}
                className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/5 to-violet-500/5 border border-purple-500/10"
              >
                <h3 className="font-semibold text-purple-500 mb-2">{item.fact}</h3>
                <p className="text-sm text-muted-foreground">{item.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ADHD Adaptations */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Settings className="h-3 w-3" />
              Adaptations
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              ADHD-Friendly Modifications
            </h2>
          </div>

          <div className="space-y-3">
            {ADHD_ADAPTATIONS.map((item) => (
              <div
                key={item.standard}
                className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground line-through">{item.standard}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium text-emerald-500">{item.adaptation}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    item.priority === "high"
                      ? "bg-red-500/10 text-red-500"
                      : item.priority === "medium"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-cyan-500/10 text-cyan-500"
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dopamine Connection */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
              <Sparkles className="h-3 w-3" />
              Neuroscience
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              The Dopamine Connection
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-3 font-medium text-foreground">Aspect</th>
                  <th className="text-left py-3 px-3 font-medium text-foreground">Neurotypical</th>
                  <th className="text-left py-3 px-3 font-medium text-foreground">ADHD</th>
                  <th className="text-left py-3 px-3 font-medium text-emerald-500">Pomodoro Helps</th>
                </tr>
              </thead>
              <tbody>
                {DOPAMINE_CONNECTION.map((item) => (
                  <tr key={item.aspect} className="border-b border-border/30">
                    <td className="py-3 px-3 font-medium text-foreground">{item.aspect}</td>
                    <td className="py-3 px-3 text-muted-foreground">{item.neurotypical}</td>
                    <td className="py-3 px-3 text-muted-foreground">{item.adhd}</td>
                    <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400">{item.pomoHelp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              <XCircle className="h-3 w-3" />
              Pitfalls
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Common Mistakes to Avoid
            </h2>
          </div>

          <div className="space-y-3">
            {COMMON_MISTAKES.map((item) => (
              <div
                key={item.mistake}
                className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <div className="flex items-start gap-3 mb-2">
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground">{item.mistake}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2 pl-8">{item.why}</p>
                <div className="flex items-start gap-3 pl-8">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-purple-500/10">
                <Lightbulb className="h-5 w-5 text-purple-500" />
              </span>
              Key Takeaways for ADHD
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Start shorter than you think.</strong> 15-minute sessions build success patterns. Extend only after consistent wins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">External timers aren't crutches.</strong> They're essential tools that compensate for neurological differences in time perception.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Movement breaks beat phone breaks.</strong> Physical activity helps regulate dopamine; screens often trigger new hyperfocus spirals.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Write your task externally.</strong> Before starting, write down exactly what you're working on. Don't rely on working memory.
                </p>
              </div>
            </div>
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

        {/* Related Content */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Continue Reading</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_CONTENT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Your Brain Works Differently—That's Okay
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              External timers aren't a crutch. They're a tool that works with your neurology, not against it.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
            >
              <Timer className="h-5 w-5" />
              Try ADHD-Friendly Timer
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/blog/cost-of-task-switching"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Task Switching Costs
          </Link>
          <Link
            href="/blog/ultradian-rhythms"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Ultradian Rhythms
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
