"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Volume2, VolumeX, Play, Pause, RotateCcw, Timer, Brain, Headphones, CheckCircle2 } from "lucide-react"

interface SoundFocusExperimentProps {
  className?: string
}

type SoundType = "silence" | "white" | "rain" | "cafe" | "forest"
type TestPhase = "intro" | "testing" | "results"

interface TestResult {
  soundType: SoundType
  correctAnswers: number
  totalQuestions: number
  responseTime: number[]
}

const SOUND_INFO: Record<SoundType, { label: string; description: string; research: string }> = {
  silence: {
    label: "Silence",
    description: "Complete quiet",
    research: "Best for complex analytical tasks requiring deep concentration",
  },
  white: {
    label: "White Noise",
    description: "Consistent broadband sound",
    research: "Masks distracting sounds, improves focus for moderate-difficulty tasks",
  },
  rain: {
    label: "Rain Sounds",
    description: "Natural rainfall patterns",
    research: "Reduces stress, promotes relaxed focus state",
  },
  cafe: {
    label: "Cafe Ambience",
    description: "Background chatter at ~70dB",
    research: "Enhances creative thinking via moderate arousal level",
  },
  forest: {
    label: "Forest Sounds",
    description: "Birds, wind, nature",
    research: "Lowers cortisol, improves mood and sustained attention",
  },
}

const MATH_PROBLEMS = [
  { q: "7 × 8 = ?", a: 56 },
  { q: "12 × 9 = ?", a: 108 },
  { q: "15 + 27 = ?", a: 42 },
  { q: "84 ÷ 7 = ?", a: 12 },
  { q: "13 × 6 = ?", a: 78 },
  { q: "99 - 36 = ?", a: 63 },
  { q: "8 × 11 = ?", a: 88 },
  { q: "144 ÷ 12 = ?", a: 12 },
  { q: "45 + 38 = ?", a: 83 },
  { q: "16 × 4 = ?", a: 64 },
]

