import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Rocket,
  Clock,
  Target,
  CheckCircle2,
  ChevronDown,
  Timer,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Zap,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Users,
  Code2,
  DollarSign,
  Brain,
  Coffee,
  Moon,
  Sun,
  Flame,
  Heart,
  Shield,
  Star,
  Quote,
  BookOpen,
  RefreshCw,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"

export const metadata: Metadata = {
  title: "Pomodoro for Entrepreneurs: Alex's Journey from Chaos to Clarity | Pomobox",
  description:
    "Follow Alex, a startup founder, from overwhelm to organized. A story-driven guide to using Pomodoro for managing multiple roles, preventing burnout, and building sustainably.",
  keywords: [
    "pomodoro for entrepreneurs",
    "startup productivity",
    "founder focus",
    "entrepreneur time management",
    "startup burnout prevention",
    "founder productivity",
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/guide/pomodoro-for-entrepreneurs",
    siteName: "Pomobox",
    title: "Pomodoro for Entrepreneurs: A Founder's Journey",
    description:
      "From 70-hour chaos to focused clarity. How one entrepreneur transformed their startup with the Pomodoro Technique.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro for Entrepreneurs | Pomobox",
    description:
      "Follow Alex's journey from startup chaos to focused productivity. A story of Pomodoro, burnout prevention, and sustainable growth.",
  },
  alternates: {
    canonical: "https://pomobox.app/guide/pomodoro-for-entrepreneurs",
  },
}

// Alex의 핵심 교훈
const ALEX_LESSONS = [
  {
    lesson: "One Hat at a Time",
    explanation:
      "Stop trying to be CEO, developer, and salesperson simultaneously. Assign roles to time blocks. Be fully present in each role during its block.",
    icon: Users,
  },
  {
    lesson: "Rest Is Productive",
    explanation:
      "Breaks aren't wasted time—they're when your brain processes and recovers. Skip them long enough and you'll burn out. The Pomodoro break is mandatory, not optional.",
    icon: Coffee,
  },
  {
    lesson: "Emergencies Usually Aren't",
    explanation:
      "Most 'urgent' things can wait 25 minutes. True emergencies are rare. Creating panic around non-emergencies just depletes your capacity for real crises.",
    icon: Shield,
  },
  {
    lesson: "Consistency Beats Intensity",
    explanation:
      "Six focused Pomodoros every day beats one 14-hour crunch session. Sustainable pace wins over time. The startup is a marathon, not a sprint.",
    icon: RefreshCw,
  },
]

// 다른 창업자 인용
const FOUNDER_QUOTES = [
  {
    quote:
      "I thought I needed more time. What I needed was more focus. Pomodoro gave me permission to ignore Slack for 25 minutes—and that changed everything.",
    name: "Sarah K.",
    role: "Founder, B2B SaaS",
    raised: "$2M Seed",
  },
  {
    quote:
      "The single best thing I did for my mental health as a founder was instituting 'no-meeting Wednesdays.' Four deep work Pomodoros every Wednesday kept me sane.",
    name: "David L.",
    role: "Co-founder, Fintech Startup",
    raised: "Bootstrapped to $1M ARR",
  },
  {
    quote:
      "Burnout sneaks up on you. I didn't notice until I couldn't get out of bed. Now I track my Pomodoros—if I'm doing more than 8 a day regularly, something's wrong.",
    name: "Maria G.",
    role: "Solo Founder, Consumer App",
    raised: "$500K Angel",
  },
]

