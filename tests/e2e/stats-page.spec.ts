import { test, expect } from '@playwright/test';

/**
 * 통계 페이지 (/stats) 렌더링 테스트
 * - 4개 통계 섹션 렌더링 확인
 * - 차트 타입 전환 기능 확인
 * - 반응형 레이아웃 확인
 */
test.describe('Statistics Page', () => {
  test.beforeEach(async ({ page }) => {
    // 데스크탑 뷰포트로 시작 (모바일/데스크탑 헤더 중복 방지)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/stats');
    // 페이지 로드 대기 (데스크탑 헤더)
    await expect(page.getByRole('heading', { name: 'Statistics', level: 1 }).first()).toBeVisible();
  });

  test.describe('Section Rendering', () => {
    test('should render all 4 statistics sections', async ({ page }) => {
      // Section 1: Weekly Pattern
      await expect(page.locator('[id="weekly-stats-title"]')).toBeVisible();

      // Section 2: Growth Analysis
      await expect(page.locator('[id="weekly-comparison-title"]')).toBeVisible();

      // Section 3: Monthly Trend
      await expect(page.locator('[id="rolling-stats-title"]')).toBeVisible();

      // Section 4: Focus Hours (Hourly Distribution)
      await expect(page.locator('[id="hourly-distribution-title"]')).toBeVisible();
    });

    test('should render page header with description', async ({ page }) => {
      // 페이지 헤더 확인
      await expect(page.getByRole('heading', { name: 'Statistics', level: 1 }).first()).toBeVisible();
      await expect(page.locator('text=Track your focus patterns and progress')).toBeVisible();
    });

    test('should render sections inside glass-cards', async ({ page }) => {
      // glass-card 클래스를 가진 Card 컴포넌트 확인 (최소 4개)
      const glassCards = page.locator('.glass-card');
      const count = await glassCards.count();
      expect(count).toBeGreaterThanOrEqual(4);
    });
  });

  test.describe('Weekly Pattern Chart', () => {
    test('should render chart type selector buttons', async ({ page }) => {
      // 차트 타입 선택 버튼 그룹 확인
      const chartSelector = page.locator('[role="group"][aria-label="Chart type selector"]');
      await expect(chartSelector).toBeVisible();

      // Bar, Area, Line 버튼 확인
      await expect(page.getByRole('button', { name: /bar/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /area/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /line/i })).toBeVisible();
    });

    test('should have Bar chart selected by default', async ({ page }) => {
      const barButton = page.getByRole('button', { name: /bar/i });
      await expect(barButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should switch to Area chart type', async ({ page }) => {
      const areaButton = page.getByRole('button', { name: /area/i });

      // Area 버튼 클릭
      await areaButton.click();

      // aria-pressed 상태 확인
      await expect(areaButton).toHaveAttribute('aria-pressed', 'true');

      // Bar 버튼이 비선택 상태인지 확인
      const barButton = page.getByRole('button', { name: /bar/i });
      await expect(barButton).toHaveAttribute('aria-pressed', 'false');
    });

    test('should switch to Line chart type', async ({ page }) => {
      const lineButton = page.getByRole('button', { name: /line/i });

      // Line 버튼 클릭
      await lineButton.click();

      // aria-pressed 상태 확인
      await expect(lineButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should render Recharts container', async ({ page }) => {
      // Recharts ResponsiveContainer 확인
      const chartContainer = page.locator('.recharts-responsive-container').first();
      await expect(chartContainer).toBeVisible();
    });
  });

  test.describe('Chart SVG Elements', () => {
    test('should render SVG chart elements', async ({ page }) => {
      // SVG 요소 존재 확인
      const svgElement = page.locator('svg.recharts-surface').first();
      await expect(svgElement).toBeVisible();
    });

    test('should render XAxis with day labels', async ({ page }) => {
      // X축 tick 라벨이 나타날 때까지 대기 (차트 렌더링 완료)
      const xAxisTicks = page.locator('.recharts-xAxis .recharts-cartesian-axis-tick');
      await expect(xAxisTicks.first()).toBeVisible({ timeout: 10000 });

      // X축 tick 라벨 확인 (요일명 - 7일)
      const tickCount = await xAxisTicks.count();
      expect(tickCount).toBeGreaterThanOrEqual(7); // 7 days in a week
    });
  });

  test.describe('Responsive Layout', () => {
    test('should show mobile header on small viewport', async ({ page }) => {
      // 모바일 뷰포트
      await page.setViewportSize({ width: 375, height: 667 });

      // 모바일 헤더 확인 (md:hidden 클래스)
      const mobileHeader = page.locator('header.md\\:hidden h1:has-text("Statistics")');
      await expect(mobileHeader).toBeVisible();
    });

    test('should hide mobile header on desktop viewport', async ({ page }) => {
      // 데스크탑 뷰포트
      await page.setViewportSize({ width: 1440, height: 900 });

      // 모바일 헤더 숨김
      const mobileHeader = page.locator('header.md\\:hidden');
      await expect(mobileHeader).not.toBeVisible();
    });

    test('should stack sections vertically on all viewports', async ({ page }) => {
      // 모바일 뷰포트
      await page.setViewportSize({ width: 375, height: 667 });

      // 섹션들이 세로로 쌓여야 함 (space-y-8 클래스)
      const sectionsContainer = page.locator('.space-y-8').first();
      await expect(sectionsContainer).toBeVisible();

      // 4개 섹션 모두 보여야 함 (스크롤 필요할 수 있음)
      const sections = page.locator('section[aria-labelledby]');
      await expect(sections).toHaveCount(4);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels on sections', async ({ page }) => {
      // 섹션 aria-labelledby 속성 확인
      await expect(page.locator('section[aria-labelledby="weekly-stats-title"]')).toBeVisible();
      await expect(page.locator('section[aria-labelledby="weekly-comparison-title"]')).toBeVisible();
      await expect(page.locator('section[aria-labelledby="rolling-stats-title"]')).toBeVisible();
      await expect(page.locator('section[aria-labelledby="hourly-distribution-title"]')).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // h1 -> 페이지 제목 (first()로 중복 방지)
      const h1 = page.getByRole('heading', { name: 'Statistics', level: 1 }).first();
      await expect(h1).toBeVisible();

      // 섹션 제목들 (CardTitle - h3 또는 동등)
      const sectionTitles = page.locator('[id$="-title"]');
      const titleCount = await sectionTitles.count();
      expect(titleCount).toBeGreaterThanOrEqual(4);
    });

    test('should have keyboard navigable chart selector', async ({ page }) => {
      // 차트 선택 버튼에 포커스 이동 가능
      const barButton = page.getByRole('button', { name: /bar/i });
      await barButton.focus();

      // Tab으로 다음 버튼으로 이동
      await page.keyboard.press('Tab');

      // Area 버튼에 포커스 이동 확인
      const areaButton = page.getByRole('button', { name: /area/i });
      await expect(areaButton).toBeFocused();
    });
  });

  test.describe('Page Metadata', () => {
    test('should have correct page title', async ({ page }) => {
      const title = await page.title();
      expect(title).toContain('Statistics');
    });
  });
});
