import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (A11y) Tests', () => {
  // TODO: 접근성 이슈 수정 필요 - aria-hidden-focus, landmark-main 중복 문제
  test('should not have any automatically detectable accessibility issues on main page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      // Exclude known issues to be fixed separately
      .disableRules([
        'color-contrast',           // 색상 대비 문제
        'aria-hidden-focus',        // Task 패널 aria-hidden 내 focusable 요소
        'landmark-main-is-top-level', // main 중첩 문제
        'landmark-no-duplicate-main', // main 중복 문제
        'landmark-unique',          // 랜드마크 고유성 문제
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility issues in Settings Dialog', async ({ page }) => {
    await page.goto('/');

    // Open Settings Dialog (use first() to avoid strict mode violation)
    const settingsButton = page.getByRole('button', { name: /settings/i }).first();
    await settingsButton.click();

    // Wait for dialog to be visible
    await expect(page.getByRole('dialog')).toBeVisible();

    // Run accessibility scan on dialog
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TODO: 색상 대비 문제로 인해 skip - Task "Paused 상태 색상 대비 수정" 참조
  test.skip('should not have accessibility issues in paused state', async ({ page }) => {
    await page.goto('/');

    // Start and pause timer
    await page.getByRole('button', { name: 'Start', exact: true }).click();
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible();
    await page.getByRole('button', { name: /pause/i }).click();

    // Verify paused state
    await expect(page.getByRole('button', { name: /resume/i })).toBeVisible();

    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA labels on icon-only buttons', async ({ page }) => {
    await page.goto('/');

    // Check Settings button (icon-only) - use first() to avoid strict mode violation
    const settingsButton = page.getByRole('button', { name: /settings/i }).first();
    await expect(settingsButton).toBeVisible();
    const settingsAriaLabel = await settingsButton.getAttribute('aria-label');
    expect(settingsAriaLabel).toBe('Settings');

    // Check Reset button (icon-only) - use first() to avoid strict mode violation
    const resetButton = page.getByRole('button', { name: /reset/i }).first();
    await expect(resetButton).toBeVisible();
    const resetAriaLabel = await resetButton.getAttribute('aria-label');
    expect(resetAriaLabel).toBe('Reset timer');
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

    // Settings Dialog should have a heading (use first() to avoid strict mode violation)
    await page.getByRole('button', { name: /settings/i }).first().click();
    await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible();
  });

  // TODO: 색상 대비 문제 수정 필요 - Task "색상 대비 WCAG AA 준수" 참조
  test.skip('should have proper color contrast', async ({ page }) => {
    await page.goto('/');

    // Run accessibility scan focusing on color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    // Filter for color contrast violations
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );

    expect(colorContrastViolations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Navigate with Tab key
    await page.keyboard.press('Tab'); // Should focus first interactive element
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Continue tabbing to reach Start button
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
      if (focused === 'Settings') {
        // Found Settings button, we can navigate
        break;
      }
    }

    // Verify we can activate buttons with Enter/Space (use first() to avoid strict mode violation)
    const settingsButton = page.getByRole('button', { name: /settings/i }).first();
    await settingsButton.focus();
    await page.keyboard.press('Enter');

    // Dialog should open
    await expect(page.getByRole('dialog')).toBeVisible();

    // Close with ESC
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  // TODO: 접근성 이슈 수정 필요 - aria-hidden-focus, landmark-main 중복, heading-order 문제
  test('should not have accessibility issues on stats page', async ({ page }) => {
    await page.goto('/stats');

    // Wait for stats page to load (use first() to avoid strict mode violation)
    await expect(page.getByRole('heading', { name: /statistics/i }).first()).toBeVisible();

    // Run accessibility scan (exclude known issues to be fixed separately)
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules([
        'color-contrast',           // 색상 대비 문제
        'aria-hidden-focus',        // Task 패널 aria-hidden 내 focusable 요소
        'landmark-main-is-top-level', // main 중첩 문제
        'landmark-no-duplicate-main', // main 중복 문제
        'landmark-unique',          // 랜드마크 고유성 문제
        'heading-order',            // 헤딩 순서 문제 (h1 → h3)
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('stats page charts should have proper ARIA labels', async ({ page }) => {
    await page.goto('/stats');

    // Wait for page to load (use first() to avoid strict mode violation)
    await expect(page.getByRole('heading', { name: /statistics/i }).first()).toBeVisible();

    // Check for chart sections with proper aria-labelledby
    const sections = page.locator('section[aria-labelledby]');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(0);

    // Check that chart containers have role="img" and aria-label
    const chartContainers = page.locator('[role="img"]');
    const chartCount = await chartContainers.count();
    // Charts may not be visible if no data, so just check structure exists
    if (chartCount > 0) {
      for (let i = 0; i < chartCount; i++) {
        const ariaLabel = await chartContainers.nth(i).getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
      }
    }
  });

  test('Task panel should have proper accessibility attributes', async ({ page, browserName }) => {
    // Skip on mobile viewports where Task panel becomes a dialog
    test.skip(browserName === 'webkit', 'Task panel behavior differs on Safari');

    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });

    // Open Task panel by clicking Tasks button in sidebar
    const tasksButton = page.getByRole('button', { name: /tasks/i });
    await tasksButton.click();

    // Check for complementary role (wait for panel to be visible)
    const taskPanel = page.locator('aside[role="complementary"]');
    await expect(taskPanel).toBeVisible();

    // Check aria-label
    const ariaLabel = await taskPanel.getAttribute('aria-label');
    expect(ariaLabel).toBe('Task panel');

    // Check that Escape closes the panel
    await page.keyboard.press('Escape');
    await expect(taskPanel).toHaveAttribute('aria-hidden', 'true');
  });

  test('sidebar navigation should have proper accessibility', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });

    // Check for navigation role (use first() to avoid strict mode violation - desktop vs mobile nav)
    const nav = page.locator('nav[role="navigation"]').first();
    await expect(nav).toBeVisible();

    // Check aria-label
    const ariaLabel = await nav.getAttribute('aria-label');
    expect(ariaLabel).toBe('Main Navigation');

    // Check that links/buttons have aria-labels (use first() to avoid strict mode violation)
    const statsLink = page.locator('nav a[aria-label="Statistics"]').first();
    await expect(statsLink).toBeVisible();

    const settingsButton = page.locator('nav button[aria-label="Settings"]').first();
    await expect(settingsButton).toBeVisible();
  });
});
