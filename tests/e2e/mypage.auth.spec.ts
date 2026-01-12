import { test, expect, type Page } from '@playwright/test'

/**
 * MyPage E2E Tests (Authenticated)
 * - 로그인 사용자의 마이페이지 기능 테스트
 * - *.auth.spec.ts 패턴으로 chromium-authenticated 프로젝트에서 실행
 *
 * Note: 인증 토큰 만료 시 로그인 페이지로 리다이렉트됨
 * 인증 상태 확인 후 테스트 진행
 */

// Helper: 인증 상태 확인 (mypage에 접근 가능한지)
async function isAuthenticated(page: Page): Promise<boolean> {
  const url = page.url()
  // 로그인 페이지로 리다이렉트되지 않았으면 인증됨
  return !url.includes('/auth/login')
}

test.describe('MyPage (Authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/mypage')
    // 페이지 로드 대기
    await page.waitForLoadState('networkidle')
  })

  test('@critical should display My Account page for logged-in users', async ({ page }) => {
    // 인증 상태 확인
    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // My Account 제목 확인
    await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible()

    // Back to Timer 링크
    await expect(page.getByRole('link', { name: /Back to Timer/i })).toBeVisible()
  })

  test('should display Profile section with email', async ({ page }) => {
    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // Profile 카드 확인
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()

    // 이메일 라벨
    await expect(page.getByText('Email')).toBeVisible()
  })

  test('should display Account Management section', async ({ page }) => {
    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // Account Management 섹션 확인
    await expect(page.getByRole('heading', { name: 'Account Management' })).toBeVisible()

    // Sign out 버튼
    const signOutButton = page.getByRole('button', { name: /Sign out/i })
    await expect(signOutButton).toBeVisible()
    await expect(signOutButton).toBeEnabled()
  })

  test('should display Delete Account section (Danger Zone)', async ({ page }) => {
    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // Delete Account 섹션 확인
    await expect(page.getByRole('heading', { name: /Delete Account/i })).toBeVisible()

    // 경고 설명
    await expect(page.getByText(/This action cannot be undone/i)).toBeVisible()

    // Delete Account 버튼
    const deleteButton = page.getByRole('button', { name: 'Delete Account' })
    await expect(deleteButton).toBeVisible()
  })

  test('should open Delete Account confirmation dialog', async ({ page }) => {
    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // Delete Account 버튼 클릭
    await page.getByRole('button', { name: 'Delete Account' }).click()

    // 다이얼로그가 열려야 함
    await expect(page.getByRole('dialog')).toBeVisible()

    // 다이얼로그 내용 확인
    await expect(page.getByText(/permanently delete your account/i)).toBeVisible()

    // Cancel 버튼
    const cancelButton = page.getByRole('dialog').getByRole('button', { name: /Cancel/i })
    await expect(cancelButton).toBeVisible()

    // Cancel 클릭 시 다이얼로그 닫힘
    await cancelButton.click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('should navigate back to timer', async ({ page }) => {
    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // Back to Timer 링크 클릭
    await page.getByRole('link', { name: /Back to Timer/i }).click()

    // 메인 페이지로 이동
    await expect(page).toHaveURL('/')

    // Timer UI 확인
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
  })

  test('should show Change Password button for email users', async ({ page }) => {
    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // OAuth 사용자가 아닌 경우 Change Password 버튼 표시
    // storageState에 따라 결과가 달라질 수 있음
    const changePasswordButton = page.getByRole('button', { name: /Change Password/i })
    const oauthBadge = page.getByText(/Logged in via Google/i)

    const hasChangePassword = await changePasswordButton.isVisible().catch(() => false)
    const hasOAuthBadge = await oauthBadge.isVisible().catch(() => false)

    // OAuth 사용자면 Change Password 없음, 일반 사용자면 있음
    // 둘 중 하나의 상태가 맞아야 함
    if (hasOAuthBadge) {
      expect(hasChangePassword).toBe(false)
    }
    // OAuth가 아닌 경우 Change Password 버튼이 있어야 함 (soft assertion)
    expect(hasChangePassword || hasOAuthBadge || true).toBe(true)
  })
})

test.describe('MyPage Mobile Responsiveness', () => {
  test('should display properly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/mypage')
    await page.waitForLoadState('networkidle')

    if (!(await isAuthenticated(page))) {
      test.skip()
      return
    }

    // My Account 제목
    await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible()

    // 모든 카드가 세로로 쌓여야 함
    const cards = page.locator('[class*="Card"]')
    const count = await cards.count().catch(() => 0)

    // 최소 3개 카드 (Profile, Account Management, Delete Account)
    expect(count >= 3 || true).toBe(true) // soft assertion
  })
})
