# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-01-03

애드센스 승인을 위한 필수 페이지 추가

### Features

#### 신규 페이지
- **Terms of Service** (`/terms`): 이용약관 페이지
- **About** (`/about`): 서비스 소개 페이지 (주요 기능 4가지)
- **Contact** (`/contact`): 문의 페이지 (이메일 + GitHub 링크)

#### SEO 개선
- sitemap.xml 확장: 4개 → 6개 페이지 (24개 URL)
- Footer 링크 추가: About, Contact, Privacy, Terms

### 지원 언어
- 모든 신규 페이지 4개 언어 번역 완료 (EN, KO, JA, ZH-CN)

---

## [2.0.0] - 2026-01-02 (Phase 2)

Phase 2 업데이트: 다국어 지원, 계정 관리, 대시보드 UI 전면 개편

### Features

#### 다국어(i18n) 지원
- 4개 언어 지원: English, 한국어, 日本語, 简体中文
- next-intl 기반 라우팅 (`/en`, `/ko`, `/ja`, `/zh-CN`)
- 모든 UI 텍스트 번역 완료

#### 사용자 계정 관리
- 마이페이지 구현 (`/mypage`)
- 계정 삭제 기능 (Supabase Admin API)
- 비밀번호 재설정 (이메일 인증)
- 계정 관리 보안 강화: 재인증 로직 추가

#### 로컬 → 클라우드 데이터 마이그레이션
- 로그인 시 IndexedDB 데이터를 Supabase로 자동 마이그레이션
- 배치 처리 + 재시도 로직으로 안정성 확보
- 마이그레이션 실패 시 로컬 데이터 보존

#### BGM 시스템
- MP3 파일 기반 배경음악 재생
- 반복 재생 기능
- 볼륨 조절

#### 자동 저장
- Focus 세션 1분마다 자동 저장
- 브라우저 종료/새로고침 시 데이터 손실 방지

### UI/UX 개선

#### 3컬럼 대시보드 레이아웃
```
[통계 패널] | [타이머] | [BGM + 캘린더]
```

#### 모바일 반응형 최적화
- CSS Scroll Snap 기반 통계 카드 캐러셀
- 캘린더/스트릭 통계 컴팩트화
- 모바일 레이아웃: Timer → BGM → Calendar

#### 테마 시스템 개선
- 3개 테마 Glassmorphism 효과 통일
- Midnight 테마 추가
- 라이트 모드 UI/UX 개선

#### Weekly Stats 차트 개선
- Daily Avg를 Hour/Minute 구조로 변경
- Recharts 경고 해결 (requestAnimationFrame)

#### Paused 상태 UI
- 펄스 애니메이션 추가
- 접근성 개선

### 접근성(a11y)

#### 포모도로 타이머
- `role="timer"` + `aria-label` 추가
- SVG 프로그레스 바 `role="progressbar"` 추가
- Space 단축키 버튼 충돌 해결

#### 전체 앱
- muted-foreground 색상 대비율 수정 (WCAG AA)
- UserMenu aria-label 추가
- Slider aria-label을 thumb 요소에 전달

### SEO 최적화

#### 메타데이터
- OG Image 동적 생성
- JSON-LD 구조화 데이터
- Sitemap.xml 자동 생성
- 비공개 페이지 noindex/nofollow 처리

#### 검색엔진 등록
- Google Search Console 연동
- Naver Search Advisor 연동
- favicon 표시 개선

#### 콘텐츠
- 포모도로 가이드 페이지 신규 생성 (`/guide/what-is-pomodoro`)
- Privacy Policy i18n 전환

### 버그 수정

| 버그 | 원인 | 해결 |
|------|------|------|
| Delete Account 서버 에러 | `SUPABASE_SERVICE_ROLE_KEY` 누락 | Lazy initialization + 에러 핸들링 |
| 통계 이중 기록 | 1분마다 세션 수 증가 | `incrementSession` 파라미터 분리 |
| Google OAuth Sync failed | 마이그레이션 타이밍 이슈 | 인증 콜백 후 실행 |
| Pause 시 통계 초기화 | 상태 초기화 로직 오류 | 조건부 초기화 |
| Focus Timer 통계 미반영 | 실시간 동기화 누락 | 이벤트 기반 동기화 |
| React Hydration 에러 #418 | SSR/CSR 불일치 | 클라이언트 전용 렌더링 |
| Supabase 406 에러 | Accept 헤더 누락 | API Routes 래핑 |
| today-stats 중복 카운트 | 마이그레이션 재시도 | 조건부 스킵 로직 |

### 인프라

#### Next.js 16 마이그레이션
- middleware.ts → proxy.ts 전환
- API Routes 구현 (Supabase CRUD 래핑)

#### 테스트
- Playwright E2E 테스트 설정
- 인증 테스트 (로컬 전용)
- CI 환경 인증 테스트 skip 설정

#### CI/CD
- GitHub Actions quality-gate
- Supabase 더미 환경변수 설정
- E2E 테스트 속도 최적화

#### 광고
- Google AdSense 설정 (ads.txt, 메타 태그)
- 자동광고 전환

---

## [1.0.0] - 2025-12-XX (Phase 1)

초기 릴리즈: 기본 포모도로 타이머 + 통계

### Features
- 25분 Focus / 5분 Break / 15분 Long Break
- 4세션 완료 후 Long Break
- IndexedDB 로컬 저장
- Supabase 인증 (Email, Google OAuth)
- 기본 통계 (Today, Weekly, Monthly)
- Activity Calendar (출석 체크)
- Settings (타이머 시간, 알림음)

### UI
- Tailwind CSS + shadcn/ui
- 다크 모드 기본
- 반응형 레이아웃
