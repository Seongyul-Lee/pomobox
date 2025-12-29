# Scope: lib/ (Core 로직)

이 문서는 `lib/**` 작업에만 적용. 전역 SSOT는 `../CLAUDE.md` 참조.

---

## 핵심 역할

- 타이머 상태 머신 (state-machine.ts)
- 통계 정책 및 계산
- 데이터 저장소 (IndexedDB, localStorage)

---

## Guardrails (협상 불가)

1. **타이머 상태 단일 SSOT 유지**
2. **경쟁 조건 금지**: 중복 interval/timer 생성 금지
3. **명시적 상태 전이**: 암묵적 상태 변경 금지
4. **로직 변경 시**: PR/Plan에 근거 기록 필수

---

## Gates

- 기본: `pnpm lint` → `pnpm build`
- 로직 변경: `pnpm e2e` 추가 필수

---

## 타이머 상태 머신

### 상태 (States)

```
idle → running → paused → running → completed
                    ↓
                  idle (reset)
```

### 핵심 규칙

- 1초 간격 정확한 카운트다운
- Focus 세션 완료 시에만 통계 기록
- Skip: 현재 세션 스킵 (통계 미기록)
- Reset: 타이머 초기화 (idle 상태)

---

## 통계 정책

### 기록 시점

- Focus 세션 **완료** 시에만 기록
- Skip/Reset은 통계에 반영하지 않음

### 통계 종류

| 통계 | 설명 |
|------|------|
| Today Overview | 오늘 완료 세션 수, 총 집중 시간 |
| Weekly Stats | 요일별 생활 패턴 |
| This Week vs Last Week | 전주 대비 비교 |
| Rolling 4-Week | 최근 4주 데이터 (2차 기능) |

### 성능 고려 (3차 기능)

- 통계 데이터 증가 시 집계 테이블 별도 관리
- 캐싱 전략 적용

---

## 저장소 구조

| 저장소 | 용도 |
|--------|------|
| `storage/indexeddb.ts` | 세션 기록, 통계 데이터 |
| `storage/settings.ts` | 사용자 설정 |
| localStorage | 비로그인 Task 데이터 (2차 기능) |
| Supabase | 로그인 사용자 데이터 동기화 |

---

## 주요 파일

| 파일 | 역할 |
|------|------|
| `state-machine.ts` | 타이머 상태 전이 로직 |
| `sounds.ts` | 알람 사운드 생성 |
| `bgm.ts` | BGM 재생 관리 |
| `storage/` | 데이터 영속성 |
