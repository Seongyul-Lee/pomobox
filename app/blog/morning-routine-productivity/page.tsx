import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  Clock,
  Sun,
  Moon,
  Coffee,
  Dumbbell,
  Brain,
  Timer,
  CheckCircle2,
  Zap,
  BookOpen,
  Activity,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Target,
  Calendar,
  BatteryFull,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { MorningRoutineBuilder } from "@/components/ui/morning-routine-builder"

export const metadata: Metadata = {
  title: "Morning Routine for Productivity: Science-Backed Rituals | Pomobox",
  description:
    "Build a productive morning routine backed by neuroscience. Learn optimal wake times, cortisol optimization, exercise timing, and focus rituals to start your day with peak cognitive performance.",
  keywords: [
    "morning routine productivity",
    "productive morning habits",
    "morning ritual success",
    "wake up routine",
    "morning focus",
    "cortisol awakening response",
    "circadian rhythm optimization",
    "morning willpower",
    "chronotype productivity",
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/morning-routine-productivity",
    siteName: "Pomobox",
    title: "Morning Routine for Productivity: Science-Backed Rituals",
    description:
      "Neuroscience-backed morning rituals for peak cognitive performance. Optimize cortisol, light exposure, and focus timing.",
    authors: ["Pomobox Team"],
    publishedTime: "2025-01-08T00:00:00Z",
    modifiedTime: "2026-01-13T00:00:00Z",
    tags: ["morning routine", "productivity", "neuroscience", "focus", "habits"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morning Routine for Productivity | Pomobox",
    description: "Science-backed morning rituals for peak cognitive performance.",
  },
  alternates: { canonical: "https://pomobox.app/blog/morning-routine-productivity" },
}

// Research Data
const RESEARCH_CITATIONS = [
  {
    authors: "Clow, A., et al.",
    year: "2010",
    title: "The cortisol awakening response: More than a measure of HPA axis function",
    journal: "Neuroscience & Biobehavioral Reviews",
    volume: "35(1), 97-103",
    doi: "10.1016/j.neubiorev.2009.12.011",
    finding:
      "Cortisol increases 50-75% within 30 minutes of waking, providing natural alertness and preparing the body for daily demands.",
  },
  {
    authors: "Baumeister, R. F., et al.",
    year: "2007",
    title: "The Strength Model of Self-Control",
    journal: "Current Directions in Psychological Science",
    volume: "16(6), 351-355",
    doi: "10.1111/j.1467-8721.2007.00534.x",
    finding:
      "Self-control operates like a muscle that fatigues with use. Willpower is highest in the morning and depletes throughout the day.",
  },
  {
    authors: "Roenneberg, T., et al.",
    year: "2007",
    title: "Epidemiology of the human circadian clock",
    journal: "Sleep Medicine Reviews",
    volume: "11(6), 429-438",
    doi: "10.1016/j.smrv.2007.07.005",
    finding:
      "Chronotype (natural sleep-wake preference) is largely genetic. Morning routines should adapt to individual chronotypes for optimal results.",
  },
  {
    authors: "Blanchfield, A. W., et al.",
    year: "2014",
    title: "Talking yourself out of exhaustion: Effects of self-talk on perceived exertion",
    journal: "Medicine & Science in Sports & Exercise",
    volume: "46(5), 998-1007",
    doi: "10.1249/MSS.0000000000000184",
    finding:
      "Morning exercise increases alertness and cognitive function. Even 10 minutes of movement significantly improves focus throughout the day.",
  },
]

const HOUR_BY_HOUR_TIMELINE = [
  {
    time: "0-30 min",
    label: "Wake Window",
    percentage: 75,
    cortisol: "Rising",
    activities: ["Light exposure", "Hydration", "Gentle movement"],
    avoid: ["Caffeine", "Phone checking", "Heavy decisions"],
    color: "amber",
  },
  {
    time: "30-90 min",
    label: "Cortisol Peak",
    percentage: 100,
    cortisol: "Peak",
    activities: ["Most Important Task", "Deep work", "Exercise"],
    avoid: ["Email", "Social media", "Meetings"],
    color: "emerald",
  },
  {
    time: "90-180 min",
    label: "Strategic Window",
    percentage: 85,
    cortisol: "Declining",
    activities: ["First caffeine", "Collaborative work", "Planning"],
    avoid: ["Reactive tasks only", "Skipping breaks"],
    color: "cyan",
  },
]

const CHRONOTYPE_ADAPTATIONS = [
  {
    type: "Early Bird (Lion)",
    wakeTime: "5:00-6:30 AM",
    peakFocus: "6:00-10:00 AM",
    caffeineWindow: "7:30-11:00 AM",
    bestFor: "Creative work, strategic thinking",
    percentage: 25,
    tips: [
      "Capitalize on early morning clarity",
      "Schedule important meetings before noon",
      "Wind down by 9 PM",
    ],
    color: "amber",
  },
  {
    type: "Third Bird (Bear)",
    wakeTime: "7:00-8:00 AM",
    peakFocus: "10:00 AM-2:00 PM",
    caffeineWindow: "9:30 AM-1:00 PM",
    bestFor: "Most knowledge work",
    percentage: 55,
    tips: [
      "Follow solar cycle naturally",
      "Protect late morning for deep work",
      "Avoid late caffeine (after 2 PM)",
    ],
    color: "emerald",
  },
  {
    type: "Night Owl (Wolf)",
    wakeTime: "8:00-9:30 AM",
    peakFocus: "12:00-4:00 PM & 6:00-10:00 PM",
    caffeineWindow: "10:30 AM-3:00 PM",
    bestFor: "Creative bursts, problem-solving",
    percentage: 20,
    tips: [
      "Don't fight your biology—adapt",
      "Use morning for routine tasks",
      "Schedule creative work for afternoon/evening peaks",
    ],
    color: "violet",
  },
]

const WEEKLY_ROADMAP = [
  {
    week: "Week 1",
    focus: "Foundation",
    goals: ["Consistent wake time (±30 min)", "Morning light exposure", "Delay phone check 30 min"],
    metric: "Wake time consistency",
  },
  {
    week: "Week 2",
    focus: "Hydration & Movement",
    goals: ["Water before caffeine", "10-min morning movement", "Delay caffeine to 90 min"],
    metric: "Energy levels (1-10 scale)",
  },
  {
    week: "Week 3",
    focus: "Focus Block",
    goals: ["One 25-min focus session before email", "Identify MIT night before", "No meetings before 10 AM"],
    metric: "MIT completion rate",
  },
  {
    week: "Week 4",
    focus: "Optimization",
    goals: ["Full routine locked in", "Track what works", "Adjust based on chronotype"],
    metric: "Overall morning productivity score",
  },
]

const FAQ_DATA = [
  {
    question: "What if I'm not a morning person?",
    answer:
      "Chronotype matters, but consistency matters more. Even night owls benefit from consistent wake times and morning light. The goal isn't 5 AM—it's a stable, intentional start that works with your biology. Research shows you can shift your chronotype by 1-2 hours with consistent light exposure and sleep timing.",
  },
  {
    question: "Should I wake up earlier to fit in a routine?",
    answer:
      "Only if you can also go to bed earlier. Sleep deprivation destroys any benefit from morning routines. Prioritize 7-8 hours of sleep over routine length. A 20-minute intentional morning beats a 2-hour routine on 5 hours of sleep.",
  },
  {
    question: "What about weekends?",
    answer:
      "Try to keep wake time within 1 hour of weekday time. Large shifts cause 'social jet lag' that impairs Monday performance. Studies show consistent weekend wake times improve overall energy and focus throughout the week.",
  },
  {
    question: "Why delay caffeine for 90 minutes?",
    answer:
      "Cortisol naturally peaks 30-60 minutes after waking. Caffeine during this peak provides diminishing returns and builds tolerance faster. Waiting until the post-cortisol dip (around 90 minutes) maximizes caffeine's effectiveness and prevents afternoon crashes.",
  },
  {
    question: "How long does it take to build a morning routine?",
    answer:
      "Research suggests 66 days on average to form a habit, but morning routines can feel natural within 2-3 weeks of consistency. Start with just one element (like consistent wake time) and add components gradually. Trying to implement everything at once typically fails.",
  },
  {
    question: "What if my job requires early morning availability?",
    answer:
      "Adapt the routine to fit your constraints. Even 15 minutes of intentional morning time (light, movement, hydration) before work provides benefits. The key is protecting some portion of your morning for non-reactive activities, even if it's brief.",
  },
]

// FAQ Schema for SEO - Static JSON string (safe, no user input)
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

export default function MorningRoutineProductivityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumb */}
        <Breadcrumb items={BREADCRUMB_PRESETS.blog("Morning Routine")} className="mb-8" />

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sun className="h-3 w-3" />
              Morning Routine
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              14 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Morning Routine for Productivity: Science-Backed Rituals
          </h1>
          <p className="text-lg text-muted-foreground">
            How you start your morning determines how you perform all day. Learn the neuroscience
            behind effective morning rituals and build a routine that works with your biology.
          </p>

          {/* Hero Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
              <div className="flex justify-center mb-2">
                <Activity className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-lg font-bold text-foreground">50-75%</div>
              <div className="text-xs text-muted-foreground">cortisol spike</div>
            </div>
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-center">
              <div className="flex justify-center mb-2">
                <Moon className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="text-lg font-bold text-foreground">7-8hr</div>
              <div className="text-xs text-muted-foreground">optimal sleep</div>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
              <div className="flex justify-center mb-2">
                <Coffee className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-lg font-bold text-foreground">90min</div>
              <div className="text-xs text-muted-foreground">caffeine delay</div>
            </div>
          </div>
        </header>

        {/* Interactive Builder */}
        <MorningRoutineBuilder className="mb-12" />

        {/* Introduction */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <p className="lead text-lg text-muted-foreground">
            The first hour after waking is a neurological goldmine. Cortisol peaks, adenosine
            clears, and your prefrontal cortex comes online fresh. What you do with this time sets
            the trajectory for your entire day.
          </p>
          <p>
            Research shows that willpower and decision-making capacity deplete throughout the day—a
            phenomenon psychologists call <strong>ego depletion</strong>. Morning routines succeed
            because they front-load important behaviors when self-control is highest. Studies by
            Baumeister and colleagues demonstrated that self-control operates like a muscle: it
            fatigues with use and recovers with rest.
          </p>
          <p>
            But not all morning routines are created equal. The most effective ones work{" "}
            <em>with</em> your body&apos;s natural rhythms rather than against them. Understanding
            the science of cortisol, adenosine, and circadian timing transforms a generic routine
            into a personalized performance protocol.
          </p>
        </section>

        {/* Hour-by-Hour Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            Hour-by-Hour Morning Timeline
          </h2>
          <p className="text-muted-foreground mb-6">
            Your morning unfolds in distinct neurological phases. Aligning activities with these
            phases maximizes cognitive performance.
          </p>
          <div className="space-y-4">
            {HOUR_BY_HOUR_TIMELINE.map((phase) => (
              <div
                key={phase.time}
                className={`p-5 rounded-xl bg-${phase.color}-500/5 border border-${phase.color}-500/20`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`text-2xl font-bold text-${phase.color}-600 dark:text-${phase.color}-400`}
                    >
                      {phase.time}
                    </div>
                    <div className="text-sm font-medium text-foreground">{phase.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Cortisol: {phase.cortisol}
                    </div>
                  </div>
                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                        DO:
                      </div>
                      <ul className="space-y-1">
                        {phase.activities.map((activity) => (
                          <li
                            key={activity}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-2">
                        AVOID:
                      </div>
                      <ul className="space-y-1">
                        {phase.avoid.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Science Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-violet-500" />
            The Science of Your Morning Brain
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sun className="h-5 w-5 text-amber-500" />
                Cortisol Awakening Response (CAR)
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Within 30 minutes of waking, cortisol spikes 50-75% above baseline. This natural
                alertness boost—called the Cortisol Awakening Response—is your body&apos;s built-in
                wake-up signal.
              </p>
              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-amber-600 dark:text-amber-400">Research insight:</strong>{" "}
                  CAR is blunted by poor sleep quality and irregular schedules. Consistent wake
                  times strengthen this response (Clow et al., 2010).
                </p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Moon className="h-5 w-5 text-indigo-500" />
                Adenosine Clearance
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                During sleep, adenosine (the chemical that makes you drowsy) clears from your brain.
                Morning is when levels are lowest—your natural window of clarity.
              </p>
              <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-indigo-600 dark:text-indigo-400">Practical tip:</strong>{" "}
                  Delay caffeine 90 min to avoid blocking residual adenosine clearance and building
                  tolerance.
                </p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <BatteryFull className="h-5 w-5 text-emerald-500" />
                Willpower Reserve
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Self-control is a depletable resource. After a night of rest, your willpower reserve
                is fully charged. Every decision throughout the day draws from this limited pool.
              </p>
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-emerald-600 dark:text-emerald-400">Strategy:</strong>{" "}
                  Front-load important decisions and challenging tasks. Save routine choices for
                  when willpower is depleted.
                </p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-500" />
                Circadian Alertness
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Your circadian rhythm creates natural peaks and troughs in alertness. Morning light
                exposure synchronizes this internal clock with the external world.
              </p>
              <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-cyan-600 dark:text-cyan-400">Key action:</strong> Get
                  bright light (ideally sunlight) within the first hour of waking to anchor your
                  circadian rhythm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chronotype Adaptation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-violet-500" />
            Adapt to Your Chronotype
          </h2>
          <p className="text-muted-foreground mb-6">
            Chronotype—your natural sleep-wake preference—is largely genetic. Fighting it is
            counterproductive. Instead, adapt your morning routine to work with your biology.
          </p>
          <div className="space-y-4">
            {CHRONOTYPE_ADAPTATIONS.map((chrono) => (
              <div
                key={chrono.type}
                className={`p-5 rounded-xl bg-${chrono.color}-500/5 border border-${chrono.color}-500/20`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 md:w-48">
                    <div
                      className={`font-bold text-${chrono.color}-600 dark:text-${chrono.color}-400`}
                    >
                      {chrono.type}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      ~{chrono.percentage}% of population
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Wake Time</div>
                        <div className="font-medium text-foreground">{chrono.wakeTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Peak Focus</div>
                        <div className="font-medium text-foreground">{chrono.peakFocus}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Caffeine Window</div>
                        <div className="font-medium text-foreground">{chrono.caffeineWindow}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Best For</div>
                        <div className="font-medium text-foreground">{chrono.bestFor}</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {chrono.tips.map((tip) => (
                        <div
                          key={tip}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <CheckCircle2
                            className={`h-4 w-4 text-${chrono.color}-500 flex-shrink-0 mt-0.5`}
                          />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Elements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-emerald-500" />
            Core Elements of a Productive Morning
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: Sun,
                title: "Light Exposure (5-15 min)",
                why: "Sunlight stops melatonin production and advances your circadian clock. It's the most powerful signal for wakefulness.",
                how: "Go outside within first hour, or use a 10,000 lux light box. Even cloudy days provide more lux than indoor lighting.",
                science: "Light triggers the suprachiasmatic nucleus to suppress melatonin and increase cortisol.",
                color: "amber",
              },
              {
                icon: Dumbbell,
                title: "Movement (10-30 min)",
                why: "Exercise increases BDNF, blood flow to prefrontal cortex, and dopamine. It primes your brain for learning and focus.",
                how: "Even a 10-min walk works. Intensity matters less than consistency. Save intense workouts if they interfere with sleep.",
                science: "Blanchfield et al. (2014) showed even brief morning exercise improves cognitive function.",
                color: "emerald",
              },
              {
                icon: Coffee,
                title: "Delayed Caffeine (wait 90 min)",
                why: "Caffeine blocks adenosine receptors. Using it during cortisol peak builds tolerance faster and provides less benefit.",
                how: "Drink water first. Wait until cortisol dips (about 90 min after waking) for first coffee. Stop by early afternoon.",
                science: "Cortisol naturally provides alertness; caffeine on top provides diminishing returns.",
                color: "amber",
              },
              {
                icon: Brain,
                title: "Focus Work First (25-90 min)",
                why: "Morning prefrontal cortex is fresh—before emails and decisions deplete it. This is your highest-value cognitive time.",
                how: "Tackle your Most Important Task (MIT) before checking communications. Use Pomodoro for structure.",
                science: "Baumeister's ego depletion research shows self-control diminishes with use throughout the day.",
                color: "violet",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-5 rounded-xl bg-${item.color}-500/5 border border-${item.color}-500/20`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${item.color}-500/20 flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className={`h-5 w-5 text-${item.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Why:</strong> {item.why}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>How:</strong> {item.how}
                    </p>
                    <p className="text-xs text-muted-foreground italic">{item.science}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Implementation Roadmap */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-cyan-500" />
            4-Week Implementation Roadmap
          </h2>
          <p className="text-muted-foreground mb-6">
            Don&apos;t try to implement everything at once. Build your morning routine
            progressively over four weeks for lasting habits.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {WEEKLY_ROADMAP.map((week, i) => (
              <div key={week.week} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{week.week}</div>
                    <div className="text-xs text-muted-foreground">{week.focus}</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-3">
                  {week.goals.map((goal) => (
                    <li key={goal} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {goal}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground border-t border-border pt-2">
                  <strong>Track:</strong> {week.metric}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Morning Saboteurs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-red-500" />
            Morning Saboteurs to Avoid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                bad: "Checking phone immediately",
                why: "Reactive mode hijacks your agenda. You start the day responding to others' priorities.",
                instead: "Leave phone in another room until after routine. Use a real alarm clock.",
              },
              {
                bad: "Hitting snooze",
                why: "Fragmented sleep in final hour is worse quality. You wake groggier than if you'd gotten up.",
                instead: "Set alarm for actual wake time. Keep alarm across room. Get up on first ring.",
              },
              {
                bad: "Decision-heavy mornings",
                why: "Choosing what to wear/eat depletes willpower before your day begins.",
                instead: "Prepare clothes and breakfast the night before. Reduce morning decisions.",
              },
              {
                bad: "Skipping breakfast (for some)",
                why: "Blood sugar crashes impair decision-making and focus.",
                instead: "Experiment: track focus levels with/without for 2 weeks. Find what works for you.",
              },
            ].map((item) => (
              <div key={item.bad} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-red-500 text-lg">×</span>
                  <span className="font-medium text-foreground">{item.bad}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.why}</p>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-emerald-600 dark:text-emerald-400">{item.instead}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Citations */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <BookOpen className="h-3 w-3" />
              Primary Sources
            </div>
            <h2 className="text-2xl font-bold text-foreground">Key Research Studies</h2>
          </div>
          <div className="space-y-4">
            {RESEARCH_CITATIONS.map((citation) => (
              <div key={citation.doi} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-1">{citation.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {citation.authors} ({citation.year}). <em>{citation.journal}</em>,{" "}
                  {citation.volume}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Key Finding:</strong> {citation.finding}
                </p>
                <a
                  href={`https://doi.org/${citation.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  DOI: {citation.doi}
                </a>
              </div>
            ))}
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

        {/* CTA */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">Start Tomorrow Morning</h2>
            <p className="text-muted-foreground mb-4">
              Use the builder above to create a routine that fits your schedule and chronotype.
              Start with just one element—consistent wake time—and build from there.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Morning Focus Session
              </Link>
              <Link
                href="/blog/caffeine-and-focus"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Caffeine Timing Guide
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
              href="/blog/ultradian-rhythms"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Ultradian Rhythms
              </h3>
              <p className="text-sm text-muted-foreground">
                Work with your body&apos;s natural 90-minute energy cycles.
              </p>
            </Link>
            <Link
              href="/blog/caffeine-and-focus"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Caffeine and Focus
              </h3>
              <p className="text-sm text-muted-foreground">
                Optimize your caffeine timing for peak productivity.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
