# pomobox - Project Intelligence (SSOT)

이 문서는 pomobox 레포에서 Claude Code가 따라야 하는 운영 규칙의 SSOT다.
규칙 충돌 시, 이 문서가 최우선이다. 상세 규칙은 각 폴더의 CLAUDE.md 참조.

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

## 2) 기능 구현 단계

| 단계 | 상태 | 백업 브랜치 |
|------|------|-------------|
| 1차 | ✅ 완료 | `phase-1` |
| 2차 | 🔄 진행 중 | - |
| 3차 | ⏳ 대기 | - |

- 상세 작업 목록: Task Master (`.taskmaster/`) 참조
- 단계 완료 시 `phase-n` 브랜치로 백업

---

## 3) 워크플로우

| 단계 | 명령 | 비고 |
|------|------|------|
| 1 | `task-master next` | 작업 시작 |
| 2 | `/plan` | 3+ 파일 변경 시 필수 |
| 3 | `/docs` | 외부 라이브러리 사용 시 |
| 4 | 구현 | `pnpm lint && pnpm build` |
| 5 | `set-status done` | 커밋 전 완료 |

---

## 4) Quality Gates

- 기본: `pnpm lint` → `pnpm build`
- 고위험: `pnpm e2e` 추가
- 커밋 메시지: 한국어
- UI 변경: 접근성 확인 (키보드/ARIA)

---

## 5) Safety (절대 규칙)

- `.env`/비밀키/토큰: 읽거나 출력 금지
- 파괴적 명령: 실행 전 롤백 방안 제시 필수
- 대규모 리팩터링: 임의 제안 금지

---

## 6) Tooling

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

| 플러그인 | 사용 시점 | 호출 방법 |
|----------|----------|----------|
| `seo-technical-optimization:*` | 메타 태그, 스키마, 스니펫 최적화 | `/seo-technical-optimization:seo-*` |

**사용 가이드:**

1. **기능 구현 전** → `feature-dev` 또는 `/plan`
2. **UI 컴포넌트 작성** → `frontend-design`
3. **Supabase 스키마 변경** → `database-design`
4. **기능 완료 후** → `code-review-ai:ai-review`
5. **PR 생성 전** → `security-guidance` + `accessibility-compliance`
6. **2차 완료 후** → `code-refactoring` + `codebase-cleanup`
7. **콘텐츠 페이지** → `seo-technical-optimization`

---

## 7) 폴더별 상세 규칙

| 폴더 | 규칙 범위 |
|------|----------|
| `app/` | 라우팅, 레이아웃, 반응형 UI/UX |
| `components/` | UI 컴포넌트, 접근성, Mobile First |
| `lib/` | 타이머 로직, 통계 정책, 저장소 |
| `docs/` | 문서, Plan, Context7 baseline |

---

## 8) 언어/스타일

- 모든 출력: 한국어
- UI 언어: 영어 (단일 언어)
- 색상: oklch 표현 방식
- React: 함수형 컴포넌트 + Hooks (클래스 금지)
