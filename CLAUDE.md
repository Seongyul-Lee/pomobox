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
- `components/dashboard-*.tsx` - 대시보드 UI

---

## 2) 기능 구현 로드맵 (3단계)

| 단계 | 주요 기능 |
|------|----------|
| 1차 | 타이머 core, 좌/우 대시보드, 로그인, 테마, 모바일 최적화 |
| 2차 | 사이드바, Task 기능, 통계 페이지, Rolling 4-Week |
| 3차 | 고급 통계 (시간대별, 카테고리별, 스트릭) |

**브랜치 전략**: 페이지별 branch 분리 (stats, history 등)

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
| Context7 | `docs/context7-baseline.json` | 당일 캐시 재사용 |
| Hook | `.claude/hooks/enforce-docs.js` | Edit/Write 시 baseline 확인 |

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
- 기본 작업 기준: `/en` 경로
- 색상: oklch 표현 방식
- React: 함수형 컴포넌트 + Hooks (클래스 금지)
