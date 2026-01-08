import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  ArrowLeft,
  Timer,
  Brain,
  Zap,
  ListTodo,
  Clock,
  Target,
  Coffee,
  Repeat,
  Music,
  BarChart3,
  Calendar,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { DefinitionBox } from "@/components/ui/definition-box"
import { MiniTimerDemo } from "@/components/ui/mini-timer-demo"

export const metadata: Metadata = {
  title: "What is the Pomodoro Technique? Complete Guide | Pomobox",
  description: "Complete Pomodoro Technique guide: how it works, best practices, common mistakes, and pro tips for students, developers, and professionals. Master productivity with Pomobox.",
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/what-is-pomodoro",
    siteName: "Pomobox",
    title: "What is the Pomodoro Technique? Complete Guide",
    description: "Master productivity with our complete Pomodoro guide: step-by-step instructions, best practices, common mistakes to avoid, and pro tips for focused work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro Technique Complete Guide | Pomobox",
    description: "Learn the Pomodoro Technique: best practices, common mistakes, and pro tips for students, developers, and professionals.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/what-is-pomodoro",
  },
}

// Data - Reduced arrays, more prose content
const STEPS = [
  { number: 1, icon: ListTodo, title: "Choose a Task", description: "Select what you'll work on—studying, coding, writing, or any focused task." },
  { number: 2, icon: Clock, title: "Set Timer (25 min)", description: "Commit to one pomodoro. The countdown creates urgency and focus." },
  { number: 3, icon: Target, title: "Work with Focus", description: "Full concentration until the timer rings. Note distractions, don't act on them." },
  { number: 4, icon: Coffee, title: "Take a Break (5 min)", description: "Step away. Stretch, hydrate, breathe. Let your brain rest." },
  { number: 5, icon: Repeat, title: "Repeat & Rest", description: "After 4 pomodoros, take a 15-30 minute break. Then start fresh." },
]

const MISTAKES = [
  { title: "Breaking Pomodoros Early", description: "The technique's power comes from completion. Commit to the full session or adjust the timer at the start." },
  { title: "Skipping Breaks", description: "Rest periods are when your brain consolidates learning. More breaks = better long-term output." },
  { title: "No Task Selection", description: "Starting without a clear goal invites procrastination. Decide exactly what you'll accomplish beforehand." },
  { title: "Leaving Notifications On", description: "Even silenced notifications steal attention. Close tabs, silence phone, use blockers during sessions." },
]

const FEATURES = [
  { icon: Music, title: "Focus BGM", description: "Curated lo-fi and ambient music scientifically shown to improve concentration.", gradient: "from-violet-500/20 to-purple-500/20" },
  { icon: BarChart3, title: "Detailed Statistics", description: "Track focus time, sessions, streaks. Understand your peak performance hours.", gradient: "from-emerald-500/20 to-green-500/20" },
  { icon: Calendar, title: "Activity Calendar", description: "Visual history at a glance. Streaks motivate consistency.", gradient: "from-amber-500/20 to-orange-500/20" },
]

const FAQS = [
  { question: "What makes Pomodoro effective?", answer: "It leverages psychological principles: breaking tasks into manageable chunks, creating urgency through time-boxing, and providing structured recovery. 25-minute sessions align with natural attention cycles." },
  { question: "Can I adjust the 25-minute timer?", answer: "Absolutely! Try 45 minutes for complex work, 15 minutes for admin tasks, 20-30 for creative work. Experiment to find your optimal duration." },
  { question: "What if I get interrupted?", answer: "Write down the interruption without stopping, then handle it during your break. For emergencies, pause the timer and restart when you return." },
  { question: "How many pomodoros per day?", answer: "Most people aim for 8-10 (about 4-5 hours focused work). Quality matters more than quantity—listen to your energy levels." },
  { question: "What should I do during breaks?", answer: "Physical breaks are best: stand, stretch, walk, hydrate. Avoid phone scrolling—your brain needs genuine rest." },
  { question: "Does it work for different jobs?", answer: "Yes! Developers use longer sessions (45 min), managers shorter ones (15 min), freelancers track billable hours. The principle adapts to any field." },
]