export function SoundFocusExperiment({ className = "" }: SoundFocusExperimentProps) {
  const [phase, setPhase] = useState<TestPhase>("intro")
  const [selectedSound, setSelectedSound] = useState<SoundType>("silence")
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [results, setResults] = useState<TestResult[]>([])
  const [currentResult, setCurrentResult] = useState<{
    correct: number
    times: number[]
  }>({ correct: 0, times: [] })
  const [problemStartTime, setProblemStartTime] = useState(0)
  const [problems, setProblems] = useState<typeof MATH_PROBLEMS>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopSound = useCallback(() => {
    if (noiseNodeRef.current) {
      try {
        noiseNodeRef.current.stop()
      } catch {
        // Already stopped
      }
      noiseNodeRef.current = null
    }
    setIsPlaying(false)
  }, [])

  const playSound = useCallback((soundType: SoundType) => {
    stopSound()
    if (soundType === "silence") return

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current

    // Create gain node
    const gainNode = ctx.createGain()
    gainNode.gain.value = 0.15
    gainNode.connect(ctx.destination)
    gainNodeRef.current = gainNode

    // Generate noise based on type
    const sampleRate = ctx.sampleRate
    const duration = 10 // 10 seconds buffer, will loop
    const bufferSize = sampleRate * duration
    const buffer = ctx.createBuffer(2, bufferSize, sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel)

      if (soundType === "white") {
        // White noise
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1
        }
      } else if (soundType === "rain") {
        // Pink noise (rain-like)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + white * 0.0555179
          b1 = 0.99332 * b1 + white * 0.0750759
          b2 = 0.96900 * b2 + white * 0.1538520
          b3 = 0.86650 * b3 + white * 0.3104856
          b4 = 0.55000 * b4 + white * 0.5329522
          b5 = -0.7616 * b5 - white * 0.0168980
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
          b6 = white * 0.115926
        }
      } else if (soundType === "cafe") {
        // Brown noise (cafe-like murmur)
        let lastOut = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          data[i] = (lastOut + (0.02 * white)) / 1.02
          lastOut = data[i]
          data[i] *= 3.5
        }
      } else if (soundType === "forest") {
        // Green noise (forest-like)
        let lastOut = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          // Mix pink and brown for "green" noise
          const pink = white * 0.3
          const brown = (lastOut + (0.02 * white)) / 1.02
          lastOut = brown
          data[i] = (pink + brown * 2) * 0.5
          // Add occasional "chirp" variations
          if (Math.random() < 0.0001) {
            data[i] += Math.sin(i * 0.1) * 0.2
          }
        }
      }
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    source.connect(gainNode)
    source.start()
    noiseNodeRef.current = source
    setIsPlaying(true)
  }, [stopSound])

  useEffect(() => {
    return () => {
      stopSound()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopSound])

  const shuffleProblems = () => {
    const shuffled = [...MATH_PROBLEMS].sort(() => Math.random() - 0.5).slice(0, 5)
    setProblems(shuffled)
  }

  const startTest = () => {
    shuffleProblems()
    setPhase("testing")
    setCurrentProblem(0)
    setCurrentResult({ correct: 0, times: [] })
    setProblemStartTime(Date.now())
    if (selectedSound !== "silence") {
      playSound(selectedSound)
    }
  }

  const submitAnswer = () => {
    const responseTime = Date.now() - problemStartTime
    const isCorrect = parseInt(userAnswer) === problems[currentProblem].a

    const newResult = {
      correct: currentResult.correct + (isCorrect ? 1 : 0),
      times: [...currentResult.times, responseTime],
    }
    setCurrentResult(newResult)
    setUserAnswer("")

    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1)
      setProblemStartTime(Date.now())
    } else {
      // Test complete
      stopSound()
      const avgTime = newResult.times.reduce((a, b) => a + b, 0) / newResult.times.length
      setResults([
        ...results,
        {
          soundType: selectedSound,
          correctAnswers: newResult.correct,
          totalQuestions: problems.length,
          responseTime: newResult.times,
        },
      ])
      setPhase("results")
    }
  }

  const reset = () => {
    setPhase("intro")
    setResults([])
    setCurrentProblem(0)
    setUserAnswer("")
    stopSound()
  }

  const tryAnotherSound = () => {
    setPhase("intro")
    stopSound()
  }

  const getBestSound = () => {
    if (results.length === 0) return null
    return results.reduce((best, current) => {
      const bestScore = best.correctAnswers / best.totalQuestions
      const currentScore = current.correctAnswers / current.totalQuestions
      if (currentScore > bestScore) return current
      if (currentScore === bestScore) {
        const bestAvgTime = best.responseTime.reduce((a, b) => a + b, 0) / best.responseTime.length
        const currentAvgTime = current.responseTime.reduce((a, b) => a + b, 0) / current.responseTime.length
        return currentAvgTime < bestAvgTime ? current : best
      }
      return best
    })
  }

  return (
    <div className={`relative ${className}`}>
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent border border-teal-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/20 text-teal-600 dark:text-teal-400 mb-3">
            <Headphones className="h-3 w-3" />
            Sound Focus Experiment
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Find Your Optimal Focus Sound
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Test how different sounds affect your cognitive performance
          </p>
        </div>

        {phase === "intro" && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-sm text-muted-foreground">
                Complete a quick math test while listening to different sounds.
                Compare your accuracy and speed to find what works best for you.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-foreground text-center mb-4">
                Select a sound to test:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(Object.keys(SOUND_INFO) as SoundType[]).map((sound) => {
                  const tested = results.some((r) => r.soundType === sound)
                  return (
                    <button
                      key={sound}
                      onClick={() => setSelectedSound(sound)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        selectedSound === sound
                          ? "bg-teal-500/10 border-teal-500/50"
                          : "bg-card/60 border-border/50 hover:border-teal-500/30"
                      }`}
                    >
                      {tested && (
                        <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                      )}
                      <div className="flex items-center gap-2 mb-1">
                        {sound === "silence" ? (
                          <VolumeX className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-teal-500" />
                        )}
                        <span className={`font-medium text-sm ${
                          selectedSound === sound ? "text-teal-600 dark:text-teal-400" : "text-foreground"
                        }`}>
                          {SOUND_INFO[sound].label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {SOUND_INFO[sound].description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Preview Sound */}
            {selectedSound !== "silence" && (
              <div className="flex justify-center">
                <button
                  onClick={() => isPlaying ? stopSound() : playSound(selectedSound)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Stop Preview
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Preview Sound
                    </>
                  )}
                </button>
              </div>
            )}

            <button
              onClick={startTest}
              className="w-full py-3 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors"
            >
              Start Test with {SOUND_INFO[selectedSound].label}
            </button>

            {results.length > 0 && (
              <p className="text-xs text-center text-muted-foreground">
                {results.length} sound{results.length > 1 ? "s" : ""} tested.
                Try more to compare results!
              </p>
            )}
          </div>
        )}

        {phase === "testing" && problems.length > 0 && (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Question {currentProblem + 1} of {problems.length}
              </span>
              <span className="text-teal-500 font-medium">
                {SOUND_INFO[selectedSound].label}
              </span>
            </div>
            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
              />
            </div>

            {/* Problem */}
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-foreground mb-6">
                {problems[currentProblem].q}
              </div>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && userAnswer && submitAnswer()}
                placeholder="Your answer"
                autoFocus
                className="w-32 text-center text-2xl font-medium p-3 rounded-xl bg-card border border-border focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={submitAnswer}
              disabled={!userAnswer}
              className="w-full py-3 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answer
            </button>
          </div>
        )}

        {phase === "results" && (
          <div className="space-y-6">
            {/* Latest Result */}
            <div className="p-5 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  {SOUND_INFO[results[results.length - 1].soundType].label}
                </span>
                <span className="text-sm text-muted-foreground">Just tested</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-background/50 text-center">
                  <div className="text-2xl font-bold text-teal-500">
                    {results[results.length - 1].correctAnswers}/{results[results.length - 1].totalQuestions}
                  </div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 text-center">
                  <div className="text-2xl font-bold text-teal-500">
                    {Math.round(
                      results[results.length - 1].responseTime.reduce((a, b) => a + b, 0) /
                        results[results.length - 1].responseTime.length / 100
                    ) / 10}s
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Time</div>
                </div>
              </div>
            </div>

            {/* All Results Comparison */}
            {results.length > 1 && (
              <div className="p-4 rounded-xl bg-card/60 border border-border/50">
                <div className="text-sm font-medium text-foreground mb-3">All Results:</div>
                <div className="space-y-2">
                  {results.map((result, i) => {
                    const avgTime = result.responseTime.reduce((a, b) => a + b, 0) / result.responseTime.length
                    const accuracy = (result.correctAnswers / result.totalQuestions) * 100
                    const isBest = getBestSound()?.soundType === result.soundType
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          isBest ? "bg-emerald-500/10" : "bg-muted/20"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isBest && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                          <span className="text-sm text-foreground">
                            {SOUND_INFO[result.soundType].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={isBest ? "text-emerald-500 font-medium" : "text-muted-foreground"}>
                            {accuracy}%
                          </span>
                          <span className="text-muted-foreground">
                            {Math.round(avgTime / 100) / 10}s
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Research Insight */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Research Insight</p>
                  <p className="text-sm text-muted-foreground">
                    {SOUND_INFO[results[results.length - 1].soundType].research}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={tryAnotherSound}
                className="py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm"
              >
                Test Another Sound
              </button>
              <button
                onClick={reset}
                className="py-2 rounded-xl bg-muted/50 text-muted-foreground font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </button>
            </div>

            {results.length >= 3 && getBestSound() && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <p className="text-sm text-foreground">
                  Based on your tests, <strong className="text-emerald-500">{SOUND_INFO[getBestSound()!.soundType].label}</strong> appears
                  to work best for your focus.
                </p>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border/50 mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Try your optimal sound during a focus session
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-500 font-medium text-sm transition-colors"
          >
            <Timer className="h-4 w-4" />
            Start Focus Session with BGM
          </a>
        </div>
      </div>
    </div>
  )
}
