import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Brain,
  Timer,
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Smartphone,
  Calendar,
  Users,
  Home,
  ChevronRight,
  Mountain,
  Repeat,
  Newspaper,
  GitBranch,
  Lightbulb,
  XCircle,
  ArrowRight,
  TrendingUp,
  Shield,
  Coffee,
  Moon,
  Settings,
  ListChecks,
  Quote,
} from "lucide-react"
import { DeepWorkScore } from "@/components/ui/deep-work-score"

export const metadata: Metadata = {
  title: "Deep Work: Cal Newport's Complete Method for Focused Productivity | Pomobox",
  description:
    "Master Cal Newport's deep work methodology. Learn the four philosophies, implementation framework, common pitfalls to avoid, and how to combine deep work with Pomodoro for elite-level productivity.",
  keywords: [
    "deep work",
    "Cal Newport",
    "focused work",
    "distraction-free productivity",
    "concentration strategies",
    "deep work philosophy",
    "monastic productivity",
    "bimodal deep work",
    "rhythmic philosophy",
    "journalistic method",
    "attention residue",
    "deliberate practice",
    "cognitive performance",
    "flow state",
    "productivity science",
  ],
  openGraph: {
    title: "Deep Work: Cal Newport's Complete Method | Pomobox",
    description:
      "Master the four deep work philosophies, avoid common pitfalls, and learn the 5-step implementation framework for elite-level productivity.",
    type: "article",
    publishedTime: "2025-01-08",
    modifiedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/deep-work-method" },
}

// Research citations for credibility
const RESEARCH_CITATIONS = [
  {
    authors: "Newport, C.",
    year: "2016",
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    publisher: "Grand Central Publishing",
    note: "Original source for deep work methodology",
  },
  {
    authors: "Leroy, S.",
    year: "2009",
    title: "Why is it so hard to do my work? The challenge of attention residue when switching between work tasks",
    journal: "Organizational Behavior and Human Decision Processes",
    doi: "10.1016/j.obhdp.2009.04.002",
  },
  {
    authors: "Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C.",
    year: "1993",
    title: "The role of deliberate practice in the acquisition of expert performance",
    journal: "Psychological Review",
    doi: "10.1037/0033-295X.100.3.363",
  },
  {
    authors: "Mark, G., Gonzalez, V. M., & Harris, J.",
    year: "2005",
    title: "No task left behind? Examining the nature of fragmented work",
    journal: "Proceedings of CHI 2005",
    doi: "10.1145/1054972.1055017",
  },
]

// Expanded FAQ data
const FAQ_DATA = [
  {
    question: "How many hours of deep work per day is realistic?",
    answer:
      "For most knowledge workers, 3-4 hours of true deep work per day is the maximum sustainable amount. Research by Anders Ericsson on deliberate practice shows that even elite performers rarely exceed 4-5 hours of intense, focused work. Attempting more typically leads to diminishing returns, burnout, and reduced quality. Start with 1-2 hours and gradually build up.",
  },
  {
    question: "Can I do deep work in an open office environment?",
    answer:
      "It's challenging but possible with the right strategies. Use noise-canceling headphones as a visual and audio barrier. Establish clear signals (headphones on = do not disturb). Book conference rooms for critical deep work sessions. Consider arriving early or staying late for quieter periods. Some professionals negotiate 'deep work days' to work from home 2-3 days per week.",
  },
  {
    question: "What if my job requires constant availability?",
    answer:
      "Most 'constant availability' requirements are cultural expectations rather than actual necessities. Try an experiment: schedule 90-minute deep work blocks and batch communications around them. Most people find that delayed responses (within 1-2 hours) rarely cause real problems. If your job truly requires constant availability, consider the bimodal or journalistic philosophy which accommodates this reality.",
  },
  {
    question: "What's the difference between deep work and flow state?",
    answer:
      "Flow state is a psychological phenomenon of complete immersion in an activity. Deep work is a work strategy that deliberately creates conditions for producing valuable output. You can do deep work without achieving flow, and flow can occur in non-work activities. Deep work often leads to flow, but the goal is quality output, not the subjective experience of flow itself.",
  },
  {
    question: "How do I know if I'm doing shallow work disguised as deep work?",
    answer:
      "Ask yourself: Could a recent college graduate do this task with minimal training? Does this task create new value or improve my skills? Am I learning something or just processing? If you're checking email, attending status meetings, or doing administrative tasks—even with full attention—that's shallow work. True deep work involves cognitive strain and skill development.",
  },
  {
    question: "Should I quit all social media to do deep work?",
    answer:
      "Not necessarily. Cal Newport's 'craftsman approach' asks you to identify your core professional and personal goals, then evaluate whether each tool provides substantial positive impact. Some professionals need social media (marketers, journalists). The key is intentional, scheduled use rather than reflexive checking. Try a 30-day break to assess actual impact on your life and work.",
  },
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

export default function DeepWorkMethodPage() {
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
            <li className="text-foreground font-medium">Deep Work Method</li>
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Brain className="h-3 w-3" />
              Deep Work
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              18 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Deep Work: Cal Newport&apos;s Complete Method for Focused Productivity
          </h1>
          <p className="text-lg text-muted-foreground">
            Master the art of producing elite-level work by eliminating distractions, choosing your
            philosophy, and building rituals that support sustained concentration.
          </p>
        </header>

        {/* Article Meta - Hero Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">3-4h</div>
              <div className="text-xs md:text-sm text-muted-foreground">Max Daily Deep Work</div>
            </div>
            <div className="text-center border-x border-indigo-500/20">
              <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400">23min</div>
              <div className="text-xs md:text-sm text-muted-foreground">Focus Recovery Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">4</div>
              <div className="text-xs md:text-sm text-muted-foreground">Deep Work Philosophies</div>
            </div>
          </div>
        </section>

        {/* Interactive Component */}
        <DeepWorkScore className="mb-12" />

        {/* Introduction */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <p className="lead text-lg text-muted-foreground">
            In his influential book <em>Deep Work</em>, Cal Newport argues that the ability to
            focus without distraction is becoming both increasingly rare and increasingly
            valuable. In our hyperconnected economy, those who master this skill will thrive.
          </p>
          <p>
            Deep work is defined as{" "}
            <strong>
              &quot;professional activities performed in a state of distraction-free
              concentration that push your cognitive capabilities to their limit.&quot;
            </strong>{" "}
            These efforts create new value, improve your skills, and are hard to replicate.
          </p>
          <p>
            This is the opposite of shallow work—non-cognitively demanding, logistical-style
            tasks that can be performed while distracted. Email, meetings, and administrative
            work fall into this category.
          </p>
        </section>

        {/* The Deep Work Hypothesis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            The Deep Work Hypothesis
          </h2>
          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <blockquote className="text-lg font-medium text-foreground mb-4 flex items-start gap-3">
              <Quote className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <span>
                &quot;The ability to perform deep work is becoming increasingly rare at exactly
                the same time it is becoming increasingly valuable in our economy. As a
                consequence, the few who cultivate this skill, and then make it the core of
                their working life, will thrive.&quot;
              </span>
            </blockquote>
            <p className="text-sm text-muted-foreground">— Cal Newport, Deep Work (2016)</p>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">Why It&apos;s Becoming Rare</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Open office plans encourage interruption</li>
                <li>• Instant messaging creates availability expectations</li>
                <li>• Social media trains us for distraction</li>
                <li>• Metrics favor visible busyness over hidden value</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">Why It&apos;s Increasingly Valuable</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Complex problems require sustained attention</li>
                <li>• AI can&apos;t replicate creative deep thinking</li>
                <li>• Global competition demands quality output</li>
                <li>• Rapid learning requires concentrated effort</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Deep Work vs. Shallow Work */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-indigo-500" />
            Deep Work vs. Shallow Work
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Deep Work
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  Creates new value and improves skills
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  Hard to replicate (competitive advantage)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  Requires sustained attention (60-90 min blocks)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  Produces measurable, high-quality output
                </li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-indigo-500/10">
                <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">Examples</div>
                <p className="text-xs text-muted-foreground">
                  Writing code, drafting reports, learning new skills, strategic analysis,
                  creative design, research synthesis
                </p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Shallow Work
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Logistical, doesn&apos;t create new value
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Easy to replicate (anyone can do it)
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Often performed while distracted
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Gives illusion of productivity
                </li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-muted/50">
                <div className="text-xs font-medium text-muted-foreground mb-1">Examples</div>
                <p className="text-xs text-muted-foreground">
                  Email, most meetings, scheduling, expense reports, status updates,
                  administrative tasks, social media
                </p>
              </div>
            </div>
          </div>

          {/* Quick Test */}
          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold text-foreground mb-3">Quick Depth Test</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Ask yourself: &quot;How long would it take to train a smart recent college
              graduate with no specialized knowledge to do this task?&quot;
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400">Months+</div>
                <div className="text-xs text-muted-foreground">Deep Work</div>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="font-semibold text-amber-600 dark:text-amber-400">Days-Weeks</div>
                <div className="text-xs text-muted-foreground">Medium Depth</div>
              </div>
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-center">
                <div className="font-semibold text-rose-600 dark:text-rose-400">Hours</div>
                <div className="text-xs text-muted-foreground">Shallow Work</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Four Philosophies - NEW DETAILED SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <GitBranch className="h-6 w-6 text-violet-500" />
            The Four Deep Work Philosophies
          </h2>
          <p className="text-muted-foreground mb-6">
            Cal Newport identifies four distinct approaches to integrating deep work into your
            life. Choose the philosophy that best matches your profession, personality, and
            circumstances.
          </p>

          <div className="space-y-6">
            {/* Monastic Philosophy */}
            <div className="p-6 rounded-2xl bg-slate-500/5 border border-slate-500/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-slate-500/10">
                  <Mountain className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-600 dark:text-slate-400 text-lg">
                    Monastic Philosophy
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Eliminate or radically minimize shallow obligations
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">How It Works</h4>
                  <p className="text-sm text-muted-foreground">
                    You cut yourself off from the world almost entirely. No email, minimal
                    meetings, single-minded focus on one high-value goal. This is the most
                    extreme approach.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Best For</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Researchers and academics</li>
                    <li>• Authors writing books</li>
                    <li>• Those with a single, clear life mission</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-slate-500/10">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Example: Donald Knuth
                </div>
                <p className="text-xs text-muted-foreground">
                  The legendary computer scientist has no email. His website states: &quot;I
                  have been a happy man ever since January 1, 1990, when I no longer had an
                  email address.&quot;
                </p>
              </div>
            </div>

            {/* Bimodal Philosophy */}
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
                    Bimodal Philosophy
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Divide time into stretches of deep and shallow work
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">How It Works</h4>
                  <p className="text-sm text-muted-foreground">
                    Dedicate clear, multi-day stretches to deep work (minimum 1 day),
                    leaving other times for shallow work. During deep periods, act
                    monastically. The minimum unit is typically one full day.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Best For</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Professors and executives</li>
                    <li>• Consultants with flexible schedules</li>
                    <li>• Those who can protect multi-day blocks</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10">
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Example: Carl Jung
                </div>
                <p className="text-xs text-muted-foreground">
                  Jung would retreat to his lakeside tower (Bollingen) for weeks of deep
                  thinking, then return to his busy Zurich practice for clinical work and
                  lectures.
                </p>
              </div>
            </div>

            {/* Rhythmic Philosophy */}
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <Repeat className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">
                    Rhythmic Philosophy
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create a daily habit with consistent deep work blocks
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">How It Works</h4>
                  <p className="text-sm text-muted-foreground">
                    Transform deep work into a daily habit by scheduling it at the same time
                    each day. Use chain methods (don&apos;t break the chain) to build
                    consistency. Most compatible with standard work schedules.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Best For</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Knowledge workers with 9-5 jobs</li>
                    <li>• Those who need daily consistency</li>
                    <li>• Beginners building deep work habits</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10">
                <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                  Example: Daily Morning Block
                </div>
                <p className="text-xs text-muted-foreground">
                  5:30 AM - 7:30 AM every day for deep work before the workday begins. Mark
                  each successful day on a calendar. The growing chain becomes motivation.
                </p>
              </div>
            </div>

            {/* Journalistic Philosophy */}
            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-rose-500/10">
                  <Newspaper className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-rose-600 dark:text-rose-400 text-lg">
                    Journalistic Philosophy
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fit deep work in whenever you can
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">How It Works</h4>
                  <p className="text-sm text-muted-foreground">
                    Switch into deep work mode at a moment&apos;s notice, whenever gaps
                    appear in your schedule. Requires strong mental discipline and
                    confidence in your work. Named after journalists who write on deadline.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Best For</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Experienced deep workers only</li>
                    <li>• Those with unpredictable schedules</li>
                    <li>• Senior professionals with high confidence</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-rose-500/10">
                <div className="text-xs font-medium text-rose-600 dark:text-rose-400 mb-1">
                  Warning
                </div>
                <p className="text-xs text-muted-foreground">
                  This is NOT for beginners. The ability to switch rapidly into deep work is
                  a skill that must be trained. Most people should start with the Rhythmic
                  Philosophy.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Selection Guide */}
          <div className="mt-6 p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold text-foreground mb-4">Which Philosophy Should You Choose?</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-24 font-medium text-slate-600 dark:text-slate-400">Monastic</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-slate-500" />
                </div>
                <div className="text-xs text-muted-foreground">~5% of people</div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-24 font-medium text-blue-600 dark:text-blue-400">Bimodal</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[25%] h-full bg-blue-500" />
                </div>
                <div className="text-xs text-muted-foreground">~15% of people</div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-24 font-medium text-emerald-600 dark:text-emerald-400">Rhythmic</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-emerald-500" />
                </div>
                <div className="text-xs text-muted-foreground">~70% of people</div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-24 font-medium text-rose-600 dark:text-rose-400">Journalistic</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[20%] h-full bg-rose-500" />
                </div>
                <div className="text-xs text-muted-foreground">~10% of people</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Most knowledge workers should start with the <strong>Rhythmic Philosophy</strong>
              —it&apos;s the most compatible with typical work environments and the easiest to
              maintain consistently.
            </p>
          </div>
        </section>

        {/* 5-Step Implementation Framework - NEW SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <ListChecks className="h-6 w-6 text-primary" />
            5-Step Implementation Framework
          </h2>
          <p className="text-muted-foreground mb-6">
            Follow this proven framework to integrate deep work into your life systematically.
          </p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">Audit Your Current Schedule</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Track one week of work. For each task, note whether it&apos;s deep or
                  shallow. Calculate your deep work ratio.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                    Duration: 1 week
                  </span>
                  <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                    Output: Deep work ratio %
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">Choose Your Philosophy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your role, schedule flexibility, and personality, select one of
                  the four philosophies. Most should start with Rhythmic.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Recommended: Rhythmic
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">Design Your Deep Work Ritual</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Define four components: WHERE you&apos;ll work, HOW LONG each session,
                  RULES for the session (no phone, door closed), and SUPPORT (coffee, tools
                  ready).
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                  <div className="p-2 rounded bg-muted/50 text-center">
                    <div className="text-xs font-medium text-foreground">Where</div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                  <div className="p-2 rounded bg-muted/50 text-center">
                    <div className="text-xs font-medium text-foreground">Duration</div>
                    <div className="text-xs text-muted-foreground">90min blocks</div>
                  </div>
                  <div className="p-2 rounded bg-muted/50 text-center">
                    <div className="text-xs font-medium text-foreground">Rules</div>
                    <div className="text-xs text-muted-foreground">No distractions</div>
                  </div>
                  <div className="p-2 rounded bg-muted/50 text-center">
                    <div className="text-xs font-medium text-foreground">Support</div>
                    <div className="text-xs text-muted-foreground">Tools ready</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">Start Small and Build</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Week 1: One 60-min deep work block daily. Week 2-3: Increase to 90 minutes.
                  Week 4+: Add a second block if possible. Track with a visible chain.
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div
                        key={day}
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                          day <= 5
                            ? "bg-emerald-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {day <= 5 ? "✓" : day}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Don&apos;t break the chain</span>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">5</span>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">Review and Optimize Weekly</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Every Friday, review: How many deep work hours? What interrupted you? What
                  can you eliminate or batch? Adjust your ritual accordingly.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded text-xs bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    Weekly review: 15 min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cal Newport's Four Rules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-violet-500" />
            Cal Newport&apos;s Four Rules of Deep Work
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                Rule 1: Work Deeply
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Develop rituals and routines that minimize the willpower drain of deciding
                when, where, and how to work deeply.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  Choose your depth philosophy (monastic, bimodal, rhythmic, journalistic)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  Build rituals: where, how long, rules, support systems
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  Make grand gestures to psychologically commit (book a cabin, clear
                  schedule)
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
              <h3 className="font-semibold text-violet-600 dark:text-violet-400 mb-2">
                Rule 2: Embrace Boredom
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Train your brain to resist distraction even when bored. The ability to
                concentrate is a skill that must be trained.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                  Schedule internet blocks instead of offline blocks
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                  Practice productive meditation (focus on a problem while walking)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                  Resist the urge to check your phone at every moment of boredom
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20">
              <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-2">
                Rule 3: Quit Social Media
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Apply the craftsman approach to tool selection. Only keep tools that provide
                substantial positive impact on your core goals.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  Identify the core factors that determine success in your work and life
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  Keep only tools with substantial positive impact
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  Try 30-day breaks to objectively assess each tool&apos;s value
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                Rule 4: Drain the Shallows
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Ruthlessly reduce shallow work to create protected space for deep work.
                Shallow tasks will expand to fill available time if you let them.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Schedule every minute of your day (time-block planning)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Quantify the depth of every activity with the college grad test
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Set a hard finish time (fixed-schedule productivity)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls & Solutions - NEW SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Common Pitfalls & Solutions
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    Pitfall: Starting Too Ambitious
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Attempting 4 hours of deep work on day one, then burning out by day
                    three.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      <strong>Solution:</strong> Start with just 60 minutes daily for the
                      first two weeks. Build gradually.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    Pitfall: No Clear Shutdown Ritual
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Work thoughts bleed into evening, preventing proper mental recovery.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      <strong>Solution:</strong> Create a shutdown ritual. Review tasks,
                      write tomorrow&apos;s plan, say &quot;Shutdown complete&quot;—a verbal
                      cue to end work mode.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    Pitfall: Confusing Urgency with Importance
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Letting &quot;urgent&quot; shallow tasks crowd out important deep work
                    because they feel more pressing.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      <strong>Solution:</strong> Schedule deep work first thing in the
                      morning before shallow tasks accumulate. Protect this time ruthlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    Pitfall: Environment Not Optimized
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Trying to do deep work with phone on desk, notifications enabled, in a
                    noisy space.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      <strong>Solution:</strong> Phone in another room. Full-screen app only.
                      Noise-canceling headphones. Water bottle ready. Eliminate all friction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    Pitfall: No Metric for Success
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Not tracking deep work hours, making it hard to know if you&apos;re
                    improving.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      <strong>Solution:</strong> Track hours daily with a simple tally.
                      Review weekly. Aim for 15-20 hours of deep work per week as a target.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Work + Pomodoro Protocol */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            Deep Work + Pomodoro Protocol
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-6">
              The Pomodoro Technique can serve as training wheels for deep work. Use it to build
              concentration stamina, then optionally graduate to longer unstructured sessions.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="font-medium text-foreground text-sm">Beginner (Weeks 1-4)</div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Standard 25/5 intervals. Focus on eliminating all distractions during work
                  blocks. Build up to 4 consecutive pomodoros (2 hours).
                </p>
                <div className="text-xs text-primary">Goal: 1-2 hours daily</div>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="font-medium text-foreground text-sm">
                    Intermediate (Weeks 5-8)
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Extend to 45/10 or 50/10 intervals. Chain 2 blocks for 90-minute deep work
                  sessions that match ultradian rhythms.
                </p>
                <div className="text-xs text-primary">Goal: 2-3 hours daily</div>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <div className="font-medium text-foreground text-sm">Advanced (Weeks 9+)</div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Consider Flowtime—work until natural break point. Use timer only for tracking,
                  not enforcing breaks. Trust your concentration.
                </p>
                <div className="text-xs text-primary">Goal: 3-4 hours daily</div>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="font-medium text-foreground text-sm">Key Principles</div>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Phone in another room (not just silent)</li>
                  <li>• Same time, same place daily</li>
                  <li>• Clear start ritual to signal brain</li>
                  <li>• Track deep work hours weekly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Research Citations Section - NEW */}
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
                      {cite.authors} ({cite.year}). <em>{cite.title}</em>.
                      {cite.journal && ` ${cite.journal}.`}
                      {cite.publisher && ` ${cite.publisher}.`}
                    </p>
                    {cite.doi && (
                      <a
                        href={`https://doi.org/${cite.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        DOI: {cite.doi}
                      </a>
                    )}
                    {cite.note && (
                      <p className="text-xs text-muted-foreground mt-1">{cite.note}</p>
                    )}
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
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Start Your Deep Work Practice
            </h2>
            <p className="text-muted-foreground mb-4">
              Deep work is a skill that must be trained. Start with one focused 25-minute
              block today, and build from there. The Pomodoro Technique is your training
              ground.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Deep Work Session
              </Link>
              <Link
                href="/blog/cost-of-task-switching"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                The Cost of Task Switching
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
              href="/blog/cost-of-task-switching"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                The Cost of Task Switching
              </h3>
              <p className="text-sm text-muted-foreground">
                Why every interruption costs 23 minutes of focus recovery.
              </p>
            </Link>
            <Link
              href="/blog/flowtime-vs-pomodoro"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Flowtime vs Pomodoro
              </h3>
              <p className="text-sm text-muted-foreground">
                Which timing method best supports deep work sessions.
              </p>
            </Link>
            <Link
              href="/blog/morning-routine-productivity"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Morning Routine for Productivity
              </h3>
              <p className="text-sm text-muted-foreground">
                Build a science-backed morning ritual for peak focus.
              </p>
            </Link>
            <Link
              href="/blog/caffeine-and-focus"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Caffeine & Focus
              </h3>
              <p className="text-sm text-muted-foreground">
                Strategic caffeine timing for enhanced concentration.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
