export interface SoundOption {
  label: string
  value: string
  frequency: number // Hz
  duration: number // seconds
  type: 'sine' | 'square' | 'sawtooth' | 'triangle'
}

export const SOUND_OPTIONS: SoundOption[] = [
  { label: "Bell (Default)", value: "bell", frequency: 800, duration: 0.2, type: 'sine' },
  { label: "Chime", value: "chime", frequency: 1200, duration: 0.3, type: 'sine' },
  { label: "Beep", value: "beep", frequency: 440, duration: 0.15, type: 'square' },
  { label: "Digital", value: "digital", frequency: 880, duration: 0.1, type: 'square' },
  { label: "Ding", value: "ding", frequency: 1500, duration: 0.25, type: 'sine' },
  { label: "Soft Tone", value: "soft", frequency: 600, duration: 0.4, type: 'sine' },
  { label: "Alert", value: "alert", frequency: 1000, duration: 0.2, type: 'sawtooth' },
  { label: "Notification", value: "notification", frequency: 750, duration: 0.18, type: 'triangle' },
  { label: "Gentle", value: "gentle", frequency: 500, duration: 0.35, type: 'sine' },
  { label: "Classic", value: "classic", frequency: 660, duration: 0.22, type: 'triangle' },
]

// Generate sound using Web Audio API
export function playSound(soundType: string, volume: number): void {
  const sound = SOUND_OPTIONS.find(s => s.value === soundType) || SOUND_OPTIONS[0]

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = sound.type
    oscillator.frequency.value = sound.frequency

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + sound.duration)
  } catch (error) {
    console.error('Failed to play sound:', error)
  }
}

// For backward compatibility (deprecated)
export function getSoundAudio(soundType: string): string {
  // Return base64 fallback for compatibility
  return "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUhELTKXh8bllHAU2jdXyz3YnBSp+zPDajzsIEViy6OyrWBUIQ5zd8sFuJAUwhM/x1YU5CBZnvezno1QTCkml4PG6aB4EOIzU8dF0KAYAAAA="
}
