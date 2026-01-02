# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### User Requests

#### 2026-01-02: 모바일 반응형 UI 최적화

**변경 파일:**
- `app/[locale]/page.tsx`
- `components/dashboard-right.tsx`
- `components/mobile-stats-carousel.tsx` (신규)
- `components/dashboard-left.tsx`
- `app/globals.css`
- `docs/context7-baseline.json`

**변경 내용:**

| 항목 | 설명 |
|------|------|
| 통계 카드 캐러셀 | CSS Scroll Snap 기반 가로 스와이프 구현 (`MobileStatsCarousel`) |
| 캘린더 모바일 최적화 | 폰트/아이콘/패딩 축소 (`text-xs xl:text-base`, `p-2 xl:p-3`) |
| 스트릭 통계 컴팩트화 | 모바일에서 `text-[10px]`, `gap-1 xl:gap-2` 적용 |
| 모바일 레이아웃 간소화 | 통계 카드 숨김, BGM + 캘린더만 표시 (스크롤 길이 감소) |
| scrollbar-hide 유틸리티 | `globals.css`에 추가 |

**모바일 레이아웃 (xl 미만):**
```
Header → Timer → BGM → Calendar → Footer
(통계 카드는 Phase 2 /stats 페이지로 이동 예정)
```

**데스크탑 레이아웃 (xl 이상):**
```
[DashboardLeft] | [Timer] | [BGM + Calendar]
```

---

#### 2025-01-02: 통계 이중 기록 버그 수정

**변경 파일:**
- `lib/storage/local-history.ts`
- `lib/storage/local-stats.ts`
- `components/pomodoro-timer.tsx`

**문제:**
- `recordToHistory()` 호출 시 항상 `totalSessions += 1` 실행
- 1분마다 `incrementLocalMinutes()` → `recordToHistory()` 호출로 세션 수가 25번 증가 (25분 세션 기준)

**해결:**
| 함수 | 변경 내용 |
|------|----------|
| `recordToHistory(minutes, incrementSession?)` | `incrementSession` 파라미터 추가 (기본값 false) |
| `incrementHistorySession()` | 새 함수 - 세션 수만 1 증가 |
| `incrementLocalMinutes()` | `recordToHistory(minutes, false)` 호출 |
| 세션 완료 시 | `incrementHistorySession()` 호출 추가 |

**수정된 데이터 흐름:**
```
1분마다: history.totalMinutes += 1 (세션 수 증가 안 함)
세션 완료: history.totalSessions += 1
```

---

#### 2025-01-02: pomodoro-timer.tsx 접근성(a11y) 개선

**변경 파일:**
- `components/pomodoro-timer.tsx`
- `messages/en.json`, `ko.json`, `ja.json`, `zh-CN.json`

**수정 내용:**

| 심각도 | 문제 | 해결 |
|--------|------|------|
| 높음 | 타이머 시간에 접근성 정보 없음 | `role="timer"` + `aria-label` 추가 |
| 중간 | SVG 프로그레스 바 접근성 없음 | `role="progressbar"` + `aria-valuenow/min/max` 추가 |
| 중간 | Space 단축키가 버튼과 충돌 | 버튼 포커스 시 기본 동작 허용 |
| 낮음 | Skip/Reset 버튼 라벨 부족 | 명시적 `aria-label` + i18n 처리 |

**추가된 번역 키:**
- `timerRemaining`: 타이머 남은 시간 라벨
- `progressLabel`: 프로그레스 바 진행률 라벨
- `resetTimer`: 리셋 버튼 라벨
- `skipToBreakLabel`: 휴식 건너뛰기 버튼 상세 라벨
- `backToFocusLabel`: 집중으로 돌아가기 버튼 상세 라벨
