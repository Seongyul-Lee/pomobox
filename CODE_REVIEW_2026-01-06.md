# AI Code Review Report

**Date:** 2026-01-06
**Reviewer:** Claude Code (AI-Powered Code Review)
**Branch:** preview
**Files Reviewed:** 20 files from recent 5 commits

---

## Review Summary

| Severity | Count | Description |
|----------|-------|-------------|
| HIGH | 3 | Issues that should be fixed before next release |
| MEDIUM | 5 | Issues that should be addressed in upcoming sprints |
| LOW | 4 | Minor improvements and code quality enhancements |
| INFO | 3 | Observations and positive patterns |

---

## HIGH Severity Issues

### 1. Potential Memory Leak in Event Listener

**File:** `components/mobile-header.tsx:392-395`
**Category:** Bug / Memory Management

```typescript
useEffect(() => {
  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [handleKeyDown])
```

**Problem:** `handleKeyDown`이 `menuOpen` 의존성을 가진 `useCallback`이므로 `menuOpen`이 변경될 때마다 새 함수가 생성되고, 이전 이벤트 리스너가 제거되지 않을 수 있음.

**Recommendation:**
```typescript
// handleKeyDown 내부에서 직접 menuOpen 참조하지 말고, ref 사용
const menuOpenRef = useRef(menuOpen)
useEffect(() => { menuOpenRef.current = menuOpen }, [menuOpen])

const handleKeyDown = useCallback((e: KeyboardEvent) => {
  if (e.key === "Escape" && menuOpenRef.current) {
    setMenuOpen(false)
  }
}, []) // 의존성 없음
```

---

### 2. Missing Error Boundary for Critical User Flow

**File:** `components/dashboard-right.tsx:66-91`
**Category:** Reliability / Error Handling

```typescript
const loadData = useCallback(async () => {
  if (user) {
    try {
      const [monthly, attendanceData, ...] = await Promise.all([...])
      // ...
    } catch (error) {
      console.error("Failed to load data from Supabase:", error)
      loadLocalData() // fallback
    }
  }
}, [user])
```

**Problem:** 에러 발생 시 콘솔 로그만 남기고 사용자에게 피드백 없음. `Promise.all`에서 하나라도 실패하면 전체 실패.

**Recommendation:**
```typescript
const loadData = useCallback(async () => {
  if (user) {
    try {
      const results = await Promise.allSettled([
        getMonthlyStats(user.id),
        getAttendanceFromDB(user.id),
        // ...
      ])

      // 개별 결과 처리, 실패한 것만 로컬 데이터로 대체
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`Failed to load ${dataTypes[index]}`)
        }
      })
    } catch (error) {
      // ...
    }
  }
}, [user])
```

---

### 3. Hardcoded Sensitive Route

**File:** `components/stats/login-required-overlay.tsx:33-35`
**Category:** Security / Configuration

```typescript
<a
  href="/auth/login"
  // ...
```

**Problem:** 인증 경로가 하드코딩되어 있음. 향후 경로 변경 시 여러 파일 수정 필요.

**Recommendation:**
```typescript
// lib/routes.ts 생성
export const ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  // ...
} as const

// 사용
import { ROUTES } from '@/lib/routes'
<a href={ROUTES.AUTH.LOGIN} ...>
```

---

## MEDIUM Severity Issues

### 4. Unused Variable in Map Callback

**File:** `components/mobile-header.tsx:522-531`
**Category:** Code Quality

```typescript
{guideItems.map((item, index) => (
  <SubmenuItem
    key={item.href}
    // index 변수 사용되지 않음
```

**Recommendation:** `index` 제거 또는 사용

---

### 5. CSS Class String Concatenation Anti-pattern

**File:** `components/mobile-header.tsx:137`
**Category:** Maintainability

```typescript
"group-hover:" + colors.iconBg
```

**Problem:** Tailwind CSS는 동적 클래스 생성을 지원하지 않음. 빌드 시 purge됨.

**Recommendation:**
```typescript
// 전체 클래스를 정적으로 정의
const colorClasses = {
  primary: {
    groupHoverIconBg: "group-hover:bg-primary/15 dark:group-hover:bg-primary/25",
    // ...
  }
}
```

---

### 6. Potential Hydration Mismatch

**File:** `components/dashboard-right.tsx:57-64`
**Category:** SSR / Hydration

```typescript
const [calendarInfo, setCalendarInfo] = useState({
  year: 2025,  // 하드코딩된 초기값
  month: 0,
  today: 1,
  // ...
})
```

**Problem:** 2025년이 지나면 초기값과 실제값 불일치로 hydration 경고 발생 가능.

**Recommendation:**
```typescript
// 더 안전한 초기값 또는 null 초기화
const [calendarInfo, setCalendarInfo] = useState<CalendarInfo | null>(null)

// 렌더링에서 null 체크
if (!calendarInfo) return <CalendarSkeleton />
```

