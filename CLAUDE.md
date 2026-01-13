# pomobox - Project Intelligence (SSOT)

이 문서는 pomobox 레포에서 Claude Code가 따라야 하는 운영 규칙의 SSOT다.
규칙 충돌 시, 이 문서가 최우선이다. 상세 규칙은 각 폴더의 CLAUDE.md 참조.
축적된 인사이트는 `KNOWLEDGE.md` 참조.

---

## 1) 프로젝트 개요

**제품**: pomobox (Pomodoro Timer + 통계/대시보드)

**기술 스택**: Next.js 15 App Router, Zustand, IndexedDB, Supabase Auth, Tailwind CSS

**핵심 원칙**:
- 타이머 상태는 단일 SSOT (`lib/state-machine.ts`)
- 통계는 세션 완료 시에만 기록
- 최소 변경 + 근거 기반 + 롤백 가능성 유지
- 기능 구현 시 추후 연계 기능 고려
- 하드코딩 금지 (이유 없이)

**핵심 파일**:
- `lib/state-machine.ts` - 타이머 상태 머신
- `lib/storage/` - IndexedDB 저장소
- `components/pomodoro-timer.tsx` - 타이머 UI
- `components/sidebar.tsx` - 좌측 사이드바 (2차)
- `components/task-panel.tsx` - Task 슬라이드 패널 (2차)
- `components/dashboard-right.tsx` - BGM, 캘린더, Check-in

---

## 2) 프로젝트 구조

```
pomobox/
├── app/                    # Next.js App Router
│   ├── api/                # API 라우트 (check-in, sessions, settings, tasks)
│   ├── auth/               # 인증 페이지 (login, signup, callback, forgot-password)
│   ├── blog/               # 블로그 콘텐츠 (13개 글)
│   ├── guide/              # 가이드 콘텐츠 (6개 글)
│   ├── dashboard/          # 메인 대시보드
│   ├── stats/              # 통계 페이지
│   ├── mypage/             # 마이페이지 (설정)
│   ├── learn/              # 학습 페이지
│   └── (legal)/            # about, contact, faq, privacy, terms
│
├── components/             # UI 컴포넌트
│   ├── ui/                 # shadcn/ui 기본 컴포넌트
│   ├── stats/              # 통계 차트 컴포넌트
│   ├── pomodoro-timer.tsx  # 타이머 UI (핵심)
│   ├── sidebar.tsx         # 좌측 사이드바
│   ├── task-panel.tsx      # Task 슬라이드 패널
│   └── dashboard-right.tsx # BGM, 캘린더, Check-in
│
├── lib/                    # 핵심 로직
│   ├── state-machine.ts    # 타이머 상태 머신 (SSOT)
│   ├── storage/            # IndexedDB 저장소
│   ├── store/              # Zustand 스토어
│   ├── supabase/           # Supabase 클라이언트
│   ├── sync/               # 로컬-서버 동기화
│   └── queries/            # 데이터 쿼리 함수
│
├── hooks/                  # 커스텀 훅
│   ├── use-today-stats.ts  # 오늘 통계
│   ├── use-weekly-stats.ts # 주간 통계
│   ├── use-user.ts         # 사용자 상태
│   └── use-sync-*.ts       # 동기화 훅
│
├── public/                 # 정적 파일 (아이콘, BGM, favicon)
├── supabase/               # Supabase 마이그레이션/설정
├── tests/                  # E2E 테스트 (Playwright)
├── scripts/                # 유틸리티 스크립트
└── docs/                   # 문서, Plan, Context7 baseline
```

**파일 생성 규칙**:
- 페이지 → `app/[route]/page.tsx`
- API → `app/api/[endpoint]/route.ts`
- 공통 컴포넌트 → `components/`
- 페이지 전용 컴포넌트 → 해당 `app/[route]/` 내부
- 비즈니스 로직 → `lib/`
- React 훅 → `hooks/`

---

## 3) 기능 구현 단계

| 단계 | 상태 | 백업 브랜치 |
|------|------|-------------|
| 1차 | ✅ 완료 | `phase-1` |
| 2차 | 🔄 진행 중 | - |
| 3차 | ⏳ 대기 | - |

- 상세 작업 목록: Task Master (`.taskmaster/`) 참조
- 단계 완료 시 `phase-n` 브랜치로 백업

---

## 4) 워크플로우

| 단계 | 명령 | 비고 |
|------|------|------|
| 1 | `task-master next` | 작업 시작 |
| 2 | `/plan` | 3+ 파일 변경 시 필수 |
| 3 | `/docs` | 외부 라이브러리 사용 시 |
| 4 | 구현 | `pnpm lint && pnpm build` |
| 5 | `set-status done` | 커밋 전 완료 |

---

## 5) 신뢰도 검사 프로토콜

### 사전 검사 (구현 전)

