import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  HelpCircle,
  Timer,
  Settings,
  Cloud,
  Smartphone,
  Shield,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Wifi,
  Database,
  Globe,
  Bell,
  BarChart3,
  Calendar,
  Music,
  Monitor,
  Lock,
  Download,
  Zap,
  Brain,
  Target,
  Clock,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Pomobox FAQ: Features, Privacy & Productivity Tips | Pomobox",
  description: "Frequently asked questions about Pomobox: features, offline use, privacy, sync, statistics, and productivity tips. Find answers now.",
  keywords: ["pomobox faq", "pomodoro timer app help", "pomobox features", "productivity questions", "focus timer faq", "pomobox help"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pomobox.app/faq",
    siteName: "Pomobox",
    title: "Pomobox FAQ: App Features & Productivity Questions",
    description: "Get answers about Pomobox features, offline use, data privacy, and productivity tips.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomobox FAQ | Help & Support",
    description: "Frequently asked questions about the Pomobox Pomodoro timer app.",
  },
  alternates: {
    canonical: "https://pomobox.app/faq",
  },
}

// Data - organized by category
const FAQ_CATEGORIES = [
  {
    id: "app-features",
    icon: Settings,
    title: "App Features",
    color: "primary",
    faqs: [
      {
        question: "What features does Pomobox include?",
        answer: "Pomobox includes: customizable focus/break timers (15-60 min), detailed productivity statistics, activity heatmap calendar, focus-enhancing BGM (lo-fi, ambient, nature sounds), daily goals tracking, and beautiful dark/light themes. All features are free.",
      },
      {
        question: "Can I customize the timer duration?",
        answer: "Yes! Access Settings (gear icon) to adjust: Focus duration (15-60 min), Short break (3-15 min), Long break (15-30 min), and sessions before long break (2-6). Changes apply to your next session.",
      },
      {
        question: "How does the BGM feature work?",
        answer: "Click the music icon to open the BGM panel. Choose from curated tracks (lo-fi, ambient, nature sounds). Adjust volume, skip tracks, or enable shuffle. BGM plays during focus sessions and pauses during breaks by default.",
      },
      {
        question: "What statistics does Pomobox track?",
        answer: "Pomobox tracks: total focus hours, completed pomodoros, current streak, longest streak, daily/weekly/monthly trends, peak productivity hours, and session completion rate. View detailed stats on the Statistics page.",
      },
      {
        question: "How do daily goals work?",
        answer: "Set a daily pomodoro goal in Settings (default: 8 sessions). The progress ring shows completion. Hit your goal to maintain your streak. Goals reset at midnight local time.",
      },
      {
        question: "Can I see my focus history?",
        answer: "Yes! The calendar heatmap shows your activity history. Darker colors = more focus time that day. Click any day to see details. Your streak counter shows consecutive days meeting your daily goal.",
      },
    ],
  },
  {
    id: "technical",
    icon: Monitor,
    title: "Technical & Data",
    color: "cyan",
    faqs: [
      {
        question: "Does Pomobox work offline?",
        answer: "Yes! Pomobox is a Progressive Web App (PWA). Once loaded, the timer, BGM, and core features work without internet. Statistics sync when you're back online. You can even install it as a standalone app.",
      },
      {
        question: "Where is my data stored?",
        answer: "By default, data is stored locally in your browser using IndexedDB. This means your data stays on YOUR device—we can't see it. If you create an account, you can optionally sync across devices.",
      },
      {
        question: "Is my data private?",
        answer: "Absolutely. Local-only mode means zero data leaves your device. We don't track your sessions, focus time, or any personal information. If you enable sync, data is encrypted and only you can access it.",
      },
      {
        question: "Which browsers are supported?",
        answer: "Pomobox works on all modern browsers: Chrome, Firefox, Safari, Edge (latest versions). For the best experience, we recommend Chrome or Firefox. Some older browsers may have limited functionality.",
      },
      {
        question: "Can I install Pomobox as an app?",
        answer: "Yes! On supported browsers, look for the 'Install' option in the address bar or menu. This creates a standalone app with its own window—no browser tabs, full-screen focus experience.",
      },
      {
        question: "Will I lose data if I clear my browser?",
        answer: "If using local-only storage, clearing browser data will erase your statistics. To protect your data: 1) Create an account to enable cloud sync, or 2) Export your data regularly (Settings > Export Data).",
      },
      {
        question: "How does cross-device sync work?",
        answer: "Create a free account, then enable sync in Settings. Your statistics, settings, and tasks sync across all devices logged into your account. Changes sync automatically when online.",
      },
    ],
  },
  {
    id: "productivity",
    icon: Zap,
    title: "Productivity Tips",
    color: "emerald",
    faqs: [
      {
        question: "How many pomodoros should I aim for daily?",
        answer: "Most people find 8-12 pomodoros (4-6 focused hours) sustainable. Quality matters more than quantity. Start with 6 and adjust based on your energy and workload. Track your stats to find your optimal number.",
      },
      {
        question: "What's the best way to handle interruptions?",
        answer: "For minor interruptions: note them on paper and continue. For urgent ones: pause or void the pomodoro, handle it, then restart fresh. The key is not trying to 'resume' mid-session—either complete it or start over.",
      },
      {
        question: "Should I take breaks even if I'm 'in flow'?",
        answer: "This is debated! Purists say always take breaks. Pragmatically: if you're deep in productive flow, extend by 5-10 minutes, then take a proper break. Don't skip breaks entirely—just be flexible.",
      },
      {
        question: "What should I do during breaks?",
        answer: "Best break activities: stand up, stretch, walk around, hydrate, look at distant objects (rest your eyes). Avoid: social media, email, news—these don't rest your brain. The goal is genuine mental recovery.",
      },
      {
        question: "How do I stay motivated with Pomodoro?",
        answer: "Focus on streaks and stats—watching your numbers grow is motivating. Set realistic daily goals. Use the timer's completion sound as a reward signal. Pair sessions with enjoyable BGM. Celebrate milestones.",
      },
      {
        question: "Can Pomodoro work for creative tasks?",
        answer: "Yes, with adaptation. Creative work often needs longer sessions (40-50 min). Use pomodoros for 'execution' phases (writing, designing). For 'ideation,' free-form exploration might work better. Experiment!",
      },
      {
        question: "What if 25 minutes feels too short or too long?",
        answer: "The 25-minute default isn't sacred. Try: 45-50 min for deep work (coding, writing), 15-20 min for difficult tasks or low energy, 30 min as a middle ground. Find what works for YOUR attention span.",
      },
      {
        question: "How long until I see productivity improvements?",
        answer: "Most people notice immediate benefits in focus quality. Measurable improvements in output typically appear after 1-2 weeks of consistent use. Habit formation takes 3-8 weeks. Trust the process.",
      },
    ],
  },
  {
    id: "account",
    icon: Shield,
    title: "Account & Support",
    color: "violet",
    faqs: [
      {
        question: "Do I need an account to use Pomobox?",
        answer: "No! Pomobox works fully without an account. All features are free. An account is only needed if you want to sync data across devices or save your data to the cloud as backup.",
      },
      {
        question: "Is Pomobox really free?",
        answer: "Yes, 100% free with all features included. No premium tiers, no feature locks, no ads. We believe productivity tools should be accessible to everyone. The project is open source.",
      },
      {
        question: "Is Pomobox open source?",
        answer: "Yes! Pomobox is open source. You can view the code, contribute, or even self-host. Check our GitHub repository for details. Community contributions are welcome.",
      },
      {
        question: "How do I report a bug or request a feature?",
        answer: "We welcome feedback! Report bugs or request features through our GitHub Issues page. Be as specific as possible—include browser, OS, and steps to reproduce for bugs. We review all submissions.",
      },
      {
        question: "How can I support the project?",
        answer: "The best support is using and sharing Pomobox! You can also: star the GitHub repo, contribute code, report bugs, suggest features, or share with friends who could benefit from better focus.",
      },
    ],
  },
]

