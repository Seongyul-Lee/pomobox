import type { Metadata } from "next"
import Link from "next/link"
import {
  BookOpen,
  Timer,
  GraduationCap,
  Code2,
  PenTool,
  ShieldOff,
  GitCompare,
  History,
  Brain,
  ArrowRight,
  Sparkles,
  Clock,
  Library,
  Home,
  Volume2,
  FlaskConical,
  RefreshCcw,
  Zap,
  Waves,
  Target,
  Headphones,
  Sun,
  Coffee,
  Palette,
  Users,
  Briefcase,
  Rocket,
  Smartphone,
  Moon,
  Battery,
  Monitor,
  Layers,
  Lightbulb,
  Calendar,
} from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
  title: "Learn Pomodoro | Guides & Articles | Pomobox",
  description:
    "Master the Pomodoro Technique with our comprehensive guides and articles. From beginners to developers, find resources to boost your productivity.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pomobox.app/learn",
    siteName: "Pomobox",
    title: "Learn Pomodoro | Guides & Articles",
    description:
      "Comprehensive Pomodoro guides and articles for students, developers, and professionals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Pomodoro | Pomobox",
    description: "Master productivity with our Pomodoro guides and articles.",
  },
  alternates: {
    canonical: "https://pomobox.app/learn",
  },
}

