# Scope: components/ (UI 컴포넌트)

이 문서는 `components/**` 작업에만 적용. 전역 SSOT는 `../CLAUDE.md` 참조.

---

## 핵심 역할

- Presentational 컴포넌트
- 접근성 (ARIA, 키보드, 포커스)
- 일관된 스타일링

---

## Guardrails

- 비즈니스 로직 금지 → `lib/` 또는 hooks에 위치
- 라우팅/인증 변경 시 → `app/`과 협의
- Gates: `pnpm lint` → `pnpm build`

---

## Mobile First 원칙

Tailwind CSS는 **Mobile First**가 원칙:
- 기본 클래스 = 모바일용
- `md:` (768px+) 프리픽스로 데스크탑 스타일 덮어씌우기

```tsx
// 예시: 모바일 세로 → 데스크탑 가로
<div className="flex flex-col md:flex-row">
```

---

## 터치 인터페이스 (모바일)

- 버튼 최소 크기: **44px × 44px**
- 버튼 간 여백: 데스크탑보다 넉넉하게
- 스와이프 지원: 통계 카드 좌우 넘기기

---

## 접근성 체크리스트

- [ ] 키보드 탐색 가능
- [ ] ARIA 라벨 적용
- [ ] 색상 대비 충분
- [ ] 포커스 표시 명확

---

## 주요 컴포넌트

| 파일 | 역할 |
|------|------|
| `pomodoro-timer.tsx` | 타이머 UI, Start/Reset/Skip |
| `dashboard-left.tsx` | 좌측 통계 대시보드 |
| `dashboard-right.tsx` | BGM, 캘린더, Check-in |
| `settings-dialog.tsx` | 설정 다이얼로그 |
| `ui/` | shadcn/ui 기본 컴포넌트 |

---

## 1차 기능 Settings 구성

- 알람: 멜로디, 앰비언트
- Focus/Break Duration
- Daily Goal
- Language (4개)
- 스크롤 바 지원