구현 시작 전 스스로 신뢰도 평가:

| 신뢰도 | 행동 |
|--------|------|
| ≥90% | 바로 진행 |
| 70-89% | 대안 제시 후 조사 계속 |
| <70% | 중단, 사용자에게 질문 |

**체크리스트**:
- [ ] 관련 코드를 모두 읽었는가?
- [ ] 기존 패턴을 이해했는가?
- [ ] 부작용 범위를 파악했는가?
- [ ] `KNOWLEDGE.md`에서 유사 사례 확인했는가?

### 사후 검증 (구현 후)

**4가지 질문** (모두 "예"여야 완료):

1. **빌드 성공?** - `pnpm build` 실제 출력 확인
2. **요구사항 충족?** - 각 항목별 체크
3. **검증되지 않은 가정 없음?** - 문서/코드로 확인
4. **증거 있음?** - 로그, 스크린샷, 테스트 결과

**환각 위험 신호** (발견 시 재검토):
- 증거 없이 "정상 작동" 주장
- "아마도", "대부분" 같은 불확실한 언어
- 테스트 실패 무시
- 요약만 제공, 실제 출력 생략

---

## 6) Quality Gates

### 필수 검증

```bash
pnpm lint && pnpm build
```

### 위험도별 추가 검증

| 위험도 | 조건 | 추가 검증 |
|--------|------|----------|
| 기본 | 모든 변경 | `pnpm lint && pnpm build` |
| 중간 | UI 변경 | + 접근성 확인 (키보드/ARIA) |
| 높음 | 핵심 로직 변경 | + `pnpm e2e` |

### 완료 전 체크리스트

- [ ] `pnpm build` 성공 (실제 출력 확인)
- [ ] 모든 요구사항 충족 (항목별 체크)
- [ ] 검증되지 않은 가정 없음
- [ ] 변경 사항 증거 있음 (로그/스크린샷)
- [ ] `KNOWLEDGE.md` 업데이트 필요 여부 검토

### 커밋 규칙

- 메시지: 한국어
- 형식: `type: 설명` (feat, fix, refactor, docs, test 등)

---

## 7) Safety (절대 규칙)

- `.env`/비밀키/토큰: 읽거나 출력 금지
- 파괴적 명령: 실행 전 롤백 방안 제시 필수
- 대규모 리팩터링: 임의 제안 금지

---

## 8) Tooling

| 도구 | SSOT | 핵심 규칙 |
|------|------|----------|
| Task Master | `.taskmaster/` | `status="pending,in-progress"` 필터 |
| Context7 | `docs/context7-baseline.json` | Claude 판단에 따라 조회 |

### Context7 사용 정책

Claude가 필요성을 판단하여 `/docs` 실행:

**조회 권장 상황:**
- 외부 라이브러리 API 사용 시 (Radix UI, Recharts 등)
- 프레임워크 최신 기능 활용 시 (Next.js App Router, Tailwind v4 등)
- 에러 해결 시 공식 문서 참조 필요할 때

**조회 불필요 상황:**
- 단순 스타일링 (CSS, Tailwind 기본 클래스)
- 기존 코드 리팩터링
- 버그 수정 (로직 변경 없음)
- 프로젝트 내부 코드만 수정

### 플러그인 사용 정책

pomobox에서 사용하는 Claude Code 플러그인 목록 (14개):

**개발 워크플로우:**

| 플러그인 | 사용 시점 | 호출 방법 |
|----------|----------|----------|
| `feature-dev:feature-dev` | 새 기능 설계 시 아키텍처 분석 | `/feature-dev:feature-dev` |
| `frontend-design:frontend-design` | UI 컴포넌트 신규 작성 시 | `/frontend-design:frontend-design` |
| `javascript-typescript:typescript-pro` | 복잡한 타입 설계, 제네릭 패턴 | Task agent 사용 |
| `database-design` | Supabase 스키마/RPC 설계 | `/database-design` |
| `error-debugging` | 버그 추적, 에러 핸들링 | `/error-debugging` |

**코드 품질:**

| 플러그인 | 사용 시점 | 호출 방법 |
|----------|----------|----------|
| `code-review-ai:ai-review` | PR 전, 주요 기능 완료 후 | `/code-review-ai:ai-review` |
| `pr-review-toolkit` | GitHub PR 자동 리뷰 | `/pr-review-toolkit` |
| `security-guidance` | 보안 취약점 검토 (XSS, 인젝션) | `/security-guidance` |
| `accessibility-compliance` | WCAG 접근성 검증 | `/accessibility-compliance` |
| `unit-testing` | Jest/Vitest 테스트 작성 | `/unit-testing` |

**유지보수:**

