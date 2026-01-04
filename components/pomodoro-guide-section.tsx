"use client"

import Link from "next/link"
import {
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
  ArrowRight,
  Users,
  Code,
  Pen,
  Briefcase,
  Globe,
} from "lucide-react"

// Shared content data
const STEPS = [
  {
    number: 1,
    icon: ListTodo,
    title: "Choose a Task",
    description:
      "Select a task you want to work on. It can be anything - studying, coding, writing, or any work that needs your attention.",
  },
  {
    number: 2,
    icon: Clock,
    title: "Set the Timer",
    description:
      "Set your timer for 25 minutes. This is one pomodoro. Commit to focusing solely on your task until the timer rings.",
  },
  {
    number: 3,
    icon: Target,
    title: "Work with Focus",
    description:
      "Work on your task with full concentration. Avoid distractions and interruptions. If something pops up, note it and return to your task.",
  },
  {
    number: 4,
    icon: Coffee,
    title: "Take a Break",
    description:
      "When the timer rings, take a 5-minute break. Step away from your work, stretch, or grab a drink. Let your mind rest.",
  },
  {
    number: 5,
    icon: Repeat,
    title: "Repeat",
    description:
      "After 4 pomodoros, take a longer break (15-30 minutes). Then start a new cycle. Track your progress and celebrate your focus sessions!",
  },
]

const BENEFITS = [
  {
    icon: Brain,
    title: "Fights Procrastination",
    description:
      "Research shows that 'planning fallacy' causes 40% of procrastination. A 25-minute pomodoro feels achievable, removing the mental barrier to start.",
  },
  {
    icon: Target,
    title: "Improves Focus",
    description:
      "Task-switching reduces productivity by 40% (Stanford research). Pomodoros train your brain to concentrate on one thing, entering 'flow state' faster.",
  },
  {
    icon: Clock,
    title: "Prevents Burnout",
    description:
      "Neuroscience shows that structured breaks maximize cognitive performance. Pomodoro's rest periods prevent fatigue that kills long-term productivity.",
  },
  {
    icon: Zap,
    title: "Builds Momentum",
    description:
      "Each completed pomodoro triggers dopamine release. Small wins create a positive feedback loop—from 'I should work' to 'I want to keep going.'",
  },
]

const WHO_BENEFITS = [
  {
    icon: Brain,
    title: "Students",
    description:
      "Pomodoro prevents burnout during long study sessions and helps you retain information better with strategic breaks.",
  },
  {
    icon: Code,
    title: "Developers & Engineers",
    description:
      "Avoid decision fatigue and context-switching. Pomodoros lead to fewer bugs and better code quality.",
  },
  {
    icon: Pen,
    title: "Writers & Creators",
    description:
      "Blank page anxiety disappears when you commit to 25 minutes. Pomodoro cycles help ideas percolate between sessions.",
  },
  {
    icon: Briefcase,
    title: "Professionals & Managers",
    description:
      "Create protected time for strategic thinking and deep work that moves projects forward.",
  },
  {
    icon: Globe,
    title: "Freelancers & Remote Workers",
    description:
      "Create natural work rhythms and track billable hours accurately without office structure.",
  },
  {
    icon: Target,
    title: "Anyone Fighting Distraction",
    description:
      "If you struggle with notifications or maintaining focus, Pomodoro provides the external structure your brain needs.",
  },
]

const FEATURES = [
  {
    icon: Music,
    title: "Focus BGM",
    description:
      "Curated lo-fi and ambient music to help you concentrate. Our BGM player helps create the perfect atmosphere for deep work.",
  },
  {
    icon: BarChart3,
    title: "Detailed Statistics",
    description:
      "Track your focus time, sessions, and streaks. Visualize your productivity patterns with weekly and monthly charts.",
  },
  {
    icon: Calendar,
    title: "Activity Calendar",
    description:
      "See your focus history at a glance. Daily check-ins and streak tracking keep you motivated and accountable.",
  },
]

const FAQS = [
  {
    question: "What makes Pomodoro effective?",
    answer:
      "The Pomodoro Technique works because it aligns with how our brains naturally function. The 25-minute intervals match our natural attention span, making it easier to maintain focus. Regular breaks prevent mental fatigue and keep your mind fresh throughout the day.",
  },
  {
    question: "How do I get started with Pomodoro?",
    answer:
      "Getting started is simple: choose a task, set your timer for 25 minutes, and work with full focus until the timer rings. Take a 5-minute break, then repeat. After 4 sessions, take a longer 15-30 minute break. Pomobox handles all the timing for you automatically!",
  },
  {
    question: "Can I customize the timer duration?",
    answer:
      "Yes! While the traditional Pomodoro is 25 minutes, you can adjust the focus and break durations to match your personal workflow. Some people prefer 50-minute sessions, while others find 15-minute bursts more effective.",
  },
  {
    question: "What should I do during breaks?",
    answer:
      "Step away from your screen! Stretch, walk around, grab a drink, or do some light exercises. The key is to give your mind a real rest - avoid checking social media or emails, as these can be mentally draining.",
  },
]

