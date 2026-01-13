# pomobox - Knowledge Base

프로젝트에서 축적된 인사이트, 해결된 문제, 아키텍처 결정을 기록한다.
새 세션 시작 시 참조하여 동일한 실수를 반복하지 않는다.

---

## 1) 해결된 문제

### [2026-01-12] 세션 진행 중 통계 차트 실시간 업데이트

**증상**: 세션 완료 시 Weekly/Monthly 차트가 즉시 반영되지 않음

**원인**: `useSWR`의 revalidation이 세션 완료 이벤트와 연결되지 않음

**해결**: `mutate()` 호출로 SWR 캐시 강제 갱신

**교훈**: 실시간 업데이트가 필요한 데이터는 이벤트 기반 revalidation 설계 필수

---

### [2026-01-06] 타이머 상태 영속성 (페이지 이동/새로고침)

**증상**: 페이지 이동 또는 새로고침 시 타이머 초기화

**원인**: Zustand store가 메모리에만 존재, 영속화 미적용

**해결**:
- `zustand/middleware`의 `persist` 적용
- `onRehydrateStorage`로 복원 로직 구현
- `targetEndAtMs` (wall-clock) 기반 남은 시간 계산

**영속화 정책**:
| 항목 | 정책 |
|------|------|
| 범위 | Focus 세션만 (Break 제외) |
| 유효 기간 | 당일만 |
| 만료 세션 | 자동 완료 + 통계 기록 |

**교훈**: 타이머는 경과 시간이 아닌 목표 종료 시각 기준으로 설계해야 탭 비활성화에 강건함

---

### [2026-01-11] 날짜/시간 유틸리티 중복

**증상**: `formatDate`, `getMonday` 등 동일 함수가 5개 파일에 분산

**원인**: 기능 추가 시 기존 유틸리티 검색 없이 새로 작성

**해결**: `lib/date-utils.ts` 단일 모듈로 통합 (113줄 → 64줄, -43%)

**교훈**: 새 유틸리티 함수 작성 전 반드시 `lib/` 검색

---

## 2) 아키텍처 결정 기록 (ADR)

### ADR-001: 타이머 상태 관리

**결정**: Zustand + state-machine 패턴

**이유**:
- 단일 SSOT로 상태 예측 가능
- 상태 전이 로직 분리 (`lib/state-machine.ts`)
- 컴포넌트 단순화

**대안 검토**:
- Context API: 복잡도 높음, 리렌더링 최적화 어려움
- Redux: 오버헤드, 보일러플레이트 과다

---

### ADR-002: 데이터 저장 전략

**결정**: IndexedDB (로컬) + Supabase (서버) 하이브리드

**이유**:
- 오프라인 우선 (IndexedDB)
- 로그인 시 서버 동기화 (Supabase)
- 비로그인 사용자도 완전한 기능 사용

**동기화 정책**:
- 로그인 시: 로컬 → 서버 업로드
- 이후: 양방향 동기화

---

### ADR-003: 통계 기록 시점

**결정**: 세션 완료 시에만 기록

**이유**:
- Skip/Reset은 통계에 반영하지 않음 (CLAUDE.md 정책)
- 중간 저장 시 데이터 일관성 문제

**규칙**:
- Focus 완료 → `focusCount + 1`, `totalMinutes + duration`
- Skip/Reset → 기록 없음

---

## 3) 모범 사례

### 컴포넌트 설계

```typescript
// Good: 단일 책임, 작은 컴포넌트
function TimerDisplay({ minutes, seconds }: Props) {
  return <span>{minutes}:{seconds}</span>
}

// Bad: 여러 책임 혼합
function Timer() {
  // 상태 관리 + UI + 비즈니스 로직 모두 포함
}
```

### Zustand Store 패턴

```typescript
// Good: selector로 필요한 상태만 구독
const count = useTimerStore((s) => s.focusCount)

// Bad: 전체 store 구독 (불필요한 리렌더링)
const store = useTimerStore()
```

### 날짜 처리

```typescript
// Good: lib/date-utils.ts 사용
import { formatDate, getMonday } from '@/lib/date-utils'

// Bad: 각 파일에서 직접 구현
const formatDate = (d: Date) => d.toISOString().slice(0, 10)
```

---

## 4) 흔한 실수와 해결책

| 실수 | 해결책 |
|------|--------|
| 기존 유틸리티 검색 없이 새로 작성 | `lib/` 먼저 검색, Grep 활용 |
| 컴포넌트에서 직접 IndexedDB 호출 | `lib/storage/` 통해서만 접근 |
| 타이머 경과 시간 기반 계산 | `targetEndAtMs` (목표 종료 시각) 사용 |
| Skip/Reset 시 통계 기록 | 완료 시에만 기록 (정책 준수) |
| useState로 전역 상태 관리 | Zustand store 사용 |

---

## 5) 성능 최적화 기록

### Lighthouse 개선 (2026-01-06)

| 항목 | 이전 | 이후 |
|------|------|------|
| Performance | 78 | 92 |
| Accessibility | 85 | 98 |
| Best Practices | 83 | 95 |

**적용 기법**:
- 이미지 lazy loading
- 컴포넌트 코드 스플리팅
- Font 최적화 (next/font)

---

## 업데이트 가이드

새로운 인사이트 발생 시:

1. 적절한 섹션에 추가
2. 날짜 명시 `[YYYY-MM-DD]`
3. 증상 → 원인 → 해결 → 교훈 형식 준수
4. 관련 파일/코드 참조 포함