// Content data with rich metadata
const CONTENT_ITEMS = [
  // Guides
  {
    slug: "what-is-pomodoro",
    href: ROUTES.GUIDE.WHAT_IS_POMODORO,
    category: "guide" as const,
    icon: Timer,
    title: "What is the Pomodoro Technique?",
    description:
      "Complete beginner's guide to time-boxed productivity. Learn the 25/5 rhythm that millions use daily.",
    readTime: "8 min",
    featured: true,
    gradient: "from-primary/20 via-violet-500/10 to-transparent",
    accentColor: "text-primary",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    slug: "pomodoro-for-students",
    href: ROUTES.GUIDE.FOR_STUDENTS,
    category: "guide" as const,
    icon: GraduationCap,
    title: "Pomodoro for Students",
    description:
      "Study smarter, not harder. Strategies for exams, assignments, and long study sessions.",
    readTime: "6 min",
    featured: false,
    gradient: "from-emerald-500/15 via-green-500/5 to-transparent",
    accentColor: "text-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    slug: "pomodoro-for-developers",
    href: ROUTES.GUIDE.FOR_DEVELOPERS,
    category: "guide" as const,
    icon: Code2,
    title: "Pomodoro for Developers",
    description:
      "Deep coding sessions, debugging workflows, and code reviews. Ship faster with focused sprints.",
    readTime: "7 min",
    featured: false,
    gradient: "from-sky-500/15 via-blue-500/5 to-transparent",
    accentColor: "text-sky-500",
    badgeColor: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  },
  {
    slug: "pomodoro-for-writers",
    href: ROUTES.GUIDE.FOR_WRITERS,
    category: "guide" as const,
    icon: PenTool,
    title: "Pomodoro for Writers",
    description:
      "7 strategies to boost your writing. Overcome writer's block and hit your word count goals.",
    readTime: "12 min",
    featured: false,
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    accentColor: "text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    slug: "how-to-avoid-distractions",
    href: ROUTES.GUIDE.AVOID_DISTRACTIONS,
    category: "guide" as const,
    icon: ShieldOff,
    title: "How to Avoid Distractions",
    description:
      "Practical tips to eliminate interruptions and protect your focus time.",
    readTime: "5 min",
    featured: false,
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    accentColor: "text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    slug: "pomodoro-vs-timeboxing",
    href: ROUTES.GUIDE.VS_TIMEBOXING,
    category: "guide" as const,
    icon: GitCompare,
    title: "Pomodoro vs Timeboxing",
    description:
      "Compare time management techniques. Find which method fits your workflow best.",
    readTime: "5 min",
    featured: false,
    gradient: "from-rose-500/15 via-pink-500/5 to-transparent",
    accentColor: "text-rose-500",
    badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  {
    slug: "pomodoro-for-remote-workers",
    href: ROUTES.GUIDE.FOR_REMOTE_WORKERS,
    category: "guide" as const,
    icon: Home,
    title: "Pomodoro for Remote Workers",
    description:
      "Master work-from-home productivity. Home office setup and focus strategies for distributed teams.",
    readTime: "10 min",
    featured: false,
    gradient: "from-indigo-500/15 via-blue-500/5 to-transparent",
    accentColor: "text-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  // Blog
  {
    slug: "pomodoro-history",
    href: ROUTES.BLOG.HISTORY,
    category: "blog" as const,
    icon: History,
    title: "The History of Pomodoro",
    description:
      "From a tomato-shaped kitchen timer to a global movement. Francesco Cirillo's origin story.",
    readTime: "6 min",
    featured: false,
    gradient: "from-violet-500/15 via-purple-500/5 to-transparent",
    accentColor: "text-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
  {
    slug: "science-of-focus",
    href: ROUTES.BLOG.SCIENCE_OF_FOCUS,
    category: "blog" as const,
    icon: Brain,
    title: "The Science of Focus",
    description:
      "Neuroscience behind Pomodoro. Why time-boxing works according to brain research.",
    readTime: "12 min",
    featured: false,
    gradient: "from-cyan-500/15 via-teal-500/5 to-transparent",
    accentColor: "text-cyan-500",
    badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  },
  {
    slug: "psychology-of-timer-sounds",
    href: ROUTES.BLOG.PSYCHOLOGY_OF_TIMER_SOUNDS,
    category: "blog" as const,
    icon: Volume2,
    title: "Psychology of Timer Sounds",
    description:
      "Why certain sounds boost focus while others break concentration. Neuroscience of auditory cues.",
    readTime: "14 min",
    featured: false,
    gradient: "from-fuchsia-500/15 via-pink-500/5 to-transparent",
    accentColor: "text-fuchsia-500",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20",
  },
  {
    slug: "why-25-minutes",
    href: ROUTES.BLOG.WHY_25_MINUTES,
    category: "blog" as const,
    icon: FlaskConical,
    title: "Why 25 Minutes Works",
    description:
      "The cognitive science behind Pomodoro's magic number. Vigilance decrement and ultradian rhythms explained.",
    readTime: "16 min",
    featured: false,
    gradient: "from-lime-500/15 via-green-500/5 to-transparent",
    accentColor: "text-lime-500",
    badgeColor: "bg-lime-500/10 text-lime-500 border-lime-500/20",
  },
  {
    slug: "cost-of-task-switching",
    href: ROUTES.BLOG.COST_OF_TASK_SWITCHING,
    category: "blog" as const,
    icon: RefreshCcw,
    title: "The Cost of Task Switching",
    description:
      "Why every interruption costs 23 minutes. Research on context switching and how to protect your focus.",
    readTime: "10 min",
    featured: false,
    gradient: "from-orange-500/15 via-red-500/5 to-transparent",
    accentColor: "text-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  {
    slug: "pomodoro-for-adhd",
    href: ROUTES.BLOG.POMODORO_FOR_ADHD,
    category: "blog" as const,
    icon: Zap,
    title: "Pomodoro for ADHD",
    description:
      "How external timers help manage time blindness and hyperfocus. Adaptations for neurodivergent productivity.",
    readTime: "12 min",
    featured: false,
    gradient: "from-purple-500/15 via-violet-500/5 to-transparent",
    accentColor: "text-purple-500",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    slug: "ultradian-rhythms",
    href: ROUTES.BLOG.ULTRADIAN_RHYTHMS,
    category: "blog" as const,
    icon: Waves,
    title: "Ultradian Rhythms",
    description:
      "The 90-minute energy cycles your brain follows. Align your work with your natural peak performance windows.",
    readTime: "11 min",
    featured: false,
    gradient: "from-amber-500/15 via-yellow-500/5 to-transparent",
    accentColor: "text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    slug: "flowtime-vs-pomodoro",
    href: ROUTES.BLOG.FLOWTIME_VS_POMODORO,
    category: "blog" as const,
    icon: Target,
    title: "Flowtime vs Pomodoro",
    description:
      "Compare flexible flow-based timing with structured intervals. Find which technique matches your work style.",
    readTime: "9 min",
    featured: false,
    gradient: "from-violet-500/15 via-indigo-500/5 to-transparent",
    accentColor: "text-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
  {
    slug: "focus-for-coding-interviews",
    href: ROUTES.BLOG.FOCUS_FOR_CODING_INTERVIEWS,
    category: "blog" as const,
    icon: Code2,
    title: "Focus for Coding Interviews",
    description:
      "Build an effective study plan using Pomodoro sessions. Optimize LeetCode practice and interview prep.",
    readTime: "10 min",
    featured: false,
    gradient: "from-emerald-500/15 via-green-500/5 to-transparent",
    accentColor: "text-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    slug: "nature-sounds-focus",
    href: ROUTES.BLOG.NATURE_SOUNDS_FOCUS,
    category: "blog" as const,
    icon: Headphones,
    title: "Nature Sounds and Focus",
    description:
      "The neuroscience behind why rain, forest, and ambient sounds improve concentration and reduce stress.",
    readTime: "9 min",
    featured: false,
    gradient: "from-teal-500/15 via-cyan-500/5 to-transparent",
    accentColor: "text-teal-500",
    badgeColor: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  },
  {
    slug: "deep-work-method",
    href: ROUTES.BLOG.DEEP_WORK_METHOD,
    category: "blog" as const,
    icon: Brain,
    title: "Deep Work Method",
    description:
      "Cal Newport's strategies for distraction-free productivity. Combine deep work with Pomodoro for elite focus.",
    readTime: "11 min",
    featured: false,
    gradient: "from-indigo-500/15 via-violet-500/5 to-transparent",
    accentColor: "text-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  {
    slug: "morning-routine-productivity",
    href: ROUTES.BLOG.MORNING_ROUTINE_PRODUCTIVITY,
    category: "blog" as const,
    icon: Sun,
    title: "Morning Routine for Productivity",
    description:
      "Science-backed morning rituals to maximize cognitive performance. Build habits that set up focused days.",
    readTime: "10 min",
    featured: false,
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    accentColor: "text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    slug: "caffeine-and-focus",
    href: ROUTES.BLOG.CAFFEINE_AND_FOCUS,
    category: "blog" as const,
    icon: Coffee,
    title: "Caffeine and Focus",
    description:
      "Optimize your coffee timing for peak productivity. The neuroscience of caffeine half-life and alertness.",
    readTime: "9 min",
    featured: false,
    gradient: "from-amber-600/15 via-orange-500/5 to-transparent",
    accentColor: "text-amber-600",
    badgeColor: "bg-amber-600/10 text-amber-600 border-amber-600/20",
  },
  // New Guide pages (#2-5)
  {
    slug: "pomodoro-for-designers",
    href: ROUTES.GUIDE.FOR_DESIGNERS,
    category: "guide" as const,
    icon: Palette,
    title: "Pomodoro for Designers",
    description:
      "Apply Pomodoro to creative design projects. 5 steps to optimize Figma sessions and design workflows.",
    readTime: "10 min",
    featured: false,
    gradient: "from-pink-500/15 via-rose-500/5 to-transparent",
    accentColor: "text-pink-500",
    badgeColor: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  },
  {
    slug: "pomodoro-for-managers",
    href: ROUTES.GUIDE.FOR_MANAGERS,
    category: "guide" as const,
    icon: Users,
    title: "Pomodoro for Managers",
    description:
      "Manage meetings and deep work effectively. No Meeting Zones and leadership productivity strategies.",
    readTime: "11 min",
    featured: false,
    gradient: "from-slate-500/15 via-gray-500/5 to-transparent",
    accentColor: "text-slate-500",
    badgeColor: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  },
  {
    slug: "pomodoro-for-freelancers",
    href: ROUTES.GUIDE.FOR_FREELANCERS,
    category: "guide" as const,
    icon: Briefcase,
    title: "Pomodoro for Freelancers",
    description:
      "Real freelancer success stories. Master client work, time tracking, and work-life balance.",
    readTime: "12 min",
    featured: false,
    gradient: "from-teal-500/15 via-emerald-500/5 to-transparent",
    accentColor: "text-teal-500",
    badgeColor: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  },
  {
    slug: "pomodoro-for-entrepreneurs",
    href: ROUTES.GUIDE.FOR_ENTREPRENEURS,
    category: "guide" as const,
    icon: Rocket,
    title: "Pomodoro for Entrepreneurs",
    description:
      "From chaos to control. How founders use structured focus to scale their startups.",
    readTime: "13 min",
    featured: false,
    gradient: "from-orange-500/15 via-amber-500/5 to-transparent",
    accentColor: "text-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  // New Blog pages (#6-14)
  {
    slug: "social-media-brain",
    href: ROUTES.BLOG.SOCIAL_MEDIA_BRAIN,
    category: "blog" as const,
    icon: Smartphone,
    title: "Social Media and Your Brain",
    description:
      "How social media rewires attention circuits. Research-backed strategies to reclaim your focus.",
    readTime: "14 min",
    featured: false,
    gradient: "from-blue-500/15 via-indigo-500/5 to-transparent",
    accentColor: "text-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    slug: "science-of-breaks",
    href: ROUTES.BLOG.SCIENCE_OF_BREAKS,
    category: "blog" as const,
    icon: RefreshCcw,
    title: "The Science of Breaks",
    description:
      "Why breaks boost productivity. Answers to common questions about rest and cognitive recovery.",
    readTime: "11 min",
    featured: false,
    gradient: "from-green-500/15 via-emerald-500/5 to-transparent",
    accentColor: "text-green-500",
    badgeColor: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    slug: "sleep-and-productivity",
    href: ROUTES.BLOG.SLEEP_AND_PRODUCTIVITY,
    category: "blog" as const,
    icon: Moon,
    title: "Sleep and Productivity",
    description:
      "Why sleep deprivation destroys focus. Fix your sleep to unlock peak daytime performance.",
    readTime: "12 min",
    featured: false,
    gradient: "from-indigo-500/15 via-purple-500/5 to-transparent",
    accentColor: "text-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  {
    slug: "energy-management-not-time",
    href: ROUTES.BLOG.ENERGY_MANAGEMENT,
    category: "blog" as const,
    icon: Battery,
    title: "Energy Management, Not Time",
    description:
      "Compare time vs energy management. Match task difficulty to your natural energy rhythms.",
    readTime: "10 min",
    featured: false,
    gradient: "from-yellow-500/15 via-amber-500/5 to-transparent",
    accentColor: "text-yellow-500",
    badgeColor: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  {
    slug: "ergonomics-for-focus",
    href: ROUTES.BLOG.ERGONOMICS_FOR_FOCUS,
    category: "blog" as const,
    icon: Monitor,
    title: "Ergonomics for Focus",
    description:
      "12 workspace adjustments to enhance concentration. Physical setup tips for sustained productivity.",
    readTime: "9 min",
    featured: false,
    gradient: "from-gray-500/15 via-slate-500/5 to-transparent",
    accentColor: "text-gray-500",
    badgeColor: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  },
  {
    slug: "habit-stacking",
    href: ROUTES.BLOG.HABIT_STACKING,
    category: "blog" as const,
    icon: Layers,
    title: "Habit Stacking for Productivity",
    description:
      "Build powerful routines by linking habits. The 4-step formula from Atomic Habits applied to focus.",
    readTime: "10 min",
    featured: false,
    gradient: "from-violet-500/15 via-purple-500/5 to-transparent",
    accentColor: "text-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
  {
    slug: "productive-procrastination",
    href: ROUTES.BLOG.PRODUCTIVE_PROCRASTINATION,
    category: "blog" as const,
    icon: Lightbulb,
    title: "Productive Procrastination",
    description:
      "Turn procrastination into progress. John Perry's structured procrastination method explained.",
    readTime: "11 min",
    featured: false,
    gradient: "from-amber-500/15 via-yellow-500/5 to-transparent",
    accentColor: "text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    slug: "weekly-review-habit",
    href: ROUTES.BLOG.WEEKLY_REVIEW_HABIT,
    category: "blog" as const,
    icon: Calendar,
    title: "The Weekly Review Habit",
    description:
      "Case studies of effective weekly reviews. Learn from founders, designers, and researchers.",
    readTime: "12 min",
    featured: false,
    gradient: "from-cyan-500/15 via-blue-500/5 to-transparent",
    accentColor: "text-cyan-500",
    badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  },
  {
    slug: "batching-tasks",
    href: ROUTES.BLOG.BATCHING_TASKS,
    category: "blog" as const,
    icon: Layers,
    title: "Task Batching for Deep Work",
    description:
      "Research-backed batching strategies. Reduce context switching by 40% with cognitive science.",
    readTime: "13 min",
    featured: false,
    gradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    accentColor: "text-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
]

type FilterType = "all" | "guide" | "blog"

interface PageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function LearnPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentFilter = (params.filter as FilterType) || "all"

  const filteredItems =
    currentFilter === "all"
      ? CONTENT_ITEMS
      : CONTENT_ITEMS.filter((item) => item.category === currentFilter)

  const featuredItem = CONTENT_ITEMS.find((item) => item.featured)
  const regularItems = filteredItems.filter((item) => !item.featured)

  const counts = {
    all: CONTENT_ITEMS.length,
    guide: CONTENT_ITEMS.filter((i) => i.category === "guide").length,
    blog: CONTENT_ITEMS.filter((i) => i.category === "blog").length,
  }

  return (
    <main className="min-h-screen pt-14 xl:pt-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:via-background dark:to-muted/10 text-foreground">
      <div className="max-w-5xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Learn" }]}
          className="mb-8"
        />

        {/* Hero Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Library className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Learning Hub
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Master the Pomodoro Technique
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guides and articles to help you work smarter, focus
            deeper, and achieve more.
          </p>
        </header>

        {/* Filter Tabs */}
        <nav
          className="flex justify-center mb-10"
          role="tablist"
          aria-label="Content filter"
        >
          <div className="inline-flex p-1 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 backdrop-blur-sm">
            {(["all", "guide", "blog"] as const).map((filter) => {
              const isActive = currentFilter === filter
              const labels = {
                all: "All",
                guide: "Guides",
                blog: "Blog",
              }
              const icons = {
                all: Sparkles,
                guide: BookOpen,
                blog: Brain,
              }
              const Icon = icons[filter]

              return (
                <Link
                  key={filter}
                  href={filter === "all" ? "/learn" : `/learn?filter=${filter}`}
                  role="tab"
                  aria-selected={isActive}
                  className={`
                    relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  <Icon className="h-4 w-4 hidden sm:block" />
                  <span>{labels[filter]}</span>
                  <span
                    className={`
                    px-1.5 py-0.5 rounded-md text-xs
                    ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                  >
                    {counts[filter]}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Featured Card (only show when 'all' filter) */}
        {currentFilter === "all" && featuredItem && (
          <section className="mb-8" aria-label="Featured content">
            <Link
              href={featuredItem.href}
              className="group block relative overflow-hidden rounded-3xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/40 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${featuredItem.gradient} opacity-60 group-hover:opacity-80 transition-opacity`}
              />

              <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/20 dark:bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <featuredItem.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${featuredItem.badgeColor}`}
                    >
                      <Sparkles className="h-3 w-3" />
                      Featured Guide
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {featuredItem.readTime} read
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {featuredItem.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {featuredItem.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Start Learning
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Content Grid */}
        <section aria-label="All content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {(currentFilter === "all" ? regularItems : filteredItems).map(
              (item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="group relative overflow-hidden rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Subtle gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div className="relative p-5 md:p-6">
                      {/* Header: Icon + Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-2.5 rounded-xl bg-muted/50 dark:bg-muted/30 group-hover:bg-primary/10 transition-colors`}
                        >
                          <Icon
                            className={`h-5 w-5 ${item.accentColor} group-hover:scale-110 transition-transform`}
                          />
                        </div>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium border ${item.badgeColor}`}
                        >
                          {item.category === "guide" ? "Guide" : "Blog"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Footer: Read time + Arrow */}
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.readTime}
                        </span>
                        <ArrowRight
                          className={`h-4 w-4 ${item.accentColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}
                        />
                      </div>
                    </div>
                  </Link>
                )
              }
            )}
          </div>
        </section>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              No content found for this filter.
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
            >
              View all content
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16">
          <div className="text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Ready to Start?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Put your knowledge into practice. Start your first Pomodoro
              session now.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Timer className="h-5 w-5" />
              Start Timer
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
