import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Brain, Timer, Target, Zap, CheckCircle2, AlertTriangle, BookOpen, Smartphone, Calendar, Users } from "lucide-react"
import { DeepWorkScore } from "@/components/ui/deep-work-score"

export const metadata: Metadata = {
  title: "Deep Work: Cal Newport's Method for Focused Productivity | Pomobox",
  description: "Master deep work strategies from Cal Newport. Learn how to eliminate distractions, build focus rituals, and combine deep work with Pomodoro for maximum productivity.",
  keywords: ["deep work", "Cal Newport", "focused work", "distraction-free productivity", "concentration strategies"],
  openGraph: {
    title: "Deep Work: Cal Newport's Method | Pomobox",
    description: "Master deep work strategies. Eliminate distractions and build focus rituals for maximum productivity.",
    type: "article",
    publishedTime: "2025-01-08",
  },
  alternates: { canonical: "https://pomobox.co/blog/deep-work-method" },
}

export default function DeepWorkMethodPage() {
  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <nav className="mb-8">
          <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Hub
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Brain className="h-3 w-3" />
              Deep Work
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              11 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Deep Work: Cal Newport&apos;s Method for Focused Productivity
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how to produce elite-level work by eliminating distractions and building rituals that support sustained concentration.
          </p>
        </header>

        <DeepWorkScore className="mb-12" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <p className="lead text-lg text-muted-foreground">
            In his influential book <em>Deep Work</em>, Cal Newport argues that the ability to focus without distraction is becoming both increasingly rare and increasingly valuable. Those who master this skill will thrive.
          </p>
          <p>
            Deep work is defined as <strong>&quot;professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit.&quot;</strong> This is the opposite of shallow work—non-cognitively demanding tasks often performed while distracted.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-indigo-500" />
            Deep Work vs. Shallow Work
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Deep Work
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />Creates new value, improves skills</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />Hard to replicate (competitive advantage)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />Requires sustained attention (30-90 min)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />Examples: Writing, coding, analysis, design</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Shallow Work
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />Logistical, doesn&apos;t create new value</li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />Easy to replicate (anyone can do it)</li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />Often performed while distracted</li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />Examples: Email, meetings, scheduling</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-violet-500" />
            Cal Newport&apos;s Four Rules
          </h2>
          <div className="space-y-4">
            {[
              { rule: "Rule 1: Work Deeply", desc: "Develop rituals and routines that minimize willpower drain", tips: ["Choose a depth philosophy (monastic, bimodal, rhythmic, journalistic)", "Build rituals: where, how long, rules, support", "Make grand gestures to signal commitment"], color: "indigo" },
              { rule: "Rule 2: Embrace Boredom", desc: "Train your brain to resist distraction even when bored", tips: ["Schedule internet blocks instead of offline blocks", "Practice productive meditation", "Structure deep thinking with clear next steps"], color: "violet" },
              { rule: "Rule 3: Quit Social Media", desc: "Apply the craftsman approach to tool selection", tips: ["Identify core goals in work and life", "Keep only tools with substantial positive impact", "Try 30-day breaks to test actual value"], color: "rose" },
              { rule: "Rule 4: Drain the Shallows", desc: "Ruthlessly reduce shallow work to create space for deep work", tips: ["Schedule every minute of your day", "Quantify depth of every activity", "Finish work by 5:30pm (fixed-schedule productivity)"], color: "emerald" },
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-xl bg-${item.color}-500/5 border border-${item.color}-500/20`}>
                <h3 className={`font-semibold text-${item.color}-600 dark:text-${item.color}-400 mb-2`}>{item.rule}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {item.tips.map((tip, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle2 className={`h-4 w-4 text-${item.color}-500 flex-shrink-0 mt-0.5`} />{tip}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            Combining Deep Work with Pomodoro
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <h3 className="font-semibold text-foreground mb-4">Deep Work Pomodoro Protocol</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-background/50">
                <div className="font-medium text-foreground text-sm mb-1">For Beginners</div>
                <p className="text-xs text-muted-foreground">Standard 25/5 intervals. Focus on eliminating all distractions during work blocks. Build up to 4 consecutive pomodoros.</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="font-medium text-foreground text-sm mb-1">For Intermediate</div>
                <p className="text-xs text-muted-foreground">Extend to 45/10 or 50/10 intervals. Chain 3-4 blocks for 90-minute deep work sessions.</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="font-medium text-foreground text-sm mb-1">For Advanced</div>
                <p className="text-xs text-muted-foreground">Use Flowtime—work until natural break point. Track deep vs shallow hours daily.</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="font-medium text-foreground text-sm mb-1">Key Principles</div>
                <p className="text-xs text-muted-foreground">No phones in room. Notifications off. Clear start ritual. Same time daily.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How many hours of deep work per day is realistic?", a: "For most people, 3-4 hours of true deep work per day is the maximum sustainable amount. More than that typically leads to diminishing returns." },
              { q: "Can I do deep work in an open office?", a: "It's harder but possible. Use noise-canceling headphones, establish signals (headphones on = don't disturb), and book conference rooms for critical deep work blocks." },
              { q: "What if my job requires constant availability?", a: "Most 'constant availability' requirements are cultural, not actual. Try scheduling 2-hour deep work blocks and batch communications around them." },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">Start Your Deep Work Practice</h2>
            <p className="text-muted-foreground mb-4">Deep work is a skill that must be trained. Start small—one 25-minute focused block—and build from there.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors">
                <Timer className="h-4 w-4" />
                Start Deep Work Session
              </Link>
              <Link href="/blog/cost-of-task-switching" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
                The Cost of Task Switching
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/cost-of-task-switching" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">The Cost of Task Switching</h3>
              <p className="text-sm text-muted-foreground">Why every interruption costs 23 minutes of focus recovery.</p>
            </Link>
            <Link href="/blog/flowtime-vs-pomodoro" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">Flowtime vs Pomodoro</h3>
              <p className="text-sm text-muted-foreground">Which timing method best supports deep work sessions.</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
