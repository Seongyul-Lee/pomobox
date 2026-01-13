import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Coffee,
  Moon,
  Sun,
  Brain,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Clock3,
  Home,
  ChevronRight,
  Dna,
  Activity,
  Users,
  Beaker,
  HeartPulse,
  TrendingUp,
  ArrowRight,
  BookOpen,
  XCircle,
  FlaskConical,
} from "lucide-react"
import { CaffeineTimingCalculator } from "@/components/ui/caffeine-timing-calculator"

export const metadata: Metadata = {
  title: "Caffeine and Focus: The Complete Science of Optimal Coffee Timing | Pomobox",
  description:
    "Master the neuroscience of caffeine for peak productivity. Learn optimal timing based on your genetics, compare caffeine sources, and discover how to combine caffeine with Pomodoro for maximum focus.",
  keywords: [
    "caffeine productivity",
    "coffee timing",
    "caffeine and focus",
    "optimal caffeine",
    "coffee for concentration",
    "caffeine half-life",
    "adenosine receptor",
    "CYP1A2 gene",
    "caffeine metabolism",
    "coffee vs energy drink",
    "L-theanine caffeine",
    "caffeine nap",
    "cortisol caffeine timing",
    "sleep quality caffeine",
  ],
  openGraph: {
    title: "Caffeine and Focus: The Complete Science | Pomobox",
    description:
      "Neuroscience of caffeine for productivity. Optimal timing based on your genetics, caffeine source comparison, and Pomodoro integration strategies.",
    type: "article",
    publishedTime: "2025-01-08",
    modifiedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/caffeine-and-focus" },
}

// Research citations for credibility
const RESEARCH_CITATIONS = [
  {
    authors: "Cornelis, M. C., El-Sohemy, A., et al.",
    year: "2006",
    title: "Coffee, CYP1A2 genotype, and risk of myocardial infarction",
    journal: "JAMA",
    doi: "10.1001/jama.295.10.1135",
  },
  {
    authors: "Drake, C., Roehrs, T., et al.",
    year: "2013",
    title: "Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed",
    journal: "Journal of Clinical Sleep Medicine",
    doi: "10.5664/jcsm.3170",
  },
  {
    authors: "Fredholm, B. B., et al.",
    year: "1999",
    title: "Actions of caffeine in the brain with special reference to factors that contribute to its widespread use",
    journal: "Pharmacological Reviews",
    doi: "10.1124/pr.51.1.83",
  },
  {
    authors: "Lovato, N., & Lack, L.",
    year: "2010",
    title: "The effects of napping on cognitive functioning",
    journal: "Progress in Brain Research",
    doi: "10.1016/B978-0-444-53702-7.00009-9",
  },
  {
    authors: "Ribeiro, J. A., & Sebastião, A. M.",
    year: "2010",
    title: "Caffeine and adenosine",
    journal: "Journal of Alzheimer's Disease",
    doi: "10.3233/JAD-2010-1379",
  },
]

// Expanded FAQ data
const FAQ_DATA = [
  {
    question: "Is coffee dehydrating?",
    answer:
      "Coffee has a mild diuretic effect, but the water content in coffee more than compensates for fluid loss. Studies show that moderate coffee consumption (3-4 cups daily) does not cause dehydration or negatively impact hydration status. However, if you're exercising intensely or in hot environments, supplement with additional water.",
  },
  {
    question: "Should I quit caffeine entirely?",
    answer:
      "Not necessarily. Moderate caffeine use has documented cognitive benefits including improved alertness, concentration, and memory. The goal is strategic use, not elimination. If you experience anxiety, sleep problems, or need excessive amounts to feel effects, consider reducing intake or taking periodic breaks to reset tolerance.",
  },
  {
    question: "What about caffeine tolerance?",
    answer:
      "Tolerance develops within 1-2 weeks of daily use as your brain produces more adenosine receptors. Signs include needing more caffeine for the same effect and experiencing withdrawal (headaches, fatigue) without it. Taking 1-2 week breaks every few months can partially reset sensitivity, though complete reset may take longer.",
  },
  {
    question: "How does caffeine affect sleep even if I can fall asleep?",
    answer:
      "Caffeine reduces deep sleep (slow-wave sleep) by up to 20% even when you don't notice falling asleep difficulty. Deep sleep is crucial for memory consolidation, physical recovery, and immune function. This is why the 8-10 hour cutoff rule matters—you may sleep, but the quality is compromised.",
  },
  {
    question: "Is there a genetic component to caffeine sensitivity?",
    answer:
      "Yes. The CYP1A2 gene determines how fast you metabolize caffeine. 'Fast metabolizers' clear caffeine quickly and can drink coffee later in the day. 'Slow metabolizers' process it slowly and are more sensitive to sleep disruption and side effects. Genetic testing can reveal your type, or observe how caffeine affects your sleep.",
  },
  {
    question: "Can caffeine actually improve focus during Pomodoro sessions?",
    answer:
      "When timed correctly, yes. Consuming caffeine 30-45 minutes before a Pomodoro session means peak blood concentration aligns with your focus block. The key is strategic timing—not using caffeine as a crutch throughout the day, but as a targeted tool during your most demanding cognitive work.",
  },
]

// Caffeine source comparison data
const CAFFEINE_SOURCES = [
  { source: "Espresso (1 shot)", mg: 63, onset: "15-20 min", notes: "Fast absorption, concentrated" },
  { source: "Drip Coffee (8oz)", mg: 95, onset: "15-30 min", notes: "Standard morning option" },
  { source: "Cold Brew (8oz)", mg: 200, onset: "15-30 min", notes: "High concentration, smooth" },
  { source: "Black Tea (8oz)", mg: 47, onset: "30-45 min", notes: "L-theanine included" },
  { source: "Green Tea (8oz)", mg: 28, onset: "30-45 min", notes: "High L-theanine, gentle" },
  { source: "Energy Drink (8oz)", mg: 80, onset: "15-30 min", notes: "Added sugar, B-vitamins" },
  { source: "Caffeine Pill", mg: 200, onset: "30-45 min", notes: "Precise dosing, no extras" },
  { source: "Dark Chocolate (1oz)", mg: 23, onset: "45-60 min", notes: "Theobromine synergy" },
]

// Pre-stringify JSON-LD for FAQ Schema
// Note: This is static data with no user input, safe for dangerouslySetInnerHTML
const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
})

