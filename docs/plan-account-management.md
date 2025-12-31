# 사용자 계정 관리 (Account Management) 구현 계획

## 조사 결과 요약

### 현재 상태
- **Supabase Auth**: 이메일/비밀번호, Google OAuth 로그인 구현됨
- **DB 스키마**: 모든 테이블에 `ON DELETE CASCADE` 설정 완료 (자동 데이터 삭제)
- **i18n**: `next-intl` 사용, `messages/{locale}.json` 구조
- **UI 컴포넌트**: shadcn/ui (Button, Input, Dialog, Card, Toast) 사용 가능
- **Server Action**: 현재 없음 (API Route 패턴 사용 중)
- **auth/callback**: PKCE 코드 교환 구현됨 (`next` 파라미터 지원)
- **미들웨어**: 없음 (생성 필요)

### DB CASCADE 정책 (이미 적용됨)
```sql
-- 모든 테이블에 이미 적용됨
REFERENCES auth.users(id) ON DELETE CASCADE
```
- `focus_sessions`, `daily_stats`, `attendance`, `user_stats`, `tasks`, `user_settings`
- 유저 삭제 시 모든 관련 데이터 자동 삭제됨

---

## 구현 계획 (4단계)

### 1단계: i18n 딕셔너리 업데이트
**파일**: `messages/en.json`, `messages/ko.json`, `messages/ja.json`, `messages/zh-CN.json`

**추가할 키 (`Account` 네임스페이스)**:
```json
{
  "Account": {
    "mypage": "My Account",
    "profile": "Profile",
    "email": "Email",
    "accountManagement": "Account Management",
    "changePassword": "Change Password",
    "deleteAccount": "Delete Account",
    "dangerZone": "Danger Zone",
    "deleteWarning": "This action cannot be undone. All your data will be permanently deleted.",
    "deleteConfirmTitle": "Delete Account?",
    "deleteConfirmMessage": "Are you sure you want to delete your account? This will permanently delete all your data including focus sessions, statistics, and settings.",
    "deleteSuccess": "Account deleted",
    "deleteSuccessMessage": "Your account has been successfully deleted.",
    "cancel": "Cancel",
    "confirm": "Delete",
    "forgotPassword": "Forgot password?",
    "resetPassword": "Reset Password",
    "resetPasswordDescription": "Enter your email and we'll send you a reset link",
    "sendResetLink": "Send Reset Link",
    "resetEmailSent": "Reset email sent",
    "resetEmailSentDescription": "Check your inbox for the password reset link",
    "updatePassword": "Update Password",
    "updatePasswordDescription": "Enter your new password",
    "newPassword": "New Password",
    "confirmPassword": "Confirm Password",
    "passwordUpdated": "Password updated",
    "passwordUpdatedMessage": "Your password has been successfully updated.",
    "passwordMismatch": "Passwords do not match",
    "passwordTooShort": "Password must be at least 6 characters"
  }
}
```

---

### 2단계: 마이페이지 구현
**파일 생성**:
- `app/[locale]/mypage/page.tsx` - 서버 컴포넌트 (인증 체크)
- `components/mypage-content.tsx` - 클라이언트 컴포넌트 (UI)
- `components/delete-account-dialog.tsx` - 삭제 확인 모달

**접근 제어**:
```typescript
// app/[locale]/mypage/page.tsx
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function MyPage({ params }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${params.locale}/auth/login?next=/mypage`)
  }

  return <MypageContent user={user} />
}
```

**UI 구성**:
1. 프로필 카드 (이메일 표시)
2. 계정 관리 섹션
   - 로그아웃 버튼
   - 비밀번호 변경 버튼 → `/update-password`로 이동
3. Danger Zone (붉은색 카드)
   - 회원 탈퇴 버튼 → Dialog 모달

---

### 3단계: 회원 탈퇴 기능 (Server Action)
**파일 생성**:
- `lib/supabase/admin.ts` - Supabase Admin 클라이언트
- `app/actions/account.ts` - Server Action

**구현 로직**:
```typescript
// lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js"

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// app/actions/account.ts
"use server"

