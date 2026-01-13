import { test, expect } from '@playwright/test'

/**
 * Settings → Timer 통합 테스트
 * - Focus/Break Duration 변경이 타이머에 즉시 반영되는지 검증
 * - 설정 저장 및 persistence 검증
 * - 타이머 실행 중 설정 변경 제한 검증
 */
test.describe('Settings → Timer Integration', () => {
  const getTimerDisplay = (page: import('@playwright/test').Page) =>
    page.locator('.hover-timer-display').first()

  // Helper to close dialog using the X button
  const closeDialog = async (page: import('@playwright/test').Page) => {
    await page.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  }

  test.beforeEach(async ({ page }) => {
    // Clear localStorage for clean state
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
  })

  test('@critical should apply focus duration change immediately', async ({ page }) => {
    // Verify initial timer shows 25:00 (default)
    await expect(getTimerDisplay(page)).toHaveText('25:00')

    // Open Settings dialog
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Find Focus Duration section and change to 15 minutes
    const focusDurationSection = page.getByText('Focus Duration').locator('..')
    const focus15Button = focusDurationSection.getByRole('button', { name: '15m' })
    await expect(focus15Button).toBeVisible()
    await focus15Button.click()

    // Save settings
    await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click()

    // Verify toast appears (use exact match)
    await expect(page.getByText('Settings saved!', { exact: true })).toBeVisible()

    // Close dialog using X button
    await closeDialog(page)

    // Verify timer now shows 15:00
    await expect(getTimerDisplay(page)).toHaveText('15:00')
  })

  test('@critical should apply break duration change when entering break', async ({ page }) => {
    // Open Settings and change Break Duration to 10 minutes
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Find Break Duration section and change to 10 minutes
    const breakDurationSection = page.getByText('Break Duration').locator('..')
    const break10Button = breakDurationSection.getByRole('button', { name: '10m' })
    await break10Button.click()

    // Save and close
    await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Settings saved!', { exact: true })).toBeVisible()
    await closeDialog(page)

    // Start and skip to break
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Skip to break
    const skipButton = page.getByRole('button').filter({ hasText: /skip to break/i })
    await expect(skipButton).toBeVisible()
    await skipButton.click()

    // Verify we're in Break phase
    await expect(page.locator('text=/Break Time/i').first()).toBeVisible()

    // Verify break timer shows 10:00 (changed from default 5:00)
    await expect(getTimerDisplay(page)).toHaveText('10:00')
  })

  test('@critical should persist settings across page refresh', async ({ page }) => {
    // Open Settings and change Focus Duration to 45 minutes
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Find Focus Duration section and change to 45 minutes
    const focusDurationSection = page.getByText('Focus Duration').locator('..')
    await focusDurationSection.getByRole('button', { name: '45m' }).click()

    // Save settings
    await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Settings saved!', { exact: true })).toBeVisible()
    await closeDialog(page)

    // Verify timer shows 45:00
    await expect(getTimerDisplay(page)).toHaveText('45:00')

    // Reload page
    await page.reload()

    // Wait for hydration
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    // Verify timer still shows 45:00 (settings persisted)
    await expect(getTimerDisplay(page)).toHaveText('45:00')
  })

  test('@critical should disable duration buttons while timer is running', async ({ page }) => {
    // Start timer
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Open Settings dialog
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Verify Focus Duration buttons are disabled
    const focusDurationSection = page.getByText('Focus Duration').locator('..')
    const focus15Button = focusDurationSection.getByRole('button', { name: '15m' })
    await expect(focus15Button).toBeDisabled()

    // Verify warning message is shown
    await expect(page.getByText('Stop timer to change durations')).toBeVisible()

    // Verify Save button is disabled
    await expect(page.getByRole('dialog').getByRole('button', { name: 'Save' })).toBeDisabled()

    // Close dialog
    await closeDialog(page)
  })

  test('should reset timer to new duration when changed during idle state', async ({ page }) => {
    // Verify initial state
    await expect(getTimerDisplay(page)).toHaveText('25:00')

    // Change Focus Duration to 60 minutes
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const focusDurationSection = page.getByText('Focus Duration').locator('..')
    await focusDurationSection.getByRole('button', { name: '60m' }).click()
    await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Settings saved!', { exact: true })).toBeVisible()
    await closeDialog(page)

    // Verify timer shows new duration
    await expect(getTimerDisplay(page)).toHaveText('60:00')

    // Start timer and verify it starts from 60:00
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Timer should be running from ~60:00
    const timerText = await getTimerDisplay(page).textContent()
    expect(timerText?.startsWith('59:') || timerText?.startsWith('60:')).toBe(true)
  })

  test('should allow changing daily goal while timer is running', async ({ page }) => {
    // Start timer
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Open Settings dialog
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Daily Goal buttons should NOT be disabled (unlike duration buttons)
    const dailyGoalSection = page.getByText('Daily Goal').locator('..')
    const goal180Button = dailyGoalSection.getByRole('button', { name: '180m' })
    await expect(goal180Button).toBeEnabled()

    // Click to change daily goal
    await goal180Button.click()

    // Note: Save button is disabled while running, so goal change won't persist
    // This tests the UI behavior - goal buttons are clickable but save is blocked
    await expect(page.getByRole('dialog').getByRole('button', { name: 'Save' })).toBeDisabled()

    await page.keyboard.press('Escape')
  })

  test('should toggle notifications setting', async ({ page }) => {
    // Open Settings dialog
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Find notifications toggle
    const notificationsToggle = page.getByRole('switch', { name: /toggle notifications/i })
    await expect(notificationsToggle).toBeVisible()

    // Toggle notifications off
    const initialState = await notificationsToggle.getAttribute('aria-checked')
    await notificationsToggle.click()

    // Verify state changed
    const newState = await notificationsToggle.getAttribute('aria-checked')
    expect(newState).not.toBe(initialState)

    // Save and verify
    await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Settings saved!', { exact: true })).toBeVisible()
  })

  test('should toggle sound setting and show sound options', async ({ page }) => {
    // Open Settings dialog
    await page.getByRole('button', { name: 'Settings' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Find sound toggle
    const soundToggle = page.getByRole('switch', { name: /toggle sound/i })
    await expect(soundToggle).toBeVisible()

    // Verify sound options are visible when sound is enabled (default)
    await expect(page.getByText('Sound Category')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Melody' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Ambient' })).toBeVisible()

    // Toggle sound off
    await soundToggle.click()

    // Verify sound options are hidden
    await expect(page.getByText('Sound Category')).not.toBeVisible()

    // Toggle sound back on
    await soundToggle.click()

    // Verify sound options reappear
    await expect(page.getByText('Sound Category')).toBeVisible()
  })
})
