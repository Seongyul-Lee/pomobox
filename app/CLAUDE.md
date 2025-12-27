# Scope: app/ (Next.js App Router)

## Applies to
- This file governs work inside `app/**` only.
- Global SSOT remains `../CLAUDE.md` (security, quality gates, Task Master/Context7 rules).

## Focus
- Routing, layouts, page structure, server/client boundaries, metadata, loading/error UI.

## Guardrails
- Do not modify timer/statistics logic here unless explicitly required; those live in `../lib/**`.
- If a change spans multiple folders, stop and create a short plan first (what changes where, and which gates to run).

## Default gates for app changes
- `pnpm lint`
- `pnpm build`
- High-risk changes: add `pnpm e2e`

---

## UI/UX 반응형 작업 (app/globals.css)

### 기준 해상도
- **QHD (2560x1440)**: 모든 UI/UX 작업의 기준
- **기본 CSS 스타일 = QHD 최적화**
- 다른 해상도는 미디어 쿼리로 "조정"

### 레이아웃 구조 (page.tsx)
```
QHD (기본): [사이드광고 160px] [대시보드 570px] [타이머] [BGM/캘린더 570px] [사이드광고 160px]
FHD (조정): [대시보드 380px] [타이머] [BGM/캘린더 380px] (사이드광고 숨김)
```

### CSS 구조
```css
/* 기본 = QHD */
:root { font-size: 125%; }
.side-ad { display: flex; }

/* FHD 조정 */
@media (max-width: 1920px) { ... }
```

### 주요 CSS 클래스
- `.dashboard-grid`: 3컬럼 그리드 (해상도별 너비 조정)
- `.side-ad`: 사이드 광고 (QHD 기본 표시, FHD 숨김)
- `.main-layout`: 전체 레이아웃 컨테이너

### 해상도별 확인
Playwright MCP 사용:
1. `browser_resize(width, height)` - 해상도 설정
2. `browser_navigate(url)` - 페이지 로드
3. `browser_take_screenshot(filename)` - 스크린샷 저장
