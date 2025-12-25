export type BgmCategory = 'lofi' | 'nature' | 'whitenoise'

export interface BgmTrack {
  id: string
  labelKey: string // i18n key
  category: BgmCategory
}

export const BGM_TRACKS: BgmTrack[] = [
  // Lo-fi / Chill
  { id: 'lofi-chill', labelKey: 'lofiChill', category: 'lofi' },
  { id: 'lofi-jazz', labelKey: 'lofiJazz', category: 'lofi' },
  { id: 'lofi-piano', labelKey: 'lofiPiano', category: 'lofi' },

  // Nature
  { id: 'rain', labelKey: 'rain', category: 'nature' },
  { id: 'forest', labelKey: 'forest', category: 'nature' },
  { id: 'ocean', labelKey: 'ocean', category: 'nature' },
  { id: 'fireplace', labelKey: 'fireplace', category: 'nature' },

  // White Noise
  { id: 'whitenoise', labelKey: 'whitenoise', category: 'whitenoise' },
  { id: 'brownnoise', labelKey: 'brownnoise', category: 'whitenoise' },
  { id: 'pinknoise', labelKey: 'pinknoise', category: 'whitenoise' },
]

export function getTracksByCategory(category: BgmCategory): BgmTrack[] {
  return BGM_TRACKS.filter(track => track.category === category)
}

// Musical note frequencies for ambient generation
const NOTE = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
}

