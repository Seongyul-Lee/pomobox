import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Coffee, Moon, Sun, Brain, Timer, CheckCircle2, AlertTriangle, Zap, Clock3 } from "lucide-react"
import { CaffeineTimingCalculator } from "@/components/ui/caffeine-timing-calculator"

export const metadata: Metadata = {
  title: "Caffeine and Focus: The Science of Optimal Coffee Timing | Pomobox",
  description: "Learn the neuroscience of caffeine for productivity. Discover optimal timing, dosage, and strategies to maximize alertness without hurting sleep quality.",
  keywords: ["caffeine productivity", "coffee timing", "caffeine and focus", "optimal caffeine", "coffee for concentration"],
  openGraph: {
    title: "Caffeine and Focus: Optimal Coffee Timing | Pomobox",
    description: "Neuroscience of caffeine for productivity. Optimal timing and dosage for maximum alertness.",
    type: "article",
    publishedTime: "2025-01-08",
  },
  alternates: { canonical: "https://pomobox.co/blog/caffeine-and-focus" },
}

export default function CaffeineAndFocusPage() {
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-600/10 text-amber-600 dark:text-amber-400">
              <Coffee className="h-3 w-3" />
              Caffeine Science
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              9 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Caffeine and Focus: The Science of Optimal Coffee Timing</h1>
          <p className="text-lg text-muted-foreground">Most people drink coffee wrong. Learn when, how much, and why to maximize alertness without sacrificing sleep.</p>
        </header>

        <CaffeineTimingCalculator className="mb-12" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <p className="lead text-lg text-muted-foreground">Caffeine is the world&apos;s most widely used psychoactive substance. Over 80% of adults consume it daily. Yet most people use it inefficiently—drinking coffee when their body doesn&apos;t need it.</p>
          <p>Understanding caffeine&apos;s mechanism reveals a simple truth: timing matters more than quantity. A well-timed cup outperforms three poorly-timed cups.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-violet-500" />
            How Caffeine Works in Your Brain
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-violet-500/20 mb-6">
            <h3 className="font-semibold text-foreground mb-4">The Adenosine Story</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <div className="text-2xl mb-2">1</div>
                <h4 className="font-medium text-foreground text-sm mb-1">Adenosine Builds</h4>
                <p className="text-xs text-muted-foreground">While you&apos;re awake, adenosine accumulates, making you feel tired.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="text-2xl mb-2">2</div>
                <h4 className="font-medium text-foreground text-sm mb-1">Caffeine Blocks</h4>
                <p className="text-xs text-muted-foreground">Caffeine molecules fit into adenosine receptors but don&apos;t activate them.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="text-2xl mb-2">3</div>
                <h4 className="font-medium text-foreground text-sm mb-1">You Feel Alert</h4>
                <p className="text-xs text-muted-foreground">With adenosine blocked, you don&apos;t feel tired—even though adenosine keeps building.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock3 className="h-6 w-6 text-red-500" />
            The Half-Life Problem
          </h2>
          <p className="text-muted-foreground mb-4">Caffeine has a half-life of <strong>5-6 hours</strong>. Half your 2pm coffee is still active at 8pm. A quarter remains at 2am.</p>
          <div className="p-5 rounded-xl bg-card border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-4">Caffeine Timeline (200mg at 2pm)</h3>
            <div className="space-y-2">
              {[
                { time: "2:00 PM", amount: "200mg", level: 100 },
                { time: "7:00 PM", amount: "100mg", level: 50 },
                { time: "12:00 AM", amount: "50mg", level: 25 },
                { time: "5:00 AM", amount: "25mg", level: 12.5 },
              ].map((item) => (
                <div key={item.time} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground w-20">{item.time}</span>
                  <div className="flex-1 h-6 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${item.level}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-16">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-red-600 dark:text-red-400">Sleep Impact:</strong> Even if you can fall asleep with caffeine in your system, it reduces deep sleep stages by up to 20%.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Sun className="h-6 w-6 text-amber-500" />
            Optimal Caffeine Timing
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" />The 90-Minute Rule</h3>
              <p className="text-sm text-muted-foreground mb-3">Wait 90 minutes after waking for your first coffee:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">1.</span>Cortisol peaks within first hour of waking (natural alertness)</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">2.</span>Caffeine during cortisol peak builds tolerance faster</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">3.</span>Post-cortisol dip (~90 min) is when caffeine is most effective</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />The Cutoff Rule</h3>
              <p className="text-sm text-muted-foreground">Stop all caffeine 8-10 hours before bed. For 11pm bedtime, cutoff is 1-3pm.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-cyan-500" />
            Strategic Caffeine for Productivity
          </h2>
          <div className="space-y-4">
            {[
              { strategy: "Caffeine Nap", how: "Drink coffee, immediately nap for 20 min. Wake as caffeine kicks in.", why: "Napping clears adenosine while caffeine blocks receptors. Double effect." },
              { strategy: "Pre-Workout Timing", how: "Consume caffeine 30-60 min before exercise or demanding work.", why: "Peak blood concentration occurs ~45 min after consumption." },
              { strategy: "Caffeine Cycling", how: "Take 1-2 week breaks every few months to reset tolerance.", why: "Tolerance builds quickly; breaks restore sensitivity." },
              { strategy: "L-Theanine Stack", how: "Combine 100mg caffeine with 200mg L-theanine.", why: "L-theanine smooths caffeine's jittery edges, promotes calm focus." },
            ].map((item) => (
              <div key={item.strategy} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">{item.strategy}</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium text-cyan-600 dark:text-cyan-400">How:</span><p className="text-muted-foreground">{item.how}</p></div>
                  <div><span className="font-medium text-cyan-600 dark:text-cyan-400">Why:</span><p className="text-muted-foreground">{item.why}</p></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is coffee dehydrating?", a: "Mild diuretic effect, but the water in coffee more than compensates. Moderate coffee consumption doesn't cause dehydration." },
              { q: "Should I quit caffeine entirely?", a: "Not necessarily. Moderate caffeine use has cognitive benefits. The goal is strategic use, not elimination." },
              { q: "What about caffeine tolerance?", a: "Tolerance develops quickly (1-2 weeks of daily use). Taking periodic breaks can partially reset sensitivity." },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-600/10 via-orange-500/5 to-transparent border border-amber-600/20">
            <h2 className="text-xl font-bold text-foreground mb-4">Optimize Your Caffeine Strategy</h2>
            <p className="text-muted-foreground mb-4">Use the calculator above to find your optimal caffeine windows. A well-placed coffee enhances your Pomodoro sessions without compromising tonight&apos;s recovery.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors">
                <Timer className="h-4 w-4" />
                Start Focused Work Session
              </Link>
              <Link href="/blog/morning-routine-productivity" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
                Morning Routine Guide
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/morning-routine-productivity" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">Morning Routine for Productivity</h3>
              <p className="text-sm text-muted-foreground">Science-backed morning rituals including optimal caffeine timing.</p>
            </Link>
            <Link href="/blog/ultradian-rhythms" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">Ultradian Rhythms</h3>
              <p className="text-sm text-muted-foreground">Align caffeine with your natural 90-minute energy cycles.</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