---

### 7. Magic Numbers in Time Calculations

**File:** `components/pomodoro-timer.tsx:72`
**Category:** Maintainability

```typescript
if (phase === 'longBreak') return 15 * 60  // 매직 넘버
```

**Recommendation:**
```typescript
const TIMER_CONSTANTS = {
  LONG_BREAK_MINUTES: 15,
  // ...
} as const
```

---

### 8. Inconsistent Responsive Breakpoint Usage

**File:** Multiple files
**Category:** Architecture

`xl:` (1280px), `lg:` (1024px), `md:` (768px) 브레이크포인트가 파일마다 다르게 사용됨. `app/CLAUDE.md`에 명시된 기준과 일부 불일치.

**Recommendation:** 브레이크포인트 사용 표준화

---

## LOW Severity Issues

### 9. Missing TypeScript Strict Null Check

**File:** `components/settings-dialog.tsx:119`
**Category:** Type Safety

```typescript
playSound(localSettings.soundType, localSettings.volume / 100)
```

**Problem:** `soundType`이 유효한 값인지 런타임에서만 확인됨.

---

### 10. Inline Style Usage

**File:** `components/mobile-header.tsx:62`
**Category:** Style Consistency

```typescript
style={{ top: "9px" }}
```

**Recommendation:** Tailwind 클래스 사용: `top-[9px]`

---

### 11. Console.error in Production

**File:** `components/dashboard-right.tsx:84`
**Category:** Logging

```typescript
console.error("Failed to load data from Supabase:", error)
```

**Recommendation:** 프로덕션용 로깅 서비스 사용 또는 조건부 로깅

---

### 12. Non-semantic Button Element

**File:** `components/dashboard-right.tsx:355`
**Category:** Accessibility

```typescript
<button
  type="button"
  onClick={() => handleDayClick(day)}
  // role="gridcell" 누락
```

**Recommendation:** 캘린더 그리드에 적절한 ARIA role 추가

---

## INFO / Positive Patterns

### 13. Good Pattern: Controlled Dialog

`components/settings-dialog.tsx`에서 controlled/uncontrolled 모드 모두 지원하는 패턴 잘 구현됨.

### 14. Good Pattern: Error Boundary Usage

`components/stats/stats-content.tsx`에서 각 섹션별 ErrorBoundary 적용 우수.

### 15. Consideration: Bundle Size

`lucide-react`에서 개별 아이콘 임포트 패턴 유지 권장 (tree-shaking 최적화됨).

---

## Accessibility Checklist

| Item | Status | Note |
|------|--------|------|
| 키보드 탐색 | ✅ | ESC 키로 메뉴 닫기 구현 |
| ARIA 라벨 | ✅ | 대부분 적절히 적용 |
| 포커스 표시 | ⚠️ | 일부 버튼에 `focus-visible` 누락 |
| 색상 대비 | ✅ | oklch 사용으로 충분한 대비 유지 |

---

## Performance Considerations

1. **Good:** `Suspense` + lazy loading 적절히 사용
2. **Good:** `useCallback`으로 불필요한 리렌더링 방지
3. **Consider:** `mobile-header.tsx` (616줄) 분할 검토 - 하위 컴포넌트로 분리 권장

---

## Security Assessment

| Item | Status | Note |
|------|--------|------|
| XSS 취약점 | ✅ | 발견되지 않음 |
| 민감 정보 노출 | ✅ | 발견되지 않음 |
| CSRF 보호 | ✅ | Next.js 기본 제공 |
| 인증 경로 하드코딩 | ⚠️ | Issue #3 참조 |

---

## Action Items

### Priority 1 (Before Release)
- [ ] Fix memory leak in mobile-header.tsx event listener
- [ ] Implement Promise.allSettled for dashboard-right.tsx
- [ ] Create centralized routes configuration

### Priority 2 (Next Sprint)
- [ ] Fix Tailwind dynamic class concatenation
- [ ] Update hardcoded year in calendarInfo
- [ ] Extract magic numbers to constants
- [ ] Standardize responsive breakpoint usage

### Priority 3 (Backlog)
- [ ] Add ARIA roles to calendar grid
- [ ] Replace inline styles with Tailwind classes
- [ ] Implement production logging service
- [ ] Consider splitting mobile-header.tsx into smaller components

---

## Conclusion

전반적으로 코드 품질이 양호합니다. Mobile First 원칙 준수, 접근성 고려, 에러 핸들링 등 좋은 패턴들이 사용되고 있습니다. HIGH 이슈 3개를 우선 해결하고, MEDIUM 이슈들은 다음 스프린트에서 처리하는 것을 권장합니다.

---

*Generated by Claude Code AI Review*