// 실행 가이드
const IMPLEMENTATION_GUIDE = [
  {
    phase: "Week 1",
    title: "Just Start",
    actions: [
      "Download a Pomodoro timer (Pomobox tracks everything for you)",
      "Do ONE Pomodoro before checking email each morning",
      "Don't optimize anything yet—just get the rhythm",
    ],
  },
  {
    phase: "Week 2-3",
    title: "Find Your Blocks",
    actions: [
      "Identify your peak energy time (usually morning)",
      "Protect 2-3 hours of that time for deep work Pomodoros",
      "Move meetings and calls to your lower-energy hours",
    ],
  },
  {
    phase: "Week 4-6",
    title: "Build the System",
    actions: [
      "Create a 'Deep Work Day' (one day with no external meetings)",
      "Set boundaries: Pomodoro time = DND time",
      "Start tracking which tasks take how many Pomodoros",
    ],
  },
  {
    phase: "Month 2+",
    title: "Refine & Protect",
    actions: [
      "Adjust session lengths if needed (some founders prefer 45-50 min)",
      "Review weekly: Are you getting your deep work blocks?",
      "Protect your system fiercely—it's now a competitive advantage",
    ],
  },
]

// 번아웃 예방 체크리스트
const BURNOUT_PREVENTION = [
  { item: "Taking real breaks (away from screen)", frequency: "Every Pomodoro" },
  { item: "Physical movement", frequency: "Every 2 hours" },
  { item: "Hard stop time (leave the desk)", frequency: "Daily" },
  { item: "Full day off (no work)", frequency: "Weekly" },
  { item: "Complete disconnect (no email/Slack)", frequency: "Monthly" },
  { item: "Extended rest (vacation)", frequency: "Quarterly" },
]

// FAQ
const FAQS = [
  {
    question: "I'm a solo founder wearing all hats. How do I focus when everything needs me?",
    answer:
      "Time-block your hats. Morning = builder (product, code, content). Afternoon = operator (emails, customers, admin). You can't be everything simultaneously, but you can be each thing fully in its window. The Pomodoro timer becomes your permission to be one thing.",
  },
  {
    question: "My co-founder and I have different work styles. How do we sync?",
    answer:
      "Sync on overlap, respect individual rhythms. Maybe you both do 'no meeting' hours from 9-11 AM, but your Pomodoro lengths differ. The key is protecting each other's focus time. Share your calendars and honor the blocks.",
  },
  {
    question: "Investors and customers expect immediate responses. Won't focus time hurt relationships?",
    answer:
      "Set expectations proactively: 'I check and respond to messages at 11 AM and 3 PM daily.' Most understand—they're busy too. For truly urgent matters, have a secondary channel (phone for emergencies only). Responsiveness doesn't require always-on.",
  },
  {
    question: "How do I handle the constant pivoting and uncertainty of startup life?",
    answer:
      "Pomodoro provides structure amid chaos. The work changes constantly, but the rhythm stays stable: 25 minutes of focus, break, repeat. That consistency is grounding when everything else is uncertain. Use the planning Pomodoro each morning to adapt to whatever that day needs.",
  },
  {
    question: "I've tried productivity systems before and they all failed. Why would this work?",
    answer:
      "Pomodoro is so simple it's hard to fail. No complex setup, no expensive tools, no elaborate planning. Just: start a 25-minute timer, work on one thing, stop when it rings. That's it. The simplicity is the feature. Start with one Pomodoro tomorrow morning. You can always add complexity later.",
  },
]

// 관련 가이드
const RELATED_GUIDES = [
  { href: "/guide/what-is-pomodoro", title: "What is Pomodoro?", description: "Core technique basics" },
  { href: "/guide/pomodoro-for-managers", title: "For Managers", description: "Leadership strategies" },
  { href: "/guide/pomodoro-for-freelancers", title: "For Freelancers", description: "Self-employed success" },
]

// JSON-LD
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pomodoro for Entrepreneurs: A Founder's Journey from Chaos to Clarity",
    description:
      "Follow Alex, a startup founder, as they transform from 70-hour overwhelm to focused productivity with the Pomodoro Technique.",
    author: { "@type": "Organization", name: "Pomobox Team" },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      logo: { "@type": "ImageObject", url: "https://pomobox.app/logo.png" },
    },
    url: "https://pomobox.app/guide/pomodoro-for-entrepreneurs",
    mainEntityOfPage: "https://pomobox.app/guide/pomodoro-for-entrepreneurs",
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

export default function PomodoroForEntrepreneursPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb items={BREADCRUMB_PRESETS.guide("Pomodoro for Entrepreneurs")} className="mb-8" />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 mb-6">
            <Rocket className="h-3 w-3" />
            Founder Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomodoro for Entrepreneurs
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            A founder&apos;s journey from chaos to clarity.
          </p>
          <ArticleMeta readingTime="14 min" />

          {/* Story Hook */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-orange-500/5 to-rose-500/5 border border-orange-500/10 text-left max-w-2xl mx-auto">
            <p className="text-lg italic text-muted-foreground">
              &quot;I was working 70 hours a week and nothing felt done. Then I discovered that the
              problem wasn&apos;t time—it was focus...&quot;
            </p>
            <p className="text-sm text-muted-foreground mt-2">— Alex, Series A Founder</p>
          </div>
        </header>

        {/* PROLOGUE: The 70-Hour Week */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <AlertTriangle className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Prologue
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">The 70-Hour Week</h2>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              It&apos;s 2 AM. Alex stares at a laptop screen, eyes burning. The email to the investor is half-written. Slack notifications pile up—3 from the developer, 2 from the marketing hire, 1 &quot;urgent&quot; from a customer. Tomorrow&apos;s pitch deck sits untouched.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Alex hasn&apos;t eaten dinner. Again.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is the third month of the startup. The seed round just closed. The team is now five people, and somehow, Alex is more overwhelmed than when working alone. Every day is an exhausting blur of context-switching: CEO hat for the investor call, developer hat for the API bug, support hat for the angry customer, recruiter hat for the afternoon interview.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">&quot;I&apos;m working 70 hours a week,&quot;</strong> Alex thinks. <strong className="text-foreground">&quot;Why does nothing feel done?&quot;</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sound familiar? This is where many entrepreneurs live. Lots of motion. Little progress. The slow creep toward burnout. But here&apos;s the thing: it doesn&apos;t have to be this way.
            </p>
          </div>
        </section>

        {/* CHAPTER 1: The Tomato That Changed Everything */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <Lightbulb className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Chapter 1
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">The Tomato That Changed Everything</h2>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The breaking point comes on a Thursday. Alex misses a critical investor call—double-booked with a customer demo that ran long. The investor is understanding, but the shame stings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That night, scrolling through Y Combinator essays for the hundredth time, Alex stumbles across a simple concept: the Pomodoro Technique. 25 minutes of focused work. 5-minute break. Repeat.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">&quot;That&apos;s it?&quot;</strong> Alex thinks skeptically. <strong className="text-foreground">&quot;A kitchen timer is going to fix my startup chaos?&quot;</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              But something about the simplicity is appealing. No complex system to learn. No expensive software. Just... focus. For 25 minutes at a time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The next morning, Alex downloads a timer app and tries something radical: before checking email, before Slack, before anything—one Pomodoro on the pitch deck. Just 25 minutes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What happens next is unexpected. For the first time in weeks, Alex finishes a complete section of the deck. Not because the work is easy, but because for 25 minutes, nothing else exists. No pings, no context switches, no mental juggling. Just the work.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">&quot;I&apos;ve been doing this wrong,&quot;</strong> Alex realizes. <strong className="text-foreground">&quot;I&apos;ve been giving everything partial attention. Nothing gets full attention.&quot;</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is the entrepreneur&apos;s trap: wearing many hats means no hat fits well. The Pomodoro isn&apos;t just a timer—it&apos;s permission to be one thing at a time.
            </p>
          </div>
        </section>

        {/* CHAPTER 2: The System Takes Shape */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <Target className="h-6 w-6 text-cyan-500" />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Chapter 2
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">The System Takes Shape</h2>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Over the next two weeks, Alex experiments. Not everything works immediately—this is a startup, after all, and chaos doesn&apos;t surrender easily. But patterns emerge.
            </p>

            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <h3 className="font-semibold text-foreground mb-2">The Role-Block System</h3>
              <p className="text-muted-foreground text-sm">
                Alex stops trying to be everything all day. Instead, mornings become &quot;Maker Time&quot;—three to four Pomodoros of deep work. No meetings. No Slack. Just building. Afternoons shift to &quot;Manager Time&quot;—the calls, the emails, the team syncs.
              </p>
              <p className="text-muted-foreground text-sm mt-2 italic">
                &quot;I realized I was a terrible CEO because I was trying to be the CEO while also being the developer while also being the support person. Now I&apos;m a great developer from 8 to 11, and a decent CEO from 2 to 5.&quot;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
              <h3 className="font-semibold text-foreground mb-2">The Deep Work Day</h3>
              <p className="text-muted-foreground text-sm">
                Wednesdays become sacred. No external meetings. No customer calls. Just strategic work: planning, product thinking, the hard decisions that need quiet. Alex blocks the entire calendar and posts in Slack: &quot;Deep Work Day. Available for emergencies only.&quot;
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                The first Wednesday feels indulgent. By the third, it&apos;s indispensable.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <h3 className="font-semibold text-foreground mb-2">The Emergency Pomodoro</h3>
              <p className="text-muted-foreground text-sm">
                When fires inevitably erupt—a server goes down, a customer threatens to churn—Alex doesn&apos;t abandon the system. Instead: one focused Pomodoro on the emergency, assess, then decide if it needs more.
              </p>
              <p className="text-muted-foreground text-sm mt-2 italic">
                &quot;80% of &apos;emergencies&apos; resolved in 25 minutes. The rest were actually emergencies.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* CHAPTER 3: The Week It Almost Broke */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Chapter 3
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">The Week It Almost Broke</h2>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Six weeks in, Alex hits a wall. A major customer churns. A developer quits. The Series A timeline compresses by two months. The careful Pomodoro system feels impossible against the wave of chaos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">&quot;I can&apos;t do 25 minutes of focus when everything is on fire,&quot;</strong> Alex vents to a mentor.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The mentor, a veteran founder, smiles. &quot;When did you last take a real break?&quot;
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Alex thinks. The &quot;5-minute breaks&quot; had become &quot;5 minutes of checking Slack.&quot; The &quot;long breaks&quot; had become &quot;working lunches.&quot; The system was there, but the rest wasn&apos;t.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">&quot;The Pomodoro Technique isn&apos;t just about the work,&quot;</strong> the mentor says. <strong className="text-foreground">&quot;It&apos;s about the breaks. Your brain needs recovery. You&apos;ve been sprinting for six weeks without actually stopping.&quot;</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That weekend, Alex does something terrifying: unplugs completely. No laptop. No phone (okay, phone for emergencies, but in another room). Reads a novel. Walks. Sleeps nine hours.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Monday morning, the problems are still there. But somehow, they look smaller. Solvable. The first Pomodoro of the week produces more than the entire previous Friday.
            </p>
            <p className="text-foreground font-medium">
              The lesson lands hard: rest isn&apos;t the opposite of productivity. It&apos;s the foundation of it.
            </p>
          </div>
        </section>

        {/* CHAPTER 4: The New Normal */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Chapter 4
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">The New Normal</h2>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Three months after that first reluctant Pomodoro, Alex&apos;s company looks different. Not because the challenges disappeared—they multiply as the startup grows. But the relationship with work has transformed.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-center">
                <div className="text-xl font-bold text-emerald-500">50</div>
                <div className="text-xs text-muted-foreground">hrs/week</div>
                <div className="text-xs text-emerald-500/70">down from 70</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-center">
                <div className="text-xl font-bold text-emerald-500">15</div>
                <div className="text-xs text-muted-foreground">deep work hrs</div>
                <div className="text-xs text-emerald-500/70">up from 5</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-center">
                <div className="text-xl font-bold text-emerald-500">2</div>
                <div className="text-xs text-muted-foreground">meeting blocks</div>
                <div className="text-xs text-emerald-500/70">consolidated</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-center">
                <div className="text-xl font-bold text-emerald-500">1st</div>
                <div className="text-xs text-muted-foreground">vacation</div>
                <div className="text-xs text-emerald-500/70">in 18 months</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">The Habits</h3>
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">Morning routine:</strong> coffee, planning Pomodoro (decide the day&apos;s priorities), then three deep work sessions before any meetings. Non-negotiable.
              </p>
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">Afternoons:</strong> batched meetings, team syncs, the operational chaos that&apos;s part of startup life. But contained. Bounded.
              </p>
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">Evenings:</strong> hard stop at 6 PM three days a week. &quot;If it&apos;s not done by 6, it&apos;s a tomorrow problem.&quot;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-muted-foreground italic">
                &quot;I used to think more hours meant more output. Now I know: more focus means more output. Hours are just the container. What you put in them matters more.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Alex's Key Lessons */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Lightbulb className="h-3 w-3" />
              Lessons Learned
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              What Alex Discovered
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALEX_LESSONS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.lesson}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold text-foreground">{item.lesson}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.explanation}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Other Founder Quotes */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Quote className="h-3 w-3" />
              From Other Founders
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              You&apos;re Not Alone
            </h2>
          </div>

          <div className="space-y-4">
            {FOUNDER_QUOTES.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <Quote className="h-5 w-5 text-violet-500 mb-3" />
                <p className="text-lg text-foreground italic mb-4">&quot;{item.quote}&quot;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {item.raised}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Your Implementation Guide */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <BookOpen className="h-3 w-3" />
              Your Turn
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Start Your Journey
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {IMPLEMENTATION_GUIDE.map((phase, i) => (
                <div key={phase.phase} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm font-bold text-cyan-500">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-xs text-muted-foreground">{phase.phase}</span>
                      <h3 className="font-semibold text-foreground">{phase.title}</h3>
                    </div>
                  </div>
                  <ul className="ml-13 space-y-2">
                    {phase.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Burnout Prevention */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Heart className="h-3 w-3" />
              Burnout Prevention
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Protect Your Energy
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/5 to-pink-500/5 border border-rose-500/10">
            <p className="text-muted-foreground mb-6">
              The startup journey is long. Burning out helps no one—not you, not your team, not your customers. Use this checklist to catch warning signs early.
            </p>
            <div className="space-y-3">
              {BURNOUT_PREVENTION.map((item) => (
                <div
                  key={item.item}
                  className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/30"
                >
                  <span className="text-sm text-foreground">{item.item}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {item.frequency}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground italic">
              &quot;If you&apos;re consistently skipping breaks or working past your stop time, that&apos;s a signal—not a badge of honor.&quot;
            </p>
          </div>
        </section>

        {/* Epilogue */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-emerald-500" />
              <h2 className="text-xl font-semibold text-foreground">Epilogue: Two Years Later</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Alex&apos;s company raised their Series A. The team grew to 25 people. The chaos didn&apos;t disappear—startups are inherently chaotic—but the relationship with the chaos changed.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                &quot;Pomodoro taught me that I can&apos;t control everything,&quot; Alex reflects. &quot;But I can control what gets my full attention. Twenty-five minutes at a time, I build the company I want to lead.&quot;
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The tomato-shaped timer sits on Alex&apos;s desk—a reminder that progress happens one focused session at a time. Not through heroic all-nighters. Not through constant availability. Through consistent, protected, intentional focus.
              </p>
              <p className="text-foreground font-medium mt-6">
                Your story starts with your next Pomodoro. What will you focus on?
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Founder FAQs</h2>
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
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-orange-500/10 to-rose-500/5 border border-orange-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Write Your Chapter?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Your startup deserves your best focus. Start with one Pomodoro. See where it takes you.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Your First Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/guide/pomodoro-for-freelancers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            For Freelancers
          </Link>
          <Link
            href="/guide/what-is-pomodoro"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            What is Pomodoro?
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd[0])}
      </Script>
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd[1])}
      </Script>
    </main>
  )
}
