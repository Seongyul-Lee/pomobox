import type { Metadata } from "next"
import Link from "next/link"
import {
  GraduationCap,
  Brain,
  Clock,
  Target,
  Coffee,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  Timer,
  CheckCircle2,
  Sparkles,
  Calendar,
  BarChart3,
  Zap,
  FileText,
  PenTool,
  Calculator,
  Languages,
  Microscope,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { MobileGuideNav } from "@/components/ui/mobile-guide-nav"

export const metadata: Metadata = {
  title: "Pomodoro for Students: Study Smarter, Not Harder | Pomobox",
  description: "Master exam prep, essay writing, and note-taking with Pomodoro. Subject-specific strategies and proven study methods for students.",
  keywords: ["pomodoro for students", "study technique", "exam preparation", "focus while studying", "student productivity", "pomodoro study method"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-for-students",
    siteName: "Pomobox",
    title: "Pomodoro Technique for Students: Complete Study Guide",
    description: "Transform your study sessions with the Pomodoro Technique. Exam prep, note-taking, research papers—master them all with time-boxed focus.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for Students | Pomobox",
    description: "Study smarter with Pomodoro: exam prep, note-taking, and research paper strategies for students.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-for-students",
  },
}

// Data
const STUDY_SCENARIOS = [
  {
    icon: FileText,
    title: "Exam Preparation",
    duration: "25 min focus + 5 min review",
    description: "Break study material into topic chunks. Each pomodoro covers one concept. Use breaks for quick flashcard review.",
    tips: ["Create topic-based pomodoro blocks", "Review previous session notes in breaks", "Schedule harder subjects when energy peaks"],
  },
  {
    icon: PenTool,
    title: "Essay & Paper Writing",
    duration: "45 min focus + 10 min rest",
    description: "Longer sessions work better for writing flow. First pomodoro: outline. Following sessions: draft sections.",
    tips: ["Don't edit while writing—separate tasks", "One section per pomodoro session", "Use breaks to rest eyes from screen"],
  },
  {
    icon: BookOpen,
    title: "Reading & Note-Taking",
    duration: "25 min read + 5 min summarize",
    description: "Active reading with immediate summarization. Each break, write 2-3 key points from what you just read.",
    tips: ["Highlight sparingly during reading", "Summarize in your own words", "Connect to previous knowledge in breaks"],
  },
  {
    icon: Calculator,
    title: "Problem Sets & Math",
    duration: "25-30 min per problem set",
    description: "Group similar problems together. If stuck for 5+ minutes, note it and move on. Return during review sessions.",
    tips: ["Attempt before checking solutions", "Track time per problem type", "Review mistakes in dedicated sessions"],
  },
]

const SUBJECT_ADAPTATIONS = [
  {
    icon: Languages,
    subject: "Languages",
    approach: "15-20 min sessions for vocabulary, 25 min for grammar, 30 min for reading comprehension. Short sessions prevent mental fatigue with new vocabulary.",
  },
  {
    icon: Microscope,
    subject: "Sciences",
    approach: "25 min for theory, 45 min for lab reports/problem solving. Longer sessions for complex calculations or experimental write-ups.",
  },
  {
    icon: BookOpen,
    subject: "Humanities",
    approach: "30-45 min for reading dense texts, 25 min for analysis writing. Extended sessions allow deeper engagement with arguments.",
  },
  {
    icon: Calculator,
    subject: "Math & CS",
    approach: "25-30 min sessions. If stuck on a problem >5 min, mark it and move on. Fresh eyes after break often solve it.",
  },
]

const COMMON_STRUGGLES = [
  {
    struggle: "Can't focus for 25 minutes",
    solution: "Start with 15-minute pomodoros. Build up gradually. Even 10 focused minutes beats 2 hours of distracted studying.",
  },
  {
    struggle: "Feel guilty taking breaks",
    solution: "Breaks ARE part of studying. Your brain consolidates information during rest. Skipping breaks hurts retention.",
  },
  {
    struggle: "Social media temptation",
    solution: "Use app blockers during pomodoros. Keep phone in another room. The urge fades after 2-3 sessions.",
  },
  {
    struggle: "Lose track after interruptions",
    solution: "Write your current task on paper before each session. If interrupted, the note helps you resume instantly.",
  },
  {
    struggle: "Don't know what to study",
    solution: "Plan pomodoros the night before. Decision fatigue kills focus. Wake up with a clear list.",
  },
]

const DAILY_SCHEDULE = [
  { time: "Morning (Peak Energy)", pomodoros: "3-4", tasks: "Hardest subjects, new concepts, problem-solving" },
  { time: "Early Afternoon", pomodoros: "2-3", tasks: "Reading, note organization, review" },
  { time: "Late Afternoon", pomodoros: "2", tasks: "Lighter tasks, flashcard review, planning" },
  { time: "Evening", pomodoros: "1-2", tasks: "Light review, next-day planning" },
]

const FAQS = [
  {
    question: "How many pomodoros should I do per day as a student?",
    answer: "Most students find 8-12 pomodoros (4-6 hours of focused study) sustainable. Quality matters more than quantity. Start with 6 and adjust based on your energy levels and workload.",
  },
  {
    question: "Should I study one subject per session or switch?",
    answer: "Both work! 'Blocking' (multiple pomodoros on one subject) helps deep understanding. 'Interleaving' (switching subjects) improves long-term retention. Try blocking for learning new material, interleaving for review.",
  },
  {
    question: "What if my lecture is longer than 25 minutes?",
    answer: "Pomodoro is for self-study, not lectures. During lectures, take normal notes. After class, use pomodoros to review and process the material—that's where real learning happens.",
  },
  {
    question: "Can I use Pomodoro during exams?",
    answer: "Modified yes. In timed exams, mentally allocate time per section (like mini-pomodoros). For take-home exams, full Pomodoro works great. Practice with timed sessions to build exam stamina.",
  },
  {
    question: "How do I handle group study with Pomodoro?",
    answer: "Sync pomodoros with study partners—focus together, break together. Use breaks for quick discussions. Some groups do 'silent pomodoros' then discuss during breaks.",
  },
]

const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Complete technique guide" },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", description: "Stay focused while studying" },
  { href: "/blog/science-of-focus", title: "Science of Focus", description: "Why Pomodoro works" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro Technique for Students: Study Smarter, Not Harder",
    description: "Complete guide to using the Pomodoro Technique for studying: exam prep, essay writing, note-taking, and subject-specific strategies.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    datePublished: "2025-01-05",
    dateModified: "2025-01-05",
    url: "https://pomobox.app/guide/pomodoro-for-students",
    mainEntityOfPage: "https://pomobox.app/guide/pomodoro-for-students",
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
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Study with Pomodoro Technique",
    description: "Step-by-step guide for students to implement Pomodoro for effective studying",
    step: [
      { "@type": "HowToStep", name: "Plan your study session", text: "List topics to cover and estimate pomodoros needed" },
      { "@type": "HowToStep", name: "Set timer for 25 minutes", text: "Commit to one topic or task per session" },
      { "@type": "HowToStep", name: "Study with full focus", text: "No phone, no social media, no multitasking" },
      { "@type": "HowToStep", name: "Take a 5-minute break", text: "Stand up, stretch, hydrate—no screens" },
      { "@type": "HowToStep", name: "Repeat and review", text: "After 4 pomodoros, take 15-30 minute break" },
    ],
  },
]

