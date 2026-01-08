"use client"

import Link from "next/link"
import {
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
  ArrowRight,
  Code,
  Pen,
  Briefcase,
  Globe,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

// Compact step data for horizontal carousel
const STEPS = [
  { number: 1, icon: ListTodo, title: "Choose Task", emoji: "📋" },
  { number: 2, icon: Clock, title: "Set Timer", emoji: "⏱️" },
  { number: 3, icon: Target, title: "Focus", emoji: "🎯" },
  { number: 4, icon: Coffee, title: "Break", emoji: "☕" },
  { number: 5, icon: Repeat, title: "Repeat", emoji: "🔄" },
]

const BENEFITS = [
  {
    icon: Brain,
    title: "Fights Procrastination",
    description: "25 minutes feels achievable, removing the mental barrier to start.",
    stat: "40%",
    statLabel: "less procrastination",
  },
  {
    icon: Target,
    title: "Improves Focus",
    description: "Train your brain to concentrate and enter flow state faster.",
    stat: "2x",
    statLabel: "deeper focus",
  },
  {
    icon: Clock,
    title: "Prevents Burnout",
    description: "Strategic breaks maximize cognitive performance.",
    stat: "25%",
    statLabel: "more sustainable",
  },
  {
    icon: Zap,
    title: "Builds Momentum",
    description: "Small wins create a positive feedback loop.",
    stat: "3x",
    statLabel: "more productive",
  },
]

const WHO_BENEFITS = [
  { icon: Brain, title: "Students", emoji: "📚" },
  { icon: Code, title: "Developers", emoji: "💻" },
  { icon: Pen, title: "Writers", emoji: "✍️" },
  { icon: Briefcase, title: "Professionals", emoji: "💼" },
  { icon: Globe, title: "Remote Workers", emoji: "🌍" },
  { icon: Target, title: "Anyone", emoji: "🎯" },
]

const FEATURES = [
  {
    icon: Music,
    title: "Focus BGM",
    description: "Curated lo-fi and ambient music for deep work",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: BarChart3,
    title: "Statistics",
    description: "Track focus time, sessions, and streaks",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: Calendar,
    title: "Activity Calendar",
    description: "Daily check-ins and streak tracking",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
]

const FAQS = [
  {
    question: "What makes Pomodoro effective?",
    answer: "25-minute intervals match our natural attention span. Regular breaks prevent mental fatigue.",
  },
  {
    question: "How do I get started?",
    answer: "Choose a task, set 25 minutes, focus until the timer rings. Take a 5-minute break, repeat.",
  },
  {
    question: "Can I customize the timer?",
    answer: "Yes! Adjust focus and break durations to match your workflow. 15-50 minutes work well.",
  },
]

// Section badge component
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  )
}

// Main component for homepage - Modern editorial design
export function PomodoroGuideSection() {
  return (
    <div className="md:ml-16 lg:ml-20 bg-gradient-to-b from-transparent via-muted/30 to-muted/50 dark:via-background dark:to-muted/10">
      {/* Hero Section - Bold typography, editorial style */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <SectionBadge>Productivity Method</SectionBadge>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Reclaim Your Focus
              <span className="block text-primary mt-1">in 25 Minutes</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The Pomodoro Technique transforms how you work—one focused session at a time.
            </p>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">25</div>
              <div className="text-xs text-muted-foreground">min focus</div>
            </div>
            <div className="text-center border-x border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500">5</div>
              <div className="text-xs text-muted-foreground">min break</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">4</div>
              <div className="text-xs text-muted-foreground">cycles</div>
            </div>
          </div>

          {/* Steps - Horizontal scroll on mobile, grid on desktop */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4">
            <div className="flex gap-3 md:grid md:grid-cols-5 min-w-max md:min-w-0">
              {STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center p-4 rounded-2xl bg-card/50 dark:bg-card/30 border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 w-28 md:w-auto shrink-0"
                >
                  <span className="text-2xl mb-2">{step.emoji}</span>
                  <span className="text-xs font-bold text-primary mb-1">Step {step.number}</span>
                  <span className="text-xs text-foreground font-medium text-center">{step.title}</span>
                  {idx < STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-muted-foreground/30">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Magazine card layout */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <SectionBadge>Science-Backed</SectionBadge>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Why It Works
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="group p-4 md:p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-lg md:text-xl font-bold text-primary">{benefit.stat}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">{benefit.description}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">{benefit.statLabel}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Gradient cards */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <SectionBadge>Pomobox Features</SectionBadge>
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
                  <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
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
        </div>
      </section>

      {/* Who Benefits - Compact chips */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Perfect For
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {WHO_BENEFITS.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <span className="text-base">{item.emoji}</span>
                <span className="text-sm font-medium text-foreground">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA Section */}
      <section className="px-4 py-12 md:py-16 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Quick FAQ
            </h2>
          </div>

          <div className="space-y-3 mb-10">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready to Master Pomodoro?
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              Learn best practices, common mistakes, and pro tips for your workflow.
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group"
            >
              View All Guides
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

