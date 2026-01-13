import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Brain,
  Home,
  ChevronRight,
  Smartphone,
  Zap,
  AlertTriangle,
  BookOpen,
  TrendingDown,
  Timer,
  ArrowRight,
  Shield,
  Bell,
  BellOff,
  Eye,
  Heart,
  RefreshCw,
  Target,
  CheckCircle2,
  XCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "How Social Media Rewires Your Brain: The Science of Digital Distraction | Pomobox",
  description:
    "Explore the neuroscience behind social media addiction. Learn how dopamine loops hijack your attention, the attention economy's impact on focus, and evidence-based strategies for digital detox.",
  keywords: [
    "social media brain",
    "dopamine detox",
    "attention economy",
    "digital distraction",
    "social media addiction",
    "dopamine loop",
    "attention span",
    "digital detox",
    "focus recovery",
    "smartphone addiction",
    "notification addiction",
    "variable reward",
    "cognitive impact",
    "deep work",
    "productivity neuroscience",
  ],
  openGraph: {
    title: "How Social Media Rewires Your Brain | Pomobox",
    description:
      "The neuroscience of digital distraction: dopamine loops, attention economy, and evidence-based recovery strategies.",
    type: "article",
    publishedTime: "2025-01-13",
  },
  alternates: { canonical: "https://pomobox.app/blog/social-media-brain" },
}

// 심층 연구형: 연구 인용이 핵심
const RESEARCH_CITATIONS = [
  {
    authors: "Alter, A.",
    year: "2017",
    title: "Irresistible: The Rise of Addictive Technology and the Business of Keeping Us Hooked",
    publisher: "Penguin Press",
    finding: "Tech companies deliberately design for addiction using variable reward schedules",
  },
  {
    authors: "Twenge, J. M., & Campbell, W. K.",
    year: "2019",
    title: "Associations between screen time and lower psychological well-being among children and adolescents",
    journal: "Preventive Medicine Reports",
    doi: "10.1016/j.pmedr.2018.10.003",
    finding: "Heavy social media use correlates with decreased well-being and increased depression symptoms",
  },
  {
    authors: "Ward, A. F., Duke, K., Gneezy, A., & Bos, M. W.",
    year: "2017",
    title: "Brain Drain: The Mere Presence of One's Own Smartphone Reduces Available Cognitive Capacity",
    journal: "Journal of the Association for Consumer Research",
    doi: "10.1086/691462",
    finding: "Even having a smartphone nearby reduces cognitive capacity, even when off",
  },
  {
    authors: "Ophir, E., Nass, C., & Wagner, A. D.",
    year: "2009",
    title: "Cognitive control in media multitaskers",
    journal: "Proceedings of the National Academy of Sciences",
    doi: "10.1073/pnas.0903620106",
    finding: "Heavy media multitaskers perform worse on cognitive control tasks",
  },
  {
    authors: "Lembke, A.",
    year: "2021",
    title: "Dopamine Nation: Finding Balance in the Age of Indulgence",
    publisher: "Dutton",
    finding: "Dopamine baseline resets require 2-4 weeks of abstinence from addictive stimuli",
  },
]

// FAQ 데이터
const FAQ_DATA = [
  {
    question: "How long does it take to reset dopamine levels after heavy social media use?",
    answer:
      "Research by Dr. Anna Lembke suggests a 30-day 'dopamine fast' can help reset baseline levels. However, even 2-4 weeks of reduced use shows measurable improvement. The first 1-2 weeks are typically the hardest, with cravings peaking around days 10-14 before subsiding.",
  },
  {
    question: "Is social media actually addictive, or is that an exaggeration?",
    answer:
      "While social media doesn't meet clinical criteria for substance addiction, it activates the same reward pathways. Researchers use terms like 'behavioral addiction' or 'problematic use.' The key indicator is continued use despite negative consequences—if you keep scrolling even though you know you should stop, that's the addiction mechanism at work.",
  },
  {
    question: "Can I use social media mindfully, or do I need to quit entirely?",
    answer:
      "For most people, mindful use is possible but requires structural changes. Remove apps from your phone (use desktop only), schedule specific times for checking (not first thing in morning or before bed), and use timers. However, if you've tried moderation repeatedly and failed, abstinence may be more effective than willpower battles.",
  },
  {
    question: "Why do notifications feel so hard to ignore?",
    answer:
      "Notifications hijack an ancient survival mechanism. Your brain evolved to prioritize novel information (it could be a threat or opportunity). Each notification triggers a micro-stress response that demands attention. The red notification badge specifically was designed to trigger urgency—red signals danger in nature.",
  },
]

// JSON-LD 스키마 - 정적 데이터로 XSS 위험 없음
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

