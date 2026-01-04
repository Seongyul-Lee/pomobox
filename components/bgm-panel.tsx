"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  List,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react"
import { BGM_TRACKS, getBgmPlayer, type BgmTrack, type RepeatMode } from "@/lib/bgm"

// Playback mode: shuffle → repeat-all → repeat-one → (cycle)
type PlaybackMode = 'shuffle' | 'repeat-all' | 'repeat-one'

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

export function BgmPanel() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(30)
  const [isMuted, setIsMuted] = useState(false)
  // Combined playback mode: shuffle → repeat-all → repeat-one
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('repeat-all')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showVolume, setShowVolume] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentTrackIndexRef = useRef(currentTrackIndex)

  // Derive shuffle and repeat from playbackMode
  const isShuffled = playbackMode === 'shuffle'
  const repeatMode: RepeatMode = playbackMode === 'repeat-one' ? 'one' : 'all'

  const player = typeof window !== "undefined" ? getBgmPlayer() : null
  const currentTrack = BGM_TRACKS[currentTrackIndex]

  // Get track label from lookup
  const getTrackLabel = (labelKey: string) => {
    return TRACK_LABELS[labelKey] || labelKey
  }

  // Get category label
  const getCategoryLabel = (category: string) => {
    if (category === 'lofi') return "Lo-fi"
    if (category === 'christmas') return "Christmas"
    return category
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  // Sync time with actual audio
  useEffect(() => {
    if (isPlaying && player) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(player.getCurrentTime())
        const dur = player.getDuration()
        if (dur && !isNaN(dur)) {
          setDuration(dur)
        }
      }, 500)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, player])

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

  // Keep ref in sync with state for use in callback
  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex
  }, [currentTrackIndex])

  // Handle track ended - determine next action based on repeatMode
  useEffect(() => {
    if (!player) return

    const handleTrackEnded = () => {
      const currentIdx = currentTrackIndexRef.current

      if (repeatMode === 'one') {
        // Single track repeat is handled by audio.loop
        return
      }

      // repeatMode === 'all': play next track (or shuffle)
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
      setCurrentTime(0)
    }

    player.onEnded(handleTrackEnded)
  }, [player, repeatMode, isShuffled, volume, isMuted])

  // Update audio loop when repeatMode changes
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
      setCurrentTime(0)
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
    if (currentTime > 3) {
      // If more than 3 seconds in, restart current track
      if (player) player.seek(0)
      setCurrentTime(0)
    } else {
      // Go to previous track
      const newIndex =
        currentTrackIndex === 0
          ? BGM_TRACKS.length - 1
          : currentTrackIndex - 1
      if (isPlaying) {
        playTrack(newIndex)
      } else {
        setCurrentTrackIndex(newIndex)
        setCurrentTime(0)
      }
    }
  }, [currentTime, currentTrackIndex, isPlaying, playTrack, player])

  const handleNext = useCallback(() => {
    let newIndex: number
    if (isShuffled) {
      // Random track (excluding current)
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
      setCurrentTime(0)
    }
  }, [isShuffled, currentTrackIndex, isPlaying, playTrack])

  // Cycle through playback modes: shuffle → repeat-all → repeat-one
  const handlePlaybackModeToggle = useCallback(() => {
    setPlaybackMode((prev) => {
      if (prev === 'shuffle') return 'repeat-all'
      if (prev === 'repeat-all') return 'repeat-one'
      return 'shuffle'
    })
  }, [])

  const handleSeek = useCallback((values: number[]) => {
    if (player) {
      player.seek(values[0])
      setCurrentTime(values[0])
    }
  }, [player])

  const handleVolumeChange = useCallback(
    (values: number[]) => {
      const newVolume = values[0]
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
      if (player) {
        player.setVolume(newVolume / 100)
      }
    },
    [player]
  )

  const handleMuteToggle = useCallback(() => {
    if (!player) return

    if (isMuted) {
      setIsMuted(false)
      player.setVolume(volume / 100)
    } else {
      setIsMuted(true)
      player.setVolume(0)
    }
  }, [player, isMuted, volume])

  const handleSelectTrack = useCallback(
    (track: BgmTrack) => {
      const index = BGM_TRACKS.findIndex((t) => t.id === track.id)
      if (index >= 0) {
        if (isPlaying) {
          playTrack(index)
        } else {
          setCurrentTrackIndex(index)
          setCurrentTime(0)
        }
      }
    },
    [isPlaying, playTrack]
  )

  // Get playback mode icon and label
  const getPlaybackModeIcon = () => {
    switch (playbackMode) {
      case 'shuffle':
        return <Shuffle className="h-3.5 w-3.5" strokeWidth={2.5} />
      case 'repeat-one':
        return <Repeat1 className="h-3.5 w-3.5" strokeWidth={2.5} />
      default:
        return <Repeat className="h-3.5 w-3.5" strokeWidth={2.5} />
    }
  }

  const getPlaybackModeLabel = () => {
    switch (playbackMode) {
      case 'shuffle':
        return 'Shuffle'
      case 'repeat-one':
        return 'Repeat One'
      default:
        return 'Repeat All'
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Card className="w-full glass-card border-0 overflow-hidden">
        <CardContent className="pt-2.5 pb-3 px-3 space-y-2">
          {/* Track Info + Progress in one row */}
          <div className="flex items-center gap-2.5">
            <div className={`relative p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 hover-music-icon ${isPlaying ? 'music-playing' : ''}`}>
              <Music className="h-4 w-4 text-primary" />
              {isPlaying && (
                <div className="absolute -right-0.5 -bottom-0.5 flex items-end gap-[1.5px]">
                  <span className="w-[2px] h-1.5 bg-primary rounded-full animate-music-bar-1" />
                  <span className="w-[2px] h-2.5 bg-primary rounded-full animate-music-bar-2" />
                  <span className="w-[2px] h-1 bg-primary rounded-full animate-music-bar-3" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate hover-song-title leading-tight">
                {getTrackLabel(currentTrack.labelKey)}
              </p>
              <p className="text-[10px] text-muted-foreground/70 leading-tight">
                {getCategoryLabel(currentTrack.category)}
              </p>
            </div>
            {/* Time Display */}
            <div className="text-[10px] text-muted-foreground tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            {/* Volume Control */}
            <Popover open={showVolume} onOpenChange={setShowVolume}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-36 p-2.5" align="end">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 shrink-0"
                    onClick={handleMuteToggle}
                    aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-3 w-3" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="flex-1"
                    aria-label="Volume"
                  />
                  <span className="text-[10px] text-muted-foreground w-6 text-right">
                    {isMuted ? 0 : volume}
                  </span>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Progress Bar - compact */}
          <Slider
            value={[currentTime]}
            onValueChange={handleSeek}
            max={duration || 100}
            step={1}
            className="w-full hover-music-bar"
            aria-label="Track progress"
          />

          {/* Playback Controls - compact */}
          <div className="flex items-center justify-between">
            {/* Unified Playback Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:scale-110 transition-all duration-200 text-primary"
                  onClick={handlePlaybackModeToggle}
                  aria-label={getPlaybackModeLabel()}
                >
                  {getPlaybackModeIcon()}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {getPlaybackModeLabel()}
              </TooltipContent>
            </Tooltip>

            {/* Center Controls: Previous / Play / Next */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:scale-110 hover:text-primary transition-all duration-200"
                onClick={handlePrevious}
                aria-label="Previous track"
              >
                <SkipBack className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Button>

              <Button
                size="icon"
                className={`h-9 w-9 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-gradient-to-br from-primary to-primary/80 glow-primary shadow-lg shadow-primary/25'
                    : 'bg-gradient-to-br from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30'
                } hover:scale-110`}
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />
                ) : (
                  <Play className="h-3.5 w-3.5 ml-0.5 text-primary-foreground" strokeWidth={2.5} />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:scale-110 hover:text-primary transition-all duration-200"
                onClick={handleNext}
                aria-label="Next track"
              >
                <SkipForward className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Button>
            </div>

            {/* Playlist */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:scale-110 hover:text-primary transition-all duration-200" aria-label="Playlist">
                  <List className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-1.5" align="end">
                <div className="space-y-0.5">
                  {BGM_TRACKS.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => handleSelectTrack(track)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-xs transition-colors ${
                        track.id === currentTrack.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {track.id === currentTrack.id && isPlaying ? (
                        <span className="w-3 h-3 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        </span>
                      ) : (
                        <Music className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span className="truncate text-[11px]">{getTrackLabel(track.labelKey)}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
