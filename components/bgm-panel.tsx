"use client"

import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { BGM_TRACKS, getBgmPlayer, type BgmCategory } from "@/lib/bgm"

export function BgmPanel() {
  const t = useTranslations("Bgm")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [volume, setVolume] = useState(30)
  const [isMuted, setIsMuted] = useState(false)

  const player = typeof window !== "undefined" ? getBgmPlayer() : null

  // Sync state with player
  useEffect(() => {
    if (player) {
      setIsPlaying(player.isCurrentlyPlaying())
      setCurrentTrack(player.getCurrentTrack())
    }
  }, [player])

  const handlePlay = useCallback(() => {
    if (!player) return

    if (isPlaying) {
      player.stop()
      setIsPlaying(false)
      setCurrentTrack(null)
    } else {
      const trackToPlay = currentTrack || "lofi-chill"
      player.setVolume(isMuted ? 0 : volume / 100)
      player.play(trackToPlay)
      setIsPlaying(true)
      setCurrentTrack(trackToPlay)
    }
  }, [player, isPlaying, currentTrack, volume, isMuted])

  const handleTrackChange = useCallback((trackId: string) => {
    if (!player) return

    setCurrentTrack(trackId)
    if (isPlaying) {
      player.setVolume(isMuted ? 0 : volume / 100)
      player.play(trackId)
    }
  }, [player, isPlaying, volume, isMuted])

  const handleVolumeChange = useCallback((values: number[]) => {
    const newVolume = values[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (player) {
      player.setVolume(newVolume / 100)
    }
  }, [player])

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't destroy player on unmount - let it continue playing
    }
  }, [])

  // Group tracks by category
  const lofiTracks = BGM_TRACKS.filter(t => t.category === "lofi")
  const natureTracks = BGM_TRACKS.filter(t => t.category === "nature")
  const noiseTracks = BGM_TRACKS.filter(t => t.category === "whitenoise")

  const getCategoryLabel = (category: BgmCategory): string => {
    switch (category) {
      case "lofi":
        return t("categoryLofi")
      case "nature":
        return t("categoryNature")
      case "whitenoise":
        return t("categoryNoise")
      default:
        return category
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Music className="h-4 w-4" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Track Selection */}
        <Select value={currentTrack || ""} onValueChange={handleTrackChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectTrack")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{getCategoryLabel("lofi")}</SelectLabel>
              {lofiTracks.map((track) => (
                <SelectItem key={track.id} value={track.id}>
                  {t(track.labelKey)}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>{getCategoryLabel("nature")}</SelectLabel>
              {natureTracks.map((track) => (
                <SelectItem key={track.id} value={track.id}>
                  {t(track.labelKey)}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>{getCategoryLabel("whitenoise")}</SelectLabel>
              {noiseTracks.map((track) => (
                <SelectItem key={track.id} value={track.id}>
                  {t(track.labelKey)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Play/Pause Button */}
        <Button
          onClick={handlePlay}
          variant={isPlaying ? "secondary" : "default"}
          className="w-full gap-2"
          disabled={!currentTrack && !isPlaying}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              {t("pause")}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {t("play")}
            </>
          )}
        </Button>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleMuteToggle}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8 text-right">
            {isMuted ? 0 : volume}%
          </span>
        </div>

        {/* Now Playing Indicator */}
        {isPlaying && currentTrack && (
          <div className="text-xs text-muted-foreground text-center animate-pulse">
            {t("nowPlaying")}: {t(BGM_TRACKS.find(t => t.id === currentTrack)?.labelKey || "")}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