// Sub-components
function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-6 group">
      <span className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
      </span>
      {children}
    </h2>
  )
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
        <span className="text-lg font-bold text-primary">{number}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-4 w-4 text-primary" />
          <h3 className="font-medium text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function BenefitCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>
      <p className="mt-3 text-muted-foreground leading-relaxed">{answer}</p>
    </details>
  )
}

// Guide section wrapper for scroll snap
function GuideSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`guide-snap-section min-h-[75vh] flex flex-col justify-center px-4 py-12 md:py-16 ${className}`}
    >
      <div className="max-w-3xl mx-auto w-full">{children}</div>
    </section>
  )
}

// Main component for homepage (with scroll snap)
export function PomodoroGuideSection() {
  return (
    <div className="guide-snap-container md:ml-16 lg:ml-20">
      {/* Section 1: What is Pomodoro - Problem-Solution Hook */}
      <GuideSection>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
            <Timer className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Reclaim Your Focus in 25 Minutes
          </h2>
          <p className="text-muted-foreground text-lg">
            The Pomodoro Technique is proven to boost focus and cut procrastination
          </p>
        </div>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">The Problem:</strong> You open your laptop to work, but 11 minutes
            later, you&apos;re distracted. A Slack message. An email. A random YouTube video.
            By lunchtime, you&apos;ve been &quot;working&quot; for hours but completed almost nothing.
            Sound familiar?
          </p>
          <p>
            <strong className="text-foreground">The Pomodoro Technique</strong> solves this by leveraging a simple
            psychological principle: when you commit to focusing for just <em>25 minutes</em>,
            your brain stops fighting. The task feels manageable. Distractions lose their power.
          </p>
          <p>
            Created by Francesco Cirillo in the late 1980s (using an actual tomato-shaped
            kitchen timer), this method has helped millions of students, developers, writers,
            and professionals reclaim their focus. Pomobox brings this timeless technique
            to the digital age with automation, statistics, and ambient focus music.
          </p>
        </div>
      </GuideSection>

      {/* Section 2: How to Use */}
      <GuideSection>
        <SectionTitle icon={ListTodo}>How to Use</SectionTitle>
        <div className="space-y-3">
          {STEPS.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </GuideSection>

      {/* Section 3: Why It Works */}
      <GuideSection>
        <SectionTitle icon={Zap}>Why It Works</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </GuideSection>

      {/* Section 4: Pomobox Features */}
      <GuideSection>
        <SectionTitle icon={Timer}>Why Pomobox?</SectionTitle>
        <div className="space-y-3 mb-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-3 gap-3 p-6 rounded-xl bg-muted/30 border border-border/50">
          <div className="text-center">
            <p className="text-xl font-bold text-primary mb-1">Free</p>
            <p className="text-xs text-muted-foreground">Forever, No Ads</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary mb-1">Open Source</p>
            <p className="text-xs text-muted-foreground">Your Data, Your Control</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary mb-1">Private</p>
            <p className="text-xs text-muted-foreground">Works Offline</p>
          </div>
        </div>
      </GuideSection>

      {/* Section 5: Who Benefits Most */}
      <GuideSection>
        <SectionTitle icon={Users}>Who Benefits Most?</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WHO_BENEFITS.map((item) => (
            <BenefitCard key={item.title} {...item} />
          ))}
        </div>
      </GuideSection>

      {/* Section 6: FAQ */}
      <GuideSection className="pb-24">
        <SectionTitle icon={Brain}>Frequently Asked Questions</SectionTitle>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to master Pomodoro? Learn best practices, common mistakes, and how to customize for your work style.
          </p>
          <Link
            href="/guide/what-is-pomodoro"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors group"
          >
            Read the Complete Guide
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </GuideSection>
    </div>
  )
}

// Standalone version for guide page (without scroll snap)
export function PomodoroGuideContent({
  variant = "standalone",
}: {
  variant?: "standalone" | "embedded"
}) {
  const containerClass =
    variant === "standalone" ? "max-w-3xl mx-auto py-12 px-4 sm:px-6" : ""

  return (
    <div className={containerClass}>
      {/* Hero */}
      <header className="text-center mb-10 pb-8 border-b border-white/10">
        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
          <Timer className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
          What is the Pomodoro Technique?
        </h1>
        <p className="text-muted-foreground text-lg">
          Master your focus with time-boxed productivity
        </p>
      </header>

      {/* Content */}
      <div className="space-y-10">
        {/* What is Pomodoro */}
        <section>
          <SectionTitle icon={Brain}>What is Pomodoro?</SectionTitle>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The Pomodoro Technique is a time management method developed by
              Francesco Cirillo in the late 1980s. It uses a timer to break work
              into focused intervals (traditionally 25 minutes), separated by
              short breaks.
            </p>
            <p>
              Each interval is known as a &quot;pomodoro&quot;, named after the
              tomato-shaped kitchen timer Cirillo used as a university student.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section>
          <SectionTitle icon={ListTodo}>How to Use</SectionTitle>
          <div className="space-y-3">
            {STEPS.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </section>

        {/* Why It Works */}
        <section>
          <SectionTitle icon={Zap}>Why It Works</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <SectionTitle icon={Timer}>Pomobox Features</SectionTitle>
          <div className="space-y-3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionTitle icon={Brain}>FAQ</SectionTitle>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
