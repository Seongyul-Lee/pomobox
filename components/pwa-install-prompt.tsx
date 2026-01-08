"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Share, Download, Smartphone, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

// BeforeInstallPromptEvent type definition
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

const STORAGE_KEY = "pomobox-pwa-prompt-dismissed"

export function PwaInstallPrompt() {
  const [isVisible, setIsVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem(STORAGE_KEY) === "true"

    if (isDismissed || isStandalone()) {
      return
    }

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIsVisible(false)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // Show prompt after delay
    const timer = setTimeout(() => setIsVisible(true), 1500)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return

    setIsInstalling(true)

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setIsVisible(false)
      }
    } catch (error) {
      console.error("Install prompt error:", error)
    } finally {
      setIsInstalling(false)
    }
  }, [deferredPrompt])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem(STORAGE_KEY, "true")
  }

  if (!isVisible) {
    return null
  }

  // Check if install button should be shown (beforeinstallprompt supported)
  const canInstallDirectly = deferredPrompt !== null

  return (
    <div
      className={cn(
        "w-full",
        "animate-in fade-in slide-in-from-bottom-4 duration-500"
      )}
    >
      {/* Mobile/Tablet Version (< xl) */}
      <div
        className={cn(
          "xl:hidden",
          "relative overflow-hidden",
          "rounded-2xl",
          "p-4",
          "bg-gradient-to-r from-primary/5 via-transparent to-primary/5",
          "dark:from-primary/10 dark:via-transparent dark:to-primary/10",
          "ring-1 ring-primary/20 dark:ring-primary/30",
          "shadow-md shadow-black/5 dark:shadow-black/20"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className={cn(
              "flex-shrink-0",
              "w-11 h-11",
              "rounded-xl",
              "bg-gradient-to-br from-primary to-accent",
              "flex items-center justify-center",
              "shadow-sm"
            )}
          >
            <Smartphone className="w-5 h-5 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-foreground">
              Install Pomobox
            </span>
            {canInstallDirectly ? (
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Use offline, launch from home screen
              </p>
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                <Share className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                Tap <span className="font-medium text-foreground/80">Share</span> or <span className="font-medium text-foreground/80">Menu</span>, then <span className="font-medium text-foreground/80">&apos;Add to Home Screen&apos;</span>
              </p>
            )}
          </div>

          {/* Install button or Close button */}
          {canInstallDirectly ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className={cn(
                  "flex-shrink-0",
                  "px-3 py-1.5",
                  "rounded-lg",
                  "bg-primary text-primary-foreground",
                  "text-xs font-medium",
                  "hover:bg-primary/90",
                  "disabled:opacity-50",
                  "transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
              >
                {isInstalling ? "..." : "Install"}
              </button>
              <button
                onClick={handleDismiss}
                className={cn(
                  "flex-shrink-0",
                  "w-7 h-7",
                  "rounded-full",
                  "flex items-center justify-center",
                  "text-muted-foreground/60 hover:text-foreground",
                  "hover:bg-muted/50",
                  "transition-colors duration-200"
                )}
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0",
                "w-8 h-8",
                "rounded-full",
                "flex items-center justify-center",
                "text-muted-foreground/60 hover:text-foreground",
                "hover:bg-muted/50",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Version (>= xl) */}
      <div
        className={cn(
          "hidden xl:block",
          "max-w-xl mx-auto",
          "relative overflow-hidden",
          "rounded-2xl",
          "p-5",
          "bg-gradient-to-r from-primary/5 via-transparent to-primary/5",
          "dark:from-primary/10 dark:via-transparent dark:to-primary/10",
          "ring-1 ring-primary/20 dark:ring-primary/30",
          "shadow-md shadow-black/5 dark:shadow-black/20"
        )}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={cn(
              "flex-shrink-0",
              "w-12 h-12",
              "rounded-xl",
              "bg-gradient-to-br from-primary to-accent",
              "flex items-center justify-center",
              "shadow-sm"
            )}
          >
            <Monitor className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-foreground">
              Install Pomobox as an App
            </span>
            {canInstallDirectly ? (
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                Use offline, launch from desktop, no browser tabs
              </p>
            ) : (
              <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                <p className="leading-relaxed">
                  <Download className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5 text-primary" />
                  Click <span className="font-medium text-foreground/80">install button</span> in address bar or <span className="font-medium text-foreground/80">⋮ Menu</span> → <span className="font-medium text-foreground/80">&apos;Install&apos;</span>
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Use offline, launch from desktop, no browser tabs
                </p>
              </div>
            )}
          </div>

          {/* Install button or Close button */}
          {canInstallDirectly ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className={cn(
                  "flex-shrink-0",
                  "px-4 py-2",
                  "rounded-lg",
                  "bg-primary text-primary-foreground",
                  "text-sm font-medium",
                  "hover:bg-primary/90",
                  "disabled:opacity-50",
                  "transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                )}
              >
                <Download className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                {isInstalling ? "Installing..." : "Install Now"}
              </button>
              <button
                onClick={handleDismiss}
                className={cn(
                  "flex-shrink-0",
                  "w-8 h-8",
                  "rounded-full",
                  "flex items-center justify-center",
                  "text-muted-foreground/60 hover:text-foreground",
                  "hover:bg-muted/50",
                  "transition-colors duration-200"
                )}
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0",
                "w-9 h-9",
                "rounded-full",
                "flex items-center justify-center",
                "text-muted-foreground/60 hover:text-foreground",
                "hover:bg-muted/50",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
