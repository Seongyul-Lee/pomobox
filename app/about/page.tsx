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
} from "lucide-react"

const siteUrl = "https://pomobox.app"

export const metadata: Metadata = {
  title: "About Pomobox",
  description: "Learn more about Pomobox - a free online Pomodoro timer for focused work",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/about`,
    siteName: "Pomobox",
    title: "About Pomobox",
    description: "Learn more about Pomobox - a free online Pomodoro timer for focused work",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pomobox",
    description: "Learn more about Pomobox - a free online Pomodoro timer for focused work",
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
            <p className="text-muted-foreground">Your productivity companion</p>
          </div>

          {/* What is Pomobox */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              What is Pomobox?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pomobox is a free, open-source Pomodoro timer designed to help you stay focused and productive. Built with simplicity in mind, it provides everything you need to implement the Pomodoro Technique without distractions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're studying, working, or tackling creative projects, Pomobox helps you maintain focus through structured work sessions and refreshing breaks.
            </p>
          </section>

          {/* Features */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={Timer}
                title="Pomodoro Timer"
                description="Customizable focus and break durations with visual progress tracking"
              />
              <FeatureCard
                icon={BarChart3}
                title="Statistics"
                description="Track your daily, weekly, and monthly focus time with detailed insights"
              />
              <FeatureCard
                icon={Music}
                title="Background Music"
                description="Lo-fi and ambient sounds to help you concentrate"
              />
              <FeatureCard
                icon={Calendar}
                title="Activity Calendar"
                description="Visualize your productivity patterns and maintain streaks"
              />
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-6 px-4 rounded-xl bg-primary/5">
            <p className="text-foreground font-medium mb-4">Ready to boost your productivity?</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Timer className="h-5 w-5" />
              Start Timer
            </Link>
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
