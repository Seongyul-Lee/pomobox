import { test, expect } from '@playwright/test'

/**
 * MyPage E2E Tests (Non-authenticated)
 * - 비로그인 사용자 리다이렉트 테스트
 */
test.describe('MyPage (Non-authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    // Clear any auth state
    await page.context().clearCookies()
  })

  test('@critical should redirect to login when not authenticated', async ({ page }) => {
    // Try to access mypage without auth
    await page.goto('/mypage')

    // Should redirect to login page with next parameter
    await expect(page).toHaveURL(/\/auth\/login.*next.*mypage/i)

    // Login page elements should be visible
    await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible()
  })

  test('should preserve next parameter in login redirect', async ({ page }) => {
    await page.goto('/mypage')

    // URL should contain next=/mypage
    await expect(page).toHaveURL(/next=%2Fmypage|next=\/mypage/i)
  })
})
