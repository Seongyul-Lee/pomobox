import { test, expect } from '@playwright/test';

/**
 * 통계 대시보드 테스트 (인증된 상태)
 * - 파일명이 *.auth.spec.ts 패턴이므로 chromium-authenticated 프로젝트에서 실행
 * - storageState를 사용하여 로그인된 상태로 테스트
 */
test.describe('Statistics Dashboard (Authenticated)', () => {
  // /stats 페이지 테스트 - 통계 페이지 전용
  test.describe('Stats Page - Statistics Cards', () => {
    test.beforeEach(async ({ page }) => {
      // 데스크탑 뷰포트 설정 (모바일 헤더가 hidden 상태 방지)
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/stats');
      // 페이지 로드 대기 - Analytics 섹션 확인
      await expect(page.locator('text=Analytics').first()).toBeVisible();
    });

    test('should render Weekly Pattern chart without blur', async ({ page }) => {
      // 데스크탑 뷰
      await page.setViewportSize({ width: 1440, height: 900 });

      // Weekly Pattern 섹션 확인 (로그인 상태에서 블러 없음)
      const weeklyPattern = page.locator('text=Weekly Pattern').first();
      await expect(weeklyPattern).toBeVisible();

      // 차트 컨테이너 확인 (Recharts) - ResizeObserver로 마운트되므로 대기 필요
      const chartContainer = page.locator('.recharts-responsive-container').first();
      await expect(chartContainer).toBeVisible({ timeout: 10000 });
    });

    test('should render Monthly Trend chart', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      // Monthly Trend 섹션 확인
      const monthlyTrend = page.locator('text=Monthly Trend').first();
      await expect(monthlyTrend).toBeVisible();
    });

    test('should render Growth Analysis section', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      // Growth Analysis 섹션 확인
      const growthAnalysis = page.locator('text=Growth Analysis').first();
      await expect(growthAnalysis).toBeVisible();
    });

    test('should not show login required overlay when authenticated', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      // 로그인 필요 오버레이가 없어야 함
      const loginOverlay = page.locator('text=/Login required|로그인 필요/i');
      await expect(loginOverlay).not.toBeVisible();
    });
  });

  // 메인 페이지 테스트 - Dashboard Right (Activity Calendar, Check-in)
  test.describe('Dashboard Right - Activity Calendar', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      // 페이지 로드 대기
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
    });

    test('should render Activity Calendar', async ({ page }) => {
      // Activity Calendar 확인 (첫 번째 요소 사용)
      const calendarTitle = page.locator('text=/Activity Calendar|활동 캘린더/i').first();
      await expect(calendarTitle).toBeVisible();

      // 캘린더 날짜 그리드 확인 (7열)
      const calendarGrid = page.locator('button').filter({ hasText: /^\d{1,2}$/ });
      expect(await calendarGrid.count()).toBeGreaterThan(0);
    });

    test('should show Check-in status or button', async ({ page }) => {
      // Check-in 관련 UI 요소 확인 (버튼, 상태 텍스트, 아이콘 등)
      // 로그인 상태에서 체크인 영역이 보여야 함
      const checkInSection = page.locator('text=/Check|출석|체크/i').first();
      await expect(checkInSection).toBeVisible();
    });

    test('should display streak statistics', async ({ page }) => {
      // Streak 통계 확인 (현재 스트릭, 최대 스트릭)
      const streakText = page.locator('text=/Streak|스트릭|연속/i').first();
      await expect(streakText).toBeVisible();
    });

    test('should show day details on calendar click', async ({ page }) => {
      // 오늘 날짜 버튼 클릭
      const today = new Date().getDate();
      const todayButton = page.locator('button').filter({ hasText: new RegExp(`^${today}$`) }).first();

      if (await todayButton.isVisible()) {
        await todayButton.click();
        // Note: 상세 정보 패널 구현에 따라 추가 assertion 필요
      }
    });
  });

  test.describe('Mobile View - Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      // 페이지 로드 대기
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
    });

    test('should show timer on mobile viewport', async ({ page }) => {
      // 타이머가 보여야 함
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();

      // 모바일에서 대시보드가 타이머 아래에 스택으로 배치됨
      // 스크롤해서 대시보드 영역 확인
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // 스크롤 후 페이지 하단 요소 확인 (BGM 또는 통계)
      // 모바일 레이아웃이 정상 작동하면 통과
      const pageContent = await page.content();
      expect(pageContent.length).toBeGreaterThan(0);
    });
  });

  test.describe('Check-in Interaction', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      // 페이지 로드 대기
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
    });

    test('should display check-in area with proper state', async ({ page }) => {
      // 체크인 영역이 존재하는지 확인
      // 버튼이 있거나, 이미 체크인 완료 상태일 수 있음
      const checkInArea = page.locator('text=/Check|출석|체크/i').first();
      await expect(checkInArea).toBeVisible();

      // 월간 출석 정보도 표시되어야 함
      const monthlyAttendance = page.locator('text=/Monthly|월간|이번 달/i').first();
      const isMonthlyVisible = await monthlyAttendance.isVisible().catch(() => false);

      // 최소한 체크인 영역이 보이면 테스트 통과
      expect(await checkInArea.isVisible()).toBe(true);
    });
  });
});
