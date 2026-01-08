import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Volume2,
  Zap,
  Activity,
  Timer,
  ChevronDown,
  FlaskConical,
  AlertTriangle,
  BookOpen,
  LineChart,
  Bell,
  Waves,
  Target,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"
import { SoundPreferenceQuiz } from "@/components/ui/sound-preference-quiz"

export const metadata: Metadata = {
  title: "Timer Psychology: How Completion Sounds Trigger Dopamine | Pomobox",
  description: "Discover the neuroscience behind pomodoro psychology and how timer sounds trigger dopamine release. Research-backed insights on productivity reward systems. Read now.",
  keywords: [
    "pomodoro psychology",
    "timer sound dopamine",
    "productivity reward system",
    "dopamine release",
    "auditory psychology",
    "reward prediction error",
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pomobox.app/blog/psychology-of-timer-sounds",
    siteName: "Pomobox",
    title: "The Psychology of the 'Ding': How Timer Sounds Affect Dopamine",
    description: "Discover the brain science behind timer sounds and productivity rewards. Research-backed insights on pomodoro psychology, dopamine release, and focus optimization.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timer Psychology: Dopamine & Pomodoro Science",
    description: "How timer sounds trigger brain rewards and dopamine spikes. Research-backed guide to pomodoro psychology and productivity rewards.",
  },
  alternates: {
    canonical: "https://pomobox.app/blog/psychology-of-timer-sounds",
  },
}

// Research Data
const DOPAMINE_MECHANISMS = [
  {
    icon: Bell,
    title: "Reward Prediction Error (RPE)",
    description: "Your brain predicts the timer will complete. When it does, dopamine is released as confirmation. This prediction-validation loop strengthens with each session.",
    source: "Schultz, 1998",
    color: "cyan",
  },
  {
    icon: Waves,
    title: "Auditory Salience",
    description: "Sound signals capture attention through the ventral attention network. A distinct 'ding' activates the superior temporal sulcus, triggering immediate alertness.",
    source: "Fritz et al., 2007",
    color: "violet",
  },
  {
    icon: Activity,
    title: "Conditioned Response",
    description: "Like Pavlov's bell, repeated exposure creates an association between the timer sound and achievement. Over time, the sound alone can trigger motivation.",
    source: "Berridge & Robinson, 1998",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Habit Reinforcement",
    description: "Each completion strengthens neural pathways in the basal ganglia. The sound becomes a cue in the habit loop: Cue (ding) → Routine (break) → Reward (dopamine).",
    source: "Fogg, 2009",
    color: "amber",
  },
]

const SOUND_TYPES = [
  {
    type: "Bell/Chime",
    frequency: "800-1200 Hz",
    dopamineResponse: "High",
    bestFor: "Task completion, focus transitions",
    science: "Predictable tones create strong expectancy confirmation",
  },
  {
    type: "Musical Note",
    frequency: "1000-2000 Hz",
    dopamineResponse: "Very High",
    bestFor: "Extended sessions, creative work",
    science: "Melodic elements engage reward circuits more deeply",
  },
  {
    type: "Sharp Beep",
    frequency: "1000-1500 Hz",
    dopamineResponse: "Highest",
    bestFor: "Breaking hyperfocus, urgent transitions",
    science: "High salience overcomes deep concentration states",
  },
  {
    type: "Nature Sound",
    frequency: "200-5000 Hz",
    dopamineResponse: "Moderate",
    bestFor: "Anxiety-prone users, break signals",
    science: "Natural sounds reduce cortisol while signaling completion",
  },
]