// JSON-LD Schemas
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is the Pomodoro Technique?",
  description: "Complete guide to the Pomodoro Technique: how it works, why it's effective, best practices, and how to use it for maximum productivity.",
  author: { "@type": "Organization", name: "Pomobox Team" },
  publisher: {
    "@type": "Organization",
    name: "Pomobox",
    logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
  },
  url: "https://pomobox.app/guide/what-is-pomodoro",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

export default function WhatIsPomodoroPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={BREADCRUMB_PRESETS.guide("What is Pomodoro?")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            <Sparkles className="h-3 w-3" />
            Complete Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            What is the Pomodoro Technique?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Master time-boxed productivity and transform how you work
          </p>
          <ArticleMeta
            readingTime="10 min"
          />

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">25</div>
              <div className="text-xs text-muted-foreground">min focus</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500">5</div>
              <div className="text-xs text-muted-foreground">min break</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">4</div>
              <div className="text-xs text-muted-foreground">cycles</div>
            </div>
          </div>
        </header>

        {/* Interactive Timer Demo - NEW UNIQUE ELEMENT */}
        <section className="mb-16">
          <MiniTimerDemo />
        </section>

        {/* Featured Snippet Optimized Definition */}
        <DefinitionBox
          term="the Pomodoro Technique"
          definition="is a time management method that uses 25-minute focused work sessions followed by 5-minute breaks. After completing four sessions (called pomodoros), you take a longer 15-30 minute break. This technique fights procrastination by making tasks feel manageable and helps maintain peak focus throughout the day."
          className="mb-16"
        />

        {/* Extended Introduction - PROSE CONTENT */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-6">
              <span className="p-2 rounded-xl bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </span>
              The Modern Focus Crisis
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We live in an age of unprecedented distraction. The average knowledge worker checks their email
                <strong className="text-foreground"> 74 times per day</strong>, switches tasks every
                <strong className="text-foreground"> 3 minutes</strong>, and takes approximately
                <strong className="text-foreground"> 23 minutes</strong> to fully regain focus after each interruption.
                By the end of a typical workday, despite being &quot;busy&quot; for 8 hours, many people have accomplished
                less than 2 hours of truly focused work.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This isn&apos;t a personal failing—it&apos;s a systemic problem. Our brains evolved for a world of
                immediate physical threats and rewards, not for the abstract, long-term projects that define
                modern work. When faced with a complex task, our ancient brain circuits rebel. They seek the
                quick dopamine hit of a new notification, the comfort of a familiar distraction.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The <strong className="text-foreground">Pomodoro Technique</strong> offers an elegant solution.
                By committing to just 25 minutes of focused work—a duration that feels manageable even to the
                most distraction-prone mind—you bypass the brain&apos;s resistance. The timer creates urgency.
                The defined endpoint provides relief. And the structured breaks prevent the burnout that
                derails longer work sessions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Created by <strong className="text-foreground">Francesco Cirillo</strong> in the late 1980s
                while he was a university student struggling to focus, the technique takes its name from the
                tomato-shaped kitchen timer he used (pomodoro means &quot;tomato&quot; in Italian). What started
                as a personal productivity hack has since been adopted by millions worldwide—from Silicon Valley
                engineers to medical students, from novelists to accountants.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use - Steps */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ListTodo className="h-3 w-3" />
              Step-by-Step
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              How to Use Pomodoro
            </h2>
          </div>

          <div className="space-y-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="flex gap-4 p-4 md:p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg md:text-xl font-bold text-primary">{step.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* The Psychology - NEW PROSE SECTION */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Brain className="h-3 w-3" />
              Deep Dive
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              The Psychology Behind 25 Minutes
            </h2>
          </div>

          <div className="space-y-6">
            {/* Prose block 1 */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <Zap className="h-5 w-5 text-violet-500" />
                Fighting Procrastination
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Procrastination isn&apos;t about laziness—it&apos;s about <strong className="text-foreground">emotional regulation</strong>.
                When we face a daunting task, our brain experiences genuine discomfort. This discomfort triggers
                avoidance behaviors: checking social media, reorganizing our desk, anything but the actual work.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Pomodoro Technique short-circuits this pattern. By committing to just 25 minutes, you reduce
                the perceived threat. &quot;I only have to do this for 25 minutes&quot; is far less threatening than
                &quot;I have to finish this entire project.&quot; Research shows that once we start a task, we&apos;re
                far more likely to continue—a phenomenon psychologists call the <strong className="text-foreground">Zeigarnik effect</strong>.
              </p>
            </div>

            {/* Prose block 2 */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <TrendingUp className="h-5 w-5 text-amber-500" />
                Building Momentum
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each completed pomodoro triggers a small <strong className="text-foreground">dopamine release</strong> in
                your brain—the same neurochemical that makes video games and social media so addictive. But instead
                of hijacking your reward system for distraction, the Pomodoro Technique harnesses it for productivity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This creates a positive feedback loop. One completed pomodoro makes you want to start another.
                Over time, the act of setting a timer becomes associated with the satisfaction of completion.
                What once required willpower becomes automatic—a <strong className="text-foreground">habit</strong>.
              </p>
            </div>

            {/* Prose block 3 */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <Coffee className="h-5 w-5 text-cyan-500" />
                The Science of Rest
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The 5-minute breaks aren&apos;t wasted time—they&apos;re <strong className="text-foreground">productive time</strong>.
                During rest, your brain&apos;s <strong className="text-foreground">Default Mode Network (DMN)</strong> activates.
                This network is responsible for memory consolidation, creative insight, and preparing for future tasks.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Studies show that information learned before a break is better retained than information crammed
                without rest. The breaks also prevent the cognitive fatigue that leads to errors and poor decisions.
                Counterintuitively, working less intensely often means accomplishing more.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices - REDESIGNED AS PROSE + HIGHLIGHTS */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Lightbulb className="h-3 w-3" />
              Pro Tips
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Best Practices for Success
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                After decades of use by millions of practitioners, certain patterns have emerged that separate
                Pomodoro masters from beginners. Here are the practices that consistently lead to better results:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Plan Your Pomodoros Daily</h4>
                    <p className="text-sm text-muted-foreground">
                      Each morning, review your tasks and estimate how many pomodoros each requires. This eliminates
                      decision fatigue during sessions and gives you a realistic view of your day&apos;s capacity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Keep an Interruption Log</h4>
                    <p className="text-sm text-muted-foreground">
                      When thoughts or urges arise mid-session, jot them down quickly without breaking focus.
                      You&apos;ll address them during breaks. This simple practice trains your brain to delay gratification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Use Physical Breaks</h4>
                    <p className="text-sm text-muted-foreground">
                      Physical breaks are 50% more restorative than scrolling your phone. Stand up, stretch, walk
                      to the window, hydrate. Your body and brain will thank you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adjust Duration by Task Type</h4>
                    <p className="text-sm text-muted-foreground">
                      The 25-minute default works for most tasks, but experimentation helps. Try 45 minutes for
                      deep technical work, 15 minutes for administrative tasks, and 20-30 for creative work.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Batch Similar Tasks</h4>
                    <p className="text-sm text-muted-foreground">
                      Group similar work together—all emails in one pomodoro, all coding in another. This reduces
                      the mental switching costs that silently drain your energy throughout the day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <AlertTriangle className="h-3 w-3" />
              Avoid These
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Common Mistakes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISTAKES.map((mistake) => (
              <div
                key={mistake.title}
                className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10"
              >
                <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {mistake.title}
                </h3>
                <p className="text-sm text-muted-foreground">{mistake.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pomobox Features */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Timer className="h-3 w-3" />
              Why Pomobox
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Built for Deep Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`p-5 md:p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-border/50 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="p-2.5 rounded-xl bg-background/80 dark:bg-background/50 w-fit mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Works Offline</span>
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

        {/* Related Guides */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: "/guide/pomodoro-for-students", title: "For Students", description: "Study techniques" },
              { href: "/guide/pomodoro-for-developers", title: "For Developers", description: "Coding productivity" },
              { href: "/blog/science-of-focus", title: "Science of Focus", description: "Brain research" },
            ].map((item) => (
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Transform Your Productivity?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              You&apos;ve learned the technique. Now experience it. Start your first real pomodoro session—no
              signup required, your data stays private and on your device.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Timer className="h-5 w-5" />
              Start Your First Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Timer
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

      {/* JSON-LD */}
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(articleSchema)}
      </Script>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>
    </main>
  )
}
