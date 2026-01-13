import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Layers,
  Home,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Timer,
  Brain,
  Zap,
  Target,
  Mail,
  Calendar,
  FileText,
  BookOpen,
  BarChart3,
  Lightbulb,
  Quote,
  Cpu,
  RefreshCw,
  Battery,
  MessageSquare,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Task Batching: The Science of Grouping Similar Work for Maximum Efficiency | Pomobox",
  description:
    "Discover the cognitive science behind task batching. Learn how context switching costs 23 minutes per interruption, and master practical strategies to group similar work for dramatically improved productivity.",
  keywords: [
    "task batching",
    "batch processing productivity",
    "context switching reduction",
    "cognitive load",
    "email batching",
    "meeting batching",
    "productivity science",
    "attention residue",
    "time blocking",
    "workflow optimization",
    "focus management",
    "deep work batching",
  ],
  openGraph: {
    title: "Task Batching: The Science of Grouping Similar Work | Pomobox",
    description:
      "Learn why context switching costs 23 minutes per interruption and how task batching can dramatically improve your productivity. Research-backed strategies inside.",
    type: "article",
    publishedTime: "2025-01-13",
    modifiedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/batching-tasks" },
}

// 연구 인용 데이터
const RESEARCH_CITATIONS = [
  {
    authors: "Mark, G., Gonzalez, V. M., & Harris, J.",
    year: "2005",
    title: "No task left behind? Examining the nature of fragmented work",
    journal: "Proceedings of CHI 2005",
    finding: "Average time on a task before switching: 3 minutes. Recovery time after interruption: 23 minutes.",
    doi: "10.1145/1054972.1055017",
  },
  {
    authors: "Leroy, S.",
    year: "2009",
    title: "Why is it so hard to do my work? The challenge of attention residue when switching between work tasks",
    journal: "Organizational Behavior and Human Decision Processes",
    finding: "Attention residue—cognitive fragments from previous tasks—significantly impairs performance on subsequent tasks.",
    doi: "10.1016/j.obhdp.2009.04.002",
  },
  {
    authors: "Rubinstein, J. S., Meyer, D. E., & Evans, J. E.",
    year: "2001",
    title: "Executive control of cognitive processes in task switching",
    journal: "Journal of Experimental Psychology: Human Perception and Performance",
    finding: "Task switching can cost up to 40% of productive time, especially with complex tasks.",
    doi: "10.1037/0096-1523.27.4.763",
  },
  {
    authors: "Monsell, S.",
    year: "2003",
    title: "Task switching",
    journal: "Trends in Cognitive Sciences",
    finding: "Even simple switches between familiar tasks incur measurable time costs and error increases.",
    doi: "10.1016/S1364-6613(03)00028-7",
  },
]

// FAQ 데이터
const FAQ_DATA = [
  {
    question: "How big should a batch be?",
    answer:
      "Aim for batches that take 30-90 minutes to complete. Shorter batches don't provide enough momentum; longer ones can lead to fatigue and diminishing returns. For email, this might mean processing all messages twice daily rather than constantly. For meetings, grouping them into 2-3 hour blocks leaves the rest of the day for focused work.",
  },
  {
    question: "What if urgent items require immediate attention?",
    answer:
      "True emergencies are rare—most 'urgent' items can wait 30-60 minutes. Set up filters for genuine emergencies (VIP contacts, specific keywords). Everything else waits for the batch. You'll find that 95% of 'urgent' requests are fine with a 1-2 hour response time. Communicate your batching schedule to key stakeholders.",
  },
  {
    question: "How does task batching work with Pomodoro?",
    answer:
      "They complement each other perfectly. Use batching to decide WHAT to work on (group all emails together), then use Pomodoro to decide HOW LONG to work on it (2 Pomodoros = 50 minutes for the email batch). This combines the cognitive benefits of batching with the focus benefits of time-boxing.",
  },
  {
    question: "Won't I miss important information by not checking constantly?",
    answer:
      "Research shows the opposite. Constant checking creates anxiety and partial attention. Batch processing lets you give full attention to each item, leading to better comprehension and fewer errors. You'll actually catch MORE important details because you're not distracted.",
  },
  {
    question: "How do I batch tasks that seem random?",
    answer:
      "Look for underlying similarities: cognitive mode (creative vs. administrative), tool used (email client vs. design software), energy required (high focus vs. routine), or people involved (internal vs. external). Even 'random' tasks usually share some dimension that enables batching.",
  },
  {
    question: "What's the difference between task batching and time blocking?",
    answer:
      "Time blocking reserves calendar slots for types of work. Task batching groups similar tasks regardless of when they're done. They work together: use time blocking to protect a 2-hour batch window, then fill that window with batched tasks. Batching is about grouping; blocking is about protecting.",
  },
]

