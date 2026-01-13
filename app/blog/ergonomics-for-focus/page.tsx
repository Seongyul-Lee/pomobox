import type { Metadata } from "next";
import Link from "next/link";
import {
  Monitor,
  Armchair,
  Lightbulb,
  Eye,
  Footprints,
  ThermometerSun,
  Volume2,
  Flower2,
  Clock,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Timer,
  RotateCcw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ergonomics for Focus: 10 Workspace Tips | Pomobox",
  description:
    "Optimize your workspace for deep focus with 10 evidence-based ergonomic tips. From monitor height to lighting, create an environment that supports hours of productive work.",
  keywords: [
    "ergonomics",
    "workspace setup",
    "focus environment",
    "desk ergonomics",
    "productivity workspace",
    "home office setup",
    "monitor position",
    "ergonomic chair",
    "work from home tips",
    "concentration environment",
  ],
  openGraph: {
    title: "Ergonomics for Focus: 10 Workspace Tips",
    description:
      "Create a workspace that supports hours of deep, focused work with these evidence-based ergonomic principles.",
    type: "article",
    publishedTime: "2025-01-14",
  },
};

const ERGONOMIC_TIPS = [
  {
    number: 1,
    title: "Monitor at Eye Level",
    icon: Monitor,
    color: "oklch(0.7 0.15 250)",
    why: "Looking down strains your neck; looking up causes eye fatigue. The top of your screen should be at or slightly below eye level.",
    how: "Use a monitor arm or stand. For laptops, use an external keyboard and raise the screen. Your eyes should naturally fall on the upper third of the screen.",
    quickWin: "Stack books under your monitor for an instant 4-6 inch lift.",
  },
  {
    number: 2,
    title: "Chair Height & Support",
    icon: Armchair,
    color: "oklch(0.7 0.15 150)",
    why: "Poor seating compresses your spine and restricts blood flow to your legs, causing fatigue and back pain within hours.",
    how: "Adjust chair height so feet are flat on floor, thighs parallel to ground. Lumbar support should fill the curve in your lower back.",
    quickWin: "Roll up a towel for instant lumbar support if your chair lacks it.",
  },
  {
    number: 3,
    title: "Lighting Without Glare",
    icon: Lightbulb,
    color: "oklch(0.8 0.15 85)",
    why: "Screen glare forces squinting and causes eye strain. Dim environments make your pupils dilate, increasing light sensitivity.",
    how: "Position your desk perpendicular to windows. Use bias lighting behind your monitor. Aim for ambient light that's 50% of screen brightness.",
    quickWin: "Add a desk lamp positioned to the side, not behind you.",
  },
  {
    number: 4,
    title: "20-20-20 Eye Rule",
    icon: Eye,
    color: "oklch(0.7 0.15 200)",
    why: "Continuous screen focus causes your eye muscles to lock, reducing blink rate from 15 to 5 times per minute, causing dryness.",
    how: "Every 20 minutes, look at something 20 feet away for 20 seconds. This relaxes the ciliary muscles and restores natural blink rate.",
    quickWin: "Set a subtle visual reminder—Pomobox's break timer works perfectly for this.",
  },
  {
    number: 5,
    title: "Keyboard & Mouse Position",
    icon: Footprints,
    color: "oklch(0.7 0.15 320)",
    why: "Reaching for input devices creates shoulder tension. Wrist extension while typing compresses the carpal tunnel.",
    how: "Elbows at 90-110 degrees, wrists neutral (not bent up or down). Keyboard should be at elbow height or slightly below.",
    quickWin: "Push your keyboard back so you can rest your wrists on the desk edge.",
  },
  {
    number: 6,
    title: "Temperature Control",
    icon: ThermometerSun,
    color: "oklch(0.7 0.15 30)",
    why: "Research shows cognitive performance peaks at 70-72°F (21-22°C). Too warm causes drowsiness; too cold diverts energy to staying warm.",
    how: "Keep room temperature in the optimal range. Use a small fan for air circulation. Dress in layers to fine-tune comfort.",
    quickWin: "A small USB desk fan can drop perceived temperature by 5-7°F.",
  },
  {
    number: 7,
    title: "Noise Management",
    icon: Volume2,
    color: "oklch(0.7 0.15 280)",
    why: "Intermittent noise (conversations, notifications) is more disruptive than constant background sound because it captures attention involuntarily.",
    how: "Use noise-canceling headphones or consistent background sounds. Brown noise or lo-fi music masks intermittent disruptions effectively.",
    quickWin: "Try Pomobox's built-in ambient sounds—designed specifically for focus work.",
  },
  {
    number: 8,
    title: "Plants & Natural Elements",
    icon: Flower2,
    color: "oklch(0.7 0.15 140)",
    why: "Biophilic design research shows plants reduce stress by 37% and increase productivity by 15%. Even viewing nature images helps.",
    how: "Add 1-3 low-maintenance plants within your visual field. Snake plants and pothos thrive in office conditions with minimal care.",
    quickWin: "No green thumb? A nature photograph or desktop wallpaper provides 60% of the benefit.",
  },
  {
    number: 9,
    title: "Clock Placement Strategy",
    icon: Clock,
    color: "oklch(0.7 0.15 60)",
    why: "Visible clocks create time anxiety, pulling you out of flow. But having no time awareness leads to overwork and missed breaks.",
    how: "Keep the clock behind you or use a timer-based system like Pomodoro that alerts you rather than requiring constant checking.",
    quickWin: "Use Pomobox as your primary time reference—it tells you when to look, so you don't have to.",
  },
  {
    number: 10,
    title: "Phone Placement",
    icon: Smartphone,
    color: "oklch(0.7 0.15 0)",
    why: "A visible phone reduces cognitive capacity by 10% even when silenced. Your brain allocates resources to not checking it.",
    how: "Place your phone in another room or in a drawer during focus sessions. Use scheduled check-in times between Pomodoro sessions.",
    quickWin: "Phone face-down in a drawer = instant 10% cognitive boost.",
  },
];

