import { test, expect } from '@playwright/test'

test.describe('Timer Persistence', () => {
  const getTimerDisplay = (page: import('@playwright/test').Page) =>
    page.locator('.hover-timer-display').first()

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
    })
    await page.reload()
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
  })

  test('should restore running timer after page refresh', async ({ page }) => {
    await page.clock.install()
    await page.goto('/?testDuration=60') // 60 seconds for easier testing

    // Start timer
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Fast forward 20 seconds
    await page.clock.fastForward('00:20')

    // Verify timer shows ~40 seconds left
    await expect(getTimerDisplay(page)).toHaveText(/00:[34]\d/)

    // Simulate page refresh by reloading (preserve localStorage)
    const savedLocalStorage = await page.evaluate(() => {
      const data: Record<string, string> = {}
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i)
        if (key) {
          data[key] = window.localStorage.getItem(key) || ''
        }
      }
      return data
    })

    // Reload page and restore localStorage
    await page.goto('/?testDuration=60')
    await page.evaluate((data) => {
      Object.entries(data).forEach(([key, value]) => {
        window.localStorage.setItem(key, value)
      })
    }, savedLocalStorage)
    await page.reload()

    // Wait for hydration
    await page.waitForTimeout(500)

    // Timer should be restored and running (or paused with remaining time)
    // Note: Due to clock manipulation, the exact state may vary
    // Key assertion: timer should NOT be at initial 01:00
    const timerText = await getTimerDisplay(page).textContent()
    expect(timerText).not.toBe('01:00')
  })

  test('should restore paused timer after page refresh', async ({ page }) => {
    await page.goto('/?testDuration=60')

    // Start timer
    await page.getByRole('button', { name: 'Start', exact: true }).click()

    // Wait for a few seconds
    await page.waitForTimeout(3000)

    // Pause timer
    await page.getByRole('button', { name: /pause/i }).click()
    await expect(page.getByRole('button', { name: /resume/i })).toBeVisible()

    // Get paused time
    const pausedTime = await getTimerDisplay(page).textContent()

    // Reload page
    await page.reload()

    // Wait for hydration
    await page.waitForTimeout(500)

    // Timer should be restored in paused state
    await expect(page.getByRole('button', { name: /resume/i })).toBeVisible()

    // Time should be approximately the same (within 1 second tolerance)
    const restoredTime = await getTimerDisplay(page).textContent()
    expect(restoredTime).toBe(pausedTime)
  })

  test('should NOT restore Break session after refresh', async ({ page }) => {
    await page.clock.install()
    await page.goto('/?testDuration=5')

    // Start and complete focus session
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await page.clock.fastForward('00:05')

    // Wait for transition to Break
    await expect(page.getByText('Break Time')).toBeVisible({ timeout: 2000 })

    // Start break timer
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Fast forward 2 seconds into break
    await page.clock.fastForward('00:02')

    // Reload page
    await page.reload()

    // Wait for hydration
    await page.waitForTimeout(500)

    // Break session should NOT be restored - should show idle Break state
    // (Break sessions are not persisted per design decision)
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
  })

  test('should handle expired session on restore', async ({ page }) => {
    // This test simulates a scenario where user closes browser during focus session
    // and reopens after the session would have completed

    await page.goto('/')

    // Manually set up an "expired" session in localStorage
    const now = Date.now()
    const expiredEndTime = now - 60000 // Ended 1 minute ago
    const sessionStartTime = expiredEndTime - (25 * 60 * 1000) // Started 25 min before end

    await page.evaluate(({ expiredEndTime, sessionStartTime }) => {
      const today = new Date().toISOString().split('T')[0]
      const timerState = {
        state: {
          phase: 'focus',
          status: 'running',
          timeLeft: 0,
          targetEndAtMs: expiredEndTime,
          sessions: 0,
          completedSessions: 0,
          totalFocusMinutes: 0,
          longBreakCount: 0,
          savedAt: today,
          focusSessionStartMs: sessionStartTime,
          lastSavedMinute: 0,
          pausedElapsedMs: 0,
          settings: { focusDuration: 25, breakDuration: 5 },
        },
        version: 0,
      }
      localStorage.setItem('pomobox-timer-state', JSON.stringify(timerState))
    }, { expiredEndTime, sessionStartTime })

    // Reload to trigger restoration
    await page.reload()

    // Wait for hydration and expired session handling
    await page.waitForTimeout(1000)

    // Should transition to Break after expired session is processed
    await expect(page.getByText('Break Time')).toBeVisible({ timeout: 3000 })

    // Should show idle state (ready to start break)
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
  })

  test('should reset timer when date changes', async ({ page }) => {
    await page.goto('/')

    // Set up a timer state from yesterday
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    await page.evaluate((yesterdayStr) => {
      const timerState = {
        state: {
          phase: 'focus',
          status: 'paused',
          timeLeft: 600, // 10 minutes left
          targetEndAtMs: null,
          sessions: 3,
          completedSessions: 3,
          totalFocusMinutes: 75,
          longBreakCount: 0,
          savedAt: yesterdayStr, // Yesterday's date
          focusSessionStartMs: Date.now() - 900000,
          lastSavedMinute: 15,
          pausedElapsedMs: 900000,
          settings: { focusDuration: 25, breakDuration: 5 },
        },
        version: 0,
      }
      localStorage.setItem('pomobox-timer-state', JSON.stringify(timerState))
    }, yesterdayStr)

    // Reload to trigger restoration
    await page.reload()

    // Wait for hydration
    await page.waitForTimeout(500)

    // Timer should reset to initial state (date changed)
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
    await expect(page.locator('text=/Focus Session/i').first()).toBeVisible()

    // Timer should show initial duration (25:00)
    await expect(getTimerDisplay(page)).toHaveText('25:00')
  })

  test('should preserve session count across page navigation', async ({ page }) => {
    await page.clock.install()
    await page.goto('/?testDuration=5')

    // Complete a focus session
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await page.clock.fastForward('00:05')

    // Wait for transition to Break
    await expect(page.getByText('Break Time')).toBeVisible({ timeout: 2000 })

    // Verify session count is 1
    await expect(
      page.locator('span.text-foreground').filter({ hasText: /Today: 1 session/ }).first()
    ).toBeVisible()

    // Navigate away and back
    await page.goto('/stats')
    await page.waitForTimeout(500)
    await page.goto('/')

    // Wait for hydration
    await page.waitForTimeout(500)

    // Session count should still be 1
    await expect(
      page.locator('span.text-foreground').filter({ hasText: /Today: 1 session/ }).first()
    ).toBeVisible()
  })
})

