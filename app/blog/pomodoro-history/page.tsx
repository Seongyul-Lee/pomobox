import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  History,
  User,
  Calendar,
  BookOpen,
  Globe,
  Award,
  Timer,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Quote,
  MapPin,
  Lightbulb,
  TrendingUp,
  Users,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"

export const metadata: Metadata = {
  title: "Pomodoro History: From Kitchen Timer to Global Movement | Pomobox",
  description: "Francesco Cirillo's origin story. How a tomato timer became a worldwide productivity movement. Discover why Pomodoro changed work forever.",
  keywords: ["pomodoro technique history", "Francesco Cirillo", "pomodoro origin", "tomato timer", "productivity history", "time management history"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/pomodoro-history",
    siteName: "Pomobox",
    title: "The History of Pomodoro: A Tomato-Shaped Revolution",
    description: "How a struggling university student and a kitchen timer created one of the world's most popular productivity techniques.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro History | Pomobox",
    description: "The origin story of the Pomodoro Technique: from Italian kitchen to global productivity movement.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/pomodoro-history",
  },
}

// Data
const TIMELINE = [
  {
    year: "Late 1980s",
    title: "The Struggle Begins",
    description: "Francesco Cirillo, a university student in Italy, faces a familiar problem: he can't focus. Hours pass, little gets done. He challenges himself: 'Can I focus for just 10 minutes?'",
    icon: User,
  },
  {
    year: "1987",
    title: "The Tomato Timer",
    description: "Cirillo grabs a tomato-shaped kitchen timer (pomodoro in Italian) and sets it for a short interval. The physical act of winding the timer creates commitment. It works.",
    icon: Timer,
  },
  {
    year: "Late 1980s",
    title: "Experimentation Phase",
    description: "Over months, Cirillo experiments with different durations: 2 minutes (too short), 45 minutes (too long for sustained focus), and settles on 25 minutes as the optimal interval.",
    icon: Lightbulb,
  },
  {
    year: "1992",
    title: "First Formalization",
    description: "Cirillo documents the technique formally, establishing the core rules: 25-minute sessions, 5-minute breaks, 15-30 minute breaks after 4 sessions. The Pomodoro Technique is born.",
    icon: BookOpen,
  },
  {
    year: "1998",
    title: "Software Development Application",
    description: "Working in software development, Cirillo applies and refines the technique in professional settings. He develops methods for estimation and team coordination using pomodoros.",
    icon: Calendar,
  },
  {
    year: "2006",
    title: "The Official Book",
    description: "Cirillo publishes 'The Pomodoro Technique' as a free PDF. It spreads virally through productivity communities. The technique gains its first wave of international followers.",
    icon: BookOpen,
  },
  {
    year: "2009-Present",
    title: "Global Adoption",
    description: "Books are published in multiple languages, thousands of apps are created, and millions worldwide adopt the technique. It becomes one of the most recognized productivity methods globally.",
    icon: Globe,
  },
]

const KEY_INSIGHTS = [
  {
    insight: "Why 25 Minutes?",
    explanation: "Cirillo tested various durations. Shorter sessions (15-20 min) didn't allow deep engagement with complex tasks. Longer sessions (35-45 min) led to fatigue and wandering attention. 25 minutes balanced depth with sustainability—long enough to make progress, short enough to maintain focus.",
  },
  {
    insight: "Why a Physical Timer?",
    explanation: "The act of winding a mechanical timer creates a physical commitment. You can see and hear time passing. Unlike digital timers, it can't be easily dismissed or ignored. Cirillo believed this tangible interaction was crucial to the technique's effectiveness.",
  },
  {
    insight: "Why 'Pomodoro'?",
    explanation: "Named after the tomato-shaped kitchen timer Cirillo used as a university student. The playful name made the technique memorable and approachable—discussing 'pomodoros' feels lighter than 'time management intervals.'",
  },
  {
    insight: "Why Strict Rules?",
    explanation: "The technique's rules (don't split pomodoros, take all breaks, void interrupted sessions) aren't arbitrary. They create psychological boundaries that protect focus and prevent the negotiation that undermines other systems.",
  },
]

const EVOLUTION = [
  {
    era: "1987-1999: Personal Tool",
    description: "Originally a personal hack for Cirillo's own focus problems. Shared informally with friends and colleagues. No formal documentation or promotion.",
  },
  {
    era: "2000-2006: Professional Application",
    description: "Applied in software development teams. Methods developed for project estimation using pomodoro counts. Began documenting results and refinements.",
  },
  {
    era: "2006-2012: Viral Spread",
    description: "Free PDF release triggers global spread. Early adopters in tech, writing, and academic communities. First wave of Pomodoro timer apps emerge.",
  },
  {
    era: "2012-Present: Mainstream Adoption",
    description: "Thousands of apps, books in 30+ languages, millions of practitioners. Adapted for remote work, education, creative fields. Part of mainstream productivity vocabulary.",
  },
]

const CIRILLO_QUOTES = [
  {
    quote: "I chose a very ambitious goal: to study for 10 minutes without any interruption.",
    context: "On his initial challenge that led to the technique",
  },
  {
    quote: "The goal is to work with time, not against it.",
    context: "On the philosophy behind Pomodoro",
  },
  {
    quote: "It's not about finding time, it's about using it effectively.",
    context: "On productivity fundamentals",
  },
]