const BREAK_STRETCHES = [
  { name: "Neck Rolls", duration: "30 sec", description: "Slowly rotate head in circles, 5 each direction" },
  { name: "Shoulder Shrugs", duration: "20 sec", description: "Raise shoulders to ears, hold 3 sec, release" },
  { name: "Wrist Circles", duration: "20 sec", description: "Rotate wrists in both directions, 10 each" },
  { name: "Standing Stretch", duration: "30 sec", description: "Reach arms overhead, lean left and right" },
  { name: "Eye Palming", duration: "20 sec", description: "Cup warm palms over closed eyes, relax" },
];

const FAQ_DATA = [
  {
    question: "How long does it take to notice ergonomic improvements?",
    answer:
      "Physical discomfort often improves within days of proper setup. Productivity and focus benefits typically become noticeable within 1-2 weeks as your body adapts to the new positions and your brain stops being distracted by low-level discomfort signals.",
  },
  {
    question: "Do I need to buy expensive ergonomic equipment?",
    answer:
      "No. Most improvements come from proper positioning, not expensive gear. Books for monitor height, a rolled towel for lumbar support, and proper desk arrangement cost nothing. Invest in a good chair first if you're spending 6+ hours daily at your desk.",
  },
  {
    question: "Should I use a standing desk?",
    answer:
      "Standing desks benefit people who experience back pain from prolonged sitting. However, standing all day has its own issues. The ideal is alternating between sitting and standing throughout the day—roughly 20-30 minutes standing per hour.",
  },
  {
    question: "How do ergonomics affect focus specifically?",
    answer:
      "Physical discomfort, even at subconscious levels, consumes cognitive resources. Your brain continuously processes pain signals, temperature discomfort, and visual strain. Eliminating these frees up mental bandwidth for deep work.",
  },
];