// BGM Player class for continuous ambient playback
export class BgmPlayer {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private oscillators: OscillatorNode[] = []
  private noiseNode: AudioBufferSourceNode | null = null
  private isPlaying = false
  private currentTrackId: string | null = null
  private loopInterval: ReturnType<typeof setInterval> | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.connect(this.audioContext.destination)
      this.masterGain.gain.value = 0.3
    }
  }

  setVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = volume
    }
  }

  getVolume(): number {
    return this.masterGain?.gain.value ?? 0.3
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying
  }

  getCurrentTrack(): string | null {
    return this.currentTrackId
  }

  async play(trackId: string): Promise<void> {
    // Stop current playback
    this.stop()

    if (!this.audioContext || !this.masterGain) return

    // Resume context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }

    this.currentTrackId = trackId
    this.isPlaying = true

    switch (trackId) {
      case 'lofi-chill':
        this.playLofiChill()
        break
      case 'lofi-jazz':
        this.playLofiJazz()
        break
      case 'lofi-piano':
        this.playLofiPiano()
        break
      case 'rain':
        this.playRain()
        break
      case 'forest':
        this.playForest()
        break
      case 'ocean':
        this.playOcean()
        break
      case 'fireplace':
        this.playFireplace()
        break
      case 'whitenoise':
        this.playWhiteNoise()
        break
      case 'brownnoise':
        this.playBrownNoise()
        break
      case 'pinknoise':
        this.playPinkNoise()
        break
      default:
        this.playLofiChill()
    }
  }

  stop(): void {
    this.isPlaying = false
    this.currentTrackId = null

    // Stop all oscillators
    this.oscillators.forEach(osc => {
      try {
        osc.stop()
        osc.disconnect()
      } catch {
        // Ignore errors
      }
    })
    this.oscillators = []

    // Stop noise node
    if (this.noiseNode) {
      try {
        this.noiseNode.stop()
        this.noiseNode.disconnect()
      } catch {
        // Ignore errors
      }
      this.noiseNode = null
    }

    // Clear loop interval
    if (this.loopInterval) {
      clearInterval(this.loopInterval)
      this.loopInterval = null
    }
  }

  destroy(): void {
    this.stop()
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
    }
  }

  // ============================================
  // LO-FI AMBIENT GENERATORS
  // ============================================

  private playLofiChill(): void {
    if (!this.audioContext || !this.masterGain) return

    const playChord = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return

      const chords = [
        [NOTE.C3, NOTE.E3, NOTE.G3, NOTE.B3],
        [NOTE.A2, NOTE.C3, NOTE.E3, NOTE.G3],
        [NOTE.F3, NOTE.A3, NOTE.C4, NOTE.E4],
        [NOTE.G3, NOTE.B3, NOTE.D4, NOTE.F4],
      ]
      const chord = chords[Math.floor(Math.random() * chords.length)]

      chord.forEach((freq, i) => {
        const osc = this.audioContext!.createOscillator()
        const gain = this.audioContext!.createGain()

        osc.connect(gain)
        gain.connect(this.masterGain!)

        osc.type = 'triangle'
        osc.frequency.value = freq

        const now = this.audioContext!.currentTime
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.08 - i * 0.01, now + 0.5)
        gain.gain.setValueAtTime(0.08 - i * 0.01, now + 3.5)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4)

        osc.start(now)
        osc.stop(now + 4)
        this.oscillators.push(osc)
      })
    }

    playChord()
    this.loopInterval = setInterval(playChord, 4000)
  }

  private playLofiJazz(): void {
    if (!this.audioContext || !this.masterGain) return

    const playJazzChord = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return

      // Jazz 7th chords
      const chords = [
        [NOTE.C3, NOTE.E3, NOTE.G3, NOTE.B3],
        [NOTE.D3, NOTE.F3, NOTE.A3, NOTE.C4],
        [NOTE.E3, NOTE.G3, NOTE.B3, NOTE.D4],
        [NOTE.A2, NOTE.C3, NOTE.E3, NOTE.G3],
      ]
      const chord = chords[Math.floor(Math.random() * chords.length)]

      chord.forEach((freq, i) => {
        const osc = this.audioContext!.createOscillator()
        const gain = this.audioContext!.createGain()

        osc.connect(gain)
        gain.connect(this.masterGain!)

        osc.type = i % 2 === 0 ? 'triangle' : 'sine'
        osc.frequency.value = freq * (1 + (Math.random() - 0.5) * 0.01) // slight detune

        const now = this.audioContext!.currentTime
        const delay = i * 0.1
        gain.gain.setValueAtTime(0, now + delay)
        gain.gain.linearRampToValueAtTime(0.06, now + delay + 0.3)
        gain.gain.setValueAtTime(0.06, now + delay + 2.5)
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 3)

        osc.start(now + delay)
        osc.stop(now + delay + 3)
        this.oscillators.push(osc)
      })
    }

    playJazzChord()
    this.loopInterval = setInterval(playJazzChord, 3500)
  }

  private playLofiPiano(): void {
    if (!this.audioContext || !this.masterGain) return

    const playNote = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return

      const notes = [NOTE.C4, NOTE.E4, NOTE.G4, NOTE.A4, NOTE.C3, NOTE.G3]
      const freq = notes[Math.floor(Math.random() * notes.length)]

      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.type = 'triangle'
      osc.frequency.value = freq

      const now = this.audioContext.currentTime
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.15, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2)

      osc.start(now)
      osc.stop(now + 2)
      this.oscillators.push(osc)
    }

    playNote()
    this.loopInterval = setInterval(playNote, 1500 + Math.random() * 1000)
  }

  // ============================================
  // NATURE AMBIENT GENERATORS
  // ============================================

  private playRain(): void {
    if (!this.audioContext || !this.masterGain) return

    // Filtered white noise for rain
    const bufferSize = this.audioContext.sampleRate * 2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.audioContext.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    // Low-pass filter for rain-like sound
    const filter = this.audioContext.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 2000

    noise.connect(filter)
    filter.connect(this.masterGain)

    noise.start()
    this.noiseNode = noise

    // Add occasional "drip" sounds
    const playDrip = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return

      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.type = 'sine'
      osc.frequency.value = 800 + Math.random() * 400

      const now = this.audioContext.currentTime
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc.start(now)
      osc.stop(now + 0.3)
      this.oscillators.push(osc)
    }

    this.loopInterval = setInterval(playDrip, 500 + Math.random() * 1000)
  }

  private playForest(): void {
    if (!this.audioContext || !this.masterGain) return

    // Base ambient drone
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.masterGain)

    osc.type = 'sine'
    osc.frequency.value = NOTE.C2
    gain.gain.value = 0.08

    osc.start()
    this.oscillators.push(osc)

    // Bird-like chirps
    const playBird = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return

      const birdOsc = this.audioContext.createOscillator()
      const birdGain = this.audioContext.createGain()

      birdOsc.connect(birdGain)
      birdGain.connect(this.masterGain)

      birdOsc.type = 'sine'
      const baseFreq = 1000 + Math.random() * 500

      const now = this.audioContext.currentTime
      birdOsc.frequency.setValueAtTime(baseFreq, now)
      birdOsc.frequency.linearRampToValueAtTime(baseFreq * 1.2, now + 0.1)
      birdOsc.frequency.linearRampToValueAtTime(baseFreq, now + 0.2)

      birdGain.gain.setValueAtTime(0, now)
      birdGain.gain.linearRampToValueAtTime(0.08, now + 0.05)
      birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      birdOsc.start(now)
      birdOsc.stop(now + 0.3)
      this.oscillators.push(birdOsc)
    }

    this.loopInterval = setInterval(playBird, 2000 + Math.random() * 3000)
  }

  private playOcean(): void {
    if (!this.audioContext || !this.masterGain) return

    // Create wave-like sound using modulated noise
    const bufferSize = this.audioContext.sampleRate * 4
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      // Modulate noise amplitude for wave effect
      const wavePhase = (i / this.audioContext.sampleRate) * 0.15 * Math.PI * 2
      const waveAmp = 0.3 + 0.7 * Math.sin(wavePhase)
      data[i] = (Math.random() * 2 - 1) * waveAmp
    }

    const noise = this.audioContext.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    const filter = this.audioContext.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 800

    noise.connect(filter)
    filter.connect(this.masterGain)

    noise.start()
    this.noiseNode = noise
  }

  private playFireplace(): void {
    if (!this.audioContext || !this.masterGain) return

    // Crackling fire using filtered noise bursts
    const playBurst = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return

      const bufferSize = this.audioContext.sampleRate * 0.1
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3))
      }

      const noise = this.audioContext.createBufferSource()
      noise.buffer = buffer

      const filter = this.audioContext.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 500 + Math.random() * 1000
      filter.Q.value = 2

      const gain = this.audioContext.createGain()
      gain.gain.value = 0.15 + Math.random() * 0.1

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(this.masterGain)

      noise.start()
    }

    // Base rumble
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.masterGain)

    osc.type = 'sawtooth'
    osc.frequency.value = 40
    gain.gain.value = 0.05

    osc.start()
    this.oscillators.push(osc)

    playBurst()
    this.loopInterval = setInterval(playBurst, 100 + Math.random() * 200)
  }

  // ============================================
  // NOISE GENERATORS
  // ============================================

  private playWhiteNoise(): void {
    if (!this.audioContext || !this.masterGain) return

    const bufferSize = this.audioContext.sampleRate * 2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.audioContext.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    const gain = this.audioContext.createGain()
    gain.gain.value = 0.5

    noise.connect(gain)
    gain.connect(this.masterGain)

    noise.start()
    this.noiseNode = noise
  }

  private playBrownNoise(): void {
    if (!this.audioContext || !this.masterGain) return

    const bufferSize = this.audioContext.sampleRate * 2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (lastOut + 0.02 * white) / 1.02
      lastOut = data[i]
      data[i] *= 3.5 // Normalize
    }

    const noise = this.audioContext.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    noise.connect(this.masterGain)
    noise.start()
    this.noiseNode = noise
  }

  private playPinkNoise(): void {
    if (!this.audioContext || !this.masterGain) return

    const bufferSize = this.audioContext.sampleRate * 2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      data[i] *= 0.11 // Normalize
      b6 = white * 0.115926
    }

    const noise = this.audioContext.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    noise.connect(this.masterGain)
    noise.start()
    this.noiseNode = noise
  }
}

// Singleton instance
let bgmPlayerInstance: BgmPlayer | null = null

export function getBgmPlayer(): BgmPlayer {
  if (!bgmPlayerInstance) {
    bgmPlayerInstance = new BgmPlayer()
  }
  return bgmPlayerInstance
}
