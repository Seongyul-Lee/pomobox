# Changelog

All notable changes to this project will be documented in this file.

## [2.5.1] - 2026-01-11

날짜/시간 유틸리티 리팩토링 - 중복 코드 제거

### Refactor

#### 공통 유틸리티 모듈 신규 생성
- **신규 파일**: `lib/date-utils.ts`
- 5개 파일에 분산된 중복 함수를 단일 모듈로 통합

#### 추출된 함수
| 함수 | 설명 | 기존 위치 |
|------|------|----------|
| `formatDate(date)` | Date → YYYY-MM-DD 변환 | 4개 파일 |
| `getMonday(date)` | 해당 주의 월요일 반환 (ISO-8601) | 4개 파일 |
| `getWeekDates(monday)` | 월~일 7일 날짜 배열 반환 | 1개 파일 |
| `formatMinutes(minutes)` | 분 → "Xh Ym" 형식 변환 | 1개 파일 |
| `getTodayDateStr()` | 오늘 날짜 YYYY-MM-DD 반환 | 1개 파일 |

### 변경된 파일

| 파일 | 변경 내용 |
|------|----------|
| `lib/date-utils.ts` | **신규** - 공통 날짜 유틸리티 모듈 |
| `lib/supabase/stats.ts` | `getLocalDate`, `getMonday` 제거 → import로 교체 |
| `hooks/use-weekly-stats.ts` | `formatDate`, `getMonday` 제거 → import로 교체 |
| `hooks/use-rolling-4week-stats.ts` | `formatDate`, `getMonday` 제거 → import로 교체 |
| `hooks/use-week-comparison.ts` | `formatDate`, `getMonday`, `getWeekDates` 제거 → import로 교체 |
| `hooks/use-today-stats.ts` | `getTodayDateStr`, `formatMinutes` 제거 → import로 교체 |

### 정량적 변화

| 항목 | 변경 전 | 변경 후 | 차이 |
|------|---------|---------|------|
| 중복 코드 라인 | 113줄 | 64줄 | **-49줄** |
| 함수 정의 횟수 | 11회 | 5회 | **-6회** |

### 기술적 세부사항

#### 호환성 유지
- `lib/supabase/stats.ts`에서 `const getLocalDate = formatDate` alias로 기존 호출부 호환

#### 동작 변경
- **없음** - 모든 함수의 입출력 동일

#### 이점
- DRY 원칙 준수로 유지보수성 향상
- 날짜 로직 수정 시 단일 위치만 변경
- Tree-shaking으로 번들 최적화 가능

---

## [2.5.0] - 2026-01-06

타이머 상태 영속성 (Timer State Persistence)

### 핵심 기능

#### 타이머 상태 영속화
- **페이지 이동 시 타이머 유지**: 다른 페이지 갔다가 돌아와도 타이머 계속 동작
- **브라우저 새로고침 복원**: 새로고침해도 진행 중인 Focus 세션 복원
- **탭 비활성화 대응**: wall-clock 기반 `targetEndAtMs`로 정확한 남은 시간 표시
- **만료 세션 자동 완료**: 브라우저 종료 후 재접속 시 만료된 세션 자동 완료 처리

#### 영속화 정책
| 항목 | 정책 |
|------|------|
| 영속화 범위 | Focus 세션만 (Break/LongBreak 제외) |
| 유효 기간 | 당일만 유효 (날짜 변경 시 초기화) |
| 복원 동작 | 자동 재시작 |
| 만료 세션 | 자동 완료 + 통계 기록 |

### 수정된 파일

| 파일 | 변경 내용 |
|------|----------|
| `lib/store/timer-store.ts` | Zustand persist 미들웨어 추가, onRehydrateStorage 복원 로직 |
| `lib/store/index.ts` | 새 selector 및 initSettingsSubscription export |
| `components/pomodoro-timer.tsx` | useState → useTimerStore 전환, 컴포넌트 단순화 |
| `app/providers.tsx` | initSettingsSubscription() 호출 추가 |

### 품질 개선

#### Skip/Reset 통계 정책 준수
- CLAUDE.md 정책: "Skip/Reset은 통계에 반영하지 않음"
- Skip/Reset 시 경과 시간 저장 로직 제거

#### settings-store 동기화 개선
- settings-store를 SSOT로 유지
- timer-store가 settings-store를 자동 구독
- 컴포넌트에서 수동 동기화 코드 제거

### E2E 테스트 추가

**신규 파일**: `tests/e2e/timer-persistence.spec.ts`
- 페이지 새로고침 시 running/paused 타이머 복원
- Break 세션 비영속화 확인
- 만료 세션 자동 완료 처리
- 날짜 변경 시 초기화
- Skip/Reset 정책 테스트

**수정된 파일**: `tests/e2e/pomobox-timer.spec.ts`
- Stateless → Persistence 정책 테스트로 변경

---

## [2.4.0] - 2026-01-05

SEO 구조화 데이터 및 콘텐츠 신선도 강화

### Phase 2: Breadcrumb & Organization 스키마

