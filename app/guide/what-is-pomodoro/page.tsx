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
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes Pomodoro effective?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Pomodoro Technique works by leveraging psychological principles: breaking overwhelming tasks into manageable chunks, creating urgency through time-boxing, providing structured breaks for cognitive recovery, and creating measurable progress. Research shows that 25-minute focused sessions align with our natural attention cycles, while breaks prevent mental fatigue and improve long-term productivity.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get started with Pomodoro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Choose a task, set your timer for 25 minutes, and work with full focus until the timer rings. Take a 5-minute break, then repeat. After 4 sessions, take a longer 15-30 minute break. Pomobox handles all the timing automatically!",
          },
        },
        {
          "@type": "Question",
          name: "Can I adjust the 25-minute timer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Try 45 minutes for deep technical work, 15 minutes for administrative tasks, and 20-30 minutes for creative work. Experiment to find what works best for your work type.",
          },
        },
        {
          "@type": "Question",
          name: "What if I get interrupted during a pomodoro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Write down the interruption without stopping work, then address it during your break. For genuine emergencies, pause and restart your timer when you return.",
          },
        },
        {
          "@type": "Question",
          name: "How many pomodoros should I do per day?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most people aim for 8-10 pomodoros per day (about 4-5 hours of focused work). Quality matters more than quantity—listen to your energy levels.",
          },
        },
        {
          "@type": "Question",
          name: "What should I do during breaks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Take physical breaks: stand up, stretch, walk around, drink water, or step outside. Avoid scrolling on your phone—your brain needs genuine rest.",
          },
        },
        {
          "@type": "Question",
          name: "Does Pomodoro work for different job types?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Developers might use longer sessions (45 min), managers shorter ones (15 min), teachers use them for lesson planning, and freelancers track billable hours. The core principle adapts to any field.",
          },
        },
        {
          "@type": "Question",
          name: "How do I avoid burnout with Pomodoro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Don't skip breaks or push through fatigue. The long breaks after every 4 pomodoros are essential for recovery. Pomodoro is a tool for sustainable productivity, not overwork.",
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
            <Paragraph>
              In today&apos;s fast-paced world, maintaining focus has become increasingly difficult. Research from the American Psychological Association shows that the average person loses concentration every 11 minutes—especially in digital environments. The Pomodoro Technique directly counteracts this challenge by leveraging <strong>time-boxing</strong>, a proven productivity strategy that aligns with how our brains naturally work.
            </Paragraph>
            <Paragraph>
              The technique&apos;s elegance lies in its simplicity: instead of facing an overwhelming project for hours, you commit to focused bursts of just 25 minutes. This creates psychological safety—the task feels manageable. Your brain enters deep work mode faster when it knows there&apos;s a defined endpoint. Meanwhile, strategic breaks prevent cognitive fatigue, allowing you to maintain peak performance across multiple sessions throughout your day.
            </Paragraph>
            <Paragraph>
              Whether you&apos;re a student tackling complex assignments, a software developer debugging code, a writer facing a blank page, or a professional juggling multiple projects, the Pomodoro timer brings structure to chaos. It transforms vague intentions like &quot;I should work on this&quot; into concrete actions: &quot;I will focus for exactly 25 minutes.&quot;
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
                description="Breaking work into small chunks makes starting easier. 25 minutes feels manageable, reducing the mental barrier to begin. You're not committing to hours—just one focused session."
              />
              <BenefitCard
                icon={Target}
                title="Improves Focus"
                description="Time-boxing creates urgency and eliminates multitasking. You train your brain to concentrate on one thing at a time, increasing flow state and deep work capacity."
              />
              <BenefitCard
                icon={Clock}
                title="Prevents Burnout"
                description="Regular breaks keep your mind fresh. Short rests between sessions prevent mental fatigue and maintain productivity throughout the day. Studies show that strategic breaks improve long-term performance."
              />
              <BenefitCard
                icon={Zap}
                title="Builds Momentum"
                description="Completing pomodoros creates a sense of accomplishment. Each session builds confidence and motivation to continue, creating a positive feedback loop."
              />
              <BenefitCard
                icon={ListTodo}
                title="Enables Accurate Time Estimation"
                description="Tracking completed pomodoros helps you understand how long tasks truly take. Over time, you become better at estimating project timelines and setting realistic deadlines."
              />
              <BenefitCard
                icon={BarChart3}
                title="Creates Measurable Progress"
                description="Unlike vague work sessions, each pomodoro is a concrete achievement. Visual progress tracking boosts motivation and helps you identify productivity patterns and peak focus hours."
              />
            </div>

            {/* Best Practices & Pro Tips */}
            <SectionTitle icon={Target}>Best Practices & Pro Tips</SectionTitle>
            <div className="space-y-3 mb-6">
              <FeatureCard
                icon={ListTodo}
                title="Plan Your Pomodoros at the Start of Day"
                description="Review your task list each morning and identify which items will take 1-3 pomodoros. This eliminates decision fatigue during work sessions and keeps you aligned with daily goals."
              />
              <FeatureCard
                icon={Clock}
                title="Create an Interruption Log"
                description="When urgent tasks interrupt you mid-pomodoro, quickly note them without breaking focus. Handle these interruptions during breaks or after your current session. This reduces context-switching guilt."
              />
              <FeatureCard
                icon={Coffee}
                title="Use Breaks Strategically"
                description="Don't scroll on your phone during breaks—this keeps your brain in task-mode. Instead, stretch, walk, hydrate, or step outside. Physical breaks are 50% more restorative than passive scrolling."
              />
              <FeatureCard
                icon={Music}
                title="Optimize Your Environment with Ambient Sound"
                description="Silence can feel isolating; background noise like lo-fi music or white noise can boost focus by masking distracting sounds. Experiment to find what works best for your concentration style."
              />
              <FeatureCard
                icon={Zap}
                title="Adjust Timer Duration Based on Task Complexity"
                description="Standard 25-minute pomodoros work for most tasks, but try 45 minutes for deep technical work or coding, and 15 minutes for administrative tasks. Customize your timer to match your work type."
              />
              <FeatureCard
                icon={BarChart3}
                title="Track Context Switches for Insights"
                description="If you consistently abandon sessions mid-way, it signals task selection issues. Use your statistics to identify which types of work suit your pomodoro rhythm best."
              />
              <FeatureCard
                icon={Target}
                title="Batch Similar Tasks Into Pomodoro Blocks"
                description="Group similar work types together (e.g., all emails in one block, all coding in another). This reduces mental switching costs and helps you enter deeper focus faster."
              />
            </div>

            {/* Common Mistakes to Avoid */}
            <SectionTitle icon={Zap}>Common Mistakes to Avoid</SectionTitle>
            <div className="space-y-3 mb-6">
              <FeatureCard
                icon={Clock}
                title="Breaking Pomodoros Early"
                description="The power of the Pomodoro Technique relies on completion. If you stop at 20 minutes, you miss the psychological benefit of finishing. Commit to the full 25 minutes or adjust the timer at the start."
              />
              <FeatureCard
                icon={Brain}
                title="Overloading Your Pomodoro"
                description="Trying to fit too much into one 25-minute session leads to incomplete work and frustration. One focused task per pomodoro keeps your brain aligned and makes completion feel achievable."
              />
              <FeatureCard
                icon={ListTodo}
                title="Skipping Breaks to 'Get More Done'"
                description="Cutting breaks short actually reduces productivity. Rest periods are when your brain consolidates learning and restores focus. More breaks mean better long-term output, not less."
              />
              <FeatureCard
                icon={Target}
                title="Not Choosing Your Task in Advance"
                description="Starting a pomodoro without a clear task invites procrastination and scope-creeping. Spend 2 minutes beforehand deciding exactly what you'll accomplish."
              />
              <FeatureCard
                icon={Music}
                title="Using Notifications and Open Tabs"
                description="Even silenced notifications steal attention. Close unrelated browser tabs, silence your phone, and use website blockers during pomodoros. Multitasking destroys the technique's effectiveness."
              />
            </div>

            {/* Pomobox Features */}
            <SectionTitle icon={Timer}>Pomobox Features</SectionTitle>
            <div className="space-y-3 mb-6">
              <FeatureCard
                icon={Music}
                title="Focus BGM"
                description="Curated lo-fi and ambient music to help you concentrate. Our BGM player helps create the perfect atmosphere for deep work during your pomodoro sessions."
              />
              <FeatureCard
                icon={BarChart3}
                title="Detailed Statistics"
                description="Track your focus time, sessions, and streaks. Visualize your productivity patterns with weekly and monthly charts to understand your peak performance hours."
              />
              <FeatureCard
                icon={Calendar}
                title="Activity Calendar"
                description="See your focus history at a glance. Daily check-ins and streak tracking keep you motivated and accountable to your productivity goals."
              />
            </div>

            {/* Who Should Use Pomodoro */}
            <SectionTitle icon={Target}>Who Should Use Pomodoro?</SectionTitle>
            <div className="space-y-3 mb-6">
              <FeatureCard
                icon={Brain}
                title="Students & Academic Learners"
                description="Studying for exams or completing assignments benefits dramatically from pomodoros. Regular breaks prevent mental fatigue during long study sessions, and the structure helps you work through difficult concepts systematically."
              />
              <FeatureCard
                icon={Code}
                title="Software Developers & Engineers"
                description="Coding requires intense concentration but also needs regular breaks to maintain code quality. Pomodoros help prevent decision fatigue and context-switching overhead, leading to fewer bugs and better architecture decisions."
              />
              <FeatureCard
                icon={BarChart3}
                title="Writers & Content Creators"
                description="Blank page anxiety disappears when you commit to just 25 minutes. Writer's block becomes manageable with focused sessions, and the enforced breaks help ideas percolate, leading to more creative and cohesive content."
              />
              <FeatureCard
                icon={ListTodo}
                title="Project Managers & Entrepreneurs"
                description="Constant context-switching from emails, meetings, and delegations drains your focus. Pomodoros create protected time for strategic thinking, planning, and the deep work that moves businesses forward."
              />
              <FeatureCard
                icon={Clock}
                title="Freelancers & Remote Workers"
                description="Without office structure, it's easy to procrastinate or overwork. Pomodoros create natural rhythms, help you estimate billable hours accurately, and maintain work-life boundaries by structuring your day."
              />
              <FeatureCard
                icon={Zap}
                title="Anyone Fighting Procrastination or Distractions"
                description="If you struggle with starting tasks, maintaining focus, or dealing with constant notifications, pomodoros provide the external structure and urgency that your brain needs to override distractions."
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
                answer="The Pomodoro Technique works by leveraging several psychological principles: it breaks overwhelming tasks into manageable chunks, creates urgency through time-boxing, provides structured breaks for cognitive recovery, and creates measurable progress. Research shows that 25-minute focused sessions align with our natural attention cycles, while breaks prevent mental fatigue and actually improve long-term productivity."
              />
              <FaqItem
                question="How do I get started with Pomodoro?"
                answer="Getting started is simple: choose a task, set your timer for 25 minutes, and work with full focus until the timer rings. Take a 5-minute break, then repeat. After 4 sessions, take a longer 15-30 minute break. Pomobox handles all the timing for you automatically!"
              />
              <FaqItem
                question="Can I adjust the 25-minute timer?"
                answer="Absolutely! While 25 minutes is the traditional duration, you can customize it based on your work type. Try 45 minutes for deep technical work or complex problem-solving, 15 minutes for administrative tasks or email, and 20-30 minutes for creative work like writing. Experiment to find what works best for you."
              />
              <FaqItem
                question="What if I get interrupted during a pomodoro?"
                answer="Quick interruptions are inevitable. The key is to handle them strategically: write down the interruption without stopping your work, then address it during your next break. For genuine emergencies, pause your timer and restart it when you return. The goal is to minimize context-switching, not achieve perfection."
              />
              <FaqItem
                question="How many pomodoros should I do per day?"
                answer="Most people aim for 8-10 pomodoros per day (about 4-5 hours of focused work), with longer breaks and lunch built in. Quality matters more than quantity. If you consistently can't complete a pomodoro, your tasks might be too ambitious or your break intervals too short. Listen to your energy levels."
              />
              <FaqItem
                question="What should I do during breaks?"
                answer="Physical breaks are most restorative: stand up, stretch, walk around, drink water, or step outside. Avoid scrolling on your phone or checking email during breaks—your brain needs genuine rest. Even 2-3 minutes of movement significantly improves focus for your next session."
              />
              <FaqItem
                question="Does Pomodoro work for different job types?"
                answer="Yes! Pomodoro works across professions with slight adjustments. Developers might use longer sessions (45 min), managers might use shorter ones (15 min) for admin work, teachers can use pomodoros for lesson planning, and freelancers can use them to track billable hours. The core principle—focused work + strategic breaks—adapts to any field."
              />
              <FaqItem
                question="How do I avoid burnout with Pomodoro?"
                answer="Don't skip breaks or try to push through fatigue. The long breaks (15-30 minutes) after every 4 pomodoros are essential for recovery. Pay attention to your productivity metrics—if your completion rates drop, it's time to take a longer rest day. Pomodoro is a tool for sustainable productivity, not overwork."
              />
              <FaqItem
                question="Can Pomodoro help with anxiety or ADHD?"
                answer="Many people with ADHD find pomodoros helpful because they provide external structure and clear time boundaries. For anxiety, the defined endpoint helps reduce stress about endless work. However, some people might need shorter intervals (15 min) or additional support. Pomodoro works best when adapted to your individual neurology."
              />
              <FaqItem
                question="What's the difference between Pomodoro and other productivity techniques?"
                answer="Pomodoro focuses on time-boxing and structured breaks. Unlike GTD (Getting Things Done), which emphasizes task capture and processing, or time-blocking, which allocates specific time to categories, Pomodoro is specifically designed to maintain focus and prevent burnout. Many people combine Pomodoro with other methods for maximum effectiveness."
              />
              <FaqItem
                question="How do I track my progress with Pomodoro?"
                answer="Use Pomobox to automatically track your completed pomodoros, total focus time, and daily streaks. Over time, your statistics reveal patterns: which types of work you handle best, your most productive hours, and how many pomodoros specific tasks take. This data helps you estimate projects more accurately and plan your days strategically."
              />
              <FaqItem
                question="Is 25 minutes really the optimal duration?"
                answer="25 minutes is optimal for most people and most tasks, but it's not one-size-fits-all. The original research by Francesco Cirillo suggested 25 minutes matched natural focus cycles, and decades of data support this. However, you should experiment: try 20, 25, 30, and 45 minutes with different task types and track which produces your best results."
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
