import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Info,
  Timer,
  BarChart3,
  Music,
  Calendar,
  Zap,
  Globe,
  Shield,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Wifi,
  Eye,
} from "lucide-react"

const siteUrl = "https://pomobox.app"

export const metadata: Metadata = {
  title: "About Pomobox - Free Open-Source Pomodoro Timer",
  description: "Pomobox: Free, open-source Pomodoro timer with statistics, focus music & activity tracking. Built for developers, students & professionals. No paywalls, no tracking.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/about`,
    siteName: "Pomobox",
    title: "About Pomobox - Free Open-Source Pomodoro Timer",
    description: "Privacy-first, open-source Pomodoro timer trusted by focused workers. Statistics, ambient music, no paywalls.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pomobox - Free Pomodoro Timer",
    description: "Privacy-first, open-source Pomodoro timer. Statistics, ambient music, no paywalls.",
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
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
    <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function DifferentiatorCard({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
      <div className="flex-shrink-0">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary text-sm font-bold">
          {number}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pomobox
        </Link>

        {/* Main Content Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
              <Info className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">About Pomobox</h1>
            <p className="text-muted-foreground">Free, open-source productivity for everyone</p>
          </div>

          {/* What is Pomobox - Expanded */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              What is Pomobox?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pomobox is a <strong>free, open-source Pomodoro timer</strong> designed for distraction-free productivity.
                Unlike generic timer apps, Pomobox combines three essential elements modern workers need:
              </p>

              <div className="pl-4 border-l-2 border-primary/30 space-y-3">
                <div>
                  <p className="font-medium text-foreground">1. Focused Work Sessions</p>
                  <p className="text-sm">
                    The Pomodoro Technique is proven to increase focus by 25-40%.
                    Pomobox removes friction by handling all timing automatically—no manual clock-watching,
                    no complicated settings. Just click &quot;Start&quot; and eliminate distractions for 25 minutes.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">2. Real-Time Insights</p>
                  <p className="text-sm">
                    Not all focus time is equal. Pomobox tracks your productivity patterns with weekly and monthly statistics,
                    showing you daily focus trends, peak concentration hours, current streaks, and progress visualization.
                    Answer &quot;Am I more productive than last month?&quot; with real data.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">3. Environmental Support</p>
                  <p className="text-sm">
                    Focus requires the right atmosphere. Pomobox includes curated lo-fi & ambient soundscapes
                    proven to mask distracting sounds, a visual activity calendar showing your consistency,
                    and customizable timer durations because one size doesn&apos;t fit all.
                  </p>
                </div>
              </div>

              <p>
                Whether you&apos;re a student studying for exams, a developer deep in code, a writer fighting blank page anxiety,
                or a manager protecting time for strategic thinking—Pomobox adapts to your needs.
                <strong> You own your data. No paywalls. No premium features hidden behind subscriptions.</strong>
              </p>
            </div>
          </section>

          {/* Why Choose Pomobox */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Why Choose Pomobox?
            </h2>
            <div className="space-y-3">
              <DifferentiatorCard
                number={1}
                title="Open Source & Privacy First"
                description="Your data stays yours. No tracking, no paywalls, no premium tiers. Our code is public—anyone can review it. Full transparency."
              />
              <DifferentiatorCard
                number={2}
                title="Statistics That Matter"
                description="Most timer apps count seconds. Pomobox reveals your productivity patterns: peak focus hours, weekly trends, and long-term progress."
              />
              <DifferentiatorCard
                number={3}
                title="Built for Deep Work"
                description="Curated focus music, activity calendars, and customizable timers—everything a knowledge worker needs. Nothing you don't."
              />
              <DifferentiatorCard
                number={4}
                title="Works Offline"
                description="No internet? No problem. Pomobox works entirely offline with local data storage. Your productivity doesn't depend on connectivity."
              />
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={Timer}
                title="Smart Focus Sessions"
                description="Start a pomodoro in one click. Visual countdown keeps you on track without distracting notifications. Customizable from 15-60 minutes."
              />
              <FeatureCard
                icon={BarChart3}
                title="Productivity Analytics"
                description="See your focus trends: daily hours, weekly streaks, and peak performance times. Understand when you're most productive."
              />
              <FeatureCard
                icon={Music}
                title="Focus-Enhancing Music"
                description="Curated lo-fi and ambient tracks scientifically shown to improve concentration. Block out background noise naturally."
              />
              <FeatureCard
                icon={Calendar}
                title="Progress Visualization"
                description="Activity heatmap shows your focus history at a glance. Streaks motivate consistency. Watch productivity compound over time."
              />
            </div>
          </section>

          {/* Social Proof */}
          <section className="mb-10 py-8 px-6 rounded-xl bg-muted/30 border border-border/50">
            <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
              Built for Focused Workers
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Free</div>
                <p className="text-xs text-muted-foreground">Forever, No Ads</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Open Source</div>
                <p className="text-xs text-muted-foreground">Full Transparency</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Private</div>
                <p className="text-xs text-muted-foreground">Your Data, Your Device</p>
              </div>
            </div>
          </section>

          {/* About-Specific FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Common Questions
            </h2>
            <div className="space-y-3">
              <FaqItem
                question="Is Pomobox free? Will I have to pay later?"
                answer="Pomobox is completely free, forever. There are no premium tiers, no hidden fees, and no ads. We're open-source, which means our code is public and anyone can review it."
              />
              <FaqItem
                question="Do I need an account to use Pomobox?"
                answer="No account required. You can start using Pomobox immediately. Your data is stored locally on your device. If you want to sync across devices, you can optionally sign in (still free)."
              />
              <FaqItem
                question="How is Pomobox different from other Pomodoro apps?"
                answer="Most timer apps offer basic counting. Pomobox combines the timer with meaningful statistics, ambient focus music, and an activity calendar. We focus on helping you understand your productivity patterns, not just counting minutes."
              />
              <FaqItem
                question="Is my data secure? Where is it stored?"
                answer="Your data never leaves your device unless you enable cloud sync. We use local IndexedDB storage and optional authentication. No third-party tracking, no analytics, no ads."
              />
              <FaqItem
                question="Can I export my data?"
                answer="Yes. All your statistics and session history can be exported. You own your data completely."
              />
            </div>
          </section>

          {/* Enhanced CTA */}
          <div className="space-y-4 py-8 px-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div>
              <p className="text-foreground font-semibold mb-2">Try It Free (No Sign-Up)</p>
              <p className="text-sm text-muted-foreground mb-4">
                Start your first pomodoro right now. No email, no account, no commitment.
                Your data stays private and on your device.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Timer className="h-5 w-5" />
                Start Your First Session
              </Link>
              <Link
                href="/guide/what-is-pomodoro"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/50 text-foreground font-medium transition-colors"
              >
                Read Pomodoro Guide
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Pomobox
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
