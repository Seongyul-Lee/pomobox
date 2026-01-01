# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### User Requests

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
