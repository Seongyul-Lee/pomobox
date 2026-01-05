import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Timer,
  BarChart3,
  Music,
  Calendar,
  Zap,
  Shield,
  Wifi,
  Eye,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Heart,
  Github,
  Globe,
  Code2,
  Users,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"
import { ArticleMeta } from "@/components/ui/article-meta"

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

// Data
const FEATURES = [
  {
    icon: Timer,
    title: "Smart Focus Sessions",
    description: "Start a pomodoro in one click. Visual countdown keeps you on track. Customizable from 15-60 minutes.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: BarChart3,
    title: "Productivity Analytics",
    description: "See your focus trends: daily hours, weekly streaks, and peak performance times.",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: Music,
    title: "Focus-Enhancing Music",
    description: "Curated lo-fi and ambient tracks scientifically shown to improve concentration.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Calendar,
    title: "Progress Visualization",
    description: "Activity heatmap shows your focus history at a glance. Streaks motivate consistency.",
    gradient: "from-sky-500/20 to-cyan-500/20",
  },
]

const DIFFERENTIATORS = [
  {
    icon: Shield,
    title: "Open Source & Privacy First",
    description: "Your data stays yours. No tracking, no paywalls, no premium tiers. Our code is public—anyone can review it.",
  },
  {
    icon: BarChart3,
    title: "Statistics That Matter",
    description: "Most timer apps count seconds. Pomobox reveals productivity patterns: peak hours, weekly trends, long-term progress.",
  },
  {
    icon: Zap,
    title: "Built for Deep Work",
    description: "Curated focus music, activity calendars, customizable timers—everything a knowledge worker needs.",
  },
  {
    icon: Wifi,
    title: "Works Offline",
    description: "No internet? No problem. Pomobox works entirely offline with local data storage.",
  },
]

const FAQS = [
  {
    question: "Is Pomobox free? Will I have to pay later?",
    answer: "Pomobox is completely free, forever. There are no premium tiers, hidden fees, or ads. We're open-source—our code is public and anyone can review it.",
  },
  {
    question: "Do I need an account to use Pomobox?",
    answer: "No account required. Start using Pomobox immediately. Your data is stored locally on your device. If you want to sync across devices, you can optionally sign in (still free).",
  },
  {
    question: "How is Pomobox different from other apps?",
    answer: "Most timer apps offer basic counting. Pomobox combines the timer with meaningful statistics, ambient focus music, and an activity calendar—helping you understand your productivity patterns.",
  },
  {
    question: "Is my data secure?",
    answer: "Your data never leaves your device unless you enable cloud sync. We use local IndexedDB storage. No third-party tracking, no analytics, no ads.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes. All your statistics and session history can be exported. You own your data completely.",
  },
]

// JSON-LD Schema for AboutPage
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Pomobox",
  description: "Pomobox: Free, open-source Pomodoro timer with statistics, focus music & activity tracking.",
  url: `${siteUrl}/about`,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Pomobox",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  publisher: {
    "@type": "Organization",
    name: "Pomobox",
    url: siteUrl,
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.legal("About")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            <Sparkles className="h-3 w-3" />
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            About Pomobox
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Free, open-source productivity for everyone
          </p>
          <ArticleMeta
            publishedDate="2025-01-05"
            modifiedDate="2025-01-05"
          />
        </header>

        {/* What Makes Pomobox Different */}
        <section className="mb-16">
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-foreground mb-4">
              <span className="p-2 rounded-xl bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </span>
              What Makes Pomobox Different?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Most timer apps stop at counting down.</strong> Pomobox goes further—combining a beautiful timer with the tools you need to understand and improve your productivity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-xl bg-background/50 dark:bg-background/30 border border-border/30">
                  <div className="text-lg font-bold text-primary mb-1">100%</div>
                  <h3 className="font-medium text-foreground text-sm mb-1">Free & Open Source</h3>
                  <p className="text-xs text-muted-foreground">No premium tiers, no hidden features. Our code is public on GitHub.</p>
                </div>
                <div className="p-4 rounded-xl bg-background/50 dark:bg-background/30 border border-border/30">
                  <div className="text-lg font-bold text-primary mb-1">Local</div>
                  <h3 className="font-medium text-foreground text-sm mb-1">Privacy-First Design</h3>
                  <p className="text-xs text-muted-foreground">Your data stays on your device. No tracking, no analytics, no ads.</p>
                </div>
                <div className="p-4 rounded-xl bg-background/50 dark:bg-background/30 border border-border/30">
                  <div className="text-lg font-bold text-primary mb-1">Deep</div>
                  <h3 className="font-medium text-foreground text-sm mb-1">Meaningful Statistics</h3>
                  <p className="text-xs text-muted-foreground">See your peak hours, weekly trends, and long-term progress.</p>
                </div>
              </div>
              <p>
                Whether you're a student, developer, writer, or professional—Pomobox gives you the insights other apps don't.
                <strong className="text-foreground"> New to the Pomodoro Technique? <Link href="/guide/what-is-pomodoro" className="text-primary hover:underline">Read our complete guide</Link>.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Pomobox */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-3 w-3" />
              Why Choose Us
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Why Pomobox?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIFFERENTIATORS.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 md:p-6 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Globe className="h-3 w-3" />
              Features
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`p-5 md:p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-border/50 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="p-2.5 rounded-xl bg-background/80 dark:bg-background/50 w-fit mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Social Proof / Trust */}
        <section className="mb-16">
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <h2 className="text-center text-lg md:text-xl font-semibold text-foreground mb-8">
              Built for Focused Workers
            </h2>
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">Free</div>
                <p className="text-xs text-muted-foreground">Forever, No Ads</p>
              </div>
              <div className="text-center border-x border-primary/20">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">Open</div>
                <p className="text-xs text-muted-foreground">Full Transparency</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">Private</div>
                <p className="text-xs text-muted-foreground">Your Data, Yours</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4 text-emerald-500" />
                <span>No Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span>No Data Selling</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi className="h-4 w-4 text-emerald-500" />
                <span>Works Offline</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Common Questions
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

        {/* CTA */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Try It Free (No Sign-Up)
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start your first pomodoro right now. No email, no account, no commitment. Your data stays private on your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Timer className="h-5 w-5" />
                Start Your First Session
              </Link>
              <Link
                href="/guide/what-is-pomodoro"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border/50 hover:border-primary/50 text-foreground font-medium transition-colors"
              >
                Read Pomodoro Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Made with Love */}
        <div className="text-center py-6 text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-rose-500" /> for focused workers everywhere
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Pomobox
          </Link>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