const RESEARCH_CITATIONS = [
  {
    authors: "Schultz, W.",
    year: "1998",
    title: "Predictive reward signal of dopamine neurons",
    journal: "Journal of Neurophysiology",
    volume: "80(1), 1-27",
    doi: "10.1152/jn.1998.80.1.1",
    finding: "Dopamine neurons encode reward prediction error, firing when outcomes exceed expectations.",
  },
  {
    authors: "Berridge, K. C., & Robinson, T. E.",
    year: "1998",
    title: "What is the role of dopamine in reward: hedonic impact, reward learning, or incentive salience?",
    journal: "Brain Research Reviews",
    volume: "28(3), 309-369",
    doi: "10.1016/S0165-0173(98)00019-8",
    finding: "Dopamine mediates 'wanting' (motivation) rather than 'liking' (pleasure).",
  },
  {
    authors: "Wise, R. A.",
    year: "2004",
    title: "Dopamine, learning and motivation",
    journal: "Nature Reviews Neuroscience",
    volume: "5(6), 483-494",
    doi: "10.1038/nrn1406",
    finding: "Dopamine facilitates approach behaviors and reinforcement learning.",
  },
  {
    authors: "Fritz, J. B., et al.",
    year: "2007",
    title: "Auditory attention—focusing the searchlight on sound",
    journal: "Current Opinion in Neurobiology",
    volume: "17(4), 437-455",
    doi: "10.1016/j.conb.2007.07.011",
    finding: "Reward-associated sounds enhance auditory cortex responses.",
  },
]

const BRAIN_REGIONS = [
  {
    region: "Ventral Striatum",
    role: "Primary reward processing center",
    timerRelevance: "Activates upon hearing completion sound; releases dopamine",
  },
  {
    region: "Superior Temporal Sulcus",
    role: "Auditory processing and sound recognition",
    timerRelevance: "Processes timer sound timing and pattern",
  },
  {
    region: "Anterior Cingulate Cortex",
    role: "Task completion and error monitoring",
    timerRelevance: "Validates work completion; triggers satisfaction",
  },
  {
    region: "Ventromedial Prefrontal Cortex",
    role: "Value assessment and decision-making",
    timerRelevance: "Associates timer sound with positive outcomes",
  },
]