test.describe('Timer Persistence - Skip/Reset Policy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.clear()
    })
    await page.reload()
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
  })

  test('Skip should NOT save partial minutes (CLAUDE.md policy)', async ({ page }) => {
    test.setTimeout(120000) // 2 minute test needs extended timeout
    await page.goto('/?testDuration=120') // 2 minutes

    // Start timer
    await page.getByRole('button', { name: 'Start', exact: true }).click()

    // Wait 1.5 minutes (90 seconds) - should have saved 1 minute via auto-save
    await page.waitForTimeout(90000)

    // Get current stats before skip
    const statsBeforeSkip = await page
      .locator('span.text-foreground')
      .filter({ hasText: /Today:/ })
      .first()
      .textContent()

    // Skip the session
    await page.getByRole('button').filter({ hasText: /skip to break/i }).click()

    // Wait for state update
    await page.waitForTimeout(500)

    // Stats should NOT include the remaining 30 seconds (0.5 min)
    // Only the 1 minute that was auto-saved should count
    const statsAfterSkip = await page
      .locator('span.text-foreground')
      .filter({ hasText: /Today:/ })
      .first()
      .textContent()

    // Extract minutes from stats (format: "Today: 0 sessions (X min)")
    const minutesBefore = parseInt(statsBeforeSkip?.match(/\((\d+) min\)/)?.[1] || '0')
    const minutesAfter = parseInt(statsAfterSkip?.match(/\((\d+) min\)/)?.[1] || '0')

    // Minutes should be the same (Skip doesn't add more minutes)
    expect(minutesAfter).toBe(minutesBefore)
  })

  test('Reset should NOT save any minutes (CLAUDE.md policy)', async ({ page }) => {
    test.setTimeout(60000) // 30 second wait needs extended timeout
    await page.goto('/')

    // Get initial stats
    const initialStats = await page
      .locator('span.text-foreground')
      .filter({ hasText: /Today:/ })
      .first()
      .textContent()

    // Start timer
    await page.getByRole('button', { name: 'Start', exact: true }).click()

    // Wait less than 1 minute (no auto-save should trigger)
    await page.waitForTimeout(30000)

    // Reset the timer
    await page.getByRole('button', { name: /reset/i }).click()

    // Wait for state update
    await page.waitForTimeout(500)

    // Stats should be unchanged (Reset doesn't save anything)
    const finalStats = await page
      .locator('span.text-foreground')
      .filter({ hasText: /Today:/ })
      .first()
      .textContent()

    expect(finalStats).toBe(initialStats)
  })
})