export default function PomodoroForStudentsPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      {/* Mobile Navigation */}
      <MobileGuideNav />

      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.guide("Pomodoro for Students")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
            <GraduationCap className="h-3 w-3" />
            Student Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro for Students
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Study smarter, not harder. Master exams, essays, and research with time-boxed focus.
          </p>
          <ArticleMeta
            publishedDate="2025-01-05"
            modifiedDate="2025-01-05"
            readingTime="10 min"
          />

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500">8-12</div>
              <div className="text-xs text-muted-foreground">daily pomodoros</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">40%</div>
              <div className="text-xs text-muted-foreground">better retention</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">2x</div>
              <div className="text-xs text-muted-foreground">study efficiency</div>
            </div>
          </div>
        </header>

        {/* Why Students Need Pomodoro */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-emerald-500/10">
                <Brain className="h-5 w-5 text-emerald-500" />
              </span>
              Why Students Struggle (And How Pomodoro Fixes It)
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">The modern student's problem:</strong> You sit down to study for 3 hours, but between phone checks, social media, and "just one more video," you've actually focused for maybe 45 minutes. Sound familiar?
              </p>
              <p>
                Research shows the average student checks their phone <strong className="text-foreground">every 6 minutes</strong> while studying. Each interruption costs 23 minutes to regain deep focus. That 3-hour study session? Effectively 30 minutes of real learning.
              </p>
              <p>
                <strong className="text-foreground">The Pomodoro solution:</strong> Instead of fighting your attention span, work with it. 25 minutes is short enough to feel manageable, long enough to make progress. The guaranteed break removes the temptation to "just check" your phone.
              </p>
              <p>
                Studies show students using Pomodoro retain <strong className="text-foreground">40% more information</strong> and report lower stress levels. The technique turns marathon cramming into sustainable sprint sessions.
              </p>
            </div>
          </div>
        </section>

        {/* Study Scenarios */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <BookOpen className="h-3 w-3" />
              By Study Type
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Pomodoro for Different Tasks
            </h2>
          </div>

          <div className="space-y-4">
            {STUDY_SCENARIOS.map((scenario) => {
              const Icon = scenario.icon
              return (
                <div
                  key={scenario.title}
                  className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{scenario.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {scenario.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {scenario.tips.map((tip, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Subject-Specific Adaptations */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Lightbulb className="h-3 w-3" />
              By Subject
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Subject-Specific Strategies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBJECT_ADAPTATIONS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.subject}
                  className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-violet-500" />
                    <h3 className="font-semibold text-foreground">{item.subject}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.approach}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Daily Schedule Template */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Calendar className="h-3 w-3" />
              Daily Plan
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Sample Study Schedule
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <div className="space-y-4">
              {DAILY_SCHEDULE.map((slot, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl bg-muted/30">
                  <div className="sm:w-40 font-medium text-foreground">{slot.time}</div>
                  <div className="sm:w-24 text-sm text-primary font-medium">{slot.pomodoros} 🍅</div>
                  <div className="flex-1 text-sm text-muted-foreground">{slot.tasks}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              * Adjust based on your personal energy patterns. Track your focus levels to find your peak hours.
            </p>
          </div>
        </section>

        {/* Common Struggles */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <AlertTriangle className="h-3 w-3" />
              Troubleshooting
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Common Student Struggles
            </h2>
          </div>

          <div className="space-y-3">
            {COMMON_STRUGGLES.map((item, i) => (
              <div
                key={i}
                className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/10"
              >
                <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  "{item.struggle}"
                </h3>
                <p className="text-sm text-muted-foreground pl-3.5">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Student FAQs
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

        {/* Related Guides */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Related Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {guide.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Study Smarter?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start your first study pomodoro now. Track your sessions, build streaks, and watch your productivity transform.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Study Session
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
            Pomodoro Basics
          </Link>
          <Link
            href="/guide/pomodoro-for-developers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            For Developers
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