import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function deleteAccount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  // Admin API로 유저 삭제 (CASCADE로 데이터 자동 삭제)
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

  if (error) {
    return { error: error.message }
  }

  // 세션 쿠키 삭제
  await supabase.auth.signOut()

  // 리다이렉트는 클라이언트에서 처리 (토스트 메시지 표시 위해)
  return { success: true }
}
```

---

### 4단계: 비밀번호 재설정 Flow

#### Flow A: 재설정 요청
**파일 생성**:
- `app/[locale]/auth/forgot-password/page.tsx`
- `components/forgot-password-form.tsx`

**수정 파일**:
- `components/auth-form.tsx` - "비밀번호 찾기" 링크 추가

**로직**:
```typescript
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${origin}/auth/callback?next=/update-password`
})
```

#### Flow B: 비밀번호 변경
**파일 생성**:
- `app/[locale]/update-password/page.tsx`
- `components/update-password-form.tsx`

**로직**:
```typescript
const { error } = await supabase.auth.updateUser({
  password: newPassword
})
```

---

## 파일 생성/수정 목록

### 신규 생성 (11개)
| 파일 | 역할 |
|------|------|
| `lib/supabase/admin.ts` | Supabase Admin 클라이언트 |
| `app/actions/account.ts` | 계정 관련 Server Actions |
| `app/[locale]/mypage/page.tsx` | 마이페이지 |
| `components/mypage-content.tsx` | 마이페이지 UI |
| `components/delete-account-dialog.tsx` | 삭제 확인 모달 |
| `app/[locale]/auth/forgot-password/page.tsx` | 비밀번호 찾기 |
| `components/forgot-password-form.tsx` | 비밀번호 찾기 폼 |
| `app/[locale]/update-password/page.tsx` | 비밀번호 변경 |
| `components/update-password-form.tsx` | 비밀번호 변경 폼 |

### 수정 (5개)
| 파일 | 수정 내용 |
|------|----------|
| `messages/en.json` | Account 네임스페이스 추가 |
| `messages/ko.json` | Account 네임스페이스 추가 |
| `messages/ja.json` | Account 네임스페이스 추가 |
| `messages/zh-CN.json` | Account 네임스페이스 추가 |
| `components/auth-form.tsx` | "비밀번호 찾기" 링크 추가 |

---

## 작업 순서 (DoD 포함)

### Task 1: i18n 딕셔너리 업데이트
**DoD**:
- [ ] 4개 언어 파일에 `Account` 네임스페이스 추가
- [ ] `pnpm build` 성공

### Task 2: Supabase Admin 클라이언트 생성
**DoD**:
- [ ] `lib/supabase/admin.ts` 생성
- [ ] `.env.example`에 `SUPABASE_SERVICE_ROLE_KEY` 문서화 확인
- [ ] `pnpm build` 성공

### Task 3: 마이페이지 UI 구현
**DoD**:
- [ ] `/mypage` 접근 시 로그인 체크 후 리다이렉트
- [ ] 이메일 표시, 로그아웃/비밀번호변경/탈퇴 버튼 표시
- [ ] 다크 테마에 맞는 디자인
- [ ] `pnpm lint && pnpm build` 성공

### Task 4: 회원 탈퇴 Server Action 구현
**DoD**:
- [ ] 확인 모달 표시
- [ ] Server Action으로 `supabaseAdmin.auth.admin.deleteUser()` 호출
- [ ] 성공 시 세션 삭제 + 메인 리다이렉트 + 토스트
- [ ] `pnpm build` 성공

### Task 5: 비밀번호 재설정 Flow 구현
**DoD**:
- [ ] `/forgot-password` 페이지에서 이메일 입력 → 리셋 링크 발송
- [ ] `/update-password` 페이지에서 새 비밀번호 입력 → 변경
- [ ] auth/callback에서 `next=/update-password` 처리 확인
- [ ] `pnpm lint && pnpm build` 성공

---

## 예상 위험 요소

1. **SUPABASE_SERVICE_ROLE_KEY 미설정**
   - `.env.local`에 Service Role Key가 없으면 회원탈퇴 실패
   - 해결: 환경변수 존재 체크 + 에러 메시지

2. **비밀번호 재설정 이메일 미발송**
   - Supabase 프로젝트 설정에서 SMTP 미설정
   - 해결: Supabase 기본 이메일 사용 또는 커스텀 SMTP 설정

3. **OAuth 사용자 비밀번호 변경**
   - Google OAuth로 가입한 사용자는 비밀번호가 없음
   - 해결: OAuth 사용자에게는 비밀번호 변경 버튼 숨기기
