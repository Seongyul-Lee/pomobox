"use client"

import { useSyncExternalStore } from "react"
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js"

// Lazy import for Supabase client - only loaded when actually needed
let supabasePromise: Promise<typeof import("@/lib/supabase/client")> | null = null

function getSupabaseModule() {
  if (!supabasePromise) {
    supabasePromise = import("@/lib/supabase/client")
  }
  return supabasePromise
}

// Global state for user - shared across all hook instances
let globalUser: User | null = null
let globalLoading = true
let listeners: Set<() => void> = new Set()
let initialized = false

// Type for user snapshot
type UserSnapshot = { user: User | null; loading: boolean }

// Cached snapshot to avoid infinite loops with useSyncExternalStore
let cachedSnapshot: UserSnapshot = { user: globalUser, loading: globalLoading }
const serverSnapshot: UserSnapshot = { user: null, loading: true }

function updateSnapshot() {
  cachedSnapshot = { user: globalUser, loading: globalLoading }
}

function notifyListeners() {
  updateSnapshot()
  listeners.forEach((listener) => listener())
}

// Initialize auth state - called once
async function initializeAuth() {
  if (initialized) return

  initialized = true

  try {
    const { createClient } = await getSupabaseModule()
    const supabase = createClient()

    // Get initial user
    const { data: { user } } = await supabase.auth.getUser()
    globalUser = user
    globalLoading = false
    notifyListeners()

    // Subscribe to auth changes
    supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      globalUser = session?.user ?? null
      globalLoading = false
      notifyListeners()
    })
  } catch {
    globalLoading = false
    notifyListeners()
  }
}

// Subscribe function for useSyncExternalStore
function subscribe(callback: () => void) {
  listeners.add(callback)

  // Start initialization on first subscription
  if (!initialized) {
    initializeAuth()
  }

  return () => {
    listeners.delete(callback)
  }
}

function getSnapshot() {
  return cachedSnapshot
}

function getServerSnapshot() {
  return serverSnapshot
}

export function useUser() {
  const { user, loading } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  return { user, loading, isLoggedIn: !!user }
}

// For components that need to trigger auth initialization manually
export function prefetchUser() {
  if (!initialized) {
    initializeAuth()
  }
}