// JSON-LD FAQ 스키마 - 정적 상수 데이터, 사용자 입력 절대 없음
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

// 배칭 가능한 작업 유형
const BATCHABLE_TASKS = [
  {
    category: "Communication",
    icon: Mail,
    tasks: ["Email processing", "Slack/Teams messages", "Voicemail returns", "Text message replies"],
    batchFrequency: "2-3x daily",
    idealDuration: "30-45 min each",
  },
  {
    category: "Meetings",
    icon: Calendar,
    tasks: ["1:1 meetings", "Team syncs", "Client calls", "Interviews"],
    batchFrequency: "Cluster on 2-3 days",
    idealDuration: "2-4 hour blocks",
  },
  {
    category: "Administrative",
    icon: FileText,
    tasks: ["Expense reports", "Time tracking", "Form filling", "Approvals"],
    batchFrequency: "1x daily or weekly",
    idealDuration: "20-30 min",
  },
  {
    category: "Creative",
    icon: Lightbulb,
    tasks: ["Writing", "Design work", "Problem solving", "Strategy"],
    batchFrequency: "Morning blocks",
    idealDuration: "90-120 min",
  },
]

export default function BatchingTasksPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* FAQ Schema - 정적 상수 데이터, 사용자 입력 절대 없음, XSS 불가 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumb */}
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
            <li className="text-foreground font-medium">Task Batching</li>
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Layers className="h-3 w-3" />
              Deep Research
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              16 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Task Batching: The Science of Grouping Similar Work for Maximum Efficiency
          </h1>
          <p className="text-lg text-muted-foreground">
            Context switching costs you 23 minutes per interruption. Learn the cognitive science
            behind task batching and discover research-backed strategies to dramatically improve
            your productivity.
          </p>
        </header>

        {/* Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">23min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Recovery per Switch</div>
            </div>
            <div className="text-center border-x border-cyan-500/20">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">40%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Productivity Loss</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">3min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Avg Time on Task</div>
            </div>
          </div>
        </section>

        {/* Key Research Finding */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent border border-rose-500/20">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="h-8 w-8 text-rose-500 flex-shrink-0" />
              <div>
                <p className="text-lg text-foreground italic mb-4">
                  &quot;It takes an average of 23 minutes and 15 seconds to get back to the
                  task after an interruption.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  — Gloria Mark, UC Irvine (CHI 2005 study on workplace interruptions)
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              This landmark finding transformed our understanding of workplace productivity.
              Every time you check email, respond to a Slack message, or attend an unplanned
              meeting, you&apos;re not losing just that moment—you&apos;re losing the 23 minutes
              it takes to regain deep focus.
            </p>
          </div>
        </section>

        {/* The Science - Cognitive Mechanisms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-violet-500" />
            The Cognitive Science of Context Switching
          </h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-muted-foreground">
              Why does switching between tasks cost so much? The answer lies in how our brains
              manage cognitive resources. Three key mechanisms explain the cost:
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Cpu className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Task Set Reconfiguration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your brain maintains a &quot;task set&quot;—the mental configuration of rules, goals,
                    and strategies for the current task. Switching tasks requires dismantling one set
                    and building another. This reconfiguration takes measurable time and energy.
                  </p>
                  <div className="p-3 rounded-lg bg-violet-500/10">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Research:</strong> Rubinstein et al. (2001) found
                      task set reconfiguration can cost up to 40% of productive time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <RefreshCw className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. Attention Residue</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When you switch tasks, part of your attention remains stuck on the previous task.
                    Sophie Leroy calls this &quot;attention residue.&quot; The more engaging or unfinished
                    the previous task, the more residue remains.
                  </p>
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Research:</strong> Leroy (2009) demonstrated that
                      attention residue significantly impairs cognitive performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Battery className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Cognitive Load Accumulation</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Each switch depletes a finite pool of cognitive resources. After multiple switches,
                    performance degrades even on simple tasks. This is why you feel mentally exhausted
                    after a day of constant interruptions.
                  </p>
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Research:</strong> Monsell (2003) found that even
                      &quot;simple&quot; switches incur measurable time costs and increase error rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Evidence Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-cyan-500" />
            Research Evidence
          </h2>
          <div className="space-y-4">
            {RESEARCH_CITATIONS.map((cite, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-xs font-bold text-cyan-600 dark:text-cyan-400">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm text-foreground mb-2">
                      {cite.authors} ({cite.year}). <em>{cite.title}</em>. {cite.journal}.
                    </p>
                    <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10 mb-2">
                      <p className="text-sm text-cyan-600 dark:text-cyan-400">
                        <strong>Key Finding:</strong> {cite.finding}
                      </p>
                    </div>
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

        {/* How Batching Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Layers className="h-6 w-6 text-primary" />
            How Task Batching Solves the Problem
          </h2>

          <p className="text-muted-foreground mb-6">
            Task batching works by minimizing context switches. Instead of interleaving different
            types of work throughout the day, you group similar tasks into dedicated blocks.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Minimizes Reconfiguration</h3>
              <p className="text-sm text-muted-foreground">
                Process all emails in one block → configure &quot;email mode&quot; once, not 50 times.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Reduces Residue</h3>
              <p className="text-sm text-muted-foreground">
                Complete the batch before moving on → no unfinished tasks creating residue.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">Preserves Resources</h3>
              <p className="text-sm text-muted-foreground">
                Fewer switches per day → more cognitive energy for complex work.
              </p>
            </div>
          </div>

          {/* Before/After Comparison */}
          <div className="p-6 rounded-2xl bg-muted/30 border border-border">
            <h3 className="font-semibold text-foreground mb-4">A Typical Day: Before vs. After Batching</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-rose-600 dark:text-rose-400 text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Without Batching
                </h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>9:00 - Check email (5 min)</p>
                  <p>9:05 - Start project work</p>
                  <p>9:15 - Slack notification → respond</p>
                  <p>9:20 - Resume project work</p>
                  <p>9:35 - Email notification → check</p>
                  <p>9:45 - Resume project work</p>
                  <p>10:00 - Meeting</p>
                  <p className="text-rose-500 font-medium pt-2">
                    Result: 25 min project work, 4 switches = 92 min recovery cost
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  With Batching
                </h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>9:00 - Project work (90 min block)</p>
                  <p>10:30 - Communication batch (30 min)</p>
                  <p className="pl-4">• Process all email</p>
                  <p className="pl-4">• Reply to Slack</p>
                  <p className="pl-4">• Return calls</p>
                  <p>11:00 - Meeting</p>
                  <p className="text-emerald-500 font-medium pt-2">
                    Result: 90 min project work, 2 switches = 46 min recovery cost
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Batchable Task Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-amber-500" />
            What to Batch: Common Categories
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {BATCHABLE_TASKS.map((category, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.category}</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                  {category.tasks.map((task, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
                  <span><strong className="text-foreground">Frequency:</strong> {category.batchFrequency}</span>
                  <span><strong className="text-foreground">Duration:</strong> {category.idealDuration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pomodoro Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            Task Batching + Pomodoro Strategy
          </h2>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-6">
              Combine the cognitive benefits of batching with the focus benefits of Pomodoro
              for maximum productivity. Here&apos;s how to structure your day:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Morning: Deep Work Batch (3-4 Pomodoros)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Your highest-energy time. Reserve for creative, strategic, or complex tasks.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary">Writing</span>
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary">Coding</span>
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary">Design</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  Late Morning: Communication Batch (2 Pomodoros)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Process all email, Slack, and messages in one focused session.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">Email</span>
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">Slack</span>
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">Calls</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-violet-500" />
                  Afternoon: Meeting Batch (Clustered)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Group meetings together when possible. The collaborative mindset stays active.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">1:1s</span>
                  <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">Team syncs</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/50">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-500" />
                  End of Day: Admin Batch (1 Pomodoro)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Low-energy time. Perfect for routine tasks that don&apos;t require peak cognition.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Expenses</span>
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Approvals</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Strategies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-emerald-500" />
            Practical Implementation Strategies
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3">1. Email Batching Protocol</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Check email at 3 fixed times: 9 AM, 1 PM, 5 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Turn off all email notifications between batch times</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Set up VIP filters for true emergencies</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3">2. Meeting Batching Protocol</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Designate 2-3 &quot;meeting days&quot; per week; protect the others</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Block &quot;Focus Time&quot; on your calendar for deep work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Stack back-to-back meetings to create larger uninterrupted blocks</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3">3. Communication Batching Protocol</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Treat Slack/Teams like email—batch at set times, not constantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Set status to &quot;Focus Time - will respond at [time]&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Communicate your batching schedule to your team</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Common Pitfalls to Avoid
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-semibold text-foreground mb-2">Batching Too Rigidly</h4>
              <p className="text-sm text-muted-foreground">
                Don&apos;t ignore genuine emergencies. Set up clear criteria for what warrants
                interrupting a batch.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-semibold text-foreground mb-2">Batches Too Long</h4>
              <p className="text-sm text-muted-foreground">
                Keep batches to 30-90 minutes max. A 4-hour email batch defeats the purpose.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-semibold text-foreground mb-2">Not Communicating Expectations</h4>
              <p className="text-sm text-muted-foreground">
                If people expect immediate responses, proactively communicate your schedule.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-semibold text-foreground mb-2">Mismatching Energy and Tasks</h4>
              <p className="text-sm text-muted-foreground">
                Match batch types to your energy levels: high-cognition work in the morning.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Start Batching Your Work Today
            </h2>
            <p className="text-muted-foreground mb-4">
              Every context switch costs you 23 minutes. Start recovering that time today.
              Pick one category—email is the easiest—and commit to batching for one week.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start a Focus Session
              </Link>
              <Link
                href="/blog/habit-stacking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Make Batching a Habit
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
              href="/blog/deep-work-method"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Deep Work Method
              </h3>
              <p className="text-sm text-muted-foreground">
                Combine batching with Cal Newport&apos;s deep work protocol.
              </p>
            </Link>
            <Link
              href="/blog/habit-stacking"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Habit Stacking
              </h3>
              <p className="text-sm text-muted-foreground">
                Build batching habits that stick by linking them to existing routines.
              </p>
            </Link>
            <Link
              href="/blog/productive-procrastination"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Productive Procrastination
              </h3>
              <p className="text-sm text-muted-foreground">
                Use batched secondary tasks to productively avoid your top task.
              </p>
            </Link>
            <Link
              href="/blog/weekly-review-habit"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Weekly Review Habit
              </h3>
              <p className="text-sm text-muted-foreground">
                Plan your batching strategy during weekly reviews for consistency.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