export default function CaffeineAndFocusPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* FAQ Schema JSON-LD - static data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/learn" className="hover:text-foreground transition-colors">
                Learn
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium">Caffeine & Focus</li>
          </ol>
        </nav>

        {/* Back Link */}
        <nav className="mb-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Hub
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-600/10 text-amber-600 dark:text-amber-400">
              <Coffee className="h-3 w-3" />
              Caffeine Science
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              16 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Caffeine and Focus: The Complete Science of Optimal Coffee Timing
          </h1>
          <p className="text-lg text-muted-foreground">
            Most people drink coffee wrong. Learn the neuroscience of when, how much, and why—plus
            how your genetics affect caffeine metabolism.
          </p>
        </header>

        {/* Article Meta - Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-amber-600/10 via-orange-500/5 to-transparent border border-amber-600/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">5-6hr</div>
              <div className="text-xs md:text-sm text-muted-foreground">Caffeine Half-Life</div>
            </div>
            <div className="text-center border-x border-amber-600/20">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">400mg</div>
              <div className="text-xs md:text-sm text-muted-foreground">Daily Safe Limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">90min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Wait After Waking</div>
            </div>
          </div>
        </section>

        {/* Interactive Calculator */}
        <CaffeineTimingCalculator className="mb-12" />

        {/* Introduction */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <p className="lead text-lg text-muted-foreground">
            Caffeine is the world&apos;s most widely used psychoactive substance. Over 80% of adults
            consume it daily. Yet most people use it inefficiently—drinking coffee when their body
            doesn&apos;t need it and suffering the consequences at night.
          </p>
          <p>
            Understanding caffeine&apos;s mechanism reveals a simple truth:{" "}
            <strong>timing matters more than quantity</strong>. A well-timed cup outperforms three
            poorly-timed cups. This guide covers the neuroscience, genetics, and practical strategies
            to optimize your caffeine use for productivity.
          </p>
        </section>

        {/* Caffeine Neuroscience Deep Dive - NEW SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-violet-500" />
            Caffeine Neuroscience Deep Dive
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-violet-500/20 mb-6">
            <h3 className="font-semibold text-foreground mb-4">The Adenosine Story</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Adenosine is a neuromodulator that accumulates while you&apos;re awake. When it binds to
              A1 and A2A receptors, it signals your brain that you&apos;ve been awake long enough—time
              to feel tired and eventually sleep.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <div className="text-2xl mb-2">1</div>
                <h4 className="font-medium text-foreground text-sm mb-1">Adenosine Builds</h4>
                <p className="text-xs text-muted-foreground">
                  While you&apos;re awake, adenosine accumulates in your brain, binding to
                  receptors and making you feel progressively more tired.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="text-2xl mb-2">2</div>
                <h4 className="font-medium text-foreground text-sm mb-1">Caffeine Blocks</h4>
                <p className="text-xs text-muted-foreground">
                  Caffeine molecules are structurally similar to adenosine. They fit into
                  receptors but don&apos;t activate the &quot;tired&quot; signal.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="text-2xl mb-2">3</div>
                <h4 className="font-medium text-foreground text-sm mb-1">You Feel Alert</h4>
                <p className="text-xs text-muted-foreground">
                  With adenosine blocked, you don&apos;t feel tired—even though adenosine keeps
                  building in the background.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Effects */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                Dopamine Release
              </h4>
              <p className="text-sm text-muted-foreground">
                Caffeine indirectly increases dopamine in the prefrontal cortex by blocking adenosine&apos;s
                inhibitory effect. This contributes to improved mood, motivation, and the
                &quot;reward&quot; feeling of your morning coffee.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-rose-500" />
                Adrenaline Surge
              </h4>
              <p className="text-sm text-muted-foreground">
                Caffeine triggers adrenaline (epinephrine) release, increasing heart rate, blood
                pressure, and energy availability. This &quot;fight or flight&quot; activation
                explains both alertness and potential jitteriness.
              </p>
            </div>
          </div>

          {/* The Catch */}
          <div className="mt-6 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              The Caffeine Crash Explained
            </h4>
            <p className="text-sm text-muted-foreground">
              While caffeine blocks adenosine receptors, adenosine keeps accumulating. When caffeine
              wears off (4-6 hours), all that built-up adenosine floods your receptors at once—the
              &quot;crash.&quot; This is why timing your last coffee matters: you want adenosine to
              clear naturally before bed, not crash into you.
            </p>
          </div>
        </section>

        {/* The Half-Life Problem */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock3 className="h-6 w-6 text-red-500" />
            The Half-Life Problem
          </h2>
          <p className="text-muted-foreground mb-4">
            Caffeine has a half-life of <strong>5-6 hours</strong> in most adults. Half your 2pm
            coffee is still active at 8pm. A quarter remains at 2am. This is the single most
            underestimated factor in caffeine use.
          </p>
          <div className="p-5 rounded-xl bg-card border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-4">Caffeine Timeline (200mg at 2pm)</h3>
            <div className="space-y-2">
              {[
                { time: "2:00 PM", amount: "200mg", level: 100, note: "Peak alertness" },
                { time: "7:00 PM", amount: "100mg", level: 50, note: "Still significantly active" },
                { time: "12:00 AM", amount: "50mg", level: 25, note: "Disrupting deep sleep" },
                { time: "5:00 AM", amount: "25mg", level: 12.5, note: "Finally clearing" },
              ].map((item) => (
                <div key={item.time} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground w-20">{item.time}</span>
                  <div className="flex-1 h-6 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${item.level}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-16">{item.amount}</span>
                  <span className="text-xs text-muted-foreground hidden md:block w-40">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-red-600 dark:text-red-400">Sleep Impact:</strong> Even if
                  you can fall asleep with caffeine in your system, research shows it reduces deep
                  sleep stages by up to 20%. Deep sleep is essential for memory consolidation,
                  immune function, and physical recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Individual Variation - NEW SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Dna className="h-6 w-6 text-cyan-500" />
            Individual Variation: Why Coffee Hits Everyone Differently
          </h2>
          <p className="text-muted-foreground mb-6">
            Not everyone metabolizes caffeine at the same rate. Your response is largely determined
            by genetics, age, and lifestyle factors.
          </p>

          {/* CYP1A2 Gene */}
          <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 mb-6">
            <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              The CYP1A2 Gene
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              The CYP1A2 gene produces the liver enzyme that metabolizes ~95% of caffeine. Variants
              in this gene create two distinct populations:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                  Fast Metabolizers (~50%)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear caffeine quickly (half-life ~4 hours)</li>
                  <li>• Can drink coffee later in the day</li>
                  <li>• Less affected by sleep disruption</li>
                  <li>• May need more caffeine for same effect</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <h4 className="font-medium text-rose-600 dark:text-rose-400 mb-2">
                  Slow Metabolizers (~50%)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear caffeine slowly (half-life ~8+ hours)</li>
                  <li>• Need earlier caffeine cutoff</li>
                  <li>• Higher risk of sleep disruption</li>
                  <li>• More prone to jitteriness, anxiety</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Other Factors */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-500" />
                Age
              </h4>
              <p className="text-sm text-muted-foreground">
                Caffeine metabolism slows with age. A 60-year-old may process caffeine 33% slower
                than a 30-year-old.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                Smoking
              </h4>
              <p className="text-sm text-muted-foreground">
                Smoking induces CYP1A2 activity, making smokers metabolize caffeine ~50% faster than
                non-smokers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-rose-500" />
                Pregnancy
              </h4>
              <p className="text-sm text-muted-foreground">
                Caffeine half-life doubles during pregnancy. Recommended limit: 200mg/day or less.
              </p>
            </div>
          </div>

          {/* Self-Assessment */}
          <div className="mt-6 p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold text-foreground mb-3">Quick Self-Assessment</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Don&apos;t have genetic testing? Observe your own patterns:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                  Signs you&apos;re a fast metabolizer:
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  <li>• Afternoon coffee doesn&apos;t affect sleep</li>
                  <li>• Need multiple cups to feel effects</li>
                  <li>• Effects wear off within 3-4 hours</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-1">
                  Signs you&apos;re a slow metabolizer:
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  <li>• Even morning coffee affects sleep</li>
                  <li>• One cup provides strong, lasting effect</li>
                  <li>• Prone to jitters, racing heart</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Caffeine by Source Comparison - NEW SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Coffee className="h-6 w-6 text-amber-500" />
            Caffeine by Source: Comparison Table
          </h2>
          <p className="text-muted-foreground mb-6">
            Not all caffeine is equal. Different sources have varying amounts, onset times, and
            accompanying compounds that affect how you feel.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Source</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Caffeine</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Onset</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {CAFFEINE_SOURCES.map((item, i) => (
                  <tr
                    key={item.source}
                    className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}
                  >
                    <td className="py-3 px-4 text-foreground">{item.source}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-amber-600 dark:text-amber-400">
                        {item.mg}mg
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{item.onset}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-emerald-600 dark:text-emerald-400">Pro Tip:</strong> Green
                tea and matcha contain L-theanine, which promotes calm alertness and smooths
                caffeine&apos;s effects. If you&apos;re sensitive to jitters, tea may be a better
                choice than coffee.
              </p>
            </div>
          </div>
        </section>

        {/* Optimal Caffeine Timing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Sun className="h-6 w-6 text-amber-500" />
            Optimal Caffeine Timing
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                The 90-Minute Rule
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Wait 90 minutes after waking for your first coffee. Here&apos;s why:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">1.</span>
                  <span>
                    <strong>Cortisol peaks</strong> within the first hour of waking, providing
                    natural alertness. Caffeine during this peak builds tolerance faster.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">2.</span>
                  <span>
                    <strong>Post-cortisol dip</strong> occurs around 90-120 minutes after waking.
                    This is when caffeine is most effective.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">3.</span>
                  <span>
                    <strong>Adenosine clearing</strong>: Sleep clears adenosine. If you caffeine
                    immediately, you&apos;re blocking receptors that aren&apos;t yet filled—wasted
                    potential.
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                The Cutoff Rule
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Stop all caffeine <strong>8-10 hours</strong> before bed:
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-background/50 text-center">
                  <div className="text-sm font-medium text-foreground">10pm Bedtime</div>
                  <div className="text-xs text-muted-foreground">Cutoff: 12-2pm</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 text-center">
                  <div className="text-sm font-medium text-foreground">11pm Bedtime</div>
                  <div className="text-xs text-muted-foreground">Cutoff: 1-3pm</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 text-center">
                  <div className="text-sm font-medium text-foreground">12am Bedtime</div>
                  <div className="text-xs text-muted-foreground">Cutoff: 2-4pm</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Caffeine for Productivity */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-cyan-500" />
            Strategic Caffeine for Productivity
          </h2>
          <div className="space-y-4">
            {[
              {
                strategy: "Caffeine Nap",
                how: "Drink coffee, immediately nap for 20 minutes. Wake as caffeine kicks in.",
                why: "Napping clears adenosine while caffeine is being absorbed. When you wake, receptors are both cleared AND blocked—double effect.",
                best: "Early afternoon energy dip (1-3pm)",
              },
              {
                strategy: "Pre-Focus Timing",
                how: "Consume caffeine 30-45 minutes before demanding cognitive work.",
                why: "Peak blood concentration occurs ~45 minutes after consumption. Align your Pomodoro session with peak caffeine effect.",
                best: "Before important presentations or deep work blocks",
              },
              {
                strategy: "Caffeine Cycling",
                how: "Take 1-2 week breaks every few months to reset tolerance.",
                why: "Tolerance builds as your brain creates more adenosine receptors. Breaks allow receptor levels to normalize.",
                best: "During vacation or low-demand periods",
              },
              {
                strategy: "L-Theanine Stack",
                how: "Combine 100mg caffeine with 200mg L-theanine (found in tea).",
                why: "L-theanine promotes alpha brain waves, smoothing caffeine's jittery edges. Result: calm, sustained focus.",
                best: "If you're sensitive to caffeine anxiety",
              },
            ].map((item) => (
              <div key={item.strategy} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-3">{item.strategy}</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-cyan-600 dark:text-cyan-400 text-xs uppercase tracking-wide">
                      How
                    </span>
                    <p className="text-muted-foreground mt-1">{item.how}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cyan-600 dark:text-cyan-400 text-xs uppercase tracking-wide">
                      Why
                    </span>
                    <p className="text-muted-foreground mt-1">{item.why}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cyan-600 dark:text-cyan-400 text-xs uppercase tracking-wide">
                      Best For
                    </span>
                    <p className="text-muted-foreground mt-1">{item.best}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Caffeine + Pomodoro Synergy - NEW SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            Caffeine + Pomodoro Synergy
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-6">
              Combining strategic caffeine timing with the Pomodoro Technique creates a powerful
              productivity system. Here&apos;s how to align them:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Morning: 90-Minute Delay</h4>
                    <p className="text-sm text-muted-foreground">
                      Start your first Pomodoro session immediately upon waking, using natural
                      cortisol-driven alertness. Drink your first coffee after completing your first
                      2 pomodoros (~90 minutes).
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Pre-Session Timing</h4>
                    <p className="text-sm text-muted-foreground">
                      For critical deep work blocks, consume caffeine 30-45 minutes before starting.
                      The peak caffeine effect will align with your Pomodoro session for enhanced
                      concentration.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Afternoon Energy Dip</h4>
                    <p className="text-sm text-muted-foreground">
                      If working through the post-lunch dip (1-3pm), time your last coffee to hit
                      peak effect during this challenging period. Remember your cutoff time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Caffeine Nap Break</h4>
                    <p className="text-sm text-muted-foreground">
                      Instead of a regular Pomodoro break, try a caffeine nap: drink coffee quickly,
                      set a 20-minute timer, close your eyes. Wake refreshed with adenosine cleared
                      and caffeine kicking in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <XCircle className="h-6 w-6 text-rose-500" />
            Common Caffeine Mistakes
          </h2>
          <div className="space-y-4">
            {[
              {
                mistake: "Drinking coffee immediately upon waking",
                why: "Blocks cortisol's natural alertness, builds tolerance faster, wastes caffeine's potential",
                fix: "Wait 90 minutes after waking for first coffee",
              },
              {
                mistake: "Afternoon coffee 'to get through the day'",
                why: "Caffeine half-life means 50% is still active 5-6 hours later, disrupting sleep",
                fix: "Set a hard cutoff 8-10 hours before bedtime",
              },
              {
                mistake: "Using caffeine to mask sleep debt",
                why: "Adenosine keeps building; you're just delaying the crash while degrading sleep quality further",
                fix: "Address root cause: prioritize sleep, use caffeine strategically not constantly",
              },
              {
                mistake: "Drinking coffee on empty stomach",
                why: "Can cause stomach irritation, anxiety, and faster-than-ideal caffeine absorption",
                fix: "Eat something before or with your coffee, especially if sensitive",
              },
            ].map((item) => (
              <div key={item.mistake} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4">
                  <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{item.mistake}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong className="text-rose-600 dark:text-rose-400">Why it&apos;s bad:</strong>{" "}
                      {item.why}
                    </p>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        <strong>Fix:</strong> {item.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Citations Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-cyan-500" />
            Research & References
          </h2>
          <div className="space-y-3">
            {RESEARCH_CITATIONS.map((cite, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-3">
                  <span className="text-xs text-muted-foreground mt-0.5">[{i + 1}]</span>
                  <div>
                    <p className="text-sm text-foreground">
                      {cite.authors} ({cite.year}). <em>{cite.title}</em>. {cite.journal}.
                    </p>
                    <a
                      href={`https://doi.org/${cite.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      DOI: {cite.doi}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expanded FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-600/10 via-orange-500/5 to-transparent border border-amber-600/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Optimize Your Caffeine Strategy
            </h2>
            <p className="text-muted-foreground mb-4">
              Use the calculator above to find your optimal caffeine windows. A well-placed coffee
              enhances your Pomodoro sessions without compromising tonight&apos;s recovery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Focused Work Session
              </Link>
              <Link
                href="/blog/morning-routine-productivity"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Morning Routine Guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/blog/morning-routine-productivity"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Morning Routine for Productivity
              </h3>
              <p className="text-sm text-muted-foreground">
                Science-backed morning rituals including optimal caffeine timing.
              </p>
            </Link>
            <Link
              href="/blog/ultradian-rhythms"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Ultradian Rhythms
              </h3>
              <p className="text-sm text-muted-foreground">
                Align caffeine with your natural 90-minute energy cycles.
              </p>
            </Link>
            <Link
              href="/blog/deep-work-method"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Deep Work Method
              </h3>
              <p className="text-sm text-muted-foreground">
                Cal Newport&apos;s framework for distraction-free productivity.
              </p>
            </Link>
            <Link
              href="/blog/why-25-minutes"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Why 25 Minutes?
              </h3>
              <p className="text-sm text-muted-foreground">
                The science behind the Pomodoro Technique&apos;s timing.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
