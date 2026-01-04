"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Music,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { BGM_TRACKS, getBgmPlayer, type RepeatMode } from "@/lib/bgm"

// Track label lookup for English strings
const TRACK_LABELS: Record<string, string> = {
  goodNightLofi: "Good Night Lofi",
  lofiStudy: "Lofi Study",
  chillStudyDesk: "Chill Study Desk",
  christmasJazz: "Christmas Jazz",
  silentNightPiano: "Silent Night (Piano)",
  amazingGrace: "Amazing Grace",
  silentNightOrchestra: "Silent Night (Orchestra)",
  santasTreasure: "Santa's Treasure",
  longStroll: "Long Stroll",
}

export function BgmMiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all')
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(30)
  const currentTrackIndexRef = useRef(currentTrackIndex)

  const player = typeof window !== "undefined" ? getBgmPlayer() : null
  const currentTrack = BGM_TRACKS[currentTrackIndex]

  // Get track label from lookup
  const getTrackLabel = (labelKey: string) => {
    return TRACK_LABELS[labelKey] || labelKey
  }

  // Sync with player on mount
  useEffect(() => {
    if (player) {
      setIsPlaying(player.isCurrentlyPlaying())
      const current = player.getCurrentTrack()
      if (current) {
        const idx = BGM_TRACKS.findIndex((t) => t.id === current)
        if (idx >= 0) setCurrentTrackIndex(idx)
      }
    }
  }, [player])

  // Keep ref in sync
  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex
  }, [currentTrackIndex])

  // Handle track ended
  useEffect(() => {
    if (!player) return

    const handleTrackEnded = () => {
      const currentIdx = currentTrackIndexRef.current

      if (repeatMode === 'off') {
        setIsPlaying(false)
        return
      }

      if (repeatMode === 'one') return

      let nextIndex: number
      if (isShuffled) {
        do {
          nextIndex = Math.floor(Math.random() * BGM_TRACKS.length)
        } while (nextIndex === currentIdx && BGM_TRACKS.length > 1)
      } else {
        nextIndex = (currentIdx + 1) % BGM_TRACKS.length
      }

      const track = BGM_TRACKS[nextIndex]
      player.setVolume(isMuted ? 0 : volume / 100)
      player.play(track.id)
      setCurrentTrackIndex(nextIndex)
      setIsPlaying(true)
    }

    player.onEnded(handleTrackEnded)
  }, [player, repeatMode, isShuffled, volume, isMuted])

  useEffect(() => {
    if (player) {
      player.setLoop(repeatMode === 'one')
    }
  }, [player, repeatMode])

  const playTrack = useCallback(
    (index: number) => {
      if (!player) return
      const track = BGM_TRACKS[index]
      player.setVolume(isMuted ? 0 : volume / 100)
      player.play(track.id)
      setCurrentTrackIndex(index)
      setIsPlaying(true)
    },
    [player, volume, isMuted]
  )

  const handlePlayPause = useCallback(() => {
    if (!player) return

    if (isPlaying) {
      player.pause()
      setIsPlaying(false)
    } else {
      playTrack(currentTrackIndex)
    }
  }, [player, isPlaying, currentTrackIndex, playTrack])

  const handlePrevious = useCallback(() => {
    const newIndex = currentTrackIndex === 0 ? BGM_TRACKS.length - 1 : currentTrackIndex - 1
    if (isPlaying) {
      playTrack(newIndex)
    } else {
      setCurrentTrackIndex(newIndex)
    }
  }, [currentTrackIndex, isPlaying, playTrack])

  const handleNext = useCallback(() => {
    let newIndex: number
    if (isShuffled) {
      do {
        newIndex = Math.floor(Math.random() * BGM_TRACKS.length)
      } while (newIndex === currentTrackIndex && BGM_TRACKS.length > 1)
    } else {
      newIndex = (currentTrackIndex + 1) % BGM_TRACKS.length
    }

    if (isPlaying) {
      playTrack(newIndex)
    } else {
      setCurrentTrackIndex(newIndex)
    }
  }, [isShuffled, currentTrackIndex, isPlaying, playTrack])

  return (
    <Card className="glass-card border-0 overflow-hidden">
      {/* Mini Player (always visible) */}
      <div className="flex items-center gap-3 p-3">
        {/* Music Icon with animation */}
        <div className={`relative p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 ${isPlaying ? 'music-playing' : ''}`}>
          <Music className="h-4 w-4 text-primary" />
          {isPlaying && (
            <div className="absolute -right-0.5 -bottom-0.5 flex items-end gap-[1px]">
              <span className="w-[2px] h-1.5 bg-primary rounded-full animate-music-bar-1" />
              <span className="w-[2px] h-2 bg-primary rounded-full animate-music-bar-2" />
              <span className="w-[2px] h-1 bg-primary rounded-full animate-music-bar-3" />
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{getTrackLabel(currentTrack.labelKey)}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handlePrevious}
            aria-label="Previous track"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon"
            className={`h-9 w-9 rounded-full ${
              isPlaying
                ? 'bg-primary glow-primary'
                : 'bg-primary'
            }`}
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 text-primary-foreground" />
            ) : (
              <Play className="h-3.5 w-3.5 ml-0.5 text-primary-foreground" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleNext}
            aria-label="Next track"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Expand Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-border/50">
          <div className="grid grid-cols-2 gap-2 mt-2">
            {BGM_TRACKS.slice(0, 4).map((track, index) => (
              <button
                key={track.id}
                onClick={() => playTrack(index)}
                className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-colors ${
                  track.id === currentTrack.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/50"
                }`}
              >
                {track.id === currentTrack.id && isPlaying ? (
                  <span className="w-3 h-3 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  </span>
                ) : (
                  <Music className="h-3 w-3 text-muted-foreground" />
                )}
                <span className="truncate">{getTrackLabel(track.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
