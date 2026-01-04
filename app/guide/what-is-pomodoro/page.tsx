import type { Metadata } from "next"
import Link from "next/link"
import {
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
  Code,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  BookOpen,
} from "lucide-react"

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

// Data
const STEPS = [
  { number: 1, icon: ListTodo, title: "Choose a Task", description: "Select what you'll work on—studying, coding, writing, or any focused task." },
  { number: 2, icon: Clock, title: "Set Timer (25 min)", description: "Commit to one pomodoro. The countdown creates urgency and focus." },
  { number: 3, icon: Target, title: "Work with Focus", description: "Full concentration until the timer rings. Note distractions, don't act on them." },
  { number: 4, icon: Coffee, title: "Take a Break (5 min)", description: "Step away. Stretch, hydrate, breathe. Let your brain rest." },
  { number: 5, icon: Repeat, title: "Repeat & Rest", description: "After 4 pomodoros, take a 15-30 minute break. Then start fresh." },
]

const BENEFITS = [
  { icon: Brain, title: "Fights Procrastination", description: "25 minutes feels achievable, removing the mental barrier to start. Research shows 'planning fallacy' causes 40% of procrastination—Pomodoro counters this." },
  { icon: Target, title: "Improves Deep Focus", description: "Time-boxing eliminates multitasking. Your brain enters flow state faster when it knows there's a defined endpoint." },
  { icon: Clock, title: "Prevents Burnout", description: "Structured breaks are proven to maximize cognitive performance. Short rests prevent the fatigue that kills long-term productivity." },
  { icon: Zap, title: "Builds Momentum", description: "Each completed pomodoro triggers dopamine release. Small wins create a positive feedback loop—turning 'I should work' into 'I want to keep going.'" },
]

const BEST_PRACTICES = [
  { icon: ListTodo, title: "Plan Pomodoros Daily", description: "Review tasks each morning and estimate how many pomodoros each needs. Eliminates decision fatigue during sessions." },
  { icon: BookOpen, title: "Keep an Interruption Log", description: "When distractions arise mid-session, jot them down quickly without breaking focus. Handle them during breaks." },
  { icon: Coffee, title: "Use Breaks Strategically", description: "Physical breaks are 50% more restorative than scrolling. Stand up, stretch, walk, hydrate." },
  { icon: Music, title: "Optimize Your Environment", description: "Background lo-fi or white noise masks distracting sounds. Close unrelated tabs and silence notifications." },
  { icon: Clock, title: "Adjust Duration by Task", description: "Try 45 minutes for deep technical work, 15 minutes for admin tasks. Find what works for your work type." },
  { icon: Target, title: "Batch Similar Tasks", description: "Group similar work together (all emails, all coding) to reduce mental switching costs." },
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

// JSON-LD 구조화 데이터
const jsonLd = [
  {
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
    datePublished: "2025-01-20",
    dateModified: "2025-01-05",
    url: "https://pomobox.app/guide/what-is-pomodoro",
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

export default function WhatIsPomodoroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Timer
        </Link>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            <Sparkles className="h-3 w-3" />
            Complete Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            What is the Pomodoro Technique?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Master time-boxed productivity and transform how you work
          </p>

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

        {/* Introduction */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </span>
              The Problem & Solution
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">The challenge:</strong> In today's digital world, the average person loses focus every 11 minutes. By lunchtime, you've been "working" for hours but completed almost nothing.
              </p>
              <p>
                <strong className="text-foreground">The Pomodoro Technique</strong> solves this by leveraging a psychological principle: when you commit to focusing for just 25 minutes, your brain stops fighting. The task feels manageable. Distractions lose their power.
              </p>
              <p>
                Created by Francesco Cirillo in the 1980s using a tomato-shaped kitchen timer (pomodoro = tomato in Italian), this method has helped millions reclaim their focus.
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

        {/* Why It Works */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Zap className="h-3 w-3" />
              Science-Backed
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Why It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Lightbulb className="h-3 w-3" />
              Pro Tips
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Best Practices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BEST_PRACTICES.map((practice) => {
              const Icon = practice.icon
              return (
                <div
                  key={practice.title}
                  className="flex items-start gap-3 p-4 md:p-5 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10 hover:border-violet-500/20 transition-colors"
                >
                  <Icon className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{practice.title}</h3>
                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                  </div>
                </div>
              )
            })}
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

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start your first pomodoro session right now. No signup required—your data stays private and on your device.
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
        <div className="pt-8 border-t border-border/50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Timer
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
