import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Code2, Timer, Brain, Target, Zap, AlertTriangle, CheckCircle2, TrendingUp, Coffee, BookOpen } from "lucide-react"
import { InterviewPrepPlanner } from "@/components/ui/interview-prep-planner"

export const metadata: Metadata = {
  title: "Focus Strategies for Coding Interviews: Pomodoro-Based Study Plan | Pomobox",
  description: "Master coding interview preparation with strategic focus techniques. Learn how to use Pomodoro sessions for LeetCode practice, system design study, and peak performance on interview day.",
  keywords: [
    "coding interview preparation",
    "LeetCode study plan",
    "technical interview focus",
    "Pomodoro for programmers",
    "algorithm study schedule",
    "system design interview prep",
    "FAANG interview strategy",
    "coding practice routine",
  ],
  openGraph: {
    title: "Focus Strategies for Coding Interviews | Pomobox",
    description: "Build an effective coding interview study plan using Pomodoro techniques. Optimize your LeetCode practice and system design prep for peak performance.",
    type: "article",
    publishedTime: "2025-01-08",
    authors: ["Pomobox Team"],
  },
  alternates: {
    canonical: "https://pomobox.co/blog/focus-for-coding-interviews",
  },
}

export default function FocusForCodingInterviewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Focus Strategies for Coding Interviews: Pomodoro-Based Study Plan",
    description: "Master coding interview preparation with strategic focus techniques. Learn how to use Pomodoro sessions for effective algorithm practice and system design study.",
    author: {
      "@type": "Organization",
      name: "Pomobox",
      url: "https://pomobox.co",
    },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      url: "https://pomobox.co",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pomobox.co/blog/focus-for-coding-interviews",
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many LeetCode problems should I solve per day?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quality trumps quantity. 2-4 problems with deep understanding (45-60 min each) beats racing through 10 problems.",
        },
      },
      {
        "@type": "Question",
        name: "Should I time myself when practicing LeetCode?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but strategically. During learning phases, take time to understand. When closer to interviews, simulate real conditions.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-background">
        <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Navigation */}
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Code2 className="h-3 w-3" />
                Interview Prep
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                <Clock className="h-3 w-3" />
                10 min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Focus Strategies for Coding Interviews
            </h1>
            <p className="text-lg text-muted-foreground">
              Build an effective study plan using Pomodoro sessions. Optimize your LeetCode practice,
              system design prep, and mental state for peak interview performance.
            </p>
          </header>

          {/* Interactive Component */}
          <InterviewPrepPlanner className="mb-12" />

          {/* Introduction */}
          <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
            <p className="lead text-lg text-muted-foreground">
              You&apos;ve got 4 weeks until your technical interview at a top company. You open LeetCode,
              solve a random problem, feel good, then realize you&apos;ve been doing this for months without
              a real plan. Sound familiar? The problem isn&apos;t effort—it&apos;s <strong>unfocused effort</strong>.
            </p>

            <p>
              Coding interview preparation isn&apos;t just about grinding problems. It&apos;s about deliberate
              practice with strategic rest. The same cognitive science that makes the Pomodoro Technique
              effective for deep work makes it ideal for interview prep—where sustained attention,
              pattern recognition, and problem decomposition are everything.
            </p>
          </section>

          {/* The Interview Focus Problem */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              The Interview Prep Focus Problem
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">Common Mistakes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span>
                    Grinding problems for 6+ hours without breaks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span>
                    Jumping between random topics without mastery
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span>
                    Looking at solutions after 5 minutes of struggle
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span>
                    Skipping behavioral and system design prep
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Strategic Approach</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Structured 25-min sessions with mandatory rest
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Topic-focused practice blocks
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Struggle time before checking hints (20+ min)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Balanced prep across all interview types
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pomodoro for Different Problem Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Timer className="h-6 w-6 text-primary" />
              Pomodoro Strategies by Problem Type
            </h2>

            <div className="space-y-4">
              {/* Easy Problems */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Easy Problems</h3>
                    <p className="text-xs text-muted-foreground">Arrays, Strings, Hash Maps</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Time Target</div>
                    <div className="text-muted-foreground">15-20 min (under 1 pomodoro)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Per Session</div>
                    <div className="text-muted-foreground">2-3 problems per pomodoro</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Focus On</div>
                    <div className="text-muted-foreground">Clean code, edge cases, speed</div>
                  </div>
                </div>
              </div>

              {/* Medium Problems */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Medium Problems</h3>
                    <p className="text-xs text-muted-foreground">Trees, Graphs, BFS/DFS, Binary Search</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Time Target</div>
                    <div className="text-muted-foreground">25-35 min (1-1.5 pomodoros)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Per Session</div>
                    <div className="text-muted-foreground">1 problem per pomodoro</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Focus On</div>
                    <div className="text-muted-foreground">Pattern recognition, approach</div>
                  </div>
                </div>
              </div>

              {/* Hard Problems */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Hard Problems</h3>
                    <p className="text-xs text-muted-foreground">Dynamic Programming, Advanced Graphs</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Time Target</div>
                    <div className="text-muted-foreground">45-60 min (2 pomodoros)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Per Session</div>
                    <div className="text-muted-foreground">1 problem + review per 2 pomodoros</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Focus On</div>
                    <div className="text-muted-foreground">State transitions, subproblem breakdown</div>
                  </div>
                </div>
              </div>

              {/* System Design */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">System Design</h3>
                    <p className="text-xs text-muted-foreground">Architecture, Scalability, Trade-offs</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Session Length</div>
                    <div className="text-muted-foreground">2 pomodoros (50 min)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Format</div>
                    <div className="text-muted-foreground">Study → Draw → Explain aloud</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground mb-1">Focus On</div>
                    <div className="text-muted-foreground">Requirements → Scale → Trade-offs</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The 25-Minute Protocol */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-cyan-500" />
              The 25-Minute Problem Solving Protocol
            </h2>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 mb-6">
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: "1", title: "Understand", time: "0-3 min", desc: "Read twice. Identify inputs, outputs, constraints." },
                  { step: "2", title: "Plan", time: "3-8 min", desc: "Write approach before coding. Consider brute force first." },
                  { step: "3", title: "Code", time: "8-20 min", desc: "Implement solution. Talk through logic as you write." },
                  { step: "4", title: "Test", time: "20-25 min", desc: "Walk through with examples. Check edge cases." },
                ].map((item) => (
                  <div key={item.step} className="text-center p-4 rounded-xl bg-background/50">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-cyan-500">{item.step}</span>
                    </div>
                    <div className="font-medium text-foreground text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                    <p className="text-xs text-muted-foreground mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Daily Schedule */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-violet-500" />
              Sample Daily Study Schedule
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Morning (Peak Focus)</span>
                    <span className="text-sm text-muted-foreground ml-2">(4 pomodoros)</span>
                  </div>
                  <span className="text-xs text-muted-foreground italic">Best for complex problems</span>
                </div>
                <p className="text-sm text-muted-foreground">2x Hard DP/Graph problems, deep pattern analysis</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Afternoon</span>
                    <span className="text-sm text-muted-foreground ml-2">(3 pomodoros)</span>
                  </div>
                  <span className="text-xs text-muted-foreground italic">Good for reinforcement</span>
                </div>
                <p className="text-sm text-muted-foreground">3-4x Medium problems, review morning mistakes</p>
              </div>

              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-semibold text-violet-600 dark:text-violet-400">Evening (Low Energy)</span>
                    <span className="text-sm text-muted-foreground ml-2">(2 pomodoros)</span>
                  </div>
                  <span className="text-xs text-muted-foreground italic">Low-intensity work</span>
                </div>
                <p className="text-sm text-muted-foreground">System design reading, behavioral prep, pattern review</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <Coffee className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">Long Break Strategy</p>
                  <p className="text-sm text-muted-foreground">
                    Take 20-30 minutes after 4 pomodoros. Walk or do something non-screen.
                    Your brain consolidates patterns during rest.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Week Before Interview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Target className="h-6 w-6 text-red-500" />
              The Week Before Your Interview
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-3">Days 7-4: Review Mode</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Re-solve problems you struggled with
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Practice explaining solutions out loud
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    6 pomodoros max per day
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-3">Days 3-1: Light Practice</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Only 2-4 easy/medium problems
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Focus on behavioral story prep
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    Sleep 8+ hours, no late grinding
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "How many LeetCode problems should I solve per day?",
                  a: "Quality trumps quantity. 2-4 problems with deep understanding beats racing through 10 problems. A single hard problem where you struggle and learn is worth more than 5 easy problems you solve immediately.",
                },
                {
                  q: "Should I time myself when practicing?",
                  a: "Yes, but strategically. During learning, take time to understand. When closer to interviews, simulate real conditions: 20-25 min per medium, 35-45 min per hard.",
                },
                {
                  q: "How do I avoid burnout during prep?",
                  a: "The Pomodoro technique forces regular rest, preventing mental exhaustion. Also vary your study: mix coding with system design, behavioral prep, and mock interviews.",
                },
              ].map((faq, i) => (
                <div key={i} className="p-5 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent border border-emerald-500/20">
              <h2 className="text-xl font-bold text-foreground mb-4">Start Your Interview Prep Today</h2>
              <p className="text-muted-foreground mb-4">
                The difference between candidates who succeed and those who don&apos;t often comes down to
                consistent, focused practice over random grinding. Use the planner above to calculate
                your personalized study schedule, then start your first Pomodoro session.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
                >
                  <Timer className="h-4 w-4" />
                  Start First Session
                </Link>
                <Link
                  href="/blog/cost-of-task-switching"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
                >
                  Learn About Context Switching
                </Link>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/cost-of-task-switching"
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                  The Real Cost of Task Switching
                </h3>
                <p className="text-sm text-muted-foreground">
                  Why interruptions during coding practice destroy your learning progress.
                </p>
              </Link>
              <Link
                href="/blog/flowtime-vs-pomodoro"
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                  Flowtime vs Pomodoro: Which Is Right?
                </h3>
                <p className="text-sm text-muted-foreground">
                  When to use flexible timing vs structured intervals for deep work.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}