| 플러그인 | 사용 시점 | 호출 방법 |
|----------|----------|----------|
| `code-refactoring` | 기술 부채 관리, 리팩토링 | `/code-refactoring` |
| `codebase-cleanup` | 미사용 코드 제거 | `/codebase-cleanup` |
| `commit-commands` | 커밋 메시지 자동화 | `/commit-commands` |

**SEO/콘텐츠:**

| 플러그인 | 용도 | 호출 방법 |
|----------|------|----------|
| `seo-technical-optimization:seo-keyword-strategist` | 키워드 밀도, LSI 키워드 제안 | `/seo-technical-optimization:seo-keyword-strategist` |
| `seo-technical-optimization:seo-meta-optimizer` | 메타 타이틀/디스크립션 최적화 | `/seo-technical-optimization:seo-meta-optimizer` |
| `seo-technical-optimization:seo-structure-architect` | 헤더 구조, 스키마 마크업 | `/seo-technical-optimization:seo-structure-architect` |
| `seo-technical-optimization:seo-snippet-hunter` | 피처드 스니펫 최적화 | `/seo-technical-optimization:seo-snippet-hunter` |
| `seo-analysis-monitoring:seo-authority-builder` | E-E-A-T 신호 분석 (YMYL용) | `/seo-analysis-monitoring:seo-authority-builder` |
| `seo-analysis-monitoring:seo-cannibalization-detector` | 키워드 중복/자기잠식 탐지 | `/seo-analysis-monitoring:seo-cannibalization-detector` |
| `seo-analysis-monitoring:seo-content-refresher` | 오래된 콘텐츠 갱신 항목 식별 | `/seo-analysis-monitoring:seo-content-refresher` |

**SEO 워크플로우:**

```
┌─────────────────────────────────────────────────────────────┐
│  1️⃣ 작성 전: 키워드 전략 수립                                │
│     └─ seo-keyword-strategist (키워드 밀도, LSI 키워드)      │
├─────────────────────────────────────────────────────────────┤
│  2️⃣ 작성 후: 콘텐츠 품질 검토 (선택)                         │
│     └─ seo-authority-builder (E-E-A-T, YMYL인 경우)         │
│     └─ seo-cannibalization-detector (유사 페이지 있을 때)    │
├─────────────────────────────────────────────────────────────┤
│  3️⃣ 최적화: 기술적 SEO 적용                                  │
│     └─ seo-meta-optimizer (메타 타이틀/디스크립션)           │
│     └─ seo-structure-architect (헤더 구조, 스키마)           │
│     └─ seo-snippet-hunter (피처드 스니펫 노림)               │
└─────────────────────────────────────────────────────────────┘
```

| 상황 | 워크플로우 |
|------|-----------|
| 새 콘텐츠 작성 | `keyword-strategist` → 작성 → `meta-optimizer` + `structure-architect` |
| 기존 콘텐츠 갱신 | `content-refresher` → 수정 → `meta-optimizer` |
| YMYL 콘텐츠 | 위 + `authority-builder` 추가 |
| 유사 페이지 다수 | `cannibalization-detector`로 중복 검토 |

> pomobox는 생산성 도구(YMYL 아님)이므로 실질적으로 **2단계**(`keyword-strategist` → `meta-optimizer`/`structure-architect`)로 충분

**SEO 워크플로우 프롬프트 템플릿:**

```markdown
CLAUDE.md의 SEO 워크플로우를 적용하여 블로그 페이지를 만들어줘.

**주제**: [페이지 제목/주제]

**타겟 키워드**: [주요 키워드 1~3개]

**페이지 경로**: /blog/[slug]

**YMYL 여부**: Yes/No (건강, 금융, 법률 관련 시 Yes)

**추가 요구사항**: (선택)
- [학술 연구 인용, 인포그래픽 등]
```

**사용 가이드:**

1. **기능 구현 전** → `feature-dev` 또는 `/plan`
2. **UI 컴포넌트 작성** → `frontend-design`
3. **Supabase 스키마 변경** → `database-design`
4. **기능 완료 후** → `code-review-ai:ai-review`
5. **PR 생성 전** → `security-guidance` + `accessibility-compliance`
6. **2차 완료 후** → `code-refactoring` + `codebase-cleanup`
7. **콘텐츠 페이지** → SEO 워크플로우 참조

---

## 9) 폴더별 상세 규칙

| 폴더 | 규칙 범위 |
|------|----------|
| `app/` | 라우팅, 레이아웃, 반응형 UI/UX |
| `components/` | UI 컴포넌트, 접근성, Mobile First |
| `lib/` | 타이머 로직, 통계 정책, 저장소 |
| `docs/` | 문서, Plan, Context7 baseline |

---

## 10) 언어/스타일

- 모든 출력: 한국어
- UI 언어: 영어 (단일 언어)
- 색상: oklch 표현 방식
- React: 함수형 컴포넌트 + Hooks (클래스 금지)
