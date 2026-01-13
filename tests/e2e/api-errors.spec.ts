import { test, expect } from '@playwright/test'

/**
 * API Error Scenarios E2E Tests
 * - API 실패 시 앱의 graceful degradation 검증
 * - 네트워크 오류, 서버 오류, 인증 오류 시나리오
 */
test.describe('API Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
  })

  test.describe('Network Errors', () => {
    test('@critical should continue timer operation when network is unavailable', async ({
      page,
    }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Block all API requests to simulate network failure
      await page.route('**/api/**', (route) => route.abort('failed'))

      // Timer should still work (it's client-side)
      await page.getByRole('button', { name: 'Start', exact: true }).click()
      await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

      // Pause/Resume should work
      await page.getByRole('button', { name: /pause/i }).click()
      await expect(page.getByRole('button', { name: /resume/i })).toBeVisible()

      // Skip should work
      await page.getByRole('button', { name: /resume/i }).click()
      const skipButton = page.getByRole('button').filter({ hasText: /skip to break/i })
      await expect(skipButton).toBeVisible()
      await skipButton.click()

      // Should enter break phase
      await expect(page.locator('text=/Break Time/i').first()).toBeVisible()
    })

    test('should handle settings save when API fails', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Open settings
      await page.getByRole('button', { name: 'Settings' }).first().click()
      await expect(page.getByRole('dialog')).toBeVisible()

      // Block settings API
      await page.route('**/api/settings**', (route) =>
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        })
      )

      // Change a setting and save (should use local storage fallback)
      const focusDurationSection = page.getByText('Focus Duration').locator('..')
      await focusDurationSection.getByRole('button', { name: '45m' }).click()

      await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click()

      // Local save should still work
      await expect(page.getByText('Settings saved!', { exact: true })).toBeVisible()
    })

    test('should preserve timer state during intermittent network issues', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Start timer
      await page.getByRole('button', { name: 'Start', exact: true }).click()
      await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

      // Wait for timer to tick
      await expect(async () => {
        const timerText = await page.locator('.hover-timer-display').first().textContent()
        expect(timerText).not.toBe('25:00')
      }).toPass({ timeout: 5000 })

      // Block network briefly
      await page.route('**/api/**', (route) => route.abort('failed'))

      // Timer should continue
      const timerBefore = await page.locator('.hover-timer-display').first().textContent()

      // Wait and check timer is still counting
      await expect(async () => {
        const timerAfter = await page.locator('.hover-timer-display').first().textContent()
        expect(timerAfter).not.toBe(timerBefore)
      }).toPass({ timeout: 5000 })
    })
  })

  test.describe('Server Errors (5xx)', () => {
    test('should handle 500 error on check-in gracefully', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Mock check-in API to return 500
      await page.route('**/api/check-in', (route) =>
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        })
      )

      // Find and click check-in button if visible
      const checkInButton = page.getByRole('button', { name: /check.?in/i }).first()
      const isCheckInVisible = await checkInButton.isVisible().catch(() => false)

      if (isCheckInVisible) {
        await checkInButton.click()

        // App should show error or remain functional
        // Check that app doesn't crash - timer should still be usable
        await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
      }
    })

    test('should handle 500 error on session save gracefully', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Mock sessions API to return 500
      await page.route('**/api/sessions', (route) =>
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to save session' }),
        })
      )

      // Start timer
      await page.getByRole('button', { name: 'Start', exact: true }).click()
      await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

      // Skip to break (this would normally trigger session save)
      const skipButton = page.getByRole('button').filter({ hasText: /skip to break/i })
      await skipButton.click()

      // App should continue working even if session save fails
      await expect(page.locator('text=/Break Time/i').first()).toBeVisible()

      // Timer display should still work in break mode
      const timerDisplay = page.locator('.hover-timer-display').first()
      await expect(timerDisplay).toBeVisible()
    })

    test('should handle 503 Service Unavailable', async ({ page }) => {
      // Mock all API calls to return 503
      await page.route('**/api/**', (route) =>
        route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Service temporarily unavailable' }),
        })
      )

      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Core timer functionality should work without API
      await page.getByRole('button', { name: 'Start', exact: true }).click()
      await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()
    })
  })

  test.describe('Authentication Errors (401)', () => {
    test('should handle 401 on API calls for non-logged-in users', async ({ page }) => {
      // Clear any stored auth
      await page.goto('/')
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Timer should work without authentication
      await page.getByRole('button', { name: 'Start', exact: true }).click()
      await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

      // Settings should work locally
      await page.getByRole('button', { name: /pause/i }).click()
      await page.getByRole('button', { name: 'Settings' }).first().click()
      await expect(page.getByRole('dialog')).toBeVisible()
    })
  })

  test.describe('Client Errors (4xx)', () => {
    test('should handle 400 Bad Request on invalid data', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Mock settings API to return 400 for validation error
      await page.route('**/api/settings', (route) => {
        if (route.request().method() === 'PUT') {
          return route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Invalid focus_duration' }),
          })
        }
        return route.continue()
      })

      // Open settings
      await page.getByRole('button', { name: 'Settings' }).first().click()
      await expect(page.getByRole('dialog')).toBeVisible()

      // Try to save - local save should still work
      await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click()
      await expect(page.getByText('Settings saved!', { exact: true })).toBeVisible()
    })

    test('should handle 429 Rate Limit gracefully', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Mock API to return 429
      await page.route('**/api/**', (route) =>
        route.fulfill({
          status: 429,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Too many requests' }),
        })
      )

      // Timer should continue to work
      await page.getByRole('button', { name: 'Start', exact: true }).click()
      await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()
    })
  })

  test.describe('Timeout Scenarios', () => {
    test('should handle slow API responses', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

      // Mock API with 5 second delay
      await page.route('**/api/**', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return route.continue()
      })

      // Timer should work while API is slow
      await page.getByRole('button', { name: 'Start', exact: true }).click()
      await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

      // Wait for timer to progress
      await expect(async () => {
        const timerText = await page.locator('.hover-timer-display').first().textContent()
        expect(timerText).not.toBe('25:00')
      }).toPass({ timeout: 5000 })
    })
  })

  test.describe('Stats Page Error Handling', () => {
    test('should show stats page even when API fails', async ({ page }) => {
      // Mock stats-related API to fail
      await page.route('**/api/**', (route) =>
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server error' }),
        })
      )

      await page.goto('/stats')

      // Page should still render (may show loading or empty states)
      await expect(page.locator('text=Analytics').first()).toBeVisible({ timeout: 10000 })
    })

    test('should handle partial data load failure on stats page', async ({ page }) => {
      // Let some requests through, fail others
      let requestCount = 0
      await page.route('**/api/**', (route) => {
        requestCount++
        if (requestCount % 2 === 0) {
          return route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Partial failure' }),
          })
        }
        return route.continue()
      })

      await page.goto('/stats')
      await expect(page.locator('text=Analytics').first()).toBeVisible({ timeout: 10000 })
    })
  })
})
