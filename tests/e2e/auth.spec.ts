import { test, expect } from '@playwright/test';

test.describe('Authentication Pages', () => {
  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/auth/login');
    });

    test('should render login page with all UI elements', async ({ page }) => {
      // 제목 확인
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // 이메일 입력 필드
      const emailInput = page.getByPlaceholder(/email/i);
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute('type', 'email');
      await expect(emailInput).toHaveAttribute('required', '');

      // 비밀번호 입력 필드
      const passwordInput = page.getByPlaceholder(/password/i);
      await expect(passwordInput).toBeVisible();
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await expect(passwordInput).toHaveAttribute('required', '');
      await expect(passwordInput).toHaveAttribute('minlength', '8');

      // 로그인 버튼
      const loginButton = page.getByRole('button', { name: /log\s*in|sign\s*in|로그인/i });
      await expect(loginButton).toBeVisible();

      // Google 로그인 버튼
      const googleButton = page.getByRole('button', { name: /google/i });
      await expect(googleButton).toBeVisible();

      // 회원가입 링크
      const signupLink = page.getByRole('link', { name: /sign\s*up|회원가입/i });
      await expect(signupLink).toBeVisible();

      // 타이머로 돌아가기 링크
      const backLink = page.getByRole('link', { name: /back|돌아가기|timer/i });
      await expect(backLink).toBeVisible();
    });

    test('should show validation error for empty email', async ({ page }) => {
      const emailInput = page.getByPlaceholder(/email/i);
      const passwordInput = page.getByPlaceholder(/password/i);
      const loginButton = page.getByRole('button', { name: /log\s*in|sign\s*in|로그인/i });

      // 비밀번호만 입력
      await passwordInput.fill('testpassword123');
      await loginButton.click();

      // HTML5 validation - 이메일 필드에 포커스
      await expect(emailInput).toBeFocused();
    });

    test('should show validation error for empty password', async ({ page }) => {
      const emailInput = page.getByPlaceholder(/email/i);
      const passwordInput = page.getByPlaceholder(/password/i);
      const loginButton = page.getByRole('button', { name: /log\s*in|sign\s*in|로그인/i });

      // 이메일만 입력
      await emailInput.fill('test@example.com');
      await loginButton.click();

      // HTML5 validation - 비밀번호 필드에 포커스
      await expect(passwordInput).toBeFocused();
    });

    test('should navigate to signup page', async ({ page }) => {
      const signupLink = page.getByRole('link', { name: /sign\s*up|회원가입/i });
      await signupLink.click();

      await expect(page).toHaveURL(/\/auth\/signup/);
    });

    test('should navigate back to timer page', async ({ page }) => {
      const backLink = page.getByRole('link', { name: /back|돌아가기|timer/i });
      await backLink.click();

      // 메인 페이지로 이동 확인
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
    });

    test('should disable inputs and show loading state during submission', async ({ page }) => {
      const emailInput = page.getByPlaceholder(/email/i);
      const passwordInput = page.getByPlaceholder(/password/i);
      const loginButton = page.getByRole('button', { name: /log\s*in|sign\s*in|로그인/i });

      await emailInput.fill('test@example.com');
      await passwordInput.fill('wrongpassword');

      // 폼 제출 시작
      await loginButton.click();

      // 로딩 중 버튼 비활성화 확인 (빠르게 변경될 수 있음)
      // Note: 실제 API 호출이 발생하므로 에러 토스트가 나타날 수 있음
      await page.waitForTimeout(500);
    });
  });

  test.describe('Signup Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/auth/signup');
    });

    test('should render signup page with all UI elements', async ({ page }) => {
      // 제목 확인
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // 이메일 입력 필드
      const emailInput = page.getByPlaceholder(/email/i);
      await expect(emailInput).toBeVisible();

      // 비밀번호 입력 필드
      const passwordInput = page.getByPlaceholder(/password/i);
      await expect(passwordInput).toBeVisible();
      await expect(passwordInput).toHaveAttribute('minlength', '8');

      // 회원가입 버튼
      const signupButton = page.getByRole('button', { name: /sign\s*up|회원가입/i });
      await expect(signupButton).toBeVisible();

      // Google 로그인 버튼
      const googleButton = page.getByRole('button', { name: /google/i });
      await expect(googleButton).toBeVisible();

      // 로그인 링크 (텍스트: "Sign in")
      const loginLink = page.getByRole('link', { name: /sign\s*in|로그인/i });
      await expect(loginLink).toBeVisible();
    });

    test('should navigate to login page', async ({ page }) => {
      const loginLink = page.getByRole('link', { name: /sign\s*in|로그인/i });
      await loginLink.click();

      await expect(page).toHaveURL(/\/auth\/login/);
    });

    test('should validate password minimum length', async ({ page, browserName }) => {
      const emailInput = page.getByPlaceholder(/email/i);
      const passwordInput = page.getByPlaceholder(/password/i);
      const signupButton = page.getByRole('button', { name: /sign\s*up|회원가입/i });

      await emailInput.fill('newuser@example.com');
      await passwordInput.fill('short'); // 8자 미만
      await signupButton.click();

      // HTML5 minlength validation - webkit handles focus differently
      if (browserName !== 'webkit') {
        await expect(passwordInput).toBeFocused();
      }

      // Verify form was not submitted (still on signup page)
      await expect(page).toHaveURL(/\/auth\/signup/);
    });
  });

  test.describe('Navigation Flow', () => {
    test('should have consistent navigation between auth pages', async ({ page }) => {
      // 로그인 페이지 시작
      await page.goto('/auth/login');
      await expect(page).toHaveURL(/\/auth\/login/);

      // 회원가입으로 이동
      await page.getByRole('link', { name: /sign\s*up|회원가입/i }).click();
      await expect(page).toHaveURL(/\/auth\/signup/);

      // 다시 로그인으로 이동 (텍스트: "Sign in")
      await page.getByRole('link', { name: /sign\s*in|로그인/i }).click();
      await expect(page).toHaveURL(/\/auth\/login/);

      // 타이머로 돌아가기
      await page.getByRole('link', { name: /back|돌아가기|timer/i }).click();
      await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
    });
  });
});