#### 신규 컴포넌트
- `components/ui/breadcrumb.tsx` - BreadcrumbList JSON-LD 스키마 포함 네비게이션
  - 3가지 프리셋: `guide`, `blog`, `legal`
  - 홈 아이콘 + 계층 구조 UI

#### 적용 페이지 (7개)
- Guide: what-is-pomodoro, pomodoro-for-students, pomodoro-for-developers, pomodoro-vs-timeboxing, how-to-avoid-distractions
- Blog: pomodoro-history, science-of-focus

#### Organization 스키마 (`app/layout.tsx`)
```json
{
  "@type": "Organization",
  "name": "Pomobox",
  "url": "https://pomobox.app",
  "logo": "https://pomobox.app/logo.png",
  "contactPoint": { "email": "help.pomobox@gmail.com" }
}
```

### Phase 3: 콘텐츠 신선도 & Featured Snippet

#### 신규 컴포넌트
- `components/ui/article-meta.tsx` - 발행일/수정일/읽기시간 표시
- `components/ui/definition-box.tsx` - Featured Snippet 최적화
  - `DefinitionBox`: "What is..." 쿼리 타겟
  - `QuickAnswer`: 비교 쿼리 타겟

#### E-E-A-T 신호 강화
- About 페이지: Breadcrumb, ArticleMeta, AboutPage 스키마 추가
- FAQ 페이지: Breadcrumb, ArticleMeta 추가

#### SiteNavigationElement 스키마
- 사이트 네비게이션 구조화 데이터 추가
- Timer → Stats → Guides (5개) → Blog (2개) → About → FAQ

### SEO 메타데이터 수정 (Phase 1)

#### 키워드 캐니벌라이제이션 해결
- About 페이지: "What is Pomodoro?" → "What Makes Pomobox Different?"
- science-of-focus: "Science of Focus" → "Neuroscience Behind Pomodoro"

#### Legal 페이지 메타데이터 확장
- Privacy: 14자 → 54자 title, GDPR/CCPA 언급
- Terms: 17자 → 47자 title
- Contact: 10자 → 51자 title

#### datePublished/dateModified 수정
- 모든 guide/blog 페이지 날짜 논리 오류 수정

### Sitemap 확장

| 기존 | 신규 |
|-----|-----|
| 6개 URL | 14개 URL |

- Core: `/`, `/stats`, `/dashboard`
- Guide: 5개 페이지 (priority 0.8-0.9)
- Blog: 2개 페이지 (priority 0.7)
- Info: `/about`, `/faq`, `/contact`
- Legal: `/privacy`, `/terms`

### 추가된 스키마 마크업
- WebApplication (기존)
- Organization (신규)
- SiteNavigationElement (신규)
- BreadcrumbList (각 페이지)
- AboutPage (about)
- FAQPage (faq)
- Article + HowTo (guide/blog)

### 파일 변경

| 파일 | 변경 내용 |
|------|----------|
| `components/ui/breadcrumb.tsx` | **신규** - Breadcrumb + BreadcrumbList 스키마 |
| `components/ui/article-meta.tsx` | **신규** - 콘텐츠 신선도 표시 |
| `components/ui/definition-box.tsx` | **신규** - Featured Snippet 최적화 |
| `app/layout.tsx` | Organization + SiteNavigationElement 스키마 |
| `app/sitemap.ts` | 6개 → 14개 URL 확장, priority/frequency 세분화 |
| `app/about/page.tsx` | Breadcrumb, ArticleMeta, AboutPage 스키마 |
| `app/faq/page.tsx` | Breadcrumb, ArticleMeta 추가 |
| `app/guide/*.tsx` | Breadcrumb, ArticleMeta, DefinitionBox 추가 |
| `app/blog/*.tsx` | Breadcrumb, ArticleMeta 추가 |
| `app/privacy/page.tsx` | 메타데이터 확장 |
| `app/terms/page.tsx` | 메타데이터 확장 |
| `app/contact/page.tsx` | 메타데이터 확장 |

---

## [2.3.0] - 2026-01-05

정보성 콘텐츠 페이지 7개 신규 추가 및 SEO 최적화

### Features

#### Guide 페이지 4개 신규 추가
- `/guide/pomodoro-for-students` - 학생 타겟 가이드 (시험 준비, 에세이 작성, 노트 정리, 과목별 전략)
- `/guide/pomodoro-for-developers` - 개발자 타겟 (딥코딩, 디버깅, 코드리뷰, 작업 추정)
- `/guide/pomodoro-vs-timeboxing` - 비교 콘텐츠 (기능 비교표, 장단점, 하이브리드 접근법)
- `/guide/how-to-avoid-distractions` - 집중력 가이드 (디지털, 환경, 내부 방해요소 대응)

#### Blog 페이지 2개 신규 추가
- `/blog/pomodoro-history` - 포모도로 역사/배경 (Francesco Cirillo, 타임라인, 진화 과정)
- `/blog/science-of-focus` - 과학적 근거 (신경과학, 주의력 연구, 울트라디안 리듬)