const FAQS = [
  {
    question: "Who invented the Pomodoro Technique?",
    answer: "Francesco Cirillo, an Italian developer and entrepreneur, created the Pomodoro Technique in the late 1980s while he was a university student struggling to focus on his studies.",
  },
  {
    question: "When was the Pomodoro Technique invented?",
    answer: "The technique was developed in the late 1980s (around 1987), formalized in 1992, and publicly released as a free PDF in 2006. It gained worldwide popularity in the 2010s.",
  },
  {
    question: "Why is it called 'Pomodoro'?",
    answer: "Pomodoro is Italian for 'tomato.' The technique is named after the tomato-shaped kitchen timer that Francesco Cirillo used when he developed the method as a university student.",
  },
  {
    question: "Is Francesco Cirillo still involved with Pomodoro?",
    answer: "Yes. Cirillo continues to write, consult, and train organizations on the Pomodoro Technique through his company. He has expanded the methodology for team and organizational use.",
  },
  {
    question: "How has the technique changed since its invention?",
    answer: "The core principles remain the same: 25-minute sessions, short breaks, longer breaks after 4 sessions. Adaptations include variable session lengths, digital tools, and team applications—but the fundamentals haven't changed because they work.",
  },
]

const RELATED_CONTENT = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Learn the technique" },
  { href: "/blog/science-of-focus", title: "Science of Focus", description: "Why it works" },
  { href: "/guide/pomodoro-vs-timeboxing", title: "Pomodoro vs Timeboxing", description: "Compare methods" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "History of the Pomodoro Technique: From Kitchen Timer to Global Movement",
    description: "The complete origin story of the Pomodoro Technique, from Francesco Cirillo's university struggles to a worldwide productivity phenomenon.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-05",
    dateModified: "2025-01-05",
    url: "https://pomobox.app/blog/pomodoro-history",
    mainEntityOfPage: "https://pomobox.app/blog/pomodoro-history",
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

export default function PomodoroHistoryPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Pomodoro History")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6">
            <History className="h-3 w-3" />
            Origin Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            The History of Pomodoro
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            How a struggling student and a tomato-shaped timer created a worldwide productivity revolution
          </p>
          <ArticleMeta
            publishedDate="2025-01-05"
            modifiedDate="2025-01-05"
            readingTime="7 min"
          />

          {/* Key Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">1987</div>
              <div className="text-xs text-muted-foreground">Year created</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">30+</div>
              <div className="text-xs text-muted-foreground">Languages</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500">10M+</div>
              <div className="text-xs text-muted-foreground">Practitioners</div>
            </div>
          </div>
        </header>

        {/* The Beginning */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-amber-500/10">
                <MapPin className="h-5 w-5 text-amber-500" />
              </span>
              Italy, Late 1980s
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Francesco Cirillo was failing.</strong> Not academically—but in his ability to focus. Like countless students before and since, he would sit down to study and hours later realize he'd accomplished almost nothing. The books were open, but his mind was elsewhere.
              </p>
              <p>
                Frustrated with his own inability to concentrate, Cirillo made a bet with himself: <strong className="text-foreground">"Can I truly focus for just 10 minutes?"</strong> To keep himself honest, he needed an external timekeeper—something that would hold him accountable.
              </p>
              <p>
                He found it in his kitchen: a small, tomato-shaped cooking timer. <strong className="text-foreground">"Pomodoro"</strong>—Italian for tomato. He wound it up, heard it tick, and committed to those 10 minutes.
              </p>
              <p>
                It worked. The external commitment, the physical sound of time passing, the clear endpoint—these elements combined to create focus he hadn't experienced before. A simple idea, born from frustration, that would eventually change how millions approach work.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Calendar className="h-3 w-3" />
              Timeline
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              From Kitchen to Global Movement
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border/50" />

            <div className="space-y-6">
              {TIMELINE.map((event, i) => {
                const Icon = event.icon
                return (
                  <div key={i} className="relative pl-16 md:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                    <div className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-primary">{event.year}</span>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Lightbulb className="h-3 w-3" />
              Design Decisions
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Why the Technique Works
            </h2>
          </div>

          <div className="space-y-4">
            {KEY_INSIGHTS.map((item) => (
              <div
                key={item.insight}
                className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.insight}</h3>
                <p className="text-sm text-muted-foreground">{item.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cirillo Quotes */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Quote className="h-3 w-3" />
              In His Words
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              From Francesco Cirillo
            </h2>
          </div>

          <div className="space-y-4">
            {CIRILLO_QUOTES.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/10"
              >
                <Quote className="h-6 w-6 text-emerald-500 mb-3" />
                <p className="text-lg font-medium text-foreground mb-2 italic">"{item.quote}"</p>
                <p className="text-sm text-muted-foreground">{item.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evolution */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="h-3 w-3" />
              Evolution
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              How Pomodoro Evolved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EVOLUTION.map((era) => (
              <div
                key={era.era}
                className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <h3 className="font-semibold text-cyan-500 mb-2">{era.era}</h3>
                <p className="text-sm text-muted-foreground">{era.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legacy */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </span>
              The Legacy Today
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                From a single tomato timer in an Italian kitchen, the Pomodoro Technique has become <strong className="text-foreground">one of the most widely-used productivity methods in the world.</strong>
              </p>
              <p>
                <strong className="text-foreground">Thousands of apps</strong> bear its name or implement its principles. <strong className="text-foreground">Books have been published in 30+ languages.</strong> Universities teach it. Companies train employees in it. An estimated <strong className="text-foreground">10+ million people</strong> actively practice some version of the technique.
              </p>
              <p>
                What started as one student's struggle with focus has become a global vocabulary: "I'll do a pomodoro on that." The technique persists not because of marketing, but because <strong className="text-foreground">it works.</strong> Simple enough to start immediately, profound enough to transform how people work.
              </p>
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Be Part of the Story
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join millions who've discovered what Francesco Cirillo found in his kitchen: that focus can be trained, one tomato at a time.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Timer className="h-5 w-5" />
              Start Your First Pomodoro
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/what-is-pomodoro"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            What is Pomodoro?
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
