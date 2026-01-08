import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Sun, Moon, Coffee, Dumbbell, Brain, Timer, CheckCircle2, Zap, BookOpen } from "lucide-react"
import { MorningRoutineBuilder } from "@/components/ui/morning-routine-builder"

export const metadata: Metadata = {
  title: "Morning Routine for Productivity: Science-Backed Rituals | Pomobox",
  description: "Build a productive morning routine backed by science. Learn optimal wake times, exercise timing, and focus rituals to start your day with peak cognitive performance.",
  keywords: ["morning routine productivity", "productive morning habits", "morning ritual success", "wake up routine", "morning focus"],
  openGraph: {
    title: "Morning Routine for Productivity | Pomobox",
    description: "Science-backed morning rituals for peak cognitive performance.",
    type: "article",
    publishedTime: "2025-01-08",
  },
  alternates: { canonical: "https://pomobox.co/blog/morning-routine-productivity" },
}

export default function MorningRoutineProductivityPage() {
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sun className="h-3 w-3" />
              Morning Routine
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              10 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Morning Routine for Productivity: Science-Backed Rituals</h1>
          <p className="text-lg text-muted-foreground">How you start your morning determines how you perform all day. Learn the neuroscience behind effective morning rituals.</p>
        </header>

        <MorningRoutineBuilder className="mb-12" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <p className="lead text-lg text-muted-foreground">The first hour after waking is a neurological goldmine. Cortisol peaks, adenosine clears, and your prefrontal cortex comes online fresh. What you do with this time sets the trajectory for your entire day.</p>
          <p>Research shows that willpower and decision-making capacity deplete throughout the day. Morning routines succeed because they front-load important behaviors when self-control is highest.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-violet-500" />
            The Science of Your Morning Brain
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Sun className="h-5 w-5 text-amber-500" />Cortisol Awakening Response</h3>
              <p className="text-sm text-muted-foreground mb-3">Within 30 minutes of waking, cortisol spikes 50-75% above baseline. This natural alertness boost is called the Cortisol Awakening Response (CAR).</p>
              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs text-muted-foreground"><strong className="text-amber-600 dark:text-amber-400">Practical tip:</strong> Use this window for tasks requiring alertness. Don&apos;t waste it on emails.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Moon className="h-5 w-5 text-indigo-500" />Adenosine Clearance</h3>
              <p className="text-sm text-muted-foreground mb-3">During sleep, adenosine (the chemical that makes you drowsy) clears from your brain. Morning is when levels are lowest.</p>
              <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                <p className="text-xs text-muted-foreground"><strong className="text-indigo-600 dark:text-indigo-400">Practical tip:</strong> Delay caffeine 90 min to avoid blocking adenosine clearance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-emerald-500" />
            Core Elements of a Productive Morning
          </h2>
          <div className="space-y-4">
            {[
              { icon: Sun, title: "Light Exposure (5-15 min)", why: "Sunlight stops melatonin production and advances your circadian clock", how: "Go outside within first hour, or use a 10,000 lux light box", color: "amber" },
              { icon: Dumbbell, title: "Movement (10-30 min)", why: "Exercise increases BDNF, blood flow to prefrontal cortex, and dopamine", how: "Even a 10-min walk works. Intensity matters less than consistency.", color: "emerald" },
              { icon: Coffee, title: "Delayed Caffeine (wait 90 min)", why: "Caffeine blocks adenosine receptors. Using it too early interferes with natural cortisol peak", how: "Drink water first, wait until cortisol dips for first coffee", color: "amber" },
              { icon: Brain, title: "Focus Work First (30-90 min)", why: "Morning prefrontal cortex is fresh—before emails and decisions deplete it", how: "Tackle your Most Important Task before checking communications", color: "violet" },
            ].map((item) => (
              <div key={item.title} className={`p-5 rounded-xl bg-${item.color}-500/5 border border-${item.color}-500/20`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-${item.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`h-5 w-5 text-${item.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Why:</strong> {item.why}</p>
                    <p className="text-sm text-muted-foreground"><strong>How:</strong> {item.how}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-red-500" />
            Morning Saboteurs to Avoid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { bad: "Checking phone immediately", why: "Reactive mode hijacks your agenda.", instead: "Leave phone in another room until after routine" },
              { bad: "Hitting snooze", why: "Fragmented sleep in final hour is worse quality.", instead: "Set alarm for actual wake time. Keep alarm across room." },
              { bad: "Decision-heavy mornings", why: "Choosing what to wear/eat depletes willpower.", instead: "Prepare clothes and breakfast the night before" },
              { bad: "Skipping breakfast (for some)", why: "Blood sugar crashes impair decision-making.", instead: "Experiment: track focus levels with/without for 2 weeks" },
            ].map((item) => (
              <div key={item.bad} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-red-500 text-lg">×</span>
                  <span className="font-medium text-foreground">{item.bad}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.why}</p>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-emerald-600 dark:text-emerald-400">{item.instead}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What if I'm not a morning person?", a: "Chronotype matters, but consistency matters more. Even night owls benefit from consistent wake times and morning light. The goal isn't 5am—it's a stable, intentional start." },
              { q: "Should I wake up earlier to fit in a routine?", a: "Only if you can also go to bed earlier. Sleep deprivation destroys any benefit from morning routines. Prioritize 7-8 hours of sleep over routine length." },
              { q: "What about weekends?", a: "Try to keep wake time within 1 hour of weekday time. Large shifts cause 'social jet lag' that impairs Monday performance." },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">Start Tomorrow Morning</h2>
            <p className="text-muted-foreground mb-4">Use the builder above to create a routine that fits your schedule. Start with just one element and build from there.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors">
                <Timer className="h-4 w-4" />
                Start Morning Focus Session
              </Link>
              <Link href="/blog/deep-work-method" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
                Deep Work Method
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/ultradian-rhythms" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">Ultradian Rhythms</h3>
              <p className="text-sm text-muted-foreground">Work with your body&apos;s natural 90-minute energy cycles.</p>
            </Link>
            <Link href="/blog/caffeine-and-focus" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">Caffeine and Focus</h3>
              <p className="text-sm text-muted-foreground">Optimize your caffeine timing for peak productivity.</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