#### FAQ 전용 페이지 추가
- `/faq` - 4개 카테고리 28개 FAQ (앱 기능, 기술/데이터, 생산성 팁, 계정/지원)
- 기존 what-is-pomodoro FAQ와 차별화된 주제 구성

### SEO 최적화

#### 메타 태그 최적화
- 모든 페이지 title 50-60자 내로 조정
- description 150-160자 최적화
- 주요 키워드 title/H1/description 배치

#### 구조화 데이터 (JSON-LD)
- Article 스키마 (모든 콘텐츠 페이지)
- FAQPage 스키마 (모든 페이지 FAQ 섹션)
- HowTo 스키마 (Students, Distractions 가이드)

#### 내부 링크 강화
- 모든 페이지 간 상호 링크 구축
- 메인 페이지 푸터에 FAQ 링크 추가
- what-is-pomodoro 페이지에 Students 가이드 링크 추가

### 콘텐츠 특징
- 각 페이지 2000+ 단어 상세 콘텐츠
- 데이터 기반 통계 및 연구 인용
- Featured Snippet 타겟 FAQ 섹션
- 적극적 CTA 및 타이머 연결

### 파일 변경

| 파일 | 변경 내용 |
|------|----------|
| `app/guide/pomodoro-for-students/page.tsx` | **신규** - 학생 타겟 가이드 |
| `app/guide/pomodoro-for-developers/page.tsx` | **신규** - 개발자 타겟 가이드 |
| `app/guide/pomodoro-vs-timeboxing/page.tsx` | **신규** - 비교 콘텐츠 |
| `app/guide/how-to-avoid-distractions/page.tsx` | **신규** - 집중력 가이드 |
| `app/blog/pomodoro-history/page.tsx` | **신규** - 역사/배경 |
| `app/blog/science-of-focus/page.tsx` | **신규** - 과학적 근거 |
| `app/faq/page.tsx` | **신규** - FAQ 전용 페이지 |
| `app/page.tsx` | 푸터에 FAQ 링크 추가 |
| `app/guide/what-is-pomodoro/page.tsx` | Students 가이드 링크 추가 |

---

## [2.2.0] - 2026-01-05

콘텐츠 마케팅 최적화 및 SEO 강화

### Features

#### 메인 페이지 가이드 섹션 신규 추가
- 스크롤 스냅 기반 5개 섹션 구성
- "What is Pomodoro?" - 문제-해결 프레임워크 오프닝
- "How to Use" - 5단계 사용법
- "Why It Works" - 과학적 근거 포함 4가지 이점
- "Why Pomobox?" - 3가지 기능 + Social Proof
- "Who Benefits Most?" - 6개 타겟 그룹
- FAQ - 4개 질문 + 상세 가이드 링크

#### About 페이지 전면 개편
- "What is Pomobox?" 섹션 확장 (80단어 → 400단어)
- "Why Choose Pomobox?" 차별화 섹션 추가 (4가지 핵심 가치)
- 기능 설명 강화 (기능 중심 → 혜택 중심)
- Social Proof 섹션 추가 (Free/Open Source/Private)
- FAQ 섹션 추가 (5개 질문)
- Enhanced CTA (2개 버튼 + 설명)

### SEO 개선

#### 메타데이터 최적화
- About 페이지: "Free Open-Source Pomodoro Timer" 키워드 추가
- 가이드 페이지: "Complete Guide" 키워드 추가
- 구체적 description 작성 (best practices, common mistakes, pro tips)

#### 콘텐츠 품질 향상
- 과학적 근거 추가 (Stanford 연구, 뇌과학 등)
- 타겟 오디언스별 콘텐츠 (Students, Developers, Writers, Professionals)
- 문제-해결 프레임워크로 사용자 공감 유도

### UI/UX

#### 스크롤 스냅 UX
- `scroll-snap-type: y proximity` 적용
- 각 섹션 75vh로 다음 섹션 미리보기 제공
- 부드러운 스크롤 전환

#### Internal Linking
- 메인 가이드 → 상세 가이드 페이지 링크 추가
- About → 가이드 페이지 링크 추가

### 파일 변경

| 파일 | 변경 내용 |
|------|----------|
| `components/pomodoro-guide-section.tsx` | **신규** - 스크롤 스냅 가이드 컴포넌트 |
| `app/page.tsx` | PomodoroGuideSection 통합 |
| `app/globals.css` | 스크롤 스냅 스타일 추가 |
| `app/about/page.tsx` | 전면 재작성 |
| `app/guide/what-is-pomodoro/page.tsx` | 메타데이터 개선 |

---

## [2.1.1] - 2026-01-03

UI/UX 디테일 개선

### UI/UX 개선

#### 레이아웃 구분선
- 메인 타이머와 우측 대시보드 사이에 반응형 그라데이션 구분선 추가
- Light/Dark 모드 대응: `via-black/10` / `via-white/10`
- xl(1280px+) 이상에서만 표시

#### Settings 버튼 중복 제거
- md+(768px+) 화면에서 타이머 영역 Settings 버튼 숨김
- 사이드바 Settings 버튼만 사용하도록 통합

---

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
