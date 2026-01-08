import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Volume2, Brain, Waves, TreePine, CloudRain, Coffee, Bird, Headphones, BookOpen, Zap } from "lucide-react"
import { SoundFocusExperiment } from "@/components/ui/sound-focus-experiment"

export const metadata: Metadata = {
  title: "The Science of Nature Sounds and Focus: Why Rain and Forest Sounds Help | Pomobox",
  description: "Discover the neuroscience behind why nature sounds improve focus and productivity. Learn which ambient sounds work best for different tasks based on research.",
  keywords: [
    "nature sounds focus",
    "ambient sounds productivity",
    "white noise concentration",
    "rain sounds work",
    "background noise focus",
    "cafe sounds creativity",
    "biophilic sounds",
    "sound masking",
  ],
  openGraph: {
    title: "The Science of Nature Sounds and Focus | Pomobox",
    description: "Why rain, forest, and ambient sounds improve concentration. Research-backed guide to choosing the right background audio for deep work.",
    type: "article",
    publishedTime: "2025-01-08",
    authors: ["Pomobox Team"],
  },
  alternates: {
    canonical: "https://pomobox.co/blog/nature-sounds-focus",
  },
}

export default function NatureSoundsFocusPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Science of Nature Sounds and Focus",
    description: "Discover the neuroscience behind why nature sounds improve focus and productivity.",
    datePublished: "2025-01-08",
    dateModified: "2025-01-08",
    author: {
      "@type": "Organization",
      name: "Pomobox",
      url: "https://pomobox.co",
    },
    publisher: {
      "@type": "Organization",
      name: "Pomobox",
      url: "https://pomobox.co",
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why do nature sounds help with focus?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nature sounds activate the parasympathetic nervous system while masking distracting sounds. They lower cortisol and provide acoustic stimulation without demanding attention.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best background sound for concentration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the task. For creative work, cafe sounds (~70dB) are ideal. For analytical work, nature sounds like rain work best. For repetitive tasks, white noise is effective.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-background">
        <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Navigation */}
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Volume2 className="h-3 w-3" />
                Sound Science
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                <Clock className="h-3 w-3" />
                9 min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Science of Nature Sounds and Focus
            </h1>
            <p className="text-lg text-muted-foreground">
              Why rain, forest sounds, and ambient noise improve concentration.
              Discover which sounds work best for different types of work based on neuroscience.
            </p>
          </header>

          {/* Interactive Component */}
          <SoundFocusExperiment className="mb-12" />

          {/* Introduction */}
          <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
            <p className="lead text-lg text-muted-foreground">
              You put on rain sounds and suddenly that report flows easier. The cafe hum seems
              to make creative ideas bubble up. But is this placebo, or is there real science
              behind why certain sounds boost focus? The answer lies in how our brains evolved
              to process our acoustic environment.
            </p>

            <p>
              Humans spent 99% of evolutionary history surrounded by natural soundscapes—rustling
              leaves, flowing water, distant animal calls. Our auditory system is calibrated for
              these sounds. Modern environments full of sudden noises, mechanical hums, and
              conversation fragments create a constant low-level stress response that drains
              cognitive resources. Natural sounds don&apos;t just mask distractions—they actively
              restore our capacity for focus.
            </p>
          </section>

          {/* The Neuroscience */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Brain className="h-6 w-6 text-teal-500" />
              How Sound Affects Your Brain
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-foreground">Distracting Sounds</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">-</span>
                    Activate fight-or-flight response
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">-</span>
                    Spike cortisol levels
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">-</span>
                    Hijack attentional resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">-</span>
                    Require active suppression (cognitive load)
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <TreePine className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-foreground">Nature Sounds</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">+</span>
                    Activate parasympathetic system (calm)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">+</span>
                    Lower cortisol by up to 25%
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">+</span>
                    Require zero attentional resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">+</span>
                    Mask sudden disruptive sounds
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-teal-500/5 border border-teal-500/20">
              <h4 className="font-semibold text-foreground mb-3">Key Research Finding</h4>
              <p className="text-sm text-muted-foreground">
                A 2017 study in <em>Scientific Reports</em> using fMRI scans found that natural sounds
                increased outward-focused attention (better for tasks) while artificial sounds
                increased inward-focused attention (associated with rumination and anxiety).
              </p>
            </div>
          </section>

          {/* Sound Types Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Headphones className="h-6 w-6 text-violet-500" />
              Matching Sounds to Tasks
            </h2>

            <div className="space-y-4">
              {/* White Noise */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center flex-shrink-0">
                    <Waves className="h-6 w-6 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">White / Pink Noise</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Consistent broadband sound covering all frequencies
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Best For</div>
                        <p className="text-muted-foreground">Data entry, proofreading, noisy environments</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <div className="font-medium text-foreground mb-1">Why It Works</div>
                        <p className="text-muted-foreground">Masks sudden sounds; consistent acoustic baseline</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rain Sounds */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <CloudRain className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Rain / Water Sounds</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Rainfall, streams, ocean waves—natural water patterns
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Best For</div>
                        <p className="text-muted-foreground">Writing, reading, deep analytical work</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <div className="font-medium text-foreground mb-1">Why It Works</div>
                        <p className="text-muted-foreground">Pink noise spectrum; triggers relaxation response</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forest Sounds */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Bird className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Forest / Birdsong</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Birds, wind through trees, rustling leaves
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Best For</div>
                        <p className="text-muted-foreground">Extended focus, recovery from mental fatigue</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <div className="font-medium text-foreground mb-1">Why It Works</div>
                        <p className="text-muted-foreground">Biophilic response; signals &quot;safe environment&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cafe Sounds */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Coffee className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Cafe Ambience</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Background chatter, espresso machines (~70dB)
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Best For</div>
                        <p className="text-muted-foreground">Creative work, brainstorming, ideation</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <div className="font-medium text-foreground mb-1">Why It Works</div>
                        <p className="text-muted-foreground">Moderate arousal boosts abstract thinking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Goldilocks Zone */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-cyan-500" />
              The Goldilocks Zone of Sound
            </h2>

            <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
              <p>
                Research from the <em>Journal of Consumer Research</em> found that moderate ambient
                noise around 70 decibels actually <strong>enhances creative performance</strong>
                compared to both silence and high noise levels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 mb-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-background/50">
                  <div className="text-3xl font-bold text-red-500 mb-2">&lt;50dB</div>
                  <div className="font-medium text-foreground text-sm mb-1">Too Quiet</div>
                  <p className="text-xs text-muted-foreground">
                    Under-stimulation leads to wandering attention.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-3xl font-bold text-emerald-500 mb-2">~70dB</div>
                  <div className="font-medium text-foreground text-sm mb-1">Optimal Zone</div>
                  <p className="text-xs text-muted-foreground">
                    Moderate arousal enhances abstract thinking.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-background/50">
                  <div className="text-3xl font-bold text-red-500 mb-2">&gt;85dB</div>
                  <div className="font-medium text-foreground text-sm mb-1">Too Loud</div>
                  <p className="text-xs text-muted-foreground">
                    Processing overload. Focus goes to suppressing noise.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidelines */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Practical Sound Strategy
            </h2>

            <div className="space-y-3">
              {[
                { task: "Deep analytical work", sound: "Rain or flowing water", reason: "Masks distractions without competing for analytical processing" },
                { task: "Creative tasks", sound: "Cafe ambience or moderate nature", reason: "Moderate arousal boosts divergent thinking" },
                { task: "Repetitive tasks", sound: "White/pink noise or music", reason: "Low cognitive demand means music won't interfere" },
                { task: "Reading and comprehension", sound: "Soft rain or forest sounds", reason: "Calm soundscape supports sustained attention" },
                { task: "Memorization and learning", sound: "Silence or very soft nature", reason: "Encoding benefits from minimal interference" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className="flex-1">
                      <span className="font-medium text-foreground">{item.task}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Volume2 className="h-4 w-4 text-teal-500" />
                      <span className="text-teal-600 dark:text-teal-400 font-medium">{item.sound}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{item.reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Music vs Ambient */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Music vs. Ambient Sounds
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
                <h3 className="font-semibold text-violet-600 dark:text-violet-400 mb-3">Music Works When:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Task is routine/well-practiced</li>
                  <li>You need mood/energy boost</li>
                  <li>Instrumental only (no lyrics for language tasks)</li>
                  <li>Familiar music (novelty is distracting)</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-teal-500/5 border border-teal-500/20">
                <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-3">Ambient Sounds Work When:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Task requires learning or complex thinking</li>
                  <li>You need sustained focus (2+ hours)</li>
                  <li>Environment has unpredictable interruptions</li>
                  <li>You want to reduce stress while working</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-amber-600 dark:text-amber-400">Research Note:</strong> Music
                with lyrics reduces reading/writing quality by 10-15%. For language tasks, use
                instrumental or ambient sounds.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Why do nature sounds help with focus?",
                  a: "Nature sounds activate the parasympathetic nervous system (rest-and-digest mode) while masking distracting sounds. They lower cortisol and provide acoustic stimulation without demanding attention.",
                },
                {
                  q: "What is the best background sound for concentration?",
                  a: "It depends on the task. For creative work, cafe sounds (~70dB) are ideal. For analytical work, nature sounds like rain work best. For repetitive tasks, white noise is effective.",
                },
                {
                  q: "Is silence or background noise better for studying?",
                  a: "Neither extreme is optimal. Complete silence can make small sounds distracting, while loud music competes for attention. Moderate ambient sounds (50-70dB) provide the ideal balance.",
                },
              ].map((faq, i) => (
                <div key={i} className="p-5 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent border border-teal-500/20">
              <h2 className="text-xl font-bold text-foreground mb-4">Find Your Focus Sound</h2>
              <p className="text-muted-foreground mb-4">
                The best sound for focus is personal—it depends on your task, environment, and
                individual neurology. Use the experiment above to test different options, then
                apply your optimal soundscape during your next Pomodoro session.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors"
                >
                  <Volume2 className="h-4 w-4" />
                  Try Focus Session with BGM
                </Link>
                <Link
                  href="/blog/psychology-of-timer-sounds"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
                >
                  Psychology of Timer Sounds
                </Link>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/psychology-of-timer-sounds"
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                  Psychology of Timer Sounds
                </h3>
                <p className="text-sm text-muted-foreground">
                  Why certain alarm tones create urgency while others gently guide transitions.
                </p>
              </Link>
              <Link
                href="/blog/ultradian-rhythms"
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                  Ultradian Rhythms and Focus
                </h3>
                <p className="text-sm text-muted-foreground">
                  Work with your body&apos;s natural 90-minute energy cycles for productivity.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}