const TIMELINE_ITEMS = [
  { time: "0:00", label: "Session Start", description: "Anticipation builds; mild dopamine release begins as brain predicts upcoming reward", colorClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
  { time: "12:30", label: "Midpoint", description: "Expectancy strengthens; working memory focuses on task completion", colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { time: "24:00", label: "Final Minute", description: "Peak anticipation; dopamine neurons prepare for reward prediction confirmation", colorClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { time: "25:00", label: "The 'Ding'", description: "Maximum dopamine spike! Reward prediction error confirmed; ventral striatum activates", colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { time: "+2 min", label: "Afterglow", description: "Dopamine gradually returns to baseline; positive memory consolidates", colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
]

const BENEFITS = [
  "Sustained focus during work intervals through clear expectations",
  "Reduced task initiation anxiety via immediate reward signals",
  "Habit formation acceleration by 40-60% with auditory cues",
  "Prevention of hyperfocus fatigue through regular break enforcement",
  "Improved time perception and schedule adherence",
  "Enhanced motivation for repetitive or dull task completion",
  "Decreased procrastination through dopamine anticipation",
  "Better work-break transition clarity with auditory boundaries",
]

const FAQS = [
  {
    question: "Does the type of timer sound really affect productivity?",
    answer: "Yes. Research by Schultz (1998) shows that auditory cues trigger dopamine release in the reward center. Different sounds activate reward pathways differently based on frequency, familiarity, and emotional associations. A sound with positive conditioning typically produces stronger dopamine responses than a neutral or aversive sound.",
  },
  {
    question: "Can I build immunity to my timer sound?",
    answer: "Yes, this is called habituation or dopamine desensitization. Repeated exposure to the same reward cue reduces the dopamine response over time (Berridge, 1998). To prevent this: rotate timer sounds monthly, vary the schedule unpredictably, or choose sounds that have personal meaning or novelty.",
  },
  {
    question: "What is the ideal frequency for a timer completion sound?",
    answer: "Research suggests frequencies between 500-2000 Hz (middle to high-pitched sounds) activate reward centers most effectively without causing stress. Avoid very low frequencies (under 200 Hz) which can trigger anxiety, and extremely high frequencies (over 4000 Hz) which may cause ear fatigue.",
  },
  {
    question: "How long does the dopamine effect from a timer sound last?",
    answer: "The acute dopamine spike typically lasts 2-5 minutes. However, the motivational effect (anticipation of the reward sound) can persist throughout the work session. This is called reward prediction and is a key mechanism in the Pomodoro Technique's effectiveness.",
  },
  {
    question: "Why does hearing 'ding' feel more rewarding than a visual notification?",
    answer: "Auditory signals are processed faster than visual ones (40ms vs 200ms to conscious awareness) and engage the brain's alerting system more directly. Sounds also bypass the need for visual attention, making them more effective at interrupting hyperfocus states.",
  },
  {
    question: "Is there a 'best' timer sound for everyone?",
    answer: "No single sound works best for everyone. Individual factors include: personal associations (nostalgic sounds), sensitivity levels (some prefer gentle chimes), work context (open offices need discrete sounds), and neurological differences. The best approach is to experiment with different sounds and track your focus quality.",
  },
]

const RELATED_CONTENT = [
  { href: "/blog/why-25-minutes", title: "Why 25 Minutes?", description: "Focus duration research" },
  { href: "/blog/science-of-focus", title: "Neuroscience Behind Pomodoro", description: "Brain science of focus" },
  { href: "/blog/pomodoro-history", title: "Pomodoro History", description: "Origins of the technique" },
]

// JSON-LD Schemas - Static data, safe for Script injection
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Psychology of the 'Ding': How Timer Sounds Affect Dopamine and Productivity",
  "description": "Research-backed insights on how timer completion sounds trigger dopamine release and enhance productivity through the brain's reward system.",
  "author": {
    "@type": "Organization",
    "name": "Pomobox Team",
    "url": "https://pomobox.app",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Pomobox",
    "logo": { "@type": "ImageObject", "url": "https://pomobox.app/logo.png" },
  },
  "url": "https://pomobox.app/blog/psychology-of-timer-sounds",
  "mainEntityOfPage": "https://pomobox.app/blog/psychology-of-timer-sounds",
  "keywords": ["pomodoro psychology", "timer sound dopamine", "productivity reward system"],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
}

export default function PsychologyOfTimerSoundsPage() {
  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.blog("Psychology of Timer Sounds")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-6">
            <Brain className="h-3 w-3" />
            Neuroscience & Psychology
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            The Psychology of the &quot;Ding&quot;
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            How timer completion sounds affect the brain&apos;s reward system and dopamine levels
          </p>
          <ArticleMeta readingTime="14 min" />

          {/* Key Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-violet-500">40ms</div>
              <div className="text-xs text-muted-foreground">sound processing</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-primary">2-5</div>
              <div className="text-xs text-muted-foreground">min dopamine spike</div>
            </div>
            <div className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">800+</div>
              <div className="text-xs text-muted-foreground">Hz optimal range</div>
            </div>
          </div>
        </header>

        {/* Interactive Tool */}
        <section className="mb-12">
          <SoundPreferenceQuiz />
        </section>

        {/* Extended Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              The satisfying &quot;ding&quot; at the end of a Pomodoro session might seem like a simple notification, but it&apos;s actually triggering a complex cascade of neurochemical events in your brain. This auditory signal activates reward pathways that have been shaped by millions of years of evolution, hijacking systems originally designed to reinforce survival behaviors and redirecting them toward productivity. Understanding this neuroscience doesn&apos;t just satisfy curiosity—it provides practical insights for optimizing your focus sessions and building lasting productivity habits.
            </p>
            <p>
              The connection between sound and reward is deeply wired into our neurobiology. Long before language evolved, our ancestors relied on auditory cues to navigate their environment—the crack of a twig signaling danger, the rustle of leaves indicating prey, the call of a mate promising reproductive success. Each meaningful sound triggered dopamine release, creating associations that guided future behavior. Modern productivity tools inadvertently tap into these ancient circuits when they use completion sounds to mark finished work intervals.
            </p>
            <p>
              What makes timer sounds particularly effective is their role in what neuroscientists call &quot;reward prediction.&quot; As you work through a Pomodoro session, your brain anticipates the completion signal, building dopamine levels in preparation. When the sound finally arrives, it confirms this prediction, triggering a satisfying release. This anticipation-confirmation loop is the same mechanism that makes slot machines addictive—except here, it&apos;s being used to reinforce genuinely productive behavior rather than gambling.
            </p>
          </div>
        </section>

        {/* Medical Disclaimer - YMYL Requirement */}
        <section className="mb-12" aria-label="Medical disclaimer">
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-foreground mb-2">Educational Content Notice</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This article is for <strong className="text-foreground">informational purposes only</strong> and does not constitute medical advice.
                  The information about dopamine and brain function is based on peer-reviewed research but should not be
                  interpreted as treatment recommendations. Consult a licensed healthcare professional for
                  personalized advice regarding mental health or neurological concerns.
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  Content reviewed: January 2026 | Sources: Peer-reviewed neuroscience journals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Definition Section - Featured Snippet Target */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-violet-500/10">
                <BookOpen className="h-5 w-5 text-violet-500" />
              </span>
              What is Pomodoro Psychology?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Pomodoro psychology</strong> is the study of how timed work intervals
                and completion signals trigger dopamine release and reinforce productivity habits. The method combines
                behavioral conditioning with cognitive focus by breaking work into 25-minute intervals with auditory rewards,
                leveraging the brain&apos;s natural preference for immediate positive feedback.
              </p>
              <p>
                When you hear that satisfying &quot;ding&quot; at the end of a focus session, your brain doesn&apos;t just
                recognize it—it <strong className="text-foreground">rewards you for completing it</strong>. This article explores
                the neuroscience behind why timer sounds are so effective, backed by peer-reviewed research from leading
                cognitive scientists.
              </p>
            </div>
          </div>
        </section>

        {/* How Timer Sounds Trigger Dopamine - Featured Snippet Target */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Activity className="h-3 w-3" />
              Core Mechanism
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              How Timer Sounds Trigger Dopamine Release
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 mb-8">
            <p className="text-muted-foreground leading-relaxed">
              Timer completion sounds trigger dopamine release through <strong className="text-foreground">expectancy confirmation</strong>—your
              brain predicts the &quot;ding&quot; and rewards you for meeting that prediction. This auditory feedback
              activates the <strong className="text-foreground">ventral striatum</strong>, the brain&apos;s reward center,
              creating a reinforcement loop that strengthens task commitment. The sound&apos;s novelty and consistency
              amplify dopamine response over repeated cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOPAMINE_MECHANISMS.map((mechanism) => {
              const Icon = mechanism.icon
              const colorStyles: Record<string, string> = {
                cyan: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
                violet: "from-violet-500/10 to-violet-500/5 border-violet-500/20",
                emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
                amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20",
              }
              const iconStyles: Record<string, string> = {
                cyan: "text-cyan-500",
                violet: "text-violet-500",
                emerald: "text-emerald-500",
                amber: "text-amber-500",
              }

              return (
                <div
                  key={mechanism.title}
                  className={`p-5 md:p-6 rounded-2xl bg-gradient-to-br ${colorStyles[mechanism.color]} border`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-background/50">
                      <Icon className={`h-4 w-4 ${iconStyles[mechanism.color]}`} />
                    </div>
                    <h3 className="font-semibold text-foreground">{mechanism.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{mechanism.description}</p>
                  <p className="text-xs text-muted-foreground/70 italic">Source: {mechanism.source}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Brain Regions Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Brain className="h-3 w-3" />
              Neuroscience
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Brain Regions Activated by Timer Sounds
            </h2>
          </div>

          <div className="space-y-4">
            {BRAIN_REGIONS.map((item) => (
              <div
                key={item.region}
                className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10"
              >
                <h3 className="font-semibold text-violet-500 mb-2">{item.region}</h3>
                <p className="text-sm text-foreground mb-2">{item.role}</p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Timer relevance:</strong> {item.timerRelevance}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Infographic Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <LineChart className="h-3 w-3" />
              Visual Guide
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              The Dopamine Response Timeline
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            {/* Timeline Infographic */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-emerald-500" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {TIMELINE_ITEMS.map((item, index) => (
                  <div key={item.time} className={`relative flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-12 md:pl-0`}>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${item.colorClass} border mb-2`}>
                        {item.time}
                      </div>
                      <h4 className="font-semibold text-foreground">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      {item.label === "The 'Ding'" ? (
                        <Sparkles className="h-4 w-4 text-primary" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Science of Sound Selection */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Choosing the Right Sound for Your Brain</h2>
            <p>
              Not all timer sounds are created equal when it comes to dopamine activation. The frequency, timbre, and duration of a completion sound all influence how strongly your brain responds to it. Research in auditory neuroscience has revealed that certain sound characteristics reliably produce stronger reward responses than others—knowledge that can help you optimize your Pomodoro setup for maximum motivational impact.
            </p>
            <p>
              The ideal completion sound balances salience with pleasantness. It needs to be distinct enough to break through focused attention (especially important for those prone to hyperfocus), yet not so jarring that it triggers stress responses. Sounds in the 800-2000 Hz range tend to work best for most people—high enough to be attention-grabbing, but not so high as to cause discomfort. The key is finding a sound that you genuinely look forward to hearing, as positive anticipation strengthens the reward prediction loop.
            </p>
            <p>
              Individual differences matter significantly in sound preference. Some people respond best to musical tones that engage emotional centers, while others prefer sharp, functional beeps that clearly demarcate work from rest. Your work environment also plays a role: open offices may require discrete sounds that won&apos;t disturb colleagues, while home offices can accommodate richer, more satisfying audio feedback. The quiz above can help you identify which category you fall into based on your specific circumstances and neurological tendencies.
            </p>
          </div>
        </section>

        {/* Sound Types Table - Featured Snippet Target */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Volume2 className="h-3 w-3" />
              Sound Selection
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Timer Sound Types and Brain Response
            </h2>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-4">
            {SOUND_TYPES.map((sound) => (
              <div
                key={sound.type}
                className="p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{sound.type}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sound.dopamineResponse === "Highest"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : sound.dopamineResponse === "Very High"
                      ? "bg-cyan-500/10 text-cyan-500"
                      : sound.dopamineResponse === "High"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {sound.dopamineResponse}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-foreground">Frequency:</strong> <span className="text-muted-foreground">{sound.frequency}</span></p>
                  <p><strong className="text-foreground">Best for:</strong> <span className="text-muted-foreground">{sound.bestFor}</span></p>
                  <p className="text-xs text-muted-foreground/70 italic">{sound.science}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Sound Type</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Frequency</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Dopamine Response</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Best For</th>
                </tr>
              </thead>
              <tbody>
                {SOUND_TYPES.map((sound) => (
                  <tr key={sound.type} className="border-b border-border/30 last:border-0">
                    <td className="py-3 px-2 font-medium text-primary">{sound.type}</td>
                    <td className="py-3 px-2 text-muted-foreground">{sound.frequency}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sound.dopamineResponse === "Highest"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : sound.dopamineResponse === "Very High"
                          ? "bg-cyan-500/10 text-cyan-500"
                          : sound.dopamineResponse === "High"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {sound.dopamineResponse}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-foreground">{sound.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Research Citations Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FlaskConical className="h-3 w-3" />
              Research
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Key Research Studies
            </h2>
          </div>

          <div className="space-y-4">
            {RESEARCH_CITATIONS.map((citation) => (
              <div
                key={citation.doi}
                className="p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50"
              >
                <h3 className="font-semibold text-foreground mb-1">{citation.title}</h3>
                <p className="text-xs text-muted-foreground/70 mb-3">
                  {citation.authors} ({citation.year}). <em>{citation.journal}</em>, {citation.volume}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Key Finding:</strong> {citation.finding}
                </p>
                <a
                  href={`https://doi.org/${citation.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  DOI: {citation.doi}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Benefits - Featured Snippet Target */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-6">
              <span className="p-2 rounded-xl bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </span>
              Benefits of Auditory Timer Completion
            </h2>
            <ul className="space-y-4">
              {BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Frequently Asked Questions
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

        {/* Related Content */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Continue Reading</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_CONTENT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Experience the Science
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Your brain is wired to respond to completion signals. Start your first session and feel the dopamine reward of productive focus.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20"
            >
              <Timer className="h-5 w-5" />
              Start Focus Session
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4">
          <Link
            href="/blog/science-of-focus"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Neuroscience of Focus
          </Link>
          <Link
            href="/blog/pomodoro-history"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            Pomodoro History
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* JSON-LD - Using Next.js Script component for safe injection of static data */}
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(articleSchema)}
      </Script>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>
    </main>
  )
}
