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
} from "lucide-react"

export const metadata: Metadata = {
  title: "What is the Pomodoro Technique? | Pomobox",
  description: "Learn about the Pomodoro Technique, a time management method that uses a timer to break work into focused intervals. Master productivity with our free Pomodoro timer.",
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/what-is-pomodoro",
    siteName: "Pomobox",
    title: "What is the Pomodoro Technique? | Pomobox",
    description: "Learn about the Pomodoro Technique, a time management method that uses a timer to break work into focused intervals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is the Pomodoro Technique? | Pomobox",
    description: "Learn about the Pomodoro Technique, a time management method that uses a timer to break work into focused intervals.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/what-is-pomodoro",
  },
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mt-10 mb-4 group">
      <span className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      {children}
    </h2>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
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

export default function WhatIsPomodoroPage() {
  // JSON-LD 구조화 데이터: Article + FAQPage
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What is the Pomodoro Technique?",
      author: { "@type": "Organization", name: "Pomobox Team" },
      publisher: {
        "@type": "Organization",
        name: "Pomobox",
        logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
      },
      datePublished: "2025-01-20",
      url: "https://pomobox.app/guide/what-is-pomodoro",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes Pomodoro effective?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Pomodoro Technique works because it aligns with how our brains naturally function. The 25-minute intervals match our natural attention span, making it easier to maintain focus. Regular breaks prevent mental fatigue and keep your mind fresh throughout the day.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get started with Pomodoro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Getting started is simple: choose a task, set your timer for 25 minutes, and work with full focus until the timer rings. Take a 5-minute break, then repeat. After 4 sessions, take a longer 15-30 minute break. Pomobox handles all the timing for you automatically!",
          },
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Timer
        </Link>

        {/* Main Content Card */}
        <article className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Hero Section */}
          <header className="text-center mb-10 pb-8 border-b border-white/10">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
              <Timer className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              What is the Pomodoro Technique?
            </h1>
            <p className="text-muted-foreground text-lg">Master your focus with time-boxed productivity</p>
          </header>

          {/* Content */}
          <div className="space-y-2">
            {/* What is Pomodoro */}
            <SectionTitle icon={Brain}>What is Pomodoro?</SectionTitle>
            <Paragraph>
              The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.
              It uses a timer to break work into focused intervals (traditionally 25 minutes), separated by short breaks.
              Each interval is known as a &quot;pomodoro&quot;, named after the tomato-shaped kitchen timer Cirillo used as a university student.
            </Paragraph>

            {/* How to Use */}
            <SectionTitle icon={ListTodo}>How to Use</SectionTitle>
            <div className="space-y-3">
              <StepCard
                number={1}
                icon={ListTodo}
                title="Choose a Task"
                description="Select a task you want to work on. It can be anything - studying, coding, writing, or any work that needs your attention."
              />
              <StepCard
                number={2}
                icon={Clock}
                title="Set the Timer"
                description="Set your timer for 25 minutes. This is one pomodoro. Commit to focusing solely on your task until the timer rings."
              />
              <StepCard
                number={3}
                icon={Target}
                title="Work with Focus"
                description="Work on your task with full concentration. Avoid distractions and interruptions. If something pops up, note it and return to your task."
              />
              <StepCard
                number={4}
                icon={Coffee}
                title="Take a Break"
                description="When the timer rings, take a 5-minute break. Step away from your work, stretch, or grab a drink. Let your mind rest."
              />
              <StepCard
                number={5}
                icon={Repeat}
                title="Repeat"
                description="After 4 pomodoros, take a longer break (15-30 minutes). Then start a new cycle. Track your progress and celebrate your focus sessions!"
              />
            </div>

            {/* Why it Works */}
            <SectionTitle icon={Zap}>Why It Works</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BenefitCard
                icon={Brain}
                title="Fights Procrastination"
                description="Breaking work into small chunks makes starting easier. 25 minutes feels manageable, reducing the mental barrier to begin."
              />
              <BenefitCard
                icon={Target}
                title="Improves Focus"
                description="Time-boxing creates urgency and eliminates multitasking. You train your brain to concentrate on one thing at a time."
              />
              <BenefitCard
                icon={Clock}
                title="Prevents Burnout"
                description="Regular breaks keep your mind fresh. Short rests between sessions prevent mental fatigue and maintain productivity throughout the day."
              />
              <BenefitCard
                icon={Zap}
                title="Builds Momentum"
                description="Completing pomodoros creates a sense of accomplishment. Each session builds confidence and motivation to continue."
              />
            </div>

            {/* Pomobox Features */}
            <SectionTitle icon={Timer}>Pomobox Features</SectionTitle>
            <div className="space-y-3 mb-6">
              <FeatureCard
                icon={Music}
                title="Focus BGM"
                description="Curated lo-fi and ambient music to help you concentrate. Our BGM player helps create the perfect atmosphere for deep work."
              />
              <FeatureCard
                icon={BarChart3}
                title="Detailed Statistics"
                description="Track your focus time, sessions, and streaks. Visualize your productivity patterns with weekly and monthly charts."
              />
              <FeatureCard
                icon={Calendar}
                title="Activity Calendar"
                description="See your focus history at a glance. Daily check-ins and streak tracking keep you motivated and accountable."
              />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center py-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Timer className="h-5 w-5" />
                Start Timer
              </Link>
            </div>

            {/* FAQ */}
            <SectionTitle icon={Brain}>FAQ</SectionTitle>
            <div className="space-y-3">
              <FaqItem
                question="What makes Pomodoro effective?"
                answer="The Pomodoro Technique works because it aligns with how our brains naturally function. The 25-minute intervals match our natural attention span, making it easier to maintain focus. Regular breaks prevent mental fatigue and keep your mind fresh throughout the day."
              />
              <FaqItem
                question="How do I get started with Pomodoro?"
                answer="Getting started is simple: choose a task, set your timer for 25 minutes, and work with full focus until the timer rings. Take a 5-minute break, then repeat. After 4 sessions, take a longer 15-30 minute break. Pomobox handles all the timing for you automatically!"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Timer
            </Link>
          </div>
        </article>

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </div>
    </main>
  )
}