const QUICK_LINKS = [
  { href: "/guide/what-is-pomodoro", title: "Learn Pomodoro", icon: Timer },
  { href: "/guide/pomodoro-for-students", title: "For Students", icon: Target },
  { href: "/guide/pomodoro-for-developers", title: "For Developers", icon: Monitor },
  { href: "/guide/how-to-avoid-distractions", title: "Avoid Distractions", icon: Shield },
]

// JSON-LD - FAQPage schema for all FAQs
const allFaqs = FAQ_CATEGORIES.flatMap((cat) => cat.faqs)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.legal("FAQ")}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            <HelpCircle className="h-3 w-3" />
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Pomobox FAQ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Everything you need to know about Pomobox and productivity
          </p>
          {/* Category Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {FAQ_CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  {cat.title}
                </a>
              )
            })}
          </div>
        </header>

        {/* FAQ Categories */}
        {FAQ_CATEGORIES.map((category) => {
          const Icon = category.icon
          const colorClasses = {
            primary: "bg-primary/10 text-primary border-primary/20",
            cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
            emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            violet: "bg-violet-500/10 text-violet-500 border-violet-500/20",
          }

          return (
            <section key={category.id} id={category.id} className="mb-12 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <span className={`p-2 rounded-xl ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-3">
                {category.faqs.map((faq) => (
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
          )
        })}

        {/* Quick Links */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Learn More</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors group text-center"
                >
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary mx-auto mb-2 transition-colors" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Still have questions */}
        <section className="mb-8">
          <div className="text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Can't find what you're looking for? Check our guides or reach out on GitHub.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/guide/what-is-pomodoro"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Timer className="h-5 w-5" />
                Read the Guide
              </Link>
              <a
                href="https://github.com/Seongyul-Lee/pomobox"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/30 font-medium transition-colors"
              >
                <Globe className="h-5 w-5" />
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-border/50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Timer
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