export default function ErgonomicsForFocusPage() {
  const faqSchema = {
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
  };

  return (
    <article className="min-h-screen bg-[oklch(0.13_0.02_260)] text-[oklch(0.9_0.01_260)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-[oklch(0.3_0.02_260)] bg-gradient-to-b from-[oklch(0.18_0.03_260)] to-[oklch(0.13_0.02_260)]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="mb-6 flex items-center gap-2 text-sm text-[oklch(0.6_0.01_260)]">
            <Link href="/blog" className="hover:text-[oklch(0.8_0.01_260)]">
              Blog
            </Link>
            <span>/</span>
            <span>Workspace</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Ergonomics for{" "}
            <span className="text-[oklch(0.8_0.15_150)]">Focus</span>
            <br />
            <span className="text-[oklch(0.7_0.01_260)]">10 Workspace Tips That Actually Work</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[oklch(0.7_0.01_260)]">
            Your workspace either supports deep focus or constantly drains it. These 10
            evidence-based ergonomic adjustments eliminate the physical friction that
            silently sabotages your concentration.
          </p>

          <div className="flex flex-wrap gap-4">
            <span className="rounded-full bg-[oklch(0.2_0.02_260)] px-4 py-2 text-sm">
              🪑 10 Actionable Tips
            </span>
            <span className="rounded-full bg-[oklch(0.2_0.02_260)] px-4 py-2 text-sm">
              ⚡ Quick Wins Included
            </span>
            <span className="rounded-full bg-[oklch(0.2_0.02_260)] px-4 py-2 text-sm">
              🧘 Break Stretches Routine
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Why This Matters */}
        <section className="mb-16">
          <div className="rounded-2xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-8">
            <h2 className="mb-4 text-2xl font-semibold">The Hidden Cognitive Tax</h2>
            <p className="mb-6 leading-relaxed text-[oklch(0.75_0.01_260)]">
              Physical discomfort operates below conscious awareness but constantly consumes
              cognitive resources. A slight neck strain, subtle eye fatigue, or minor
              temperature discomfort each claim a portion of your mental bandwidth.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-[oklch(0.13_0.02_260)] p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-[oklch(0.8_0.15_0)]">-23%</div>
                <div className="text-sm text-[oklch(0.6_0.01_260)]">
                  Productivity loss from poor posture
                </div>
              </div>
              <div className="rounded-lg bg-[oklch(0.13_0.02_260)] p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-[oklch(0.8_0.15_250)]">65%</div>
                <div className="text-sm text-[oklch(0.6_0.01_260)]">
                  Workers report eye strain symptoms
                </div>
              </div>
              <div className="rounded-lg bg-[oklch(0.13_0.02_260)] p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-[oklch(0.8_0.15_150)]">+15%</div>
                <div className="text-sm text-[oklch(0.6_0.01_260)]">
                  Productivity with plants present
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10 Tips List */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">
            10 Ergonomic Tips for Deep Focus
          </h2>

          <div className="space-y-6">
            {ERGONOMIC_TIPS.map((tip) => {
              const IconComponent = tip.icon;
              return (
                <div
                  key={tip.number}
                  className="group rounded-2xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6 transition-all hover:border-[oklch(0.4_0.05_260)]"
                >
                  <div className="flex items-start gap-5">
                    {/* Number Badge */}
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold"
                      style={{ backgroundColor: `${tip.color}20`, color: tip.color }}
                    >
                      {tip.number}
                    </div>

                    <div className="flex-1">
                      {/* Header */}
                      <div className="mb-3 flex items-center gap-3">
                        <IconComponent
                          className="h-5 w-5"
                          style={{ color: tip.color }}
                        />
                        <h3 className="text-xl font-semibold">{tip.title}</h3>
                      </div>

                      {/* Why */}
                      <div className="mb-4">
                        <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[oklch(0.5_0.01_260)]">
                          Why It Matters
                        </span>
                        <p className="text-[oklch(0.75_0.01_260)]">{tip.why}</p>
                      </div>

                      {/* How */}
                      <div className="mb-4">
                        <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[oklch(0.5_0.01_260)]">
                          How To Do It
                        </span>
                        <p className="text-[oklch(0.75_0.01_260)]">{tip.how}</p>
                      </div>

                      {/* Quick Win */}
                      <div className="rounded-lg bg-[oklch(0.13_0.02_260)] p-3">
                        <span className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider" style={{ color: tip.color }}>
                          <CheckCircle2 className="h-3 w-3" />
                          Quick Win
                        </span>
                        <p className="text-sm text-[oklch(0.8_0.01_260)]">{tip.quickWin}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Break Stretches Routine */}
        <section className="mb-16">
          <div className="rounded-2xl border border-[oklch(0.3_0.1_150)] bg-gradient-to-br from-[oklch(0.18_0.05_150)] to-[oklch(0.15_0.02_260)] p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.25_0.1_150)]">
                <RotateCcw className="h-6 w-6 text-[oklch(0.8_0.15_150)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">2-Minute Break Stretch Routine</h2>
                <p className="text-sm text-[oklch(0.6_0.01_260)]">
                  Perfect for Pomodoro breaks • Do this every 25 minutes
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
              {BREAK_STRETCHES.map((stretch, index) => (
                <div
                  key={stretch.name}
                  className="rounded-xl bg-[oklch(0.13_0.02_260)] p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.25_0.1_150)] text-xs font-bold text-[oklch(0.9_0.15_150)]">
                      {index + 1}
                    </span>
                    <span className="text-xs text-[oklch(0.6_0.01_260)]">{stretch.duration}</span>
                  </div>
                  <h4 className="mb-1 font-medium text-[oklch(0.9_0.01_260)]">{stretch.name}</h4>
                  <p className="text-xs text-[oklch(0.6_0.01_260)]">{stretch.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[oklch(0.7_0.05_150)]">
              <Timer className="h-4 w-4" />
              <span>Total time: ~2 minutes • Repeat every Pomodoro cycle</span>
            </div>
          </div>
        </section>

        {/* Summary Checklist */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Quick Setup Checklist</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6">
              <h3 className="mb-4 font-semibold text-[oklch(0.8_0.15_250)]">
                🖥️ Display & Viewing
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Monitor at eye level (top of screen at eye height)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Arm&apos;s length distance from screen (20-26 inches)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>No window glare on screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Bias lighting behind monitor</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6">
              <h3 className="mb-4 font-semibold text-[oklch(0.8_0.15_150)]">
                🪑 Seating & Posture
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Feet flat on floor or footrest</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Thighs parallel to ground</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Lower back supported</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Elbows at 90-110° angle</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6">
              <h3 className="mb-4 font-semibold text-[oklch(0.8_0.15_85)]">
                🌡️ Environment
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Temperature 70-72°F (21-22°C)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Noise managed (headphones or white noise)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Plant or nature element visible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Phone out of sight</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6">
              <h3 className="mb-4 font-semibold text-[oklch(0.8_0.15_320)]">
                ⏰ Habits
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>20-20-20 rule for eyes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Stretch routine every break</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Stand/walk during long breaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.7_0.15_150)]" />
                  <span>Timer-based work system</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)]"
              >
                <summary className="cursor-pointer p-6 font-medium hover:text-[oklch(0.8_0.15_150)]">
                  {faq.question}
                </summary>
                <div className="border-t border-[oklch(0.25_0.02_260)] px-6 py-4 text-[oklch(0.75_0.01_260)]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <div className="rounded-2xl bg-gradient-to-r from-[oklch(0.25_0.08_150)] to-[oklch(0.2_0.06_200)] p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Ready to Optimize Your Focus Environment?
            </h2>
            <p className="mb-6 text-[oklch(0.8_0.01_260)]">
              Combine your new ergonomic setup with structured work sessions.
              <br />
              Pomobox&apos;s Pomodoro timer helps you maintain breaks for stretching and eye rest.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.9_0.01_260)] px-8 py-4 font-semibold text-[oklch(0.15_0.02_260)] transition-transform hover:scale-105"
            >
              Start Focused Work Session
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/blog/science-of-breaks"
              className="group rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6 transition-all hover:border-[oklch(0.4_0.05_260)]"
            >
              <h3 className="mb-2 font-semibold group-hover:text-[oklch(0.8_0.15_150)]">
                The Science of Breaks
              </h3>
              <p className="text-sm text-[oklch(0.6_0.01_260)]">
                Why rest intervals boost your productivity
              </p>
            </Link>
            <Link
              href="/blog/energy-management-not-time"
              className="group rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6 transition-all hover:border-[oklch(0.4_0.05_260)]"
            >
              <h3 className="mb-2 font-semibold group-hover:text-[oklch(0.8_0.15_150)]">
                Energy Management vs Time Management
              </h3>
              <p className="text-sm text-[oklch(0.6_0.01_260)]">
                Why managing energy matters more than time
              </p>
            </Link>
            <Link
              href="/blog/deep-work-method"
              className="group rounded-xl border border-[oklch(0.3_0.02_260)] bg-[oklch(0.16_0.02_260)] p-6 transition-all hover:border-[oklch(0.4_0.05_260)]"
            >
              <h3 className="mb-2 font-semibold group-hover:text-[oklch(0.8_0.15_150)]">
                Deep Work Method
              </h3>
              <p className="text-sm text-[oklch(0.6_0.01_260)]">
                Strategies for focused, distraction-free work
              </p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
