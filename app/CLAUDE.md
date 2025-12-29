# Scope: app/ (Next.js App Router)

이 문서는 `app/**` 작업에만 적용. 전역 SSOT는 `../CLAUDE.md` 참조.

---

## 핵심 역할

- 라우팅, 레이아웃, 페이지 구조
- Server/Client 경계 관리
- 메타데이터, loading/error UI
- 반응형 스타일 (globals.css)

---

## Guardrails

- 타이머/통계 로직 수정 금지 → `lib/` 담당
- 다중 폴더 변경 시 → Plan 먼저 작성
- Gates: `pnpm lint` → `pnpm build`

---

## 반응형 UI/UX 가이드

### 기준 해상도

| 환경 | 해상도 | 역할 |
|------|--------|------|
| 데스크탑 (기본) | QHD 2560x1440 | 기본 CSS 스타일 |
| 데스크탑 (조정) | FHD 1920x1080 | 미디어 쿼리로 축소 |
| 모바일 | < 768px | Mobile First 레이아웃 |

### 레이아웃 구조

```
QHD (기본):
[사이드광고] [대시보드 570px] [타이머] [BGM/캘린더 570px] [사이드광고]

FHD (조정):
[대시보드 380px] [타이머] [BGM/캘린더 380px] (사이드광고 숨김)

모바일:
[타이머] → [통계 카드 스와이프] (세로 배치)
```

### CSS 구조 (globals.css)

```css
/* 기본 = QHD */
:root { font-size: 125%; }
.side-ad { display: flex; }

/* FHD 조정 */
@media (max-width: 1920px) {
  :root { font-size: 90%; }
  .dashboard-grid { grid-template-columns: 380px 1fr 380px; }
  .side-ad { display: none; }
}

/* 모바일 */
@media (max-width: 768px) {
  /* flex-col 기본, 터치 최적화 */
}
```

### 색상 표현

- **oklch** 표현 방식 사용
- 다크 테마 (기본값), 라이트 테마 지원

### 해상도 확인 방법

```bash
# Playwright MCP
browser_resize(2560, 1440)  # QHD
browser_navigate("http://localhost:3000/en")
browser_take_screenshot("qhd.png")
```

---

## 주요 파일

| 파일 | 역할 |
|------|------|
| `globals.css` | 전역 스타일, 반응형 미디어 쿼리 |
| `[locale]/layout.tsx` | i18n 레이아웃 |
| `[locale]/page.tsx` | 메인 페이지 |
| `providers.tsx` | 클라이언트 프로바이더 |
