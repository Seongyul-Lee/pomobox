"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Check, Bell, Volume2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { type SoundCategory, getSoundsByCategory, playSound, setVolume } from "@/lib/sounds"

export interface TimerSettings {
  focusDuration: number
  breakDuration: number
  dailyGoal: number
  notificationsEnabled: boolean
  soundEnabled: boolean
  soundCategory: SoundCategory
  soundType: string
  volume: number
}

const FOCUS_OPTIONS = [
  { label: "15 min", value: 15 },
  { label: "25 min", value: 25 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
]

const BREAK_OPTIONS = [
  { label: "5 min", value: 5 },
  { label: "10 min", value: 10 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
]

const GOAL_OPTIONS = [
  { label: "60 min", value: 60 },
  { label: "90 min", value: 90 },
  { label: "120 min", value: 120 },
  { label: "180 min", value: 180 },
  { label: "240 min", value: 240 },
]

interface SettingsDialogProps {
  settings?: TimerSettings
  isRunning?: boolean
  onSettingsChange?: (settings: TimerSettings) => void
  buttonClassName?: string
  /** Controlled mode: external open state */
  open?: boolean
  /** Controlled mode: callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Hide the trigger button (for external control) */
  hideTrigger?: boolean
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
  dailyGoal: 120,
  notificationsEnabled: true,
  soundEnabled: true,
  soundCategory: "melody",
  soundType: "achievement",
  volume: 50,
}

export function SettingsDialog({
  settings = DEFAULT_SETTINGS,
  isRunning = false,
  onSettingsChange,
  buttonClassName,
  open,
  onOpenChange,
  hideTrigger = false,
}: SettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState<TimerSettings>(settings)
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleSave = () => {
    if (isRunning) return
    onSettingsChange?.(localSettings)
    setIsSaved(true)

    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated.",
    })

    setTimeout(() => {
      setIsSaved(false)
    }, 1000)
  }

  const handleSoundToggle = (checked: boolean) => {
    if (checked && localSettings.volume === 0) {
      setLocalSettings({
        ...localSettings,
        soundEnabled: true,
        volume: 50
      })
    } else {
      setLocalSettings({
        ...localSettings,
        soundEnabled: checked
      })
    }
  }

  // 사운드 테스트
  const handleVolumeTest = () => {
    playSound(localSettings.soundType, localSettings.volume / 100)

    const sounds = getSoundsByCategory(localSettings.soundCategory)
    const selectedSound = sounds.find(s => s.value === localSettings.soundType)
    const soundLabel = selectedSound?.label || "Achievement"
    toast({
      title: "Sound test",
      description: `${soundLabel} - Volume: ${localSettings.volume}%`,
      duration: 1000,
    })
  }

  // 카테고리 변경 시 해당 카테고리의 첫 번째 사운드로 변경
  const handleCategoryChange = (category: SoundCategory) => {
    const sounds = getSoundsByCategory(category)
    setLocalSettings({
      ...localSettings,
      soundCategory: category,
      soundType: sounds[0].value,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button variant="ghost" size="lg" className={`h-12 w-12 ${buttonClassName || ''}`} aria-label="Settings">
            <Settings className="h-6 w-6" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4 overflow-y-auto flex-1 -mr-5.75 pr-5.75 settings-scrollbar">
          {/* Notifications */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2 hover-section-label cursor-default">
              <Bell className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when timer ends</p>
              </div>
            </div>
            <Switch
              checked={localSettings.notificationsEnabled}
              onCheckedChange={(checked) =>
                setLocalSettings({ ...localSettings, notificationsEnabled: checked })
              }
              aria-label="Toggle notifications"
              className="hover-toggle"
            />
          </div>

          {/* Sound */}
          <div className="space-y-4">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2 hover-section-label cursor-default">
                <Volume2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-medium">Sound</p>
                  <p className="text-sm text-muted-foreground">Play sound when timer ends</p>
                </div>
              </div>
              <Switch
                checked={localSettings.soundEnabled}
                onCheckedChange={handleSoundToggle}
                aria-label="Toggle sound"
                className="hover-toggle"
              />
            </div>

            {/* Sound Type & Volume */}
            {localSettings.soundEnabled && (
              <div className="space-y-3 pl-1">
                {/* Sound Category Selection */}
                <div className="space-y-1.5">
                  <span className="text-sm text-muted-foreground pb-0.5">Sound Category</span>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={localSettings.soundCategory === 'melody' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryChange('melody')}
                      className="w-full"
                    >
                      Melody
                    </Button>
                    <Button
                      variant={localSettings.soundCategory === 'ambient' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryChange('ambient')}
                      className="w-full"
                    >
                      Ambient
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground pt-0.5">
                    {localSettings.soundCategory === 'melody'
                      ? "High-pitched melodic sounds"
                      : "Deep bass & ambient sounds"}
                  </p>
                </div>

                {/* Sound Type Selection */}
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground" id="sound-type-label">Sound</span>
                  <Select
                    value={localSettings.soundType}
                    onValueChange={(value) =>
                      setLocalSettings({ ...localSettings, soundType: value })
                    }
                  >
                    <SelectTrigger className="w-full" aria-labelledby="sound-type-label">
                      <SelectValue placeholder="Select a sound" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSoundsByCategory(localSettings.soundCategory).map((sound) => (
                        <SelectItem key={sound.value} value={sound.value}>
                          {sound.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground" id="volume-label">Volume</span>
                  <span className="text-sm font-medium">{localSettings.volume}%</span>
                </div>
                <Slider
                  value={[localSettings.volume]}
                  onValueChange={([value]) => {
                    setVolume(value / 100)
                    setLocalSettings({ ...localSettings, volume: value })
                  }}
                  max={100}
                  step={1}
                  className="w-full"
                  aria-labelledby="volume-label"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVolumeTest}
                  className="w-full"
                >
                  Test Sound
                </Button>
              </div>
            )}
          </div>

          {/* Focus Duration */}
          <div>
            <p className="font-medium mb-3">Focus Duration</p>
            <div className="grid grid-cols-4 gap-2">
              {FOCUS_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={localSettings.focusDuration === option.value ? "default" : "outline"}
                  size="sm"
                  disabled={isRunning}
                  onClick={() => setLocalSettings({ ...localSettings, focusDuration: option.value })}
                  className="hover:scale-105 transition-transform duration-150"
                >
                  {option.value} min
                </Button>
              ))}
            </div>
          </div>

          {/* Break Duration */}
          <div>
            <p className="font-medium mb-3">Break Duration</p>
            <div className="grid grid-cols-4 gap-2">
              {BREAK_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={localSettings.breakDuration === option.value ? "default" : "outline"}
                  size="sm"
                  disabled={isRunning}
                  onClick={() => setLocalSettings({ ...localSettings, breakDuration: option.value })}
                  className="hover:scale-105 transition-transform duration-150"
                >
                  {option.value} min
                </Button>
              ))}
            </div>
          </div>

          {/* Daily Goal */}
          <div>
            <p className="font-medium mb-3">Daily Goal (min)</p>
            <div className="grid grid-cols-5 gap-2">
              {GOAL_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={localSettings.dailyGoal === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLocalSettings({ ...localSettings, dailyGoal: option.value })}
                  className="hover:scale-105 transition-transform duration-150"
                >
                  {option.value}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Set your daily focus time target</p>
          </div>

          <Button
            onClick={handleSave}
            className="w-full hover-glow"
            disabled={isSaved || isRunning}
          >
            {isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved!
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
          {isRunning && (
            <p className="text-sm text-muted-foreground">
              Stop the timer to change durations.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