export default function SocialMediaBrainPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* FAQ Schema JSON-LD - static data, no user input, XSS-safe */}
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
            <li className="text-foreground font-medium">Social Media &amp; Your Brain</li>
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Brain className="h-3 w-3" />
              Neuroscience
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <Clock className="h-3 w-3" />
              15 min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Social Media Rewires Your Brain: The Science of Digital Distraction
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore the neuroscience behind social media addiction—dopamine loops, the attention economy,
            and evidence-based strategies to reclaim your focus.
          </p>
        </header>

        {/* Hero Stats - 심층 연구형: 핵심 연구 결과로 시작 */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-transparent border border-rose-500/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">2.5h</div>
              <div className="text-xs md:text-sm text-muted-foreground">Avg. Daily Social Media</div>
            </div>
            <div className="text-center border-x border-rose-500/20">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">150+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Daily Phone Pickups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">8sec</div>
              <div className="text-xs md:text-sm text-muted-foreground">Avg. Attention Span</div>
            </div>
          </div>
        </section>

        {/* 핵심 발견 - 심층 연구형 시작 섹션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-amber-500" />
            Key Research Findings
          </h2>
          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-lg text-foreground mb-4 font-medium">
              The average person now spends more time on social media than eating, drinking, and socializing combined.
            </p>
            <p className="text-muted-foreground mb-6">
              This isn&apos;t a failure of willpower—it&apos;s the result of billions of dollars invested in making
              these platforms as engaging as possible. Understanding the mechanisms behind this can help
              you reclaim control.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-rose-500" />
                  <span className="font-semibold text-foreground">Attention Span Decline</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Microsoft research found the average attention span dropped from 12 seconds (2000)
                  to 8 seconds (2015)—less than a goldfish.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-violet-500" />
                  <span className="font-semibold text-foreground">Cognitive Capacity</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Having your smartphone within reach reduces working memory and fluid intelligence
                  by up to 10%, even when it&apos;s off (Ward et al., 2017).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 메커니즘 설명: 도파민 루프 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <RefreshCw className="h-6 w-6 text-violet-500" />
            The Dopamine Loop Mechanism
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p>
              Social media exploits your brain&apos;s reward system through a mechanism called the
              <strong> variable ratio reinforcement schedule</strong>—the same principle that makes
              slot machines addictive.
            </p>
          </div>

          <div className="space-y-4">
            {/* Loop Step 1 */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-rose-500" />
                  Trigger (Notification or Urge)
                </h3>
                <p className="text-sm text-muted-foreground">
                  A notification sound, red badge, or moment of boredom triggers the urge to check.
                  Your brain anticipates a potential reward, releasing a small dopamine spike.
                </p>
              </div>
            </div>

            {/* Loop Step 2 */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-orange-500" />
                  Action (Open the App)
                </h3>
                <p className="text-sm text-muted-foreground">
                  You unlock your phone and open the app. The pull-to-refresh gesture mimics a slot
                  machine lever—you&apos;re literally gambling for content.
                </p>
              </div>
            </div>

            {/* Loop Step 3 */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-amber-500" />
                  Variable Reward
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sometimes you find something amazing. Sometimes it&apos;s boring. This unpredictability
                  is precisely what keeps you hooked—the brain craves resolution to uncertainty.
                </p>
              </div>
            </div>

            {/* Loop Step 4 */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-violet-500" />
                  Loop Reinforcement
                </h3>
                <p className="text-sm text-muted-foreground">
                  Whether the reward was satisfying or not, your brain remembers the occasional wins.
                  The loop strengthens, making the next trigger harder to resist.
                </p>
              </div>
            </div>
          </div>

          {/* 핵심 인사이트 박스 */}
          <div className="mt-6 p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
            <h4 className="font-semibold text-foreground mb-2">Why This Matters for Focus</h4>
            <p className="text-sm text-muted-foreground">
              Each time you check social media, you&apos;re not just losing the time spent scrolling.
              Research by Gloria Mark shows it takes an average of <strong>23 minutes</strong> to
              fully regain focus after an interruption. Ten quick checks can cost you nearly 4 hours
              of productive work.
            </p>
          </div>
        </section>

        {/* 주의력 경제 섹션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Eye className="h-6 w-6 text-cyan-500" />
            The Attention Economy
          </h2>
          <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <blockquote className="text-lg font-medium text-foreground mb-4 italic">
              &quot;If you&apos;re not paying for the product, you are the product.&quot;
            </blockquote>
            <p className="text-muted-foreground mb-4">
              Social media companies earn revenue by selling your attention to advertisers. Their
              entire business model depends on maximizing your time on the platform. This creates
              a fundamental conflict: what&apos;s good for their profits is often bad for your focus.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-background/50 text-center">
                <div className="font-bold text-cyan-600 dark:text-cyan-400 text-xl">$0.50-$5</div>
                <div className="text-xs text-muted-foreground">Value of 1 Hour of Your Attention</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50 text-center">
                <div className="font-bold text-cyan-600 dark:text-cyan-400 text-xl">$1T+</div>
                <div className="text-xs text-muted-foreground">Social Media Industry Value</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50 text-center">
                <div className="font-bold text-cyan-600 dark:text-cyan-400 text-xl">1000+</div>
                <div className="text-xs text-muted-foreground">Engineers Per Company</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">Designed for Addiction</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Infinite scroll removes natural stopping points
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Autoplay keeps you watching without consent
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  Likes and comments create social validation loops
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  AI-powered feeds learn exactly what hooks you
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">The Real Cost</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  Reduced ability to focus on complex tasks
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  Increased anxiety and FOMO
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  Disrupted sleep from blue light and stimulation
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  Lower baseline dopamine (anhedonia)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 실용적 적용: 디지털 디톡스 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-emerald-500" />
            Digital Detox: Evidence-Based Recovery
          </h2>
          <p className="text-muted-foreground mb-6">
            Based on research by Dr. Anna Lembke (Dopamine Nation) and Cal Newport (Digital Minimalism),
            here&apos;s a structured approach to reclaiming your focus.
          </p>

          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                  Phase 1: Days 1-7
                </div>
                <span className="text-sm text-muted-foreground">Environmental Changes</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Remove Triggers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Delete social media apps from phone
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Turn off all non-essential notifications
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Charge phone outside bedroom
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Expect Withdrawal</h4>
                  <p className="text-sm text-muted-foreground">
                    You may experience boredom, anxiety, and phantom vibrations. This is normal—your
                    brain is recalibrating. Don&apos;t interpret discomfort as proof you need social media.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Phase 2: Days 8-21
                </div>
                <span className="text-sm text-muted-foreground">Dopamine Reset</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Replace Habits</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      Read physical books during idle time
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      Take walks without headphones
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      Practice sitting with boredom
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What to Expect</h4>
                  <p className="text-sm text-muted-foreground">
                    After 2-3 weeks, you&apos;ll notice increased patience, better sleep, and longer
                    attention span. Small pleasures become more satisfying as dopamine sensitivity
                    resets.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium">
                  Phase 3: Day 22+
                </div>
                <span className="text-sm text-muted-foreground">Mindful Reintroduction</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Structured Use</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                      Only access via desktop browser
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                      Schedule 2 specific times daily (e.g., 12pm and 6pm)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                      Set timer for 15-20 minutes per session
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">If You Slip</h4>
                  <p className="text-sm text-muted-foreground">
                    Relapse isn&apos;t failure—it&apos;s data. Notice what triggered it, add a new
                    environmental barrier, and continue. Each slip teaches you about your
                    vulnerability patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pomodoro 연결 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Timer className="h-6 w-6 text-primary" />
            Pomodoro as Attention Training
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/20">
            <p className="text-muted-foreground mb-4">
              The Pomodoro Technique serves as deliberate practice for your attention muscles.
              Each 25-minute focused session is a rep that strengthens your ability to resist
              distraction.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/50">
                <BellOff className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Notification Immunity</h4>
                <p className="text-xs text-muted-foreground">
                  During a Pomodoro, nothing gets through. Train your brain that notifications can wait.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <Target className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Single-Task Focus</h4>
                <p className="text-xs text-muted-foreground">
                  One task per Pomodoro. No browser tabs, no multitasking—pure, undivided attention.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/50">
                <RefreshCw className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Healthy Dopamine</h4>
                <p className="text-xs text-muted-foreground">
                  Completing a Pomodoro provides a natural reward—satisfaction from real accomplishment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 참고문헌 - 심층 연구형 핵심 요소 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-cyan-500" />
            Research &amp; References
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
                    {cite.finding && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        Key finding: {cite.finding}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-transparent border border-rose-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Reclaim Your Attention
            </h2>
            <p className="text-muted-foreground mb-4">
              Your attention is your most valuable resource. Start training it today with focused
              Pomodoro sessions—no notifications, no distractions, just deep work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
              >
                <Timer className="h-4 w-4" />
                Start Focus Session
              </Link>
              <Link
                href="/blog/deep-work-method"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Deep Work Method
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
                Cal Newport&apos;s complete framework for focused productivity.
              </p>
            </Link>
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
              href="/blog/science-of-breaks"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                The Science of Breaks
              </h3>
              <p className="text-sm text-muted-foreground">
                Why strategic rest improves your focus and productivity.
              </p>
            </Link>
            <Link
              href="/blog/sleep-and-productivity"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                Sleep &amp; Productivity
              </h3>
              <p className="text-sm text-muted-foreground">
                How sleep quality directly impacts your focus capacity.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
